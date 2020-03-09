/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { propertiesGroup } from '@clr/core/common';
import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-html';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Experimental/Typography',
  decorators: [withDesign],
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v2mkhzKQdhECXOx8BElgdA/Clarity-UI-Library---light-2.2.0?node-id=0%3A2677',
    },
  },
};

export const API = () => {
  const disableLineHeightErasers = boolean('cds-disable-lhe', false, propertiesGroup);
  const showPadding = boolean('show-padding', false, propertiesGroup);
  const showGaps = boolean('show-gaps', false, propertiesGroup);

  return html`
    <cds-layout type="vertical" gap="md" cds-body-text ?show-padding=${showPadding} ?show-gaps=${showGaps}>
      <h1 cds-text="h1">Typography (Experimental)</h1>

      <cds-layout type="vertical" gap="sm" class="no-gap-reveal">
        <p cds-text>
          Clarity Core Typography System provides a flexible API to apply typography
          styles explicitly to elements. This gives full control of the styles of
          an element allowing the use of proper sematic HTML elements.
        </p>

        <p cds-text>
          The default body font and text styles are applied by adding the
          cds-body-text attribute to the body element.
        </p>
      </cds-layout>

      <p cds-text>
        The following examples present Clarity typography in a semantic and use-based format.
        Instead of h0 or h4, we reference <em cds-text="bd">display</em> or <em cds-text="bd">section</em>. The benefits of this approach 
        are de-coupling the display of textual content from the HTML semantics. This gives 
        developers more latitude in creating semantically correct HTML documents while also 
        being empowered to do deliver to designer specs. Another benefit is limiting the 
        variations of textual styles, making it easier for designers and developers to 
        create consistent and coherent experiences.
      </p>
      <p cds-text>
        This API is still considered experimental and may change until it is stablized.
      </p>

      <cds-card>
        <cds-layout type="vertical" gap="sm">
          <h2 cds-text="h2">Headings</h2>
          <p cds-text="display" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (display)</p>
          <p cds-text="heading" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (heading)</p>
          <p cds-text="title" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (title)</p>
          <p cds-text="section" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (section)</p>
          <p cds-text="subsection" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (subsection)</p>
        </cds-layout>
      </cds-card>

      <cds-card>
        <cds-layout type="vertical" gap="sm">
          <h2 cds-text="h2">Content</h2>
          <p cds-text ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (default)</p>
          <p cds-text="body" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (body)</p>
          <p cds-text="message" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (message)</p>
          <p cds-text="secondary" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (secondary)</p>
          <p cds-text="caption" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (caption)</p>
          <p cds-text="smallcaption" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (smallcaption)</p>
        </cds-layout>
      </cds-card>

      <h2 cds-text="h2">Legacy Typography (Stable)</h2>

      <p cds-text="p1">
        The following examples present Clarity typography in the v3.0 and earlier style 
        of h0-h6 and p0-p8 to denote different sizing of textual content. Note that there are
        slight variations in line-height, font-size, and font-weight from the typography 
        styles above. Use the format that makes the most sense for your applications. The future
        path forward is to synthesize these two approaches so that they map together better.
      </p>

      <cds-card>
        <cds-layout type="vertical" gap="sm">
          <h2 cds-text="h2">Headers</h2>
          <p cds-text="h0" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h0)</p>
          <p cds-text="h1" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h1)</p>
          <p cds-text="h2" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h2)</p>
          <p cds-text="h3" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h3)</p>
          <p cds-text="h4" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h4)</p>
          <p cds-text="h5" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h5)</p>
          <p cds-text="h6" ?cds-disable-lhe=${disableLineHeightErasers}>The five boxing wizards jump quickly (h6)</p>
        </cds-layout>
      </cds-card>

      <cds-card>
        <cds-layout type="vertical" gap="sm">
          <h2 cds-text="h2">Paragraphs</h2>
          <p cds-text="p0" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p0)</p>
          <p cds-text="p1" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p1)</p>
          <p cds-text="p2" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p2)</p>
          <p cds-text="p3" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p3)</p>
          <p cds-text="p4" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p4)</p>
          <p cds-text="p5" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p5)</p>
          <p cds-text="p6" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p6)</p>
          <p cds-text="p7" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p7)</p>
          <p cds-text="p8" ?cds-disable-lhe=${disableLineHeightErasers}>The quick brown fox jumps over the lazy dog. (p8)</p>  
        </cds-layout>
      </cds-card>

      <h2 cds-text="h2">Additional Typographic Styles (Stable)</h2>

      <cds-card>
        <cds-layout type="vertical" gap="sm">
          <cds-layout gap="sm">
            <h2 cds-text="h2" ?cds-disable-lhe=${disableLineHeightErasers}>Links</h2>
            <p cds-text ?cds-disable-lhe=${disableLineHeightErasers}>
              The <a href="#" cds-text="link">quick brown fox</a> jumps over the lazy dog. (link)
            </p>
          </cds-layout>

          <cds-layout type="vertical" gap="sm">
            <h2 cds-text="h2" ?cds-disable-lhe=${disableLineHeightErasers}>Code</h2>
            <p cds-text ?cds-disable-lhe=${disableLineHeightErasers}>
              The <a href="#" cds-text="code">quick brown fox</a> jumps over the lazy dog. (code)
            </p>
          </cds-layout>

          <hr cds-divider/>

          <cds-layout type="vertical" gap="sm">
            <h2 cds-text="h2" ?cds-disable-lhe=${disableLineHeightErasers}>Weights</h2>
            <p cds-text ?cds-disable-lhe=${disableLineHeightErasers}>
              Note that Clarity only defines a few font weights (200, 400, 600) in its styles. 
              As a result, some of the
              font-weights below make look similar. If you inspect the code underneath, you should see that 
              the font-weights are being applied as expected.
            </p>
            <p cds-text="body-lt" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>200</em> quick brown foxes <em>lightly</em> jump over the lazy dog. (-lt)</p>  
            <p cds-text="body-rg" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>400</em> quick brown foxes <em>regularly</em> jump over the lazy dog. (-rg)</p>  
            <p cds-text="body-md" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>500</em> quick brown foxes <em>mediumly</em> jump over the lazy dog. (-md)</p>  
            <p cds-text="body-sb" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>500</em> quick brown foxes <em>semi-boldly</em> jump over the lazy dog. (-sb)</p>  
            <p cds-text="body-bd" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>600</em> quick brown foxes <em>boldly</em> jump over the lazy dog. (-bd)</p>  
            <p cds-text="body-xb" ?cds-disable-lhe=${disableLineHeightErasers}>The <em>600</em> quick brown foxes <em>extra-boldly</em> jump over the lazy dog. (-xb)</p>
          </cds-layout>
        </cds-layout>
      </cds-card>

      <cds-card>
        <cds-layout type="vertical" gap="sm" x-align="stretch">
          <h2 cds-text="h2 left" ?cds-disable-lhe=${disableLineHeightErasers}>Heading Left (left)</h2>
          <h2 cds-text="h2 right" ?cds-disable-lhe=${disableLineHeightErasers}>Heading Right (right)</h2>
          <h2 cds-text="h2 center" ?cds-disable-lhe=${disableLineHeightErasers}>Heading Center (center)</h2>
          <p cds-text="p1 left" ?cds-disable-lhe=${disableLineHeightErasers}>Text Left (left)</p>
          <p cds-text="p2 right" ?cds-disable-lhe=${disableLineHeightErasers}>Text Right (right)</p>
          <p cds-text="p3 center" ?cds-disable-lhe=${disableLineHeightErasers}>Text Center (center)</p>
        </cds-layout>
      </cds-card>
    </cds-layout>

    <style>
      [show-padding] cds-card {
        box-shadow: inset 0 0 0 1rem hsl(93, 52%, 88%);
      }
      
      [show-gaps] [gap="md"]:not(.no-gap-reveal) > *:not([cds-divider]) {
        box-shadow: 0 1.2rem 0 0 hsl(48, 100%, 89%);
      }
      
      [show-gaps] [gap="sm"]:not(.no-gap-reveal) > * {
        box-shadow: 0 0.6rem 0 0 hsl(48, 100%, 89%);
      }

      [show-gaps] [gap="sm"] > *:last-child,
      [show-gaps] [gap="md"] > *:last-child {
        box-shadow: none;
      }
    </style>
  `;
};
