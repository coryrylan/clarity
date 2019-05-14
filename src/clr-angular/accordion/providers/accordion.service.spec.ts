/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AccordionService } from './accordion.service';
import { take } from 'rxjs/operators';
import { AccordionStatus } from '../enums/accordion-status.enum';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

describe('StepperService', () => {
  let stepperService: AccordionService;
  const step1Id = '0';
  const step2Id = '1';

  beforeEach(() => {
    stepperService = new AccordionService();
    stepperService.setStrategy(ClrAccordionStrategy.Forms);
  });

  it('should allow a step to be added', () => {
    stepperService.addPanel(step1Id);
    stepperService.panels.subscribe(steps => expect(steps.length).toBe(1));
  });

  it('should get updates of an individual step change', () => {
    stepperService.addPanel(step1Id);
    stepperService
      .getPanelChanges(step1Id)
      .pipe(take(1))
      .subscribe(step => expect(step.id).toBe(step1Id));
  });

  it('should update of step changes when steps are reset', () => {
    stepperService.addPanel(step1Id);
    stepperService.resetPanels();
    stepperService.panels.pipe(take(1)).subscribe(steps => expect(steps.length).toBe(1));
  });

  it('should notify of step changes when navigating to next step', () => {
    stepperService.addPanel(step1Id);
    stepperService.navigateToNextPanel(step1Id, true);
    stepperService.panels.pipe(take(1)).subscribe(steps => {
      expect(steps.length).toBe(1);
      expect(steps[0].status).toBe(AccordionStatus.Complete);
    });
  });

  it('should notify of step changes when next step is selected', () => {
    stepperService.addPanel(step1Id);
    stepperService.addPanel(step2Id);
    stepperService.navigateToNextPanel(step2Id, true);
    stepperService.navigateToPanel(step2Id);
    stepperService.panels.pipe(take(1)).subscribe(steps => expect(steps[0].open).toBe(true));
  });

  it('should notify of step changes when step order has changed', () => {
    stepperService.addPanel(step1Id);
    stepperService.addPanel(step2Id);
    stepperService.syncPanels([step2Id, step1Id]);
    stepperService.panels.pipe(take(1)).subscribe(steps => {
      expect(steps[0].index).toBe(1);
      expect(steps[1].index).toBe(0);
    });
  });

  it('should notify when all steps have completed', () => {
    stepperService.addPanel(step1Id);
    stepperService.navigateToNextPanel(step1Id, true);
    stepperService.panelsCompleted.pipe(take(1)).subscribe(completed => expect(completed).toBe(true));
  });
});
