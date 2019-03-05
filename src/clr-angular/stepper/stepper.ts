/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - "/process" directory for wizard and stepper
  - Check out default animation times, similar to stacker
  - Completed steps A11y color issues need to be addressed
  - clrStepIf error/success
  - clrIfExpanded
  - Dependents true for content children
  - clr-step-content *clrIfActive (IfActiveService) utils/conditional (Tabs)
*/

import { Component, ContentChildren, QueryList, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'form[clrStepper]',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-stepper]': 'true' },
  providers: [StepperService],
})
export class ClrFormStepper {
  @ContentChildren(ClrStep) steps: QueryList<ClrStep>;
  subscriptions: Subscription[] = [];

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private ngForm: NgForm,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.listenForStepsCompleted());
    this.subscriptions.push(this.listenForFormResetChanges());
  }

  ngAfterContentInit() {
    this.subscriptions.push(this.listenForStepChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private listenForFormResetChanges() {
    const form = this.formGroup ? this.formGroup : this.ngForm;

    return form.statusChanges.subscribe(() => {
      // workaround for https://github.com/angular/angular/issues/10887
      setTimeout(() => {
        if (form.pristine) {
          this.stepperService.resetSteps();
        }
      });
    });
  }

  private listenForStepChanges() {
    return this.steps.changes
      .pipe(startWith(this.steps))
      .subscribe(steps => this.stepperService.syncSteps(steps.toArray().map(s => s.id)));
  }

  private listenForStepsCompleted() {
    // We manually trigger ngSubmit when all steps are complete, including updating prior steps.
    return this.stepperService.stepsCompleted.subscribe(() => {
      const form = this.formGroup ? this.formGroup : this.ngForm;
      form.ngSubmit.emit();
    });
  }
}
