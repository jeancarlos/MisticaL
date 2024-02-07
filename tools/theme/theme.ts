import Token, { TokenType } from './types/token';
import { Theme, ThemeType } from './types/theme';
import TokensLoader from './tokens/loader';


interface ChangeThemeDTO {
  themeType?: ThemeType,
  tokenType?: TokenType
}
interface IThemeManager {
  currentTheme: Theme;
  changeTheme({themeType, tokenType}: ChangeThemeDTO): Promise<Theme>;
}

export class ThemeManager implements IThemeManager {
  private _currentTheme!: Theme;

  public get currentTheme() {
    return this._currentTheme;
  }

  private constructor(cssTokens: Token, themeType: ThemeType, tokenType: TokenType) {
    this._currentTheme = this.createTheme(cssTokens, themeType, tokenType);
  }

  private createTheme(cssTokens: Token, themeType: ThemeType, tokenType: TokenType): Theme {
    return {
      themeType,
      tokenType,
      componentsColor: cssTokens[themeType],
      radius: cssTokens.radius,
      text: cssTokens.text,
      palette: cssTokens.global.palette,
    };
  }

  static async build(
    tokenType: TokenType = TokenType.VivoNew,
    themeType: ThemeType = ThemeType.Light
  ): Promise<ThemeManager> {
    const cssTokens = await this.validateAndLoadTokens(tokenType, themeType);
    return new ThemeManager(cssTokens, themeType, tokenType);
  }

  private static async validateAndLoadTokens(tokenType: TokenType, themeType: ThemeType): Promise<Token> {
    if (!Object.values(ThemeType).includes(themeType)) {
      throw new Error(`Invalid theme type. Must be one of ${Object.values(ThemeType).join(', ')}.`);
    }

    const loader = await TokensLoader.getInstance();
    const cssTokens = loader.get(tokenType);

    if (!cssTokens) {
      throw new Error(`Invalid token type. Must be one of ${Object.values(TokenType).join(', ')}.`);
    }

    return cssTokens;
  }

  async changeTheme({ themeType, tokenType }: ChangeThemeDTO): Promise<Theme> {
    themeType = themeType || this._currentTheme.themeType;
    tokenType = tokenType || this._currentTheme.tokenType;

    const cssTokens = await ThemeManager.validateAndLoadTokens(tokenType, themeType);
    console.log('changeTheme', cssTokens, themeType, tokenType)
    this._currentTheme = this.createTheme(cssTokens, themeType, tokenType);

    return this.currentTheme;
  }

}