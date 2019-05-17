/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ClrAccordionModule } from './accordion.module';
import { ClrAccordionPanel } from './accordion-panel';
import { AccordionService } from './providers/accordion.service';
import { AccordionStatus } from './enums/accordion-status.enum';
import { AccordionPanelModel } from './models/accordion.model';

describe('ClrAccordionPanel', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  const panel1Id = '0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [{ provide: AccordionService, useClass: MockAccordionService }],
      imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
  });

  it('should allow a panel to be programmatically opened', () => {
    testComponent.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toContain('panel');
  });

  // it('should show the appropriate aria-live message', () => {
  //   const mockPanel = new AccordionPanelModel(panel1Id, 0);
  //   const accordionService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
  //   let liveSection: HTMLElement = fixture.nativeElement.querySelector('.clr-screen-reader-only');
  //   expect(liveSection).toBe(null);

  //   mockPanel.status = AccordionStatus.Error;
  //   (accordionService as MockAccordionService).panel.next(mockPanel);
  //   fixture.detectChanges();
  //   liveSection = fixture.nativeElement.querySelector('.clr-screen-reader-only');
  //   expect(liveSection.getAttribute('aria-live')).toBe('assertive');
  //   expect(liveSection.innerText.trim()).toBe('Please check step for errors.');

  //   mockPanel.status = AccordionStatus.Complete;
  //   (accordionService as MockAccordionService).panel.next(mockPanel);
  //   fixture.detectChanges();
  //   expect(liveSection.innerText.trim()).toBe('Step completed.');
  // });

  // it('should set the appropriate aria-hidden and aria-expanded attribute values', () => {
  //   const mockStep = new AccordionPanelModel(step1Id, 0);
  //   const stepperService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
  //   const headerButton: HTMLElement = fixture.nativeElement.querySelector('.clr-accordion-header-button');
  //   const stepContent: HTMLElement = fixture.nativeElement.querySelector('#clr-accordion-content-groupName0');

  //   expect(headerButton.getAttribute('aria-expanded')).toBe('false');
  //   expect(stepContent.getAttribute('aria-hidden')).toBe('true');

  //   mockStep.isOpen = true;
  //   (stepperService as MockStepperService).step.next(mockStep);
  //   fixture.detectChanges();
  //   expect(headerButton.getAttribute('aria-expanded')).toBe('true');
  //   expect(stepContent.getAttribute('aria-hidden')).toBe('false');
  // });

  // it('should show or hide content based on if step is open', () => {
  //   const mockStep = new AccordionPanelModel(step1Id, 0);
  //   const stepperService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
  //   expect(fixture.nativeElement.querySelector('.clr-accordion-content')).toBe(null);

  //   mockStep.isOpen = true;
  //   (stepperService as MockStepperService).step.next(mockStep);
  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.querySelector('.clr-accordion-content').innerText.trim()).toBe('test step');
  // });
});

@Component({
  template: `
    <clr-accordion>
      <clr-accordion-panel [clrAccordionPanelOpen]="open">panel</clr-accordion-panel>
    </clr-accordion>
  `,
})
class TestComponent {
  open = false;
}

class MockAccordionService extends AccordionService {
  panel = new BehaviorSubject<AccordionPanelModel>(new AccordionPanelModel('groupName', 0));

  getPanelChanges() {
    return this.panel;
  }
}
