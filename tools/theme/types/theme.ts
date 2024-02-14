import { ComponentsColor } from "./colors";
import Palette from "./palette";
import { Radius } from "./radius";
import { Text } from "./text";
import { TokenType } from "./token";

export enum ThemeType {
  Light = 'light',
  Dark = 'dark'
}
export interface Theme {
  themeType: ThemeType,
  tokenType: TokenType,

  componentsColor: ComponentsColor;
  radius: Radius;
  text: Text;
  palette: Palette;
}