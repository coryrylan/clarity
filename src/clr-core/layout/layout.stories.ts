/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@clr/core/layout';
import { boolean, select } from '@storybook/addon-knobs';
import { html } from 'lit-html';

export default {
  title: 'Experimental/Layout/All',
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
  },
};

/**
 * Horizontal Layout
 */
export const horizontalLayout = () => {
  return html`
    <div class="layout-demo">
      <cds-layout type="horizontal" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutWrap = () => {
  return html`
    <!-- demonstrates gap is only applied between inline elements even when wrapped without pushing parent container -->
    <div class="layout-demo" style="max-width: 236px">
      <cds-layout type="horizontal" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
        <cds-placeholder>5</cds-placeholder>
        <cds-placeholder>6</cds-placeholder>
        <cds-placeholder>7</cds-placeholder>
        <cds-placeholder>8</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutNoWrap = () => {
  return html`
    <div class="layout-demo" style="max-width: 273px">
      <cds-layout type="horizontal" gap="sm" wrap="none">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
        <cds-placeholder>5</cds-placeholder>
        <cds-placeholder>6</cds-placeholder>
        <cds-placeholder>7</cds-placeholder>
        <cds-placeholder>8</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignTop = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="horizontal" gap="sm" align-items="top">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignBottom = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="horizontal" gap="sm" align-items="bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignLeft = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>  
  `;
};

export const horizontalLayoutAlignRight = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignVerticalCenter = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="horizontal" gap="sm" align-items="vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignHorizontalCenter = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="horizontal-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignCenter = () => {
  return html`
    <div class="layout-demo tall-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignVerticalStretch = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="horizontal" gap="sm" align-items="vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignHorizontalStretch = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutAlignStretch = () => {
  return html`
    <div class="layout-demo tall-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutItemStretch = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-align="stretch">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const horizontalLayoutItemShrink = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="horizontal" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-align="shrink">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

/**
 * Vertical Layout
 */

export const verticalLayout = () => {
  return html`
    <div class="layout-demo">
      <cds-layout type="vertical" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutWrap = () => {
  return html`
    <!-- demonstrates gap is only applied between stacked elements without pushing parent container -->
    <div class="layout-demo" style="width: 50px">
      <cds-layout type="vertical" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignTop = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="top">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignBottom = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignLeft = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="vertical" gap="sm" align-items="left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignRight = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="vertical" gap="sm" align-items="right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignVerticalCenter = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignHorizontalCenter = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="vertical" gap="sm" align-items="horizontal-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignCenter = () => {
  return html`
    <div class="layout-demo tall-demo wide-demo">
      <cds-layout type="vertical" gap="sm" align-items="center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignVerticalStretch = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutAlignHorizontalStretch = () => {
  return html`
  <div class="layout-demo wide-demo">
    <cds-layout type="vertical" gap="sm" align-items="horizontal-stretch">
      <cds-placeholder>1</cds-placeholder>
      <cds-placeholder>2</cds-placeholder>
    </cds-layout>
  </div>
  `;
};

export const verticalLayoutAlignStretch = () => {
  return html`
    <div class="layout-demo wide-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutItemStretch = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-align="stretch">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const verticalLayoutItemShrink = () => {
  return html`
    <div class="layout-demo tall-demo">
      <cds-layout type="vertical" gap="sm" align-items="vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-align="shrink">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

/**
 * Grid Layout
 */
export const gridLayout = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
        <cds-placeholder>5</cds-placeholder>
        <cds-placeholder>6</cds-placeholder>
        <cds-placeholder>7</cds-placeholder>
        <cds-placeholder>8</cds-placeholder>
        <cds-placeholder>9</cds-placeholder>
        <cds-placeholder>10</cds-placeholder>
        <cds-placeholder>11</cds-placeholder>
        <cds-placeholder>12</cds-placeholder>

        <cds-placeholder cds-col="2">2</cds-placeholder>
        <cds-placeholder cds-col="2">2</cds-placeholder>
        <cds-placeholder cds-col="2">2</cds-placeholder>
        <cds-placeholder cds-col="2">2</cds-placeholder>
        <cds-placeholder cds-col="2">2</cds-placeholder>
        <cds-placeholder cds-col="2">2</cds-placeholder>

        <cds-placeholder cds-col="3">3</cds-placeholder>
        <cds-placeholder cds-col="3">3</cds-placeholder>
        <cds-placeholder cds-col="3">3</cds-placeholder>
        <cds-placeholder cds-col="3">3</cds-placeholder>

        <cds-placeholder cds-col="4">4</cds-placeholder>
        <cds-placeholder cds-col="4">4</cds-placeholder>
        <cds-placeholder cds-col="4">4</cds-placeholder>

        <cds-placeholder cds-col="6">6</cds-placeholder>
        <cds-placeholder cds-col="6">6</cds-placeholder>

        <cds-placeholder cds-col="12">12</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumns = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="6" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsExplicit = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder cds-col="4">1</cds-placeholder>
        <cds-placeholder cds-col="8">2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsAuto = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsResponsive = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="6@sm 3@md" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsResponsiveExplicit = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder cds-col="4@sm">1</cds-placeholder>
        <cds-placeholder cds-col="8@sm">2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsWrap = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="6" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsStartEnd = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder cds-col="start-3 8">1</cds-placeholder>
        <cds-placeholder cds-col="start-1 end-5">2</cds-placeholder>
        <cds-placeholder cds-col="4 end-13">3</cds-placeholder>
        <cds-placeholder cds-col="start-1 end-13">4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutColumnsStartEndResponsive = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="6@sm 4@md" gap="sm" align-items="stretch">
        <cds-placeholder cds-col="start-2@md">1</cds-placeholder>
        <cds-placeholder cds-col="end-12@md">2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutRows = () => {
  return html`
    <div class="layout-demo wide-demo tall-demo">
      <cds-layout type="grid" cols="6" rows="4 8@sm" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder cds-col="12" cds-row="8 4@sm">6</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutRowsStartEnd = () => {
  return html`
    <div class="layout-demo wide-demo tall-demo">
      <cds-layout type="grid" cols="4" gap="sm" align-items="stretch">
        <cds-placeholder cds-row="4 start-6">1</cds-placeholder>
        <cds-placeholder cds-row="3 start-4">2</cds-placeholder>
        <cds-placeholder cds-row="12">3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutRowsStartEndResponsive = () => {
  return html`
    <div class="layout-demo wide-demo tall-demo">
      <cds-layout type="grid" cols="12@md" rows="4@sm" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-row="start-10@sm">2</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignTop = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
    </div>  
  `;
};

export const gridLayoutAlignBottom = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="horizontal-stretch bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignLeft = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignRight = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignVerticalCenter = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="horizontal-stretch vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignCenter = () => {
  return html`
    <div class="layout-demo tall-demo wide-demo">
      <cds-layout type="grid" gap="sm" cols="auto" align-items="center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignVerticalStretch = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignHorizontalStretch = () => {
  return html`
    <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

export const gridLayoutAlignStretch = () => {
  return html`
    <div class="layout-demo wide-demo tall-demo">
      <cds-layout type="grid" cols="auto" gap="sm" align-items="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

/**
 * API Demos
 */
export const horizontalAPI = () => {
  const horizontalGap = select('gap', { 'none (default)': '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }, '');
  const horizontalAlignments = {
    'top (default)': '',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    center: 'center',
    stretch: 'stretch',
    'horizontal-center': 'horizontal-center',
    'vertical-center': 'vertical-center',
    'horizontal-stretch': 'horizontal-stretch',
    'vertical-stretch': 'vertical-stretch',
  };
  const horizontalAlignItems = select('align-items', horizontalAlignments, '');
  const horizontalAdditionalAlignItems = select('align-items (additional)', horizontalAlignments, '');
  const horizontalItemWidth = select(
    'set item width',
    { inline: 'inline-items', 'width 100%': 'block-items' },
    'inline-items'
  );
  const horizontalFixedSize = boolean('fixed container size (750x500)', true);

  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Horizontal Layout System (Experimental)</h1>
      <p cds-text="p1">
        The <code cds-text="code">cds-layout</code> component provides an easy
        way to manage horizontal layouts within Clarity.
      </p>

<div class="doc" style="margin-left: 0;padding:0">
<pre style="margin:0"><code>
&#x3C;cds-layout type=&#x22;horizontal&#x22; gap=&#x22;${horizontalGap}&#x22; align-items=&#x22;${horizontalAlignItems} ${horizontalAdditionalAlignItems}&#x22; ${
    horizontalFixedSize ? 'style="width:750px;hight:500px;"' : ''
  }&#x3E;
  &#x3C;cds-placeholder&#x3E;1&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;2&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;3&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;4&#x3C;/cds-placeholder&#x3E;
&#x3C;/cds-layout&#x3E;
</code></pre>
</div>

      ${horizontalFixedSize ? html`<p cds-text="p1">Container dimensions 750x500</p>` : ''}

      <div class="layout-demo ${
        horizontalFixedSize ? 'layout-api-demo wide-demo tall-demo' : ''
      } ${horizontalItemWidth}">
        <cds-layout type="horizontal" .gap="${horizontalGap}" .alignItems="${horizontalAlignItems} ${horizontalAdditionalAlignItems}">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const verticalAPI = () => {
  const verticalGap = select('gap', { 'none (default)': '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }, '');
  const verticalAlignments = {
    'top (default)': '',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    center: 'center',
    stretch: 'stretch',
    'horizontal-center': 'horizontal-center',
    'vertical-center': 'vertical-center',
    'horizontal-stretch': 'horizontal-stretch',
    'vertical-stretch': 'vertical-stretch',
  };
  const verticalAlignItems = select('align-items', verticalAlignments, '');
  const verticalAdditionalAlignItems = select('align-items (additional)', verticalAlignments, '');
  const verticalItemWidth = select(
    'set item width',
    { inline: 'inline-items', 'width 100%': 'block-items' },
    'inline-items'
  );
  const verticalFixedSize = boolean('fixed container size (750x500)', true);

  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Horizontal Layout System (Experimental)</h1>
      <p cds-text="p1">
        The <code cds-text="code">cds-layout</code> component provides an easy
        way to manage vertical layouts within Clarity.
      </p>

<div class="doc" style="margin-left: 0;padding:0">
<pre style="margin:0"><code>
&#x3C;cds-layout type=&#x22;vertical&#x22; gap=&#x22;${verticalGap}&#x22; align-items=&#x22;${verticalAlignItems} ${verticalAdditionalAlignItems}&#x22; ${
    verticalFixedSize ? 'style="width:750px;hight:500px;"' : ''
  }&#x3E;
  &#x3C;cds-placeholder&#x3E;1&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;2&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;3&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;4&#x3C;/cds-placeholder&#x3E;
&#x3C;/cds-layout&#x3E;
</code></pre>
</div>

      ${verticalFixedSize ? html`<p cds-text="p1">Container dimensions 750x500</p>` : ''}

      <div class="layout-demo ${verticalFixedSize ? 'layout-api-demo wide-demo tall-demo' : ''} ${verticalItemWidth}">
        <cds-layout type="vertical" .gap="${verticalGap}" .alignItems="${verticalAlignItems} ${verticalAdditionalAlignItems}">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const gridAPI = () => {
  const gridGapValue = select('gap', { 'none (default)': '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }, '');
  const gridAlignments = {
    'top (default)': '',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    center: 'center',
    stretch: 'stretch',
    'horizontal-center': 'horizontal-center',
    'vertical-center': 'vertical-center',
    'horizontal-stretch': 'horizontal-stretch',
    'vertical-stretch': 'vertical-stretch',
  };
  const gridAlignItems = select('align-items', gridAlignments, '');
  const additionalAlignItems = select('align-items (additional)', gridAlignments, '');
  const gridCols = select(
    'cols',
    {
      '12 (default)': '',
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    ''
  );
  const gridRowsValue = select('rows', ['auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], 'auto');
  const gridItemWidth = select(
    'set item width',
    { inline: 'inline-items', 'width 100%': 'block-items' },
    'inline-items'
  );
  const gridFixedSize = boolean('fixed container size (750x500)', true);

  return html`
    <cds-layout type="vertical" gap="md">
      <h1 cds-text="h1">Grid Layout System (Experimental)</h1>

<div class="doc" style="margin-left: 0;padding:0">
<pre style="margin:0"><code>
&#x3C;cds-layout type=&#x22;grid&#x22; gap=&#x22;${gridGapValue}&#x22; cols=&#x22;${gridCols}&#x22; rows=&#x22;${gridRowsValue}&#x22; align-items=&#x22;${gridAlignItems} ${additionalAlignItems}&#x22;&#x3E;
  &#x3C;cds-placeholder&#x3E;1&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;2&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;3&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;4&#x3C;/cds-placeholder&#x3E;
&#x3C;/cds-layout&#x3E;
</code></pre>
</div>

      ${gridFixedSize ? html`<p cds-text="p1">Container dimensions 750x500</p>` : ''}

      <div class="layout-demo ${gridFixedSize ? 'layout-api-demo wide-demo tall-demo' : ''} ${gridItemWidth}">
        <cds-layout type="grid" .gap="${gridGapValue}" .cols="${gridCols}" .rows="${gridRowsValue}" .alignItems="${gridAlignItems} ${additionalAlignItems}">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

/**
 * Utilities
 */

export const utilitiesSpacing = () => {
  return html`
    <style>
      .spacing-demo cds-placeholder {
        padding: 0;
      }

      .spacing-demo div[cds-pad] {
        background: hsl(92, 46%, 74%);
      }

      .spacing-demo cds-layout[pad] {
        background: hsl(92, 46%, 74%);
      }
    </style>
    <cds-layout type="vertical" gap="lg" class="spacing-demo">
      <h1 cds-text="h1">Spacing</h1>

      <h2 cds-heading="2">Padding</h2>
      <cds-layout type="vertical" gap="lg">
        <div cds-pad="none"><cds-placeholder>cds-pad="none"</cds-placeholder></div>
        <div cds-pad="xs"><cds-placeholder>cds-pad="xs"</cds-placeholder></div>
        <div cds-pad="sm"><cds-placeholder>cds-pad="sm"</cds-placeholder></div>
        <div cds-pad="md"><cds-placeholder>cds-pad="md"</cds-placeholder></div>
        <div cds-pad="lg"><cds-placeholder>cds-pad="lg"</cds-placeholder></div>
        <div cds-pad="xl"><cds-placeholder>cds-pad="xl"</cds-placeholder></div>

        <div cds-pad="[md,none]"><cds-placeholder>cds-pad="[md,none]"</cds-placeholder></div>
        <div cds-pad="[xs,xl]"><cds-placeholder>cds-pad="[xs,xl]"</cds-placeholder></div>
        <div cds-pad="[lg,sm]@lg"><cds-placeholder>cds-pad="[xs,xl]"</cds-placeholder></div>
      </cds-layout>

      <h2 cds-heading="2">Padding cds-layout</h2>
      <cds-layout type="horizontal" pad="xs">
        <cds-placeholder>pad='xs'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="sm">
        <cds-placeholder>pad='sm'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="md">
        <cds-placeholder>pad='md'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="lg">
        <cds-placeholder>pad='lg'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="xl">
        <cds-placeholder>pad='xl'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="[none,md]">
        <cds-placeholder>pad='[none,md]'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="[sm,xs]">
        <cds-placeholder>pad='[sm,xs]'</cds-placeholder>
      </cds-layout>
      <cds-layout type="horizontal" pad="[xl,lg]">
        <cds-placeholder>pad='[xl,lg]'</cds-placeholder>
      </cds-layout>
    </cds-layout>
  `;
};

export const utilitiesDisplay = () => {
  return html`
  <h1 cds-text="h1">Display</h1>
    <div class="layout-demo wide-demo">
      <cds-layout type="vertical" gap="md" align-items="stretch">
        <cds-placeholder cds-display="none flex@sm">none flex@sm</cds-placeholder>
        <cds-placeholder>...<span cds-display="none inline@md">none inline@md</span>...</cds-placeholder>
        <cds-placeholder cds-display="none block@lg">none block@lg</cds-placeholder>
        <cds-placeholder cds-display="none@lg">none@lg</cds-placeholder>
      </cds-layout>
    </div>
  `;
};

/**
 * Patterns
 */
export const patternsApplication = () => {
  return html`
    <cds-layout type="vertical" gap="sm" align-items="stretch" style="height: 100vh">
      <cds-placeholder cds-align="shrink">header</cds-placeholder>
      <cds-layout type="horizontal" gap="sm" align-items="stretch" wrap="none">
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
        <cds-placeholder demo-content>
          <div>Scrollable Content</div>
        </cds-placeholder>
      </cds-layout>
    </cds-layout>
  `;
};

export const patternsContentSite = () => {
  return html`
    <cds-layout type="vertical" gap="sm" align-items="stretch" style="height: 100vh">
      <cds-placeholder cds-align="shrink">header</cds-placeholder>
      <cds-layout type="horizontal" gap="sm" align-items="stretch">
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
        <cds-placeholder>content</cds-placeholder>
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
      </cds-layout>
      <cds-placeholder cds-align="shrink">footer</cds-placeholder>
    </cds-layout>
  `;
};

export const patternsResponsiveImageGallery = () => {
  return html`
    <cds-layout type="grid" cols="6@sm 4@md 3@lg 2@xl" gap="sm" align-items="horizontal-stretch">
      <cds-placeholder cds-col="12">header</cds-placeholder>
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <img src="https://dummyimage.com/600x400/000/fff" alt="placeholder image" demo-img />
      <cds-placeholder cds-col="12">footer</cds-placeholder>
    </cds-layout>
  `;
};
