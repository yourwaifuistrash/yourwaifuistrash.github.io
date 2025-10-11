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
        this.linkEditor = document.getElementById('linkEditor');
        this.borderMenu = document.getElementById('borderMenu');
        console.log('Link editor found:', this.linkEditor);
        console.log('Save button found:', document.getElementById('linkSaveBtn'));
        console.log('Cancel button found:', document.getElementById('linkCancelBtn'));
        
        this.clipboard = {
            data: null,
            mode: null, // 'copy' or 'cut'
            sourceCells: null // Store original cell coordinates for cut
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
        this.undoStack.push({ action, cellData: new Map(this.cellData), timestamp: Date.now() });
        if (this.undoStack.length > this.maxUndoSteps) this.undoStack.shift();
        this.redoStack = [];
        this.updateUndoRedoButtons();
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
        const events = [
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
            ['#formatPainterBtn', 'click', () => this.activateFormatPainter()]
        ];
        console.log('Save button:', document.getElementById('linkSaveBtn'));
        console.log('Cancel button:', document.getElementById('linkCancelBtn'));
        
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
    }
    
    activateFormatPainter() {
        if (!this.primaryCell || this.selectedCellCoords.size === 0) {
            this.log('No cell selected for format painter');
            return;
        }
        
        // Get all selected cell coordinates
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
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
        
        // Get or create cell data
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        
        const cellData = this.cellData.get(cellKey);
        
        // Apply format properties
        Object.keys(this.formatPainter.format).forEach(key => {
            cellData[key] = this.formatPainter.format[key];
        });
        
        // Update cell display
        this.updateCellDisplay(cell, cellData);
        
        this.log(`Applied format to cell ${cell.dataset.address}`);
    }

    applyPaintedFormatToSelection() {
        if (!this.formatPainter.active || !this.formatPainter.formats) {
            return;
        }
        
        if (this.selectedCellCoords.size === 0) {
            return;
        }
        
        // Save state
        this.saveState(`Apply painted format to ${this.selectedCellCoords.size} cells`);
        
        // Get the bounding box of the target selection
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
        const minRow = Math.min(...coords.map(c => c.row));
        const maxRow = Math.max(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));
        const maxCol = Math.max(...coords.map(c => c.col));
        
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
                    // Get or create cell data
                    if (!this.cellData.has(coordKey)) {
                        this.cellData.set(coordKey, {});
                    }
                    
                    const cellData = this.cellData.get(coordKey);
                    
                    // Apply format properties (borders are already stored at full width)
                    Object.keys(format).forEach(key => {
                        cellData[key] = format[key];
                    });
                }
            }
        }
        
        // Update visible cells
        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey);
            this.updateCellDisplay(cell, cellData);
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
        this.gridContent.style[prop] = getTotal.call(this) + 'px';
        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            const i = parseInt(cell.dataset[attr]);
            cell.style[i === idx ? prop : i > idx && pos] = 
                (i === idx ? sz : i > idx && getPos.call(this, i)) + 'px';
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
        
        if (this.selectedCellCoords.size === 0) {
            return;
        }
        
        // Get all selected cell coordinates
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
        // Get the bounding box of current selection
        const minRow = Math.min(...coords.map(c => c.row));
        const maxRow = Math.max(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));
        const maxCol = Math.max(...coords.map(c => c.col));
        
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
            this.selectedCells.forEach(cell => {
                cell.classList.remove('selected', 'primary-selected');
            });
            this.selectedCells.clear();
            this.selectedCellCoords.clear();
            
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
            let canOverflow = true;
            let totalWidth = cellWidth;
            
            // Check if adjacent cells have content
            for (let c = col + 1; c < this.config.maxCols; c++) {
                const adjacentCoord = `${row},${c}`;
                const adjacentData = this.cellData.get(adjacentCoord);
                
                if (adjacentData && adjacentData.value && adjacentData.value.trim() !== '') {
                    canOverflow = false;
                    break;
                }
                
                totalWidth += this.getColumnWidth(c);
                
                // Stop if we have enough width
                if (textWidth <= totalWidth - 16) {
                    break;
                }
                
                // Check if we've checked enough cells
                if (c - col > 10) break;
            }
            
            if (canOverflow) {
                // Set input width to accommodate the text
                input.style.width = Math.max(cellWidth, textWidth + 32) + 'px';
            } else {
                // Can't overflow - keep normal width
                input.style.width = cellWidth + 'px';
            }
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
        
        console.log('URL:', url, 'Text:', text);
        
        const cellKey = this.getCoord(this.primaryCell);
        
        this.saveState(`Edit link in ${this.primaryCell.dataset.address}`);
        
        // Store both URL and display text
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        
        const cellData = this.cellData.get(cellKey);
        cellData.value = text || url; // Display text (or URL if no text provided)
        cellData.linkUrl = url; // Store the actual URL separately
        
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
        
        isLink = !!(d.linkUrl || this.isHyperlink(displayText));
        
        cell.textContent = displayText;
        
        // Handle text overflow into adjacent cells
        this.handleCellOverflow(cell, displayText, d);
        
        cell.className = ['cell',
            d.bold && 'bold', d.italic && 'italic', d.underline && 'underline', d.strikethrough && 'strikethrough',
            d.textAlign && `align-${d.textAlign}`, d.verticalAlign && `align-${d.verticalAlign}`,
            this.selectedCellCoords.has(coord) && 'selected',
            this.primaryCellCoord === coord && 'primary-selected',
            isLink && 'cell-link'
        ].filter(Boolean).join(' ');
        
        cell.style.backgroundColor = d.backgroundColor || '';
        cell.style.color = d.fontColor || '';
        cell.style.fontSize = d.fontSize ? d.fontSize + 'px' : '';
        
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
        
        // Remove any existing overflow styling
        cell.style.overflow = '';
        cell.style.textOverflow = '';
        cell.style.whiteSpace = '';
        cell.style.zIndex = '';
        
        // If cell has no content, use default overflow behavior
        if (!displayText || displayText.trim() === '') {
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            return;
        }
        
        // Check if text fits within the cell
        const cellWidth = this.getColumnWidth(col);
        const textWidth = this.measureTextWidth(displayText, cell);
        
        if (textWidth <= cellWidth - 16) { // Account for padding
            // Text fits, no overflow needed
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
            return;
        }
        
        // Text doesn't fit - check if we can overflow to the right
        let canOverflow = true;
        let overflowCells = 0;
        let totalWidth = cellWidth;
        
        // Check cells to the right until we have enough space or hit content
        for (let c = col + 1; c < this.config.maxCols; c++) {
            const adjacentCoord = `${row},${c}`;
            const adjacentData = this.cellData.get(adjacentCoord);
            
            // Stop if adjacent cell has content
            if (adjacentData && adjacentData.value && adjacentData.value.trim() !== '') {
                canOverflow = false;
                break;
            }
            
            totalWidth += this.getColumnWidth(c);
            overflowCells++;
            
            // Stop if we have enough width
            if (textWidth <= totalWidth - 16) {
                break;
            }
        }
        
        if (canOverflow && overflowCells > 0) {
            // Allow overflow - use higher z-index to appear above selected cells
            cell.style.overflow = 'visible';
            cell.style.whiteSpace = 'nowrap';
            cell.style.zIndex = '5';
        } else {
            // Can't overflow - truncate with ellipsis
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.whiteSpace = 'nowrap';
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
                delete data.borders;
            }
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

    _showPalette(paletteElement, buttonId) {
        if (this.selectedCells.size === 0) return;
        
        const rect = document.getElementById(buttonId).getBoundingClientRect();
        paletteElement.classList.remove('hidden');
        paletteElement.style.left = rect.left + 'px';
        paletteElement.style.top = (rect.bottom + 5) + 'px';
    }

    _hidePalette(paletteElement) {
        paletteElement.classList.add('hidden');
    }

    showColorPalette() { this._showPalette(this.colorPalette, 'colorBtn'); }
    showFontColorPalette() { this._showPalette(this.fontColorPalette, 'fontColorBtn'); }
    hideColorPalette() { this._hidePalette(this.colorPalette); }
    hideFontColorPalette() { this._hidePalette(this.fontColorPalette); }

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

    getBackgroundColorsInUse() {
        const colors = new Set();
        
        // Scan all cell data for background colors
        this.cellData.forEach((data) => {
            if (data.backgroundColor) {
                colors.add(data.backgroundColor.toUpperCase());
            }
        });
        
        // Convert to array and sort
        return Array.from(colors).sort();
    }

    getFontColorsInUse() {
        const colors = new Set();
        
        // Scan all cell data for font colors
        this.cellData.forEach((data) => {
            if (data.fontColor) {
                colors.add(data.fontColor.toUpperCase());
            }
        });
        
        // Convert to array and sort
        return Array.from(colors).sort();
    }
    
    getBorderColorsInUse() {
        const colors = new Set();
        
        // Scan all cell data for border colors
        this.cellData.forEach((data) => {
            if (data.borders) {
                ['top', 'right', 'bottom', 'left'].forEach(side => {
                    if (data.borders[side]) {
                        // Extract color from border string like "2px solid #000000"
                        const match = data.borders[side].match(/#[0-9A-Fa-f]{6}/);
                        if (match) {
                            colors.add(match[0].toUpperCase());
                        }
                    }
                });
            }
        });
        
        // Convert to array and sort
        return Array.from(colors).sort();
    }
    
    refreshColorPalette() {
        this.setupColorPalette();
    }

    refreshFontColorPalette() {
        this.setupFontColorPalette();
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

    applyBackgroundColor(c) { 
        this._applyColor('backgroundColor', 'backgroundColor', c, this.updateBackgroundColorButton); 
        this.refreshColorPalette();
    }
    applyFontColor(c) { 
        this._applyColor('fontColor', 'color', c, this.updateFontColorButton); 
        this.refreshFontColorPalette();
    }
    
    _getCommonCellProperty(property) {
        if (this.selectedCellCoords.size === 0) return { hasValue: false, value: null, allSame: false };
        
        let commonValue = null;
        let allSame = true;
        
        for (const coord of this.selectedCellCoords) {
            const value = this.cellData.get(coord)?.[property] || null;
            
            if (commonValue === null) {
                commonValue = value;
            } else if (commonValue !== value) {
                allSame = false;
                break;
            }
        }
        
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
    
    showBorderMenu() {
        if (this.selectedCells.size === 0) return;
        
        const rect = document.getElementById('borderBtn').getBoundingClientRect();
        this.borderMenu.classList.remove('hidden');
        this.borderMenu.style.left = rect.left + 'px';
        this.borderMenu.style.top = (rect.bottom + 5) + 'px';
        
        // Refresh colors in use when opening
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
                        document.getElementById('borderColorPicker').value = color;
                        document.getElementById('borderColorHex').value = color;
                        // Update preview
                        const borderPreviewCell = this.borderMenu.querySelector('.border-preview-cell');
                        const style = document.getElementById('borderStyleSelect').value;
                        const width = document.getElementById('borderWidthSelect').value + 'px';
                        borderPreviewCell.style.border = `${width} ${style} ${color}`;
                    });
                    grid.appendChild(swatch);
                });
            } else {
                container.style.display = 'none';
            }
        };
        
        updateColorsInUse();
    }

    hideBorderMenu() {
        this.borderMenu.classList.add('hidden');
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
        if (!this.selectedCellCoords.size) return;
        
        this.saveState(`Apply ${action} border`);
        
        // Get the bounding box of the selection
        const coords = Array.from(this.selectedCellCoords).map(coord => 
            this.getCoordPos(coord)
        );
        
        const minRow = Math.min(...coords.map(c => c.row));
        const maxRow = Math.max(...coords.map(c => c.row));
        const minCol = Math.min(...coords.map(c => c.col));
        const maxCol = Math.max(...coords.map(c => c.col));
        
        // Store FULL width in cellData (format painter and data model use full width)
        // The halving will happen in updateCellDisplay when rendering
        const borderValue = action === 'clear' ? '' : `${width} ${style} ${color}`;
        
        this.selectedCellCoords.forEach(coordKey => {
            const { row, col } = this.getCoordPos(coordKey);
            const cellData = this.cellData.get(coordKey) || {};
            
            if (!cellData.borders && action !== 'clear') {
                cellData.borders = {};
            }
            
            switch (action) {
                case 'all':
                    cellData.borders.top = borderValue;
                    cellData.borders.right = borderValue;
                    cellData.borders.bottom = borderValue;
                    cellData.borders.left = borderValue;
                    break;
                    
                case 'outer':
                    if (row === minRow) cellData.borders.top = borderValue;
                    if (row === maxRow) cellData.borders.bottom = borderValue;
                    if (col === minCol) cellData.borders.left = borderValue;
                    if (col === maxCol) cellData.borders.right = borderValue;
                    break;
                    
                case 'inner':
                    if (row > minRow) cellData.borders.top = borderValue;
                    if (row < maxRow) cellData.borders.bottom = borderValue;
                    if (col > minCol) cellData.borders.left = borderValue;
                    if (col < maxCol) cellData.borders.right = borderValue;
                    break;
                    
                case 'horizontal':
                    if (row > minRow) cellData.borders.top = borderValue;
                    if (row < maxRow) cellData.borders.bottom = borderValue;
                    break;
                    
                case 'vertical':
                    if (col > minCol) cellData.borders.left = borderValue;
                    if (col < maxCol) cellData.borders.right = borderValue;
                    break;
                    
                case 'left':
                    if (col === minCol) {
                        cellData.borders.left = borderValue;
                    }
                    break;
                    
                case 'right':
                    if (col === maxCol) {
                        cellData.borders.right = borderValue;
                    }
                    break;
                    
                case 'top':
                    if (row === minRow) {
                        cellData.borders.top = borderValue;
                    }
                    break;
                    
                case 'bottom':
                    if (row === maxRow) {
                        cellData.borders.bottom = borderValue;
                    }
                    break;
                    
                case 'clear':
                    delete cellData.borders;
                    break;
            }
            
            this.cellData.set(coordKey, cellData);
        });
        
        // Update visible cells
        this.selectedCells.forEach(cell => {
            const cellKey = this.getCoord(cell);
            const cellData = this.cellData.get(cellKey);
            this.updateCellDisplay(cell, cellData);
        });
        
        // Also update adjacent cells visually (without changing their data)
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
        
        this.log(`Applied ${action} border to ${this.selectedCellCoords.size} cells`);
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
        
        // Handle escaped formulas (starting with ')
        if (value.startsWith("'")) {
            // Display without the leading apostrophe
            cell.textContent = value.substring(1);
        }
        // If it's a formula, evaluate and display the result
        else if (value.startsWith('=')) {
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

    log(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${message}`, data || '');
    }
}

// Initialize the application
const app = new SpreadsheetApp();
