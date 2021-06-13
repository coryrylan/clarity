import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;

  @property({
    type: Number,
    reflect: true,
    attribute: 'aria-colindex',
    converter: {
      toAttribute: (value: number) => value + 1,
      fromAttribute: (value: string) => parseInt(value) - 1,
    },
  })
  col: number = null;

  // @property({ type: String, attribute: 'cds-key-item' }) cdsKeyItem: 'active' | null = null;
  // @property({ type: Number, attribute: 'tabindex' }) tabIndex = -1;

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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'gridcell');
  }
}
