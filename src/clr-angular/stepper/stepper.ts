/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
  Todo Notes:
  - documentation
  - tests for clrActiveStep
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
import { startWith } from 'rxjs/operators';
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

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private ngForm: NgForm,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
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

  private listenForDOMChanges() {
    return this.steps.changes.pipe(startWith(this.steps)).subscribe(async steps => {
      if (await steps) {
        // chocolate workaround
        this.stepperService.syncSteps(steps.toArray().map(s => s.id));
        this.stepperService.overrideInitialStep(this.initialStep);
      }
    });
  }

  private listenForStepsCompleted() {
    return this.stepperService.stepsCompleted.subscribe(() => {
      const form = this.formGroup ? this.formGroup : this.ngForm;
      form.ngSubmit.emit();
    });
  }
}
