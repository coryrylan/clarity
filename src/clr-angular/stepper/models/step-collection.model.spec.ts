/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { StepCollection } from './step-collection.model';
import { StepStatus } from '../enums/step-status.enum';

describe('StepCollection Model', () => {
  let stepCollection: StepCollection;
  let step1Id: number;
  let step2Id: number;
  let step3Id: number;

  beforeEach(() => {
    stepCollection = new StepCollection();
    step1Id = stepCollection.addStep();
    step2Id = stepCollection.addStep();
    step3Id = stepCollection.addStep();
    stepCollection.syncSteps([step1Id, step2Id, step3Id]);
  });

  it('should add a new Step model instances', () => {
    expect(step1Id).toBe(0);
    expect(step2Id).toBe(1);
    expect(stepCollection.steps.length).toBe(3);
  });

  it('should set the first step as the active step', () => {
    expect(stepCollection.steps[0].status).toBe(StepStatus.Active);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should navigate to next step if current step is valid and mark step complete', () => {
    stepCollection.setNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);
  });

  it('should set the error state of a invalid form group and prevent next step navigation', () => {
    expect(stepCollection.steps[0].status).toBe(StepStatus.Active);
    stepCollection.setNextStep(step1Id, false);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Error);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should remove steps from collection when re-synced with ContentChildren', () => {
    expect(stepCollection.steps.length).toBe(3);
    stepCollection.syncSteps([step1Id, step3Id]);
    expect(stepCollection.steps.length).toBe(2);
  });

  it('should reset all steps when reset by form', () => {
    stepCollection.setNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);

    stepCollection.resetSteps();
    expect(stepCollection.steps[0].status).toBe(StepStatus.Active);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should allow user to select a previously completed step', () => {
    stepCollection.setNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);
    stepCollection.setActiveStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Active);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);
  });

  it('should not allow user to select a previously completed step if current step is invalid', () => {
    stepCollection.setNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);

    stepCollection.setActiveStep(step1Id, false);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Error);
  });

  it('should calculate the number of incomplete steps', () => {
    stepCollection.setNextStep(step1Id, true);
    expect(stepCollection.getNumberOfIncompleteSteps()).toBe(2);
  });
});
