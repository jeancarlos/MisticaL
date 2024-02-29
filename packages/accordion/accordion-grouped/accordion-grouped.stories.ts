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
		boxed: { control: 'boolean' },
		inverse: { control: 'boolean' },
		autoCollapse: { control: 'boolean' },
  },
} as Meta;

interface AccordionGroupedArgs {
	header: string;
	description: string;
	content: string;
	boxed: boolean;
	inverse: boolean;
	autoCollapse: boolean;
}

interface Globals {
	theme?: string;
}

const Template: StoryFn<AccordionGroupedArgs & { globals?: Globals }> = (args, { globals }) => html`
<div style="display: grid">
	<accordion-grouped
		theme-type=${ThemeType.Light}
		token-type=${globals.theme as TokenType}
		.singleOpen=${args.autoCollapse}
	>
		<accordion-item
			theme-type=${ThemeType.Light}
			token-type=${globals.theme as TokenType}
			.asset=${{ path: '/demo/assets/flash_252851.png', type: 'icon' }}
			.header=${args.header}
			.description=${args.description}
			.content=${args.content}
			.boxed=${args.boxed}
			.inverse=${args.inverse}
		></accordion-item>
		<accordion-item
			theme-type=${ThemeType.Light}
			token-type=${globals.theme as TokenType}
			.asset=${{ path: '/demo/assets/flash_252851.png', type: 'icon' }}
			.header=${args.header}
			.description=${args.description}
			.content=${args.content}
			.boxed=${args.boxed}
			.inverse=${args.inverse}
		></accordion-item>
		<accordion-item
			theme-type=${ThemeType.Light}
			token-type=${globals.theme as TokenType}
			.asset=${{ path: '/demo/assets/flash_252851.png', type: 'icon' }}
			.header=${args.header}
			.description=${args.description}
			.content=${args.content}
			.boxed=${args.boxed}
			.inverse=${args.inverse}
		></accordion-item>
	</accordion-grouped>
</div>
`;

export const AccordionGroupedWC: StoryFn<AccordionGroupedArgs & {globals: Globals}> = Template.bind({});

AccordionGroupedWC.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Content Example',
	boxed: false,
	inverse: false,
	autoCollapse: false,
};