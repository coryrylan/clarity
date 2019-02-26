/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AbstractControl, FormGroup, NgModelGroup } from '@angular/forms';

import { StepStatus } from '../enums/step-status.enum';
import { Step } from './step.model';

let stepperCount = 0;

export class StepCollection {
  private stepperCount = stepperCount++;
  private stepCount = 0;
  private _steps: { [id: number]: Step } = {};

  get steps(): Step[] {
    return Object.keys(this._steps).map(id => this._steps[id]);
  }

  addStep(group: AbstractControl | FormGroup | NgModelGroup) {
    const step = new Step(this.stepCount++, this.stepperCount, group);
    this._steps[step.id] = step;
    return step.id;
  }

  resetSteps() {
    this.steps.forEach((s, index) => {
      const step = this._steps[s.id];
      step.status = StepStatus.Inactive;

      if (index === 0) {
        step.status = StepStatus.Active;
      }

      return step;
    });
  }

  syncSteps(ids: number[]) {
    this.updateStepOrder(ids);
    this.removeOldSteps(ids);
  }

  setNextStep(currentStepId: number) {
    if (this._steps[currentStepId].group.valid) {
      const nextStep = this.steps.find(s => s.index === this._steps[currentStepId].index + 1);
      this._steps[currentStepId].status = StepStatus.Complete;

      if (nextStep && nextStep.status !== StepStatus.Complete) {
        this._steps[nextStep.id].status = StepStatus.Active;
      }
    } else {
      this._steps[currentStepId].status = StepStatus.Error;
    }
  }

  setActiveStep(stepId: number) {
    let allStepsValid = true;
    this.steps.map(step => {
      if (step.group.invalid) {
        allStepsValid = false;
        this._steps[step.id].status = StepStatus.Error;
      }
    });

    if (allStepsValid) {
      this._steps[stepId].status = StepStatus.Active;
    }
  }

  private updateStepOrder(ids: number[]) {
    ids.forEach((id, index) => {
      if (this._steps[id]) {
        this._steps[id].index = index;
        this._steps[id].isLastStep = index === ids.length - 1;
      }
    });
  }

  private removeOldSteps(ids: number[]) {
    this.steps.forEach(step => {
      if (ids.find(id => id === step.id) === undefined) {
        delete this._steps[step.id];
      }
    });
  }
}
