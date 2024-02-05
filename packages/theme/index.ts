import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Theme from './types/theme';
import { ThemeKeys } from './types/theme-keys';
import { loadCssTokens } from '../../utils/load-css-tokens';


@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @state()
  private theme!: Theme;

  public get currentTheme() {
    return this.theme;
  }

  override async connectedCallback() {
    super.connectedCallback();
    this.theme = await loadCssTokens(ThemeKeys.Movistar);
    this.replacePaletteValuesInTheme();
  }

  private replacePaletteValuesInTheme(): void {
    ['dark', 'light'].forEach((themeType) => {
      for (const key in this.theme[themeType]) {
        const match = this.theme[themeType][key].value.match(/\{palette\.(\w+)\}/);
        if (match) {
          this.theme[themeType][key].value = this.theme.global.palette[match[1]].value;
        }
      }
    });
  }

  changeTheme(newTheme: Theme) {
    this.theme = newTheme;
    this.replacePaletteValuesInTheme();
    this.requestUpdate();
  }

  static override styles = css`
    /* Use the theme to generate CSS */
  `;

  override render() {
    return html`
      <style>
      </style>
      <slot></slot>
    `;
  }
}