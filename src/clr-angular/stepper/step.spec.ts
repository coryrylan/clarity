/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrStep } from './step';
import { ClrStepper } from './stepper';
import { ClrStepperModule } from './stepper.module';

@Component({
  selector: 'clr-stepper-test',
  template: `
    <clr-stepper>
      <clr-step #clrStep1>
        <clr-step-title>Step 1</clr-step-title>
        <clr-step-description>Step 1 Content</clr-step-description>
      </clr-step>
      <clr-step #clrStep2>
        <clr-step-title>Step 2</clr-step-title>
        <clr-step-description>Step 2 Content</clr-step-description>
      </clr-step>
      <clr-step #clrStep3>
        <clr-step-title>Step 3</clr-step-title>
        <clr-step-description>Step 3 Content</clr-step-description>
      </clr-step>
    </clr-stepper>
  `,
})
class ClrStepTestComponent {
  @ViewChild('clrStep1') clrStep1: ClrStep;
  @ViewChild('clrStep2') clrStep2: ClrStep;
}

fdescribe('ClrStepper', () => {
  let testComponent: ClrStepTestComponent;
  let fixture: ComponentFixture<ClrStepTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClrStepperModule],
      declarations: [ClrStepTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrStepTestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should render the correct step numbers for each step', () => {
    expect(testComponent.clrStep1.id).toBe(0);
    expect(testComponent.clrStep2.id).toBe(1);
  });
});
