/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
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
    expect(stepperService.navigateToPreviouslyCompletedStep).not.toHaveBeenCalled();

    mockStep.status = StepStatus.Complete;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();

    headerButton.click();
    fixture.detectChanges();
    expect(stepperService.navigateToPreviouslyCompletedStep).toHaveBeenCalled();
  });

  it('should show the appropriate aria-live message', () => {
    const mockStep = new Step(0, 0);
    const stepperService = fixture.debugElement.query(By.directive(ClrStep)).injector.get(StepperService);
    let liveSection: HTMLElement = fixture.nativeElement.querySelector('.clr-screen-reader-only');
    expect(liveSection).toBe(null);

    mockStep.status = StepStatus.Error;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();
    liveSection = fixture.nativeElement.querySelector('.clr-screen-reader-only');
    expect(liveSection.getAttribute('aria-live')).toBe('assertive');
    expect(liveSection.innerText.trim()).toBe('Please check step for errors.');

    mockStep.status = StepStatus.Complete;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();
    expect(liveSection.innerText.trim()).toBe('Step completed.');
  });

  it('should set the appropriate aria-hidden and aria-expanded attribute values', () => {
    const mockStep = new Step(0, 0);
    const stepperService = fixture.debugElement.query(By.directive(ClrStep)).injector.get(StepperService);
    const headerButton: HTMLElement = fixture.nativeElement.querySelector('.clr-step-header-button');
    const stepContent: HTMLElement = fixture.nativeElement.querySelector('#clr-step-content-00');
    expect(headerButton.getAttribute('aria-expanded')).toBe('true');
    expect(stepContent.getAttribute('aria-hidden')).toBe('false');

    mockStep.open = false;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();
    expect(headerButton.getAttribute('aria-expanded')).toBe('false');
    expect(stepContent.getAttribute('aria-hidden')).toBe('true');
  });

  it(
    'should show or hide content based on if step is open',
    fakeAsync(() => {
      const mockStep = new Step(0, 0);
      const stepperService = fixture.debugElement.query(By.directive(ClrStep)).injector.get(StepperService);
      expect(fixture.nativeElement.querySelector('.clr-step-content').innerText.trim()).toBe('test step');

      mockStep.open = false;
      (stepperService as MockStepperService).step.next(mockStep);
      fixture.detectChanges();
      tick(300); // wait for animation to complete
      expect(fixture.nativeElement.querySelector('.clr-step-content')).toBe(null);
    })
  );
});

@Component({
  template: `
    <form [formGroup]="form">
      <clr-step formGroupName="group">
        test step
      </clr-step>
    </form>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(ClrStep) step: ClrStep;
  form = new FormGroup({ group: new FormGroup({}) });
}

class MockStepperService extends StepperService {
  step = new BehaviorSubject<Step>(new Step(0, 0));

  navigateToPreviouslyCompletedStep() {}

  getStepChanges() {
    return this.step;
  }
}
