/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, filter, mapTo } from 'rxjs/operators';
import { FormGroup, AbstractControl } from '@angular/forms';

let stepperCount = 0;

export enum StepStatus {
  Active,
  Inactive,
  Error,
  Complete,
}

export interface Step {
  id: number;
  index: number;
  stepperId: number;
  status: StepStatus;
  isLastStep: boolean;
  group: AbstractControl | FormGroup;
}

@Injectable()
export class StepperService {
  stepButtons: TemplateRef<any>;

  private stepCount = 0;
  private stepperCount = stepperCount++;

  private readonly _stepsChanges = new BehaviorSubject<Step[]>([]);
  private get _steps(): Step[] {
    return this._stepsChanges.value;
  }
  private set _steps(steps: Step[]) {
    this._stepsChanges.next(steps);
  }

  readonly steps = this._stepsChanges.asObservable();
  readonly stepsCompleted = this.getAllStepsCompletedChanges();

  addStep(group: AbstractControl | FormGroup) {
    // Group is passed in as a workaround to share control/group to the step buttons via a service.
    // Because of using content projection as a sibling element we lose the ability to inject the ClrStep component.
    const step: Step = {
      id: this.stepCount++,
      index: null,
      stepperId: this.stepperCount,
      status: this.stepCount === 1 ? StepStatus.Active : StepStatus.Inactive,
      isLastStep: false,
      group,
    };

    this._steps = [...this._steps, step];

    return step.id;
  }

  removeStep(id: number) {
    this._steps = this._steps.filter(step => step.id !== id);
  }

  reset() {
    this._steps = this._steps.map((step, index) => {
      step.status = StepStatus.Inactive;

      if (index === 0) {
        step.status = StepStatus.Active;
      }

      return step;
    });
  }

  nextStep() {
    const nextStep = this.getNextStep();

    if (nextStep) {
      this.setActiveStep(nextStep.id);
    } else {
      this.setActiveStep();
    }
  }

  setActiveStep(stepId?: number) {
    const currentStep = this.getCurrentStep();

    this._steps = this._steps.map(step => {
      if (currentStep.group.valid) {
        if (this.stepIsCurrentActiveStep(step)) {
          step.status = StepStatus.Complete;
        }

        if (this.stepIsCompletedPreviousStep(stepId, step)) {
          step.status = StepStatus.Active;
        }

        if (step.id === stepId) {
          step.status = StepStatus.Active;
        }
      } else if (currentStep.group.invalid && currentStep.id === step.id) {
        step.status = StepStatus.Error;
      }

      return { ...step };
    });
  }

  getCurrentStep() {
    return this._steps.find(
      (s, i) => s.status === StepStatus.Active || s.status === StepStatus.Error || i === this._steps.length - 1
    );
  }

  getStepChanges(id: number) {
    return this.steps.pipe(map(steps => steps.find(s => s.id === id)), filter(step => step !== undefined));
  }

  updateStepOrder(ids: number[]) {
    this._steps = ids.map((id, index) => {
      const step = this._steps.find(s => s.id === id);
      step.index = index;

      if (index === ids.length - 1) {
        step.isLastStep = true;
      }

      return step;
    });
  }

  private getNextStep() {
    return this._steps.find(s => s.index === this.getCurrentStep().index + 1);
  }

  // refactor some of these methods into plain functions
  private stepIsCurrentActiveStep(step: Step) {
    return step.status === StepStatus.Active || step.status === StepStatus.Error;
  }

  private stepIsCompletedPreviousStep(activeStepId: number, step: Step) {
    return step.id === activeStepId && step.id <= activeStepId && step.status === StepStatus.Complete;
  }

  private getAllStepsCompletedChanges() {
    return this.steps.pipe(
      filter(steps => steps.length > 0),
      map(steps => this.getNumberOfIncompleteSteps(steps)),
      filter(incompleteStepCount => incompleteStepCount === 0),
      mapTo(true)
    );
  }

  private getNumberOfIncompleteSteps(steps: Step[]) {
    return steps.reduce((prev, next) => (next.status !== StepStatus.Complete ? prev + 1 : prev), 0);
  }
}
