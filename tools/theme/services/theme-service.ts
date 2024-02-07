import ChangeThemeDTO from "../dtos/change-theme-dto";
import TokensRepository from "../repositories/tokens-repository";
import { Theme, ThemeType } from "../types/theme";
import Token, { TokenType } from "../types/token";


interface IThemeService {
  currentTheme: Theme;
  changeTheme({themeType, tokenType}: ChangeThemeDTO): Promise<Theme>;
}

export class ThemeService implements IThemeService {
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
  ): Promise<ThemeService> {
    const cssTokens = await this.validateAndLoadTokens(tokenType, themeType);
    return new ThemeService(cssTokens, themeType, tokenType);
  }

  private static async validateAndLoadTokens(tokenType: TokenType, themeType: ThemeType): Promise<Token> {
    if (!Object.values(ThemeType).includes(themeType)) {
      throw new Error(`Invalid theme type. Must be one of ${Object.values(ThemeType).join(', ')}.`);
    }

    const loader = TokensRepository.getInstance();
    const cssTokens = await loader.get(tokenType);

    if (!cssTokens) {
      throw new Error(`Invalid token type. Must be one of ${Object.values(TokenType).join(', ')}.`);
    }

    return cssTokens;
  }

  async changeTheme({ themeType, tokenType }: ChangeThemeDTO): Promise<Theme> {
    themeType = themeType || this._currentTheme.themeType;
    tokenType = tokenType || this._currentTheme.tokenType;

    const cssTokens = await ThemeService.validateAndLoadTokens(tokenType, themeType);
    this._currentTheme = this.createTheme(cssTokens, themeType, tokenType);

    return this.currentTheme;
  }

}