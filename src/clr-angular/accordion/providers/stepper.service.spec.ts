/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { take } from 'rxjs/operators';

import { AccordionStatus } from '../enums/accordion-status.enum';
import { StepperService } from './stepper.service';

describe('StepperService', () => {
  let stepperService: StepperService;
  const step1Id = '0';
  const step2Id = '1';

  beforeEach(() => {
    stepperService = new StepperService();
    stepperService.addPanel(step1Id);
    stepperService.addPanel(step2Id);
    stepperService.syncPanels([step1Id, step2Id]);
  });

  it('should update of step changes when steps are reset', () => {
    stepperService.navigateToNextPanel(step1Id);
    stepperService.resetPanels();

    stepperService
      .getPanelChanges(step1Id)
      .pipe(take(1))
      .subscribe(step => expect(step.open).toBe(true));
  });

  it('should notify of step changes when navigating to next step', () => {
    stepperService.addPanel(step1Id);
    stepperService.navigateToNextPanel(step1Id, true);
    stepperService
      .getPanelChanges(step2Id)
      .pipe(take(1))
      .subscribe(step => expect(step.open).toBe(true));
  });

  it('should notify when all steps have completed', () => {
    stepperService.navigateToNextPanel(step1Id, true);
    stepperService.navigateToNextPanel(step2Id, true);
    stepperService.panelsCompleted.pipe(take(1)).subscribe(completed => expect(completed).toBe(true));
  });

  it('should notify of errors', () => {
    stepperService.setPanelsWithErrors([step1Id]);
    stepperService
      .getPanelChanges(step1Id)
      .pipe(take(1))
      .subscribe(step => expect(step.status).toBe(AccordionStatus.Error));
  });

  it('should allow the default panel to be overridden', () => {
    stepperService.overrideInitialPanel(step2Id);
    stepperService
      .getPanelChanges(step2Id)
      .pipe(take(1))
      .subscribe(step => expect(step.open).toBe(true));
  });
});
