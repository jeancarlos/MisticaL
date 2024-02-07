import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ThemeKeys } from './types/theme-keys';
import { loadCssTokens } from '../../utils/load-css-tokens';
import { ComponentsColor } from './types/colors';
import { Radius } from './types/radius';
import Palette from './types/palette';
import { Text } from './types/text';

interface newTheme {
  componentsColor: ComponentsColor;
  radius: Radius;
  text: Text;
  palette: Palette ;
}

enum ThemeType {
  Light = 'light',
  Dark = 'dark'
}

@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @state()
  private theme!: newTheme;

  public get currentTheme() {
    return this.theme;
  }

  override async connectedCallback() {
    super.connectedCallback();
    this.buildTheme(ThemeKeys.VivoNew, ThemeType.Light)
    this.requestUpdate();
  }

  async changeTheme(newTheme: ThemeKeys) {
    this.buildTheme(newTheme, ThemeType.Light)
    this.requestUpdate();
  }

  async buildTheme(themeKey: ThemeKeys, themeType: ThemeType): Promise<void> {
    if (!Object.values(ThemeType).includes(themeType)) {
      throw new Error(`Invalid theme type. Must be one of ${Object.values(ThemeType).join(', ')}.`);
    }

    const theme = await loadCssTokens(themeKey);

    this.theme = {
      componentsColor: theme[themeType],
      radius: theme.radius,
      text: theme.text,
      palette: theme.global.palette,
    };
  }

  static override styles = css`
  `;

  override render() {
    return html`
      <style>
      </style>
      <slot></slot>
    `;
  }
}