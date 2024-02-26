import { html, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';
import './components/asset-accordion'
import styles from './styles';
import { chevronUpRegularSvg } from '../../assets/icons'

type AccordionItem = {
  asset?: {
    path: string;
    type: string;
  };
  title: string;
  subtitle: string;
  content: string;
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
      this.style.setProperty('--accordion-divider', this.theme.componentsColor.divider.value)
    }
  }

  toggleAccordion(index: number) {
    const content = this.shadowRoot?.getElementById(`accordion-content-${index}`);
    const chevron = this.shadowRoot?.getElementById(`chevron-${index}`);

    if (!content || !chevron) return;

    content.style.maxHeight = content.style.maxHeight ? '' : `${content.scrollHeight}px`;
    chevron.classList.toggle('rotate');
  }


  override render() {
    super.render();

    return html`
      <div class="accordion-wrapper">
        ${this.items.map((item, index) =>
          html`
            <div class="accordion-container">
              <div class="accordion-header" @click="${() => this.toggleAccordion(index)}">
                ${item.asset && html`<asset-accordion class="accordion-asset" .asset=${item.asset}></asset-accordion>`}
                <div>
                  <span class="accordion-title">${item.title}</span>
                  <span class="accordion-subtitle">${item.subtitle}</span>
                </div>
                <div class="chevron" id="chevron-${index}">${chevronUpRegularSvg}</div>
              </div>
              <div class="accordion-content" id="accordion-content-${index}">
                <p>${item.content}</p>
              </div>
            </div>
            ${index < this.items.length - 1 ? html`<span class="accordion-divider"></span>` : null}
            `
        )}
      </div>
    `;
  }
}