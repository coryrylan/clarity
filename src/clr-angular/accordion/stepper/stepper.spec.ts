/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ClrAccordionModule } from '../accordion.module';
import { ClrStepperModule } from './stepper.module';
import { StepperService } from '././providers/stepper.service';
import { ClrStepper } from './stepper';

describe('ClrStepper', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: ReactiveFormsTestComponent;
  let stepperService: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, ClrStepperModule, ClrAccordionModule],
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
    (testComponent.form.controls.group as FormGroup).controls.name.setValue('1');
    stepperService.navigateToNextPanel('group');
    stepperService.navigateToNextPanel('group2');
    expect(testComponent.submit).toHaveBeenCalled();
  });

  it('should update panels for form errors', () => {
    spyOn(stepperService, 'setPanelsWithErrors');

    (testComponent.form.controls.group as FormGroup).controls.name.markAsTouched();
    stepperService.navigateToNextPanel('group');
    fixture.detectChanges();
    stepperService.navigateToNextPanel('group2');

    expect(stepperService.setPanelsWithErrors).toHaveBeenCalled();
  });

  it('should override the initial panel if developer overrides it via clrInitialStep', () => {
    spyOn(stepperService, 'overrideInitialPanel');
    fixture.detectChanges();
    expect(stepperService.overrideInitialPanel).not.toHaveBeenCalled();

    testComponent.initialStep = 'group';
    fixture.detectChanges();
    expect(stepperService.overrideInitialPanel).toHaveBeenCalled();

    testComponent.showSecondStep = false;
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
      imports: [FormsModule, NoopAnimationsModule, ClrStepperModule, ClrAccordionModule],
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
    stepperService.navigateToNextPanel('group');
    stepperService.navigateToNextPanel('group2');
    expect(testComponent.submit).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form" (ngSubmit)="submit()" [clrInitialStep]="initialStep">
      <clr-step formGroupName="group">
        <input formControlName="name" />
      </clr-step>
      <clr-step *ngIf="showSecondStep" formGroupName="group2"></clr-step>
    </form>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(ClrStepper) stepper: ClrStepper;
  showSecondStep = true;
  initialStep = '';
  form = new FormGroup({
    group: new FormGroup({
      name: new FormControl('', Validators.required),
    }),
    group2: new FormGroup({}),
  });

  submit() {}
}

@Component({
  template: `
    <form clrStepper #testForm="ngForm" (ngSubmit)="submit()">
      <clr-step ngModelGroup="group"></clr-step>
      <clr-step *ngIf="showSecondStep" ngModelGroup="group2"></clr-step>
    </form>
  `,
})
class TemplateFormsTestComponent {
  @ViewChild(ClrStepper) stepper: ClrStepper;
  @ViewChild('testForm') form: FormGroup;
  showSecondStep = true;
  submit() {}
}
