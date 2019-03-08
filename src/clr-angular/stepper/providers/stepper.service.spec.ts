/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { StepperService } from './stepper.service';
import { take } from 'rxjs/operators';
import { StepStatus } from '../enums/step-status.enum';

describe('StepperService', () => {
  let stepperService: StepperService;
  beforeEach(() => {
    stepperService = new StepperService();
  });

  it('should allow a step to be added', () => {
    const id = stepperService.addStep();
    expect(id).toBe(0);
  });

  it('should get updates of an individual step change', () => {
    const id = stepperService.addStep();
    stepperService
      .getStepChanges(id)
      .pipe(take(1))
      .subscribe(step => expect(step.id).toBe(0));
  });

  it('should update of step changes when steps are reset', () => {
    stepperService.addStep();
    stepperService.resetSteps();
    stepperService.steps.pipe(take(1)).subscribe(steps => expect(steps.length).toBe(1));
  });

  it('should notify of step changes when navigating to next step', () => {
    const id = stepperService.addStep();
    stepperService.setNextStep(id, true);
    stepperService.steps.pipe(take(1)).subscribe(steps => {
      expect(steps.length).toBe(1);
      expect(steps[0].status).toBe(StepStatus.Complete);
    });
  });

  it('should notify of step changes when next step is selected', () => {
    const id = stepperService.addStep();
    stepperService.addStep();
    stepperService.setNextStep(id, true);
    stepperService.setActiveStep(id, true);
    stepperService.steps.pipe(take(1)).subscribe(steps => expect(steps[0].open).toBe(true));
  });

  it('should notify of step changes when step order has changed', () => {
    const id = stepperService.addStep();
    const id2 = stepperService.addStep();
    stepperService.syncSteps([id2, id]);
    stepperService.steps.pipe(take(1)).subscribe(steps => {
      expect(steps[0].index).toBe(1);
      expect(steps[1].index).toBe(0);
    });
  });

  it('should notify when all steps have completed', () => {
    const id = stepperService.addStep();
    stepperService.setNextStep(id, true);
    stepperService.stepsCompleted.pipe(take(1)).subscribe(completed => expect(completed).toBe(true));
  });
});
