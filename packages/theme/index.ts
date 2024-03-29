import { LitElement, PropertyValueMap, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Theme, ThemeType } from '../../tools/theme/types/theme';
import { TokenType } from '../../tools/theme/types/token';
import { ThemeService } from '../../tools/theme/services/theme-service';

interface ChangeThemeDTO {
  themeType?: ThemeType;
  tokenType?: TokenType;
}
@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @property({ type: String, attribute: 'theme-type'})
  themeType!: ThemeType;

  @property({ type: String, attribute: 'token-type' })
  tokenType!: TokenType;

  @state()
  private _theme!: Theme
  private _service!: ThemeService;

  public get theme() {
    return this._theme;
  }

  override connectedCallback() {
    super.connectedCallback();
    ThemeService.build(this.tokenType, this.themeType).then(theme => {
      this._theme = theme.currentTheme;
      this._service = theme;
      this.requestUpdate();
    });
  }

  protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties);

    if (_changedProperties.has('themeType') || _changedProperties.has('tokenType')) {
      this.changeTheme({ themeType: this.themeType, tokenType: this.tokenType });
    }
  }

  async changeTheme({ themeType, tokenType }: ChangeThemeDTO) {
    const newTheme = await this._service.changeTheme({ themeType, tokenType });
    this._theme = newTheme
    this.requestUpdate();
  }

  override render() {
    return html`
      <slot></slot>
    `;
  }
}