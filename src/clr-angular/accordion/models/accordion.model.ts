/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AccordionStrategy } from '../enums/accordion-strategy.enum';
import { AccordionStatus } from '../enums/accordion-status.enum';

let accordionCount = 0;

export class AccordionPanelModel {
  status = AccordionStatus.Inactive;
  index: number = null;
  disabled = false;
  open = false;
  constructor(public id: string, public accordionId: number) {}
}

export class AccordionModel {
  protected strategy = AccordionStrategy.Default;
  protected accordionCount = accordionCount++;
  protected _panels: { [id: string]: AccordionPanelModel } = {};

  get panels(): AccordionPanelModel[] {
    return Object.keys(this._panels).map(id => this._panels[id]);
  }

  setStrategy(strategy: AccordionStrategy) {
    this.strategy = strategy;
  }

  syncPanels(ids: string[]) {
    this.updatePanelOrder(ids);
    this.removeOldPanels(ids);
  }

  addPanel(id: string, open = false) {
    this._panels[id] = new AccordionPanelModel(id, this.accordionCount);
    this._panels[id].open = open;
  }

  navigateToPanel(panelId: string) {
    const panelIsOpen = this._panels[panelId].open;
    if (this.strategy === AccordionStrategy.Default) {
      this.closeAllPanels();
    }

    this._panels[panelId].open = !panelIsOpen;
  }

  private closeAllPanels() {
    this.panels.forEach(panel => (this._panels[panel.id].open = false));
  }

  private updatePanelOrder(ids: string[]) {
    ids.forEach((id, index) => (this._panels[id].index = index));
  }

  private removeOldPanels(ids: string[]) {
    this.panels
      .filter(panel => ids.find(id => id === panel.id) === undefined)
      .forEach(panel => delete this._panels[panel.id]);
  }
}
