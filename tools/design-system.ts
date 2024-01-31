import { ComponentsColor } from './types/colors';
import { Radius } from './types/radius';
import { Text } from './types/text';
import Palette from './types/palette';

interface IDesignSystemProps {
  light: ComponentsColor;
  dark: ComponentsColor;
  radius: Radius;
  text: Text;
  global: { Palette: Palette };
}

class DesignSystem implements IDesignSystemProps {
  light: ComponentsColor;

  dark: ComponentsColor;

  radius: Radius;

  text: Text;

  global: { Palette: Palette };

  constructor(data: IDesignSystemProps) {
    this.light = data.light;
    this.dark = data.dark;
    this.radius = data.radius;
    this.text = data.text;
    this.global = data.global;
  }
}

export default DesignSystem;
