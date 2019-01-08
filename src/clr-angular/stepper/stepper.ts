/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - "/Process" directory for wizard and stepper
  - Utils folder for common wiz / stepper
  - Check out default animation times, similar to stacker
  - clrStepNextButton (*template for reducing duplication)
  - Completed steps A11y color issues
  - clrStepIf error/success
  - clrIfExpanded
  - support reactive and template form syntax
  - https://www.w3.org/WAI/tutorials/forms/grouping/
  - submit event issue with content projection
*/

import { Component, Output, ContentChildren, EventEmitter, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form[clrFormStepper]',
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
  @Output('clrStepperComplete') stepperComplete = new EventEmitter<boolean>();
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

  forceNextStep() {
    this.stepperService.nextStep();
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
      .subscribe(steps => this.stepperService.updateStepOrder(steps.toArray().map(s => s.id)));
  }

  private listenForStepsCompleted() {
    return this.stepperService.stepsCompleted.subscribe(() => this.stepperComplete.emit(true));
  }
}
