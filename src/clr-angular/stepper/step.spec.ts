/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ClrStepperModule } from './stepper.module';
import { ClrStep } from './step';
import { StepperService } from './providers/stepper.service';
import { Step } from './models/step.model';
import { StepStatus } from './enums/step-status.enum';

describe('ClrStep', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      providers: [{ provide: StepperService, useClass: MockStepperService }],
      imports: [ClrStepperModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    fixture.detectChanges();
  });

  it('should open step only if step was previously completed', () => {
    const stepperService = fixture.debugElement.query(By.directive(ClrStep)).injector.get(StepperService);
    const headerButton = fixture.nativeElement.querySelector('.clr-step-header-button');
    const mockStep = new Step(0, 0);
    spyOn(stepperService, 'setActiveStep');

    headerButton.click();
    fixture.detectChanges();
    expect(stepperService.setActiveStep).not.toHaveBeenCalled();

    mockStep.status = StepStatus.Complete;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();

    headerButton.click();
    fixture.detectChanges();
    expect(stepperService.setActiveStep).toHaveBeenCalled();
  });

  it('should show the appropriate aria-live if step has an error', () => {});

  it('should show the appropriate aria-live if step is complete', () => {});

  it('should set the appropriate aria-hidden and aria-expanded attribute values', () => {});
});

@Component({
  template: `
    <form [formGroup]="form">
      <clr-step formGroupName="group"></clr-step>
    </form>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(ClrStep) step: ClrStep;
  form = new FormGroup({ group: new FormGroup({}) });
}

class MockStepperService extends StepperService {
  step = new BehaviorSubject<Step>(new Step(0, 0));

  setActiveStep() {}

  getStepChanges() {
    return this.step;
  }
}
