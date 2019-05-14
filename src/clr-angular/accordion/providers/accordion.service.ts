/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { AccordionModel } from '../models/accordion.model';
import { AccordionPanelModel } from '../models/accordion-panel.model';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

@Injectable()
export class AccordionService {
  private accordionModel = new AccordionModel();
  private readonly _panelsChanges = new BehaviorSubject<AccordionPanelModel[]>(this.accordionModel.panels);
  readonly panels = this._panelsChanges.asObservable();
  readonly panelsCompleted = this.getAllPanelsCompletedChanges();

  get strategy() {
    return this.accordionModel.strategy;
  }

  setStrategy(strategy: ClrAccordionStrategy) {
    this.accordionModel.setStrategy(strategy);
  }

  getPanelChanges(panelId: string) {
    return this.panels.pipe(map(panels => panels.find(s => s.id === panelId)));
  }

  addPanel(panelId: string, open = false) {
    this.accordionModel.addPanel(panelId, open);
    this.emitUpdatedPanels();
  }

  resetPanels() {
    this.accordionModel.resetPanels();
    this.emitUpdatedPanels();
  }

  navigateToNextPanel(currentPanelId: string, currentPanelValid = true) {
    this.accordionModel.navigateToNextPanel(currentPanelId, currentPanelValid);
    this.emitUpdatedPanels();
  }

  navigateToPanel(panelId: string) {
    this.accordionModel.navigateToPanel(panelId);
    this.emitUpdatedPanels();
  }

  overrideInitialPanel(panelId: string) {
    this.accordionModel.overrideInitialPanel(panelId);
    this.emitUpdatedPanels();
  }

  syncPanels(ids: string[]) {
    this.accordionModel.syncPanels(ids);
    this.emitUpdatedPanels();
  }

  setPanelsWithErrors(ids: string[]) {
    this.accordionModel.setPanelsWithErrors(ids);
    this.emitUpdatedPanels();
  }

  private emitUpdatedPanels() {
    this._panelsChanges.next(this.accordionModel.panels);
  }

  private getAllPanelsCompletedChanges() {
    return this.panels.pipe(map(() => this.accordionModel.allPanelsCompleted), distinctUntilChanged());
  }
}
