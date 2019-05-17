/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ClrCommonStrings } from '../utils/i18n/common-strings.interface';
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

  constructor(
    public commonStrings: ClrCommonStrings,
    private accordionService: AccordionService,
    private ifExpandService: IfExpandService
  ) {}

  ngOnInit() {
    this.panel = this.accordionService.getPanelChanges(this.id).pipe(tap(panel => this.togglePanel(panel)));
    this.accordionService.addPanel(this.id, this.panelOpen);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.panel && changes.panelOpen.currentValue !== changes.panelOpen.previousValue) {
      this.accordionService.togglePanel(this.id, changes.panelOpen.currentValue);
    }
  }

  selectPanel() {
    this.accordionService.togglePanel(this.id);
  }

  collapsePanelOnAnimationDone(panel: AccordionPanelModel) {
    if (!panel.open) {
      this.ifExpandService.expanded = false;
    }
  }

  private togglePanel(panel: AccordionPanelModel) {
    this.panelOpenChange.emit(panel.open);

    if (panel.open) {
      this.ifExpandService.expanded = true;
    }
  }
}
