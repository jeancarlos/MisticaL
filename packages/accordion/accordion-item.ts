import { PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';
import './accordion-asset'
import '../text/'

import { chevronDownRegularSvg } from '../../assets/icons';
import styles from './accordion-item.styles';

@customElement('accordion-item')
export class AccordionItem extends ThemeWebComponent {
	@property({ type: Object }) asset?: { path: string; type: string; }
	@property({ type: String }) header = '';
	@property({ type: String }) description? = '';
	@property({ type: String }) content = '';
	@property({ type: Boolean }) open = false;
	@property({ type: Boolean }) hasSlot? = false;
	@property({ type: Boolean}) boxed? = false;
	@property({ type: Boolean }) inverse? = false;

	static override styles = [ThemeWebComponent.styles, styles];

	override updated(changedProperties: PropertyValueMap<any>) {
		super.updated(changedProperties);

	if(changedProperties.has('_theme') || changedProperties.has('props')) {
		this._loadCssTokens()
	}

	if(changedProperties.has('boxed')) {
		this.classList.toggle('boxed', this.boxed)
	}

	if(changedProperties.has('inverse')) {
		this.classList.toggle('inverse', this.inverse)
	}
	}

	override render() {
		super.render();
		return html`
			<section @click="${this._toggleAccordion}">
				<div class="left-section">
					${this.asset && html`<accordion-asset class="asset" .asset=${this.asset}></accordion-asset>`}
					<div class="details">
						<text-web-component
							class="title"
							preset="text3"
							theme-type=${this.themeType}
							token-type=${this.tokenType}
						>
							${this.header}
						</text-web-component>
						<text-web-component
							class="text"
							preset="text2"
							theme-type=${this.themeType}
							token-type=${this.tokenType}
						>
							${this.description}
						</text-web-component>
					</div>
				</div>
				<span class="chevron">${chevronDownRegularSvg}</span>
			</section>
			<div class="content-container">
				<div class="content">
					<text-web-component
						as="p"
						class="text"
						preset="text3"
						theme-type=${this.themeType}
						token-type=${this.tokenType}
					>
						${this.content}
					</text-web-component>
					${this.hasSlot ? html`<slot></slot>` : ''}
				</div>
				<div class="divider"></div>
			</div>
		`;
	}

	private _loadCssTokens = () => {
		if(this.theme) {
			this.style.setProperty('--background-container', this.theme.componentsColor.backgroundContainer.value)
			this.style.setProperty('--background-container-hover', this.theme.componentsColor.backgroundContainerHover.value)
			this.style.setProperty('--background-container-pressed', this.theme.componentsColor.backgroundContainerPressed.value)

			this.style.setProperty('--background-container-brand', this.theme.componentsColor.backgroundContainerBrand.value)
			this.style.setProperty('--background-container-brand-hover', this.theme.componentsColor.backgroundContainerBrandHover.value)
			this.style.setProperty('--background-container-brand-pressed', this.theme.componentsColor.backgroundContainerBrandPressed.value)
			this.style.setProperty('--background-container-brand-over', this.theme.componentsColor.backgroundContainerBrandOverInverse.value)

			this.style.setProperty('--divider', this.theme.componentsColor.divider.value)
			this.style.setProperty('--divider-inverse', this.theme.componentsColor.dividerInverse.value)
			this.style.setProperty('--border', this.theme.componentsColor.border.value)
			this.style.setProperty('--border-radius', `${this.theme.radius.container.value}px`)
			this.style.setProperty('--neutral-high', this.theme.componentsColor.neutralHigh.value)
			this.style.setProperty('--neutral-medium', this.theme.componentsColor.neutralMedium.value)

			this.style.setProperty('--text-primary', this.theme.componentsColor.textPrimary.value)
			this.style.setProperty('--text-secondary', this.theme.componentsColor.textSecondary.value)
			this.style.setProperty('--text-primary-inverse', this.theme.componentsColor.textPrimaryInverse.value)
			this.style.setProperty('--text-secondary-inverse', this.theme.componentsColor.textSecondaryInverse.value)
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

		chevron.classList.toggle('rotate', this.open);
		content.style.margin = this.open ? '0rem 0rem 1rem 0rem' : '0rem 0rem';
		content.style.height = this.open ? `${content.scrollHeight}px` : '';
	}
}