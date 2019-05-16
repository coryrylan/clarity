/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccordionModel, AccordionPanelModel } from '../models/accordion.model';
import { AccordionStrategy } from '../enums/accordion-strategy.enum';

@Injectable()
export class AccordionService {
  protected accordion = new AccordionModel();
  protected readonly _panelsChanges = new BehaviorSubject<AccordionPanelModel[]>(this.accordion.panels);

  setStrategy(strategy: AccordionStrategy) {
    this.accordion.setStrategy(strategy);
  }

  getPanelChanges(panelId: string) {
    return this._panelsChanges.pipe(map(panels => panels.find(s => s.id === panelId)));
  }

  addPanel(panelId: string, open = false) {
    this.accordion.addPanel(panelId, open);
    this.emitUpdatedPanels();
  }

  navigateToPanel(panelId: string) {
    this.accordion.navigateToPanel(panelId);
    this.emitUpdatedPanels();
  }

  syncPanels(ids: string[]) {
    this.accordion.syncPanels(ids);
    this.emitUpdatedPanels();
  }

  protected emitUpdatedPanels() {
    this._panelsChanges.next(this.accordion.panels);
  }
}
