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
        this.selectedCellCoords = new Set(); // Store coordinates instead of DOM references
        this.primaryCell = null;
        this.primaryCellCoord = null; // Store primary cell coordinate
        this.isDragging = false;
        this.isCtrlDragging = false;
        this.dragStartCell = null;
        this.currentEditingCell = null;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells = new Set();

        // Grid data
        this.cellData = new Map(); // Store cell values and formatting
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

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateHeaders();
        this.generateInitialGrid();
        this.setupColorPalette();
        this.updateSelectionCount();
        this.log('Spreadsheet initialized');
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
        
        // Generate column headers - ensure every column gets a letter
        for (let col = 0; col < this.config.maxCols; col++) {
            const header = document.createElement('div');
            header.className = 'column-header';
            header.textContent = this.getColumnName(col);
            header.dataset.col = col;
            this.columnHeaders.appendChild(header);
        }

        // Generate row headers - ensure every row gets a number
        for (let row = 0; row < this.config.maxRows; row++) {
            const header = document.createElement('div');
            header.className = 'row-header';
            header.textContent = (row + 1).toString();  // 1, 2, 3, 4, 5, etc.
            header.dataset.row = row;
            this.rowHeaders.appendChild(header);
        }

        this.log(`Generated headers: ${this.config.maxCols} columns, ${this.config.maxRows} rows`);
    }

    generateInitialGrid() {
        // Set grid content size for scrolling
        this.gridContent.style.width = `${this.config.maxCols * this.config.cellWidth}px`;
        this.gridContent.style.height = `${this.config.maxRows * this.config.cellHeight}px`;

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
    }

    createCell(row, col) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.address = this.getCellAddress(row, col);
        
        // Position the cell
        cell.style.left = `${col * this.config.cellWidth}px`;
        cell.style.top = `${row * this.config.cellHeight}px`;
        cell.style.width = `${this.config.cellWidth}px`;
        cell.style.height = `${this.config.cellHeight}px`;

        // Get cell data
        const cellKey = `${row},${col}`;
        const cellData = this.cellData.get(cellKey) || {};
        cell.textContent = cellData.value || '';
        
        // Apply formatting
        if (cellData.backgroundColor) {
            cell.style.backgroundColor = cellData.backgroundColor;
        }
        if (cellData.bold) {
            cell.classList.add('bold');
        }
        if (cellData.italic) {
            cell.classList.add('italic');
        }

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

    setupEventListeners() {
        // Main grid events
        this.mainGrid.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.mainGrid.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.mainGrid.addEventListener('dblclick', this.handleDoubleClick.bind(this));
        this.mainGrid.addEventListener('scroll', this.handleScroll.bind(this));
        
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));

        // Toolbar events
        document.getElementById('boldBtn').addEventListener('click', () => this.toggleFormat('bold'));
        document.getElementById('italicBtn').addEventListener('click', () => this.toggleFormat('italic'));
        document.getElementById('colorBtn').addEventListener('click', this.showColorPalette.bind(this));
        document.getElementById('clearSelectionBtn').addEventListener('click', this.clearAllSelections.bind(this));
        document.getElementById('resetBtn').addEventListener('click', this.resetAll.bind(this));

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
            if (this.isDragging && !e.target.classList.contains('cell-editor')) {
                e.preventDefault();
            }
        });
    }

    handleScroll() {
        const scrollLeft = this.mainGrid.scrollLeft;
        const scrollTop = this.mainGrid.scrollTop;
        
        // Update header positions to keep them visible during scroll
        this.columnHeaders.style.transform = `translateX(-${scrollLeft}px)`;
        this.rowHeaders.style.transform = `translateY(-${scrollTop}px)`;

        // Calculate new visible area with padding for smooth scrolling
        const padding = 10; // Extra cells to render outside viewport
        const newVisibleCols = {
            start: Math.max(0, Math.floor(scrollLeft / this.config.cellWidth) - padding),
            end: Math.min(this.config.maxCols, Math.ceil((scrollLeft + this.mainGrid.clientWidth) / this.config.cellWidth) + padding)
        };

        const newVisibleRows = {
            start: Math.max(0, Math.floor(scrollTop / this.config.cellHeight) - padding),
            end: Math.min(this.config.maxRows, Math.ceil((scrollTop + this.mainGrid.clientHeight) / this.config.cellHeight) + padding)
        };

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

        if (event.button === 2) return; // Ignore right-click

        this.dragStartCell = cell;
        this.isDragging = true;
        this.isCtrlDragging = event.ctrlKey || event.metaKey;

        // Prevent default to avoid text selection during drag
        event.preventDefault();

        if (this.currentEditingCell && this.currentEditingCell !== cell) {
            this.stopEditingCell();
        }

        if (this.isCtrlDragging) {
            this.ctrlDragAction = this.selectedCells.has(cell) ? 'deselect' : 'select';
            this.ctrlDragProcessedCells.clear();
            this.processCtrlDragCell(cell);
        } else if (event.shiftKey && this.primaryCell) {
            // Handle shift selection
            this.clearAllSelections();
            const rangeCells = this.getCellsInRect(this.primaryCell, cell);
            this.selectCells(rangeCells, true);
        } else {
            // Regular selection - clear previous and select this cell
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
        this.isDragging = false;
        this.dragStartCell = null;
        this.isCtrlDragging = false;
        this.ctrlDragAction = null;
        this.ctrlDragProcessedCells.clear();
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
            // Handled in mouse events for drag support
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
        this.updateSelectionCount();
        this.updateCellReference();
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
        this.updateSelectionCount();
        this.updateCellReference();
        this.updateFormulaBar();
    }

    clearAllSelections() {
        this.selectedCells.forEach(cell => {
            cell.classList.remove('selected', 'primary-selected');
        });
        this.selectedCells.clear();
        this.selectedCellCoords.clear();
        this.primaryCell = null;
        this.primaryCellCoord = null;
        this.updateSelectionCount();
        this.updateCellReference();
        this.updateFormulaBar();
        this.log('Cleared all selections');
    }

    updateSelectionCount() {
        document.getElementById('selectionCount').textContent = this.selectedCellCoords.size;
    }

    updateCellReference() {
        if (this.primaryCell) {
            this.cellReference.value = this.primaryCell.dataset.address;
        } else {
            this.cellReference.value = '';
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

        // Update formula bar
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

        // Update cell display
        this.currentEditingCell.textContent = newValue;
        this.currentEditingCell.classList.remove('editing');
        delete this.currentEditingCell.dataset.originalValue;

        // Update cell data
        const row = parseInt(this.currentEditingCell.dataset.row);
        const col = parseInt(this.currentEditingCell.dataset.col);
        const cellKey = `${row},${col}`;
        
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        this.cellData.get(cellKey).value = newValue;

        // Update formula bar
        this.formulaInput.value = newValue;

        if (!cancel && oldValue !== newValue) {
            this.log(`Cell ${this.currentEditingCell.dataset.address} edited: "${oldValue}" → "${newValue}"`);
        }

        this.currentEditingCell = null;
    }

    moveSelection(deltaRow, deltaCol) {
        if (!this.primaryCell) return;

        const currentRow = parseInt(this.primaryCell.dataset.row);
        const currentCol = parseInt(this.primaryCell.dataset.col);
        const newRow = Math.max(0, Math.min(this.config.maxRows - 1, currentRow + deltaRow));
        const newCol = Math.max(0, Math.min(this.config.maxCols - 1, currentCol + deltaCol));

        // Ensure the new cell is visible by scrolling if necessary
        this.scrollToCell(newRow, newCol);

        const newCell = this.getCellAt(newRow, newCol);
        if (newCell) {
            this.clearAllSelections();
            this.selectCells([newCell], true);
        } else {
            // Create cell if it doesn't exist in DOM yet
            const cell = this.createCell(newRow, newCol);
            this.clearAllSelections();
            this.selectCells([cell], true);
        }
    }

    scrollToCell(row, col) {
        const cellLeft = col * this.config.cellWidth;
        const cellTop = row * this.config.cellHeight;
        const cellRight = cellLeft + this.config.cellWidth;
        const cellBottom = cellTop + this.config.cellHeight;

        const viewLeft = this.mainGrid.scrollLeft;
        const viewTop = this.mainGrid.scrollTop;
        const viewRight = viewLeft + this.mainGrid.clientWidth;
        const viewBottom = viewTop + this.mainGrid.clientHeight;

        let newScrollLeft = viewLeft;
        let newScrollTop = viewTop;

        if (cellLeft < viewLeft) {
            newScrollLeft = cellLeft;
        } else if (cellRight > viewRight) {
            newScrollLeft = cellRight - this.mainGrid.clientWidth;
        }

        if (cellTop < viewTop) {
            newScrollTop = cellTop;
        } else if (cellBottom > viewBottom) {
            newScrollTop = cellBottom - this.mainGrid.clientHeight;
        }

        if (newScrollLeft !== viewLeft || newScrollTop !== viewTop) {
            this.mainGrid.scrollTo({
                left: newScrollLeft,
                top: newScrollTop,
                behavior: 'smooth'
            });
        }
    }

    handleKeyDown(event) {
        if (this.currentEditingCell) return;

        // Handle Ctrl+A / Cmd+A for select all
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            this.selectAllCells();
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
        
        // Add all cell coordinates to the selection without creating DOM elements
        for (let row = 0; row < this.config.maxRows; row++) {
            for (let col = 0; col < this.config.maxCols; col++) {
                const coordKey = `${row},${col}`;
                this.selectedCellCoords.add(coordKey);
            }
        }
        
        // Set the primary cell to A1
        this.primaryCellCoord = '0,0';
        
        // Apply selection styling to all visible cells
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
        
        this.updateSelectionCount();
        this.updateCellReference();
        this.updateFormulaBar();
        this.log(`Selected all cells: ${this.config.maxRows * this.config.maxCols} cells`);
    }

    clearCellContent() {
        // Clear content in cellData for all selected coordinates
        this.selectedCellCoords.forEach(coordKey => {
            if (this.cellData.has(coordKey)) {
                this.cellData.get(coordKey).value = '';
            }
        });

        // Clear visual content for visible cells
        this.selectedCells.forEach(cell => {
            cell.textContent = '';
        });

        this.updateFormulaBar();
        this.log(`Cleared content of ${this.selectedCellCoords.size} cells`);
    }

    handleContextMenu(event) {
        const cell = event.target.closest('.cell');
        
        if (this.currentEditingCell && event.target.classList.contains('cell-editor')) {
            return; // Allow browser context menu for text editing
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

        // Adjust position if menu goes off-screen
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
            case 'clearContent':
                this.clearCellContent();
                break;
            case 'clearFormat':
                this.clearCellFormatting();
                break;
            // Add more context actions as needed
        }
    }

    clearCellFormatting() {
        // Clear formatting in cellData for all selected coordinates
        this.selectedCellCoords.forEach(coordKey => {
            if (this.cellData.has(coordKey)) {
                const data = this.cellData.get(coordKey);
                delete data.backgroundColor;
                delete data.bold;
                delete data.italic;
            }
        });

        // Clear visual formatting for visible cells
        this.selectedCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.classList.remove('bold', 'italic');
        });

        this.log(`Cleared formatting from ${this.selectedCellCoords.size} cells`);
    }

    handleDocumentClick(event) {
        if (!event.target.closest('#contextMenu')) {
            this.hideContextMenu();
        }
        if (!event.target.closest('#colorPalette') && !event.target.closest('#colorBtn')) {
            this.hideColorPalette();
        }
        if (!event.target.closest('.spreadsheet-container') && 
            !event.target.closest('#contextMenu') && 
            !event.target.closest('#colorPalette')) {
            if (this.currentEditingCell) {
                this.stopEditingCell();
            }
        }
    }

    toggleFormat(format) {
        if (this.selectedCellCoords.size === 0) return;

        const button = document.getElementById(format + 'Btn');
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }

        // Apply to all selected coordinates in cellData
        this.selectedCellCoords.forEach(coordKey => {
            if (!this.cellData.has(coordKey)) {
                this.cellData.set(coordKey, {});
            }
            
            const data = this.cellData.get(coordKey);
            
            if (format === 'bold') {
                if (isActive) {
                    delete data.bold;
                } else {
                    data.bold = true;
                }
            } else if (format === 'italic') {
                if (isActive) {
                    delete data.italic;
                } else {
                    data.italic = true;
                }
            }
        });

        // Apply visual styling to currently visible cells
        this.selectedCells.forEach(cell => {
            if (format === 'bold') {
                if (isActive) {
                    cell.classList.remove('bold');
                } else {
                    cell.classList.add('bold');
                }
            } else if (format === 'italic') {
                if (isActive) {
                    cell.classList.remove('italic');
                } else {
                    cell.classList.add('italic');
                }
            }
        });

        this.log(`Toggled ${format} for ${this.selectedCellCoords.size} cells`);
    }

    showColorPalette() {
        if (this.selectedCells.size === 0) return;
        
        const button = document.getElementById('colorBtn');
        const rect = button.getBoundingClientRect();
        
        this.colorPalette.classList.remove('hidden');
        this.colorPalette.style.left = rect.left + 'px';
        this.colorPalette.style.top = (rect.bottom + 5) + 'px';
    }

    hideColorPalette() {
        this.colorPalette.classList.add('hidden');
    }

    setupColorPalette() {
        const grid = document.getElementById('colorPaletteGrid');
        
        // Add clear color option
        const clearSwatch = document.createElement('div');
        clearSwatch.className = 'color-swatch clear';
        clearSwatch.title = 'No fill';
        clearSwatch.addEventListener('click', () => {
            this.applyBackgroundColor('');
            this.hideColorPalette();
        });
        grid.appendChild(clearSwatch);

        // Add color swatches
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

    applyBackgroundColor(color) {
        if (this.selectedCellCoords.size === 0) return;

        // Apply to all selected coordinates in cellData
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

        // Apply visual styling to currently visible cells
        this.selectedCells.forEach(cell => {
            if (color) {
                cell.style.backgroundColor = color;
            } else {
                cell.style.backgroundColor = '';
            }
        });

        this.log(`Applied background color ${color || 'none'} to ${this.selectedCellCoords.size} cells`);
    }

    handleFormulaKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.primaryCell) {
                const newValue = this.formulaInput.value;
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

    updateCellValue(cell, value) {
        cell.textContent = value;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const cellKey = `${row},${col}`;
        
        if (!this.cellData.has(cellKey)) {
            this.cellData.set(cellKey, {});
        }
        this.cellData.get(cellKey).value = value;
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
            const address = this.cellReference.value.toUpperCase();
            const parsed = this.parseCellAddress(address);
            if (parsed) {
                this.scrollToCell(parsed.row, parsed.col);
                const cell = this.getCellAt(parsed.row, parsed.col) || this.createCell(parsed.row, parsed.col);
                this.clearAllSelections();
                this.selectCells([cell], true);
            }
            this.cellReference.blur();
        }
    }

    resetAll() {
        this.clearAllSelections();
        this.cellData.clear();
        
        // Clear all visible cells
        this.gridContent.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
            cell.classList.remove('bold', 'italic');
        });
        
        this.formulaInput.value = '';
        
        // Reset formatting buttons
        document.getElementById('boldBtn').classList.remove('active');
        document.getElementById('italicBtn').classList.remove('active');
        
        this.log('Reset all data and formatting');
    }

    // Global function for context menu color application
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
