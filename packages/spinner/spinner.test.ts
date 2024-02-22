import { html, fixture, expect } from '@open-wc/testing';
import { SpinnerWebComponent } from '.';
import '.';


const setup = async ( size?: number ) => {
  const el = await (fixture(html`<spinner-web-component theme-type='light' token-type='vivo'></spinner-web-component>`)) as SpinnerWebComponent;

  return el;
}

describe('SpinnerWebComponent', () => {
  it('has a default size of 24', async () => {
    const el = await setup()
    expect(el.size).to.equal(24);
  });

  it('changes size when attribute is changed', async () => {
    const el = await setup(32)
    expect(el.size).to.equal(32);
  });

  it('passes the a11y audit', async () => {
    const el = await setup()
    await expect(el).shadowDom.to.be.accessible();
  });
});



