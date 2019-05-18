/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

// import { Component, ViewChild } from '@angular/core';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { BehaviorSubject } from 'rxjs';

// import { ClrAccordionModule } from './accordion.module';
// import { ClrAccordionPanel } from './accordion-panel';
// import { AccordionService } from './providers/accordion.service';
// import { AccordionPanelModel } from './models/accordion-panel.model';
// import { AccordionStatus } from './enums/accordion-status.enum';

// describe('ClrStep', () => {
//   let fixture: ComponentFixture<ReactiveFormsTestComponent>;
//   const step1Id = 'groupName';

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ReactiveFormsTestComponent],
//       providers: [{ provide: AccordionService, useClass: MockStepperService }],
//       imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
//     });

//     fixture = TestBed.createComponent(ReactiveFormsTestComponent);
//     fixture.detectChanges();
//   });

// it('should allow a panel to be programmatically opened', () => {
//   testComponent.openThirdStep = true;
//   fixture.detectChanges();
//   expect(fixture.nativeElement.textContent.trim()).toContain('panel 3');
// });

//   it('should show the appropriate aria-live message', () => {
//     const mockStep = new AccordionPanelModel(step1Id, 0);
//     const stepperService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
//     let liveSection: HTMLElement = fixture.nativeElement.querySelector('.clr-screen-reader-only');
//     expect(liveSection).toBe(null);

//     mockStep.status = AccordionStatus.Error;
//     (stepperService as MockStepperService).step.next(mockStep);
//     fixture.detectChanges();
//     liveSection = fixture.nativeElement.querySelector('.clr-screen-reader-only');
//     expect(liveSection.getAttribute('aria-live')).toBe('assertive');
//     expect(liveSection.innerText.trim()).toBe('Please check step for errors.');

//     mockStep.status = AccordionStatus.Complete;
//     (stepperService as MockStepperService).step.next(mockStep);
//     fixture.detectChanges();
//     expect(liveSection.innerText.trim()).toBe('Step completed.');
//   });

//   it('should set the appropriate aria-hidden and aria-expanded attribute values', () => {
//     const mockStep = new AccordionPanelModel(step1Id, 0);
//     const stepperService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
//     const headerButton: HTMLElement = fixture.nativeElement.querySelector('.clr-accordion-header-button');
//     const stepContent: HTMLElement = fixture.nativeElement.querySelector('#clr-accordion-content-groupName0');

//     expect(headerButton.getAttribute('aria-expanded')).toBe('false');
//     expect(stepContent.getAttribute('aria-hidden')).toBe('true');

//     mockStep.isOpen = true;
//     (stepperService as MockStepperService).step.next(mockStep);
//     fixture.detectChanges();
//     expect(headerButton.getAttribute('aria-expanded')).toBe('true');
//     expect(stepContent.getAttribute('aria-hidden')).toBe('false');
//   });

//   it('should show or hide content based on if step is open', () => {
//     const mockStep = new AccordionPanelModel(step1Id, 0);
//     const stepperService = fixture.debugElement.query(By.directive(ClrAccordionPanel)).injector.get(AccordionService);
//     expect(fixture.nativeElement.querySelector('.clr-accordion-content')).toBe(null);

//     mockStep.isOpen = true;
//     (stepperService as MockStepperService).step.next(mockStep);
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelector('.clr-accordion-content').innerText.trim()).toBe('test step');
//   });
// });

// describe('ClrStep Template Forms', () => {
//   let fixture: ComponentFixture<TemplateFormsTestComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TemplateFormsTestComponent],
//       providers: [{ provide: AccordionService, useClass: MockStepperService }],
//       imports: [ClrAccordionModule, FormsModule, NoopAnimationsModule],
//     });

//     fixture = TestBed.createComponent(TemplateFormsTestComponent);
//     fixture.detectChanges();
//   });

//   it('should use template forms to access form groups', () => {
//     expect(fixture.componentInstance.step.name).toBe('groupName');
//     fixture.componentInstance.step.ngOnInit();
//   });
// });

// @Component({
//   template: `
//     <form [formGroup]="form">
//       <clr-step formGroupName="groupName">
//         test step
//       </clr-step>
//     </form>
//   `,
// })
// class ReactiveFormsTestComponent {
//   @ViewChild(ClrAccordionPanel) step: ClrAccordionPanel;
//   form = new FormGroup({ groupName: new FormGroup({}) });
// }

// @Component({
//   template: `
//     <form #testForm="ngForm">
//       <clr-step ngModelGroup="groupName">
//         test step
//       </clr-step>
//     </form>
//   `,
// })
// class TemplateFormsTestComponent {
//   @ViewChild(ClrAccordionPanel) step: ClrAccordionPanel;
// }

// class MockStepperService extends AccordionService {
//   step = new BehaviorSubject<AccordionPanelModel>(new AccordionPanelModel('groupName', 0));

//   navigateToPreviouslyCompletedStep() {}

//   getPanelChanges() {
//     return this.step;
//   }
// }
