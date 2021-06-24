import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import { classMap } from 'lit/directives/class-map.js';
import styles from './grid-column.element.scss';

export const supportsAdoptingStyleSheets =
  window.ShadowRoot &&
  ((window as any).ShadyCSS === undefined || (window as any).ShadyCSS.nativeShadow) &&
  'adoptedStyleSheets' in Document.prototype &&
  'replace' in CSSStyleSheet.prototype;

export class CdsGridColumn extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: String, reflect: true, attribute: 'aria-sort' }) sort?:
    | 'none'
    | 'ascending'
    | 'descending'
    | null = null;

  @property({ type: Boolean }) hidden: boolean = false;

  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) width: string | null = null;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'columnheader';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  @state({ type: Number, reflect: true, attribute: 'aria-colindex' }) col: number = null;

  private globalStyle = supportsAdoptingStyleSheets ? new CSSStyleSheet() : null;

  render() {
    return html`
      <div part="column">
        <div cds-layout="horizontal fill gap:md">
          <slot></slot>
        </div>

        ${this.sort
          ? html`
              <cds-action-button
                aria-label="sort column"
                @click=${this.sortClick}
                class=${classMap({
                  sort: true,
                  ascending: this.sort === 'ascending',
                  descending: this.sort === 'descending',
                })}
              >
                <div cds-layout="vertical align:center">
                  <cds-icon shape="angle" direction="up" inner-offset="2" size="14"></cds-icon>
                  <cds-icon shape="angle" direction="down" inner-offset="2" size="14"></cds-icon>
                </div>
              </cds-action-button>
            `
          : ''}
        <cds-action-button ?disabled=${!this.resizable} id="line" aria-label="resize column">
          <cds-icon shape="minus" direction="right" size="28" inner-offset="6"></cds-icon>
        </cds-action-button>
      </div>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    if (this.resizable) {
      this.listenForMouseResize();
      this.listenForKeyboardResize();
    }

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

    if (props.has('width') && this.width !== props.get('width') && this.width !== null && this.col !== null) {
      (this.parentElement as HTMLElement).style.setProperty(
        `--col-${this.col}-width`,
        this.width ? `${this.width}px` : `${Math.max(100, parseInt(getComputedStyle(this).width)) + this.width}px`
      );
    }
  }

  private sortClick() {
    let sort = this.sort;
    switch (sort) {
      case 'ascending':
        sort = 'descending';
        break;
      case 'descending':
        sort = 'none';
        break;
      case 'none':
        sort = 'ascending';
    }

    this.dispatchEvent(new CustomEvent('sortChange', { detail: sort, bubbles: true }));
  }

  private listenForMouseResize() {
    const host = this;
    let m_pos: any;
    const button = this.shadowRoot.querySelector('#line');
    button.addEventListener(
      'mousedown',
      (e: any) => {
        m_pos = e.x;
        document.addEventListener('mousemove', resize, false);
      },
      false
    );

    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', resize, false);
      },
      false
    );

    function resize(e: any) {
      requestAnimationFrame(() => {
        const dx = m_pos - e.x;
        m_pos = e.x;
        host.resize(parseInt(getComputedStyle(host).width) - dx);
      });
    }
  }

  private listenForKeyboardResize() {
    this.shadowRoot.querySelector('#line').addEventListener('keydown', (e: any) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.resize(parseInt(getComputedStyle(this).width) - 10);
      }

      if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.resize(parseInt(getComputedStyle(this).width) + 10);
      }
    });
  }

  private resize(width: number) {
    console.log(width);
    if (this.resizable) {
      this.width = `${width}`;
      this.parentElement.style.setProperty(`--col-${this.col}-width`, `${this.width}px`);
      this.dispatchEvent(new CustomEvent('widthChange', { detail: this.width, bubbles: true }));
    }
  }

  private calculateColumnPositionStyles() {
    const position = this.getBoundingClientRect();
    const gridPosition = this.parentElement.getBoundingClientRect();
    const offsetLeft = this.offsetLeft;
    const side = offsetLeft < gridPosition.width / 2 ? 'left' : 'right';

    (this.globalStyle as any).replaceSync(`
      [__id='${(this.parentElement as any)._id}'] cds-grid-column:nth-child(${this.col}),
      [__id='${(this.parentElement as any)._id}'] cds-grid-cell:nth-child(${this.col}) {
        ${
          side === 'left'
            ? `left: ${this.position === 'fixed' ? `${position.left - gridPosition.left - 1}px` : 'initial'};`
            : ''
        }
        ${this.position === 'sticky' ? `left: 0px;` : ''}
        ${
          side === 'right'
            ? `right: ${
                this.position === 'fixed' ? `${position.right - position.left - position.width}px` : 'initial'
              };`
            : ''
        }
      }
      
      ${
        this.position !== 'initial'
          ? `
      [__id='${(this.parentElement as any)._id}'] cds-grid-cell:nth-child(${this.col}) {
        border-${
          side === 'left' ? 'right' : 'left'
        }: var(--cds-alias-object-border-width-100) solid var(--cds-alias-object-border-color);
        z-index: 98;
      }
      `
          : ''
      }
    `);
  }
}
