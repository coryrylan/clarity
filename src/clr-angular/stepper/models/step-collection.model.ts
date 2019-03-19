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
  private activeStepId: string;

  get steps(): Step[] {
    return Object.keys(this._steps).map(id => this._steps[id]);
  }

  get allStepsCompleted(): boolean {
    return this.steps.length && this.getNumberOfIncompleteSteps() === 0 && this.getNumberOfOpenSteps() === 0;
  }

  syncSteps(ids: string[]) {
    this.updateStepOrder(ids);
    this.removeOldSteps(ids);
    this.setActiveStep(this.activeStepId);
  }

  addStep(id: string) {
    const step = new Step(id, this.stepperCount);
    step.open = this.stepCount++ === 0;
    this._steps[step.id] = step;
  }

  resetSteps() {
    this.steps.forEach((s, index) => {
      const step = this._steps[s.id];
      step.status = StepStatus.Inactive;
      step.open = false;

      if (index === 0) {
        step.status = StepStatus.Inactive;
        step.open = true;
      }

      return step;
    });
  }

  setNextStep(currentStepId: string, currentStepValid: boolean) {
    if (currentStepValid) {
      const nextStep = this.steps.find(s => s.index === this._steps[currentStepId].index + 1);
      this._steps[currentStepId].status = StepStatus.Complete;
      this._steps[currentStepId].open = false;

      if (nextStep) {
        this.resetAllFutureSteps(nextStep);
        this._steps[nextStep.id].open = true;
      }
    } else {
      this._steps[currentStepId].status = StepStatus.Error;
    }
  }

  navigateToPreviouslyCompletedStep(stepId: string, currentStepValid: boolean) {
    if (currentStepValid && this._steps[stepId].status === StepStatus.Complete) {
      this._steps[stepId].open = !this._steps[stepId].open;
    } else {
      const currentStep = this.steps.find(s => s.open);
      this._steps[currentStep.id].status = StepStatus.Error;
    }
  }

  private getNumberOfIncompleteSteps() {
    return this.steps.reduce((prev, next) => (next.status !== StepStatus.Complete ? prev + 1 : prev), 0);
  }

  private getNumberOfOpenSteps() {
    return this.steps.reduce((prev, next) => (next.open !== false ? prev + 1 : prev), 0);
  }

  private resetAllFutureSteps(nextStep: Step) {
    // we close all future steps to in case future steps depend on prior step values
    this.steps.forEach(step => {
      if (step.index >= nextStep.index) {
        step.status = StepStatus.Inactive;
        step.open = false;
      }
    });
  }

  setActiveStep(stepId: string) {
    if (this._steps[stepId]) {
      this.steps.forEach(step => {
        if (step.index < this._steps[stepId].index) {
          this._steps[step.id].status = StepStatus.Complete;
          this._steps[step.id].open = false;
        } else if (step.id === stepId) {
          this._steps[step.id].open = true;
        } else {
          this._steps[step.id].open = false;
        }
      });
    } else {
      this.activeStepId = stepId;
    }
  }

  private updateStepOrder(ids: string[]) {
    ids.forEach((id, index) => {
      if (this._steps[id]) {
        this._steps[id].index = index;
        this._steps[id].isLastStep = index === ids.length - 1;
      }
    });
  }

  private removeOldSteps(ids: string[]) {
    this.steps.forEach(step => {
      if (ids.find(id => id === step.id) === undefined) {
        delete this._steps[step.id];
      }
    });
  }
}
