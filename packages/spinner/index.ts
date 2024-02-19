import { PropertyValueMap, css, html } from "lit";
import { ThemeWebComponent } from "../theme";
import { customElement, property } from "lit/decorators.js";


@customElement('spinner-web-component')
export class SpinnerWebComponent extends ThemeWebComponent {
  @property({ type: Number }) size = 24;

  static override styles = css`
    .spinner {
      animation: spin 1s linear infinite;
      border: var(--spinner-border-width) solid #f3f3f3;
      border-top: var(--spinner-border-width) solid var(--spinner-color);
      border-radius: 50%;
      width: var(--spinner-size);
      height: var(--spinner-size);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;


  protected override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);

    if (changedProperties.has('_theme') || changedProperties.has('size')) {
      this.updateStyles();
    }
  }

  private updateStyles() {
    if (this.theme) {
      const borderWidth = this.size / 8;
      this.style.setProperty('--spinner-color', this.theme.componentsColor.controlActivated.value);
      this.style.setProperty('--spinner-size', `${this.size}px`);
      this.style.setProperty('--spinner-border-width', `${borderWidth}px`);
    }
  }

  override render() {
    super.render();
    return html`
      <div class="spinner"></div>
    `;
  }
}