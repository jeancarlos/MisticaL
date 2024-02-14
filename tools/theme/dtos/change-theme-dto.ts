import { ThemeType } from "../types/theme";
import { TokenType } from "../types/token";

export default interface ChangeThemeDTO {
  themeType?: ThemeType,
  tokenType?: TokenType
}