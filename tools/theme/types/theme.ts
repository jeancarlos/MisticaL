import { ComponentsColor } from "./colors";
import Palette from "./palette";
import { Radius } from "./radius";
import { Text } from "./text";

export interface ITheme {
  componentsColor: ComponentsColor;
  radius: Radius;
  text: Text;
  palette: Palette;
}