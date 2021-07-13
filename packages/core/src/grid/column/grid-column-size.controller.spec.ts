/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { registerElementSafely, state, property } from '@cds/core/internal';
import { createTestElement, removeTestElement, componentIsStable, onceEvent } from '@cds/core/test';
import { GridColumnSizeController } from './grid-column-size.controller.js';

class GridColumnSizeTestElement extends LitElement {
  @property() width?: string;
  @state() colIndex = 1;
  gridColumnSizeController = new GridColumnSizeController(this);
}

registerElementSafely('grid-column-size-test-element', GridColumnSizeTestElement);

describe('grid-column-size.controller', () => {
  let component: GridColumnSizeTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`<grid-column-size-test-element style="width: 100px; display: block;"></grid-column-size-test-element>`);
    component = element.querySelector<GridColumnSizeTestElement>('grid-column-size-test-element');
    component.colIndex = 1;
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should set CSS Custom Property for column custom width values', async () => {
    component.width = '200';
    component.gridColumnSizeController.setWidth();
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--col-1-width')).toBe('200px');

    component.width = '20%';
    component.gridColumnSizeController.setWidth();
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--col-1-width')).toBe('20%');
  });

  it('should set CSS Custom Property using the computed column width if no width specified', async () => {
    await componentIsStable(component);
    component.gridColumnSizeController.setWidth();
    expect(element.style.getPropertyValue('--col-1-width')).toBe('100px');
  });

  it('should resize a column when given a width offset', async () => {
    const event = onceEvent(component, 'widthChange');
    component.gridColumnSizeController.resize(-10);
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--col-1-width')).toBe('90px');
    const e = await event;
    expect(e.detail).toBe(90);

    component.gridColumnSizeController.resize(20);
    await componentIsStable(component);
    expect(element.style.getPropertyValue('--col-1-width')).toBe('120px');
  });
});
