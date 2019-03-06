/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StepperService } from './providers/stepper.service';
import { ClrStepperModule } from './stepper.module';
import { ClrStepper } from './stepper';

describe('ClrStepper', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: TestComponent;
  let stepperService: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClrStepperModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    stepperService = fixture.debugElement.query(By.directive(ClrStepper)).injector.get(StepperService);
  });

  it('should project steps', () => {
    const text = fixture.nativeElement.textContent.trim();
    expect(text).toContain('Group 1');
    expect(text).toContain('Group 2');
  });

  it(
    'should reset steps when form is reset',
    fakeAsync(() => {
      spyOn(stepperService, 'resetSteps');
      testComponent.form.reset();
      fixture.detectChanges();
      tick(); // workaround for https://github.com/angular/angular/issues/10887
      expect(stepperService.resetSteps).toHaveBeenCalled();
    })
  );

  it('should reorder steps when step content children has changed', () => {
    spyOn(stepperService, 'syncSteps');
    testComponent.showSecondStep = false;
    fixture.detectChanges();
    expect(stepperService.syncSteps).toHaveBeenCalled();
  });

  it('should trigger ngSubmit event when all steps have completed', () => {
    spyOn(testComponent, 'submit');
    stepperService.setNextStep(0, true);
    stepperService.setNextStep(1, true);
    expect(testComponent.submit).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form" (ngSubmit)="submit()">
      <clr-step formGroupName="group">
        <clr-step-title>Group 1</clr-step-title>
      </clr-step>
      <clr-step *ngIf="showSecondStep" formGroupName="group2">
        <clr-step-title>Group 2</clr-step-title>
      </clr-step>
    </form>
  `,
})
class TestComponent {
  @ViewChild(ClrStepper) stepper: ClrStepper;
  showSecondStep = true;
  form = new FormGroup({
    group: new FormGroup({}),
    group2: new FormGroup({}),
  });

  submit() {}
}
