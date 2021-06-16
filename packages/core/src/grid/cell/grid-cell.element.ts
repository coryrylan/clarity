import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;

  @state({ type: Number, reflect: true, attribute: 'aria-colindex' }) colIndex: number = null;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'gridcell';

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div part="cell">
        <slot></slot>
      </div>
    `;
  }
}
