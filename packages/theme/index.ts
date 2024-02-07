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
    this.theme = await loadCssTokens(ThemeKeys.VivoNew);
  }

  changeTheme(newTheme: Theme) {
    this.theme = newTheme;
    this.requestUpdate();
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