import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';
import styles from './sort-button.element.scss';

export class CdsGridInternalSortButton extends LitElement {
  @property({ type: String, reflect: true }) sort?: 'none' | 'ascending' | 'descending';

  static styles = [baseStyles, styles];

  render() {
    return html`
      <cds-action-button aria-label="sort column" @click=${this.sortClick}>
        <div cds-layout="vertical align:center">
          <cds-icon shape="angle" direction="up" inner-offset="2" size="14"></cds-icon>
          <cds-icon shape="angle" direction="down" inner-offset="2" size="14"></cds-icon>
        </div>
      </cds-action-button>
    `;
  }

  private sortClick() {
    let sort = this.sort;
    switch (sort) {
      case 'ascending':
        sort = 'descending';
        break;
      case 'descending':
        sort = 'none';
        break;
      case 'none':
        sort = 'ascending';
    }

    this.dispatchEvent(new CustomEvent('sortChange', { detail: sort, bubbles: true }));
  }
}
