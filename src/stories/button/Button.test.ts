import { html, fixture, expect } from '@open-wc/testing'
import Button from './Button'

describe('Button', () => {
    it('teste button', async () => {
        const Button = await fixture(html` <Button label="teste"></Button>`)

        expect(Button).to.equal('teste')
    })
})