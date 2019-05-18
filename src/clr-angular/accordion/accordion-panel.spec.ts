/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ClrAccordionModule } from './accordion.module';
import { By } from '@angular/platform-browser';
import { ClrAccordionPanel } from './accordion-panel';

describe('ClrAccordionPanel', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClrAccordionModule, ReactiveFormsModule, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
  });

  it('should allow a panel to be programmatically opened', () => {
    testComponent.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('panel');

    testComponent.open = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('');
  });

  it('should set the appropriate aria attribute values', () => {
    const panel = fixture.debugElement.query(By.directive(ClrAccordionPanel));
    const headerButton: HTMLElement = panel.nativeElement.querySelector('button');
    const content = panel.nativeElement.querySelector('#clr-accordion-content-11');

    expect(headerButton.getAttribute('aria-expanded')).toBe('false');
    expect(headerButton.getAttribute('id')).toBe('clr-accordion-header-11');
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(content.getAttribute('aria-labelledby')).toBe('clr-accordion-header-11');

    headerButton.click();
    fixture.detectChanges();

    expect(headerButton.getAttribute('aria-expanded')).toBe('true');
    expect(content.getAttribute('aria-hidden')).toBe('false');
  });
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
