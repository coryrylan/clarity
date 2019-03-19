/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'clr-stepper-demo',
  templateUrl: 'stepper.demo.html',
  styleUrls: ['./stepper.demo.scss'],
})
export class StepperDemo {
  showSecondStep = true;
  activeStep = 'contact';
  form: FormGroup = this.getReactiveForm();
  templateForm: {} = this.getTemplateForm();
  partiallyCompletedForm: FormGroup = this.getPartiallyCompletedForm();

  submit() {
    console.log('reactive form submit', this.form.value);
  }

  templateFormSubmit(templateFormValues: {}) {
    console.log('template form submit', templateFormValues);
  }

  toggleActiveStep() {
    this.activeStep = this.activeStep === 'contact' ? 'password' : 'contact';
  }

  private getReactiveForm() {
    return new FormGroup({
      name: new FormGroup({
        first: new FormControl('Luke', Validators.required),
        last: new FormControl('Skywalker', Validators.required),
      }),
      contact: new FormGroup({
        email: new FormControl(),
        phone: new FormControl(),
      }),
      password: new FormGroup({
        password: new FormControl(),
        confirm: new FormControl(),
      }),
    });
  }

  private getTemplateForm() {
    return {
      name: {
        firstName: '',
        lastName: '',
      },
      contact: {
        email: '',
        phone: '',
      },
      password: {
        password: '',
        confirm: '',
      },
    };
  }

  private getPartiallyCompletedForm() {
    return new FormGroup({
      name: new FormGroup({
        first: new FormControl('Luke', Validators.required),
        last: new FormControl('Skywalker', Validators.required),
      }),
      contact: new FormGroup({
        email: new FormControl(),
        phone: new FormControl(),
      }),
      password: new FormGroup({
        password: new FormControl(),
        confirm: new FormControl(),
      }),
    });
  }
}
