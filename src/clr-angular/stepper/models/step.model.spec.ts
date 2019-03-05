/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { Step } from './step.model';
import { StepStatus } from '../enums/step-status.enum';

describe('Step Model', () => {
  it('should set the status to Active if first step', () => {
    const step = new Step(0, 0);
    const step2 = new Step(1, 0);

    expect(step.status).toBe(StepStatus.Active);
    expect(step2.status).toBe(StepStatus.Inactive);
  });
});
