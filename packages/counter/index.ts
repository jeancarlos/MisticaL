import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from  '../theme';
import { ThemeType } from '../../tools/theme/types/theme';
import { TokenType } from '../../tools/theme/types/token';

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

  async toggleTheme() {
    if (this.theme.themeType === ThemeType.Light) {
      await this.changeTheme({ themeType: ThemeType.Dark});
    } else {
      await this.changeTheme({ themeType: ThemeType.Light});
    }
  }

  async randomTokenType() {
    const keys = Object.keys(TokenType);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    const randomTokenType = TokenType[randomKey as keyof typeof TokenType];

    await this.changeTheme({ tokenType: randomTokenType });
  }

  override render() {
    return html`
    <div>
      <h1>${this.theme.componentsColor.appBarBackground.value}</h1>
      <button @click=${this.toggleTheme}>Toggle Theme</button>
      <button @click=${this.randomTokenType}>Random Token Type</button>
    </div>
    `;
  }
}