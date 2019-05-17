/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StepperService } from './../providers/stepper.service';
import { ClrAccordionModule } from './../accordion.module';
import { ClrStepper } from './stepper';

describe('ClrStepper', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: ReactiveFormsTestComponent;
  let stepperService: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    stepperService = fixture.debugElement.query(By.directive(ClrStepper)).injector.get(StepperService);
  });

  it('should reset panels when form is reset', () => {
    spyOn(stepperService, 'resetPanels');
    testComponent.form.reset();
    fixture.detectChanges();
    expect(stepperService.resetPanels).toHaveBeenCalled();
  });

  it('should trigger ngSubmit event when all panels have completed', () => {
    spyOn(testComponent, 'submit');
    stepperService.navigateToNextPanel('group', true);
    stepperService.navigateToNextPanel('group2', true);
    expect(testComponent.submit).toHaveBeenCalled();
  });

  it('should override the initial panel if developer overrides it via clrInitialStep', () => {
    spyOn(stepperService, 'overrideInitialPanel');
    fixture.detectChanges();
    expect(stepperService.overrideInitialPanel).not.toHaveBeenCalled();

    testComponent.initialStep = 'group';
    fixture.detectChanges();
    expect(stepperService.overrideInitialPanel).toHaveBeenCalled();
  });
});

describe('ClrStepper Template Forms', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: TemplateFormsTestComponent;
  let stepperService: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormsTestComponent],
      imports: [ClrAccordionModule, FormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TemplateFormsTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    stepperService = fixture.debugElement.query(By.directive(ClrStepper)).injector.get(StepperService);
  });

  it('should reset steps when form is reset', () => {
    spyOn(stepperService, 'resetPanels');
    testComponent.form.reset();
    fixture.detectChanges();
    expect(stepperService.resetPanels).toHaveBeenCalled();
  });

  it('should trigger ngSubmit event when all steps have completed', () => {
    spyOn(testComponent, 'submit');
    stepperService.navigateToNextPanel('group', true);
    stepperService.navigateToNextPanel('group2', true);
    expect(testComponent.submit).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form" (ngSubmit)="submit()" [clrInitialStep]="initialStep">
      <clr-step formGroupName="group">
        <clr-step-title>Group 1</clr-step-title>
      </clr-step>
      <clr-step *ngIf="showSecondStep" formGroupName="group2">
        <clr-step-title>Group 2</clr-step-title>
      </clr-step>
    </form>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(ClrStepper) stepper: ClrStepper;
  showSecondStep = true;
  initialStep = '';
  form = new FormGroup({
    group: new FormGroup({}),
    group2: new FormGroup({}),
  });

  submit() {}
}

@Component({
  template: `
    <form clrStepper #testForm="ngForm" (ngSubmit)="submit()">
      <clr-step ngModelGroup="group">
        <clr-step-title>Group 1</clr-step-title>
      </clr-step>
      <clr-step *ngIf="showSecondStep" ngModelGroup="group2">
        <clr-step-title>Group 2</clr-step-title>
      </clr-step>
    </form>
  `,
})
class TemplateFormsTestComponent {
  @ViewChild(ClrStepper) stepper: ClrStepper;
  @ViewChild('testForm') form: FormGroup;
  showSecondStep = true;
  submit() {}
}
