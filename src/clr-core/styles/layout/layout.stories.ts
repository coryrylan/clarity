/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

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
    <cds-demo layout>
      <div cds-layout="horizontal gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutWrap = () => {
  return html`
    <!-- demonstrates gap is only applied between inline elements even when wrapped without pushing parent container -->
    <cds-demo layout style="max-width: 236px">
      <div cds-layout="horizontal gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
        <cds-placeholder>5</cds-placeholder>
        <cds-placeholder>6</cds-placeholder>
        <cds-placeholder>7</cds-placeholder>
        <cds-placeholder>8</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutNoWrap = () => {
  return html`
    <cds-demo layout style="max-width: 273px">
      <div cds-layout="horizontal gap-sm no-wrap">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
        <cds-placeholder>5</cds-placeholder>
        <cds-placeholder>6</cds-placeholder>
        <cds-placeholder>7</cds-placeholder>
        <cds-placeholder>8</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignTop = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="horizontal gap-sm align-items-top">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignBottom = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="horizontal gap-sm align-items-bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignLeft = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="horizontal gap-sm align-items-left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>  
  `;
};

export const horizontalLayoutAlignRight = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="horizontal gap-sm align-items-right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignVerticalCenter = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="horizontal gap-sm align-items-vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignHorizontalCenter = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="horizontal gap-sm align-items-horizontal-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignCenter = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="horizontal gap-sm align-items-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignVerticalStretch = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="horizontal gap-sm align-items-vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignHorizontalStretch = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="horizontal gap-sm align-items-horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutAlignStretch = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="horizontal gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutItemStretch = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="horizontal gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-layout="align-stretch">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const horizontalLayoutItemShrink = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="horizontal gap-sm align-items-horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-layout="align-shrink">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

/**
 * Vertical Layout
 */

export const verticalLayout = () => {
  return html`
    <cds-demo layout>
      <div cds-layout="vertical gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutWrap = () => {
  return html`
    <!-- demonstrates gap is only applied between stacked elements without pushing parent container -->
    <cds-demo layout style="width: 50px">
      <div cds-layout="vertical gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignTop = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm align-items-top">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignBottom = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm align-items-bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignLeft = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="vertical gap-sm align-items-left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignRight = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="vertical gap-sm align-items-right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignVerticalCenter = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm align-items-vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignHorizontalCenter = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="vertical gap-sm align-items-horizontal-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignCenter = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="vertical gap-sm align-items-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignVerticalStretch = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm align-items-vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutAlignHorizontalStretch = () => {
  return html`
  <cds-demo layout wide>
    <div cds-layout="vertical gap-sm align-items-horizontal-stretch">
      <cds-placeholder>1</cds-placeholder>
      <cds-placeholder>2</cds-placeholder>
    </div>
  </cds-demo>
  `;
};

export const verticalLayoutAlignStretch = () => {
  return html`
    <cds-demo layout wide tall>
      <div cds-layout="vertical gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutItemStretch = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-layout="align-stretch">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const verticalLayoutItemShrink = () => {
  return html`
    <cds-demo layout tall>
      <div cds-layout="vertical gap-sm align-items-vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-layout="align-shrink">2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

/**
 * Grid Layout
 */
export const gridLayout = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid gap-sm">
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

        <cds-placeholder cds-layout="col-2">2</cds-placeholder>
        <cds-placeholder cds-layout="col-2">2</cds-placeholder>
        <cds-placeholder cds-layout="col-2">2</cds-placeholder>
        <cds-placeholder cds-layout="col-2">2</cds-placeholder>
        <cds-placeholder cds-layout="col-2">2</cds-placeholder>
        <cds-placeholder cds-layout="col-2">2</cds-placeholder>

        <cds-placeholder cds-layout="col-3">3</cds-placeholder>
        <cds-placeholder cds-layout="col-3">3</cds-placeholder>
        <cds-placeholder cds-layout="col-3">3</cds-placeholder>
        <cds-placeholder cds-layout="col-3">3</cds-placeholder>

        <cds-placeholder cds-layout="col-4">4</cds-placeholder>
        <cds-placeholder cds-layout="col-4">4</cds-placeholder>
        <cds-placeholder cds-layout="col-4">4</cds-placeholder>

        <cds-placeholder cds-layout="col-6">6</cds-placeholder>
        <cds-placeholder cds-layout="col-6">6</cds-placeholder>

        <cds-placeholder cds-layout="col-12">12</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumns = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-6 gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsExplicit = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid gap-sm">
        <cds-placeholder cds-layout="col-4">1</cds-placeholder>
        <cds-placeholder cds-layout="col-8">2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsAuto = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsResponsive = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-6@sm cols-3@md gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsResponsiveExplicit = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid gap-sm">
        <cds-placeholder cds-layout="col-4@sm">1</cds-placeholder>
        <cds-placeholder cds-layout="col-8@sm">2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsWrap = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-6 gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsStartEnd = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid gap-sm">
        <cds-placeholder cds-layout="col-start-3 col-8">1</cds-placeholder>
        <cds-placeholder cds-layout="col-start-1 col-end-5">2</cds-placeholder>
        <cds-placeholder cds-layout="col-4 col-end-13">3</cds-placeholder>
        <cds-placeholder cds-layout="col-start-1 col-end-13">4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutColumnsStartEndResponsive = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-6@sm cols-4@md gap-sm">
        <cds-placeholder cds-layout="col-start-2@md">1</cds-placeholder>
        <cds-placeholder cds-layout="col-end-12@md">2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutRows = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid cols-6 rows-8 gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder cds-layout="col-12 row-4">3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutRowsResponsive = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid cols-6 rows-4 rows-8@sm gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder cds-layout="col-12 row-8 row-4@sm">3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutRowsStartEnd = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid cols-4 gap-sm align-items-stretch">
        <cds-placeholder cds-layout="row-4 row-start-6">1</cds-placeholder>
        <cds-placeholder cds-layout="row-3 row-start-4">2</cds-placeholder>
        <cds-placeholder cds-layout="row-12">3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutRowsStartEndResponsive = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid cols-12@md rows-4@sm gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder cds-layout="row-start-10@sm">2</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignTop = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </div>
    </cds-demo>  
  `;
};

export const gridLayoutAlignBottom = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-bottom">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignLeft = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-left">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignRight = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-right">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignVerticalCenter = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-vertical-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignCenter = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid gap-sm cols-auto align-items-center">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignVerticalStretch = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-vertical-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignHorizontalStretch = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="grid cols-auto gap-sm align-items-horizontal-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder>4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

export const gridLayoutAlignStretch = () => {
  return html`
    <cds-demo layout tall wide>
      <div cds-layout="grid cols-auto gap-sm align-items-stretch">
        <cds-placeholder>1</cds-placeholder>
        <cds-placeholder>2</cds-placeholder>
        <cds-placeholder>3</cds-placeholder>
        <cds-placeholder style="height:300px">4</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

/**
 * Utilities
 */

export const utilitiesPad = () => {
  return html`
    <style>
      .pad-demo cds-placeholder {
        padding: 0;
      }

      .pad-demo div[cds-layout] {
        background: hsl(92, 46%, 74%);
      }

      .pad-demo > [cds-layout] {
        background: hsl(92, 46%, 74%);
      }
    </style>
    <cds-demo cds-layout="vertical gap-lg" class="pad-demo">
      <div cds-layout="pad-none"><cds-placeholder>pad-none</cds-placeholder></div>
      <div cds-layout="pad-xs"><cds-placeholder>pad-xs</cds-placeholder></div>
      <div cds-layout="pad-sm"><cds-placeholder>pad-sm</cds-placeholder></div>
      <div cds-layout="pad-md"><cds-placeholder>pad-md</cds-placeholder></div>
      <div cds-layout="pad-lg"><cds-placeholder>pad-lg</cds-placeholder></div>
      <div cds-layout="pad-xl"><cds-placeholder>pad-xl</cds-placeholder></div>
    </cds-demo>
  `;
};

export const utilitiesDisplay = () => {
  return html`
    <cds-demo layout wide>
      <div cds-layout="vertical gap-md align-items-stretch">
        <cds-placeholder cds-layout="hide display-flex@sm">none flex@sm</cds-placeholder>
        <cds-placeholder>...<span cds-layout="hide display-inline@md">none inline@md</span>...</cds-placeholder>
        <cds-placeholder cds-layout="hide display-block@lg">none block@lg</cds-placeholder>
        <cds-placeholder cds-layout="hide@lg">none@lg</cds-placeholder>
      </div>
    </cds-demo>
  `;
};

/**
 * Patterns
 */
export const patternsApplication = () => {
  return html`
    <div cds-layout="vertical gap-sm align-items-stretch" style="height: 100vh">
      <cds-placeholder cds-align="shrink">header</cds-placeholder>
      <div cds-layout="horizontal gap-sm align-items-stretch" wrap="none">
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
        <cds-placeholder demo-content>
          <div>Scrollable Content</div>
        </cds-placeholder>
      </div>
    </div>
  `;
};

export const patternsContentSite = () => {
  return html`
    <div cds-layout="vertical gap-sm align-items-stretch" style="height: 100vh">
      <cds-placeholder cds-align="shrink">header</cds-placeholder>
      <div cds-layout="horizontal gap-sm align-items-stretch">
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
        <cds-placeholder>content</cds-placeholder>
        <cds-placeholder demo-side-bar>Sidebar</cds-placeholder>
      </div>
      <cds-placeholder cds-align="shrink">footer</cds-placeholder>
    </div>
  `;
};

export const patternsResponsiveImageGallery = () => {
  return html`
    <div cds-layout="grid cols-6@sm cols-4@md cols-3@lg cols-2@xl gap-sm align-items-horizontal-stretch">
      <cds-placeholder cds-layout="col-12">header</cds-placeholder>
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
      <cds-placeholder cds-layout="col-12">footer</cds-placeholder>
    </div>
  `;
};
