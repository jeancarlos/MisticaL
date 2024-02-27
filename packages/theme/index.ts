import { LitElement, css, CSSResultGroup } from 'lit';
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
  static override get styles(): CSSResultGroup {
    return css`
    @font-face {
    font-family: 'VivoType';
    src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Light.woff2') format('woff2'),
     url('../../tools/theme/fonts/WOFF/VivoTypeW05-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal
  }
    @font-face {
    font-family: 'VivoType';
    src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Regular.woff2') format('woff2'),
     url('../../tools/theme/fonts/WOFF/VivoTypeW05-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal
  }
    @font-face {
    font-family: 'VivoType';
    src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Bold.woff2') format('woff2'),
     url('../../tools/theme/fonts/WOFF/VivoTypeW05-Bold.woff') format('woff');
      font-weight: 700;
      font-style: normal
  }

  :host {
    font-family: 'VivoType', sans-serif;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-bold: 700;
  }
`
  }
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