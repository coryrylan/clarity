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
  private panelCount = 0;
  private _panels: { [id: number]: AccordionPanelModel } = {};
  private _strategy = ClrAccordionStrategy.Default;

  get panels(): AccordionPanelModel[] {
    return Object.keys(this._panels).map(id => this._panels[id]);
  }

  get allPanelsCompleted(): boolean {
    return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
  }

  get strategy(): ClrAccordionStrategy {
    return this._strategy;
  }

  setStrategy(strategy: ClrAccordionStrategy) {
    this._strategy = strategy;
  }

  syncPanels(ids: string[]) {
    this.updatePanelOrder(ids);
    this.removeOldPanels(ids);
  }

  addPanel(id: string, open = false) {
    const panel = new AccordionPanelModel(id, this.accordionCount);
    panel.open = open;

    if (this.strategy === ClrAccordionStrategy.Forms) {
      panel.open = this.panelCount++ === 0;
      panel.disabled = true;
    }

    this._panels[panel.id] = panel;
  }

  resetPanels() {
    this.panels.forEach((s, index) => {
      const panel = this._panels[s.id];
      panel.status = AccordionStatus.Inactive;
      panel.open = false;

      if (index === 0) {
        panel.status = AccordionStatus.Inactive;
        panel.open = true;
      }

      return panel;
    });
  }

  navigateToPanel(panelId: string) {
    const panelOpen = this._panels[panelId].open;

    if (this.strategy === ClrAccordionStrategy.Default) {
      this.closeAllPanels();
      this._panels[panelId].open = !panelOpen;
    }

    if (this.strategy === ClrAccordionStrategy.Multi) {
      this._panels[panelId].open = !panelOpen;
    }

    if (this.strategy === ClrAccordionStrategy.Forms) {
      this.navigateToPreviouslyCompletedPanel(panelId);
    }
  }

  navigateToNextPanel(currentPanelId: string, currentPanelValid = true) {
    if (currentPanelValid) {
      const nextPanel = this.panels.find(s => s.index === this._panels[currentPanelId].index + 1);
      this.completePanel(currentPanelId);

      if (nextPanel) {
        this.resetAllFuturePanels(nextPanel);
        this._panels[nextPanel.id].open = true;
      } else {
        this.closeAllCompletedPanels();
      }
    } else {
      this._panels[currentPanelId].status = AccordionStatus.Error;
      this.closeAllCompletedPanels();
    }
  }

  overrideInitialPanel(panelId: string) {
    if (this._panels[panelId]) {
      this.panels.forEach(panel => {
        if (panel.index < this._panels[panelId].index) {
          this.completePanel(panel.id);
        } else if (panel.id === panelId) {
          this._panels[panel.id].open = true;
        } else {
          this._panels[panel.id].open = false;
        }
      });
    }
  }

  setPanelsWithErrors(ids: string[]) {
    ids.forEach(id => {
      this._panels[id].open = true;
      this._panels[id].status = AccordionStatus.Error;
    });
  }

  private closeAllPanels() {
    this.panels.forEach(panel => (this._panels[panel.id].open = false));
  }

  private navigateToPreviouslyCompletedPanel(panelId: string) {
    if (this._panels[panelId].status === AccordionStatus.Complete) {
      this._panels[panelId].open = !this._panels[panelId].open;
    }
  }

  private getNumberOfOpenPanels() {
    return this.panels.reduce((prev, next) => (next.open !== false ? prev + 1 : prev), 0);
  }

  private closeAllCompletedPanels() {
    this.panels.forEach(panel => {
      if (panel.status === AccordionStatus.Complete) {
        this._panels[panel.id].open = false;
      }
    });
  }

  private completePanel(panelId: string) {
    this._panels[panelId].status = AccordionStatus.Complete;
    this._panels[panelId].disabled = false;
    this._panels[panelId].open = false;
  }

  private getNumberOfIncompletePanels() {
    return this.panels.reduce((prev, next) => (next.status !== AccordionStatus.Complete ? prev + 1 : prev), 0);
  }

  private resetAllFuturePanels(nextPanel: AccordionPanelModel) {
    // we close all future panels to in case future panels depend on prior panel values
    this.panels.forEach(panel => {
      if (panel.index >= nextPanel.index) {
        panel.status = AccordionStatus.Inactive;
        panel.open = false;
      }
    });
  }

  private updatePanelOrder(ids: string[]) {
    ids.forEach((id, index) => {
      if (this._panels[id]) {
        this._panels[id].index = index;
        this._panels[id].isLastPanel = index === ids.length - 1;
      }
    });
  }

  private removeOldPanels(ids: string[]) {
    this.panels.forEach(panel => {
      if (ids.find(id => id === panel.id) === undefined) {
        delete this._panels[panel.id];
      }
    });
  }
}
