import { ReactiveControllerHost } from 'lit';

export type Grid = HTMLElement & {
  columns: NodeListOf<HTMLElement & { width?: string; col?: number }>;
  rows: NodeListOf<HTMLElement>;
  columnLayout: 'fixed' | 'flex';
};

export class ColumnGroupSizeController {
  constructor(private host: ReactiveControllerHost & Grid) {}

  initializeColumnWidths() {
    if (this.host.columnLayout === 'fixed') {
      Array.from(this.host.columns)
        .filter(column => !column.width && !column.hidden)
        .map(column => [column, parseInt(getComputedStyle(column).width)])
        .forEach(([column, width]: any) =>
          this.host.style.setProperty(`--col-${column.col}-width`, column.width ? `${column.width}px` : `${width}px`)
        );
    }
  }

  calculateGridColumnWidths() {
    const colWidths = Array.from(this.host.columns)
      .filter(c => !c.hidden)
      .reduce((p, c) => {
        if (this.host.columnLayout === 'flex') {
          return `${p} ${`minmax(min-content, var(--col-${c.col}-width, ${c.width ? `${c.width}px` : '1fr'}))`}`;
        } else {
          return `${p} ${`var(--col-${c.col}-width, ${c.width ? `${c.width}px` : '1fr'})`}`; // TODO: needs min width set, min-content works but restricts width
        }
      }, '');
    this.host.style.setProperty('--grid-template-columns', colWidths);
  }
}
