import { ReactiveControllerHost } from 'lit';
import { getTabableItems } from '@cds/core/internal';

export type CdsKeyItem = HTMLElement;

/** Cells must be direct children of row */
export type KeyGrid = ReactiveControllerHost & HTMLElement & {
  rows: NodeListOf<CdsKeyItem> | CdsKeyItem[];
  cells: NodeListOf<CdsKeyItem> | CdsKeyItem[];
  grid: HTMLElement;
};

export class GridKeyNavigationController {
  elementRect = {} as DOMRectReadOnly;

  constructor(private host: KeyGrid) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.host.grid.addEventListener('click', (e: any) => {
      const tagName = this.host.cells[0].tagName.toLocaleLowerCase();
      const activeCell = Array.from(this.host.cells).find(c => (c === e.target.closest(tagName)) ?? (c === e.target));
      if (activeCell) {
        this.setActiveCell(e, activeCell);
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
    });
  }

  initializeKeyGrid() {
    this.host.cells.forEach((i: HTMLElement) => i.setAttribute('tabindex', '-1'));
    const firstCell = this.host.cells[0];
    firstCell?.setAttribute('tabindex', '0');
  }

  private setActiveCell(e: any, activeCell: CdsKeyItem) {
    const prior = Array.from(this.host.cells).find(c => c.getAttribute('tabindex') === '0');

    if (prior) {
      prior.setAttribute('tabindex', '-1');
    }

    activeCell.setAttribute('tabindex', '0');

    const items = getTabableItems(activeCell);
    const item = items[0] ?? activeCell;
    item.focus();

    this.host.dispatchEvent(new CustomEvent('cdsKeyChange', { detail: { code: e.code, activeItem: activeCell } }));
  }

  private getNextItemCoordinate(e: any) {
    const currentCell = Array.from(this.host.cells).find(i => i.getAttribute('tabindex') === '0');
    const currentRow = Array.from(this.host.rows).find(r => r.contains(currentCell));
    const numOfRows = this.host.rows.length - 1;
    const numOfColumns = currentRow.children.length - 1;

    let x = Array.from(currentRow.children).indexOf(currentCell);
    let y = Array.from(this.host.rows).indexOf(currentRow);

    const dir = this.host.dir;
    const inlineStart = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const inlineEnd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

    if (e.code === 'ArrowUp' && y !== 0) {
      y = y - 1;
    } else if (e.code === 'ArrowDown' && y < numOfRows) {
      y = y + 1;
    } else if (e.code === inlineStart && x !== 0) {
      x = x - 1;
    } else if (e.code === inlineEnd && x < numOfColumns) {
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
