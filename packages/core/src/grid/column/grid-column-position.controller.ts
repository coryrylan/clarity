import { supportsAdoptingStyleSheets } from '@cds/core/internal';
import { ReactiveControllerHost } from 'lit';

export type GridColumnPosition = ReactiveControllerHost & HTMLElement & {
  colIndex: number;
  position: 'initial' | 'sticky' | 'fixed';
};

export class GridColumnPositionController {
  private globalStyle = supportsAdoptingStyleSheets() ? new CSSStyleSheet() : null;

  get hostGrid() {
    return this.host.parentElement as HTMLElement & { _id: string };
  }

  constructor(private host: GridColumnPosition) {
    host.addController(this as any);

    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle];
    }
  }

  calculateColumnPositionStyles() {
    const position = this.host.getBoundingClientRect();
    const gridPosition = this.hostGrid.getBoundingClientRect();
    const offsetLeft = this.host.offsetLeft;
    const side = offsetLeft < gridPosition.width / 2 ? 'left' : 'right';
    const left = this.host.position === 'fixed' ? `${position.left - gridPosition.left - 1}px` : 'initial';
    const right = this.host.position === 'fixed' ? `${position.right - position.left - position.width}px` : 'initial';

    (this.globalStyle as any).replaceSync(`
      [__id='${this.hostGrid._id}'] cds-grid-column:nth-child(${this.host.colIndex}),
      [__id='${this.hostGrid._id}'] cds-grid-cell:nth-child(${this.host.colIndex}) {
        ${side === 'left' ? `left: ${left};` : ''}
        ${this.host.position === 'sticky' ? `left: 0px;` : ''}
        ${side === 'right' ? `right: ${right};` : ''}
      }

      ${
        this.host.position !== 'initial'
          ? `
        [__id='${this.hostGrid._id}'] cds-grid-cell:nth-child(${this.host.colIndex}) {
          --border-${
            side === 'left' ? 'right' : 'left'
          }: var(--cds-alias-object-border-width-100) solid var(--cds-alias-object-border-color);
          z-index: 98;
        }`
          : ''
      }
    `);
  }
}
