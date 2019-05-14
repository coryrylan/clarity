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

import { AccordionService } from './providers/accordion.service';
import { ClrAccordionModule } from './accordion.module';
import { ClrAccordion } from './accordion';

describe('ClrStepper', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: ReactiveFormsTestComponent;
  let accordionService: AccordionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    accordionService = fixture.debugElement.query(By.directive(ClrAccordion)).injector.get(AccordionService);
  });

  it('should project panels', () => {
    const text = fixture.nativeElement.textContent.trim();
    expect(text).toContain('Group 1');
    expect(text).toContain('Group 2');
  });

  it('should reset panels when form is reset', () => {
    spyOn(accordionService, 'resetPanels');
    testComponent.form.reset();
    fixture.detectChanges();
    expect(accordionService.resetPanels).toHaveBeenCalled();
  });

  it(
    'should reorder panels when panel content children has changed',
    fakeAsync(() => {
      spyOn(accordionService, 'syncPanels');
      testComponent.showSecondStep = false;
      fixture.detectChanges();
      tick();
      expect(accordionService.syncPanels).toHaveBeenCalled();
    })
  );

  it('should trigger ngSubmit event when all panels have completed', () => {
    spyOn(testComponent, 'submit');
    accordionService.navigateToNextPanel('group', true);
    accordionService.navigateToNextPanel('group2', true);
    expect(testComponent.submit).toHaveBeenCalled();
  });

  it('should override the initial panel if developer overrides it via clrInitialStep', () => {
    spyOn(accordionService, 'overrideInitialPanel');
    fixture.detectChanges();
    expect(accordionService.overrideInitialPanel).not.toHaveBeenCalled();

    testComponent.initialStep = 'group';
    fixture.detectChanges();
    expect(accordionService.overrideInitialPanel).toHaveBeenCalled();
  });
});

describe('ClrStepper Template Forms', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: TemplateFormsTestComponent;
  let stepperService: AccordionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormsTestComponent],
      imports: [ClrAccordionModule, FormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TemplateFormsTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    stepperService = fixture.debugElement.query(By.directive(ClrAccordion)).injector.get(AccordionService);
  });

  it(
    'should reset steps when form is reset',
    fakeAsync(() => {
      spyOn(stepperService, 'resetPanels');
      testComponent.form.reset();
      fixture.detectChanges();
      tick(); // workaround for https://github.com/angular/angular/issues/10887
      expect(stepperService.resetPanels).toHaveBeenCalled();
    })
  );

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
  @ViewChild(ClrAccordion) stepper: ClrAccordion;
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
  @ViewChild(ClrAccordion) stepper: ClrAccordion;
  @ViewChild('testForm') form: FormGroup;
  showSecondStep = true;
  submit() {}
}
