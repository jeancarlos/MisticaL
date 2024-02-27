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

  @property({ type: Boolean })
  singleOpen: boolean = false;


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
    if (this.singleOpen) {
      this.closeAll(index);
    }

    const content = this.shadowRoot?.getElementById(`content-${index}`);
    const chevron = this.shadowRoot?.getElementById(`chevron-${index}`);

    if (!content || !chevron) return;

    content.style.maxHeight = content.style.maxHeight ? '' : `${content.scrollHeight}px`;
    content.style.marginTop = content.style.marginTop ? '' : '1rem';
    chevron.classList.toggle('rotate');
  }

  closeAll(exceptIndex: number) {
    this.items.forEach((_, index) => {
      if (index !== exceptIndex) {
        const content = this.shadowRoot?.getElementById(`content-${index}`);
        const chevron = this.shadowRoot?.getElementById(`chevron-${index}`);

        if (!content || !chevron) return;

        content.style.maxHeight = '';
        content.style.marginTop = '';
        chevron.classList.remove('rotate');
      }
    });
  }


  override render() {
    super.render();

    return html`
      <div class="wrapper">
        ${this.items.map((item, index) =>
          html`
            <div class="container">
              <div class="header" @click="${() => this.toggleAccordion(index)}">
                <div class="left-header">
                  ${item.asset && html`<asset-accordion class="asset" .asset=${item.asset}></asset-accordion>`}
                  <div class="details">
                    <span class="title">${item.title}</span>
                    <span class="subtitle">${item.subtitle}</span>
                  </div>
                </div>
                <div class="chevron" id="chevron-${index}">${chevronUpRegularSvg}</div>
              </div>
                <div class="content" id="content-${index}">
                  <p>${item.content}</p>
                </div>
            </div>
            ${index < this.items.length - 1 ? html`<span class="divider"></span>` : null}
            `
        )}
      </div>
    `;
  }
}