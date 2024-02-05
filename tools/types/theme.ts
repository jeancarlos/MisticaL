import { ComponentsColor } from './colors';
import { Radius } from './radius';
import { Text } from './text';

export default interface Theme {
  light: ComponentsColor;
  dark: ComponentsColor;
  radius: Radius;
  text: Text;
}
