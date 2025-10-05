class SpreadsheetApp {
    constructor() {
        // Configuration from application data
        this.config = {
            initialRows: 100,
            initialCols: 50,
            maxRows: 10000,
            maxCols: 1000,
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

        // Resize state
        this.isResizing = false;
        this.resizeType = null; // 'row' or 'column'
        this.resizeIndex = null;
        this.resizeStartPos = null;
        this.resizeStartSize = null;
        this.justResized = false;
        this.resizeAnimationFrame = null;
        this.lastHeightUpdate = null; // Add this
        this.lastWidthUpdate = null;  // Add this

        // Undo/Redo system
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;

        // Grid data
        this.cellData = new Map();
        this.rowHeights = new Map(); // Store custom row heights
        this.columnWidths = new Map(); // Store custom column widths
        this.visibleRows = { start: 0, end: 30 };
        this.visibleCols = { start: 0, end: 20 };

        // DOM elements
        this.mainGrid = document.getElementById('mainGrid');
        this.gridContent = document.getElementById('gridContent');
        this.columnHeaders = document.getElementById('columnHeaderContent');
        this.rowHeaders = document.getElementById('rowHeaderContent');
        this.cellReference = document.getElementById('cellReference');
        this.formulaInput = document.getElementById('formulaInput');
        this.contextMenu = document.getElementById('contextMenu');
        this.colorPalette = document.getElementById('colorPalette');
        this.fontColorPalette = document.getElementById('fontColorPalette');
        
        this.clipboard = {
            data: null,
            mode: null, // 'copy' or 'cut'
            sourceCells: null // Store original cell coordinates for cut
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateHeaders();
        this.generateInitialGrid();
        this.setupColorPalette();
        this.setupFontColorPalette();
        this.updateUndoRedoButtons();
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

    // Undo/Redo Methods
    saveState(action) {
        // Create a snapshot of current cell data
        const state = {
            action: action,
            cellData: new Map(this.cellData),
            timestamp: Date.now()
        };

        this.undoStack.push(state);
        
        // Limit undo stack size
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }

        // Clear redo stack when new action is performed
        this.redoStack = [];
        
        this.updateUndoRedoButtons();
        this.log(`Saved state: ${action}`);
    }

    undo() {
        if (this.undoStack.length === 0) {
            this.log('Nothing to undo');
            return;
        }

        // Save current state to redo stack
        const currentState = {
            action: 'current',
            cellData: new Map(this.cellData),
            timestamp: Date.now()
        };
        this.redoStack.push(currentState);

        // Get previous state
        const previousState = this.undoStack.pop();
        
        // Restore previous state
        this.cellData = new Map(previousState.cellData);
        
        this.refreshAllVisibleCells();
        this.updateUndoRedoButtons();
        this.log(`Undone: ${previousState.action}`);
    }

    redo() {
        if (this.redoStack.length === 0) {
            this.log('Nothing to redo');
            return;
        }

        // Save current state to undo stack
        const currentState = {
            action: 'redo-previous',
            cellData: new Map(this.cellData),
            timestamp: Date.now()
        };
        this.undoStack.push(currentState);

        // Get next state
        const nextState = this.redoStack.pop();
        
        // Restore next state
        this.cellData = new Map(nextState.cellData);
        
        this.refreshAllVisibleCells();
        this.updateUndoRedoButtons();
        this.log('Redone action');
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        
        if (undoBtn) {
            undoBtn.disabled = this.undoStack.length === 0;
            undoBtn.style.opacity = this.undoStack.length === 0 ? '0.5' : '1';
        }
        
        if (redoBtn) {
            redoBtn.disabled = this.redoStack.length === 0;
            redoBtn.style.opacity = this.redoStack.length === 0 ? '0.5' : '1';
        }
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
        this.columnHeaders.innerHTML = '';
        this.rowHeaders.innerHTML = '';
        
        // Generate column headers
        for (let col = 0; col < this.config.maxCols; col++) {
            const header = document.createElement('div');
            header.className = 'column-header';
            header.textContent = this.getColumnName(col);
            header.dataset.col = col;
            
            // Add resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'column-resize-handle';
            resizeHandle.dataset.col = col;
            header.appendChild(resizeHandle);
            
            this.columnHeaders.appendChild(header);
        }

        // Generate row headers
        for (let row = 0; row < this.config.maxRows; row++) {
            const header = document.createElement('div');
            header.className = 'row-header';
            header.textContent = (row + 1).toString();
            header.dataset.row = row;
            
            // Add resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'row-resize-handle';
            resizeHandle.dataset.row = row;
            header.appendChild(resizeHandle);
            
            this.rowHeaders.appendChild(header);
        }

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
        const viewportCols = Math.ceil(this.mainGrid.clientWidth / this.config.cellWidth) + 10;
        const viewportRows = Math.ceil(this.mainGrid.clientHeight / this.config.cellHeight) + 10;
        
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
    
    getRowHeight(row) { return this.rowHeights.get(row) || this.config.cellHeight; }
    getColumnWidth(col) { return this.columnWidths.get(col) || this.config.cellWidth; }

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
        // Main grid events
        this.mainGrid.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.mainGrid.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.mainGrid.addEventListener('dblclick', this.handleDoubleClick.bind(this));
        this.mainGrid.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Document-level events for resize and mouse release
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('mousemove', this.handleDocumentMouseMove.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));

        // Header click events for row/column selection
        this.columnHeaders.addEventListener('click', (e) => this.handleHeaderClick(e, 'column'));
        this.rowHeaders.addEventListener('click', (e) => this.handleHeaderClick(e, 'row'));
        
        // Resize handle events
        this.columnHeaders.addEventListener('mousedown', this.handleResizeMouseDown.bind(this));
        this.rowHeaders.addEventListener('mousedown', this.handleResizeMouseDown.bind(this));
        
        // Corner cell click for select all
        const cornerCell = document.querySelector('.corner-cell');
        if (cornerCell) {
            cornerCell.addEventListener('click', this.handleCornerCellClick.bind(this));
        }

        // Toolbar events
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('boldBtn').addEventListener('click', () => this.toggleFormat('bold'));
        document.getElementById('italicBtn').addEventListener('click', () => this.toggleFormat('italic'));
        document.getElementById('underlineBtn').addEventListener('click', () => this.toggleFormat('underline'));
        document.getElementById('strikethroughBtn').addEventListener('click', () => this.toggleFormat('strikethrough'));
        document.getElementById('alignLeftBtn').addEventListener('click', () => this.setTextAlign('left'));
        document.getElementById('alignCenterBtn').addEventListener('click', () => this.setTextAlign('center'));
        document.getElementById('alignRightBtn').addEventListener('click', () => this.setTextAlign('right'));
        document.getElementById('alignTopBtn').addEventListener('click', () => this.setVerticalAlign('top'));
        document.getElementById('alignMiddleBtn').addEventListener('click', () => this.setVerticalAlign('middle'));
        document.getElementById('alignBottomBtn').addEventListener('click', () => this.setVerticalAlign('bottom'));
        
        // Font size input events
        const fontSizeInput = document.getElementById('fontSizeInput');
        fontSizeInput.addEventListener('change', this.handleFontSizeChange.bind(this));
        fontSizeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleFontSizeChange(e);
                fontSizeInput.blur();
            }
        });
        
        document.getElementById('colorBtn').addEventListener('click', this.showColorPalette.bind(this));
        document.getElementById('fontColorBtn').addEventListener('click', this.showFontColorPalette.bind(this));

        // Formula bar events
        this.formulaInput.addEventListener('keydown', this.handleFormulaKeyDown.bind(this));
        this.formulaInput.addEventListener('focus', this.handleFormulaFocus.bind(this));
        this.formulaInput.addEventListener('input', this.handleFormulaInput.bind(this));

        // Context menu events
        this.contextMenu.addEventListener('click', this.handleContextMenuClick.bind(this));

        // Context menu color picker - instant color application
        const contextColorPicker = document.getElementById('contextColorPicker');
        if (contextColorPicker) {
            contextColorPicker.addEventListener('input', (e) => {
                this.applyBackgroundColor(e.target.value);
            });
        }

        // Cell reference input
        this.cellReference.addEventListener('keydown', this.handleCellReferenceKeyDown.bind(this));

        // Prevent text selection while dragging
        this.mainGrid.addEventListener('selectstart', (e) => {
            if ((this.isDragging || this.isResizing) && !e.target.classList.contains('cell-editor')) {
                e.preventDefault();
            }
        });
    }
    
    applyFormatting(type, value) {
        if (!this.selectedCellCoords.size) return;
        
        const configs = {
            bold: [['bold']], italic: [['italic']], underline: [['underline']], strikethrough: [['strikethrough']],
            textAlign: [['align-left', 'align-center', 'align-right'], 'align-'],
            verticalAlign: [['align-top', 'align-middle', 'align-bottom'], 'align-']
        };
        
        const [classes, prefix] = configs[type];
        const isToggle = typeof value === 'boolean';
        const remove = isToggle && this.checkIfAllCellsHaveFormat(type);
        
        this.saveState(`${isToggle ? 'Toggle' : 'Set'} ${type}`);
        
        this.selectedCellCoords.forEach(coord => {
            const data = this.cellData.get(coord) || {};
            remove ? delete data[type] : data[type] = isToggle ? true : value;
            this.cellData.set(coord, data);
        });
        
        this.selectedCells.forEach(cell => {
            cell.classList.remove(...classes);
            !remove && cell.classList.add(prefix ? `${prefix}${value}` : type);
        });
        
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
                const val = this.cellData.get(coord)?.[prop] || config.default;
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
            const delta = event[axis] - this.resizeStartPos;
            const newSize = Math.max(minSize, this.resizeStartSize + delta);
            
            sizeMap.set(this.resizeIndex, newSize);
            this.updateLayout(this.resizeIndex, this.resizeType);
        });
    }
    
    updateLayout(index, type) {
        const [isCol, cfg] = [type === 'column', {
            column: ['width', 'left', 'col', '.column-header', this.columnHeaders, this.visibleCols, 
                    this.getColumnWidth, this.getColumnLeft, this.getTotalGridWidth],
            row: ['height', 'top', 'row', '.row-header', this.rowHeaders, this.visibleRows,
                this.getRowHeight, this.getRowTop, this.getTotalGridHeight]
        }[type]];
        
        const [sizeProp, posProp, dataAttr, headerClass, headers, vis, getSz, getPos, getTotal] = cfg;
        const els = headers.querySelectorAll(headerClass);
        const sz = getSz.call(this, index);
        
        if (els[index]) els[index].style[sizeProp] = sz + 'px';
        
        for (let i = Math.max(index + 1, vis.start); i < Math.min(els.length, vis.end + 5); i++) {
            if (els[i]) els[i].style[posProp] = getPos.call(this, i) + 'px';
        }
        
        this.gridContent.style[sizeProp] = getTotal.call(this) + 'px';
        
        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            const idx = parseInt(cell.dataset[dataAttr]);
            if (idx === index) cell.style[sizeProp] = sz + 'px';
            else if (idx > index) cell.style[posProp] = getPos.call(this, idx) + 'px';
        });
    }

    updateGridSize() {
        this.gridContent.style.width = this.getTotalGridWidth() + 'px';
        this.gridContent.style.height = this.getTotalGridHeight() + 'px';
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
        
        if (!size || isNaN(size) || size < 1 || !this.selectedCellCoords.size) return;
        
        const clamped = Math.max(6, Math.min(200, size));
        input.value = clamped;
        this.applyFontSize(clamped);
    }

    applyFontSize(fontSize) {
        if (!this.selectedCellCoords.size) return;
        
        this.saveState(`Apply font size ${fontSize}px`);
        
        // Update data model
        this.selectedCellCoords.forEach(coord => {
            const data = this.cellData.get(coord) || {};
            fontSize ? data.fontSize = fontSize : delete data.fontSize;
            this.cellData.set(coord, data);
        });

        // Update DOM
        this.selectedCells.forEach(cell => {
            cell.style.fontSize = fontSize ? `${fontSize}px` : '';
        });

        this.updateFontSizeInput();
    }

    updateFontSizeInput() {
        const fontSizeInput = document.getElementById('fontSizeInput');
        
        if (this.selectedCellCoords.size === 0) {
            fontSizeInput.value = '';
            return;
        }

        // Get the primary cell's font size or default
        if (this.primaryCellCoord) {
            const cellData = this.cellData.get(this.primaryCellCoord);
            const fontSize = cellData?.fontSize;
            
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
        this.selectRange(type, index, event.ctrlKey || event.metaKey);
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
        const scrollLeft = this.mainGrid.scrollLeft;
        const scrollTop = this.mainGrid.scrollTop;
        
        // Update header positions
        this.columnHeaders.style.transform = `translateX(-${scrollLeft}px)`;
        this.rowHeaders.style.transform = `translateY(-${scrollTop}px)`;

        // Calculate visible ranges using the helper
        const newVisibleCols = this.findVisibleRange(
            scrollLeft,
            this.mainGrid.clientWidth,
            this.config.maxCols,
            this.getColumnWidth
        );
        
        const newVisibleRows = this.findVisibleRange(
            scrollTop,
            this.mainGrid.clientHeight,
            this.config.maxRows,
            this.getRowHeight
        );

        // Update if visible area changed
        if (newVisibleCols.start !== this.visibleCols.start || 
            newVisibleCols.end !== this.visibleCols.end ||
            newVisibleRows.start !== this.visibleRows.start || 
            newVisibleRows.end !== this.visibleRows.end) {
            
            this.visibleCols = newVisibleCols;
            this.visibleRows = newVisibleRows;
            this.updateVisibleCells();
        }
    }

    handleMouseDown(event) {
        const cell = event.target.closest('.cell');
        if (!cell || event.target.classList.contains('cell-editor')) return;

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

        const cell = event.target.closest('.cell');
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

    handleDoubleClick(event) {
        const cell = event.target.closest('.cell');
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

    selectCells(cells, isPrimary = false) {
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
        this.selectedCells.forEach(cell => {
            cell.classList.remove('selected', 'primary-selected');
        });
        this.selectedCells.clear();
        this.selectedCellCoords.clear();
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.updateUI();
        this.log('Cleared all selections');
    }

    updateCellReference() {
        if (this.selectedCellCoords.size === 0) {
            this.cellReference.value = '';
            return;
        }
        
        if (this.selectedCellCoords.size === 1) {
            if (this.primaryCell) {
                this.cellReference.value = this.primaryCell.dataset.address;
            }
            return;
        }
        
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
        coords.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
        
        const minRow = Math.min(...coords.map(c => c.row));
        const maxRow = Math.max(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));
        const maxCol = Math.max(...coords.map(c => c.col));
        
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

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell-editor';
        input.value = currentText;
        cell.innerHTML = '';
        cell.appendChild(input);
        input.focus();
        input.select();

        this.formulaInput.value = currentText;

        input.addEventListener('blur', () => this.stopEditingCell());
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

    stopEditingCell(cancel = false) {
        if (!this.currentEditingCell) return;

        const input = this.currentEditingCell.querySelector('.cell-editor');
        if (!input) return;

        const oldValue = this.currentEditingCell.dataset.originalValue || '';
        const newValue = cancel ? oldValue : input.value;

        const cellKey = this.getCoord(this.currentEditingCell);
        const { row, col } = this.getCellPos(this.currentEditingCell);
        
        // Display formula result or value
        if (newValue.startsWith('=')) {
            const result = this.parseFormula(newValue, row, col);
            this.currentEditingCell.textContent = result;
        } else {
            this.currentEditingCell.textContent = newValue;
        }
        
        this.currentEditingCell.classList.remove('editing');
        delete this.currentEditingCell.dataset.originalValue;
        
        if (!cancel && oldValue !== newValue) {
            // Save state before making changes
            this.saveState(`Edit cell ${this.currentEditingCell.dataset.address}`);
        }
        
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        this.cellData.get(cellKey).value = newValue;

        // Update formula bar to show the formula, not the result
        this.formulaInput.value = newValue;

        if (!cancel && oldValue !== newValue) {
            this.log(`Cell ${this.currentEditingCell.dataset.address} edited: "${oldValue}" → "${newValue}"`);
            
            // Recalculate all cells that might depend on this cell
            this.recalculateAllFormulas();
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
        if (this.currentEditingCell) return;

        // Handle Ctrl+Z for undo
        if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
            event.preventDefault();
            this.undo();
            return;
        }

        // Handle Ctrl+Y or Ctrl+Shift+Z for redo
        if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
            event.preventDefault();
            this.redo();
            return;
        }

        // Handle Ctrl+A / Cmd+A for select all
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            this.selectAllCells();
            return;
        }
        
        // Handle Ctrl+C for copy
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
            event.preventDefault();
            this.copyCells();
            return;
        }

        // Handle Ctrl+X for cut
        if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
            event.preventDefault();
            this.cutCells();
            return;
        }

        // Handle Ctrl+V for paste
        if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
            event.preventDefault();
            this.pasteCells();
            return;
        }

        switch (event.key) {
            case 'Enter':
                if (this.primaryCell && !this.currentEditingCell) {
                    this.startEditingCell(this.primaryCell);
                }
                break;
            case 'Delete':
            case 'Backspace':
                if (this.selectedCells.size > 0) {
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
        this.log(`Selected all cells: ${this.config.maxRows * this.config.maxCols} cells`);
    }

    clearCellContent() {
        // Save state before clearing
        this.saveState(`Clear content of ${this.selectedCellCoords.size} cells`);
        
        this.selectedCellCoords.forEach(coordKey => {
            if (this.cellData.has(coordKey)) {
                this.cellData.get(coordKey).value = '';
            }
        });

        this.selectedCells.forEach(cell => {
            cell.textContent = '';
        });

        this.updateFormulaBar();
        this.log(`Cleared content of ${this.selectedCellCoords.size} cells`);
    }

    handleContextMenu(event) {
        const cell = event.target.closest('.cell');
        
        if (this.currentEditingCell && event.target.classList.contains('cell-editor')) {
            return;
        }

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

    hideContextMenu() {
        this.contextMenu.classList.add('hidden');
    }

    handleContextMenuClick(event) {
        const item = event.target.closest('.context-menu-item');
        if (!item) return;

        const action = item.dataset.action;
        this.executeContextAction(action);
        this.hideContextMenu();
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
            case 'clearContent':
                this.clearCellContent();
                break;
            case 'clearFormat':
                this.clearCellFormatting();
                break;
        }
    }
    
    _getRelativeCoords() {
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
        const minRow = Math.min(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));
        
        return { coords, minRow, minCol };
    }
    
    cutCells() { this.copyCells(true); }
    copyCells(isCut = false) {
        if (!this.selectedCellCoords.size) return;

        this.clipboard = {
            data: new Map(),
            mode: isCut ? 'cut' : 'copy',
            sourceCells: isCut ? new Set(this.selectedCellCoords) : null
        };

        const { minRow, minCol } = this._getRelativeCoords();

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
                
                // Adjust formula references if the value is a formula
                if (newCellData.value && newCellData.value.startsWith('=')) {
                    newCellData.value = this.adjustFormulaReferences(
                        newCellData.value, 
                        relRow, 
                        relCol
                    );
                }
                
                // Store the adjusted data
                if (Object.keys(newCellData).length > 0) {
                    this.cellData.set(newKey, newCellData);
                } else {
                    // Ensure the cell exists in cellData even if empty
                    if (!this.cellData.has(newKey)) {
                        this.cellData.set(newKey, {});
                    }
                }

                // Update the cell if it's visible
                const cell = this.getCellAt(newRow, newCol);
                if (cell) {
                    this.updateCellDisplay(cell, newCellData);
                }
            }
        });

        this.log(`Pasted ${this.clipboard.data.size} cells at ${this.primaryCell.dataset.address}`);
    }

    updateCellDisplay(cell, d = {}) {
        const coord = this.getCoord(cell);
        const { row, col } = this.getCellPos(cell);
        
        cell.textContent = d.value?.startsWith('=') ? this.parseFormula(d.value, row, col) : d.value || '';
        
        cell.className = ['cell',
            d.bold && 'bold', d.italic && 'italic', d.underline && 'underline', d.strikethrough && 'strikethrough',
            d.textAlign && `align-${d.textAlign}`, d.verticalAlign && `align-${d.verticalAlign}`,
            this.selectedCellCoords.has(coord) && 'selected',
            this.primaryCellCoord === coord && 'primary-selected'
        ].filter(Boolean).join(' ');
        
        // Direct assignment without Object.assign overhead
        cell.style.backgroundColor = d.backgroundColor || '';
        cell.style.color = d.fontColor || '';
        cell.style.fontSize = d.fontSize ? d.fontSize + 'px' : '';
    }

    clearCellFormatting() {
        // Save state before clearing
        this.saveState(`Clear formatting from ${this.selectedCellCoords.size} cells`);
        
        this.selectedCellCoords.forEach(coordKey => {
            if (this.cellData.has(coordKey)) {
                const data = this.cellData.get(coordKey);
                delete data.backgroundColor;
                delete data.bold;
                delete data.italic;
                delete data.underline;
                delete data.strikethrough;
                delete data.fontSize;
                delete data.fontColor;
                delete data.textAlign;
                delete data.verticalAlign;
            }
        });

        this.selectedCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.fontSize = '';
            cell.style.color = '';
            cell.classList.remove('bold', 'italic', 'underline', 'strikethrough');
            cell.classList.remove('align-left', 'align-center', 'align-right',
                      'align-top', 'align-middle', 'align-bottom');
        });

        this.updateUI();
        this.log(`Cleared formatting from ${this.selectedCellCoords.size} cells`);
    }

    handleDocumentClick(event) {
        if (!event.target.closest('#contextMenu')) {
            this.hideContextMenu();
        }
        if (!event.target.closest('#colorPalette') && !event.target.closest('#colorBtn')) {
            this.hideColorPalette();
        }
        if (!event.target.closest('#fontColorPalette') && !event.target.closest('#fontColorBtn')) {
            this.hideFontColorPalette();
        }
        if (!event.target.closest('.spreadsheet-container') && 
            !event.target.closest('#contextMenu') && 
            !event.target.closest('#colorPalette') &&
            !event.target.closest('#fontColorPalette')) {
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
            if (!cellData || !cellData[format]) {
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

    showColorPalette() {
        if (this.selectedCells.size === 0) return;
        
        const button = document.getElementById('colorBtn');
        const rect = button.getBoundingClientRect();
        
        this.colorPalette.classList.remove('hidden');
        this.colorPalette.style.left = rect.left + 'px';
        this.colorPalette.style.top = (rect.bottom + 5) + 'px';
    }
    
    showFontColorPalette() {
        if (this.selectedCells.size === 0) return;
        
        const button = document.getElementById('fontColorBtn');
        const rect = button.getBoundingClientRect();
        
        this.fontColorPalette.classList.remove('hidden');
        this.fontColorPalette.style.left = rect.left + 'px';
        this.fontColorPalette.style.top = (rect.bottom + 5) + 'px';
    }

    hideColorPalette() {
        this.colorPalette.classList.add('hidden');
    }
    
    hideFontColorPalette() {
        this.fontColorPalette.classList.add('hidden');
    }

    setupColorPalette() {
        const grid = document.getElementById('colorPaletteGrid');
        
        const clearSwatch = document.createElement('div');
        clearSwatch.className = 'color-swatch clear';
        clearSwatch.title = 'No fill';
        clearSwatch.addEventListener('click', () => {
            this.applyBackgroundColor('');
            this.hideColorPalette();
        });
        grid.appendChild(clearSwatch);

        this.config.colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => {
                this.applyBackgroundColor(color);
                this.hideColorPalette();
            });
            grid.appendChild(swatch);
        });
    }
    
    setupFontColorPalette() {
        const grid = document.getElementById('fontColorPaletteGrid');
        
        // Add default/black color swatch
        const defaultSwatch = document.createElement('div');
        defaultSwatch.className = 'color-swatch';
        defaultSwatch.style.backgroundColor = '#000000';
        defaultSwatch.title = 'Default (Black)';
        defaultSwatch.addEventListener('click', () => {
            this.applyFontColor('');
            this.hideFontColorPalette();
        });
        grid.appendChild(defaultSwatch);

        // Add color swatches
        const fontColors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
            '#ff00ff', '#00ffff', '#ffffff', '#808080',
            '#800000', '#008000', '#000080', '#808000',
            '#800080', '#008080', '#c0c0c0', '#000000'
        ];

        fontColors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => {
                this.applyFontColor(color);
                this.hideFontColorPalette();
            });
            grid.appendChild(swatch);
        });
    }

    _applyColor(prop, styleProp, color, updateFn) {
        if (!this.selectedCellCoords.size) return;
        this.saveState(`Apply ${prop}`);
        
        this.selectedCellCoords.forEach(c => {
            const d = this.cellData.get(c) || {};
            color ? d[prop] = color : delete d[prop];
            this.cellData.set(c, d);
        });
        
        this.selectedCells.forEach(el => el.style[styleProp] = color || '');
        updateFn.call(this);
    }

    applyBackgroundColor(c) { this._applyColor('backgroundColor', 'backgroundColor', c, this.updateBackgroundColorButton); }
    applyFontColor(c) { this._applyColor('fontColor', 'color', c, this.updateFontColorButton); }
    
    updateBackgroundColorButton() {
        const colorIndicator = document.getElementById('bgColorIndicator');
        
        if (this.selectedCellCoords.size === 0) {
            colorIndicator.style.backgroundColor = 'transparent';
            return;
        }

        // Check if all selected cells have the same background color
        let commonColor = null;
        let allSame = true;
        
        for (const coordKey of this.selectedCellCoords) {
            const cellData = this.cellData.get(coordKey);
            const bgColor = cellData?.backgroundColor || null;
            
            if (commonColor === null) {
                commonColor = bgColor;
            } else if (commonColor !== bgColor) {
                allSame = false;
                break;
            }
        }
        
        if (allSame && commonColor) {
            colorIndicator.style.backgroundColor = commonColor;
        } else if (allSame && !commonColor) {
            colorIndicator.style.backgroundColor = 'transparent';
        } else {
            // Mixed colors - show transparent or a pattern
            colorIndicator.style.backgroundColor = 'transparent';
        }
    }
    
    updateFontColorButton() {
        const button = document.getElementById('fontColorBtn');
        const colorBar = button.querySelector('span span');
        
        if (this.selectedCellCoords.size === 0) {
            colorBar.style.backgroundColor = 'currentColor';
            return;
        }

        // Check if all selected cells have the same font color
        let commonColor = null;
        let allSame = true;
        
        for (const coordKey of this.selectedCellCoords) {
            const cellData = this.cellData.get(coordKey);
            const fontColor = cellData?.fontColor || null;
            
            if (commonColor === null) {
                commonColor = fontColor;
            } else if (commonColor !== fontColor) {
                allSame = false;
                break;
            }
        }
        
        if (allSame && commonColor) {
            colorBar.style.backgroundColor = commonColor;
        } else if (allSame && !commonColor) {
            colorBar.style.backgroundColor = 'var(--color-text)';
        } else {
            // Mixed colors - show a gradient or default
            colorBar.style.backgroundColor = 'currentColor';
        }
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
        
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        this.cellData.get(cellKey).value = value;
        
        // If it's a formula, evaluate and display the result
        if (value.startsWith('=')) {
            const result = this.parseFormula(value, row, col);
            cell.textContent = result;
        } else {
            cell.textContent = value;
        }
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

    resetAll() {
        this.clearAllSelections();
        this.cellData.clear();
        
        // Clear undo/redo stacks
        this.undoStack = [];
        this.redoStack = [];
        this.updateUndoRedoButtons();
        
        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
            cell.style.fontSize = '';
            cell.classList.remove('bold', 'italic', 'underline', 'strikethrough');
        });
        
        this.formulaInput.value = '';
        
        document.getElementById('boldBtn').classList.remove('active');
        document.getElementById('italicBtn').classList.remove('active');
        document.getElementById('underlineBtn').classList.remove('active');
        document.getElementById('strikethroughBtn').classList.remove('active');
        document.getElementById('fontSizeInput').value = ''; // Changed
        
        this.log('Reset all data and formatting');
    }

    applyContextColor() {
        const color = document.getElementById('contextColorPicker').value;
        this.applyBackgroundColor(color);
        this.hideContextMenu();
    }

    log(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${message}`, data || '');
    }
}

// Initialize the application
const app = new SpreadsheetApp();

// Make applyContextColor available globally for the context menu
window.applyContextColor = function() {
    app.applyContextColor();
};
