/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { StepStatus } from '../enums/step-status.enum';
import { Step } from './step.model';

export enum ClrStepperStrategy {
  Default = 'default', // only one panel at a time
  Multi = 'multi', // can have multiple panels open at a time
  Forms = 'forms', // linear step progression for forms
}

let stepperCount = 0;

export class StepCollection {
  private stepperCount = stepperCount++;
  private stepCount = 0;
  private _steps: { [id: number]: Step } = {};
  private _strategy = ClrStepperStrategy.Default;

  get steps(): Step[] {
    return Object.keys(this._steps).map(id => this._steps[id]);
  }

  get allStepsCompleted(): boolean {
    return this.steps.length && this.getNumberOfIncompleteSteps() === 0 && this.getNumberOfOpenSteps() === 0;
  }

  get strategy(): ClrStepperStrategy {
    return this._strategy;
  }

  setStrategy(strategy: ClrStepperStrategy) {
    this._strategy = strategy;
  }

  syncSteps(ids: string[]) {
    this.updateStepOrder(ids);
    this.removeOldSteps(ids);
  }

  addStep(id: string, open = false) {
    const step = new Step(id, this.stepperCount);
    step.open = open;

    if (this.strategy === ClrStepperStrategy.Forms) {
      step.open = this.stepCount++ === 0;
      step.disabled = true;
    }

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

  navigateToStep(stepId: string) {
    const stepOpen = this._steps[stepId].open;

    if (this.strategy === ClrStepperStrategy.Default) {
      this.closeAllSteps();
      this._steps[stepId].open = !stepOpen;
    }

    if (this.strategy === ClrStepperStrategy.Multi) {
      this._steps[stepId].open = !stepOpen;
    }

    if (this.strategy === ClrStepperStrategy.Forms) {
      this.navigateToPreviouslyCompletedStep(stepId);
    }
  }

  navigateToNextStep(currentStepId: string, currentStepValid = true) {
    if (currentStepValid) {
      const nextStep = this.steps.find(s => s.index === this._steps[currentStepId].index + 1);
      this.completeStep(currentStepId);

      if (nextStep) {
        this.resetAllFutureSteps(nextStep);
        this._steps[nextStep.id].open = true;
      } else {
        this.closeAllCompletedSteps();
      }
    } else {
      this._steps[currentStepId].status = StepStatus.Error;
      this.closeAllCompletedSteps();
    }
  }

  overrideInitialStep(stepId: string) {
    if (this._steps[stepId]) {
      this.steps.forEach(step => {
        if (step.index < this._steps[stepId].index) {
          this.completeStep(step.id);
        } else if (step.id === stepId) {
          this._steps[step.id].open = true;
        } else {
          this._steps[step.id].open = false;
        }
      });
    }
  }

  setStepsWithErrors(ids: string[]) {
    ids.forEach(id => {
      this._steps[id].open = true;
      this._steps[id].status = StepStatus.Error;
    });
  }

  private closeAllSteps() {
    this.steps.forEach(step => (this._steps[step.id].open = false));
  }

  private navigateToPreviouslyCompletedStep(stepId: string) {
    if (this._steps[stepId].status === StepStatus.Complete) {
      this._steps[stepId].open = !this._steps[stepId].open;
    }
  }

  private getNumberOfOpenSteps() {
    return this.steps.reduce((prev, next) => (next.open !== false ? prev + 1 : prev), 0);
  }

  private closeAllCompletedSteps() {
    this.steps.forEach(step => {
      if (step.status === StepStatus.Complete) {
        this._steps[step.id].open = false;
      }
    });
  }

  private completeStep(stepId: string) {
    this._steps[stepId].status = StepStatus.Complete;
    this._steps[stepId].disabled = false;
    this._steps[stepId].open = false;
  }

  private getNumberOfIncompleteSteps() {
    return this.steps.reduce((prev, next) => (next.status !== StepStatus.Complete ? prev + 1 : prev), 0);
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
