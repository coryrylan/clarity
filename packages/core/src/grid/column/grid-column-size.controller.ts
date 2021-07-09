import { supportsAdoptingStyleSheets } from '@cds/core/internal';
import { ReactiveControllerHost } from 'lit';

export type GridColumnSize = ReactiveControllerHost & HTMLElement & {
  colIndex: number;
  position: 'initial' | 'sticky' | 'fixed';
  width?: string;
};

export class GridColumnSizeController {
  private globalStyle = supportsAdoptingStyleSheets() ? new CSSStyleSheet() : null;

  get hostGrid() {
    return this.host.parentElement as HTMLElement & { _id: string };
  }

  constructor(private host: GridColumnSize) {
    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle];
    }
  }

  setWidth() {
    this.hostGrid.style.setProperty(
      `--col-${this.host.colIndex}-width`,
      this.host.width
        ? `${this.host.width}px`
        : `${Math.max(100, parseInt(getComputedStyle(this.host).width)) + this.host.width}px`
    );
  }

  resize(width: number) {
    const updatedWidth = parseInt(getComputedStyle(this.host).width) + width;
    this.hostGrid.style.setProperty(`--col-${this.host.colIndex}-width`, `${updatedWidth}px`);
    this.host.dispatchEvent(new CustomEvent('widthChange', { detail: updatedWidth, bubbles: true }));
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
