import { html, fixture, expect } from '@open-wc/testing';
import { SpinnerWebComponent } from '.';
import '.';

const DEFAULT_SIZE = 24;

const setup = async (size?: number) => {
  const el = await (fixture(html`<spinner-web-component .size?="${size}" theme-type='light' token-type='vivo'></spinner-web-component>`)) as SpinnerWebComponent;

  return el;
}

describe('SpinnerWebComponent', () => {
  it('has a default size of 24', async () => {
    const el = await setup();
    expect(el.size).to.equal(DEFAULT_SIZE);
  });

  it('changes size when attribute is changed', async () => {
    const newSize = 32;
    const el = await setup(newSize);
    expect(el.size).to.equal(newSize);
  });

  it('passes the a11y audit', async () => {
    const el = await setup();
    await expect(el).shadowDom.to.be.accessible();
  });
});