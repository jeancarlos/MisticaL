import { LitElement, PropertyValueMap, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Theme, ThemeType } from '../../tools/theme/types/theme';
import { TokenType } from '../../tools/theme/types/token';
import { ThemeService } from '../../tools/theme/services/theme-service';


interface ChangeThemeDTO {
  themeType?: ThemeType;
  tokenType?: TokenType;
}
@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @state()
  private _theme!: Theme
  private _service!: ThemeService;

  public get theme() {
    return this._theme;
  }

  override connectedCallback() {
    super.connectedCallback();
    ThemeService.build().then(theme => {
      this._theme = theme.currentTheme;
      this._service = theme;
      this.style.cssText = this.generateCssVariables();
      this.requestUpdate();
    });
  }

  protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties);

    if (_changedProperties.has('_theme')) {
      this.style.cssText = this.generateCssVariables();
    }
  }

  private generateCssVariables(): string {
    let cssVariables = '';

    const processObject = (obj: any, prefix: string = '') => {
      for (const key in obj) {
        if (key === 'value' && typeof obj[key] === 'string') {
          cssVariables += `--${prefix.slice(0, -1)}: ${obj[key]};\n`;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObject(obj[key], `${prefix}${key}-`);
        }
      }
    };

    processObject(this._theme);
    // console.log(cssVariables)
    return cssVariables;
  }

  async changeTheme({ themeType, tokenType }: ChangeThemeDTO) {
    const newTheme = await this._service.changeTheme({ themeType, tokenType });
    this._theme = newTheme
    // console.log(  this._theme, 'tema')
    this.requestUpdate();
  }

  override render() {
    return html`
      <style>
      </style>
      <slot></slot>
    `;
  }
}