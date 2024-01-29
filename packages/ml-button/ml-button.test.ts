import { html, fixture, expect, fixtureCleanup } from '@open-wc/testing'
import './'

describe('ml-button.test', () => {
  it('button render', async () => {
    const form = await fixture(html`<form>
      <ml-button></ml-button>
    </form>`)

    expect(form).not.empty
  })

  it('click event', async () => {
    const form = await fixture(html`<form>
      <button value="button" />
    </form>`)

    expect(form).not.empty
  })

  afterEach(() => {
    fixtureCleanup();
  })
})
