import { tokensPaths } from "../paths";
import Token, { TokenType } from "../types/token";

class TokensRepository {
  private static _instance: TokensRepository;
  private _tokens: { [key in TokenType]?: Token } = {};

  private constructor() {}

  static async getInstance(): Promise<TokensRepository> {
    if (!TokensRepository._instance) {
      TokensRepository._instance = new TokensRepository();
    }
    return TokensRepository._instance;
  }

  async get(key: TokenType): Promise<Token | undefined> {
    if (!this._tokens[key]) {
      this._tokens[key] = await this.load(key);
    }
    return this._tokens[key];
  }

  private async load(key: TokenType): Promise<Token> {
    const filePath = tokensPaths[key];
    if (!filePath) {
      throw new Error(`Tokens not found: ${key}`);
    }

    try {
      const response = await fetch(filePath);
      const jsonData = await response.json() as Token;

      const cssTokens = this.replacePaletteValues(jsonData);
      return cssTokens;
    } catch (error) {
      console.error(`Error loading tokens ${key}:`, error);
      throw error;
    }
  }

  private replacePaletteValues(tokens: Token): Token {
    const newTokens = JSON.parse(JSON.stringify(tokens));

    ['dark', 'light'].forEach((themeType) => {
      for (const key in newTokens[themeType]) {
        const match = newTokens[themeType][key].value.match(/\{palette\.(\w+)\}/);
        if (match) {
          newTokens[themeType][key].value = newTokens.global.palette[match[1]].value;
        }
      }
    });

    return newTokens;
  }
}

export default TokensRepository;