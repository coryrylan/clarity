/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  Optional,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { startWith, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AccordionService } from '../providers/accordion.service';
import { ClrAccordionPanel } from '../accordion-panel';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

@Component({
  selector: 'form[clrStepper]',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-accordion]': 'true' },
  providers: [AccordionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStepper {
  @Input('clrInitialStep') initialPanel: string;
  @ContentChildren(ClrAccordionPanel, { descendants: true })
  panels: QueryList<ClrAccordionPanel>;
  subscriptions: Subscription[] = [];
  form: FormGroupDirective | NgForm;

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private ngForm: NgForm,
    private accordionService: AccordionService
  ) {}

  ngOnInit() {
    this.form = this.formGroup ? this.formGroup : this.ngForm;
    this.accordionService.setStrategy(ClrAccordionStrategy.Forms);
    this.subscriptions.push(this.listenForPanelsCompleted());
    this.subscriptions.push(this.listenForFormResetChanges());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialPanel && changes.initialPanel.currentValue !== changes.initialPanel.previousValue) {
      this.accordionService.overrideInitialPanel(this.initialPanel);
    }
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.listenForDOMChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private listenForFormResetChanges() {
    return this.form.statusChanges
      .pipe(filter(() => this.form.pristine)) // https://github.com/angular/angular/issues/10887
      .subscribe(() => this.accordionService.resetPanels());
  }

  private listenForPanelsCompleted() {
    return this.accordionService.panelsCompleted.subscribe(panelsCompleted => {
      if (panelsCompleted && this.form.valid) {
        this.form.ngSubmit.emit();
      } else if (!this.form.valid && this.form.touched) {
        this.setPanelsWithFormErrors();
      }
    });
  }

  private setPanelsWithFormErrors() {
    const panelsWithErrors = this.panels.reduce(
      (panels, panel) => (panel.formGroup.invalid ? [...panels, panel.name] : panels),
      []
    );
    this.accordionService.setPanelsWithErrors(panelsWithErrors);
  }

  private listenForDOMChanges() {
    return this.panels.changes.pipe(startWith(this.panels)).subscribe(panels => {
      this.accordionService.syncPanels(panels.toArray().map((p: ClrAccordionPanel) => p.name));

      if (this.initialPanel) {
        this.accordionService.overrideInitialPanel(this.initialPanel);
      }
    });
  }
}
