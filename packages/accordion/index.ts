import { html, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';
import styles from './styles';

type AccordionItem = {
  asset?: string;
  title: string;
  subtitle: string;
  content: string;
  key: string;
};

@customElement('accordion-web-component')
export class AccordionWebComponent extends ThemeWebComponent {
  @property({ type: Array })
  items: AccordionItem[] = [];

  static override styles = [ThemeWebComponent.styles, styles];

  override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);

    if(changedProperties.has('_theme') || changedProperties.has('items')) {
      this.loadCssTokens()
    }
  }

  private loadCssTokens = () => {
    if(this.theme) {
      this.style.setProperty('--accordion-background-hover', this.theme.componentsColor.backgroundContainerHover.value)
      this.style.setProperty('--accordion-background-pressed', this.theme.componentsColor.backgroundContainerPressed.value)
    }
  }

  toggleAccordion(index: number) {
    const content = this.shadowRoot?.getElementById(`accordion-content-${index}`);
    if (content) {
      if (content.style.maxHeight) {
        content.style.maxHeight = '';
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    }
  }

  override render() {
    super.render();

    return html`
      ${this.items.map((item, index) =>
        html`
          <div class="accordion-container">
            <div class="accordion-header" @click="${() => this.toggleAccordion(index)}">
              <div>
                <span class="accordion-title">${item.title}</span>
                <span class="accordion-subtitle">${item.subtitle}</span>
              </div>
            </div>
            <div class="accordion-content" id="accordion-content-${index}">
              <p>${item.content}</p>
            </div>
          </div>
        `
      )}
    `;
  }
}