import { html, fixture, expect } from '@open-wc/testing'
import Button from './'

describe('Button', () => {
    it('has a default title "Hey there" and counter 5', async () => {
        const Button = await fixture(html` <Button label="teste"></button>`)

        expect(Button).to.equal('teste')
    })
})