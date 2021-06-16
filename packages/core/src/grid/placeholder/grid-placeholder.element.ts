import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import styles from './grid-placeholder.element.scss';

export class CdsGridPlaceholder extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: String, reflect: true }) slot = 'placeholder';

  render() {
    return html`
      <div class="private-host" tabindex="0">
        <slot>
          <cds-icon shape="filter" size="xl"></cds-icon>
        </slot>
      </div>
    `;
  }
}
