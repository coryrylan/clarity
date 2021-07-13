import { LitElement, html } from 'lit';
import { baseStyles, state } from '@cds/core/internal';
import { GridCellA11yController } from './grid-cell-a11y.controller.js';
import styles from './grid-cell.element.scss';

export class CdsGridCell extends LitElement {
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

  // async performUpdate() {
  //   await new Promise((resolve: any) => setTimeout(() => resolve()));
  //   return super.performUpdate();
  // }
}
