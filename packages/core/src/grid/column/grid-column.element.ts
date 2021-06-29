import { LitElement, html } from 'lit';
import { baseStyles, EventEmitter, property, state, supportsAdoptingStyleSheets, event } from '@cds/core/internal';
import styles from './grid-column.element.scss';

export class CdsGridColumn extends LitElement {
  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) width?: string;

  @event() sortChange: EventEmitter<string>;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'columnheader';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  @state({ type: Number, reflect: true, attribute: 'aria-colindex' }) col: number = null;

  private globalStyle = supportsAdoptingStyleSheets ? new CSSStyleSheet() : null;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <div cds-layout="horizontal fill gap:md align:vertical-center wrap:none">
          <slot></slot>
        </div>
        <cds-action-resize
          .readonly=${!this.resizable}
          @resizeChange=${(e: any) => this.resize(e.detail)}
        ></cds-action-resize>
        <div class="line"></div>
      </div>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    if (this.globalStyle) {
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, this.globalStyle as any];
    }
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (
      (this.col !== null && this.position !== null && props.get('position')) ||
      (this.col !== null && this.position !== 'initial')
    ) {
      this.calculateColumnPositionStyles();
    }

    if (props.has('width') && this.width !== props.get('width') && this.width && this.col !== null) {
      (this.parentElement as HTMLElement).style.setProperty(
        `--col-${this.col}-width`,
        this.width ? `${this.width}px` : `${Math.max(100, parseInt(getComputedStyle(this).width)) + this.width}px`
      );
    }
  }

  private resize(width: number) {
    const updatedWidth = parseInt(getComputedStyle(this).width) + width;
    this.parentElement.style.setProperty(`--col-${this.col}-width`, `${updatedWidth}px`);
    this.dispatchEvent(new CustomEvent('widthChange', { detail: updatedWidth, bubbles: true }));
  }

  private calculateColumnPositionStyles() {
    const position = this.getBoundingClientRect();
    const gridPosition = this.parentElement.getBoundingClientRect();
    const offsetLeft = this.offsetLeft;
    const side = offsetLeft < gridPosition.width / 2 ? 'left' : 'right';
    const left = this.position === 'fixed' ? `${position.left - gridPosition.left - 1}px` : 'initial';
    const right = this.position === 'fixed' ? `${position.right - position.left - position.width}px` : 'initial';

    (this.globalStyle as any).replaceSync(`
      [__id='${(this.parentElement as any)._id}'] cds-grid-column:nth-child(${this.col}),
      [__id='${(this.parentElement as any)._id}'] cds-grid-cell:nth-child(${this.col}) {
        ${side === 'left' ? `left: ${left};` : ''}
        ${this.position === 'sticky' ? `left: 0px;` : ''}
        ${side === 'right' ? `right: ${right};` : ''}
      }

      ${
        this.position !== 'initial'
          ? `
        [__id='${(this.parentElement as any)._id}'] cds-grid-cell:nth-child(${this.col}) {
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
