import { CSSResultGroup, css, html } from "lit";
import { ThemeWebComponent } from "../theme";
import { customElement, property } from "lit/decorators.js";
import "../text";


@customElement('title-web-component')
export class TitleWebComponent extends ThemeWebComponent {
  @property({ type: String }) as: string = "h1";
  @property({ type: String }) titleText: string = "";
  @property({ type: String }) rightContent: string | undefined;

  static override get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
      .title-container {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
       .right-content {
        padding-left: 16px;
      }

      `
    ];
  }

  private renderTitle(): unknown {
    const titleMap: Record<string, unknown> = {
      'h1': html`<text-web-component as="h1" preset="text1" weight="regular" theme-type="light" token-type="vivo">${this.titleText}</text-web-component>`,
      'h2': html`<text-web-component as="h2" preset="text2" weight="regular" theme-type="light" token-type="vivo" fontSize="20px,28px" >${this.titleText}</text-web-component>`,
      'h3': html`<text-web-component as="h3" preset="text5" weight="bold" theme-type="light" token-type="vivo"> ${this.titleText}</text-web-component>`
    };
    return titleMap[this.as as keyof typeof titleMap];
  }

  override render(): unknown {
    return html`
      <div class="title-container">
        ${this.renderTitle()}
        <slot name="rightContent"></slot>
      </div>
    `;
  }
}