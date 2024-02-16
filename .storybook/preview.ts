import '/packages/theme/index.ts';

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
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#061824',
      },
    ],
  },
};