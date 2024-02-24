import { tokensPaths } from "../paths";
import Token, { TokenType } from "../types/token";

class TokensRepository {
  private static _instance: TokensRepository;
  private _tokens: { [key in TokenType]?: Token } = {};

  private constructor() {}

  static getInstance(): TokensRepository {
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
        if (newTokens[themeType][key].value.includes('rgba')) {
          newTokens[themeType][key].value = this.replaceRgbaPaletteValues(newTokens[themeType][key].value, tokens);
        } else {
          newTokens[themeType][key].value = this.replaceNormalPaletteValues(newTokens[themeType][key].value, tokens);
        }
      }
    });

    return newTokens;
  }

  private replaceNormalPaletteValues(value: string, tokens: Token): string {
    return value.replace(/\{palette\.(\w+)\}/g, (match: string, p1: string) => {
      const paletteValue = tokens.global.palette[p1]?.value;
      return paletteValue || match;
    });
  }

  private replaceRgbaPaletteValues(value: string, tokens: Token): string {
    return value.replace(/rgba\(\{palette\.(\w+)\}, (\d+(?:\.\d+)?)\)/g, (match: string, paletteKey: string, opacity: string) => {
      const paletteValue = tokens.global.palette[paletteKey]?.value;
      return paletteValue && paletteValue.startsWith('#') ? this.hexToRgbA(paletteValue, parseFloat(opacity)) : match;
    });
  }

  private hexToRgbA(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    const [r, g, b] = result.slice(1).map(hex => parseInt(hex, 16));
    return `rgba(${r},${g},${b},${opacity})`;
  }
}

export default TokensRepository;