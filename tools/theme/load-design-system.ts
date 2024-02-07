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


function replacePaletteValues(theme: DesignSystem): DesignSystem {
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

export async function loadDesignSystem(key: DesignSystemKeys): Promise<DesignSystem> {
  const filePath = paths[key];
  if (!filePath) {
    throw new Error(`Design system not found: ${key}`);
  }

  try {
    const response = await fetch(filePath);
    const jsonData = await response.json() as DesignSystem;

    const cssTokens = replacePaletteValues(jsonData);
    return cssTokens
  } catch (error) {
    console.error(`Error loading design system ${key}:`, error);
    throw error;
  }
}

export async function loadAllDesignSystems(): Promise<{ [key in DesignSystemKeys]?: DesignSystem }> {
  const allDesigns: { [key: string]: DesignSystem } = {};

  await Promise.all(
    Object.keys(paths).map(async (key) => {
      const design = await loadDesignSystem(key as DesignSystemKeys);
      allDesigns[key] = design;
    })
  );

  return allDesigns;
}