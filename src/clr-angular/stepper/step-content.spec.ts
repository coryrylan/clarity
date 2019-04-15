/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrStepperModule } from './stepper.module';

describe('ClrStepContent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, ClrStepperModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('projects content', () => {
    expect(fixture.nativeElement.textContent.trim()).toMatch('Hello world');
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form">
      <clr-step formGroupName="group">
        <clr-step-content>Hello world</clr-step-content>
      </clr-step>
    </form>
  `,
})
class TestComponent {
  form = new FormGroup({ group: new FormGroup({}) });
}
