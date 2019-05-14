/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, HostBinding, Input } from '@angular/core';

import { AccordionService } from '../providers/accordion.service';
import { ClrAccordionPanel } from '../accordion-panel';

export enum ClrStepButtonType {
  Next = 'next',
  Submit = 'submit',
}

@Directive({
  selector: '[clrStepButton]',
  host: {
    '[class.clr-step-button]': 'true',
    '[class.btn]': 'true',
    '[type]': "'button'",
  },
})
export class ClrStepButton {
  @Input('clrStepButton') type: ClrStepButtonType | string = ClrStepButtonType.Next;
  @HostBinding('class.btn-primary') submitButton = false;

  constructor(private clrStep: ClrAccordionPanel, private stepperService: AccordionService) {}

  ngOnInit() {
    this.submitButton = this.type === ClrStepButtonType.Submit;
  }

  @HostListener('click')
  click() {
    const valid = this.clrStep.formGroup ? this.clrStep.formGroup.valid : true;
    this.stepperService.navigateToNextPanel(this.clrStep.name, valid);
  }
}
