import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { themeContext } from '../../tools/theme-provider';
import DesignSystem from '../../tools/types/design-system';

@customElement('counter-web-component')
export class CounterWebComponent extends LitElement {
  @consume({ context: themeContext, subscribe: true })
  theme: DesignSystem | undefined;

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
    console.log('theme', this.theme);
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