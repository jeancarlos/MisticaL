import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { loadAll } from '../../tools/load-css-tokens';

export class CounterWebComponent extends LitElement {
  override async connectedCallback() {
    super.connectedCallback();
    const ds = await loadAll();

    console.log(ds)
  }


  static override styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--button-text-color, #000);
    }
  `;

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

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

window.customElements.define('counter-web-component', CounterWebComponent);
