import { LitElement, html } from 'lit';
import '@cds/core/internal-components/close-button/register.js';
import { baseStyles, property } from '@cds/core/internal';
import { getTabableItems } from '../utils/utils.js';
import styles from './grid-detail.element.scss';

export class CdsGridDetail extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: String, reflect: true }) slot = 'detail';

  @property({ type: Boolean }) hidden = false;

  @property({ type: String }) anchor = '';

  private get dialog() {
    return this.shadowRoot.querySelector('dialog');
  }

  render() {
    return html`
      <dialog>
        <slot></slot>
        <!-- cds-internal-close-button has a severe re-calc performance bug -->
        <cds-action-button @click=${this.close} aria-label="close row details">
          <cds-icon shape="times"></cds-icon>
        </cds-action-button>
      </dialog>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);

    this.dialog.addEventListener('close', () => {
      if (!this.hidden) {
        this.close();
      }
    });

    this.getRootNode().addEventListener('keydown', (e: any) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('hidden') && props.get('hidden') !== undefined && props.get('hidden') !== this.hidden) {
      if (this.hidden) {
        this.dialog.close();
      } else {
        const focusableItem = getTabableItems(this)[0] as HTMLElement;

        if (focusableItem) {
          focusableItem.focus();
        } else {
          const firstElement = this.querySelector<HTMLElement>('*');
          firstElement.setAttribute('tabindex', '0');
          firstElement.focus();
        }
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.close();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('closeChange'));
    (this.getRootNode() as HTMLElement).querySelector<HTMLElement>(`#${this.anchor}`)?.focus();
  }
}
