const TOOLBAR_AND_FORMULA_HTML = `
        <div class="toolbar">
            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="saveBtn" title="Save changes (opens GitHub issue). Hold Shift to configure GitHub.">
                    <span class="toolbar-btn__icon">
                        💾
                        <span class="save-indicator-badge hidden" id="saveBtnBadge" aria-hidden="true"></span>
                    </span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="undoBtn" title="Undo">
                    <span>↶</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="redoBtn" title="Redo">
                    <span>↷</span>
                </button>
            </div>
            
            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="formatPainterBtn" title="Format Painter">
                    <span>🖌️</span>
                </button>
            </div>
            
            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="boldBtn" title="Bold">
                    <span>B</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="italicBtn" title="Italic">
                    <span>I</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="underlineBtn" title="Underline">
                    <span style="text-decoration: underline;">U</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="strikethroughBtn" title="Strikethrough">
                    <span style="text-decoration: line-through;">S</span>
                </button>
                <input type="number" id="fontSizeInput" class="form-control" style="width: 70px; padding: 4px 8px; font-size: 12px;" placeholder="Size" max="200" title="Font Size (px)">
                <button class="btn btn--sm toolbar-btn" id="fontColorBtn" title="Font Color">
                    <span style="position: relative; display: inline-block;">
                        A
                        <span style="position: absolute; bottom: -2px; left: 0; right: 0; height: 3px; background: currentColor;"></span>
                    </span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="colorBtn" title="Background Color">
                    <span style="position: relative; display: inline-block;">
                        🪣
                        <span id="bgColorIndicator" style="position: absolute; bottom: -2px; left: 0; right: 0; height: 3px; background: transparent;"></span>
                    </span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="borderBtn" title="Borders">
                    <span>⊞</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="mergeBtn" title="Merge Cells">
                    <span>⧺</span>
                </button>
            </div>
            
            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="alignLeftBtn" title="Align Left">
                    <span>⬅</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="alignCenterBtn" title="Align Center">
                    <span>↔</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="alignRightBtn" title="Align Right">
                    <span>➡</span>
                </button>
            </div>

            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="alignTopBtn" title="Align Top">
                    <span>⬆</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="alignMiddleBtn" title="Align Middle">
                    <span>↕</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="alignBottomBtn" title="Align Bottom">
                    <span>⬇</span>
                </button>
            </div>
            
            <div class="toolbar-section" style="margin-left: auto;">
                <button class="btn btn--sm toolbar-btn" id="keyboardShortcutsBtn" title="Keyboard Shortcuts">
                    <span>⌨️</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="zoomOutBtn" title="Zoom Out">
                    <span>−</span>
                </button>
                <span id="zoomDisplay" style="min-width: 50px; text-align: center; font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">100%</span>
                <button class="btn btn--sm toolbar-btn" id="zoomInBtn" title="Zoom In">
                    <span>+</span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="zoomResetBtn" title="Reset Zoom">
                    <span>⊙</span>
                </button>
                <button class="btn btn--sm toolbar-btn toolbar-btn--theme" id="themeToggleBtn" title="Toggle theme">
                    <span id="themeToggleIcon">🌙</span>
                </button>
                <div class="toolbar-profile" id="codebergProfile" title="Codeberg profile">
                    <div class="toolbar-profile__avatar" id="codebergAvatar">
                        <img id="codebergAvatarImg" class="toolbar-profile__image hidden" alt="Codeberg avatar">
                        <span class="toolbar-profile__badge hidden" id="codebergProfileBadge" aria-hidden="true"></span>
                        <div class="toolbar-profile__repo" id="codebergOrgAvatar">
                            <span class="toolbar-profile__repo-initials" id="codebergOrgAvatarInitials">RP</span>
                            <img id="codebergOrgAvatarImg" class="toolbar-profile__repo-image hidden" alt="Organization avatar">
                        </div>
                    </div>
                    <div class="toolbar-profile__meta" id="codebergProfileMeta">
                        <div class="toolbar-profile__name" id="codebergProfileName">Codeberg</div>
                        <div class="toolbar-profile__hint" id="codebergProfileHint">Not signed in</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="formula-bar">
            <div class="cell-reference">
                <input type="text" id="cellReference" class="form-control" placeholder="A1">
            </div>
            <div class="formula-bar-label">fx</div>
            <div class="formula-input-wrapper">
                <input type="text" id="formulaInput" class="form-control formula-input" placeholder="Enter formula or value...">
                <div id="formulaSuggestions" class="formula-suggestions hidden" aria-live="polite"></div>
            </div>
        </div>
`;

const LINK_EDITOR_HTML = `
    <div id="linkEditor" class="link-editor hidden">
        <div class="link-editor-title">Edit Link</div>
        <div class="link-editor-field">
            <label class="link-editor-label" for="linkUrl">URL:</label>
            <input type="text" id="linkUrl" class="form-control" placeholder="https://example.com">
        </div>
        <div class="link-editor-field">
            <label class="link-editor-label" for="linkText">Display Text:</label>
            <input type="text" id="linkText" class="form-control" placeholder="Link text">
        </div>
        <div class="link-editor-actions">
            <button class="btn btn--sm" id="linkCancelBtn">Cancel</button>
            <button class="btn btn--sm toolbar-btn" id="linkSaveBtn">Save</button>
        </div>
    </div>
`;

const COLOR_PALETTES_HTML = `
    <div id="fontColorPalette" class="font-color-palette hidden">
        <div class="font-color-palette-content">
            <div class="font-color-palette-title">Font Colors</div>
            <div class="font-color-palette-grid" id="fontColorPaletteGrid"></div>
        </div>
    </div>
    <div id="colorPalette" class="color-palette hidden">
        <div class="color-palette-content">
            <div class="color-palette-title">Background Colors</div>
            <div class="color-palette-grid" id="colorPaletteGrid"></div>
        </div>
    </div>
`;

const COMMENT_EDITOR_HTML = `
    <div id="commentEditor" class="comment-editor hidden" role="dialog" aria-modal="true" aria-labelledby="commentEditorTitle">
        <div class="comment-editor__content">
            <header class="comment-editor__header">
                <div class="comment-editor__title" id="commentEditorTitle">Edit comment</div>
                <button type="button" class="comment-editor__close" data-comment-editor-dismiss aria-label="Close">×</button>
            </header>
            <label class="comment-editor__label" for="commentEditorText">Comment</label>
            <textarea id="commentEditorText" class="form-control comment-editor__textarea" rows="4"></textarea>
            <label class="comment-editor__checkbox">
                <input type="checkbox" id="commentEditorAnonymous">
                <span>Anonymous comment</span>
            </label>
            <div class="comment-editor__actions">
                <button type="button" class="btn btn--sm" data-comment-editor-cancel>Cancel</button>
                <button type="button" class="btn btn--sm toolbar-btn" data-comment-editor-save>Save</button>
            </div>
        </div>
    </div>
`;

const BORDER_MENU_HTML = `
    <div id="borderMenu" class="border-menu hidden">
        <div class="border-menu-title">Borders</div>
        <div class="border-menu-section">
            <div class="border-menu-subtitle">Preview</div>
            <div id="borderPreview" class="border-preview">
                <div class="border-preview-grid">
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                    <div class="border-preview-cell"></div>
                </div>
            </div>
        </div>
        <div class="border-menu-section border-menu-section--compact">
            <div style="display: flex; gap: var(--space-8); align-items: center;">
                <input type="color" id="borderColorPicker" value="#000000" style="width: 40px; height: 32px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer;">
                <div style="position: relative; flex: 1; display: flex; align-items: center;">
                    <span style="position: absolute; left: var(--space-8); color: var(--color-text-secondary); font-size: var(--font-size-sm); font-family: var(--font-family-mono); pointer-events: none;">#</span>
                    <input type="text" id="borderColorHex" class="form-control" placeholder="000000" maxlength="6" style="flex: 1; font-family: var(--font-family-mono); font-size: var(--font-size-sm); padding-left: calc(var(--space-8) + 12px);">
                </div>
                <button class="btn btn--sm" id="addBorderColorBtn" title="Add custom color" style="min-width: 32px;">+</button>
            </div>
            <div class="border-menu-divider"></div>
        </div>
        <div class="border-menu-section">
            <div class="border-menu-subtitle">Border Styles</div>
            <div class="border-options-grid">
                <button class="border-option" data-action="all" title="All borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="6" width="12" height="12"/>
                        <line x1="6" y1="12" x2="18" y2="12"/>
                        <line x1="12" y1="6" x2="12" y2="18"/>
                    </svg>
                </button>
                <button class="border-option" data-action="inner" title="Inner borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="12" x2="18" y2="12"/>
                        <line x1="12" y1="6" x2="12" y2="18"/>
                    </svg>
                </button>
                <button class="border-option" data-action="horizontal" title="Horizontal borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="9" x2="18" y2="9"/>
                        <line x1="6" y1="12" x2="18" y2="12"/>
                        <line x1="6" y1="15" x2="18" y2="15"/>
                    </svg>
                </button>
                <button class="border-option" data-action="vertical" title="Vertical borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="9" y1="6" x2="9" y2="18"/>
                        <line x1="12" y1="6" x2="12" y2="18"/>
                        <line x1="15" y1="6" x2="15" y2="18"/>
                    </svg>
                </button>
                <button class="border-option" data-action="outer" title="Outer borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="6" width="12" height="12"/>
                    </svg>
                </button>
                <button class="border-option" data-action="left" title="Left border">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="8" y1="6" x2="8" y2="18"/>
                    </svg>
                </button>
                <button class="border-option" data-action="right" title="Right border">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="16" y1="6" x2="16" y2="18"/>
                    </svg>
                </button>
                <button class="border-option" data-action="top" title="Top border">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="8" x2="18" y2="8"/>
                    </svg>
                </button>
                <button class="border-option" data-action="bottom" title="Bottom border">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="16" x2="18" y2="16"/>
                    </svg>
                </button>
                <button class="border-option" data-action="clear" title="Clear borders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="6" x2="18" y2="18"/>
                        <line x1="18" y1="6" x2="6" y2="18"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="border-menu-section border-menu-section--compact">
            <div class="border-menu-control-row">
                <div class="border-menu-control-label">Line:</div>
                <select id="borderStyleSelect" class="form-control border-menu-control-select">
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                </select>
            </div>
        </div>
        <div class="border-menu-section border-menu-section--compact">
            <div class="border-menu-control-row">
                <div class="border-menu-control-label">Width:</div>
                <select id="borderWidthSelect" class="form-control border-menu-control-select">
                    <option value="1">1px</option>
                    <option value="2">2px</option>
                    <option value="3">3px</option>
                    <option value="4">4px</option>
                </select>
            </div>
        </div>
        <div class="border-menu-section border-menu-color-sections" id="borderColorSections" style="display: none;"></div>
    </div>
`;

const SAVE_OPTIONS_MODAL_HTML = `
    <div id="saveOptionsModal" class="save-modal hidden" role="dialog" aria-modal="true" aria-labelledby="saveModalTitle">
        <div class="save-modal__backdrop" data-modal-dismiss></div>
        <div class="save-modal__dialog">
            <div class="save-modal__header">
                <h2 id="saveModalTitle">Share your changes</h2>
                <button class="save-modal__close" type="button" data-modal-dismiss aria-label="Close">×</button>
            </div>
            <div class="save-modal__body">
                <p>Select how you would like to deliver the updated <code>index.html</code>:</p>
                <div class="save-modal__diff" id="saveModalDiff" aria-live="polite">
                    <div class="save-modal__diff-empty">No local changes detected.</div>
                </div>
                <div class="save-modal__actions">
                    <button type="button" class="btn btn--primary" data-save-action="download">Download page</button>
                    <button type="button" class="btn btn--primary" data-save-action="pull-request">PR via OAuth</button>
                    <button type="button" class="btn btn--primary" data-save-action="issue">Issue</button>
                </div>
                <p class="save-modal__note">
                    PR and Issue both require an account. PR is preferred but asks for <code>write:repository</code> and <code>read:user</code> permissions for this application.
                    If you don’t trust the app, use Issue. If Codeberg ever supports anonymous issues I will add them for folks without an account.
                    You can always download the HTML and send it to me manually if you prefer.
                </p>
                <div class="save-modal__oauth" id="saveModalOAuthInfo"></div>
                <div class="save-modal__status" id="saveModalStatus" role="status" aria-live="polite"></div>
            </div>
        </div>
    </div>
`;

const CONTEXT_MENU_ITEMS = [
    { action: 'cut', icon: '✂️', label: 'Cut' },
    { action: 'copy', icon: '📋', label: 'Copy' },
    { action: 'paste', icon: '📄', label: 'Paste' },
    { separator: true, id: 'linkSeparator1' },
    { action: 'openLink', icon: '🔗', label: 'Open Link', id: 'openLinkItem' },
    { action: 'editLink', icon: '✏️', label: 'Edit Link', id: 'editLinkItem' },
    { action: 'insertLink', icon: '🔗', label: 'Insert Link', id: 'insertLinkItem' },
    { action: 'comment', icon: '💬', label: 'Add/Edit Comment' },
    { action: 'setRowHeight', icon: '↕️', label: 'Set Row Height…', id: 'rowHeightMenuItem', className: 'context-menu-item--row-height', style: 'display: none;' },
    { action: 'setColWidth', icon: '↔️', label: 'Set Column Width…', id: 'colWidthMenuItem', className: 'context-menu-item--col-width', style: 'display: none;' },
    { separator: true, id: 'linkSeparator2' },
    { action: 'insertRow', icon: '➕', label: 'Insert Row Above' },
    { action: 'insertCol', icon: '➕', label: 'Insert Column Left' },
    { action: 'deleteRow', icon: '➖', label: 'Delete Row' },
    { action: 'deleteCol', icon: '➖', label: 'Delete Column' },
    { separator: true },
    { action: 'clearContent', icon: '🗑️', label: 'Clear Content' },
    { action: 'clearFormat', icon: '🧹', label: 'Clear Formatting' }
];

const SHORTCUT_SECTIONS = [
    {
        title: 'Navigation',
        items: [
            { keys: 'Arrow Keys', desc: 'Move selection' },
            { keys: 'Tab', desc: 'Move right' },
            { keys: ['Shift', 'Tab'], desc: 'Move left' },
            { keys: 'Enter', desc: 'Edit cell / Move down' }
        ]
    },
    {
        title: 'Editing',
        items: [
            { keys: ['Delete', 'Backspace'], desc: 'Clear cell content', separator: ' / ' },
            { keys: 'Escape', desc: 'Cancel editing / Clear selection' },
            { keys: ['Ctrl/Cmd', 'Z'], desc: 'Undo' },
            { keys: ['Ctrl/Cmd', 'Y'], desc: 'Redo' }
        ]
    },
    {
        title: 'Selection',
        items: [
            { keys: ['Ctrl/Cmd', 'A'], desc: 'Select all cells' },
            { keys: ['Ctrl/Cmd', 'Drag'], desc: 'Range selection' },
            { keys: ['Ctrl/Cmd', 'Click'], desc: 'Add/remove from selection' }
        ]
    },
    {
        title: 'Clipboard',
        items: [
            { keys: ['Ctrl/Cmd', 'C'], desc: 'Copy' },
            { keys: ['Ctrl/Cmd', 'X'], desc: 'Cut' },
            { keys: ['Ctrl/Cmd', 'V'], desc: 'Paste' }
        ]
    },
    {
        title: 'Other',
        items: [
            { keys: 'Context Menu', desc: 'Open context menu' },
            { keys: 'Right Click', desc: 'Open context menu' },
            { keys: 'Double Click', desc: 'Edit cell' }
        ]
    }
];

const renderContextMenuHtml = () => `
    <div id="contextMenu" class="context-menu hidden">
        ${CONTEXT_MENU_ITEMS.map(item => item.separator
            ? `<div class="context-menu-separator"${item.id ? ` id="${item.id}"` : ''}></div>`
            : `<div class="context-menu-item${item.className ? ` ${item.className}` : ''}" data-action="${item.action}"${item.id ? ` id="${item.id}"` : ''}${item.style ? ` style="${item.style}"` : ''}>
                    <span class="context-menu-icon">${item.icon}</span>
                    <span>${item.label}</span>
                </div>`
        ).join('')}
    </div>
`;

const COMMENT_POPOVER_HTML = `
    <command id="commentPopoverCommand" label="Toggle cell comment" type="command" commandfor="cellCommentPopover"></command>
    <section id="cellCommentPopover" class="comment-popover hidden" popover="auto" role="note" aria-live="polite" aria-label="Cell comment">
        <header class="comment-popover__header">
            <div class="comment-popover__title">Comment</div>
            <button type="button" class="comment-popover__close" data-comment-close aria-label="Close comment">×</button>
        </header>
        <article class="comment-card" id="commentMainCard">
            <div class="comment-card__meta">
                <div class="comment-card__meta-left">
                    <img id="commentMainAvatar" class="comment-popover__avatar" alt="">
                    <div class="comment-popover__meta-text">
                        <div class="comment-popover__author" id="commentMainAuthor"></div>
                        <div class="comment-popover__timestamp" id="commentMainTime"></div>
                    </div>
                </div>
                <div class="comment-card__actions">
                    <button type="button" class="comment-menu__toggle" data-comment-target="root" aria-label="Comment actions">⋯</button>
                    <div class="comment-menu hidden" data-comment-menu="root">
                        <button type="button" data-comment-action="edit" data-comment-target="root">Edit</button>
                        <button type="button" data-comment-action="delete" data-comment-target="root">Delete</button>
                        <button type="button" data-comment-action="copy-link" data-comment-target="root">Copy link</button>
                    </div>
                </div>
            </div>
            <div class="comment-card__body">
                <div id="commentMainDisplay" class="comment-body"></div>
                <div id="commentMainEditor" class="comment-editor-inline hidden">
                    <textarea id="commentMainTextarea" class="form-control" rows="4" placeholder="Add a comment"></textarea>
                    <label class="comment-editor__checkbox">
                        <input type="checkbox" id="commentMainAnonymous">
                        <span>Anonymous comment</span>
                    </label>
                    <div class="comment-editor__actions">
                        <button type="button" class="btn btn--sm" data-comment-action="cancel-edit" data-comment-target="root">Cancel</button>
                        <button type="button" class="btn btn--sm toolbar-btn" data-comment-action="save-edit" data-comment-target="root">Save</button>
                    </div>
                </div>
            </div>
        <div class="comment-reactions" id="commentMainReactions"></div>
    </article>
    <div class="comment-popover__thread" id="cellCommentThread" aria-live="polite"></div>
    <div class="comment-reply-composer hidden" id="commentReplyComposer">
        <textarea id="commentReplyTextarea" class="form-control" rows="3" placeholder="Reply…"></textarea>
        <label class="comment-editor__checkbox">
            <input type="checkbox" id="commentReplyAnonymous">
            <span>Anonymous comment</span>
        </label>
            <div class="comment-editor__actions comment-reply-composer__actions">
                <button type="button" class="btn btn--sm toolbar-btn" data-comment-action="add-reply">Reply</button>
            </div>
        </div>
    </section>
`;

const renderKeyboardShortcutsModal = () => {
    const renderKeys = ({ keys, separator = ' + ' }) => {
        const parts = Array.isArray(keys) ? keys : [keys];
        return parts.map(key => `<kbd>${key}</kbd>`).join(separator);
    };

    const sections = SHORTCUT_SECTIONS.map(section => `
        <div class="shortcuts-section">
            <h3 class="shortcuts-section__title">${section.title}</h3>
            <div class="shortcuts-list">
                ${section.items.map(item => `
                    <div class="shortcut-item">
                        ${renderKeys(item)}
                        <span>${item.desc}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    return `
        <div id="keyboardShortcutsModal" class="shortcuts-modal hidden" role="dialog" aria-modal="true" aria-labelledby="shortcutsModalTitle">
            <div class="shortcuts-modal__backdrop" data-modal-dismiss></div>
            <div class="shortcuts-modal__dialog">
                <div class="shortcuts-modal__header">
                    <h2 id="shortcutsModalTitle">Keyboard Shortcuts</h2>
                    <button class="shortcuts-modal__close" type="button" data-modal-dismiss aria-label="Close">×</button>
                </div>
                <div class="shortcuts-modal__body">${sections}</div>
            </div>
        </div>
    `;
};

const CODEBERG_API_BASE = 'https://codeberg.org/api/v1';
const CODEBERG_OAUTH_AUTHORIZE = 'https://codeberg.org/login/oauth/authorize';
const CODEBERG_OAUTH_TOKEN = 'https://codeberg.org/login/oauth/access_token';

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

class SpreadsheetApp {
    constructor() {
        this.persistedRange = { maxRow: 19, maxCol: 9 };
        this.container = document.querySelector('.spreadsheet-container');
        if (!this.container) {
            throw new Error('Spreadsheet container not found');
        }
        this.buildUI();

        // Configuration from application data
        this.config = {
            initialRows: 1000,
            initialCols: 26,
            rowBatchSize: 1000,
            colBatchSize: 26,
            rowExtensionThreshold: 80,
            colExtensionThreshold: 10,
            maxRows: 0,
            maxCols: 0,
            cellWidth: 80,
            cellHeight: 32,
            headerHeight: 32,
            rowHeaderWidth: 50,
            colors: ['#ffeb3b', '#4caf50', '#f44336', '#9c27b0', '#ff9800', '#2196f3', '#00bcd4', '#cddc39']
        };

        // State management
        this.selectedCells = new Set();
        this.selectedCellCoords = new Set();
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.isDragging = false;
        this.isCtrlDragging = false;
        this.dragStartCell = null;
        this.currentEditingCell = null;
        this.currentEditorSelection = null;
        this.editorSelectionListener = null;
        this.pendingFormattingInteraction = null;
        this.activeFormattingInteraction = null;
        this.isToolbarFormattingInteraction = false;
        this.isPaletteInteraction = false;
        this.isFontSizeEditing = false;
        this.isPaletteFieldEditing = false;
        this.fontSizeBlurAllowed = false;
        this.fontSizeBlurReason = null;
        this.skipNextFontSizeChange = false;
        this.lastInlineFontSize = null;
        this.pendingEditorRefocus = false;
        this.editorBlurTimeout = null;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells = new Set();
        this.renderedCellCoords = new Set();
        this.rowHeightChoicePopover = null;
        this.rowHeightChoiceOutsideHandler = null;
        
        // Merged cells tracking
        this.mergedCells = new Map(); // Map of parent cell coord -> {rows, cols, childCells: Set}
        this.cellToMergeParent = new Map(); // Map of child cell coord -> parent cell coord
        this.initialMergedCells = [];

        // Edge scrolling state
        this.edgeScrolling = false;
        this.edgeScrollInterval = null;
        this.edgeScrollSpeed = { x: 0, y: 0 };
        this.activeCommentEditTarget = null; // 'root' | reply id
        this.highlightedReplyId = null;

        // Resize state
        this.isResizing = false;
        this.resizeType = null; // 'row' or 'column'
        this.resizeIndex = null;
        this.resizeStartPos = null;
        this.resizeStartSize = null;
        this.justResized = false;
        this.resizeAnimationFrame = null;
        this.resizeIndicator = null;
        this.resizeGuide = null;

        // Zoom state
        this.zoomLevel = 1.0; // 100%
        this.minZoom = 0.5;   // 50%
        this.maxZoom = 2.0;   // 200%
        this.zoomStep = 0.1;  // 10% increments
        this.zoomEditing = false;
        this.zoomDisplayInput = null;
        this.theme = 'dark';
        this.themeKey = 'verbosecell-theme';
        this.themeMediaQuery = null;
        this.handleSystemThemeChange = (event) => this.onSystemThemeChange(event);

        // Undo/Redo system
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;
        
        // Custom colors
        this.customBackgroundColors = [];
        this.customFontColors = [];
        this.customBorderColors = [];
        this.customColorPickerPointerDown = false;
        this.customColorPickerReleaseGuard = false;
        this.customColorPickerReleaseGuardTimer = null;
        this.colorUsage = {
            background: [],
            font: [],
            border: []
        };

        // Grid data
        this.cellData = new Map();
        this.rowHeights = new Map(); // Store custom row heights
        this.autoRowHeights = new Map(); // Store auto-calculated row heights (non-explicit)
        this.rowHeightModes = new Map(); // Track whether a row height is 'explicit' or 'implicit'
        this.columnWidths = new Map(); // Store custom column widths
        this.visibleRows = { start: 0, end: 30 };
        this.visibleCols = { start: 0, end: 20 };
        this.defaultCellStyle = {};
        this.rowStyles = new Map();
        this.columnStyles = new Map();
        this.cellStyleMeta = new Map(); // Track last-applied sequence per style prop per cell
        this.defaultStyleMeta = {}; // Track last-applied sequence for default styles
        this.styleSequence = 1;
        this.initialRowStyles = new Map();
        this.initialColumnStyles = new Map();
        this.initialCellStyleMeta = new Map();
        this.initialDefaultStyleMeta = {};
        this.rowDefaultHeightOverrides = new Map();
        this.initialAutoRowHeights = new Map();
        this.initialDefaultRowHeight = this.defaultAutoRowHeight;
        this.initialRowDefaultHeightOverrides = new Map();
        this.initialDefaultCellStyle = this.cloneDefaultCellStyle();
        this.initialRowHeightModes = new Map();
        this.fullSheetSelection = false;
        this.blockNextNativeContextMenu = false;
        this.lastContextMenuPosition = null;
        this.initializeRowHeightMetrics();

        // DOM elements
        this.gridContainer = this.container.querySelector('.grid-container');
        if (!this.gridContainer) {
            throw new Error('Grid container not found');
        }
        const $ = (id) => document.getElementById(id);
        Object.assign(this, {
            mainGrid: $('mainGrid'),
            gridContent: $('gridContent'),
            columnHeaders: $('columnHeaderContent'),
            rowHeaders: $('rowHeaderContent'),
            cornerCell: this.container.querySelector('.corner-cell'),
            zoomDisplay: $('zoomDisplay'),
            cellReference: $('cellReference'),
            formulaInput: $('formulaInput'),
            contextMenu: $('contextMenu'),
            colorPalette: $('colorPalette'),
            fontColorPalette: $('fontColorPalette'),
            linkEditor: $('linkEditor'),
            borderMenu: $('borderMenu'),
            commentPopover: $('cellCommentPopover'),
            commentPopoverText: $('cellCommentText'),
            commentPopoverAuthor: $('cellCommentAuthor'),
            commentPopoverTime: $('cellCommentTime'),
            commentPopoverAvatar: $('cellCommentAvatar'),
            commentPopoverThread: $('cellCommentThread'),
            commentPopoverReplyBtn: $('cellCommentReplyBtn'),
            commentPopoverCommand: $('commentPopoverCommand'),
            commentMainAvatar: $('commentMainAvatar'),
            commentMainAuthor: $('commentMainAuthor'),
            commentMainTime: $('commentMainTime'),
            commentMainDisplay: $('commentMainDisplay'),
            commentMainEditor: $('commentMainEditor'),
            commentMainTextarea: $('commentMainTextarea'),
            commentMainAnonymous: $('commentMainAnonymous'),
            commentMainReactions: $('commentMainReactions'),
            commentReplyTextarea: $('commentReplyTextarea'),
            commentReplyAnonymous: $('commentReplyAnonymous'),
            commentReplyComposer: $('commentReplyComposer'),
            codebergProfileContainer: $('codebergProfile'),
            codebergAvatarImg: $('codebergAvatarImg'),
            codebergAvatarInitials: $('codebergAvatarInitials'),
            codebergProfileBadge: $('codebergProfileBadge'),
            codebergOrgAvatar: $('codebergOrgAvatar'),
            codebergOrgAvatarImg: $('codebergOrgAvatarImg'),
            codebergOrgAvatarInitials: $('codebergOrgAvatarInitials'),
            codebergProfileName: $('codebergProfileName'),
            codebergProfileHint: $('codebergProfileHint'),
            codebergProfileMeta: $('codebergProfileMeta')
        });
        this.commentMainAuthorState = {
            author: this.getLocalAuthorPlaceholder(),
            profileUrl: ''
        };
        this.commentMenuToggleIgnoreClick = null;
        this.replyAnonDrafts = new Map();
        this.authorPreviewCache = new Map();
        this.authorPreviewCard = null;
        this.authorPreviewShowTimer = null;
        this.authorPreviewHideTimer = null;
        this.activeAuthorPreview = null;
        this.commentEditor = null;
        this.commentEditorTextarea = null;
        this.commentEditorAnonymous = null;
        this.commentEditorResolver = null;
        if (this.zoomDisplay) {
            this.zoomDisplay.setAttribute('role', 'button');
            this.zoomDisplay.setAttribute('title', 'Click to set zoom');
            this.zoomDisplay.setAttribute('tabindex', '0');
        }
        this.contextMenuContext = { type: 'cell' };
        if (this.codebergProfileMeta) {
            this.codebergProfileMeta.style.display = 'none';
        }
        this.codebergRepo = null;
        this.repoConfigPromise = null;
        this.repoConfig = null;
        this.oauthConfigPromise = null;
        this.oauthConfig = null;
        this.accessTokenInfo = null;
        this.branchCommitSnapshot = null;
        this.branchCommitLatest = null;
        this.branchCommitLoadPromise = null;
        this.loadInitialDataFromDOM();
        this.initializeStyleMetadataFromData();
        this.recomputeColorUsageFromData();
        this.initializeDynamicDimensions();
        this.recalculateAutoRowHeights();
        this.initialColorUsage = this.cloneColorUsage();
        this.initialMergedCells = this.cloneMergedCellsState();
        this.initialCellData = this.cloneCellData(this.cellData);
        this.initialRowStyles = this.cloneStyleMap(this.rowStyles);
        this.initialColumnStyles = this.cloneStyleMap(this.columnStyles);
        this.initialCellStyleMeta = this.cloneStyleMap(this.cellStyleMeta);
        this.initialDefaultStyleMeta = this.cloneStyleMeta(this.defaultStyleMeta);
        this.initialRowHeights = new Map(this.rowHeights);
        this.initialAutoRowHeights = new Map(this.autoRowHeights);
        this.initialDefaultRowHeight = this.defaultAutoRowHeight;
        this.initialDefaultCellStyle = this.cloneDefaultCellStyle();
        this.initialRowHeightModes = new Map(this.rowHeightModes);
        this.initialColumnWidths = new Map(this.columnWidths);
        this.initialPersistedRange = { ...this.persistedRange };
        this.initialStyleSequence = this.styleSequence;
        
        // Select cell A1 by default
        setTimeout(() => {
            const firstCell = this.getCellAt(0, 0) || this.createCell(0, 0);
            this.selectCells([firstCell], true);
            this.maybeOpenCommentFromUrl();
        }, 120);
        this.ensureSaveOptionsModal();
        this.maybeHandleOAuthRedirect();
        this.saveButton = document.getElementById('saveBtn');
        this.saveButtonBadge = document.getElementById('saveBtnBadge');
        this.localDraftKey = 'verbosecell-draft-v1';
        this.dirtyUpdateScheduled = false;
        this.draftSaveTimer = null;
        this.latestDiffEntries = [];
        this.latestDiffTotal = 0;
        this.latestDiffTruncated = false;
        this.unsavedChanges = false;
        this.persistDelayMs = 400;
        this.hasRestoredDraft = false;
        this.hasAutoPersistedBaseline = false;
        this.userMadeChanges = false;
        this.currentUserLogin = null;
        this.restoreDraftIfAvailable();
        this.updateSaveIndicator(false);
        this.updateDirtyState({ persist: false });
        
        this.clipboard = {
            data: null,
            mode: null, // 'copy' or 'cut'
            sourceCells: null, // Store original cell coordinates for cut
            origin: null // Top-left source cell for relative formula adjustments
        };

        // Format painter
        this.formatPainter = {
            active: false,
            formats: null,
            patternWidth: null,
            patternHeight: null,
            sourceCoords: null,
            awaitingCtrlRelease: false
        };

        this.formulaFunctions = this.createFormulaFunctions();
        this.formulaFunctionsMap = new Map(this.formulaFunctions.map(fn => [fn.name, fn]));

        this.formulaSuggestionsPanel = document.getElementById('formulaSuggestions');
        this.formulaSuggestionState = this.createDefaultFormulaSuggestionState();

        this.init();
        this.refreshCodebergProfileBadge().catch(error => {
            console.warn('Failed to load Codeberg profile avatar', error);
        });
        this.primeBranchCommitCache();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.generateHeaders();
        this.generateInitialGrid();
        this.refreshPalettes();
        this.updateUndoRedoButtons();
        this.updateZoomDisplay();
        this.log('Spreadsheet initialized');
    }
    
    updateUI() {
        this.updateCellReference();
        this.updateFormulaBar();
        this.updateFormattingButtons();
        this.updateFontSizeInput();
        this.updateFontColorButton();
        this.updateBackgroundColorButton();
        this.updateCommentPopover();
        this.renderSelectionOverlays();
    }

    updateCommentPopover() {
        if (!this.commentPopover) return;

        const activeElement = document.activeElement;
        const preserveFocusInfo = (activeElement && this.commentPopover.contains(activeElement))
            ? this.captureCommentPopoverFocus(activeElement)
            : null;

        // Hide popover while dragging a multi-cell selection so it does not obstruct selection
        if (this.isDragging && this.selectedCellCoords.size > 1) {
            this.hideCommentPopover();
            return;
        }

        if (!this.primaryCell) {
            if (this.commentReplyComposer) this.commentReplyComposer.classList.add('hidden');
            this.hideCommentPopover();
            return;
        }

        const coord = this.getCoord(this.primaryCell);
        const commentData = this.primaryCell
            ? this.normalizeCommentData(this.cellData.get(coord)?.comment)
            : null;
        this.activeCommentCoord = coord;
        const editingRoot = this.activeCommentEditTarget === 'root';
        if (!commentData?.text && !editingRoot) {
            if (this.commentReplyComposer) this.commentReplyComposer.classList.add('hidden');
            this.hideCommentPopover();
            return;
        }

        const isLoggedIn = Boolean(this.currentUserLogin);
        const defaultAuthor = isLoggedIn
            ? (this.currentUserLogin || this.codebergProfileName?.textContent?.trim() || 'Anonymous')
            : this.getLocalAuthorPlaceholder();
        const baseComment = commentData && typeof commentData === 'object'
            ? this.cloneCommentEntry(commentData)
            : null;
        const hydratedComment = this.ensureCommentIds(coord, baseComment || {
            text: '',
            author: defaultAuthor,
            authorId: isLoggedIn ? this.currentUserLogin : null,
            profileUrl: isLoggedIn ? this.buildAccountProfileUrl(this.currentUserLogin) : '',
            avatar: this.getActiveUserAvatar(),
            at: commentData?.at ?? null,
            anonymous: !isLoggedIn,
            anonymousReason: isLoggedIn ? null : 'unauthenticated',
            localOnly: true,
            replies: [],
            reactions: []
        });
        const needsIdPersist = baseComment && (!baseComment.id || (Array.isArray(baseComment.replies) && baseComment.replies.some(reply => !reply?.id)));
        if (needsIdPersist) {
            this.updateCellDataEntry(coord, data => {
                if (!data.comment) return;
                data.comment = this.ensureCommentIds(coord, this.normalizeCommentData(data.comment) || hydratedComment);
            });
        }
        const editingFallbackAuthor = this.currentUserLogin || this.getLocalAuthorPlaceholder();
        const author = hydratedComment.author || defaultAuthor;
        const timestampDisplay = hydratedComment.at ? this.formatCommentTimestamp(hydratedComment.at) : '';
        const avatarSrc = this.getCommentAvatarSrc(hydratedComment);
        this.setCommentMainAuthorState(
            editingRoot ? editingFallbackAuthor : author,
            editingRoot && this.currentUserLogin ? this.buildAccountProfileUrl(this.currentUserLogin) : (hydratedComment.profileUrl || '')
        );
        if (this.commentMainTime) {
            this.commentMainTime.textContent = timestampDisplay;
        }
        if (this.commentMainAvatar) {
            this.commentMainAvatar.src = avatarSrc;
            this.commentMainAvatar.alt = author ? `${author}'s avatar` : 'Comment author avatar';
        }

        const rootMenu = this.commentPopover.querySelector('[data-comment-menu="root"]');
        const rootMenuToggle = this.commentPopover.querySelector('.comment-menu__toggle[data-comment-target="root"]');
        const canEditRoot = this.canEditCommentEntry(hydratedComment);
        const hasCommentBody = Boolean(hydratedComment.text && `${hydratedComment.text}`.trim().length);
        const showRootMenu = hasCommentBody;
        if (rootMenuToggle) {
            rootMenuToggle.disabled = !showRootMenu;
            rootMenuToggle.classList.toggle('hidden', !showRootMenu);
        }
        if (rootMenu) {
            const editBtn = rootMenu.querySelector('[data-comment-action="edit"]');
            const deleteBtn = rootMenu.querySelector('[data-comment-action="delete"]');
            const copyBtn = rootMenu.querySelector('[data-comment-action="copy-link"]');
            rootMenu.classList.add('hidden');
            rootMenu.classList.remove('open');
            if (editBtn) editBtn.disabled = !canEditRoot;
            if (deleteBtn) deleteBtn.disabled = !canEditRoot || !hasCommentBody;
            if (copyBtn) copyBtn.disabled = !hasCommentBody;
        }
        if (this.commentPopover) {
            this.commentPopover.querySelectorAll('.comment-menu').forEach(menu => {
                menu.classList.add('hidden');
                menu.classList.remove('open');
            });
        }

        if (this.commentMainDisplay) {
            this.commentMainDisplay.innerHTML = this.renderCommentRichText(hydratedComment.text);
            this.commentMainDisplay.classList.toggle('hidden', editingRoot);
        }
        if (this.commentMainEditor) {
            this.commentMainEditor.classList.toggle('hidden', !editingRoot);
            if (editingRoot && this.commentMainTextarea) {
                const hydrateKey = coord || '';
                const alreadyHydrated = this.commentMainTextarea.dataset.hydratedFor === hydrateKey;
                if (!alreadyHydrated) {
                    this.commentMainTextarea.value = hydratedComment.text || '';
                    this.commentMainTextarea.dataset.hydratedFor = hydrateKey;
                }
            } else if (this.commentMainTextarea?.dataset) {
                delete this.commentMainTextarea.dataset.hydratedFor;
            }
            if (this.commentMainAnonymous) {
                if (!editingRoot) {
                    delete this.commentMainAnonymous.dataset.hydrated;
                } else if (!this.commentMainAnonymous.dataset.hydrated) {
                    const shouldHydrateAnon = hasCommentBody ? Boolean(hydratedComment.anonymous) : false;
                    this.commentMainAnonymous.checked = shouldHydrateAnon;
                    this.commentMainAnonymous.dataset.hydrated = 'true';
                }
                this.commentMainAnonymous.disabled = false;
            }
        }
        this.renderCommentMainAuthorLabel(editingRoot);

        if (this.commentMainReactions) {
            const reactionsHtml = hydratedComment.text
                ? this.renderReactionChips(hydratedComment, {
                    allowAdd: Boolean(this.currentUserLogin),
                    target: 'root'
                })
                : '';
            this.commentMainReactions.innerHTML = reactionsHtml;
            this.commentMainReactions.classList.toggle('hidden', !reactionsHtml || editingRoot);
        }

        if (this.commentPopoverThread) {
            const replies = Array.isArray(hydratedComment.replies) ? hydratedComment.replies.filter(entry => entry?.text) : [];
            const repliesWithDrafts = replies.map(entry => {
                const draft = this.replyAnonDrafts?.get(entry?.id);
                if (!draft || typeof draft.anonymous !== 'boolean') return entry;
                const override = { ...entry, anonymous: draft.anonymous };
                if (draft.anonymous) {
                    override.author = 'Anonymous';
                    override.profileUrl = '';
                } else {
                    const resolved = this.resolveReplyAuthorForDisplay(entry);
                    override.author = resolved.author;
                    override.profileUrl = resolved.profileUrl;
                }
                override.edited = entry.edited;
                return override;
            });
            if (!replies.length) {
                this.commentPopoverThread.innerHTML = '';
                this.commentPopoverThread.classList.add('hidden');
            } else {
                this.commentPopoverThread.classList.remove('hidden');
                this.commentPopoverThread.innerHTML = this.renderRepliesHTML(repliesWithDrafts, coord, {
                    highlightId: this.highlightedReplyId,
                    allowAddReactions: Boolean(this.currentUserLogin)
                });
            }
        }

        const replyHydrateKey = `reply-${coord}`;
        if (this.commentReplyTextarea) {
            const hydratedFor = this.commentReplyTextarea.dataset.hydratedFor;
            if (hydratedFor !== replyHydrateKey) {
                this.commentReplyTextarea.value = '';
                this.commentReplyTextarea.dataset.hydratedFor = replyHydrateKey;
            }
        }
        if (this.commentReplyAnonymous) {
            const hydratedFor = this.commentReplyAnonymous.dataset.hydratedFor;
            if (hydratedFor !== replyHydrateKey) {
                this.commentReplyAnonymous.checked = false;
                this.commentReplyAnonymous.disabled = false;
                this.commentReplyAnonymous.dataset.hydratedFor = replyHydrateKey;
            }
        }
        if (this.commentReplyComposer) {
            this.commentReplyComposer.classList.toggle('hidden', !(hasCommentBody && !editingRoot));
        }

        const rect = this.primaryCell.getBoundingClientRect?.();
        if (!rect || (!rect.width && !rect.height)) {
            this.hideCommentPopover();
            return;
        }
        const margin = 8;
        const assumedWidth = this.commentPopover.offsetWidth || 320;
        let left = rect.right + margin;
        let top = rect.top - margin;

        if (left + assumedWidth > window.innerWidth - margin) {
            left = Math.max(margin, window.innerWidth - assumedWidth - margin);
        }
        if (top < margin) {
            top = rect.bottom + margin;
        }

        this.commentPopover.style.left = `${left}px`;
        this.commentPopover.style.top = `${top}px`;
        this.commentPopover.classList.remove('hidden');
        if (typeof this.commentPopover.showPopover === 'function') {
            try { this.commentPopover.showPopover(); } catch (error) { /* noop */ }
        }

        if (preserveFocusInfo) {
            this.restoreCommentPopoverFocus(preserveFocusInfo);
        }
    }

    setCommentMainAuthorState(author, profileUrl) {
        const resolvedAuthor = (() => {
            const candidate = `${author || ''}`.trim();
            if (candidate && candidate.toLowerCase() !== 'local preview' && candidate.toLowerCase() !== 'spreadsheet') {
                return candidate;
            }
            return this.getLocalAuthorPlaceholder() || 'Anonymous';
        })();
        this.commentMainAuthorState = {
            author: resolvedAuthor,
            profileUrl: profileUrl ? String(profileUrl).trim() : ''
        };
        this.updateAuthorLinkDataset(this.commentMainAuthor, resolvedAuthor, profileUrl);
    }

    renderCommentMainAuthorLabel(editingRoot = false) {
        if (!this.commentMainAuthor) return;
        const showAnonymous = editingRoot && Boolean(this.commentMainAnonymous?.checked);
        if (showAnonymous) {
            this.commentMainAuthor.textContent = 'Anonymous';
            return;
        }
        const state = this.commentMainAuthorState || {};
        const loggedInAuthor = this.currentUserLogin
            ? (this.codebergProfileName?.textContent?.trim() || this.currentUserLogin)
            : null;
        const fallbackAuthor = loggedInAuthor
            ? (loggedInAuthor || this.getLocalAuthorPlaceholder())
            : (this.getLocalAuthorPlaceholder() || '$USER');
        const existingAuthor = state.author || '';
        const author = existingAuthor
            ? existingAuthor
            : (editingRoot ? fallbackAuthor : (fallbackAuthor || 'Anonymous'));
        let profileUrl = state.profileUrl || '';
        if (!profileUrl && editingRoot && this.currentUserLogin) {
            profileUrl = this.buildAccountProfileUrl(this.currentUserLogin);
        }
        console.log('[comments] renderCommentMainAuthorLabel', {
            author,
            profileUrl,
            editingRoot,
            placeholder: this.getLocalAuthorPlaceholder(),
            loggedInAuthor
        });
        this.commentMainAuthor.textContent = '';
        if (profileUrl) {
            const link = document.createElement('a');
            link.href = profileUrl;
            link.textContent = author;
            link.target = '_blank';
            link.rel = 'noreferrer noopener';
            this.updateAuthorLinkDataset(link, author, profileUrl);
            this.commentMainAuthor.appendChild(link);
        } else {
            this.commentMainAuthor.textContent = author;
        }
    }

    hideCommentPopover() {
        if (!this.commentPopover) return;
        this.activeCommentEditTarget = null;
        this.highlightedReplyId = null;
        this.replyAnonDrafts.clear();
        this.commentPopover.classList.add('hidden');
        if (this.commentReplyComposer) {
            this.commentReplyComposer.classList.add('hidden');
        }
        if (typeof this.commentPopover.hidePopover === 'function') {
            try { this.commentPopover.hidePopover(); } catch (error) { /* noop */ }
        }
    }

    captureCommentPopoverFocus(activeElement) {
        if (!activeElement) return null;
        const dataTarget = activeElement.dataset?.replyTextarea || activeElement.dataset?.replyAnon || null;
        const selectionStart = (activeElement instanceof HTMLTextAreaElement || activeElement instanceof HTMLInputElement)
            ? activeElement.selectionStart
            : null;
        const selectionEnd = (activeElement instanceof HTMLTextAreaElement || activeElement instanceof HTMLInputElement)
            ? activeElement.selectionEnd
            : null;
        return {
            id: activeElement.id || null,
            dataTarget,
            selectionStart,
            selectionEnd
        };
    }

    restoreCommentPopoverFocus(info) {
        if (!info) return;
        const cssEscape = (value) => {
            if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(value);
            return `${value}`.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
        };
        let target = null;
        if (info.id) {
            target = document.getElementById(info.id);
        }
        if (!target && info.dataTarget) {
            const escaped = cssEscape(info.dataTarget);
            target = this.commentPopover?.querySelector(`[data-reply-textarea=\"${escaped}\"]`) ||
                this.commentPopover?.querySelector(`[data-reply-anon=\"${escaped}\"]`);
        }
        if (!target || document.activeElement === target) return;
        target.focus({ preventScroll: true });
        if ((target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) &&
            info.selectionStart != null) {
            const end = info.selectionEnd ?? info.selectionStart;
            target.setSelectionRange(info.selectionStart, end);
        }
    }

    renderBorderOverlays() {
        if (!this.gridContent) return;

        if (!this.borderOverlayLayer) {
            this.borderOverlayLayer = document.createElement('div');
            this.borderOverlayLayer.className = 'border-overlay-layer';
        }

        this.borderOverlayLayer.innerHTML = '';

        const cells = Array.from(this.gridContent.querySelectorAll('.cell'));
        if (!cells.length) {
            if (this.borderOverlayLayer.parentNode) this.borderOverlayLayer.remove();
            return;
        }

        const cellMap = new Map();
        const renderCells = new Set();
        const representativeCells = new Map();
        cells.forEach(cell => {
            const { row, col } = this.getCellPos(cell);
            const mergeParent = this.getMergeParent(row, col);
            const mergeKey = mergeParent ? `${mergeParent.row},${mergeParent.col}` : `${row},${col}`;
            const parentCell = mergeParent ? this.getCellAt(mergeParent.row, mergeParent.col) : null;

            let renderCell = representativeCells.get(mergeKey);
            if (parentCell && parentCell !== renderCell) {
                renderCell = parentCell;
                representativeCells.set(mergeKey, parentCell);
            }
            if (!renderCell) {
                renderCell = cell;
                representativeCells.set(mergeKey, renderCell);
            }

            cellMap.set(`${row},${col}`, renderCell);
            renderCells.add(renderCell);
        });

        const parseBorder = (borderStr) => {
            if (!borderStr) return null;
            const match = borderStr.match(/([\d.]+)px\s+([a-zA-Z]+)\s+(.+)/);
            if (!match) return null;
            const [, widthStr, style, color] = match;
            const width = parseFloat(widthStr);
            if (Number.isNaN(width) || width <= 0) return null;
            return { width, thickness: width, style: style.toLowerCase(), color };
        };

        const sameBorder = (a, b) => {
            if (!a || !b) return false;
            return a.width === b.width && a.style === b.style && a.color === b.color;
        };

        const addLine = (x, y, w, h, info, isVertical, strokeWidth = null) => {
            if (!info) return;
            const sw = strokeWidth == null ? info.width : strokeWidth;
            const line = document.createElement('div');
            line.className = 'border-overlay-line';
            line.style.left = `${x}px`;
            line.style.top = `${y}px`;
            line.style.width = `${w}px`;
            line.style.height = `${h}px`;

            if (info.style === 'dashed') {
                const dash = sw * 3;
                const gap = sw * 2;
                if (isVertical) {
                    line.style.backgroundImage = `repeating-linear-gradient(to bottom, ${info.color} 0, ${info.color} ${dash}px, transparent ${dash}px, transparent ${dash + gap}px)`;
                } else {
                    line.style.backgroundImage = `repeating-linear-gradient(to right, ${info.color} 0, ${info.color} ${dash}px, transparent ${dash}px, transparent ${dash + gap}px)`;
                }
            } else if (info.style === 'dotted') {
                const dot = sw;
                const gap = Math.max(dot + 1, Math.round(sw * 2));
                if (isVertical) {
                    line.style.backgroundImage = `repeating-linear-gradient(to bottom, ${info.color} 0, ${info.color} ${dot}px, transparent ${dot}px, transparent ${dot + gap}px)`;
                } else {
                    line.style.backgroundImage = `repeating-linear-gradient(to right, ${info.color} 0, ${info.color} ${dot}px, transparent ${dot}px, transparent ${dot + gap}px)`;
                }
            } else {
                line.style.background = info.color;
            }
            this.borderOverlayLayer.appendChild(line);
        };

        const getCellBounds = (cell, row, col) => {
            let baseRow = row;
            let baseCol = col;
            let mergedRows = parseInt(cell.dataset.mergedRows || '1', 10);
            let mergedCols = parseInt(cell.dataset.mergedCols || '1', 10);

            const mergeParent = this.getMergeParent(row, col);
            if (mergeParent) {
                baseRow = mergeParent.row;
                baseCol = mergeParent.col;
                const mergeInfo = this.mergedCells.get(`${baseRow},${baseCol}`);
                if (mergeInfo) {
                    mergedRows = mergeInfo.rows;
                    mergedCols = mergeInfo.cols;
                }
            }

            let width = 0;
            for (let c = 0; c < mergedCols; c++) {
                width += this.getColumnWidth(baseCol + c);
            }
            let height = 0;
            for (let r = 0; r < mergedRows; r++) {
                height += this.getRowHeight(baseRow + r);
            }
            const left = this.getColumnLeft(baseCol);
            const top = this.getRowTop(baseRow);
            return { left, top, width, height, mergedRows, mergedCols, baseRow, baseCol };
        };

        renderCells.forEach(cell => {
            let { row, col } = this.getCellPos(cell);
            const mergeParent = this.getMergeParent(row, col);
            if (mergeParent) {
                row = mergeParent.row;
                col = mergeParent.col;
            }

            const { left, top, width, height, mergedRows, mergedCols } = getCellBounds(cell, row, col);

            const topInfo = parseBorder(cell.dataset.borderTop || '');
            const bottomInfo = parseBorder(cell.dataset.borderBottom || '');
            const leftInfo = parseBorder(cell.dataset.borderLeft || '');
            const rightInfo = parseBorder(cell.dataset.borderRight || '');

            const hasLeftNeighbor = col > 0;
            const hasRightNeighbor = (col + mergedCols - 1) < this.config.maxCols - 1;
            const hasAboveNeighbor = row > 0;
            const hasBelowNeighbor = (row + mergedRows - 1) < this.config.maxRows - 1;

            // Top edge: draw if present and not duplicated by above cell's bottom
            let topDrawn = false;
            if (topInfo) {
                let above = cellMap.get(`${row - 1},${col}`);
                if (above === cell) above = null;
                const aboveBottom = above ? parseBorder(above.dataset.borderBottom || '') : null;
                const same = aboveBottom && JSON.stringify(aboveBottom) === JSON.stringify(topInfo);
                if (!same || !above) {
                    const w = Math.max(1, Math.round(topInfo.width));
                    const startExtend = hasLeftNeighbor ? 0 : 1;
                    const endExtend = hasRightNeighbor ? 0 : 1;
                    // Extend 1px to the left without moving the right edge
                    let drawLeft = left - startExtend - 1;
                    let drawWidth = width + startExtend + endExtend + 1;
                    if (w === 1) {
                        const y = top - 1;
                        addLine(drawLeft, y, drawWidth, 1, topInfo, false, 1);
                    } else {
                        const count = (w * 2) - 1;
                        const center = top - 1;
                        const startOffset = -((count - 1) / 2);
                        for (let i = 0; i < count; i++) {
                            const y = center + startOffset + i;
                            addLine(drawLeft, y, drawWidth, 1, topInfo, false, 1);
                        }
                    }
                    topDrawn = true;
                }
            }

            // Left edge: draw if present and not duplicated by left cell's right
            let leftDrawn = false;
            if (leftInfo) {
                let leftCell = cellMap.get(`${row},${col - 1}`);
                if (leftCell === cell) leftCell = null;
                const leftRight = leftCell ? parseBorder(leftCell.dataset.borderRight || '') : null;
                const same = leftRight && JSON.stringify(leftRight) === JSON.stringify(leftInfo);
                if (!same || !leftCell) {
                    const w = Math.max(1, Math.round(leftInfo.width));
                    const drawTop = top - 1;
                    const drawHeight = height + 1;
                    if (w === 1) {
                        const x = left - 1;
                        addLine(x, drawTop, 1, drawHeight, leftInfo, true, 1);
                    } else {
                        const count = (w * 2) - 1;
                        const center = left - 1;
                        const startOffset = -((count - 1) / 2);
                        for (let i = 0; i < count; i++) {
                            const x = center + startOffset + i;
                            addLine(x, drawTop, 1, drawHeight, leftInfo, true, 1);
                        }
                    }
                    leftDrawn = true;
                }
            }

            // Right edge: draw if present and not duplicated by right cell's left
            let rightDrawn = false;
            if (rightInfo) {
                let rightCell = cellMap.get(`${row},${col + 1}`);
                if (rightCell === cell) rightCell = null;
                const rightLeft = rightCell ? parseBorder(rightCell.dataset.borderLeft || '') : null;
                const same = rightLeft && JSON.stringify(rightLeft) === JSON.stringify(rightInfo);
                if (!same || !rightCell) {
                    const w = Math.max(1, Math.round(rightInfo.width));
                    const center = left + width - 1;
                    const drawTop = top - 1;
                    const drawHeight = height + 1;
                    if (w === 1) {
                        const x = center;
                        addLine(x, drawTop, 1, drawHeight, rightInfo, true, 1);
                    } else {
                        const count = (w * 2) - 1;
                        const startOffset = -((count - 1) / 2);
                        for (let i = 0; i < count; i++) {
                            const x = center + startOffset + i;
                            addLine(x, drawTop, 1, drawHeight, rightInfo, true, 1);
                        }
                    }
                    rightDrawn = true;
                }
            }

            // Bottom edge: draw if present and not duplicated by below cell's top
            let bottomDrawn = false;
            if (bottomInfo) {
                let below = cellMap.get(`${row + 1},${col}`);
                if (below === cell) below = null;
                const belowTop = below ? parseBorder(below.dataset.borderTop || '') : null;
                const same = belowTop && JSON.stringify(belowTop) === JSON.stringify(bottomInfo);
                if (!same || !below) {
                    const w = Math.max(1, Math.round(bottomInfo.width));
                    const center = top + height - 1;
                    const startExtend = hasLeftNeighbor ? 0 : 1;
                    const endExtend = hasRightNeighbor ? 0 : 1;
                    // Extend 1px to the left without moving the right edge
                    const drawLeft = left - startExtend - 1;
                    const drawWidth = width + startExtend + endExtend + 1;
                    if (w === 1) {
                        const y = center;
                        addLine(drawLeft, y, drawWidth, 1, bottomInfo, false, 1);
                    } else {
                        const count = (w * 2) - 1;
                        const startOffset = -((count - 1) / 2);
                        for (let i = 0; i < count; i++) {
                            const y = center + startOffset + i;
                            addLine(drawLeft, y, drawWidth, 1, bottomInfo, false, 1);
                        }
                    }
                    bottomDrawn = true;
                }
            }

            // Corner fills (solid only) at outer edges actually drawn, sized like preview
            const cornerSize = w => (w <= 1 ? 1 : (Math.round(w) * 2) - 1);
            const drawCorner = (cx, cy, infoA, infoB) => {
                const size = cornerSize(Math.max(infoA.width, infoB.width));
                const half = Math.floor((size - 1) / 2);
                addLine(cx - half, cy - half, size, size, infoA, false, 1);
            };

            if (topInfo && leftInfo && topDrawn && leftDrawn && topInfo.style === 'solid' && leftInfo.style === 'solid' && (topInfo.width > 1 || leftInfo.width > 1)) {
                drawCorner(left - 1, top - 1, topInfo, leftInfo);
            }

            if (topInfo && rightInfo && topDrawn && rightDrawn && topInfo.style === 'solid' && rightInfo.style === 'solid' && (topInfo.width > 1 || rightInfo.width > 1)) {
                drawCorner(left + width - 1, top - 1, topInfo, rightInfo);
            }

            if (bottomInfo && leftInfo && bottomDrawn && leftDrawn && bottomInfo.style === 'solid' && leftInfo.style === 'solid' && (bottomInfo.width > 1 || leftInfo.width > 1)) {
                drawCorner(left - 1, top + height - 1, bottomInfo, leftInfo);
            }

            if (bottomInfo && rightInfo && bottomDrawn && rightDrawn && bottomInfo.style === 'solid' && rightInfo.style === 'solid' && (bottomInfo.width > 1 || rightInfo.width > 1)) {
                drawCorner(left + width - 1, top + height - 1, bottomInfo, rightInfo);
            }

            // Corner dots for 1px solid borders to avoid missing outer pixels
            const cornerDot = (cx, cy, infoA, infoB) => {
                if (infoA.style !== 'solid' || infoB.style !== 'solid') return;
                if (Math.round(infoA.width) !== 1 || Math.round(infoB.width) !== 1) return;
                addLine(cx, cy, 1, 1, infoA, false, 1);
            };

            if (topDrawn && leftDrawn && topInfo && leftInfo) {
                cornerDot(left - 1, top - 1, topInfo, leftInfo);
            }
            if (topDrawn && rightDrawn && topInfo && rightInfo) {
                cornerDot(left + width - 1, top - 1, topInfo, rightInfo);
            }
            if (bottomDrawn && leftDrawn && bottomInfo && leftInfo) {
                cornerDot(left - 1, top + height - 1, bottomInfo, leftInfo);
            }
            if (bottomDrawn && rightDrawn && bottomInfo && rightInfo) {
                cornerDot(left + width - 1, top + height - 1, bottomInfo, rightInfo);
            }
        });

        this.gridContent.appendChild(this.borderOverlayLayer);
    }
    
    // Convert cell element to coordinate string "row,col"
    getCoord(cell) {
        return `${cell.dataset.row},${cell.dataset.col}`;
    }

    // Parse coordinate string to [row, col] numbers
    parseCoord(coord) {
        return coord.split(',').map(Number);
    }

    coordToAddress(coord) {
        const [row, col] = this.parseCoord(coord);
        if (!Number.isInteger(row) || !Number.isInteger(col)) return coord;
        return this.getCellAddress(row, col);
    }

    describeMergedCells(source = this.mergedCells) {
        const entries = [];
        if (!(source instanceof Map)) return entries;
        source.forEach((info, coord) => {
            if (!info) return;
            const [row, col] = this.parseCoord(coord);
            const addr = this.getCellAddress(row, col);
            const cells = [];
            for (let r = 0; r < info.rows; r++) {
                for (let c = 0; c < info.cols; c++) {
                    cells.push(this.getCellAddress(row + r, col + c));
                }
            }
            entries.push(`${addr} ${info.rows}x${info.cols} -> ${cells.join(', ')}`);
        });
        return entries;
    }

    // Get row and col from cell as object
    getCellPos(cell) {
        return {
            row: parseInt(cell.dataset.row),
            col: parseInt(cell.dataset.col)
        };
    }

    // Get row and col from coordinate string as object
    getCoordPos(coord) {
        const [row, col] = this.parseCoord(coord);
        return { row, col };
    }

    cloneCellData(source = new Map()) {
        const clone = new Map();
        if (!source) return clone;
        source.forEach((value, key) => {
            if (value && typeof value === 'object') {
                clone.set(key, JSON.parse(JSON.stringify(value)));
            } else {
                clone.set(key, value);
            }
        });
        return clone;
    }

    cloneDefaultCellStyle(source = this.defaultCellStyle) {
        if (!source || typeof source !== 'object') return {};
        try {
            return JSON.parse(JSON.stringify(source));
        } catch (error) {
            return { ...source };
        }
    }

    cloneStyleMeta(source = {}) {
        if (!source || typeof source !== 'object') return {};
        return { ...source };
    }

    cloneStyleMap(source = new Map()) {
        const clone = new Map();
        if (!(source instanceof Map)) return clone;
        source.forEach((value, key) => {
            clone.set(key, this.cloneCellRecord(value));
        });
        return clone;
    }

    computeMaxStyleSequence() {
        let max = Number.isFinite(this.styleSequence) ? this.styleSequence : 1;
        const scanMeta = (meta) => {
            if (!meta || typeof meta !== 'object') return;
            Object.values(meta).forEach(seq => {
                const num = Number(seq);
                if (Number.isFinite(num)) {
                    max = Math.max(max, num);
                }
            });
        };
        const scanMapMeta = (map) => {
            if (!(map instanceof Map)) return;
            map.forEach(entry => scanMeta(entry?._meta));
        };

        scanMeta(this.defaultStyleMeta);
        scanMapMeta(this.rowStyles);
        scanMapMeta(this.columnStyles);
        if (this.cellStyleMeta instanceof Map) {
            this.cellStyleMeta.forEach(meta => scanMeta(meta));
        }
        return max;
    }

    nextStyleSequence() {
        const current = Number.isFinite(this.styleSequence) ? this.styleSequence : 1;
        this.styleSequence = current + 1;
        return this.styleSequence;
    }

    getCellStyleMeta(coord, create = false) {
        if (!this.cellStyleMeta) {
            this.cellStyleMeta = new Map();
        }
        let meta = this.cellStyleMeta.get(coord);
        if (!meta && create) {
            meta = {};
            this.cellStyleMeta.set(coord, meta);
        }
        return meta || null;
    }

    getDimensionStyle(kind, index, create = false) {
        const map = kind === 'row' ? this.rowStyles : this.columnStyles;
        if (!map) return null;
        if (map.has(index)) return map.get(index);
        const strKey = String(index);
        if (map.has(strKey)) return map.get(strKey);
        if (!create) return null;
        const entry = { _meta: {} };
        map.set(index, entry);
        return entry;
    }

    isStyleEntryEmpty(entry) {
        if (!entry || typeof entry !== 'object') return true;
        return !STYLE_PROPS.some(prop => Object.prototype.hasOwnProperty.call(entry, prop));
    }

    setStyleValue(target, prop, value) {
        if (!target || !prop) return;
        if (!target._meta) target._meta = {};
        target._meta[prop] = this.nextStyleSequence();
        if (value === undefined) {
            delete target[prop];
        } else {
            target[prop] = value;
        }
    }

    initializeDynamicDimensions() {
        const requiredRows = (this.persistedRange?.maxRow ?? 0) + 1;
        const requiredCols = (this.persistedRange?.maxCol ?? 0) + 1;
        this.config.maxRows = this.computeInitialLimit(
            this.config.initialRows,
            this.config.rowBatchSize,
            requiredRows
        );
        this.config.maxCols = this.computeInitialLimit(
            this.config.initialCols,
            this.config.colBatchSize,
            requiredCols
        );
    }

    computeInitialLimit(base, batchSize, required) {
        const minimum = Math.max(base, required);
        const batches = Math.ceil(minimum / batchSize) || 1;
        return batches * batchSize;
    }

    isFullGridSelection() {
        if (!this.hasSelection()) return false;
        if (this.fullSheetSelection) return true;
        const total = this.config.maxRows * this.config.maxCols;
        return total > 0 && this.selectedCellCoords.size >= total;
    }

    setDefaultCellProperty(prop, value) {
        if (value === null || value === undefined || value === '') {
            delete this.defaultCellStyle[prop];
            if (this.defaultStyleMeta && Object.prototype.hasOwnProperty.call(this.defaultStyleMeta, prop)) {
                delete this.defaultStyleMeta[prop];
            }
        } else {
            this.defaultCellStyle[prop] = value;
            if (!this.defaultStyleMeta) this.defaultStyleMeta = {};
            this.defaultStyleMeta[prop] = this.nextStyleSequence();
        }
    }

    getSelectionScope() {
        if (!this.hasSelection()) return { type: 'none' };
        const totalCells = this.config.maxRows * this.config.maxCols;
        if (this.fullSheetSelection || (totalCells > 0 && this.selectedCellCoords.size >= totalCells)) {
            return { type: 'all' };
        }

        const rows = this.getSelectedRows();
        const cols = this.getSelectedCols();
        const isFullRows = rows.length > 0
            && this.selectedCellCoords.size === rows.length * this.config.maxCols
            && rows.every(row => this.isRangeFullySelected('row', row));
        if (isFullRows) {
            return { type: 'rows', rows };
        }

        const isFullCols = cols.length > 0
            && this.selectedCellCoords.size === cols.length * this.config.maxRows
            && cols.every(col => this.isRangeFullySelected('column', col));
        if (isFullCols) {
            return { type: 'columns', cols };
        }

        return { type: 'cells' };
    }

    getDefaultCellProperty(prop, fallback = null) {
        return this.defaultCellStyle.hasOwnProperty(prop)
            ? this.defaultCellStyle[prop]
            : fallback;
    }

    createColumnHeader(col) {
        const header = document.createElement('div');
        header.className = 'column-header';
        header.textContent = this.getColumnName(col);
        header.dataset.col = col;

        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'column-resize-handle';
        resizeHandle.dataset.col = col;
        header.appendChild(resizeHandle);

        return header;
    }

    createRowHeader(row) {
        const header = document.createElement('div');
        header.className = 'row-header';
        header.textContent = (row + 1).toString();
        header.dataset.row = row;

        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'row-resize-handle';
        resizeHandle.dataset.row = row;
        header.appendChild(resizeHandle);

        return header;
    }

    appendColumnHeaders(start, end) {
        for (let col = start; col < end; col++) {
            this.columnHeaders.appendChild(this.createColumnHeader(col));
        }
    }

    appendRowHeaders(start, end) {
        for (let row = start; row < end; row++) {
            this.rowHeaders.appendChild(this.createRowHeader(row));
        }
    }

    extendRows(minRowIndex = this.config.maxRows - 1) {
        const desired = Math.max(minRowIndex + 1, this.config.maxRows + this.config.rowBatchSize);
        const batches = Math.ceil(desired / this.config.rowBatchSize) || 1;
        const newMax = batches * this.config.rowBatchSize;
        if (newMax <= this.config.maxRows) return false;

        const start = this.config.maxRows;
        this.config.maxRows = newMax;
        this.appendRowHeaders(start, newMax);
        this.updateGridSize();
        this.updateHeaderPositions();
        return true;
    }

    extendCols(minColIndex = this.config.maxCols - 1) {
        const desired = Math.max(minColIndex + 1, this.config.maxCols + this.config.colBatchSize);
        const batches = Math.ceil(desired / this.config.colBatchSize) || 1;
        const newMax = batches * this.config.colBatchSize;
        if (newMax <= this.config.maxCols) return false;

        const start = this.config.maxCols;
        this.config.maxCols = newMax;
        this.appendColumnHeaders(start, newMax);
        this.updateGridSize();
        this.updateHeaderPositions();
        return true;
    }

    ensureCapacityForCell(row, col) {
        let extended = false;
        if (row >= this.config.maxRows) {
            extended = this.extendRows(row) || extended;
        }
        if (col >= this.config.maxCols) {
            extended = this.extendCols(col) || extended;
        }
        if (extended) {
            this.recalculateVisibleViewport(true);
            this.updateVisibleCells();
        }
    }

    maybeExtendForViewport(visibleRows, visibleCols) {
        if (!visibleRows || !visibleCols) return false;
        let extended = false;
        const rowThreshold = Math.max(10, this.config.rowExtensionThreshold);
        const colThreshold = Math.max(6, this.config.colExtensionThreshold);
        const rowTrigger = Math.max(0, this.config.maxRows - rowThreshold);
        const colTrigger = Math.max(0, this.config.maxCols - colThreshold);
        if (visibleRows.end >= rowTrigger) {
            extended = this.extendRows(visibleRows.end) || extended;
        }
        if (visibleCols.end >= colTrigger) {
            extended = this.extendCols(visibleCols.end) || extended;
        }
        return extended;
    }

    updateCellDataEntry(coord, mutator) {
        const [row, col] = this.parseCoord(coord);
        this.ensureCapacityForCell(row, col);
        const existing = this.cellData.get(coord) || {};
        mutator(existing);
        if (this.isCellEffectivelyEmpty(existing)) {
            this.cellData.delete(coord);
            return null;
        }
        this.cellData.set(coord, existing);
        return existing;
    }

    buildMergeSnapshotMap(snapshot) {
        const map = new Map();
        if (!snapshot) return map;

        if (snapshot instanceof Map) {
            snapshot.forEach((info, coord) => {
                if (!info) return;
                const rows = Number(info.rows);
                const cols = Number(info.cols);
                if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) return;
                map.set(coord, { rows, cols });
            });
            return map;
        }

        if (Array.isArray(snapshot)) {
            snapshot.forEach(entry => {
                if (!Array.isArray(entry) || entry.length < 2) return;
                const [coord, info] = entry;
                if (!coord || !info) return;
                const rows = Number(info.rows);
                const cols = Number(info.cols);
                if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) return;
                map.set(coord, { rows, cols });
            });
        }
        return map;
    }

    computeMergeDiffs(initialSnapshot, currentSnapshot) {
        const initialMap = this.buildMergeSnapshotMap(initialSnapshot);
        const currentMap = this.buildMergeSnapshotMap(currentSnapshot);
        const allCoords = new Set([...initialMap.keys(), ...currentMap.keys()]);
        const diffs = [];

        allCoords.forEach(coord => {
            const before = initialMap.get(coord);
            const after = currentMap.get(coord);
            if (!before && !after) return;
            const [row, col] = this.parseCoord(coord);
            if (!Number.isInteger(row) || !Number.isInteger(col)) return;

            if (!before && after) {
                diffs.push({ coord, row, col, type: 'added', before: null, after });
            } else if (before && !after) {
                diffs.push({ coord, row, col, type: 'removed', before, after: null });
            } else if (before && after &&
                (before.rows !== after.rows || before.cols !== after.cols)) {
                diffs.push({ coord, row, col, type: 'modified', before, after });
            }
        });

        return diffs;
    }

    generateDiffText(maxLines = 120, maxChars = 3200) {
        if (!this.initialCellData) {
            return { text: '', truncated: false };
        }

        const initial = this.initialCellData;
        const current = this.cellData || new Map();
        const allCoords = new Set([...initial.keys(), ...current.keys()]);

        const sortedCoords = Array.from(allCoords).sort((a, b) => {
            const [rowA, colA] = this.parseCoord(a);
            const [rowB, colB] = this.parseCoord(b);
            return rowA === rowB ? colA - colB : rowA - rowB;
        });

        const allLines = [];

        sortedCoords.forEach(coord => {
            const before = initial.get(coord);
            const after = current.get(coord);

            const beforeEmpty = this.isCellEffectivelyEmpty(before, { ignoreClearedStyles: true });
            const afterEmpty = this.isCellEffectivelyEmpty(after, { ignoreClearedStyles: true });
            if (beforeEmpty && afterEmpty) return;

            const { row, col } = this.getCoordPos(coord);
            const address = this.getCellAddress(row, col);

            if (beforeEmpty && !afterEmpty) {
                allLines.push(`+ ${address} ${this.describeCell(after)}`);
                return;
            }

            if (!beforeEmpty && afterEmpty) {
                allLines.push(`- ${address} ${this.describeCell(before)} (cleared)`);
                return;
            }

            const changes = this.compareCellData(before, after);
            if (changes.length) {
                allLines.push(`~ ${address} ${changes.join('; ')}`);
            }
        });

        const appendSizeChangeLines = (kind) => {
            this.forEachDimensionSizeChange(kind, ({ index, sizeChanges, isColumn }) => {
                sizeChanges.forEach(change => {
                    const label = isColumn ? `Column ${this.getColumnName(index)}` : `Row ${index + 1}`;
                    allLines.push(`~ ${label} ${change}`);
                });
            });
        };

        appendSizeChangeLines('column');
        appendSizeChangeLines('row');

        const mergeDiffs = this.computeMergeDiffs(this.initialMergedCells, this.cloneMergedCellsState());
        mergeDiffs.forEach(diff => {
            const address = this.getCellAddress(diff.row, diff.col);
            if (diff.type === 'added' && diff.after) {
                allLines.push(`+ Merge ${address} ${diff.after.rows}x${diff.after.cols}`);
            } else if (diff.type === 'removed' && diff.before) {
                allLines.push(`- Merge ${address} ${diff.before.rows}x${diff.before.cols}`);
            } else if (diff.before && diff.after) {
                allLines.push(`~ Merge ${address} ${diff.before.rows}x${diff.before.cols} -> ${diff.after.rows}x${diff.after.cols}`);
            }
        });

        const defaultStyleChanges = this.describeStyleDifferences(this.initialDefaultCellStyle, this.defaultCellStyle);
        if (defaultStyleChanges.length) {
            allLines.push(`~ Default style ${defaultStyleChanges.join('; ')}`);
            const overrides = this.describeDefaultOverrides(this.defaultCellStyle);
            if (overrides) {
                allLines.push(`~ Default style ${overrides}`);
            }
        }

        const appendDimensionStyleDiffs = (kind, initialMap, currentMap) => {
            const indices = new Set();
            const collectKeys = (source) => {
                if (!(source instanceof Map)) return;
                source.forEach((_, key) => indices.add(key));
            };
            collectKeys(initialMap);
            collectKeys(currentMap);

            const getEntry = (map, idx) => {
                if (!(map instanceof Map)) return null;
                if (map.has(idx)) return map.get(idx);
                const str = String(idx);
                return map.has(str) ? map.get(str) : null;
            };

            indices.forEach(rawIndex => {
                const index = Number(rawIndex);
                if (!Number.isInteger(index)) return;
                const before = this.extractStyleSnapshot(getEntry(initialMap, index) || {});
                const after = this.extractStyleSnapshot(getEntry(currentMap, index) || {});
                const changes = this.describeStyleDifferences(before, after);
                if (!changes.length) return;
                const label = kind === 'row'
                    ? `Row ${index + 1} style`
                    : `Column ${this.getColumnName(index)} style`;
                allLines.push(`~ ${label} ${changes.join('; ')}`);
            });
        };

        appendDimensionStyleDiffs('row', this.initialRowStyles, this.rowStyles);
        appendDimensionStyleDiffs('column', this.initialColumnStyles, this.columnStyles);

        if (!allLines.length) {
            return { text: '', truncated: false };
        }

        let truncated = false;
        let lines = allLines;
        if (lines.length > maxLines) {
            truncated = true;
            lines = lines.slice(0, maxLines);
        }

        const output = [];
        let charCount = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (charCount + line.length + 1 > maxChars) {
                truncated = true;
                break;
            }
            output.push(line);
            charCount += line.length + 1;
        }

        if (truncated) {
            const remaining = allLines.length - output.length;
            output.push(`… ${remaining} more change(s) not shown.`);
        }

        return { text: output.join('\n'), truncated };
    }

    collectDiffEntries(maxEntries = Infinity) {
        const initial = this.initialCellData || new Map();
        const current = this.cellData || new Map();
        const allCoords = new Set([...initial.keys(), ...current.keys()]);
        const sortedCoords = Array.from(allCoords).sort((a, b) => {
            const [rowA, colA] = this.parseCoord(a);
            const [rowB, colB] = this.parseCoord(b);
            return rowA === rowB ? colA - colB : rowA - rowB;
        });

        const getSnapshotEntry = (map, idx) => {
            if (!(map instanceof Map)) return null;
            if (map.has(idx)) return map.get(idx);
            const str = String(idx);
            return map.has(str) ? map.get(str) : null;
        };

        const makeSnapshot = (cellDataMap, rowStyles, columnStyles, defaultStyle, cellStyleMeta, defaultStyleMeta) => ({
            cellDataMap,
            rowStyles,
            columnStyles,
            defaultStyle: defaultStyle || {},
            cellStyleMeta,
            defaultStyleMeta: defaultStyleMeta || {}
        });

        const beforeSnapshot = makeSnapshot(
            initial,
            this.initialRowStyles,
            this.initialColumnStyles,
            this.initialDefaultCellStyle,
            this.initialCellStyleMeta,
            this.initialDefaultStyleMeta
        );
        const afterSnapshot = makeSnapshot(
            current,
            this.rowStyles,
            this.columnStyles,
            this.defaultCellStyle,
            this.cellStyleMeta,
            this.defaultStyleMeta
        );

        const resolveEffectiveStyle = (snapshot, row, col, baseRecord = {}) => {
            const resolved = { ...(baseRecord || {}) };
            const coordKey = `${row},${col}`;
            const cellData = snapshot.cellDataMap?.get(coordKey) || {};
            const cellMeta = snapshot.cellStyleMeta instanceof Map ? snapshot.cellStyleMeta.get(coordKey) || {} : {};
            const rowEntry = getSnapshotEntry(snapshot.rowStyles, row);
            const colEntry = getSnapshotEntry(snapshot.columnStyles, col);
            const addCandidate = (list, value, seq, priority) => {
                if (value === undefined) return;
                const numSeq = Number(seq);
                list.push({
                    value,
                    seq: Number.isFinite(numSeq) ? numSeq : 0,
                    priority
                });
            };

            STYLE_PROPS.forEach(prop => {
                const candidates = [];
                addCandidate(candidates, cellData[prop], cellMeta[prop], 3);
                addCandidate(candidates, rowEntry?.[prop], rowEntry?._meta?.[prop], 2);
                addCandidate(candidates, colEntry?.[prop], colEntry?._meta?.[prop], 1);
                addCandidate(candidates, snapshot.defaultStyle?.[prop], snapshot.defaultStyleMeta?.[prop], 0);
                if (!candidates.length) {
                    delete resolved[prop];
                    return;
                }
                candidates.sort((a, b) => {
                    if (a.seq !== b.seq) return b.seq - a.seq;
                    return b.priority - a.priority;
                });
                const top = candidates[0];
                if (top.value === null || top.value === undefined) {
                    delete resolved[prop];
                    return;
                }
                resolved[prop] = top.value;
            });

            return resolved;
        };

        const entries = [];
        let total = 0;
        let truncated = false;

        sortedCoords.forEach(coord => {
            const beforeRaw = initial.get(coord);
            const afterRaw = current.get(coord);
            const { row, col } = this.getCoordPos(coord);
            const before = resolveEffectiveStyle(beforeSnapshot, row, col, beforeRaw ? { ...beforeRaw } : {});
            const after = resolveEffectiveStyle(afterSnapshot, row, col, afterRaw ? { ...afterRaw } : {});
            const beforeEmpty = this.isCellEffectivelyEmpty(before, { ignoreClearedStyles: true });
            const afterEmpty = this.isCellEffectivelyEmpty(after, { ignoreClearedStyles: true });
            if (beforeEmpty && afterEmpty) {
                return;
            }

            const changeType = beforeEmpty ? 'added' : afterEmpty ? 'removed' : 'modified';
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, col),
                height: this.getSnapshotRowHeight(this.initialRowHeights, row, this.initialAutoRowHeights, this.initialDefaultRowHeight, this.initialRowDefaultHeightOverrides)
            };
            const afterSize = {
                width: this.getColumnWidth(col),
                height: this.getRowHeight(row)
            };
            const beforeMode = this.getRowHeightMode(this.initialRowHeightModes, row, 'implicit');
            const afterMode = this.getRowHeightMode(this.rowHeightModes, row, 'implicit');
            let baseChanges = [];
            if (changeType === 'added') {
                baseChanges = this.compareCellData({}, after || {});
            } else if (changeType === 'removed') {
                baseChanges = this.compareCellData(before || {}, {});
            } else if (!beforeEmpty && !afterEmpty) {
                baseChanges = this.compareCellData(before, after);
            }
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize, {
                dimensionKind: 'row',
                modeBefore: beforeMode,
                modeAfter: afterMode
            });
            const combinedChanges = baseChanges.concat(sizeChanges);

            const includeEntry = combinedChanges.length > 0;
            if (!includeEntry) {
                return;
            }

            total += 1;
            if (entries.length >= maxEntries) {
                truncated = true;
                return;
            }

            entries.push({
                coord,
                row,
                col,
                address: this.getCellAddress(row, col),
                changeType,
                before: beforeEmpty ? null : this.cloneCellRecord(before),
                after: afterEmpty ? null : this.cloneCellRecord(after),
                beforeSize,
                afterSize,
                changes: combinedChanges,
                meta: null
            });
        });

        const entryMap = new Map(entries.map(entry => [entry.coord, entry]));
        const extraEntries = [];

        const appendDimensionChanges = kind => {
            this.forEachDimensionSizeChange(kind, ({ index, beforeSize, afterSize, sizeChanges, isColumn }) => {
                const modeBefore = kind === 'row' ? this.getRowHeightMode(this.initialRowHeightModes, index, 'implicit') : null;
                const modeAfter = kind === 'row' ? this.getRowHeightMode(this.rowHeightModes, index, 'implicit') : null;
                const rowAwareSizeChanges = kind === 'row'
                    ? this.describeSizeDifferences(beforeSize, afterSize, { dimensionKind: 'row', modeBefore, modeAfter })
                    : this.describeSizeDifferences(beforeSize, afterSize);
                if (kind === 'row') {
                    const duplicate = Array.from(entryMap.values()).some(entry => {
                        if (!entry || entry.row !== index) return false;
                        return Array.isArray(entry.changes) && rowAwareSizeChanges.some(change => entry.changes.includes(change));
                    });
                    if (duplicate) return;
                }

                const coordKey = `${kind}:${index}`;
                const hasCoordinate = entryMap.has(coordKey);
                const existing = hasCoordinate ? entryMap.get(coordKey) : null;
                if (existing) {
                    existing.beforeSize = existing.beforeSize || beforeSize;
                    existing.afterSize = existing.afterSize || afterSize;
                    existing.changes = Array.isArray(existing.changes) ? existing.changes : [];
                    rowAwareSizeChanges.forEach(change => {
                        if (!existing.changes.includes(change)) existing.changes.push(change);
                    });
                    return;
                }

                total += 1;
                if (entries.length + extraEntries.length < maxEntries) {
                    const entry = {
                        coord: coordKey,
                        row: isColumn ? 0 : index,
                        col: isColumn ? index : 0,
                        address: this.getCellAddress(isColumn ? 0 : index, isColumn ? index : 0),
                        changeType: 'modified',
                        before: null,
                        after: null,
                        beforeSize,
                        afterSize,
                        changes: rowAwareSizeChanges,
                        meta: { kind, index }
                    };
                    extraEntries.push(entry);
                    entryMap.set(coordKey, entry);
                } else {
                    truncated = true;
                    entryMap.set(coordKey, null);
                }
            });
        };

        appendDimensionChanges('column');
        appendDimensionChanges('row');

        const defaultStyleChanges = this.describeDefaultStyleDifferences(this.initialDefaultCellStyle, this.defaultCellStyle);
        if (defaultStyleChanges.length) {
            const defaultOverrides = this.describeDefaultOverrides(this.defaultCellStyle);
            const changes = defaultOverrides ? defaultStyleChanges.concat([defaultOverrides]) : defaultStyleChanges;
            total += 1;
            if (entries.length + extraEntries.length < maxEntries) {
                const entry = {
                    coord: 'default:style',
                    row: 0,
                    col: 0,
                    address: 'Default cell style',
                    changeType: 'modified',
                    before: this.cloneDefaultCellStyle(this.initialDefaultCellStyle),
                    after: this.cloneDefaultCellStyle(this.defaultCellStyle),
                    beforeSize: null,
                    afterSize: null,
                    changes,
                    meta: { kind: 'defaultStyle' }
                };
                extraEntries.push(entry);
                entryMap.set('default:style', entry);
            } else {
                truncated = true;
                entryMap.set('default:style', null);
            }
        }

        const appendStyleDiffs = (kind, initialMap, currentMap) => {
            const indices = new Set();
            if (initialMap instanceof Map) {
                initialMap.forEach((_, key) => indices.add(key));
            }
            if (currentMap instanceof Map) {
                currentMap.forEach((_, key) => indices.add(key));
            }
            const getEntry = (map, idx) => {
                if (!(map instanceof Map)) return null;
                if (map.has(idx)) return map.get(idx);
                const str = String(idx);
                return map.has(str) ? map.get(str) : null;
            };

            const describeOverrides = (styleSnapshot, index) => {
                if (!styleSnapshot || typeof styleSnapshot !== 'object') return null;
                const hasValue = STYLE_PROPS.some(prop => styleSnapshot[prop] !== undefined && styleSnapshot[prop] !== null);
                if (!hasValue) return null;
                const overridesByAddr = new Map();
                this.cellData.forEach((data, coord) => {
                    const pos = this.getCoordPos(coord);
                    if (kind === 'row' && pos.row !== index) return;
                    if (kind === 'column' && pos.col !== index) return;
                    STYLE_PROPS.forEach(prop => {
                        const styleVal = styleSnapshot[prop];
                        if (styleVal === undefined || styleVal === null) return;
                        if (!Object.prototype.hasOwnProperty.call(data, prop)) return;
                        const cellVal = data[prop];
                        if (cellVal === styleVal) return;
                        const addr = this.getCellAddress(pos.row, pos.col);
                        const list = overridesByAddr.get(addr) || [];
                        const reason = cellVal === null || cellVal === undefined
                            ? 'cleared'
                            : this.normalizeField(cellVal, prop);
                        list.push(`${this.getStyleLabel(prop)} ${reason}`);
                        overridesByAddr.set(addr, list);
                    });
                });
                if (!overridesByAddr.size) return null;
                const entries = Array.from(overridesByAddr.entries()).map(([addr, props]) => {
                    return `${addr} (${props.join(', ')})`;
                });
                const maxEntries = 6;
                const visible = entries.slice(0, maxEntries);
                const remaining = entries.length - visible.length;
                const suffix = remaining > 0 ? ` (+${remaining} more)` : '';
                return `exceptions: ${visible.join('; ')}${suffix}`;
            };

            indices.forEach(rawIndex => {
                const index = Number(rawIndex);
                if (!Number.isInteger(index)) return;
                const before = this.extractStyleSnapshot(getEntry(initialMap, index) || {});
                const after = this.extractStyleSnapshot(getEntry(currentMap, index) || {});
                const styleChanges = this.describeStyleDifferences(before, after);
                if (!styleChanges.length) return;
                const overridesNote = describeOverrides(after, index);
                const changes = overridesNote ? styleChanges.concat([overridesNote]) : styleChanges;

                const coordKey = `${kind}Style:${index}`;
                total += 1;
                if (entries.length + extraEntries.length < maxEntries) {
                    const entry = {
                        coord: coordKey,
                        row: kind === 'row' ? index : 0,
                        col: kind === 'column' ? index : 0,
                        address: kind === 'row'
                            ? `Row ${index + 1} style`
                            : `Column ${this.getColumnName(index)} style`,
                        changeType: 'modified',
                        before,
                        after,
                        beforeSize: null,
                        afterSize: null,
                        changes,
                        meta: { kind: `${kind}Style`, index }
                    };
                    extraEntries.push(entry);
                    entryMap.set(coordKey, entry);
                } else {
                    truncated = true;
                    entryMap.set(coordKey, null);
                }
            });
        };

        appendStyleDiffs('column', this.initialColumnStyles, this.columnStyles);
        appendStyleDiffs('row', this.initialRowStyles, this.rowStyles);

        const mergeDiffs = this.computeMergeDiffs(this.initialMergedCells, this.cloneMergedCellsState());
        mergeDiffs.forEach(diff => {
            const beforeSize = null;
            const afterSize = null;
            const beforeLabel = diff.before ? `${diff.before.rows}x${diff.before.cols}` : '';
            const afterLabel = diff.after ? `${diff.after.rows}x${diff.after.cols}` : '';
            const changeDesc = (() => {
                if (diff.type === 'added' && afterLabel) {
                    return `Merge created (${afterLabel})`;
                }
                if (diff.type === 'removed' && beforeLabel) {
                    return `Merge removed (was ${beforeLabel})`;
                }
                if (diff.type === 'modified' && beforeLabel && afterLabel) {
                    return `Merge resized ${beforeLabel} -> ${afterLabel}`;
                }
                return 'Merge updated';
            })();

            total += 1;
            if (entries.length + extraEntries.length >= maxEntries) {
                truncated = true;
                return;
            }

            extraEntries.push({
                coord: `merge:${diff.coord}`,
                row: diff.row,
                col: diff.col,
                address: this.getCellAddress(diff.row, diff.col),
                changeType: diff.type,
                before: null,
                after: null,
                beforeSize,
                afterSize,
                changes: [changeDesc],
                meta: { kind: 'merge', before: diff.before, after: diff.after }
            });
        });

        extraEntries.forEach(entry => {
            entries.push(entry);
        });

        return { entries, total, truncated };
    }

    hasLocalChangesComparedToBaseline() {
        const { entries } = this.collectDiffEntries(1);
        return entries.length > 0;
    }

    restoreBaselineState() {
        this.cellData = this.cloneCellData(this.initialCellData);
        this.rowStyles = this.cloneStyleMap(this.initialRowStyles);
        this.columnStyles = this.cloneStyleMap(this.initialColumnStyles);
        this.cellStyleMeta = this.cloneStyleMap(this.initialCellStyleMeta);
        this.defaultStyleMeta = this.cloneStyleMeta(this.initialDefaultStyleMeta);
        this.rowHeights = new Map(this.initialRowHeights || []);
        this.autoRowHeights = new Map(this.initialAutoRowHeights || []);
        this.defaultAutoRowHeight = this.initialDefaultRowHeight || this.config.cellHeight;
        this.rowDefaultHeightOverrides = new Map(this.initialRowDefaultHeightOverrides || []);
        this.defaultCellStyle = this.cloneDefaultCellStyle(this.initialDefaultCellStyle);
        this.rowHeightModes = new Map(this.initialRowHeightModes || []);
        this.columnWidths = new Map(this.initialColumnWidths || []);
        this.persistedRange = { ...(this.initialPersistedRange || { ...this.persistedRange }) };
        this.styleSequence = this.initialStyleSequence || this.styleSequence || 1;
        this.applyMergedCellsSnapshot(this.initialMergedCells);
    }

    cloneCellRecord(record) {
        if (!record || typeof record !== 'object') {
            return record ?? null;
        }
        try {
            return JSON.parse(JSON.stringify(record));
        } catch (error) {
            console.warn('Unable to clone cell record', error);
            return record;
        }
    }

    cloneMergedCellsState(source = this.mergedCells) {
        const snapshot = [];
        if (source instanceof Map) {
            source.forEach((info, coord) => {
                if (!info) return;
                const rows = Number(info.rows);
                const cols = Number(info.cols);
                if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) return;
                snapshot.push([coord, { rows, cols }]);
            });
            return snapshot;
        }

        if (Array.isArray(source)) {
            source.forEach(entry => {
                if (!Array.isArray(entry) || entry.length < 2) return;
                const [coord, info] = entry;
                if (!coord || !info) return;
                const rows = Number(info.rows);
                const cols = Number(info.cols);
                if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) return;
                snapshot.push([coord, { rows, cols }]);
            });
        }
        return snapshot;
    }

    applyMergedCellsSnapshot(snapshot) {
        let mutated = false;
        const activeParents = Array.from(this.mergedCells.keys());
        activeParents.forEach(coord => {
            const [row, col] = this.parseCoord(coord);
            if (Number.isInteger(row) && Number.isInteger(col)) {
                this.unmergeCells(row, col, true, { refreshLayout: false });
                mutated = true;
            }
        });

        if (!Array.isArray(snapshot)) {
            if (mutated) {
                this.refreshLayoutAfterMergeChange();
            }
            return;
        }

        snapshot.forEach(entry => {
            if (!Array.isArray(entry) || entry.length < 2) return;
            const [coord, info] = entry;
            if (!coord || !info) return;
            const [row, col] = this.parseCoord(coord);
            const rows = Number(info.rows);
            const cols = Number(info.cols);
            if (!Number.isInteger(row) || !Number.isInteger(col) ||
                !Number.isInteger(rows) || !Number.isInteger(cols) ||
                rows < 1 || cols < 1) {
                return;
            }
            this.mergeCells(row, col, rows, cols, { refreshLayout: false });
            mutated = true;
        });

        if (mutated) {
            this.refreshLayoutAfterMergeChange();
        }
    }

    scheduleDirtyStateUpdate() {
        if (this.dirtyUpdateScheduled) return;
        this.dirtyUpdateScheduled = true;
        const run = () => {
            this.dirtyUpdateScheduled = false;
            this.updateDirtyState();
        };
        if (typeof queueMicrotask === 'function') {
            queueMicrotask(run);
        } else {
            Promise.resolve().then(run);
        }
    }

    updateDirtyState({ persist = true } = {}) {
        const { entries, total, truncated } = this.collectDiffEntries(250);
        this.latestDiffEntries = entries;
        this.latestDiffTotal = total;
        this.latestDiffTruncated = truncated;
        const isDirty = entries.length > 0;

        if (isDirty && this.undoStack.length === 0 && !this.hasRestoredDraft && !this.userMadeChanges) {
            if (!this.hasAutoPersistedBaseline) {
                this.hasAutoPersistedBaseline = true;
                this.markChangesPersisted();
                if (this.saveModal && !this.saveModal.classList.contains('hidden')) {
                    this.renderSaveModalDiff();
                }
                return;
            }
        }

        if (this.unsavedChanges !== isDirty) {
            this.unsavedChanges = isDirty;
            this.updateSaveIndicator(isDirty);
        }

        if (!isDirty) {
            this.hasAutoPersistedBaseline = false;
        }

        if (persist) {
            if (isDirty) {
                this.scheduleDraftPersistence();
            } else {
                this.clearPersistedDraft();
            }
        }

        if (this.saveModal && !this.saveModal.classList.contains('hidden')) {
            this.renderSaveModalDiff();
        }
    }

    updateSaveIndicator(isDirty) {
        if (this.saveButtonBadge) {
            this.saveButtonBadge.classList.toggle('hidden', !isDirty);
        }
        if (this.saveButton) {
            this.saveButton.classList.toggle('toolbar-btn--dirty', Boolean(isDirty));
            this.saveButton.setAttribute('data-dirty', isDirty ? 'true' : 'false');
        }
    }

    scheduleDraftPersistence() {
        if (this.draftSaveTimer) {
            clearTimeout(this.draftSaveTimer);
        }
        this.draftSaveTimer = setTimeout(() => {
            this.draftSaveTimer = null;
            this.persistDraft();
        }, this.persistDelayMs);
    }

    persistDraft() {
        if (!this.unsavedChanges) {
            this.clearPersistedDraft();
            return;
        }
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }
        try {
            const payload = {
                version: 1,
                timestamp: Date.now(),
                cellData: this.serializeMap(this.cellData),
                rowHeights: this.serializeMap(this.rowHeights),
                rowHeightModes: this.serializeMap(this.rowHeightModes),
                autoRowHeights: this.serializeMap(this.autoRowHeights),
                rowDefaultHeightOverrides: this.serializeMap(this.rowDefaultHeightOverrides),
                columnWidths: this.serializeMap(this.columnWidths),
                rowStyles: this.serializeMap(this.rowStyles),
                columnStyles: this.serializeMap(this.columnStyles),
                cellStyleMeta: this.serializeMap(this.cellStyleMeta),
                defaultStyleMeta: this.cloneStyleMeta(this.defaultStyleMeta),
                styleSequence: this.styleSequence,
                persistedRange: { ...this.persistedRange },
                mergedCells: this.cloneMergedCellsState(),
                defaultAutoRowHeight: this.defaultAutoRowHeight,
                defaultCellStyle: this.cloneDefaultCellStyle()
            };
            window.localStorage.setItem(this.localDraftKey, JSON.stringify(payload));
        } catch (error) {
            console.error('Unable to persist draft', error);
        }
    }

    clearPersistedDraft() {
        if (this.draftSaveTimer) {
            clearTimeout(this.draftSaveTimer);
            this.draftSaveTimer = null;
        }
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }
        try {
            window.localStorage.removeItem(this.localDraftKey);
        } catch (error) {
            console.warn('Unable to clear draft', error);
        }
    }

    serializeMap(map) {
        if (!(map instanceof Map)) return [];
        const entries = [];
        map.forEach((value, key) => {
            entries.push([key, this.cloneCellRecord(value)]);
        });
        return entries;
    }

    deserializeMap(entries) {
        const map = new Map();
        if (!Array.isArray(entries)) return map;
        entries.forEach(pair => {
            if (!Array.isArray(pair) || pair.length < 2) return;
            const [key, value] = pair;
            map.set(key, this.cloneCellRecord(value));
        });
        return map;
    }

    restoreDraftIfAvailable() {
        if (typeof window === 'undefined' || !window.localStorage) {
            return;
        }
        let restored = false;
        let needsRefresh = false;
        try {
            const raw = window.localStorage.getItem(this.localDraftKey);
            if (!raw) return;
            const payload = JSON.parse(raw);
            if (!payload || payload.version !== 1) return;
            if (payload.cellData) {
                this.cellData = this.deserializeMap(payload.cellData);
                restored = true;
                needsRefresh = true;
            }
            if (payload.rowHeights) {
                this.rowHeights = this.deserializeMap(payload.rowHeights);
                restored = true;
                needsRefresh = true;
            }
            if (payload.rowHeightModes) {
                this.rowHeightModes = this.deserializeMap(payload.rowHeightModes);
                restored = true;
                needsRefresh = true;
            }
            if (payload.autoRowHeights) {
                this.autoRowHeights = this.deserializeMap(payload.autoRowHeights);
                restored = true;
                needsRefresh = true;
            }
            if (payload.rowDefaultHeightOverrides) {
                this.rowDefaultHeightOverrides = this.deserializeMap(payload.rowDefaultHeightOverrides);
                restored = true;
                needsRefresh = true;
            }
            if (payload.columnWidths) {
                this.columnWidths = this.deserializeMap(payload.columnWidths);
                restored = true;
                needsRefresh = true;
            }
            if (payload.rowStyles) {
                this.rowStyles = this.deserializeMap(payload.rowStyles);
                restored = true;
                needsRefresh = true;
            }
            if (payload.columnStyles) {
                this.columnStyles = this.deserializeMap(payload.columnStyles);
                restored = true;
                needsRefresh = true;
            }
            if (payload.cellStyleMeta) {
                this.cellStyleMeta = this.deserializeMap(payload.cellStyleMeta);
                restored = true;
                needsRefresh = true;
            }
            if (payload.defaultStyleMeta && typeof payload.defaultStyleMeta === 'object') {
                this.defaultStyleMeta = this.cloneStyleMeta(payload.defaultStyleMeta);
            }
            if (Number.isFinite(payload.styleSequence)) {
                this.styleSequence = payload.styleSequence;
            }
            if (Object.prototype.hasOwnProperty.call(payload, 'mergedCells')) {
                const snapshot = this.cloneMergedCellsState(payload.mergedCells);
                this.applyMergedCellsSnapshot(snapshot);
                restored = true;
                needsRefresh = true;
            }
            if (payload.persistedRange && typeof payload.persistedRange === 'object') {
                this.persistedRange = {
                    ...this.persistedRange,
                    ...payload.persistedRange
                };
                restored = true;
                needsRefresh = true;
            }
            if (Number.isFinite(payload.defaultAutoRowHeight)) {
                this.defaultAutoRowHeight = payload.defaultAutoRowHeight;
            }
            if (payload.defaultCellStyle && typeof payload.defaultCellStyle === 'object') {
                this.defaultCellStyle = this.cloneDefaultCellStyle(payload.defaultCellStyle);
                restored = true;
                needsRefresh = true;
            }
        } catch (error) {
            console.error('Unable to restore draft', error);
        } finally {
            if (restored && !this.hasLocalChangesComparedToBaseline()) {
                this.restoreBaselineState();
                this.clearPersistedDraft();
                restored = false;
                needsRefresh = true;
            }
            this.hasRestoredDraft = restored;
            if (restored) {
                this.userMadeChanges = true;
                this.hasAutoPersistedBaseline = false;
            } else {
                this.userMadeChanges = false;
            }
            if (needsRefresh) {
                this.initializeStyleMetadataFromData();
                this.recalculateAutoRowHeights();
                this.updateGridSize();
                this.repositionCells();
                this.updateHeaderPositions();
                this.refreshAllVisibleCells();
            }
        }
    }

    markCommentsCommitted() {
        this.cellData.forEach((value, coord) => {
            if (!value || typeof value !== 'object' || !value.comment) return;
            const info = this.normalizeCommentData(value.comment);
            if (!info?.text) return;

            this.updateCellDataEntry(coord, data => {
                if (!data.comment) return;
                const current = data.comment;
                const base = current && typeof current === 'object'
                    ? { ...current }
                    : {
                        text: info.text,
                        author: info.author,
                        authorId: info.authorId,
                        profileUrl: info.profileUrl || '',
                        avatar: info.avatar || '',
                        at: info.at,
                        anonymous: info.anonymous,
                        anonymousReason: info.anonymousReason,
                        replies: Array.isArray(info.replies) ? info.replies.map(reply => this.cloneCommentEntry(reply)).filter(Boolean) : []
                    };
                base.localOnly = false;
                if (Array.isArray(base.replies)) {
                    base.replies = base.replies.map(reply => ({ ...reply, localOnly: false }));
                }
                data.comment = base;
            });
        });
    }

    markChangesPersisted() {
        this.markCommentsCommitted();
        this.initialColorUsage = this.cloneColorUsage();
        this.initialCellData = this.cloneCellData(this.cellData);
        this.initialRowStyles = this.cloneStyleMap(this.rowStyles);
        this.initialColumnStyles = this.cloneStyleMap(this.columnStyles);
        this.initialCellStyleMeta = this.cloneStyleMap(this.cellStyleMeta);
        this.initialDefaultStyleMeta = this.cloneStyleMeta(this.defaultStyleMeta);
        this.initialRowHeights = new Map(this.rowHeights);
        this.initialAutoRowHeights = new Map(this.autoRowHeights);
        this.initialDefaultRowHeight = this.defaultAutoRowHeight;
        this.initialRowDefaultHeightOverrides = new Map(this.rowDefaultHeightOverrides);
        this.initialDefaultCellStyle = this.cloneDefaultCellStyle();
        this.initialRowHeightModes = new Map(this.rowHeightModes);
        this.initialColumnWidths = new Map(this.columnWidths);
        this.initialPersistedRange = { ...this.persistedRange };
        this.initialMergedCells = this.cloneMergedCellsState();
        this.initialStyleSequence = this.styleSequence;
        this.latestDiffEntries = [];
        this.latestDiffTotal = 0;
        this.latestDiffTruncated = false;
        this.unsavedChanges = false;
        this.updateSaveIndicator(false);
        this.clearPersistedDraft();
        this.hasRestoredDraft = false;
        this.hasAutoPersistedBaseline = false;
        this.userMadeChanges = false;
    }

    setSaveModalBusy(isBusy) {
        this.isSaveModalBusy = isBusy;
        if (this.saveButton) {
            this.saveButton.disabled = isBusy;
            this.saveButton.classList.toggle('toolbar-btn--busy', Boolean(isBusy));
        }
        if (!this.saveModal) return;
        this.saveModal.classList.toggle('save-modal--busy', Boolean(isBusy));
        const actionButtons = this.saveModal.querySelectorAll('[data-save-action]');
        actionButtons.forEach(btn => {
            btn.disabled = Boolean(isBusy);
        });
        const closeBtn = this.saveModal.querySelector('.save-modal__close');
        if (closeBtn) {
            closeBtn.disabled = Boolean(isBusy);
        }
    }

    async handleDiscardLocalChanges() {
        if (!this.unsavedChanges) {
            this.updateSaveModalStatus('No local changes to discard.');
            return;
        }

        let confirmed = true;
        if (typeof window !== 'undefined' && window.confirm) {
            confirmed = window.confirm('Discard all local changes? Autosaved edits will be permanently removed.');
        }
        if (!confirmed) return;

        this.setSaveModalBusy(true);
        try {
            this.discardLocalChanges();
            this.updateSaveModalStatus('Local changes discarded.');
        } finally {
            this.setSaveModalBusy(false);
            this.renderSaveModalDiff();
        }
    }

    discardLocalChanges() {
        this.restoreBaselineState();
        this.undoStack = [];
        this.redoStack = [];
        this.updateUndoRedoButtons();
        this.updateGridSize();
        this.repositionCells();
        this.updateHeaderPositions();
        this.refreshAllVisibleCells();
        this.refreshPalettes();
        if (typeof this.refreshBorderColorSections === 'function') {
            this.refreshBorderColorSections();
        }
        this.markChangesPersisted();
    }

    renderSaveModalDiff() {
        const container = document.getElementById('saveModalDiff');
        if (!container) return;

        if (!this.unsavedChanges || !this.latestDiffEntries.length) {
            container.innerHTML = '<div class="save-modal__diff-empty">No local changes detected.</div>';
            return;
        }

        const maxEntries = 20;
        const entries = this.latestDiffEntries.slice(0, maxEntries);
        const total = this.latestDiffTotal ?? entries.length;
        const showMore = total > entries.length;

        let html = [
            '<div class="save-modal__diff-header">',
            `  <div class="save-modal__diff-title">Local changes (${total})</div>`,
            '  <button type="button" class="btn save-modal__discard-btn" data-save-action="discard">Discard local changes</button>',
            '</div>'
        ].join('');
        html += '<div class="save-modal__diff-list">';
        entries.forEach(entry => {
            html += this.renderDiffEntry(entry);
        });
        html += '</div>';

        if (showMore) {
            const remaining = total - entries.length;
            html += `<div class="save-modal__diff-more">Showing first ${entries.length} cells. ${remaining} more cell${remaining === 1 ? '' : 's'} changed.</div>`;
        }

        container.innerHTML = html;
    }

    renderDiffEntry(entry) {
        const beforeCell = this.renderDiffCell(entry.before, entry.row, entry.col, this.initialCellData, entry.beforeSize);
        const afterCell = this.renderDiffCell(entry.after, entry.row, entry.col, this.cellData, entry.afterSize);
        const label = this.getChangeLabel(entry.changeType);
        const tagClass = `save-modal__diff-tag--${entry.changeType}`;
        const changes = Array.isArray(entry.changes) && entry.changes.length
            ? `<ul class="save-modal__diff-changes">${entry.changes.slice(0, 4).map(change => `<li>${escapeHTML(change)}</li>`).join('')}</ul>`
            : '';

        const noChangesMessage = !entry.meta && !changes && (!entry.before || !entry.after)
            ? `<div class="save-modal__diff-note">${entry.changeType === 'added' ? 'Previously empty cell.' : 'Cell cleared.'}</div>`
            : '';

        let heading = escapeHTML(entry.address);
        if (entry.meta?.kind === 'column') {
            heading = `Column ${this.getColumnName(entry.col)}`;
        } else if (entry.meta?.kind === 'row') {
            heading = `Row ${entry.row + 1}`;
        } else if (entry.meta?.kind === 'merge') {
            heading = `Merge ${this.getCellAddress(entry.row, entry.col)}`;
        } else if (entry.meta?.kind === 'defaultStyle') {
            heading = 'Default cell style';
        }

        return [
            '<div class="save-modal__diff-item">',
            '  <div class="save-modal__diff-item-header">',
            `    <span class="save-modal__diff-address">${heading}</span>`,
            `    <span class="save-modal__diff-tag ${tagClass}">${label}</span>`,
            '  </div>',
            '  <div class="save-modal__diff-columns">',
            '    <div class="save-modal__diff-column">',
            '      <div class="save-modal__diff-column-title">Before</div>',
            `      ${beforeCell}`,
            '    </div>',
            '    <div class="save-modal__diff-column">',
            '      <div class="save-modal__diff-column-title">After</div>',
            `      ${afterCell}`,
            '    </div>',
            '  </div>',
            changes || noChangesMessage,
            '</div>'
        ].join('\n');
    }

    renderDiffCell(cellRecord, row, col, snapshotMap, sizeInfo) {
        const baseClass = 'save-modal__diff-cell';
        const isEmpty = !cellRecord;
        const styleParts = [];
        if (sizeInfo) {
            const width = Number.isFinite(sizeInfo.width) ? Math.max(16, Math.round(sizeInfo.width)) : this.config.cellWidth;
            const height = Number.isFinite(sizeInfo.height) ? Math.max(12, Math.round(sizeInfo.height)) : this.config.cellHeight;
            styleParts.push('box-sizing:border-box');
            styleParts.push(`width:${width}px`);
            styleParts.push(`min-width:${width}px`);
            styleParts.push(`max-width:${width}px`);
            styleParts.push(`height:${height}px`);
            styleParts.push(`min-height:${height}px`);
        }
        let content;
        if (isEmpty) {
            content = '<span class="save-modal__diff-placeholder">Empty</span>';
        } else {
            if (cellRecord.backgroundColor) styleParts.push(`background:${cellRecord.backgroundColor}`);
            if (cellRecord.fontColor) styleParts.push(`color:${cellRecord.fontColor}`);
            if (cellRecord.fontSize) styleParts.push(`font-size:${cellRecord.fontSize}px`);
            if (cellRecord.bold) styleParts.push('font-weight:bold');
            if (cellRecord.italic) styleParts.push('font-style:italic');
            const decorations = [];
            if (cellRecord.underline) decorations.push('underline');
            if (cellRecord.strikethrough) decorations.push('line-through');
            if (decorations.length) styleParts.push(`text-decoration:${decorations.join(' ')}`);
            if (cellRecord.textAlign) styleParts.push(`text-align:${cellRecord.textAlign}`);
            if (cellRecord.verticalAlign) {
                const alignMap = { top: 'flex-start', middle: 'center', bottom: 'flex-end' };
                styleParts.push(`align-items:${alignMap[cellRecord.verticalAlign] || 'flex-end'}`);
            }

            const borderStyles = this.collectDiffBorderStyles(row, col, cellRecord, snapshotMap);
            if (borderStyles.length) {
                styleParts.push(...borderStyles);
            }

            const canUseRich = cellRecord.richText && !(cellRecord.value || '').startsWith('=');
            const richHtml = canUseRich ? this.sanitizeRichTextHTML(cellRecord.richText) : '';
            const displayText = this.getDisplayTextFromSnapshot(snapshotMap, row, col, cellRecord);
            if (displayText && displayText.includes('\n')) {
                styleParts.push('white-space:pre-wrap');
            }

            if (richHtml) {
                content = richHtml;
            } else {
                content = displayText ? escapeHTML(displayText).replace(/\n/g, '<br>') : '<span class="save-modal__diff-placeholder">Empty</span>';
            }

            if (cellRecord.linkUrl) {
                const href = escapeAttribute(cellRecord.linkUrl);
                content = `<a href="${href}" target="_blank" rel="noopener">${content}</a>`;
            }
        }

        const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';
        const classes = [baseClass, isEmpty && 'save-modal__diff-cell--empty'].filter(Boolean).join(' ');
        return `<div class="${classes}"${styleAttr}><div class="save-modal__diff-cell-content">${content}</div></div>`;
    }

    getDisplayTextFromSnapshot(snapshotMap, row, col, cellRecord) {
        if (!cellRecord || !cellRecord.value) {
            return '';
        }
        if (!cellRecord.value.startsWith('=')) {
            if (cellRecord.value.startsWith("'")) {
                return cellRecord.value.substring(1);
            }
            return cellRecord.value;
        }

        const originalMap = this.cellData;
        if (snapshotMap === this.cellData) {
            return this.getDisplayTextForCell(row, col, cellRecord);
        }

        this.cellData = snapshotMap || this.cellData;
        try {
            return this.getDisplayTextForCell(row, col, cellRecord);
        } finally {
            this.cellData = originalMap;
        }
    }

    getChangeLabel(changeType) {
        switch (changeType) {
            case 'added':
                return 'Added';
            case 'removed':
                return 'Removed';
            default:
                return 'Updated';
        }
    }

    getSnapshotColumnWidth(mapLike, col) {
        return this.getValueFromMapLike(mapLike, col, this.config.cellWidth);
    }

    getSnapshotRowHeight(mapLike, row, autoMap = null, defaultHeight = this.initialDefaultRowHeight ?? this.config.cellHeight, defaultRowOverrideMap = null) {
        const explicit = this.getValueFromMapLike(mapLike, row, null);
        if (Number.isFinite(explicit) && explicit > 0) return explicit;

        if (autoMap) {
            const auto = this.getValueFromMapLike(autoMap, row, null);
            if (Number.isFinite(auto) && auto > 0) return auto;
        }

        const override = this.getValueFromMapLike(defaultRowOverrideMap, row, null);
        if (Number.isFinite(override) && override > 0) return override;

        const fallback = Number(defaultHeight);
        return Number.isFinite(fallback) && fallback > 0 ? fallback : this.config.cellHeight;
    }

    getRowHeightMode(mapLike, row, fallback = 'implicit') {
        if (!mapLike) return fallback;
        const readValue = (value) => {
            if (typeof value === 'string' && value.length) return value;
            return null;
        };

        if (mapLike instanceof Map) {
            if (mapLike.has(row)) {
                const value = readValue(mapLike.get(row));
                if (value) return value;
            }
            const strKey = String(row);
            if (mapLike.has(strKey)) {
                const value = readValue(mapLike.get(strKey));
                if (value) return value;
            }
            return fallback;
        }

        if (Array.isArray(mapLike)) {
            for (let i = 0; i < mapLike.length; i++) {
                const [entryKey, entryValue] = mapLike[i] || [];
                if (entryKey === row || entryKey === String(row)) {
                    const value = readValue(entryValue);
                    if (value) return value;
                }
            }
            return fallback;
        }

        if (typeof mapLike === 'object') {
            const key = Object.prototype.hasOwnProperty.call(mapLike, row) ? row :
                (Object.prototype.hasOwnProperty.call(mapLike, String(row)) ? String(row) : null);
            if (key !== null) {
                const value = readValue(mapLike[key]);
                if (value) return value;
            }
        }
        return fallback;
    }

    getValueFromMapLike(mapLike, key, fallback) {
        if (!mapLike) return fallback;
        if (mapLike instanceof Map) {
            if (mapLike.has(key)) {
                const value = Number(mapLike.get(key));
                if (Number.isFinite(value) && value > 0) return value;
            }
            const strKey = String(key);
            if (mapLike.has(strKey)) {
                const value = Number(mapLike.get(strKey));
                if (Number.isFinite(value) && value > 0) return value;
            }
            return fallback;
        }
        if (Array.isArray(mapLike)) {
            for (let i = 0; i < mapLike.length; i++) {
                const [entryKey, entryValue] = mapLike[i] || [];
                if (entryKey === key || entryKey === String(key)) {
                    const value = Number(entryValue);
                    if (Number.isFinite(value) && value > 0) return value;
                }
            }
            return fallback;
        }
        const strKey = String(key);
        if (Object.prototype.hasOwnProperty.call(mapLike, key)) {
            const value = Number(mapLike[key]);
            if (Number.isFinite(value) && value > 0) return value;
        }
        if (Object.prototype.hasOwnProperty.call(mapLike, strKey)) {
            const value = Number(mapLike[strKey]);
            if (Number.isFinite(value) && value > 0) return value;
        }
        return fallback;
    }

    initializeRowHeightMetrics() {
        this.cellLineHeightMultiplier = 1.2;
        this.baseFontSizePx = this.readCssNumber('--font-size-sm', 12);
        const padding = this.readCssNumber('--space-6', 6);
        this.cellVerticalPaddingPx = Number.isFinite(padding) ? padding * 2 : 12;
        const baseline = (this.baseFontSizePx * this.cellLineHeightMultiplier) + this.cellVerticalPaddingPx;
        this.rowHeightSlackPx = Math.max(0, (this.config?.cellHeight || baseline) - baseline);
        this.defaultAutoRowHeight = this.computeRowHeightForFontSize(this.getDefaultFontSizeForAutoHeight());
        if (!this.initialDefaultRowHeight) {
            this.initialDefaultRowHeight = this.defaultAutoRowHeight;
        }
    }

    readCssNumber(varName, fallback) {
        try {
            const root = document.documentElement;
            if (!root) return fallback;
            const raw = getComputedStyle(root).getPropertyValue(varName);
            const parsed = parseFloat(raw);
            return Number.isFinite(parsed) ? parsed : fallback;
        } catch (error) {
            return fallback;
        }
    }

    getDefaultFontSizeForAutoHeight() {
        const defaultFontSize = Number(this.defaultCellStyle?.fontSize);
        if (Number.isFinite(defaultFontSize) && defaultFontSize > 0) return defaultFontSize;
        return this.baseFontSizePx || 12;
    }

    computeRowHeightForFontSize(fontSize) {
        const size = Number(fontSize);
        const effectiveSize = Number.isFinite(size) && size > 0 ? size : this.getDefaultFontSizeForAutoHeight();
        const height = (effectiveSize * this.cellLineHeightMultiplier) + this.cellVerticalPaddingPx + (this.rowHeightSlackPx || 0);
        const minHeight = this.config?.cellHeight || height;
        return Math.max(minHeight, Math.ceil(height));
    }

    recalculateAutoRowHeights(rows = null) {
        const targetRows = rows instanceof Set ? new Set(Array.from(rows).map(r => Number(r))) :
            Array.isArray(rows) ? new Set(rows.map(r => Number(r))) :
            (Number.isFinite(rows) ? new Set([Number(rows)]) : null);

        const prevDefaultHeight = this.defaultAutoRowHeight;
        const defaultFontSize = this.getDefaultFontSizeForAutoHeight();
        const computedDefault = this.computeRowHeightForFontSize(defaultFontSize);
        this.defaultAutoRowHeight = computedDefault;

        const rowMaxFont = new Map();
        if (targetRows) {
            targetRows.forEach(row => rowMaxFont.set(row, defaultFontSize));
        } else {
            this.autoRowHeights.forEach((_, row) => rowMaxFont.set(Number(row), defaultFontSize));
        }

        this.cellData.forEach((data, key) => {
            const coordKey = key;
            const { row, col } = this.getCoordPos(coordKey);
            if (targetRows && !targetRows.has(row)) return;
            if (this.rowHeightModes.get(row) === 'explicit') return;
            // Skip styling-only cells so empty merged parts don't inflate row heights after unmerge
            if (!this.cellHasText(data)) return;
            // Ignore merged children so hidden content doesn't keep rows tall
            if (this.cellToMergeParent.has(coordKey)) return;
            // Also ignore merged parents that span multiple rows; their height is shared across the merge
            const mergeInfo = this.mergedCells.get(coordKey);
            if (mergeInfo && mergeInfo.rows > 1) return;
            const existing = rowMaxFont.get(row);
            const currentMax = Number.isFinite(existing) ? existing : defaultFontSize;
            const cellFont = Number(data?.fontSize);
            const inlineMax = this.getMaxFontSizeInHTML(data?.richText);
            let effective = defaultFontSize;
            if (Number.isFinite(cellFont) && cellFont > 0) effective = cellFont;
            if (Number.isFinite(inlineMax) && inlineMax > 0) effective = Math.max(effective, inlineMax);
            rowMaxFont.set(row, Math.max(currentMax, effective));
        });

        const rowsToProcess = targetRows
            ? new Set(targetRows)
            : new Set([
                ...rowMaxFont.keys(),
                ...Array.from(this.autoRowHeights.keys(), k => Number(k)),
                ...Array.from(this.rowDefaultHeightOverrides.keys(), k => Number(k))
            ]);

        let changed = this.defaultAutoRowHeight !== prevDefaultHeight || (targetRows && targetRows.size > 0);
        rowsToProcess.forEach(row => {
            if (this.rowHeights.has(row) || this.rowHeightModes.get(row) === 'explicit') {
                if (this.autoRowHeights.delete(row)) changed = true;
                return;
            }

            const maxFont = rowMaxFont.has(row) ? rowMaxFont.get(row) : defaultFontSize;
            const desiredHeight = this.computeRowHeightForFontSize(maxFont);
            const existing = this.autoRowHeights.get(row);
            const baseHeight = this.getDefaultRowHeightForRow(row);

            if (desiredHeight > baseHeight) {
                if (existing !== desiredHeight) {
                    this.autoRowHeights.set(row, desiredHeight);
                    this.rowHeightModes.set(row, 'implicit');
                    changed = true;
                }
            } else {
                if (this.autoRowHeights.has(row)) {
                    this.autoRowHeights.delete(row);
                    this.rowHeightModes.delete(row);
                    changed = true;
                }
            }
        });

        if (changed) {
            this.refreshLayoutAfterRowHeightChange();
        }
    }

    refreshLayoutAfterRowHeightChange() {
        this.updateGridSize();
        this.repositionCells();
        this.updateHeaderPositions();
        this.renderSelectionOverlays();
        this.renderBorderOverlays();
    }

    describeSizeDifferences(beforeSize, afterSize, { dimensionKind = null, modeBefore = null, modeAfter = null } = {}) {
        const changes = [];
        if (!beforeSize || !afterSize) return changes;
        const beforeWidth = Number.isFinite(beforeSize.width) ? beforeSize.width : null;
        const afterWidth = Number.isFinite(afterSize.width) ? afterSize.width : null;
        if (beforeWidth !== null && afterWidth !== null && beforeWidth !== afterWidth) {
            changes.push(`column width: ${Math.round(beforeWidth)}px → ${Math.round(afterWidth)}px`);
        }
        const beforeHeight = Number.isFinite(beforeSize.height) ? beforeSize.height : null;
        const afterHeight = Number.isFinite(afterSize.height) ? afterSize.height : null;
        if (beforeHeight !== null && afterHeight !== null && beforeHeight !== afterHeight) {
            let change = `row height: ${Math.round(beforeHeight)}px → ${Math.round(afterHeight)}px`;
            if (dimensionKind === 'row') {
                const afterLabel = (modeAfter || 'implicit');
                change += ` (${afterLabel})`;
            }
            changes.push(change);
        }
        return changes;
    }

    describeDefaultStyleDifferences(before = {}, after = {}) {
        return this.describeStyleDifferences(before, after);
    }

    describeDefaultOverrides(after = {}) {
        if (!after || typeof after !== 'object') return null;
        const rows = [];

        const addEntry = (label, propValues) => {
            if (!propValues.length) return;
            rows.push(`${label} (${propValues.join(', ')})`);
        };

        const appendDifferences = (label, entry) => {
            if (!entry || typeof entry !== 'object') return;
            const propValues = [];
            STYLE_PROPS.forEach(prop => {
                if (!Object.prototype.hasOwnProperty.call(entry, prop)) return;
                const val = entry[prop];
                const defaultVal = after[prop];
                if (val === undefined || val === null) return;
                if (defaultVal === undefined || this.normalizeField(val, prop) === this.normalizeField(defaultVal, prop)) return;
                propValues.push(`${this.getStyleLabel(prop)} ${this.normalizeField(val, prop)}`);
            });
            addEntry(label, propValues);
        };

        // Row-level overrides
        if (this.rowStyles instanceof Map) {
            this.rowStyles.forEach((entry, key) => {
                const idx = Number(key);
                if (!Number.isInteger(idx)) return;
                appendDifferences(`Row ${idx + 1}`, entry);
            });
        }

        // Column-level overrides
        if (this.columnStyles instanceof Map) {
            this.columnStyles.forEach((entry, key) => {
                const idx = Number(key);
                if (!Number.isInteger(idx)) return;
                appendDifferences(`Column ${this.getColumnName(idx)}`, entry);
            });
        }

        // Cell-level overrides
        this.cellData.forEach((entry, coord) => {
            const { row, col } = this.getCoordPos(coord);
            appendDifferences(this.getCellAddress(row, col), entry);
        });

        if (!rows.length) return null;
        const maxEntries = 6;
        const visible = rows.slice(0, maxEntries);
        const remaining = rows.length - visible.length;
        const suffix = remaining > 0 ? ` (+${remaining} more)` : '';
        return `exceptions: ${visible.join('; ')}${suffix}`;
    }

    extractStyleSnapshot(entry = {}) {
        const snapshot = {};
        if (!entry || typeof entry !== 'object') return snapshot;
        STYLE_PROPS.forEach(prop => {
            if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                snapshot[prop] = entry[prop];
            }
        });
        return snapshot;
    }

    getStyleLabel(prop) {
        const labels = {
            backgroundColor: 'background',
            fontColor: 'font color',
            fontSize: 'font size',
            bold: 'bold',
            italic: 'italic',
            underline: 'underline',
            strikethrough: 'strikethrough',
            textAlign: 'text align',
            verticalAlign: 'vertical align'
        };
        return labels[prop] || prop;
    }

    describeStyleDifferences(before = {}, after = {}) {
        const beforeSnap = this.extractStyleSnapshot(before);
        const afterSnap = this.extractStyleSnapshot(after);
        const changes = [];
        STYLE_PROPS.forEach(prop => {
            const beforeVal = this.normalizeField(beforeSnap[prop], prop);
            const afterVal = this.normalizeField(afterSnap[prop], prop);
            if (beforeVal === afterVal) return;
            changes.push(`${this.getStyleLabel(prop)}: ${beforeVal} → ${afterVal}`);
        });
        return changes;
    }

    getChangedColumns() {
        return this.getChangedIndices({
            initial: this.initialColumnWidths,
            current: this.columnWidths,
            getSnapshotSize: index => this.getSnapshotColumnWidth(this.initialColumnWidths, index),
            getSize: index => this.getColumnWidth(index)
        });
    }

    getChangedRows() {
        const initialCombined = new Map(this.initialRowHeights || []);
        if (this.initialAutoRowHeights instanceof Map) {
            this.initialAutoRowHeights.forEach((value, key) => {
                if (!initialCombined.has(key)) initialCombined.set(key, value);
            });
        }

        const currentCombined = new Map(this.rowHeights || []);
        if (this.autoRowHeights instanceof Map) {
            this.autoRowHeights.forEach((value, key) => {
                if (!currentCombined.has(key)) currentCombined.set(key, value);
            });
        }

        return this.getChangedIndices({
            initial: initialCombined,
            current: currentCombined,
            getSnapshotSize: index => this.getSnapshotRowHeight(this.initialRowHeights, index, this.initialAutoRowHeights, this.initialDefaultRowHeight, this.initialRowDefaultHeightOverrides),
            getSize: index => this.getRowHeight(index)
        });
    }

    getDimensionSizes(kind, index) {
        const isColumn = kind === 'column';
        const beforeSize = isColumn ? {
            width: this.getSnapshotColumnWidth(this.initialColumnWidths, index),
            height: this.getSnapshotRowHeight(this.initialRowHeights, 0, this.initialAutoRowHeights, this.initialDefaultRowHeight, this.initialRowDefaultHeightOverrides)
        } : {
            width: this.getSnapshotColumnWidth(this.initialColumnWidths, 0),
            height: this.getSnapshotRowHeight(this.initialRowHeights, index, this.initialAutoRowHeights, this.initialDefaultRowHeight, this.initialRowDefaultHeightOverrides)
        };
        const afterSize = isColumn ? {
            width: this.getColumnWidth(index),
            height: this.getRowHeight(0)
        } : {
            width: this.getColumnWidth(0),
            height: this.getRowHeight(index)
        };
        return { beforeSize, afterSize, isColumn };
    }

    forEachDimensionSizeChange(kind, handler) {
        const indices = kind === 'column' ? this.getChangedColumns() : this.getChangedRows();
        indices.forEach(index => {
            const { beforeSize, afterSize, isColumn } = this.getDimensionSizes(kind, index);
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize, {
                dimensionKind: kind === 'row' ? 'row' : null,
                modeBefore: kind === 'row' ? this.getRowHeightMode(this.initialRowHeightModes, index, 'implicit') : null,
                modeAfter: kind === 'row' ? this.getRowHeightMode(this.rowHeightModes, index, 'implicit') : null
            });
            if (!sizeChanges.length) return;
            handler({ index, beforeSize, afterSize, sizeChanges, isColumn });
        });
    }

    getChangedIndices({ initial, current, getSnapshotSize, getSize }) {
        const indices = new Set();
        const collectKeys = (source) => {
            if (!source) return;
            if (source instanceof Map) {
                source.forEach((_, key) => {
                    const index = Number(key);
                    if (Number.isInteger(index)) indices.add(index);
                });
            } else if (Array.isArray(source)) {
                source.forEach(entry => {
                    if (!entry) return;
                    const index = Number(entry[0]);
                    if (Number.isInteger(index)) indices.add(index);
                });
            } else {
                Object.keys(source).forEach(key => {
                    const index = Number(key);
                    if (Number.isInteger(index)) indices.add(index);
                });
            }
        };

        collectKeys(initial);
        collectKeys(current);

        return Array.from(indices).filter(index => {
            const before = getSnapshotSize(index);
            const after = getSize(index);
            return Math.abs(before - after) >= 0.1;
        }).sort((a, b) => a - b);
    }

    collectDiffBorderStyles(row, col, cellRecord, snapshotMap) {
        const map = snapshotMap instanceof Map ? snapshotMap : new Map();
        const getCell = (r, c) => map.get(`${r},${c}`) || null;
        const sides = ['top', 'right', 'bottom', 'left'];
        const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
        const styles = [];
        let initialized = false;

        const formatBorder = (border) => {
            if (!border) return '';
            const match = border.match(/^(\d+(?:\.\d+)?)px\s+(.+)$/);
            if (match) {
                const halfWidth = parseFloat(match[1]) / 2;
                return `${halfWidth}px ${match[2]}`;
            }
            return border;
        };

        sides.forEach(side => {
            const ownBorder = cellRecord?.borders?.[side];
            let effective = ownBorder;
            if (!effective) {
                let neighbor;
                switch (side) {
                    case 'top':
                        neighbor = getCell(row - 1, col);
                        break;
                    case 'bottom':
                        neighbor = getCell(row + 1, col);
                        break;
                    case 'left':
                        neighbor = getCell(row, col - 1);
                        break;
                    case 'right':
                        neighbor = getCell(row, col + 1);
                        break;
                }
                effective = neighbor?.borders?.[opposite[side]] || '';
            }
            if (effective) {
                if (!initialized) {
                    styles.push('border: 1px solid transparent');
                    initialized = true;
                }
                styles.push(`border-${side}:${formatBorder(effective)}`);
            }
        });

        return styles;
    }

    applyPendingCommentAuthors() {
        if (!this.currentUserLogin) return false;
        const username = `${this.currentUserLogin}`.trim();
        if (!username) return false;
        const profileUrl = this.buildAccountProfileUrl(username);
        const avatar = this.getActiveUserAvatar();
        const updatedCoords = [];

        const promoteIfNeeded = (targetEntry, sourceInfo) => {
            if (!sourceInfo) return false;
            if (sourceInfo.localOnly !== true) return false;
            const reason = sourceInfo.anonymousReason;
            if (reason === 'opt-in' || reason === 'unauthenticated') return false;
            const currentAuthor = `${sourceInfo.author || ''}`.trim();
            const currentAuthorId = `${sourceInfo.authorId || ''}`.trim();
            const normalizedLogin = username.toLowerCase();
            if (currentAuthor && currentAuthorId && currentAuthorId.toLowerCase() === normalizedLogin && currentAuthor.toLowerCase() === normalizedLogin) {
                return false;
            }

            targetEntry.author = username;
            targetEntry.authorId = username;
            targetEntry.profileUrl = profileUrl;
            targetEntry.avatar = avatar;
            targetEntry.at = targetEntry.at || sourceInfo.at || Date.now();
            targetEntry.anonymous = false;
            targetEntry.anonymousReason = null;
            targetEntry.localOnly = true;
            return true;
        };

        this.cellData.forEach((value, coord) => {
            const info = this.normalizeCommentData(value.comment);
            if (!info?.text) return;
            const base = value.comment && typeof value.comment === 'object'
                ? { ...value.comment }
                : this.cloneCommentEntry(info);
            if (!base) return;

            let changed = promoteIfNeeded(base, info);

            if (Array.isArray(info.replies) && info.replies.length) {
                const replyList = Array.isArray(base.replies)
                    ? base.replies.map(reply => ({ ...reply }))
                    : info.replies.map(reply => this.cloneCommentEntry(reply));
                replyList.forEach((entry, idx) => {
                    const sourceReply = info.replies[idx] || this.normalizeCommentData(entry);
                    if (promoteIfNeeded(entry, sourceReply)) {
                        replyList[idx] = entry;
                        changed = true;
                    }
                });
                base.replies = replyList;
            }

            if (changed) {
                this.updateCellDataEntry(coord, data => {
                    data.comment = base;
                });
                updatedCoords.push(coord);
            }
        });

        if (updatedCoords.length) {
            this.refreshAllVisibleCells();
            this.updateCommentPopover();
            this.updateDirtyState();
            return true;
        }

        return false;
    }

    async gatherSaveArtifacts() {
        this.applyPendingCommentAuthors();
        // Ensure repo config is loaded before generating HTML
        if (!this.repoConfig) {
            this.repoConfig = await this.loadRepoConfig();
        }
        
        const range = this.getUsedRange();
        this.persistedRange = { maxRow: range.maxRow, maxCol: range.maxCol };
        const tableMarkup = this.generateStaticTableHTML(range);
        const fullHTML = this.buildFullHTMLDocument(tableMarkup);
        const diff = this.generateDiffText();
        return {
            fullHTML,
            diffText: diff.text,
            diffTruncated: diff.truncated
        };
    }

    ensureSaveOptionsModal() {
        if (this.saveModal) return;
        document.body.insertAdjacentHTML('beforeend', SAVE_OPTIONS_MODAL_HTML);
        this.saveModal = document.getElementById('saveOptionsModal');
        this.saveModalStatus = document.getElementById('saveModalStatus');
        this.saveModalOAuth = document.getElementById('saveModalOAuthInfo');

        this.saveModal?.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;

            if (target.hasAttribute('data-modal-dismiss')) {
                this.hideSaveOptionsModal();
                return;
            }

            if (target.dataset.saveAction) {
                const action = target.dataset.saveAction;
                switch (action) {
                    case 'download':
                        this.handleDownloadOption();
                        break;
                    case 'issue':
                        this.handleIssueOption();
                        break;
                    case 'pull-request':
                        this.handlePullRequestOption();
                        break;
                    case 'discard':
                        this.handleDiscardLocalChanges();
                        break;
                    default:
                        break;
                }
            }
        });
    }

    _toggleDialog(dialogElement, showFn) {
        if (!dialogElement.classList.contains('hidden')) {
            dialogElement.classList.add('hidden');
            return;
        }
        showFn.call(this);
    }

    showColorPalette() { 
        this._toggleDialog(this.colorPalette, () => this._managePalette('show', 'color')); 
    }

    showFontColorPalette() { 
        this._toggleDialog(this.fontColorPalette, () => this._managePalette('show', 'fontColor')); 
    }

    showBorderMenu() { 
        this._toggleDialog(this.borderMenu, () => this._managePalette('show', 'border')); 
    }

    showSaveOptionsModal() {
        this._toggleDialog(this.saveModal, () => {
            this.ensureSaveOptionsModal();
            this.updateDirtyState({ persist: false });
            this.renderSaveModalDiff();
            this.updateSaveModalStatus('');
            this.setSaveModalBusy(false);
            this.saveModal?.classList.remove('hidden');
            this.refreshOAuthInfo();
        });
    }

    hideSaveOptionsModal() {
        if (!this.saveModal) return;
        this.saveModal.classList.add('hidden');
        this.updateSaveModalStatus('');
    }

    updateSaveModalStatus(message, isError = false) {
        if (!this.saveModalStatus) return;
        this.saveModalStatus.textContent = message || '';
        this.saveModalStatus.classList.toggle('save-modal__status--error', Boolean(message && isError));
    }

    primeBranchCommitCache() {
        this.ensureBranchCommits({ refresh: true }).catch(error => {
            console.warn('Unable to prime branch commit info', error);
        });
    }

    shortenSha(sha, length = 7) {
        if (!sha || typeof sha !== 'string') return '';
        return sha.substring(0, Math.max(1, length));
    }

    async ensureBranchCommits({ refresh = false } = {}) {
        const fetchBranchHead = async (owner, repo, branch) => {
            if (!branch) return null;
            try {
                const data = await this.callCodebergApi(
                    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches/${encodeURIComponent(branch)}`,
                    null
                );
                const commit = data?.commit || {};
                const sha = commit.id || commit.sha || commit.sha1 || commit?.commit?.sha || commit?.commit?.id || null;
                const timestamp = commit?.committer?.date ||
                    commit?.author?.date ||
                    commit?.commit?.committer?.date ||
                    commit?.commit?.author?.date ||
                    null;
                const message = commit?.message || commit?.commit?.message || null;
                return {
                    branch,
                    sha,
                    shortSha: sha ? this.shortenSha(sha) : null,
                    date: timestamp ? new Date(timestamp).toISOString() : null,
                    message: message || null
                };
            } catch (error) {
                return {
                    branch,
                    sha: null,
                    shortSha: null,
                    error: error?.message || 'Unable to read branch head'
                };
            }
        };

        const run = async () => {
            if (!this.repoConfig) {
                this.repoConfig = await this.loadRepoConfig();
            }
            const repoConfig = this.repoConfig;
            if (!repoConfig?.owner || !repoConfig?.repo) {
                return { loaded: this.branchCommitSnapshot, latest: this.branchCommitLatest };
            }

            const owner = repoConfig.owner;
            const repository = repoConfig.repo;
            const pageBranch = repoConfig.page_branch || repoConfig.branch || null;
            const codeBranch = repoConfig.code_branch || repoConfig.codeBranch || null;

            const pageInfo = await fetchBranchHead(owner, repository, pageBranch);
            const codeInfo = (codeBranch && codeBranch !== pageBranch)
                ? await fetchBranchHead(owner, repository, codeBranch)
                : (codeBranch ? pageInfo : null);

            if (!this.branchCommitSnapshot) {
                this.branchCommitSnapshot = { page: pageInfo, code: codeInfo };
            }
            this.branchCommitLatest = { page: pageInfo, code: codeInfo };

            return { loaded: this.branchCommitSnapshot, latest: this.branchCommitLatest };
        };

        if (refresh) {
            return run();
        }

        if (!this.branchCommitLoadPromise) {
            this.branchCommitLoadPromise = run().finally(() => {
                this.branchCommitLoadPromise = null;
            });
        }
        return this.branchCommitLoadPromise;
    }

    renderBranchSummaryLine(label, branchName, snapshot, latest) {
        if (!branchName) {
            return `<strong>${label}</strong>: (not set)`;
        }

        if (snapshot?.error) {
            return `<strong>${label}</strong>: ${escapeHTML(branchName)} (commit unavailable: ${escapeHTML(snapshot.error)})`;
        }

        const shortSha = snapshot?.shortSha;
        const latestSha = latest?.shortSha;
        const hasNewer = Boolean(snapshot?.sha && latest?.sha && snapshot.sha !== latest.sha);
        const loadedPart = shortSha ? ` @ ${escapeHTML(shortSha)}` : ' (commit unknown)';
        const freshness = hasNewer && latestSha ? ` (latest ${escapeHTML(latestSha)})` : '';
        const warning = hasNewer
            ? `<span class="save-modal__commit-warning" aria-label="Newer commit available" title="Newer commit available on ${escapeHTML(branchName)}">⚠️</span>`
            : '';

        return `<strong>${label}</strong>: ${escapeHTML(branchName)}${loadedPart}${freshness}${warning}`;
    }

    async refreshOAuthInfo() {
        if (!this.saveModalOAuth) return;
        const cachedCommits = { loaded: this.branchCommitSnapshot, latest: this.branchCommitLatest };
        if (this.oauthConfig && this.repoConfig) {
            this.saveModalOAuth.innerHTML = this.renderOAuthSummary(this.oauthConfig, this.repoConfig, cachedCommits);
        } else {
            this.saveModalOAuth.innerHTML = '<em>Checking OAuth configuration…</em>';
        }

        try {
            const [oauthConfig, repoConfig, branchCommits] = await Promise.all([
                this.loadOauthConfig(),
                this.loadRepoConfig(),
                this.ensureBranchCommits({ refresh: true })
            ]);
            
            if (oauthConfig?.clientId) {
                this.saveModalOAuth.innerHTML = this.renderOAuthSummary(oauthConfig, repoConfig, branchCommits);
            } else {
                this.saveModalOAuth.innerHTML = 'No OAuth credentials found. Add <code>oauth.clientId</code> to <code>codeberg-repo.json</code> (and optional <code>clientSecret</code> for confidential clients) to enable PR creation.';
            }
        } catch (error) {
            console.error('Unable to load OAuth config', error);
            this.saveModalOAuth.innerHTML = `Failed to read OAuth configuration: ${escapeHTML(error.message || 'Unknown error')}`;
        }
    }

    renderOAuthSummary(oauthConfig, repoConfig, branchCommits = null) {
        const redirect = oauthConfig.redirectUri || `${window.location.origin}${window.location.pathname}`;
        const clientType = oauthConfig.clientSecret ? 'Confidential client' : 'Public client';
        const targetBranch = repoConfig?.page_branch || repoConfig?.branch || '(repository default)';
        const codeBranch = repoConfig?.code_branch || repoConfig?.codeBranch || '(not set)';

        const lines = [
            `<strong>OAuth client</strong>: ${escapeHTML(oauthConfig.clientId)}`,
            `<strong>Redirect URI</strong>: ${escapeHTML(redirect)}`,
            `<strong>Client type</strong>: ${clientType}`
        ];

        lines.push(this.renderBranchSummaryLine('Page branch', targetBranch, branchCommits?.loaded?.page, branchCommits?.latest?.page));
        lines.push(this.renderBranchSummaryLine('Code branch', codeBranch, branchCommits?.loaded?.code, branchCommits?.latest?.code));

        return lines.join('<br>');
    }

    handleDownloadOption() {
        this.setSaveModalBusy(true);
        (async () => {
            try {
                this.updateSaveModalStatus('Preparing download…');
                const artifacts = await this.gatherSaveArtifacts();
                this.downloadHTML(artifacts.fullHTML);
                this.markChangesPersisted();
                this.renderSaveModalDiff();
                this.updateSaveModalStatus('Downloaded index.html.');
            } catch (error) {
                console.error('Download failed', error);
                this.updateSaveModalStatus('Download failed. See console for details.', true);
                return;
            } finally {
                this.setSaveModalBusy(false);
            }

            setTimeout(() => this.hideSaveOptionsModal(), 800);
        })();
    }

    async handleIssueOption() {
        const artifacts = await this.gatherSaveArtifacts();
        this.setSaveModalBusy(true);
        try {
            this.updateSaveModalStatus('Preparing issue summary…');
            await this.submitIssueRequest(artifacts);
            this.markChangesPersisted();
            this.renderSaveModalDiff();
            this.updateSaveModalStatus('Issue draft opened in a new tab.');
            setTimeout(() => this.hideSaveOptionsModal(), 800);
        } catch (error) {
            console.error('Unable to open issue', error);
            this.updateSaveModalStatus(error.message || 'Unable to open issue.', true);
        } finally {
            this.setSaveModalBusy(false);
        }
    }

    async submitIssueRequest(artifacts) {
        const { diffText, diffTruncated } = artifacts;
        const repo = await this.resolveCodebergRepo();
        if (!repo) {
            throw new Error('Repository could not be detected.');
        }

        const issueUrl = this.buildCodebergIssueUrl(repo, diffText, diffTruncated);
        if (typeof window !== 'undefined' && window.open) {
            window.open(issueUrl, '_blank', 'noopener');
        }
    }

    async handlePullRequestOption(resumeFromOAuth = false) {
        this.setSaveModalBusy(true);
        try {
            let artifacts = null;
            if (!resumeFromOAuth) {
                this.updateSaveModalStatus('Gathering changes for pull request…');
                if (sessionStorage.getItem('codeberg_oauth_in_progress') === 'true') {
                    this.updateSaveModalStatus('Authorization already in progress. Complete the Codeberg consent flow in the other tab.', true);
                    return;
                }
            }

            artifacts = await this.gatherSaveArtifacts(); // Make sure this is awaited
            const repo = await this.resolveCodebergRepo();
            if (!repo) {
                this.updateSaveModalStatus('Repository could not be detected. Use download to save your work.', true);
                return;
            }

            const token = await this.ensureAccessToken('create-pr');
            if (!token) {
                if (sessionStorage.getItem('codeberg_oauth_in_progress') === 'true') {
                    this.updateSaveModalStatus('Waiting for Codeberg authorization…');
                } else {
                    this.updateSaveModalStatus('Redirecting to Codeberg for authorization…');
                }
                return;
            }

            try {
                await this.refreshCodebergProfileBadge();
            } catch (error) {
                console.warn('Failed to refresh Codeberg profile before pull request', error);
            }

            artifacts = await this.gatherSaveArtifacts();

            this.updateSaveModalStatus('Submitting pull request…');
            const prUrl = await this.submitPullRequest(repo, artifacts, token);
            this.markChangesPersisted();
            this.renderSaveModalDiff();
            this.updateSaveModalStatus('Pull request created successfully.');
            if (prUrl && typeof window !== 'undefined') {
                window.open(prUrl, '_blank', 'noopener');
            }
            setTimeout(() => this.hideSaveOptionsModal(), 1200);
        } catch (error) {
            console.error('Unable to create pull request', error);
            this.updateSaveModalStatus(error.message || 'Pull request failed.', true);
            if ((error?.message || '').includes('required scope')) {
                this.clearStoredAccessToken();
                this.clearOAuthSession();
                this.updateSaveModalStatus('Token missing required permissions. Please authorize again.', true);
            }
            if ((error?.message || '').includes('authorize again')) {
                this.clearStoredAccessToken();
                this.clearOAuthSession();
                this.updateSaveModalStatus('Authentication failed. Please authorize again.', true);
            }
        } finally {
            this.setSaveModalBusy(false);
        }
    }

    maybeHandleOAuthRedirect() {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (!code || !state) {
            return;
        }

        params.delete('code');
        params.delete('state');
        const newQuery = params.toString();
        const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}${window.location.hash}`;
        window.history.replaceState({}, document.title, newUrl);

        const expectedState = sessionStorage.getItem('codeberg_oauth_state');
        const action = sessionStorage.getItem('codeberg_oauth_action');
        const verifier = sessionStorage.getItem('codeberg_oauth_verifier');

        const actionFromState = state.split(':')[1] || action;
        if (!sessionStorage.getItem('codeberg_oauth_action')) {
            sessionStorage.setItem('codeberg_oauth_action', actionFromState);
        }

        if (!expectedState || expectedState !== state || !verifier) {
            console.warn('OAuth state mismatch or verifier missing.');
            this.clearOAuthSession();
            return;
        }

        this.completeOAuthExchange(code, verifier, actionFromState).catch(error => {
            console.error('OAuth exchange failed', error);
            this.updateSaveModalStatus('Authorization failed. Please try again.', true);
            this.clearOAuthSession();
        });
    }

    clearOAuthSession() {
        sessionStorage.removeItem('codeberg_oauth_state');
        sessionStorage.removeItem('codeberg_oauth_verifier');
        sessionStorage.removeItem('codeberg_oauth_action');
        sessionStorage.removeItem('codeberg_oauth_in_progress');
    }

    async completeOAuthExchange(code, verifier, action) {
        const config = await this.loadOauthConfig();
        if (!config) {
            throw new Error('OAuth configuration is missing.');
        }

        const bodyParams = new URLSearchParams({
            client_id: config.clientId,
            code,
            grant_type: 'authorization_code',
            code_verifier: verifier,
            redirect_uri: config.redirectUri || `${window.location.origin}${window.location.pathname}`
        });
        if (config.clientSecret) {
            bodyParams.set('client_secret', config.clientSecret);
        }

        const response = await fetch(CODEBERG_OAUTH_TOKEN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyParams.toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OAuth token exchange failed (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        if (!data.access_token) {
            throw new Error('OAuth token response missing access_token.');
        }

        const expiresIn = data.expires_in ? Number(data.expires_in) * 1000 : 3600 * 1000;
        const tokenInfo = {
            token: data.access_token,
            tokenType: data.token_type || 'Bearer',
            expiresAt: Date.now() + expiresIn - 60000,
            refreshToken: data.refresh_token || null
        };
        this.storeAccessToken(tokenInfo);
        this.clearOAuthSession();

        if (action === 'create-pr') {
            // Continue PR automatically after token acquisition
            setTimeout(() => {
                this.ensureSaveOptionsModal();
                this.showSaveOptionsModal();
                this.updateSaveModalStatus('Authorization complete. Creating pull request…');
                this.handlePullRequestOption(true);
            }, 0);
        }
    }

    async ensureAccessToken(action) {
        const existing = this.getStoredAccessToken();
        if (existing) {
            return existing.token;
        }

        const inProgress = sessionStorage.getItem('codeberg_oauth_in_progress');
        if (inProgress === 'true') {
            return null;
        }

        const config = await this.loadOauthConfig();
        if (!config) {
            throw new Error('OAuth configuration is missing. Provide oauth.clientId (and optionally clientSecret) in codeberg-repo.json or codeberg-oauth.json.');
        }

        try {
            await this.beginOAuthFlow(config, action);
        } catch (error) {
            this.clearOAuthSession();
            throw error;
        }
        return null;
    }

    async beginOAuthFlow(config, action) {
        if (typeof window === 'undefined') return;

        const verifier = this.generateCodeVerifier();
        const challenge = await this.computeCodeChallenge(verifier);
        const state = `${this.generateRandomState()}:${action}`;
        const redirectUri = config.redirectUri || `${window.location.origin}${window.location.pathname}`;

        sessionStorage.setItem('codeberg_oauth_verifier', verifier);
        sessionStorage.setItem('codeberg_oauth_state', state);
        sessionStorage.setItem('codeberg_oauth_action', action);
        sessionStorage.setItem('codeberg_oauth_in_progress', 'true');

        const authorizeUrl = new URL(CODEBERG_OAUTH_AUTHORIZE);
        authorizeUrl.searchParams.set('client_id', config.clientId);
        authorizeUrl.searchParams.set('redirect_uri', redirectUri);
        authorizeUrl.searchParams.set('response_type', 'code');
        authorizeUrl.searchParams.set('scope', 'write:repository read:user');
        authorizeUrl.searchParams.set('state', state);
        authorizeUrl.searchParams.set('code_challenge', challenge);
        authorizeUrl.searchParams.set('code_challenge_method', 'S256');

        window.location.href = authorizeUrl.toString();
    }

    generateCodeVerifier(length = 64) {
        const array = new Uint8Array(length);
        if (window.crypto?.getRandomValues) {
            window.crypto.getRandomValues(array);
        } else {
            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 256);
            }
        }
        return this.base64UrlEncode(array);
    }

    generateRandomState(length = 16) {
        const array = new Uint8Array(length);
        if (window.crypto?.getRandomValues) {
            window.crypto.getRandomValues(array);
        } else {
            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 256);
            }
        }
        return this.base64UrlEncode(array);
    }

    async computeCodeChallenge(verifier) {
        if (!window.crypto?.subtle) {
            throw new Error('Web Crypto API is required for OAuth PKCE, but is not available in this environment.');
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return this.base64UrlEncode(new Uint8Array(digest));
    }

    base64UrlEncode(input) {
        let output = '';
        if (input instanceof Uint8Array) {
            output = btoa(String.fromCharCode(...input));
        } else {
            output = btoa(unescape(encodeURIComponent(input)));
        }
        return output.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }

    encodeContentToBase64(content) {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(content);
        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode(...chunk);
        }
        return btoa(binary);
    }

    async callCodebergApi(path, token, options = {}) {
        const url = `${CODEBERG_API_BASE}${path}`;
        const headers = Object.assign({
            'Accept': 'application/json'
        }, options.headers || {});
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            let details = '';
            try {
                const data = await response.json();
                details = data?.message || JSON.stringify(data);
            } catch {
                details = await response.text();
            }
            throw new Error(`API ${response.status} ${response.statusText}: ${details}`);
        }

        if (response.status === 204) return null;

        const text = await response.text();
        if (!text) return null;
        try {
            return JSON.parse(text);
        } catch (error) {
            return null;
        }
    }

    buildPullRequestBody(diffText, diffTruncated) {
        const parts = [
            'This pull request updates `index.html` generated from Spreadsheet Pro.',
            '',
            '### Summary of changes'
        ];

        if (diffText) {
            parts.push('```diff', diffText, '```');
        } else {
            parts.push('_No cell-level differences detected._');
        }

        if (diffTruncated) {
            parts.push('', '> ⚠️ Change summary truncated for brevity.');
        }

        parts.push(
            '',
            'The updated HTML file is attached to this PR by the submitter. Please replace the existing `index.html` with the provided content.'
        );

        return parts.join('\n');
    }

    async submitPullRequest(repo, artifacts, token) {
        let repoInfo;
        try {
            repoInfo = await this.callCodebergApi(`/repos/${repo.owner}/${repo.repo}`, token);
        } catch (error) {
            if (`${error.message}`.includes('401')) {
                this.clearStoredAccessToken();
                this.clearOAuthSession();
                throw new Error('Authentication failed. Please authorize again.');
            }
            throw error;
        }
        const defaultBranch = repoInfo.default_branch || 'main';
        const configuredBaseBranch = (repo?.page_branch ?? repo?.branch ?? repo?.prBaseBranch ?? '').trim();
        const baseBranch = configuredBaseBranch || defaultBranch;
        const permissions = repoInfo.permissions || {};
        let user;
        try {
            user = await this.callCodebergApi('/user', token);
        } catch (error) {
            if (`${error.message}`.includes('401')) {
                this.clearStoredAccessToken();
                this.clearOAuthSession();
                throw new Error('Authentication failed. Please authorize again.');
            }
            throw error;
        }
        const login = user.login;

        let targetOwner = repo.owner;
        let targetRepo = repo.repo;

        if (!permissions.push) {
            await this.callCodebergApi(`/repos/${repo.owner}/${repo.repo}/forks`, token, { method: 'POST' });
            targetOwner = login;
            targetRepo = repo.repo;

            // Wait for fork to be ready
            let attempts = 0;
            const maxAttempts = 10;
            while (attempts < maxAttempts) {
                try {
                    await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}`, token);
                    break;
                } catch (error) {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error('Fork repository is not available yet. Please try again in a moment.');
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            }
        }

        const branchName = `update-index-${new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)}`;

        try {
            await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/branches`, token, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    new_branch_name: branchName,
                    old_branch_name: baseBranch
                })
            });
        } catch (error) {
            if (!`${error.message}`.includes('already exists')) {
                throw error;
            }
        }

        let fileInfo;
        try {
            fileInfo = await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents/index.html?ref=${encodeURIComponent(branchName)}`, token);
        } catch (error) {
            fileInfo = await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents/index.html?ref=${encodeURIComponent(baseBranch)}`, token);
        }
        const encodedContent = this.encodeContentToBase64(artifacts.fullHTML);

        await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents/index.html`, token, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: encodedContent,
                message: `Update index.html (${new Date().toISOString()})`,
                branch: branchName,
                sha: fileInfo.sha
            })
        });

        const prTitle = `Update index.html (${new Date().toISOString().split('T')[0]})`;
        const prBody = this.buildPullRequestBody(artifacts.diffText, artifacts.diffTruncated);

        const pr = await this.callCodebergApi(`/repos/${repo.owner}/${repo.repo}/pulls`, token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: prTitle,
                body: prBody,
                head: `${targetOwner}:${branchName}`,
                base: baseBranch
            })
        });

        return pr?.html_url || pr?.url || '';
    }

    compareCellData(before = {}, after = {}) {
        const fields = [
            ['value', 'value'],
            ['backgroundColor', 'background'],
            ['fontColor', 'font color'],
            ['fontSize', 'font size'],
            ['bold', 'bold'],
            ['italic', 'italic'],
            ['underline', 'underline'],
            ['strikethrough', 'strikethrough'],
            ['textAlign', 'text align'],
            ['verticalAlign', 'vertical align'],
            ['linkUrl', 'link'],
            ['comment', 'comment'],
            ['borders', 'borders'],
            ['richText', 'rich text']
        ];

        const changes = [];

        fields.forEach(([key, label]) => {
            const beforeVal = this.normalizeField(before[key], key);
            const afterVal = this.normalizeField(after[key], key);
            if (beforeVal === afterVal) return;
            changes.push(`${label}: ${beforeVal} → ${afterVal}`);
        });

        return changes;
    }

    normalizeField(value, key) {
        // Treat "cleared" styles as falling back to the current default value so diffs
        // reflect the effective state instead of a noisy "cleared" marker.
        if (STYLE_PROPS.includes(key) && value === null) {
            const fallback = this.defaultCellStyle?.[key];
            value = fallback !== undefined ? fallback : undefined;
        }

        if (key === 'bold' || key === 'italic' || key === 'underline' || key === 'strikethrough') {
            return value ? 'on' : 'off';
        }

        if (key === 'comment') {
            const info = this.normalizeCommentData(value);
            if (!info?.text) return '∅';
            const meta = [];
            const isAnonymous = info.anonymous || (!info.authorId && (info.author || '').toLowerCase() === 'anonymous');
            if (isAnonymous) {
                meta.push('anonymous');
            } else if (info.authorId) {
                meta.push(`user:${info.authorId}`);
            } else if (info.author) {
                meta.push(info.author);
            }
            const replyTexts = Array.isArray(info.replies)
                ? info.replies.filter(entry => entry?.text).map(entry => entry.text)
                : [];
            if (Array.isArray(info.reactions) && info.reactions.length) {
                const counts = info.reactions.map(r => `${r.emoji}×${(r.users || []).length || 0}`);
                meta.push(`reactions:${counts.join(',')}`);
            }
            if (Array.isArray(info.replies)) {
                const replyReactions = info.replies
                    .filter(entry => Array.isArray(entry?.reactions) && entry.reactions.length)
                    .map(entry => {
                        const counts = entry.reactions.map(r => `${r.emoji}×${(r.users || []).length || 0}`);
                        return `${entry.id || 'reply'}:[${counts.join(',')}]`;
                    });
                if (replyReactions.length) {
                    meta.push(`reply-reactions:${replyReactions.join(';')}`);
                }
            }
            if (Number.isFinite(info.at)) {
                const ts = this.formatCommentTimestamp(info.at);
                if (ts) meta.push(ts);
            }
            if (replyTexts.length) {
                const summary = replyTexts.join(' | ');
                const preview = summary.length > 60 ? `${summary.slice(0, 60)}…` : summary;
                meta.push(`replies:${preview}`);
            }
            return meta.length ? `"${info.text}" (${meta.join(', ')})` : `"${info.text}"`;
        }

        if (key === 'fontSize') {
            return value ? `${value}px` : 'default';
        }

        if (key === 'textAlign') {
            const val = value || 'left';
            return val === 'left' ? 'default' : val;
        }

        if (key === 'verticalAlign') {
            const val = value || 'bottom';
            return val === 'bottom' ? 'default' : val;
        }

        if (key === 'richText') {
            if (!value) return '∅';
            const summary = this.summarizeRichText(value);
            const preview = summary.text
                ? (summary.text.length > 40 ? `${summary.text.slice(0, 40)}…` : summary.text)
                : '(rich text)';
            const colorPart = summary.colors.length
                ? ` colors:${summary.colors.join(',')}`
                : ' colors:none';
            const sig = summary.fingerprint ? ` sig:${summary.fingerprint}` : '';
            return `"${preview}"${colorPart}${sig}`;
        }

        if (key === 'borders') {
            return value ? JSON.stringify(value) : 'none';
        }

        return this.formatValue(value);
    }

    summarizeRichText(html = '') {
        if (!html) return { text: '', colors: [], fingerprint: '' };
        const normalizedHtml = this.sanitizeRichTextHTML(html);
        const container = document.createElement('div');
        container.innerHTML = normalizedHtml;
        const normalized = container.innerHTML;
        const text = (container.textContent || '').replace(/\s+/g, ' ').trim();
        const colors = new Set();

        const addColor = (raw) => {
            if (!raw) return;
            const val = String(raw).trim();
            if (!val) return;
            colors.add(val.toUpperCase());
        };

        const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null);
        while (walker.nextNode()) {
            const el = walker.currentNode;
            if (el.style && el.style.color) addColor(el.style.color);
            const styleAttr = el.getAttribute && el.getAttribute('style');
            if (styleAttr) {
                styleAttr.split(';').forEach(rule => {
                    const [prop, value] = rule.split(':');
                    if (prop && value && prop.trim().toLowerCase() === 'color') {
                        addColor(value);
                    }
                });
            }
            if (el.tagName === 'FONT' && el.hasAttribute('color')) {
                addColor(el.getAttribute('color'));
            }
            if (el.dataset && el.dataset.font) {
                addColor(el.dataset.font);
            }
        }

        // Fallback: scan raw HTML for color tokens
        const colorPattern = /#[0-9a-fA-F]{3,8}\b|(rgb|rgba|hsl|hsla)\([^)]{1,40}\)/gi;
        let match;
        while ((match = colorPattern.exec(normalizedHtml))) {
            addColor(match[0]);
        }

        return { text, colors: Array.from(colors).sort(), fingerprint: this.shortHash(normalized) };
    }

    describeRichText(html = '') {
        if (!html) return '';
        const summary = this.summarizeRichText(html);
        const preview = summary.text
            ? (summary.text.length > 32 ? `${summary.text.slice(0, 32)}…` : summary.text)
            : 'formatted';
        const colors = summary.colors.length ? `colors=${summary.colors.join(',')}` : 'colors=none';
        const sig = summary.fingerprint ? ` sig=${summary.fingerprint}` : '';
        return `${this.formatValue(preview)} ${colors}${sig}`;
    }

    shortHash(input = '') {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
        }
        return (hash >>> 0).toString(36);
    }

    formatValue(value) {
        if (value === undefined || value === null) return '∅';
        if (typeof value === 'string') {
            if (value === '') return '∅';
            return `"${value.replace(/\n/g, '\\n')}"`;
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }

    describeCell(data) {
        if (!data || typeof data !== 'object') return '∅';

        const fragments = [];
        if ('value' in data) fragments.push(`value=${this.formatValue(data.value)}`);
        if (data.backgroundColor) fragments.push(`bg=${data.backgroundColor}`);
        if (data.fontColor) fragments.push(`font=${data.fontColor}`);
        if (data.fontSize) fragments.push(`size=${data.fontSize}px`);
        if (data.bold) fragments.push('bold');
        if (data.italic) fragments.push('italic');
        if (data.underline) fragments.push('underline');
        if (data.strikethrough) fragments.push('strikethrough');
        if (data.textAlign && data.textAlign !== 'left') fragments.push(`align=${data.textAlign}`);
        if (data.verticalAlign && data.verticalAlign !== 'bottom') fragments.push(`valign=${data.verticalAlign}`);
        if (data.linkUrl) fragments.push(`link=${data.linkUrl}`);
        const normalizedComment = this.normalizeCommentData(data.comment);
        if (normalizedComment?.text) fragments.push(`comment=${this.formatValue(normalizedComment.text)}`);
        if (normalizedComment?.replies?.length) fragments.push(`replies=${normalizedComment.replies.length}`);
        if (data.borders) fragments.push(`borders=${JSON.stringify(data.borders)}`);
        if (data.richText) fragments.push(`rich=${this.describeRichText(data.richText)}`);

        return fragments.length ? fragments.join(', ') : 'empty';
    }

    normalizeCommentData(raw) {
        if (!raw) return null;
        if (typeof raw === 'string') {
            const text = String(raw);
            const isAnonymous = text.trim().toLowerCase() === 'anonymous';
            return {
                text,
                author: '',
                authorId: null,
                profileUrl: '',
                avatar: '',
                at: null,
                anonymous: isAnonymous,
                anonymousReason: isAnonymous ? 'unknown' : null,
                localOnly: false,
                replies: [],
                reactions: [],
                id: null,
                edited: false
            };
        }
        if (typeof raw === 'object') {
            const rawAuthorId = raw.authorId ?? null;
            const atCandidate = Number(raw.at ?? raw.time ?? raw.timestamp);
            const validAt = Number.isFinite(atCandidate) ? atCandidate : null;
            const authorId = rawAuthorId != null ? String(rawAuthorId).trim() : null;
            const author = `${raw.author ?? raw.user ?? ''}`.trim();
            const profileUrl = raw.profileUrl || (authorId ? this.buildAccountProfileUrl(authorId) : '');
            const anonymous = Boolean(raw.anonymous ?? (author.toLowerCase() === 'anonymous' && !authorId));
            const replies = Array.isArray(raw.replies)
                ? raw.replies.map(entry => this.normalizeCommentData(entry)).filter(Boolean)
                : [];
            const reactions = Array.isArray(raw.reactions)
                ? raw.reactions.map(r => ({
                    emoji: `${r?.emoji ?? ''}`,
                    users: Array.isArray(r?.users) ? r.users.map(u => `${u}`).filter(Boolean) : []
                })).filter(r => r.emoji)
                : [];
            return {
                text: `${raw.text ?? raw.comment ?? ''}`,
                author,
                authorId,
                profileUrl,
                avatar: raw.avatar ?? raw.avatarUrl ?? '',
                at: validAt,
                anonymous,
                anonymousReason: raw.anonymousReason ?? (anonymous ? 'unknown' : null),
                localOnly: Boolean(raw.localOnly),
                replies,
                reactions,
                id: raw.id ? `${raw.id}` : null,
                edited: Boolean(raw.edited)
            };
        }
        return null;
    }

    formatCommentTimestamp(at) {
        if (!Number.isFinite(at)) return '';
        const date = new Date(Number(at));
        if (Number.isNaN(date.getTime())) return '';
        try {
            return date.toLocaleString(undefined, { timeZoneName: 'short' });
        } catch (error) {
            return `${date.toUTCString()} (UTC)`;
        }
    }

    buildCommentTooltip(commentInfo) {
        if (!commentInfo) return '';
        const authorLabel = commentInfo.author || (commentInfo.anonymous ? 'Anonymous' : '');
        const mainMeta = [
            authorLabel ? `by ${authorLabel}` : '',
            this.formatCommentTimestamp(commentInfo.at)
        ].filter(Boolean).join(' • ');
        const mainLine = [mainMeta, commentInfo.text || ''].filter(Boolean).join(mainMeta && commentInfo.text ? ' • ' : '');

        const replyLines = Array.isArray(commentInfo.replies)
            ? commentInfo.replies
                .filter(reply => reply && reply.text)
                .map(reply => {
                    const replyAuthorLabel = reply.author || (reply.anonymous ? 'Anonymous' : '');
                    const replyMeta = [
                        replyAuthorLabel ? `Reply by ${replyAuthorLabel}` : 'Reply',
                        this.formatCommentTimestamp(reply.at)
                    ].filter(Boolean).join(' • ');
                    const replyText = `${reply.text || ''}`;
                    return [replyMeta, replyText].filter(Boolean).join(replyMeta && replyText ? ': ' : '');
                })
            : [];

        if (replyLines.length) {
            return [mainLine, ...replyLines].filter(Boolean).join('\n');
        }

        return mainLine;
    }

    generateCommentId(coord, suffix = 'c') {
        const rand = Math.floor(Math.random() * 1e6);
        return `${coord || 'cell'}-${suffix}-${Date.now().toString(36)}-${rand.toString(36)}`;
    }

    ensureCommentIds(coord, commentInfo) {
        if (!commentInfo) return commentInfo;
        if (!commentInfo.id) commentInfo.id = this.generateCommentId(coord, 'c');
        if (Array.isArray(commentInfo.reactions)) {
            commentInfo.reactions = commentInfo.reactions.map(r => ({
                emoji: r.emoji,
                users: Array.isArray(r.users) ? r.users : []
            }));
        } else {
            commentInfo.reactions = [];
        }
        if (Array.isArray(commentInfo.replies)) {
            commentInfo.replies = commentInfo.replies.map((reply, idx) => {
                const cloned = this.cloneCommentEntry(reply) || reply;
                if (!cloned.id) cloned.id = this.generateCommentId(coord, `r${idx}`);
                return cloned;
            }).filter(Boolean);
        } else {
            commentInfo.replies = [];
        }
        return commentInfo;
    }

    renderCommentWithMentions(text) {
        return this.renderCommentRichText(text);
    }

    renderCommentRichText(text) {
        const raw = typeof text === 'string' ? text : (text == null ? '' : String(text));

        const sanitizeColorValue = (value = '') => {
            const trimmed = value.trim();
            if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return trimmed;
            if (/^(rgb|rgba|hsl|hsla)\([^)]{1,40}\)$/i.test(trimmed)) return trimmed;
            if (/^[a-zA-Z]+$/.test(trimmed)) return trimmed;
            return '';
        };

        const formatLatexColor = (model, rawValue) => {
            const value = `${rawValue || ''}`.trim();
            if (!value) return '';
            const lowerModel = (model || '').toLowerCase();
            if (lowerModel === 'rgb') {
                return sanitizeColorValue(`rgb(${value})`);
            }
            if (lowerModel === 'rgba') {
                return sanitizeColorValue(`rgba(${value})`);
            }
            return sanitizeColorValue(value);
        };

        const restoreAllowedColorTags = (escaped) => {
            const restoreSpan = (full, attrs, inner) => {
                const styleMatch = attrs.match(/style=\"([^\"]*)\"/i);
                const colorMatch = attrs.match(/color=\"([^\"]*)\"/i);
                let color = '';
                if (styleMatch) {
                    styleMatch[1].split(';').forEach(rule => {
                        const [prop, val] = rule.split(':');
                        if (prop && val && prop.trim().toLowerCase() === 'color') {
                            const safe = sanitizeColorValue(val);
                            if (safe) color = safe;
                        }
                    });
                }
                if (!color && colorMatch) {
                    const safe = sanitizeColorValue(colorMatch[1]);
                    if (safe) color = safe;
                }
                if (!color) return full; // leave escaped
                return `<span style="color:${color}">${inner}</span>`;
            };
            const restoreFont = (full, attrs, inner) => {
                const colorMatch = attrs.match(/color=\"([^\"]*)\"/i);
                const safe = colorMatch ? sanitizeColorValue(colorMatch[1]) : '';
                if (!safe) return full;
                return `<span style="color:${safe}">${inner}</span>`;
            };
            return escaped
                .replace(/&lt;span([^&]*)&gt;([\s\S]*?)&lt;\/span&gt;/gi, (m, attrs, inner) => restoreSpan(m, attrs, inner))
                .replace(/&lt;font([^&]*)&gt;([\s\S]*?)&lt;\/font&gt;/gi, (m, attrs, inner) => restoreFont(m, attrs, inner))
                .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
        };

        const applyLatexColors = (input) => {
            const readGroup = (str, startIdx) => {
                if (str[startIdx] !== '{') return null;
                let depth = 0;
                for (let i = startIdx; i < str.length; i++) {
                    const ch = str[i];
                    if (ch === '{') depth++;
                    else if (ch === '}') {
                        depth--;
                        if (depth === 0) {
                            return { content: str.slice(startIdx + 1, i), end: i + 1 };
                        }
                    }
                }
                return null;
            };

            let i = 0;
            let output = '';
            while (i < input.length) {
                const isTextColor = input.startsWith('\\textcolor', i);
                const isColor = !isTextColor && input.startsWith('\\color', i);
                if (!isTextColor && !isColor) {
                    output += input[i];
                    i += 1;
                    continue;
                }

                const cmd = isTextColor ? '\\textcolor' : '\\color';
                let cursor = i + cmd.length;

                // Optional color model [rgb], [rgba], etc.
                let model = '';
                if (input[cursor] === '[') {
                    const close = input.indexOf(']', cursor);
                    if (close !== -1) {
                        model = input.slice(cursor + 1, close);
                        cursor = close + 1;
                    }
                }

                // Skip whitespace
                while (cursor < input.length && /\s/.test(input[cursor])) cursor++;

                const colorGroup = readGroup(input, cursor);
                if (!colorGroup) {
                    output += input[i];
                    i += 1;
                    continue;
                }
                cursor = colorGroup.end;
                const safeColor = formatLatexColor(model, colorGroup.content);

                // Skip whitespace before content group / content command
                while (cursor < input.length && /\s/.test(input[cursor])) cursor++;

                let textGroup = readGroup(input, cursor);
                let consumedLength = 0;

                // Handle \color{c}\textsf{...} style
                if (!textGroup && input.startsWith('\\text', cursor)) {
                    const braceIdx = input.indexOf('{', cursor);
                    if (braceIdx !== -1) {
                        textGroup = readGroup(input, braceIdx);
                        consumedLength = textGroup ? (textGroup.end - cursor) : 0;
                    }
                }

                // Fallback: color a short word/sequence if no braces found
                if (!textGroup) {
                    const fallbackMatch = input.slice(cursor).match(/^(\\?[^\s{}]+)/);
                    if (fallbackMatch) {
                        const fragment = fallbackMatch[1];
                        const painted = safeColor ? `<span style="color:${safeColor}">${fragment}</span>` : fragment;
                        output += painted;
                        i = cursor + fragment.length;
                        continue;
                    }
                    output += input[i];
                    i += 1;
                    continue;
                }

                const content = textGroup.content;
                if (safeColor) {
                    output += `<span style="color:${safeColor}">${content}</span>`;
                } else {
                    output += content;
                }
                i = textGroup ? (cursor + (consumedLength || (textGroup.end - cursor))) : cursor;
            }

            return output;
        };

        let html = escapeHTML(raw || '');
        html = restoreAllowedColorTags(html);
        html = applyLatexColors(html);
        html = html
            .replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>')
            .replace(/\\text(it|sl)\{([^}]*)\}/g, '<em>$2</em>')
            .replace(/\\text(?:sf|tt|rm|up|normal|sc)?\{([^}]*)\}/g, '$1')
            .replace(/\\(large|Large|LARGE|huge|Huge|tiny|scriptsize|footnotesize|small|normalsize)\b/g, '')
            .replace(/\\kern\{[^}]*\}/g, '&nbsp;')
            .replace(/\$\$([^$]*\\(?:textcolor|color)[^$]*)\$\$/g, '$1')
            .replace(/\$([^$]*\\(?:textcolor|color)[^$]*)\$/g, '$1');

        // Code fences first to avoid nested replacements
        const codeBlocks = [];
        html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
            const idx = codeBlocks.length;
            codeBlocks.push(`<pre><code>${escapeHTML(code)}</code></pre>`);
            return `__CODEBLOCK_${idx}__`;
        });

        // Headings (# ...), blockquotes, lists (simple)
        html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
        html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
        html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
        html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
        html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');

        // Images and links
        html = html.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1">');
        html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Emphasis / inline formatting
        html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        html = html.replace(/@([a-zA-Z0-9_]+)/g, '<span class="comment-mention">@$1</span>');

        // Simple unordered/ordered lists
        html = html.replace(/(^|\n)(\s*[-+*]\s.+)(\n\s*[-+*]\s.+)+/g, match => {
            const items = match.trim().split(/\n/).map(line => line.replace(/^\s*[-+*]\s/, '').trim());
            return `\n<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        });
        html = html.replace(/(^|\n)(\s*\d+\.\s.+)(\n\s*\d+\.\s.+)+/g, match => {
            const items = match.trim().split(/\n/).map(line => line.replace(/^\s*\d+\.\s/, '').trim());
            return `\n<ol>${items.map(i => `<li>${i}</li>`).join('')}</ol>`;
        });

        // Restore code fences
        html = html.replace(/__CODEBLOCK_(\d+)__/g, (_, idx) => codeBlocks[idx] || '');

        return html.replace(/\n/g, '<br>');
    }

    renderReplyHTML(replyInfo, options = {}) {
        const { readOnly = false, highlightId = this.highlightedReplyId, allowAddReactions = !readOnly } = options;
        if (!replyInfo) return '';
        const author = escapeHTML(replyInfo.author || 'Anonymous');
        const timestampLabel = replyInfo.at ? escapeHTML(this.formatCommentTimestamp(replyInfo.at)) : '';
        const authorMarkup = this.buildProfileLink(replyInfo.profileUrl, author);
        const avatar = escapeAttribute(this.getCommentAvatarSrc(replyInfo));
        const reactionHtml = this.renderReactionChips(replyInfo, {
            readOnly,
            allowAdd: allowAddReactions,
            target: replyInfo.id || 'root'
        });
        const authorLogin = (replyInfo.authorId || replyInfo.author || '').replace(/^@/, '');
        const authorLink = replyInfo.profileUrl
            ? `<a href="${escapeAttribute(replyInfo.profileUrl)}" target="_blank" rel="noopener noreferrer" data-author-login="${escapeAttribute(authorLogin)}">${author}</a>`
            : author;
        const replyIdSafe = (replyInfo.id || 'root').toString().replace(/[^a-zA-Z0-9_-]/g, '-');
        const replyEditorId = `replyEditorText-${replyIdSafe}`;
        const replyAnonInputId = `replyAnon-${replyIdSafe}`;
        const isEditing = !readOnly && this.activeCommentEditTarget === replyInfo.id;
        const bodyClass = isEditing ? 'comment-body hidden' : 'comment-body';
        const bodyDisplay = `<div class="${bodyClass}" data-reply-body="${escapeAttribute(replyInfo.id || '')}">${this.renderCommentRichText(replyInfo.text || '')}</div>`;
        const replyAnonChecked = Boolean(replyInfo.anonymous);
        const editor = `
            <div class="comment-editor-inline ${isEditing ? '' : 'hidden'}" data-reply-editor="${escapeAttribute(replyInfo.id || '')}">
                <textarea id="${escapeAttribute(replyEditorId)}" name="${escapeAttribute(replyEditorId)}" class="form-control" rows="3" data-reply-textarea="${escapeAttribute(replyInfo.id || '')}">${escapeHTML(replyInfo.text || '')}</textarea>
                <label class="comment-editor__checkbox">
                    <input type="checkbox" id="${escapeAttribute(replyAnonInputId)}" name="${escapeAttribute(replyAnonInputId)}" data-reply-anon="${escapeAttribute(replyInfo.id || '')}" ${replyAnonChecked ? 'checked' : ''}>
                    <span>Anonymous comment</span>
                </label>
                <div class="comment-editor__actions">
                    <button type="button" class="btn btn--sm" data-comment-action="cancel-edit" data-comment-target="${escapeAttribute(replyInfo.id || '')}">Cancel</button>
                    <button type="button" class="btn btn--sm toolbar-btn" data-comment-action="save-edit" data-comment-target="${escapeAttribute(replyInfo.id || '')}">Save</button>
                </div>
            </div>
        `;
        const canEdit = !readOnly && this.canEditCommentEntry(replyInfo);
        const showMenu = !readOnly && (canEdit || replyInfo?.text);
        const actions = showMenu ? [
            '    <div class="comment-card__actions">',
            `      <button type="button" class="comment-menu__toggle" data-comment-target="${escapeAttribute(replyInfo.id || '')}" aria-label="Reply actions">⋯</button>`,
            `      <div class="comment-menu hidden" data-comment-menu="${escapeAttribute(replyInfo.id || '')}">`,
            `        <button type="button" data-comment-action="edit" data-comment-target="${escapeAttribute(replyInfo.id || '')}" ${canEdit ? '' : 'disabled'}>Edit</button>`,
            `        <button type="button" data-comment-action="delete" data-comment-target="${escapeAttribute(replyInfo.id || '')}" ${canEdit ? '' : 'disabled'}>Delete</button>`,
            `        <button type="button" data-comment-action="copy-link" data-comment-target="${escapeAttribute(replyInfo.id || '')}">Copy link</button>`,
            '      </div>',
            '    </div>'
        ].join('\n') : '';
        return [
            `<article class="comment-reply${highlightId === replyInfo.id ? ' comment-reply--highlight' : ''}" data-reply-id="${escapeAttribute(replyInfo.id || '')}">`,
            '  <div class="comment-reply__meta">',
            '    <div class="comment-card__meta-left">',
            `      <img class="comment-popover__avatar" src="${avatar}" alt="${escapeAttribute(replyInfo.author ? `${replyInfo.author} avatar` : 'Reply avatar')}">`,
            '      <div class="comment-popover__meta-text">',
            `        <div class="comment-popover__author">${authorLink}</div>`,
            timestampLabel ? `        <div class="comment-popover__timestamp">${timestampLabel}</div>` : '',
            '      </div>',
            '    </div>',
            actions,
            '  </div>',
            `  ${bodyDisplay}`,
            readOnly ? '' : `  ${editor}`,
            reactionHtml ? `  <div class="comment-reactions">${reactionHtml}</div>` : '',
            '</article>'
        ].join('');
    }

    renderRepliesHTML(replies, coord, options = {}) {
        return replies.map(reply => {
            const hydrated = this.ensureCommentIds(coord, this.cloneCommentEntry(reply));
            return this.renderReplyHTML(hydrated, options);
        }).join('');
    }

    renderReactionChips(entry, options = {}) {
        const { readOnly = false, allowAdd = false, target = 'root' } = options;
        const reactions = Array.isArray(entry?.reactions) ? entry.reactions : [];
        const user = (this.currentUserLogin || '').toLowerCase();
        const chips = reactions.map(r => {
            const count = Array.isArray(r.users) ? r.users.length : 0;
            const active = user && Array.isArray(r.users) && r.users.some(u => `${u}`.toLowerCase() === user);
            const baseClass = `comment-reaction${active && !readOnly ? ' comment-reaction--active' : ''}${readOnly ? ' comment-reaction--static' : ''}`;
            const tag = readOnly ? 'span' : 'button';
            const attrs = readOnly ? '' : ` data-reaction-emoji="${escapeAttribute(r.emoji)}" data-comment-target="${escapeAttribute(target)}" aria-label="React with ${escapeAttribute(r.emoji)}"`;
            const typeAttr = readOnly ? '' : ' type="button"';
            return `<${tag}${typeAttr} class="${baseClass}"${attrs}>
                <span>${escapeHTML(r.emoji)}</span>
                <span class="comment-reaction__count">${count}</span>
            </${tag}>`;
        });
        if (allowAdd && this.currentUserLogin) {
            chips.push(`<button type="button" class="comment-reaction comment-reaction__add" data-add-reaction="true" data-comment-target="${escapeAttribute(target)}">+</button>`);
        }
        return chips.join('');
    }

    cloneCommentEntry(info) {
        if (!info) return null;
        const replies = Array.isArray(info.replies)
            ? info.replies.map(reply => this.cloneCommentEntry(reply)).filter(Boolean)
            : [];
        const reactions = Array.isArray(info.reactions)
            ? info.reactions.map(r => ({
                emoji: r.emoji,
                users: Array.isArray(r.users) ? r.users.slice() : []
            })).filter(r => r.emoji)
            : [];
        return {
            text: info.text,
            author: info.author,
            authorId: info.authorId,
            profileUrl: info.profileUrl || '',
            avatar: info.avatar || '',
            at: info.at,
            anonymous: info.anonymous,
            anonymousReason: info.anonymousReason,
            localOnly: info.localOnly,
            replies,
            reactions,
            id: info.id || null,
            edited: Boolean(info.edited)
        };
    }

    isCellEffectivelyEmpty(data, { ignoreClearedStyles = false } = {}) {
        if (!data || typeof data !== 'object') return true;

        if (data.value !== undefined && data.value !== null && data.value !== '') return false;
        const hasStyleProp = STYLE_PROPS.some(prop => Object.prototype.hasOwnProperty.call(data, prop));
        if (hasStyleProp) {
            if (ignoreClearedStyles) {
                const hasRealStyle = STYLE_PROPS.some(prop => {
                    if (!Object.prototype.hasOwnProperty.call(data, prop)) return false;
                    const val = data[prop];
                    return val !== null && val !== undefined;
                });
                if (hasRealStyle) return false;
            } else {
                return false;
            }
        }
        if (data.linkUrl) return false;
        const normalizedComment = this.normalizeCommentData(data.comment);
        if (normalizedComment?.text) return false;
        if (normalizedComment?.replies?.length) return false;
        if (data.borders && Object.values(data.borders).some(Boolean)) return false;
        if (data.richText) return false;

        return true;
    }

    // Determines if the cell holds textual content (value or rich text)
    cellHasText(data) {
        if (!data || typeof data !== 'object') return false;
        if (typeof data.value === 'number') return true;
        if (typeof data.value === 'string') {
            const normalized = data.value.startsWith("'") ? data.value.slice(1) : data.value;
            if (normalized.trim().length > 0 || normalized.startsWith('=')) {
                return true;
            }
        }
        if (typeof data.richText === 'string' && data.richText.trim().length > 0) {
            return true;
        }
        return false;
    }

    hasSelection() {
        return this.selectedCellCoords.size > 0;
    }

    getSelectionPositions() {
        return Array.from(this.selectedCellCoords, coord => this.getCoordPos(coord));
    }

    getSelectionBounds() {
        const coords = this.getSelectionPositions();
        if (!coords.length) return null;
        let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;
        coords.forEach(({ row, col }) => {
            if (row < minRow) minRow = row;
            if (row > maxRow) maxRow = row;
            if (col < minCol) minCol = col;
            if (col > maxCol) maxCol = col;
        });
        return { coords, minRow, maxRow, minCol, maxCol };
    }

    clearSelectionVisuals() {
        this.selectedCells.forEach(cell => cell.classList.remove('selected', 'primary-selected'));
        this.selectedCells.clear();
        this.selectedCellCoords.clear();
    }

    buildUI() {
        const gridContainer = this.container.querySelector('.grid-container');
        if (!gridContainer) {
            throw new Error('Grid container not found');
        }

        if (!this.container.querySelector('.toolbar')) {
            gridContainer.insertAdjacentHTML('beforebegin', TOOLBAR_AND_FORMULA_HTML);
        }

        if (!document.getElementById('linkEditor')) {
            document.body.insertAdjacentHTML('beforeend', LINK_EDITOR_HTML);
        }

        if (!document.getElementById('contextMenu')) {
            document.body.insertAdjacentHTML('beforeend', renderContextMenuHtml());
        }
        if (!document.getElementById('fontColorPalette')) {
            document.body.insertAdjacentHTML('beforeend', COLOR_PALETTES_HTML);
        }

        if (!document.getElementById('borderMenu')) {
            document.body.insertAdjacentHTML('beforeend', BORDER_MENU_HTML);
        }
        
        if (!document.getElementById('keyboardShortcutsModal')) {
            document.body.insertAdjacentHTML('beforeend', renderKeyboardShortcutsModal());
        }

        if (!document.getElementById('cellCommentPopover')) {
            document.body.insertAdjacentHTML('beforeend', COMMENT_POPOVER_HTML);
        }

        if (!document.getElementById('authorPreviewCard')) {
            document.body.insertAdjacentHTML('beforeend', `
                <div id="authorPreviewCard" class="author-preview hidden" role="tooltip" aria-live="polite" popover="manual">
                    <div class="author-preview__avatar-wrap">
                        <img class="author-preview__avatar" alt="">
                    </div>
                    <div class="author-preview__body">
                        <div class="author-preview__name" id="authorPreviewName"></div>
                        <div class="author-preview__username" id="authorPreviewUsername"></div>
                        <div class="author-preview__bio" id="authorPreviewBio"></div>
                        <a class="author-preview__link" id="authorPreviewLink" target="_blank" rel="noreferrer noopener">View profile</a>
                    </div>
                </div>
            `);
        }
    }

    loadInitialDataFromDOM() {
        if (!this.gridContent) return;
        const fallbackTable = this.gridContent.querySelector('table[data-spreadsheet-export]');
        if (!fallbackTable) return;

        const styleMetaScript = this.gridContent.querySelector('script[data-spreadsheet-style-meta]');
        if (styleMetaScript && styleMetaScript.textContent) {
            try {
                const payload = JSON.parse(styleMetaScript.textContent);
                if (payload.defaultCellStyle && typeof payload.defaultCellStyle === 'object') {
                    this.defaultCellStyle = this.cloneDefaultCellStyle(payload.defaultCellStyle);
                }
                if (payload.defaultStyleMeta && typeof payload.defaultStyleMeta === 'object') {
                    this.defaultStyleMeta = this.cloneStyleMeta(payload.defaultStyleMeta);
                }
                if (payload.rowStyles) {
                    this.rowStyles = this.deserializeMap(payload.rowStyles);
                }
                if (payload.columnStyles) {
                    this.columnStyles = this.deserializeMap(payload.columnStyles);
                }
                if (payload.cellStyleMeta) {
                    this.cellStyleMeta = this.deserializeMap(payload.cellStyleMeta);
                }
                if (Number.isFinite(payload.styleSequence)) {
                    this.styleSequence = payload.styleSequence;
                }
            } catch (error) {
                console.warn('Unable to parse style metadata', error);
            } finally {
                styleMetaScript.remove();
            }
        }

        this.columnWidths = new Map();
        this.rowHeights = new Map();
        this.autoRowHeights = new Map();
        this.rowHeightModes = new Map();

        const headerCells = fallbackTable.querySelectorAll('thead th[data-col]');
        headerCells.forEach(th => {
            const colAttr = parseInt(th.getAttribute('data-col'), 10);
            const widthAttr = parseFloat(th.getAttribute('data-width'));
            if (!Number.isInteger(colAttr) || !Number.isFinite(widthAttr) || widthAttr <= 0) return;
            if (Math.abs(widthAttr - this.config.cellWidth) < 0.001) return;
            this.columnWidths.set(colAttr, widthAttr);
        });

        const bodyRows = fallbackTable.querySelectorAll('tbody tr');
        let detectedMaxRow = -1;
        let detectedMaxCol = -1;

        bodyRows.forEach((tr, rowIndex) => {
            const rowAttr = parseInt(tr.getAttribute('data-row'), 10);
            const row = Number.isInteger(rowAttr) ? rowAttr : rowIndex;
            detectedMaxRow = Math.max(detectedMaxRow, row);
            const rowHeightAttr = parseFloat(tr.getAttribute('data-height'));
            const rowHeightModeAttr = tr.getAttribute('data-height-mode');
            if (Number.isFinite(rowHeightAttr) && rowHeightAttr > 0) {
                if (rowHeightModeAttr === 'implicit') {
                    this.autoRowHeights.set(row, rowHeightAttr);
                    this.rowHeightModes.set(row, 'implicit');
                } else if (rowHeightModeAttr === 'explicit' || Math.abs(rowHeightAttr - this.config.cellHeight) >= 0.001) {
                    this.rowHeights.set(row, rowHeightAttr);
                    this.rowHeightModes.set(row, 'explicit');
                }
            }

            const cells = tr.querySelectorAll('td');
            cells.forEach((td, colIndex) => {
                const colAttr = parseInt(td.getAttribute('data-col'), 10);
                const col = Number.isInteger(colAttr) ? colAttr : colIndex;
                detectedMaxCol = Math.max(detectedMaxCol, col);

                const value = td.textContent ?? '';
                const data = {};

                const ds = td.dataset;
                const raw = ds.raw;
                const hasRaw = Object.prototype.hasOwnProperty.call(ds, 'raw');
                if (hasRaw) {
                    data.value = raw;
                } else if (value && value.length) {
                    data.value = value;
                }
                if (ds.rich) {
                    data.richText = this.sanitizeRichTextHTML(ds.rich);
                }
                if (ds.bg) data.backgroundColor = ds.bg;
                if (ds.font) data.fontColor = ds.font;
                if (ds.size && !Number.isNaN(parseInt(ds.size, 10))) data.fontSize = parseInt(ds.size, 10);
                if (ds.bold === 'true') data.bold = true;
                if (ds.italic === 'true') data.italic = true;
                if (ds.underline === 'true') data.underline = true;
                if (ds.strikethrough === 'true') data.strikethrough = true;
                if (ds.align) data.textAlign = ds.align;
                if (ds.valign) data.verticalAlign = ds.valign;
                if (ds.link) data.linkUrl = ds.link;
                if (ds.comment) {
                    const commentRecord = {
                        text: ds.comment,
                        localOnly: false
                    };
                    if (ds.commentAuthor) {
                        commentRecord.author = ds.commentAuthor;
                    }
                    if (ds.commentAuthorId) {
                        commentRecord.authorId = ds.commentAuthorId;
                    }
                    if (ds.commentProfile) {
                        commentRecord.profileUrl = ds.commentProfile;
                    }
                    const commentAt = Number(ds.commentAt);
                    if (Number.isFinite(commentAt)) {
                        commentRecord.at = commentAt;
                    }
                    if (ds.commentAvatar) {
                        commentRecord.avatar = ds.commentAvatar;
                    }
                    if (ds.commentAnonReason) {
                        commentRecord.anonymousReason = ds.commentAnonReason;
                    }
                    if (ds.commentId) {
                        commentRecord.id = ds.commentId;
                    }
                    if (ds.commentEdited === 'true') {
                        commentRecord.edited = true;
                    }
                    if (ds.commentReactions) {
                        try {
                            const parsed = JSON.parse(ds.commentReactions);
                            if (Array.isArray(parsed)) {
                                commentRecord.reactions = parsed.map(r => ({
                                    emoji: `${r?.emoji ?? ''}`,
                                    users: Array.isArray(r?.users) ? r.users.map(u => `${u}`) : []
                                })).filter(r => r.emoji);
                            }
                        } catch (error) {
                            console.warn('Unable to parse comment reactions', error);
                        }
                    }
                    if (ds.commentReplies) {
                        try {
                            const parsedReplies = JSON.parse(ds.commentReplies);
                            if (Array.isArray(parsedReplies)) {
                                commentRecord.replies = parsedReplies.map(reply => {
                                    const normalized = this.normalizeCommentData(reply);
                                    if (!normalized) return null;
                                    return { ...normalized, localOnly: false };
                                }).filter(Boolean);
                            }
                        } catch (error) {
                            console.warn('Unable to parse comment replies from dataset', error);
                        }
                    }
                    data.comment = commentRecord;
                }

                const borderSides = ['top', 'right', 'bottom', 'left'];
                borderSides.forEach(side => {
                    const key = `border${side.charAt(0).toUpperCase()}${side.slice(1)}`;
                    if (ds[key]) {
                        if (!data.borders) data.borders = {};
                        data.borders[side] = ds[key];
                    }
                });

                if (Object.keys(data).length) {
                    this.cellData.set(`${row},${col}`, data);
                }
            });
        });

        if (detectedMaxRow >= 0) {
            this.persistedRange.maxRow = Math.max(this.persistedRange.maxRow, detectedMaxRow);
        }
        if (detectedMaxCol >= 0) {
            this.persistedRange.maxCol = Math.max(this.persistedRange.maxCol, detectedMaxCol);
        }
        
        // Restore merged cells
        const mergedCells = fallbackTable.querySelectorAll('td[data-merged-rows][data-merged-cols]');
        mergedCells.forEach(td => {
            const row = parseInt(td.parentElement.getAttribute('data-row'), 10);
            const col = parseInt(td.getAttribute('data-col'), 10);
            const mergedRows = parseInt(td.getAttribute('data-merged-rows'), 10);
            const mergedCols = parseInt(td.getAttribute('data-merged-cols'), 10);
            
            if (Number.isInteger(row) && Number.isInteger(col) && 
                Number.isInteger(mergedRows) && Number.isInteger(mergedCols) &&
                (mergedRows > 1 || mergedCols > 1)) {
                this.mergeCells(row, col, mergedRows, mergedCols);
            }
        });

        fallbackTable.remove();

        const commentExport = this.gridContent.querySelector('.comment-export');
        if (commentExport) commentExport.remove();
    }

    initializeStyleMetadataFromData() {
        if (!this.defaultStyleMeta) this.defaultStyleMeta = {};

        STYLE_PROPS.forEach(prop => {
            if (Object.prototype.hasOwnProperty.call(this.defaultCellStyle, prop) && !this.defaultStyleMeta[prop]) {
                this.defaultStyleMeta[prop] = this.nextStyleSequence();
            }
        });

        const seedDimensionMeta = (map) => {
            if (!(map instanceof Map)) return;
            map.forEach(entry => {
                if (!entry || typeof entry !== 'object') return;
                if (!entry._meta) entry._meta = {};
                STYLE_PROPS.forEach(prop => {
                    if (Object.prototype.hasOwnProperty.call(entry, prop) && !entry._meta[prop]) {
                        entry._meta[prop] = this.nextStyleSequence();
                    }
                });
            });
        };

        seedDimensionMeta(this.rowStyles);
        seedDimensionMeta(this.columnStyles);

        this.cellData.forEach((data, coord) => {
            if (!data || typeof data !== 'object') return;
            STYLE_PROPS.forEach(prop => {
                if (Object.prototype.hasOwnProperty.call(data, prop)) {
                    const meta = this.getCellStyleMeta(coord, true);
                    if (!meta[prop]) {
                        meta[prop] = this.nextStyleSequence();
                    }
                }
            });
        });

        const maxSeq = this.computeMaxStyleSequence();
        this.styleSequence = Math.max(maxSeq + 1, this.styleSequence || 1);
    }

    // Undo/Redo Methods
    saveState(action) {
        this.userMadeChanges = true;
        this.hasAutoPersistedBaseline = false;
        this.undoStack.push({
            action,
            cellData: this.cloneCellData(this.cellData),
            mergedCells: this.cloneMergedCellsState(),
            rowHeights: new Map(this.rowHeights),
            autoRowHeights: new Map(this.autoRowHeights),
            rowHeightModes: new Map(this.rowHeightModes),
            rowDefaultHeightOverrides: new Map(this.rowDefaultHeightOverrides),
            defaultAutoRowHeight: this.defaultAutoRowHeight,
            columnWidths: new Map(this.columnWidths),
            timestamp: Date.now()
        });
        if (this.undoStack.length > this.maxUndoSteps) this.undoStack.shift();
        this.redoStack = [];
        this.updateUndoRedoButtons();
        this.scheduleDirtyStateUpdate();
    }

    performHistoryOperation(sourceStackName, targetStackName) {
        const source = this[sourceStackName];
        if (!Array.isArray(source) || !source.length) return;

        const target = this[targetStackName];
        if (Array.isArray(target)) {
            target.push({
                cellData: this.cloneCellData(this.cellData),
                mergedCells: this.cloneMergedCellsState(),
                rowHeights: new Map(this.rowHeights),
                autoRowHeights: new Map(this.autoRowHeights),
                rowHeightModes: new Map(this.rowHeightModes),
                rowDefaultHeightOverrides: new Map(this.rowDefaultHeightOverrides),
                defaultAutoRowHeight: this.defaultAutoRowHeight,
                columnWidths: new Map(this.columnWidths),
                timestamp: Date.now()
            });
        }

        const snapshot = source.pop();
        if (!snapshot) return;

        this.cellData = this.cloneCellData(snapshot.cellData);
        this.applyMergedCellsSnapshot(snapshot.mergedCells);
        if (snapshot.rowHeights) this.rowHeights = new Map(snapshot.rowHeights);
        if (snapshot.autoRowHeights) this.autoRowHeights = new Map(snapshot.autoRowHeights);
        if (snapshot.rowHeightModes) this.rowHeightModes = new Map(snapshot.rowHeightModes);
        if (snapshot.rowDefaultHeightOverrides) this.rowDefaultHeightOverrides = new Map(snapshot.rowDefaultHeightOverrides);
        if (snapshot.columnWidths) this.columnWidths = new Map(snapshot.columnWidths);
        if (Number.isFinite(snapshot.defaultAutoRowHeight)) {
            this.defaultAutoRowHeight = snapshot.defaultAutoRowHeight;
        }
        if (snapshot.rowHeights || snapshot.autoRowHeights || snapshot.rowHeightModes || snapshot.rowDefaultHeightOverrides) {
            this.refreshLayoutAfterRowHeightChange();
        } else {
            this.recalculateAutoRowHeights();
            this.updateGridSize();
            this.repositionCells();
            this.updateHeaderPositions();
            this.renderSelectionOverlays();
            this.renderBorderOverlays();
        }
        this.refreshAllVisibleCells();
        this.updateUndoRedoButtons();
        this.refreshPalettes();
        this.updateDirtyState();
    }

    undo() {
        this.performHistoryOperation('undoStack', 'redoStack');
    }

    redo() {
        this.performHistoryOperation('redoStack', 'undoStack');
    }

    updateUndoRedoButtons() {
        ['undo', 'redo'].forEach(type => {
            const btn = document.getElementById(`${type}Btn`);
            const enabled = this[`${type}Stack`].length > 0;
            btn.disabled = !enabled;
            btn.style.opacity = enabled ? '1' : '0.5';
        });
    }

    refreshAllVisibleCells() {
        const visibleCells = this.gridContent.querySelectorAll('.cell');
        visibleCells.forEach(cell => {
            const cellData = this.cellData.get(this.getCoord(cell)) || {};
            this.updateCellDisplay(cell, cellData);
        });
        
        this.updateUI();
        this.renderBorderOverlays();
    }

    // Fixed column numbering: A, B, C, ..., Z, AA, AB, AC, ... 
    getColumnName(index) {
        let result = '';
        let tempIndex = index;
        
        while (tempIndex >= 0) {
            result = String.fromCharCode(65 + (tempIndex % 26)) + result;
            tempIndex = Math.floor(tempIndex / 26) - 1;
        }
        return result;
    }

    // Convert column name to index: A=0, B=1, ..., Z=25, AA=26, ...
    getColumnIndex(name) {
        let index = 0;
        for (let i = 0; i < name.length; i++) {
            index = index * 26 + (name.charCodeAt(i) - 64);
        }
        return index - 1;
    }

    // Get cell address like A1, B2, etc.
    getCellAddress(row, col) {
        return this.getColumnName(col) + (row + 1);
    }

    // Parse cell address to get row and column (supports optional $ for absolute refs)
    parseCellAddress(address) {
        if (!address || typeof address !== 'string') return null;
        const trimmed = address.trim().toUpperCase();
        const match = trimmed.match(/^\$?([A-Z]+)\$?(\d+)$/);
        if (!match) return null;
        return {
            row: parseInt(match[2]) - 1,
            col: this.getColumnIndex(match[1])
        };
    }

    maybeOpenCommentFromUrl() {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const address = params.get('comment');
        if (!address) return;
        const parsed = this.parseCellAddress(address);
        if (!parsed) return;
        this.ensureCapacityForCell(parsed.row, parsed.col);
        const cell = this.getCellAt(parsed.row, parsed.col) || this.createCell(parsed.row, parsed.col);
        if (!cell) return;
        this.selectCells([cell], true);
        this.primaryCell = cell;
        this.primaryCellCoord = this.getCoord(cell);
        this.highlightedReplyId = params.get('reply');
        if (typeof cell.scrollIntoView === 'function') {
            try {
                cell.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
            } catch (error) {
                cell.scrollIntoView();
            }
        }
        this.updateCommentPopover();
    }

    generateHeaders() {
        // Clear existing headers
        this.columnHeaders.replaceChildren();
        this.rowHeaders.replaceChildren();
        
        // Generate column headers
        this.appendColumnHeaders(0, this.config.maxCols);

        // Generate row headers
        this.appendRowHeaders(0, this.config.maxRows);

        this.updateHeaderPositions();
        this.log(`Generated headers: ${this.config.maxCols} columns, ${this.config.maxRows} rows`);
    }

    updateHeaderPositions() {
        // Update column header positions
        const columnHeaders = this.columnHeaders.querySelectorAll('.column-header');
        columnHeaders.forEach((header, index) => {
            const left = this.getColumnLeft(index);
            const width = this.getColumnWidth(index);
            header.style.left = left + 'px';
            header.style.width = width + 'px';
        });

        // Update row header positions
        const rowHeaders = this.rowHeaders.querySelectorAll('.row-header');
        rowHeaders.forEach((header, index) => {
            const top = this.getRowTop(index);
            const height = this.getRowHeight(index);
            header.style.top = top + 'px';
            header.style.height = height + 'px';
        });
    }

    generateInitialGrid() {
        // Set grid content size for scrolling
        this.updateGridSize();

        // Calculate initial visible area based on viewport
        const zoom = this.zoomLevel || 1;
        const viewportCols = Math.ceil((this.mainGrid.clientWidth / zoom) / this.config.cellWidth) + 10;
        const viewportRows = Math.ceil((this.mainGrid.clientHeight / zoom) / this.config.cellHeight) + 10;
        
        this.visibleCols = {
            start: 0,
            end: Math.min(this.config.maxCols, viewportCols)
        };
        
        this.visibleRows = {
            start: 0,
            end: Math.min(this.config.maxRows, viewportRows)
        };

        // Generate initial visible cells
        this.updateVisibleCells();
    }

    updateVisibleCells() {
        // Clear references to cells that are being removed
        const cellsToRemove = [];
        this.selectedCells.forEach(cell => {
            const { row, col } = this.getCellPos(cell);
            if (row < this.visibleRows.start || row >= this.visibleRows.end ||
                col < this.visibleCols.start || col >= this.visibleCols.end) {
                cellsToRemove.push(cell);
            }
        });
        
        cellsToRemove.forEach(cell => this.selectedCells.delete(cell));
        
        // Remove existing cells that are outside visible area
        const existingCells = this.gridContent.querySelectorAll('.cell');
        existingCells.forEach(cell => {
            const { row, col } = this.getCellPos(cell);
            if (row < this.visibleRows.start || row >= this.visibleRows.end ||
                col < this.visibleCols.start || col >= this.visibleCols.end) {
                if (cell === this.primaryCell) {
                    this.primaryCell = null;
                }
                this.renderedCellCoords.delete(`${row},${col}`);
                cell.remove();
            }
        });

        // Generate cells in visible area
        for (let row = this.visibleRows.start; row < this.visibleRows.end; row++) {
            for (let col = this.visibleCols.start; col < this.visibleCols.end; col++) {
                if (!this.getCellAt(row, col)) {
                    this.createCell(row, col);
                }
            }
        }
        
        this.refreshVisibleCellStyles();
        this.renderBorderOverlays();
        
        // Restore primary cell reference if it's now visible
        if (!this.primaryCell && this.primaryCellCoord) {
            const [pRow, pCol] = this.parseCoord(this.primaryCellCoord);
            if (pRow >= this.visibleRows.start && pRow < this.visibleRows.end &&
                pCol >= this.visibleCols.start && pCol < this.visibleCols.end) {
                this.primaryCell = this.getCellAt(pRow, pCol);
                if (this.primaryCell) {
                    this.primaryCell.classList.add('primary-selected');
                }
            }
        }
    }
    
    refreshVisibleCellStyles() {
        const visibleCells = this.gridContent.querySelectorAll('.cell');
        visibleCells.forEach(cell => {
            if (cell === this.currentEditingCell) return;
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            if (Number.isNaN(row) || Number.isNaN(col)) return;
            const data = this.cellData.get(`${row},${col}`) || {};
            this.updateCellDisplay(cell, data);
        });
        this.renderBorderOverlays();
    }
    
    createCell(row, col) {
        // Check if this cell is part of a merge and should be hidden
        const coordKey = `${row},${col}`;
        const parentCoord = this.cellToMergeParent.get(coordKey);
        
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.address = this.getCellAddress(row, col);
        
        // Position the cell
        cell.style.left = this.getColumnLeft(col) + 'px';
        cell.style.top = this.getRowTop(row) + 'px';
        
        // Check if this is a merged parent cell
        const mergeInfo = this.mergedCells.get(coordKey);
        if (mergeInfo) {
            // This is a merged parent - calculate total dimensions
            let totalWidth = 0;
            let totalHeight = 0;
            
            for (let c = 0; c < mergeInfo.cols; c++) {
                totalWidth += this.getColumnWidth(col + c);
            }
            
            for (let r = 0; r < mergeInfo.rows; r++) {
                totalHeight += this.getRowHeight(row + r);
            }
            
            cell.style.width = totalWidth + 'px';
            cell.style.height = totalHeight + 'px';
            cell.style.zIndex = '3';
            cell.classList.add('merged-cell');
            cell.dataset.mergedRows = mergeInfo.rows;
            cell.dataset.mergedCols = mergeInfo.cols;
        } else if (parentCoord) {
            // This is a merged child - hide it
            cell.style.width = this.getColumnWidth(col) + 'px';
            cell.style.height = this.getRowHeight(row) + 'px';
            cell.style.display = 'none';
            cell.classList.add('merged-child');
        } else {
            // Normal cell
            cell.style.width = this.getColumnWidth(col) + 'px';
            cell.style.height = this.getRowHeight(row) + 'px';
        }

        // Get cell data
        const cellData = this.cellData.get(coordKey) || {};
        
        // Apply content and formatting using helper method
        this.updateCellDisplay(cell, cellData);

        // Restore selection state
        if (this.selectedCellCoords.has(coordKey)) {
            cell.classList.add('selected');
            this.selectedCells.add(cell);
        }
        if (this.primaryCellCoord === coordKey) {
            cell.classList.add('primary-selected');
            this.primaryCell = cell;
        }
        if (this.formatPainter.active && this.formatPainter.sourceCoords && this.formatPainter.sourceCoords.has(coordKey)) {
            cell.classList.add('format-painter-source');
        }

        this.gridContent.appendChild(cell);
        this.renderedCellCoords.add(coordKey);
        return cell;
    }

    isCommentOwnedByCurrentUser(commentInfo) {
        if (!commentInfo || !this.currentUserLogin) return false;
        const login = `${this.currentUserLogin}`.toLowerCase();
        if (commentInfo.authorId && `${commentInfo.authorId}`.toLowerCase() === login) return true;
        const authorName = `${commentInfo.author || ''}`.trim().replace(/^@/, '').toLowerCase();
        return authorName === login && !!authorName;
    }

    canEditCommentEntry(entry) {
        if (!entry) return false;
        const isLoggedIn = Boolean(this.currentUserLogin);
        const isLocal = entry.localOnly === true;
        if (!isLoggedIn && !isLocal) return false;
        if (isLoggedIn && !this.isCommentOwnedByCurrentUser(entry)) {
            const isLocalAnonymous = isLocal && (!entry.author || `${entry.author}`.toLowerCase() === 'anonymous');
            if (!isLocalAnonymous) return false;
        }
        return true;
    }

    getCommentEntryBlockReason(entry) {
        if (!entry) return '';
        const isLoggedIn = Boolean(this.currentUserLogin);
        const isLocal = entry.localOnly === true;
        if (!isLoggedIn && !isLocal) {
            return 'You need to sign in to edit committed comments.';
        }
        if (isLoggedIn && !this.isCommentOwnedByCurrentUser(entry) && !isLocal) {
            return 'You can only edit comments created by your account.';
        }
        return '';
    }

    getCommentEditBlockReason(targetCoords = []) {
        const coords = targetCoords.length ? targetCoords : (this.primaryCell ? [this.getCoord(this.primaryCell)] : []);
        const isLoggedIn = Boolean(this.currentUserLogin);

        for (const coord of coords) {
            const commentInfo = this.normalizeCommentData((this.cellData.get(coord) || {}).comment);
            if (!commentInfo?.text) continue;
            const isLocal = commentInfo.localOnly === true;
            if (!isLoggedIn && !isLocal) {
                return 'You need to sign in to edit committed comments.';
            }
            if (isLoggedIn && !this.isCommentOwnedByCurrentUser(commentInfo)) {
                const isLocalAnonymous = isLocal && (!commentInfo.author || commentInfo.author.toLowerCase() === 'anonymous');
                if (!isLocalAnonymous) {
                    return 'You can only edit comments created by your account.';
                }
            }
        }

        return '';
    }

    getDefaultRowHeightForRow(row) {
        const override = this.getValueFromMapLike(this.rowDefaultHeightOverrides, row, null);
        if (Number.isFinite(override) && override > 0) return override;
        return this.defaultAutoRowHeight || this.config.cellHeight;
    }

    getRowHeight(row) {
        const explicit = this.getValueFromMapLike(this.rowHeights, row, null);
        if (Number.isFinite(explicit) && explicit > 0) return explicit;
        const auto = this.getValueFromMapLike(this.autoRowHeights, row, null);
        if (Number.isFinite(auto) && auto > 0) return auto;
        return this.getDefaultRowHeightForRow(row);
    }
    getColumnWidth(col) { return this.getValueFromMapLike(this.columnWidths, col, this.config.cellWidth); }

    _sum(count, getFn) {
        let total = 0;
        for (let i = 0; i < count; i++) total += getFn.call(this, i);
        return total;
    }

    getRowTop(row) { return this._sum(row, this.getRowHeight); }
    getColumnLeft(col) { return this._sum(col, this.getColumnWidth); }
    getTotalGridHeight() { return this._sum(this.config.maxRows, this.getRowHeight); }
    getTotalGridWidth() { return this._sum(this.config.maxCols, this.getColumnWidth); }

    setupEventListeners() {
        const events = [
            ['#saveBtn', 'click', () => this.showSaveOptionsModal()],
            ['#undoBtn', 'click', () => this.undo()],
            ['#redoBtn', 'click', () => this.redo()],
            [this.mainGrid, 'mousedown', e => this.handleMouseDown(e)],
            [this.mainGrid, 'mousemove', e => this.handleMouseMove(e)],
            [this.mainGrid, 'dblclick', e => this.handleDoubleClick(e)],
            [this.mainGrid, 'scroll', e => this.handleScroll(e)],
            [this.mainGrid, 'selectstart', e => {
                if ((this.isDragging || this.isResizing) && !e.target.classList.contains('cell-editor')) e.preventDefault();
            }],
            [document, 'mouseup', e => this.handleMouseUp(e)],
            [document, 'mousemove', e => this.handleDocumentMouseMove(e)],
            [document, 'keydown', e => this.handleKeyDown(e)],
            [document, 'keyup', e => this.handleKeyUp(e)],
            [document, 'contextmenu', e => this.handleContextMenu(e)],
            [document, 'click', e => this.handleDocumentClick(e)],
            [this.columnHeaders, 'click', e => this.handleHeaderClick(e, 'column')],
            [this.columnHeaders, 'mousedown', e => this.handleResizeMouseDown(e)],
            [this.rowHeaders, 'click', e => this.handleHeaderClick(e, 'row')],
            [this.rowHeaders, 'mousedown', e => this.handleResizeMouseDown(e)],
            ['#colorBtn', 'click', () => this.showColorPalette()],
            ['#fontColorBtn', 'click', () => this.showFontColorPalette()],
            ['#borderBtn', 'click', () => this.showBorderMenu()],
            ['#mergeBtn', 'click', () => this.handleMergeCells()],
            ['#fontSizeInput', 'change', e => this.handleFontSizeChange(e, { finalize: true })],
            ['#fontSizeInput', 'input', e => this.handleFontSizeChange(e, { finalize: false })],
            ['#fontSizeInput', 'keydown', e => {
                if (e.key === 'Enter') { 
                    e.preventDefault(); 
                    this.fontSizeBlurAllowed = true;
                    this.fontSizeBlurReason = 'enter-key';
                    this.handleFontSizeChange(e, { finalize: true });
                    this.skipNextFontSizeChange = true;
                    if (e.target && typeof e.target.blur === 'function') {
                        e.target.blur();
                    }
                    setTimeout(() => {
                        this.skipNextFontSizeChange = false;
                    }, 0);
                }
            }],
            [this.commentPopoverReplyBtn, 'click', () => this.handleCommentReply()],
            [this.commentPopover, 'click', e => this.handleCommentPopoverClick(e)],
            [this.formulaInput, 'keydown', e => this.handleFormulaKeyDown(e)],
            [this.formulaInput, 'focus', e => this.handleFormulaFocus(e)],
            [this.formulaInput, 'input', e => this.handleFormulaInput(e)],
            [this.formulaInput, 'blur', () => this.handleFormulaBlur()],
            [this.formulaSuggestionsPanel, 'mousedown', e => this.handleFormulaSuggestionMouseDown(e)],
            [this.formulaSuggestionsPanel, 'click', e => this.handleFormulaSuggestionClick(e)],
            [this.cellReference, 'keydown', e => this.handleCellReferenceKeyDown(e)],
            [this.contextMenu, 'click', e => this.handleContextMenuClick(e)],
            ['#contextColorPicker', 'input', e => this.applyBackgroundColor(e.target.value)],
            ['#linkSaveBtn', 'click', (e) => { e.stopPropagation(); e.preventDefault(); this.saveLinkEdit(); }],
            ['#linkCancelBtn', 'click', (e) => { e.stopPropagation(); e.preventDefault(); this.hideLinkEditor(); }],
            ['.corner-cell', 'click', e => this.handleCornerCellClick(e)],
            ['#formatPainterBtn', 'click', () => this.activateFormatPainter()],
            ['#keyboardShortcutsBtn', 'click', () => this.showKeyboardShortcutsModal()],
            ['#zoomInBtn', 'click', () => this.zoomIn()],
            ['#zoomOutBtn', 'click', () => this.zoomOut()],
            ['#zoomResetBtn', 'click', () => this.resetZoom()],
            [this.zoomDisplay, 'click', () => this.beginZoomEdit()],
            [this.zoomDisplay, 'keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.beginZoomEdit();
                }
            }],
            ['#themeToggleBtn', 'click', () => this.toggleTheme()],
            [this.codebergProfileContainer, 'click', e => this.handleProfileSignInClick(e)]
        ];
        
        events.forEach(([sel, evt, fn]) => {
            const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
            if (el) el.addEventListener(evt, fn);
        });

        document.addEventListener('mouseover', e => this.handleAuthorHover(e), true);
        document.addEventListener('mouseout', e => this.handleAuthorHoverOut(e), true);
        const previewCard = document.getElementById('authorPreviewCard');
        if (previewCard) {
            previewCard.addEventListener('mouseenter', () => this.cancelHideAuthorPreview());
            previewCard.addEventListener('mouseleave', () => this.scheduleHideAuthorPreview());
        }

        const fontSizeInput = document.getElementById('fontSizeInput');
        if (fontSizeInput && !fontSizeInput.dataset.guardAttached) {
            fontSizeInput.addEventListener('pointerdown', () => {
                this.fontSizeBlurAllowed = false;
                this.fontSizeBlurReason = null;
                this.isFontSizeEditing = true;
                if (this.currentEditingCell) {
                    this.saveEditorSelection(this.currentEditingCell.querySelector('.cell-editor'));
                }
            }, { capture: true });
            fontSizeInput.addEventListener('focus', () => {
                this.fontSizeBlurAllowed = false;
                this.fontSizeBlurReason = null;
                this.isFontSizeEditing = true;
                this.log('Font size input focus');
            });
            fontSizeInput.addEventListener('blur', () => {
                const digitCount = (fontSizeInput.value || '').replace(/\D/g, '').length;
                if (!this.fontSizeBlurAllowed && this.isFontSizeEditing) {
                    this.log(`Font size blur blocked (digits=${digitCount})`);
                    setTimeout(() => {
                        if (typeof fontSizeInput.focus === 'function') {
                            fontSizeInput.focus({ preventScroll: true });
                        }
                    }, 0);
                    this.isFontSizeEditing = true;
                    return;
                }
                this.log(`Font size input blur -> resume editor (digits=${digitCount}, reason=${this.fontSizeBlurReason || 'unknown'})`);
                this.fontSizeBlurAllowed = false;
                this.fontSizeBlurReason = null;
                if (this.currentEditingCell) {
                    this.isFontSizeEditing = false;
                    this.resumeEditingAfterToolbar();
                }
                this.isFontSizeEditing = false;
            });
            fontSizeInput.dataset.guardAttached = 'true';
        }
        
        // Border menu setup
        this.setupBorderMenu();

        this.setupToolbarFocusGuards();
        
        // Pattern-based toolbar buttons
        ['bold', 'italic', 'underline', 'strikethrough'].forEach(f => 
            document.getElementById(`${f}Btn`)?.addEventListener('click', () => this.handleFormatButtonClick(f))
        );
        
        [['left','Left'], ['center','Center'], ['right','Right']].forEach(([a, n]) => 
            document.getElementById(`align${n}Btn`)?.addEventListener('click', () => this.setTextAlign(a))
        );
        
        [['top','Top'], ['middle','Middle'], ['bottom','Bottom']].forEach(([a, n]) => 
            document.getElementById(`align${n}Btn`)?.addEventListener('click', () => this.setVerticalAlign(a))
        );

        if (this.commentMainAnonymous) {
            this.commentMainAnonymous.addEventListener('change', () => this.renderCommentMainAuthorLabel(true));
        }
        const guardInlineEditorClicks = (event) => {
            const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
            if (!targetEl) return;
            if (targetEl.closest('.comment-editor-inline') || targetEl.closest('#commentReplyComposer')) {
                event.stopPropagation();
            }
        };
        [this.commentPopover, this.commentPopoverThread].forEach(el => {
            if (!el) return;
            el.addEventListener('click', event => this.handleCommentActionCapture(event), true);
            el.addEventListener('click', guardInlineEditorClicks);
        });
        if (this.commentPopover && !this.commentPopover.dataset.replyAnonGuard) {
            this.commentPopover.addEventListener('change', event => this.handleReplyAnonToggle(event));
            this.commentPopover.dataset.replyAnonGuard = 'true';
        }
        document.addEventListener('click', event => this.handleCommentActionCapture(event), true);
        document.addEventListener('pointerdown', event => this.logCommentActionEvent(event, 'document-pointerdown'), true);
        document.addEventListener('pointerup', event => this.handleCommentMenuButton(event), true);
        document.body.addEventListener('click', event => this.handleCommentMenuButton(event), true);
        if (this.commentPopover) {
            this.commentPopover.addEventListener('pointerdown', event => this.handleCommentMenuPointerDown(event), true);
            this.commentPopover.addEventListener('click', event => this.handleCommentAuthorLinkClick(event), true);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => {
                if (this.draftSaveTimer) {
                    clearTimeout(this.draftSaveTimer);
                    this.draftSaveTimer = null;
                }
                this.persistDraft();
            });
        }
    }
    
    activateFormatPainter() {
        if (!this.primaryCell || !this.hasSelection()) {
            this.log('No cell selected for format painter');
            return;
        }

        this.clearFormatPainterSourceHighlight();
        
        // Get all selected cell coordinates
        const coords = this.getSelectionPositions();
        
        // Sort by row, then by column
        coords.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
        
        // Get unique rows and columns
        const uniqueRows = [...new Set(coords.map(c => c.row))].sort((a, b) => a - b);
        const uniqueCols = [...new Set(coords.map(c => c.col))].sort((a, b) => a - b);
        
        // Create a mapping from actual row/col to pattern row/col
        const rowMap = new Map(uniqueRows.map((r, i) => [r, i]));
        const colMap = new Map(uniqueCols.map((c, i) => [c, i]));
        
        // Store the pattern dimensions (based on unique rows/cols, not bounding box)
        this.formatPainter.patternWidth = uniqueCols.length;
        this.formatPainter.patternHeight = uniqueRows.length;
        this.formatPainter.formats = new Map();
        
        // Extract formatting from each selected cell
        coords.forEach(({ row, col }) => {
            const coordKey = `${row},${col}`;
            const cellData = this.cellData.get(coordKey);
            
            // Map to pattern position (cramped together, no gaps)
            const patternRow = rowMap.get(row);
            const patternCol = colMap.get(col);
            const relativeKey = `${patternRow},${patternCol}`;
            
            if (cellData) {
                const format = {
                    backgroundColor: cellData.backgroundColor,
                    fontColor: cellData.fontColor,
                    fontSize: cellData.fontSize,
                    bold: cellData.bold,
                    italic: cellData.italic,
                    underline: cellData.underline,
                    strikethrough: cellData.strikethrough,
                    textAlign: cellData.textAlign,
                    verticalAlign: cellData.verticalAlign,
                    borders: cellData.borders ? { ...cellData.borders } : undefined
                };
                
                // Remove undefined properties
                Object.keys(format).forEach(key => {
                    if (format[key] === undefined) {
                        delete format[key];
                    }
                });
                
                this.formatPainter.formats.set(relativeKey, format);
            } else {
                // Store empty format for cells without formatting
                this.formatPainter.formats.set(relativeKey, {});
            }
        });
        
        this.formatPainter.active = true;
        this.formatPainter.awaitingCtrlRelease = false;
        this.formatPainter.sourceCoords = new Set(coords.map(({ row, col }) => `${row},${col}`));
        this.formatPainter.overlayRegions = this.findContiguousRegions(this.formatPainter.sourceCoords);
        
        // Update button appearance
        const btn = document.getElementById('formatPainterBtn');
        btn.classList.add('active');

        // Clear live selection but leave a visual cue of the source area
        this.clearAllSelections();
        this.applyFormatPainterSourceHighlight();
        
        // Change cursor
        document.body.style.cursor = 'crosshair';
        
        this.log(`Format painter activated with ${this.formatPainter.patternWidth}x${this.formatPainter.patternHeight} pattern (cramped from ${coords.length} cells)`);
    }

    deactivateFormatPainter() {
        this.formatPainter.active = false;
        this.formatPainter.formats = null;
        this.formatPainter.patternWidth = null;
        this.formatPainter.patternHeight = null;
        this.formatPainter.awaitingCtrlRelease = false;
        this.clearFormatPainterSourceHighlight();
        this.formatPainter.overlayRegions = null;
        this.renderSelectionOverlays();
        
        // Update button appearance
        const btn = document.getElementById('formatPainterBtn');
        btn.classList.remove('active');
        
        // Reset cursor
        document.body.style.cursor = '';
        
        this.log('Format painter deactivated');
    }

    applyFormatPainterSourceHighlight() {
        if (!this.formatPainter.sourceCoords) return;
        
        this.formatPainter.sourceCoords.forEach(coordKey => {
            const [row, col] = this.parseCoord(coordKey);
            const cell = this.getCellAt(row, col);
            if (cell) {
                cell.classList.add('format-painter-source');
            }
        });
        this.renderSelectionOverlays();
    }

    clearFormatPainterSourceHighlight() {
        if (!this.formatPainter.sourceCoords) return;

        this.formatPainter.sourceCoords.forEach(coordKey => {
            const [row, col] = this.parseCoord(coordKey);
            const cell = this.getCellAt(row, col);
            if (cell) {
                cell.classList.remove('format-painter-source');
            }
        });

        this.formatPainter.sourceCoords = null;
        this.renderSelectionOverlays();
    }

    applyPaintedFormat(cell) {
        if (!this.formatPainter.active || !this.formatPainter.format) {
            return;
        }
        
        const cellKey = this.getCoord(cell);
        
        // Save state
        this.saveState('Apply painted format');
        
        const cellData = this.updateCellDataEntry(cellKey, data => {
            Object.keys(this.formatPainter.format).forEach(key => {
                data[key] = this.formatPainter.format[key];
            });
        });
        const meta = this.getCellStyleMeta(cellKey, true);
        Object.keys(this.formatPainter.format || {}).forEach(key => {
            if (STYLE_PROPS.includes(key)) {
                meta[key] = this.nextStyleSequence();
            }
        });
        
        // Update cell display
        this.updateCellDisplay(cell, cellData || {});
        
        const { row } = this.getCellPos(cell);
        this.recalculateAutoRowHeights(new Set([row]));
        this.log(`Applied format to cell ${cell.dataset.address}`);
    }

    applyPaintedFormatToSelection() {
        if (!this.formatPainter.active || !this.formatPainter.formats) {
            return;
        }

        this.formatPainter.awaitingCtrlRelease = false;
        
        const selectionCoords = this.getSelectionPositions();
        if (!selectionCoords.length) return;
        
        // Save state
        this.saveState(`Apply painted format to ${selectionCoords.length} cells`);
        
        // Group selected cells into contiguous clusters so each starts its own pattern origin
        const coordSet = new Set(selectionCoords.map(({ row, col }) => `${row},${col}`));
        const visited = new Set();
        const clusters = [];

        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ];

        selectionCoords.forEach(({ row, col }) => {
            const key = `${row},${col}`;
            if (visited.has(key)) return;
            const cluster = [];
            const stack = [{ row, col }];
            visited.add(key);

            while (stack.length) {
                const { row: r, col: c } = stack.pop();
                cluster.push({ row: r, col: c });

                dirs.forEach(([dr, dc]) => {
                    const nr = r + dr;
                    const nc = c + dc;
                    const nKey = `${nr},${nc}`;
                    if (coordSet.has(nKey) && !visited.has(nKey)) {
                        visited.add(nKey);
                        stack.push({ row: nr, col: nc });
                    }
                });
            }

            clusters.push(cluster);
        });

        // Apply format pattern per cluster (pattern restarts in each)
        clusters.forEach(cluster => {
            let clusterMinRow = Infinity;
            let clusterMinCol = Infinity;
            cluster.forEach(({ row, col }) => {
                if (row < clusterMinRow) clusterMinRow = row;
                if (col < clusterMinCol) clusterMinCol = col;
            });

            cluster.forEach(({ row, col }) => {
                const patternRow = (row - clusterMinRow) % this.formatPainter.patternHeight;
                const patternCol = (col - clusterMinCol) % this.formatPainter.patternWidth;
                const patternKey = `${patternRow},${patternCol}`;
                
                const format = this.formatPainter.formats.get(patternKey);
                
                if (format) {
                    const coordKey = `${row},${col}`;
                    this.updateCellDataEntry(coordKey, data => {
                        Object.keys(format).forEach(key => {
                            data[key] = format[key];
                        });
                    });
                    const meta = this.getCellStyleMeta(coordKey, true);
                    Object.keys(format).forEach(key => {
                        if (STYLE_PROPS.includes(key)) {
                            meta[key] = this.nextStyleSequence();
                        }
                    });
                }
            });
        });
        
        const affectedRows = new Set(selectionCoords.map(({ row }) => row));

        // Refresh painted cells and their neighbors so border overlays update immediately
        this._updateCellsAndAdjacent(this.selectedCells);
        
        this.recalculateAutoRowHeights(affectedRows);

        // Refresh color palettes
        this.refreshPalettes();
        
        // Deactivate after single use
        this.deactivateFormatPainter();
        
        this.log(`Applied ${this.formatPainter.patternWidth}x${this.formatPainter.patternHeight} pattern to ${this.selectedCellCoords.size} cells`);
    }
    
    expandSelectionForMergedCells(cells) {
        if (!cells || !cells.length) {
            return [];
        }

        const expandedCells = [];
        const expandedCellSet = new Set();
        const selectedCoords = new Set();
        let minRowSelected = Infinity;
        let maxRowSelected = -Infinity;
        let minColSelected = Infinity;
        let maxColSelected = -Infinity;

        const mergeQueue = [];
        const enqueuedMerges = new Set();

        const enqueueMergeForCoord = (coordKey) => {
            if (!coordKey) return;
            const parentCoord = this.cellToMergeParent.get(coordKey);
            const mergeParentCoord = parentCoord || (this.mergedCells.has(coordKey) ? coordKey : null);
            if (mergeParentCoord && !enqueuedMerges.has(mergeParentCoord)) {
                mergeQueue.push(mergeParentCoord);
                enqueuedMerges.add(mergeParentCoord);
            }
        };

        const addCoord = (row, col, explicitCell = null) => {
            const coordKey = `${row},${col}`;
            if (selectedCoords.has(coordKey)) return false;

            selectedCoords.add(coordKey);
            minRowSelected = Math.min(minRowSelected, row);
            maxRowSelected = Math.max(maxRowSelected, row);
            minColSelected = Math.min(minColSelected, col);
            maxColSelected = Math.max(maxColSelected, col);

            const cell = explicitCell || this.getCellAt(row, col);
            if (cell && !expandedCellSet.has(cell)) {
                expandedCells.push(cell);
                expandedCellSet.add(cell);
            }

            enqueueMergeForCoord(coordKey);
            return true;
        };

        cells.forEach(cell => {
            if (!cell) return;
            const { row, col } = this.getCellPos(cell);
            addCoord(row, col, cell);
        });

        while (mergeQueue.length) {
            const mergeParentCoord = mergeQueue.shift();
            const mergeInfo = this.mergedCells.get(mergeParentCoord);
            if (!mergeInfo) continue;

            const [parentRow, parentCol] = this.parseCoord(mergeParentCoord);
            const mergeMaxRow = parentRow + mergeInfo.rows - 1;
            const mergeMaxCol = parentCol + mergeInfo.cols - 1;

            // Always include the full merged block first
            for (let row = parentRow; row <= mergeMaxRow; row++) {
                for (let col = parentCol; col <= mergeMaxCol; col++) {
                    addCoord(row, col);
                }
            }

            // Snapshot current bounds so a merge can cascade once per pass
            const currentMinRow = minRowSelected;
            const currentMaxRow = maxRowSelected;
            const currentMinCol = minColSelected;
            const currentMaxCol = maxColSelected;

            // RULE 1: Fill every selected row with the merge's column span
            for (let row = currentMinRow; row <= currentMaxRow; row++) {
                for (let col = parentCol; col <= mergeMaxCol; col++) {
                    addCoord(row, col);
                }
            }

            // RULE 2: Fill every column in-range across the merge's rows
            for (let row = parentRow; row <= mergeMaxRow; row++) {
                for (let col = currentMinCol; col <= currentMaxCol; col++) {
                    addCoord(row, col);
                }
            }
        }

        return expandedCells;
    }
    
    applyFormatting(type, value) {
        if (!this.hasSelection()) return;
        
        const configs = {
            bold: [['bold']], italic: [['italic']], underline: [['underline']], strikethrough: [['strikethrough']],
            textAlign: [['align-left', 'align-center', 'align-right'], 'align-'],
            verticalAlign: [['align-top', 'align-middle', 'align-bottom'], 'align-']
        };
        
        const [classes, prefix] = configs[type];
        const isToggle = typeof value === 'boolean';
        const remove = isToggle && this.checkIfAllCellsHaveFormat(type);
        const scope = this.getSelectionScope();
        const applyToAll = scope.type === 'all';
        const scopeLabel = (() => {
            if (applyToAll) return ' (all cells)';
            if (scope.type === 'rows') return ` (${scope.rows.length} row${scope.rows.length === 1 ? '' : 's'})`;
            if (scope.type === 'columns') return ` (${scope.cols.length} column${scope.cols.length === 1 ? '' : 's'})`;
            return '';
        })();

        this.saveState(`${isToggle ? 'Toggle' : 'Set'} ${type}${scopeLabel}`);

        if (applyToAll) {
            if (isToggle) {
                this.setDefaultCellProperty(type, remove ? null : true);
            } else {
                this.setDefaultCellProperty(type, remove ? null : value);
            }

            const keysToDelete = [];
            this.cellData.forEach((data, coord) => {
                delete data[type];
                if (this.isCellEffectivelyEmpty(data)) {
                    keysToDelete.push(coord);
                }
            });
            keysToDelete.forEach(coord => this.cellData.delete(coord));
            this.refreshAllVisibleCells();
            (isToggle ? this.updateFormattingButtons : this.updateAlignmentButtons).call(this);
            return;
        }

        if (scope.type === 'rows' || scope.type === 'columns') {
            const indices = scope.type === 'rows' ? scope.rows : scope.cols;
            const map = scope.type === 'rows' ? this.rowStyles : this.columnStyles;
            const newValue = remove ? null : (isToggle ? true : value);
            indices.forEach(idx => {
                const entry = this.getDimensionStyle(scope.type === 'rows' ? 'row' : 'column', idx, true);
                this.setStyleValue(entry, type, newValue);
                if (this.isStyleEntryEmpty(entry) && (!entry._meta || Object.keys(entry._meta).length === 0)) {
                    map.delete(idx);
                }
            });
            this.refreshAllVisibleCells();
            (isToggle ? this.updateFormattingButtons : this.updateAlignmentButtons).call(this);
            return;
        }

        this.selectedCellCoords.forEach(coord => {
            this.updateCellDataEntry(coord, data => {
                const newValue = remove ? null : (isToggle ? true : value);
                if (newValue === null) {
                    data[type] = null;
                    if (data.richText && ['bold', 'italic', 'underline', 'strikethrough'].includes(type)) {
                        data.richText = this.clearRichTextFormat(data.richText, type);
                    }
                } else {
                    data[type] = newValue;
                    if (data.richText && ['bold', 'italic', 'underline', 'strikethrough'].includes(type)) {
                        data.richText = this.setRichTextFormat(data.richText, type, true);
                    }
                }
            });
            const meta = this.getCellStyleMeta(coord, true);
            meta[type] = this.nextStyleSequence();
        });
        
        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey) || {};

            // Avoid destroying the live editor; just refresh its styling in-place
            if (cell === this.currentEditingCell) {
                this.refreshEditingCellFormatting(cell, cellData);
            } else {
                // Refresh display for all formatting changes so overflow text reflects new styling
                this.updateCellDisplay(cell, cellData);
            }
        });
        
        // If we changed alignment, also refresh adjacent cells that might be affected by overflow changes
        if (type === 'textAlign' || type === 'verticalAlign') {
            const adjacentCellsToUpdate = new Set();
            
            this.selectedCells.forEach(cell => {
                const { row, col } = this.getCellPos(cell);
                
                // Check cells in both directions (left and right) since alignment change affects overflow direction
                for (let c = Math.max(0, col - 5); c <= Math.min(this.config.maxCols - 1, col + 5); c++) {
                    if (c !== col) {
                        const adjCell = this.getCellAt(row, c);
                        if (adjCell) adjacentCellsToUpdate.add(adjCell);
                    }
                }
            });
            
            // Refresh adjacent cells
            adjacentCellsToUpdate.forEach(cell => {
                const cellKey = this.getCoord(cell);
                const cellData = this.cellData.get(cellKey) || {};
                this.updateCellDisplay(cell, cellData);
            });
        }
        
        (isToggle ? this.updateFormattingButtons : this.updateAlignmentButtons).call(this);
    }

    markEditorForToolbarRefocus(event = null, preventDefault = true, { refocus = true } = {}) {
        if (!this.currentEditingCell) return false;
        if (preventDefault && event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        this.saveEditorSelection(editor);
        this.isToolbarFormattingInteraction = true;
        if (refocus) {
            this.pendingEditorRefocus = true;
        }
        return true;
    }

    setupToolbarFocusGuards() {
        const keepEditingButtons = [
            'boldBtn', 'italicBtn', 'underlineBtn', 'strikethroughBtn',
            'fontColorBtn', 'colorBtn', 'bgColorBtn',
            'alignLeftBtn', 'alignCenterBtn', 'alignRightBtn',
            'alignTopBtn', 'alignMiddleBtn', 'alignBottomBtn',
            'borderBtn'
        ];
        keepEditingButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('mousedown', (e) => {
                this.markEditorForToolbarRefocus(e);
            });
        });

        const paletteGuards = [
            this.colorPalette,
            this.fontColorPalette,
            this.borderMenu,
            this.customColorPicker
        ];
        paletteGuards.forEach(el => {
            if (!el) return;
            el.addEventListener('mousedown', (e) => {
                const isField = e.target.closest('input, select, textarea, .color-picker-input');
                if (isField) {
                    this.isPaletteFieldEditing = true;
                    // Do NOT schedule a refocus; just keep the editor selection saved
                    this.isToolbarFormattingInteraction = false;
                    this.pendingEditorRefocus = false;
                    this.saveEditorSelection(this.currentEditingCell?.querySelector('.cell-editor'));
                    setTimeout(() => {
                        if (e.target && typeof e.target.focus === 'function') {
                            e.target.focus();
                        }
                    }, 0);
                    return;
                }
                if (this.markEditorForToolbarRefocus(e, false)) {
                    this.isPaletteInteraction = true;
                }
            });
        });
    }

    attachFormattingFieldGuards(elements = []) {
        elements.forEach(el => {
            if (!el || el.dataset.formatGuardAttached) return;
            const stopImmediate = (e) => e.stopPropagation();
            const shouldHoldFocus = () => {
                const minDigits = parseInt(el.dataset.minFocusDigits || '0', 10);
                if (!minDigits) return false;
                const raw = typeof el.value === 'string' ? el.value : '';
                const digitCount = (raw.match(/[0-9A-Fa-f]/g) || []).length;
                return digitCount < minDigits;
            };
            el.addEventListener('pointerdown', (e) => {
                if (this.currentEditingCell) {
                    this.isPaletteFieldEditing = true;
                    this.saveEditorSelection(this.currentEditingCell.querySelector('.cell-editor'));
                }
                // Allow interaction for all fields, but block bubbling to avoid global handlers stealing focus
                stopImmediate(e);
                // Do not schedule refocus while interacting with dropdowns/inputs
                this.isToolbarFormattingInteraction = false;
                this.pendingEditorRefocus = false;
                setTimeout(() => {
                    if (document.activeElement !== el && typeof el.focus === 'function') {
                        el.focus();
                    }
                }, 0);
            }, { capture: true });
            el.addEventListener('focus', (e) => {
                if (this.currentEditingCell) {
                    this.isPaletteFieldEditing = true;
                }
                stopImmediate(e);
            });
            el.addEventListener('blur', (e) => {
                stopImmediate(e);
                if (this.currentEditingCell && shouldHoldFocus()) {
                    this.isPaletteFieldEditing = true;
                    setTimeout(() => {
                        if (typeof el.focus === 'function') {
                            el.focus({ preventScroll: true });
                        }
                    }, 0);
                    return;
                }
                if (this.currentEditingCell) {
                    this.isPaletteFieldEditing = false;
                    this.resumeEditingAfterToolbar();
                }
            });
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && this.currentEditingCell) {
                    e.stopPropagation();
                    this.isPaletteFieldEditing = false;
                    this.resumeEditingAfterToolbar();
                }
            });
            el.dataset.formatGuardAttached = 'true';
        });
    }

    refreshEditingCellFormatting(cell, cellData = {}) {
        if (!cell || cell !== this.currentEditingCell) return;
        const editor = cell.querySelector('.cell-editor');
        const wrapper = cell.querySelector('.cell-editor-wrapper');
        const { row, col } = this.getCellPos(cell);
        const effective = this.getEffectiveStyle(row, col, cellData);

        // Re-align wrapper to match new alignment
        if (wrapper) {
            const alignItemsMap = { 'top': 'flex-start', 'middle': 'center', 'bottom': 'flex-end' };
            const justifyContentMap = { 'left': 'flex-start', 'center': 'center', 'right': 'flex-end' };
            wrapper.style.alignItems = alignItemsMap[effective.verticalAlign || 'bottom'] || 'flex-end';
            wrapper.style.justifyContent = justifyContentMap[effective.textAlign || 'left'] || 'flex-start';
        }

        if (editor) {
            const computed = window.getComputedStyle(cell);
            const resolvedFontSize = effective.fontSize ? `${effective.fontSize}px` : computed.fontSize;
            const resolvedFontWeight = effective.bold ? 'bold' : computed.fontWeight;
            const resolvedFontStyle = effective.italic ? 'italic' : computed.fontStyle;
            const resolvedColor = effective.fontColor || computed.color;
            const decorations = [];
            if (effective.underline) decorations.push('underline');
            if (effective.strikethrough) decorations.push('line-through');
            const computedDecoration = (computed.textDecorationLine || computed.textDecoration || '').toLowerCase();
            if (!decorations.length && computedDecoration && computedDecoration !== 'none') {
                decorations.push(computedDecoration);
            }
            editor.style.fontSize = resolvedFontSize;
            editor.style.fontFamily = computed.fontFamily;
            editor.style.fontWeight = resolvedFontWeight;
            editor.style.fontStyle = resolvedFontStyle;
            editor.style.lineHeight = computed.lineHeight;
            editor.style.color = resolvedColor;
            editor.style.textAlign = effective.textAlign || 'left';
            editor.style.textDecoration = decorations.length ? decorations.join(' ') : 'none';
            this.syncEditorLineHeight(editor);
            this.restoreEditorSelection(editor);
            this.updateEditorOverflow(cell, editor);
        }
    }

    resumeEditingAfterToolbar() {
        if (this.isPaletteFieldEditing) {
            return;
        }
        if (!this.currentEditingCell) {
            this.isToolbarFormattingInteraction = false;
            this.isPaletteInteraction = false;
            this.pendingEditorRefocus = false;
            return;
        }
        this.pendingEditorRefocus = true;
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        if (editor) {
            editor.focus({ preventScroll: true });
            this.restoreEditorSelection(editor);
            this.updateEditorOverflow(this.currentEditingCell, editor);
        }
        setTimeout(() => {
            this.isToolbarFormattingInteraction = false;
            this.isPaletteInteraction = false;
            this.pendingEditorRefocus = false;
        }, 150);
    }

    isFormattingUIOpen() {
        const paletteOpen = (el) => el && !el.classList.contains('hidden');
        return (
            paletteOpen(this.colorPalette) ||
            paletteOpen(this.fontColorPalette) ||
            paletteOpen(this.borderMenu) ||
            this.customColorPickerActive
        );
    }
    
    handleFormatButtonClick(format) {
        if (this.currentEditingCell) {
            const editor = this.currentEditingCell.querySelector('.cell-editor');
            this.saveEditorSelection(editor);
            const inlineApplied = this.applyInlineFormat(format);
            if (!inlineApplied) {
                this.toggleFormat(format);
            }
            if (editor) {
                editor.focus();
                if (!inlineApplied) {
                    this.restoreEditorSelection(editor);
                }
                this.updateEditorOverflow(this.currentEditingCell, editor);
            }
            this.isToolbarFormattingInteraction = false;
            return;
        }
        this.toggleFormat(format);
    }

    applyInlineFormat(format) {
        if (!this.currentEditingCell) return false;
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        if (!editor || editor.dataset.isFormula === 'true') return false;
        const commandMap = {
            bold: 'bold',
            italic: 'italic',
            underline: 'underline',
            strikethrough: 'strikeThrough'
        };
        const command = commandMap[format];
        if (!command) return false;
        this.restoreEditorSelection(editor);
        editor.focus();
        try {
            const selection = window.getSelection();
            const range = selection && selection.rangeCount ? selection.getRangeAt(0) : null;
            const beforeState = this.getInlineFormattingState(editor) || {};
            const desired = !beforeState[format];
            if (range && !range.collapsed) {
                const logicalOffsets = this.getSelectionOffsets(editor, range);
                const appliedResult = this.applyInlineFormatToRange(range, format, desired, editor, beforeState);
                if (!desired && (format === 'underline' || format === 'strikethrough') && appliedResult && appliedResult.wrappers && appliedResult.wrappers.length) {
                    appliedResult.wrappers.forEach(w => this.liftFormatFromAncestor(w, format, editor));
                }
                this.restoreSelectionFromOffsets(editor, logicalOffsets);
            } else {
                document.execCommand(command, false, null);
                if (range && range.collapsed) {
                    // Ensure typing after the caret inherits the new format state (on or off)
                    const marker = this.ensureCollapsedTypingFormat(editor, format, !!desired);
                    if (!desired && marker && (format === 'underline' || format === 'strikethrough')) {
                        this.liftFormatFromAncestor(marker, format, editor);
                        const sel = window.getSelection();
                        if (sel) {
                            const newRange = document.createRange();
                            newRange.selectNodeContents(marker);
                            sel.removeAllRanges();
                            sel.addRange(newRange);
                        }
                    }
                }
            }
            this.updateEditorOverflow(this.currentEditingCell, editor);
            this.syncEditorToFormulaBar(editor);
            this.saveEditorSelection(editor);
            this.updateFormattingButtons();
            return true;
        } catch (err) {
            console.warn('Unable to apply inline format', err);
            return false;
        }
    }

    applyInlineFontColor(color) {
        if (!this.currentEditingCell) return false;
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        if (!editor || editor.dataset.isFormula === 'true') return false;

        this.restoreEditorSelection(editor);
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return false;

        editor.focus();

        try {
            if (!range.collapsed) {
                this.applyInlineColorToRange(range, color, editor);
            } else if (color) {
                this.execCommandWithCSS('foreColor', color);
            } else {
                this.removeInlineStyleFromSelection(editor, 'color');
            }
            if (range.collapsed) {
                this.ensureCollapsedTypingColor(editor, color);
            }
            this.updateEditorOverflow(this.currentEditingCell, editor);
            this.syncEditorToFormulaBar(editor);
            const activeSelection = window.getSelection();
            if (activeSelection && activeSelection.rangeCount) {
                this.currentEditorSelection = { type: 'range', range: activeSelection.getRangeAt(0).cloneRange() };
            }
            this.resumeEditingAfterToolbar();
            this.updateFormattingButtons();
            this.refreshPalettes('font');
            return true;
        } catch (err) {
            console.warn('Unable to apply inline font color', err);
            return false;
        }
    }

    applyInlineBackgroundColor(color) {
        if (!this.currentEditingCell) return false;
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        if (!editor || editor.dataset.isFormula === 'true') return false;

        this.restoreEditorSelection(editor);
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return false;

        editor.focus();

        try {
            if (color) {
                const ok = this.execCommandWithCSS('hiliteColor', color);
                if (!ok) {
                    this.execCommandWithCSS('backColor', color);
                }
            } else {
                this.removeInlineStyleFromSelection(editor, 'backgroundColor');
            }
            this.updateEditorOverflow(this.currentEditingCell, editor);
            this.syncEditorToFormulaBar(editor);
            const activeSelection = window.getSelection();
            if (activeSelection && activeSelection.rangeCount) {
                this.currentEditorSelection = { type: 'range', range: activeSelection.getRangeAt(0).cloneRange() };
            }
            this.resumeEditingAfterToolbar();
            return true;
        } catch (err) {
            console.warn('Unable to apply inline background color', err);
            return false;
        }
    }

    saveEditorSelection(editor) {
        if (!editor) return;
        if (typeof editor.selectionStart === 'number') {
            const start = editor.selectionStart;
            const end = typeof editor.selectionEnd === 'number' ? editor.selectionEnd : start;
            this.currentEditorSelection = { type: 'input', start, end };
            return;
        }

        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return;
        this.currentEditorSelection = { type: 'range', range: range.cloneRange() };
    }

    restoreEditorSelection(editor) {
        if (!editor) return;
        const sel = this.currentEditorSelection;

        if (sel && sel.type === 'input' && typeof editor.setSelectionRange === 'function') {
            const max = (editor.value || '').length;
            const start = Math.min(sel.start ?? max, max);
            const end = Math.min(sel.end ?? start, max);
            try {
                editor.setSelectionRange(start, end);
                return;
            } catch (err) {
                // Fallback to default behavior below
            }
        }

        if (sel && sel.type === 'range' && sel.range && typeof window.getSelection === 'function') {
            const selection = window.getSelection();
            try {
                selection.removeAllRanges();
                selection.addRange(sel.range);
                return;
            } catch (err) {
                // Range may be stale if DOM changed; fall through to default
            }
        }

        if (typeof editor.setSelectionRange === 'function') {
            const len = (editor.value || '').length;
            editor.setSelectionRange(len, len);
        }
    }

    attachEditorSelectionListener(editor) {
        this.detachEditorSelectionListener();
        if (!editor) return;
        const handler = () => {
            if (!this.currentEditingCell) return;
            const activeEditor = this.currentEditingCell.querySelector('.cell-editor');
            if (!activeEditor || activeEditor !== editor) return;
            const selection = window.getSelection();
            if (!selection || !selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            if (!activeEditor.contains(range.commonAncestorContainer)) return;
            this.saveEditorSelection(activeEditor);
            this.updateFormattingButtons();
            this.updateFontSizeInput();
        };
        this.editorSelectionListener = handler;
        document.addEventListener('selectionchange', handler);
    }

    detachEditorSelectionListener() {
        if (this.editorSelectionListener) {
            document.removeEventListener('selectionchange', this.editorSelectionListener);
            this.editorSelectionListener = null;
        }
    }

    syncEditorToFormulaBar(editor) {
        if (!editor || !this.formulaInput) return;
        this.formulaInput.value = editor.textContent || '';
    }

    execCommandWithCSS(command, value) {
        if (typeof document.execCommand !== 'function') return false;
        try {
            document.execCommand('styleWithCSS', false, true);
        } catch (err) {
            // Some browsers throw if unsupported; ignore.
        }
        const result = document.execCommand(command, false, value);
        return result !== false;
    }

    removeInlineStyleFromSelection(editor, styleProp) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return;

        const clearStyle = element => {
            if (!element || element === editor || element.nodeType !== Node.ELEMENT_NODE) return;
            let removed = false;
            if (element.style && element.style[styleProp]) {
                element.style.removeProperty(styleProp);
                if (!element.getAttribute('style')) {
                    element.removeAttribute('style');
                }
                removed = true;
            }
            if (styleProp === 'color' && element.tagName === 'FONT' && element.getAttribute('color')) {
                element.removeAttribute('color');
                removed = true;
            }
            if (removed) {
                this.cleanupFormattingSpan(element);
            }
        };

        if (range.collapsed) {
            let node = range.startContainer;
            if (node.nodeType === Node.TEXT_NODE) {
                node = node.parentElement;
            }
            while (node && node !== editor) {
                clearStyle(node);
                node = node.parentElement;
            }
            return;
        }

        const walker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: node => {
                    if (!editor.contains(node)) return NodeFilter.FILTER_REJECT;
                    return this.rangeIntersectsNode(range, node)
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodes = [];
        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }
        nodes.forEach(clearStyle);
    }

    cleanupFormattingSpan(element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
        const tag = element.tagName;
        // Only unwrap spans or fonts that have no attributes left
        const canUnwrap = (tag === 'SPAN' || tag === 'FONT') && element.attributes.length === 0;
        if (!canUnwrap) return;
        const parent = element.parentNode;
        if (!parent) return;
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        parent.removeChild(element);
    }

    stripInlineFontColorFromHtml(html = '') {
        if (!html) return html;
        const container = document.createElement('div');
        container.innerHTML = html;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null);
        const cleanedNodes = [];

        while (walker.nextNode()) {
            const el = walker.currentNode;
            let removed = false;
            if (el.style && el.style.color) {
                el.style.removeProperty('color');
                removed = true;
                if (!el.getAttribute('style')) {
                    el.removeAttribute('style');
                }
            }
            if (el.tagName === 'FONT' && el.hasAttribute('color')) {
                el.removeAttribute('color');
                removed = true;
            }
            if (removed) {
                cleanedNodes.push(el);
            }
        }

        cleanedNodes.forEach(node => this.cleanupFormattingSpan(node));
        return container.innerHTML;
    }

    stripInlineFontColorFromElement(element) {
        if (!element) return;
        const root = element.querySelector('.cell-editor') || element;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
        const cleanedNodes = [];

        while (walker.nextNode()) {
            const el = walker.currentNode;
            let removed = false;
            if (el.style && el.style.color) {
                el.style.removeProperty('color');
                removed = true;
                if (!el.getAttribute('style')) {
                    el.removeAttribute('style');
                }
            }
            if (el.tagName === 'FONT' && el.hasAttribute('color')) {
                el.removeAttribute('color');
                removed = true;
            }
            if (removed) {
                cleanedNodes.push(el);
            }
        }

        cleanedNodes.forEach(node => this.cleanupFormattingSpan(node));
    }

    sanitizeRichTextHTML(rawHtml = '') {
        const allowed = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'SPAN', 'FONT']);
        const container = document.createElement('div');
        container.innerHTML = rawHtml || '';

        const sanitizeNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return document.createTextNode(node.nodeValue);
            }
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return null;
            }
            const tagName = node.tagName.toUpperCase();
            const isAllowed = allowed.has(tagName);
            const target = document.createElement(tagName === 'FONT' ? 'span' : node.tagName.toLowerCase());
            const styleMap = new Map();
            const addStyle = (prop, value) => {
                if (value) styleMap.set(prop, value);
            };

            if (tagName === 'B' || tagName === 'STRONG') addStyle('font-weight', 'bold');
            if (tagName === 'I' || tagName === 'EM') addStyle('font-style', 'italic');
            if (tagName === 'U') addStyle('text-decoration', 'underline');
            if (tagName === 'S' || tagName === 'STRIKE') addStyle('text-decoration', 'line-through');

            const style = node.style || {};
            const decorations = new Set();
            const collectDecoration = (val) => {
                if (!val || val === 'none') return;
                val.split(/\s+/).forEach(part => part && decorations.add(part));
            };
            collectDecoration(style.textDecoration);
            collectDecoration(style.textDecorationLine);
            if (decorations.size || style.textDecoration || style.textDecorationLine) {
                addStyle('text-decoration', Array.from(decorations).join(' ') || style.textDecoration || style.textDecorationLine);
            }
            if (style.fontWeight) addStyle('font-weight', style.fontWeight);
            if (style.fontStyle) addStyle('font-style', style.fontStyle);
            addStyle('color', style.color);
            addStyle('background-color', style.backgroundColor);
            addStyle('font-size', style.fontSize);

            const fontColorAttr = node.getAttribute && node.getAttribute('color');
            const bgColorAttr = node.getAttribute && node.getAttribute('bgcolor');
            if (fontColorAttr) addStyle('color', fontColorAttr);
            if (bgColorAttr) addStyle('background-color', bgColorAttr);

            node.childNodes.forEach(child => {
                const cleaned = sanitizeNode(child);
                if (cleaned) target.appendChild(cleaned);
            });

            // Preserve inline formatting flags
            ['bold', 'italic', 'underline', 'strikethrough'].forEach(key => {
                const val = node.getAttribute && node.getAttribute(`data-${key}`);
                if (val) {
                    target.setAttribute(`data-${key}`, val);
                }
            });
                
            if ((tagName === 'SPAN' || tagName === 'FONT') && !styleMap.size) {
                const frag = document.createDocumentFragment();
                while (target.firstChild) {
                    frag.appendChild(target.firstChild);
                }
                return frag;
            }

            if (styleMap.size) {
                target.setAttribute('style', Array.from(styleMap.entries()).map(([k, v]) => `${k}:${v}`).join(';'));
            }

            if (!isAllowed) {
                const frag = document.createDocumentFragment();
                while (target.firstChild) {
                    frag.appendChild(target.firstChild);
                }
                return frag;
            }
            if (!target.hasChildNodes()) {
                return document.createTextNode('');
            }
            return target;
        };

        const resultFrag = document.createDocumentFragment();
        Array.from(container.childNodes).forEach(child => {
            const cleaned = sanitizeNode(child);
            if (cleaned) resultFrag.appendChild(cleaned);
        });
        const wrapper = document.createElement('div');
        wrapper.appendChild(resultFrag);
        return wrapper.innerHTML;
    }

    serializeEditorContent(editor) {
        const plainText = (editor?.textContent || '').replace(/\u00a0/g, ' ');
        const sanitizedHtml = this.sanitizeRichTextHTML(editor ? editor.innerHTML : '');
        const escapedPlain = escapeHTML(plainText);
        const hasRich = !!sanitizedHtml && sanitizedHtml !== escapedPlain;
        return { plainText, html: sanitizedHtml, hasRich };
    }

    setRichTextFormat(html, format, enable = true) {
        if (!html || !format) return html;
        const container = document.createElement('div');
        container.innerHTML = html;

        const addDecoration = (el, part) => {
            const decos = new Set(
                (el.style.textDecoration || el.style.textDecorationLine || '')
                    .split(/\s+/)
                    .filter(Boolean)
                    .map(s => s.toLowerCase())
            );
            decos.delete('none');
            decos.add(part);
            el.style.textDecoration = Array.from(decos).join(' ');
        };

        const walk = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const el = child;
                    // Clear any explicit "false" overrides
                    if (el.dataset) {
                        delete el.dataset[format];
                    }
                    if (enable) {
                        switch (format) {
                            case 'bold':
                                el.dataset.bold = 'true';
                                el.style.fontWeight = 'bold';
                                break;
                            case 'italic':
                                el.dataset.italic = 'true';
                                el.style.fontStyle = 'italic';
                                break;
                            case 'underline':
                                el.dataset.underline = 'true';
                                addDecoration(el, 'underline');
                                break;
                            case 'strikethrough':
                                el.dataset.strikethrough = 'true';
                                addDecoration(el, 'line-through');
                                break;
                            default:
                                break;
                        }
                    }
                    if (el.childNodes.length) {
                        walk(el);
                    }
                }
            });
        };

        walk(container);
        return container.innerHTML;
    }

    richTextHasFormat(html, format) {
        if (!html || !format) return false;
        const container = document.createElement('div');
        container.innerHTML = html;

        const hasStyle = (el) => {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
            const ds = el.dataset || {};
            if (ds[format] === 'true') return true;
            const style = el.style || {};
            if (format === 'bold') {
                const weight = style.fontWeight;
                if (weight && weight !== 'normal' && weight !== '400') return true;
            } else if (format === 'italic') {
                if (style.fontStyle && style.fontStyle !== 'normal') return true;
            } else if (format === 'underline' || format === 'strikethrough') {
                const deco = (style.textDecoration || style.textDecorationLine || '').toLowerCase();
                if (format === 'underline' && deco.includes('underline')) return true;
                if (format === 'strikethrough' && deco.includes('line-through')) return true;
            }
            return false;
        };

        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        while (node) {
            let el = node.parentElement;
            while (el && el !== container) {
                if (hasStyle(el)) return true;
                el = el.parentElement;
            }
            node = walker.nextNode();
        }
        return false;
    }

    richTextFullyFormatted(html, format) {
        if (!html || !format) return false;
        const container = document.createElement('div');
        container.innerHTML = html;

        const nodeHasFormat = (el) => {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
            const ds = el.dataset || {};
            if (ds[format] === 'false') return false;
            if (ds[format] === 'true') return true;
            const style = el.style || {};
            if (format === 'bold') {
                const weight = style.fontWeight;
                if (weight && weight !== 'normal' && weight !== '400') return true;
            } else if (format === 'italic') {
                if (style.fontStyle && style.fontStyle !== 'normal') return true;
            } else if (format === 'underline' || format === 'strikethrough') {
                const deco = (style.textDecoration || style.textDecorationLine || '').toLowerCase();
                if (format === 'underline' && deco.includes('underline')) return true;
                if (format === 'strikethrough' && deco.includes('line-through')) return true;
            }
            return false;
        };

        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        let sawText = false;
        while (node) {
            sawText = true;
            let el = node.parentElement;
            let hasFmt = false;
            while (el && el !== container) {
                if (nodeHasFormat(el)) {
                    hasFmt = true;
                    break;
                }
                el = el.parentElement;
            }
            if (!hasFmt) return false;
            node = walker.nextNode();
        }
        return sawText;
    }

    getUniformRichTextFontSize(html) {
        if (!html) return null;
        const container = document.createElement('div');
        container.innerHTML = html;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        let uniform = null;
        while (node) {
            if (node.nodeValue && node.nodeValue.length) {
                let el = node.parentElement;
                let size = null;
                while (el && el !== container) {
                    const styleAttr = typeof el.getAttribute === 'function' ? el.getAttribute('style') : '';
                    if (styleAttr) {
                        const match = styleAttr.match(/font-size\s*:\s*([0-9.]+)px/i);
                        if (match) {
                            size = parseFloat(match[1]);
                            break;
                        }
                    }
                    el = el.parentElement;
                }
                if (!Number.isFinite(size)) return null;
                uniform = uniform === null ? size : (Math.abs(uniform - size) < 0.01 ? uniform : null);
                if (uniform === null) return null;
            }
            node = walker.nextNode();
        }
        return uniform === null ? null : Math.round(uniform);
    }

    getMaxFontSizeInHTML(html) {
        if (!html) return null;
        const container = document.createElement('div');
        container.innerHTML = html;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        let maxSize = null;
        while (node) {
            if (node.nodeValue && node.nodeValue.length) {
                let el = node.parentElement;
                while (el && el !== container) {
                    const styleAttr = typeof el.getAttribute === 'function' ? el.getAttribute('style') : '';
                    if (styleAttr) {
                        const match = styleAttr.match(/font-size\s*:\s*([0-9.]+)px/i);
                        if (match) {
                            const size = parseFloat(match[1]);
                            if (Number.isFinite(size)) {
                                maxSize = maxSize === null ? size : Math.max(maxSize, size);
                            }
                            break;
                        }
                    }
                    el = el.parentElement;
                }
            }
            node = walker.nextNode();
        }
        return maxSize === null ? null : Math.round(maxSize);
    }

    clearRichTextFormat(html, format) {
        if (!html || !format) return html;
        const container = document.createElement('div');
        container.innerHTML = html;

        const removeDecoration = (el, part) => {
            const decos = new Set(
                (el.style.textDecoration || el.style.textDecorationLine || '')
                    .split(/\s+/)
                    .filter(Boolean)
                    .map(s => s.toLowerCase())
            );
            decos.delete(part);
            const value = Array.from(decos).join(' ');
            if (value) {
                el.style.textDecoration = value;
            } else {
                el.style.removeProperty('text-decoration');
                if (!el.getAttribute('style')) el.removeAttribute('style');
            }
        };

        const walk = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const el = child;
                    if (el.dataset) {
                        delete el.dataset[format];
                    }
                    switch (format) {
                        case 'bold':
                            if (el.style.fontWeight) {
                                el.style.removeProperty('font-weight');
                                if (!el.getAttribute('style')) el.removeAttribute('style');
                            }
                            break;
                        case 'italic':
                            if (el.style.fontStyle) {
                                el.style.removeProperty('font-style');
                                if (!el.getAttribute('style')) el.removeAttribute('style');
                            }
                            break;
                        case 'underline':
                            removeDecoration(el, 'underline');
                            break;
                        case 'strikethrough':
                            removeDecoration(el, 'line-through');
                            break;
                        default:
                            break;
                    }
                    if (el.childNodes.length) {
                        walk(el);
                    }
                }
            });
        };

        walk(container);
        return container.innerHTML;
    }
    
    applyBaselineFormatting(html, formatting = {}) {
        if (!html) return html;
        const activeFormats = ['bold', 'italic', 'underline', 'strikethrough'].filter(f => formatting[f]);
        if (!activeFormats.length) return html;

        const container = document.createElement('div');
        container.innerHTML = html;

        const hasExplicitFormatting = (node, format) => {
            let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            while (el && el !== container) {
                if (el.dataset && (el.dataset[format] === 'true' || el.dataset[format] === 'false')) {
                    return true;
                }
                const style = el.style;
                if (style) {
                    if (format === 'bold' && style.fontWeight) return true;
                    if (format === 'italic' && style.fontStyle) return true;
                    if (format === 'underline' || format === 'strikethrough') {
                        const deco = (style.textDecoration || style.textDecorationLine || '').toLowerCase();
                        if (deco.includes('underline') && format === 'underline') return true;
                        if (deco.includes('line-through') && format === 'strikethrough') return true;
                        if (deco === 'none') return true;
                    }
                }
                el = el.parentElement;
            }
            return false;
        };

        const wrapTextNode = (textNode) => {
            const span = document.createElement('span');
            span.textContent = textNode.nodeValue;
            const decorations = [];
            if (formatting.bold && !hasExplicitFormatting(textNode, 'bold')) {
                span.dataset.bold = 'true';
                span.style.fontWeight = 'bold';
            }
            if (formatting.italic && !hasExplicitFormatting(textNode, 'italic')) {
                span.dataset.italic = 'true';
                span.style.fontStyle = 'italic';
            }
            if (formatting.underline && !hasExplicitFormatting(textNode, 'underline')) {
                span.dataset.underline = 'true';
                decorations.push('underline');
            }
            if (formatting.strikethrough && !hasExplicitFormatting(textNode, 'strikethrough')) {
                span.dataset.strikethrough = 'true';
                decorations.push('line-through');
            }
            if (decorations.length) {
                span.style.textDecoration = decorations.join(' ');
            }
            textNode.parentNode.replaceChild(span, textNode);
        };

        const walk = (node) => {
            Array.from(node.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    if (child.nodeValue && child.nodeValue.length) {
                        const needsWrap = activeFormats.some(fmt => !hasExplicitFormatting(child, fmt));
                        if (needsWrap) {
                            wrapTextNode(child);
                        }
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    walk(child);
                }
            });
        };

        walk(container);
        return container.innerHTML;
    }
    
    buildInlineHTMLFromPlain(text, formatting = {}) {
        const escaped = escapeHTML(text || '');
        if (!formatting.bold && !formatting.italic && !formatting.underline && !formatting.strikethrough) {
            return escaped;
        }
        return this.applyBaselineFormatting(escaped, formatting);
    }
    
    wrapRichTextWithFormatting(html, formatting = {}) {
        if (!html) return html;
        const styles = [];
        if (formatting.bold) styles.push('font-weight:bold');
        if (formatting.italic) styles.push('font-style:italic');
        const decorations = [];
        if (formatting.underline) decorations.push('underline');
        if (formatting.strikethrough) decorations.push('line-through');
        if (decorations.length) styles.push(`text-decoration:${decorations.join(' ')}`);
        if (!styles.length) return html;
        return `<span style="${styles.join(';')}">${html}</span>`;
    }

    rangeIntersectsNode(range, node) {
        if (typeof range.intersectsNode === 'function') {
            try {
                return range.intersectsNode(node);
            } catch (err) {
                return false;
            }
        }
        const tempRange = document.createRange();
        try {
            tempRange.selectNodeContents(node);
            return range.compareBoundaryPoints(Range.END_TO_START, tempRange) > 0 &&
                range.compareBoundaryPoints(Range.START_TO_END, tempRange) < 0;
        } catch (err) {
            return false;
        } finally {
            tempRange.detach?.();
        }
    }

    toggleFormat(format) { this.applyFormatting(format, true); }
    setTextAlign(alignment) { this.applyFormatting('textAlign', alignment); }
    setVerticalAlign(alignment) { this.applyFormatting('verticalAlign', alignment); }

    updateAlignmentButtons() {
        const buttons = {
            textAlign: { default: 'left', buttons: ['alignLeftBtn', 'alignCenterBtn', 'alignRightBtn'] },
            verticalAlign: { default: 'bottom', buttons: ['alignTopBtn', 'alignMiddleBtn', 'alignBottomBtn'] }
        };

        Object.entries(buttons).forEach(([prop, config]) => {
            let common = null, allSame = true;
            
            for (const coord of this.selectedCellCoords) {
                const data = this.cellData.get(coord);
                let val;
                if (data && Object.prototype.hasOwnProperty.call(data, prop)) {
                    val = data[prop];
                } else if (Object.prototype.hasOwnProperty.call(this.defaultCellStyle, prop)) {
                    val = this.defaultCellStyle[prop];
                } else {
                    val = config.default;
                }
                if (common === null) common = val;
                else if (common !== val) { allSame = false; break; }
            }
            
            config.buttons.forEach((btn, i) => {
                const values = prop === 'textAlign' ? ['left', 'center', 'right'] : ['top', 'middle', 'bottom'];
                document.getElementById(btn).classList.toggle('active', allSame && common === values[i]);
            });
        });
    }
    
    getResizeConfig(type) {
        return type === 'column' ? {
            axis: 'clientX',
            cursor: 'col-resize',
            minSize: 30,
            sizeMap: this.columnWidths,
            getSizeFn: this.getColumnWidth,
            dataset: 'col'
        } : {
            axis: 'clientY',
            cursor: 'row-resize',
            minSize: 20,
            sizeMap: this.rowHeights,
            getSizeFn: this.getRowHeight,
            dataset: 'row'
        };
    }
    
    handleResizeMouseDown(event) {
        const handle = event.target.closest('.column-resize-handle, .row-resize-handle');
        if (!handle) return;
        
        event.stopPropagation();
        event.preventDefault();
        
        // Determine type from class
        this.resizeType = handle.classList.contains('column-resize-handle') ? 'column' : 'row';
        const config = this.getResizeConfig(this.resizeType);
        
        // Store config for use in mouse move
        this.resizeConfig = config;
        this.isResizing = true;
        this.resizeIndex = parseInt(handle.dataset[config.dataset]);
        this.resizeStartPos = event[config.axis];
        this.resizeStartSize = config.getSizeFn.call(this, this.resizeIndex);
        
        document.body.style.cursor = config.cursor;
        
        // Create resize indicator
        this.createResizeIndicator();
        this.createResizeGuide();
    }
    
    createResizeIndicator() {
        this.resizeIndicator = document.createElement('div');
        this.resizeIndicator.className = 'resize-indicator';
        document.body.appendChild(this.resizeIndicator);
    }

    createResizeGuide() {
        this.resizeGuide = document.createElement('div');
        this.resizeGuide.className = `resize-guide resize-guide--${this.resizeType === 'column' ? 'vertical' : 'horizontal'}`;
        document.body.appendChild(this.resizeGuide);
    }

    updateResizeIndicator(newSize, event) {
        if (!this.resizeIndicator) return;
        
        const isColumn = this.resizeType === 'column';
        const label = isColumn 
            ? `Col ${this.getColumnName(this.resizeIndex)}` 
            : `Row ${this.resizeIndex + 1}`;
        
        this.resizeIndicator.textContent = `${label}: ${Math.round(newSize)}px`;
        
        // Position the indicator near the cursor
        const offset = 20;
        if (isColumn) {
            this.resizeIndicator.style.left = (event.clientX + offset) + 'px';
            this.resizeIndicator.style.top = (event.clientY - offset) + 'px';
        } else {
            this.resizeIndicator.style.left = (event.clientX + offset) + 'px';
            this.resizeIndicator.style.top = (event.clientY + offset) + 'px';
        }
    }

    updateResizeGuide() {
        if (!this.resizeGuide) return;
        
        const isColumn = this.resizeType === 'column';
        
        if (isColumn) {
            const headerRect = this.columnHeaders.getBoundingClientRect();
            const headers = this.columnHeaders.querySelectorAll('.column-header');
            const header = headers[this.resizeIndex];
            if (header) {
                const left = parseFloat(header.style.left) || 0;
                const width = parseFloat(header.style.width) || this.config.cellWidth;
                const zoom = this.zoomLevel || 1;
                this.resizeGuide.style.left = (headerRect.left + (left + width) * zoom) + 'px';
            }
        } else {
            const headerRect = this.rowHeaders.getBoundingClientRect();
            const headers = this.rowHeaders.querySelectorAll('.row-header');
            const header = headers[this.resizeIndex];
            if (header) {
                const top = parseFloat(header.style.top) || 0;
                const height = parseFloat(header.style.height) || this.config.cellHeight;
                const zoom = this.zoomLevel || 1;
                this.resizeGuide.style.top = (headerRect.top + (top + height) * zoom) + 'px';
            }
        }
    }

    removeResizeIndicator() {
        if (this.resizeIndicator) {
            this.resizeIndicator.remove();
            this.resizeIndicator = null;
        }
        if (this.resizeGuide) {
            this.resizeGuide.remove();
            this.resizeGuide = null;
        }
    }

    handleDocumentMouseMove(event) {
        if (!this.isResizing || this.resizeAnimationFrame) return;
        
        this.resizeAnimationFrame = requestAnimationFrame(() => {
            this.resizeAnimationFrame = null;
            
            const { axis, minSize, sizeMap } = this.resizeConfig;
            const zoom = this.zoomLevel || 1;
            const delta = (event[axis] - this.resizeStartPos) / zoom;
            const newSize = Math.max(minSize, this.resizeStartSize + delta);
            
            sizeMap.set(this.resizeIndex, newSize);
            if (this.resizeType === 'row' && this.autoRowHeights instanceof Map) {
                this.autoRowHeights.delete(this.resizeIndex);
                this.rowHeightModes.set(this.resizeIndex, 'explicit');
            }
            this.updateLayout(this.resizeIndex, this.resizeType);
            this.updateResizeIndicator(newSize, event);
            this.updateResizeGuide();
        });
    }
    
    updateLayout(idx, type) {
        const isCol = type === 'column';
        const [prop, pos, attr, sel, cont, vis, getSz, getPos, getTotal] = isCol
            ? ['width', 'left', 'col', '.column-header', this.columnHeaders, this.visibleCols, 
            this.getColumnWidth, this.getColumnLeft, this.getTotalGridWidth]
            : ['height', 'top', 'row', '.row-header', this.rowHeaders, this.visibleRows,
            this.getRowHeight, this.getRowTop, this.getTotalGridHeight];
        
        const sz = getSz.call(this, idx);
        const hdrs = cont.querySelectorAll(sel);
        
        // Update resized element and subsequent positions
        hdrs[idx]?.style.setProperty(prop, sz + 'px');
        for (let i = Math.max(idx + 1, vis.start); i < Math.min(hdrs.length, vis.end + 5); i++) {
            hdrs[i]?.style.setProperty(pos, getPos.call(this, i) + 'px');
        }
        
        // Update grid and cells
        const totalSize = getTotal.call(this);
        this.gridContent.style[prop] = totalSize + 'px';

        if (isCol && this.columnHeaders) {
            this.columnHeaders.style.width = totalSize + 'px';
        } else if (!isCol && this.rowHeaders) {
            this.rowHeaders.style.height = totalSize + 'px';
        }

        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            const i = parseInt(cell.dataset[attr]);
            cell.style[i === idx ? prop : i > idx && pos] = 
                (i === idx ? sz : i > idx && getPos.call(this, i)) + 'px';
        });

        // Keep merged cells in sync while resizing
        this.updateMergedCellsForResize(idx, isCol);
    }

    updateGridSize() {
        const totalWidth = this.getTotalGridWidth();
        const totalHeight = this.getTotalGridHeight();

        this.gridContent.style.width = totalWidth + 'px';
        this.gridContent.style.height = totalHeight + 'px';

        if (this.columnHeaders) {
            this.columnHeaders.style.width = totalWidth + 'px';
        }

        if (this.rowHeaders) {
            this.rowHeaders.style.height = totalHeight + 'px';
        }
    }

    repositionCells() {
        const cells = this.gridContent.querySelectorAll('.cell');
        cells.forEach(cell => {
            const { row, col } = this.getCellPos(cell);
            const coordKey = `${row},${col}`;
            const mergeInfo = this.mergedCells.get(coordKey);
            const parentCoord = this.cellToMergeParent.get(coordKey);
            
            cell.style.left = this.getColumnLeft(col) + 'px';
            cell.style.top = this.getRowTop(row) + 'px';
            if (mergeInfo) {
                let totalWidth = 0;
                let totalHeight = 0;
                for (let c = 0; c < mergeInfo.cols; c++) {
                    totalWidth += this.getColumnWidth(col + c);
                }
                for (let r = 0; r < mergeInfo.rows; r++) {
                    totalHeight += this.getRowHeight(row + r);
                }
                cell.style.display = '';
                cell.classList.remove('merged-child');
                cell.style.width = totalWidth + 'px';
                cell.style.height = totalHeight + 'px';
                cell.classList.add('merged-cell');
            } else {
                cell.classList.remove('merged-cell');
                cell.style.width = this.getColumnWidth(col) + 'px';
                cell.style.height = this.getRowHeight(row) + 'px';
                if (parentCoord) {
                    cell.style.display = 'none';
                    cell.classList.add('merged-child');
                } else {
                    cell.style.display = '';
                    cell.classList.remove('merged-child');
                }
            }
        });
    }

    updateMergedCellsForResize(idx, isCol) {
        if (!this.mergedCells || this.mergedCells.size === 0) return;
        this.mergedCells.forEach((info, key) => {
            const [row, col] = key.split(',').map(Number);
            const affected = isCol
                ? (col <= idx && idx < col + info.cols)
                : (row <= idx && idx < row + info.rows);
            if (!affected) return;
            const cell = this.getCellAt(row, col);
            if (!cell) return;

            let totalWidth = 0;
            let totalHeight = 0;
            for (let c = 0; c < info.cols; c++) totalWidth += this.getColumnWidth(col + c);
            for (let r = 0; r < info.rows; r++) totalHeight += this.getRowHeight(row + r);

            cell.style.width = totalWidth + 'px';
            cell.style.height = totalHeight + 'px';
            cell.style.left = this.getColumnLeft(col) + 'px';
            cell.style.top = this.getRowTop(row) + 'px';
        });
    }
    
    handleFontSizeChange(event, { finalize = false } = {}) {
        if (this.skipNextFontSizeChange) {
            // Avoid reapplying the size when the blur-triggered change fires after an Enter commit.
            this.skipNextFontSizeChange = false;
            return;
        }
        // Keep the input marked as active while the user is typing.
        this.isFontSizeEditing = true;
        if (this.currentEditingCell && finalize) {
            this.pendingEditorRefocus = true;
            this.isToolbarFormattingInteraction = true;
        }
        const input = document.getElementById('fontSizeInput');
        if (!input) return;
        const raw = input.value.trim();
        if (!raw.length) return;
        const size = parseInt(raw, 10);
        const hasCellSelection = this.hasSelection();
        const canInline = !!this.currentEditingCell;
        if (!Number.isFinite(size) || size < 1 || (!hasCellSelection && !canInline)) return;

        // Allow the user to type freely and only enforce the minimum once they leave the field.
        if (!finalize && size < 6) return;

        const clamped = finalize ? Math.max(6, Math.min(200, size)) : Math.min(200, size);
        if (finalize) input.value = clamped;
        this.log(`Font size input change (raw="${raw}", size=${size}, clamped=${clamped}, finalize=${finalize})`);
        this.applyFontSize(clamped, { finalize });
        if (finalize && this.currentEditingCell) {
            setTimeout(() => this.resumeEditingAfterToolbar(), 0);
        }
    }

    applyFontSize(fontSize, { finalize = false } = {}) {
        // Inline edit path: apply size to selection inside the active editor
        if (this.currentEditingCell) {
            const editor = this.currentEditingCell.querySelector('.cell-editor');
            if (editor) {
                this.restoreEditorSelection(editor);
        const inlineApplied = this.applyInlineFontSize(editor, fontSize);
        if (inlineApplied) {
            this.lastInlineFontSize = fontSize;
            this.syncEditorLineHeight(editor);
            this.updateEditorOverflow(this.currentEditingCell, editor);
            const rowIdx = Number.parseInt(this.currentEditingCell.dataset.row, 10);
            const maxInlineSize = this.getMaxFontSizeInEditor(editor);
            if (Number.isFinite(rowIdx) && Number.isFinite(maxInlineSize)) {
                this.applyInlineRowHeightAdjustment(rowIdx, maxInlineSize);
            }
            this.syncEditorToFormulaBar(editor);
            this.saveEditorSelection(editor);
            this.updateFormattingButtons();
            this.log(`Applied font size ${fontSize}px to inline selection${finalize ? ' (finalized)' : ''}`);
            return 'inline';
                }
            }
        }
        
        if (!this.hasSelection()) return null;
        const scope = this.getSelectionScope();
        const applyToAll = scope.type === 'all';
        const affectedRows = applyToAll ? null : new Set(this.getSelectionPositions().map(pos => pos.row));
        const scopeLabel = (() => {
            if (applyToAll) return ' (all cells)';
            if (scope.type === 'rows') return ` (${scope.rows.length} row${scope.rows.length === 1 ? '' : 's'})`;
            if (scope.type === 'columns') return ` (${scope.cols.length} column${scope.cols.length === 1 ? '' : 's'})`;
            return '';
        })();
        this.saveState(`Apply font size ${fontSize}px${scopeLabel}`);

        if (applyToAll) {
            this.setDefaultCellProperty('fontSize', fontSize || null);
            const keysToDelete = [];
            this.cellData.forEach((data, coord) => {
                delete data.fontSize;
                if (this.isCellEffectivelyEmpty(data)) keysToDelete.push(coord);
            });
            keysToDelete.forEach(coord => this.cellData.delete(coord));
            this.refreshAllVisibleCells();
            this.updateFontSizeInput();
            this.log(`Set default font size ${fontSize}px for entire grid${finalize ? ' (finalized)' : ''}`);
            return 'all';
        }

        if (scope.type === 'rows' || scope.type === 'columns') {
            const indices = scope.type === 'rows' ? scope.rows : scope.cols;
            const map = scope.type === 'rows' ? this.rowStyles : this.columnStyles;
            indices.forEach(idx => {
                const entry = this.getDimensionStyle(scope.type === 'rows' ? 'row' : 'column', idx, true);
                this.setStyleValue(entry, 'fontSize', fontSize || null);
                if (this.isStyleEntryEmpty(entry) && (!entry._meta || Object.keys(entry._meta).length === 0)) {
                    map.delete(idx);
                }
            });
            if (scope.type === 'rows') {
                this.recalculateAutoRowHeights(new Set(indices));
            } else {
                this.recalculateAutoRowHeights();
            }
            this.refreshAllVisibleCells();
            this.updateFontSizeInput();
            this.log(`Applied font size ${fontSize}px to ${scope.type === 'rows' ? 'row' : 'column'} selection${finalize ? ' (finalized)' : ''}`);
            return scope.type;
        }
        
        // Update data model
        this.selectedCellCoords.forEach(coord => {
            this.updateCellDataEntry(coord, data => {
                if (fontSize) {
                    data.fontSize = fontSize;
                } else {
                    delete data.fontSize;
                }
            });
            const meta = this.getCellStyleMeta(coord, true);
            meta.fontSize = this.nextStyleSequence();
        });

        // Update DOM
        this.selectedCells.forEach(cell => {
            const coord = this.getCoord(cell);
            const cellData = this.cellData.get(coord) || {};
            this.updateCellDisplay(cell, cellData);
        });

        this.updateFontSizeInput();
        this.recalculateAutoRowHeights(affectedRows);
        if (this.selectedCells.size) {
            this._updateCellsAndAdjacent(this.selectedCells);
        }
        const targetedCells = this.selectedCells.size || this.selectedCellCoords.size;
        this.log(`Applied font size ${fontSize}px to ${targetedCells} cell${targetedCells === 1 ? '' : 's'}${finalize ? ' (finalized)' : ''}`);

        // Keep live editor styling; refocus only when not actively editing size input
        if (this.currentEditingCell) {
            const editingCoord = this.getCoord(this.currentEditingCell);
            const appliesHere = applyToAll || this.selectedCellCoords.has(editingCoord);
            if (appliesHere) {
                const data = this.cellData.get(editingCoord) || {};
                this.refreshEditingCellFormatting(this.currentEditingCell, data);
                if (!this.isFontSizeEditing && !this.isPaletteFieldEditing) {
                    this.resumeEditingAfterToolbar();
                }
            }
        }
        return 'cells';
    }

    updateFontSizeInput() {
        const fontSizeInput = document.getElementById('fontSizeInput');
        if (!fontSizeInput) return;

        // Do not override while the user is actively typing a size.
        if (document.activeElement === fontSizeInput && this.isFontSizeEditing) {
            return;
        }

        // While inline-editing, show the current selection's font size when uniform.
        if (this.currentEditingCell) {
            const editor = this.currentEditingCell.querySelector('.cell-editor');
            const inlineSize = this.getEditorSelectionFontSize(editor);
            if (Number.isFinite(inlineSize)) {
                fontSizeInput.value = inlineSize;
                return;
            }
        }

        if (!this.hasSelection()) {
            fontSizeInput.value = '';
            return;
        }

        // Get the primary cell's font size or default
        if (this.primaryCellCoord) {
            const cellData = this.cellData.get(this.primaryCellCoord);
            let fontSize = this.getEffectiveCellProperty(this.primaryCellCoord, 'fontSize');
            if (fontSize === undefined || fontSize === null) {
                fontSize = this.getUniformRichTextFontSize(cellData?.richText);
            }
            if (fontSize === undefined || fontSize === null) {
                fontSize = this.currentEditingCell ? this.lastInlineFontSize : null;
            }
            
            if (fontSize) {
                fontSizeInput.value = fontSize;
            } else {
                // Show default font size
                fontSizeInput.value = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-sm'));
            }
        } else {
            fontSizeInput.value = '';
        }
    }

    blurFontSizeInputIfFocused(event) {
        const fontSizeInput = document.getElementById('fontSizeInput');
        if (!fontSizeInput) return;
        if (document.activeElement !== fontSizeInput) return;
        if (event && fontSizeInput.contains(event.target)) return;
        this.fontSizeBlurAllowed = true;
        this.fontSizeBlurReason = 'external-blur';
        fontSizeInput.blur();
    }
    
    selectRange(type, index, addToSelection = false) {
        if (!addToSelection) this.clearAllSelections();
        
        const isRow = type === 'row';
        const limit = isRow ? this.config.maxCols : this.config.maxRows;
        const cells = [];
        
        // Build coordinate list and collect visible cells
        for (let i = 0; i < limit; i++) {
            const coord = isRow ? `${index},${i}` : `${i},${index}`;
            this.selectedCellCoords.add(coord);
            
            const [row, col] = this.parseCoord(coord);
            const cell = this.getCellAt(row, col);
            if (cell) cells.push(cell);
        }
        
        // Mark cells as selected and set primary
        cells.forEach((cell, idx) => {
            this.selectedCells.add(cell);
            cell.classList.add('selected');
            
            if (idx === 0 && (!this.primaryCell || !addToSelection)) {
                this.primaryCell = cell;
                this.primaryCellCoord = `${cell.dataset.row},${cell.dataset.col}`;
                cell.classList.add('primary-selected');
            }
        });
        
        // Update UI once at the end
        this.updateUI();
        
        const displayIndex = isRow ? index + 1 : this.getColumnName(index);
        const action = addToSelection ? 'Added' : 'Selected';
        this.log(`${action} full ${type} ${displayIndex}`);
    }

    handleHeaderClick(event, type) {
        if (event.target.closest(`.${type}-resize-handle`) || this.justResized) {
            return;
        }
        
        const header = event.target.closest(`.${type}-header`);
        if (!header) return;
        
        this.blurFontSizeInputIfFocused(event);
        this.isFontSizeEditing = false;

        const index = parseInt(header.dataset[type === 'column' ? 'col' : 'row']);
        const isCtrlPressed = event.ctrlKey || event.metaKey;
        
        // Check if this row/column is already fully selected
        if (isCtrlPressed && this.isRangeFullySelected(type, index)) {
            this.deselectRange(type, index);
        } else {
            this.selectRange(type, index, isCtrlPressed);
        }
    }
    
    isRangeFullySelected(type, index) {
        const isRow = type === 'row';
        const limit = isRow ? this.config.maxCols : this.config.maxRows;
        
        // Check if all cells in this row/column are selected
        for (let i = 0; i < limit; i++) {
            const coord = isRow ? `${index},${i}` : `${i},${index}`;
            if (!this.selectedCellCoords.has(coord)) {
                return false;
            }
        }
        
        return true;
    }

    deselectRange(type, index) {
        const isRow = type === 'row';
        const limit = isRow ? this.config.maxCols : this.config.maxRows;
        
        // Remove coordinates and visible cells from selection
        for (let i = 0; i < limit; i++) {
            const coord = isRow ? `${index},${i}` : `${i},${index}`;
            this.selectedCellCoords.delete(coord);
            
            const [row, col] = this.parseCoord(coord);
            const cell = this.getCellAt(row, col);
            if (cell) {
                this.selectedCells.delete(cell);
                cell.classList.remove('selected', 'primary-selected');
                
                // Clear primary cell if it was in this range
                if (cell === this.primaryCell) {
                    this.primaryCell = null;
                    this.primaryCellCoord = null;
                }
            }
        }
        
        // If we still have selections, set a new primary cell
        if (this.selectedCellCoords.size > 0 && !this.primaryCell) {
            const firstCoord = Array.from(this.selectedCellCoords)[0];
            const [row, col] = this.parseCoord(firstCoord);
            const cell = this.getCellAt(row, col);
            
            if (cell) {
                this.primaryCell = cell;
                this.primaryCellCoord = firstCoord;
                cell.classList.add('primary-selected');
            } else {
                // If not visible, just store the coordinate
                this.primaryCellCoord = firstCoord;
            }
        }
        
        // Update UI
        this.updateUI();
        
        const displayIndex = isRow ? index + 1 : this.getColumnName(index);
        this.log(`Deselected full ${type} ${displayIndex}`);
    }

    handleCornerCellClick(event) {
        // Select all cells in the spreadsheet
        this.blurFontSizeInputIfFocused(event);
        this.isFontSizeEditing = false;
        this.selectAllCells();
    }
    
    findVisibleRange(scrollPos, viewportSize, max, getSizeFn, padding = 10) {
        const findIndex = (targetPos) => {
            let pos = 0;
            for (let i = 0; i < max; i++) {
                if (pos >= targetPos) return i;
                pos += getSizeFn.call(this, i);
            }
            return max;
        };
        
        const start = Math.max(0, findIndex(scrollPos) - padding);
        const end = Math.min(max, findIndex(scrollPos + viewportSize) + padding);
        
        return { start, end };
    }

    handleScroll() {
        if (!this.mainGrid) return;
        this.updateHeaderTransforms();
        if (this.recalculateVisibleViewport()) this.updateVisibleCells();
        this.updateCommentPopover();
    }

    recalculateVisibleViewport(forceUpdate = false, depth = 0) {
        if (depth > 4) return false;
        if (!this.mainGrid) return false;

        const zoom = this.zoomLevel || 1;
        const scrollLeft = this.mainGrid.scrollLeft;
        const scrollTop = this.mainGrid.scrollTop;
        const viewportWidth = this.mainGrid.clientWidth;
        const viewportHeight = this.mainGrid.clientHeight;

        const newVisibleCols = this.findVisibleRange(
            scrollLeft / zoom,
            viewportWidth / zoom,
            this.config.maxCols,
            this.getColumnWidth
        );

        const newVisibleRows = this.findVisibleRange(
            scrollTop / zoom,
            viewportHeight / zoom,
            this.config.maxRows,
            this.getRowHeight
        );

        if (this.maybeExtendForViewport(newVisibleRows, newVisibleCols)) {
            return this.recalculateVisibleViewport(forceUpdate, depth + 1);
        }

        const colsChanged = newVisibleCols.start !== this.visibleCols.start ||
            newVisibleCols.end !== this.visibleCols.end;
        const rowsChanged = newVisibleRows.start !== this.visibleRows.start ||
            newVisibleRows.end !== this.visibleRows.end;

        if (colsChanged || rowsChanged || forceUpdate) {
            this.visibleCols = newVisibleCols;
            this.visibleRows = newVisibleRows;
            return true;
        }

        return false;
    }

    handleMouseDown(event) {
        if (this.currentEditingCell) {
            const editor = this.currentEditingCell.querySelector('.cell-editor');
            if (editor && editor.contains(event.target)) {
                // Clicking inside the active editor should not trigger grid selection
                return;
            }
        }
        if (event.target.classList.contains('cell-editor')) return;
        const cell = this.resolveCellFromEvent(event);
        if (!cell) return;

        this.blurFontSizeInputIfFocused(event);
        this.isFontSizeEditing = false;

        // Handle format painter - start selection mode
        if (this.formatPainter.active) {
            event.preventDefault();
            this.dragStartCell = cell;
            this.isDragging = true;
            this.isCtrlDragging = event.ctrlKey || event.metaKey;

            if (this.isCtrlDragging) {
                // Ctrl+click: add to selection without clearing
                this.ctrlDragAction = this.selectedCells.has(cell) ? 'deselect' : 'select';
                this.ctrlDragProcessedCells.clear();
                this.processCtrlDragCell(cell);
            } else if (event.shiftKey && this.primaryCell) {
                // Shift+click: range selection
                this.clearAllSelections();
                const rangeCells = this.getCellsInRect(this.primaryCell, cell);
                const expandedCells = this.expandSelectionForMergedCells(rangeCells);
                this.selectCells(expandedCells, true, this.primaryCell);
            } else {
                // Normal click: start new selection
                this.clearAllSelections();
                const expandedCells = this.expandSelectionForMergedCells([cell]);
                this.selectCells(expandedCells, true, cell);
            }
            return;
        }

        if (event.button === 2) return;

        this.dragStartCell = cell;
        this.isDragging = true;
        this.isCtrlDragging = event.ctrlKey || event.metaKey;

        event.preventDefault();

        if (this.currentEditingCell && this.currentEditingCell !== cell) {
            // User is moving to another cell; cancel any pending refocus from toolbar interactions
            this.pendingEditorRefocus = false;
            this.isToolbarFormattingInteraction = false;
            this.isPaletteInteraction = false;
            this.isPaletteFieldEditing = false;
            this.isFontSizeEditing = false;
            this.stopEditingCell();
        }

        if (this.isCtrlDragging) {
            this.ctrlDragAction = this.selectedCells.has(cell) ? 'deselect' : 'select';
            this.ctrlDragProcessedCells.clear();
            this.processCtrlDragCell(cell);
        } else if (event.shiftKey && this.primaryCell) {
            this.clearAllSelections();
            const rangeCells = this.getCellsInRect(this.primaryCell, cell);
            const expandedCells = this.expandSelectionForMergedCells(rangeCells);
            this.selectCells(expandedCells, true, this.primaryCell);
        } else {
            this.clearAllSelections();
            const expandedCells = this.expandSelectionForMergedCells([cell]);
            this.selectCells(expandedCells, true, cell);
        }
    }

    handleMouseMove(event) {
        if (!this.isDragging || !this.dragStartCell) return;

        this.handleEdgeScrolling(event);

        const cell = this.resolveCellFromEvent(event);
        if (!cell) return;

        // DEBUG
        const { row: cellRow, col: cellCol } = this.getCellPos(cell);
        const gridRect = this.mainGrid.getBoundingClientRect();
        const zoom = this.zoomLevel || 1;
        // Translate pointer to unscaled grid coordinates (scroll offsets are in CSS px, so divide by zoom)
        const x = (event.clientX - gridRect.left + this.mainGrid.scrollLeft) / zoom;
        const y = (event.clientY - gridRect.top + this.mainGrid.scrollTop) / zoom;
        const actualCol = this.getIndexAtCoordinate(x, this.getColumnWidth, this.config.maxCols);
        const actualRow = this.getIndexAtCoordinate(y, this.getRowHeight, this.config.maxRows);
        console.log(`Mouse over: resolved=${String.fromCharCode(65+cellCol)}${cellRow+1}, actual=${String.fromCharCode(65+actualCol)}${actualRow+1}`);

        const hideCommentIfMoved = (endCell) => {
            if (!endCell || !this.commentPopover || this.commentPopover.classList.contains('hidden')) return;
            const startCoord = this.dragStartCell ? this.getCoord(this.dragStartCell) : null;
            const endCoord = this.getCoord(endCell);
            if (startCoord && endCoord && startCoord !== endCoord) {
                this.hideCommentPopover();
            }
        };

        if (this.isCtrlDragging) {
            // Handle Ctrl+drag: add cells to selection as user drags
            let endCell = cell;
            if (actualCol !== -1 && actualRow !== -1) {
                const actualCell = this.getCellAt(actualRow, actualCol);
                if (actualCell) endCell = actualCell;
            }
            hideCommentIfMoved(endCell);
            const rangeCells = this.getCellsInRect(this.dragStartCell, endCell);
            rangeCells.forEach(c => {
                if (!this.ctrlDragProcessedCells.has(c)) {
                    this.processCtrlDragCell(c);
                }
            });
        } else if (!event.shiftKey && !event.ctrlKey && !event.metaKey) {
            // Normal drag: rectangle selection
            this.clearAllSelections();
            let endCell = cell;
            if (actualCol !== -1 && actualRow !== -1) {
                const actualCell = this.getCellAt(actualRow, actualCol);
                if (actualCell) endCell = actualCell;
            }
            hideCommentIfMoved(endCell);
            const rangeCells = this.getCellsInRect(this.dragStartCell, endCell);
            const expandedCells = this.expandSelectionForMergedCells(rangeCells);
            this.selectCells(expandedCells, true, this.dragStartCell);
        }
    }

    handleMouseUp(event) {
        // Stop edge scrolling
        this.stopEdgeScrolling();
        // Keep custom color picker open if the mouseup happens after dragging outside of it
        if (this.customColorPickerPointerDown) {
            this.customColorPickerPointerDown = false;
            this.customColorPickerReleaseGuard = true;
            if (this.customColorPickerReleaseGuardTimer) {
                clearTimeout(this.customColorPickerReleaseGuardTimer);
            }
            this.customColorPickerReleaseGuardTimer = setTimeout(() => {
                this.customColorPickerReleaseGuard = false;
                this.customColorPickerReleaseGuardTimer = null;
            }, 0);
        }
        
        if (this.isResizing) {
            this.isResizing = false;
            this.resizeType = null;
            this.resizeIndex = null;
            this.resizeStartPos = null;
            this.resizeStartSize = null;
            document.body.style.cursor = '';
            
            // Cancel any pending animation frame
            if (this.resizeAnimationFrame) {
                cancelAnimationFrame(this.resizeAnimationFrame);
                this.resizeAnimationFrame = null;
            }
            
            // Remove resize indicators
            this.removeResizeIndicator();
            
            // Set flag to prevent click event from firing
            this.justResized = true;
            setTimeout(() => {
                this.justResized = false;
            }, 10);
            
            // IMPORTANT: Mark that user made changes and update dirty state after resize
            this.userMadeChanges = true;
            this.scheduleDirtyStateUpdate();
            
            this.refreshAllVisibleCells();
            
            return;
        }
        
        // Handle format painter application on mouse up
        if (this.formatPainter.active && this.isDragging) {
            const wasCtrlDrag = this.isCtrlDragging;

            // Extend only for normal drags; ctrl/meta drags should stay sparse
            if (!wasCtrlDrag) {
                this.extendSelectionForFormatPainter();
            }

            const shouldWaitForCtrlRelease = event.ctrlKey || event.metaKey;

            this.isDragging = false;
            this.dragStartCell = null;
            this.isCtrlDragging = false;
            this.ctrlDragAction = null;
            this.ctrlDragProcessedCells.clear();

            if (shouldWaitForCtrlRelease) {
                this.formatPainter.awaitingCtrlRelease = true;
                return;
            }

            this.applyPaintedFormatToSelection();
            return;
        }

        this.isDragging = false;
        this.dragStartCell = null;
        this.isCtrlDragging = false;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells.clear();

        const clickInsideComment = event && this.commentPopover && event.target instanceof Node
            ? this.commentPopover.contains(event.target)
            : false;

        // Update UI elements after any selection change (but avoid stealing focus from the comment popover)
        if (this.selectedCells.size > 0 && !clickInsideComment) {
            this.updateUI();
        }
    }

    extendSelectionForFormatPainter() {
        if (!this.formatPainter.active || !this.formatPainter.patternWidth || !this.formatPainter.patternHeight) {
            return;
        }
        
        const bounds = this.getSelectionBounds();
        if (!bounds) return;
        const { minRow, maxRow, minCol, maxCol } = bounds;
        
        const currentWidth = maxCol - minCol + 1;
        const currentHeight = maxRow - minRow + 1;
        
        // Calculate how many complete pattern tiles we need
        const tilesWide = Math.max(1, Math.ceil(currentWidth / this.formatPainter.patternWidth));
        const tilesHigh = Math.max(1, Math.ceil(currentHeight / this.formatPainter.patternHeight));
        
        // Calculate the extended dimensions (complete pattern tiles)
        const extendedWidth = tilesWide * this.formatPainter.patternWidth;
        const extendedHeight = tilesHigh * this.formatPainter.patternHeight;
        
        // Only rebuild selection if dimensions changed
        if (extendedWidth !== currentWidth || extendedHeight !== currentHeight) {
            const newMaxCol = Math.min(this.config.maxCols - 1, minCol + extendedWidth - 1);
            const newMaxRow = Math.min(this.config.maxRows - 1, minRow + extendedHeight - 1);
            
            // Clear and rebuild selection with extended range
            this.clearSelectionVisuals();
            
            // Add all cells in the extended range (contiguous rectangle)
            for (let row = minRow; row <= newMaxRow; row++) {
                for (let col = minCol; col <= newMaxCol; col++) {
                    const coordKey = `${row},${col}`;
                    this.selectedCellCoords.add(coordKey);
                    
                    const cell = this.getCellAt(row, col);
                    if (cell) {
                        cell.classList.add('selected');
                        this.selectedCells.add(cell);
                        
                        if (row === minRow && col === minCol) {
                            cell.classList.add('primary-selected');
                            this.primaryCell = cell;
                            this.primaryCellCoord = coordKey;
                        }
                    }
                }
            }
            
            this.log(`Extended selection to ${extendedWidth}x${extendedHeight} (${tilesWide}x${tilesHigh} tiles) to match pattern dimensions`);
        }
    }

    handleDoubleClick(event) {
        const cell = this.resolveCellFromEvent(event);
        if (!cell || event.target.classList.contains('cell-editor')) return;
        event.preventDefault();
        this.startEditingCell(cell, event);
    }

    handleCellSelection(cell, event) {
        const shiftKey = event.shiftKey;
        const ctrlKey = event.ctrlKey || event.metaKey;

        if (shiftKey && this.primaryCell) {
            if (!ctrlKey) {
                this.clearAllSelections();
            }
            const rangeCells = this.getCellsInRect(this.primaryCell, cell);
            this.selectCells(rangeCells, !ctrlKey);
            this.log(`Shift-selected ${rangeCells.length} cells`);
        } else if (ctrlKey) {
            return;
        } else {
            this.clearAllSelections();
            this.selectCells([cell], true);
            this.log(`Selected cell ${cell.dataset.address}`);
        }
    }

    processCtrlDragCell(cell) {
        const coordKey = this.getCoord(cell);
        
        if (this.ctrlDragAction === 'select') {
            this.selectedCells.add(cell);
            this.selectedCellCoords.add(coordKey);
            cell.classList.add('selected');
            if (!this.primaryCell) {
                this.primaryCell = cell;
                this.primaryCellCoord = coordKey;
                cell.classList.add('primary-selected');
            }
        } else {
            this.selectedCells.delete(cell);
            this.selectedCellCoords.delete(coordKey);
            cell.classList.remove('selected', 'primary-selected');
            if (cell === this.primaryCell) {
                this.primaryCell = null;
                this.primaryCellCoord = null;
            }
        }
        this.ctrlDragProcessedCells.add(cell);
        this.updateUI();
    }

    getCellsInRect(startCell, endCell) {
        const { row: startRow, col: startCol } = this.getCellPos(startCell);
        const { row: endRow, col: endCol } = this.getCellPos(endCell);

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const cells = [];
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                const cell = this.getCellAt(r, c);
                if (cell) cells.push(cell);
            }
        }
        return cells;
    }

    getCellAt(row, col) {
        return this.gridContent.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    resolveCellFromEvent(event) {
        const directCell = event.target.closest('.cell');
        if (!directCell) {
            return null;
        }

        const { clientX, clientY } = event;
        const rect = directCell.getBoundingClientRect();
        const insideDirectBounds = clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom;

        if (insideDirectBounds) {
            // Check if this is a merged child cell that's hidden
            if (directCell.classList.contains('merged-child')) {
                // Get the parent cell
                const { row, col } = this.getCellPos(directCell);
                const parent = this.getMergeParent(row, col);
                if (parent) {
                    return this.getCellAt(parent.row, parent.col) || directCell;
                }
            }
            return directCell;
        }

        const mappedCell = this.getCellFromClientPoint(clientX, clientY);
        if (mappedCell) {
            // Check if mapped cell is a merged child
            if (mappedCell.classList.contains('merged-child')) {
                const { row, col } = this.getCellPos(mappedCell);
                const parent = this.getMergeParent(row, col);
                if (parent) {
                    return this.getCellAt(parent.row, parent.col) || mappedCell;
                }
            }
        }
        return mappedCell || directCell;
    }

    getCellFromClientPoint(clientX, clientY) {
        const gridRect = this.mainGrid.getBoundingClientRect();
        const zoom = this.zoomLevel || 1;
        // Convert viewport coordinates to unscaled grid space
        const x = (clientX - gridRect.left + this.mainGrid.scrollLeft) / zoom;
        const y = (clientY - gridRect.top + this.mainGrid.scrollTop) / zoom;

        if (x < 0 || y < 0) {
            return null;
        }

        const col = this.getIndexAtCoordinate(x, this.getColumnWidth, this.config.maxCols);
        const row = this.getIndexAtCoordinate(y, this.getRowHeight, this.config.maxRows);

        if (row === -1 || col === -1) {
            return null;
        }

        return this.getCellAt(row, col);
    }

    getIndexAtCoordinate(coord, sizeFn, limit) {
        if (coord < 0) {
            return -1;
        }

        let position = 0;
        for (let index = 0; index < limit; index++) {
            const size = sizeFn.call(this, index);
            if (coord < position + size) {
                return index;
            }
            position += size;
        }

        return -1;
    }

    insertRowsAtSelection() {
        const { index, count } = this.getSelectionExtent('row');
        this.applyInsertion('row', index, count);
    }

    insertColumnsAtSelection() {
        const { index, count } = this.getSelectionExtent('col');
        this.applyInsertion('col', index, count);
    }

    deleteRowsAtSelection() {
        const { index, count } = this.getSelectionExtent('row');
        this.applyDeletion('row', index, count);
    }

    deleteColumnsAtSelection() {
        const { index, count } = this.getSelectionExtent('col');
        this.applyDeletion('col', index, count);
    }

    getSelectionExtent(axis) {
        const isRow = axis === 'row';
        const limit = isRow ? this.config.maxRows : this.config.maxCols;
        const bounds = this.getSelectionBounds();

        let index;
        let count;

        if (bounds) {
            index = isRow ? bounds.minRow : bounds.minCol;
            count = (isRow ? bounds.maxRow - bounds.minRow : bounds.maxCol - bounds.minCol) + 1;
        } else if (this.primaryCellCoord) {
            const pos = this.getCoordPos(this.primaryCellCoord);
            index = isRow ? pos.row : pos.col;
            count = 1;
        } else {
            index = 0;
            count = 1;
        }

        index = Math.max(0, Math.min(index, limit - 1));
        count = Math.max(1, Math.min(count, limit - index));

        return { index, count };
    }

    applyInsertion(axis, startIndex, count) {
        if (!Number.isInteger(startIndex) || !Number.isInteger(count) || count <= 0) return;

        const isRow = axis === 'row';
        const limit = isRow ? this.config.maxRows : this.config.maxCols;
        const available = limit - startIndex;
        if (available <= 0) return;

        const effectiveCount = Math.min(count, available);
        if (effectiveCount <= 0) return;

        if (this.currentEditingCell) this.stopEditingCell(true);

        const referenceLabel = isRow ? `row ${startIndex + 1}` : `column ${this.getColumnName(startIndex)}`;
        const plural = effectiveCount > 1 ? 's' : '';
        this.saveState(`Insert ${isRow ? 'row' : 'column'}${plural} at ${referenceLabel}`);

        this.shiftCellDataForInsertion(axis, startIndex, effectiveCount);

            if (isRow) {
                this.rowHeights = this.shiftIndexedMap(this.rowHeights, startIndex, effectiveCount, limit);
                this.autoRowHeights = this.shiftIndexedMap(this.autoRowHeights, startIndex, effectiveCount, limit);
                this.rowHeightModes = this.shiftIndexedMap(this.rowHeightModes, startIndex, effectiveCount, limit);
                this.rowDefaultHeightOverrides = this.shiftIndexedMap(this.rowDefaultHeightOverrides, startIndex, effectiveCount, limit);
                this.rowStyles = this.shiftIndexedMap(this.rowStyles, startIndex, effectiveCount, limit);
            } else {
                this.columnWidths = this.shiftIndexedMap(this.columnWidths, startIndex, effectiveCount, limit);
                this.columnStyles = this.shiftIndexedMap(this.columnStyles, startIndex, effectiveCount, limit);
            }
            this.shiftCellStyleMetaForInsertion(axis, startIndex, effectiveCount);

        if (this.clipboard?.sourceCells instanceof Set) {
            this.shiftCoordSetForStructureChange(this.clipboard.sourceCells, axis, startIndex, effectiveCount, 'insert');
        }

        const currentPos = this.primaryCellCoord ? this.getCoordPos(this.primaryCellCoord) : { row: 0, col: 0 };
        const targetRow = isRow ? startIndex : currentPos.row;
        const targetCol = isRow ? currentPos.col : startIndex;

        this.setSelectionToSingleCell(targetRow, targetCol);

        const minRow = isRow ? startIndex + effectiveCount - 1 : null;
        const minCol = isRow ? null : startIndex + effectiveCount - 1;
        this.recalculatePersistedRange(minRow, minCol);

        this.refreshStructureAfterMutation();
        this.updateUI();

        this.log(`Inserted ${effectiveCount} ${isRow ? 'row' : 'column'}${plural} at ${referenceLabel}`);
    }

    applyDeletion(axis, startIndex, count) {
        if (!Number.isInteger(startIndex) || !Number.isInteger(count) || count <= 0) return;

        const isRow = axis === 'row';
        const limit = isRow ? this.config.maxRows : this.config.maxCols;
        if (startIndex >= limit) return;

        const effectiveCount = Math.min(count, limit - startIndex);
        if (effectiveCount <= 0) return;

        if (this.currentEditingCell) this.stopEditingCell(true);

        const referenceLabel = isRow ? `row ${startIndex + 1}` : `column ${this.getColumnName(startIndex)}`;
        const plural = effectiveCount > 1 ? 's' : '';
        this.saveState(`Delete ${isRow ? 'row' : 'column'}${plural} at ${referenceLabel}`);

        const mergeParentDataSnapshot = this.snapshotMergeParentData();
        const mergeAdjustment = this.adjustMergedCellsForDeletion(axis, startIndex, effectiveCount);

        this.shiftCellDataForDeletion(axis, startIndex, effectiveCount);

            if (isRow) {
                this.rowHeights = this.shiftIndexedMap(this.rowHeights, startIndex, -effectiveCount, limit, effectiveCount);
                this.autoRowHeights = this.shiftIndexedMap(this.autoRowHeights, startIndex, -effectiveCount, limit, effectiveCount);
                this.rowHeightModes = this.shiftIndexedMap(this.rowHeightModes, startIndex, -effectiveCount, limit, effectiveCount);
                this.rowDefaultHeightOverrides = this.shiftIndexedMap(this.rowDefaultHeightOverrides, startIndex, -effectiveCount, limit, effectiveCount);
                this.rowStyles = this.shiftIndexedMap(this.rowStyles, startIndex, -effectiveCount, limit, effectiveCount);
            } else {
                this.columnWidths = this.shiftIndexedMap(this.columnWidths, startIndex, -effectiveCount, limit, effectiveCount);
                this.columnStyles = this.shiftIndexedMap(this.columnStyles, startIndex, -effectiveCount, limit, effectiveCount);
            }
            this.shiftCellStyleMetaForDeletion(axis, startIndex, effectiveCount);

        if (mergeAdjustment) {
            this.applyMergedCellAdjustment(mergeAdjustment, mergeParentDataSnapshot);
        }

        if (this.clipboard?.sourceCells instanceof Set) {
            this.shiftCoordSetForStructureChange(this.clipboard.sourceCells, axis, startIndex, effectiveCount, 'delete');
        }

        const currentPos = this.primaryCellCoord ? this.getCoordPos(this.primaryCellCoord) : { row: 0, col: 0 };
        const maxRow = this.config.maxRows - 1;
        const maxCol = this.config.maxCols - 1;
        const targetRow = Math.max(0, Math.min(isRow ? startIndex : currentPos.row, maxRow));
        const targetCol = Math.max(0, Math.min(isRow ? currentPos.col : startIndex, maxCol));

        this.setSelectionToSingleCell(targetRow, targetCol);

        this.recalculatePersistedRange();

        this.refreshStructureAfterMutation();
        this.updateUI();

        this.log(`Deleted ${effectiveCount} ${isRow ? 'row' : 'column'}${plural} starting at ${referenceLabel}`);
    }

    shiftCellDataForInsertion(axis, startIndex, count) {
        const limitRow = this.config.maxRows;
        const limitCol = this.config.maxCols;
        const isRow = axis === 'row';
        const updated = new Map();

        this.cellData.forEach((value, key) => {
            const { row, col } = this.getCoordPos(key);
            const newRow = isRow && row >= startIndex ? row + count : row;
            const newCol = !isRow && col >= startIndex ? col + count : col;

            if (newRow < limitRow && newCol < limitCol) {
                updated.set(`${newRow},${newCol}`, value);
            }
        });

        this.cellData = updated;
    }

    shiftCellStyleMetaForInsertion(axis, startIndex, count) {
        if (!(this.cellStyleMeta instanceof Map)) return;
        const isRow = axis === 'row';
        const limitRow = this.config.maxRows;
        const limitCol = this.config.maxCols;
        const updated = new Map();
        this.cellStyleMeta.forEach((value, key) => {
            const { row, col } = this.getCoordPos(key);
            const newRow = isRow && row >= startIndex ? row + count : row;
            const newCol = !isRow && col >= startIndex ? col + count : col;
            if (newRow < limitRow && newCol < limitCol) {
                updated.set(`${newRow},${newCol}`, value);
            }
        });
        this.cellStyleMeta = updated;
    }

    shiftCellDataForDeletion(axis, startIndex, count) {
        const isRow = axis === 'row';
        const removalEnd = startIndex + count - 1;
        const updated = new Map();

        this.cellData.forEach((value, key) => {
            const { row, col } = this.getCoordPos(key);

            if (isRow) {
                if (row < startIndex) {
                    updated.set(key, value);
                } else if (row > removalEnd) {
                    updated.set(`${row - count},${col}`, value);
                }
            } else {
                if (col < startIndex) {
                    updated.set(key, value);
                } else if (col > removalEnd) {
                    updated.set(`${row},${col - count}`, value);
                }
            }
        });

        this.cellData = updated;
    }

    shiftCellStyleMetaForDeletion(axis, startIndex, count) {
        if (!(this.cellStyleMeta instanceof Map)) return;
        const isRow = axis === 'row';
        const removalEnd = startIndex + count - 1;
        const updated = new Map();
        this.cellStyleMeta.forEach((value, key) => {
            const { row, col } = this.getCoordPos(key);
            if (isRow) {
                if (row < startIndex) {
                    updated.set(key, value);
                } else if (row > removalEnd) {
                    updated.set(`${row - count},${col}`, value);
                }
            } else {
                if (col < startIndex) {
                    updated.set(key, value);
                } else if (col > removalEnd) {
                    updated.set(`${row},${col - count}`, value);
                }
            }
        });
        this.cellStyleMeta = updated;
    }

    snapshotMergeParentData() {
        const snapshot = new Map();
        if (!(this.mergedCells instanceof Map) || this.mergedCells.size === 0) {
            return snapshot;
        }
        this.mergedCells.forEach((_, coordKey) => {
            if (this.cellData.has(coordKey)) {
                snapshot.set(coordKey, this.cloneCellRecord(this.cellData.get(coordKey)));
            }
        });
        return snapshot;
    }

    adjustMergedCellsForDeletion(axis, startIndex, count) {
        if (!(this.mergedCells instanceof Map) || this.mergedCells.size === 0) {
            return null;
        }

        const isRow = axis === 'row';
        const removalEnd = startIndex + count - 1;
        const newMergedCells = new Map();
        const newCellToMergeParent = new Map();
        const mappings = [];
        const debug = [];
        const originalSummary = this.describeMergedCells();
        this.log(`[merge-adjust] start axis=${axis} index=${startIndex} count=${count} from=${originalSummary.join(' | ') || 'none'}`);

        const transformIndex = (idx) => {
            if (idx < startIndex) return idx;
            if (idx > removalEnd) return idx - count;
            return null;
        };

        this.mergedCells.forEach((info, coordKey) => {
            const [row, col] = this.parseCoord(coordKey);
            const totalRows = Number(info?.rows) || 1;
            const totalCols = Number(info?.cols) || 1;
            if (!Number.isInteger(row) || !Number.isInteger(col)) return;

            const survivingCells = [];
            for (let r = 0; r < totalRows; r++) {
                for (let c = 0; c < totalCols; c++) {
                    const rawRow = row + r;
                    const rawCol = col + c;
                    const newRow = isRow ? transformIndex(rawRow) : rawRow;
                    const newCol = !isRow ? transformIndex(rawCol) : rawCol;
                    if (newRow === null || newCol === null) continue;
                    survivingCells.push({ row: newRow, col: newCol });
                }
            }

            if (!survivingCells.length) {
                debug.push({
                    type: 'removed',
                    from: coordKey
                });
                return; // Merge removed entirely
            }

            let minRow = Infinity;
            let maxRow = -Infinity;
            let minCol = Infinity;
            let maxCol = -Infinity;
            survivingCells.forEach(({ row: sRow, col: sCol }) => {
                if (sRow < minRow) minRow = sRow;
                if (sRow > maxRow) maxRow = sRow;
                if (sCol < minCol) minCol = sCol;
                if (sCol > maxCol) maxCol = sCol;
            });

            const rows = (maxRow - minRow) + 1;
            const cols = (maxCol - minCol) + 1;

            const changed = survivingCells.length !== (totalRows * totalCols) ||
                minRow !== row || minCol !== col || rows !== info.rows || cols !== info.cols;

            // A 1x1 result no longer represents a merge; drop the merge but keep data mapping info.
            if (rows === 1 && cols === 1) {
                mappings.push({
                    from: coordKey,
                    to: `${minRow},${minCol}`,
                    parentRemoved: isRow ? (row >= startIndex && row <= removalEnd) : (col >= startIndex && col <= removalEnd)
                });
                if (changed) {
                    debug.push({
                        type: 'collapsed',
                        from: coordKey,
                        to: `${minRow},${minCol}`,
                        cells: survivingCells.map(({ row: sr, col: sc }) => this.getCellAddress(sr, sc))
                    });
                }
                return;
            }

            const parentCoord = `${minRow},${minCol}`;
            const childCells = new Set();

            for (let r = minRow; r <= maxRow; r++) {
                for (let c = minCol; c <= maxCol; c++) {
                    const childCoord = `${r},${c}`;
                    if (r === minRow && c === minCol) continue;
                    childCells.add(childCoord);
                    newCellToMergeParent.set(childCoord, parentCoord);
                }
            }

            newMergedCells.set(parentCoord, { rows, cols, childCells });
            mappings.push({
                from: coordKey,
                to: parentCoord,
                parentRemoved: isRow ? (row >= startIndex && row <= removalEnd) : (col >= startIndex && col <= removalEnd)
            });
            if (changed) {
                debug.push({
                    type: 'adjusted',
                    from: coordKey,
                    to: parentCoord,
                    rows,
                    cols,
                    cells: survivingCells.map(({ row: sr, col: sc }) => this.getCellAddress(sr, sc))
                });
            }
        });

        return {
            mergedCells: newMergedCells,
            cellToMergeParent: newCellToMergeParent,
            mappings,
            debug
        };
    }

    applyMergedCellAdjustment(adjustment, mergeParentDataSnapshot = new Map()) {
        if (!adjustment) return;
        const { mergedCells, mappings, debug } = adjustment;
        const snapshot = mergedCells instanceof Map ? this.cloneMergedCellsState(mergedCells) : [];
        this.applyMergedCellsSnapshot(snapshot);

        if (Array.isArray(mappings) && mappings.length && mergeParentDataSnapshot instanceof Map) {
            mappings.forEach(({ from, to, parentRemoved }) => {
                if (!to || !mergeParentDataSnapshot.has(from)) return;
                const existing = this.cellData.get(to);
                if (!existing && parentRemoved) {
                    this.cellData.set(to, this.cloneCellRecord(mergeParentDataSnapshot.get(from)));
                }
            });
        }

        if (Array.isArray(debug) && debug.length) {
            debug.forEach(entry => {
                const from = this.coordToAddress(entry.from || '');
                const to = entry.to ? this.coordToAddress(entry.to) : '';
                const cells = Array.isArray(entry.cells) && entry.cells.length ? ` cells=[${entry.cells.join(', ')}]` : '';
                const size = entry.rows && entry.cols ? ` ${entry.rows}x${entry.cols}` : '';
                if (entry.type === 'removed') {
                    this.log(`[merge-adjust] removed merge at ${from}`);
                } else if (entry.type === 'collapsed') {
                    this.log(`[merge-adjust] collapsed ${from} -> ${to}${cells}`);
                } else if (entry.type === 'adjusted') {
                    this.log(`[merge-adjust] adjusted ${from} -> ${to}${size}${cells}`);
                }
            });
        }

        const summaries = this.describeMergedCells();
        this.log(`[merge-state] now ${summaries.length ? summaries.join(' | ') : 'no merged cells'}`);
    }

    shiftIndexedMap(map, startIndex, delta, limit, removeCount = 0) {
        if (!(map instanceof Map)) return map;

        const result = new Map();
        const removalEnd = removeCount > 0 ? startIndex + removeCount - 1 : startIndex - 1;

        map.forEach((value, key) => {
            const numericKey = Number(key);
            if (!Number.isFinite(numericKey)) return;

            if (removeCount > 0 && numericKey >= startIndex && numericKey <= removalEnd) {
                return;
            }

            let newIndex = numericKey;
            if (numericKey >= startIndex) {
                newIndex = numericKey + delta;
            }

            if (newIndex >= 0 && newIndex < limit) {
                result.set(newIndex, value);
            }
        });

        return result;
    }

    setSelectionToSingleCell(row, col) {
        const clampedRow = Math.max(0, Math.min(row, this.config.maxRows - 1));
        const clampedCol = Math.max(0, Math.min(col, this.config.maxCols - 1));

        this.clearSelectionVisuals();

        const coord = `${clampedRow},${clampedCol}`;
        this.selectedCellCoords.add(coord);
        this.primaryCellCoord = coord;
        this.primaryCell = null;
    }

    recalculatePersistedRange(minRow = null, minCol = null) {
        const baselineRow = this.initialPersistedRange?.maxRow ?? 0;
        const baselineCol = this.initialPersistedRange?.maxCol ?? 0;

        let maxRow = baselineRow;
        let maxCol = baselineCol;

        this.cellData.forEach((_, key) => {
            const { row, col } = this.getCoordPos(key);
            if (row > maxRow) maxRow = row;
            if (col > maxCol) maxCol = col;
        });

        if (typeof minRow === 'number') {
            maxRow = Math.max(maxRow, minRow);
        }
        if (typeof minCol === 'number') {
            maxCol = Math.max(maxCol, minCol);
        }

        this.persistedRange.maxRow = Math.min(this.config.maxRows - 1, Math.max(0, maxRow));
        this.persistedRange.maxCol = Math.min(this.config.maxCols - 1, Math.max(0, maxCol));
    }

    refreshStructureAfterMutation() {
        this.primaryCell = null;
        this.dragStartCell = null;
        this.isDragging = false;
        this.isCtrlDragging = false;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells.clear();

        this.gridContent.innerHTML = '';
        this.selectedCells = new Set();
        this.renderedCellCoords.clear();

        this.updateGridSize();
        this.generateHeaders();
        this.updateVisibleCells();
        this.recalculateAutoRowHeights();
        this.refreshLayoutAfterRowHeightChange();
    }

    shiftCoordSetForStructureChange(coordSet, axis, startIndex, count, type) {
        if (!(coordSet instanceof Set) || coordSet.size === 0) return;

        const isRow = axis === 'row';
        const removalEnd = startIndex + count - 1;
        const updated = new Set();

        coordSet.forEach(coord => {
            const { row, col } = this.getCoordPos(coord);

            if (type === 'insert') {
                const newRow = isRow && row >= startIndex ? row + count : row;
                const newCol = !isRow && col >= startIndex ? col + count : col;
                if (newRow < this.config.maxRows && newCol < this.config.maxCols) {
                    updated.add(`${newRow},${newCol}`);
                }
            } else if (type === 'delete') {
                if ((isRow && row >= startIndex && row <= removalEnd) ||
                    (!isRow && col >= startIndex && col <= removalEnd)) {
                    return;
                }

                if (isRow) {
                    const newRow = row > removalEnd ? row - count : row;
                    if (newRow >= 0) updated.add(`${newRow},${col}`);
                } else {
                    const newCol = col > removalEnd ? col - count : col;
                    if (newCol >= 0) updated.add(`${row},${newCol}`);
                }
            }
        });

        coordSet.clear();
        updated.forEach(coord => coordSet.add(coord));
    }

    selectCells(cells, isPrimary = false, primaryCell = null) {
        if (!cells || !cells.length) return;
        this.fullSheetSelection = false;
        const previousPrimary = this.primaryCellCoord;
        
        cells.forEach((cell, index) => {
            const coordKey = this.getCoord(cell);
            
            this.selectedCells.add(cell);
            this.selectedCellCoords.add(coordKey);
            cell.classList.add('selected');
            
            // Also add coordinates for merged cells
            const { row, col } = this.getCellPos(cell);
            const mergeInfo = this.mergedCells.get(coordKey);
            if (mergeInfo) {
                // Add all child cell coordinates to selection
                for (let r = 0; r < mergeInfo.rows; r++) {
                    for (let c = 0; c < mergeInfo.cols; c++) {
                        const childCoord = `${row + r},${col + c}`;
                        this.selectedCellCoords.add(childCoord);
                    }
                }
            }
            
            // Determine which cell should be marked as primary
            let shouldMarkPrimary = false;
            if (isPrimary) {
                if (primaryCell) {
                    // If explicit primaryCell is provided, use that
                    shouldMarkPrimary = (cell === primaryCell);
                } else {
                    // Otherwise mark the first cell as primary
                    shouldMarkPrimary = (index === 0);
                }
            }
            
            if (shouldMarkPrimary) {
                if (this.primaryCell) {
                    this.primaryCell.classList.remove('primary-selected');
                }
                this.primaryCell = cell;
                this.primaryCellCoord = coordKey;
                cell.classList.add('primary-selected');
            }
        });
        if (previousPrimary && previousPrimary !== this.primaryCellCoord) {
            this.activeCommentEditTarget = null;
            this.hideCommentPopover();
        }
        this.updateUI();
    }
    
    clearAllSelections() {
        this.clearSelectionVisuals();
        // Only clear cut/copy styling if we're doing a new cut or copy
        // NOT when just clearing selections
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.fullSheetSelection = false;
        this.hideCommentPopover();
        this.updateUI();
        this.hideFormulaSuggestions();
        this.log('Cleared all selections');
    }

    // Draw unified overlays per contiguous selection to align exactly on grid lines
    renderSelectionOverlays() {
        if (!this.gridContent) return;

        if (!this.selectionOverlayLayer) {
            this.selectionOverlayLayer = document.createElement('div');
            this.selectionOverlayLayer.className = 'selection-overlay-layer';
        }

        // Clear previous overlays
        this.selectionOverlayLayer.innerHTML = '';

        const hasClipboardOverlay = !!(this.clipboard && this.clipboard.overlayRegions && this.clipboard.overlayRegions.length);
        const hasFormatOverlay = !!(this.formatPainter && this.formatPainter.overlayRegions && this.formatPainter.overlayRegions.length);
        const mergedPassThroughRegions = this.getMergedSelectionPassThroughRegions();

        if (!this.hasSelection() && !hasClipboardOverlay && !hasFormatOverlay && !mergedPassThroughRegions.length) {
            if (this.selectionOverlayLayer.parentNode) {
                this.selectionOverlayLayer.remove();
            }
            return;
        }

        const addOverlays = (regions, className) => {
            regions.forEach(({ minRow, maxRow, minCol, maxCol }) => {
                const overlay = document.createElement('div');
                overlay.className = `selection-overlay ${className || ''}`.trim();

                // Expand by 1px on top/left so the stroke sits exactly on the grid lines
                const left = this.getColumnLeft(minCol) - 1;
                const top = this.getRowTop(minRow) - 1;
                const right = this.getColumnLeft(maxCol + 1);
                const bottom = this.getRowTop(maxRow + 1);

                overlay.style.left = `${left}px`;
                overlay.style.top = `${top}px`;
                overlay.style.width = `${right - left}px`;
                overlay.style.height = `${bottom - top}px`;

                this.selectionOverlayLayer.appendChild(overlay);
            });
        };

        mergedPassThroughRegions.forEach(({ row, col, rows, cols }) => {
            const overlay = document.createElement('div');
            overlay.className = 'selection-overlay selection-overlay--merged-pass';

            const left = this.getColumnLeft(col);
            const top = this.getRowTop(row);
            const right = this.getColumnLeft(col + cols);
            const bottom = this.getRowTop(row + rows);

            overlay.style.left = `${left}px`;
            overlay.style.top = `${top}px`;
            overlay.style.width = `${right - left}px`;
            overlay.style.height = `${bottom - top}px`;

            this.selectionOverlayLayer.appendChild(overlay);
        });

        addOverlays(this.findContiguousRegions(), 'selection-overlay--active');

        if (hasClipboardOverlay) {
            const clipboardMode = this.clipboard.visualMode || this.clipboard.mode;
            const cls = clipboardMode === 'cut'
                ? 'selection-overlay--clipboard selection-overlay--clipboard-cut'
                : 'selection-overlay--clipboard';
            addOverlays(this.clipboard.overlayRegions, cls);
        }

        if (hasFormatOverlay) {
            addOverlays(this.formatPainter.overlayRegions, 'selection-overlay--format');
        }

        // Ensure overlay sits on top
        this.gridContent.appendChild(this.selectionOverlayLayer);
    }

    updateCellReference() {
        if (!this.hasSelection()) {
            this.cellReference.value = '';
            return;
        }
        
        if (this.selectedCellCoords.size === 1) {
            if (this.primaryCell) {
                const { row, col } = this.getCellPos(this.primaryCell);
                const coordKey = `${row},${col}`;
                const mergeInfo = this.mergedCells.get(coordKey);
                
                if (mergeInfo) {
                    // Show merged cell range
                    const startAddr = this.getCellAddress(row, col);
                    const endAddr = this.getCellAddress(row + mergeInfo.rows - 1, col + mergeInfo.cols - 1);
                    this.cellReference.value = `${startAddr}:${endAddr}`;
                } else {
                    this.cellReference.value = this.primaryCell.dataset.address;
                }
            }
            return;
        }
        
        const bounds = this.getSelectionBounds();
        if (!bounds) return;
        const { coords, minRow, maxRow, minCol, maxCol } = bounds;
        
        coords.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
        
        const expectedSize = (maxRow - minRow + 1) * (maxCol - minCol + 1);
        
        if (coords.length === expectedSize) {
            // Check if it's a full row selection
            if (minCol === 0 && maxCol === this.config.maxCols - 1) {
                if (minRow === maxRow) {
                    this.cellReference.value = `Row ${minRow + 1}`;
                } else {
                    this.cellReference.value = `Rows ${minRow + 1}:${maxRow + 1}`;
                }
                return;
            }
            
            // Check if it's a full column selection
            if (minRow === 0 && maxRow === this.config.maxRows - 1) {
                if (minCol === maxCol) {
                    this.cellReference.value = `Column ${this.getColumnName(minCol)}`;
                } else {
                    this.cellReference.value = `Columns ${this.getColumnName(minCol)}:${this.getColumnName(maxCol)}`;
                }
                return;
            }
            
            // Regular rectangle selection
            const startCell = this.getCellAddress(minRow, minCol);
            const endCell = this.getCellAddress(maxRow, maxCol);
            this.cellReference.value = startCell === endCell ? startCell : `${startCell}:${endCell}`;
        } else {
            this.cellReference.value = `${this.selectedCellCoords.size} cells selected`;
        }
    }

    updateFormulaBar() {
        if (this.primaryCell) {
            const cellKey = this.getCoord(this.primaryCell);
            const cellData = this.cellData.get(cellKey);
            this.formulaInput.value = cellData ? (cellData.value || '') : '';
        } else {
            this.formulaInput.value = '';
        }
        if (document.activeElement === this.formulaInput) {
            this.updateFormulaSuggestions();
        } else {
            this.hideFormulaSuggestions();
        }
    }

    startEditingCell(cell, event = null) {
        if (this.currentEditingCell === cell) return;
        if (this.currentEditingCell) {
            this.stopEditingCell();
        }

        this.lastInlineFontSize = null;
        this.currentEditingCell = cell;
        const cellKey = this.getCoord(cell);
        const cellData = this.cellData.get(cellKey);
        const { row, col } = this.getCellPos(cell);
        const currentText = cellData ? (cellData.value || '') : '';
        const effectiveStyle = this.getEffectiveStyle(row, col, cellData);
        const textAlign = effectiveStyle.textAlign || 'left';
        const verticalAlign = effectiveStyle.verticalAlign || 'bottom';
        
        // Strip cell-level formatting classes while editing; we'll apply inline equivalents instead
        const formattingClasses = ['bold', 'italic', 'underline', 'strikethrough'];
        formattingClasses.forEach(cls => cell.classList.remove(cls));
        
        cell.dataset.originalValue = currentText;
        cell.classList.add('editing');
        
        // Reset overflow styles for editing
        cell.style.pointerEvents = 'auto';

        const editorWrapper = document.createElement('div');
        editorWrapper.className = 'cell-editor-wrapper';
        const alignItemsMap = { 'top': 'flex-start', 'middle': 'center', 'bottom': 'flex-end' };
        const justifyContentMap = { 'left': 'flex-start', 'center': 'center', 'right': 'flex-end' };
        editorWrapper.style.alignItems = alignItemsMap[verticalAlign] || 'flex-end';
        editorWrapper.style.justifyContent = justifyContentMap[textAlign] || 'flex-start';
        
        const input = document.createElement('div');
        input.contentEditable = 'true';
        input.className = 'cell-editor';
        input.dataset.isFormula = currentText.startsWith('=') ? 'true' : 'false';
        const hasInlineFormatting = cellData && (cellData.richText || cellData.bold || cellData.italic || cellData.underline || cellData.strikethrough);
        if (cellData && cellData.richText) {
            input.innerHTML = cellData.richText;
        } else if (hasInlineFormatting) {
            input.innerHTML = this.buildInlineHTMLFromPlain(currentText, cellData);
        } else {
            input.textContent = currentText;
        }
        input.style.textAlign = textAlign;

        // Copy computed formatting so the editor sits exactly where the text was
        const computed = window.getComputedStyle(cell);
        const resolvedFontSize = effectiveStyle.fontSize ? `${effectiveStyle.fontSize}px` : computed.fontSize;
        const resolvedFontWeight = effectiveStyle.bold ? 'bold' : computed.fontWeight;
        const resolvedFontStyle = effectiveStyle.italic ? 'italic' : computed.fontStyle;
        const resolvedColor = effectiveStyle.fontColor || computed.color;
        const decorations = [];
        if (effectiveStyle.underline) decorations.push('underline');
        if (effectiveStyle.strikethrough) decorations.push('line-through');
        const computedDecoration = (computed.textDecorationLine || computed.textDecoration || '').toLowerCase();
        if (!decorations.length && computedDecoration && computedDecoration !== 'none') {
            decorations.push(computedDecoration);
        }
        input.style.fontSize = resolvedFontSize;
        input.style.fontFamily = computed.fontFamily;
        input.style.fontWeight = resolvedFontWeight;
        input.style.fontStyle = resolvedFontStyle;
        input.style.lineHeight = computed.lineHeight;
        input.style.color = resolvedColor;
        const appliedDecoration = decorations.length ? decorations.join(' ') : 'none';
        input.style.textDecoration = appliedDecoration;
        this.syncEditorLineHeight(input);
        
        editorWrapper.appendChild(input);
        cell.innerHTML = '';
        cell.appendChild(editorWrapper);
        
        // Allow editor to overflow visually
        this.updateEditorOverflow(cell, input);
        
        input.focus();
        if (event) {
            this.setEditorCaretFromClick(event, input);
        } else {
            this.placeCaretAtEnd(input);
        }
        this.saveEditorSelection(input);
        // Immediately reflect inline formatting (e.g., bold, color) when editing begins
        // so the toolbar updates without requiring an extra click.
        this.updateFormattingButtons();
        this.updateFontSizeInput();
        this.attachEditorSelectionListener(input);

        this.formulaInput.value = currentText;

        const captureSelection = () => this.saveEditorSelection(input);

        input.addEventListener('blur', () => {
            if (this.isFontSizeEditing || this.isPaletteFieldEditing) {
                // Let the font size input keep focus; do nothing here.
                return;
            }
            if (this.isToolbarFormattingInteraction || this.pendingEditorRefocus || this.isFormattingUIOpen()) {
                // Keep editing active when the user clicks toolbar formatting
                setTimeout(() => {
                    if (this.currentEditingCell === cell) {
                        input.focus();
                        this.restoreEditorSelection(input);
                    }
                }, 0);
                return;
            }
            this.stopEditingCell();
        });
        input.addEventListener('input', () => {
            // Update overflow as user types
            this.updateEditorOverflow(cell, input);
            this.syncEditorToFormulaBar(input);
            captureSelection();
            this.updateFormattingButtons();
            this.updateFontSizeInput();
        });
        ['select', 'keyup', 'mouseup'].forEach(evt => input.addEventListener(evt, () => {
            captureSelection();
            this.updateFormattingButtons();
            this.updateFontSizeInput();
        }));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.stopEditingCell();
                this.moveSelection(1, 0);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.stopEditingCell(true);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.stopEditingCell();
                this.moveSelection(0, e.shiftKey ? -1 : 1);
            }
        });

        this.log(`Started editing cell ${cell.dataset.address}`);
    }

    updateEditorOverflow(cell, input) {
        const { row, col } = this.getCellPos(cell);
        const mergedCols = Math.max(parseInt(cell?.dataset?.mergedCols || '1', 10), 1);
        const cellWidth = this.getEffectiveCellWidth(cell, col);
        const padding = 16; // matches the wrapper padding for left/right
        const availableWidth = Math.max(cellWidth - padding, 0);
        const textWidth = this.measureEditorContentWidth(input);
        const wrapper = cell.querySelector('.cell-editor-wrapper');
        const textAlign = (input?.style?.textAlign || window.getComputedStyle(input).textAlign || 'left').toLowerCase();
        const maxOverflowCells = 10;

        // Keep the editing backdrop in sync with the cell's background
        const computedBg = window.getComputedStyle(cell).backgroundColor;
        cell.style.setProperty('--cell-edit-background', computedBg || 'transparent');
        
        // Always set cell to allow overflow during editing
        cell.style.overflow = 'visible';
        cell.style.zIndex = '10';
        if (wrapper) {
            wrapper.style.overflow = 'visible';
        }
        
        const needsOverflow = textWidth > availableWidth;
        const requiredWidth = Math.max(cellWidth, textWidth + padding);
        let overflowWidth = cellWidth;
        let overflowOffset = 0;
        let targetWidth = availableWidth;

        if (needsOverflow) {
            if (textAlign === 'right') {
                let totalWidth = cellWidth;
                for (let c = col - 1, steps = 0; c >= 0 && steps < maxOverflowCells && totalWidth < requiredWidth; c--, steps++) {
                    totalWidth += this.getColumnWidth(c);
                }
                overflowWidth = totalWidth;
                overflowOffset = cellWidth - overflowWidth;
            } else if (textAlign === 'center') {
                // Expand evenly to the left/right using whole cells; never stop mid-cell
                const leftWidths = [];
                const rightWidths = [];
                for (let c = col - 1, steps = 0; c >= 0 && steps < maxOverflowCells; c--, steps++) {
                    leftWidths.push(this.getColumnWidth(c));
                }
                for (let c = col + mergedCols, steps = 0; c < this.config.maxCols && steps < maxOverflowCells; c++, steps++) {
                    rightWidths.push(this.getColumnWidth(c));
                }

                const overflowNeeded = Math.max(requiredWidth - cellWidth, 0);
                const targetLeft = Math.ceil(overflowNeeded / 2);
                const targetRight = Math.floor(overflowNeeded / 2);

                let leftTotal = 0;
                let rightTotal = 0;
                let leftIdx = 0;
                let rightIdx = 0;

                while (leftIdx < leftWidths.length && leftTotal < targetLeft) {
                    leftTotal += leftWidths[leftIdx++];
                }
                while (rightIdx < rightWidths.length && rightTotal < targetRight) {
                    rightTotal += rightWidths[rightIdx++];
                }

                if (leftTotal < targetLeft) {
                    const deficit = targetLeft - leftTotal;
                    while (rightIdx < rightWidths.length && rightTotal < targetRight + deficit) {
                        rightTotal += rightWidths[rightIdx++];
                    }
                }

                if (rightTotal < targetRight) {
                    const deficit = targetRight - rightTotal;
                    while (leftIdx < leftWidths.length && leftTotal < targetLeft + deficit) {
                        leftTotal += leftWidths[leftIdx++];
                    }
                }

                overflowWidth = cellWidth + leftTotal + rightTotal;
                overflowOffset = -leftTotal;
            } else {
                let totalWidth = cellWidth;
                for (let c = col + mergedCols, steps = 0; c < this.config.maxCols && steps < maxOverflowCells && totalWidth < requiredWidth; c++, steps++) {
                    totalWidth += this.getColumnWidth(c);
                }
                overflowWidth = totalWidth;
            }
            targetWidth = Math.max(availableWidth, textWidth + padding);
        }

        input.style.width = targetWidth + 'px';
        cell.style.setProperty('--editor-overflow-width', `${overflowWidth}px`);
        cell.style.setProperty('--editor-overflow-offset', `${overflowOffset}px`);
    }

    setEditorCaretFromClick(event, input) {
        if (!event || !input) return;
        const selection = window.getSelection();
        const rangeFromPoint = () => {
            if (document.caretRangeFromPoint) {
                return document.caretRangeFromPoint(event.clientX, event.clientY);
            }
            if (document.caretPositionFromPoint) {
                const pos = document.caretPositionFromPoint(event.clientX, event.clientY);
                if (pos) {
                    const r = document.createRange();
                    r.setStart(pos.offsetNode, pos.offset);
                    r.collapse(true);
                    return r;
                }
            }
            return null;
        };
        const range = rangeFromPoint();
        if (range && selection && input.contains(range.commonAncestorContainer)) {
            selection.removeAllRanges();
            selection.addRange(range);
            return;
        }
        this.placeCaretAtEnd(input);
    }

    placeCaretAtEnd(editor) {
        if (!editor) return;
        const selection = window.getSelection();
        if (!selection) return;
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    stopEditingCell(cancel = false) {
        // Always honor explicit cancels (e.g., Escape), even if a formatting UI is open
        if (!cancel && (this.pendingEditorRefocus || this.isFormattingUIOpen())) {
            this.resumeEditingAfterToolbar();
            return;
        }
        const cell = this.currentEditingCell;
        if (!cell) return;

        this.detachEditorSelectionListener();
        this.lastInlineFontSize = null;
        this.isToolbarFormattingInteraction = false;
        const input = cell.querySelector('.cell-editor');
        const oldValue = cell.dataset.originalValue || '';
        const cellKey = this.getCoord(cell);
        const { row, col } = this.getCellPos(cell);
        const existingData = this.cellData.get(cellKey) || {};
        const previousRichText = existingData.richText || '';
        const baseFormatting = {
            bold: !!existingData.bold,
            italic: !!existingData.italic,
            underline: !!existingData.underline,
            strikethrough: !!existingData.strikethrough
        };
        const originalValue = existingData.value ?? oldValue;

        // Clear reference early to avoid re-entrancy leaving us with a null handle mid-cleanup
        this.currentEditingCell = null;

        // If the editor vanished (e.g. DOM rebuild) just clean up and bail
        if (!input) {
            cell.classList.remove('editing');
            delete cell.dataset.originalValue;
            this.formulaInput.value = oldValue;
            return;
        }

        if (cancel) {
            // Restore the previous display and styling without mutating stored data
            cell.classList.remove('editing');
            delete cell.dataset.originalValue;
            this.formulaInput.value = originalValue || '';
            this.updateCellDisplay(cell, existingData);
            this.updateFormattingButtons();
            return;
        }

        const { plainText, html: richHtml, hasRich } = this.serializeEditorContent(input);
        const newValue = plainText;
        let targetRichText = (hasRich && !newValue.startsWith('=')) ? richHtml : '';
        if (targetRichText && (baseFormatting.bold || baseFormatting.italic || baseFormatting.underline || baseFormatting.strikethrough)) {
            targetRichText = this.applyBaselineFormatting(targetRichText, baseFormatting);
        }
        const richChanged = previousRichText !== targetRichText;
        
        // Display based on value type
        if (newValue.startsWith("'")) {
            // Escaped text - display without the apostrophe
            cell.textContent = newValue.substring(1);
        } else if (newValue.startsWith('=')) {
            // Formula - display result
            const result = this.parseFormula(newValue, row, col);
            cell.textContent = result;
        } else if (hasRich && richHtml) {
            cell.innerHTML = targetRichText || richHtml;
        } else {
            // Regular text
            cell.textContent = newValue;
        }
        
        cell.classList.remove('editing');
        delete cell.dataset.originalValue;
        
        if (oldValue !== newValue || richChanged) {
            // Save state before making changes
            this.saveState(`Edit cell ${cell.dataset.address}`);
        }
        
        const updatedData = this.updateCellDataEntry(cellKey, data => {
            if (newValue) {
                data.value = newValue;
            } else {
                delete data.value;
            }
            if (targetRichText) {
                data.richText = targetRichText;
            } else {
                delete data.richText;
            }
            if (targetRichText) {
                delete data.bold;
                delete data.italic;
                delete data.underline;
                delete data.strikethrough;
            }
        });

        // Update formula bar to show the formula, not the result
        this.formulaInput.value = newValue;

        if (!cancel && oldValue !== newValue) {
            this.log(`Cell ${cell.dataset.address} edited: "${oldValue}" → "${newValue}"`);
            
            // Recalculate all cells that might depend on this cell
            this.recalculateAllFormulas();
        }
        
        // Refresh the cell display to apply overflow logic
        this.updateCellDisplay(cell, updatedData || {});
        
        // IMPORTANT: Refresh cells in BOTH directions that might have overflowing text
        // affected by this cell's new content
        for (let c = Math.max(0, col - 20); c <= Math.min(this.config.maxCols - 1, col + 20); c++) {
            if (c !== col) {
                const adjCellCoord = `${row},${c}`;
                const adjCell = this.getCellAt(row, c);
                if (adjCell) {
                    const adjCellData = this.cellData.get(adjCellCoord) || {};
                    this.updateCellDisplay(adjCell, adjCellData);
                }
            }
        }

        // Refresh toolbar state (e.g. bold/italic buttons) based on the saved rich text
        this.updateFormattingButtons();

        // Refresh palette usage immediately so inline colors show up without a reload
        this.recomputeColorUsageFromData();
        this.refreshPalettes('font');
    }

    recalculateAllFormulas() {
        // Refresh all visible cells to recalculate formulas
        this.refreshAllVisibleCells();
    }

    moveSelection(deltaRow, deltaCol) {
        if (!this.primaryCell) return;

        const { row: currentRow, col: currentCol } = this.getCellPos(this.primaryCell);
        const newRow = Math.max(0, Math.min(this.config.maxRows - 1, currentRow + deltaRow));
        const newCol = Math.max(0, Math.min(this.config.maxCols - 1, currentCol + deltaCol));

        this.scrollToCell(newRow, newCol);

        const newCell = this.getCellAt(newRow, newCol);
        if (newCell) {
            this.clearAllSelections();
            this.selectCells([newCell], true);
        } else {
            const cell = this.createCell(newRow, newCol);
            this.clearAllSelections();
            this.selectCells([cell], true);
        }
    }

    scrollToCell(row, col) {
        const cellLeft = this.getColumnLeft(col);
        const cellTop = this.getRowTop(row);
        const cellRight = cellLeft + this.getColumnWidth(col);
        const cellBottom = cellTop + this.getRowHeight(row);

        const viewLeft = this.mainGrid.scrollLeft;
        const viewTop = this.mainGrid.scrollTop;
        const viewRight = viewLeft + this.mainGrid.clientWidth;
        const viewBottom = viewTop + this.mainGrid.clientHeight;

        const newScrollLeft = cellLeft < viewLeft ? cellLeft : 
                            cellRight > viewRight ? cellRight - this.mainGrid.clientWidth : 
                            viewLeft;
        
        const newScrollTop = cellTop < viewTop ? cellTop : 
                            cellBottom > viewBottom ? cellBottom - this.mainGrid.clientHeight : 
                            viewTop;

        if (newScrollLeft !== viewLeft || newScrollTop !== viewTop) {
            this.mainGrid.scrollTo({ left: newScrollLeft, top: newScrollTop, behavior: 'smooth' });
        }
    }

    handleKeyUp(event) {
        if (!this.formatPainter.active || !this.formatPainter.awaitingCtrlRelease) return;

        const key = event.key?.toLowerCase();
        const isCtrlRelease = key === 'control' || key === 'meta';

        if (isCtrlRelease && !this.isDragging) {
            if (!this.hasSelection()) {
                this.formatPainter.awaitingCtrlRelease = false;
                return;
            }
            this.formatPainter.awaitingCtrlRelease = false;
            this.applyPaintedFormatToSelection();
        }
    }

    handleKeyDown(event) {
        // Don't intercept keyboard shortcuts if user is typing in an input field
        const isInInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
        
        if (this.currentEditingCell) return;

        // Handle Escape to cancel format painter
        if (event.key === 'Escape' && this.formatPainter.active) {
            event.preventDefault();
            this.deactivateFormatPainter();
            return;
        }

        // Handle Escape to clear cut/copy visuals (including cut ghosts)
        if (event.key === 'Escape' && this.clipboard && this.clipboard.visualMode === 'cut') {
            event.preventDefault();
            this.clearCutCopyStyling();
            this.clipboard = null;
            return;
        }

        // Handle Ctrl+Z for undo
        if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey && !isInInput) {
            event.preventDefault();
            this.undo();
            return;
        }

        // Handle Ctrl+Y or Ctrl+Shift+Z for redo
        if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey)) && !isInInput) {
            event.preventDefault();
            this.redo();
            return;
        }

        // Handle Ctrl+A / Cmd+A for select all
        if ((event.ctrlKey || event.metaKey) && event.key === 'a' && !isInInput) {
            event.preventDefault();
            this.selectAllCells();
            return;
        }
        
        // Handle Ctrl+C for copy - but allow in input fields
        if ((event.ctrlKey || event.metaKey) && event.key === 'c' && !isInInput) {
            event.preventDefault();
            this.copyCells();
            return;
        }

        // Handle Ctrl+X for cut - but allow in input fields
        if ((event.ctrlKey || event.metaKey) && event.key === 'x' && !isInInput) {
            event.preventDefault();
            this.cutCells();
            return;
        }

        // Handle Ctrl+V for paste - but allow in input fields
        if ((event.ctrlKey || event.metaKey) && event.key === 'v' && !isInInput) {
            event.preventDefault();
            this.pasteCells();
            return;
        }

        // Handle Context Menu key
        if (event.key === 'ContextMenu' && !isInInput) {
            event.preventDefault();
            this.blockNextNativeContextMenu = true;
            if (this.primaryCell && this.hasSelection()) {
                const rect = this.primaryCell.getBoundingClientRect();
                // Position the menu at the center of the primary cell
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                this.showContextMenu(x, y);
                this.log(`Context menu opened via keyboard for ${this.selectedCells.size} selected cells`);
            }
            return;
        }

        // Don't handle other keys if in an input field
        if (isInInput) return;

        switch (event.key) {
            case 'Enter':
                if (this.primaryCell && !this.currentEditingCell) {
                    this.startEditingCell(this.primaryCell);
                }
                break;
            case 'Delete':
            case 'Backspace':
                // Only clear cell content if formula input is NOT focused
                if (this.selectedCells.size > 0 && document.activeElement !== this.formulaInput) {
                    this.clearCellContent();
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.moveSelection(-1, 0);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.moveSelection(1, 0);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.moveSelection(0, -1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.moveSelection(0, 1);
                break;
            case 'Tab':
                event.preventDefault();
                this.moveSelection(0, event.shiftKey ? -1 : 1);
                break;
            case 'Escape':
                this.clearCutCopyStyling();
                this.clearAllSelections();
                break;
        }
    }

    selectAllCells() {
        this.clearAllSelections();
        
        for (let row = 0; row < this.config.maxRows; row++) {
            for (let col = 0; col < this.config.maxCols; col++) {
                const coordKey = `${row},${col}`;
                this.selectedCellCoords.add(coordKey);
            }
        }
        
        this.primaryCellCoord = '0,0';
        
        const visibleCells = this.gridContent.querySelectorAll('.cell');
        visibleCells.forEach(cell => {
            const coordKey = this.getCoord(cell);
            
            if (this.selectedCellCoords.has(coordKey)) {
                cell.classList.add('selected');
                this.selectedCells.add(cell);
                
                if (coordKey === this.primaryCellCoord) {
                    cell.classList.add('primary-selected');
                    this.primaryCell = cell;
                }
            }
        });
        
        this.updateUI();
        this.fullSheetSelection = true;
        this.log(`Selected all cells: ${this.config.maxRows * this.config.maxCols} cells`);
    }

    clearCellContent() {
        // Save state before clearing
        this.saveState(`Clear content of ${this.selectedCellCoords.size} cells`);
        
        const affectedRows = new Set();
        this.selectedCellCoords.forEach(coordKey => {
            affectedRows.add(this.getCoordPos(coordKey).row);
            this.updateCellDataEntry(coordKey, data => {
                delete data.value;
                delete data.richText;
                delete data.linkUrl;
            });
        });

        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const data = this.cellData.get(cellKey) || {};
            this.updateCellDisplay(cell, data);
        });

        this._updateCellsAndAdjacent(this.selectedCells);

        this.updateFormulaBar();
        this.recalculateAutoRowHeights(affectedRows);
        this.log(`Cleared content of ${this.selectedCellCoords.size} cells`);
    }

    handleContextMenu(event) {
        if (this.blockNextNativeContextMenu) {
            event.preventDefault();
            this.blockNextNativeContextMenu = false;
            return;
        }

        if (this.currentEditingCell && event.target.classList.contains('cell-editor')) {
            return;
        }

        const rowHeader = event.target.closest('.row-header');
        if (rowHeader && !event.target.closest('.row-resize-handle')) {
            event.preventDefault();
            const rowIndex = parseInt(rowHeader.dataset.row, 10);
            if (!Number.isNaN(rowIndex)) {
                const rowAlreadySelected = this.isRangeFullySelected('row', rowIndex);
                if (!rowAlreadySelected) {
                    this.clearAllSelections();
                    this.selectRange('row', rowIndex, false);
                }
                this.showContextMenu(event.clientX, event.clientY, { type: 'rowHeader', row: rowIndex });
                this.log(`Context menu opened for row ${rowIndex + 1}`);
            }
            return;
        }

        const colHeader = event.target.closest('.column-header');
        if (colHeader && !event.target.closest('.column-resize-handle')) {
            event.preventDefault();
            const colIndex = parseInt(colHeader.dataset.col, 10);
            if (!Number.isNaN(colIndex)) {
                const colAlreadySelected = this.isRangeFullySelected('column', colIndex);
                if (!colAlreadySelected) {
                    this.clearAllSelections();
                    this.selectRange('column', colIndex, false);
                }
                this.showContextMenu(event.clientX, event.clientY, { type: 'columnHeader', col: colIndex, clientX: event.clientX, clientY: event.clientY });
                this.log(`Context menu opened for column ${this.getColumnName(colIndex)}`);
            }
            return;
        }

        const cell = this.resolveCellFromEvent(event);

        if (cell && !event.target.classList.contains('cell-editor')) {
            event.preventDefault();
            
            if (!this.selectedCells.has(cell)) {
                this.clearAllSelections();
                this.selectCells([cell], true);
            }
            
            this.showContextMenu(event.clientX, event.clientY, { type: 'cell' });
            this.log(`Context menu opened for ${this.selectedCells.size} selected cells`);
        }
    }

    showContextMenu(x, y, context = { type: 'cell' }) {
        this.contextMenuContext = context || { type: 'cell' };
        this.contextMenu.classList.remove('hidden');
        this.contextMenu.style.left = x + 'px';
        this.contextMenu.style.top = y + 'px';
        
        // Check if primary cell has a link
        const hasLink = this.primaryCell && this.cellHasLink();
        const isRowContext = context && context.type === 'rowHeader';
        const isColContext = context && context.type === 'columnHeader';
        
        // Show/hide appropriate link menu items
        const openLinkItem = document.getElementById('openLinkItem');
        const editLinkItem = document.getElementById('editLinkItem');
        const insertLinkItem = document.getElementById('insertLinkItem');
        const rowHeightItem = document.getElementById('rowHeightMenuItem');
        const colWidthItem = document.getElementById('colWidthMenuItem');
        
        if (openLinkItem && editLinkItem && insertLinkItem) {
            if (isRowContext || isColContext) {
                openLinkItem.style.display = 'none';
                editLinkItem.style.display = 'none';
                insertLinkItem.style.display = 'none';
            } else if (hasLink) {
                openLinkItem.style.display = 'flex';
                editLinkItem.style.display = 'flex';
                insertLinkItem.style.display = 'none';
            } else {
                openLinkItem.style.display = 'none';
                editLinkItem.style.display = 'none';
                insertLinkItem.style.display = 'flex';
            }
        }

        const commentItem = this.contextMenu.querySelector('[data-action="comment"]');
        if (commentItem) {
            commentItem.style.display = (isRowContext || isColContext) ? 'none' : 'flex';
        }

        if (rowHeightItem) {
            rowHeightItem.style.display = isRowContext ? 'flex' : 'none';
        }
        if (colWidthItem) {
            colWidthItem.style.display = isColContext ? 'flex' : 'none';
        }

        const insertRowItem = this.contextMenu.querySelector('[data-action="insertRow"]');
        const deleteRowItem = this.contextMenu.querySelector('[data-action="deleteRow"]');
        const insertColItem = this.contextMenu.querySelector('[data-action="insertCol"]');
        const deleteColItem = this.contextMenu.querySelector('[data-action="deleteCol"]');
        const insertDeleteSeparator = document.getElementById('linkSeparator2');
        const setMenuItemDisplay = (el, show, isSeparator = false) => {
            if (!el) return;
            el.style.display = show ? (isSeparator ? 'block' : 'flex') : 'none';
        };

        if (isRowContext) {
            setMenuItemDisplay(insertRowItem, true);
            setMenuItemDisplay(deleteRowItem, true);
            setMenuItemDisplay(insertColItem, false);
            setMenuItemDisplay(deleteColItem, false);
        } else if (isColContext) {
            setMenuItemDisplay(insertRowItem, false);
            setMenuItemDisplay(deleteRowItem, false);
            setMenuItemDisplay(insertColItem, true);
            setMenuItemDisplay(deleteColItem, true);
        } else {
            setMenuItemDisplay(insertRowItem, true);
            setMenuItemDisplay(deleteRowItem, true);
            setMenuItemDisplay(insertColItem, true);
            setMenuItemDisplay(deleteColItem, true);
        }

        if (insertDeleteSeparator) {
            const shouldShowSeparator = [insertRowItem, deleteRowItem, insertColItem, deleteColItem].some(el => el && el.style.display !== 'none');
            setMenuItemDisplay(insertDeleteSeparator, shouldShowSeparator, true);
        }

        setTimeout(() => {
            const rect = this.contextMenu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                this.contextMenu.style.left = (x - rect.width) + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                this.contextMenu.style.top = (y - rect.height) + 'px';
            }
        }, 0);
    }
    
    cellHasLink() {
        if (!this.primaryCell) return false;
        
        const cellKey = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(cellKey);
        
        // Check if cell has a stored linkUrl OR if the value itself is a hyperlink
        return !!(cellData?.linkUrl || (cellData?.value && this.isHyperlink(cellData.value)));
    }

    hideContextMenu() {
        this.contextMenu.classList.add('hidden');
    }

    handleContextMenuClick(event) {
        const item = event.target.closest('.context-menu-item');
        if (!item) return;

        const action = item.dataset.action;
        
        // For link actions, prevent the click from bubbling
        if (action === 'editLink' || action === 'insertLink') {
            event.stopPropagation();
            this.hideContextMenu();
            // Use setTimeout to show link editor after context menu closes
            setTimeout(() => {
                this.showLinkEditor(action === 'editLink');
            }, 10);
        } else {
            this.executeContextAction(action, this.contextMenuContext);
            this.hideContextMenu();
        }
    }

    executeContextAction(action, context = { type: 'cell' }) {
        switch (action) {
            case 'cut':
                this.cutCells();
                break;
            case 'copy':
                this.copyCells();
                break;
            case 'paste':
                this.pasteCells();
                break;
            case 'openLink':
                this.openLink();
                break;
            case 'editLink':
                this.showLinkEditor(true);
                // Prevent hideContextMenu from happening immediately
                setTimeout(() => {}, 0);
                break;
            case 'insertLink':
                this.showLinkEditor(false);
                // Prevent hideContextMenu from happening immediately
                setTimeout(() => {}, 0);
                break;
            case 'comment':
                this.handleCommentEdit();
                break;
            case 'clearContent':
                this.clearCellContent();
                break;
            case 'clearFormat':
                this.clearCellFormatting();
                break;
            case 'insertRow':
                this.insertRowsAtSelection();
                break;
            case 'insertCol':
                this.insertColumnsAtSelection();
                break;
            case 'deleteRow':
                this.deleteRowsAtSelection();
                break;
            case 'deleteCol':
                this.deleteColumnsAtSelection();
                break;
            case 'setRowHeight':
                this.promptSetRowHeight(context);
                break;
            case 'setColWidth':
                this.promptSetColumnWidth(context);
                break;
        }
    }

    getSelectedRows() {
        const rows = new Set();
        this.selectedCellCoords.forEach(coord => {
            const { row } = this.getCoordPos(coord);
            rows.add(row);
        });
        return Array.from(rows).sort((a, b) => a - b);
    }

    promptSetRowHeight(context = { type: 'cell' }) {
        const contextRow = Number.isInteger(context?.row) ? context.row : null;
        const selectedRows = this.getSelectedRows();
        if (!selectedRows.length && contextRow !== null) {
            selectedRows.push(contextRow);
        }
        if (!selectedRows.length) return;

        const anchor = this.getContextMenuAnchor(context);
        this.showRowHeightChoiceUI({
            rows: selectedRows,
            anchor
        });
    }

    getContextMenuAnchor(context = {}) {
        if (Number.isFinite(context?.clientX) && Number.isFinite(context?.clientY)) {
            return { x: context.clientX, y: context.clientY };
        }
        const rect = this.contextMenu?.getBoundingClientRect();
        if (rect) {
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        return null;
    }

    showRowHeightChoiceUI({ rows, anchor }) {
        this.destroyRowHeightChoiceUI();
        const container = document.createElement('div');
        container.className = 'row-height-choice-popover';
        container.style.position = 'fixed';
        container.style.zIndex = '10000';
        container.style.background = 'var(--color-surface, #1e1e1e)';
        container.style.color = 'var(--color-text, #eee)';
        container.style.border = '1px solid var(--color-border, #444)';
        container.style.borderRadius = '6px';
        container.style.padding = '8px';
        container.style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)';
        container.style.minWidth = '240px';

        const title = document.createElement('div');
        title.textContent = 'Set row height';
        title.style.fontWeight = '600';
        title.style.marginBottom = '6px';
        container.appendChild(title);

        const makeButton = (label, handler) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = label;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.margin = '4px 0';
            btn.style.padding = '6px 8px';
            btn.style.borderRadius = '4px';
            btn.style.border = '1px solid var(--color-border, #444)';
            btn.style.background = 'var(--color-surface-strong, #2b2b2b)';
            btn.style.color = 'inherit';
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', () => {
                handler();
                this.destroyRowHeightChoiceUI();
            });
            return btn;
        };

        container.appendChild(makeButton('Set new default height', () => {
            this.promptSetDefaultRowHeight(rows);
        }));
        container.appendChild(makeButton('Set explicit height for selection', () => {
            this.promptSetExplicitRowHeight(rows);
        }));
        container.appendChild(makeButton('Auto-fit selection (implicit)', () => {
            this.applyImplicitRowHeight(rows);
        }));

        const cancel = document.createElement('button');
        cancel.type = 'button';
        cancel.textContent = 'Cancel';
        cancel.style.display = 'block';
        cancel.style.width = '100%';
        cancel.style.marginTop = '8px';
        cancel.style.padding = '6px 8px';
        cancel.style.borderRadius = '4px';
        cancel.style.border = '1px solid var(--color-border, #444)';
        cancel.style.background = 'transparent';
        cancel.style.color = 'inherit';
        cancel.style.cursor = 'pointer';
        cancel.addEventListener('click', () => this.destroyRowHeightChoiceUI());
        container.appendChild(cancel);

        const pos = anchor || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const offset = 6;
        container.style.left = `${Math.min(Math.max(8, pos.x + offset), window.innerWidth - 260)}px`;
        container.style.top = `${Math.min(Math.max(8, pos.y + offset), window.innerHeight - 160)}px`;

        document.body.appendChild(container);
        this.rowHeightChoicePopover = container;

        this.rowHeightChoiceOutsideHandler = (e) => {
            if (this.rowHeightChoicePopover && !this.rowHeightChoicePopover.contains(e.target)) {
                this.destroyRowHeightChoiceUI();
            }
        };
        setTimeout(() => document.addEventListener('mousedown', this.rowHeightChoiceOutsideHandler, true), 0);
    }

    destroyRowHeightChoiceUI() {
        if (this.rowHeightChoiceOutsideHandler) {
            document.removeEventListener('mousedown', this.rowHeightChoiceOutsideHandler, true);
            this.rowHeightChoiceOutsideHandler = null;
        }
        if (this.rowHeightChoicePopover) {
            this.rowHeightChoicePopover.remove();
            this.rowHeightChoicePopover = null;
        }
    }

    promptSetDefaultRowHeight(rows = []) {
        if (!Array.isArray(rows) || !rows.length) {
            rows = this.getSelectedRows();
        }
        if (!rows.length) return;
        const current = Math.round(this.defaultAutoRowHeight || this.config.cellHeight || 32);
        const input = window.prompt('Enter new default row height (px) for selection:', String(current));
        if (input === null) return;
        const parsed = parseFloat(input);
        if (!Number.isFinite(parsed) || parsed <= 0) {
            window.alert('Please enter a valid positive number.');
            return;
        }
        const minHeight = Math.max(1, this.config?.cellHeight || 1);
        const height = Math.max(minHeight, Math.round(parsed));
        rows.forEach(row => {
            this.rowDefaultHeightOverrides.set(row, height);
            this.rowHeights.delete(row);
            this.autoRowHeights.delete(row);
            this.rowHeightModes.set(row, 'implicit');
        });
        this.recalculateAutoRowHeights(new Set(rows));
        this.refreshLayoutAfterRowHeightChange();
        this.scheduleDirtyStateUpdate();
    }

    getSelectedCols() {
        const cols = new Set();
        this.selectedCellCoords.forEach(coord => {
            const { col } = this.getCoordPos(coord);
            cols.add(col);
        });
        return Array.from(cols).sort((a, b) => a - b);
    }

    promptSetColumnWidth(context = { type: 'cell' }) {
        const contextCol = Number.isInteger(context?.col) ? context.col : null;
        const cols = this.getSelectedCols();
        if (!cols.length && contextCol !== null) {
            cols.push(contextCol);
        }
        if (!cols.length) return;

        const current = cols.length === 1
            ? Math.round(this.getColumnWidth(cols[0]))
            : Math.round(this.config.cellWidth || 100);
        const input = window.prompt(`Enter width (px) for ${cols.length} column(s):`, String(current));
        if (input === null) return;
        const parsed = parseFloat(input);
        if (!Number.isFinite(parsed) || parsed <= 0) {
            window.alert('Please enter a valid positive number.');
            return;
        }
        const minWidth = 10;
        const width = Math.max(minWidth, Math.round(parsed));
        cols.forEach(col => {
            this.columnWidths.set(col, width);
        });
        this.updateGridSize();
        this.updateHeaderPositions();
        this.repositionCells();
        this.renderSelectionOverlays();
        this.renderBorderOverlays();
        this.scheduleDirtyStateUpdate();
    }

    promptSetExplicitRowHeight(rows) {
        if (!Array.isArray(rows) || !rows.length) return;
        const current = rows.length === 1
            ? Math.round(this.getRowHeight(rows[0]))
            : Math.round(this.defaultAutoRowHeight || this.config.cellHeight || 32);
        const input = window.prompt(`Enter explicit height (px) for ${rows.length} row(s):`, String(current));
        if (input === null) return;
        const parsed = parseFloat(input);
        if (!Number.isFinite(parsed) || parsed <= 0) {
            window.alert('Please enter a valid positive number.');
            return;
        }
        const minHeight = Math.max(1, this.config?.cellHeight || 1);
        const height = Math.max(minHeight, Math.round(parsed));
        rows.forEach(row => {
            this.rowHeights.set(row, height);
            this.autoRowHeights.delete(row);
            this.rowHeightModes.set(row, 'explicit');
            this.rowDefaultHeightOverrides.delete(row);
        });
        this.refreshLayoutAfterRowHeightChange();
        this.scheduleDirtyStateUpdate();
    }

    applyImplicitRowHeight(rows) {
        if (!Array.isArray(rows) || !rows.length) return;
        rows.forEach(row => {
            this.rowHeights.delete(row);
            this.rowHeightModes.delete(row);
            this.rowDefaultHeightOverrides.delete(row);
        });
        this.recalculateAutoRowHeights(new Set(rows));
        this.scheduleDirtyStateUpdate();
    }
    
    _getRelativeCoords() {
        const bounds = this.getSelectionBounds();
        if (!bounds) return { coords: [], minRow: 0, minCol: 0 };
        const { coords, minRow, minCol } = bounds;
        return { coords, minRow, minCol };
    }
    
    clearCutCopyStyling() {
        const cells = this.gridContent ? this.gridContent.querySelectorAll('.cell') : [];
        cells.forEach(cell => {
            cell.style.border = '';
            if (cell.dataset.cutGhost) {
                delete cell.dataset.cutGhost;
            }
            if (cell.dataset.cutGhostData) {
                delete cell.dataset.cutGhostData;
            }
            cell.classList.remove('cut-preview', 'cut-ghost');
            const coord = this.getCoord(cell);
            const data = this.cellData.get(coord) || {};
            this.updateCellDisplay(cell, data);
        });

        if (this.clipboard) {
            this.clipboard.overlayRegions = null;
            this.clipboard.visualMode = null;
            this.clipboard.mode = null;
            this.clipboard.sourceCells = null;
            this.clipboard.data = null;
            this.clipboard.origin = null;
        }
        this.renderSelectionOverlays();
    }

    cutCells() { this.copyCells(true); }

    copyCells(isCut = false) {
        if (!this.hasSelection()) return;

        // Clear existing cut/copy styling when doing a new cut or copy
        this.clearCutCopyStyling();

        this.clipboard = {
            data: new Map(),
            mode: isCut ? 'cut' : 'copy',
            sourceCells: isCut ? new Set(this.selectedCellCoords) : null,
            origin: null,
            overlayRegions: null,
            visualMode: isCut ? 'cut' : 'copy'
        };

        const { minRow, minCol } = this._getRelativeCoords();
        this.clipboard.origin = { row: minRow, col: minCol };

        this.selectedCellCoords.forEach(coordKey => {
            const { row, col } = this.getCoordPos(coordKey);
            const relativeKey = `${row - minRow},${col - minCol}`;
            const cellData = this.cellData.get(coordKey);
            
            if (cellData || isCut) {
                this.clipboard.data.set(relativeKey, cellData ? { ...cellData } : {});
            }
        });

        // Apply visual styling for both cut and copy
        this.clipboard.overlayRegions = this.findContiguousRegions(new Set(this.selectedCellCoords));
        if (isCut) {
            this.selectedCells.forEach(cell => cell.classList.add('cut-preview'));
        }
        this.renderSelectionOverlays();

        // Copy to system clipboard
        this.copyToSystemClipboard();

        this.log(`${isCut ? 'Cut' : 'Copied'} ${this.selectedCellCoords.size} cells`);
    }

    pasteCells() {
        if (!this.clipboard.data || this.clipboard.data.size === 0) {
            this.log('Clipboard is empty');
            return;
        }

        if (!this.primaryCell) {
            this.log('No target cell selected for paste');
            return;
        }

        const { row: targetRow, col: targetCol } = this.getCellPos(this.primaryCell);
        const origin = this.clipboard.origin;
        const affectedRows = new Set();

        // Save state before pasting
        this.saveState(`Paste ${this.clipboard.data.size} cells`);

        // If it was a cut operation and this is the first paste, clear the original cells
        const cutCellsToUpdate = new Set();

        if (this.clipboard.mode === 'cut' && this.clipboard.sourceCells) {
            this.clipboard.sourceCells.forEach(coordKey => {
                const previousData = this.cellData.get(coordKey);
                // Clear the cell data
                this.cellData.delete(coordKey);

                // Update visible cells
                const [row, col] = this.parseCoord(coordKey);
                const cell = this.getCellAt(row, col);
                if (cell) {
                    // Preserve visible text as a ghost
                    cell.dataset.cutGhost = cell.textContent || '';
                    if (previousData && Object.keys(previousData).length) {
                        cell.dataset.cutGhostData = JSON.stringify(previousData);
                    } else {
                        delete cell.dataset.cutGhostData;
                    }
                    cell.textContent = '';
                    // Re-render to show ghost content with preserved formatting
                    this.updateCellDisplay(cell, {});
                    cutCellsToUpdate.add(cell);
                }
                affectedRows.add(row);
            });

            // Clear source cells but keep clipboard data for repeated pasting
            this.clipboard.sourceCells = null;
            // Convert cut to copy mode so subsequent pastes don't try to clear again
            this.clipboard.mode = 'copy';
        }

        // Paste data
        this.clipboard.data.forEach((cellData, relativeKey) => {
            const [relRow, relCol] = relativeKey.split(',').map(Number);
            const newRow = targetRow + relRow;
            const newCol = targetCol + relCol;
            const newKey = `${newRow},${newCol}`;

            // Only paste within grid bounds
            if (newRow >= 0 && newRow < this.config.maxRows && 
                newCol >= 0 && newCol < this.config.maxCols) {
                
                // Copy cell data
                const newCellData = { ...cellData };

                const sourceRow = origin ? origin.row + relRow : null;
                const sourceCol = origin ? origin.col + relCol : null;
                const rowDelta = origin && sourceRow !== null ? newRow - sourceRow : relRow;
                const colDelta = origin && sourceCol !== null ? newCol - sourceCol : relCol;
                
                // Adjust formula references if the value is a formula
                if (newCellData.value && newCellData.value.startsWith('=')) {
                    newCellData.value = this.adjustFormulaReferences(
                        newCellData.value, 
                        rowDelta, 
                        colDelta
                    );
                }
                
                // Store the adjusted data
                if (Object.keys(newCellData).length > 0) {
                    this.cellData.set(newKey, newCellData);
                } else {
                    this.cellData.delete(newKey);
                }

                // Update the cell if it's visible
                const cell = this.getCellAt(newRow, newCol);
                if (cell) {
                    this.updateCellDisplay(cell, newCellData);
                }

                affectedRows.add(newRow);
            }
        });

        this.log(`Pasted ${this.clipboard.data.size} cells at ${this.primaryCell.dataset.address}`);
        this.refreshPalettes();

        // Ensure cut origins redraw without stale borders
        if (cutCellsToUpdate.size) {
            this._updateCellsAndAdjacent(cutCellsToUpdate);
        }

        // Ensure the pasted range is selected and formula bar shows the latest value immediately
        const newSelection = [];
        this.clipboard.data.forEach((_, relativeKey) => {
            const [relRow, relCol] = relativeKey.split(',').map(Number);
            const newRow = targetRow + relRow;
            const newCol = targetCol + relCol;
            if (newRow >= 0 && newRow < this.config.maxRows && newCol >= 0 && newCol < this.config.maxCols) {
                newSelection.push(this.getCellAt(newRow, newCol) || this.createCell(newRow, newCol));
            }
        });

        if (newSelection.length) {
            const firstCell = newSelection[0];
            this.clearAllSelections();
            this.selectCells(newSelection, true);
            if (firstCell) {
                this.primaryCell = firstCell;
                this.primaryCellCoord = `${firstCell.dataset.row},${firstCell.dataset.col}`;
                this.updateFormulaBar();
            }
            
            this._updateCellsAndAdjacent(newSelection);
        } else {
            this.updateFormulaBar();
        }

        if (affectedRows.size) {
            this.recalculateAutoRowHeights(affectedRows);
        }
    }

    copyToSystemClipboard() {
        if (!this.hasSelection()) return;

        // Get bounds to create a proper grid
        const bounds = this.getSelectionBounds();
        if (!bounds) return;

        const { minRow, maxRow, minCol, maxCol } = bounds;
        
        // Create TSV (tab-separated values) for clipboard
        const rows = [];
        for (let row = minRow; row <= maxRow; row++) {
            const cols = [];
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                const cellData = this.cellData.get(coordKey);
                
                let value = '';
                if (cellData && cellData.value) {
                    value = cellData.value;
                    // If it's a formula, use the calculated result instead
                    if (value.startsWith('=')) {
                        value = this.parseFormula(value, row, col);
                    } else if (value.startsWith("'")) {
                        // Remove the leading apostrophe for escaped text
                        value = value.substring(1);
                    }
                }
                cols.push(value);
            }
            rows.push(cols.join('\t'));
        }
        
        const text = rows.join('\n');
        
        // Try to copy to system clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(err => {
                console.warn('Failed to copy to clipboard:', err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.warn('Failed to copy to clipboard:', err);
            }
            document.body.removeChild(textarea);
        }
    }
    
    openLink() {
        if (!this.primaryCell) return;
        
        const cellKey = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(cellKey);
        
        // Use the stored linkUrl if it exists, otherwise try to parse the value
        let url = cellData?.linkUrl || cellData?.value || '';
        
        if (this.isHyperlink(url) || cellData?.linkUrl) {
            url = url.trim();
            // Add https:// if it starts with www.
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            }
            window.open(url, '_blank', 'noopener,noreferrer');
            this.log(`Opened link: ${url}`);
        }
    }

    showLinkEditor(prefill = false) {
        console.log('showLinkEditor called, prefill:', prefill, 'linkEditor element:', this.linkEditor);
        
        if (!this.primaryCell) return;
        
        const cellKey = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(cellKey);
        
        // Populate fields - only prefill if requested (editing existing link)
        if (prefill && cellData) {
            document.getElementById('linkUrl').value = cellData.linkUrl || cellData.value || '';
            document.getElementById('linkText').value = cellData.value || '';
        } else {
            document.getElementById('linkUrl').value = '';
            document.getElementById('linkText').value = '';
        }
        
        // Position near the cell
        const rect = this.primaryCell.getBoundingClientRect();
        this.linkEditor.classList.remove('hidden');
        this.linkEditor.style.left = rect.left + 'px';
        this.linkEditor.style.top = (rect.bottom + 5) + 'px';
        
        console.log('Link editor should now be visible');
        
        // Focus the URL field
        setTimeout(() => document.getElementById('linkUrl').focus(), 0);
    }

    hideLinkEditor() {
        console.log('hideLinkEditor called');
        this.linkEditor.classList.add('hidden');
    }

    saveLinkEdit() {
        if (!this.primaryCell) return;
        
        const url = document.getElementById('linkUrl').value.trim();
        const text = document.getElementById('linkText').value.trim();
        
        if (!url) {
            this.hideLinkEditor();
            return;
        }
        
        const cellKey = this.getCoord(this.primaryCell);
        
        this.saveState(`Edit link in ${this.primaryCell.dataset.address}`);
        
        const cellData = this.updateCellDataEntry(cellKey, data => {
            data.value = text || url; // Display text (or URL if no text provided)
            data.linkUrl = url; // Store the actual URL separately
        }) || {};
        
        // Refresh the cell display
        this.updateCellDisplay(this.primaryCell, cellData);
        this.updateFormulaBar();
        this.hideLinkEditor();
        
        this.log(`Updated link in ${this.primaryCell.dataset.address}`);
    }

    ensureCommentEditor() {
        if (this.commentEditor) return;
        if (typeof document === 'undefined') return;
        document.body.insertAdjacentHTML('beforeend', COMMENT_EDITOR_HTML);
        this.commentEditor = document.getElementById('commentEditor');
        this.commentEditorTextarea = document.getElementById('commentEditorText');
        this.commentEditorAnonymous = document.getElementById('commentEditorAnonymous');

        if (this.commentEditor) {
            this.commentEditor.addEventListener('click', (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;
                if (target.dataset.commentEditorDismiss !== undefined || target.dataset.commentEditorCancel !== undefined || target === this.commentEditor) {
                    this.closeCommentEditor(null);
                    return;
                }
                if (target.dataset.commentEditorSave !== undefined) {
                    this.closeCommentEditor({
                        text: (this.commentEditorTextarea?.value || '').trim(),
                        anonymous: Boolean(this.commentEditorAnonymous?.checked)
                    });
                }
            });

            this.commentEditor.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    this.closeCommentEditor(null);
                }
            });
        }
    }

    openCommentEditor(options = {}) {
        this.ensureCommentEditor();
        if (!this.commentEditor) return Promise.resolve(null);

        const { text = '', anonymous = false } = options;
        if (this.commentEditorTextarea) {
            this.commentEditorTextarea.value = text;
        }
        if (this.commentEditorAnonymous) {
            this.commentEditorAnonymous.checked = Boolean(anonymous);
        }

        this.commentEditor.classList.remove('hidden');

        setTimeout(() => {
            if (this.commentEditorTextarea) {
                this.commentEditorTextarea.focus();
                const val = this.commentEditorTextarea.value.length;
                this.commentEditorTextarea.setSelectionRange(val, val);
            }
        }, 0);

        return new Promise(resolve => {
            this.commentEditorResolver = resolve;
        });
    }

    closeCommentEditor(result) {
        if (this.commentEditor) {
            this.commentEditor.classList.add('hidden');
        }
        const resolver = this.commentEditorResolver;
        this.commentEditorResolver = null;
        if (resolver) resolver(result);
    }

    async handleCommentEdit() {
        if (!this.primaryCell) return;

        const targets = this.hasSelection() ? Array.from(this.selectedCellCoords) : [this.getCoord(this.primaryCell)];
        const blockReason = this.getCommentEditBlockReason(targets);
        if (blockReason) {
            if (typeof window !== 'undefined' && window.alert) {
                window.alert(blockReason);
            }
            return;
        }
        this.activeCommentEditTarget = 'root';
        this.updateCommentPopover();
    }

    async handleCommentReply() {
        this.addReplyFromComposer();
    }

    toggleCommentMenu(target = 'root') {
        if (!this.commentPopover) return;
        const normalizedTarget = `${target}`.trim();
        const menus = Array.from(this.commentPopover.querySelectorAll('.comment-menu'));
        let menu = null;
        if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
            menu = this.commentPopover.querySelector(`[data-comment-menu="${CSS.escape(normalizedTarget)}"]`);
        }
        if (!menu) {
            menu = menus.find(m => (m.dataset.commentMenu || '') === `${normalizedTarget}`);
        }
        if (!menu && typeof normalizedTarget === 'string') {
            menu = menus.find(m => m.getAttribute('data-comment-menu') === normalizedTarget);
        }
        if (!menu) {
            // Fallback: look near the toggle to avoid selector mismatch
            const localToggle = this.commentPopover.querySelector(`.comment-menu__toggle[data-comment-target="${normalizedTarget}"]`);
            menu = localToggle?.parentElement?.querySelector('.comment-menu') || menu;
        }
        if (!menu) {
            const available = menus.map(m => m.dataset.commentMenu || m.getAttribute('data-comment-menu'));
            console.log('[comments] menu not found for toggle', normalizedTarget, 'available:', available);
            return;
        }
        const isOpen = menu.classList.contains('open');
        menus.forEach(m => {
            if (m !== menu) {
                m.classList.add('hidden');
                m.classList.remove('open');
            }
        });
        if (isOpen) {
            menu.classList.add('hidden');
            menu.classList.remove('open');
            console.log('[comments] closed menu for', target);
            return;
        }
        menu.classList.remove('hidden');
        menu.classList.add('open');
        console.log('[comments] opened menu for', target);
    }

    handleCommentAuthorLinkClick(event) {
        if (!event) return;
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        const anchor = targetEl?.closest?.('.comment-popover__author a');
        const url = anchor?.href || '';
        if (!url) return;
        event.preventDefault();
        event.stopPropagation();
        window.open(url, '_blank', 'noopener');
    }

    handleCommentActionCapture(event) {
        if (!event) {
            console.log('[comments] action capture aborted: no event');
            return;
        }
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        if (!targetEl) {
            console.log('[comments] action capture aborted: missing target element');
            return;
        }
        const actionBtn = targetEl.closest('[data-comment-action]');
        if (!actionBtn) {
            console.log('[comments] action capture aborted: no data action button', { targetElClass: targetEl.className, dataset: targetEl.dataset });
            return;
        }
        const inPopover = this.commentPopover?.contains(actionBtn);
        const inThread = this.commentPopoverThread?.contains(actionBtn);
        if (!inPopover && !inThread) {
            console.log('[comments] action capture ignored: action button outside tracked popovers', { actionBtn, inPopover, inThread });
            return;
        }
        const action = actionBtn.dataset.commentAction;
        const target = actionBtn.dataset.commentTarget || 'root';
        console.log('[comments] action capture triggered', { action, target });
        if (action === 'add-reply') {
            console.debug('[comments] Reply button clicked', {
                text: this.commentReplyTextarea?.value,
                anonymous: this.commentReplyAnonymous?.checked
            });
        }
        event.preventDefault();
        event.stopPropagation();
        this.handleCommentAction(action, target);
    }

    logCommentActionEvent(event, label) {
        if (!event) return;
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        console.log('[comments]', label, {
            type: event.type,
            target: targetEl ? targetEl.className : null,
            dataset: targetEl ? targetEl.dataset : null,
            defaultPrevented: event.defaultPrevented
        });
    }

    handleCommentMenuPointerDown(event) {
        if (!event) return;
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        const menuToggle = targetEl?.closest?.('.comment-menu__toggle');
        if (!menuToggle) return;
        const target = (menuToggle.dataset.commentTarget || 'root').trim();
        if (!target) return;
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        this.commentMenuToggleIgnoreClick = target;
        this.toggleCommentMenu(target);
        setTimeout(() => {
            if (this.commentMenuToggleIgnoreClick === target) {
                this.commentMenuToggleIgnoreClick = null;
            }
        }, 300);
    }

    handleCommentPopoverClick(event) {
        if (!event) return;
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        if (!targetEl) return;
        console.log('[comments] popover click', {
            target: targetEl.className || targetEl.nodeName,
            dataset: targetEl.dataset || {}
        });
        const menuToggle = targetEl.closest('.comment-menu__toggle');
        if (menuToggle) {
            const target = (menuToggle.dataset.commentTarget || 'root').trim();
            if (this.commentMenuToggleIgnoreClick === target) {
                this.commentMenuToggleIgnoreClick = null;
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            console.log('[comments] menu toggle clicked', target, menuToggle.dataset || {});
            this.toggleCommentMenu(target);
            return;
        }

        const reactionBtn = targetEl.closest('[data-reaction-emoji]');
        if (reactionBtn) {
            const emoji = reactionBtn.dataset.reactionEmoji || '';
            const target = reactionBtn.dataset.commentTarget || 'root';
            this.toggleReaction(target, emoji);
            return;
        }

        const addReactionBtn = targetEl.closest('[data-add-reaction]');
        if (addReactionBtn) {
            const target = addReactionBtn.dataset.commentTarget || 'root';
            this.promptAddReaction(target);
            return;
        }

        const closeBtn = targetEl.closest('[data-comment-close]');
        if (closeBtn) {
            this.activeCommentEditTarget = null;
            this.hideCommentPopover();
            return;
        }

        const actionBtn = targetEl.closest('[data-comment-action]');
        if (actionBtn) {
            const action = actionBtn.dataset.commentAction;
            const target = actionBtn.dataset.commentTarget || 'root';
            console.log('[comments] popover click action button', {
                action,
                target,
                targetClass: targetEl.className,
                dataset: targetEl.dataset || {}
            });
            if (action === 'add-reply') {
                console.debug('[comments] Reply button clicked', {
                    text: this.commentReplyTextarea?.value,
                    anonymous: this.commentReplyAnonymous?.checked
                });
            }
            this.handleCommentAction(action, target);
            return;
        }
    }

    handleCommentAction(action, target) {
        if (['edit', 'delete', 'copy-link'].includes(action)) {
            console.log('[comments] menu action triggered', { action, target });
        }
        switch (action) {
            case 'edit':
                if (!this.canEditTarget(target, { notify: true })) return;
                this.activeCommentEditTarget = target;
                this.updateCommentPopover();
                break;
            case 'cancel-edit':
                this.activeCommentEditTarget = null;
                if (target && target !== 'root') {
                    this.replyAnonDrafts.delete(target);
                }
                this.updateCommentPopover();
                break;
            case 'save-edit':
                if (target === 'root') this.saveMainCommentEdit();
                else this.saveReplyEdit(target);
                break;
            case 'delete':
                if (!this.canEditTarget(target, { notify: true })) return;
                this.deleteCommentEntry(target);
                break;
            case 'copy-link':
                this.copyCommentLink(target);
                break;
            case 'add-reply':
                this.addReplyFromComposer();
                break;
            default:
                break;
        }
    }

    resolveReplyAuthorForDisplay(replyInfo = {}) {
        const placeholder = this.getLocalAuthorPlaceholder();

        if (this.currentUserLogin) {
            return {
                author: this.currentUserLogin,
                profileUrl: this.buildAccountProfileUrl(this.currentUserLogin)
            };
        }

        if (replyInfo.authorId) {
            return {
                author: replyInfo.authorId,
                profileUrl: this.buildAccountProfileUrl(replyInfo.authorId)
            };
        }

        if (replyInfo.author && replyInfo.author.toLowerCase() !== 'anonymous') {
            return {
                author: replyInfo.author,
                profileUrl: replyInfo.profileUrl || ''
            };
        }

        return {
            author: placeholder || 'Anonymous',
            profileUrl: ''
        };
    }

    handleReplyAnonToggle(event) {
        const input = event?.target;
        if (!(input instanceof HTMLInputElement)) return;
        const replyId = input.dataset?.replyAnon;
        if (!replyId) return;
        const container = input.closest('.comment-reply');
        const authorEl = container?.querySelector('.comment-popover__author');
        if (!authorEl) return;

        const checked = input.checked;
        let author = 'Anonymous';
        let profileUrl = '';

        if (!checked) {
            const replyInfo = this.getReplyEntryById(replyId) || {};
            const resolved = this.resolveReplyAuthorForDisplay(replyInfo);
            author = resolved.author;
            profileUrl = resolved.profileUrl;
        }

        authorEl.textContent = '';
        if (profileUrl) {
            const link = document.createElement('a');
            link.href = profileUrl;
            link.target = '_blank';
            link.rel = 'noreferrer noopener';
            link.textContent = author;
            authorEl.appendChild(link);
        } else {
            authorEl.textContent = author;
        }

        this.replyAnonDrafts.set(replyId, { anonymous: checked });
    }

    getReplyEntryById(replyId) {
        const coord = this.activeCommentCoord || (this.primaryCell ? this.getCoord(this.primaryCell) : null);
        if (!coord) return null;
        const commentData = this.normalizeCommentData(this.cellData.get(coord)?.comment);
        if (!commentData || !Array.isArray(commentData.replies)) return null;
        const matchId = `${replyId}`;
        return commentData.replies.find(entry => `${entry?.id || ''}` === matchId) || null;
    }

    findCommentActionButton(event) {
        if (!event) return null;
        if (typeof event.composedPath === 'function') {
            for (const node of event.composedPath()) {
                if (node instanceof Element && node.matches('[data-comment-action]')) {
                    return node;
                }
            }
        }
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        return targetEl?.closest?.('[data-comment-action]') || null;
    }

    describeEventPath(event) {
        if (!event) return null;
        if (typeof event.composedPath === 'function') {
            return event.composedPath()
                .filter(node => node instanceof Element)
                .map(el => ({
                    tag: el.tagName,
                    class: el.className,
                    dataset: { ...el.dataset }
                }));
        }
        return [];
    }

    handleCommentMenuButton(event) {
        if (!event) return;
        const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
        if (targetEl?.tagName && ['TEXTAREA', 'INPUT'].includes(targetEl.tagName)) {
            return;
        }
        const button = this.findCommentActionButton(event);
        if (!button) {
            console.log('[comments] handleCommentMenuButton: no action button in path', {
                path: this.describeEventPath(event)
            });
            return;
        }
        if (!this.commentPopover?.contains(button) && !this.commentPopoverThread?.contains(button)) return;
        const action = button.dataset.commentAction;
        const target = button.dataset.commentTarget || 'root';
        console.log('[comments] direct menu button click', { action, target, btn: button.className });
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        this.handleCommentAction(action, target);
    }

    canEditTarget(target, { notify = false } = {}) {
        if (!this.primaryCell) return false;
        const coord = this.getCoord(this.primaryCell);
        const base = this.normalizeCommentData(this.cellData.get(coord)?.comment);
        const info = target === 'root'
            ? base
            : (base?.replies || []).find(r => `${r?.id || ''}` === `${target}`);
        const allowed = this.canEditCommentEntry(info);
        if (!allowed && notify) {
            const reason = target === 'root'
                ? this.getCommentEditBlockReason([coord]) || this.getCommentEntryBlockReason(info)
                : this.getCommentEntryBlockReason(info);
            if (reason) window.alert?.(reason);
        }
        return allowed;
    }

    saveMainCommentEdit() {
        if (!this.primaryCell) return;
        const coord = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(coord) || {};
        const baseComment = this.ensureCommentIds(coord, this.normalizeCommentData(cellData.comment) || {});
        const blockReason = this.getCommentEditBlockReason([coord]);
        if (blockReason) {
            window.alert?.(blockReason);
            return;
        }
        const commentText = (this.commentMainTextarea?.value || '').trim();
        if (!commentText) {
            this.deleteCommentEntry('root');
            return;
        }
        const isLoggedIn = Boolean(this.currentUserLogin);
        const placeholderAuthor = this.getLocalAuthorPlaceholder();
        const anonymousOptIn = Boolean(this.commentMainAnonymous?.checked);
        const anonymousSelection = anonymousOptIn;
        const priorAuthor = `${baseComment.author || ''}`.trim();
        const nonAnonAuthor = priorAuthor && priorAuthor.toLowerCase() !== 'anonymous' ? priorAuthor : '';
        const author = anonymousSelection
            ? 'Anonymous'
            : (this.currentUserLogin || nonAnonAuthor || placeholderAuthor || 'Anonymous');
        const authorId = anonymousSelection ? null : (this.currentUserLogin || baseComment.authorId || null);
        const profileUrl = authorId ? this.buildAccountProfileUrl(authorId) : '';
        const avatar = anonymousSelection
            ? (baseComment.avatar || this.getAnonymousAvatarData())
            : (this.getActiveUserAvatar() || baseComment.avatar || this.getPlaceholderAvatarData());
        const timestamp = baseComment.at ?? Date.now();
        const anonymousReason = anonymousSelection ? (!isLoggedIn ? 'unauthenticated' : 'opt-in') : null;
        const wasEdited = Boolean(baseComment.edited || baseComment.text !== commentText);

        this.saveState('Update comment');
        this.updateCellDataEntry(coord, data => {
            data.comment = {
                ...baseComment,
                text: commentText,
                author,
                authorId,
                profileUrl,
                avatar,
                at: timestamp,
                anonymous: anonymousSelection,
                anonymousReason,
                localOnly: true,
                edited: wasEdited
            };
        });
        this.activeCommentEditTarget = null;
        this.refreshAllVisibleCells();
        this.updateCommentPopover();
        this.updateDirtyState();
    }

    saveReplyEdit(replyId) {
        if (!this.primaryCell || !replyId) return;
        const coord = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(coord) || {};
        const baseComment = this.ensureCommentIds(coord, this.normalizeCommentData(cellData.comment) || {});
        const replyIndex = Array.isArray(baseComment.replies) ? baseComment.replies.findIndex(r => `${r?.id || ''}` === `${replyId}`) : -1;
        if (replyIndex === -1) return;
        const replyInfo = baseComment.replies[replyIndex];
        if (!this.canEditCommentEntry(replyInfo)) return;
        const textarea = this.commentPopover?.querySelector(`[data-reply-textarea="${CSS.escape(replyId)}"]`);
        const anonToggle = this.commentPopover?.querySelector(`[data-reply-anon="${CSS.escape(replyId)}"]`);
        const nextText = (textarea?.value || '').trim();
        if (!nextText) {
            this.deleteCommentEntry(replyId);
            return;
        }
        const isLoggedIn = Boolean(this.currentUserLogin);
        const placeholderAuthor = this.getLocalAuthorPlaceholder();
        const anonymousOptIn = Boolean(anonToggle?.checked);
        const anonymousSelection = anonymousOptIn;
        const priorAuthor = `${replyInfo.author || ''}`.trim();
        const nonAnonAuthor = priorAuthor && priorAuthor.toLowerCase() !== 'anonymous' ? priorAuthor : '';
        const author = anonymousSelection
            ? 'Anonymous'
            : (this.currentUserLogin || nonAnonAuthor || placeholderAuthor || 'Anonymous');
        const authorId = anonymousSelection ? null : (replyInfo.authorId || this.currentUserLogin || null);
        const profileUrl = anonymousSelection ? '' : this.buildAccountProfileUrl(authorId);
        const avatar = anonymousSelection
            ? (replyInfo.avatar || this.getAnonymousAvatarData())
            : (this.getActiveUserAvatar() || replyInfo.avatar || this.getPlaceholderAvatarData());
        const timestamp = replyInfo.at ?? Date.now();
        const anonymousReason = anonymousSelection ? (!isLoggedIn ? 'unauthenticated' : 'opt-in') : null;
        const wasEdited = replyInfo.edited || replyInfo.text !== nextText;

        this.saveState('Update reply');
        this.updateCellDataEntry(coord, data => {
            const normalized = this.ensureCommentIds(coord, this.normalizeCommentData(data.comment) || {});
            const idx = normalized.replies.findIndex(r => `${r?.id || ''}` === `${replyId}`);
            if (idx === -1) return;
            normalized.replies[idx] = {
                ...normalized.replies[idx],
                text: nextText,
                author,
                authorId,
                profileUrl,
                avatar,
                at: timestamp,
                anonymous: anonymousSelection,
                anonymousReason,
                edited: wasEdited,
                localOnly: true
            };
            data.comment = normalized;
        });
        this.activeCommentEditTarget = null;
        this.replyAnonDrafts.delete(replyId);
        this.refreshAllVisibleCells();
        this.updateCommentPopover();
        this.updateDirtyState();
    }

    deleteCommentEntry(target) {
        if (!this.primaryCell) return;
        const coord = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(coord) || {};
        const baseComment = this.ensureCommentIds(coord, this.normalizeCommentData(cellData.comment) || {});
        if (target === 'root') {
            if (!this.canEditCommentEntry(baseComment)) return;
            this.saveState('Delete comment');
            this.updateCellDataEntry(coord, data => { delete data.comment; });
            this.replyAnonDrafts.clear();
        } else {
            const idx = Array.isArray(baseComment.replies) ? baseComment.replies.findIndex(r => `${r?.id || ''}` === `${target}`) : -1;
            if (idx === -1 || !this.canEditCommentEntry(baseComment.replies[idx])) return;
            this.saveState('Delete reply');
            this.updateCellDataEntry(coord, data => {
                const normalized = this.ensureCommentIds(coord, this.normalizeCommentData(data.comment) || {});
                normalized.replies = normalized.replies.filter(r => `${r?.id || ''}` !== `${target}`);
                data.comment = normalized;
            });
            this.replyAnonDrafts.delete(target);
        }
        this.activeCommentEditTarget = null;
        this.refreshAllVisibleCells();
        this.updateCommentPopover();
        this.updateDirtyState();
    }

    addReplyFromComposer() {
        if (!this.primaryCell) return;
        const coord = this.getCoord(this.primaryCell);
        const cellData = this.cellData.get(coord) || {};
        const baseComment = this.ensureCommentIds(coord, this.normalizeCommentData(cellData.comment) || {});
        if (!baseComment?.text) return;
        const replyText = (this.commentReplyTextarea?.value || '').trim();
        if (!replyText) {
            console.warn('[comments] Empty reply ignored', { coord });
            return;
        }

        const isLoggedIn = Boolean(this.currentUserLogin);
        const placeholderAuthor = this.getLocalAuthorPlaceholder();
        const anonymousOptIn = Boolean(this.commentReplyAnonymous?.checked);
        const anonymousSelection = anonymousOptIn;
        console.debug('[comments] Saving reply', {
            coord,
            text: replyText,
            anonymous: anonymousSelection,
            authorPlaceholder: placeholderAuthor,
            loggedIn: isLoggedIn
        });
        const priorAuthor = `${baseComment.author || ''}`.trim();
        const nonAnonAuthor = priorAuthor && priorAuthor.toLowerCase() !== 'anonymous' ? priorAuthor : '';
        const author = anonymousSelection
            ? 'Anonymous'
            : (this.currentUserLogin || nonAnonAuthor || placeholderAuthor || 'Anonymous');
        const authorId = anonymousSelection ? null : (this.currentUserLogin || baseComment.authorId || null);
        const profileUrl = anonymousSelection ? '' : this.buildAccountProfileUrl(authorId);
        const avatar = this.getActiveUserAvatar() || baseComment.avatar || this.getPlaceholderAvatarData();
        const timestamp = Date.now();
        const anonymousReason = anonymousSelection ? (!isLoggedIn ? 'unauthenticated' : 'opt-in') : null;
        const replyEntry = this.ensureCommentIds(coord, {
            text: replyText,
            author,
            authorId,
            profileUrl,
            avatar,
            at: timestamp,
            anonymous: anonymousSelection,
            anonymousReason,
            localOnly: true,
            reactions: [],
            id: this.generateCommentId(coord, 'r')
        });

        this.saveState('Reply to comment');
        const updated = this.updateCellDataEntry(coord, data => {
            const existingRaw = data.comment;
            const base = this.ensureCommentIds(coord, this.normalizeCommentData(existingRaw) || baseComment);
            if (!base) return;
            const replies = Array.isArray(base.replies) ? base.replies.slice() : [];
            replies.push(replyEntry);
            base.replies = replies;
            data.comment = base;
            return data;
        });

        if (this.commentReplyTextarea) this.commentReplyTextarea.value = '';
        if (updated) {
            const normalized = this.normalizeCommentData(updated.comment);
            const repliesToRender = Array.isArray(normalized?.replies) ? normalized.replies.filter(r => r?.text) : [];
            if (this.commentPopoverThread) {
                if (repliesToRender.length) {
                    this.commentPopoverThread.classList.remove('hidden');
                    this.commentPopoverThread.innerHTML = this.renderRepliesHTML(repliesToRender, coord, {
                        highlightId: this.highlightedReplyId,
                        allowAddReactions: Boolean(this.currentUserLogin)
                    });
                } else {
                    this.commentPopoverThread.classList.add('hidden');
                    this.commentPopoverThread.innerHTML = '';
                }
            }
        }
        this.refreshAllVisibleCells();
        this.updateCommentPopover();
        this.updateDirtyState();
    }

    toggleReaction(target, emoji) {
        if (!emoji) return;
        if (!this.currentUserLogin) {
            window.alert?.('Sign in to react to comments.');
            return;
        }
        if (!this.primaryCell) return;
        const coord = this.getCoord(this.primaryCell);
        const user = this.currentUserLogin;
        this.saveState('Toggle reaction');
        this.updateCellDataEntry(coord, data => {
            const normalized = this.ensureCommentIds(coord, this.normalizeCommentData(data.comment) || {});
            const entry = target === 'root'
                ? normalized
                : (normalized.replies || []).find(r => `${r?.id || ''}` === `${target}`);
            if (!entry) return;
            if (!Array.isArray(entry.reactions)) entry.reactions = [];
            let record = entry.reactions.find(r => r.emoji === emoji);
            if (!record) {
                record = { emoji, users: [] };
                entry.reactions.push(record);
            }
            const userSet = new Set(record.users.map(u => `${u}`));
            if (userSet.has(user)) {
                userSet.delete(user);
            } else {
                userSet.add(user);
            }
            record.users = Array.from(userSet);
            entry.reactions = entry.reactions.filter(r => Array.isArray(r.users) && r.users.length > 0);
            if (target === 'root') {
                normalized.reactions = entry.reactions;
            } else {
                normalized.replies = normalized.replies.map(r => `${r.id || ''}` === `${target}` ? entry : r);
            }
            data.comment = normalized;
        });
        this.refreshAllVisibleCells();
        this.updateCommentPopover();
        this.updateDirtyState();
    }

    promptAddReaction(target) {
        if (!this.currentUserLogin) {
            window.alert?.('Sign in to react to comments.');
            return;
        }
        const emoji = typeof window !== 'undefined' && window.prompt ? window.prompt('Enter an emoji to react with:') : '';
        if (!emoji) return;
        this.toggleReaction(target, emoji.trim());
    }

    copyCommentLink(target) {
        if (!this.primaryCell || typeof window === 'undefined') return;
        const coord = this.getCoord(this.primaryCell);
        const { row, col } = this.getCoordPos(coord);
        const address = this.getCellAddress(row, col);
        const url = new URL(window.location.href);
        url.searchParams.set('comment', address);
        if (target && target !== 'root') {
            url.searchParams.set('reply', target);
        } else {
            url.searchParams.delete('reply');
        }
        const href = url.toString();
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(href).catch(() => {
                window.prompt('Copy comment link:', href);
            });
        } else {
            window.prompt('Copy comment link:', href);
        }
    }

    pickStyleValue(row, col, prop, baseData = null) {
        const coordKey = `${row},${col}`;
        const cellData = baseData || this.cellData.get(coordKey) || {};
        const cellMeta = this.getCellStyleMeta(coordKey, false) || {};
        const rowEntry = this.getDimensionStyle('row', row, false);
        const colEntry = this.getDimensionStyle('column', col, false);
        const candidates = [];
        const addCandidate = (value, seq, priority) => {
            if (value === undefined) return;
            const numSeq = Number(seq);
            candidates.push({
                value,
                seq: Number.isFinite(numSeq) ? numSeq : 0,
                priority
            });
        };

        addCandidate(cellData[prop], cellMeta[prop], 3);
        addCandidate(rowEntry?.[prop], rowEntry?._meta?.[prop], 2);
        addCandidate(colEntry?.[prop], colEntry?._meta?.[prop], 1);
        addCandidate(this.defaultCellStyle[prop], this.defaultStyleMeta?.[prop], 0);

        if (!candidates.length) return undefined;
        candidates.sort((a, b) => {
            if (a.seq !== b.seq) return b.seq - a.seq;
            return b.priority - a.priority;
        });
        const top = candidates[0];
        if (top.value === null || top.value === undefined) return undefined;
        return top.value;
    }

    getEffectiveStyle(row, col, baseData = null) {
        const effective = {};
        STYLE_PROPS.forEach(prop => {
            const val = this.pickStyleValue(row, col, prop, baseData);
            if (val !== undefined) {
                effective[prop] = val;
            }
        });
        return effective;
    }

    getEffectiveCellProperty(coord, prop) {
        const { row, col } = this.getCoordPos(coord);
        return this.pickStyleValue(row, col, prop);
    }

    updateCellDisplay(cell, d = {}) {
        if (cell.classList.contains('editing')) {
            return;
        }
        const coord = this.getCoord(cell);
        const { row, col } = this.getCellPos(cell);
        const hadCutPreview = cell.classList.contains('cut-preview');
        const hadCutGhost = cell.classList.contains('cut-ghost');
        const hasData = d && Object.keys(d).length > 0;
        const ghostText = !hasData && cell.dataset.cutGhost ? cell.dataset.cutGhost : null;
        let ghostFormatting = null;
        if (!hasData && cell.dataset.cutGhostData) {
            try {
                ghostFormatting = JSON.parse(cell.dataset.cutGhostData);
            } catch (err) {
                ghostFormatting = null;
            }
        }
        const baseData = hasData ? d : (ghostFormatting || {});
        const baseValue = hasData ? d.value : ghostFormatting?.value;
        const richText = hasData ? d.richText : ghostFormatting?.richText;
        const commentInfo = this.normalizeCommentData(baseData.comment);
        const hasComment = Boolean(commentInfo?.text);
        const commentText = commentInfo?.text || '';
        const commentAuthor = commentInfo?.author || '';
        const commentTime = this.formatCommentTimestamp(commentInfo?.at);
        const commentTooltip = this.buildCommentTooltip(commentInfo) || commentText;
        
        // Handle display text based on value type
        let displayText = '';
        let isLink = false;
        if (ghostText) {
            displayText = ghostText;
        } else if (baseValue) {
            if (baseValue.startsWith("'")) {
                displayText = baseValue.substring(1);
            } else if (baseValue.startsWith('=')) {
                displayText = this.parseFormula(baseValue, row, col);
            } else {
                displayText = baseValue;
            }
        }

        if (displayText === undefined || displayText === null) {
            displayText = '';
        } else if (typeof displayText !== 'string') {
            displayText = String(displayText);
        }
        
        isLink = !!(baseData.linkUrl || this.isHyperlink(displayText));
        const canUseRichText = richText && !(baseValue && String(baseValue).startsWith('='));

        if (canUseRichText && displayText.trim() !== '') {
            cell.innerHTML = richText;
        } else {
            cell.textContent = displayText;
        }
        
        // Handle text overflow into adjacent cells
        this.handleCellOverflow(cell, displayText, baseData, canUseRichText ? richText : null);
        
        const effective = this.getEffectiveStyle(row, col, baseData);

        // If we now have real data, clear any stale ghost markers
        if (hasData && cell.dataset.cutGhost) {
            delete cell.dataset.cutGhost;
        }
        if (hasData && cell.dataset.cutGhostData) {
            delete cell.dataset.cutGhostData;
        }

        const keepCutPreview = ghostText || hadCutPreview;
        const keepCutGhost = ghostText || hadCutGhost;

        cell.className = ['cell',
            effective.bold && 'bold',
            effective.italic && 'italic',
            effective.underline && 'underline',
            effective.strikethrough && 'strikethrough',
            effective.textAlign && `align-${effective.textAlign}`,
            effective.verticalAlign && `align-${effective.verticalAlign}`,
            this.selectedCellCoords.has(coord) && 'selected',
            this.primaryCellCoord === coord && 'primary-selected',
            isLink && 'cell-link',
            keepCutPreview && 'cut-preview',
            keepCutGhost && 'cut-ghost',
            hasComment && 'has-comment'
        ].filter(Boolean).join(' ');
        
        cell.style.backgroundColor = effective.backgroundColor || '';
        cell.style.color = effective.fontColor || '';
        cell.style.fontSize = effective.fontSize ? effective.fontSize + 'px' : '';
        
        const mergeParent = this.getMergeParent(row, col);
        const borderDataCoord = mergeParent ? `${mergeParent.row},${mergeParent.col}` : coord;
        const borderData = mergeParent ? (this.cellData.get(borderDataCoord) || d) : d;

        const neighborKey = (r, c) => `${r},${c}`;
        const isSameMerge = (nRow, nCol) => {
            if (!mergeParent) return false;
            const neighborParent = this.getMergeParent(nRow, nCol);
            return neighborParent &&
                neighborParent.row === mergeParent.row &&
                neighborParent.col === mergeParent.col;
        };
        const getNeighborInfo = (nRow, nCol) => {
            if (nRow < 0 || nCol < 0 || nRow >= this.config.maxRows || nCol >= this.config.maxCols) {
                return { data: null, rendered: false };
            }
            if (isSameMerge(nRow, nCol)) {
                return { data: null, rendered: false };
            }
            return {
                data: this.cellData.get(neighborKey(nRow, nCol)) || null,
                rendered: this.renderedCellCoords.has(neighborKey(nRow, nCol))
            };
        };

        const aboveInfo = getNeighborInfo(row - 1, col);
        const belowInfo = getNeighborInfo(row + 1, col);
        const leftInfo = getNeighborInfo(row, col - 1);
        const rightInfo = getNeighborInfo(row, col + 1);

        const topBorder = this._resolveSharedBorder(
            borderData?.borders?.top || '',
            aboveInfo.data?.borders?.bottom,
            aboveInfo.rendered,
            true
        );
        const bottomBorder = this._resolveSharedBorder(
            borderData?.borders?.bottom || '',
            belowInfo.data?.borders?.top,
            belowInfo.rendered,
            false
        );
        const leftBorder = this._resolveSharedBorder(
            borderData?.borders?.left || '',
            leftInfo.data?.borders?.right,
            leftInfo.rendered,
            true
        );
        const rightBorder = this._resolveSharedBorder(
            borderData?.borders?.right || '',
            rightInfo.data?.borders?.left,
            rightInfo.rendered,
            false
        );

        // Do not draw applied borders inline to avoid double thickness;
        // rely on overlay for custom borders.
        cell.style.borderTop = '';
        cell.style.borderRight = '';
        cell.style.borderBottom = '';
        cell.style.borderLeft = '';

        // Store resolved borders for overlay rendering
        cell.dataset.borderTop = topBorder || '';
        cell.dataset.borderRight = rightBorder || '';
        cell.dataset.borderBottom = bottomBorder || '';
        cell.dataset.borderLeft = leftBorder || '';

        const existingIndicator = cell.querySelector('.cell-comment-indicator');
        if (hasComment) {
            cell.dataset.comment = commentText;
            if (commentAuthor) cell.dataset.commentAuthor = commentAuthor;
            else delete cell.dataset.commentAuthor;
            if (commentInfo?.at) cell.dataset.commentAt = String(commentInfo.at);
            else delete cell.dataset.commentAt;
            if (commentTime) cell.dataset.commentTime = commentTime;
            else delete cell.dataset.commentTime;
            if (existingIndicator) {
                existingIndicator.title = commentTooltip;
            } else {
                const indicator = document.createElement('span');
                indicator.className = 'cell-comment-indicator';
                indicator.textContent = '💬';
                indicator.title = commentTooltip;
                indicator.setAttribute('aria-hidden', 'true');
                cell.appendChild(indicator);
            }
        } else {
            if (existingIndicator) {
                existingIndicator.remove();
            }
            delete cell.dataset.comment;
            delete cell.dataset.commentAuthor;
            delete cell.dataset.commentAt;
            delete cell.dataset.commentTime;
        }
    }

    getEffectiveCellWidth(cell, col) {
        if (!cell) return this.getColumnWidth(col);
        const mergedCols = parseInt(cell.dataset.mergedCols || '1', 10);
        if (mergedCols > 1) {
            let total = 0;
            for (let i = 0; i < mergedCols; i++) {
                total += this.getColumnWidth(col + i);
            }
            return total || (cell.offsetWidth || this.getColumnWidth(col));
        }
        return cell.offsetWidth || parseFloat(cell.style.width) || this.getColumnWidth(col);
    }

    getInlineFormattingState(editor) {
        if (!editor) return null;
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return null;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return null;
        const qState = (cmd) => {
            if (typeof document.queryCommandState === 'function') {
                try { return document.queryCommandState(cmd); } catch (e) { return null; }
            }
            return null;
        };
        
        // If selection spans multiple segments, detect mixed state using rendered styles
        const sampled = {
            bold: { hasTrue: false, hasFalse: false },
            italic: { hasTrue: false, hasFalse: false },
            underline: { hasTrue: false, hasFalse: false },
            strikethrough: { hasTrue: false, hasFalse: false }
        };
        const recordSample = (bucket, value) => {
            if (value) bucket.hasTrue = true;
            else bucket.hasFalse = true;
        };
        if (!range.collapsed) {
            const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
            let node = walker.nextNode();
            while (node) {
                if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                    const targetEl = node.parentElement || editor;
                    const style = window.getComputedStyle(targetEl);
                    const weight = style.fontWeight;
                    const isBold = (weight === 'bold') || (!isNaN(parseInt(weight, 10)) && parseInt(weight, 10) >= 600);
                    const isItalic = style.fontStyle === 'italic' || style.fontStyle === 'oblique';
                    const deco = (style.textDecorationLine || style.textDecoration || '').toLowerCase();
                    const isUnderline = deco.includes('underline');
                    const isStrike = deco.includes('line-through');
                    recordSample(sampled.bold, isBold);
                    recordSample(sampled.italic, isItalic);
                    recordSample(sampled.underline, isUnderline);
                    recordSample(sampled.strikethrough, isStrike);
                }
                node = walker.nextNode();
            }
        }

        const resolveMixed = (bucket, fallback) => {
            if (bucket.hasTrue && bucket.hasFalse) return false; // mixed -> treat as off
            if (bucket.hasTrue) return true;
            if (bucket.hasFalse) return false;
            return fallback;
        };
        
        let bold = qState('bold');
        let italic = qState('italic');
        let underline = qState('underline');
        let strikethrough = qState('strikeThrough');

        if ([bold, italic, underline, strikethrough].some(v => v === null)) {
            let node = range.startContainer;
            if (node.nodeType === Node.TEXT_NODE) {
                node = node.parentElement;
            }
            if (node) {
                const style = window.getComputedStyle(node);
                const weight = style.fontWeight;
                bold = bold ?? (weight === 'bold' || parseInt(weight, 10) >= 600);
                italic = italic ?? (style.fontStyle === 'italic' || style.fontStyle === 'oblique');
                const deco = (style.textDecorationLine || style.textDecoration || '').toLowerCase();
                underline = underline ?? deco.includes('underline');
                strikethrough = strikethrough ?? deco.includes('line-through');
            }
        }

        return {
            bold: resolveMixed(sampled.bold, !!bold),
            italic: resolveMixed(sampled.italic, !!italic),
            underline: resolveMixed(sampled.underline, !!underline),
            strikethrough: resolveMixed(sampled.strikethrough, !!strikethrough)
        };
    }

    getEditorSelectionFontSize(editor) {
        if (!editor || typeof window.getSelection !== 'function') return null;
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return null;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return null;

        const collectSize = (node) => {
            const el = node && node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
            const size = parseFloat(window.getComputedStyle(el || editor).fontSize);
            return Number.isFinite(size) ? Math.round(size) : null;
        };

        if (range.collapsed) {
            return collectSize(range.startContainer);
        }

        const sizes = new Set();
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        while (node) {
            if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                const size = collectSize(node);
                if (size !== null) sizes.add(size);
                if (sizes.size > 1) break; // mixed; bail early
            }
            node = walker.nextNode();
        }
        if (sizes.size === 1) {
            return Array.from(sizes)[0];
        }
        return null;
    }

    getSelectionOffsets(editor, range) {
        if (!editor || !range) return null;
        const startMeasure = document.createRange();
        startMeasure.selectNodeContents(editor);
        startMeasure.setEnd(range.startContainer, range.startOffset);
        const endMeasure = document.createRange();
        endMeasure.selectNodeContents(editor);
        endMeasure.setEnd(range.endContainer, range.endOffset);
        return { start: startMeasure.toString().length, end: endMeasure.toString().length };
    }

    restoreSelectionFromOffsets(editor, offsets) {
        if (!editor || !offsets || offsets.start == null || offsets.end == null) return;
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        let consumed = 0;
        let startNode = null, endNode = null, startOffset = 0, endOffset = 0, lastNode = null;

        while (node) {
            const len = node.nodeValue?.length || 0;
            const next = consumed + len;
            if (!startNode && offsets.start <= next) {
                startNode = node;
                startOffset = Math.max(0, offsets.start - consumed);
            }
            if (!endNode && offsets.end <= next) {
                endNode = node;
                endOffset = Math.max(0, offsets.end - consumed);
            }
            consumed = next;
            lastNode = node;
            node = walker.nextNode();
        }

        if (!endNode && lastNode) {
            endNode = lastNode;
            endOffset = lastNode.nodeValue ? lastNode.nodeValue.length : 0;
        }

        if (startNode && endNode) {
            const sel = window.getSelection();
            if (!sel) return;
            const newRange = document.createRange();
            newRange.setStart(startNode, startOffset);
            newRange.setEnd(endNode, endOffset);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }

    ensureCollapsedTypingFormat(editor, format, enable = true) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!range.collapsed || !editor.contains(range.commonAncestorContainer)) return;

        const span = document.createElement('span');
        const textNode = document.createTextNode('\u200b');
        switch (format) {
            case 'bold':
                span.style.fontWeight = enable ? 'bold' : 'normal';
                span.dataset.bold = enable ? 'true' : 'false';
                break;
            case 'italic':
                span.style.fontStyle = enable ? 'italic' : 'normal';
                span.dataset.italic = enable ? 'true' : 'false';
                break;
            case 'underline':
                span.style.textDecoration = enable ? 'underline' : 'none';
                span.dataset.underline = enable ? 'true' : 'false';
                break;
            case 'strikethrough':
                span.style.textDecoration = enable ? 'line-through' : 'none';
                span.dataset.strikethrough = enable ? 'true' : 'false';
                break;
            default:
                return;
        }
        span.appendChild(textNode);
        range.insertNode(span);
        range.setStart(textNode, textNode.length);
        range.setEnd(textNode, textNode.length);
        selection.removeAllRanges();
        selection.addRange(range);
        return span;
    }

    ensureCollapsedTypingColor(editor, color) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!range.collapsed || !editor.contains(range.commonAncestorContainer)) return;

        const span = document.createElement('span');
        const textNode = document.createTextNode('\u200b');
        if (color) {
            span.style.color = color;
        } else {
            span.style.color = 'inherit';
        }
        span.appendChild(textNode);
        range.insertNode(span);
        range.setStart(textNode, textNode.length);
        range.setEnd(textNode, textNode.length);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    computeFormattingForNode(node) {
        const el = node && node.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
        if (!el) {
            return {
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
                color: '',
                backgroundColor: '',
                fontSize: ''
            };
        }
        const style = window.getComputedStyle(el);
        const weight = style.fontWeight;
        const bold = (weight === 'bold') || (!isNaN(parseInt(weight, 10)) && parseInt(weight, 10) >= 600);
        const italic = style.fontStyle === 'italic' || style.fontStyle === 'oblique';
        const deco = (style.textDecorationLine || style.textDecoration || '').toLowerCase();
        const underline = deco.includes('underline');
        const strikethrough = deco.includes('line-through');
        return {
            bold,
            italic,
            underline,
            strikethrough,
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize
        };
    }
    
    ensureCollapsedTypingFontSize(editor, fontSize) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!range.collapsed || !editor.contains(range.commonAncestorContainer)) return;

        const span = document.createElement('span');
        const textNode = document.createTextNode('\u200b');
        span.style.fontSize = `${fontSize}px`;
        span.appendChild(textNode);
        range.insertNode(span);
        range.setStart(textNode, textNode.length);
        range.setEnd(textNode, textNode.length);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    getMaxFontSizeInEditor(editor) {
        if (!editor) return null;
        let max = null;
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        while (node) {
            if (node.nodeValue && node.nodeValue.length) {
                const el = node.parentElement || editor;
                const size = parseFloat(window.getComputedStyle(el).fontSize);
                if (Number.isFinite(size)) {
                    max = max === null ? size : Math.max(max, size);
                }
            }
            node = walker.nextNode();
        }
        return max;
    }

    syncEditorLineHeight(editor) {
        if (!editor) return;
        const maxSize = this.getMaxFontSizeInEditor(editor);
        if (!Number.isFinite(maxSize) || maxSize <= 0) {
            editor.style.lineHeight = '';
            return;
        }
        const lh = Math.max(maxSize * (this.cellLineHeightMultiplier || 1.2), maxSize);
        editor.style.lineHeight = `${lh}px`;
    }

    applyInlineRowHeightAdjustment(row, maxFontSize) {
        if (!Number.isFinite(row) || !Number.isFinite(maxFontSize)) return;
        if (this.rowHeightModes.get(row) === 'explicit') return;
        const baseHeight = this.getDefaultRowHeightForRow(row);
        const desired = this.computeRowHeightForFontSize(maxFontSize);
        const existing = this.autoRowHeights.get(row);
        let changed = false;

        if (desired > baseHeight) {
            if (existing !== desired) {
                this.autoRowHeights.set(row, desired);
                this.rowHeightModes.set(row, 'implicit');
                changed = true;
            }
        } else {
            if (this.autoRowHeights.has(row)) {
                this.autoRowHeights.delete(row);
                if (this.rowHeightModes.get(row) === 'implicit') {
                    this.rowHeightModes.delete(row);
                }
                changed = true;
            }
        }

        if (changed) {
            this.refreshLayoutAfterRowHeightChange();
        }
    }

    applyInlineFontSize(editor, fontSize) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return false;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return false;

        if (range.collapsed) {
            this.ensureCollapsedTypingFontSize(editor, fontSize);
            return true;
        }

        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        const affected = [];
        let node = walker.nextNode();
        const baselineColor = window.getComputedStyle(editor).color;
        const hasInlineStyleProp = (textNode, regex) => {
            let el = textNode.parentElement;
            while (el && el !== editor) {
                const styleAttr = typeof el.getAttribute === 'function' ? el.getAttribute('style') : '';
                if (styleAttr && regex.test(styleAttr)) return true;
                const legacy = regex.test((typeof el.getAttribute === 'function' ? el.getAttribute('color') : '') || '');
                if (legacy) return true;
                el = el.parentElement;
            }
            return false;
        };
        while (node) {
            if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                let start = 0;
                let end = node.length;
                if (node === range.startContainer) start = range.startOffset;
                if (node === range.endContainer) end = Math.min(end, range.endOffset);
                if (start >= end) {
                    node = walker.nextNode();
                    continue;
                }
                if (start > 0) node = node.splitText(start);
                if (end < node.length) node.splitText(end - start);
                affected.push(node);
            }
            node = walker.nextNode();
        }

        if (!affected.length) return false;

        affected.forEach(textNode => {
            const fmt = this.computeFormattingForNode(textNode);
            const wrapper = document.createElement('span');
            wrapper.style.fontSize = `${fontSize}px`;

            const allowInlineColor = hasInlineStyleProp(textNode, /\bcolor\s*:/i);
            const allowInlineBg = hasInlineStyleProp(textNode, /\bbackground(-color)?\s*:/i);
            if (allowInlineColor && fmt.color && fmt.color !== baselineColor) {
                wrapper.style.color = fmt.color;
            }
            if (allowInlineBg && fmt.backgroundColor && fmt.backgroundColor !== 'transparent' && fmt.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                wrapper.style.backgroundColor = fmt.backgroundColor;
            }

            wrapper.dataset.bold = fmt.bold ? 'true' : 'false';
            wrapper.style.fontWeight = fmt.bold ? 'bold' : 'normal';
            wrapper.dataset.italic = fmt.italic ? 'true' : 'false';
            wrapper.style.fontStyle = fmt.italic ? 'italic' : 'normal';
            wrapper.dataset.underline = fmt.underline ? 'true' : 'false';
            wrapper.dataset.strikethrough = fmt.strikethrough ? 'true' : 'false';
            const decos = [];
            if (fmt.underline) decos.push('underline');
            if (fmt.strikethrough) decos.push('line-through');
            if (decos.length) {
                wrapper.style.textDecoration = decos.join(' ');
            } else {
                wrapper.style.textDecoration = 'none';
            }

            textNode.parentNode.insertBefore(wrapper, textNode);
            wrapper.appendChild(textNode);
        });

        const newRange = document.createRange();
        newRange.setStart(affected[0], 0);
        newRange.setEnd(affected[affected.length - 1], affected[affected.length - 1].length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        return true;
    }

    applyInlineColorToRange(range, color, editor) {
        const selection = window.getSelection();
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        const affected = [];
        let node = walker.nextNode();
        while (node) {
            if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                let start = 0;
                let end = node.length;
                if (node === range.startContainer) start = range.startOffset;
                if (node === range.endContainer) end = Math.min(end, range.endOffset);
                if (start >= end) {
                    node = walker.nextNode();
                    continue;
                }
                if (start > 0) {
                    node = node.splitText(start);
                }
                if (end < node.length) {
                    node.splitText(end - start);
                }
                affected.push(node);
            }
            node = walker.nextNode();
        }
        if (!affected.length) return;

        affected.forEach(textNode => {
            const wrapper = document.createElement('span');
            if (color) {
                wrapper.style.color = color;
            } else {
                wrapper.style.color = 'inherit';
            }

            // Preserve existing formatting for this segment
            const fmt = this.computeFormattingForNode(textNode);
            if (fmt.bold) {
                wrapper.dataset.bold = 'true';
                wrapper.style.fontWeight = 'bold';
            }
            if (fmt.italic) {
                wrapper.dataset.italic = 'true';
                wrapper.style.fontStyle = 'italic';
            }
            const decorations = [];
            if (fmt.underline) {
                wrapper.dataset.underline = 'true';
                decorations.push('underline');
            }
            if (fmt.strikethrough) {
                wrapper.dataset.strikethrough = 'true';
                decorations.push('line-through');
            }
            if (decorations.length) {
                wrapper.style.textDecoration = decorations.join(' ');
            }

            textNode.parentNode.insertBefore(wrapper, textNode);
            wrapper.appendChild(textNode);
        });

        if (selection) {
            const newRange = document.createRange();
            newRange.setStart(affected[0], 0);
            newRange.setEnd(affected[affected.length - 1], affected[affected.length - 1].length);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }
    
    elementCarriesFormat(el, format) {
        if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
        const ds = el.dataset || {};
        if (ds[format] === 'true') return true;
        const style = el.style || {};
        if (format === 'bold' && style.fontWeight && style.fontWeight !== 'normal' && style.fontWeight !== '400') return true;
        if (format === 'italic' && style.fontStyle && style.fontStyle !== 'normal') return true;
        if (format === 'underline' || format === 'strikethrough') {
            const deco = (style.textDecoration || style.textDecorationLine || '').toLowerCase();
            if (format === 'underline' && deco.includes('underline')) return true;
            if (format === 'strikethrough' && deco.includes('line-through')) return true;
        }
        return false;
    }

    liftFormatFromAncestor(node, format, editor) {
        if (!node || !node.parentElement) return;
        let current = node.parentElement;
        while (current && current !== editor) {
            if (this.elementCarriesFormat(current, format)) {
                const beforeNodes = [];
                const afterNodes = [];
                let seen = false;
                Array.from(current.childNodes).forEach(child => {
                    if (child === node) {
                        seen = true;
                        return;
                    }
                    (seen ? afterNodes : beforeNodes).push(child);
                });

                const frag = document.createDocumentFragment();
                if (beforeNodes.length) {
                    const beforeClone = current.cloneNode(false);
                    beforeNodes.forEach(n => beforeClone.appendChild(n));
                    frag.appendChild(beforeClone);
                }
                frag.appendChild(node);
                if (afterNodes.length) {
                    const afterClone = current.cloneNode(false);
                    afterNodes.forEach(n => afterClone.appendChild(n));
                    frag.appendChild(afterClone);
                }
                current.replaceWith(frag);
                current = node.parentElement;
                continue;
            }
            current = current.parentElement;
        }
    }

    applyInlineFormatToRange(range, format, enable, editor, state = null) {
        const selection = window.getSelection();
        const segments = [];
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        while (node) {
            if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                const start = node === range.startContainer ? range.startOffset : 0;
                const end = node === range.endContainer ? Math.min(node.length, range.endOffset) : node.length;
                if (start < end) {
                    segments.push({ node, start, end });
                }
            }
            node = walker.nextNode();
        }

        if (!segments.length) return null;

        const affected = [];
        const wrappers = [];
        segments.forEach(({ node: originalNode, start, end }) => {
            let textNode = originalNode;
            if (start > 0) {
                textNode = textNode.splitText(start);
            }
            if ((end - start) < textNode.length) {
                textNode.splitText(end - start);
            }
            affected.push(textNode);

            const currentFmt = this.computeFormattingForNode(textNode);
            const sourceSpan = (textNode.parentElement && textNode.parentElement.tagName === 'SPAN') ? textNode.parentElement : null;
            const wrapper = document.createElement('span');

            // Preserve existing inline styles/data attributes from the immediate span ancestor
            if (sourceSpan) {
                Array.from(sourceSpan.attributes).forEach(attr => {
                    if (attr.name === 'style' || attr.name.startsWith('data-')) {
                        wrapper.setAttribute(attr.name, attr.value);
                    }
                });
            }

            const resolveExisting = (key, fallback) => {
                if (wrapper.dataset[key] === 'true') return true;
                if (wrapper.dataset[key] === 'false') return false;
                return fallback;
            };

            const bold = format === 'bold' ? enable : resolveExisting('bold', currentFmt.bold);
            const italic = format === 'italic' ? enable : resolveExisting('italic', currentFmt.italic);
            const underline = format === 'underline' ? enable : resolveExisting('underline', currentFmt.underline);
            const strikethrough = format === 'strikethrough' ? enable : resolveExisting('strikethrough', currentFmt.strikethrough);

            wrapper.dataset.bold = bold ? 'true' : 'false';
            wrapper.style.fontWeight = bold ? 'bold' : 'normal';
            wrapper.dataset.italic = italic ? 'true' : 'false';
            wrapper.style.fontStyle = italic ? 'italic' : 'normal';
            wrapper.dataset.underline = underline ? 'true' : 'false';
            wrapper.dataset.strikethrough = strikethrough ? 'true' : 'false';

            const decos = [];
            if (underline) decos.push('underline');
            if (strikethrough) decos.push('line-through');
            if (decos.length) {
                wrapper.style.textDecoration = decos.join(' ');
            } else {
                wrapper.style.textDecoration = 'none';
            }

            if (!wrapper.style.fontSize && currentFmt.fontSize) {
                wrapper.style.fontSize = currentFmt.fontSize;
            }

            if (!wrapper.style.color && currentFmt.color) {
                wrapper.style.color = currentFmt.color;
            }
            if (!wrapper.style.backgroundColor && currentFmt.backgroundColor && currentFmt.backgroundColor !== 'transparent' && currentFmt.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                wrapper.style.backgroundColor = currentFmt.backgroundColor;
            }

            if (textNode.parentNode) {
                textNode.parentNode.insertBefore(wrapper, textNode);
                wrapper.appendChild(textNode);
                wrappers.push(wrapper);
            }
        });

        if (selection) {
            const newRange = document.createRange();
            newRange.setStart(affected[0], 0);
            newRange.setEnd(affected[affected.length - 1], affected[affected.length - 1].length);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
        return {
            wrappers,
            startWrapper: wrappers[0] || null,
            endWrapper: wrappers[wrappers.length - 1] || null,
            endOffset: affected[affected.length - 1]?.length || 0
        };
    }
    
    handleCellOverflow(cell, displayText, cellData, richText) {
        const { row, col } = this.getCellPos(cell);
        const normalizedText = (displayText === undefined || displayText === null) ? '' : String(displayText);
        const effective = { ...this.defaultCellStyle, ...cellData };
        const isLink = !!(cellData.linkUrl || this.isHyperlink(normalizedText));
        
        // Remove any existing overflow styling and wrapper
        cell.style.overflow = '';
        cell.style.textOverflow = '';
        cell.style.whiteSpace = '';
        cell.style.zIndex = '';
        cell.style.pointerEvents = '';
        
        // Remove any existing text wrapper
        const existingWrapper = cell.querySelector('.cell-text-wrapper');
        if (existingWrapper) {
            if (richText) {
                cell.innerHTML = richText;
            } else {
                cell.textContent = existingWrapper.textContent;
            }
        }
        
        // If cell has no content, use default overflow behavior
        if (!normalizedText || normalizedText.trim() === '') {
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            if (richText) {
                cell.innerHTML = richText;
            }
            return;
        }
        
        // If this cell has content, it should render on top of overflow from adjacent cells
        if (normalizedText.trim() !== '') {
            cell.style.zIndex = '6';
        }
        
        // Check if text fits within the cell
        const cellWidth = this.getEffectiveCellWidth(cell, col);
        const textWidth = richText ? this.measureRichTextHTMLWidth(richText, cell) : this.measureTextWidth(normalizedText, cell);
        const padding = 16;
        
        if (textWidth <= cellWidth - padding) {
            // Text fits, no overflow needed
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            if (richText) {
                cell.innerHTML = richText;
            } else {
                cell.textContent = normalizedText;
            }
            return;
        }
        
        // Text doesn't fit - calculate available overflow space based on alignment
        const textAlign = effective.textAlign ?? 'left';
        const verticalAlign = effective.verticalAlign ?? 'bottom';
        
        // Helper function to check if a cell has content
        const cellHasContent = (r, c) => {
            const coordKey = `${r},${c}`;
            const data = this.cellData.get(coordKey);
            if (!data || data.value === undefined || data.value === null) {
                return false;
            }
            const rawValue = typeof data.value === 'string' ? data.value : String(data.value);
            return rawValue.trim() !== '';
        };
        
        // Calculate available space for overflow
        let availableLeftSpace = 0;
        let availableRightSpace = 0;
        
        // Calculate available space to the left until blocked
        for (let c = col - 1; c >= Math.max(0, col - 20); c--) {
            if (cellHasContent(row, c)) {
                break;
            }
            availableLeftSpace += this.getColumnWidth(c);
        }
        
        // Calculate available space to the right until blocked
        for (let c = col + 1; c < Math.min(this.config.maxCols, col + 21); c++) {
            if (cellHasContent(row, c)) {
                break;
            }
            availableRightSpace += this.getColumnWidth(c);
        }
        
        let wrapperWidth, wrapperLeft, clipLeft = 0, clipRight = 0;
        
        // For left-aligned: text starts at left edge of cell, extends right
        if (textAlign === 'left' || !textAlign) {
            wrapperWidth = cellWidth + availableRightSpace;
            wrapperLeft = 0;
        }
        // For right-aligned: text ends at right edge of cell, extends left
        else if (textAlign === 'right') {
            wrapperWidth = cellWidth + availableLeftSpace;
            wrapperLeft = -availableLeftSpace;
        }
        // For center-aligned: text is centered in cell, extends in both directions
        else if (textAlign === 'center') {
            // FIXED: For center alignment, we keep the wrapper centered on the cell
            // even if text doesn't fit. This matches Google Sheets behavior.
            const extraSpaceNeeded = textWidth - (cellWidth - padding);
            const halfSpace = extraSpaceNeeded / 2;
            
            // The wrapper should be wide enough to hold all text
            wrapperWidth = Math.max(cellWidth, textWidth + padding);
            
            // Position wrapper so it's centered on the cell
            // This means text will overflow equally on both sides (or as much as possible)
            wrapperLeft = -(wrapperWidth - cellWidth) / 2;
            
            // Calculate clipping based on what's actually available
            const leftOverhang = Math.max(0, halfSpace - availableLeftSpace);
            const rightOverhang = Math.max(0, halfSpace - availableRightSpace);
            
            if (leftOverhang > 0) {
                clipLeft = leftOverhang;
            }
            if (rightOverhang > 0) {
                clipRight = rightOverhang;
            }
        }
        
        // Always allow overflow (the text stays in place, adjacent cells cover it)
        cell.style.overflow = 'visible';
        cell.style.whiteSpace = 'nowrap';
        cell.style.zIndex = '5'; // Lower than cells with content (which have z-index 6)
        
        // Create wrapper positioned absolutely
        const textWrapper = document.createElement('div');
        textWrapper.className = 'cell-text-wrapper';
        textWrapper.style.pointerEvents = 'none';
        textWrapper.style.position = 'absolute';
        textWrapper.style.left = wrapperLeft + 'px';
        textWrapper.style.top = '0';
        textWrapper.style.width = wrapperWidth + 'px';
        textWrapper.style.height = '100%';
        textWrapper.style.display = 'flex';
        textWrapper.style.overflowX = 'visible';
        textWrapper.style.overflowY = 'hidden';
        textWrapper.style.paddingLeft = 'var(--space-8)';
        textWrapper.style.paddingRight = 'var(--space-8)';
        textWrapper.style.paddingTop = 'var(--space-6)';
        textWrapper.style.paddingBottom = 'var(--space-6)';
        textWrapper.style.maxHeight = '100%';
        
        // Map vertical alignment
        const alignItemsMap = {
            'top': 'flex-start',
            'middle': 'center',
            'bottom': 'flex-end'
        };
        textWrapper.style.alignItems = alignItemsMap[verticalAlign] || 'flex-end';
        
        // Map horizontal alignment
        const justifyContentMap = {
            'left': 'flex-start',
            'center': 'center',
            'right': 'flex-end'
        };
        textWrapper.style.justifyContent = justifyContentMap[textAlign] || 'flex-start';
        
        // Create inner span for text
        const textSpan = document.createElement('span');
        textSpan.style.overflow = 'hidden';
        textSpan.style.whiteSpace = 'nowrap';
        textSpan.style.maxWidth = (wrapperWidth - padding) + 'px';
        if (richText) {
            textSpan.innerHTML = richText;
        } else {
            textSpan.textContent = normalizedText;
        }
        const decorationParts = [];
        if (effective.underline || isLink) decorationParts.push('underline');
        if (effective.strikethrough) decorationParts.push('line-through');
        if (decorationParts.length) {
            textSpan.style.textDecorationLine = decorationParts.join(' ');
            textSpan.style.textDecorationColor = effective.fontColor || 'currentColor';
        } else {
            textSpan.style.textDecoration = 'none';
        }
        
        textWrapper.appendChild(textSpan);
        cell.textContent = '';
        cell.appendChild(textWrapper);
        
        // Clip vertically to the cell height while still allowing horizontal overflow
        const clipPath = `inset(0 ${clipRight}px 0 ${clipLeft}px)`;
        textWrapper.style.clipPath = clipPath;
    }

    measureTextWidth(text, cell) {
        // Create a temporary span to measure text width
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        
        // Copy relevant styles from the cell
        const computedStyle = window.getComputedStyle(cell);
        span.style.font = computedStyle.font;
        span.style.fontSize = computedStyle.fontSize;
        span.style.fontWeight = computedStyle.fontWeight;
        span.style.fontFamily = computedStyle.fontFamily;
        span.style.fontStyle = computedStyle.fontStyle;
        
        span.textContent = text;
        document.body.appendChild(span);
        
        const width = span.offsetWidth;
        document.body.removeChild(span);
        
        return width;
    }

    measureRichTextHTMLWidth(html, cell) {
        if (!html) return 0;
        const span = document.createElement('div');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        span.style.pointerEvents = 'none';

        const computedStyle = window.getComputedStyle(cell);
        span.style.font = computedStyle.font;
        span.style.fontSize = computedStyle.fontSize;
        span.style.fontWeight = computedStyle.fontWeight;
        span.style.fontFamily = computedStyle.fontFamily;
        span.style.fontStyle = computedStyle.fontStyle;
        span.style.lineHeight = computedStyle.lineHeight;
        span.innerHTML = html;

        document.body.appendChild(span);
        const width = span.offsetWidth;
        document.body.removeChild(span);
        return width;
    }

    measureEditorContentWidth(editor) {
        if (!editor) return 0;
        const clone = editor.cloneNode(false);
        clone.className = editor.className;
        if (editor.getAttribute('style')) {
            clone.setAttribute('style', editor.getAttribute('style'));
        }
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        clone.style.width = 'auto';
        clone.style.maxWidth = 'none';
        clone.style.minWidth = '0';
        clone.style.whiteSpace = 'nowrap';
        clone.style.outline = 'none';
        clone.style.pointerEvents = 'none';
        clone.style.display = 'inline-block';
        const sanitized = this.sanitizeRichTextHTML(editor.innerHTML);
        clone.innerHTML = sanitized;
        document.body.appendChild(clone);
        const width = clone.scrollWidth;
        document.body.removeChild(clone);
        return width;
    }
    
    isHyperlink(text) {
        if (!text) return false;
        // Check for common URL patterns
        const urlPattern = /^(https?:\/\/|www\.)/i;
        return urlPattern.test(text.trim());
    }
    
    clearCellFormatting() {
        // Save state before clearing
        const scope = this.getSelectionScope();
        this.saveState(`Clear formatting from ${this.selectedCellCoords.size} cells`);
        const tableWideProps = new Set(
            STYLE_PROPS.filter(prop => Object.prototype.hasOwnProperty.call(this.defaultCellStyle || {}, prop))
        );

        const clearFormattingForCoords = (coordSet) => {
            const affectedRows = new Set();
            coordSet.forEach(coordKey => {
                const { row, col } = this.getCoordPos(coordKey);
                const beforeData = this.cellData.get(coordKey) || {};
                const rowEntry = this.getDimensionStyle('row', row, false);
                const colEntry = this.getDimensionStyle('column', col, false);
                const inheritedProps = STYLE_PROPS.filter(prop =>
                    (rowEntry && rowEntry[prop] !== undefined) ||
                    (colEntry && colEntry[prop] !== undefined) ||
                    tableWideProps.has(prop)
                );
                const hadOwnStyle = STYLE_PROPS.some(prop => beforeData[prop] !== undefined);
                const hadOtherFormatting = (beforeData.borders && Object.values(beforeData.borders).some(Boolean)) || Boolean(beforeData.richText);
                const needsOverride = inheritedProps.length > 0;

                // If there's nothing to clear or override, skip this coord
                if (!needsOverride && !hadOwnStyle && !hadOtherFormatting) {
                    return;
                }

                affectedRows.add(row);
                this.updateCellDataEntry(coordKey, data => {
                    STYLE_PROPS.forEach(prop => {
                        const inherited = inheritedProps.includes(prop);
                        if (inherited) {
                            data[prop] = null;
                        } else {
                            delete data[prop];
                        }
                    });
                    delete data.borders;
                    delete data.richText;
                });
                const meta = this.getCellStyleMeta(coordKey, true);
                STYLE_PROPS.forEach(prop => {
                    if (inheritedProps.includes(prop)) {
                        meta[prop] = this.nextStyleSequence();
                    } else if (meta && Object.prototype.hasOwnProperty.call(meta, prop)) {
                        delete meta[prop];
                    }
                });
            });
            return affectedRows;
        };

        if (scope.type === 'all') {
            STYLE_PROPS.forEach(prop => this.setDefaultCellProperty(prop, null));
            this.rowStyles.clear();
            this.columnStyles.clear();
            this.cellStyleMeta = new Map();
            const keysToDelete = [];
            this.cellData.forEach((data, coord) => {
                STYLE_PROPS.forEach(prop => delete data[prop]);
                delete data.borders;
                delete data.richText;
                if (this.isCellEffectivelyEmpty(data)) {
                    keysToDelete.push(coord);
                }
            });
            keysToDelete.forEach(coord => this.cellData.delete(coord));
            this.refreshAllVisibleCells();
            this.recalculateAutoRowHeights();
            this.updateUI();
            this.refreshPalettes();
            this.log('Cleared formatting from entire sheet');
            return;
        }

        if (scope.type === 'rows' || scope.type === 'columns') {
            const targets = scope.type === 'rows' ? scope.rows : scope.cols;
            const map = scope.type === 'rows' ? this.rowStyles : this.columnStyles;
            const defaultProps = new Set(
                STYLE_PROPS.filter(prop => Object.prototype.hasOwnProperty.call(this.defaultCellStyle || {}, prop))
            );
            const columnProps = new Set();
            if (this.columnStyles instanceof Map) {
                this.columnStyles.forEach(entry => {
                    STYLE_PROPS.forEach(prop => {
                        if (entry && Object.prototype.hasOwnProperty.call(entry, prop)) {
                            columnProps.add(prop);
                        }
                    });
                });
            }

            targets.forEach(idx => {
                const entry = this.getDimensionStyle(scope.type === 'rows' ? 'row' : 'column', idx, true);
                if (!entry) return;
                const propsToClear = new Set(defaultProps);
                STYLE_PROPS.forEach(prop => {
                    if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                        propsToClear.add(prop);
                    }
                });
                if (scope.type === 'rows') {
                    columnProps.forEach(prop => propsToClear.add(prop));
                }
                propsToClear.forEach(prop => this.setStyleValue(entry, prop, null));
            });
            const affectedRows = clearFormattingForCoords(this.selectedCellCoords);
            this.refreshAllVisibleCells();
            this.recalculateAutoRowHeights(affectedRows);
            this.updateUI();
            this.refreshPalettes();
            this.log(`Cleared formatting from ${scope.type === 'rows' ? 'row' : 'column'} selection`);
            return;
        }

        const affectedRows = clearFormattingForCoords(this.selectedCellCoords);

        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey) || {};
            this.updateCellDisplay(cell, cellData);
        });

        this._updateCellsAndAdjacent(this.selectedCells);

        this.recalculateAutoRowHeights(affectedRows);

        this.updateUI();
        
        // Refresh both color palettes to update "colors in use"
        this.refreshPalettes();
        
        this.log(`Cleared formatting from ${this.selectedCellCoords.size} cells`);
    }

    handleDocumentClick(event) {
        // Check each popup separately and close if clicking outside
        if (!event.target.closest('#contextMenu')) {
            this.hideContextMenu();
        }
        
        // Handle color palettes and custom picker
        const clickedInColorPalette = event.target.closest('#colorPalette');
        const clickedInFontColorPalette = event.target.closest('#fontColorPalette');
        const clickedInPalette = clickedInColorPalette || clickedInFontColorPalette;
        const clickedInCustomPickerElement = event.target.closest('.custom-color-picker') || event.target.closest('input[type="color"]');
        const clickedInCustomPicker = clickedInCustomPickerElement || this.customColorPickerReleaseGuard;
        const clickedColorButton = event.target.closest('#colorBtn');
        const clickedFontColorButton = event.target.closest('#fontColorBtn');
        
        // If clicking a color button, close the OTHER palette
        if (clickedColorButton) {
            this.hideFontColorPalette();
            if (this.customColorPicker) {
                this.customColorPicker.classList.add('hidden');
                this.customColorPickerActive = false;
            }
        } else if (clickedFontColorButton) {
            this.hideColorPalette();
            if (this.customColorPicker) {
                this.customColorPicker.classList.add('hidden');
                this.customColorPickerActive = false;
            }
        } else if (!clickedInCustomPicker && !clickedInPalette) {
            // Clicked completely outside - close everything
            this.hideColorPalette();
            this.hideFontColorPalette();
            if (this.customColorPicker) {
                this.customColorPicker.classList.add('hidden');
                this.customColorPickerActive = false;
            }
        } else if (clickedInCustomPicker) {
            // Clicked in custom picker or just finished a drag there - keep both open
        } else if (clickedInPalette) {
            // Clicked in palette but not in custom picker - close custom picker only if not clicking the color input
            if (this.customColorPicker && !event.target.closest('input[type="color"]')) {
                this.customColorPicker.classList.add('hidden');
                this.customColorPickerActive = false;
            }
        }
        
        if (!event.target.closest('#borderMenu') && !event.target.closest('#borderBtn')) {
            if (!(clickedInCustomPicker && this.colorPickerCallbacks && this.colorPickerCallbacks.type === 'border')) {
                this.hideBorderMenu();
            }
        }
        
        // Don't close link editor if clicking inside it OR on its buttons
        if (!event.target.closest('#linkEditor') && 
            !event.target.closest('#linkSaveBtn') && 
            !event.target.closest('#linkCancelBtn')) {
            this.hideLinkEditor();
        }
        
        if (!event.target.closest('.formula-input-wrapper') && !event.target.closest('#formulaSuggestions')) {
            this.hideFormulaSuggestions();
        }
        
        if (!event.target.closest('.spreadsheet-container') && 
            !event.target.closest('#contextMenu') && 
            !event.target.closest('#colorPalette') &&
            !event.target.closest('#fontColorPalette') &&
            !event.target.closest('#borderMenu') &&
            !event.target.closest('#customColorPicker') &&
            !event.target.closest('#fontSizeInput') &&
            !event.target.closest('.color-picker') &&
            !event.target.closest('#borderStyleSelect') &&
            !event.target.closest('#borderWidthSelect') &&
            !event.target.closest('#borderColorPicker') &&
            !event.target.closest('#linkEditor')) {
            if (this.currentEditingCell) {
                this.stopEditingCell();
            }
        }
        
        if (this.customColorPicker && 
            !clickedInCustomPicker) {
            this.customColorPicker?.classList.add('hidden');
        }
    }
    
    checkIfAllCellsHaveFormat(format) {
        // Check if all selected cells have the specified format
        let allHaveFormat = true;
        
        for (const coordKey of this.selectedCellCoords) {
            const cellData = this.cellData.get(coordKey);
            let value = this.getEffectiveCellProperty(coordKey, format);

            // If no explicit cell-level flag, only treat as formatted when the entire rich text carries it
            if (!value && cellData && cellData.richText && ['bold', 'italic', 'underline', 'strikethrough'].includes(format)) {
                value = this.richTextFullyFormatted(cellData.richText, format);
            }
            if (!value) {
                allHaveFormat = false;
                break;
            }
        }
        
        return allHaveFormat;
    }

    updateFormattingButtons() {
        let inlineState = null;
        if (this.currentEditingCell) {
            inlineState = this.getInlineFormattingState(this.currentEditingCell.querySelector('.cell-editor'));
        }
        ['bold', 'italic', 'underline', 'strikethrough'].forEach(fmt => {
            const active = inlineState
                ? !!inlineState[fmt]
                : (this.selectedCellCoords.size && this.checkIfAllCellsHaveFormat(fmt));
            document.getElementById(`${fmt}Btn`).classList.toggle('active', active);
        });
        
        this.updateAlignmentButtons();
        this.updateFontColorButton();
        this.updateBackgroundColorButton();
        this.updateMergeButton();
    }
    
    updateMergeButton() {
        const mergeBtn = document.getElementById('mergeBtn');
        if (!mergeBtn) return;

        if (!this.hasSelection()) {
            mergeBtn.classList.remove('active');
            return;
        }

        const bounds = this.getSelectionBounds();
        if (!bounds) {
            mergeBtn.classList.remove('active');
            return;
        }

        const { minRow, maxRow, minCol, maxCol, coords } = bounds;
        const affectedRows = new Set();
        for (let r = minRow; r <= maxRow; r++) {
            affectedRows.add(r);
        }
        const rows = maxRow - minRow + 1;
        const cols = maxCol - minCol + 1;
        const expectedCells = rows * cols;

        // Only highlight if selection is a valid rectangle
        if (coords.length !== expectedCells) {
            mergeBtn.classList.remove('active');
            return;
        }

        // Check if this exact range is merged
        const parentCoord = `${minRow},${minCol}`;
        const existingMerge = this.mergedCells.get(parentCoord);
        
        // DOMTokenList.toggle treats an undefined "force" value as "toggle"
        // instead of "remove", so make sure we always pass a boolean here.
        const isMerged = Boolean(existingMerge && 
            existingMerge.rows === rows && 
            existingMerge.cols === cols);
        mergeBtn.classList.toggle('active', isMerged);
    }

    _managePalette(action, type) {
        const config = {
            color: { element: this.colorPalette, button: 'colorBtn' },
            fontColor: { element: this.fontColorPalette, button: 'fontColorBtn' },
            border: { element: this.borderMenu, button: 'borderBtn' }
        };
        
        const { element, button } = config[type];
        
        if (action === 'show') {
            if (this.selectedCells.size === 0) return;
            const rect = document.getElementById(button).getBoundingClientRect();
            element.classList.remove('hidden');
            element.style.left = rect.left + 'px';
            element.style.top = (rect.bottom + 5) + 'px';
            
            // Refresh border color sections when opening the menu
            if (type === 'border' && typeof this.refreshBorderColorSections === 'function') {
                this.refreshBorderColorSections();
            }
        } else {
            element.classList.add('hidden');
        }
    }

    hideColorPalette() { this._managePalette('hide', 'color'); }
    hideFontColorPalette() { this._managePalette('hide', 'fontColor'); }
    hideBorderMenu() { this._managePalette('hide', 'border'); }

    _hidePalette(paletteElement) {
        paletteElement.classList.add('hidden');
    }

    _keepPaletteOpen(type) {
        let palette = null;
        if (type === 'background') {
            palette = this.colorPalette;
        } else if (type === 'font') {
            palette = this.fontColorPalette;
        } else if (type === 'border') {
            palette = this.borderMenu;
        }
        if (palette) {
            palette.classList.remove('hidden');
        }
    }

    setupColorPalette() {
        this._setupColorPaletteGeneric(
            'colorPaletteGrid',
            'background',
            this.customBackgroundColors,
            () => this._getColorsInUse('backgroundColor'),
            this.applyBackgroundColor.bind(this),
            this.hideColorPalette.bind(this),
            this.setupColorPalette.bind(this)
        );
    }

    setupFontColorPalette() {
        this._setupColorPaletteGeneric(
            'fontColorPaletteGrid',
            'font',
            this.customFontColors,
            () => this._getColorsInUse('fontColor'),
            this.applyFontColor.bind(this),
            this.hideFontColorPalette.bind(this),
            this.setupFontColorPalette.bind(this)
        );
    }

    _setupColorPaletteGeneric(containerId, type, customColorsArray, getColorsInUseFn, applyColorFn, hidePaletteFn, refreshPaletteFn) {
        const container = document.getElementById(containerId);
        container.style.display = 'block';
        container.innerHTML = '';
        if (!container.dataset.guardAttached) {
            container.addEventListener('pointerdown', (e) => {
                if (this.markEditorForToolbarRefocus(e)) {
                    this.isPaletteInteraction = true;
                }
            }, { capture: true });
            container.dataset.guardAttached = 'true';
        }
        
        const isBackground = type === 'background';
        
        // First row - "No fill" or "Automatic" button
        const firstRow = document.createElement('div');
        firstRow.style.marginBottom = 'var(--space-8)';
        firstRow.style.paddingBottom = 'var(--space-8)';
        firstRow.style.borderBottom = '1px solid var(--color-border)';
        
        const firstBtn = document.createElement('button');
        firstBtn.className = 'btn btn--sm';
        firstBtn.style.width = '100%';
        firstBtn.style.justifyContent = 'flex-start';
        firstBtn.style.padding = 'var(--space-6) var(--space-8)';
        firstBtn.innerHTML = isBackground 
            ? '<span class="color-swatch clear" style="margin-right: var(--space-8);"></span> No fill'
            : '<span class="color-swatch color-swatch-auto" style="margin-right: var(--space-8);">A</span> Automatic';
        firstBtn.addEventListener('pointerdown', (e) => {
            this.markEditorForToolbarRefocus(e);
        }, { capture: true });
        firstBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.markEditorForToolbarRefocus();
            applyColorFn('');
            hidePaletteFn();
            if (this.currentEditingCell) {
                setTimeout(() => this.resumeEditingAfterToolbar(), 0);
            }
        });
        firstRow.appendChild(firstBtn);
        container.appendChild(firstRow);
        
        // Custom color picker section
        const customSection = document.createElement('div');
        customSection.style.marginBottom = 'var(--space-8)';
        customSection.style.paddingBottom = 'var(--space-8)';
        customSection.style.borderBottom = '1px solid var(--color-border)';
        customSection.style.display = 'flex';
        customSection.style.gap = 'var(--space-8)';
        customSection.style.alignItems = 'center';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.style.width = '40px';
        colorInput.style.height = '32px';
        colorInput.style.border = '1px solid var(--color-border)';
        colorInput.style.borderRadius = 'var(--radius-sm)';
        colorInput.style.cursor = 'pointer';

        const hexInputWrapper = document.createElement('div');
        hexInputWrapper.style.flex = '1';
        hexInputWrapper.style.position = 'relative';
        hexInputWrapper.style.display = 'flex';
        hexInputWrapper.style.alignItems = 'center';

        const hexPrefix = document.createElement('span');
        hexPrefix.textContent = '#';
        hexPrefix.style.position = 'absolute';
        hexPrefix.style.left = 'var(--space-8)';
        hexPrefix.style.color = 'var(--color-text-secondary)';
        hexPrefix.style.fontSize = 'var(--font-size-sm)';
        hexPrefix.style.fontFamily = 'var(--font-family-mono)';
        hexPrefix.style.pointerEvents = 'none';

        const hexInput = document.createElement('input');
        hexInput.type = 'text';
        hexInput.className = 'form-control';
        hexInput.placeholder = '000000';
        hexInput.style.paddingLeft = 'calc(var(--space-8) + 12px)';
        hexInput.style.paddingRight = 'var(--space-8)';
        hexInput.style.fontSize = 'var(--font-size-sm)';
        hexInput.style.fontFamily = 'var(--font-family-mono)';
        hexInput.maxLength = 6;
        hexInput.dataset.minFocusDigits = '3';

        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn--sm';
        addBtn.textContent = '+';
        addBtn.style.minWidth = '32px';
        addBtn.title = 'Add custom color';

        // Open custom picker when clicking color input
        colorInput.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCustomColorPicker(type, customColorsArray, applyColorFn, hidePaletteFn, refreshPaletteFn);
        });

        // Sync color picker and hex input
        colorInput.addEventListener('input', (e) => {
            hexInput.value = e.target.value.substring(1).toUpperCase();
        });
        this.attachFormattingFieldGuards([colorInput]);

        hexInput.addEventListener('input', (e) => {
            let value = e.target.value.trim().toUpperCase();
            value = value.replace(/#/g, '');
            value = value.substring(0, 6);
            value = value.replace(/[^0-9A-F]/g, '');
            e.target.value = value;
            if (value.length === 6) {
                colorInput.value = '#' + value;
            }
        });
        this.attachFormattingFieldGuards([hexInput]);

        hexInput.addEventListener('paste', (e) => {
            e.preventDefault();
            let pastedText = (e.clipboardData || window.clipboardData).getData('text');
            pastedText = pastedText.replace(/#/g, '');
            pastedText = pastedText.replace(/[^0-9A-Fa-f]/g, '');
            pastedText = pastedText.substring(0, 6).toUpperCase();
            hexInput.value = pastedText;
            if (pastedText.length === 6) {
                colorInput.value = '#' + pastedText;
            }
        });

        // Add custom color to palette without applying
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const color = colorInput.value;
            if (color) {
                if (customColorsArray.includes(color)) {
                    // Get the palette element to position notification below it
                    const paletteElement = type === 'background' ? this.colorPalette : this.fontColorPalette;
                    // Show error notification below the palette
                    this.showErrorNotification(
                        `Color ${color} already exists`,
                        paletteElement
                    );
                    return;
                }
                // Store the current color value before refresh
                const currentColor = color;
                customColorsArray.push(color);
                refreshPaletteFn();
                this._keepPaletteOpen(type);
                
                // Restore the color value in the new inputs after refresh
                setTimeout(() => {
                    const newPalette = type === 'background' ? this.colorPalette : this.fontColorPalette;
                    const newColorInput = newPalette.querySelector('input[type="color"]');
                    const newHexInput = newPalette.querySelector('input[type="text"]');
                    if (newColorInput && newHexInput) {
                        newColorInput.value = currentColor;
                        newHexInput.value = currentColor.substring(1).toUpperCase();
                    }
                }, 0);
                
                // Close custom color picker after adding
                if (this.customColorPicker) {
                    this.customColorPicker.classList.add('hidden');
                    this.customColorPickerActive = false;
                }
            }
        });

        // Apply color on Enter
        hexInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                let value = hexInput.value.trim().toUpperCase();
                value = value.replace(/#/g, '');
                if (/^[0-9A-F]{6}$/.test(value)) {
                    const fullColor = '#' + value;
                    colorInput.value = fullColor;
                }
            }
        });

        hexInputWrapper.appendChild(hexPrefix);
        hexInputWrapper.appendChild(hexInput);
        customSection.appendChild(colorInput);
        customSection.appendChild(hexInputWrapper);
        customSection.appendChild(addBtn);
        this.attachFormattingFieldGuards([colorInput, hexInput]);
        container.appendChild(customSection);
        
        // Standard colors title
        const standardTitle = document.createElement('div');
        standardTitle.textContent = 'Standard colors';
        standardTitle.style.fontSize = 'var(--font-size-xs)';
        standardTitle.style.color = 'var(--color-text-secondary)';
        standardTitle.style.marginBottom = 'var(--space-4)';
        standardTitle.style.fontWeight = 'var(--font-weight-medium)';
        container.appendChild(standardTitle);
        
        // Standard colors grid
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
        grid.style.gap = 'var(--space-4)';
        
        const colors = [
            ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff'],
            ['#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'],
            ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'],
            ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
            ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
            ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'],
            ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47'],
            ['#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130']
        ];

        colors.forEach(row => {
            row.forEach(color => {
                const swatch = this._createColorSwatch(color, applyColorFn, hidePaletteFn);
                grid.appendChild(swatch);
            });
        });
        
        container.appendChild(grid);
        
        // Colors in use section
        const colorsInUse = getColorsInUseFn();
        const usageHasEntries = (this.colorUsage[this._mapPropToUsageType(type)] || []).length > 0;
        if (colorsInUse.length > 0 || usageHasEntries) {
            this._appendColorSection(container, 'Colors in use', colorsInUse, applyColorFn, hidePaletteFn, refreshPaletteFn, type);
        }

        // Custom colors section
        if (customColorsArray.length > 0) {
            this._appendColorSection(container, 'Custom colors', customColorsArray, applyColorFn, hidePaletteFn, refreshPaletteFn, type);
        }
    }
    
    showCustomColorPicker(type, customColorsArray, applyColorFn, hidePaletteFn, refreshPaletteFn) {
        // Create picker if it doesn't exist
        if (!this.customColorPicker) {
            this.customColorPicker = this.createCustomColorPicker();
        }

        // Store callbacks
        this.colorPickerCallbacks = {
            type,
            customColorsArray,
            applyColorFn,
            hidePaletteFn,
            refreshPaletteFn
        };

        // Show picker
        this.customColorPicker.classList.remove('hidden');
        
        // Position it to the right of the palette
        const palette = type === 'background' ? this.colorPalette : this.fontColorPalette;
        const rect = palette.getBoundingClientRect();
        this.customColorPicker.style.left = (rect.right + 8) + 'px';
        this.customColorPicker.style.top = rect.top + 'px';

        // Get current color from the color input
        const colorInput = palette.querySelector('input[type="color"]');
        const currentColor = colorInput ? colorInput.value : '#ffffff';
        
        // Update hex input with current color
        const hexInput = palette.querySelector('input[type="text"]');
        if (hexInput) {
            hexInput.value = currentColor.substring(1).toUpperCase();
        }

        // Initialize with current color
        this.setCustomPickerColor(currentColor);
        
        // IMPORTANT: Keep the palette visible by removing any hide event listeners temporarily
        this.customColorPickerActive = true;
    }

    createCustomColorPicker() {
        const picker = document.createElement('div');
        picker.className = 'custom-color-picker hidden';
        picker.innerHTML = `
            <div class="color-picker-canvas-container" id="customColorCanvas">
                <canvas class="color-picker-canvas" width="256" height="256"></canvas>
                <div class="color-picker-cursor" id="customColorCursor"></div>
            </div>
            
            <div class="color-picker-hue-slider" id="customColorHue">
                <div class="color-picker-hue-cursor" id="customColorHueCursor"></div>
            </div>
            
            <div class="color-picker-inputs">
                <div class="color-picker-input-group">
                    <label class="color-picker-input-label">R</label>
                    <input type="number" class="color-picker-input" id="customColorR" min="0" max="255">
                </div>
                <div class="color-picker-input-group">
                    <label class="color-picker-input-label">G</label>
                    <input type="number" class="color-picker-input" id="customColorG" min="0" max="255">
                </div>
                <div class="color-picker-input-group">
                    <label class="color-picker-input-label">B</label>
                    <input type="number" class="color-picker-input" id="customColorB" min="0" max="255">
                </div>
            </div>
            
            <div class="color-picker-suggestions">
                <div class="color-picker-suggestions-label">Color Suggestions</div>
                <div class="color-picker-swatches" id="customColorSuggestions"></div>
            </div>
        `;

        document.body.appendChild(picker);

        picker.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            this.customColorPickerPointerDown = true;
        });

        // Initialize canvas and event listeners
        this.initCustomColorPicker(picker);

        return picker;
    }

    initCustomColorPicker(picker) {
        const canvas = picker.querySelector('.color-picker-canvas');
        const ctx = canvas.getContext('2d');
        const cursor = picker.querySelector('#customColorCursor');
        const hueCursor = picker.querySelector('#customColorHueCursor');
        
        const hueSlider = picker.querySelector('#customColorHue');
        const canvasContainer = picker.querySelector('#customColorCanvas');
        
        const rInput = picker.querySelector('#customColorR');
        const gInput = picker.querySelector('#customColorG');
        const bInput = picker.querySelector('#customColorB');
        
        [rInput, gInput, bInput].forEach(input => {
            if (input) input.dataset.minFocusDigits = '3';
        });
        
        // Get references to existing inputs in the palette
        const getExistingInputs = () => {
            const callbacks = this.colorPickerCallbacks;
            if (!callbacks) return null;
            
            const palette = callbacks.type === 'background' ? this.colorPalette : this.fontColorPalette;
            return {
                colorInput: palette.querySelector('input[type="color"]'),
                hexInput: palette.querySelector('input[type="text"]'),
                preview: palette.querySelector('.color-swatch') || null
            };
        };
        
        const suggestions = picker.querySelector('#customColorSuggestions');

        let lastCanvasMetrics = null;

        const getCanvasMetrics = () => {
            const containerRect = canvasContainer.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();
            
            let containerWidth = containerRect.width;
            let containerHeight = containerRect.height;
            let canvasWidth = canvasRect.width;
            let canvasHeight = canvasRect.height;
            let offsetX = canvasRect.left - containerRect.left;
            let offsetY = canvasRect.top - containerRect.top;

            const hasVisibleMetrics = containerWidth && containerHeight && canvasWidth && canvasHeight;
            
            if (!hasVisibleMetrics) {
                if (lastCanvasMetrics) {
                    return lastCanvasMetrics;
                }
                containerWidth = canvasContainer.clientWidth || canvas.width || 1;
                containerHeight = canvasContainer.clientHeight || canvas.height || 1;
                canvasWidth = canvas.width;
                canvasHeight = canvas.height;
                offsetX = (containerWidth - canvasWidth) / 2;
                offsetY = (containerHeight - canvasHeight) / 2;
            }

            const metrics = {
                containerRect,
                canvasRect,
                containerWidth,
                containerHeight,
                canvasWidth,
                canvasHeight,
                offsetX,
                offsetY
            };
            lastCanvasMetrics = metrics;
            return metrics;
        };

        const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));

        // State
        let currentHue = 0;
        let currentSaturation = 100;
        let currentLightness = 50;

        // Draw color canvas
        const drawCanvas = (hue) => {
            const width = canvas.width;
            const height = canvas.height;
            
            // Create gradient
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const saturation = (x / width) * 100;
                    const lightness = 100 - (y / height) * 100;
                    const color = this.hslToRgb(hue, saturation, lightness);
                    
                    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        };

        // Update color from HSL
        const updateColor = () => {
            const rgb = this.hslToRgb(currentHue, currentSaturation, currentLightness);
            const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            
            // Update our local inputs
            rInput.value = rgb.r;
            gInput.value = rgb.g;
            bInput.value = rgb.b;
            
            // Update existing palette inputs OR border inputs WITHOUT applying
            const callbacks = this.colorPickerCallbacks;
            if (callbacks) {
                if (callbacks.type === 'border') {
                    // Update border dialog inputs
                    if (callbacks.colorInput) {
                        callbacks.colorInput.value = hex;
                    }
                    if (callbacks.hexInput) {
                        callbacks.hexInput.value = callbacks.type === 'border'
                            ? hex.substring(1).toUpperCase()
                            : hex.substring(1).toUpperCase();
                    }
                    // Call the update callback to update preview
                    if (typeof callbacks.updateCallback === 'function') {
                        callbacks.updateCallback();
                    }
                } else {
                    // Update palette inputs
                    const existing = getExistingInputs();
                    if (existing) {
                        existing.colorInput.value = hex;
                        existing.hexInput.value = hex.substring(1).toUpperCase();
                    }
                }
            }
            
            // Calculate cursor position with proper clamping
            // Clamp saturation and lightness to valid range first
            const clampedSaturation = Math.max(0, Math.min(100, currentSaturation));
            const clampedLightness = Math.max(0, Math.min(100, currentLightness));
            
            // Calculate position as a percentage, then convert to pixels
            const xPercent = clampedSaturation / 100;
            const yPercent = 1 - (clampedLightness / 100);
            
            // Calculate pixel position
            const metrics = getCanvasMetrics();
            const cursorHalfWidth = (cursor.offsetWidth || 16) / 2;
            const cursorHalfHeight = (cursor.offsetHeight || 16) / 2;
            const x = xPercent * metrics.canvasWidth;
            const y = yPercent * metrics.canvasHeight;
            
            const centerX = clampValue(
                metrics.offsetX + x,
                metrics.offsetX,
                metrics.offsetX + metrics.canvasWidth
            );
            const centerY = clampValue(
                metrics.offsetY + y,
                metrics.offsetY,
                metrics.offsetY + metrics.canvasHeight
            );
            
            // Position cursor so its center aligns with the pointer after translate(-50%, -50%)
            cursor.style.left = centerX + 2*cursorHalfWidth + 'px';
            cursor.style.top = centerY + 2*cursorHalfHeight + 'px';
            
            // Update hue cursor
            const hueX = (currentHue / 360) * hueSlider.offsetWidth;
            const clampedHueX = Math.max(2, Math.min(hueSlider.offsetWidth - 2, hueX));
            hueCursor.style.left = clampedHueX + 'px';
            
            // Update suggestions
            this.updateColorSuggestions(suggestions, currentHue, currentSaturation, currentLightness);
        };

        // Canvas click
        canvasContainer.addEventListener('mousedown', (e) => {
            const handleMove = (e) => {
                const metrics = getCanvasMetrics();
                const pointerX = clampValue(e.clientX - metrics.canvasRect.left, 0, metrics.canvasWidth);
                const pointerY = clampValue(e.clientY - metrics.canvasRect.top, 0, metrics.canvasHeight);
                
                currentSaturation = Math.max(0, Math.min(100, (pointerX / metrics.canvasWidth) * 100));
                currentLightness = Math.max(0, Math.min(100, (1 - pointerY / metrics.canvasHeight) * 100));
                updateColor();
            };
            
            handleMove(e);
            
            const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
            };
            
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
        });

        // Hue slider
        hueSlider.addEventListener('mousedown', (e) => {
            const handleMove = (e) => {
                const rect = hueSlider.getBoundingClientRect();
                const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                currentHue = Math.max(0, Math.min(360, (x / rect.width) * 360));
                drawCanvas(currentHue);
                updateColor();
            };
            
            handleMove(e);
            
            const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
            };
            
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
        });

        // RGB inputs
        [rInput, gInput, bInput].forEach(input => {
            input.addEventListener('input', () => {
                const r = Math.max(0, Math.min(255, parseInt(rInput.value) || 0));
                const g = Math.max(0, Math.min(255, parseInt(gInput.value) || 0));
                const b = Math.max(0, Math.min(255, parseInt(bInput.value) || 0));
                
                const hsl = this.rgbToHsl(r, g, b);
                currentHue = Math.max(0, Math.min(360, hsl.h));
                currentSaturation = Math.max(0, Math.min(100, hsl.s));
                currentLightness = Math.max(0, Math.min(100, hsl.l));
                
                drawCanvas(currentHue);
                updateColor();
            });
        });
        this.attachFormattingFieldGuards([rInput, gInput, bInput]);

        // Store references
        this.customColorPickerState = {
            drawCanvas,
            updateColor,
            get currentHue() { return currentHue; },
            set currentHue(v) { currentHue = Math.max(0, Math.min(360, v)); },
            get currentSaturation() { return currentSaturation; },
            set currentSaturation(v) { currentSaturation = Math.max(0, Math.min(100, v)); },
            get currentLightness() { return currentLightness; },
            set currentLightness(v) { currentLightness = Math.max(0, Math.min(100, v)); }
        };

        // Initial draw
        drawCanvas(0);
        updateColor();
    }

    setCustomPickerColor(hex) {
        if (!this.customColorPickerState) return;
        
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        this.customColorPickerState.currentHue = hsl.h;
        this.customColorPickerState.currentSaturation = hsl.s;
        this.customColorPickerState.currentLightness = hsl.l;
        
        this.customColorPickerState.drawCanvas(hsl.h);
        this.customColorPickerState.updateColor();
    }

    updateColorSuggestions(container, hue, saturation, lightness) {
        const suggestions = [
            // Complementary
            { h: (hue + 180) % 360, s: saturation, l: lightness },
            // Triadic
            { h: (hue + 120) % 360, s: saturation, l: lightness },
            { h: (hue + 240) % 360, s: saturation, l: lightness },
            // Analogous
            { h: (hue + 30) % 360, s: saturation, l: lightness },
            { h: (hue - 30 + 360) % 360, s: saturation, l: lightness },
            // Lighter/darker
            { h: hue, s: saturation, l: Math.min(100, lightness + 20) },
            { h: hue, s: saturation, l: Math.max(0, lightness - 20) },
            // Desaturated
            { h: hue, s: Math.max(0, saturation - 30), l: lightness }
        ];

        container.innerHTML = '';
        suggestions.forEach(color => {
            const rgb = this.hslToRgb(color.h, color.s, color.l);
            const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            
            const swatch = document.createElement('div');
            swatch.className = 'color-picker-swatch';
            swatch.style.backgroundColor = hex;
            swatch.title = hex;
            swatch.addEventListener('click', () => {
                this.setCustomPickerColor(hex);
            });
            
            container.appendChild(swatch);
        });
    }

    // Color conversion utilities
    hslToRgb(h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: h * 360,
            s: s * 100,
            l: l * 100
        };
    }

    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    _createColorSwatch(color, applyColorFn, hidePaletteFn) {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.addEventListener('pointerdown', (e) => {
            this.markEditorForToolbarRefocus(e);
        }, { capture: true });
        swatch.addEventListener('click', (e) => {
            e.preventDefault();
            this.markEditorForToolbarRefocus();
            applyColorFn(color);
            hidePaletteFn();
            if (this.currentEditingCell) {
                setTimeout(() => this.resumeEditingAfterToolbar(), 0);
            }
        });
        swatch.addEventListener('auxclick', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                this.copyColorToClipboard(color);
            }
        });
        return swatch;
    }

    _createRemovableColorSwatch(color, customColorsArray, applyColorFn, hidePaletteFn, refreshPaletteFn, type) {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.addEventListener('pointerdown', (e) => {
            this.markEditorForToolbarRefocus(e);
        }, { capture: true });
        
        // Left click to apply color
        swatch.addEventListener('click', (e) => {
            e.preventDefault();
            this.markEditorForToolbarRefocus();
            applyColorFn(color);
            hidePaletteFn();
            if (this.currentEditingCell) {
                setTimeout(() => this.resumeEditingAfterToolbar(), 0);
            }
        });
        
        // Middle click to copy hex
        swatch.addEventListener('auxclick', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                this.copyColorToClipboard(color);
            }
        });
        
        // Right click to remove color
        swatch.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const index = customColorsArray.indexOf(color);
            if (index > -1) {
                customColorsArray.splice(index, 1);
                refreshPaletteFn();
                this._keepPaletteOpen(type);
            }
        });
        
        return swatch;
    }
    
    _appendColorSection(container, title, colors, applyColorFn, hidePaletteFn, refreshPaletteFn, type) {
        const isColorsInUseSection = title === 'Colors in use';
        const sectionTitle = document.createElement('div');
        sectionTitle.textContent = title;
        sectionTitle.style.fontSize = 'var(--font-size-xs)';
        sectionTitle.style.color = 'var(--color-text-secondary)';
        sectionTitle.style.marginTop = 'var(--space-12)';
        sectionTitle.style.marginBottom = 'var(--space-4)';
        sectionTitle.style.fontWeight = 'var(--font-weight-medium)';
        container.appendChild(sectionTitle);
        
        const grid = document.createElement('div');
        grid.classList.add('color-section-grid');
        grid.style.marginTop = 'var(--space-4)';
        
        colors.forEach(color => {
            // Use removable swatches for custom colors section
            const isCustomSection = title === 'Custom colors';
            const swatch = isCustomSection 
                ? this._createRemovableColorSwatch(color, colors, applyColorFn, hidePaletteFn, refreshPaletteFn, type)
                : this._createColorSwatch(color, applyColorFn, hidePaletteFn);
            grid.appendChild(swatch);
        });
        
        container.appendChild(grid);
        
        if (isColorsInUseSection) {
            const usageTitle = document.createElement('div');
            usageTitle.textContent = 'Currently used colors';
            usageTitle.style.fontSize = 'var(--font-size-xs)';
            usageTitle.style.color = 'var(--color-text-secondary)';
            usageTitle.style.marginTop = 'var(--space-12)';
            usageTitle.style.marginBottom = 'var(--space-4)';
            usageTitle.style.fontWeight = 'var(--font-weight-medium)';
            container.appendChild(usageTitle);

            const usageGrid = document.createElement('div');
            usageGrid.classList.add('color-section-grid');
            usageGrid.style.marginTop = 'var(--space-4)';

            const usageOrderedColors = this._getUsageOrderedColors(type, colors, true);
            usageOrderedColors.forEach(color => {
                const swatch = this._createColorSwatch(color, applyColorFn, hidePaletteFn);
                usageGrid.appendChild(swatch);
            });

            container.appendChild(usageGrid);
        }
    }

    copyColorToClipboard(color) {
        if (!color) return;
        const text = color.toUpperCase();
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text).catch(() => {
                this._fallbackCopyText(text);
            });
        } else {
            this._fallbackCopyText(text);
        }
    }

    _fallbackCopyText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try { document.execCommand('copy'); } catch (err) { /* no-op */ }
        document.body.removeChild(textarea);
    }

    _getColorsInUse(prop) {
        const colors = new Set();
        this.cellData.forEach(data => {
            if (prop === 'borders' && data.borders) {
                ['top', 'right', 'bottom', 'left'].forEach(side => {
                    const match = data.borders[side]?.match(/#[0-9A-F]{6}/i);
                    if (match) colors.add(match[0].toUpperCase());
                });
            } else if (prop === 'fontColor' && data.richText) {
                const summary = this.summarizeRichText(data.richText);
                summary.colors.forEach(c => colors.add(c.toUpperCase()));
            } else if (data[prop]) {
                colors.add(data[prop].toUpperCase());
            }
        });
        if (prop === 'fontColor' && this.currentEditingCell) {
            const editor = this.currentEditingCell.querySelector('.cell-editor');
            if (editor) {
                const summary = this.summarizeRichText(editor.innerHTML || '');
                summary.colors.forEach(c => colors.add(c.toUpperCase()));
            }
        }
        if (prop === 'backgroundColor' || prop === 'fontColor') {
            const collectFromMap = (map) => {
                if (!(map instanceof Map)) return;
                map.forEach(entry => {
                    if (entry && typeof entry === 'object' && entry[prop]) {
                        colors.add(String(entry[prop]).toUpperCase());
                    }
                });
            };
            collectFromMap(this.rowStyles);
            collectFromMap(this.columnStyles);
        }
        const defaultValue = this.defaultCellStyle[prop];
        if (defaultValue) {
            colors.add(String(defaultValue).toUpperCase());
        }
        return Array.from(colors).sort();
    }

    _mapPropToUsageType(propOrType) {
        if (propOrType === 'backgroundColor' || propOrType === 'background') return 'background';
        if (propOrType === 'fontColor' || propOrType === 'font') return 'font';
        if (propOrType === 'borders' || propOrType === 'border') return 'border';
        return 'background';
    }

    _recordColorUsage(type, color) {
        if (!color) return;
        const normalized = String(color).toUpperCase();
        const usageType = this._mapPropToUsageType(type);
        const usageList = this.colorUsage[usageType];
        if (!usageList) return;
        if (usageList[0] === normalized) return;
        const existingIdx = usageList.indexOf(normalized);
        if (existingIdx > -1) {
            usageList.splice(existingIdx, 1);
        }
        usageList.unshift(normalized);
    }

    _getUsageOrderedColors(type, colors, includeMissing = false) {
        const usageType = this._mapPropToUsageType(type);
        const usageList = this.colorUsage[usageType] || [];
        const colorSet = new Set(colors.map(c => c.toUpperCase()));
        const ordered = [];

        usageList.forEach(c => {
            if ((includeMissing || colorSet.has(c)) && !ordered.includes(c)) {
                ordered.push(c);
            }
        });

        colors.forEach(c => {
            const upper = c.toUpperCase();
            if (!ordered.includes(upper)) {
                ordered.push(upper);
            }
        });

        return ordered;
    }

    recomputeColorUsageFromData() {
        const normalize = (list = []) => Array.from(new Set(list.map(c => String(c).toUpperCase())));
        this.colorUsage.background = normalize(this._getColorsInUse('backgroundColor'));
        this.colorUsage.font = normalize(this._getColorsInUse('fontColor'));
        this.colorUsage.border = normalize(this._getColorsInUse('borders'));
    }

    cloneColorUsage(source = this.colorUsage) {
        return {
            background: [...(source?.background || [])],
            font: [...(source?.font || [])],
            border: [...(source?.border || [])]
        };
    }

    getBackgroundColorsInUse() { return this._getColorsInUse('backgroundColor'); }
    getFontColorsInUse() { return this._getColorsInUse('fontColor'); }
    getBorderColorsInUse() { return this._getColorsInUse('borders'); }
    
    refreshPalettes(type) {
        if (!type || type === 'background') {
            this.setupColorPalette();
        }
        if (!type || type === 'font') {
            this.setupFontColorPalette();
        }
    }

    _applyColor(prop, styleProp, color, updateFn) {
        if (!this.hasSelection()) return;
        if (color) {
            this._recordColorUsage(prop, color);
        }
        if (this.currentEditingCell) {
            this.pendingEditorRefocus = true;
            this.isToolbarFormattingInteraction = true;
        }
        const cleanRichText = prop === 'fontColor';
        const scope = this.getSelectionScope();
        const applyToAll = scope.type === 'all';
        const scopeLabel = (() => {
            if (applyToAll) return ' (all cells)';
            if (scope.type === 'rows') return ` (${scope.rows.length} row${scope.rows.length === 1 ? '' : 's'})`;
            if (scope.type === 'columns') return ` (${scope.cols.length} column${scope.cols.length === 1 ? '' : 's'})`;
            return '';
        })();
        this.saveState(`Apply ${prop}${scopeLabel}`);

        if (applyToAll) {
            this.setDefaultCellProperty(prop, color || null);
            const keysToDelete = [];
            this.cellData.forEach((data, coord) => {
                delete data[prop];
                if (cleanRichText && data.richText) {
                    const cleaned = this.stripInlineFontColorFromHtml(data.richText);
                    if (cleaned !== data.richText) {
                        if (cleaned) {
                            data.richText = cleaned;
                        } else {
                            delete data.richText;
                        }
                    }
                }
                if (this.isCellEffectivelyEmpty(data)) {
                    keysToDelete.push(coord);
                }
            });
            keysToDelete.forEach(coord => this.cellData.delete(coord));
            this.refreshAllVisibleCells();
            updateFn.call(this);
            this.resumeEditingAfterToolbar();
            return;
        }

        if (scope.type === 'rows' || scope.type === 'columns') {
            const indices = scope.type === 'rows' ? scope.rows : scope.cols;
            const map = scope.type === 'rows' ? this.rowStyles : this.columnStyles;
            indices.forEach(idx => {
                const entry = this.getDimensionStyle(scope.type === 'rows' ? 'row' : 'column', idx, true);
                this.setStyleValue(entry, prop, color || null);
                if (this.isStyleEntryEmpty(entry) && (!entry._meta || Object.keys(entry._meta).length === 0)) {
                    map.delete(idx);
                }
            });
            if (scope.type === 'rows') {
                this.recalculateAutoRowHeights(new Set(indices));
            } else {
                this.recalculateAutoRowHeights();
            }
            this.refreshAllVisibleCells();
            updateFn.call(this);
            this.resumeEditingAfterToolbar();
            return;
        }

        const coordsNeedingRefresh = new Set();

        this.selectedCellCoords.forEach(c => {
            this.updateCellDataEntry(c, data => {
                data[prop] = color || null;
                if (cleanRichText && data.richText) {
                    const cleaned = this.stripInlineFontColorFromHtml(data.richText);
                    if (cleaned !== data.richText) {
                        if (cleaned) {
                            data.richText = cleaned;
                        } else {
                            delete data.richText;
                        }
                        coordsNeedingRefresh.add(c);
                    }
                }
            });
            const meta = this.getCellStyleMeta(c, true);
            meta[prop] = this.nextStyleSequence();
        });
        
        this.selectedCells.forEach(el => {
            const coord = this.getCoord(el);
            if (cleanRichText && coordsNeedingRefresh.has(coord) && el.classList.contains('editing')) {
                return;
            }
            const cellData = this.cellData.get(coord) || {};
            this.updateCellDisplay(el, cellData);
        });
        updateFn.call(this);

        // Keep editing experience continuous if we're editing one of the selected cells
        if (this.currentEditingCell) {
            const editingCoord = this.getCoord(this.currentEditingCell);
            const appliesHere = applyToAll || this.selectedCellCoords.has(editingCoord);
            if (appliesHere) {
                const data = this.cellData.get(editingCoord) || {};
                this.refreshEditingCellFormatting(this.currentEditingCell, data);
                this.resumeEditingAfterToolbar();
            }
        }
    }

    applyBackgroundColor(c) { 
        this._applyColor('backgroundColor', 'backgroundColor', c, this.updateBackgroundColorButton); 
        this.refreshPalettes('background');
    }
    applyFontColor(c) { 
        // If we're editing, try inline color first to keep the caret position
        if (this.currentEditingCell) {
            this.saveEditorSelection(this.currentEditingCell.querySelector('.cell-editor'));
            const didInline = this.applyInlineFontColor(c);
            if (didInline) {
                if (c) this._recordColorUsage('fontColor', c);
                return;
            }
        }
        this._applyColor('fontColor', 'color', c, this.updateFontColorButton); 
        this.refreshPalettes('font');
    }
    
    _getCommonCellProperty(property) {
        if (!this.hasSelection()) return { hasValue: false, value: null, allSame: false };
        
        let commonValue;
        let initialized = false;
        let allSame = true;
        
        for (const coord of this.selectedCellCoords) {
            const value = this.getEffectiveCellProperty(coord, property);
            if (!initialized) {
                commonValue = value;
                initialized = true;
            } else if (commonValue !== value) {
                allSame = false;
                break;
            }
        }
        
        if (!initialized) return { hasValue: false, value: null, allSame: false };
        const hasValue = commonValue !== undefined && commonValue !== null;
        return { hasValue, value: commonValue, allSame };
    }

    _resolveSharedBorder(ownBorder, neighborBorder, neighborActive, preferNeighbor) {
        const own = ownBorder || '';
        const neighbor = neighborBorder || '';
        if (preferNeighbor) {
            if (neighborActive && neighbor) {
                return '';
            }
            if (own) {
                return own;
            }
            if (!neighborActive && neighbor) {
                return neighbor;
            }
            return '';
        }

        if (own) {
            return own;
        }
        if (!neighborActive && neighbor) {
            return neighbor;
        }
        return '';
    }

    updateBackgroundColorButton() {
        const indicator = document.getElementById('bgColorIndicator');
        const { hasValue, value, allSame } = this._getCommonCellProperty('backgroundColor');
        
        indicator.style.backgroundColor = (hasValue && allSame && value) 
            ? value 
            : 'transparent';
    }
    
    _getSelectionFontColor() {
        if (!this.currentEditingCell) return null;
        const editor = this.currentEditingCell.querySelector('.cell-editor');
        if (!editor) return null;
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return null;
        const range = selection.getRangeAt(0);
        if (!editor.contains(range.commonAncestorContainer)) return null;

        const colors = new Set();
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
        let node = walker.nextNode();
        while (node) {
            if (node.nodeValue && node.nodeValue.length && this.rangeIntersectsNode(range, node)) {
                const style = window.getComputedStyle(node.parentElement || editor);
                colors.add(style.color);
                if (colors.size > 1) break;
            }
            node = walker.nextNode();
        }
        if (colors.size === 1) {
            return colors.values().next().value;
        }
        return null;
    }

    updateFontColorButton() {
        const colorBar = document.getElementById('fontColorBtn').querySelector('span span');
        
        // Prefer live selection color while editing
        const selectionColor = this._getSelectionFontColor();
        if (selectionColor) {
            colorBar.style.backgroundColor = selectionColor;
            return;
        }
        
        const { hasValue, value, allSame } = this._getCommonCellProperty('fontColor');
        
        colorBar.style.backgroundColor = !hasValue ? 'currentColor' :
            (allSame && value) ? value :
            (allSame && !value) ? 'var(--color-text)' :
            'currentColor';
    }

    setupBorderMenu() {
        if (!this.borderMenu) {
            this.borderMenu = document.getElementById('borderMenu');
        }
        if (!this.borderMenu) return;
        if (!this.borderMenu.dataset.guardAttached) {
            this.borderMenu.addEventListener('pointerdown', (e) => {
                const isFormControl = e.target.closest('input, select, textarea, .color-picker-input');
                if (isFormControl) {
                    if (this.currentEditingCell) {
                        this.isPaletteFieldEditing = true;
                        this.pendingEditorRefocus = false;
                        this.isToolbarFormattingInteraction = false;
                        this.saveEditorSelection(this.currentEditingCell.querySelector('.cell-editor'));
                    }
                    return;
                }
                if (this.markEditorForToolbarRefocus(e)) {
                    this.isPaletteInteraction = true;
                }
            }, { capture: true });
            this.borderMenu.dataset.guardAttached = 'true';
        }
        const borderOptions = this.borderMenu.querySelectorAll('.border-option');
        const borderStyleSelect = document.getElementById('borderStyleSelect');
        const borderWidthSelect = document.getElementById('borderWidthSelect');
        const borderColorPicker = document.getElementById('borderColorPicker');
        const borderColorHex = document.getElementById('borderColorHex');
        const borderColorSections = document.getElementById('borderColorSections');
        const borderPreview = document.getElementById('borderPreview');
        let currentPreviewAction = 'clear';
        if (borderColorHex) {
            borderColorHex.dataset.minFocusDigits = '3';
        }
        this.attachFormattingFieldGuards([borderStyleSelect, borderWidthSelect, borderColorPicker, borderColorHex]);

        const previewColumns = 3;
        const previewRows = 3;
        const previewCellWidth = this.config.cellWidth;
        const previewCellHeight = this.config.cellHeight;
        const previewWidth = previewColumns * previewCellWidth;
        const previewHeight = previewRows * previewCellHeight;
        const gridBufferColumns = previewColumns + 2;
        const gridBufferRows = previewRows + 2;
        const edgePeek = 4;
        const stageWidth = previewWidth + edgePeek * 2;
        const stageHeight = previewHeight + edgePeek * 2;
        const gridWidth = gridBufferColumns * previewCellWidth;
        const gridHeight = gridBufferRows * previewCellHeight;
        const gridOffsetX = previewCellWidth - edgePeek;
        const gridOffsetY = previewCellHeight - edgePeek;
        const stagePaddingX = edgePeek;
        const stagePaddingY = edgePeek;

        if (borderPreview) {
            const stage = document.createElement('div');
            stage.className = 'border-preview-stage';

            stage.style.width = `${stageWidth}px`;
            stage.style.height = `${stageHeight}px`;

            const viewport = document.createElement('div');
            viewport.className = 'border-preview-viewport';
            viewport.style.width = `${stageWidth}px`;
            viewport.style.height = `${stageHeight}px`;

            const grid = document.createElement('div');
            grid.className = 'border-preview-grid';
            grid.style.setProperty('--border-preview-cell-width', `${previewCellWidth}px`);
            grid.style.setProperty('--border-preview-cell-height', `${previewCellHeight}px`);
            grid.style.width = `${gridWidth}px`;
            grid.style.height = `${gridHeight}px`;
            grid.style.left = `-${gridOffsetX}px`;
            grid.style.top = `-${gridOffsetY}px`;
            grid.style.gridTemplateColumns = `repeat(${gridBufferColumns}, var(--border-preview-cell-width))`;
            grid.style.gridTemplateRows = `repeat(${gridBufferRows}, var(--border-preview-cell-height))`;

            const totalCells = gridBufferColumns * gridBufferRows;
            for (let i = 0; i < totalCells; i++) {
                const cell = document.createElement('div');
                cell.className = 'border-preview-cell';
                const colIndex = i % gridBufferColumns;
                const rowIndex = Math.floor(i / gridBufferColumns);
                const isLeftBufferCol = colIndex === 0;
                const isRightBufferCol = colIndex === gridBufferColumns - 1;
                const isTopBufferRow = rowIndex === 0;
                const isBottomBufferRow = rowIndex === gridBufferRows - 1;
                const isLastPreviewCol = colIndex === gridBufferColumns - 2;
                const isLastPreviewRow = rowIndex === gridBufferRows - 2;

                if (isLeftBufferCol) cell.classList.add('border-preview-cell--edge-left');
                if (isTopBufferRow) cell.classList.add('border-preview-cell--edge-top');

                // Mirror borders on the far edges so the partial cells show equal padding
                if (isRightBufferCol) cell.classList.add('border-preview-cell--edge-right');
                if (isBottomBufferRow) cell.classList.add('border-preview-cell--edge-bottom');

                // Avoid double-thick lines where the preview meets the buffer cells
                if (isLastPreviewCol) cell.classList.add('border-preview-cell--suppress-right');
                if (isLastPreviewRow) cell.classList.add('border-preview-cell--suppress-bottom');
                grid.appendChild(cell);
            }

            viewport.appendChild(grid);

            const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            overlay.classList.add('border-preview-overlay');
            overlay.setAttribute('width', stageWidth);
            overlay.setAttribute('height', stageHeight);
            overlay.setAttribute('viewBox', `0 0 ${stageWidth} ${stageHeight}`);
            overlay.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('role', 'presentation');
            overlay.style.width = `${stageWidth}px`;
            overlay.style.height = `${stageHeight}px`;
            overlay.style.left = '0';
            overlay.style.top = '0';

            stage.appendChild(viewport);
            stage.appendChild(overlay);

            borderPreview.innerHTML = '';
            borderPreview.appendChild(stage);
        }

        const svg = borderPreview?.querySelector('.border-preview-overlay');

        const clearPreviewBorders = () => {
            if (svg) svg.innerHTML = '';
        };

        const isHorizontalLine = (coords) => Math.abs(coords[1] - coords[3]) < 0.01;
        const isVerticalLine = (coords) => Math.abs(coords[0] - coords[2]) < 0.01;

        const getDoubleLineSegments = (coords, width) => {
            const [x1, y1, x2, y2] = coords;
            const lineThickness = Math.max(1, Math.round(width / 3));
            const gap = Math.max(0, width - lineThickness * 2);
            const offset = gap / 2 + lineThickness / 2;

            if (isHorizontalLine(coords)) {
                return [
                    { coords: [x1, y1 - offset, x2, y2 - offset], strokeWidth: lineThickness },
                    { coords: [x1, y1 + offset, x2, y2 + offset], strokeWidth: lineThickness }
                ];
            }

            if (isVerticalLine(coords)) {
                return [
                    { coords: [x1 - offset, y1, x2 - offset, y2], strokeWidth: lineThickness },
                    { coords: [x1 + offset, y1, x2 + offset, y2], strokeWidth: lineThickness }
                ];
            }

            return [{ coords, strokeWidth: width }];
        };

        const getDashPattern = (style, width) => {
            if (style === 'dashed') {
                return `${width * 3}, ${width * 2}`;
            }
            if (style === 'dotted') {
                const dotLength = Math.max(1, Math.round(width * 0.6));
                const gapLength = Math.max(dotLength + 1, Math.round(width * 1.6));
                return `${dotLength}, ${gapLength}`;
            }
            return null;
        };

        const applyPreviewBorder = (action) => {
            currentPreviewAction = action;
            clearPreviewBorders();

            if (action === 'clear' || !svg) return;

            const w = parseInt(borderWidthSelect.value, 10);
            const s = borderStyleSelect.value;
            const c = borderColorPicker.value;

            // Anchor strokes on the half-pixel grid, then fan out evenly so widths stay centered.
            const baseAlignOffset = 0.5;
            const outerXStart = stagePaddingX - baseAlignOffset;
            const outerYStart = stagePaddingY - baseAlignOffset;
            const outerXEnd = stagePaddingX + previewWidth + baseAlignOffset;
            const outerYEnd = stagePaddingY + previewHeight + baseAlignOffset;
            const verticalPositions = Array.from(
                { length: previewColumns + 1 },
                (_, idx) => idx === 0
                    ? outerXStart
                    : (idx === previewColumns ? outerXEnd : stagePaddingX + idx * previewCellWidth - baseAlignOffset)
            );
            const horizontalPositions = Array.from(
                { length: previewRows + 1 },
                (_, idx) => idx === 0
                    ? outerYStart
                    : (idx === previewRows ? outerYEnd : stagePaddingY + idx * previewCellHeight - baseAlignOffset)
            );
            const previewEdges = {
                left: verticalPositions[0],
                right: verticalPositions[verticalPositions.length - 1],
                top: horizontalPositions[0],
                bottom: horizontalPositions[horizontalPositions.length - 1],
                innerXs: verticalPositions.slice(1, -1),
                innerYs: horizontalPositions.slice(1, -1)
            };
            const makeHorizontal = (y) => [outerXStart, y, outerXEnd, y];
            const makeVertical = (x) => [x, outerYStart, x, outerYEnd];
            const outerHorizontalLines = [makeHorizontal(previewEdges.top), makeHorizontal(previewEdges.bottom)];
            const outerVerticalLines = [makeVertical(previewEdges.left), makeVertical(previewEdges.right)];
            const innerHorizontalLines = previewEdges.innerYs.map(makeHorizontal);
            const innerVerticalLines = previewEdges.innerXs.map(makeVertical);

            const baseLineCap = s === 'dotted' ? 'round' : 'square';
            const baseDashPattern = getDashPattern(s, w);

            const getStrokeOffsets = (effectiveWidth) => {
                const offsets = [0];
                for (let i = 1; i < effectiveWidth; i++) {
                    offsets.push(i, -i);
                }
                return offsets;
            };

            const drawLine = (coords, effectiveWidth = w, lineCapOverride, dashPatternOverride) => {
                const [x1, y1, x2, y2] = coords;
                const dashPattern = dashPatternOverride ?? baseDashPattern;
                const lineCap = lineCapOverride ?? baseLineCap;
                const horizontal = isHorizontalLine(coords);
                const offsets = getStrokeOffsets(Math.max(1, Math.round(effectiveWidth)));
                offsets.forEach(offset => {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', horizontal ? x1 : x1 + offset);
                    line.setAttribute('y1', horizontal ? y1 + offset : y1);
                    line.setAttribute('x2', horizontal ? x2 : x2 + offset);
                    line.setAttribute('y2', horizontal ? y2 + offset : y2);
                    line.setAttribute('stroke', c);
                    line.setAttribute('stroke-width', 1);
                    line.setAttribute('stroke-linecap', lineCap);
                    if (dashPattern) {
                        line.setAttribute('stroke-dasharray', dashPattern);
                    }
                    svg.appendChild(line);
                });
            };

            const drawCornerDot = (x, y) => {
                const dotSize = Math.max(1, 2 * w - 1);
                const half = dotSize / 2;
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                dot.setAttribute('x', x - half);
                dot.setAttribute('y', y - half);
                dot.setAttribute('width', dotSize);
                dot.setAttribute('height', dotSize);
                dot.setAttribute('fill', c);
                dot.setAttribute('stroke', 'none');
                svg.appendChild(dot);
            };

            // Add corner dots for outer borders
            if (action === 'all' || action === 'outer') {
                [
                    [previewEdges.left, previewEdges.top],
                    [previewEdges.right, previewEdges.top],
                    [previewEdges.left, previewEdges.bottom],
                    [previewEdges.right, previewEdges.bottom]
                ].forEach(([x, y]) => drawCornerDot(x, y));
            }

            const lines = {
                all: [
                    ...outerHorizontalLines,
                    ...outerVerticalLines,
                    ...innerHorizontalLines,
                    ...innerVerticalLines
                ],
                inner: [
                    ...innerHorizontalLines,
                    ...innerVerticalLines
                ],
                horizontal: [...innerHorizontalLines],
                vertical: [...innerVerticalLines],
                outer: [
                    ...outerHorizontalLines,
                    ...outerVerticalLines
                ],
                left: [makeVertical(previewEdges.left)],
                right: [makeVertical(previewEdges.right)],
                top: [makeHorizontal(previewEdges.top)],
                bottom: [makeHorizontal(previewEdges.bottom)]
            }[action] || [];

            lines.forEach((coords) => {
                if (s === 'double') {
                    const doubleSegments = getDoubleLineSegments(coords, w);
                    doubleSegments.forEach(segment => {
                        drawLine(
                            segment.coords,
                            segment.strokeWidth,
                            baseLineCap,
                            null
                        );
                    });
                    return;
                }

                drawLine(coords);
            });
        };

        const updatePreview = () => applyPreviewBorder(currentPreviewAction);
        
        const applyColorFromSwatch = (color) => {
            if (!color) return;
            borderColorPicker.value = color;
            borderColorHex.value = color.substring(1).toUpperCase();
            updatePreview();
        };

        const renderBorderColorSections = () => {
            if (!borderColorSections) return;
            borderColorSections.innerHTML = '';

            const colorsInUse = this.getBorderColorsInUse();
            const hideMenu = this.hideBorderMenu.bind(this);

            if (colorsInUse.length > 0) {
                this._appendColorSection(
                    borderColorSections,
                    'Colors in use',
                    colorsInUse,
                    applyColorFromSwatch,
                    hideMenu,
                    renderBorderColorSections,
                    'border'
                );
            }

            if (this.customBorderColors.length > 0) {
                this._appendColorSection(
                    borderColorSections,
                    'Custom colors',
                    this.customBorderColors,
                    applyColorFromSwatch,
                    hideMenu,
                    renderBorderColorSections,
                    'border'
                );
            }

            borderColorSections.style.display = (colorsInUse.length || this.customBorderColors.length)
                ? 'block'
                : 'none';
        };

        this.refreshBorderColorSections = renderBorderColorSections;
        
        // Initial preview and colors - show clear state by default
        applyPreviewBorder('clear');
        renderBorderColorSections();
        
        // Open custom color picker when clicking the color input
        borderColorPicker.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCustomColorPickerForBorder(borderColorPicker, borderColorHex, updatePreview);
        });
        
        // Sync hex input with color picker
        borderColorHex.addEventListener('input', (e) => {
            let value = e.target.value.trim();
            value = value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6).toUpperCase();
            borderColorHex.value = value;
            if (value.length === 6) {
                borderColorPicker.value = '#' + value;
                updatePreview();
            }
        });
        
        // Add button to add custom border color
        const addBorderColorBtn = document.getElementById('addBorderColorBtn');
        if (addBorderColorBtn) {
            addBorderColorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const color = borderColorPicker.value;
                if (color) {
                    if (this.customBorderColors.includes(color)) {
                        // Show error notification below the border menu
                        this.showErrorNotification(
                            `Color ${color} already exists`,
                            this.borderMenu
                        );
                        return;
                    }
                    this.customBorderColors.push(color);
                    renderBorderColorSections();
                    
                    // Close custom color picker if open
                    if (this.customColorPicker) {
                        this.customColorPicker.classList.add('hidden');
                        this.customColorPickerActive = false;
                    }
                }
            });
        }
        
        // Update preview on style/width change
        borderStyleSelect.addEventListener('change', updatePreview);
        borderWidthSelect.addEventListener('change', updatePreview);
        
        // Handle border option hover
        borderOptions.forEach(option => {
            option.addEventListener('mouseenter', () => {
                const action = option.dataset.action;
                applyPreviewBorder(action);
            });
            
            option.addEventListener('mouseleave', () => {
                // Reset to clear state on mouse leave
                applyPreviewBorder('clear');
            });
        });
        
        // Handle border option clicks
        borderOptions.forEach(option => {
            option.addEventListener('click', () => {
                const action = option.dataset.action;
                const style = borderStyleSelect.value;
                const width = borderWidthSelect.value + 'px';
                const color = borderColorPicker.value;
                
                this.applyBorder(action, style, width, color);
                this.hideBorderMenu();
            });
        });
    }
    
    showErrorNotification(message, parentElement) {
        // Remove any existing notification from this parent
        const existingNotification = parentElement.querySelector('.error-notification');
        if (existingNotification) {
            clearTimeout(existingNotification.dataset.timeoutId);
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.setAttribute('role', 'alert');
        notification.style.cssText = `
            background-color: #ffebee;
            border-left: 4px solid #f44336;
            color: #c62828;
            padding: var(--space-12, 12px) var(--space-16, 16px);
            margin-top: var(--space-12, 12px);
            border-radius: var(--radius-sm, 4px);
            font-size: var(--font-size-sm, 13px);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: var(--space-8, 8px);
            animation: slideInError 0.3s ease-out;
        `;
        
        // Add warning icon
        const icon = document.createElement('span');
        icon.textContent = '⚠';
        icon.setAttribute('aria-hidden', 'true');
        icon.style.cssText = `
            font-size: 16px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
        `;
        
        // Add message text
        const text = document.createElement('span');
        text.textContent = message;
        text.style.flex = '1';
        
        notification.appendChild(icon);
        notification.appendChild(text);
        
        // Append to the parent element (inside the dialog)
        parentElement.appendChild(notification);
        
        // Auto-remove after 4 seconds
        const timeoutId = setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutError 0.3s ease-out forwards';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
        
        // Store timeout ID for cleanup if needed
        notification.dataset.timeoutId = timeoutId;
    }

    showCustomColorPickerForBorder(colorInput, hexInput, updateCallback) {
        // Create picker if it doesn't exist
        if (!this.customColorPicker) {
            this.customColorPicker = this.createCustomColorPicker();
        }

        // Store callbacks for border with add button handler
        this.colorPickerCallbacks = {
            type: 'border',
            colorInput,
            hexInput,
            updateCallback,
            addCustomColor: () => {
                const color = colorInput.value;
                if (color && !this.customBorderColors.includes(color)) {
                    this.customBorderColors.push(color);
                    if (typeof this.refreshBorderColorSections === 'function') {
                        this.refreshBorderColorSections();
                    }
                }
            }
        };

        // Show picker
        this.customColorPicker.classList.remove('hidden');
        
        // Position it to the right of the border menu
        const rect = this.borderMenu.getBoundingClientRect();
        this.customColorPicker.style.left = (rect.right + 8) + 'px';
        this.customColorPicker.style.top = rect.top + 'px';

        // Get current color from the color input
        const currentColor = colorInput ? colorInput.value : '#000000';
        
        // Update hex input with current color
        if (hexInput) {
            hexInput.value = currentColor.substring(1).toUpperCase();
        }

        // Initialize with current color
        this.setCustomPickerColor(currentColor);
        this.attachFormattingFieldGuards([colorInput, hexInput]);
        
        // Keep the border menu visible
        this.customColorPickerActive = true;
    }

    applyBorder(action, style, width, color) {
        if (!this.hasSelection()) return;
        if (action !== 'clear' && color) {
            this._recordColorUsage('border', color);
        }
        if (this.currentEditingCell) {
            this.pendingEditorRefocus = true;
            this.isToolbarFormattingInteraction = true;
        }
        this.saveState(`Apply ${action} border`);
        
        const borderVal = action === 'clear' ? '' : `${width} ${style} ${color}`;
        
        // Find all contiguous regions in the selection
        const regions = this.findContiguousRegions();
        
        // Apply borders to each region independently
        regions.forEach(region => {
            const { cells } = region;

            // Collapse selected coordinates into visual blocks (merge parents or individual cells)
            const blocks = new Map();
            cells.forEach(coord => {
                const { row, col } = this.getCoordPos(coord);
                const parentCoord = this.cellToMergeParent.get(coord) || (this.mergedCells.has(coord) ? coord : null);
                const key = parentCoord || coord;
                if (blocks.has(key)) return;

                const mergeInfo = parentCoord ? this.mergedCells.get(parentCoord) : this.mergedCells.get(coord);
                const [baseRow, baseCol] = parentCoord ? this.parseCoord(parentCoord) : [row, col];
                blocks.set(key, {
                    key,
                    row: baseRow,
                    col: baseCol,
                    rows: mergeInfo?.rows || 1,
                    cols: mergeInfo?.cols || 1
                });
            });

            if (action === 'clear') {
                cells.forEach(coord => {
                    this.updateCellDataEntry(coord, data => { delete data.borders; });
                });
                return;
            }

            // Region bounds based on visual blocks (respect merged spans)
            let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;
            blocks.forEach(block => {
                minRow = Math.min(minRow, block.row);
                maxRow = Math.max(maxRow, block.row + block.rows - 1);
                minCol = Math.min(minCol, block.col);
                maxCol = Math.max(maxCol, block.col + block.cols - 1);
            });

            const sidesForBlock = (block) => {
                const topRow = block.row;
                const bottomRow = block.row + block.rows - 1;
                const leftCol = block.col;
                const rightCol = block.col + block.cols - 1;

                switch (action) {
                    case 'all':
                        return ['top', 'right', 'bottom', 'left'];
                    case 'outer':
                        return [
                            ...(topRow === minRow ? ['top'] : []),
                            ...(bottomRow === maxRow ? ['bottom'] : []),
                            ...(leftCol === minCol ? ['left'] : []),
                            ...(rightCol === maxCol ? ['right'] : [])
                        ];
                    case 'inner':
                        return [
                            ...(topRow > minRow ? ['top'] : []),
                            ...(bottomRow < maxRow ? ['bottom'] : []),
                            ...(leftCol > minCol ? ['left'] : []),
                            ...(rightCol < maxCol ? ['right'] : [])
                        ];
                    case 'horizontal':
                        return [
                            ...(topRow > minRow ? ['top'] : []),
                            ...(bottomRow < maxRow ? ['bottom'] : [])
                        ];
                    case 'vertical':
                        return [
                            ...(leftCol > minCol ? ['left'] : []),
                            ...(rightCol < maxCol ? ['right'] : [])
                        ];
                    case 'left':
                        return leftCol === minCol ? ['left'] : [];
                    case 'right':
                        return rightCol === maxCol ? ['right'] : [];
                    case 'top':
                        return topRow === minRow ? ['top'] : [];
                    case 'bottom':
                        return bottomRow === maxRow ? ['bottom'] : [];
                    default:
                        return [];
                }
            };

            const clearChildBorders = (block) => {
                if (block.rows === 1 && block.cols === 1) return;
                for (let r = block.row; r < block.row + block.rows; r++) {
                    for (let c = block.col; c < block.col + block.cols; c++) {
                        const coord = `${r},${c}`;
                        if (coord === block.key) continue;
                        this.updateCellDataEntry(coord, data => {
                            delete data.borders;
                        });
                    }
                }
            };

            blocks.forEach(block => {
                const sides = sidesForBlock(block);
                if (sides.length) {
                    this.updateCellDataEntry(block.key, data => {
                        if (!data.borders) data.borders = {};
                        sides.forEach(side => {
                            data.borders[side] = borderVal;
                        });
                    });
                }
                clearChildBorders(block);
            });
        });
        
        this._updateCellsAndAdjacent(this.selectedCells);
        this.resumeEditingAfterToolbar();
    }
    
    findContiguousRegions(coordSet = this.selectedCellCoords) {
        if (!coordSet || coordSet.size === 0) return [];

        // Convert selected coordinates to a Set for O(1) lookup
        const selectedSet = new Set(coordSet);
        const visited = new Set();
        const regions = [];
        
        // Helper to check if a cell is selected and not visited
        const isAvailable = (row, col) => {
            const coord = `${row},${col}`;
            return selectedSet.has(coord) && !visited.has(coord);
        };
        
        // Flood fill to find a contiguous region
        const floodFill = (startRow, startCol) => {
            const regionCells = [];
            const queue = [[startRow, startCol]];
            let minRow = startRow, maxRow = startRow;
            let minCol = startCol, maxCol = startCol;
            
            while (queue.length > 0) {
                const [row, col] = queue.shift();
                const coord = `${row},${col}`;
                
                if (visited.has(coord)) continue;
                if (!selectedSet.has(coord)) continue;
                
                visited.add(coord);
                regionCells.push(coord);
                
                // Update bounds
                minRow = Math.min(minRow, row);
                maxRow = Math.max(maxRow, row);
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
                
                // Check 4 adjacent cells
                const adjacent = [
                    [row - 1, col], // up
                    [row + 1, col], // down
                    [row, col - 1], // left
                    [row, col + 1]  // right
                ];
                
                adjacent.forEach(([r, c]) => {
                    if (isAvailable(r, c)) {
                        queue.push([r, c]);
                    }
                });
            }
            
            return { minRow, maxRow, minCol, maxCol, cells: regionCells };
        };
        
        // Find all regions
        selectedSet.forEach(coord => {
            if (!visited.has(coord)) {
                const { row, col } = this.getCoordPos(coord);
                const region = floodFill(row, col);
                regions.push(region);
            }
        });
        
        return regions;
    }

    // Identify merged cells where the selection covers hidden children via header selections
    getMergedSelectionPassThroughRegions() {
        if (!this.hasSelection() || !this.mergedCells.size) return [];

        const regions = [];

        this.mergedCells.forEach((mergeInfo, parentCoord) => {
            // If the parent is already selected, the normal selection styling is enough
            if (this.selectedCellCoords.has(parentCoord)) return;

            const [parentRow, parentCol] = this.parseCoord(parentCoord);
            const selectedParts = [];

            for (let r = 0; r < mergeInfo.rows; r++) {
                for (let c = 0; c < mergeInfo.cols; c++) {
                    const row = parentRow + r;
                    const col = parentCol + c;
                    const coord = `${row},${col}`;
                    if (this.selectedCellCoords.has(coord)) selectedParts.push({ row, col });
                }
            }

            if (!selectedParts.length) return;

            const minRow = Math.min(...selectedParts.map(item => item.row));
            const maxRow = Math.max(...selectedParts.map(item => item.row));
            const minCol = Math.min(...selectedParts.map(item => item.col));
            const maxCol = Math.max(...selectedParts.map(item => item.col));

            regions.push({
                row: minRow,
                col: minCol,
                rows: maxRow - minRow + 1,
                cols: maxCol - minCol + 1
            });
        });

        return regions;
    }

    refreshLayoutAfterMergeChange({ recalcAutoHeights = true } = {}) {
        if (recalcAutoHeights) {
            this.recalculateAutoRowHeights();
        }
        this.updateGridSize();
        this.repositionCells();
        this.updateHeaderPositions();
        this.updateVisibleCells();
        this.renderSelectionOverlays();
        this.renderBorderOverlays();
    }
    
    handleMergeCells() {
        if (!this.hasSelection()) {
            this.log('No cells selected for merging');
            return;
        }

        const bounds = this.getSelectionBounds();
        if (!bounds) return;

        const { minRow, maxRow, minCol, maxCol, coords } = bounds;
        const rows = maxRow - minRow + 1;
        const cols = maxCol - minCol + 1;
        const expectedCells = rows * cols;
        const affectedRows = new Set();
        for (let r = minRow; r <= maxRow; r++) {
            affectedRows.add(r);
        }

        // Check if selection is contiguous (rectangle)
        if (coords.length !== expectedCells) {
            alert('Can only merge contiguous (rectangular) cell selections');
            return;
        }

        // Check if selection forms a proper rectangle
        const isRectangle = this.isRectangularSelection(coords, minRow, maxRow, minCol, maxCol);
        if (!isRectangle) {
            alert('Can only merge contiguous (rectangular) cell selections');
            return;
        }

        // Check if this is already a merged cell with exact same dimensions (toggle behavior)
        const parentCoord = `${minRow},${minCol}`;
        const existingMerge = this.mergedCells.get(parentCoord);
        
        if (existingMerge && existingMerge.rows === rows && existingMerge.cols === cols) {
            // This is already merged with exact dimensions - unmerge it
            this.saveState(`Unmerge ${rows}x${cols} cells`);
            this.unmergeCells(minRow, minCol);
            this.log(`Unmerged ${rows}x${cols} cells at ${this.getCellAddress(minRow, minCol)}`);
            this.updateMergeButton();
            this.recalculateAutoRowHeights(affectedRows);
            this.refreshLayoutAfterMergeChange({ recalcAutoHeights: false });
            return;
        }

        // Single cell selected - nothing to merge
        if (rows === 1 && cols === 1) {
            this.log('Single cell selected - nothing to merge');
            return;
        }

        // If we're here, we're merging cells (possibly including already-merged cells)
        // First, unmerge any existing merges within the selection
        const mergesToUnmerge = new Set();
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                
                // Check if this is a merge parent
                if (this.mergedCells.has(coordKey)) {
                    mergesToUnmerge.add(coordKey);
                }
                
                // Check if this is a merge child
                const parentKey = this.cellToMergeParent.get(coordKey);
                if (parentKey) {
                    mergesToUnmerge.add(parentKey);
                }
            }
        }

        // Unmerge all existing merges in the selection
        mergesToUnmerge.forEach(mergeParent => {
            const [parentRow, parentCol] = this.parseCoord(mergeParent);
            const info = this.mergedCells.get(mergeParent);
            const span = info?.rows || 1;
            for (let r = 0; r < span; r++) {
                affectedRows.add(parentRow + r);
            }
            this.unmergeCells(parentRow, parentCol, false, { refreshLayout: false }); // false = don't update visuals yet
        });

        // Now merge the entire selection
        this.saveState(`Merge ${rows}x${cols} cells`);
        this.mergeCells(minRow, minCol, rows, cols, { refreshLayout: false });
        for (let r = 0; r < rows; r++) {
            affectedRows.add(minRow + r);
        }
        this.log(`Merged ${rows}x${cols} cells at ${this.getCellAddress(minRow, minCol)}`);
        // Refresh merge button state immediately after applying the merge
        this.updateMergeButton();
        this.recalculateAutoRowHeights(affectedRows);
        this.refreshLayoutAfterMergeChange({ recalcAutoHeights: false });
    }
    
    unmergeCells(startRow, startCol, updateVisuals = true, { refreshLayout = false, recalcAutoHeights = true } = {}) {
        const parentCoord = `${startRow},${startCol}`;
        const mergeInfo = this.mergedCells.get(parentCoord);
        
        if (!mergeInfo) {
            this.log('No merge found at this location');
            return;
        }

        // Remove all child cell mappings
        mergeInfo.childCells.forEach(childCoord => {
            this.cellToMergeParent.delete(childCoord);
        });

        // Remove the merge info
        this.mergedCells.delete(parentCoord);

        // Update visuals if requested
        if (updateVisuals) {
            this.removeUnmergeVisuals(startRow, startCol, mergeInfo.rows, mergeInfo.cols);
        }
        if (refreshLayout) {
            this.refreshLayoutAfterMergeChange({ recalcAutoHeights });
        }
    }
    
    removeUnmergeVisuals(startRow, startCol, rows, cols) {
        // Reset ALL cells in the merged area to individual cells
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const row = startRow + r;
                const col = startCol + c;
                const cell = this.getCellAt(row, col);
                
                if (cell) {
                    // Reset to normal dimensions
                    cell.style.width = this.getColumnWidth(col) + 'px';
                    cell.style.height = this.getRowHeight(row) + 'px';
                    cell.style.zIndex = '';
                    cell.style.display = '';
                    cell.classList.remove('merged-cell', 'merged-child');
                    delete cell.dataset.mergedRows;
                    delete cell.dataset.mergedCols;
                }
            }
        }

        // Ensure border overlay updates right after unmerge
        this.renderBorderOverlays();
    }

    isRectangularSelection(coords, minRow, maxRow, minCol, maxCol) {
        // Check if all cells in the rectangle are present
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                if (!coords.some(c => c.row === row && c.col === col)) {
                    return false;
                }
            }
        }
        return true;
    }

    mergeCells(startRow, startCol, rows, cols, { refreshLayout = false, recalcAutoHeights = true } = {}) {
        const parentCoord = `${startRow},${startCol}`;
        const childCells = new Set();

        const textSources = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const row = startRow + r;
                const col = startCol + c;
                const coord = `${row},${col}`;
                const data = this.cellData.get(coord);
                if (this.cellHasText(data)) {
                    textSources.push({ coord, data });
                }
            }
        }

        if (textSources.length === 1) {
            const { coord, data } = textSources[0];
            const clonedData = this.cloneCellRecord(data);
            if (coord !== parentCoord) {
                this.cellData.delete(coord);
            }
            if (clonedData) {
                this.cellData.set(parentCoord, clonedData);
            }
        }

        // First, ensure all cells in the range are visible and reset
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const row = startRow + r;
                const col = startCol + c;
                const cell = this.getCellAt(row, col);
                
                if (cell) {
                    // Reset any previous merge styling
                    cell.style.width = this.getColumnWidth(col) + 'px';
                    cell.style.height = this.getRowHeight(row) + 'px';
                    cell.style.zIndex = '';
                    cell.style.display = '';
                    cell.classList.remove('merged-cell', 'merged-child');
                    delete cell.dataset.mergedRows;
                    delete cell.dataset.mergedCols;
                }
            }
        }

        // Collect all child cells (except the parent)
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const row = startRow + r;
                const col = startCol + c;
                const coordKey = `${row},${col}`;
                
                if (r === 0 && c === 0) continue; // Skip parent cell
                
                childCells.add(coordKey);
                this.cellToMergeParent.set(coordKey, parentCoord);
            }
        }

        // Store merge info
        this.mergedCells.set(parentCoord, {
            rows,
            cols,
            childCells
        });

        const maxRow = startRow + rows - 1;
        const maxCol = startCol + cols - 1;
        this.recalculatePersistedRange(maxRow, maxCol);

        // Update visual representation
        this.applyMergeVisuals(startRow, startCol, rows, cols);
        if (refreshLayout) {
            this.refreshLayoutAfterMergeChange({ recalcAutoHeights });
        }
    }

    applyMergeVisuals(startRow, startCol, rows, cols) {
        const parentCell = this.getCellAt(startRow, startCol);
        if (!parentCell) return;

        // Calculate merged cell dimensions
        let totalWidth = 0;
        let totalHeight = 0;

        for (let c = 0; c < cols; c++) {
            totalWidth += this.getColumnWidth(startCol + c);
        }

        for (let r = 0; r < rows; r++) {
            totalHeight += this.getRowHeight(startRow + r);
        }

        // Apply merged cell styles
        parentCell.style.width = totalWidth + 'px';
        parentCell.style.height = totalHeight + 'px';
        parentCell.style.zIndex = '3';
        parentCell.classList.add('merged-cell');
        parentCell.dataset.mergedRows = rows;
        parentCell.dataset.mergedCols = cols;

        // Hide child cells
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (r === 0 && c === 0) continue; // Skip parent
                
                const row = startRow + r;
                const col = startCol + c;
                const childCell = this.getCellAt(row, col);
                
                if (childCell) {
                    childCell.style.display = 'none';
                    childCell.classList.add('merged-child');
                }
            }
        }

        // Redraw borders immediately so merged areas reflect new geometry
        this.renderBorderOverlays();
    }

    isCellMerged(row, col) {
        const coordKey = `${row},${col}`;
        return this.mergedCells.has(coordKey) || this.cellToMergeParent.has(coordKey);
    }

    getMergeParent(row, col) {
        const coordKey = `${row},${col}`;
        if (this.mergedCells.has(coordKey)) {
            return { row, col };
        }
        
        const parentCoord = this.cellToMergeParent.get(coordKey);
        if (parentCoord) {
            const [parentRow, parentCol] = this.parseCoord(parentCoord);
            return { row: parentRow, col: parentCol };
        }
        
        return null;
    }

    // Extract adjacent cell update logic (reusable)
    _updateCellsAndAdjacent(cells) {
        const adjacentCells = new Set();
        
        cells.forEach(cell => {
            // Update the cell itself
            this.updateCellDisplay(cell, this.cellData.get(this.getCoord(cell)));
            
            // Collect adjacent cells
            const { row, col } = this.getCellPos(cell);
            [
                this.getCellAt(row - 1, col),
                this.getCellAt(row + 1, col),
                this.getCellAt(row, col - 1),
                this.getCellAt(row, col + 1)
            ].forEach(adjCell => adjCell && adjacentCells.add(adjCell));
        });
        
        // Update adjacent cells
        adjacentCells.forEach(cell => {
            this.updateCellDisplay(cell, this.cellData.get(this.getCoord(cell)) || {});
        });

        this.renderBorderOverlays();
    }

    handleFormulaKeyDown(event) {
        const state = this.formulaSuggestionState || {};
        const hasSuggestions = state.visible && Array.isArray(state.items) && state.items.length > 0;
        const hasHintOnly = state.visible && !hasSuggestions && !!state.hint;

        if (state.visible) {
            if (event.key === 'ArrowDown' && hasSuggestions) {
                event.preventDefault();
                this.moveFormulaSuggestion(1);
                return;
            }
            if (event.key === 'ArrowUp' && hasSuggestions) {
                event.preventDefault();
                this.moveFormulaSuggestion(-1);
                return;
            }
            if (event.key === 'Tab') {
                if (hasSuggestions) {
                    event.preventDefault();
                    this.applyActiveSuggestion();
                } else {
                    this.hideFormulaSuggestions();
                }
                return;
            }
            if (event.key === 'Enter' && hasSuggestions && state.activeIndex >= 0) {
                event.preventDefault();
                this.applyActiveSuggestion();
                return;
            }
            if (event.key === 'Escape') {
                this.hideFormulaSuggestions();
                return;
            }
        }

        if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace', 'Delete'].includes(event.key)) {
            setTimeout(() => this.updateFormulaSuggestions(), 0);
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.primaryCell) {
                const oldValue = this.cellData.get(this.getCoord(this.primaryCell))?.value || '';
                const newValue = this.formulaInput.value;
                
                if (oldValue !== newValue) {
                    this.saveState(`Update cell ${this.primaryCell.dataset.address} via formula bar`);
                }
                
                this.updateCellValue(this.primaryCell, newValue);
                this.log(`Updated cell ${this.primaryCell.dataset.address} via formula bar: "${newValue}"`);
            }
            this.hideFormulaSuggestions();
            this.formulaInput.blur();
        } else if (hasHintOnly) {
            // Keep hint responsive to caret changes.
            setTimeout(() => this.updateFormulaSuggestions(), 0);
        }
    }

    handleFormulaInput() {
        if (this.primaryCell && !this.currentEditingCell) {
            const newValue = this.formulaInput.value;
            this.updateCellValue(this.primaryCell, newValue);
        }
        this.updateFormulaSuggestions();
    }
    
    handleFormulaBlur() {
        setTimeout(() => {
            if (this.formulaInput && this.formulaInput.matches(':focus')) return;
            this.hideFormulaSuggestions();
        }, 50);
    }

    handleFormulaSuggestionMouseDown(event) {
        event.preventDefault();
    }

    handleFormulaSuggestionClick(event) {
        const item = event.target.closest('.formula-suggestion-item');
        if (!item) return;
        const index = parseInt(item.dataset.index, 10);
        if (Number.isNaN(index)) return;
        this.applyFormulaSuggestion(index);
    }

    updateFormulaSuggestions() {
        if (!this.formulaSuggestionsPanel || !this.formulaInput) return;
        const isFocused = document.activeElement === this.formulaInput;
        const value = this.formulaInput.value || '';
        const caret = this.formulaInput.selectionStart ?? value.length;

        if (!isFocused || !value.startsWith('=') || caret === 0) {
            this.hideFormulaSuggestions();
            return;
        }

        const previousState = this.formulaSuggestionState || {};
        const tokenInfo = this.getFormulaFunctionToken(value, caret);
        const functionHint = this.getActiveFunctionContext(value, caret);

        let suggestions = [];
        if (tokenInfo && tokenInfo.shouldSuggest) {
            suggestions = this.getFunctionSuggestions(tokenInfo.word);
            if (!suggestions.length && tokenInfo.word.length === 0) {
                suggestions = [...this.formulaFunctions];
            }
        }

        if (!suggestions.length && !functionHint) {
            this.hideFormulaSuggestions();
            return;
        }

        let activeIndex = -1;
        if (suggestions.length) {
            const prevActiveItem = (previousState.items || [])[previousState.activeIndex ?? -1];
            if (prevActiveItem) {
                const idx = suggestions.findIndex(item => item.name === prevActiveItem.name);
                activeIndex = idx >= 0 ? idx : 0;
            } else {
                activeIndex = 0;
            }
        }

        this.formulaSuggestionState = {
            items: suggestions,
            activeIndex,
            token: tokenInfo ? { start: tokenInfo.start, end: tokenInfo.end, word: tokenInfo.word } : null,
            hint: functionHint,
            visible: true
        };

        this.renderFormulaSuggestions();
    }

    getFunctionSuggestions(fragment = '') {
        const upper = fragment.toUpperCase();
        let matches = this.formulaFunctions.filter(fn => fn.name.startsWith(upper));
        if (!matches.length && upper) {
            matches = this.formulaFunctions.filter(fn => fn.name.includes(upper));
        }
        return matches;
    }

    renderFormulaSuggestions() {
        if (!this.formulaSuggestionsPanel) return;
        const state = this.formulaSuggestionState;
        if (!state.visible) {
            this.hideFormulaSuggestions();
            return;
        }

        let html = '';

        if (state.hint) {
            const { metadata, argumentIndex } = state.hint;
            html += '<div class="formula-suggestion-hint">';
            html += `<span class="formula-suggestion-hint-name">${escapeHTML(metadata.signature)}</span>`;
            if (metadata.parameters && metadata.parameters.length) {
                const params = metadata.parameters;
                const activeIndex = Math.min(argumentIndex ?? 0, params.length - 1);
                const paramsHtml = params.map((param, idx) => {
                    const classes = ['formula-suggestion-param'];
                    if (idx === activeIndex) classes.push('is-active');
                    return `<span class="${classes.join(' ')}">${escapeHTML(param)}</span>`;
                }).join('<span class="formula-suggestion-param-separator">, </span>');
                html += `<div class="formula-suggestion-params">${paramsHtml}</div>`;
            }
            if (metadata.description) {
                html += `<div class="formula-suggestion-description">${escapeHTML(metadata.description)}</div>`;
            }
            html += '</div>';
        }

        if (state.items.length) {
            html += '<div class="formula-suggestion-list">';
            state.items.forEach((item, index) => {
                const classes = ['formula-suggestion-item'];
                if (index === state.activeIndex) classes.push('is-active');
                html += `<div class="${classes.join(' ')}" data-index="${index}">`;
                html += `<div class="formula-suggestion-name">${escapeHTML(item.name)}</div>`;
                if (item.description) {
                    html += `<div class="formula-suggestion-description">${escapeHTML(item.description)}</div>`;
                }
                html += '</div>';
            });
            html += '</div>';
        }

        this.formulaSuggestionsPanel.innerHTML = html;
        this.formulaSuggestionsPanel.classList.remove('hidden');
        this.ensureActiveSuggestionVisible();
    }

    ensureActiveSuggestionVisible() {
        if (!this.formulaSuggestionsPanel) return;
        const activeItem = this.formulaSuggestionsPanel.querySelector('.formula-suggestion-item.is-active');
        if (!activeItem) return;
        const panelRect = this.formulaSuggestionsPanel.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        if (itemRect.top < panelRect.top) {
            activeItem.scrollIntoView({ block: 'nearest' });
        } else if (itemRect.bottom > panelRect.bottom) {
            activeItem.scrollIntoView({ block: 'nearest' });
        }
    }

    hideFormulaSuggestions() {
        if (!this.formulaSuggestionsPanel) return;
        this.formulaSuggestionState = this.createDefaultFormulaSuggestionState();
        this.formulaSuggestionsPanel.classList.add('hidden');
        this.formulaSuggestionsPanel.innerHTML = '';
    }

    moveFormulaSuggestion(offset) {
        const state = this.formulaSuggestionState;
        if (!state.items.length) return;
        let nextIndex = state.activeIndex + offset;
        if (nextIndex < 0) nextIndex = state.items.length - 1;
        if (nextIndex >= state.items.length) nextIndex = 0;
        state.activeIndex = nextIndex;
        this.renderFormulaSuggestions();
    }

    applyActiveSuggestion() {
        if (this.formulaSuggestionState.activeIndex < 0) return;
        this.applyFormulaSuggestion(this.formulaSuggestionState.activeIndex);
    }

    createFormulaFunctions() {
        const params = ['value1', '[value2, ...]'];
        const defs = [
            ['SUM', 'Adds all of the numbers in a range of cells.', values => values.reduce((total, value) => total + value, 0)],
            ['AVG', 'Returns the average of its arguments.', values => values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0],
            ['COUNT', 'Counts how many numbers are in the list of arguments.', values => values.length],
            ['MIN', 'Returns the smallest number in a set of values.', values => values.length ? Math.min(...values) : 0],
            ['MAX', 'Returns the largest number in a set of values.', values => values.length ? Math.max(...values) : 0],
            ['MEDIAN', 'Returns the median (middle value) of the given numbers.', values => {
                if (!values.length) return 0;
                const sorted = [...values].sort((a, b) => a - b);
                const mid = sorted.length >> 1;
                return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
            }]
        ];
        return defs.map(([name, description, evaluate]) => ({
            name,
            signature: `${name}(value1, [value2, ...])`,
            parameters: params,
            description,
            evaluate
        }));
    }

    createDefaultFormulaSuggestionState() {
        return {
            items: [],
            activeIndex: -1,
            token: null,
            hint: null,
            visible: false
        };
    }

    applyFormulaSuggestion(index) {
        const state = this.formulaSuggestionState;
        const token = state.token;
        const item = state.items[index];
        if (!this.formulaInput || !item) return;

        const value = this.formulaInput.value || '';
        const caret = this.formulaInput.selectionStart ?? value.length;

        const start = token ? token.start : caret;
        const end = token ? token.end : caret;

        const before = value.slice(0, start);
        const after = value.slice(end);

        let insertion = item.name;
        let newCaret;
        if (!after.startsWith('(')) {
            insertion += '(';
            newCaret = start + insertion.length;
        } else {
            newCaret = start + insertion.length + 1;
        }

        const newValue = before + insertion + after;
        this.formulaInput.value = newValue;
        this.formulaInput.focus();
        this.formulaInput.setSelectionRange(newCaret, newCaret);

        this.handleFormulaInput();
        this.updateFormulaSuggestions();
    }

    getFormulaFunctionToken(value, caret) {
        let pos = Math.min(Math.max(caret, 0), value.length);
        let start = pos;
        while (start > 0 && /[A-Za-z]/.test(value[start - 1])) {
            start--;
        }
        const word = value.slice(start, pos);
        const precedingChar = start > 0 ? value[start - 1] : '';
        const allowedPrev = start <= 1 || /[=+\-*/,(^]/.test(precedingChar) || /\s/.test(precedingChar);
        const shouldSuggest = allowedPrev;
        return { start, end: pos, word, shouldSuggest };
    }

    getActiveFunctionContext(value, caret) {
        const stack = [];
        for (let i = 0; i < caret; i++) {
            const ch = value[i];
            if (ch === '(') {
                let j = i - 1;
                let name = '';
                while (j >= 0 && /[A-Za-z]/.test(value[j])) {
                    name = value[j] + name;
                    j--;
                }
                stack.push({ name: name.toUpperCase(), index: i });
            } else if (ch === ')') {
                if (stack.length) stack.pop();
            }
        }

        while (stack.length) {
            const ctx = stack.pop();
            if (!ctx || !ctx.name) continue;
            const metadata = this.formulaFunctionsMap.get(ctx.name);
            if (metadata) {
                const argumentIndex = this.getActiveArgumentIndex(value, ctx.index, caret);
                return { metadata, argumentIndex };
            }
        }

        return null;
    }

    getActiveArgumentIndex(value, openParenIndex, caret) {
        let depth = 0;
        let argumentIndex = 0;
        for (let i = openParenIndex + 1; i < caret; i++) {
            const ch = value[i];
            if (ch === '(') {
                depth++;
            } else if (ch === ')') {
                if (depth === 0) break;
                depth = Math.max(0, depth - 1);
            } else if (ch === ',' && depth === 0) {
                argumentIndex++;
            }
        }
        return argumentIndex;
    }
    
    adjustFormulaReferences(formula, rowOffset, colOffset) {
        if (!formula || !formula.startsWith('=')) {
            return formula;
        }

        // Match cell references like A1, $A1, A$1, $A$1
        const cellRefRegex = /(\$?)([A-Z]+)(\$?)(\d+)/g;
        
        // rowOffset/colOffset represent how far the destination cell moved relative to the source cell.
        // Absolute markers ($) freeze the corresponding axis so those offsets are ignored when present.
        return formula.replace(cellRefRegex, (match, colAbs, colName, rowAbs, rowNum) => {
            let targetCol = this.getColumnIndex(colName);
            let targetRow = parseInt(rowNum) - 1;
            
            // Adjust column if not absolute
            if (colAbs !== '$') {
                targetCol += colOffset;
            }
            
            // Adjust row if not absolute
            if (rowAbs !== '$') {
                targetRow += rowOffset;
            }
            
            // Ensure we don't go out of bounds
            targetCol = Math.max(0, Math.min(this.config.maxCols - 1, targetCol));
            targetRow = Math.max(0, Math.min(this.config.maxRows - 1, targetRow));
            
            // Reconstruct the reference
            const newColName = this.getColumnName(targetCol);
            const newRowNum = targetRow + 1;
            
            return `${colAbs}${newColName}${rowAbs}${newRowNum}`;
        });
    }

    updateCellValue(cell, value) {
        const cellKey = this.getCoord(cell);
        const { row, col } = this.getCellPos(cell);
        
        const cellData = this.updateCellDataEntry(cellKey, data => {
            if (value) {
                data.value = value;
            } else {
                delete data.value;
            }
        }) || {};

        this.updateCellDisplay(cell, cellData);
    }

    handleFormulaFocus() {
        if (this.primaryCell) {
            const cellKey = this.getCoord(this.primaryCell);
            const cellData = this.cellData.get(cellKey);
            this.formulaInput.value = cellData ? (cellData.value || '') : '';
        }
        this.updateFormulaSuggestions();
    }

    handleCellReferenceKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const input = this.cellReference.value.trim().toUpperCase();
            
            if (input.includes(':')) {
                const [start, end] = input.split(':');
                const startParsed = this.parseCellAddress(start);
                const endParsed = this.parseCellAddress(end);
                
                if (startParsed && endParsed) {
                    this.scrollToCell(startParsed.row, startParsed.col);
                    
                    const minRow = Math.min(startParsed.row, endParsed.row);
                    const maxRow = Math.max(startParsed.row, endParsed.row);
                    const minCol = Math.min(startParsed.col, endParsed.col);
                    const maxCol = Math.max(startParsed.col, endParsed.col);
                    
                    const rangeCells = [];
                    for (let r = minRow; r <= maxRow; r++) {
                        for (let c = minCol; c <= maxCol; c++) {
                            const cell = this.getCellAt(r, c) || this.createCell(r, c);
                            rangeCells.push(cell);
                        }
                    }
                    
                    this.clearAllSelections();
                    this.selectCells(rangeCells, true);
                }
            } else {
                const parsed = this.parseCellAddress(input);
                if (parsed) {
                    this.scrollToCell(parsed.row, parsed.col);
                    const cell = this.getCellAt(parsed.row, parsed.col) || this.createCell(parsed.row, parsed.col);
                    this.clearAllSelections();
                    this.selectCells([cell], true);
                }
            }
            this.cellReference.blur();
        }
    }
    
    parseFormula(formula, cellRow, cellCol) {
        if (!formula || !formula.startsWith('=')) {
            return formula;
        }

        try {
            let expression = formula.substring(1).trim();
            const context = { cellRow, cellCol };
            
            // Replace functions FIRST (before cell refs are replaced)
            expression = this.replaceFunctions(expression, context);
            
            // Then replace individual cell references
            expression = this.replaceCellReferences(expression, cellRow, cellCol);
            
            const result = this.evaluateExpression(expression, context);
            return result;
        } catch (error) {
            return '#ERROR!';
        }
    }

    replaceCellReferences(expression, currentRow, currentCol) {
        // Match cell references like A1, $A1, A$1, $A$1, B2, etc.
        const cellRefRegex = /(\$?)([A-Z]+)(\$?)(\d+)/g;
        
        return expression.replace(cellRefRegex, (match, colAbs, colName, rowAbs, rowNum) => {
            let targetCol = this.getColumnIndex(colName);
            let targetRow = parseInt(rowNum) - 1;
            
            // Handle relative references (non-absolute references are not implemented for copying yet)
            // For now, we just get the absolute reference
            
            const cellKey = `${targetRow},${targetCol}`;
            const cellData = this.cellData.get(cellKey);
            
            if (!cellData || !cellData.value) {
                return '0'; // Empty cells are treated as 0
            }
            
            // If the cell contains a formula, evaluate it recursively
            if (cellData.value.startsWith('=')) {
                const evaluated = this.parseFormula(cellData.value, targetRow, targetCol);
                return this.isNumeric(evaluated) ? evaluated : '0';
            }
            
            // Return the cell value
            return this.isNumeric(cellData.value) ? cellData.value : `"${cellData.value}"`;
        });
    }

    isNumeric(value) {
        if (typeof value === 'number') return true;
        if (typeof value === 'string') {
            return !isNaN(value) && !isNaN(parseFloat(value));
        }
        return false;
    }

    evaluateExpression(expression, context = {}, options = {}) {
        // Handle basic functions
        if (!options.skipFunctionReplacement) {
            expression = this.replaceFunctions(expression, context);
        }
        
        try {
            // Use Function constructor for safe evaluation
            // This is safer than eval but still requires caution
            const func = new Function('return ' + expression);
            const result = func();
            
            // Round to avoid floating point issues
            if (typeof result === 'number') {
                return Math.round(result * 1000000000) / 1000000000;
            }
            
            return result;
        } catch (error) {
            return '#ERROR!';
        }
    }

    replaceFunctions(expr, context = {}) {
        if (!expr || typeof expr !== 'string') return expr;
        
        let result = '';
        let index = 0;
        const length = expr.length;
        
        while (index < length) {
            const char = expr[index];
            if (/[A-Za-z]/.test(char)) {
                let nameEnd = index;
                while (nameEnd < length && /[A-Za-z0-9_]/.test(expr[nameEnd])) {
                    nameEnd++;
                }
                
                let lookAhead = nameEnd;
                while (lookAhead < length && /\s/.test(expr[lookAhead])) {
                    lookAhead++;
                }
                
                if (expr[lookAhead] === '(') {
                    const fnName = expr.slice(index, nameEnd);
                    const { content, endIndex } = this.extractParenthesizedContent(expr, lookAhead);
                    
                    if (endIndex !== -1) {
                        const op = this.formulaFunctionsMap.get(fnName.toUpperCase())?.evaluate;
                        if (typeof op === 'function') {
                            const args = this.splitFunctionArguments(content);
                            const collectedValues = [];
                            
                            args.forEach(arg => {
                                const values = this.evaluateFunctionArgument(arg, context);
                                collectedValues.push(...values);
                            });
                            
                            const numericValues = collectedValues
                                .map(v => (typeof v === 'number') ? v : parseFloat(v))
                                .filter(v => !isNaN(v));
                            
                            const computed = op(numericValues);
                            result += String(Number.isFinite(computed) ? computed : 0);
                            index = endIndex + 1;
                            continue;
                        } else {
                            result += '0';
                            index = endIndex + 1;
                            continue;
                        }
                    }
                }
            }
            
            result += char;
            index++;
        }
        
        return result;
    }

    extractParenthesizedContent(expr, startIndex) {
        let depth = 0;
        let endIndex = -1;
        for (let i = startIndex; i < expr.length; i++) {
            const ch = expr[i];
            if (ch === '(') {
                if (depth === 0) {
                    startIndex = i;
                }
                depth++;
            } else if (ch === ')') {
                depth--;
                if (depth === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
        const content = endIndex !== -1 ? expr.slice(startIndex + 1, endIndex) : '';
        return { content, endIndex };
    }

    splitFunctionArguments(argsString) {
        const args = [];
        let current = '';
        let depth = 0;
        let quoteChar = null;
        
        for (let i = 0; i < argsString.length; i++) {
            const ch = argsString[i];
            
            if (quoteChar) {
                current += ch;
                if (ch === quoteChar && argsString[i - 1] !== '\\') {
                    quoteChar = null;
                }
                continue;
            }
            
            if (ch === '"' || ch === "'") {
                quoteChar = ch;
                current += ch;
                continue;
            }
            
            if (ch === '(') {
                depth++;
                current += ch;
                continue;
            }
            
            if (ch === ')') {
                depth = Math.max(0, depth - 1);
                current += ch;
                continue;
            }
            
            if (ch === ',' && depth === 0) {
                args.push(current.trim());
                current = '';
                continue;
            }
            
            current += ch;
        }
        
        if (current.trim()) {
            args.push(current.trim());
        }
        
        return args;
    }

    evaluateFunctionArgument(argument, context = {}) {
        const trimmed = argument.trim();
        if (!trimmed) return [];
        
        const rangeMatch = trimmed.match(/^([$]?[A-Z]+[$]?\d+)\s*:\s*([$]?[A-Z]+[$]?\d+)$/i);
        if (rangeMatch) {
            return this.getRangeValues(rangeMatch[1], rangeMatch[2]);
        }
        
        const value = this.evaluateSubExpression(trimmed, context);
        if (value === '#ERROR!' || value === undefined || value === null || value === '') {
            return [];
        }
        
        if (Array.isArray(value)) {
            return value
                .map(v => (typeof v === 'number') ? v : parseFloat(v))
                .filter(v => !isNaN(v));
        }
        
        if (typeof value === 'number') {
            return [value];
        }
        
        if (this.isNumeric(value)) {
            return [parseFloat(value)];
        }
        
        return [];
    }

    evaluateSubExpression(expression, context = {}) {
        const trimmed = expression.trim();
        if (!trimmed) return 0;
        
        let inner = this.replaceFunctions(trimmed, context);
        const { cellRow, cellCol } = context;
        if (typeof cellRow === 'number' && typeof cellCol === 'number') {
            inner = this.replaceCellReferences(inner, cellRow, cellCol);
        }
        
        return this.evaluateExpression(inner, context, { skipFunctionReplacement: true });
    }

    getRangeValues(startRef, endRef) {
        const start = this.parseCellAddress(startRef);
        const end = this.parseCellAddress(endRef);
        
        if (!start || !end) return [];
        
        const values = [];
        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const cellKey = `${row},${col}`;
                const cellData = this.cellData.get(cellKey);
                
                if (cellData && cellData.value) {
                    let value = cellData.value;
                    
                    // If it's a formula, evaluate it
                    if (value.startsWith('=')) {
                        value = this.parseFormula(value, row, col);
                    }
                    
                    if (this.isNumeric(value)) {
                        values.push(parseFloat(value));
                    }
                }
            }
        }
        
        return values;
    }

    downloadHTML(fullHTML) {
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'index.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.log('Downloaded index.html locally');
    }

    async resolveCodebergRepo() {
        if (this.codebergRepo) return this.codebergRepo;

        const fromConfig = await this.loadRepoConfig();
        if (fromConfig) {
            this.codebergRepo = fromConfig;
            return fromConfig;
        }

        const detected = this.detectRepoFromHostname();
        if (detected) {
            this.codebergRepo = detected;
            return detected;
        }

        return null;
    }

    detectRepoFromHostname() {
        if (typeof window === 'undefined') return null;

        const rawHost = window.location.hostname || '';
        const host = rawHost.toLowerCase();
        const pathSegments = window.location.pathname
            .split('/')
            .filter(Boolean)
            .map(segment => decodeURIComponent(segment).trim())
            .filter(Boolean);
        const firstSegment = pathSegments[0];
        const hasCustomRepo = firstSegment && !firstSegment.toLowerCase().startsWith('index.');

        if (host.endsWith('.codeberg.page')) {
            const subdomain = rawHost.split('.')[0];
            if (!subdomain) return null;
            return {
                owner: subdomain,
                repo: hasCustomRepo ? firstSegment : 'pages'
            };
        }

        if (host.endsWith('.codeberg.org')) {
            const parts = rawHost.split('.');
            if (parts.length >= 3) {
                const owner = parts[parts.length - 3];
                if (owner) {
                    return {
                        owner,
                        repo: hasCustomRepo ? firstSegment : 'pages'
                    };
                }
            }
        }

        if (host === 'codeberg.org' && pathSegments.length >= 2) {
            return {
                owner: pathSegments[0],
                repo: pathSegments[1]
            };
        }

        return null;
    }

    async loadRepoConfig() {
        if (this.repoConfigPromise) return this.repoConfigPromise;

        if (typeof fetch !== 'function') {
            this.repoConfigPromise = Promise.resolve(null);
            return this.repoConfigPromise;
        }

        this.repoConfigPromise = fetch('codeberg-repo.json', { cache: 'no-store' })
            .then(response => response.ok ? response.json() : null)
            .then(data => {
                if (data?.owner && data?.repo) {
                    const normalized = {
                        owner: String(data.owner).trim(),
                        repo: String(data.repo).trim()
                    };

                    // Support both page_branch and branch
                    const preferredBranch = data.page_branch ?? data.branch ?? data.prBaseBranch;
                    if (preferredBranch) {
                        const branch = String(preferredBranch).trim();
                        if (branch.length) {
                            normalized.page_branch = branch; // Store as page_branch
                            normalized.branch = branch; // Also keep as branch for backward compat
                            normalized.pageBranch = branch; // CamelCase for runtime helpers
                        }
                    }

                    const preferredCodeBranch = data.code_branch ?? data.codeBranch;
                    if (preferredCodeBranch) {
                        const codeBranch = String(preferredCodeBranch).trim();
                        if (codeBranch.length) {
                            normalized.code_branch = codeBranch; // Snake_case for templates
                            normalized.codeBranch = codeBranch; // CamelCase for loader/runtime
                        }
                    }

                    if (data.oauth && data.oauth.clientId) {
                        normalized.oauth = {
                            clientId: String(data.oauth.clientId).trim(),
                            redirectUri: data.oauth.redirectUri ? String(data.oauth.redirectUri).trim() : undefined,
                            clientSecret: data.oauth.clientSecret ? String(data.oauth.clientSecret).trim() : undefined
                        };
                    }

                    this.repoConfig = normalized;
                    return normalized;
                }
                return null;
            })
            .catch(() => null);

        return this.repoConfigPromise;
    }

    async loadOauthConfig() {
        if (this.oauthConfigPromise) return this.oauthConfigPromise;

        if (typeof fetch !== 'function') {
            this.oauthConfigPromise = Promise.resolve(null);
            return this.oauthConfigPromise;
        }

        this.oauthConfigPromise = (async () => {
            let config = null;
            const repoConfig = await this.loadRepoConfig();
            if (repoConfig?.oauth?.clientId) {
                config = {
                    clientId: repoConfig.oauth.clientId,
                    redirectUri: repoConfig.oauth.redirectUri || `${window.location.origin}${window.location.pathname}`
                };
                if (repoConfig.oauth.clientSecret) {
                    config.clientSecret = repoConfig.oauth.clientSecret;
                }
            } else {
                try {
                    const response = await fetch('codeberg-oauth.json', { cache: 'no-store' });
                    if (response.ok) {
                        const data = await response.json();
                        if (data?.clientId) {
                            config = {
                                clientId: String(data.clientId).trim(),
                                redirectUri: data.redirectUri ? String(data.redirectUri).trim() : `${window.location.origin}${window.location.pathname}`
                            };
                            if (data.clientSecret) {
                                config.clientSecret = String(data.clientSecret).trim();
                            }
                        }
                    }
                } catch (error) {
                    config = null;
                }
            }

            this.oauthConfig = config;
            return config;
        })();

        return this.oauthConfigPromise;
    }

    getStoredAccessToken() {
        if (this.accessTokenInfo && this.accessTokenInfo.expiresAt > Date.now() + 30000) {
            return this.accessTokenInfo;
        }

        try {
            const raw = localStorage.getItem('codeberg-oauth-token');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed.expiresAt && parsed.expiresAt > Date.now() + 30000) {
                this.accessTokenInfo = parsed;
                return parsed;
            }
        } catch (error) {
            console.warn('Failed to parse stored OAuth token', error);
        }
        return null;
    }

    storeAccessToken(info) {
        this.accessTokenInfo = info;
        this.currentUserLogin = info?.userLogin || this.currentUserLogin;
        try {
            localStorage.setItem('codeberg-oauth-token', JSON.stringify(info));
        } catch (error) {
            console.warn('Failed to persist OAuth token', error);
        }
        if (this.codebergProfileContainer) {
            this.refreshCodebergProfileBadge().catch(err => console.warn('Failed to refresh Codeberg avatar after storing token', err));
        }
    }

    clearStoredAccessToken(options = {}) {
        this.accessTokenInfo = null;
        this.currentUserLogin = null;
        try {
            localStorage.removeItem('codeberg-oauth-token');
        } catch (error) {
            console.warn('Failed to clear OAuth token', error);
        }
        if (!options?.skipProfileRefresh && this.codebergProfileContainer) {
            this.refreshCodebergProfileBadge().catch(err => console.warn('Failed to refresh Codeberg avatar after clearing token', err));
        }
    }

    async handleProfileSignInClick(event) {
        if (event) event.preventDefault();
        if (this.isLikelyLocalhost()) return;
        const existing = this.getStoredAccessToken();
        if (existing?.token) return;

        this.codebergProfileContainer?.classList.add('toolbar-profile--loading');
        try {
            const token = await this.ensureAccessToken('login');
            if (token) {
                await this.refreshCodebergProfileBadge();
            }
        } catch (error) {
            console.warn('Profile sign-in failed', error);
        } finally {
            this.codebergProfileContainer?.classList.remove('toolbar-profile--loading');
        }
    }

    async refreshCodebergProfileBadge() {
        if (!this.codebergProfileContainer) return;

        this.codebergProfileContainer.classList.add('toolbar-profile--loading');
        let repo = null;
        try {
            repo = await this.resolveCodebergRepo();
        } catch (error) {
            console.warn('Failed to resolve Codeberg repo for avatar', error);
        }

        const owner = repo?.owner || '';
        const repoName = repo?.repo || '';
        const repoOwner = repo?.owner || '';
        const isLocal = this.isLikelyLocalhost();
        let userLogin = null;
        let ownerAvatarUrl = null;
        let orgAvatarUrl = null;
        let isLoggedIn = false;
        let repoAvatarUrl = null;
        const hasRepo = Boolean(repo?.owner && repo?.repo);

        if (!isLocal && hasRepo) {
            try {
                repoAvatarUrl = await this.fetchRepoAvatar(repo);
            } catch (error) {
                console.warn('Failed to fetch repo avatar', error);
            }
            if (!repoAvatarUrl) {
                repoAvatarUrl = this.buildRepoAvatarUrl(repo);
            }
        }
        if (isLocal) {
            this.applyCodebergAvatar({
                avatarUrl: this.getPlaceholderAvatarData(),
                name: repoName || 'Local preview',
                hint: repoOwner || 'Offline',
            initialsSource: '',
            statusIcon: null,
            statusTitle: 'Local preview / offline',
            isLocal: true,
            hideInitials: true,
            status: 'offline'
        });
        this.applyCodebergOrgAvatar({
            avatarUrl: this.getOfflineRepoAvatarData(),
            repoName,
            owner: repoOwner,
            status: 'offline',
            visible: true
        });
            this.codebergProfileContainer.classList.remove('toolbar-profile--loading');
            return;
        }

        let avatarUrl = null;
        let name = repoName || owner || 'Codeberg';
        let hint = repoOwner || owner || 'Codeberg';
        let initialsSource = name;
        const tokenInfo = this.getStoredAccessToken();
        const prevLogin = this.currentUserLogin;
        let shouldApplyPendingAuthors = false;

        if (tokenInfo?.token) {
            try {
                const user = await this.callCodebergApi('/user', tokenInfo.token);
                if (user) {
                    avatarUrl = user.avatar_url || null;
                    hint = repoOwner || (user.login ? `@${user.login}` : 'Signed in');
                    initialsSource = user.full_name || user.login || name;
                    userLogin = user.login || null;
                    this.currentUserLogin = userLogin;
                    if (userLogin && prevLogin !== userLogin) {
                        // refresh comments created while offline so the OAuth login shows as author
                        shouldApplyPendingAuthors = true;
                    }
                    isLoggedIn = true;
                }
            } catch (error) {
                console.warn('Failed to load Codeberg user profile', error);
                if (`${error?.message || ''}`.includes('401')) {
                    this.clearStoredAccessToken({ skipProfileRefresh: true });
                }
            }
        }

        if (!avatarUrl && owner && !isLocal) {
            const ownerProfile = await this.fetchCodebergOwnerProfile(owner);
            if (ownerProfile?.avatarUrl) avatarUrl = ownerProfile.avatarUrl;
            if (ownerProfile?.avatarUrl) ownerAvatarUrl = ownerProfile.avatarUrl;
            if (ownerProfile?.avatarUrl) orgAvatarUrl = ownerProfile.avatarUrl;
            if (!repoName && ownerProfile?.name) name = ownerProfile.name;
            if (ownerProfile?.hint) hint = ownerProfile.hint;
            initialsSource = ownerProfile?.name || initialsSource;
            if (!avatarUrl) {
                avatarUrl = this.buildAccountAvatarUrl(owner);
            }
            if (!orgAvatarUrl) orgAvatarUrl = this.buildAccountAvatarUrl(owner);
        }

        // Fill any remaining gaps with owner/org avatars
        if (!repoAvatarUrl) {
            repoAvatarUrl = orgAvatarUrl || ownerAvatarUrl || this.buildAccountAvatarUrl(owner);
        }

        this.ensureFavicon(repoAvatarUrl);
        this.applyCodebergAvatar({
            avatarUrl,
            name,
            hint,
            initialsSource,
            statusIcon: null,
            statusTitle: isLocal ? 'Local preview / offline' : '',
            isLocal,
            status: this.resolveProfileStatus({ isLocal, userLogin, repoOwner })
        });
        if (shouldApplyPendingAuthors) {
            this.applyPendingCommentAuthors();
        }
        const overlayAvatarUrl = orgAvatarUrl || ownerAvatarUrl || this.buildAccountAvatarUrl(owner);
        this.applyCodebergOrgAvatar({
            avatarUrl: overlayAvatarUrl,
            repoName,
            owner: repoOwner,
            status: this.resolveRepoBadgeStatus({ isLocal, repoOwner, userLogin }),
            visible: isLocal || isLoggedIn
        });
        this.codebergProfileContainer.classList.remove('toolbar-profile--loading');
    }

    async fetchCodebergOwnerProfile(owner) {
        if (!owner) return null;
        const endpoints = [
            { path: `/orgs/${encodeURIComponent(owner)}`, hint: 'Codeberg org' },
            { path: `/users/${encodeURIComponent(owner)}`, hint: 'Codeberg user' }
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(`${CODEBERG_API_BASE}${endpoint.path}`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (!response.ok) continue;
                const data = await response.json();
                const avatarUrl = data?.avatar_url || null;
                const displayName = (data?.full_name || data?.username || data?.login || owner || '').trim() || owner;
                return {
                    avatarUrl,
                    name: displayName,
                    hint: endpoint.hint
                };
            } catch (error) {
                console.warn('Failed to fetch Codeberg owner profile', error);
            }
        }
        return null;
    }

    async fetchRepoAvatar(repo) {
        if (!repo?.owner || !repo?.repo) return null;
        const path = `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}`;
        try {
            const response = await fetch(`${CODEBERG_API_BASE}${path}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) return null;
            const data = await response.json();
            return data?.avatar_url || null;
        } catch (error) {
            console.warn('Failed to fetch repo avatar', error);
            return null;
        }
    }

    ensureFavicon(repoAvatarUrl = null) {
        if (typeof document === 'undefined') return;
        const existing = document.querySelector('link[rel~="icon"], link[rel="shortcut icon"]');
        if (existing) return;
        const href = repoAvatarUrl || (this.repoConfig ? this.buildRepoAvatarUrl(this.repoConfig) : null);
        if (!href) return;
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = href;
        document.head.appendChild(link);
    }

    buildAccountProfileUrl(owner) {
        if (!owner) return '';
        return `https://codeberg.org/${encodeURIComponent(owner)}`;
    }

    buildAccountAvatarUrl(owner) {
        if (!owner) return null;
        return `https://codeberg.org/${encodeURIComponent(owner)}.png?size=64`;
    }

    buildRepoAvatarUrl({ owner, repo }) {
        if (!owner || !repo) return null;
        return `https://codeberg.org/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}.png?size=64`;
    }

    applyCodebergOrgAvatar({ avatarUrl, repoName, owner, status, visible } = {}) {
        if (!this.codebergOrgAvatar) return;

        const initials = this.buildInitials(repoName || owner || 'RP');
        const hasRepoInfo = Boolean(repoName || owner || avatarUrl);
        const show = Boolean(visible) && hasRepoInfo;

        if (!show) {
            this.codebergOrgAvatar.classList.add('hidden');
            this.codebergOrgAvatar.classList.remove('toolbar-profile__repo--offline', 'toolbar-profile__repo--user', 'toolbar-profile__repo--org');
            this.codebergOrgAvatar.style.display = 'none';
            if (this.codebergOrgAvatarImg) {
                this.codebergOrgAvatarImg.removeAttribute('src');
                this.codebergOrgAvatarImg.classList.add('hidden');
            }
            if (this.codebergOrgAvatarInitials) {
                this.codebergOrgAvatarInitials.classList.add('hidden');
            }
            this.codebergOrgAvatar.removeAttribute('title');
            return;
        }

        this.codebergOrgAvatar.classList.remove('hidden');
        this.codebergOrgAvatar.style.display = '';
        this.codebergOrgAvatar.classList.remove('toolbar-profile__repo--offline', 'toolbar-profile__repo--user', 'toolbar-profile__repo--org');
        if (status === 'offline') this.codebergOrgAvatar.classList.add('toolbar-profile__repo--offline');
        if (status === 'user') this.codebergOrgAvatar.classList.add('toolbar-profile__repo--user');
        if (status === 'org') this.codebergOrgAvatar.classList.add('toolbar-profile__repo--org');

        if (this.codebergOrgAvatarInitials) {
            this.codebergOrgAvatarInitials.textContent = initials;
            this.codebergOrgAvatarInitials.classList.toggle('hidden', Boolean(avatarUrl));
        }

        if (this.codebergOrgAvatarImg) {
            if (avatarUrl) {
                this.codebergOrgAvatarImg.src = avatarUrl;
                this.codebergOrgAvatarImg.alt = repoName ? `${repoName} avatar` : 'Organization avatar';
                this.codebergOrgAvatarImg.classList.remove('hidden');
            } else {
                this.codebergOrgAvatarImg.removeAttribute('src');
                this.codebergOrgAvatarImg.classList.add('hidden');
            }
        }

        const labelParts = [];
        if (repoName) labelParts.push(repoName);
        if (owner) labelParts.push(owner);
        const label = labelParts.join(' · ') || 'Organization avatar';
        this.codebergOrgAvatar.setAttribute('title', label);
    }

    resolveRepoBadgeStatus({ isLocal, repoOwner, userLogin }) {
        if (isLocal) return 'offline';
        if (!repoOwner) return null;
        if (!userLogin) return null;
        const same = repoOwner.toLowerCase() === userLogin.toLowerCase();
        return same ? 'user' : 'org';
    }

    resolveProfileStatus({ isLocal, userLogin, repoOwner }) {
        if (isLocal) return 'offline';
        if (userLogin) return 'user';
        if (repoOwner) return 'org';
        return null;
    }

    applyCodebergAvatar({ avatarUrl, name, hint, initialsSource, statusIcon, statusTitle, isLocal, hideInitials, status } = {}) {
        if (!this.codebergProfileContainer) return;

        const initials = hideInitials ? '' : this.buildInitials(initialsSource || name || hint || 'CB');

        if (this.codebergAvatarInitials) {
            this.codebergAvatarInitials.textContent = initials;
            const shouldHideInitials = hideInitials || Boolean(avatarUrl);
            this.codebergAvatarInitials.classList.toggle('hidden', shouldHideInitials);
        }

        if (this.codebergAvatarImg) {
            if (avatarUrl) {
                this.codebergAvatarImg.src = avatarUrl;
                this.codebergAvatarImg.alt = name ? `${name} avatar` : 'Codeberg avatar';
                this.codebergAvatarImg.classList.remove('hidden');
            } else {
                this.codebergAvatarImg.removeAttribute('src');
                this.codebergAvatarImg.classList.add('hidden');
            }
        }

        if (this.codebergProfileName) {
            this.codebergProfileName.textContent = name || 'Codeberg';
        }
        if (this.codebergProfileHint) {
            this.codebergProfileHint.textContent = hint || '';
        }

        const label = isLocal ? 'Local preview / offline' : (name || hint || 'Codeberg profile');
        this.codebergProfileContainer.setAttribute('title', label);

        if (this.codebergProfileBadge) {
            if (statusIcon) {
                this.codebergProfileBadge.textContent = statusIcon;
                this.codebergProfileBadge.title = statusTitle || '';
                this.codebergProfileBadge.classList.remove('hidden');
                this.codebergProfileBadge.classList.add('is-visible');
            } else {
                this.codebergProfileBadge.classList.add('hidden');
                this.codebergProfileBadge.classList.remove('is-visible');
                this.codebergProfileBadge.removeAttribute('title');
                this.codebergProfileBadge.textContent = '';
            }
        }
        if (this.codebergProfileContainer) {
            this.codebergProfileContainer.classList.toggle('toolbar-profile--local', Boolean(isLocal));
        }

        if (this.codebergAvatarImg && this.codebergAvatarImg.parentElement) {
            const avatar = this.codebergAvatarImg.parentElement;
            avatar.classList.remove('toolbar-profile__avatar--offline', 'toolbar-profile__avatar--user', 'toolbar-profile__avatar--org');
            if (status === 'offline') avatar.classList.add('toolbar-profile__avatar--offline');
            if (status === 'user') avatar.classList.add('toolbar-profile__avatar--user');
            if (status === 'org') avatar.classList.add('toolbar-profile__avatar--org');
        }
    }

    buildInitials(source) {
        const safe = `${source ?? ''}`.trim();
        if (!safe) return 'CB';
        const parts = safe.split(/\s+/).filter(Boolean);
        if (!parts.length) return 'CB';
        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase() || 'CB';
        }
        const first = parts[0][0] || '';
        const last = parts[parts.length - 1][0] || '';
        const initials = `${first}${last}`.toUpperCase();
        return initials || 'CB';
    }

    isLikelyLocalhost() {
        if (typeof window === 'undefined') return false;
        const host = (window.location.hostname || '').toLowerCase();
        return host === 'localhost' || host === '127.0.0.1' || host === '' || window.location.protocol === 'file:';
    }

    getPlaceholderAvatarData() {
        // Offline placeholder using an embedded globe SVG (no network fetch)
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#006ca2" d="M64 .29C28.87.29.29 28.87.28 64 .29 99.13 28.87 127.71 64 127.71c35.13 0 63.71-28.59 63.71-63.71C127.71 28.87 99.13.29 64 .29zm25.2 84.96c-6.24-1.85-13.4-3.09-21.59-3.38V67.61h24.18c-.26 6.62-1.21 12.45-2.59 17.64zM38.75 42.74c6.26 1.86 13.43 3.11 21.64 3.4v14.25H36.16c.25-6.63 1.2-12.46 2.59-17.65zm-2.53 24.87h24.17v14.25c-8.17.29-15.31 1.52-21.55 3.37-1.4-5.19-2.36-11.01-2.62-17.62zm55.57-7.22H67.61V46.13c8.17-.29 15.31-1.52 21.55-3.37 1.4 5.2 2.37 11.02 2.63 17.63zm28.58 0h-21.3c-.26-7.53-1.35-14.17-2.96-20.05 5.73-2.35 10.52-5.19 14.49-8.17 5.58 8.14 9.1 17.79 9.77 28.22zm-14.23-33.91c-3.39 2.51-7.44 4.93-12.28 6.96-4.3-11.24-10.54-19.06-16.1-24.23 11.15 2.8 20.95 8.95 28.38 17.27zm-19.22 9.4c-5.58 1.64-11.97 2.75-19.31 3.03V10.3c5.43 3.88 13.95 11.8 19.31 25.58zM60.39 10.22v28.69c-7.38-.28-13.82-1.41-19.43-3.07 5.37-13.9 13.96-21.78 19.43-25.62zM50.24 9.21c-5.55 5.17-11.79 12.99-16.09 24.23-4.84-2.03-8.89-4.45-12.28-6.96 7.42-8.32 17.23-14.47 28.37-17.27zM17.41 32.17c3.97 2.97 8.77 5.82 14.49 8.16-1.61 5.88-2.7 12.52-2.96 20.05H7.64c.66-10.42 4.19-20.07 9.77-28.21zm11.53 35.44c.26 7.53 1.36 14.17 2.96 20.06-5.73 2.34-10.52 5.19-14.49 8.16-5.58-8.14-9.11-17.79-9.78-28.22h21.31zm-7.06 33.91c3.38-2.51 7.43-4.92 12.28-6.96 4.3 11.23 10.53 19.06 16.09 24.23-11.15-2.8-20.96-8.95-28.37-17.27zm19.2-9.4c5.58-1.64 11.97-2.75 19.3-3.03v28.62c-5.41-3.88-13.93-11.81-19.3-25.59zm26.53 25.65V89.09c7.37.28 13.79 1.4 19.38 3.05-5.36 13.9-13.91 21.79-19.38 25.63zm10.16 1.02c5.55-5.17 11.79-12.99 16.09-24.23 4.84 2.03 8.89 4.45 12.27 6.96-7.42 8.32-17.22 14.47-28.36 17.27zm32.83-22.96c-3.97-2.97-8.77-5.82-14.49-8.16 1.61-5.89 2.7-12.52 2.96-20.06h21.3c-.66 10.43-4.19 20.08-9.77 28.22z"/></svg>`;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    getAnonymousAvatarData() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="#000"/><text x="50%" y="50%" fill="#fff" font-family="Inter, Arial, sans-serif" font-size="80" font-weight="600" text-anchor="middle" dominant-baseline="central">?</text></svg>`;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    getActiveUserAvatar() {
        if (this.currentUserLogin) {
            return this.codebergAvatarImg?.src || this.getPlaceholderAvatarData();
        }
        return this.getAnonymousAvatarData();
    }

    updateAuthorLinkDataset(link, author, profileUrl) {
        if (!link) return;
        const login = this.extractCodebergLogin(profileUrl) || (author || '').replace(/^@/, '').trim();
        if (login) {
            link.dataset.authorLogin = login;
        }
    }

    getLocalAuthorPlaceholder() {
        // Always use a neutral placeholder to avoid leaking host/service usernames
        return '$USER';
    }

    getCommentAvatarSrc(entry) {
        if (entry?.anonymous) {
            return this.getAnonymousAvatarData();
        }
        const login = entry?.authorId
            || this.extractCodebergLogin(entry?.profileUrl)
            || '';
        if (login) {
            return this.buildAccountAvatarUrl(login);
        }
        // Prefer a non-embedded avatar URL if provided, otherwise fall back to user/avatar placeholders
        if (entry?.avatar && !String(entry.avatar).startsWith('data:')) {
            return entry.avatar;
        }
        if (this.codebergAvatarImg?.src) {
            return this.codebergAvatarImg.src;
        }
        return this.getPlaceholderAvatarData();
    }

    extractCodebergLogin(profileUrl) {
        if (!profileUrl) return '';
        try {
            const url = new URL(profileUrl, window.location.origin);
            const host = (url.hostname || '').toLowerCase();
            if (!host.includes('codeberg')) return '';
            const segments = url.pathname.split('/').filter(Boolean);
            return segments[0] || '';
        } catch (error) {
            return '';
        }
    }

    buildProfileLink(profileUrl, label) {
        if (!profileUrl) return label;
        const href = escapeAttribute(profileUrl);
        const login = this.extractCodebergLogin(profileUrl) || String(label || '').replace(/^@/, '').trim();
        const dataAttr = login ? ` data-author-login="${escapeAttribute(login)}"` : '';
        return `<a href="${href}"${dataAttr} target="_blank" rel="noopener noreferrer">${label}</a>`;
    }

    getOfflineRepoAvatarData() {
        // No-entry badge for repo overlay in offline mode (data URI)
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="265" height="265" fill-rule="evenodd" viewBox="0 0 265 265"><path d="M251.75 132.5c0-65.86-53.39-119.25-119.25-119.25S13.25 66.64 13.25 132.5 66.64 251.75 132.5 251.75s119.25-53.39 119.25-119.25" fill="#fff"/><path d="M238.369 132.5c0-58.47-47.399-105.869-105.869-105.869a105.42 105.42 0 0 0-67.175 24.04l149.366 148.554c14.802-18.209 23.678-41.429 23.678-66.725zM50.309 65.775c-14.801 18.21-23.678 41.429-23.678 66.725 0 58.47 47.399 105.869 105.869 105.869 25.503 0 48.899-9.019 67.175-24.04zM265 132.5C265 59.322 205.678 0 132.5 0S0 59.322 0 132.5 59.322 265 132.5 265 265 205.678 265 132.5" fill="#b71f2e"/></svg>`;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    async fetchAuthorPreview(login) {
        if (!login) return null;
        const cacheKey = login.toLowerCase();
        if (this.authorPreviewCache.has(cacheKey)) {
            return this.authorPreviewCache.get(cacheKey);
        }
        const fetchProfile = async (path) => {
            try {
                const data = await this.callCodebergApi(path, null);
                if (!data) return null;
                return {
                    login,
                    name: data.full_name || data.username || data.login || login,
                    avatar: data.avatar_url || '',
                    bio: data.description || data.bio || '',
                    htmlUrl: data.html_url || this.buildAccountProfileUrl(login)
                };
            } catch (error) {
                return null;
            }
        };

        let profile = await fetchProfile(`/users/${encodeURIComponent(login)}`);
        if (!profile) {
            profile = await fetchProfile(`/orgs/${encodeURIComponent(login)}`);
        }
        if (!profile) {
            profile = {
                login,
                name: login,
                avatar: '',
                bio: '',
                htmlUrl: this.buildAccountProfileUrl(login)
            };
        }
        this.authorPreviewCache.set(cacheKey, profile);
        return profile;
    }

    handleAuthorHover(event) {
        const link = event.target instanceof Element
            ? event.target.closest('a[data-author-login], .comment-popover__author a, .comment-export__author a')
            : null;
        if (!link) return;
        const login = link.dataset.authorLogin || this.extractCodebergLogin(link.href) || (link.textContent || '').replace(/^@/, '').trim();
        if (!login) return;
        this.cancelHideAuthorPreview();
        if (this.authorPreviewShowTimer) clearTimeout(this.authorPreviewShowTimer);
        this.authorPreviewShowTimer = setTimeout(() => {
            this.showAuthorPreview(link, login);
        }, 150);
    }

    handleAuthorHoverOut(event) {
        const isLink = event.target instanceof Element &&
            event.target.closest('a[data-author-login], .comment-popover__author a, .comment-export__author a');
        const related = event.relatedTarget;
        const card = document.getElementById('authorPreviewCard');
        if (card && card.contains(related)) return;
        if (isLink) {
            this.scheduleHideAuthorPreview();
        }
    }

    cancelHideAuthorPreview() {
        if (this.authorPreviewHideTimer) {
            clearTimeout(this.authorPreviewHideTimer);
            this.authorPreviewHideTimer = null;
        }
    }

    scheduleHideAuthorPreview() {
        this.cancelHideAuthorPreview();
        this.authorPreviewHideTimer = setTimeout(() => this.hideAuthorPreview(), 120);
    }

    async showAuthorPreview(link, login) {
        this.ensureAuthorPreviewCard();
        const card = this.authorPreviewCard;
        const nameEl = document.getElementById('authorPreviewName');
        const userEl = document.getElementById('authorPreviewUsername');
        const bioEl = document.getElementById('authorPreviewBio');
        const linkEl = document.getElementById('authorPreviewLink');
        const avatarEl = card?.querySelector('.author-preview__avatar');

        if (nameEl) nameEl.textContent = 'Loading…';
        if (userEl) userEl.textContent = '';
        if (bioEl) bioEl.textContent = '';
        if (avatarEl) avatarEl.src = '';

        const profile = await this.fetchAuthorPreview(login);
        if (!profile) return;

        if (nameEl) nameEl.textContent = profile.name || login;
        if (userEl) userEl.textContent = `@${login}`;
        if (bioEl) bioEl.textContent = profile.bio || '';
        if (linkEl) {
            linkEl.href = profile.htmlUrl || this.buildAccountProfileUrl(login);
            linkEl.textContent = 'View profile';
        }
        if (avatarEl) {
            avatarEl.src = profile.avatar || this.buildAccountAvatarUrl(login) || this.getPlaceholderAvatarData();
            avatarEl.alt = `${profile.name || login} avatar`;
        }

        const rect = link.getBoundingClientRect();
        const viewportW = window.innerWidth || document.documentElement.clientWidth;
        const preferredLeft = rect.left;
        const top = rect.bottom + 8;
        const width = card.offsetWidth || 260;
        let left = Math.min(Math.max(8, preferredLeft), viewportW - width - 8);
        card.style.left = `${left}px`;
        card.style.top = `${top}px`;
        card.classList.remove('hidden');
        if (typeof card.showPopover === 'function') {
            try { card.showPopover(); } catch (error) { /* ignore */ }
        }
        this.activeAuthorPreview = login;
    }

    hideAuthorPreview() {
        if (!this.authorPreviewCard) return;
        if (typeof this.authorPreviewCard.hidePopover === 'function') {
            try { this.authorPreviewCard.hidePopover(); } catch (error) { /* ignore */ }
        }
        this.authorPreviewCard.classList.add('hidden');
        this.activeAuthorPreview = null;
    }

    ensureAuthorPreviewCard() {
        if (this.authorPreviewCard) return;
        this.authorPreviewCard = document.getElementById('authorPreviewCard');
    }

    buildCodebergIssueUrl(repo, diffText, diffTruncated) {
        const MAX_BODY = 6000;
        const title = `Update index.html (${new Date().toISOString()})`;

        const introLines = [
            'A user requested updating `index.html` with the latest spreadsheet changes.',
            'The updated HTML file was downloaded locally alongside this request.'
        ];

        if (diffTruncated) {
            introLines.push('> ⚠️ Change summary truncated for brevity.');
        }

        const bodyParts = [
            ...introLines,
            '',
            '### Cell changes'
        ];

        if (diffText) {
            bodyParts.push('```diff', diffText, '```');
        } else {
            bodyParts.push('_No cell-level differences detected._');
        }

        let body = bodyParts.join('\n');

        if (body.length > MAX_BODY) {
            body = [
                introLines.join('\n'),
                '',
                '_Change summary exceeded URL length limits. The updated HTML file has been downloaded locally._'
            ].join('\n');
        }

        const params = new URLSearchParams();
        params.set('title', title);
        params.set('body', body);

        const owner = encodeURIComponent(repo.owner);
        const repository = encodeURIComponent(repo.repo);
        return `https://codeberg.org/${owner}/${repository}/issues/new?${params.toString()}`;
    }

    buildFullHTMLDocument(tableMarkup) {
        const config = this.repoConfig || {};
        const codeBranch = config.code_branch || config.codeBranch;
        const owner = config.owner;
        const repo = config.repo;
        
        // Log configuration values
        console.log('[buildFullHTMLDocument] Configuration values:');
        console.log('  codeBranch:', codeBranch);
        console.log('  owner:', owner);
        console.log('  repo:', repo);
        
        // Build stylesheet link if we have the necessary config
        let stylesheetLink = '';
        let runtimeConfig = '';
        const inlineStaticStyles = `    <style>
        /* Hide exported comment list when popovers are supported (modern graphical browsers) */
        @supports selector(:popover-open) {
            .comment-export { display: none; }
        }
    </style>`;
        
        if (codeBranch && owner && repo) {
            const stylesheetUrl = `https://${encodeURIComponent(owner)}.codeberg.page/${encodeURIComponent(repo)}/@${encodeURIComponent(codeBranch)}/style.css`;
            stylesheetLink = `    <link rel="stylesheet" href="${stylesheetUrl}">`;
            
            runtimeConfig = `    <script>
            // Configuration for loader.js to use the correct assets branch
            window.RUNTIME_ASSET_BRANCH = ${JSON.stringify(codeBranch)};
        </script>`;
            
            console.log('[buildFullHTMLDocument] ✓ Stylesheet link built successfully:');
            console.log('  URL:', stylesheetUrl);
        } else {
            console.log('[buildFullHTMLDocument] ✗ Stylesheet link NOT built - missing required config values');
        }
        
        const htmlStart = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Spreadsheet Pro</title>
    `;

        const htmlMiddle = `</head>
    <body>
        <div class="spreadsheet-container">
            <div class="grid-container">
                <div class="corner-cell"></div>
                <div class="column-headers">
                    <div class="header-content" id="columnHeaderContent"></div>
                </div>
                <div class="row-headers">
                    <div class="header-content" id="rowHeaderContent"></div>
                </div>
                <div class="main-grid" id="mainGrid">
                    <div class="grid-content" id="gridContent">
    `;

        const htmlEnd = `
                    </div>
                </div>
            </div>
        </div>
        <script src="loader.js"></script>
    </body>
    </html>
    `;
        
        return htmlStart + stylesheetLink + '\n' + runtimeConfig + '\n' + inlineStaticStyles + '\n' + htmlMiddle + tableMarkup + htmlEnd;
    }

    getUsedRange() {
        let maxRow = this.persistedRange?.maxRow ?? 0;
        let maxCol = this.persistedRange?.maxCol ?? 0;
        let minRow = 0;
        let minCol = 0;

        this.cellData.forEach((_, coord) => {
            const { row, col } = this.getCoordPos(coord);
            if (row > maxRow) maxRow = row;
            if (col > maxCol) maxCol = col;
        });

        if (this.rowHeights instanceof Map) {
            this.rowHeights.forEach((_, key) => {
                const row = Number(key);
                if (Number.isInteger(row) && row > maxRow) maxRow = row;
            });
        }
        if (this.columnWidths instanceof Map) {
            this.columnWidths.forEach((_, key) => {
                const col = Number(key);
                if (Number.isInteger(col) && col > maxCol) maxCol = col;
            });
        }

        if (this.rowStyles instanceof Map) {
            this.rowStyles.forEach((_, key) => {
                const row = Number(key);
                if (Number.isInteger(row) && row > maxRow) maxRow = row;
            });
        }
        if (this.columnStyles instanceof Map) {
            this.columnStyles.forEach((_, key) => {
                const col = Number(key);
                if (Number.isInteger(col) && col > maxCol) maxCol = col;
            });
        }

        if (maxRow < minRow) maxRow = minRow;
        if (maxCol < minCol) maxCol = minCol;

        return { minRow, maxRow, minCol, maxCol };
    }

    handleEdgeScrolling(event) {
        if (!this.isDragging) return;
        
        const rect = this.mainGrid.getBoundingClientRect();
        const threshold = 50; // pixels from edge to start scrolling
        const maxSpeed = 20; // max pixels per frame
        
        // Calculate distance from edges
        const distanceFromLeft = event.clientX - rect.left;
        const distanceFromRight = rect.right - event.clientX;
        const distanceFromTop = event.clientY - rect.top;
        const distanceFromBottom = rect.bottom - event.clientY;
        
        // Calculate scroll speeds based on proximity to edges
        let scrollX = 0;
        let scrollY = 0;
        
        if (distanceFromLeft < threshold && distanceFromLeft > 0) {
            scrollX = -Math.min(maxSpeed, (threshold - distanceFromLeft) / threshold * maxSpeed);
        } else if (distanceFromRight < threshold && distanceFromRight > 0) {
            scrollX = Math.min(maxSpeed, (threshold - distanceFromRight) / threshold * maxSpeed);
        }
        
        if (distanceFromTop < threshold && distanceFromTop > 0) {
            scrollY = -Math.min(maxSpeed, (threshold - distanceFromTop) / threshold * maxSpeed);
        } else if (distanceFromBottom < threshold && distanceFromBottom > 0) {
            scrollY = Math.min(maxSpeed, (threshold - distanceFromBottom) / threshold * maxSpeed);
        }
        
        this.edgeScrollSpeed = { x: scrollX, y: scrollY };
        
        // Start scrolling if near edge
        if ((scrollX !== 0 || scrollY !== 0) && !this.edgeScrolling) {
            this.startEdgeScrolling();
        } else if (scrollX === 0 && scrollY === 0 && this.edgeScrolling) {
            this.stopEdgeScrolling();
        }
    }

    startEdgeScrolling() {
        this.edgeScrolling = true;
        
        const scroll = () => {
            if (!this.edgeScrolling) return;
            
            if (this.edgeScrollSpeed.x !== 0 || this.edgeScrollSpeed.y !== 0) {
                this.mainGrid.scrollLeft += this.edgeScrollSpeed.x;
                this.mainGrid.scrollTop += this.edgeScrollSpeed.y;
            }
            
            this.edgeScrollInterval = requestAnimationFrame(scroll);
        };
        
        scroll();
    }

    stopEdgeScrolling() {
        this.edgeScrolling = false;
        if (this.edgeScrollInterval) {
            cancelAnimationFrame(this.edgeScrollInterval);
            this.edgeScrollInterval = null;
        }
        this.edgeScrollSpeed = { x: 0, y: 0 };
    }
    
    generateStaticTableHTML(range) {
        const { minRow, maxRow, minCol, maxCol } = range;
        const rows = [];
        const commentEntries = [];
        rows.push('                    <table data-spreadsheet-export="true" class="spreadsheet-fallback" border="1" cellspacing="0" cellpadding="6" rules="all">');
        rows.push('                        <thead>');
        rows.push('                            <tr>');
        rows.push('                                <th scope="col">🗻</th>');
        for (let col = minCol; col <= maxCol; col++) {
            const colWidth = this.getColumnWidth(col);
            rows.push(`                                <th scope="col" data-col="${col}" data-width="${colWidth}">${this.getColumnName(col)}</th>`);
        }
        rows.push('                            </tr>');
        rows.push('                        </thead>');
        rows.push('                        <tbody>');

        for (let row = minRow; row <= maxRow; row++) {
            const rowHeight = this.getRowHeight(row);
            const rowHeightMode = this.getRowHeightMode(this.rowHeightModes, row, null);
            const rowHeightModeAttr = rowHeightMode ? ` data-height-mode="${rowHeightMode}"` : '';
            rows.push(`                            <tr data-row="${row}" data-height="${rowHeight}"${rowHeightModeAttr}>`);
            rows.push(`                                <th scope="row">${row + 1}</th>`);
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                if (this.cellToMergeParent.has(coordKey)) continue;
                const cellData = this.cellData.get(coordKey) || {};
                const effectiveStyle = this.getEffectiveStyle(row, col, cellData);
                const datasets = [`data-col="${col}"`];
                const styles = [];
                const extraAttributes = [];

                const rawValue = cellData.value ?? '';
        const commentInfo = this.ensureCommentIds(coordKey, this.normalizeCommentData(cellData.comment));
        const hasRawValue = Object.prototype.hasOwnProperty.call(cellData, 'value') || Boolean(commentInfo?.text);
        if (hasRawValue) {
            datasets.push(`data-raw="${escapeAttribute(rawValue)}"`);
        }

                if (cellData.linkUrl) {
                    datasets.push(`data-link="${escapeAttribute(cellData.linkUrl)}"`);
                }

        if (commentInfo?.text) {
            datasets.push(`data-comment="${escapeAttribute(commentInfo.text)}"`);
            if (commentInfo.author) {
                datasets.push(`data-comment-author="${escapeAttribute(commentInfo.author)}"`);
            }
            if (commentInfo.authorId) {
                datasets.push(`data-comment-author-id="${escapeAttribute(commentInfo.authorId)}"`);
            }
            if (Number.isFinite(commentInfo.at)) {
                datasets.push(`data-comment-at="${commentInfo.at}"`);
            }
            if (commentInfo.avatar) {
                datasets.push(`data-comment-avatar="${escapeAttribute(commentInfo.avatar)}"`);
            }
            if (commentInfo.profileUrl) {
                datasets.push(`data-comment-profile="${escapeAttribute(commentInfo.profileUrl)}"`);
            }
            if (commentInfo.anonymousReason) {
                datasets.push(`data-comment-anon-reason="${escapeAttribute(commentInfo.anonymousReason)}"`);
            }
            if (commentInfo.id) {
                datasets.push(`data-comment-id="${escapeAttribute(commentInfo.id)}"`);
            }
            if (commentInfo.edited) {
                datasets.push('data-comment-edited="true"');
            }
            if (Array.isArray(commentInfo.replies) && commentInfo.replies.length) {
                const serializedReplies = JSON.stringify(commentInfo.replies);
                datasets.push(`data-comment-replies="${escapeAttribute(serializedReplies)}"`);
            }
            if (Array.isArray(commentInfo.reactions) && commentInfo.reactions.length) {
                        datasets.push(`data-comment-reactions="${escapeAttribute(JSON.stringify(commentInfo.reactions))}"`);
                    }
                    commentEntries.push({
                        coord: coordKey,
                        address: this.getCellAddress(row, col),
                        comment: commentInfo.text,
                        author: commentInfo.author || '',
                        profileUrl: commentInfo.profileUrl || '',
                        avatar: commentInfo.avatar || '',
                        anonymous: Boolean(commentInfo.anonymous),
                        anonymousReason: commentInfo.anonymousReason,
                        edited: Boolean(commentInfo.edited),
                        at: commentInfo.at,
                        reactions: Array.isArray(commentInfo.reactions) ? commentInfo.reactions.map(r => ({ emoji: r.emoji, users: Array.isArray(r.users) ? r.users.slice() : [] })) : [],
                        replies: Array.isArray(commentInfo.replies) ? commentInfo.replies.map(reply => this.cloneCommentEntry(reply)).filter(Boolean) : []
                    });
                }

                if (cellData.borders) {
                    ['top', 'right', 'bottom', 'left'].forEach(side => {
                        if (cellData.borders[side]) {
                            datasets.push(`data-border-${side}="${escapeAttribute(cellData.borders[side])}"`);
                        }
                    });
                }

                const displayText = this.getDisplayTextForCell(row, col, cellData);
                const canUseRich = cellData.richText && !String(rawValue || '').startsWith('=');
                const richHtml = canUseRich ? this.sanitizeRichTextHTML(cellData.richText) : '';
                if (cellData.backgroundColor) {
                    datasets.push(`data-bg="${escapeAttribute(cellData.backgroundColor)}"`);
                }
                if (effectiveStyle.backgroundColor) {
                    styles.push(`background-color:${effectiveStyle.backgroundColor}`);
                }
                if (cellData.fontColor) {
                    datasets.push(`data-font="${escapeAttribute(cellData.fontColor)}"`);
                }
                if (effectiveStyle.fontColor) {
                    styles.push(`color:${effectiveStyle.fontColor}`);
                }
                if (cellData.fontSize) {
                    datasets.push(`data-size="${escapeAttribute(String(cellData.fontSize))}"`);
                }
                if (effectiveStyle.fontSize) {
                    styles.push(`font-size:${effectiveStyle.fontSize}px`);
                }
                const textDecorations = [];

                if (cellData.bold) datasets.push('data-bold="true"');
                if (effectiveStyle.bold) styles.push('font-weight:bold');

                if (cellData.italic) datasets.push('data-italic="true"');
                if (effectiveStyle.italic) styles.push('font-style:italic');

                if (cellData.underline) datasets.push('data-underline="true"');
                if (effectiveStyle.underline) textDecorations.push('underline');

                if (cellData.strikethrough) datasets.push('data-strikethrough="true"');
                if (effectiveStyle.strikethrough) textDecorations.push('line-through');

                if (cellData.textAlign) {
                    datasets.push(`data-align="${escapeAttribute(cellData.textAlign)}"`);
                }
                if (effectiveStyle.textAlign) {
                    styles.push(`text-align:${effectiveStyle.textAlign}`);
                }

                if (cellData.verticalAlign) {
                    datasets.push(`data-valign="${escapeAttribute(cellData.verticalAlign)}"`);
                }
                if (effectiveStyle.verticalAlign) {
                    styles.push(`vertical-align:${effectiveStyle.verticalAlign}`);
                }
                if (displayText.includes('\n')) {
                    styles.push('white-space:pre-wrap');
                }

                if (textDecorations.length) {
                    styles.push(`text-decoration:${textDecorations.join(' ')}`);
                }

                const mergeInfo = this.mergedCells.get(coordKey);
                if (mergeInfo && (mergeInfo.rows > 1 || mergeInfo.cols > 1)) {
                    datasets.push(`data-merged-rows="${mergeInfo.rows}"`);
                    datasets.push(`data-merged-cols="${mergeInfo.cols}"`);
                    if (mergeInfo.rows > 1) extraAttributes.push(`rowspan="${mergeInfo.rows}"`);
                    if (mergeInfo.cols > 1) extraAttributes.push(`colspan="${mergeInfo.cols}"`);
                }

                const borderStyles = this.collectBorderStylesForCell(row, col, cellData);
                if (borderStyles.length) {
                    styles.push(...borderStyles);
                }

                if (canUseRich && richHtml) {
                    datasets.push(`data-rich="${escapeAttribute(richHtml)}"`);
                }

                let cellContent = canUseRich && richHtml ? richHtml : escapeHTML(displayText);
                const safeCoordId = coordKey.replace(/,/g, '-');
                if (!cellContent && cellData.linkUrl) {
                    cellContent = escapeHTML(cellData.linkUrl);
                }
                if (cellData.linkUrl) {
                    const href = escapeAttribute(cellData.linkUrl);
                    cellContent = `<a href="${href}">${cellContent}</a>`;
                }
                if (commentInfo?.text) {
                    const popoverId = `comment-popover-${safeCoordId}`;
                    const anchorId = `comment-anchor-${safeCoordId}`;
                    const authorLabel = escapeHTML(commentInfo.author || 'Anonymous');
                    const timestampLabel = commentInfo.at ? escapeHTML(this.formatCommentTimestamp(commentInfo.at)) : '';
                    const avatarSrc = escapeAttribute(this.getCommentAvatarSrc(commentInfo));
                    const summaryParts = this.buildCommentTooltip(commentInfo) || [
                        commentInfo.author ? `by ${commentInfo.author}` : '',
                        timestampLabel,
                        commentInfo.text
                    ].filter(Boolean).join(' • ');
                    const authorMarkup = commentInfo.profileUrl
                        ? `<a href="${escapeAttribute(commentInfo.profileUrl)}">${authorLabel}</a>`
                        : authorLabel;
                    const reactionsHtml = this.renderReactionChips(commentInfo, { readOnly: true, allowAdd: false });
                    const repliesHtml = Array.isArray(commentInfo.replies)
                        ? commentInfo.replies.filter(entry => entry?.text).map(reply => this.renderReplyHTML(reply, { readOnly: true, allowAddReactions: false, highlightId: null })).join('')
                        : '';
                    const popoverContent = [
                        '<div class="comment-popover__meta">',
                        `  <img class="comment-popover__avatar" src="${avatarSrc}" alt="${escapeAttribute(commentInfo.author ? `${commentInfo.author} avatar` : 'Comment author avatar')}">`,
                        '  <div class="comment-popover__meta-text">',
                        `    <div class="comment-popover__author">${authorMarkup}</div>`,
                        `    <div class="comment-popover__timestamp">${timestampLabel}</div>`,
                        '  </div>',
                        '</div>',
                        `<div class="comment-popover__body">${this.renderCommentWithMentions(commentInfo.text)}</div>`,
                        reactionsHtml ? `<div class="comment-reactions">${reactionsHtml}</div>` : '',
                        repliesHtml ? `<div class="comment-popover__thread">${repliesHtml}</div>` : ''
                    ].filter(Boolean).join('');
                    cellContent += [
                        `<span class="comment-flag-wrapper">`,
                        `<button id="${anchorId}" type="button" class="comment-flag" popovertarget="${popoverId}" popovertargetaction="toggle" aria-label="View comment" title="${escapeAttribute(summaryParts)}">💬</button>`,
                        `<div id="${popoverId}" class="comment-popover comment-popover--static" popover="auto" anchor="${anchorId}" hidden>${popoverContent}</div>`,
                        `</span>`
                    ].join('');
                }

                const styleAttr = styles.filter(Boolean).length ? ` style="${styles.join(';')}"` : '';
                const extras = extraAttributes.length ? ` ${extraAttributes.join(' ')}` : '';
                rows.push(`                                <td ${datasets.join(' ')}${extras}${styleAttr}>${cellContent}</td>`);
            }
            rows.push('                            </tr>');
        }

        rows.push('                        </tbody>');
        rows.push('                    </table>');
        const styleMeta = {
            defaultCellStyle: this.cloneDefaultCellStyle(this.defaultCellStyle),
            defaultStyleMeta: this.cloneStyleMeta(this.defaultStyleMeta),
            rowStyles: this.serializeMap(this.rowStyles),
            columnStyles: this.serializeMap(this.columnStyles),
            cellStyleMeta: this.serializeMap(this.cellStyleMeta),
            styleSequence: this.styleSequence
        };
        const serializedMeta = JSON.stringify(styleMeta)
            .replace(/</g, '\\u003c')
            .replace(/<\/script/gi, '<\\/script');
        rows.push(`                    <script type="application/json" data-spreadsheet-style-meta="true">${serializedMeta}</script>`);
        if (commentEntries.length) {
            const sortedComments = commentEntries.sort((a, b) => {
                const [rowA, colA] = this.parseCoord(a.coord);
                const [rowB, colB] = this.parseCoord(b.coord);
                return rowA === rowB ? colA - colB : rowA - rowB;
            });
            rows.push('                    <section class="comment-export" aria-label="Cell comments">');
            rows.push('                        <h2 class="comment-export__title">Comments</h2>');
            rows.push('                        <ol class="comment-export__list">');
            sortedComments.forEach(entry => {
                const safeId = entry.coord.replace(/,/g, '-');
                const author = entry.author || 'Anonymous';
                const authorLabel = escapeHTML(author);
                const avatarSrc = this.getCommentAvatarSrc(entry);
                const timestampDisplay = entry.at ? this.formatCommentTimestamp(entry.at) : '';
                rows.push(`                            <li class="comment-export__item" id="comment-${safeId}" data-comment-coord="${entry.coord}">`);
                rows.push(`                                <div class="comment-export__address">${escapeHTML(entry.address)}</div>`);
                rows.push('                                <div class="comment-export__meta">');
                rows.push(`                                    <img class="comment-export__avatar" src="${escapeAttribute(avatarSrc)}" alt="${escapeAttribute(author ? `${author} avatar` : 'Comment author avatar')}">`);
                rows.push('                                    <div class="comment-export__meta-text">');
                const authorMarkup = this.buildProfileLink(entry.profileUrl, authorLabel);
                rows.push(`                                        <div class="comment-export__author">${authorMarkup}</div>`);
                rows.push(`                                        <div class="comment-export__timestamp">${escapeHTML(timestampDisplay || 'Time unknown')}</div>`);
                rows.push('                                    </div>');
                rows.push('                                </div>');
                rows.push(`                                <div class="comment-export__body">${this.renderCommentWithMentions(entry.comment)}</div>`);
                if (Array.isArray(entry.reactions) && entry.reactions.length) {
                    const reactionBadges = this.renderReactionChips({ reactions: entry.reactions }, { readOnly: true, allowAdd: false });
                    if (reactionBadges) {
                        rows.push(`                                <div class="comment-export__reactions comment-reactions">${reactionBadges}</div>`);
                    }
                }
                if (Array.isArray(entry.replies) && entry.replies.length) {
                    rows.push('                                <ul class="comment-export__replies">');
                    entry.replies.forEach(reply => {
                        const replyAuthor = reply.author || 'Anonymous';
                        const replyTimestampDisplay = reply.at ? this.formatCommentTimestamp(reply.at) : '';
                        const replyAuthorMarkup = reply.profileUrl
                            ? `<a href="${escapeAttribute(reply.profileUrl)}">${escapeHTML(replyAuthor)}</a>`
                            : escapeHTML(replyAuthor);
                        const replyReactions = Array.isArray(reply.reactions) ? reply.reactions : [];
                        const replyReactionHtml = replyReactions.length
                            ? this.renderReactionChips({ reactions: replyReactions }, { readOnly: true, allowAdd: false, target: reply.id || 'root' })
                            : '';
                        rows.push('                                    <li class="comment-export__reply">');
                        rows.push('                                        <div class="comment-export__reply-meta">');
                        rows.push(`                                            <span class="comment-export__author">${replyAuthorMarkup}</span>`);
                        if (replyTimestampDisplay) {
                            rows.push(`                                            <span class="comment-export__timestamp">${escapeHTML(replyTimestampDisplay)}</span>`);
                        }
                        rows.push('                                        </div>');
                        rows.push(`                                        <div class="comment-export__body">${this.renderCommentWithMentions(reply.text || '')}</div>`);
                        if (replyReactionHtml) {
                            rows.push(`                                        <div class="comment-export__reactions comment-reactions">${replyReactionHtml}</div>`);
                        }
                        rows.push('                                    </li>');
                    });
                    rows.push('                                </ul>');
                }
                rows.push('                            </li>');
            });
            rows.push('                        </ol>');
            rows.push('                    </section>');
        }
        return rows.join('\n');
    }

    collectBorderStylesForCell(row, col, cellData) {
        const styles = [];
        const borderSource = (direction) => {
            if (cellData?.borders?.[direction]) return cellData.borders[direction];
            if (direction === 'top') return this.cellData.get(`${row - 1},${col}`)?.borders?.bottom || '';
            if (direction === 'bottom') return this.cellData.get(`${row + 1},${col}`)?.borders?.top || '';
            if (direction === 'left') return this.cellData.get(`${row},${col - 1}`)?.borders?.right || '';
            if (direction === 'right') return this.cellData.get(`${row},${col + 1}`)?.borders?.left || '';
            return '';
        };

        ['top', 'right', 'bottom', 'left'].forEach(side => {
            const border = borderSource(side);
            if (border) styles.push(`border-${side}:${border}`);
        });

        return styles;
    }

    getDisplayTextForCell(row, col, cellData) {
        if (!cellData || !cellData.value) return '';
        if (cellData.value.startsWith("'")) {
            return cellData.value.substring(1);
        }
        if (cellData.value.startsWith('=')) {
            const result = this.parseFormula(cellData.value, row, col);
            return result === undefined || result === null ? '' : String(result);
        }
        return cellData.value;
    }
    
    showKeyboardShortcutsModal() {
        const modal = document.getElementById('keyboardShortcutsModal');
        if (!modal) return;
        
        modal.classList.remove('hidden');
        
        // Add click handler for backdrop and close button
        const handleClick = (e) => {
            if (e.target.hasAttribute('data-modal-dismiss')) {
                this.hideKeyboardShortcutsModal();
            }
        };
        
        modal.addEventListener('click', handleClick);
    }

    hideKeyboardShortcutsModal() {
        const modal = document.getElementById('keyboardShortcutsModal');
        if (!modal) return;
        
        modal.classList.add('hidden');
    }
    
    zoomIn() {
        const newZoom = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
        this.setZoom(newZoom);
    }

    zoomOut() {
        const newZoom = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
        this.setZoom(newZoom);
    }

    resetZoom() {
        this.setZoom(1.0);
    }

    setZoom(level) {
        const clamped = Math.max(this.minZoom, Math.min(this.maxZoom, level));
        if (Math.abs(clamped - this.zoomLevel) < 0.0001) {
            return;
        }

        this.zoomLevel = clamped;
        this.applyZoomStyles();
        this.recalculateVisibleViewport(true);
        this.updateVisibleCells();

        this.updateZoomDisplay();

        this.log(`Zoom set to ${Math.round(clamped * 100)}%`);
    }

    applyZoomStyles() {
        const zoom = this.zoomLevel || 1;
        const baseWidth = this.getTotalGridWidth();
        const baseHeight = this.getTotalGridHeight();

        if (this.gridContainer) {
            const headerHeight = this.config.headerHeight * zoom;
            const rowHeaderWidth = this.config.rowHeaderWidth * zoom;
            this.gridContainer.style.gridTemplateRows = `${headerHeight}px 1fr`;
            this.gridContainer.style.gridTemplateColumns = `${rowHeaderWidth}px 1fr`;
        }

        // Scale the corner cell emoji
        if (this.cornerCell) {
            this.cornerCell.style.fontSize = `${20 * zoom}px`;
        }

        if (this.gridContent) {
            this.gridContent.style.transform = `scale(${zoom})`;
            this.gridContent.style.transformOrigin = 'top left';
            this.gridContent.style.width = baseWidth + 'px';
            this.gridContent.style.height = baseHeight + 'px';
        }

        if (this.columnHeaders) {
            this.columnHeaders.style.width = baseWidth + 'px';
        }

        if (this.rowHeaders) {
            this.rowHeaders.style.height = baseHeight + 'px';
        }

        this.updateHeaderTransforms();
        this.updateZoomDisplay();
    }

    updateHeaderTransforms() {
        const zoom = this.zoomLevel || 1;
        const scrollLeft = this.mainGrid ? this.mainGrid.scrollLeft : 0;
        const scrollTop = this.mainGrid ? this.mainGrid.scrollTop : 0;

        if (this.columnHeaders) {
            this.columnHeaders.style.transformOrigin = 'top left';
            this.columnHeaders.style.transform = `translate(${-scrollLeft}px, 0) scale(${zoom})`;
        }

        if (this.rowHeaders) {
            this.rowHeaders.style.transformOrigin = 'top left';
            this.rowHeaders.style.transform = `translate(0, ${-scrollTop}px) scale(${zoom})`;
        }
    }

    updateZoomDisplay() {
        if (!this.zoomDisplay) {
            this.zoomDisplay = document.getElementById('zoomDisplay');
        }
        if (!this.zoomDisplay || this.zoomEditing) return;
        this.zoomDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }

    beginZoomEdit() {
        if (!this.zoomDisplay || this.zoomEditing) return;
        this.zoomEditing = true;

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'zoom-display-input';
        input.value = Math.round(this.zoomLevel * 100);
        input.min = Math.round(this.minZoom * 100);
        input.max = Math.round(this.maxZoom * 100);
        input.setAttribute('aria-label', 'Zoom percentage');

        input.addEventListener('keydown', e => this.handleZoomInputKeydown(e));
        input.addEventListener('blur', () => this.finishZoomEdit(true));

        this.zoomDisplay.textContent = '';
        this.zoomDisplay.appendChild(input);
        this.zoomDisplay.classList.add('zoom-display--editing');
        this.zoomDisplayInput = input;

        requestAnimationFrame(() => {
            input.focus();
            input.select();
        });
    }

    handleZoomInputKeydown(event) {
        if (!this.zoomEditing) return;
        if (event.key === 'Enter') {
            event.preventDefault();
            this.finishZoomEdit(true);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.finishZoomEdit(false);
        }
    }

    finishZoomEdit(applyValue) {
        if (!this.zoomEditing) return;

        const input = this.zoomDisplayInput;
        const rawValue = input ? input.value : '';

        this.zoomEditing = false;
        this.zoomDisplayInput = null;

        if (input) {
            input.remove();
        }

        if (this.zoomDisplay) {
            this.zoomDisplay.classList.remove('zoom-display--editing');
        }

        if (applyValue) {
            const value = parseFloat(rawValue);
            if (!isNaN(value)) {
                const normalized = value / 100;
                const clamped = Math.max(this.minZoom, Math.min(this.maxZoom, normalized));
                this.setZoom(clamped);
            }
        }

        this.updateZoomDisplay();
    }

    initializeTheme() {
        let theme = this.getThemeFromUrl();
        if (!theme) {
            theme = this.getStoredTheme();
        }
        const prefersDark = (typeof window !== 'undefined' && window.matchMedia)
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;

        if (!theme) {
            theme = 'dark';
        }

        this.setTheme(theme, { persist: false });

        if (prefersDark) {
            this.themeMediaQuery = prefersDark;
            try {
                prefersDark.addEventListener('change', this.handleSystemThemeChange);
            } catch (error) {
                // Some browsers use older API
                prefersDark.addListener(this.handleSystemThemeChange);
            }
        }

        this.applyUrlCustomization();
    }

    setTheme(theme, { persist = true } = {}) {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        const previous = this.theme;
        this.theme = normalized;
        document.documentElement.setAttribute('data-theme', normalized);
        this.updateThemeToggle();

        if (persist) {
            this.storeTheme(normalized);
        }

        if (previous !== normalized) {
            this.log(`Theme set to ${normalized}`);
        }
    }

    onSystemThemeChange(event) {
        if (this.getStoredTheme()) return;
        this.setTheme(event.matches ? 'dark' : 'light', { persist: false });
    }

    getThemeFromUrl() {
        if (typeof window === 'undefined' || !window.location) return null;
        const params = new URLSearchParams(window.location.search);
        if (params.has('dark')) return 'dark';
        if (params.has('light')) return 'light';
        return null;
    }

    applyUrlCustomization() {
        if (typeof window === 'undefined' || !window.location) return;
        const params = new URLSearchParams(window.location.search);

        const selHex = params.get('selcol');
        if (selHex && this.isValidHexColor(selHex)) {
            const color = `#${selHex.replace('#', '')}`;
            const translucent = this.hexToRgba(color, 0.25);
            document.documentElement.style.setProperty('--selection-outline', color);
            document.documentElement.style.setProperty('--selection-fill', translucent);
        } else {
            document.documentElement.style.removeProperty('--selection-outline');
            document.documentElement.style.removeProperty('--selection-fill');
        }
    }

    isValidHexColor(value) {
        const hex = value.startsWith('#') ? value.slice(1) : value;
        return /^[0-9a-fA-F]{6}$/.test(hex);
    }

    hexToRgba(hex, alpha = 1) {
        const value = hex.startsWith('#') ? hex.slice(1) : hex;
        const bigint = parseInt(value, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    getStoredTheme() {
        if (typeof document === 'undefined') return null;
        const cookie = document.cookie || '';
        const name = `${this.themeKey}=`;
        const parts = cookie.split(';');
        for (let part of parts) {
            const trimmed = part.trim();
            if (trimmed.startsWith(name)) {
                const value = decodeURIComponent(trimmed.substring(name.length));
                return value === 'dark' ? 'dark' : value === 'light' ? 'light' : null;
            }
        }
        return null;
    }

    storeTheme(theme) {
        if (typeof document === 'undefined') return;
        const maxAge = 60 * 60 * 24 * 365; // 1 year
        const value = encodeURIComponent(theme);
        document.cookie = `${this.themeKey}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }

    toggleTheme() {
        const next = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
    }

    updateThemeToggle() {
        const toggleBtn = document.getElementById('themeToggleBtn');
        const icon = document.getElementById('themeToggleIcon');
        if (!toggleBtn || !icon) return;

        const isDark = this.theme === 'dark';
        toggleBtn.classList.toggle('active', isDark);
        toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        const title = isDark ? 'Switch to light mode' : 'Switch to OLED dark mode';
        toggleBtn.setAttribute('title', title);
        toggleBtn.setAttribute('aria-label', title);
        icon.textContent = isDark ? '☀️' : '🌙';
    }
    
    log(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${message}`, data || '');
    }
}

// Initialize the application
const app = new SpreadsheetApp();
