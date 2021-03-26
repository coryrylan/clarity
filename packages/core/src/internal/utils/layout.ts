/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export type LayoutBreakpoints = '' | '@xs' | '@sm' | '@md' | '@lg' | '@xl';
export type LayoutSpace = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type LayoutSides = '' | '-t' | '-r' | '-b' | '-l' | '-x' | '-y';
export type LayoutAlignPositions = 'top' | 'right' | 'bottom' | 'left' | 'center' | 'vertical-center' | 'horizontal-center' | 'vertical-stretch' | 'horizontal-stretch' | 'stretch' | 'shrink';
export type LayoutTypes = 'horizontal' | 'vertical' | 'grid';
export type LayoutGap = `gap:${LayoutSpace}` | `gap${LayoutBreakpoints}:${LayoutSpace}`;
export type LayoutAlignment = `align${LayoutBreakpoints}:${LayoutAlignPositions}`;
export type LayoutMargin = `m${LayoutSides}${LayoutBreakpoints}:${LayoutSpace}`;
export type LayoutPadding = `p${LayoutSides}${LayoutBreakpoints}:${LayoutSpace}`;
export type LayoutWrap = 'wrap:none';
export type LayoutFill = 'fill';
export type LayoutDisplayTypes = 'screen-reader-only' 
export type LayoutDisplay = `display:${LayoutDisplayTypes}`;

type ValidValues = `${LayoutTypes | LayoutGap | LayoutMargin | LayoutPadding | LayoutAlignment | LayoutWrap | LayoutFill | LayoutDisplay | ''}`;

export type Layouts<Next extends string, Prev extends string = ''> =
      Next extends `${infer First extends ValidValues ? infer First : never} ${infer Rest}`
        ? Layouts<Rest, `${Prev extends ''
            ? ''
            : `${Prev} `}${First extends ValidValues ? First : never}`>
        : Next extends ValidValues
            ? `${Prev extends '' ? '' : `${Prev} `}${Next}`
            : `Invalid layout option: ${Next extends `${infer First} ${infer _Rest}` ? First : Next }`;

export const layoutType = <C extends string>(values: Layouts<C>) => values;
