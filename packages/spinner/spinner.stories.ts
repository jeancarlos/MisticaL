import '.';

import { Meta, StoryFn } from '@storybook/web-components';

interface SpinnerArgs {
  themeType: string;
  tokenType: string;
  useArgsToken: boolean;
  size: number;
}

interface Globals {
  theme?: string;
}

export default {
  title: 'Components/SpinnerWebComponent',
  argTypes: {
    themeType: { control: 'text' },
    tokenType: { control: { type: 'text'} },
    useArgsToken: { control: 'boolean' },
    size: { control: { type: 'range', min: 24, max:100, step: 4} }
  }
} as Meta<typeof Template>;

const Template = (args: SpinnerArgs, { globals }: { globals: Globals }) => {
  const spinner = document.createElement('spinner-web-component');
  const themeType = args.themeType;
  const tokenType = args.useArgsToken ? args.tokenType : globals.theme || 'movistar';
  spinner.setAttribute('theme-type', themeType);
  spinner.setAttribute('token-type', tokenType);
  spinner.setAttribute('size', args.size.toString());

  return spinner;
};

export const Default: StoryFn<SpinnerArgs & {globals: Globals}> = Template.bind({});

Default.argTypes = {
  tokenType: {if: {arg: 'useArgsToken'}},
};

Default.args = {
  themeType: 'dark',
  tokenType: 'o2',
  useArgsToken: true,
  size: 24,
};

Default.parameters = {};