/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AccordionStatus } from '../enums/accordion-status.enum';
import { AccordionPanelModel } from './accordion-panel.model';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

let accordionCount = 0;

export class AccordionModel {
  private accordionCount = accordionCount++;
  private strategy = ClrAccordionStrategy.Default;
  private _panels: { [id: string]: AccordionPanelModel } = {};

  get panels(): AccordionPanelModel[] {
    return Object.keys(this._panels).map(id => this._panels[id]);
  }

  get allPanelsCompleted(): boolean {
    return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
  }

  setStrategy(strategy: ClrAccordionStrategy) {
    this.strategy = strategy;
  }

  syncPanels(ids: string[]) {
    this.updatePanelOrder(ids);
    this.removeOldPanels(ids);
  }

  addPanel(id: string, open = false) {
    this._panels[id] = new AccordionPanelModel(id, this.accordionCount, this.strategy, open);
  }

  resetPanels() {
    this.panels.forEach(p => this._panels[p.id].reset());
  }

  setPanelsWithErrors(ids: string[]) {
    ids.forEach(id => this._panels[id].setError());
  }

  navigateToPanel(panelId: string) {
    if (this.strategy === ClrAccordionStrategy.Default) {
      this.closeAllPanels();
    }

    if (this.strategy !== ClrAccordionStrategy.Forms || this._panels[panelId].status === AccordionStatus.Complete) {
      this._panels[panelId].toggle();
    }
  }

  navigateToNextPanel(currentPanelId: string, currentPanelValid = true) {
    if (currentPanelValid) {
      this._panels[currentPanelId].complete();
      this.openNextPanel(this._panels[currentPanelId].id);
    } else {
      this.setPanelError(currentPanelId);
    }
  }

  overrideInitialPanel(panelId: string) {
    this.panels.forEach(panel => {
      if (panel.index < this._panels[panelId].index) {
        this._panels[panel.id].complete();
      } else if (panel.id === panelId) {
        this._panels[panel.id].open();
      } else {
        this._panels[panel.id].close();
      }
    });
  }

  private openNextPanel(currentPanelId: string) {
    const nextPanel = this.panels.find(s => s.index === this._panels[currentPanelId].index + 1);

    if (nextPanel) {
      this.resetAllFuturePanels(nextPanel.id);
      this._panels[nextPanel.id].open();
    }
  }

  private setPanelError(panelId: string) {
    this.resetAllFuturePanels(panelId);
    this._panels[panelId].setError();
  }

  private closeAllPanels() {
    this.panels.forEach(panel => this._panels[panel.id].close());
  }

  private getNumberOfOpenPanels() {
    return this.panels.reduce((prev, next) => (next.isOpen !== false ? prev + 1 : prev), 0);
  }

  private getNumberOfIncompletePanels() {
    return this.panels.reduce((prev, next) => (next.status !== AccordionStatus.Complete ? prev + 1 : prev), 0);
  }

  private resetAllFuturePanels(panelId: string) {
    this.panels
      .filter(panel => panel.index >= this._panels[panelId].index)
      .forEach(panel => panel.reset());
  }

  private updatePanelOrder(ids: string[]) {
    ids.forEach((id, index) => this._panels[id].updateIndex(index));
  }

  private removeOldPanels(ids: string[]) {
    this.panels
      .filter(panel => ids.find(id => id === panel.id) === undefined)
      .forEach(panel => delete this._panels[panel.id]);
  }
}
