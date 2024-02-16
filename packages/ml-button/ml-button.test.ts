import { html, fixture, elementUpdated, expect, fixtureCleanup } from '@open-wc/testing'
import './'

const setup = async (
  content = 'button',
  clickAction = () => { }
) => {
  return fixture(html`<ml-button onClick="${clickAction}">${content}</ml-button>`)
}

describe('ml-button.test', () => {
  it('button render', async () => {
    const button = await setup('button rendered')

    expect(button).to.be.accessible();
    expect(button).lightDom.equal('button rendered');
  })

  it('click event', async () => {
    let label = 'click button'
    const clickFn = () => { label = 'click done' }
    const button = await setup('click button', clickFn);
    const buttonComponent = button.querySelector('ml-button')

    buttonComponent?.click();

    elementUpdated(button)
      .then(() => expect(button).lightDom.equal('click done'));
  });

  afterEach(() => {
    fixtureCleanup();
  })
})
