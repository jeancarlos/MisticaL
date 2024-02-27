import { CSSResultGroup, LitElement, css } from 'lit';
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
  @property({ type: String, attribute: 'theme-type' })
  themeType!: ThemeType;

  @property({ type: String, attribute: 'token-type' })
  tokenType!: TokenType;

  @state()
  private _theme!: Theme

  private _service!: ThemeService;

  public get theme() {
    return this._theme;
  }

  static override styles = css`
  * {
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
` as CSSResultGroup;

  override async connectedCallback() {
    super.connectedCallback();
    const theme = await ThemeService.build(this.tokenType, this.themeType);
    this._theme = theme.currentTheme;
    this._service = theme;
    this.requestUpdate();
  }

  async changeTheme({ themeType, tokenType }: ChangeThemeDTO) {
    const newTheme = await this._service.changeTheme({ themeType, tokenType });
    this._theme = newTheme
    this.requestUpdate();
  }
}