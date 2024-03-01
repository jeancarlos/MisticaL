import '.';

import { StoryFn } from '@storybook/web-components';
import { FontWeight, Preset } from './types';
import { html } from 'lit';
import { ThemeType } from '../../tools/theme/types/theme';

interface TextComponentArgs {
  themeType: string;
  tokenType: string;
  useArgsToken: boolean;
}

interface Globals {
  theme?: string;
}

const Template = (args: TextComponentArgs, { globals }: { globals: Globals }) => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const presets = [
    { preset: Preset.Text10, weight: FontWeight.Regular },
    { preset: Preset.Text9, weight: FontWeight.Regular },
    { preset: Preset.Text8, weight: FontWeight.Regular },
    { preset: Preset.Text7, weight: FontWeight.Regular },
    { preset: Preset.Text6, weight: FontWeight.Regular },
    { preset: Preset.Text5, weight: FontWeight.Regular },
    { preset: Preset.Text4, weight: FontWeight.Regular },
    { preset: Preset.Text4, weight: FontWeight.Light },
    { preset: Preset.Text3, weight: FontWeight.Regular },
    { preset: Preset.Text3, weight: FontWeight.Light },
    { preset: Preset.Text2, weight: FontWeight.Regular },
    { preset: Preset.Text2, weight: FontWeight.Light },
    { preset: Preset.Text1, weight: FontWeight.Regular },
    { preset: Preset.Text1, weight: FontWeight.Light },
  ];

  presets.forEach(({ preset, weight }) => {
    const text = document.createElement('text-web-component');
    const themeType = args.themeType;
    const tokenType = args.useArgsToken ? args.tokenType : globals.theme || 'movistar';
    text.setAttribute('theme-type', themeType);
    text.setAttribute('token-type', tokenType);
    text.setAttribute('preset', preset);
    text.setAttribute('weight', weight);
    const textNode = document.createTextNode(`${preset} ${weight}`);
    text.appendChild(textNode);
    container.appendChild(text);
  });

  return container;
};


function createTextComponent(
  preset: Preset,
  weight: FontWeight,
  truncate: number | null = null,
  wordBreak: boolean = true,
  content: string = 'Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation.'
) {
  return html`
    <text-web-component
      theme-type="light"
      token-type="vivo"
      preset="${preset}"
      weight="${weight}"
      .truncate=${truncate}
      .wordBreak=${wordBreak}
    >
      ${content}
    </text-web-component>
  `;
}

const TextWrappingTemplate: StoryFn<TextComponentArgs & { globals?: Globals }> = () => {

  return html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px">
        ${createTextComponent(Preset.Text1, FontWeight.Light, null, true, 'DEFAULT (WITH WORDBREAK)')}
        ${createTextComponent(Preset.Text3, FontWeight.Light)}
      </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px">
        ${createTextComponent(Preset.Text1, FontWeight.Light, null, false, 'WITHOUT WORDBREAK')}
        ${createTextComponent(Preset.Text3, FontWeight.Regular, null, false)}
      </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px">
        ${createTextComponent(Preset.Text1, FontWeight.Light, 1, true, 'TRUNCATE=1')}
        ${createTextComponent(Preset.Text3, FontWeight.Regular, 1, true)}
      </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px">
        ${createTextComponent(Preset.Text1, FontWeight.Light, 3, true, 'TRUNCATE=3')}
        ${createTextComponent(Preset.Text3, FontWeight.Regular, 3, true)}
      </div>
    </div>
  `;
};

export default {
  title: 'Components/TextComponents',
  argTypes: {
    themeType: { control: 'text' },
    tokenType: { control: 'text' },
    useArgsToken: { control: 'boolean' },
  },
};

export const TextComponents: StoryFn<TextComponentArgs & { globals?: Globals }> = Template.bind({});
TextComponents.argTypes = {
  tokenType: { if: { arg: 'useArgsToken' } },
};
TextComponents.storyName = 'Text components';

TextComponents.args = {
  themeType: ThemeType.Light,
  tokenType: 'o2',
  useArgsToken: true,
};

export const TextWrapping: StoryFn<TextComponentArgs & { globals?: Globals }> = TextWrappingTemplate.bind({});
TextComponents.args = {
  themeType: ThemeType.Light,
  tokenType: 'o2',
  useArgsToken: true,
};
TextWrapping.storyName = 'Text Wrapping';
