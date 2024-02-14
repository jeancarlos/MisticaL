import { ThemeType } from './../tools/theme/types/theme';
import '/packages/theme/index.ts';
import { ThemeService } from '../tools/theme/services/theme-service';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'blau',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'blau', title: 'Blau' },
        { value: 'movistar', title: 'Movistar' },
        { value: 'movistar-legacy', title: 'MovistarLegacy' },
        { value: 'o2', title: 'O2' },
        { value: 'telefonica', title: 'Telefonica' },
        { value: 'vivo-new', title: 'VivoNew' },
        { value: 'vivo', title: 'Vivo' },
      ],
    },
  },
};

(async () => {
  await ThemeService.build();
})();

const withThemeProvider = (Story, context) => {
  if (!window.themeService) {
    console.error('ThemeService is not initialized');
    return Story();
  }

  const theme = context.globals.theme;
  console.log(theme, 'theme')
  window.themeService.changeTheme({ tokenType: theme, themeType: ThemeType.Dark });
  return Story();
};

export const decorators = [withThemeProvider];