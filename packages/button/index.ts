import { ThemeWebComponent } from '../theme/index';
import { html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';


@customElement('meu-botao')
export class MeuBotao extends ThemeWebComponent {
  @state() private label = 'Clique Aqui';
  @property({ type: String }) theme: string;

  // static get styles() {
  //   return [
  //     super.styles,
  //     css`
  //       button {
  //         padding: 10px 20px;
  //         border: none;
  //         cursor: pointer;
  //         font-size: 16px;
  //         border-radius: 5px;
  //         transition: background-color 0.3s ease;
  //         background-color: var(--button-background-color, #007bff);
  //         color: var(--button-text-color, #ffffff);
  //       }
  //       :host(:hover) button {
  //         background-color: var(--button-hover-background-color, #0056b3);
  //       }
  //     `
  //   ];
  // }

  override render() {
    return html`
      <button @click="${this._onClick}">${this.theme}</button>
    `;
  }

  private _onClick() {
    console.log('Botão clicado!');
    console.log(`Tema atual: ${this.theme}`);
  }
}