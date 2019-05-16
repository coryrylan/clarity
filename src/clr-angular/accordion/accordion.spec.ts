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

describe('ClrAccordion', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: AccordionTestComponent;
  let accordionService: AccordionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionTestComponent],
      imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(AccordionTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    accordionService = fixture.debugElement.query(By.directive(ClrAccordion)).injector.get(AccordionService);
  });

  it('should project panels', () => {
    const panels = fixture.nativeElement.querySelectorAll('clr-accordion-panel');
    expect(panels.length).toBe(3);
  });

  it(
    'should open one panel at a time',
    fakeAsync(() => {
      const panelButtons = fixture.nativeElement.querySelectorAll('clr-accordion-panel button');

      panelButtons[0].click();
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent.trim()).toContain('panel 1');

      panelButtons[1].click();
      fixture.detectChanges();
      tick(200); // delay for animation

      expect(fixture.nativeElement.textContent.trim()).toContain('panel 2');
      expect(fixture.nativeElement.textContent.trim()).not.toContain('panel 1');
    })
  );

  it('should allow multiple open panels when in multi panel mode', () => {
    const panelButtons = fixture.nativeElement.querySelectorAll('clr-accordion-panel button');
    testComponent.multi = true;
    fixture.detectChanges();

    panelButtons[0].click();
    panelButtons[1].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toContain('panel 1');
    expect(fixture.nativeElement.textContent.trim()).toContain('panel 2');
    expect(fixture.nativeElement.textContent.trim()).not.toContain('panel 3');
  });

  it('should allow a panel to be programmatically opened', () => {
    testComponent.openThirdStep = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toContain('panel 3');
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
});

@Component({
  template: `
    <clr-accordion [clrAccordionMultiPanel]="multi">
      <clr-accordion-panel>panel 1</clr-accordion-panel>
      <clr-accordion-panel *ngIf="showSecondStep">panel 2</clr-accordion-panel>
      <clr-accordion-panel [(clrAccordionPanelOpen)]="openThirdStep">panel 3</clr-accordion-panel>
    </clr-accordion>
  `,
})
class AccordionTestComponent {
  multi = false;
  openThirdStep = false;
  showSecondStep = true;
}
