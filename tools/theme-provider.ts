import { LitElement, css, html } from 'lit';
import { loadCssTokens } from './load-css-tokens';
import { DesignSystemKeys } from './types/design-system-keys';
import DesignSystem from './types/design-system';
import { customElement, state } from 'lit/decorators.js';

@customElement('theme-provider')
export class ThemeProvider extends LitElement {
  @state()
  private theme!: DesignSystem;

  public get currentTheme() {
    return this.theme;
  }

  override async connectedCallback() {
    super.connectedCallback();
    this.theme = await loadCssTokens(DesignSystemKeys.Movistar);
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

  changeTheme(newTheme: DesignSystem) {
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