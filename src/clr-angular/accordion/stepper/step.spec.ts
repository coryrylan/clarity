/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ClrAccordionModule } from '../accordion.module';
import { ClrStepperModule } from './stepper.module';
import { AccordionStatus } from './../enums/accordion-status.enum';
import { AccordionPanelModel } from '../models/accordion.model';
import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';
import { ClrStepper } from './stepper';

describe('ClrStep Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormsTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      providers: [{ provide: StepperService, useClass: MockStepperService }],
      imports: [ReactiveFormsModule, NoopAnimationsModule, ClrStepperModule, ClrAccordionModule],
    });

    TestBed.overrideComponent(ClrStepper, {
      set: { providers: [{ provide: StepperService, useClass: MockStepperService }] },
    });

    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    fixture.detectChanges();
  });

  it('should use reactive forms to access form groups', () => {
    fixture.componentInstance.step.ngOnInit();
    expect(fixture.componentInstance.step.id).toBe('groupName');
  });

  it('should show the appropriate aria-live message based on form state', () => {
    const mockStep = new AccordionPanelModel('groupName', 0);
    const stepperService = fixture.debugElement.query(By.directive(ClrStep)).injector.get(StepperService);
    let liveSection: HTMLElement = fixture.nativeElement.querySelector('.clr-screen-reader-only');
    expect(liveSection).toBe(null);

    mockStep.status = AccordionStatus.Error;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();
    liveSection = fixture.nativeElement.querySelector('.clr-screen-reader-only');
    expect(liveSection.getAttribute('aria-live')).toBe('assertive');
    expect(liveSection.innerText.trim()).toBe('Error');

    mockStep.status = AccordionStatus.Complete;
    (stepperService as MockStepperService).step.next(mockStep);
    fixture.detectChanges();
    expect(liveSection.innerText.trim()).toBe('Success');
  });
});

describe('ClrStep Template Forms', () => {
  let fixture: ComponentFixture<TemplateFormsTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormsTestComponent],
      imports: [FormsModule, NoopAnimationsModule, ClrStepperModule, ClrAccordionModule],
    });

    fixture = TestBed.createComponent(TemplateFormsTestComponent);
    fixture.detectChanges();
  });

  it('should use template forms to access form groups', () => {
    expect(fixture.componentInstance.step.id).toBe('groupName');
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form">
      <clr-step formGroupName="groupName">test step</clr-step>
    </form>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(ClrStep) step: ClrStep;
  form = new FormGroup({ groupName: new FormGroup({}) });
}

@Component({
  template: `
    <form clrStepper #testForm="ngForm">
      <clr-step ngModelGroup="groupName">test step</clr-step>
    </form>
  `,
})
class TemplateFormsTestComponent {
  @ViewChild(ClrStep) step: ClrStep;
}

class MockStepperService extends StepperService {
  step = new BehaviorSubject<AccordionPanelModel>(new AccordionPanelModel('groupName', 0));

  getPanelChanges() {
    return this.step;
  }
}
