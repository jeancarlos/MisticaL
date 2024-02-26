import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';


type FontWeight = 'light' | 'regular' | 'medium' | 'bold'
type RightContent = 'link' | 'icon' | 'undefined'

@customElement('title-component')
export class TitleComponent extends ThemeWebComponent {

  @property({ type: String }) as = 'h3';
  @property({ type: String }) right: RightContent = 'undefined';
  @property({ type: String, reflect: true }) weight: FontWeight = 'regular'
  static override get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
       .right-content {
        padding-left: 16px;
      }
      `
    ]
  }

  renderTitle() {
    const titleMap = {
      'h1': html`<text-web-component as="h1" preset="text1" weight="medium"><slot></slot></text-web-component>`,
      'h2': html`<text-web-component as="h2" preset="text2" weight="bold"><slot></slot></text-web-component>`,
      'h3': html`<text-web-component as="h3" preset="text6" weight="bold"><slot></slot></text-web-component>`
    };

    return titleMap[this.as as keyof typeof titleMap]
  }

  override render() {
    return html`
      <div>
        ${this.renderTitle()}
        ${this.right ? html`<div class="right-content">${this.right}</div>` : ''}
      </div>
    `;
  }
}