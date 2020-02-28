/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-html';

export default {
  title: 'Documentation|Layout (Experimental)',
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
  },
};

export const API = () => {
  const type = select('type', ['horizontal', 'vertical', 'grid'], 'horizontal');
  const gap = select('gap', ['none', 'xs', 'sm', 'md', 'lg', 'xl'], 'sm');
  const xAlign = select('x-align', ['left', 'right', 'center', 'stretch'], 'left');
  const yAlign = select('y-align', ['top', 'bottom', 'center', 'stretch'], 'top');
  const cols = select('cols (grid only)', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'auto');
  const rows = select('rows (grid only)', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'auto');
  const itemWidth = select(
    'set item width',
    { inline: 'inline-items', 'width 100%': 'block-items', 'fixed width 125px': 'fixed-items' },
    'inline'
  );

  return html`
    <cds-layout type="vertical" gap="md">
      <h1 cds-text="h1">Layout System (Experimental) <span cds-text="h4 code">cds-layout</span></h1>

<div class="doc" style="margin-left: 0;padding:0">
<pre style="margin:0"><code>
&#x3C;cds-layout type=&#x22;${type}&#x22; gap=&#x22;${gap}&#x22; cols=&#x22;${cols}&#x22; rows=&#x22;${rows}&#x22; x-align=&#x22;${xAlign}&#x22; y-align=&#x22;${yAlign}&#x22;&#x3E;
  &#x3C;cds-placeholder&#x3E;1&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;2&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;3&#x3C;/cds-placeholder&#x3E;
  &#x3C;cds-placeholder&#x3E;4&#x3C;/cds-placeholder&#x3E;
&#x3C;/cds-layout&#x3E;
</code></pre>
</div>

      <p cds-text="p1">Container dimensions 750x500</p>

      <div class="layout-demo layout-api-demo wide-demo tall-demo ${itemWidth}">
        <cds-layout type="${type}" gap="${gap}" cols="${cols}" rows="${rows}" x-align="${xAlign}" y-align="${yAlign}">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const horizontal = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Horizontal Layout</h1>

      <div class="layout-demo">
        <cds-layout type="horizontal" gap="sm">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Horizontal Wrap</h2>
      <!-- demonstrates gap is only applied between inline elements even when wrapped without pushing parent container -->
      <div class="layout-demo" style="width: 245px">
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

      <h2 cds-text="h2">Align Right</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm" x-align="right" demo>
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Left</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm" x-align="left">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Horizontal Center</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm" x-align="center">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Horizontal Stretch</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Horizontal Item Stretch</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder cds-layout="stretch">2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Horizontal Item Shrink</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="horizontal" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder cds-layout="shrink">2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Top</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="horizontal" gap="sm" y-align="top">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Bottom</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="horizontal" gap="sm" y-align="bottom">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Center</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="horizontal" gap="sm" y-align="center">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Stretch</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="horizontal" gap="sm" y-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const vertical = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Vertical Layout</h1>

      <div class="layout-demo">
        <cds-layout type="vertical" gap="sm">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Vertical Wrap</h2>
      <!-- demonstrates gap is only applied between stacked elements without pushing parent container -->
      <div class="layout-demo" style="width: 52px">
        <cds-layout type="vertical" gap="sm">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Left</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="vertical" gap="sm" x-align="left">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Right</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="vertical" gap="sm" x-align="right">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Horizontal Center</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="vertical" gap="sm" x-align="center">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Horizontal Stretch</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="vertical" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Top</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm" y-align="top">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Bottom</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm" y-align="bottom">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Center</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm" y-align="center">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Stretch</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm" y-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Vertical Item Stretch</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder cds-layout="stretch">2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Vertical Item Shrink</h2>
      <div class="layout-demo tall-demo">
        <cds-layout type="vertical" gap="sm" y-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder cds-layout="shrink">2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const grid = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Layout Grid</h1>

      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="12" gap="sm" x-align="stretch">
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

          <cds-placeholder cds-col="span-2">2</cds-placeholder>
          <cds-placeholder cds-col="span-2">2</cds-placeholder>
          <cds-placeholder cds-col="span-2">2</cds-placeholder>
          <cds-placeholder cds-col="span-2">2</cds-placeholder>
          <cds-placeholder cds-col="span-2">2</cds-placeholder>
          <cds-placeholder cds-col="span-2">2</cds-placeholder>

          <cds-placeholder cds-col="span-3">3</cds-placeholder>
          <cds-placeholder cds-col="span-3">3</cds-placeholder>
          <cds-placeholder cds-col="span-3">3</cds-placeholder>
          <cds-placeholder cds-col="span-3">3</cds-placeholder>

          <cds-placeholder cds-col="span-4">4</cds-placeholder>
          <cds-placeholder cds-col="span-4">4</cds-placeholder>
          <cds-placeholder cds-col="span-4">4</cds-placeholder>

          <cds-placeholder cds-col="span-6">6</cds-placeholder>
          <cds-placeholder cds-col="span-6">6</cds-placeholder>

          <cds-placeholder cds-col="span-12">12</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const gridColumns = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Columns</h1>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="2" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Explicit Columns</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" gap="sm" x-align="stretch">
          <cds-placeholder cds-col="span-4">1</cds-placeholder>
          <cds-placeholder cds-col="span-8">2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Auto Columns</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="auto" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Responsive Columns</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="2@sm 4@md" gap="sm" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder>4</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Explicit Responsive Columns</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" gap="sm" x-align="stretch">
          <cds-placeholder cds-col="span-4@sm">1</cds-placeholder>
          <cds-placeholder cds-col="span-8@sm">2</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const gridRows = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Rows</h1>

      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="3" rows="3" gap="sm" x-align="stretch">
          <cds-placeholder cds-row="span-3">1</cds-placeholder>
          <cds-placeholder cds-col="span-2" cds-row="span-1">2</cds-placeholder>
          <cds-placeholder cds-col="span-2" cds-row="span-2">3</cds-placeholder>
        </cds-layout>
      </div>

      <div class="layout-demo wide-demo tall-demo">
        <cds-layout type="grid" cols="12" rows="6" gap="sm" x-align="stretch">
          <cds-placeholder cds-col="span-4" cds-row="span-6">1</cds-placeholder>
          <cds-placeholder cds-col="span-4" cds-row="span-3">2</cds-placeholder>
          <cds-placeholder cds-col="span-4" cds-row="span-3">3</cds-placeholder>
          <cds-placeholder cds-col="span-4" cds-row="span-3">4</cds-placeholder>
          <cds-placeholder cds-col="span-4" cds-row="span-3">5</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const gridStartEnd = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h2 cds-text="h2">Start/End Columns</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="6" rows="3" gap="sm" x-align="stretch">
          <cds-placeholder cds-col="start-2 span-4">1</cds-placeholder>
          <cds-placeholder cds-col="start-1 end-3">2</cds-placeholder>
          <cds-placeholder cds-col="end-7 span-2">3</cds-placeholder>
          <cds-placeholder cds-col="start-1 end-7">4</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Start/End Rows</h2>
      <div class="layout-demo wide-demo tall-demo">
        <cds-layout type="grid" cols="3" rows="3" gap="sm" x-align="stretch">
          <cds-placeholder cds-row="start-2 span-2">1</cds-placeholder>
          <cds-placeholder cds-row="start-2 span-1">2</cds-placeholder>
          <cds-placeholder cds-row="start-1 end-4">3</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Start/End Responsive</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="6" rows="3" gap="sm" x-align="stretch">
          <cds-placeholder cds-col="start-2 span-4@md">1</cds-placeholder>
          <cds-placeholder cds-col="start-1 end-3">2</cds-placeholder>
          <cds-placeholder cds-col="end-7 span-2" cds-row="span-2@md">3</cds-placeholder>
          <cds-placeholder cds-col="start-1 end-12 end-5@md">4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const gridAlign = () => {
  return html`
    <cds-layout type="vertical" gap="lg">
      <h1 cds-text="h1">Grid Align</h1>

      <h2 cds-text="h2">Align Top (Default)</h2>
      <div class="layout-demo wide-demo">
      <cds-layout type="grid" cols="auto" gap="sm" x-align="stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Center</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="auto" gap="sm" y-align="center" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder style="height:300px">4</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Bottom</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="auto" gap="sm" y-align="bottom" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder style="height:300px">4</cds-placeholder>
        </cds-layout>
      </div>

      <h2 cds-text="h2">Align Vertical Stretch</h2>
      <div class="layout-demo wide-demo">
        <cds-layout type="grid" cols="auto" gap="sm" y-align="stretch" x-align="stretch">
          <cds-placeholder>1</cds-placeholder>
          <cds-placeholder>2</cds-placeholder>
          <cds-placeholder>3</cds-placeholder>
          <cds-placeholder style="height:300px">4</cds-placeholder>
        </cds-layout>
      </div>
    </cds-layout>
  `;
};

export const spacing = () => {
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
        <div cds-pad="[lg,sm]"><cds-placeholder>cds-pad="[xs,xl]"</cds-placeholder></div>
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

export const contain = () => {
  return html`
    <h1 cds-text="h1">Contain</h1>
    <cds-layout type="vertical" gap="lg">
      <cds-layout type="horizontal" col="auto" contain="xs" x-align="stretch">
        <cds-placeholder>contain xs</cds-placeholder>
      </cds-layout>

      <cds-layout type="horizontal" col="auto" contain="sm" x-align="stretch">
        <cds-placeholder>contain sm</cds-placeholder>
      </cds-layout>

      <cds-layout type="horizontal" col="auto" contain="md" x-align="stretch">
        <cds-placeholder>contain md</cds-placeholder>
      </cds-layout>

      <cds-layout type="horizontal" col="auto" contain="lg" x-align="stretch">
        <cds-placeholder>contain lg</cds-placeholder>
      </cds-layout>

      <cds-layout type="vertical" gap="lg" x-align="stretch">
        <cds-placeholder cds-contain="xs" >contain xs</cds-placeholder>
        <cds-placeholder cds-contain="sm">contain sm</cds-placeholder>
        <cds-placeholder cds-contain="md">contain md</cds-placeholder>
        <cds-placeholder cds-contain="lg">contain lg</cds-placeholder>
      </cds-layout>
    </cds-layout>
  `;
};

export const display = () => {
  return html`
    <cds-layout type="grid" cols="2" gap="md" x-align="stretch">
      <cds-placeholder cds-display="none flex@sm">none flex@sm</cds-placeholder>
      <cds-placeholder>...<span cds-display="none inline@md">inline@md</span>...</cds-placeholder>
    </cds-layout>
  `;
};

export const applicationLayout = () => {
  return html`
    <style>
      /* temp styles for prototyping */
      cds-header,
      cds-content,
      cds-footer,
      cds-side-nav,
      cds-sub-nav {
        padding: 12px;
      }

      cds-header {
        background: hsl(214, 20%, 31%);
        color: hsl(0, 0%, 100%);
        padding: 16px 24px;
      }

      cds-footer {
        background: hsl(0, 0%, 89%);
      }

      cds-sub-nav {
        border-bottom: 1px solid hsl(0, 0%, 91%);
        margin: 0 12px;
      }

      cds-side-nav {
        background: hsl(0, 0%, 91%);
      }
    </style>
    <cds-layout type="vertical" gap="xl">
      <h1 cds-text="h1">Application Layout</h1>
      <cds-layout type="application-1">
        <cds-header>header</cds-header>
        <cds-sub-nav>sub nav</cds-sub-nav>
        <cds-side-nav>side nav</cds-side-nav>
        <cds-content>
          <cds-layout type="grid" cols="2" gap="sm" y-align="stretch" style="min-height: 400px">
            <cds-card></cds-card>
            <cds-card></cds-card>
            <cds-card></cds-card>
            <cds-card></cds-card>
          </cds-layout>
        </cds-content>
      </cds-layout>

      <h2 cds-text="h2">Content Layout</h2>
      <cds-layout type="content-1">
        <cds-header>header</cds-header>
        <cds-sub-nav>sub nav</cds-sub-nav>
        <cds-content>
          <h1 cds-text="h1">Blog Post</h1>
          <cds-layout type="horizontal" gap="xs" x-align="right">
            <cds-tag>Design Systems</cds-tag> <cds-tag>Clarity</cds-tag> <cds-tag>VMware</cds-tag>
          </cds-layout>
          <p cds-text="p1">
            Blog post content...
          </p>
        </cds-content>
        <cds-footer>footer</cds-footer>
      </cds-layout>
    </cds-layout>
  `;
};
