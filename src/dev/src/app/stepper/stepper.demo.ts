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
  form = new FormGroup({
    name: new FormGroup({
      first: new FormControl('Cory', Validators.required),
      last: new FormControl('Rylan', Validators.required),
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

  showSecondStep = true;

  submit() {
    console.log('submit', this.form.value);
  }

  toggleSecondStep() {
    this.showSecondStep = !this.showSecondStep;
  }
}