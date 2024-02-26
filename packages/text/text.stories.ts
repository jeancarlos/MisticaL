import { html } from 'lit';
import { StoryFn } from '@storybook/web-components';
import '.'
import { ThemeType } from '../../tools/theme/types/theme';

interface TextComponentArgs {
  themeType: ThemeType;
  tokenType: string;
  useArgsToken: boolean;
}

interface Globals {
  theme?: string;
}

const Template: StoryFn<TextComponentArgs & { globals?: Globals }> = ({ themeType, tokenType, useArgsToken }, { globals }) => {

  const themeToken = useArgsToken ? tokenType : globals.theme || 'movistar';

  return html`
  <div  style="display: flex; flex-direction: column;">
    <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text10" >Text10</text-web-component>
      <!-- <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text9" >Text9</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text8" >Text8</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text7">Text7</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text6">Text6</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text5">Text5</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text4" weight='medium'>Text4 Medium</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text4" weight='regular'>Text4 Regular</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text4" weight='light'>Text4 Light</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3" weight='medium'>Text3 Medium</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3" weight='regular'>Text3 Regular</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3" weight='light'>Text3 Light</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text2" weight='medium'>Text2 Medium</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text2" weight='regular'>Text2 Regular</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" weight='medium'>Text1 Medium</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" weight='regular'>Text1 Regular</text-web-component> -->
      </div>
  `;
};

const TextWrappingTemplate: StoryFn<TextComponentArgs & { globals?: Globals }> = ({ themeType, tokenType, useArgsToken }, { globals }) => {
  const themeToken = useArgsToken ? tokenType : globals.theme || 'movistar';
  console.log(themeToken, 'themeToken - text wrapping');

  return html`
  <div style="display: flex; flex-direction: column; gap: 16px;">
  <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px" >
    <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" style="color: gray; ">DEFAULT (WITH WORDBREAK)</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3">
        Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation.
      </text-web-component>
    </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px" >
    <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" style="color: gray;">WITHOUT WORDBREAK</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" .wordBreak=${false} preset="text3">
        Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation.
      </text-web-component>
    </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px" >
    <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" style="color: gray;">TRUNCATE=1</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3" truncate='1'>
        Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation.
      </text-web-component>
    </div>
      <div style="border: 1px solid #ccc; padding: 8px; display: flex; flex-direction: column; width: 200px" >
    <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text1" style="color: gray;">TRUNCATE=3</text-web-component>
      <text-web-component theme-type="${themeType}" token-type="${themeToken}" preset="text3" truncate='3'>
        Strawberry Friendship Everything Pneumonoultramicroscopicsilicovolcanoconiosis Appreciate Motivation.
      </text-web-component>
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
TextWrapping.storyName = 'Text Wrapping';
