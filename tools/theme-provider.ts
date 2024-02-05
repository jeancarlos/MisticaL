import { LitElement, css, html } from 'lit';
import { loadCssTokens } from './load-css-tokens';
import { DesignSystemKeys } from './types/design-system-keys';
import DesignSystem from './types/design-system';
import { customElement, property } from 'lit/decorators.js';
import Theme from './types/theme';
import Palette from './types/palette';

@customElement('theme-provider')
export class ThemeProvider extends LitElement {
  @property({ type: Object })
  designSystem!: DesignSystem;

  @property({ type: Object })
  theme!: Theme;

  @property({ type: Object })
  palette!: Palette;

  override async connectedCallback() {
    super.connectedCallback();
    this.designSystem = await loadCssTokens(DesignSystemKeys.Movistar);
    const { global, ...theme } = this.designSystem;
    this.theme = theme;
    this.palette = global.palette;

    this.updateTheme(this.theme.dark);
    this.updateTheme(this.theme.light);
  }

  updateTheme(theme: { [key: string]: { value: string } }) {
    Object.keys(theme).forEach(key => {
      const match = theme[key].value.match(/\{palette\.(\w+)\}/);
      if (match && match[1] in this.palette) {
        theme[key].value = this.palette[match[1]].value;
      }
    });
  }

  changeDesignSystem(newDesignSystem: DesignSystem) {
    this.designSystem = newDesignSystem;
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