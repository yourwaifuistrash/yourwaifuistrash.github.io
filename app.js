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
        
        // Update all visible cells
        this.refreshAllVisibleCells();
        
        this.updateUndoRedoButtons();
        this.updateFormulaBar();
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
        
        // Update all visible cells
        this.refreshAllVisibleCells();
        
        this.updateUndoRedoButtons();
        this.updateFormulaBar();
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
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const cellKey = `${row},${col}`;
            const cellData = this.cellData.get(cellKey) || {};
            
            this.applyCellContent(cell, cellData);
            this.applyCellFormatting(cell, cellData);
        });
        
        this.updateFormattingButtons();
        this.updateFontSizeInput();
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
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (row < this.visibleRows.start || row >= this.visibleRows.end ||
                col < this.visibleCols.start || col >= this.visibleCols.end) {
                cellsToRemove.push(cell);
            }
        });
        
        cellsToRemove.forEach(cell => this.selectedCells.delete(cell));
        
        // Remove existing cells that are outside visible area
        const existingCells = this.gridContent.querySelectorAll('.cell');
        existingCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
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
            const [pRow, pCol] = this.primaryCellCoord.split(',').map(Number);
            if (pRow >= this.visibleRows.start && pRow < this.visibleRows.end &&
                pCol >= this.visibleCols.start && pCol < this.visibleCols.end) {
                this.primaryCell = this.getCellAt(pRow, pCol);
                if (this.primaryCell) {
                    this.primaryCell.classList.add('primary-selected');
                }
            }
        }
    }

    applyCellFormatting(cell, cellData) {
        const fmt = {
            base: ['bold', 'italic', 'underline', 'strikethrough'],
            align: ['left', 'center', 'right', 'top', 'middle', 'bottom']
        };
        
        // Remove all possible format classes
        cell.classList.remove(...fmt.base, ...fmt.align.map(a => `align-${a}`));
        
        // Add active formats
        fmt.base.forEach(f => cellData[f] && cell.classList.add(f));
        cellData.textAlign && cell.classList.add(`align-${cellData.textAlign}`);
        cellData.verticalAlign && cell.classList.add(`align-${cellData.verticalAlign}`);
        
        // Apply inline styles
        Object.assign(cell.style, {
            backgroundColor: cellData.backgroundColor || '',
            color: cellData.fontColor || '',
            fontSize: cellData.fontSize ? `${cellData.fontSize}px` : ''
        });
    }
    
    applyCellContent(cell, cellData) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (cellData.value) {
            if (cellData.value.startsWith('=')) {
                cell.textContent = this.parseFormula(cellData.value, row, col);
            } else {
                cell.textContent = cellData.value;
            }
        } else {
            cell.textContent = '';
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
        const cellKey = `${row},${col}`;
        const cellData = this.cellData.get(cellKey) || {};
        
        // Apply content and formatting using helper methods
        this.applyCellContent(cell, cellData);
        this.applyCellFormatting(cell, cellData);

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
    
    getRowHeight(row) {
        return this.rowHeights.get(row) || this.config.cellHeight;
    }

    getColumnWidth(col) {
        return this.columnWidths.get(col) || this.config.cellWidth;
    }

    getRowTop(row) {
        let top = 0;
        for (let r = 0; r < row; r++) {
            top += this.getRowHeight(r);
        }
        return top;
    }

    getColumnLeft(col) {
        let left = 0;
        for (let c = 0; c < col; c++) {
            left += this.getColumnWidth(c);
        }
        return left;
    }

    getTotalGridHeight() {
        let height = 0;
        for (let r = 0; r < this.config.maxRows; r++) {
            height += this.getRowHeight(r);
        }
        return height;
    }

    getTotalGridWidth() {
        let width = 0;
        for (let c = 0; c < this.config.maxCols; c++) {
            width += this.getColumnWidth(c);
        }
        return width;
    }

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
    
    handleResizeMouseDown(event) {
        const columnHandle = event.target.closest('.column-resize-handle');
        const rowHandle = event.target.closest('.row-resize-handle');
        
        if (columnHandle) {
            event.stopPropagation();
            event.preventDefault();
            
            this.isResizing = true;
            this.resizeType = 'column';
            this.resizeIndex = parseInt(columnHandle.dataset.col);
            this.resizeStartPos = event.clientX;
            this.resizeStartSize = this.getColumnWidth(this.resizeIndex);
            this.lastWidthUpdate = null; // Reset
            
            document.body.style.cursor = 'col-resize';
        } else if (rowHandle) {
            event.stopPropagation();
            event.preventDefault();
            
            this.isResizing = true;
            this.resizeType = 'row';
            this.resizeIndex = parseInt(rowHandle.dataset.row);
            this.resizeStartPos = event.clientY;
            this.resizeStartSize = this.getRowHeight(this.resizeIndex);
            this.lastHeightUpdate = null; // Reset
            
            document.body.style.cursor = 'row-resize';
        }
    }

    handleDocumentMouseMove(event) {
        if (!this.isResizing) return;
        
        // Use requestAnimationFrame to throttle updates
        if (this.resizeAnimationFrame) {
            return;
        }
        
        this.resizeAnimationFrame = requestAnimationFrame(() => {
            this.resizeAnimationFrame = null;
            
            if (this.resizeType === 'column') {
                const delta = event.clientX - this.resizeStartPos;
                const newWidth = Math.max(30, this.resizeStartSize + delta);
                this.columnWidths.set(this.resizeIndex, newWidth);
                this.updateLayout(this.resizeIndex, 'column');
            } else if (this.resizeType === 'row') {
                const delta = event.clientY - this.resizeStartPos;
                const newHeight = Math.max(20, this.resizeStartSize + delta);
                this.rowHeights.set(this.resizeIndex, newHeight);
                this.updateLayout(this.resizeIndex, 'row');
            }
        });
    }
    
    updateLayout(index, type) {
        const isColumn = type === 'column';
        const getSize = isColumn ? this.getColumnWidth : this.getRowHeight;
        const headers = isColumn ? this.columnHeaders : this.rowHeaders;
        const headerElements = headers.querySelectorAll(isColumn ? '.column-header' : '.row-header');
        const newSize = getSize.call(this, index);
        
        if (headerElements[index]) {
            headerElements[index].style[isColumn ? 'width' : 'height'] = newSize + 'px';
        }
        
        const startUpdate = Math.max(index + 1, isColumn ? this.visibleCols.start : this.visibleRows.start);
        const endUpdate = Math.min(headerElements.length, (isColumn ? this.visibleCols.end : this.visibleRows.end) + 5);
        
        for (let i = startUpdate; i < endUpdate; i++) {
            if (headerElements[i]) {
                headerElements[i].style[isColumn ? 'left' : 'top'] = 
                    (isColumn ? this.getColumnLeft(i) : this.getRowTop(i)) + 'px';
            }
        }
        
        this.gridContent.style[isColumn ? 'width' : 'height'] = 
            (isColumn ? this.getTotalGridWidth() : this.getTotalGridHeight()) + 'px';
        
        // Update cells
        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            const cellIndex = parseInt(cell.dataset[isColumn ? 'col' : 'row']);
            if (cellIndex === index) {
                cell.style[isColumn ? 'width' : 'height'] = newSize + 'px';
            } else if (cellIndex > index) {
                cell.style[isColumn ? 'left' : 'top'] = 
                    (isColumn ? this.getColumnLeft(cellIndex) : this.getRowTop(cellIndex)) + 'px';
            }
        });
    }

    updateGridSize() {
        this.gridContent.style.width = this.getTotalGridWidth() + 'px';
        this.gridContent.style.height = this.getTotalGridHeight() + 'px';
    }

    repositionCells() {
        const cells = this.gridContent.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
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
            
            const [row, col] = coord.split(',').map(Number);
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
        this.updateCellReference();
        this.updateFormulaBar();
        this.updateFormattingButtons();
        
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
        
        // Update formatting buttons after any selection change
        if (this.selectedCells.size > 0) {
            this.updateFormattingButtons();
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
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const coordKey = `${row},${col}`;
        
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
        this.updateCellReference();
        this.updateFormattingButtons();
        this.updateFontSizeInput(); // Changed
    }

    getCellsInRect(startCell, endCell) {
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);
        const endRow = parseInt(endCell.dataset.row);
        const endCol = parseInt(endCell.dataset.col);

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
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const coordKey = `${row},${col}`;
            
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
        this.updateCellReference();
        this.updateFormulaBar();
        this.updateFormattingButtons();
        this.updateFontSizeInput();
        this.updateFontColorButton();
        this.updateBackgroundColorButton();
    }
    
    clearAllSelections() {
        this.selectedCells.forEach(cell => {
            cell.classList.remove('selected', 'primary-selected');
        });
        this.selectedCells.clear();
        this.selectedCellCoords.clear();
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.updateCellReference();
        this.updateFormulaBar();
        this.updateFormattingButtons();
        this.updateFontSizeInput(); // Changed
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
        
        const coords = Array.from(this.selectedCellCoords).map(coord => {
            const [row, col] = coord.split(',').map(Number);
            return { row, col };
        });
        
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
            const row = parseInt(this.primaryCell.dataset.row);
            const col = parseInt(this.primaryCell.dataset.col);
            const cellKey = `${row},${col}`;
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
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const cellKey = `${row},${col}`;
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

        const row = parseInt(this.currentEditingCell.dataset.row);
        const col = parseInt(this.currentEditingCell.dataset.col);
        const cellKey = `${row},${col}`;
        
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

        const currentRow = parseInt(this.primaryCell.dataset.row);
        const currentCol = parseInt(this.primaryCell.dataset.col);
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
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const coordKey = `${row},${col}`;
            
            if (this.selectedCellCoords.has(coordKey)) {
                cell.classList.add('selected');
                this.selectedCells.add(cell);
                
                if (coordKey === this.primaryCellCoord) {
                    cell.classList.add('primary-selected');
                    this.primaryCell = cell;
                }
            }
        });
        
        this.updateCellReference();
        this.updateFormulaBar();
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
    
    cutCells() {
        if (this.selectedCellCoords.size === 0) return;

        // Copy the data first
        this.clipboard.data = new Map();
        this.clipboard.mode = 'cut';
        this.clipboard.sourceCells = new Set(this.selectedCellCoords); // Store original cell coordinates

        // Store relative positions and cell data
        const coords = Array.from(this.selectedCellCoords).map(coord => {
            const [row, col] = coord.split(',').map(Number);
            return { row, col };
        });

        // Find the top-left corner
        const minRow = Math.min(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));

        // Store data with relative positions
        this.selectedCellCoords.forEach(coordKey => {
            const [row, col] = coordKey.split(',').map(Number);
            const relativeKey = `${row - minRow},${col - minCol}`;
            const cellData = this.cellData.get(coordKey);
            if (cellData) {
                this.clipboard.data.set(relativeKey, { ...cellData });
            } else {
                // Store empty cell data to ensure we paste empty cells too
                this.clipboard.data.set(relativeKey, {});
            }
        });

        // Visual feedback - add dashed border to cut cells
        this.selectedCells.forEach(cell => {
            cell.style.border = '2px dashed var(--color-primary)';
        });

        this.log(`Cut ${this.selectedCellCoords.size} cells to clipboard`);
    }

    copyCells() {
        if (this.selectedCellCoords.size === 0) return;

        this.clipboard.data = new Map();
        this.clipboard.mode = 'copy';

        // Store relative positions and cell data
        const coords = Array.from(this.selectedCellCoords).map(coord => {
            const [row, col] = coord.split(',').map(Number);
            return { row, col };
        });

        // Find the top-left corner
        const minRow = Math.min(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));

        // Store data with relative positions
        this.selectedCellCoords.forEach(coordKey => {
            const [row, col] = coordKey.split(',').map(Number);
            const relativeKey = `${row - minRow},${col - minCol}`;
            const cellData = this.cellData.get(coordKey);
            if (cellData) {
                this.clipboard.data.set(relativeKey, { ...cellData });
            }
        });

        this.log(`Copied ${this.selectedCellCoords.size} cells to clipboard`);
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

        const targetRow = parseInt(this.primaryCell.dataset.row);
        const targetCol = parseInt(this.primaryCell.dataset.col);

        // Save state before pasting
        this.saveState(`Paste ${this.clipboard.data.size} cells`);

        // If it was a cut operation and this is the first paste, clear the original cells
        if (this.clipboard.mode === 'cut' && this.clipboard.sourceCells) {
            this.clipboard.sourceCells.forEach(coordKey => {
                // Clear the cell data
                this.cellData.delete(coordKey);

                // Update visible cells
                const [row, col] = coordKey.split(',').map(Number);
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

    updateCellDisplay(cell, cellData) {
        this.applyCellContent(cell, cellData);
        this.applyCellFormatting(cell, cellData);
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

        this.updateFormattingButtons();
        this.updateFontSizeInput(); // Changed
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
        if (this.selectedCellCoords.size === 0) {
            // No cells selected - deactivate all formatting buttons
            document.getElementById('boldBtn').classList.remove('active');
            document.getElementById('italicBtn').classList.remove('active');
            document.getElementById('underlineBtn').classList.remove('active');
            document.getElementById('strikethroughBtn').classList.remove('active');
            return;
        }

        // Update bold button
        const allBold = this.checkIfAllCellsHaveFormat('bold');
        if (allBold) {
            document.getElementById('boldBtn').classList.add('active');
        } else {
            document.getElementById('boldBtn').classList.remove('active');
        }

        // Update italic button
        const allItalic = this.checkIfAllCellsHaveFormat('italic');
        if (allItalic) {
            document.getElementById('italicBtn').classList.add('active');
        } else {
            document.getElementById('italicBtn').classList.remove('active');
        }

        // Update underline button
        const allUnderline = this.checkIfAllCellsHaveFormat('underline');
        if (allUnderline) {
            document.getElementById('underlineBtn').classList.add('active');
        } else {
            document.getElementById('underlineBtn').classList.remove('active');
        }

        // Update strikethrough button
        const allStrikethrough = this.checkIfAllCellsHaveFormat('strikethrough');
        if (allStrikethrough) {
            document.getElementById('strikethroughBtn').classList.add('active');
        } else {
            document.getElementById('strikethroughBtn').classList.remove('active');
        }
        
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

    applyBackgroundColor(color) {
        if (this.selectedCellCoords.size === 0) return;

        // Save state before applying color
        this.saveState(`Apply background color to ${this.selectedCellCoords.size} cells`);

        this.selectedCellCoords.forEach(coordKey => {
            if (!this.cellData.has(coordKey)) {
                this.cellData.set(coordKey, {});
            }
            
            if (color) {
                this.cellData.get(coordKey).backgroundColor = color;
            } else {
                delete this.cellData.get(coordKey).backgroundColor;
            }
        });

        this.selectedCells.forEach(cell => {
            if (color) {
                cell.style.backgroundColor = color;
            } else {
                cell.style.backgroundColor = '';
            }
        });

        this.updateBackgroundColorButton(); // Add this line
        this.log(`Applied background color ${color || 'none'} to ${this.selectedCellCoords.size} cells`);
    }
    
    applyFontColor(color) {
        if (this.selectedCellCoords.size === 0) return;

        // Save state before applying color
        this.saveState(`Apply font color to ${this.selectedCellCoords.size} cells`);

        this.selectedCellCoords.forEach(coordKey => {
            if (!this.cellData.has(coordKey)) {
                this.cellData.set(coordKey, {});
            }
            
            if (color) {
                this.cellData.get(coordKey).fontColor = color;
            } else {
                delete this.cellData.get(coordKey).fontColor;
            }
        });

        this.selectedCells.forEach(cell => {
            if (color) {
                cell.style.color = color;
            } else {
                cell.style.color = '';
            }
        });

        this.updateFontColorButton();
        this.log(`Applied font color ${color || 'default'} to ${this.selectedCellCoords.size} cells`);
    }
    
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
                const oldValue = this.cellData.get(`${this.primaryCell.dataset.row},${this.primaryCell.dataset.col}`)?.value || '';
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
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const cellKey = `${row},${col}`;
        
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
            const row = parseInt(this.primaryCell.dataset.row);
            const col = parseInt(this.primaryCell.dataset.col);
            const cellKey = `${row},${col}`;
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

    getOps() {
        return {
            SUM: v => v.reduce((a, b) => a + b, 0),
            AVERAGE: v => v.reduce((a, b) => a + b, 0) / v.length,
            COUNT: v => v.length,
            MIN: v => Math.min(...v),
            MAX: v => Math.max(...v),
            MEDIAN: v => {
                const s = [...v].sort((a, b) => a - b), m = s.length >> 1;
                return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
            }
        };
    }

    calc(op, start, end) {
        const v = this.getRangeValues(start, end);
        return v.length ? (this.getOps()[op]?.(v) ?? 0) : 0;
    }

    replaceFunctions(expr) {
        return expr.replace(
            new RegExp(`(${Object.keys(this.getOps()).join('|')})\\s*\\(\\s*([A-Z]+\\d+)\\s*:\\s*([A-Z]+\\d+)\\s*\\)`, 'gi'),
            (_, fn, s, e) => this.calc(fn.toUpperCase(), s, e)
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
