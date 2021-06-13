import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import styles from './grid-footer.element.scss';

export class CdsGridFooter extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: String, reflect: true }) slot = 'footer';

  render() {
    return html`
      <div class="private-host">
        <slot></slot>
      </div>
    `;
  }
}
