import { LitElement, html } from 'lit';
import { baseStyles, property, propUpdated, state } from '@cds/core/internal';
import styles from './grid-column.element.scss';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnA11yController } from './grid-column-a11y.controller.js';

export class CdsGridColumn extends LitElement {
  @property({ type: String }) position: 'initial' | 'sticky' | 'fixed' = 'initial';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) width?: string;

  @state({ type: Number }) colIndex: number = null;

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  protected gridColumnSizeController = new GridColumnSizeController(this);

  protected gridColumnA11yController = new GridColumnA11yController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <div cds-layout="horizontal fill gap:md align:vertical-center wrap:none">
          <slot></slot>
        </div>
        <cds-action-resize .readonly=${!this.resizable} @resizeChange=${this.resize}
        ></cds-action-resize>
        <div class="line"></div>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (
      (this.colIndex !== null && this.position !== null && props.get('position')) ||
      (this.colIndex !== null && this.position !== 'initial')
    ) {
      this.gridColumnSizeController.calculateColumnPositionStyles();
    }

    if (propUpdated(this, props, 'width') && this.width && this.colIndex !== null) {
      this.gridColumnSizeController.setWidth();
    }
  }

  private resize(e: any) {
    this.gridColumnSizeController.resize(e.detail);
  }
}
