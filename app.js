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
                <input type="number" id="fontSizeInput" class="form-control" style="width: 70px; padding: 4px 8px; font-size: 12px;" placeholder="Size" min="6" max="200" title="Font Size (px)">
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
            </div>
        </div>

        <div class="formula-bar">
            <div class="cell-reference">
                <input type="text" id="cellReference" class="form-control" placeholder="A1">
            </div>
            <div class="formula-bar-label">fx</div>
            <input type="text" id="formulaInput" class="form-control formula-input" placeholder="Enter formula or value...">
        </div>
`;

const HTML_PREFIX = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spreadsheet Pro</title>
    <link rel="stylesheet" href="style.css">
</head>
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

const HTML_SUFFIX = `
                </div>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
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

const CONTEXT_MENU_HTML = `
    <div id="contextMenu" class="context-menu hidden">
        <div class="context-menu-item" data-action="cut">
            <span class="context-menu-icon">✂️</span>
            <span>Cut</span>
        </div>
        <div class="context-menu-item" data-action="copy">
            <span class="context-menu-icon">📋</span>
            <span>Copy</span>
        </div>
        <div class="context-menu-item" data-action="paste">
            <span class="context-menu-icon">📄</span>
            <span>Paste</span>
        </div>
        <div class="context-menu-separator" id="linkSeparator1"></div>
        <div class="context-menu-item" data-action="openLink" id="openLinkItem">
            <span class="context-menu-icon">🔗</span>
            <span>Open Link</span>
        </div>
        <div class="context-menu-item" data-action="editLink" id="editLinkItem">
            <span class="context-menu-icon">✏️</span>
            <span>Edit Link</span>
        </div>
        <div class="context-menu-item" data-action="insertLink" id="insertLinkItem">
            <span class="context-menu-icon">🔗</span>
            <span>Insert Link</span>
        </div>
        <div class="context-menu-separator" id="linkSeparator2"></div>
        <div class="context-menu-item" data-action="insertRow">
            <span class="context-menu-icon">➕</span>
            <span>Insert Row Above</span>
        </div>
        <div class="context-menu-item" data-action="insertCol">
            <span class="context-menu-icon">➕</span>
            <span>Insert Column Left</span>
        </div>
        <div class="context-menu-item" data-action="deleteRow">
            <span class="context-menu-icon">➖</span>
            <span>Delete Row</span>
        </div>
        <div class="context-menu-item" data-action="deleteCol">
            <span class="context-menu-icon">➖</span>
            <span>Delete Column</span>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="clearContent">
            <span class="context-menu-icon">🗑️</span>
            <span>Clear Content</span>
        </div>
        <div class="context-menu-item" data-action="clearFormat">
            <span class="context-menu-icon">🧹</span>
            <span>Clear Formatting</span>
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
        <div class="border-menu-section">
            <div class="border-menu-subtitle">Border Color</div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                <input type="color" id="borderColorPicker" value="#000000" style="width: 40px; height: 32px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer;">
                <input type="text" id="borderColorHex" class="form-control" placeholder="#000000" maxlength="7" style="flex: 1; font-family: var(--font-family-mono); font-size: var(--font-size-sm);">
            </div>
            <div id="borderColorsInUse" style="display: none; margin-top: 8px;">
                <div style="font-size: 10px; color: var(--color-text-secondary); margin-bottom: 4px;">Colors in use:</div>
                <div id="borderColorsInUseGrid" style="display: flex; gap: 4px; flex-wrap: wrap;"></div>
            </div>
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
        <div class="border-menu-section">
            <div class="border-menu-subtitle">Border Style</div>
            <select id="borderStyleSelect" class="form-control">
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
            </select>
        </div>
        <div class="border-menu-section">
            <div class="border-menu-subtitle">Border Width</div>
            <select id="borderWidthSelect" class="form-control">
                <option value="1">1px</option>
                <option value="2">2px</option>
                <option value="3">3px</option>
                <option value="4">4px</option>
            </select>
        </div>
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
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells = new Set();

        // Edge scrolling state
        this.edgeScrolling = false;
        this.edgeScrollInterval = null;
        this.edgeScrollSpeed = { x: 0, y: 0 };

        // Resize state
        this.isResizing = false;
        this.resizeType = null; // 'row' or 'column'
        this.resizeIndex = null;
        this.resizeStartPos = null;
        this.resizeStartSize = null;
        this.justResized = false;
        this.resizeAnimationFrame = null;

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

        // Grid data
        this.cellData = new Map();
        this.rowHeights = new Map(); // Store custom row heights
        this.columnWidths = new Map(); // Store custom column widths
        this.visibleRows = { start: 0, end: 30 };
        this.visibleCols = { start: 0, end: 20 };
        this.defaultCellStyle = {};
        this.fullSheetSelection = false;

        // DOM elements
        this.gridContainer = this.container.querySelector('.grid-container');
        if (!this.gridContainer) {
            throw new Error('Grid container not found');
        }

        this.mainGrid = document.getElementById('mainGrid');
        this.gridContent = document.getElementById('gridContent');
        this.columnHeaders = document.getElementById('columnHeaderContent');
        this.rowHeaders = document.getElementById('rowHeaderContent');
        this.cornerCell = this.container.querySelector('.corner-cell');
        this.zoomDisplay = document.getElementById('zoomDisplay');
        if (this.zoomDisplay) {
            this.zoomDisplay.setAttribute('role', 'button');
            this.zoomDisplay.setAttribute('title', 'Click to set zoom');
            this.zoomDisplay.setAttribute('tabindex', '0');
        }
        this.cellReference = document.getElementById('cellReference');
        this.formulaInput = document.getElementById('formulaInput');
        this.contextMenu = document.getElementById('contextMenu');
        this.colorPalette = document.getElementById('colorPalette');
        this.fontColorPalette = document.getElementById('fontColorPalette');
        this.linkEditor = document.getElementById('linkEditor');
        this.borderMenu = document.getElementById('borderMenu');
        this.codebergRepo = null;
        this.repoConfigPromise = null;
        this.repoConfig = null;
        this.oauthConfigPromise = null;
        this.oauthConfig = null;
        this.accessTokenInfo = null;
        this.loadInitialDataFromDOM();
        this.initialCellData = this.cloneCellData(this.cellData);
        this.initialRowHeights = new Map(this.rowHeights);
        this.initialColumnWidths = new Map(this.columnWidths);
        this.initialPersistedRange = { ...this.persistedRange };
        this.initializeDynamicDimensions();
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
            patternHeight: null
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.generateHeaders();
        this.generateInitialGrid();
        this.setupColorPalette();
        this.setupFontColorPalette();
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
    }
    
    // Convert cell element to coordinate string "row,col"
    getCoord(cell) {
        return `${cell.dataset.row},${cell.dataset.col}`;
    }

    // Parse coordinate string to [row, col] numbers
    parseCoord(coord) {
        return coord.split(',').map(Number);
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
        } else {
            this.defaultCellStyle[prop] = value;
        }
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

            const beforeEmpty = this.isCellEffectivelyEmpty(before);
            const afterEmpty = this.isCellEffectivelyEmpty(after);
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

        this.getChangedColumns().forEach(col => {
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, col),
                height: this.getSnapshotRowHeight(this.initialRowHeights, 0)
            };
            const afterSize = {
                width: this.getColumnWidth(col),
                height: this.getRowHeight(0)
            };
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize);
            sizeChanges.forEach(change => {
                allLines.push(`~ Column ${this.getColumnName(col)} ${change}`);
            });
        });

        this.getChangedRows().forEach(row => {
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, 0),
                height: this.getSnapshotRowHeight(this.initialRowHeights, row)
            };
            const afterSize = {
                width: this.getColumnWidth(0),
                height: this.getRowHeight(row)
            };
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize);
            sizeChanges.forEach(change => {
                allLines.push(`~ Row ${row + 1} ${change}`);
            });
        });

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

        const entries = [];
        let total = 0;
        let truncated = false;

        sortedCoords.forEach(coord => {
            const before = initial.get(coord);
            const after = current.get(coord);
            const beforeEmpty = this.isCellEffectivelyEmpty(before);
            const afterEmpty = this.isCellEffectivelyEmpty(after);
            if (beforeEmpty && afterEmpty) {
                return;
            }

            const { row, col } = this.getCoordPos(coord);
            const changeType = beforeEmpty ? 'added' : afterEmpty ? 'removed' : 'modified';
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, col),
                height: this.getSnapshotRowHeight(this.initialRowHeights, row)
            };
            const afterSize = {
                width: this.getColumnWidth(col),
                height: this.getRowHeight(row)
            };
            const baseChanges = (!beforeEmpty && !afterEmpty) ? this.compareCellData(before, after) : [];
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize);
            const combinedChanges = baseChanges.concat(sizeChanges);

            const includeEntry = changeType !== 'modified' || combinedChanges.length > 0;
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

        this.getChangedColumns().forEach(col => {
            const coordKey = `column:${col}`;
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, col),
                height: this.getSnapshotRowHeight(this.initialRowHeights, 0)
            };
            const afterSize = {
                width: this.getColumnWidth(col),
                height: this.getRowHeight(0)
            };
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize);
            if (!sizeChanges.length) return;
            const hasCoordinate = entryMap.has(coordKey);
            const existing = hasCoordinate ? entryMap.get(coordKey) : null;
            if (existing) {
                existing.beforeSize = existing.beforeSize || beforeSize;
                existing.afterSize = existing.afterSize || afterSize;
                existing.changes = Array.isArray(existing.changes) ? existing.changes : [];
                sizeChanges.forEach(change => {
                    if (!existing.changes.includes(change)) existing.changes.push(change);
                });
            } else {
                total += 1;
                if (entries.length + extraEntries.length < maxEntries) {
                    const entry = {
                        coord: coordKey,
                        row: 0,
                        col,
                        address: this.getCellAddress(0, col),
                        changeType: 'modified',
                        before: null,
                        after: null,
                        beforeSize,
                        afterSize,
                        changes: sizeChanges,
                        meta: { kind: 'column', index: col }
                    };
                    extraEntries.push(entry);
                    entryMap.set(coordKey, entry);
                } else {
                    truncated = true;
                    entryMap.set(coordKey, null);
                }
            }
        });

        this.getChangedRows().forEach(row => {
            const coordKey = `row:${row}`;
            const beforeSize = {
                width: this.getSnapshotColumnWidth(this.initialColumnWidths, 0),
                height: this.getSnapshotRowHeight(this.initialRowHeights, row)
            };
            const afterSize = {
                width: this.getColumnWidth(0),
                height: this.getRowHeight(row)
            };
            const sizeChanges = this.describeSizeDifferences(beforeSize, afterSize);
            if (!sizeChanges.length) return;
            const hasCoordinate = entryMap.has(coordKey);
            const existing = hasCoordinate ? entryMap.get(coordKey) : null;
            if (existing) {
                existing.beforeSize = existing.beforeSize || beforeSize;
                existing.afterSize = existing.afterSize || afterSize;
                existing.changes = Array.isArray(existing.changes) ? existing.changes : [];
                sizeChanges.forEach(change => {
                    if (!existing.changes.includes(change)) existing.changes.push(change);
                });
            } else {
                total += 1;
                if (entries.length + extraEntries.length < maxEntries) {
                    const entry = {
                        coord: coordKey,
                        row,
                        col: 0,
                        address: this.getCellAddress(row, 0),
                        changeType: 'modified',
                        before: null,
                        after: null,
                        beforeSize,
                        afterSize,
                        changes: sizeChanges,
                        meta: { kind: 'row', index: row }
                    };
                    extraEntries.push(entry);
                    entryMap.set(coordKey, entry);
                } else {
                    truncated = true;
                    entryMap.set(coordKey, null);
                }
            }
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
        this.rowHeights = new Map(this.initialRowHeights || []);
        this.columnWidths = new Map(this.initialColumnWidths || []);
        this.persistedRange = { ...(this.initialPersistedRange || { ...this.persistedRange }) };
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
                columnWidths: this.serializeMap(this.columnWidths),
                persistedRange: { ...this.persistedRange }
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
            if (payload.columnWidths) {
                this.columnWidths = this.deserializeMap(payload.columnWidths);
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
                this.updateGridSize();
                this.repositionCells();
                this.updateHeaderPositions();
                this.refreshAllVisibleCells();
            }
        }
    }

    markChangesPersisted() {
        this.initialCellData = this.cloneCellData(this.cellData);
        this.initialRowHeights = new Map(this.rowHeights);
        this.initialColumnWidths = new Map(this.columnWidths);
        this.initialPersistedRange = { ...this.persistedRange };
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

            const displayText = this.getDisplayTextFromSnapshot(snapshotMap, row, col, cellRecord);
            if (displayText && displayText.includes('\n')) {
                styleParts.push('white-space:pre-wrap');
            }

            content = displayText ? escapeHTML(displayText).replace(/\n/g, '<br>') : '<span class="save-modal__diff-placeholder">Empty</span>';
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

    getSnapshotRowHeight(mapLike, row) {
        return this.getValueFromMapLike(mapLike, row, this.config.cellHeight);
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

    describeSizeDifferences(beforeSize, afterSize) {
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
            changes.push(`row height: ${Math.round(beforeHeight)}px → ${Math.round(afterHeight)}px`);
        }
        return changes;
    }

    getChangedColumns() {
        const columns = new Set();
        const collectKeys = (source) => {
            if (!source) return;
            if (source instanceof Map) {
                source.forEach((_, key) => {
                    const col = Number(key);
                    if (Number.isInteger(col)) columns.add(col);
                });
            } else if (Array.isArray(source)) {
                source.forEach(entry => {
                    if (!entry) return;
                    const col = Number(entry[0]);
                    if (Number.isInteger(col)) columns.add(col);
                });
            } else {
                Object.keys(source).forEach(key => {
                    const col = Number(key);
                    if (Number.isInteger(col)) columns.add(col);
                });
            }
        };

        collectKeys(this.initialColumnWidths);
        collectKeys(this.columnWidths);

        return Array.from(columns).filter(col => {
            const beforeWidth = this.getSnapshotColumnWidth(this.initialColumnWidths, col);
            const afterWidth = this.getColumnWidth(col);
            return Math.abs(beforeWidth - afterWidth) >= 0.1;
        }).sort((a, b) => a - b);
    }

    getChangedRows() {
        const rows = new Set();
        const collectKeys = (source) => {
            if (!source) return;
            if (source instanceof Map) {
                source.forEach((_, key) => {
                    const row = Number(key);
                    if (Number.isInteger(row)) rows.add(row);
                });
            } else if (Array.isArray(source)) {
                source.forEach(entry => {
                    if (!entry) return;
                    const row = Number(entry[0]);
                    if (Number.isInteger(row)) rows.add(row);
                });
            } else {
                Object.keys(source).forEach(key => {
                    const row = Number(key);
                    if (Number.isInteger(row)) rows.add(row);
                });
            }
        };

        collectKeys(this.initialRowHeights);
        collectKeys(this.rowHeights);

        return Array.from(rows).filter(row => {
            const beforeHeight = this.getSnapshotRowHeight(this.initialRowHeights, row);
            const afterHeight = this.getRowHeight(row);
            return Math.abs(beforeHeight - afterHeight) >= 0.1;
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

    gatherSaveArtifacts() {
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

    async refreshOAuthInfo() {
        if (!this.saveModalOAuth) return;
        if (this.oauthConfig) {
            this.saveModalOAuth.innerHTML = this.renderOAuthSummary(this.oauthConfig);
        } else {
            this.saveModalOAuth.innerHTML = '<em>Checking OAuth configuration…</em>';
        }

        try {
            const config = await this.loadOauthConfig();
            if (config?.clientId) {
                this.saveModalOAuth.innerHTML = this.renderOAuthSummary(config);
            } else {
                this.saveModalOAuth.innerHTML = 'No OAuth credentials found. Add <code>oauth.clientId</code> to <code>codeberg-repo.json</code> (and optional <code>clientSecret</code> for confidential clients) to enable PR creation.';
            }
        } catch (error) {
            console.error('Unable to load OAuth config', error);
            this.saveModalOAuth.innerHTML = `Failed to read OAuth configuration: ${escapeHTML(error.message || 'Unknown error')}`;
        }
    }

    renderOAuthSummary(config) {
        const redirect = config.redirectUri || `${window.location.origin}${window.location.pathname}`;
        const clientType = config.clientSecret ? 'Confidential client' : 'Public client';
        return [
            `<strong>OAuth client</strong>: ${escapeHTML(config.clientId)}`,
            `<strong>Redirect URI</strong>: ${escapeHTML(redirect)}`,
            `<strong>Client type</strong>: ${clientType}`
        ].join('<br>');
    }

    handleDownloadOption() {
        this.setSaveModalBusy(true);
        try {
            this.updateSaveModalStatus('Preparing download…');
            const artifacts = this.gatherSaveArtifacts();
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
    }

    async handleIssueOption() {
        const artifacts = this.gatherSaveArtifacts();
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
            if (!resumeFromOAuth) {
                this.updateSaveModalStatus('Gathering changes for pull request…');
                if (sessionStorage.getItem('codeberg_oauth_in_progress') === 'true') {
                    this.updateSaveModalStatus('Authorization already in progress. Complete the Codeberg consent flow in the other tab.', true);
                    return;
                }
            }

            const artifacts = this.gatherSaveArtifacts();
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
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }, options.headers || {});

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
        const configuredBaseBranch = (repo?.branch ?? repo?.prBaseBranch ?? '').trim();
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
            ['borders', 'borders']
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
        if (key === 'bold' || key === 'italic' || key === 'underline' || key === 'strikethrough') {
            return value ? 'on' : 'off';
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

        if (key === 'borders') {
            return value ? JSON.stringify(value) : 'none';
        }

        return this.formatValue(value);
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
        if (data.borders) fragments.push(`borders=${JSON.stringify(data.borders)}`);

        return fragments.length ? fragments.join(', ') : 'empty';
    }

    isCellEffectivelyEmpty(data) {
        if (!data || typeof data !== 'object') return true;

        if (data.value !== undefined && data.value !== null && data.value !== '') return false;
        if (data.backgroundColor) return false;
        if (data.fontColor) return false;
        if (data.fontSize) return false;
        if (data.bold) return false;
        if (data.italic) return false;
        if (data.underline) return false;
        if (data.strikethrough) return false;
        if (data.textAlign && data.textAlign !== 'left') return false;
        if (data.verticalAlign && data.verticalAlign !== 'bottom') return false;
        if (data.linkUrl) return false;
        if (data.borders && Object.values(data.borders).some(Boolean)) return false;

        return true;
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
            document.body.insertAdjacentHTML('beforeend', CONTEXT_MENU_HTML);
        }

        if (!document.getElementById('fontColorPalette')) {
            document.body.insertAdjacentHTML('beforeend', COLOR_PALETTES_HTML);
        }

        if (!document.getElementById('borderMenu')) {
            document.body.insertAdjacentHTML('beforeend', BORDER_MENU_HTML);
        }
    }

    loadInitialDataFromDOM() {
        if (!this.gridContent) return;
        const fallbackTable = this.gridContent.querySelector('table[data-spreadsheet-export]');
        if (!fallbackTable) return;

        this.columnWidths = new Map();
        this.rowHeights = new Map();

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
            if (Number.isFinite(rowHeightAttr) && rowHeightAttr > 0 && Math.abs(rowHeightAttr - this.config.cellHeight) >= 0.001) {
                this.rowHeights.set(row, rowHeightAttr);
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
                if (raw) {
                    data.value = raw;
                } else if (value && value.length) {
                    data.value = value;
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

        fallbackTable.remove();
    }

    // Undo/Redo Methods
    saveState(action) {
        this.userMadeChanges = true;
        this.hasAutoPersistedBaseline = false;
        this.undoStack.push({ action, cellData: new Map(this.cellData), timestamp: Date.now() });
        if (this.undoStack.length > this.maxUndoSteps) this.undoStack.shift();
        this.redoStack = [];
        this.updateUndoRedoButtons();
        this.scheduleDirtyStateUpdate();
    }

    undo() {
        if (!this.undoStack.length) return;
        this.redoStack.push({ cellData: new Map(this.cellData), timestamp: Date.now() });
        this.cellData = new Map(this.undoStack.pop().cellData);
        this.refreshAllVisibleCells();
        this.updateUndoRedoButtons();
        
        // Refresh both color palettes to update "colors in use"
        this.refreshColorPalette();
        this.refreshFontColorPalette();
        this.updateDirtyState();
    }

    redo() {
        if (!this.redoStack.length) return;
        this.undoStack.push({ cellData: new Map(this.cellData), timestamp: Date.now() });
        this.cellData = new Map(this.redoStack.pop().cellData);
        this.refreshAllVisibleCells();
        this.updateUndoRedoButtons();
        
        // Refresh both color palettes to update "colors in use"
        this.refreshColorPalette();
        this.refreshFontColorPalette();
        this.updateDirtyState();
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

    // Parse cell address to get row and column
    parseCellAddress(address) {
        const match = address.match(/^([A-Z]+)(\d+)$/);
        if (!match) return null;
        return {
            row: parseInt(match[2]) - 1,
            col: this.getColumnIndex(match[1])
        };
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
    
    createCell(row, col) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.address = this.getCellAddress(row, col);
        
        // Position the cell
        cell.style.left = this.getColumnLeft(col) + 'px';
        cell.style.top = this.getRowTop(row) + 'px';
        cell.style.width = this.getColumnWidth(col) + 'px';
        cell.style.height = this.getRowHeight(row) + 'px';

        // Get cell data
        const cellData = this.cellData.get(`${row},${col}`) || {};
        
        // Apply content and formatting using helper method
        this.updateCellDisplay(cell, cellData);

        // Restore selection state
        const coordKey = `${row},${col}`;
        if (this.selectedCellCoords.has(coordKey)) {
            cell.classList.add('selected');
            this.selectedCells.add(cell);
        }
        if (this.primaryCellCoord === coordKey) {
            cell.classList.add('primary-selected');
            this.primaryCell = cell;
        }

        this.gridContent.appendChild(cell);
        return cell;
    }
    
    getRowHeight(row) { return this.getValueFromMapLike(this.rowHeights, row, this.config.cellHeight); }
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
            [document, 'contextmenu', e => this.handleContextMenu(e)],
            [document, 'click', e => this.handleDocumentClick(e)],
            [this.columnHeaders, 'click', e => this.handleHeaderClick(e, 'column')],
            [this.columnHeaders, 'mousedown', e => this.handleResizeMouseDown(e)],
            [this.rowHeaders, 'click', e => this.handleHeaderClick(e, 'row')],
            [this.rowHeaders, 'mousedown', e => this.handleResizeMouseDown(e)],
            ['#colorBtn', 'click', () => this.showColorPalette()],
            ['#fontColorBtn', 'click', () => this.showFontColorPalette()],
            ['#borderBtn', 'click', () => this.showBorderMenu()],
            ['#fontSizeInput', 'change', e => this.handleFontSizeChange(e)],
            ['#fontSizeInput', 'keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); this.handleFontSizeChange(e); e.target.blur(); }
            }],
            [this.formulaInput, 'keydown', e => this.handleFormulaKeyDown(e)],
            [this.formulaInput, 'focus', e => this.handleFormulaFocus(e)],
            [this.formulaInput, 'input', e => this.handleFormulaInput(e)],
            [this.cellReference, 'keydown', e => this.handleCellReferenceKeyDown(e)],
            [this.contextMenu, 'click', e => this.handleContextMenuClick(e)],
            ['#contextColorPicker', 'input', e => this.applyBackgroundColor(e.target.value)],
            ['#linkSaveBtn', 'click', (e) => { e.stopPropagation(); e.preventDefault(); this.saveLinkEdit(); }],
            ['#linkCancelBtn', 'click', (e) => { e.stopPropagation(); e.preventDefault(); this.hideLinkEditor(); }],
            ['.corner-cell', 'click', e => this.handleCornerCellClick(e)],
            ['#formatPainterBtn', 'click', () => this.activateFormatPainter()],
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
            ['#themeToggleBtn', 'click', () => this.toggleTheme()]
        ];
        
        events.forEach(([sel, evt, fn]) => {
            const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
            if (el) el.addEventListener(evt, fn);
        });
        
        // Border menu setup
        this.setupBorderMenu();
        
        // Pattern-based toolbar buttons
        ['bold', 'italic', 'underline', 'strikethrough'].forEach(f => 
            document.getElementById(`${f}Btn`)?.addEventListener('click', () => this.toggleFormat(f))
        );
        
        [['left','Left'], ['center','Center'], ['right','Right']].forEach(([a, n]) => 
            document.getElementById(`align${n}Btn`)?.addEventListener('click', () => this.setTextAlign(a))
        );
        
        [['top','Top'], ['middle','Middle'], ['bottom','Bottom']].forEach(([a, n]) => 
            document.getElementById(`align${n}Btn`)?.addEventListener('click', () => this.setVerticalAlign(a))
        );

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
        
        // Update button appearance
        const btn = document.getElementById('formatPainterBtn');
        btn.classList.add('active');
        
        // Change cursor
        document.body.style.cursor = 'crosshair';
        
        this.log(`Format painter activated with ${this.formatPainter.patternWidth}x${this.formatPainter.patternHeight} pattern (cramped from ${coords.length} cells)`);
    }

    deactivateFormatPainter() {
        this.formatPainter.active = false;
        this.formatPainter.formats = null;
        this.formatPainter.patternWidth = null;
        this.formatPainter.patternHeight = null;
        
        // Update button appearance
        const btn = document.getElementById('formatPainterBtn');
        btn.classList.remove('active');
        
        // Reset cursor
        document.body.style.cursor = '';
        
        this.log('Format painter deactivated');
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
        
        // Update cell display
        this.updateCellDisplay(cell, cellData || {});
        
        this.log(`Applied format to cell ${cell.dataset.address}`);
    }

    applyPaintedFormatToSelection() {
        if (!this.formatPainter.active || !this.formatPainter.formats) {
            return;
        }
        
        const bounds = this.getSelectionBounds();
        if (!bounds) return;
        
        // Save state
        this.saveState(`Apply painted format to ${this.selectedCellCoords.size} cells`);
        
        const { minRow, maxRow, minCol, maxCol } = bounds;
        
        // Apply format pattern to each cell in the target area
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                
                // Calculate which cell in the pattern to use (tiling/repeating)
                const patternRow = (row - minRow) % this.formatPainter.patternHeight;
                const patternCol = (col - minCol) % this.formatPainter.patternWidth;
                const patternKey = `${patternRow},${patternCol}`;
                
                const format = this.formatPainter.formats.get(patternKey);
                
                if (format) {
                    this.updateCellDataEntry(coordKey, data => {
                        Object.keys(format).forEach(key => {
                            data[key] = format[key];
                        });
                    });
                }
            }
        }
        
        // Update visible cells
        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey);
            this.updateCellDisplay(cell, cellData || {});
        });
        
        // IMPORTANT: Also update adjacent cells to show overlapping borders
        const adjacentCellsToUpdate = new Set();
        
        this.selectedCells.forEach(cell => {
            const { row, col } = this.getCellPos(cell);
            
            // Check adjacent cells
            const adjacent = [
                this.getCellAt(row - 1, col), // above
                this.getCellAt(row + 1, col), // below
                this.getCellAt(row, col - 1), // left
                this.getCellAt(row, col + 1)  // right
            ];
            
            adjacent.forEach(adjCell => {
                if (adjCell) adjacentCellsToUpdate.add(adjCell);
            });
        });
        
        // Refresh adjacent cells to update their visual borders
        adjacentCellsToUpdate.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey) || {};
            this.updateCellDisplay(cell, cellData);
        });
        
        // Refresh color palettes
        this.refreshColorPalette();
        this.refreshFontColorPalette();
        
        // Deactivate after single use
        this.deactivateFormatPainter();
        
        this.log(`Applied ${this.formatPainter.patternWidth}x${this.formatPainter.patternHeight} pattern to ${this.selectedCellCoords.size} cells`);
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
        const applyToAll = this.isFullGridSelection();

        this.saveState(`${isToggle ? 'Toggle' : 'Set'} ${type}`);

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

        this.selectedCellCoords.forEach(coord => {
            this.updateCellDataEntry(coord, data => {
                if (remove) {
                    delete data[type];
                } else {
                    data[type] = isToggle ? true : value;
                }
            });
        });
        
        this.selectedCells.forEach(cell => {
            cell.classList.remove(...classes);
            !remove && cell.classList.add(prefix ? `${prefix}${value}` : type);
            
            // ALWAYS refresh the cell display to recalculate overflow for alignment changes
            if (type === 'textAlign' || type === 'verticalAlign') {
                const cellKey = this.getCoord(cell);
                const cellData = this.cellData.get(cellKey) || {};
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
            this.updateLayout(this.resizeIndex, this.resizeType);
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
            
            cell.style.left = this.getColumnLeft(col) + 'px';
            cell.style.top = this.getRowTop(row) + 'px';
            cell.style.width = this.getColumnWidth(col) + 'px';
            cell.style.height = this.getRowHeight(row) + 'px';
        });
    }
    
    handleFontSizeChange(event) {
        const input = document.getElementById('fontSizeInput');
        const size = parseInt(input.value);
        
        if (!size || isNaN(size) || size < 1 || !this.hasSelection()) return;
        
        const clamped = Math.max(6, Math.min(200, size));
        input.value = clamped;
        this.applyFontSize(clamped);
    }

    applyFontSize(fontSize) {
        if (!this.hasSelection()) return;
        const applyToAll = this.isFullGridSelection();
        this.saveState(`Apply font size ${fontSize}px`);

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
            return;
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
        });

        // Update DOM
        this.selectedCells.forEach(cell => {
            cell.style.fontSize = fontSize ? `${fontSize}px` : '';
        });

        this.updateFontSizeInput();
    }

    updateFontSizeInput() {
        const fontSizeInput = document.getElementById('fontSizeInput');
        
        if (!this.hasSelection()) {
            fontSizeInput.value = '';
            return;
        }

        // Get the primary cell's font size or default
        if (this.primaryCellCoord) {
            const cellData = this.cellData.get(this.primaryCellCoord);
            let fontSize = cellData?.fontSize;
            if (fontSize === undefined || fontSize === null) {
                fontSize = this.defaultCellStyle.fontSize;
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
        if (event.target.classList.contains('cell-editor')) return;
        const cell = this.resolveCellFromEvent(event);
        if (!cell) return;

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
                this.selectCells(rangeCells, true);
            } else {
                // Normal click: start new selection
                this.clearAllSelections();
                this.selectCells([cell], true);
            }
            return;
        }

        if (event.button === 2) return;

        this.dragStartCell = cell;
        this.isDragging = true;
        this.isCtrlDragging = event.ctrlKey || event.metaKey;

        event.preventDefault();

        if (this.currentEditingCell && this.currentEditingCell !== cell) {
            this.stopEditingCell();
        }

        if (this.isCtrlDragging) {
            this.ctrlDragAction = this.selectedCells.has(cell) ? 'deselect' : 'select';
            this.ctrlDragProcessedCells.clear();
            this.processCtrlDragCell(cell);
        } else if (event.shiftKey && this.primaryCell) {
            this.clearAllSelections();
            const rangeCells = this.getCellsInRect(this.primaryCell, cell);
            this.selectCells(rangeCells, true);
        } else {
            this.clearAllSelections();
            this.selectCells([cell], true);
        }
    }

    handleMouseMove(event) {
        if (!this.isDragging || !this.dragStartCell) return;

        // Handle edge scrolling
        this.handleEdgeScrolling(event);

        const cell = this.resolveCellFromEvent(event);
        if (!cell) return;

        if (this.isCtrlDragging) {
            const rangeCells = this.getCellsInRect(this.dragStartCell, cell);
            rangeCells.forEach(c => {
                if (!this.ctrlDragProcessedCells.has(c)) {
                    this.processCtrlDragCell(c);
                }
            });
        } else if (!event.shiftKey && !event.ctrlKey && !event.metaKey) {
            this.clearAllSelections();
            const rangeCells = this.getCellsInRect(this.dragStartCell, cell);
            this.selectCells(rangeCells, true);
        }
    }

    handleMouseUp(event) {
        // Stop edge scrolling
        this.stopEdgeScrolling();
        
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
            
            // Set flag to prevent click event from firing
            this.justResized = true;
            setTimeout(() => {
                this.justResized = false;
            }, 10);
            
            return;
        }
        
        // Handle format painter application on mouse up
        if (this.formatPainter.active && this.isDragging) {
            // Extend selection if needed to match pattern dimensions
            this.extendSelectionForFormatPainter();
            this.applyPaintedFormatToSelection();
            this.isDragging = false;
            this.dragStartCell = null;
            this.isCtrlDragging = false;
            this.ctrlDragAction = null;
            this.ctrlDragProcessedCells.clear();
            return;
        }
        
        this.isDragging = false;
        this.dragStartCell = null;
        this.isCtrlDragging = false;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells.clear();
        
        // Update UI elements after any selection change
        if (this.selectedCells.size > 0) {
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
        this.startEditingCell(cell);
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
            return directCell;
        }

        const mappedCell = this.getCellFromClientPoint(clientX, clientY);
        return mappedCell || directCell;
    }

    getCellFromClientPoint(clientX, clientY) {
        const gridRect = this.mainGrid.getBoundingClientRect();
        const zoom = this.zoomLevel || 1;
        const offsetX = (clientX - gridRect.left) / zoom;
        const offsetY = (clientY - gridRect.top) / zoom;
        const x = offsetX + this.mainGrid.scrollLeft;
        const y = offsetY + this.mainGrid.scrollTop;

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
        } else {
            this.columnWidths = this.shiftIndexedMap(this.columnWidths, startIndex, effectiveCount, limit);
        }

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

        this.shiftCellDataForDeletion(axis, startIndex, effectiveCount);

        if (isRow) {
            this.rowHeights = this.shiftIndexedMap(this.rowHeights, startIndex, -effectiveCount, limit, effectiveCount);
        } else {
            this.columnWidths = this.shiftIndexedMap(this.columnWidths, startIndex, -effectiveCount, limit, effectiveCount);
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

        this.updateGridSize();
        this.generateHeaders();
        this.updateVisibleCells();
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

    selectCells(cells, isPrimary = false) {
        if (!cells || !cells.length) return;
        this.fullSheetSelection = false;
        cells.forEach((cell, index) => {
            const coordKey = this.getCoord(cell);
            
            this.selectedCells.add(cell);
            this.selectedCellCoords.add(coordKey);
            cell.classList.add('selected');
            
            if (isPrimary && index === 0) {
                if (this.primaryCell) {
                    this.primaryCell.classList.remove('primary-selected');
                }
                this.primaryCell = cell;
                this.primaryCellCoord = coordKey;
                cell.classList.add('primary-selected');
            }
        });
        this.updateUI();
    }
    
    clearAllSelections() {
        this.clearSelectionVisuals();
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.fullSheetSelection = false;
        this.updateUI();
        this.log('Cleared all selections');
    }

    updateCellReference() {
        if (!this.hasSelection()) {
            this.cellReference.value = '';
            return;
        }
        
        if (this.selectedCellCoords.size === 1) {
            if (this.primaryCell) {
                this.cellReference.value = this.primaryCell.dataset.address;
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
    }

    startEditingCell(cell) {
        if (this.currentEditingCell === cell) return;
        if (this.currentEditingCell) {
            this.stopEditingCell();
        }

        this.currentEditingCell = cell;
        const cellKey = this.getCoord(cell);
        const cellData = this.cellData.get(cellKey);
        const currentText = cellData ? (cellData.value || '') : '';
        
        cell.dataset.originalValue = currentText;
        cell.classList.add('editing');
        
        // Reset overflow styles for editing
        cell.style.pointerEvents = 'auto';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell-editor';
        input.value = currentText;
        cell.innerHTML = '';
        cell.appendChild(input);
        
        // Allow editor to overflow visually
        this.updateEditorOverflow(cell, input);
        
        input.focus();
        input.select();

        this.formulaInput.value = currentText;

        input.addEventListener('blur', () => this.stopEditingCell());
        input.addEventListener('input', () => {
            // Update overflow as user types
            this.updateEditorOverflow(cell, input);
        });
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
        const cellWidth = this.getColumnWidth(col);
        const textWidth = this.measureTextWidth(input.value, input);
        
        // Always set cell to allow overflow during editing
        cell.style.overflow = 'visible';
        cell.style.zIndex = '10';
        
        if (textWidth > cellWidth - 16) {
            // Text doesn't fit - calculate how much width we need
            let totalWidth = cellWidth;
            
            // During editing, we IGNORE whether adjacent cells have content
            // Just calculate how much space we need
            for (let c = col + 1; c < this.config.maxCols; c++) {
                totalWidth += this.getColumnWidth(c);
                
                // Stop if we have enough width
                if (textWidth <= totalWidth - 16) {
                    break;
                }
                
                // Check if we've checked enough cells
                if (c - col > 10) break;
            }
            
            // Set input width to accommodate the text (always allow overflow during editing)
            input.style.width = Math.max(cellWidth, textWidth + 32) + 'px';
        } else {
            // Text fits - use cell width
            input.style.width = cellWidth + 'px';
        }
    }

    stopEditingCell(cancel = false) {
        if (!this.currentEditingCell) return;

        const input = this.currentEditingCell.querySelector('.cell-editor');
        if (!input) return;

        const oldValue = this.currentEditingCell.dataset.originalValue || '';
        const newValue = cancel ? oldValue : input.value;

        const cellKey = this.getCoord(this.currentEditingCell);
        const { row, col } = this.getCellPos(this.currentEditingCell);
        
        // Display based on value type
        if (newValue.startsWith("'")) {
            // Escaped text - display without the apostrophe
            this.currentEditingCell.textContent = newValue.substring(1);
        } else if (newValue.startsWith('=')) {
            // Formula - display result
            const result = this.parseFormula(newValue, row, col);
            this.currentEditingCell.textContent = result;
        } else {
            // Regular text
            this.currentEditingCell.textContent = newValue;
        }
        
        this.currentEditingCell.classList.remove('editing');
        delete this.currentEditingCell.dataset.originalValue;
        
        if (!cancel && oldValue !== newValue) {
            // Save state before making changes
            this.saveState(`Edit cell ${this.currentEditingCell.dataset.address}`);
        }
        
        const updatedData = this.updateCellDataEntry(cellKey, data => {
            if (newValue) {
                data.value = newValue;
            } else {
                delete data.value;
            }
        });

        // Update formula bar to show the formula, not the result
        this.formulaInput.value = newValue;

        if (!cancel && oldValue !== newValue) {
            this.log(`Cell ${this.currentEditingCell.dataset.address} edited: "${oldValue}" → "${newValue}"`);
            
            // Recalculate all cells that might depend on this cell
            this.recalculateAllFormulas();
        }
        
        // Refresh the cell display to apply overflow logic
        this.updateCellDisplay(this.currentEditingCell, updatedData || {});
        
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

        this.currentEditingCell = null;
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
        
        this.selectedCellCoords.forEach(coordKey => {
            this.updateCellDataEntry(coordKey, data => {
                delete data.value;
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
        this.log(`Cleared content of ${this.selectedCellCoords.size} cells`);
    }

    handleContextMenu(event) {
        if (this.currentEditingCell && event.target.classList.contains('cell-editor')) {
            return;
        }

        const cell = this.resolveCellFromEvent(event);

        if (cell && !event.target.classList.contains('cell-editor')) {
            event.preventDefault();
            
            if (!this.selectedCells.has(cell)) {
                this.clearAllSelections();
                this.selectCells([cell], true);
            }
            
            this.showContextMenu(event.clientX, event.clientY);
            this.log(`Context menu opened for ${this.selectedCells.size} selected cells`);
        }
    }

    showContextMenu(x, y) {
        this.contextMenu.classList.remove('hidden');
        this.contextMenu.style.left = x + 'px';
        this.contextMenu.style.top = y + 'px';
        
        // Check if primary cell has a link
        const hasLink = this.primaryCell && this.cellHasLink();
        
        // Show/hide appropriate link menu items
        const openLinkItem = document.getElementById('openLinkItem');
        const editLinkItem = document.getElementById('editLinkItem');
        const insertLinkItem = document.getElementById('insertLinkItem');
        
        if (openLinkItem && editLinkItem && insertLinkItem) {
            if (hasLink) {
                openLinkItem.style.display = 'flex';
                editLinkItem.style.display = 'flex';
                insertLinkItem.style.display = 'none';
            } else {
                openLinkItem.style.display = 'none';
                editLinkItem.style.display = 'none';
                insertLinkItem.style.display = 'flex';
            }
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
            this.executeContextAction(action);
            this.hideContextMenu();
        }
    }

    executeContextAction(action) {
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
        }
    }
    
    _getRelativeCoords() {
        const bounds = this.getSelectionBounds();
        if (!bounds) return { coords: [], minRow: 0, minCol: 0 };
        const { coords, minRow, minCol } = bounds;
        return { coords, minRow, minCol };
    }
    
    cutCells() { this.copyCells(true); }
    copyCells(isCut = false) {
        if (!this.hasSelection()) return;

        this.clipboard = {
            data: new Map(),
            mode: isCut ? 'cut' : 'copy',
            sourceCells: isCut ? new Set(this.selectedCellCoords) : null,
            origin: null
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

        if (isCut) {
            this.selectedCells.forEach(cell => 
                cell.style.border = '2px dashed var(--color-primary)'
            );
        }

        // Copy to system clipboard
        this.copyToSystemClipboard();

        this.log(`${isCut ? 'Cut' : 'Copied'} ${this.selectedCellCoords.size} cells`);
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

        // Save state before pasting
        this.saveState(`Paste ${this.clipboard.data.size} cells`);

        // If it was a cut operation and this is the first paste, clear the original cells
        if (this.clipboard.mode === 'cut' && this.clipboard.sourceCells) {
            this.clipboard.sourceCells.forEach(coordKey => {
                // Clear the cell data
                this.cellData.delete(coordKey);

                // Update visible cells
                const [row, col] = this.parseCoord(coordKey);
                const cell = this.getCellAt(row, col);
                if (cell) {
                    cell.textContent = '';
                    cell.style.backgroundColor = '';
                    cell.style.color = '';
                    cell.style.fontSize = '';
                    cell.style.border = ''; // Remove the dashed border
                    cell.classList.remove('bold', 'italic', 'underline', 'strikethrough',
                                        'align-left', 'align-center', 'align-right',
                                        'align-top', 'align-middle', 'align-bottom');
                }
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
            }
        });

        this.log(`Pasted ${this.clipboard.data.size} cells at ${this.primaryCell.dataset.address}`);
        this.refreshColorPalette();
        this.refreshFontColorPalette();
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

    updateCellDisplay(cell, d = {}) {
        const coord = this.getCoord(cell);
        const { row, col } = this.getCellPos(cell);
        
        // Handle display text based on value type
        let displayText = '';
        let isLink = false;
        if (d.value) {
            if (d.value.startsWith("'")) {
                displayText = d.value.substring(1);
            } else if (d.value.startsWith('=')) {
                displayText = this.parseFormula(d.value, row, col);
            } else {
                displayText = d.value;
            }
        }

        if (displayText === undefined || displayText === null) {
            displayText = '';
        } else if (typeof displayText !== 'string') {
            displayText = String(displayText);
        }
        
        isLink = !!(d.linkUrl || this.isHyperlink(displayText));
        
        cell.textContent = displayText;
        
        // Handle text overflow into adjacent cells
        this.handleCellOverflow(cell, displayText, d);
        
        const effective = { ...this.defaultCellStyle, ...d };
        
        cell.className = ['cell',
            effective.bold && 'bold',
            effective.italic && 'italic',
            effective.underline && 'underline',
            effective.strikethrough && 'strikethrough',
            effective.textAlign && `align-${effective.textAlign}`,
            effective.verticalAlign && `align-${effective.verticalAlign}`,
            this.selectedCellCoords.has(coord) && 'selected',
            this.primaryCellCoord === coord && 'primary-selected',
            isLink && 'cell-link'
        ].filter(Boolean).join(' ');
        
        cell.style.backgroundColor = effective.backgroundColor || '';
        cell.style.color = effective.fontColor || '';
        cell.style.fontSize = effective.fontSize ? effective.fontSize + 'px' : '';
        
        // Apply borders from this cell's data (borders are stored at full width, applied at half width)
        let topBorder = d.borders?.top || '';
        let rightBorder = d.borders?.right || '';
        let bottomBorder = d.borders?.bottom || '';
        let leftBorder = d.borders?.left || '';
        
        // Helper function to halve border width for rendering
        const halveBorder = (border) => {
            if (!border) return '';
            const match = border.match(/^(\d+(?:\.\d+)?)px\s+(.+)$/);
            if (match) {
                const halfWidth = parseFloat(match[1]) / 2;
                return `${halfWidth}px ${match[2]}`;
            }
            return border;
        };
        
        // Halve the border widths for visual display
        topBorder = halveBorder(topBorder);
        rightBorder = halveBorder(rightBorder);
        bottomBorder = halveBorder(bottomBorder);
        leftBorder = halveBorder(leftBorder);
        
        // Check adjacent cells for borders that should appear on shared edges (visual only)
        // Cell above's bottom border should appear as this cell's top border
        const cellAbove = this.cellData.get(`${row - 1},${col}`);
        if (cellAbove?.borders?.bottom && !topBorder) {
            topBorder = halveBorder(cellAbove.borders.bottom);
        }
        
        // Cell below's top border should appear as this cell's bottom border
        const cellBelow = this.cellData.get(`${row + 1},${col}`);
        if (cellBelow?.borders?.top && !bottomBorder) {
            bottomBorder = halveBorder(cellBelow.borders.top);
        }
        
        // Cell to the left's right border should appear as this cell's left border
        const cellLeft = this.cellData.get(`${row},${col - 1}`);
        if (cellLeft?.borders?.right && !leftBorder) {
            leftBorder = halveBorder(cellLeft.borders.right);
        }
        
        // Cell to the right's left border should appear as this cell's right border
        const cellRight = this.cellData.get(`${row},${col + 1}`);
        if (cellRight?.borders?.left && !rightBorder) {
            rightBorder = halveBorder(cellRight.borders.left);
        }
        
        cell.style.borderTop = topBorder;
        cell.style.borderRight = rightBorder;
        cell.style.borderBottom = bottomBorder;
        cell.style.borderLeft = leftBorder;
    }
    
    handleCellOverflow(cell, displayText, cellData) {
        const { row, col } = this.getCellPos(cell);
        const normalizedText = (displayText === undefined || displayText === null) ? '' : String(displayText);
        
        // Remove any existing overflow styling and wrapper
        cell.style.overflow = '';
        cell.style.textOverflow = '';
        cell.style.whiteSpace = '';
        cell.style.zIndex = '';
        cell.style.pointerEvents = '';
        
        // Remove any existing text wrapper
        const existingWrapper = cell.querySelector('.cell-text-wrapper');
        if (existingWrapper) {
            cell.textContent = existingWrapper.textContent;
        }
        
        // If cell has no content, use default overflow behavior
        if (!normalizedText || normalizedText.trim() === '') {
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            return;
        }
        
        // If this cell has content, it should render on top of overflow from adjacent cells
        if (normalizedText.trim() !== '') {
            cell.style.zIndex = '6';
        }
        
        // Check if text fits within the cell
        const cellWidth = this.getColumnWidth(col);
        const textWidth = this.measureTextWidth(normalizedText, cell);
        const padding = 16;
        
        if (textWidth <= cellWidth - padding) {
            // Text fits, no overflow needed
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            return;
        }
        
        // Text doesn't fit - calculate available overflow space based on alignment
        const textAlign = cellData.textAlign ?? this.defaultCellStyle.textAlign ?? 'left';
        const verticalAlign = cellData.verticalAlign ?? this.defaultCellStyle.verticalAlign ?? 'bottom';
        
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
        
        // Calculate the TOTAL theoretical space (as if nothing is blocking)
        let totalLeftSpace = 0;
        let totalRightSpace = 0;
        
        // Calculate total space to the left
        for (let c = col - 1; c >= Math.max(0, col - 20); c--) {
            totalLeftSpace += this.getColumnWidth(c);
        }
        
        // Calculate total space to the right
        for (let c = col + 1; c < Math.min(this.config.maxCols, col + 21); c++) {
            totalRightSpace += this.getColumnWidth(c);
        }
        
        // Now calculate the AVAILABLE space (stopping at blocking cells)
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
            // Use TOTAL left space for wrapper width (not just available)
            // This ensures the text wrapper is wide enough to hold all the text
            wrapperWidth = cellWidth + totalLeftSpace;
            // Position wrapper so its RIGHT edge aligns with the cell's right edge
            wrapperLeft = -totalLeftSpace;
            // Calculate how much to clip from the left if there's blocking content
            const blockedLeftSpace = totalLeftSpace - availableLeftSpace;
            if (blockedLeftSpace > 0) {
                clipLeft = blockedLeftSpace;
            }
        }
        else if (textAlign === 'center') {
            const extraSpaceNeeded = textWidth - (cellWidth - padding);
            const halfSpace = extraSpaceNeeded / 2;
            
            // Calculate THEORETICAL space on both sides (for stable centering)
            let theoreticalLeftSpace = 0;
            for (let c = col - 1; c >= Math.max(0, col - 20); c--) {
                theoreticalLeftSpace += this.getColumnWidth(c);
                if (theoreticalLeftSpace >= halfSpace) break;
            }
            
            let theoreticalRightSpace = 0;
            for (let c = col + 1; c < Math.min(this.config.maxCols, col + 21); c++) {
                theoreticalRightSpace += this.getColumnWidth(c);
                if (theoreticalRightSpace >= halfSpace) break;
            }
            
            // Calculate available left space for clipping
            let availableLeftSpace = 0;
            for (let c = col - 1; c >= Math.max(0, col - 20); c--) {
                if (cellHasContent(row, c)) {
                    break;
                }
                availableLeftSpace += this.getColumnWidth(c);
                if (availableLeftSpace >= theoreticalLeftSpace) break;
            }
            
            // Calculate available right space for clipping
            let availableRightSpace = 0;
            for (let c = col + 1; c < Math.min(this.config.maxCols, col + 21); c++) {
                if (cellHasContent(row, c)) {
                    break;
                }
                availableRightSpace += this.getColumnWidth(c);
                if (availableRightSpace >= theoreticalRightSpace) break;
            }
            
            // Always use theoretical width for stable positioning
            wrapperWidth = cellWidth + theoreticalLeftSpace + theoreticalRightSpace;
            wrapperLeft = -theoreticalLeftSpace;
            
            // Calculate clipping from both sides
            if (availableLeftSpace < theoreticalLeftSpace) {
                clipLeft = theoreticalLeftSpace - availableLeftSpace;
            }
            if (availableRightSpace < theoreticalRightSpace) {
                clipRight = theoreticalRightSpace - availableRightSpace;
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
        textWrapper.style.paddingLeft = 'var(--space-8)';
        textWrapper.style.paddingRight = 'var(--space-8)';
        textWrapper.style.paddingTop = 'var(--space-6)';
        textWrapper.style.paddingBottom = 'var(--space-6)';
        
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
        textSpan.textContent = normalizedText;
        
        textWrapper.appendChild(textSpan);
        cell.textContent = '';
        cell.appendChild(textWrapper);
        
        // Apply clip-path if needed (for clipping from either or both sides)
        if (clipLeft > 0 || clipRight > 0) {
            textWrapper.style.clipPath = `inset(0 ${clipRight}px 0 ${clipLeft}px)`;
        }
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
    
    isHyperlink(text) {
        if (!text) return false;
        // Check for common URL patterns
        const urlPattern = /^(https?:\/\/|www\.)/i;
        return urlPattern.test(text.trim());
    }
    
    clearCellFormatting() {
        // Save state before clearing
        this.saveState(`Clear formatting from ${this.selectedCellCoords.size} cells`);
        
        this.selectedCellCoords.forEach(coordKey => {
            this.updateCellDataEntry(coordKey, data => {
                delete data.backgroundColor;
                delete data.bold;
                delete data.italic;
                delete data.underline;
                delete data.strikethrough;
                delete data.fontSize;
                delete data.fontColor;
                delete data.textAlign;
                delete data.verticalAlign;
                delete data.borders;
            });
        });

        this.selectedCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.fontSize = '';
            cell.style.color = '';
            cell.style.borderTop = '';
            cell.style.borderRight = '';
            cell.style.borderBottom = '';
            cell.style.borderLeft = '';
            cell.classList.remove('bold', 'italic', 'underline', 'strikethrough');
            cell.classList.remove('align-left', 'align-center', 'align-right',
                    'align-top', 'align-middle', 'align-bottom');
        });

        this._updateCellsAndAdjacent(this.selectedCells);

        this.updateUI();
        
        // Refresh both color palettes to update "colors in use"
        this.refreshColorPalette();
        this.refreshFontColorPalette();
        
        this.log(`Cleared formatting from ${this.selectedCellCoords.size} cells`);
    }

    handleDocumentClick(event) {
        // Check each popup separately and close if clicking outside
        if (!event.target.closest('#contextMenu')) {
            this.hideContextMenu();
        }
        if (!event.target.closest('#colorPalette') && !event.target.closest('#colorBtn')) {
            this.hideColorPalette();
        }
        if (!event.target.closest('#fontColorPalette') && !event.target.closest('#fontColorBtn')) {
            this.hideFontColorPalette();
        }
        if (!event.target.closest('#borderMenu') && !event.target.closest('#borderBtn')) {
            this.hideBorderMenu();
        }
        // Don't close link editor if clicking inside it OR on its buttons
        if (!event.target.closest('#linkEditor') && 
            !event.target.closest('#linkSaveBtn') && 
            !event.target.closest('#linkCancelBtn')) {
            this.hideLinkEditor();
        }
        if (!event.target.closest('.spreadsheet-container') && 
            !event.target.closest('#contextMenu') && 
            !event.target.closest('#colorPalette') &&
            !event.target.closest('#fontColorPalette') &&
            !event.target.closest('#linkEditor')) {
            if (this.currentEditingCell) {
                this.stopEditingCell();
            }
        }
    }
    
    checkIfAllCellsHaveFormat(format) {
        // Check if all selected cells have the specified format
        let allHaveFormat = true;
        
        for (const coordKey of this.selectedCellCoords) {
            const cellData = this.cellData.get(coordKey);
            const value = (cellData && Object.prototype.hasOwnProperty.call(cellData, format))
                ? cellData[format]
                : this.defaultCellStyle[format];
            if (!value) {
                allHaveFormat = false;
                break;
            }
        }
        
        return allHaveFormat;
    }

    updateFormattingButtons() {
        ['bold', 'italic', 'underline', 'strikethrough'].forEach(fmt => 
            document.getElementById(`${fmt}Btn`).classList.toggle('active', 
                this.selectedCellCoords.size && this.checkIfAllCellsHaveFormat(fmt)
            )
        );
        
        this.updateAlignmentButtons();
        this.updateFontColorButton();
        this.updateBackgroundColorButton();
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
            
            // Refresh colors in use for border menu
            if (type === 'border') {
                const colors = this.getBorderColorsInUse();
                const container = document.getElementById('borderColorsInUse');
                const grid = document.getElementById('borderColorsInUseGrid');
                
                if (colors.length > 0) {
                    container.style.display = 'block';
                    grid.innerHTML = '';
                    colors.forEach(color => {
                        const swatch = document.createElement('div');
                        Object.assign(swatch.style, {
                            width: '20px', height: '20px', backgroundColor: color,
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-sm)', cursor: 'pointer'
                        });
                        swatch.title = color;
                        swatch.onclick = () => {
                            document.getElementById('borderColorPicker').value = color;
                            document.getElementById('borderColorHex').value = color;
                            const preview = this.borderMenu.querySelector('.border-preview-cell');
                            const style = document.getElementById('borderStyleSelect').value;
                            const width = document.getElementById('borderWidthSelect').value + 'px';
                            preview.style.border = `${width} ${style} ${color}`;
                        };
                        grid.appendChild(swatch);
                    });
                } else {
                    container.style.display = 'none';
                }
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

    setupColorPalette() {
        this._setupColorPaletteGeneric(
            'colorPaletteGrid',
            'background',
            this.customBackgroundColors,
            this.getBackgroundColorsInUse.bind(this),
            this.applyBackgroundColor.bind(this),
            this.hideColorPalette.bind(this),
            this.refreshColorPalette.bind(this)
        );
    }

    setupFontColorPalette() {
        this._setupColorPaletteGeneric(
            'fontColorPaletteGrid',
            'font',
            this.customFontColors,
            this.getFontColorsInUse.bind(this),
            this.applyFontColor.bind(this),
            this.hideFontColorPalette.bind(this),
            this.refreshFontColorPalette.bind(this)
        );
    }

    _setupColorPaletteGeneric(containerId, type, customColorsArray, getColorsInUseFn, applyColorFn, hidePaletteFn, refreshPaletteFn) {
        const container = document.getElementById(containerId);
        container.style.display = 'block';
        container.innerHTML = '';
        
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
        firstBtn.addEventListener('click', () => {
            applyColorFn('');
            hidePaletteFn();
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
        
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn--sm';
        addBtn.textContent = '+';
        addBtn.style.minWidth = '32px';
        addBtn.title = 'Add custom color';
        
        // Sync color picker and hex input
        colorInput.addEventListener('input', (e) => {
            hexInput.value = e.target.value.substring(1);
        });

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

        // Add custom color
        addBtn.addEventListener('click', () => {
            let color = colorInput.value;
            if (color && !customColorsArray.includes(color)) {
                customColorsArray.push(color);
                refreshPaletteFn();
            }
        });

        // Apply color on Enter
        hexInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                let value = hexInput.value.trim().toUpperCase();
                value = value.replace(/#/g, '');
                if (/^[0-9A-F]{6}$/.test(value)) {
                    const fullColor = '#' + value;
                    if (!customColorsArray.includes(fullColor)) {
                        customColorsArray.push(fullColor);
                    }
                    applyColorFn(fullColor);
                    hidePaletteFn();
                }
            }
        });
        
        hexInputWrapper.appendChild(hexPrefix);
        hexInputWrapper.appendChild(hexInput);
        customSection.appendChild(colorInput);
        customSection.appendChild(hexInputWrapper);
        customSection.appendChild(addBtn);
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
        if (colorsInUse.length > 0) {
            this._appendColorSection(container, 'Colors in use', colorsInUse, applyColorFn, hidePaletteFn);
        }
        
        // Custom colors section
        if (customColorsArray.length > 0) {
            this._appendColorSection(container, 'Custom colors', customColorsArray, applyColorFn, hidePaletteFn);
        }
    }

    _createColorSwatch(color, applyColorFn, hidePaletteFn) {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.addEventListener('click', () => {
            applyColorFn(color);
            hidePaletteFn();
        });
        return swatch;
    }

    _appendColorSection(container, title, colors, applyColorFn, hidePaletteFn) {
        const sectionTitle = document.createElement('div');
        sectionTitle.textContent = title;
        sectionTitle.style.fontSize = 'var(--font-size-xs)';
        sectionTitle.style.color = 'var(--color-text-secondary)';
        sectionTitle.style.marginTop = 'var(--space-12)';
        sectionTitle.style.marginBottom = 'var(--space-4)';
        sectionTitle.style.fontWeight = 'var(--font-weight-medium)';
        container.appendChild(sectionTitle);
        
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
        grid.style.gap = 'var(--space-4)';
        
        colors.forEach(color => {
            const swatch = this._createColorSwatch(color, applyColorFn, hidePaletteFn);
            grid.appendChild(swatch);
        });
        
        container.appendChild(grid);
    }

    _getColorsInUse(prop) {
        const colors = new Set();
        this.cellData.forEach(data => {
            if (prop === 'borders' && data.borders) {
                ['top', 'right', 'bottom', 'left'].forEach(side => {
                    const match = data.borders[side]?.match(/#[0-9A-F]{6}/i);
                    if (match) colors.add(match[0].toUpperCase());
                });
            } else if (data[prop]) {
                colors.add(data[prop].toUpperCase());
            }
        });
        const defaultValue = this.defaultCellStyle[prop];
        if (defaultValue) {
            colors.add(String(defaultValue).toUpperCase());
        }
        return Array.from(colors).sort();
    }

    getBackgroundColorsInUse() { return this._getColorsInUse('backgroundColor'); }
    getFontColorsInUse() { return this._getColorsInUse('fontColor'); }
    getBorderColorsInUse() { return this._getColorsInUse('borders'); }
    
    refreshColorPalette() {
        this.setupColorPalette();
    }

    refreshFontColorPalette() {
        this.setupFontColorPalette();
    }

    _applyColor(prop, styleProp, color, updateFn) {
        if (!this.hasSelection()) return;
        const applyToAll = this.isFullGridSelection();
        this.saveState(`Apply ${prop}${applyToAll ? ' (all cells)' : ''}`);

        if (applyToAll) {
            this.setDefaultCellProperty(prop, color || null);
            const keysToDelete = [];
            this.cellData.forEach((data, coord) => {
                delete data[prop];
                if (this.isCellEffectivelyEmpty(data)) {
                    keysToDelete.push(coord);
                }
            });
            keysToDelete.forEach(coord => this.cellData.delete(coord));
            this.refreshAllVisibleCells();
            updateFn.call(this);
            return;
        }

        this.selectedCellCoords.forEach(c => {
            this.updateCellDataEntry(c, data => {
                if (color) {
                    data[prop] = color;
                } else {
                    delete data[prop];
                }
            });
        });
        
        this.selectedCells.forEach(el => el.style[styleProp] = color || '');
        updateFn.call(this);
    }

    applyBackgroundColor(c) { 
        this._applyColor('backgroundColor', 'backgroundColor', c, this.updateBackgroundColorButton); 
        this.refreshColorPalette();
    }
    applyFontColor(c) { 
        this._applyColor('fontColor', 'color', c, this.updateFontColorButton); 
        this.refreshFontColorPalette();
    }
    
    _getCommonCellProperty(property) {
        if (!this.hasSelection()) return { hasValue: false, value: null, allSame: false };
        
        let commonValue;
        let initialized = false;
        let allSame = true;
        
        for (const coord of this.selectedCellCoords) {
            const data = this.cellData.get(coord);
            let value;
            if (data && Object.prototype.hasOwnProperty.call(data, property)) {
                value = data[property];
            } else if (Object.prototype.hasOwnProperty.call(this.defaultCellStyle, property)) {
                value = this.defaultCellStyle[property];
            } else {
                value = null;
            }
            if (!initialized) {
                commonValue = value;
                initialized = true;
            } else if (commonValue !== value) {
                allSame = false;
                break;
            }
        }
        
        if (!initialized) return { hasValue: false, value: null, allSame: false };
        return { hasValue: true, value: commonValue, allSame };
    }

    updateBackgroundColorButton() {
        const indicator = document.getElementById('bgColorIndicator');
        const { hasValue, value, allSame } = this._getCommonCellProperty('backgroundColor');
        
        indicator.style.backgroundColor = (hasValue && allSame && value) 
            ? value 
            : 'transparent';
    }

    updateFontColorButton() {
        const colorBar = document.getElementById('fontColorBtn').querySelector('span span');
        const { hasValue, value, allSame } = this._getCommonCellProperty('fontColor');
        
        colorBar.style.backgroundColor = !hasValue ? 'currentColor' :
            (allSame && value) ? value :
            (allSame && !value) ? 'var(--color-text)' :
            'currentColor';
    }

    setupBorderMenu() {
        const borderOptions = this.borderMenu.querySelectorAll('.border-option');
        const borderStyleSelect = document.getElementById('borderStyleSelect');
        const borderWidthSelect = document.getElementById('borderWidthSelect');
        const borderColorPicker = document.getElementById('borderColorPicker');
        const borderColorHex = document.getElementById('borderColorHex');
        const borderPreviewCells = this.borderMenu.querySelectorAll('.border-preview-cell');
        
        // Update preview function
        const updatePreview = () => {
            const style = borderStyleSelect.value;
            const width = borderWidthSelect.value + 'px';
            const color = borderColorPicker.value;
            borderPreviewCells.forEach(cell => {
                cell.style.border = `${width} ${style} ${color}`;
            });
        };
        
        // Apply preview border based on action
        const applyPreviewBorder = (action) => {
            const style = borderStyleSelect.value;
            const width = borderWidthSelect.value + 'px';
            const color = borderColorPicker.value;
            const borderValue = `${width} ${style} ${color}`;
            
            // Reset all borders first to default grid borders
            borderPreviewCells.forEach(cell => {
                cell.style.borderTop = '';
                cell.style.borderRight = '1px solid var(--color-border)';
                cell.style.borderBottom = '1px solid var(--color-border)';
                cell.style.borderLeft = '';
            });
            
            // Define which cells are on which edges (0-8, row-major order)
            const topRow = [0, 1, 2];
            const middleRow = [3, 4, 5];
            const bottomRow = [6, 7, 8];
            const leftCol = [0, 3, 6];
            const centerCol = [1, 4, 7];
            const rightCol = [2, 5, 8];
            
            switch (action) {
                case 'all':
                    borderPreviewCells.forEach(cell => {
                        cell.style.border = borderValue;
                    });
                    break;
                case 'outer':
                    topRow.forEach(i => borderPreviewCells[i].style.borderTop = borderValue);
                    bottomRow.forEach(i => borderPreviewCells[i].style.borderBottom = borderValue);
                    leftCol.forEach(i => borderPreviewCells[i].style.borderLeft = borderValue);
                    rightCol.forEach(i => borderPreviewCells[i].style.borderRight = borderValue);
                    break;
                case 'inner':
                    // Horizontal inner borders - top row bottom + middle row top AND bottom + bottom row top
                    topRow.forEach(i => borderPreviewCells[i].style.borderBottom = borderValue);
                    middleRow.forEach(i => {
                        borderPreviewCells[i].style.borderTop = borderValue;
                        borderPreviewCells[i].style.borderBottom = borderValue;
                    });
                    bottomRow.forEach(i => borderPreviewCells[i].style.borderTop = borderValue);
                    // Vertical inner borders - left col right + center col left AND right + right col left
                    leftCol.forEach(i => borderPreviewCells[i].style.borderRight = borderValue);
                    centerCol.forEach(i => {
                        borderPreviewCells[i].style.borderLeft = borderValue;
                        borderPreviewCells[i].style.borderRight = borderValue;
                    });
                    rightCol.forEach(i => borderPreviewCells[i].style.borderLeft = borderValue);
                    break;
                case 'horizontal':
                    // Top row bottom + middle row both sides + bottom row top
                    topRow.forEach(i => borderPreviewCells[i].style.borderBottom = borderValue);
                    middleRow.forEach(i => {
                        borderPreviewCells[i].style.borderTop = borderValue;
                        borderPreviewCells[i].style.borderBottom = borderValue;
                    });
                    bottomRow.forEach(i => borderPreviewCells[i].style.borderTop = borderValue);
                    break;
                case 'vertical':
                    // Left col right + center col both sides + right col left
                    leftCol.forEach(i => borderPreviewCells[i].style.borderRight = borderValue);
                    centerCol.forEach(i => {
                        borderPreviewCells[i].style.borderLeft = borderValue;
                        borderPreviewCells[i].style.borderRight = borderValue;
                    });
                    rightCol.forEach(i => borderPreviewCells[i].style.borderLeft = borderValue);
                    break;
                case 'left':
                    leftCol.forEach(i => borderPreviewCells[i].style.borderLeft = borderValue);
                    break;
                case 'right':
                    rightCol.forEach(i => borderPreviewCells[i].style.borderRight = borderValue);
                    break;
                case 'top':
                    topRow.forEach(i => borderPreviewCells[i].style.borderTop = borderValue);
                    break;
                case 'bottom':
                    bottomRow.forEach(i => borderPreviewCells[i].style.borderBottom = borderValue);
                    break;
                case 'clear':
                    // Show no borders (keep default grid borders)
                    break;
            }
        };
        
        // Update colors in use
        const updateColorsInUse = () => {
            const colors = this.getBorderColorsInUse();
            const container = document.getElementById('borderColorsInUse');
            const grid = document.getElementById('borderColorsInUseGrid');
            
            if (colors.length > 0) {
                container.style.display = 'block';
                grid.innerHTML = '';
                colors.forEach(color => {
                    const swatch = document.createElement('div');
                    swatch.style.width = '20px';
                    swatch.style.height = '20px';
                    swatch.style.backgroundColor = color;
                    swatch.style.border = '1px solid var(--color-border)';
                    swatch.style.borderRadius = 'var(--radius-sm)';
                    swatch.style.cursor = 'pointer';
                    swatch.title = color;
                    swatch.addEventListener('click', () => {
                        borderColorPicker.value = color;
                        borderColorHex.value = color;
                        updatePreview();
                    });
                    grid.appendChild(swatch);
                });
            } else {
                container.style.display = 'none';
            }
        };
        
        // Initial preview and colors - show clear state by default
        applyPreviewBorder('clear');
        updateColorsInUse();
        
        // Sync color picker and hex input
        borderColorPicker.addEventListener('input', (e) => {
            borderColorHex.value = e.target.value;
            updatePreview();
        });
        
        borderColorHex.addEventListener('input', (e) => {
            let value = e.target.value.trim();
            if (value.startsWith('#')) {
                value = value.substring(1);
            }
            value = value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
            
            if (value.length === 6) {
                borderColorPicker.value = '#' + value;
                borderColorHex.value = '#' + value.toUpperCase();
                updatePreview();
            } else if (value.length === 3) {
                // Support short hex codes
                const expanded = value.split('').map(c => c + c).join('');
                borderColorPicker.value = '#' + expanded;
                borderColorHex.value = '#' + expanded.toUpperCase();
                updatePreview();
            }
        });
        
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

    applyBorder(action, style, width, color) {
        if (!this.hasSelection()) return;
        this.saveState(`Apply ${action} border`);
        
        const borderVal = action === 'clear' ? '' : `${width} ${style} ${color}`;
        
        // Find all contiguous regions in the selection
        const regions = this.findContiguousRegions();
        
        // Apply borders to each region independently
        regions.forEach(region => {
            const { minRow: minR, maxRow: maxR, minCol: minC, maxCol: maxC, cells } = region;
            
            const rules = {
                all: () => ['top', 'right', 'bottom', 'left'],
                outer: (r, c) => [[r === minR, 'top'], [r === maxR, 'bottom'], [c === minC, 'left'], [c === maxC, 'right']].filter(x => x[0]).map(x => x[1]),
                inner: (r, c) => [[r > minR, 'top'], [r < maxR, 'bottom'], [c > minC, 'left'], [c < maxC, 'right']].filter(x => x[0]).map(x => x[1]),
                horizontal: r => [[r > minR, 'top'], [r < maxR, 'bottom']].filter(x => x[0]).map(x => x[1]),
                vertical: (r, c) => [[c > minC, 'left'], [c < maxC, 'right']].filter(x => x[0]).map(x => x[1]),
                left: (r, c) => c === minC ? ['left'] : [],
                right: (r, c) => c === maxC ? ['right'] : [],
                top: r => r === minR ? ['top'] : [],
                bottom: r => r === maxR ? ['bottom'] : [],
                clear: () => null
            };
            
            cells.forEach(coord => {
                const { row, col } = this.getCoordPos(coord);
                this.updateCellDataEntry(coord, data => {
                    if (action === 'clear') {
                        delete data.borders;
                        return;
                    }

                    const sides = rules[action](row, col) || [];
                    if (!sides.length) {
                        return;
                    }

                    if (!data.borders) data.borders = {};
                    sides.forEach(side => {
                        data.borders[side] = borderVal;
                    });
                });
            });
        });
        
        this._updateCellsAndAdjacent(this.selectedCells);
    }
    
    findContiguousRegions() {
        // Convert selected coordinates to a Set for O(1) lookup
        const selectedSet = new Set(this.selectedCellCoords);
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
        this.selectedCellCoords.forEach(coord => {
            if (!visited.has(coord)) {
                const { row, col } = this.getCoordPos(coord);
                const region = floodFill(row, col);
                regions.push(region);
            }
        });
        
        return regions;
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
    }

    handleFormulaKeyDown(event) {
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
            this.formulaInput.blur();
        }
    }

    handleFormulaInput() {
        if (this.primaryCell && !this.currentEditingCell) {
            const newValue = this.formulaInput.value;
            this.updateCellValue(this.primaryCell, newValue);
        }
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
            
            // Replace functions FIRST (before cell refs are replaced)
            expression = this.replaceFunctions(expression);
            
            // Then replace individual cell references
            expression = this.replaceCellReferences(expression, cellRow, cellCol);
            
            const result = this.evaluateExpression(expression);
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

    evaluateExpression(expression) {
        // Handle basic functions
        expression = this.replaceFunctions(expression);
        
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

    replaceFunctions(expr) {
        const ops = {
            SUM: v => v.reduce((a,b) => a+b, 0),
            AVG: v => v.reduce((a,b) => a+b, 0) / v.length,
            COUNT: v => v.length,
            MIN: v => Math.min(...v),
            MAX: v => Math.max(...v),
            MEDIAN: v => {const s=[...v].sort((a,b)=>a-b), m=s.length>>1; return s.length%2?s[m]:(s[m-1]+s[m])/2}
        };
        
        return expr.replace(/(\w+)\(([A-Z]+\d+):([A-Z]+\d+)\)/gi, 
            (_, fn, s, e) => (v => v.length ? (ops[fn.toUpperCase()]?.(v) ?? 0) : 0)(this.getRangeValues(s, e))
        );
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

                    const preferredBranch = data.branch ?? data.prBaseBranch;
                    if (preferredBranch) {
                        const branch = String(preferredBranch).trim();
                        if (branch.length) {
                            normalized.branch = branch;
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
        try {
            localStorage.setItem('codeberg-oauth-token', JSON.stringify(info));
        } catch (error) {
            console.warn('Failed to persist OAuth token', error);
        }
    }

    clearStoredAccessToken() {
        this.accessTokenInfo = null;
        try {
            localStorage.removeItem('codeberg-oauth-token');
        } catch (error) {
            console.warn('Failed to clear OAuth token', error);
        }
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
        return `${HTML_PREFIX}${tableMarkup}${HTML_SUFFIX}`;
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
        rows.push('                    <table data-spreadsheet-export="true" class="spreadsheet-fallback">');
        rows.push('                        <thead>');
        rows.push('                            <tr>');
        rows.push('                                <th scope="col"></th>');
        for (let col = minCol; col <= maxCol; col++) {
            const colWidth = this.getColumnWidth(col);
            rows.push(`                                <th scope="col" data-col="${col}" data-width="${colWidth}">${this.getColumnName(col)}</th>`);
        }
        rows.push('                            </tr>');
        rows.push('                        </thead>');
        rows.push('                        <tbody>');

        for (let row = minRow; row <= maxRow; row++) {
            const rowHeight = this.getRowHeight(row);
            rows.push(`                            <tr data-row="${row}" data-height="${rowHeight}">`);
            rows.push(`                                <th scope="row">${row + 1}</th>`);
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                const cellData = this.cellData.get(coordKey) || {};
                const datasets = [`data-col="${col}"`];
                const styles = [];

                const rawValue = cellData.value ?? '';
                if (rawValue) {
                    datasets.push(`data-raw="${escapeAttribute(rawValue)}"`);
                }

                if (cellData.linkUrl) {
                    datasets.push(`data-link="${escapeAttribute(cellData.linkUrl)}"`);
                }

                if (cellData.borders) {
                    ['top', 'right', 'bottom', 'left'].forEach(side => {
                        if (cellData.borders[side]) {
                            datasets.push(`data-border-${side}="${escapeAttribute(cellData.borders[side])}"`);
                        }
                    });
                }

                const displayText = this.getDisplayTextForCell(row, col, cellData);
                if (cellData.backgroundColor) {
                    datasets.push(`data-bg="${escapeAttribute(cellData.backgroundColor)}"`);
                    styles.push(`background-color:${cellData.backgroundColor}`);
                }
                if (cellData.fontColor) {
                    datasets.push(`data-font="${escapeAttribute(cellData.fontColor)}"`);
                    styles.push(`color:${cellData.fontColor}`);
                }
                if (cellData.fontSize) {
                    datasets.push(`data-size="${escapeAttribute(String(cellData.fontSize))}"`);
                    styles.push(`font-size:${cellData.fontSize}px`);
                }
                const textDecorations = [];

                if (cellData.bold) {
                    datasets.push('data-bold="true"');
                    styles.push('font-weight:bold');
                }
                if (cellData.italic) {
                    datasets.push('data-italic="true"');
                    styles.push('font-style:italic');
                }
                if (cellData.underline) {
                    datasets.push('data-underline="true"');
                    textDecorations.push('underline');
                }
                if (cellData.strikethrough) {
                    datasets.push('data-strikethrough="true"');
                    textDecorations.push('line-through');
                }
                if (cellData.textAlign) {
                    datasets.push(`data-align="${escapeAttribute(cellData.textAlign)}"`);
                    styles.push(`text-align:${cellData.textAlign}`);
                }
                if (cellData.verticalAlign) {
                    datasets.push(`data-valign="${escapeAttribute(cellData.verticalAlign)}"`);
                    styles.push(`vertical-align:${cellData.verticalAlign}`);
                }
                if (displayText.includes('\n')) {
                    styles.push('white-space:pre-wrap');
                }

                if (textDecorations.length) {
                    styles.push(`text-decoration:${textDecorations.join(' ')}`);
                }

                const borderStyles = this.collectBorderStylesForCell(row, col, cellData);
                if (borderStyles.length) {
                    styles.push(...borderStyles);
                }

                let cellContent = escapeHTML(displayText);
                if (!cellContent && cellData.linkUrl) {
                    cellContent = escapeHTML(cellData.linkUrl);
                }
                if (cellData.linkUrl) {
                    const href = escapeAttribute(cellData.linkUrl);
                    cellContent = `<a href="${href}">${cellContent}</a>`;
                }

                const styleAttr = styles.filter(Boolean).length ? ` style="${styles.join(';')}"` : '';
                rows.push(`                                <td ${datasets.join(' ')}${styleAttr}>${cellContent}</td>`);
            }
            rows.push('                            </tr>');
        }

        rows.push('                        </tbody>');
        rows.push('                    </table>');
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
