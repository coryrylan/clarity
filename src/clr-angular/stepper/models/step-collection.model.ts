/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

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

  addStep() {
    const step = new Step(this.stepCount++, this.stepperCount);
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

  setNextStep(currentStepId: number, currentStepValid: boolean) {
    if (currentStepValid) {
      const nextStep = this.steps.find(s => s.index === this._steps[currentStepId].index + 1);
      this._steps[currentStepId].status = StepStatus.Complete;

      if (nextStep) {
        this.closeAllFutureSteps(nextStep);
        this._steps[nextStep.id].status = StepStatus.Active;
      }
    } else {
      this._steps[currentStepId].status = StepStatus.Error;
    }
  }

  setActiveStep(stepId: number, currentStepValid: boolean) {
    if (currentStepValid) {
      this._steps[stepId].status = StepStatus.Active;
    } else {
      const currentStep = this.steps.find(s => s.status === StepStatus.Active);
      this._steps[currentStep.id].status = StepStatus.Error;
    }
  }

  getNumberOfIncompleteSteps() {
    return this.steps.reduce((prev, next) => (next.status !== StepStatus.Complete ? prev + 1 : prev), 0);
  }

  private closeAllFutureSteps(nextStep: Step) {
    // we close all future steps to in case future steps depend on prior step values
    this.steps.forEach(step => {
      if (step.index > nextStep.index) {
        step.status = StepStatus.Inactive;
      }
    });
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
