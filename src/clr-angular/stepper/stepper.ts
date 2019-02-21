/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - support ngModel / template forms
  - support non form stepper?
  - "/process" directory for wizard and stepper
  - Check out default animation times, similar to stacker
  - Completed steps A11y color issues need to be addressed
  - clrStepIf error/success
  - clrIfExpanded
  - Dependents true for content children
  - Template forms first before structural directives 
  - clr-step-content *clrIfActive (IfActiveService) utils/conditional (Tabs)
*/

import { Component, ContentChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form[clrStepper]',
  template: `
    <ng-template #stepButtons>
      <ng-content select="[clrStepButton]"></ng-content>
    </ng-template>
    <ng-content></ng-content>
  `,
  host: { '[class.clr-stepper]': 'true' },
  providers: [StepperService],
})
export class ClrFormStepper {
  @ContentChildren(ClrStep) steps: QueryList<ClrStep>;
  @ViewChild('stepButtons') stepButtons: TemplateRef<any>;
  subscriptions: Subscription[] = [];

  constructor(private formGroup: FormGroupDirective, private stepperService: StepperService) {}

  ngOnInit() {
    this.subscriptions.push(this.listenForStepsCompleted());
    this.subscriptions.push(this.listenForFormResetChanges());
    this.stepperService.stepButtons = this.stepButtons;
  }

  ngAfterContentInit() {
    this.subscriptions.push(this.listenForStepChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private listenForFormResetChanges() {
    // workaround for https://github.com/angular/angular/issues/10887
    return this.formGroup.statusChanges.subscribe(() => {
      setTimeout(() => {
        if (this.formGroup.pristine) {
          this.stepperService.reset();
        }
      });
    });
  }

  private listenForStepChanges() {
    return this.steps.changes
      .pipe(startWith(this.steps))
      .subscribe(steps => this.stepperService.syncStepOrder(steps.toArray().map(s => s.id)));
  }

  private listenForStepsCompleted() {
    // We manually trigger ngSubmit when all steps are complete, including updating prior steps.
    return this.stepperService.stepsCompleted.subscribe(() => this.formGroup.ngSubmit.emit());
  }
}
