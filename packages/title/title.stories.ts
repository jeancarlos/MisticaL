
import { Meta, StoryFn } from '@storybook/web-components';
import '.'

interface TitleArgs {
  as: 'h1' | 'h2' | 'h3';
  rightContent: 'link' | 'icon' | 'undefined';
  weight: 'light' | 'regular' | 'medium' | 'bold';
}

export default {
  title: 'Components/TitleComponent',
  argTypes: {
    as: { control: { type: 'select', options: ['h1', 'h2', 'h3'] } },
    rightContent: { control: { type: 'select', options: ['link', 'icon', 'undefined'] } },
  },
} as Meta;

const Template: StoryFn<TitleArgs> = (args: TitleArgs) => {
  const titleComponent = document.createElement('title-component');
  titleComponent.setAttribute('as', args.as);
  titleComponent.setAttribute('right', args.rightContent);
  titleComponent.textContent = 'Title';

  return titleComponent;
};

export const Title1: StoryFn<TitleArgs> = Template.bind({});
Title1.args = {
  as: 'h1',
  rightContent: 'undefined',
};
Title1.storyName = 'Title 1';

export const Title2: StoryFn<TitleArgs> = Template.bind({});
Title2.args = {
  as: 'h2',
  rightContent: 'link',
};
Title2.storyName = 'Title 2';

export const Title3: StoryFn<TitleArgs> = Template.bind({});
Title3.args = {
  as: 'h3',
  rightContent: 'icon',
};
Title3.storyName = 'Title 3';