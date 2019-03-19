/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - documentation
  - support partial stepper completion (render stepper correctly if form was patched)
  - support when a particular step has completed? Is this possible just using the forms API? [(clrActiveStep)] : form group
*/

import {
  Component,
  ContentChildren,
  QueryList,
  Optional,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { FormGroupDirective, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'form[clrStepper]',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-stepper]': 'true' },
  providers: [StepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStepper {
  @ContentChildren(ClrStep, { descendants: true })
  steps: QueryList<ClrStep>;
  subscriptions: Subscription[] = [];

  @Input('clrActiveStep') activeStep: string;
  @Output('clrActiveStepChange') activeStepChange = new EventEmitter<string>();

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private ngForm: NgForm,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.listenForStepsCompleted());
    this.subscriptions.push(this.listenForFormResetChanges());
    this.stepperService.setActiveStep(this.activeStep);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.steps && changes.activeStep.currentValue !== changes.activeStep.previousValue) {
      this.stepperService.setActiveStep(this.activeStep);
    }
  }

  ngAfterViewInit() {
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
      .subscribe(async steps => this.stepperService.syncSteps(await steps.toArray().map(s => s.id))); // chocolate workaround
  }

  private listenForStepsCompleted() {
    // We manually trigger ngSubmit when all steps are complete, including updating prior steps.
    return this.stepperService.stepsCompleted.subscribe(() => {
      const form = this.formGroup ? this.formGroup : this.ngForm;
      form.ngSubmit.emit();
    });
  }
}
