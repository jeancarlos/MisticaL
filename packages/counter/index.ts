import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from  '../theme';
import { ThemeType } from '../../tools/theme/types/theme';

@customElement('counter-web-component')
export class CounterWebComponent extends ThemeWebComponent {
  @property({ type: String }) header = 'Hey there';
  @property({ type: Number }) counter = 5;

  static override styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--button-text-color, #000);
    }
  `;

  async __increment() {
    this.counter += 1;

    await this.toggleTheme()
  }

  async toggleTheme() {
    console.log('toggleTheme', this.theme.themeType)

    if (this.theme.themeType === ThemeType.Light) {
      await this.changeThemeType(ThemeType.Dark);
    } else {
      await this.changeThemeType(ThemeType.Light);
    }
  }

  override render() {
    return html`
      <h1>${this.theme.componentsColor.appBarBackground.value}</h1>
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}