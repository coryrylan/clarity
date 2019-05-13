/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { StepStatus } from '../enums/step-status.enum';

export class Step {
  index: number = null;
  isLastStep = false;
  status = StepStatus.Inactive;
  open = false;
  disabled = false;
  constructor(public id: string, public stepperId: number) {}
}
