/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClrIconModule } from '../icon/icon.module';
import { ClrStep } from './step';
import { ClrStepHeader } from './step-header';
import { ClrStepTitle } from './step-title';
import { ClrStepDescription } from './step-description';
import { ClrStepContent } from './step-content';
import { ClrStepButton } from './step-button';
import { ClrFormStepper } from './stepper';

const declarations = [
  ClrFormStepper,
  ClrStep,
  ClrStepHeader,
  ClrStepTitle,
  ClrStepDescription,
  ClrStepContent,
  ClrStepButton,
];

@NgModule({
  imports: [CommonModule, ClrIconModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ClrStepperModule {}
