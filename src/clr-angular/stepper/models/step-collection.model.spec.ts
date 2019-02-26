/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { StepCollection } from './step-collection.model';
import { FormGroup, FormControl } from '@angular/forms';
import { StepStatus } from '../enums/step-status.enum';

fdescribe('StepCollection Model', () => {
  let stepCollection: StepCollection;
  let form: FormGroup;

  beforeEach(() => {
    stepCollection = new StepCollection();
    form = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
      }),
      contact: new FormGroup({
        email: new FormControl(''),
        phone: new FormControl(''),
      }),
    });
  });

  it('should add a new Step model instances', () => {
    const step1Id = stepCollection.addStep(form.controls.name);
    const step2Id = stepCollection.addStep(form.controls.contact);
    expect(step1Id).toBe(0);
    expect(step2Id).toBe(1);
    expect(stepCollection.steps.length).toBe(2);
  });

  it('should set the first step as the active step', () => {
    stepCollection.addStep(form.controls.name);
    stepCollection.addStep(form.controls.contact);
    expect(stepCollection.steps[0].status).toBe(StepStatus.Active);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Inactive);
  });

  it('should mark step complete', () => {
    stepCollection.setNextStep(stepCollection.addStep(form.controls.name));
    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
  });

  it('should navigate to next step if current step is valid', () => {
    const step1Id = stepCollection.addStep(form.controls.name);
    const step2Id = stepCollection.addStep(form.controls.contact);
    stepCollection.syncSteps([step1Id, step2Id]);
    stepCollection.setNextStep(step1Id);

    expect(stepCollection.steps[0].status).toBe(StepStatus.Complete);
    expect(stepCollection.steps[1].status).toBe(StepStatus.Active);
  });
});
