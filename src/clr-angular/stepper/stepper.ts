/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - documentation
  - additional test coverage
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

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { ClrStepperStrategy } from './models/step-collection.model';

@Component({
  selector: 'form[clrStepper], clr-stepper',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-stepper]': 'true' },
  providers: [StepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStepper {
  @Input('clrInitialStep') initialStep: string;
  @Input('clrMultiSteps') multiStep = false;
  @ContentChildren(ClrStep, { descendants: true })
  steps: QueryList<ClrStep>;
  subscriptions: Subscription[] = [];
  form: FormGroupDirective | NgForm;

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private ngForm: NgForm,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.initializeStrategy();

    if (this.stepperService.strategy === ClrStepperStrategy.Forms) {
      this.subscriptions.push(this.listenForStepsCompleted());
      this.subscriptions.push(this.listenForFormResetChanges());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.steps && changes.initialStep.currentValue !== changes.initialStep.previousValue) {
      this.stepperService.overrideInitialStep(this.initialStep);
    }
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.listenForDOMChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private initializeStrategy() {
    let strategy = ClrStepperStrategy.Default;
    this.form = this.formGroup ? this.formGroup : this.ngForm;

    if (this.form) {
      strategy = ClrStepperStrategy.Forms;
    }

    if (this.multiStep) {
      strategy = ClrStepperStrategy.Multi;
    }

    this.stepperService.setStrategy(strategy);
  }

  private listenForFormResetChanges() {
    return this.form.statusChanges
      .pipe(filter(() => this.form.pristine)) // https://github.com/angular/angular/issues/10887
      .subscribe(() => this.stepperService.resetSteps());
  }

  private listenForStepsCompleted() {
    return this.stepperService.stepsCompleted.subscribe(stepsCompleted => {
      if (stepsCompleted && this.form.valid) {
        this.form.ngSubmit.emit();
      } else if (!this.form.valid && this.form.touched) {
        this.setStepsWithFormErrors();
      }
    });
  }

  private setStepsWithFormErrors() {
    const stepsWithErrors = this.steps.reduce(
      (steps, step) => (step.formGroup.invalid ? [...steps, step.name] : steps),
      []
    );
    this.stepperService.setStepsWithErrors(stepsWithErrors);
  }

  private listenForDOMChanges() {
    return this.steps.changes.pipe(startWith(this.steps)).subscribe(steps => {
      this.stepperService.syncSteps(steps.toArray().map((s: ClrStep) => s.name));
      this.stepperService.overrideInitialStep(this.initialStep);
    });
  }
}
