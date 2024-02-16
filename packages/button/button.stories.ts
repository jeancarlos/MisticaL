import '.'

import { Meta, StoryFn } from '@storybook/web-components';

interface ButtonArgs {
  themeType: string;
  tokenType: string;
  useArgsToken: boolean;
}

interface Globals {
  theme?: string;
}

export default {
  title: 'Components/ButtonWebComponent',
  argTypes: {
    themeType: { control: 'text' },
    tokenType: { control: { type: 'text'} },
    useArgsToken: { control: 'boolean' }
  }
} as Meta<typeof Template>;

const Template = (args: ButtonArgs, { globals }: { globals: Globals }) => {
  const button = document.createElement('button-web-component');
  const themeType = args.themeType;
  const tokenType = args.useArgsToken ? args.tokenType : globals.theme || 'movistar';
  button.setAttribute('theme-type', themeType);
  button.setAttribute('token-type', tokenType);

  return button;
};

export const Default: StoryFn<ButtonArgs & {globals: Globals}> = Template.bind({});

Default.argTypes = {
  tokenType: {if: {arg: 'useArgsToken'}},
};

Default.args = {
  themeType: 'dark',
  tokenType: 'o2',
  useArgsToken: true,
};

Default.parameters = {};