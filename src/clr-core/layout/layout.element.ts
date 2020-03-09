/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { property, registerElementSafely } from '@clr/core/common';
import { html, LitElement } from 'lit-element';

/**
 * cds-layout provide a easy way to manage layouts within Clarity.
 *
 * ```typescript
 * import '@clr/core/layout';
 * ```
 *
 * ```html
 * <link href="/node_modules/@clr/core/global.min.css" rel="stylesheet">
 * ```
 *
 * ```html
 * <cds-layout type="grid" cols="2" gap="sm">
 *   <p>1</p>
 *   <p>2</p>
 * </cds-layout>
 * ```
 *
 * @element cds-layout
 * @slot default - Content slot for layout
 */
// @dynamic
export class CdsLayout extends LitElement {
  /**
   * Set the layout type, can horizontally inline, vertically stack
   * or use grid for multi column and row layouts.
   *
   * ```html
   * <cds-layout type="grid"></cds-layout>
   * ```
   */
  @property({ type: String })
  type: 'horizontal' | 'vertical' | 'grid';

  /**
   * Set the alignment of the layout items
   *
   * top | right | bottom | left | center | stretch | horizontal-center | vertical-center | horizontal-stretch | vertical-stretch
   *
   * ```html
   * <cds-layout type="grid" align-items="center"></cds-layout>
   * ```
   */
  @property({ type: String, attribute: 'align-items' })
  alignItems: string; // https://github.com/microsoft/TypeScript/issues/6579

  /**
   * Set the number of desired grid columns
   *
   * Columns: 1-12 | auto
   *
   * Breakpoints: @sm | @md | @lg | @xl
   *
   * ```html
   * <cds-layout type="grid" cols="6@sm 4@lg"></cds-layout>
   * ```
   */
  @property({ type: String })
  cols: string;
  // https://github.com/microsoft/TypeScript/issues/6579

  /**
   * Set the number of desired grid rows
   *
   * Rows: 1-12 | auto
   *
   * Breakpoints: @sm | @md | @lg | @xl
   *
   * ```html
   * <cds-layout type="grid" rows="6@sm 4@lg"></cds-layout>
   * ```
   */
  @property({ type: String })
  rows: string;

  /**
   * Set the gap spacing between layout items
   *
   * Gap Sizes: xs | sm | md | lg | xl | none | '[vertical, horizontal]'
   *
   * ```html
   * <cds-layout type="horizontal" gap="sm"></cds-layout>
   * ```
   */
  @property({ type: String })
  gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | string;

  render() {
    return html`<slot></slot>`;
  }
}

registerElementSafely('cds-layout', CdsLayout);

declare global {
  interface HTMLElementTagNameMap {
    'cds-layout': CdsLayout;
  }
}
