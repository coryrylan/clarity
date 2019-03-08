/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClrIconModule } from '../icon/icon.module';
import { ClrStep } from './step';
import { ClrStepTitle } from './step-title';
import { ClrStepDescription } from './step-description';
import { ClrStepButton } from './step-button';
import { ClrStepper } from './stepper';
import { ClrStepContent } from './step-content';

const declarations = [ClrStepper, ClrStep, ClrStepTitle, ClrStepDescription, ClrStepContent, ClrStepButton];

@NgModule({
  imports: [CommonModule, ClrIconModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ClrStepperModule {}
