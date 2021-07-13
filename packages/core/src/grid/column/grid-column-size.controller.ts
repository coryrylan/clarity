import { ReactiveControllerHost } from 'lit';
import { isNumericString, supportsAdoptingStyleSheets } from '@cds/core/internal';

export type GridColumnSize = ReactiveControllerHost & HTMLElement & {
  colIndex: number;
  width?: string;
};

export class GridColumnSizeController {
  private globalStyle = supportsAdoptingStyleSheets() ? new CSSStyleSheet() : null;

  get hostGrid() {
    return this.host.parentElement as HTMLElement;
  }

  constructor(private host: GridColumnSize) {
    host.addController(this as any);

    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle];
    }
  }

  setWidth() {
    this.hostGrid.style.setProperty(
      `--col-${this.host.colIndex}-width`,
      this.host.width
        ? `${this.host.width}${isNumericString(this.host.width) ? 'px' : ''}`
        : `${Math.max(100, parseInt(getComputedStyle(this.host).width))}px`
    );
  }

  resize(widthOffset: number) {
    const updatedWidth = parseInt(getComputedStyle(this.host).width) + widthOffset;
    this.hostGrid.style.setProperty(`--col-${this.host.colIndex}-width`, `${updatedWidth}px`);
    this.host.dispatchEvent(new CustomEvent('widthChange', { detail: updatedWidth, bubbles: true }));
  }
}
