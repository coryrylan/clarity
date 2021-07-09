import { ReactiveControllerHost } from 'lit';

export type GridCellA11y = ReactiveControllerHost & HTMLElement & { colIndex: number };

export class GridCellA11yController {
  private firstUpdated = false;

  constructor(private host: GridCellA11y) {
    host.addController(this);
  }

  async hostUpdated() {
    await this.host.updateComplete;

    if (!this.firstUpdated) {
      this.firstUpdated = true;
      this.host.setAttribute('role', 'gridcell');
    }

    this.host.setAttribute('aria-colindex', `${this.host.colIndex}`);
  }
}