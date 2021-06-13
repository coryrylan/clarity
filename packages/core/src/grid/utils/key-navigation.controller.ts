import { ReactiveControllerHost } from 'lit';
import { getTabableItems } from './utils.js';

/** Cells must be direct children of row */
export type KeyGrid = HTMLElement & {
  rows: NodeListOf<HTMLElement> | HTMLElement[];
  cells: NodeListOf<HTMLElement> | HTMLElement[];
  grid: HTMLElement;
};

export class GridKeyNavigationController {
  elementRect = {} as DOMRectReadOnly;

  protected host: ReactiveControllerHost & KeyGrid;

  constructor(host: ReactiveControllerHost) {
    this.host = host as any;
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.initializeKeyGrid();

    this.host.grid.addEventListener('click', (e: any) => {
      if (Array.from(this.host.cells).find(c => c === e.target)) {
        this.setActiveCell(e, e.target);
      }
    });

    this.host.grid.addEventListener('keydown', (e: any) => {
      if (
        e.code === 'ArrowUp' ||
        e.code === 'ArrowDown' ||
        e.code === 'ArrowLeft' ||
        e.code === 'ArrowRight' ||
        e.code === 'End' ||
        e.code === 'Home' ||
        e.code === 'PageUp' ||
        e.code === 'PageDown'
      ) {
        const { x, y } = this.getNextItemCoordinate(e);
        const activeItem = this.host.rows[y].children[x] as HTMLElement;
        this.setActiveCell(e, activeItem);
        e.preventDefault();
      }

      // need logic to scroll into view entire cell
      // if (e.target.hasAttribute('[cds-key]') && e.code === 'Tab') {
      //   this.host.shadowRoot.querySelector('[cds-key-item=active]').scrollIntoView();
      // }
    });
  }

  initializeKeyGrid() {
    this.host.cells.forEach((i: HTMLElement) => i.setAttribute('tabindex', '-1'));
    const firstCell = this.host.cells[0];
    firstCell?.setAttribute('cds-key-item', 'active');
    firstCell?.setAttribute('tabindex', '0');
  }

  private setActiveCell(e: any, activeCell: HTMLElement) {
    this.host.cells.forEach(i => {
      i.setAttribute('tabindex', '-1');
      i.removeAttribute('cds-key-item');
    });

    activeCell.setAttribute('cds-key-item', 'active');
    activeCell.setAttribute('tabindex', '0');

    const items = getTabableItems(activeCell);
    const item = items[0] ?? activeCell;
    item.focus();

    this.host.dispatchEvent(new CustomEvent('cdsKeyChange', { detail: { code: e.code, activeItem: activeCell } }));
  }

  private getNextItemCoordinate(e: any) {
    const currentCell = Array.from(this.host.cells).find(i => i.getAttribute('cds-key-item') === 'active');
    const currentRow = Array.from(this.host.rows).find(r => r.contains(currentCell));
    const numOfRows = this.host.rows.length - 1;
    const numOfColumns = currentRow.children.length - 1;

    let x = Array.from(currentRow.children).indexOf(currentCell);
    let y = Array.from(this.host.rows).indexOf(currentRow);

    if (e.code === 'ArrowUp' && y !== 0) {
      y = y - 1;
    } else if (e.code === 'ArrowDown' && y < numOfRows) {
      y = y + 1;
    } else if (e.code === 'ArrowLeft' && x !== 0) {
      x = x - 1;
    } else if (e.code === 'ArrowRight' && x < numOfColumns) {
      x = x + 1;
    } else if (e.code === 'End') {
      x = numOfColumns;

      if (e.ctrlKey || e.metaKey) {
        y = numOfRows;
      }
    } else if (e.code === 'Home') {
      x = 0;

      if (e.ctrlKey || e.metaKey) {
        y = 0;
      }
    } else if (e.code === 'PageUp') {
      y = y - 5 > 0 ? y - 5 : 0;
    } else if (e.code === 'PageDown') {
      y = y + 5 < numOfRows ? y + 5 : numOfRows;
    }

    return { x, y };
  }
}
