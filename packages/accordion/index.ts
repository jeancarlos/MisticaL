import { css } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('accordion-wc')
export class AccordionWC extends LitElement {
  @property({ type: Boolean })
  singleOpen = false;

  static override styles = css`
    .wrapper {
      border: none;
      background-color: transparent;
      grid-column: span 12;
    }

    @media (min-width: 768px) {
      .wrapper {
        grid-column: span 8;
      }
    }
  `

  override async connectedCallback() {
    super.connectedCallback();
    this.addEventListener('accordion-open', this._handleAccordionOpen);
  }

  override disconnectedCallback() {
    this.removeEventListener('accordion-open', this._handleAccordionOpen);
    super.disconnectedCallback();
  }

  override render() {
    super.render();
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  private _handleAccordionOpen(event: Event) {
    if (this.singleOpen) {
      for (const child of this.children) {
        if (child !== event.target && (child as any).open) {
          (child as any).open = false;
          (child as any).updateContentAndChevron();
        }
      }
    }
  }
}