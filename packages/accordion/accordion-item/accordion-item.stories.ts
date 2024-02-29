import { html } from 'lit';
import { Meta, StoryFn} from '@storybook/web-components';
import './accordion-item';
import { ThemeType } from '../../../tools/theme/types/theme';
import { TokenType } from '../../../tools/theme/types/token';


export default {
  title: 'Components/Accordion',
  component: 'accordion-item',
  argTypes: {
		header: { control: 'text' },
		description: { control: 'text' },
		content: { control: 'text' },
		boxed: { control: 'boolean' },
		inverse: { control: 'boolean' },
		hasSlot: { control: 'boolean' },
  },
} as Meta;


interface AccordionItemArgs {
	header: string;
	description: string;
	content: string;
	boxed: boolean;
	inverse: boolean;
	hasSlot: boolean;
}

interface Globals {
	theme?: string;
}

const Template: StoryFn<AccordionItemArgs & { globals?: Globals }> = (args, { globals }) => html`
<div style="display: grid">
	<accordion-item
		.asset=${{ path: '/demo/assets/flash_252851.png', type: 'icon' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
		.hasSlot=${args.hasSlot}
	></accordion-item>
	<accordion-item
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/flash_252851.png', type: 'circle-icon' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
		.hasSlot=${args.hasSlot}
	> <div style="width: 100%; height: 100px; background: #123512"></div></accordion-item>
	<accordion-item
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/perfil.jpg', type: 'avatar' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
	></accordion-item>
	<accordion-item
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/clock-8592484_1280.jpg', type: 'square-image' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
	></accordion-item>
	<accordion-item
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/clock-8592484_1280.jpg', type: 'portrait-image' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
	></accordion-item>
	<accordion-item
		token-type=${globals.theme as TokenType}
		.asset=${{ path: '/demo/assets/woman-8402052_1280.jpg', type: 'wide-image' }}
		.header=${args.header}
		.description=${args.description}
		.content=${args.content}
		.boxed=${args.boxed}
		.inverse=${args.inverse}
	></accordion-item>
</div>
`;

export const AccordionItemWC	: StoryFn<AccordionItemArgs & {globals: Globals}> = Template.bind({});

AccordionItemWC	.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Content Example',
	boxed: false,
	inverse: false,
};