import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import { baseStyles, event, EventEmitter, property, state } from '@cds/core/internal';
import styles from './resize-button.element.scss';

export class CdsGridInternalResizeButton extends LitElement {
  @property({ type: Boolean }) resizable = false;

  @event() resizeChange: EventEmitter<number>;
  
  @state({ type: Boolean, reflect: true }) protected active = false;
  
  @query('cds-action-button', true) private button: HTMLButtonElement;

  static styles = [baseStyles, styles];

  render() {
    return html`
    <cds-action-button ?readonly=${!this.resizable} aria-label="resize column" @blur=${() => this.active = false}>
      <cds-icon shape="minus" direction="right" size="28" inner-offset="6"></cds-icon>
    </cds-action-button>
    <div class="line"></div>
  `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    if (this.resizable) {
      this.listenForMouseResize();
      this.listenForKeyboardResize();
    }
  }

  private listenForMouseResize() {
    const host = this;
    let m_pos: any;
    this.button.addEventListener(
      'mousedown',
      (e: any) => {
        host.active = true;
        m_pos = e.x;
        document.addEventListener('mousemove', resize, false);
      },
      false
    );

    document.addEventListener(
      'mouseup',
      () => {
        host.active = false;
        document.removeEventListener('mousemove', resize, false);
      },
      false
    );

    function resize(e: any) {
      requestAnimationFrame(() => {
        const dx = m_pos - e.x;
        m_pos = e.x;
        host.resizeChange.emit(parseInt(getComputedStyle(host.parentElement).width) - dx);
      });
    }
  }

  private listenForKeyboardResize() {
    this.button.addEventListener('keydown', (e: any) => {
      
      if (e.code === 'ArrowLeft') {
        this.active = true;
        e.preventDefault();
        this.resizeChange.emit(parseInt(getComputedStyle(this.parentElement).width) - 10);
      }

      if (e.code === 'ArrowRight') {
        this.active = true;
        e.preventDefault();
        this.resizeChange.emit(parseInt(getComputedStyle(this.parentElement).width) + 10);
      }
    });
  }
}
