/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ContentChildren, QueryList, ChangeDetectionStrategy, Input } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AccordionService } from './providers/accordion.service';
import { ClrAccordionPanel } from './accordion-panel';
import { ClrAccordionStrategy } from './enums/accordion-strategy.enum';

@Component({
  selector: 'clr-accordion',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-accordion]': 'true' },
  providers: [AccordionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrAccordion {
  @Input('clrAccordionMultiPanel') multiPanel = false;
  @ContentChildren(ClrAccordionPanel, { descendants: true })
  panels: QueryList<ClrAccordionPanel>;
  subscriptions: Subscription[] = [];

  constructor(private accordionService: AccordionService) {}

  ngOnInit() {
    if (this.multiPanel) {
      this.accordionService.setStrategy(ClrAccordionStrategy.Multi);
    } else {
      this.accordionService.setStrategy(ClrAccordionStrategy.Default);
    }
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.listenForDOMChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private listenForDOMChanges() {
    return this.panels.changes
      .pipe(startWith(this.panels))
      .subscribe(panels => this.accordionService.syncPanels(panels.toArray().map((p: ClrAccordionPanel) => p.name)));
  }
}
