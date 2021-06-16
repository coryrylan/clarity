import { css, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { CdsBaseButton, baseStyles } from '@cds/core/internal';
export class CdsActionButton extends CdsBaseButton {
  @property({ type: String }) shape: string;

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          --color: var(--cds-global-typography-color-800);
          --width: 16px;
          --height: 16px;
          --target-width: 44px;
          --target-height: 44px;
          outline: 0 !important;
        }

        :host(:hover),
        :host(:focus) {
          --color: var(--cds-global-typography-color-700);
        }

        :host(:focus) .private-host::after {
          outline: Highlight solid var(--cds-global-space-2);
          outline-offset: -4px;
        }

        @media (-webkit-min-device-pixel-ratio: 0) {
          :host(:focus) .private-host::after {
            outline-color: -webkit-focus-ring-color;
          }
        }

        :host(:active) {
          --color: var(--cds-global-typography-color-1000);
        }

        .private-host {
          color: var(--color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: var(--width);
          height: var(--height);
        }

        .private-host::after {
          content: '';
          position: absolute;
          left: calc(calc(-1 * var(--width)) - 1);
          top: calc(calc(-1 * var(--height)) - 1);
          width: var(--target-width);
          height: var(--target-height);
        }

        cds-icon {
          min-width: var(--width);
          min-height: var(--height);
        }

        :host([debug]) .private-host::after {
          background: hsl(0deg 100% 50% / 20%);
          z-index: -1;
        }

        /* some shapes need adjustment to compensate the svg whitespace */
        :host([shape='filter-grid']) {
          --width: 22px;
          --height: 22px;
        }

        :host([shape='drag-handle']) {
          --width: 26px;
          --height: 26px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="private-host">
        ${this.shape ? html`<cds-icon .shape=${this.shape}></cds-icon>` : html`<slot></slot>`}
      </div>
    `;
  }
}
