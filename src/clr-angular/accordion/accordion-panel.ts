/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AccordionService } from './providers/accordion.service';
import { AccordionStatus } from './enums/accordion-status.enum';
import { panelAnimation } from './utils/animation';
import { IfExpandService } from '../utils/conditional/if-expanded.service';
import { AccordionPanelModel } from './models/accordion.model';

let panelCount = 0;

@Component({
  selector: 'clr-accordion-panel',
  templateUrl: './accordion-panel.html',
  host: { '[class.clr-accordion-panel]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: panelAnimation,
  providers: [IfExpandService],
})
export class ClrAccordionPanel {
  @Input('clrAccordionPanelOpen') panelOpen = false;
  @Output('clrAccordionPanelOpenChange') panelOpenChange = new EventEmitter<boolean>();

  panel: Observable<AccordionPanelModel>;
  readonly AccordionStatus = AccordionStatus;
  private _id = `${panelCount++}`;

  get id() {
    return this._id;
  }

  constructor(private accordionService: AccordionService, private ifExpandService: IfExpandService) {}

  ngOnInit() {
    this.panel = this.accordionService.getPanelChanges(this.id).pipe(tap(panel => this.expandPanel(panel)));
    this.accordionService.addPanel(this.id, this.panelOpen);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.panel && changes.panelOpen.currentValue !== changes.panelOpen.previousValue) {
      this.selectPanel();
    }
  }

  selectPanel() {
    this.accordionService.navigateToPanel(this.id);
  }

  collapsePanel(panel: AccordionPanelModel) {
    if (!panel.open) {
      this.togglePanel(false);
    }
  }

  private expandPanel(panel: AccordionPanelModel) {
    if (panel.open) {
      this.togglePanel(true);
    }
  }

  private togglePanel(open: boolean) {
    this.ifExpandService.expanded = open;
    this.panelOpen = open;
    this.panelOpenChange.emit(open);
  }
}
