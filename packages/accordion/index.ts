import { css } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('accordion-wc')
export class AccordionWC extends LitElement {
  @property({ type: Boolean })
  singleOpen = false;

  static override styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      background-color: #fff;
    }
  `

  override async connectedCallback() {
    super.connectedCallback();
    this.addEventListener('accordion-open', this.handleAccordionOpen);
  }

  override disconnectedCallback() {
    this.removeEventListener('accordion-open', this.handleAccordionOpen);
    super.disconnectedCallback();
  }

  handleAccordionOpen(event: Event) {
    if (this.singleOpen) {
      for (const child of this.children) {
        if (child !== event.target && (child as any).open) {
          (child as any).open = false;
          (child as any).updateContentAndChevron();
        }
      }
    }
  }

  override render() {
    super.render();
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}