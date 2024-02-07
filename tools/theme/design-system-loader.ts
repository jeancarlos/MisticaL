import DesignSystem from "./types/design-system";
import { DesignSystemKeys } from "./types/design-system-keys";

const paths: { [key in DesignSystemKeys]: string } = {
  [DesignSystemKeys.Blau]: '/submodules/mistica-design/tokens/blau.json',
  [DesignSystemKeys.MovistarLegacy]: '/submodules/mistica-design/tokens/movistar-legacy.json',
  [DesignSystemKeys.Movistar]: '/submodules/mistica-design/tokens/movistar.json',
  [DesignSystemKeys.O2]: '/submodules/mistica-design/tokens/o2.json',
  [DesignSystemKeys.Telefonica]: '/submodules/mistica-design/tokens/telefonica.json',
  [DesignSystemKeys.VivoNew]: '/submodules/mistica-design/tokens/vivo-new.json',
  [DesignSystemKeys.Vivo]: '/submodules/mistica-design/tokens/vivo.json',
};

class DesignSystemLoader {
  private static instance: DesignSystemLoader;
  private designSystems: { [key in DesignSystemKeys]?: DesignSystem } = {};

  public static async getInstance(): Promise<DesignSystemLoader> {
    if (!DesignSystemLoader.instance) {
      const loader = new DesignSystemLoader();
      await loader.loadAllDesignSystems();
      DesignSystemLoader.instance = loader;
    }
    return DesignSystemLoader.instance;
  }

  private replacePaletteValues(theme: DesignSystem): DesignSystem {
    const newTheme = JSON.parse(JSON.stringify(theme));

    ['dark', 'light'].forEach((themeType) => {
      for (const key in newTheme[themeType]) {
        const match = newTheme[themeType][key].value.match(/\{palette\.(\w+)\}/);
        if (match) {
          newTheme[themeType][key].value = newTheme.global.palette[match[1]].value;
        }
      }
    });

    return newTheme;
  }

  private async loadDesignSystem(key: DesignSystemKeys): Promise<DesignSystem> {
    const filePath = paths[key];
    if (!filePath) {
      throw new Error(`Design system not found: ${key}`);
    }

    try {
      const response = await fetch(filePath);
      const jsonData = await response.json() as DesignSystem;

      const cssTokens = this.replacePaletteValues(jsonData);
      this.designSystems[key] = cssTokens;
      return cssTokens
    } catch (error) {
      console.error(`Error loading design system ${key}:`, error);
      throw error;
    }
  }

  private async loadAllDesignSystems(): Promise<void> {
    await Promise.all(
      Object.keys(paths).map(async (key) => {
        const design = await this.loadDesignSystem(key as DesignSystemKeys);
        this.designSystems[key as DesignSystemKeys] = design;
      })
    );
  }

  public getDesignSystem(key: DesignSystemKeys): DesignSystem | undefined {
    return this.designSystems[key];
  }
}

export default DesignSystemLoader;