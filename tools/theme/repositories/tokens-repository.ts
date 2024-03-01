import Token, { TokenType } from "../types/token";
import blau from '../../../submodules/mistica-design/tokens/blau.json' assert { type: "json" };
import movistarLegacy from '../../../submodules/mistica-design/tokens/movistar-legacy.json' assert { type: "json" };
import movistar from '../../../submodules/mistica-design/tokens/movistar.json' assert { type: "json" };
import o2 from '../../../submodules/mistica-design/tokens/o2.json' assert { type: "json" };
import telefonica from '../../../submodules/mistica-design/tokens/telefonica.json' assert { type: "json" };
import vivoNew from '../../../submodules/mistica-design/tokens/vivo-new.json' assert { type: "json" };
import vivo from '../../../submodules/mistica-design/tokens/vivo.json' assert { type: "json" };

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

	get(key: TokenType): Token | undefined {
		if (!this._tokens[key]) {
			this._tokens[key] = this.load(key);
		}
		return this._tokens[key];
	}

	private load(key: TokenType): Token{
		const tokenMap: { [key in TokenType]?: Token } = {
			[TokenType.Blau]: blau,
			[TokenType.MovistarLegacy]: movistarLegacy,
			[TokenType.Movistar]: movistar,
			[TokenType.O2]: o2,
			[TokenType.Telefonica]: telefonica,
			[TokenType.VivoNew]: vivoNew,
			[TokenType.Vivo]: vivo,
		};

		const jsonData = tokenMap[key];

		if (!jsonData) {
			throw new Error(`Tokens not found: ${key}`);
		}

		const cssTokens = this.replacePaletteValues(jsonData);
		return cssTokens;
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