/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { StepCollection } from '../models/step-collection.model';
import { Step } from '../models/step.model';

@Injectable()
export class StepperService {
  private stepCollection = new StepCollection();
  private readonly _stepsChanges = new BehaviorSubject<Step[]>(this.stepCollection.steps);
  readonly steps = this._stepsChanges.asObservable();
  readonly stepsCompleted = this.getAllStepsCompletedChanges();

  getStepChanges(id: string) {
    return this.steps.pipe(map(steps => steps.find(s => s.id === id)));
  }

  addStep(id: string) {
    this.stepCollection.addStep(id);
    this.emitUpdatedSteps();
  }

  resetSteps() {
    this.stepCollection.resetSteps();
    this.emitUpdatedSteps();
  }

  navigateToNextStep(currentStepId: string, currentStepValid: boolean) {
    this.stepCollection.navigateToNextStep(currentStepId, currentStepValid);
    this.emitUpdatedSteps();
  }

  navigateToPreviouslyCompletedStep(stepId: string) {
    this.stepCollection.navigateToPreviouslyCompletedStep(stepId);
    this.emitUpdatedSteps();
  }

  overrideInitialStep(stepId: string) {
    this.stepCollection.overrideInitialStep(stepId);
    this.emitUpdatedSteps();
  }

  syncSteps(ids: string[]) {
    this.stepCollection.syncSteps(ids);
    this.emitUpdatedSteps();
  }

  setStepsWithErrors(ids: string[]) {
    this.stepCollection.setStepsWithErrors(ids);
    this.emitUpdatedSteps();
  }

  private emitUpdatedSteps() {
    this._stepsChanges.next(this.stepCollection.steps);
  }

  private getAllStepsCompletedChanges() {
    return this.steps.pipe(map(() => this.stepCollection.allStepsCompleted), distinctUntilChanged());
  }
}
