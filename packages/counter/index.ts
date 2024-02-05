import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeProvider } from '../../tools/theme-provider';

@customElement('counter-web-component')
export class CounterWebComponent extends ThemeProvider {
  @property({ type: String }) header = 'Hey there';
  @property({ type: Number }) counter = 5;

  static override styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--button-text-color, #000);
    }
  `;

  __increment() {
    this.counter += 1;
  }

  override render() {
    console.log(this.currentTheme)
    return html`
      <h1>${this.currentTheme.dark.appBarBackground.value}</h1>
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}