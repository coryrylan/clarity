/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { Step } from './step.model';

describe('Step Model', () => {
  it('should open the step if step', () => {
    const step = new Step(0, 0);
    const step2 = new Step(1, 0);

    expect(step.open).toBe(true);
    expect(step2.open).toBe(false);
  });
});
