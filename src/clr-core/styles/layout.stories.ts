/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-html';

export default {
  title: 'Documentation|Layout',
  parameters: {
    options: { showPanel: true },
  },
};

export const API = () => {
  const type = select('type', ['inline', 'stack', 'grid'], 'inline');
  const align = select('align-items', ['none', 'start', 'end', 'center'], 'none');
  const alignText = select('align-text', ['none', 'left', 'right', 'center'], 'none');
  const gap = select('gap', ['none', 'xs', 'sm', 'md', 'lg', 'xl'], 'none');
  const columns = select('columns (grid only)', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'auto');

  // cds-layout="text-left"

  return html`
    <cds-layout type="stack" gap="md">
      <h1 cwc-text="h1">Layout System (Alpha)</h1>
      <cds-layout type="${type}" gap="${gap}" columns="${columns}" align-items="${align}" align-text="${alignText}">
        <cwc-card>Item 1</cwc-card>
        <cwc-card>Item 2</cwc-card>
        <cwc-card>Item 3</cwc-card>
        ${
          type === 'inline'
            ? html`<cwc-card>item 4</cwc-card>`
            : html`<cwc-card>bacon ipsum dolor amet alcatra landjaeger hamburger sausage, pork chop tail shank turducken beef shankle t-bone frankfurter.</cwc-card>`
        }
      </cds-layout>
    </cds-layout>
  `;
};

export const inline = () => {
  return html`
    <h1>Inline</h1>
    <cds-layout type="inline" gap="xs">
      <cwc-tag>Item 1</cwc-tag>
      <cwc-tag>Item 2</cwc-tag>
      <cwc-tag>Item 3</cwc-tag>
    </cds-layout>
  `;
};

export const stack = () => {
  return html`
    <style>
      .small-card { max-width: 200px; width: 100%; }
    </style>
    <cds-layout type="stack" gap="lg">
      <h1>Stack</h1>

      <cds-layout type="stack" gap="sm">
        <cwc-card>Item 1</cwc-card>
        <cwc-card>Item 2</cwc-card>
        <cwc-card>Item 3</cwc-card>
      </cds-layout>

      <h2>Stack Align</h2>
      <cds-layout type="stack" gap="sm" align-items="start">
        <cwc-card class="small-card">Item 1</cwc-card>
        <cwc-card class="small-card">Item 2</cwc-card>
      </cds-layout>

      <cds-layout type="stack" gap="sm" align-items="end">
        <cwc-card class="small-card">Item 1</cwc-card>
        <cwc-card class="small-card">Item 2</cwc-card>
      </cds-layout>

      <cds-layout type="stack" gap="sm" align-items="center">
        <cwc-card class="small-card">Item 1</cwc-card>
        <cwc-card class="small-card">Item 2</cwc-card>
      </cds-layout>
    </cds-layout>
  `;
};

export const grid = () => {
  return html`
    <cds-layout type="stack" gap="lg">
      <h2>Auto Grid</h2>
      <cds-layout type="grid" gap="sm" columns="auto">
        <cwc-card>Item 1</cwc-card>
        <cwc-card>Item 2</cwc-card>
        <cwc-card>Item 3</cwc-card>
      </cds-layout>

      <h2>Grid Columns</h2>
      <cds-layout type="grid" gap="sm" columns="6">
        <cwc-card>Item 1</cwc-card>
        <cwc-card>Item 2</cwc-card>
        <cwc-card>Item 3</cwc-card>
        <cwc-card>Item 4</cwc-card>
      </cds-layout>

      <h2>Explicit Grid Columns</h2>
      <cds-layout type="grid" gap="sm">
        <cwc-card cds-layout="4">Item 1</cwc-card>
        <cwc-card cds-layout="8">Item 2</cwc-card>
      </cds-layout>
    </cds-layout>
  `;
};

export const gridResponsive = () => {
  return html`
  <cds-layout type="stack" gap="lg">
    <h1>Responsive Grid</h1>
    <h2>Implicit Grid Columns</h2>
    <cds-layout type="grid" gap="sm" columns="6@sm 3@md">
      <cwc-card>Item 1</cwc-card>
      <cwc-card>Item 2</cwc-card>
      <cwc-card>Item 3</cwc-card>
      <cwc-card>Item 4</cwc-card>
    </cds-layout>

    <h2>Responsive Explicit Grid Columns</h2>
    <cds-layout type="grid" gap="sm">
      <cwc-card cds-layout="3 8@lg">Item 1</cwc-card>
      <cwc-card cds-layout="9 4@lg">Item 2</cwc-card>
    </cds-layout>
  </cds-layout>
  `;
};

export const gridOffsets = () => {
  return html`
  <cds-layout type="stack" gap="lg">
    <h1>Grid Offsets</h1>

    <cds-layout type="grid" gap="sm">
      <cwc-card cds-layout="4">Item 1</cwc-card>
      <cwc-card cds-layout="4 offset-9">Item 2</cwc-card>
      <cwc-card cds-layout="3@md offset-4@md">Item 3</cwc-card>
      <cwc-card cds-layout="3@md offset-10@md">Item 4</cwc-card>
      <cwc-card cds-layout="6@md offset-4@md">Item 5</cwc-card>
    </cds-layout>

    <!-- <cds-layout type="grid" gap="sm">
      <cwc-card cwc-width="4">Item 1</cwc-card>
      <cwc-card cwc-width="4" cwc-offset="9">Item 2</cwc-card>
      <cwc-card cwc-width="3@md" cwc-offset="4@md">Item 3</cwc-card>
      <cwc-card cwc-width="3@md" cwc-offset="10@md">Item 4</cwc-card>
      <cwc-card cwc-width="6@md" cwc-offset="4@md">Item 4</cwc-card>
    </cds-layout> -->
  </cds-layout>
  `;
};

export const gridAlign = () => {
  return html`
  <cds-layout type="stack" gap="lg">
    <h1>Grid Vertical Align</h1>

    <h2>Default Fill</h2>
    <cds-layout type="grid" gap="sm" columns="auto">
      <cwc-card>Item 1</cwc-card>
      <cwc-card>bacon ipsum dolor amet alcatra landjaeger hamburger sausage, pork chop tail shank turducken beef shankle t-bone frankfurter.</cwc-card>
    </cds-layout>

    <h2>Grid Vertical Align Start</h2>
    <cds-layout type="grid" gap="sm" columns="auto" align-items="start">
      <cwc-card>Item 1</cwc-card>
      <cwc-card>Item 1</cwc-card>
      <cwc-card>bacon ipsum dolor amet alcatra landjaeger hamburger sausage, pork chop tail shank turducken beef shankle t-bone frankfurter.</cwc-card>
    </cds-layout>

    <h2>Grid Vertical Align End</h2>
    <cds-layout type="grid" gap="sm" columns="auto" align-items="center">
      <cwc-card>Item 1</cwc-card>
      <cwc-card>Item 1</cwc-card>
      <cwc-card>bacon ipsum dolor amet alcatra landjaeger hamburger sausage, pork chop tail shank turducken beef shankle t-bone frankfurter.</cwc-card>
    </cds-layout>

    <h2>Grid Vertical Align Center</h2>
    <cds-layout type="grid" gap="sm" columns="auto" align-items="end">
      <cwc-card>Item 1</cwc-card>
      <cwc-card>Item 1</cwc-card>
      <cwc-card>bacon ipsum dolor amet alcatra landjaeger hamburger sausage, pork chop tail shank turducken beef shankle t-bone frankfurter.</cwc-card>
    </cds-layout>
  </cds-layout>
  `;
};

export const textAlign = () => {
  return html`
  <cds-layout type="stack" gap="md">
    <h1>Text Align</h1>
    <cwc-card cds-layout="text-left">Item 1</cwc-card>
    <cwc-card cds-layout="text-right">Item 2</cwc-card>
    <cwc-card cds-layout="text-center">Item 3</cwc-card>
  </cds-layout>
  `;
};

export const box = () => {
  return html`
    <style>
      cds-box {
        border: 1px solid #ccc;
      }
    </style>
    <cds-box padding="xs">padding xs</cds-box>
    <cds-box padding="sm">padding sm</cds-box>
    <cds-box padding="md">padding md</cds-box>
    <cds-box padding="lg">padding lg</cds-box>
    <cds-box padding="xl">padding xl</cds-box>
  `;
};
