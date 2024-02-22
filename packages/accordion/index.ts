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

  static override styles = styles;

  override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);

    if(changedProperties.has('_theme') || changedProperties.has('items')) {
      console.log('updated', this.items);
    }
  }

  override render() {
    super.render();

    return html`
      <div>
        ${this.items.map(
          (item) =>
            html`<details>
              <summary>
                <div>
                  <span>${item.title}</span>
                  <span>${item.subtitle}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p>${item.content}</p>
            </details>`
        )}
      </div>
    `;
  }
}