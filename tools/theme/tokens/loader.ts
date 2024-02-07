import Token, { TokenType } from "../types/token";


const paths: { [key in TokenType]: string } = {
  [TokenType.Blau]: '/submodules/mistica-design/tokens/blau.json',
  [TokenType.MovistarLegacy]: '/submodules/mistica-design/tokens/movistar-legacy.json',
  [TokenType.Movistar]: '/submodules/mistica-design/tokens/movistar.json',
  [TokenType.O2]: '/submodules/mistica-design/tokens/o2.json',
  [TokenType.Telefonica]: '/submodules/mistica-design/tokens/telefonica.json',
  [TokenType.VivoNew]: '/submodules/mistica-design/tokens/vivo-new.json',
  [TokenType.Vivo]: '/submodules/mistica-design/tokens/vivo.json',
};

class TokensLoader {
  private static instance: TokensLoader;
  private tokens: { [key in TokenType]?: Token } = {};

  public static async getInstance(): Promise<TokensLoader> {
    if (!TokensLoader.instance) {
      const loader = new TokensLoader();
      await loader.loadAll();
      TokensLoader.instance = loader;
    }
    return TokensLoader.instance;
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

  private async load(key: TokenType): Promise<Token> {
    const filePath = paths[key];
    if (!filePath) {
      throw new Error(`Tokens not found: ${key}`);
    }

    try {
      const response = await fetch(filePath);
      const jsonData = await response.json() as Token;

      const cssTokens = this.replacePaletteValues(jsonData);
      this.tokens[key] = cssTokens;
      return cssTokens
    } catch (error) {
      console.error(`Error loading tokens ${key}:`, error);
      throw error;
    }
  }

  private async loadAll(): Promise<void> {
    await Promise.all(
      Object.keys(paths).map(async (key) => {
        const token = await this.load(key as TokenType);
        this.tokens[key as TokenType] = token;
      })
    );
  }

  public get(key: TokenType): Token | undefined {
    return this.tokens[key];
  }
}

export default TokensLoader;