/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { AccordionModel } from './accordion.model';
import { AccordionStatus } from '../enums/accordion-status.enum';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

describe('StepCollection Model', () => {
  let stepCollection: AccordionModel;
  const step1Id = '0';
  const step2Id = '1';
  const step3Id = '2';

  beforeEach(() => {
    stepCollection = new AccordionModel();
    stepCollection.setStrategy(ClrAccordionStrategy.Forms);
    stepCollection.addPanel(step1Id);
    stepCollection.addPanel(step2Id);
    stepCollection.addPanel(step3Id);
    stepCollection.syncPanels([step1Id, step2Id, step3Id]);
  });

  it('should add a new Step model instances', () => {
    expect(step1Id).toBe(step1Id);
    expect(step2Id).toBe(step2Id);
    expect(stepCollection.panels.length).toBe(3);
  });

  it('should set the first step as the active step', () => {
    expect(stepCollection.panels[0].isOpen).toBe(true);
    expect(stepCollection.panels[1].status).toBe(AccordionStatus.Inactive);
  });

  it('should navigate to next step if current step is valid and mark step complete', () => {
    stepCollection.navigateToNextPanel(step1Id, true);
    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[0].isOpen).toBe(false);
    expect(stepCollection.panels[1].isOpen).toBe(true);
  });

  it('should set the error state of a invalid form group and prevent next step navigation', () => {
    expect(stepCollection.panels[0].isOpen).toBe(true);
    stepCollection.navigateToNextPanel(step1Id, false);
    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Error);
    expect(stepCollection.panels[1].status).toBe(AccordionStatus.Inactive);
  });

  it('should remove steps from collection when re-synced with ContentChildren', () => {
    expect(stepCollection.panels.length).toBe(3);
    stepCollection.syncPanels([step1Id, step3Id]);
    expect(stepCollection.panels.length).toBe(2);
  });

  it('should reset all steps when reset by form', () => {
    stepCollection.navigateToNextPanel(step1Id, true);
    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[1].isOpen).toBe(true);

    stepCollection.resetPanels();
    expect(stepCollection.panels[0].isOpen).toBe(true);
    expect(stepCollection.panels[1].status).toBe(AccordionStatus.Inactive);
  });

  it('should allow user to open and close a previously completed step', () => {
    stepCollection.navigateToNextPanel(step1Id, true);
    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[1].isOpen).toBe(true);

    stepCollection.navigateToPanel(step1Id);
    expect(stepCollection.panels[0].isOpen).toBe(true);
    expect(stepCollection.panels[1].isOpen).toBe(true);

    stepCollection.navigateToPanel(step1Id);
    expect(stepCollection.panels[0].isOpen).toBe(false);
    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[1].isOpen).toBe(true);
  });

  it('should determine if all steps have been completed', () => {
    expect(stepCollection.allPanelsCompleted).toBe(false);
    stepCollection.navigateToNextPanel(step1Id, true);
    stepCollection.navigateToNextPanel(step2Id, true);
    stepCollection.navigateToNextPanel(step3Id, true);
    expect(stepCollection.allPanelsCompleted).toBe(true);
  });

  it('should close all future steps if user proceeded to continue to next step from previously completed step to avoid a dependency issue', () => {
    stepCollection.navigateToNextPanel(step1Id, true);
    stepCollection.navigateToNextPanel(step2Id, true);

    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[1].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[2].isOpen).toBe(true);

    stepCollection.navigateToNextPanel(step1Id, true);

    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[1].isOpen).toBe(true);
    expect(stepCollection.panels[2].status).toBe(AccordionStatus.Inactive);
  });

  it('should allow programmer to override the active step', () => {
    stepCollection.overrideInitialPanel(step2Id);

    expect(stepCollection.panels[0].status).toBe(AccordionStatus.Complete);
    expect(stepCollection.panels[0].isOpen).toBe(false);
    expect(stepCollection.panels[1].status).toBe(AccordionStatus.Inactive);
    expect(stepCollection.panels[1].isOpen).toBe(true);
    expect(stepCollection.panels[2].status).toBe(AccordionStatus.Inactive);
    expect(stepCollection.panels[2].isOpen).toBe(false);
  });
});
