/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { AccordionPanelModel } from './accordion-panel.model';

describe('Step Model', () => {
  it('should create a step with an id of the form group', () => {
    const step = new AccordionPanelModel('groupName', 0);
    expect(step.id).toBe('groupName');
  });
});
