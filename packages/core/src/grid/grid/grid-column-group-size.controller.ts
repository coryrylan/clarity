import { ReactiveControllerHost } from 'lit';

export type GridColumnGroupSize = ReactiveControllerHost & HTMLElement & {
  columns: NodeListOf<HTMLElement & { width?: string; colIndex?: number }>;
  rows: NodeListOf<HTMLElement>;
  columnLayout: 'fixed' | 'flex';
};

export class GridColumnGroupSizeController {
  constructor(private host: GridColumnGroupSize) {
    host.addController(this as any);
  }

  initializeColumnWidths() {
    if (this.host.columnLayout === 'fixed') {
      Array.from(this.host.columns)
        .filter(column => !column.width && !column.hidden)
        .map(column => [column, parseInt(getComputedStyle(column).width)])
        .forEach(([column, width]: any) =>
          this.host.style.setProperty(`--col-${column.colIndex}-width`, column.width ? `${column.width}px` : `${width}px`)
        );
    }
  }

  calculateGridColumnWidths() {
    const colWidths = Array.from(this.host.columns)
      .filter(c => !c.hidden)
      .reduce((p, c) => {
        if (this.host.columnLayout === 'flex') {
          return `${p} ${`minmax(min-content, var(--col-${c.colIndex}-width, ${c.width ? `${c.width}px` : '1fr'}))`}`;
        } else {
          return `${p} ${`var(--col-${c.colIndex}-width, ${c.width ? `${c.width}px` : '1fr'})`}`;
        }
      }, '');
    this.host.style.setProperty('--grid-template-columns', colWidths);
  }
}
