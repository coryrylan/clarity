/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AbstractControl, FormGroup, NgModelGroup } from '@angular/forms';

import { StepStatus } from '../enums/step-status.enum';

export class Step {
  index: number = null;
  isLastStep = false;
  status: StepStatus = this.id === 0 ? StepStatus.Active : StepStatus.Inactive;

  constructor(public id: number, public stepperId: number, public group: AbstractControl | FormGroup | NgModelGroup) {
    // Group is passed in as a workaround to share control/group to the step buttons via a service.
    // Because of using content projection as a sibling element we lose the ability to inject the ClrStep component.
  }
}
