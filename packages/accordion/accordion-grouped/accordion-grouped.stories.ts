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
		autoCollapse: { control: 'boolean' },
  },
} as Meta;

interface AccordionGroupedArgs {
	header: string;
	description: string;
	content: string;
	inverse: boolean;
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
		.asset=${{ path: '/demo/assets/lightning-regular.svg', type: 'icon' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.inverse=${args.inverse}
		></accordion-item>
	`)}
	</accordion-grouped>
</div>
`;

export const AccordionGroupedStories: StoryFn<AccordionGroupedArgs & {globals: Globals}> = Template.bind({});

AccordionGroupedStories.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Content Example',
	inverse: false,
	autoCollapse: false,
};