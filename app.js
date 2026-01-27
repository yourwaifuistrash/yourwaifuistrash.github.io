const TOOLBAR_AND_FORMULA_HTML = `
        <div class="toolbar">
            <div class="toolbar-section">
                <button class="btn btn--sm toolbar-btn" id="saveBtn" title="Save changes (opens GitHub issue). Hold Shift to configure GitHub.">
                    <span class="toolbar-btn__icon">
                        💾
                        <span class="save-indicator-badge hidden" id="saveBtnBadge" aria-hidden="true"></span>
                    </span>
                </button>
                <button class="btn btn--sm toolbar-btn" id="revisionHistoryBtn" title="View revision history">
                    <span class="toolbar-btn__icon" style="position: relative; display: inline-flex;">
                        🕑
                        <span class="revision-lag-badge hidden" id="revisionLagBadge" aria-hidden="true"></span>
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
                <p>Select how you would like to deliver the updated <code id="saveModalTargetFile">page</code>:</p>
                <div class="save-modal__field">
                    <label for="tableTitleInput">Table title</label>
                    <input type="text" id="tableTitleInput" class="form-control" maxlength="120" placeholder="Untitled table" autocomplete="off">
                    <div class="save-modal__field-hint">Shows on the floating badge and in the saved HTML title.</div>
                </div>
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

const REVISION_HISTORY_HTML = `
    <div id="revisionHistoryDrawer" class="revision-drawer hidden" role="dialog" aria-modal="true" aria-labelledby="revisionHistoryTitle">
        <div class="revision-drawer__backdrop" data-revision-close></div>
        <aside class="revision-drawer__panel">
            <header class="revision-drawer__header">
                <div class="revision-drawer__titles">
                    <div class="revision-drawer__title" id="revisionHistoryTitle">Revision history</div>
                    <div class="revision-drawer__subtitle" id="revisionHistorySubtitle"></div>
                </div>
                <div class="revision-drawer__header-actions">
                    <button class="btn btn--sm toolbar-btn" id="revisionHistoryRefreshBtn" title="Refresh revisions">
                        <span class="toolbar-btn__icon">↻</span>
                    </button>
                    <button class="btn btn--sm toolbar-btn revision-drawer__close" data-revision-close aria-label="Close revision history">×</button>
                </div>
            </header>
            <div class="revision-drawer__body">
                <div class="revision-drawer__summary" id="revisionHistorySummary"></div>
                <div class="revision-drawer__status" id="revisionHistoryStatus"></div>
                <div class="revision-drawer__list" id="revisionHistoryList" role="list"></div>
            </div>
        </aside>
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

class SpreadsheetApp {
    constructor() {
        this.persistedRange = { maxRow: 19, maxCol: 9 };
        this.tableTitle = this.getDefaultTableTitle();
        this.pageFileName = this.getCurrentPageFilename();
        this.sheetId = this.getSheetIdFromFilename(this.pageFileName) || 'index';
        this.container = document.querySelector('.spreadsheet-container');
        if (!this.container) {
            throw new Error('Spreadsheet container not found');
        }
        this.buildUI();
        this.sheetListAttr = this.getSheetListAttributeFromDOM();

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
            codebergProfileMeta: $('codebergProfileMeta'),
            revisionHistoryDrawer: $('revisionHistoryDrawer'),
            revisionHistoryList: $('revisionHistoryList'),
            revisionHistoryStatus: $('revisionHistoryStatus'),
            revisionHistorySubtitle: $('revisionHistorySubtitle'),
            revisionHistorySummary: $('revisionHistorySummary'),
            revisionLagBadge: $('revisionLagBadge'),
            tableTitleBadge: $('tableTitleBadge'),
            tableTitleInput: $('tableTitleInput')
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
        this.revisionHistoryEntries = [];
        this.revisionMetadata = new Map();
        this.revisionWorkingSnapshot = null;
        this.revisionActiveRef = 'local';
        this.revisionActiveLabel = 'Current view';
        this.revisionBranch = null;
        this.isApplyingRevision = false;
        this.revisionHistoryLoading = false;
        this.revisionRangeCache = new Map();
        this.revisionLagCount = null;
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
        this.initialTableTitle = this.tableTitle;
        this.syncTableTitleBadge();
        this.updateDocumentTitleFromTable();
        this.revisionMetadata.set(this.revisionActiveRef, this.buildRevisionMetaFromState());
        this.renderRevisionHistorySummary();
        
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
        this.localDraftKey = this.buildLocalDraftKey();
        this.dirtyUpdateScheduled = false;
        this.draftSaveTimer = null;
        this.latestDiffEntries = [];
        this.latestDiffTotal = 0;
        this.latestDiffTruncated = false;
        this.diffViewMode = 'current'; // 'current' | 'all'
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
        this.maybeLoadRevisionFromUrl();
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

        const normalizedInitialTitle = this.normalizeTableTitle(this.initialTableTitle);
        const normalizedCurrentTitle = this.normalizeTableTitle(this.tableTitle);
        if (normalizedInitialTitle !== normalizedCurrentTitle) {
            allLines.push(`~ Table title "${normalizedInitialTitle}" -> "${normalizedCurrentTitle}"`);
        }

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
                meta: { sheetId: this.sheetId || null }
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
                    meta: { kind, index, sheetId: this.sheetId || null }
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
                    meta: { kind: 'defaultStyle', sheetId: this.sheetId || null }
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
                        meta: { kind: `${kind}Style`, index, sheetId: this.sheetId || null }
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

        const normalizedInitialTitle = this.normalizeTableTitle(this.initialTableTitle);
        const normalizedCurrentTitle = this.normalizeTableTitle(this.tableTitle);
        if (normalizedInitialTitle !== normalizedCurrentTitle) {
            total += 1;
            if (entries.length + extraEntries.length < maxEntries) {
                extraEntries.push({
                    coord: 'meta:title',
                    row: 0,
                    col: 0,
                    address: 'Table title',
                    changeType: 'modified',
                    before: normalizedInitialTitle ? { value: normalizedInitialTitle } : null,
                    after: normalizedCurrentTitle ? { value: normalizedCurrentTitle } : null,
                    beforeSize: null,
                    afterSize: null,
                    changes: [`Title changed from "${normalizedInitialTitle}" to "${normalizedCurrentTitle}"`],
                    meta: { kind: 'tableTitle' }
                });
            } else {
                truncated = true;
            }
        }

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
        this.setTableTitle(this.initialTableTitle, { skipDirtyUpdate: true });
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

    cloneDiffEntry(entry) {
        if (!entry) return entry;
        try {
            return JSON.parse(JSON.stringify(entry));
        } catch (error) {
            console.warn('Unable to clone diff entry', error);
            return entry;
        }
    }

    cloneDiffEntries(entries) {
        if (!Array.isArray(entries)) return [];
        return entries.map(entry => this.cloneDiffEntry(entry)).filter(Boolean);
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
            this.clearPersistedSheetState();
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
            if (payload.tableTitle) {
                this.tableTitle = this.normalizeTableTitle(payload.tableTitle);
                restored = true;
                needsRefresh = true;
            }
            if (payload.initialTableTitle) {
                this.initialTableTitle = this.normalizeTableTitle(payload.initialTableTitle);
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
                this.syncTableTitleBadge();
                this.updateDocumentTitleFromTable();
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



    buildRevisionMetaFromState(snapshot = null) {
        const range = snapshot?.persistedRange || this.persistedRange || {};
        const maxRow = Number(range.maxRow ?? -1);
        const maxCol = Number(range.maxCol ?? -1);
        const hasRange = Number.isInteger(maxRow) && maxRow >= 0 && Number.isInteger(maxCol) && maxCol >= 0;
        const rows = hasRange ? maxRow + 1 : null;
        const cols = hasRange ? maxCol + 1 : null;
        const lastCell = hasRange ? this.getCellAddress(maxRow, maxCol) : '';
        const rangeLabel = hasRange
            ? `${rows} row${rows === 1 ? '' : 's'} · ${cols} col${cols === 1 ? '' : 's'}${lastCell ? ` · last ${lastCell}` : ''}`
            : 'Range unknown';
        return {
            maxRow: hasRange ? maxRow : null,
            maxCol: hasRange ? maxCol : null,
            rows,
            cols,
            rangeLabel,
            capturedAt: Date.now()
        };
    }

    extractRangeMetaFromHtml(html) {
        if (!html) return { meta: null, hasTable: false };
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const table = doc.querySelector('table[data-spreadsheet-export]');
            if (!table) return { meta: null, hasTable: false };

            let maxRow = -1;
            let maxCol = -1;
            const bodyRows = Array.from(table.querySelectorAll('tbody tr'));
            bodyRows.forEach((tr, rowIndex) => {
                const rowAttr = parseInt(tr.getAttribute('data-row'), 10);
                const row = Number.isInteger(rowAttr) ? rowAttr : rowIndex;
                const cells = Array.from(tr.querySelectorAll('td'));
                if (!cells.length) {
                    maxRow = Math.max(maxRow, row);
                }
                cells.forEach((td, colIndex) => {
                    const colAttr = parseInt(td.getAttribute('data-col'), 10);
                    const col = Number.isInteger(colAttr) ? colAttr : colIndex;
                    const colspan = parseInt(td.getAttribute('colspan'), 10);
                    const rowspan = parseInt(td.getAttribute('rowspan'), 10);
                    const effectiveCol = Number.isInteger(colspan) && colspan > 1 ? col + colspan - 1 : col;
                    const effectiveRow = Number.isInteger(rowspan) && rowspan > 1 ? row + rowspan - 1 : row;
                    maxCol = Math.max(maxCol, effectiveCol);
                    maxRow = Math.max(maxRow, effectiveRow);
                });
            });

            if (maxCol < 0) {
                const headerCols = table.querySelectorAll('thead th[data-col]');
                if (headerCols.length) {
                    maxCol = headerCols.length - 1;
                }
            }
            if (maxRow < 0 && bodyRows.length) {
                maxRow = bodyRows.length - 1;
            }

            if (maxRow < 0 || maxCol < 0) return { meta: null, hasTable: true };
            const meta = this.buildRevisionMetaFromState({ persistedRange: { maxRow, maxCol } });
            meta.hasTable = true;
            return {
                meta,
                hasTable: true
            };
        } catch (error) {
            console.warn('Unable to parse revision range from HTML', error);
            return { meta: null, hasTable: false };
        }
    }

    ensureWorkingCopySnapshot() {
        if (this.revisionActiveRef !== 'local') return this.revisionWorkingSnapshot;
        const snapshot = this.buildSnapshotFromState();
        this.revisionWorkingSnapshot = {
            snapshot,
            label: 'Current view',
            savedAt: Date.now(),
            dirty: this.unsavedChanges
        };
        this.revisionMetadata.set('local', this.buildRevisionMetaFromState(snapshot));
        return this.revisionWorkingSnapshot;
    }

    renderSaveModalDiff() {
        const container = document.getElementById('saveModalDiff');
        if (!container) return;

        const diffData = this.getDiffEntriesForScope(this.diffViewMode);
        if (!diffData.total) {
            container.innerHTML = '<div class="save-modal__diff-empty">No local changes detected.</div>';
            return;
        }

        const maxEntries = 20;
        const entries = diffData.entries.slice(0, maxEntries);
        const total = diffData.total;
        const showMore = diffData.truncated || total > entries.length;

        const tabHtml = `
            <div class="save-modal__diff-tabs" role="tablist">
                <button type="button" class="save-modal__diff-tab ${this.diffViewMode === 'current' ? 'is-active' : ''}" data-diff-scope="current" role="tab" aria-selected="${this.diffViewMode === 'current'}">Current sheet</button>
                <button type="button" class="save-modal__diff-tab ${this.diffViewMode === 'all' ? 'is-active' : ''}" data-diff-scope="all" role="tab" aria-selected="${this.diffViewMode === 'all'}">All changes</button>
            </div>
        `;

        let html = [
            '<div class="save-modal__diff-header">',
            `  <div class="save-modal__diff-title">Local changes (${total})</div>`,
            '  <button type="button" class="btn save-modal__discard-btn" data-save-action="discard">Discard local changes</button>',
            '</div>'
        ].join('');
        html += tabHtml;
        html += '<div class="save-modal__diff-list">';
        entries.forEach(entry => {
            html += this.renderDiffEntry(entry);
        });
        html += '</div>';

        if (showMore) {
            const remaining = Math.max(0, total - entries.length);
            const moreLabel = remaining > 0
                ? `${remaining} more change${remaining === 1 ? '' : 's'} not shown.`
                : 'Additional changes not shown.';
            html += `<div class="save-modal__diff-more">Showing first ${entries.length} changes. ${moreLabel}</div>`;
        }

        container.innerHTML = html;
        container.querySelectorAll('[data-diff-scope]').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget?.getAttribute('data-diff-scope');
                if (!target || !['current', 'all'].includes(target)) return;
                if (this.diffViewMode === target) return;
                this.diffViewMode = target;
                this.renderSaveModalDiff();
            });
        });
    }

    getDiffEntriesForScope(scope = 'current') {
        const currentId = this.sheetId || null;
        const currentEntries = this.filterDiffEntriesForScope(this.latestDiffEntries || [], 'current');
        if (scope !== 'all') {
            return {
                entries: currentEntries,
                total: this.latestDiffTotal ?? currentEntries.length,
                truncated: this.latestDiffTruncated ?? false
            };
        }

        const combined = this.cloneDiffEntries(currentEntries);
        let total = this.latestDiffTotal ?? currentEntries.length;
        let truncated = this.latestDiffTruncated ?? false;

        const stored = this.loadStoredSheetStates({ excludeCurrent: true, requireChanges: true });
        stored.forEach(state => {
            if (!state) return;
            const sheetId = state.sheetId || this.getSheetIdFromFilename(state.filename) || null;
            const entries = this.cloneDiffEntries(state.diffEntries || []);
            if (!entries.length && !(state.diffTotal > 0)) return;
            entries.forEach(entry => {
                if (!entry.meta) entry.meta = {};
                if (!entry.meta.sheetId) entry.meta.sheetId = sheetId;
            });
            combined.push(...entries);
            total += state.diffTotal ?? entries.length;
            truncated = truncated || Boolean(state.diffTruncated);
        });

        return { entries: combined, total, truncated };
    }

    filterDiffEntriesForScope(entries, scope) {
        if (scope === 'all') return entries;
        const currentId = this.sheetId || null;
        return entries.filter(entry => {
            const entrySheet = entry?.meta?.sheetId || null;
            return entrySheet === currentId || entrySheet === null;
        });
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
        } else if (entry.meta?.kind === 'tableTitle') {
            heading = 'Table title';
        }

        const sheetLabel = entry.meta?.sheetId ? `Sheet ${entry.meta.sheetId}` : '';
        const sheetBadge = sheetLabel && this.diffViewMode === 'all'
            ? `<span class="save-modal__diff-sheet">${escapeHTML(sheetLabel)}</span>`
            : '';

        return [
            '<div class="save-modal__diff-item">',
            '  <div class="save-modal__diff-item-header">',
            sheetBadge ? `    ${sheetBadge}` : '',
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
            const styleFont = Number(this.pickStyleValue(row, col, 'fontSize', data));
            const inlineMax = this.getMaxFontSizeInHTML(data?.richText);
            let effective = defaultFontSize;
            if (Number.isFinite(styleFont) && styleFont > 0) effective = styleFont;
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



    buildCombinedDiffText(files = []) {
        if (!Array.isArray(files) || !files.length) return '';
        const parts = [];
        files.forEach(file => {
            const label = file.sheetId ? `Sheet ${file.sheetId}` : (file.filename || 'Sheet');
            parts.push(`### ${label}`);
            if (file.diffText) {
                parts.push(file.diffText);
            } else {
                parts.push('_No cell-level differences detected._');
            }
        });
        return parts.join('\n\n');
    }

    ensureSaveOptionsModal() {
        if (this.saveModal) return;
        document.body.insertAdjacentHTML('beforeend', SAVE_OPTIONS_MODAL_HTML);
        this.saveModal = document.getElementById('saveOptionsModal');
        this.saveModalStatus = document.getElementById('saveModalStatus');
        this.saveModalOAuth = document.getElementById('saveModalOAuthInfo');
        this.tableTitleInput = document.getElementById('tableTitleInput');
        this.saveModalTargetFile = document.getElementById('saveModalTargetFile');

        if (this.tableTitleInput && !this.tableTitleInput.dataset.bound) {
            this.tableTitleInput.addEventListener('input', (event) => {
                this.setTableTitle(event.target.value);
            });
            this.tableTitleInput.dataset.bound = 'true';
        }
        this.syncTableTitleInput();
        this.syncTargetFileLabel();

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
            this.syncTableTitleInput();
            this.syncTargetFileLabel();
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

    setRevisionStatus(message, isError = false) {
        if (!this.revisionHistoryStatus) return;
        this.revisionHistoryStatus.textContent = message || '';
        this.revisionHistoryStatus.classList.toggle('revision-drawer__status--error', Boolean(isError));
    }

    getRevisionRefFromUrl() {
        if (typeof window === 'undefined' || !window.location) return null;
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('rev') || params.get('revision') || params.get('commit');
        return ref ? ref.trim() : null;
    }

    updateRevisionShareUrl(ref) {
        if (typeof window === 'undefined' || !window.history?.replaceState || !window.location) return;
        const params = new URLSearchParams(window.location.search);
        const normalized = ref && ref !== 'local' ? ref : null;
        if (normalized) {
            params.set('rev', normalized);
        } else {
            params.delete('rev');
            params.delete('revision');
            params.delete('commit');
        }
        const query = params.toString();
        const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
        window.history.replaceState({}, document.title, newUrl);
    }

    async maybeLoadRevisionFromUrl() {
        const ref = this.getRevisionRefFromUrl();
        if (!ref) return;

        // Avoid reloading the same revision if it is already active
        if (this.revisionActiveRef && this.revisionActiveRef !== 'local' && this.revisionActiveRef === ref) {
            this.updateRevisionShareUrl(ref);
            return;
        }

        try {
            this.setRevisionStatus('Loading revision from URL…');
            let entry = (this.revisionHistoryEntries || []).find(item => (item.sha || item.ref) === ref);
            if (!entry) {
                entry = await this.fetchRevisionEntry(ref);
            }
            if (!entry) {
                this.setRevisionStatus('Requested revision could not be found.', true);
                this.updateRevisionShareUrl(null);
                return;
            }
            if (!this.revisionBranch) {
                const repoConfig = await this.loadRepoConfig();
                this.revisionBranch = repoConfig?.page_branch || repoConfig?.branch || null;
            }
            await this.applyRevisionFromEntry(entry);
        } catch (error) {
            console.error('Failed to load revision from URL', error);
            this.setRevisionStatus('Unable to load revision from URL.', true);
        }
    }

    renderRevisionHistorySummary() {
        if (!this.revisionHistorySummary) return;
        const meta = this.revisionMetadata.get(this.revisionActiveRef) || this.revisionMetadata.get('local');
        const refLabel = this.revisionActiveRef && this.revisionActiveRef !== 'local'
            ? `#${this.shortenSha(this.revisionActiveRef)}`
            : 'Local';
        const label = this.revisionActiveLabel || 'Current view';
        const rangeLabel = meta?.rangeLabel || 'Range unknown';
        const branchLabel = this.revisionBranch ? `Branch ${this.revisionBranch}` : 'Branch not detected';
        this.revisionHistorySummary.textContent = `${label} (${refLabel}) • ${rangeLabel} • ${branchLabel}`;
        this.updateRevisionLagBadge();
    }

    formatRevisionDate(value) {
        if (!value) return '';
        const ts = typeof value === 'number' ? value : Date.parse(value);
        if (!Number.isFinite(ts)) return '';
        const diffMs = Date.now() - ts;
        const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
        if (diffMinutes < 1) return 'just now';
        if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes === 1 ? '' : 's'} ago`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        const date = new Date(ts);
        try {
            return date.toLocaleDateString();
        } catch {
            return date.toUTCString();
        }
    }

    renderRevisionListItem(entry) {
        const ref = entry.ref || entry.sha || entry.id || 'local';
        const isLocal = entry.type === 'local' || ref === 'local';
        const isActive = this.revisionActiveRef === ref || (isLocal && this.revisionActiveRef === 'local');
        const meta = this.revisionMetadata.get(ref) || entry.rangeMeta;
        const rangeLabel = meta?.rangeLabel || 'Range unknown';
        const metaHasTable = meta && Object.prototype.hasOwnProperty.call(meta, 'hasTable') ? meta.hasTable !== false : null;
        const hasTable = entry.hasTable !== false && metaHasTable !== false;
        const badge = isLocal
            ? '<span class="revision-item__pill">Local</span>'
            : `<span class="revision-item__pill">${escapeHTML(entry.shortSha || this.shortenSha(ref) || 'rev')}</span>`;
        const subtitleParts = [];
        if (!isLocal) {
            const shortSha = entry.shortSha || this.shortenSha(ref);
            if (shortSha) subtitleParts.push(`#${shortSha}`);
        }
        if (entry.author) subtitleParts.push(entry.author);
        const when = this.formatRevisionDate(entry.date || entry.savedAt);
        if (when) subtitleParts.push(when);
        const subtitle = subtitleParts.join(' · ');
        const primaryLabel = entry.message || entry.label || (isLocal ? 'Current view' : 'Revision');
        const actionLabel = isLocal ? 'Restore' : (isActive ? 'Loaded' : 'Load');
        const disableAction = (isActive && !isLocal) || !hasTable;
        const actionsHtml = hasTable
            ? `<button class="btn btn--sm toolbar-btn revision-item__load" data-revision-load data-revision-ref="${escapeAttribute(ref)}" data-revision-type="${isLocal ? 'local' : 'commit'}" ${disableAction ? 'disabled' : ''}>${actionLabel}</button>`
            : '<div class="revision-item__no-table" title="This commit does not contain a saved table.">No table to load</div>';
        const titleMarkup = entry.hasMoreMessage && entry.fullMessage
            ? `<details class="revision-item__details revision-item__details--inline">
                    <summary class="revision-item__details-summary">
                        <span class="revision-item__title">${escapeHTML(primaryLabel)}</span>
                        <span class="revision-item__details-caret" aria-hidden="true">▾</span>
                    </summary>
                    <pre>${escapeHTML(entry.fullMessage)}</pre>
               </details>`
            : `<div class="revision-item__title">${escapeHTML(primaryLabel)}</div>`;

        return `
            <article class="revision-item${isActive ? ' revision-item--active' : ''}" data-revision-ref="${escapeAttribute(ref)}" data-revision-type="${isLocal ? 'local' : 'commit'}">
                <div class="revision-item__header">
                    ${titleMarkup}
                    ${badge}
                </div>
                <div class="revision-item__meta">${escapeHTML(subtitle)}</div>
                <div class="revision-item__range">${escapeHTML(rangeLabel)}</div>
                <div class="revision-item__actions">
                    ${actionsHtml}
                </div>
            </article>
        `;
    }

    renderRevisionHistoryList() {
        if (!this.revisionHistoryList) return;
        if (this.revisionHistoryLoading) {
            this.revisionHistoryList.innerHTML = '<div class="revision-drawer__hint">Loading revisions…</div>';
            return;
        }

        const items = [];
        if (this.revisionWorkingSnapshot?.snapshot) {
            items.push({
                type: 'local',
                ref: 'local',
                shortSha: 'local',
                message: this.revisionWorkingSnapshot.label || 'Current view',
                author: 'You',
                date: this.revisionWorkingSnapshot.savedAt,
                rangeMeta: this.revisionMetadata.get('local')
            });
        }
        (this.revisionHistoryEntries || []).forEach(entry => items.push(entry));

        if (!items.length) {
            const targetFile = escapeHTML(this.getTargetFileLabel());
            this.revisionHistoryList.innerHTML = `<div class="revision-drawer__empty">No revisions found for ${targetFile}.</div>`;
            return;
        }

        this.revisionHistoryList.innerHTML = items.map(entry => this.renderRevisionListItem(entry)).join('');
        this.updateRevisionLagBadge();
    }

    hideRevisionDrawer() {
        if (!this.revisionHistoryDrawer) return;
        this.revisionHistoryDrawer.classList.add('hidden');
    }

    async toggleRevisionDrawer(forceOpen = false) {
        if (!this.revisionHistoryDrawer) return;
        const isHidden = this.revisionHistoryDrawer.classList.contains('hidden');
        if (!isHidden && !forceOpen) {
            this.hideRevisionDrawer();
            return;
        }
        this.revisionHistoryDrawer.classList.remove('hidden');
        this.renderRevisionHistorySummary();
        await this.refreshRevisionHistory({ force: true });
    }

    handleRevisionDrawerClick(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        if (target.closest('[data-revision-close]')) {
            this.hideRevisionDrawer();
            return;
        }

        const loadBtn = target.closest('[data-revision-load]');
        if (loadBtn) {
            const ref = loadBtn.dataset.revisionRef || loadBtn.closest('[data-revision-ref]')?.dataset.revisionRef || '';
            const type = loadBtn.dataset.revisionType || loadBtn.closest('[data-revision-ref]')?.dataset.revisionType || 'commit';
            this.handleRevisionSelection(ref, type);
        }
    }

    async refreshRevisionHistory({ force = false } = {}) {
        if (this.revisionHistoryLoading && !force) return;
        if (!this.revisionHistoryDrawer) return;
        this.revisionHistoryLoading = true;
        this.setRevisionStatus('Loading revisions…');
        this.renderRevisionHistoryList();
        try {
            this.ensureWorkingCopySnapshot();
        const repoConfig = await this.loadRepoConfig();
        const repo = await this.resolveCodebergRepo();
        if (!repo || !repoConfig) {
            throw new Error('Repository could not be detected from this page.');
        }
            const branch = repoConfig.page_branch || repoConfig.branch || 'pages';
            this.revisionBranch = branch;
            if (this.revisionHistorySubtitle) {
                this.revisionHistorySubtitle.textContent = `${repo.owner}/${repo.repo} · ${branch}`;
            }
            const commits = await this.fetchRevisionCommits(repo, branch, 30);
            const activeRef = this.revisionActiveRef;
            let entries = commits;
            const hasActive = activeRef && activeRef !== 'local'
                ? commits.some(entry => (entry.sha || entry.ref) === activeRef)
                : true;
            if (!hasActive && activeRef) {
                try {
                    const activeEntry = await this.fetchRevisionEntry(activeRef);
                    if (activeEntry) {
                        entries = [...commits, activeEntry].sort((a, b) => {
                            const aTs = Date.parse(a?.date || '') || 0;
                            const bTs = Date.parse(b?.date || '') || 0;
                            return bTs - aTs;
                        });
                    }
                } catch (error) {
                    console.warn('Unable to merge active revision into history list', error);
                }
            }
            this.revisionHistoryEntries = entries;
            this.renderRevisionHistoryList();
            this.renderRevisionHistorySummary();
            this.prefetchRevisionRanges(entries).catch(error => {
                console.warn('Revision range prefetch failed', error);
            });
            this.updateRevisionLagBadge();
            if (!entries.length) {
                this.setRevisionStatus(`No revisions found for ${this.getTargetFileLabel()} on this branch.`);
            } else {
                this.setRevisionStatus('');
            }
        } catch (error) {
            console.error('Failed to refresh revision history', error);
            this.setRevisionStatus(error.message || 'Unable to load revisions.', true);
        } finally {
            this.revisionHistoryLoading = false;
            this.renderRevisionHistoryList();
        }
    }

    async fetchRevisionCommits(repo, branch, limit = 30) {
        const attempt = async (params) => {
            const qs = new URLSearchParams(params);
            const path = `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/commits?${qs.toString()}`;
            const data = await this.callCodebergApi(path, null);
            if (!Array.isArray(data)) return [];
            return data.map(entry => this.normalizeCommitEntry(entry)).filter(Boolean);
        };

        const baseParams = { sha: branch, limit: `${limit}` };
        const targetFile = this.getCurrentPageFilename();
        try {
            return await attempt({ ...baseParams, path: targetFile });
        } catch (error) {
            console.warn('Path-filtered commit fetch failed, retrying without path', error);
            return attempt(baseParams);
        }
    }

    async fetchRevisionEntry(ref) {
        if (!ref) return null;
        const repo = await this.resolveCodebergRepo();
        if (!repo) return null;
        const endpoints = [
            `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/commits/${encodeURIComponent(ref)}`,
            `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/git/commits/${encodeURIComponent(ref)}`
        ];

        for (const path of endpoints) {
            try {
                const data = await this.callCodebergApi(path, null);
                const normalized = this.normalizeCommitEntry(data);
                if (normalized) return normalized;
            } catch (error) {
                console.warn(`Commit lookup failed for ${ref}`, error);
            }
        }

        return null;
    }

    async prefetchRevisionRanges(entries = [], { batchSize = 4 } = {}) {
        const refs = Array.from(new Set(entries.map(entry => entry?.ref || entry?.sha).filter(Boolean)));
        const needsRange = refs.filter(ref => {
            const cached = this.revisionRangeCache.get(ref);
            const cachedMeta = cached && typeof cached.then !== 'function' ? cached.meta : null;
            const existingMeta = this.revisionMetadata.get(ref) || cachedMeta;
            return !(existingMeta && existingMeta.rangeLabel && existingMeta.rangeLabel !== 'Range unknown');
        });
        if (!needsRange.length) return;

        const queue = [...needsRange];
        const results = [];
        const workerCount = Math.min(batchSize, queue.length) || 1;
        const worker = async () => {
            while (queue.length) {
                const ref = queue.shift();
                const result = await this.fetchRevisionRange(ref);
                const meta = result?.meta || null;
                const hasTable = result?.hasTable;
                results.push({ ref, meta, hasTable });
                if (meta) {
                    this.revisionMetadata.set(ref, meta);
                }
            }
        };

        await Promise.all(Array.from({ length: workerCount }, () => worker()));

        if (!results.length) return;
        let updated = false;
        results.forEach(({ ref, meta, hasTable }) => {
            const entry = (this.revisionHistoryEntries || []).find(item => (item.sha || item.ref) === ref);
            if (entry) {
                if (meta) {
                    entry.rangeMeta = meta;
                } else if (hasTable === false) {
                    entry.rangeMeta = {
                        maxRow: null,
                        maxCol: null,
                        rows: null,
                        cols: null,
                        rangeLabel: 'No table found',
                        capturedAt: Date.now()
                    };
                }
                if (hasTable === false) {
                    entry.hasTable = false;
                }
                if (meta || hasTable === false) {
                    updated = true;
                }
            }
        });

        if (updated) {
            this.renderRevisionHistoryList();
            this.renderRevisionHistorySummary();
        }
    }

    async updateRevisionLagBadge() {
        const badge = this.revisionLagBadge;
        if (!badge) return;
        badge.classList.add('hidden');
        badge.textContent = '';

        try {
            const branchInfo = await this.ensureBranchCommits();
            const headSha = branchInfo?.latest?.page?.sha || branchInfo?.loaded?.page?.sha || null;
            if (!headSha) return;
            const commits = this.revisionHistoryEntries || [];
            if (!Array.isArray(commits) || !commits.length) return;

            const headIndex = commits.findIndex(entry => (entry.sha || entry.ref) === headSha);
            if (headIndex < 0) return;

            const activeRef = this.revisionActiveRef;
            if (!activeRef) return;
            const activeIndex = commits.findIndex(entry => (entry.sha || entry.ref) === activeRef);
            if (activeIndex < 0) {
                badge.classList.add('hidden');
                return;
            }

            const behind = Math.max(0, activeIndex - headIndex);
            this.revisionLagCount = behind;
            if (behind > 0) {
                badge.textContent = `${behind}`;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        } catch (error) {
            console.warn('Unable to update revision lag badge', error);
        }
    }

    normalizeCommitEntry(entry) {
        if (!entry) return null;
        const sha = entry.sha || entry.id || entry.commit?.id || entry.commit?.sha || null;
        if (!sha) return null;
        const commit = entry.commit || entry;
        const fullMessage = (commit?.message || '').toString();
        const [firstLine, ...restLines] = fullMessage.split('\n');
        const message = (firstLine || '').trim() || '(no message)';
        const hasMoreMessage = restLines.some(line => line.trim().length);
        const author = commit?.author?.name || commit?.committer?.name || entry.author?.login || entry.author?.username || '';
        const date = commit?.author?.date || commit?.committer?.date || entry.created || entry.timestamp || null;
        return {
            type: 'commit',
            sha,
            ref: sha,
            shortSha: this.shortenSha(sha),
            message,
            fullMessage,
            hasMoreMessage,
            author: author || 'Unknown',
            date
        };
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



    normalizeWhitespaceValue(value) {
        if (value === null || value === undefined) return '';
        const text = `${value}`;
        const collapsed = text.replace(/\u00a0/g, ' ').trim();
        return collapsed.length ? text : '';
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

    buildPullRequestBody(diffText, diffTruncated, changedFiles = []) {
        const files = Array.isArray(changedFiles) && changedFiles.length
            ? changedFiles
            : [this.getTargetFileLabel()];
        const targetLabel = files.length === 1
            ? `\`${files[0]}\``
            : files.map(file => `\`${file}\``).join(', ');
        const parts = [
            `This pull request updates ${files.length === 1 ? 'sheet' : 'sheets'} ${targetLabel} generated from Spreadsheet Pro.`,
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

        const replaceLabel = files.length === 1
            ? `the existing \`${files[0]}\``
            : `the existing files (${targetLabel})`;

        parts.push(
            '',
            `The updated HTML file${files.length === 1 ? '' : 's'} ${files.length === 1 ? 'is' : 'are'} attached to this PR by the submitter. Please replace ${replaceLabel} with the provided content.`
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

        const files = Array.isArray(artifacts.files) && artifacts.files.length
            ? artifacts.files
            : [{
                filename: this.getCurrentPageFilename(),
                sheetId: this.sheetId || this.getSheetIdFromFilename(this.getCurrentPageFilename()) || 'index',
                fullHTML: artifacts.fullHTML
            }];

        const branchLabel = files.length === 1
            ? (this.getSheetIdFromFilename(files[0].filename) || 'sheet')
            : 'multi';
        const branchName = `update-${branchLabel}-${new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)}`;

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

        const changeFiles = [];
        for (const file of files) {
            const pathEncoded = encodeURIComponent(file.filename);
            let sha = null;
            try {
                const info = await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents/${pathEncoded}?ref=${encodeURIComponent(branchName)}`, token);
                sha = info?.sha || null;
            } catch (error) {
                try {
                    const info = await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents/${pathEncoded}?ref=${encodeURIComponent(baseBranch)}`, token);
                    sha = info?.sha || null;
                } catch (innerError) {
                    // Treat as new file
                }
            }
            const operation = sha ? 'update' : 'create';
            const content = this.encodeContentToBase64(file.fullHTML || artifacts.fullHTML);
            changeFiles.push({
                operation,
                path: file.filename,
                content,
                sha: sha || undefined
            });
        }

        if (!changeFiles.length) {
            throw new Error('No files to update.');
        }

        await this.callCodebergApi(`/repos/${targetOwner}/${targetRepo}/contents`, token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: `${files.length === 1 ? 'Update sheet' : 'Update sheets'} (${new Date().toISOString()})`,
                branch: branchName,
                files: changeFiles
            })
        });

        const prTitle = files.length === 1
            ? `Update ${files[0].filename} (${new Date().toISOString().split('T')[0]})`
            : `Update ${files.length} sheets (${new Date().toISOString().split('T')[0]})`;
        const prBody = this.buildPullRequestBody(artifacts.diffText, artifacts.diffTruncated, files.map(file => file.filename));

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

    getDefaultTableTitle() {
        return 'Untitled table';
    }

    normalizeTableTitle(title) {
        const trimmed = (title ?? '').toString().replace(/\s+/g, ' ').trim();
        if (!trimmed) return this.getDefaultTableTitle();
        return trimmed.slice(0, 200);
    }

    setTableTitle(title, { skipDirtyUpdate = false } = {}) {
        const normalized = this.normalizeTableTitle(title);
        if (normalized === this.tableTitle) {
            this.syncTableTitleInput();
            this.syncTableTitleBadge();
            this.updateDocumentTitleFromTable();
            return;
        }
        this.tableTitle = normalized;
        this.syncTableTitleInput();
        this.syncTableTitleBadge();
        this.updateDocumentTitleFromTable();
        if (!skipDirtyUpdate) {
            this.userMadeChanges = true;
            this.hasAutoPersistedBaseline = false;
            this.scheduleDirtyStateUpdate();
        }
    }

    syncTableTitleBadge() {
        if (this.gridContainer) {
            this.gridContainer.setAttribute('data-table-title', this.tableTitle || '');
        }
        if (this.tableTitleBadge) {
            this.tableTitleBadge.setAttribute('data-table-title', this.tableTitle || '');
            this.tableTitleBadge.textContent = this.tableTitle || '';
            this.tableTitleBadge.setAttribute('aria-label', `Table title: ${this.tableTitle || ''}`);
        }
    }

    syncTableTitleInput() {
        if (!this.tableTitleInput) return;
        if (document.activeElement === this.tableTitleInput) return;
        this.tableTitleInput.value = this.tableTitle || '';
    }

    syncTargetFileLabel() {
        if (!this.saveModalTargetFile) return;
        this.saveModalTargetFile.textContent = this.getTargetFileLabel();
    }

    updateDocumentTitleFromTable() {
        if (typeof document === 'undefined') return;
        const base = 'Spreadsheet Pro';
        const normalized = this.normalizeTableTitle(this.tableTitle);
        document.title = normalized ? `${normalized} · ${base}` : base;
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

        if (!document.getElementById('revisionHistoryDrawer')) {
            document.body.insertAdjacentHTML('beforeend', REVISION_HISTORY_HTML);
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

        if (!gridContainer.querySelector('#tableTitleBadge')) {
            const badge = document.createElement('div');
            badge.id = 'tableTitleBadge';
            badge.className = 'table-title-badge';
            badge.setAttribute('data-table-title', this.tableTitle || '');
            badge.textContent = this.tableTitle || '';
            gridContainer.appendChild(badge);
        }
    }

    loadInitialDataFromDOM() {
        if (!this.gridContent) return;
        const container = (typeof this.gridContent.closest === 'function'
            ? this.gridContent.closest('.grid-container')
            : null) || this.gridContainer || this.container?.querySelector('.grid-container');
        if (container) {
            const badge = container.querySelector('[data-table-title]');
            const datasetTitle = container.getAttribute('data-table-title');
            const badgeDatasetTitle = badge?.getAttribute('data-table-title');
            const badgeText = badge?.textContent;
            const detectedTitle = datasetTitle || badgeDatasetTitle || badgeText;
            if (detectedTitle) {
                this.tableTitle = this.normalizeTableTitle(detectedTitle);
            }
            container.setAttribute('data-table-title', this.tableTitle || '');
        }

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
                    const normalized = this.normalizeWhitespaceValue(raw);
                    if (normalized) {
                        data.value = raw;
                    }
                } else {
                    const normalized = this.normalizeWhitespaceValue(value);
                    if (normalized) {
                        data.value = value;
                    }
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
        this.syncTableTitleBadge();
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
        // Preserve the persisted sequence counter so loading/exporting an unchanged sheet
        // does not introduce diff-only bumps; nextStyleSequence will advance when needed.
        this.styleSequence = Math.max(maxSeq, this.styleSequence || 1);
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
            ['#revisionHistoryBtn', 'click', () => this.toggleRevisionDrawer(true)],
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
            ['#revisionHistoryRefreshBtn', 'click', () => this.refreshRevisionHistory({ force: true })],
            [this.revisionHistoryDrawer, 'click', e => this.handleRevisionDrawerClick(e)],
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
    


    getFunctionSuggestions(fragment = '') {
        const upper = fragment.toUpperCase();
        let matches = this.formulaFunctions.filter(fn => fn.name.startsWith(upper));
        if (!matches.length && upper) {
            matches = this.formulaFunctions.filter(fn => fn.name.includes(upper));
        }
        return matches;
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
    
    

    downloadHTML(fullHTML) {
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.getCurrentPageFilename();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.log(`Downloaded ${this.getCurrentPageFilename()} locally`);
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


    
    generateStaticTableHTML(range) {
        const { minRow, maxRow, minCol, maxCol } = range;
        const rows = [];
        const commentEntries = [];
        const colWidths = [];

        for (let col = minCol; col <= maxCol; col++) {
            colWidths.push(this.getColumnWidth(col));
        }

        const totalWidth = 50 + colWidths.reduce((sum, w) => sum + w, 0);
        rows.push(`                    <table data-spreadsheet-export="true" class="spreadsheet-fallback" border="1" cellspacing="0" cellpadding="6" rules="all" style="width:${totalWidth}px;min-width:${totalWidth}px">`);
        rows.push('                        <colgroup>');
        rows.push('                            <col style="width:50px;min-width:50px;max-width:50px">');
        colWidths.forEach(width => {
            rows.push(`                            <col style="width:${width}px;min-width:${width}px;max-width:${width}px">`);
        });
        rows.push('                        </colgroup>');
        rows.push('                        <thead>');
        rows.push('                            <tr style="height:32px">');
        rows.push('                                <th scope="col">🗻</th>');
        colWidths.forEach((colWidth, index) => {
            const col = minCol + index;
            rows.push(`                                <th scope="col" data-col="${col}" data-width="${colWidth}">${this.getColumnName(col)}</th>`);
        });
        rows.push('                            </tr>');
        rows.push('                        </thead>');
        rows.push('                        <tbody>');

        for (let row = minRow; row <= maxRow; row++) {
            const rowHeight = this.getRowHeight(row);
            const rowHeightMode = this.getRowHeightMode(this.rowHeightModes, row, null);
            const rowHeightModeAttr = rowHeightMode ? ` data-height-mode="${rowHeightMode}"` : '';
            const rowStyleAttr = Number.isFinite(rowHeight) && rowHeight > 0 ? ` style="height:${rowHeight}px"` : '';
            rows.push(`                            <tr data-row="${row}" data-height="${rowHeight}"${rowHeightModeAttr}${rowStyleAttr}>`);
            rows.push(`                                <th scope="row">${row + 1}</th>`);
            for (let col = minCol; col <= maxCol; col++) {
                const coordKey = `${row},${col}`;
                if (this.cellToMergeParent.has(coordKey)) continue;
                const cellData = this.cellData.get(coordKey) || {};
                const effectiveStyle = this.getEffectiveStyle(row, col, cellData);
                const datasets = [`data-col="${col}"`];
                const styles = [];
                const extraAttributes = [];

                let rawValue = cellData.value ?? '';
                const normalizedRawValue = this.normalizeWhitespaceValue(rawValue);
                if (!normalizedRawValue) {
                    rawValue = '';
                }
                const commentInfo = this.ensureCommentIds(coordKey, this.normalizeCommentData(cellData.comment));
                let commentFlagMarkup = '';
                const hasRawValue = (Object.prototype.hasOwnProperty.call(cellData, 'value') && Boolean(normalizedRawValue)) || Boolean(commentInfo?.text);
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
                const tooltipText = (displayText || rawValue || '').toString().replace(/\s+/g, ' ').trim();
                if (tooltipText) {
                    extraAttributes.push(`title="${escapeAttribute(tooltipText)}"`);
                }
                const hasVisibleContent = Boolean(tooltipText || cellData.linkUrl || commentInfo?.text || (canUseRich && richHtml));
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
                    commentFlagMarkup = [
                        `<span class="comment-flag-wrapper">`,
                        `<button id="${anchorId}" type="button" class="comment-flag" popovertarget="${popoverId}" popovertargetaction="toggle" aria-label="View comment" title="${escapeAttribute(summaryParts)}">💬</button>`,
                        `<div id="${popoverId}" class="comment-popover comment-popover--static" popover="auto" anchor="${anchorId}" hidden>${popoverContent}</div>`,
                        `</span>`
                    ].join('');
                }

                if (!hasVisibleContent) {
                    extraAttributes.push('data-empty="true"');
                }

                cellContent = cellContent || '&nbsp;';
                const fallbackContent = `<span class="fallback-cell-content">${cellContent}</span>`;
                const styleAttr = styles.filter(Boolean).length ? ` style="${styles.join(';')}"` : '';
                const extras = extraAttributes.length ? ` ${extraAttributes.join(' ')}` : '';
                rows.push(`                                <td ${datasets.join(' ')}${extras}${styleAttr}>${fallbackContent}${commentFlagMarkup}</td>`);
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

    getCurrentPageFilename() {
        if (this.pageFileName) return this.pageFileName;
        if (typeof window === 'undefined') return 'index.html';
        try {
            const params = new URLSearchParams(window.location.search || '');
            const sheetParam = this.sanitizeSheetId(params.get('sheet'));
            if (sheetParam) {
                return this.sanitizeFileName(`${sheetParam}.html`);
            }

            const path = window.location.pathname || '';
            const last = path.split('/').filter(Boolean).pop();
            if (last) {
                const safe = this.sanitizeFileName(last);
                if (safe) return safe;
            }
        } catch (error) {
            // Fall back to default
        }
        return 'index.html';
    }

    sanitizeFileName(name) {
        if (!name) return '';
        const base = `${name}`.split('/').pop().trim();
        if (!base) return '';
        const normalized = base.replace(/[^A-Za-z0-9._-]/g, '');
        if (!normalized) return '';
        return /\.html?$/i.test(normalized) ? normalized : `${normalized}.html`;
    }

    sanitizeSheetId(id) {
        if (!id) return '';
        const normalized = `${id}`.trim().replace(/[^A-Za-z0-9_-]/g, '');
        return normalized;
    }

    buildLocalDraftKey() {
        const base = 'verbosecell-draft-v1';
        const suffix = this.sheetId || this.getSheetIdFromFilename(this.getCurrentPageFilename()) || 'index';
        return `${base}-${suffix}`;
    }

    getSheetStateStorageKey(sheetId = null) {
        const id = sheetId || this.sheetId || this.getSheetIdFromFilename(this.getCurrentPageFilename()) || 'index';
        return `${SHEET_STATE_STORAGE_PREFIX}${id}`;
    }

    loadStoredSheetStates({ excludeCurrent = false, requireChanges = false } = {}) {
        if (typeof window === 'undefined' || !window.localStorage) return [];
        const currentKey = excludeCurrent ? this.getSheetStateStorageKey() : null;
        const payloads = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (!key || !key.startsWith(SHEET_STATE_STORAGE_PREFIX)) continue;
            if (currentKey && key === currentKey) continue;
            try {
                const raw = window.localStorage.getItem(key);
                if (!raw) continue;
                const parsed = JSON.parse(raw);
                if (!parsed || parsed.version !== 1) continue;
                if (requireChanges && !(parsed.diffTotal > 0 || (Array.isArray(parsed.diffEntries) && parsed.diffEntries.length))) {
                    continue;
                }
                payloads.push(parsed);
            } catch (error) {
                console.warn('Failed to parse stored sheet state', error);
            }
        }
        return payloads;
    }

    persistSheetStateSnapshot({ diffEntries = null, diffTotal = null, diffTruncated = null, diffText = null, diffTextTruncated = null, fullHTML = null } = {}) {
        if (typeof window === 'undefined' || !window.localStorage) return;
        const sheetId = this.sheetId || this.getSheetIdFromFilename(this.getCurrentPageFilename()) || 'index';
        const payload = {
            version: 1,
            sheetId,
            filename: this.getCurrentPageFilename(),
            savedAt: Date.now(),
            diffEntries: this.cloneDiffEntries(diffEntries ?? this.latestDiffEntries),
            diffTotal: Number.isFinite(diffTotal) ? diffTotal : (this.latestDiffTotal ?? (this.latestDiffEntries?.length || 0)),
            diffTruncated: diffTruncated ?? this.latestDiffTruncated ?? false,
            diffText: diffText || null,
            diffTextTruncated: diffTextTruncated ?? diffTruncated ?? false,
            fullHTML: fullHTML || null
        };
        try {
            window.localStorage.setItem(this.getSheetStateStorageKey(sheetId), JSON.stringify(payload));
        } catch (error) {
            console.warn('Unable to persist sheet state', error);
        }
    }

    clearPersistedSheetState(sheetId = null) {
        if (typeof window === 'undefined' || !window.localStorage) return;
        try {
            window.localStorage.removeItem(this.getSheetStateStorageKey(sheetId));
        } catch (error) {
            console.warn('Unable to clear persisted sheet state', error);
        }
    }

    getSheetIdFromFilename(filename) {
        if (!filename) return '';
        const match = `${filename}`.match(/^(.+)\.html?$/i);
        const stem = match ? match[1] : filename;
        return this.sanitizeSheetId(stem);
    }

    parseSheetList(raw) {
        if (!raw) return [];
        return `${raw}`
            .split(/[,\s]+/)
            .map(part => this.sanitizeSheetId(part))
            .filter(Boolean);
    }

    getSheetListAttributeFromDOM() {
        if (!this.container) return '';
        const attr = this.container.getAttribute('data-sheet-list') || '';
        const ids = this.parseSheetList(attr);
        if (ids.length) return ids.join(',');
        const fallback = this.sheetId || this.getSheetIdFromFilename(this.getCurrentPageFilename());
        return fallback ? `${fallback}` : '';
    }

    getTargetFileLabel() {
        return this.getCurrentPageFilename() || 'index.html';
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
