import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';

@customElement('button-web-component')
export class ButtonWebComponent extends ThemeWebComponent {
    static override get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
      button {
      background: var(--components-color-button-primary-background);
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
      `
    ];
  }

  override render() {
        console.log(this.tokenType, 'this.tokentype')
        console.log(this.theme, 'this.theme')
    this.style.setProperty('--components-color-button-primary-background', this.theme.componentsColor.buttonPrimaryBackground.value);

    return html`
      <h1>${this.theme.themeType}</h1>
      <h1>${this.theme.tokenType}</h1>
    `;
  }
}