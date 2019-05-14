/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrAccordionModule } from './accordion.module';

describe('ClrStepDescription', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClrAccordionModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('projects content', () => {
    expect(fixture.nativeElement.textContent.trim()).toMatch('Hello world');
  });
});

@Component({
  template: `<clr-step-description>Hello world</clr-step-description>`,
})
class TestComponent {}
