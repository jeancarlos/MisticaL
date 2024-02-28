import { PropertyValueMap, html } from 'lit';
import { ThemeWebComponent } from '../../../theme';
import { chevronUpRegularSvg } from '../../../../assets/icons'
import { customElement, property } from 'lit/decorators.js';
import fullWidthStyles from './full-width-styles';
import '../accordion-asset'

@customElement('accordion-item-wc')
export class AccordionItemWC extends ThemeWebComponent {
  @property({ type: Object })
  asset?: {
    path: string;
    type: string;
  }

  @property({ type: String })
  header = '';

  @property({ type: String })
  subtitle? = '';

  @property({ type: String })
  content = '';

  @property({ type: Boolean })
  open = false;

  @property({ type: Boolean })
  hasSlot? = false;

  @property({ type: Boolean})
  boxed? = false;

  static override styles = [ThemeWebComponent.styles, fullWidthStyles];

  override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);

    if(changedProperties.has('_theme') || changedProperties.has('props')) {
      this._loadCssTokens()
    }

	if(changedProperties.has('boxed')) {
		const content = this.shadowRoot?.querySelector('.container') as HTMLElement;
		content.classList.toggle('boxed', this.boxed);
	}
  }

  override render() {
    super.render();
    return html`
    	<div class="container">
        	<div class="header" @click="${this._toggleAccordion}">
          		<div class="left-header">
            		${this.asset && html`<accordion-asset class="asset" .asset=${this.asset}></accordion-asset>`}
            		<div class="details">
              			<span class="title">${this.header}</span>
              			<span class="subtitle">${this.subtitle}</span>
            		</div>
          		</div>
        	<div class="chevron">${chevronUpRegularSvg}</div>
        </div>
        <div class="content">
        	<p>${this.content}</p>
        	${this.hasSlot ? html`<slot></slot>` : ''}
        </div>
		<div class="divider"></div>
	</div>
    `;
  }

  private _loadCssTokens = () => {
    if(this.theme) {
      this.style.setProperty('--accordion-background', this.theme.componentsColor.backgroundContainer.value)
      this.style.setProperty('--accordion-background-hover', this.theme.componentsColor.backgroundContainerHover.value)
      this.style.setProperty('--accordion-background-pressed', this.theme.componentsColor.backgroundContainerPressed.value)
      this.style.setProperty('--accordion-divider', this.theme.componentsColor.divider.value)
	  this.style.setProperty('--accordion-border', this.theme.componentsColor.border.value)
	  this.style.setProperty('--accordion-border-radius', `${this.theme.radius.container.value}px`)
    }
  }

  private _toggleAccordion() {
    this.open = !this.open;
    this._updateContentAndChevron();
    if (this.open) {
      this.dispatchEvent(new CustomEvent('accordion-open', { bubbles: true, composed: true }));
    }
  }

  private _updateContentAndChevron() {
    const content = this.shadowRoot?.querySelector('.content') as HTMLElement;
    const chevron = this.shadowRoot?.querySelector('.chevron') as HTMLElement;

    if (!content || !chevron) return;

    content.style.maxHeight = this.open ? `${content.scrollHeight}px` : '';
    content.style.marginTop = this.open ? '1rem' : '';
    chevron.classList.toggle('rotate', this.open);
  }
}