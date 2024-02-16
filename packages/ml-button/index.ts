import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

type value = unknown

export type buttonProps = {
  onClick: (value: unknown) => value
}

class MLButton extends LitElement {
  @property({ type })
  onClick: Function;

  override render = () => html`
    <button type="button" @click=${{ handleEvent: this.onClick }}>
      <slot></slot>
    </button>
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ml-button': MLButton
  }
}

export default MLButton;