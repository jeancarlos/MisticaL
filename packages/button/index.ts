import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';
import { TokenType } from '../../tools/theme/types/token';
import { ThemeType } from '../../tools/theme/types/theme';

@customElement('button-web-component')
export class ButtonWebComponent extends ThemeWebComponent {
  static override styles = css`
    button {
      background: var(--componentsColor-buttonPrimaryBackground);
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
  `;
  async randomTokenType() {
    const keys = Object.keys(TokenType);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    const randomTokenType = TokenType[randomKey as keyof typeof TokenType];

    await this.changeTheme({ tokenType: randomTokenType });
  }

  async toggleTheme() {
    if (this.theme.themeType === ThemeType.Light) {
      await this.changeTheme({ themeType: ThemeType.Dark});
    } else {
      await this.changeTheme({ themeType: ThemeType.Light});
    }
  }
 override connectedCallback(): void {
    super.connectedCallback();
    const themeTypeAttr = this.getAttribute('theme-type');
    const tokenTypeAttr = this.getAttribute('token-type');
    console.log('themeTypeAttr:', themeTypeAttr, 'tokenTypeAttr:', tokenTypeAttr);
  }
  override render() {
    return html`
      <h1>${this.theme.themeType}</h1>
      <h1>${this.theme.tokenType}</h1>
      <button @click="${this.randomTokenType}">Change Design System</button>
      <button @click="${this.toggleTheme}">Toggle Theme</button>
    `;
  }
}