import { LitElement, html } from 'lit';
import { baseStyles, state } from '@cds/core/internal';
import styles from './grid-cell.element.scss';
import { GridCellA11yController } from './grid-cell-a11y.controller.js';

export class CdsGridCell extends LitElement {
  // @property({ type: Boolean, reflect: true }) active = false;

  @state({ type: Number }) colIndex: number = null;

  static styles = [baseStyles, styles];

  protected gridCellA11yController = new GridCellA11yController(this);

  render() {
    return html`
      <div part="cell">
        <slot></slot>
      </div>
    `;
  }
}
