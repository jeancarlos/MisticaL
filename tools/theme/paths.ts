import { TokenType } from "./types/token";

export const tokensPaths: { [key in TokenType]: string } = {
  [TokenType.Blau]: '/submodules/mistica-design/tokens/blau.json',
  [TokenType.MovistarLegacy]: '/submodules/mistica-design/tokens/movistar-legacy.json',
  [TokenType.Movistar]: '/submodules/mistica-design/tokens/movistar.json',
  [TokenType.O2]: '/submodules/mistica-design/tokens/o2.json',
  [TokenType.Telefonica]: '/submodules/mistica-design/tokens/telefonica.json',
  [TokenType.VivoNew]: '/submodules/mistica-design/tokens/vivo-new.json',
  [TokenType.Vivo]: '/submodules/mistica-design/tokens/vivo.json',
};