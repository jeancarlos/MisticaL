import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { TextWebComponent } from '.';

const setup = async () => {
  const el = await fixture(html`<text-web-component theme-type='light' token-type='vivo'></text-web-component>`) as unknown as TextWebComponent;
  return el;
}

describe('TextWebComponent', () => {
  let el: TextWebComponent;

  beforeEach(async () => {
    el = await setup();
  });

  it('should apply the correct preset', async () => {
    el.preset = 'text1';
    expect(el.preset).to.equal('text1');
  });

  it('should render the correct tag', async () => {
    el.as = 'h1';
    await el.updateComplete;
    const renderedTag = el.shadowRoot?.querySelector('h1');
    expect(renderedTag).to.not.be.null;
  });

  it('should apply the correct font weight', async () => {
    el.weight = 'bold';
    expect(el.weight).to.equal('bold');
  });

  it('should apply the correct font weight that is in the design token', async () => {
    el.preset = 'text8';
    await el.updateComplete;
    expect(el.weight).to.equal('light');
  });

  it('should truncate the text when specified', async () => {
    el.truncate = 1;
    expect(el.truncate).to.equal(1);
  });

  it('should update styles correctly when changing properties', async () => {
    el.preset = 'text3';
    el.weight = 'regular';
    await el.updateComplete;
    expect(el.preset).to.equal('text3');
    expect(el.weight).to.equal('regular');
  });
});