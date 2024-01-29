import { LitElement, html } from 'lit';

class MLButton extends LitElement {
  count = 0


  override render = () => html`
    click count! ${this.count}
    <button type="button" @click=${{ handleEvent: this._onClick }}>
      <slot></slot>
    </button>
  `;


  private _onClick() {
    this.count++
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ml-button': MLButton
  }
}

export default MLButton;