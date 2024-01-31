import { ComponentsColor } from './colors';
import { Radius } from './radius';
import { Text } from './text';
import Palette from './palette';

export default interface DesignSystem {
  light: ComponentsColor;
  dark: ComponentsColor;
  radius: Radius;
  text: Text;
  global: { Palette: Palette };
}
