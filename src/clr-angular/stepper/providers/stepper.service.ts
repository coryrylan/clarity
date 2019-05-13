/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { StepCollection, ClrStepperStrategy } from '../models/step-collection.model';
import { Step } from '../models/step.model';

@Injectable()
export class StepperService {
  private stepCollection = new StepCollection();
  private readonly _stepsChanges = new BehaviorSubject<Step[]>(this.stepCollection.steps);
  readonly steps = this._stepsChanges.asObservable();
  readonly stepsCompleted = this.getAllStepsCompletedChanges();

  get strategy() {
    return this.stepCollection.strategy;
  }

  setStrategy(strategy: ClrStepperStrategy) {
    this.stepCollection.setStrategy(strategy);
  }

  getStepChanges(stepId: string) {
    return this.steps.pipe(map(steps => steps.find(s => s.id === stepId)));
  }

  addStep(stepId: string, open: boolean) {
    this.stepCollection.addStep(stepId, open);
    this.emitUpdatedSteps();
  }

  resetSteps() {
    this.stepCollection.resetSteps();
    this.emitUpdatedSteps();
  }

  navigateToNextStep(currentStepId: string, currentStepValid = true) {
    this.stepCollection.navigateToNextStep(currentStepId, currentStepValid);
    this.emitUpdatedSteps();
  }

  navigateToStep(stepId: string) {
    this.stepCollection.navigateToStep(stepId);
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
