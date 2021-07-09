import { ReactiveControllerHost } from 'lit';

export type GridColumnA11y = ReactiveControllerHost & HTMLElement & { colIndex: number };

export class GridColumnA11yController {
  private firstUpdated = false;

  constructor(private host: GridColumnA11y) {
    host.addController(this);
  }

  async hostUpdated() {
    await this.host.updateComplete;

    if (!this.firstUpdated) {
      this.firstUpdated = true;
      this.host.setAttribute('role', 'columnheader');
    }

    this.host.setAttribute('aria-colindex', `${this.host.colIndex}`);
  }
}
