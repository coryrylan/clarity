/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ClrStepButton, ClrStepButtonType } from './step-button';
import { ClrAccordionModule } from '../accordion.module';
import { AccordionService } from '../providers/accordion.service';

describe('ClrStepButton', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [AccordionService, { provide: AccordionService, useClass: MockStepperService }],
      imports: [ReactiveFormsModule, NoopAnimationsModule, ClrAccordionModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
  });

  it('should update ClrStepButton type', () => {
    expect(testComponent.button.type).toBe(ClrStepButtonType.Next);
    testComponent.buttonType = ClrStepButtonType.Submit;
    fixture.detectChanges();
    expect(testComponent.button.type).toBe(ClrStepButtonType.Submit);
  });

  it('should trigger click that sets the next step', () => {
    const stepperService = fixture.debugElement.query(By.directive(ClrStepButton)).injector.get(AccordionService);
    spyOn(stepperService, 'navigateToNextPanel');

    fixture.nativeElement.querySelector('.clr-step-button').click();
    fixture.detectChanges();
    expect(stepperService.navigateToNextPanel).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <form clrStepper [formGroup]="form">
      <clr-step formGroupName="group">
        <button [clrStepButton]="buttonType">Next</button>
      </clr-step>
    </form>
  `,
})
class TestComponent {
  @ViewChild(ClrStepButton) button: ClrStepButton;
  buttonType = ClrStepButtonType.Next;
  form = new FormGroup({ group: new FormGroup({}) });
}

class MockStepperService extends AccordionService {
  navigateToNextPanel() {}
}
