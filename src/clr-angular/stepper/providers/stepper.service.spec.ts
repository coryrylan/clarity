/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { StepperService } from './stepper.service';
import { take } from 'rxjs/operators';
import { StepStatus } from '../enums/step-status.enum';
import { ClrStepperStrategy } from '../models/step-collection.model';

describe('StepperService', () => {
  let stepperService: StepperService;
  const step1Id = '0';
  const step2Id = '1';

  beforeEach(() => {
    stepperService = new StepperService();
    stepperService.setStrategy(ClrStepperStrategy.Forms);
  });

  it('should allow a step to be added', () => {
    stepperService.addStep(step1Id);
    stepperService.steps.subscribe(steps => expect(steps.length).toBe(1));
  });

  it('should get updates of an individual step change', () => {
    stepperService.addStep(step1Id);
    stepperService
      .getStepChanges(step1Id)
      .pipe(take(1))
      .subscribe(step => expect(step.id).toBe(step1Id));
  });

  it('should update of step changes when steps are reset', () => {
    stepperService.addStep(step1Id);
    stepperService.resetSteps();
    stepperService.steps.pipe(take(1)).subscribe(steps => expect(steps.length).toBe(1));
  });

  it('should notify of step changes when navigating to next step', () => {
    stepperService.addStep(step1Id);
    stepperService.navigateToNextStep(step1Id, true);
    stepperService.steps.pipe(take(1)).subscribe(steps => {
      expect(steps.length).toBe(1);
      expect(steps[0].status).toBe(StepStatus.Complete);
    });
  });

  it('should notify of step changes when next step is selected', () => {
    stepperService.addStep(step1Id);
    stepperService.addStep(step2Id);
    stepperService.navigateToNextStep(step2Id, true);
    stepperService.navigateToStep(step2Id);
    stepperService.steps.pipe(take(1)).subscribe(steps => expect(steps[0].open).toBe(true));
  });

  it('should notify of step changes when step order has changed', () => {
    stepperService.addStep(step1Id);
    stepperService.addStep(step2Id);
    stepperService.syncSteps([step2Id, step1Id]);
    stepperService.steps.pipe(take(1)).subscribe(steps => {
      expect(steps[0].index).toBe(1);
      expect(steps[1].index).toBe(0);
    });
  });

  it('should notify when all steps have completed', () => {
    stepperService.addStep(step1Id);
    stepperService.navigateToNextStep(step1Id, true);
    stepperService.stepsCompleted.pipe(take(1)).subscribe(completed => expect(completed).toBe(true));
  });
});
