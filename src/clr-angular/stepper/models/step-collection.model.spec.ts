/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { StepCollection, ClrStepperStrategy } from './step-collection.model';
import { StepStatus } from '../enums/step-status.enum';

describe('StepCollection Model', () => {
  let stepCollection: StepCollection;
  const step1Id = '0';
  const step2Id = '1';
  const step3Id = '2';

  beforeEach(() => {
    stepCollection = new StepCollection();
    stepCollection.setStrategy(ClrStepperStrategy.Forms);
    stepCollection.addStep(step1Id);
    stepCollection.addStep(step2Id);
    stepCollection.addStep(step3Id);
    stepCollection.syncSteps([step1Id, step2Id, step3Id]);
  });

  it('should add a new Step model instances', () => {
    expect(step1Id).toBe(step1Id);
    expect(step2Id).toBe(step2Id);
    expect(stepCollection.steps.length).toBe(3);
  });

  it('should set the first step as the active step', () => {
    expect(stepCollection.steps[0].open).toBe(true);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should navigate to next step if current step is valid and mark step complete', () => {
    stepCollection.navigateToNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[0].open).toBe(false);
    expect(stepCollection.steps[1].open).toBe(true);
  });

  it('should set the error state of a invalid form group and prevent next step navigation', () => {
    expect(stepCollection.steps[0].open).toBe(true);
    stepCollection.navigateToNextStep(step1Id, false);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Error);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should remove steps from collection when re-synced with ContentChildren', () => {
    expect(stepCollection.steps.length).toBe(3);
    stepCollection.syncSteps([step1Id, step3Id]);
    expect(stepCollection.steps.length).toBe(2);
  });

  it('should reset all steps when reset by form', () => {
    stepCollection.navigateToNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].open).toBe(true);

    stepCollection.resetSteps();
    expect(stepCollection.steps[0].open).toBe(true);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should allow user to open and close a previously completed step', () => {
    stepCollection.navigateToNextStep(step1Id, true);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].open).toBe(true);

    stepCollection.navigateToStep(step1Id);
    expect(stepCollection.steps[0].open).toBe(true);
    expect(stepCollection.steps[1].open).toBe(true);

    stepCollection.navigateToStep(step1Id);
    expect(stepCollection.steps[0].open).toBe(false);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].open).toBe(true);
  });

  it('should determine if all steps have been completed', () => {
    expect(stepCollection.allStepsCompleted).toBe(false);
    stepCollection.navigateToNextStep(step1Id, true);
    stepCollection.navigateToNextStep(step2Id, true);
    stepCollection.navigateToNextStep(step3Id, true);
    expect(stepCollection.allStepsCompleted).toBe(true);
  });

  it('should close all future steps if user proceeded to continue to next step from previously completed step to avoid a dependency issue', () => {
    stepCollection.navigateToNextStep(step1Id, true);
    stepCollection.navigateToNextStep(step2Id, true);

    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[2].open).toBe(true);

    stepCollection.navigateToNextStep(step1Id, true);

    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].open).toBe(true);
    expect(stepCollection.steps[2].status).toBe(StepStatus.Inactive);
  });

  it('should allow programmer to override the active step', () => {
    stepCollection.overrideInitialStep(step2Id);

    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[0].open).toBe(false);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
    expect(stepCollection.steps[1].open).toBe(true);
    expect(stepCollection.steps[2].status).toBe(StepStatus.Inactive);
    expect(stepCollection.steps[2].open).toBe(false);
  });
});
