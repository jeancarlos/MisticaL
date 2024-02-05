import { ComponentsColor } from './colors';
import { Radius } from './radius';
import { Text } from './text';
import Palette from './palette';

export default interface Theme {
  [key: string]: any;
  light: ComponentsColor;
  dark: ComponentsColor;
  radius: Radius;
  text: Text;
  global: { palette: Palette };
}
