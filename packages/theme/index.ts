import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Theme, ThemeType } from '../../tools/theme/types/theme';
import { TokenType } from '../../tools/theme/types/token';
import { ThemeService } from '../../tools/theme/services/theme-service';

@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @state()
  private _theme!: Theme
  private _service!: ThemeService;

  public get theme() {
    return this._theme;
  }

  constructor() {
    super();
    ThemeService.build().then(theme => {
      this._theme = theme.currentTheme;
      this._service = theme;
      this.requestUpdate();
    });
  }

  async changeThemeType(theme: ThemeType) {
    const newTheme = await this._service.changeTheme({ themeType: theme });
    this._theme = newTheme
    this.requestUpdate();
  }

  async changeTokenType(token: TokenType){
    const newTheme = await this._service.changeTheme({ tokenType: token});
    this._theme = newTheme
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