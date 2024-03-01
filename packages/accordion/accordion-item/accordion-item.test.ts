import { AccordionItem } from './accordion-item';
import { html, fixture, expect, elementUpdated } from '@open-wc/testing';

interface SetupProps {
	header: string;
	description: string;
	content: string;
	boxed?: boolean;
	hasSlot?: boolean;
	inverse?: boolean;
}

const setup = async (props: SetupProps) => {
	const el = await fixture(html`
		<accordion-item
			theme-type='light'
			token-type='vivo'
			header=${props.header}
			description=${props.description}
			content=${props.content}
			boxed
		>
		</accordion-item>`) as AccordionItem;

	return el;
}

describe('Accordion Item', () => {
	it('sets properties correctly', async () => {
        const el = await setup({
            header: 'Test Header',
            description: 'Test Description',
            content: 'Test Content',
        });

		await elementUpdated(el);
		await expect(el).to.be.accessible();

        expect(el.getAttribute('header')).to.equal('Test Header');
        expect(el.getAttribute('description')).to.equal('Test Description');
        expect(el.getAttribute('content')).to.equal('Test Content');
        expect(el.getAttribute('boxed')).to.empty;
    });

});