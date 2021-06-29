import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';
import styles from './grid-column.element.scss';
import { ColumnSizeController } from './column-size.controller.js';

export class CdsGridColumn extends LitElement {
  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) width?: string;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'columnheader';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  @state({ type: Number, reflect: true, attribute: 'aria-colindex' }) col: number = null;

  protected columnSizeController = new ColumnSizeController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <div cds-layout="horizontal fill gap:md align:vertical-center wrap:none">
          <slot></slot>
        </div>
        <cds-action-resize
          .readonly=${!this.resizable}
          @resizeChange=${(e: any) => this.columnSizeController.resize(e.detail)}
        ></cds-action-resize>
        <div class="line"></div>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (
      (this.col !== null && this.position !== null && props.get('position')) ||
      (this.col !== null && this.position !== 'initial')
    ) {
      this.columnSizeController.calculateColumnPositionStyles();
    }

    if (props.has('width') && this.width !== props.get('width') && this.width && this.col !== null) {
      this.columnSizeController.setWidth();
    }
  }
}
