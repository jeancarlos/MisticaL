import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';
import { TokenType } from '../../../tools/theme/types/token';
import './accordion-item';


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

const assets = [
	{ path: '/demo/assets/lightning-regular.svg', type: 'icon' },
	{ path: '/demo/assets/lightning-regular.svg', type: 'circle-icon' },
	{ path: '/demo/assets/clock-8592484_1280.jpg', type: 'avatar' },
	{ path: '/demo/assets/clock-8592484_1280.jpg', type: 'square-image' },
	{ path: '/demo/assets/clock-8592484_1280.jpg', type: 'portrait-image' },
	{ path: '/demo/assets/woman-8402052_1280.jpg', type: 'wide-image' },
];

const Template: StoryFn<AccordionItemArgs & { globals?: Globals }> = (args, { globals }) => html`
<div style="display: grid">
	${assets.map(asset => html`
		<accordion-item
			token-type=${globals.theme as TokenType}
			.asset=${asset}
			.header=${args.header}
			.description=${args.description}
			.content=${args.content}
			.boxed=${args.boxed}
			.inverse=${args.inverse}
			.hasSlot=${args.hasSlot}
		><div style="width: 100%; height: 75px; background: green"></div></accordion-item>
  `)}
</div>
`;

export const AccordionItemStories: StoryFn<AccordionItemArgs & { globals: Globals }> = Template.bind({});

AccordionItemStories.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
	boxed: false,
	inverse: false,
	hasSlot: false,
};