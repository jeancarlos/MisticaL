import { ComponentsColor } from './types/colors';
import { Radius } from './types/radius';
import Palette from './types/palette';
import { Text } from './types/text';
import { DesignSystemKeys } from './types/design-system-keys';
import { loadDesignSystem } from './load-design-system';
import { ITheme } from './types/theme';
import { ThemeKeys } from './types/theme-keys';


export class Theme implements ITheme {
  componentsColor: ComponentsColor;
  radius: Radius;
  text: Text;
  palette: Palette;

  private constructor(componentsColor: ComponentsColor, radius: Radius, text: Text, palette: Palette) {
    this.componentsColor = componentsColor;
    this.radius = radius;
    this.text = text;
    this.palette = palette;
  }

  static async build(
    themeKey: DesignSystemKeys = DesignSystemKeys.VivoNew,
    themeType: ThemeKeys = ThemeKeys.Light
    ): Promise<Theme> {

    if (!Object.values(ThemeKeys).includes(themeType)) {
      throw new Error(`Invalid theme type. Must be one of ${Object.values(ThemeKeys).join(', ')}.`);
    }

    const theme = await loadDesignSystem(themeKey);

    return new Theme(
      theme[themeType],
      theme.radius,
      theme.text,
      theme.global.palette,
    );
  }
}