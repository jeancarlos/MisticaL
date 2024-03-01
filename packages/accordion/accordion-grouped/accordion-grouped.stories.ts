import { html } from 'lit';
import { Meta, StoryFn} from '@storybook/web-components';
import { ThemeType } from '../../../tools/theme/types/theme';
import { TokenType } from '../../../tools/theme/types/token';
import '../index';


export default {
  title: 'Components/Accordion',
  component: 'accordion-grouped',
  argTypes: {
		header: { control: 'text' },
		description: { control: 'text' },
		content: { control: 'text' },
		inverse: { control: 'boolean' },
		hasSlot: { control: 'boolean' },
		autoCollapse: { control: 'boolean' },
  },
} as Meta;

interface AccordionGroupedArgs {
	header: string;
	description: string;
	content: string;
	inverse: boolean;
	hasSlot: boolean;
	autoCollapse: boolean;
}

interface Globals {
	theme?: string;
}

const itemsCount = 3;

const Template: StoryFn<AccordionGroupedArgs & { globals?: Globals }> = (args, { globals }) => html`
<div style="display: grid">
	<accordion-grouped
	theme-type=${ThemeType.Light}
	token-type=${globals.theme as TokenType}
	.singleOpen=${args.autoCollapse}
	>
	${Array(itemsCount).fill('').map(() => html`
		<accordion-item
		theme-type=${ThemeType.Light}
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/lightning-regular.svg', type: 'circle-icon' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.inverse=${args.inverse}
		><div style="width: 100%; height: 75px; background: green"></div></accordion-item>
	`)}
	</accordion-grouped>
</div>
`;

export const AccordionGroupedStories: StoryFn<AccordionGroupedArgs & {globals: Globals}> = Template.bind({});

AccordionGroupedStories.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
	inverse: false,
	hasSlot: false,
	autoCollapse: false,
};