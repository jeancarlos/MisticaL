import DesignSystem from './types/design-system';
import { DesignSystemKeys } from './types/design-system-keys';

const paths = [
  {
    name: DesignSystemKeys.Blau,
    path: '/submodules/mistica-design/tokens/blau.json',
  },
  {
    name: DesignSystemKeys.MovistarLegacy,
    path: '/submodules/mistica-design/tokens/movistar-legacy.json',
  },
  {
    name: DesignSystemKeys.Movistar,
    path: '/submodules/mistica-design/tokens/movistar.json',
  },
  { name: DesignSystemKeys.O2, path:
    '/submodules/mistica-design/tokens/o2.json'
  },
  {
    name: DesignSystemKeys.Telefonica,
    path: '/submodules/mistica-design/tokens/telefonica.json',
  },
  {
    name: DesignSystemKeys.VivoNew,
    path: '/submodules/mistica-design/tokens/vivo-new.json',
  },
  {
    name: DesignSystemKeys.Vivo,
    path: '/submodules/mistica-design/tokens/vivo.json',
  },
];


async function load(key: DesignSystemKeys): Promise<DesignSystem> {
  const filePath = paths.find(path => path.name === key)?.path;
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

export async function loadAll(): Promise<{ [key: string]: DesignSystem }> {
  const allDesigns: { [key: string]: DesignSystem } = {};

  await Promise.all(
    paths.map(async ({ name }) => {
      const design = await load(name);
      allDesigns[name] = design;
    })
  );

  return allDesigns;
}