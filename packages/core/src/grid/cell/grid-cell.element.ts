import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;

  @state({ type: Number }) colIndex: number = null;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="cell">
        <slot></slot>
      </div>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.setAttribute('role', 'gridcell');
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (props.has('colIndex') && props.get('colIndex') !== this.colIndex) {
      this.setAttribute('aria-colindex', `${this.colIndex}`);
    }
  }
}
