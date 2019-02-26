/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, filter, mapTo } from 'rxjs/operators';
import { FormGroup, AbstractControl, NgModelGroup } from '@angular/forms';

import { StepCollection } from '../models/step-collection.model';
import { StepStatus } from '../enums/step-status.enum';
import { Step } from '../models/step.model';

@Injectable()
export class StepperService {
  private stepCollection = new StepCollection();
  private readonly _stepsChanges = new BehaviorSubject<Step[]>(this.stepCollection.steps);
  readonly steps = this._stepsChanges.asObservable();
  readonly stepsCompleted = this.getAllStepsCompletedChanges();

  addStep(group: AbstractControl | FormGroup | NgModelGroup) {
    const id = this.stepCollection.addStep(group);
    this.emitUpdatedSteps();
    return id;
  }

  resetSteps() {
    this.stepCollection.resetSteps();
    this.emitUpdatedSteps();
  }

  setNextStep(currentStepId: number) {
    this.stepCollection.setNextStep(currentStepId);
    this.emitUpdatedSteps();
  }

  setActiveStep(stepId?: number) {
    this.stepCollection.setActiveStep(stepId);
    this.emitUpdatedSteps();
  }

  getStepChanges(id: number) {
    return this.steps.pipe(map(steps => steps.find(s => s.id === id)));
  }

  syncSteps(ids: number[]) {
    this.stepCollection.syncSteps(ids);
    this.emitUpdatedSteps();
  }

  private emitUpdatedSteps() {
    this._stepsChanges.next(this.stepCollection.steps);
  }

  private getAllStepsCompletedChanges() {
    return this.steps.pipe(
      filter(steps => steps.length > 0 && this.getNumberOfIncompleteSteps(steps) === 0),
      mapTo(true)
    );
  }

  private getNumberOfIncompleteSteps(steps: Step[]) {
    return steps.reduce((prev, next) => (next.status !== StepStatus.Complete ? prev + 1 : prev), 0);
  }
}
