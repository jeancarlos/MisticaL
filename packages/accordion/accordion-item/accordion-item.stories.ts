import { html } from 'lit';
import { Meta, StoryFn} from '@storybook/web-components';
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
	{ path: '/demo/assets/flash_252851.png', type: 'icon' },
	{ path: '/demo/assets/flash_252851.png', type: 'circle-icon' },
	{ path: '/demo/assets/perfil.jpg', type: 'avatar' },
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
    ></accordion-item>
  `)}
</div>
`;

export const AccordionItemStories: StoryFn<AccordionItemArgs & {globals: Globals}> = Template.bind({});

AccordionItemStories.args = {
	header: 'Header Example',
	description: 'Description Example',
	content: 'Content Example',
	boxed: false,
	inverse: false,
};