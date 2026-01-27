const SHEET_STATE_STORAGE_PREFIX = 'verbosecell-sheet-state-v1-';

const escapeHTML = (str = '') => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeAttribute = (str = '') => escapeHTML(str).replace(/\r/g, '&#13;').replace(/\n/g, '&#10;');

const STYLE_PROPS = [
    'backgroundColor',
    'fontColor',
    'fontSize',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'textAlign',
    'verticalAlign'
];

class TabShell {
    constructor() {
        this.tabsEl = document.getElementById('sheetTabs');
        this.isTopWindow = window.self === window.top;
        this.init();
    }

    async init() {
        const sheets = await this.loadSheetList();
        const currentId = this.detectCurrentSheet(sheets);
        this.renderTabs(sheets, currentId);
        this.maybeRedirect(sheets, currentId);
    }

    async loadSheetList() {
        const domSeeds = this.extractFromDom();
        const parentSeeds = this.getSheetsFromParent();

        try {
            const response = await fetch('tabs.json', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                const normalized = this.normalizeSheetList(data);
                if (normalized.length) return normalized;
            }
        } catch (error) {
            // ignore and fall back
        }

        if (parentSeeds.length) return parentSeeds;
        if (domSeeds.length) return domSeeds;
        return [{ id: '1', title: 'Sheet 1', href: '1.html' }];
    }

    normalizeSheetList(payload) {
        if (!payload || !Array.isArray(payload.sheets)) return [];
        return payload.sheets
            .map((sheet, index) => this.normalizeEntry(sheet, index))
            .filter(Boolean);
    }

    normalizeEntry(entry, index) {
        if (!entry) return null;
        const id = this.sanitizeId(entry.id ?? `${index + 1}`);
        if (!id) return null;
        const title = entry.title ? String(entry.title).trim() : `Sheet ${id}`;
        const href = entry.href ? this.sanitizeFile(entry.href) : `${id}.html`;
        return { id, title, href };
    }

    sanitizeId(value) {
        if (!value) return '';
        const normalized = `${value}`.trim().replace(/[^A-Za-z0-9_-]/g, '');
        return normalized;
    }

    sanitizeFile(value) {
        if (!value) return '';
        const name = `${value}`.split('/').pop().trim();
        if (!name) return '';
        const safe = name.replace(/[^A-Za-z0-9._-]/g, '');
        return /\.html?$/i.test(safe) ? safe : `${safe}.html`;
    }

    extractFromDom() {
        if (!this.tabsEl) return [];
        const anchors = Array.from(this.tabsEl.querySelectorAll('a[href$=".html"]'));
        const seen = new Set();
        const sheets = [];
        anchors.forEach((a, idx) => {
            const href = this.sanitizeFile(a.getAttribute('href') || '');
            if (!href || seen.has(href)) return;
            seen.add(href);
            const idMatch = href.match(/^(.*)\.html?$/i);
            const id = this.sanitizeId(idMatch ? idMatch[1] : `${idx + 1}`);
            sheets.push({ id: id || `${idx + 1}`, title: a.textContent?.trim() || `Sheet ${id || idx + 1}`, href });
        });
        return sheets;
    }

    getSheetsFromParent() {
        try {
            if (!window.parent || window.parent === window) return [];
            const container = window.parent.document.querySelector('.spreadsheet-container');
            if (!container) return [];
            const listAttr = container.getAttribute('data-sheet-list') || '';
            const ids = listAttr.split(/[,\s]+/).map(id => this.sanitizeId(id)).filter(Boolean);
            const unique = Array.from(new Set(ids));
            return unique.map(id => ({ id, title: `Sheet ${id}`, href: `${id}.html` }));
        } catch (error) {
            return [];
        }
    }

    detectCurrentSheet(sheets) {
        const ids = new Set((sheets || []).map(s => s.id));
        const parentId = this.getSheetIdFromParent();
        if (parentId && ids.has(parentId)) return parentId;

        const params = new URLSearchParams(window.location.search);
        const fromQuery = this.sanitizeId(params.get('sheet'));
        if (fromQuery && ids.has(fromQuery)) return fromQuery;

        const pathId = this.getSheetIdFromPath((window.top || window).location?.pathname);
        if (pathId && ids.has(pathId)) return pathId;

        const currentPath = (window.top || window).location?.pathname || '';
        const matchHref = (sheets || []).find(sheet => currentPath.endsWith(sheet.href));
        if (matchHref) return matchHref.id;

        return sheets[0]?.id || null;
    }

    getSheetIdFromParent() {
        try {
            if (!window.parent || window.parent === window) return null;
            const container = window.parent.document.querySelector('.spreadsheet-container');
            if (!container) return null;
            const attr = container.getAttribute('data-sheet-id') || container.getAttribute('data-current-sheet') || '';
            return this.sanitizeId(attr);
        } catch (error) {
            return null;
        }
    }

    getSheetIdFromPath(pathname) {
        if (!pathname) return '';
        const parts = pathname.split('/').filter(Boolean);
        const last = parts[parts.length - 1] || '';
        const match = last.match(/^(.*?)(\.html?)$/i);
        const stem = match ? match[1] : last;
        return this.sanitizeId(stem);
    }

    renderTabs(sheets, currentId) {
        if (!this.tabsEl) return;
        this.tabsEl.innerHTML = '';
        sheets.forEach(sheet => {
            const link = document.createElement('a');
            link.className = 'sheet-tab';
            link.href = sheet.href;
            link.textContent = sheet.title || `Sheet ${sheet.id}`;
            if (sheet.id === currentId || sheet.href === currentId) {
                link.classList.add('sheet-tab--active');
                link.setAttribute('aria-current', 'page');
            }
            this.tabsEl.appendChild(link);
        });
    }

    maybeRedirect(sheets, currentId) {
        if (!this.isTopWindow) return;
        const filename = this.getFilename((window.location || {}).pathname || '');
        if (filename && filename !== 'index.html') return;
        const params = new URLSearchParams(window.location.search || '');
        if (params.has('code') || params.has('state')) return;
        const first = sheets.find(sheet => sheet.id === currentId) || sheets[0];
        if (!first) return;
        const search = window.location.search || '';
        const hash = window.location.hash || '';
        const target = `${first.href}${search}${hash}`;
        if (target === `${filename}${search}${hash}`) return;
        try {
            window.location.replace(target);
        } catch (error) {
            window.location.href = target;
        }
    }

    getFilename(pathname) {
        if (!pathname) return '';
        const parts = pathname.split('/').filter(Boolean);
        return parts[parts.length - 1] || '';
    }
}

// Initialize the application
if (document.body && document.body.classList.contains('tabs-only')) {
    new TabShell();
} else if (document.querySelector('.spreadsheet-container')) {
    const app = new SpreadsheetApp();
}
