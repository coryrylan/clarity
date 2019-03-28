/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - documentation
  - support skipping prior steps, ex step one and two open but click step two next after editing step 1
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
import { startWith, filter, flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';

@Component({
  selector: 'form[clrStepper]',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-stepper]': 'true' },
  providers: [StepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStepper {
  @Input('clrInitialStep') initialStep: string;
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
    this.form = this.formGroup ? this.formGroup : this.ngForm;
    this.subscriptions.push(this.listenForStepsCompleted());
    this.subscriptions.push(this.listenForFormResetChanges());
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

  private listenForFormResetChanges() {
    return this.form.statusChanges
      .pipe(filter(() => this.form.pristine)) // https://github.com/angular/angular/issues/10887
      .subscribe(() => this.stepperService.resetSteps());
  }

  private listenForStepsCompleted() {
    return this.stepperService.stepsCompleted.subscribe(() => this.form.ngSubmit.emit());
  }

  private listenForDOMChanges() {
    return this.steps.changes
      .pipe(
        startWith(this.steps),
        flatMap(async steps => await steps) // chocolate
      )
      .subscribe(steps => {
        this.stepperService.syncSteps(steps.toArray().map((s: ClrStep) => s.name));
        this.stepperService.overrideInitialStep(this.initialStep);
      });
  }
}
