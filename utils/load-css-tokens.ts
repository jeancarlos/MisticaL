import Theme from "../packages/theme/types/theme";
import { ThemeKeys } from "../packages/theme/types/theme-keys";


const paths: { [key in ThemeKeys]: string } = {
  [ThemeKeys.Blau]: '/submodules/mistica-design/tokens/blau.json',
  [ThemeKeys.MovistarLegacy]: '/submodules/mistica-design/tokens/movistar-legacy.json',
  [ThemeKeys.Movistar]: '/submodules/mistica-design/tokens/movistar.json',
  [ThemeKeys.O2]: '/submodules/mistica-design/tokens/o2.json',
  [ThemeKeys.Telefonica]: '/submodules/mistica-design/tokens/telefonica.json',
  [ThemeKeys.VivoNew]: '/submodules/mistica-design/tokens/vivo-new.json',
  [ThemeKeys.Vivo]: '/submodules/mistica-design/tokens/vivo.json',
};

export async function loadCssTokens(key: ThemeKeys): Promise<Theme> {
  const filePath = paths[key];
  if (!filePath) {
    throw new Error(`Design system not found: ${key}`);
  }

  try {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error loading design system ${key}:`, error);
    throw error;
  }
}
export async function loadAllCssTokens(): Promise<{ [key in ThemeKeys]?: Theme }> {
  const allDesigns: { [key: string]: Theme } = {};

  await Promise.all(
    Object.keys(paths).map(async (key) => {
      const design = await loadCssTokens(key as ThemeKeys);
      allDesigns[key] = design;
    })
  );

  return allDesigns;
}