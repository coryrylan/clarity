/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { propertiesGroup } from '@clr/core/common';
import { select } from '@storybook/addon-knobs';
import { html } from 'lit-html';

export default {
  title: 'Experimental/List',
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
  },
};

const unorderedListOptions: object = { 
    'none (default disc)': '', 
    'disc': 'disc',
    'circle': 'circle',
    'square': 'square'
};

const orderedListOptions: object = { 
    'none (default decimal)': '', 
    'arabic-indic': 'arabic-indic',
    'armenian': 'armenian',
    'bengali': 'bengali',
    'cjk-earthly-branch': 'cjk-earthly-branch',
    'cjk-heavenly-stem': 'cjk-heavenly-stem',
    'cjk-ideographic': 'cjk-ideographic',
    'decimal': 'decimal',
    'decimal-leading-zero': 'decimal-leading-zero',
    'devanagari': 'devanagari',
    'ethiopic-halehame-am': 'ethiopic-halehame-am',
    'ethiopic-halehame-ti-er': 'ethiopic-halehame-ti-er',
    'ethiopic-halehame-ti-et': 'ethiopic-halehame-ti-et',
    'georgian': 'georgian',
    'gujarati': 'gujarati',
    'gurmukhi': 'gurmukhi',
    'hangul': 'hangul',
    'hangul-consonant': 'hangul-consonant',
    'hiragana': 'hiragana',
    'hiragana-iroha': 'hiragana-iroha',
    'kannada': 'kannada',
    'katakana': 'katakana',
    'katakana-iroha': 'katakana-iroha',
    'khmer': 'khmer',
    'korean-hangul-formal': 'korean-hangul-formal',
    'korean-hanja-formal': 'korean-hanja-formal',
    'korean-hanja-informal': 'korean-hanja-informal',
    'lao': 'lao',
    'lower-alpha': 'lower-alpha',
    'lower-greek': 'lower-greek',
    'lower-latin': 'lower-latin',
    'lower-roman': 'lower-roman',
    'malayalam': 'malayalam',
    'mongolian': 'mongolian',
    'myanmar': 'myanmar',
    'oriya': 'oriya',
    'persian': 'persian',
    'simp-chinese-formal': 'simp-chinese-formal',
    'simp-chinese-informal': 'simp-chinese-informal',
    'telugu': 'telugu',
    'thai': 'thai',
    'upper-alpha': 'upper-alpha',
    'upper-latin': 'upper-latin',
    'upper-roman': 'upper-roman',
    'urdu': 'urdu'
};

export const API = () => {
  const orderedListStyle = select(
    'Ordered List Style',
    orderedListOptions,
    undefined,
    propertiesGroup
  );

  const orderedListChildStyle = select(
    'Ordered List Style (Child)',
    orderedListOptions,
    undefined,
    propertiesGroup
  );

  const unorderedListStyle = select(
    'Unordered List Style',
    unorderedListOptions,
    undefined,
    propertiesGroup
  );

  const unorderedListChildStyle = select(
    'Unordered List Style (Child)',
    unorderedListOptions,
    undefined,
    propertiesGroup
  );

  return html`
    <div cds-layout="vertical gap-md" cds-body-text>
      <h1 cds-text="h1">Lists (Experimental)</h1>

      <div cds-layout="vertical gap-sm">
        <p>
            Lists in Clarity Core come in three varieties – ordered, unordered, and unstyled. 
            Any "compact" style variations for list display is now handled through Clarity Core layouts.
        </p>
      </div>

      <cds-card>
        <div cds-layout="vertical gap-sm">
          <h2 cds-text="h2">Unstyled List</h2>
          <ul cds-list="unstyled">
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
          </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
          <h2 cds-text="h2">Ordered List</h2>
          <ol cds-list=${orderedListStyle}>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
          </ol>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
          <h2 cds-text="h2">Unordered List</h2>
          <ul cds-list=${unorderedListStyle}>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
              <li>The five boxing wizards jump quickly</li>
          </ul>
        </div>
      </cds-card>

      <h2 cds-text="h2">Mixed and Nested Lists</h2>

      <p cds-text="p1">
          Lists can be nested and the varieties can be mixed within nested groupings.
      </p>

      <cds-card>
        <div cds-layout="vertical gap-sm">
          <h2 cds-text="h2">Nested Ordered Lists</h2>
          <ol cds-list=${orderedListStyle}>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog
                <ol cds-list=${orderedListChildStyle}>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                </ol>
              </li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
          </ol>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
          <h2 cds-text="h2">Nested Ordered + Unstyled Lists</h2>
          <ol cds-list=${orderedListStyle}>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog
                <ul cds-list="unstyled">
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                    <li>The five boxing wizards jump quickly</li>
                </ul>
              </li>
              <li>The quick brown fox jumps over the lazy dog</li>
              <li>The quick brown fox jumps over the lazy dog</li>
          </ol>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Ordered + Unordered Lists</h2>
            <ol cds-list=${orderedListStyle}>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ul cds-list=${unorderedListChildStyle}>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ul>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ol>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unordered Lists</h2>
            <ul cds-list=${unorderedListStyle}>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ul cds-list=${unorderedListChildStyle}>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ul>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unordered + Ordered Lists</h2>
            <ul cds-list=${unorderedListStyle}>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ol cds-list=${orderedListChildStyle}>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ol>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unordered + Unstyled Lists</h2>
            <ul cds-list=${unorderedListStyle}>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ul cds-list="unstyled">
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ul>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unstyled Lists</h2>
            <ul cds-list="unstyled">
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ul cds-list="unstyled">
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ul>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unstyled + Ordered Lists</h2>
            <ul cds-list="unstyled">
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ol cds-list=${orderedListChildStyle}>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ol>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

      <cds-card>
        <div cds-layout="vertical gap-sm">
            <h2 cds-text="h2">Nested Unstyled + Unordered Lists</h2>
            <ul cds-list="unstyled">
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog
                    <ul cds-list=${unorderedListChildStyle}>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                        <li>The five boxing wizards jump quickly</li>
                    </ul>
                </li>
                <li>The quick brown fox jumps over the lazy dog</li>
                <li>The quick brown fox jumps over the lazy dog</li>
            </ul>
        </div>
      </cds-card>

    </div>
  `;
};
