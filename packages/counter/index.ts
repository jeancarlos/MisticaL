import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loadCssTokens } from '../../tools/load-css-tokens';

@customElement('counter-web-component')
export class CounterWebComponent extends LitElement {
  @property({ type: String }) header = 'Hey there';
  @property({ type: Number }) counter = 5;

  static override styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--button-text-color, #000);
    }
  `;

  override async connectedCallback() {
    super.connectedCallback();
    const ds = await loadCssTokens();

    console.log(ds)
  }

  __increment() {
    this.counter += 1;
  }

  override render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}