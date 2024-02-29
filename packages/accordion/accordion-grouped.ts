import { PropertyValueMap, css } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';

@customElement('accordion-grouped')
export class AccordionGrouped extends ThemeWebComponent {
	@property({ type: Boolean })
	singleOpen = false;

	static override styles = [ThemeWebComponent.styles, css`
	.wrapper {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		background-color: transparent;
		overflow: hidden;
	}
	`];

	override async connectedCallback() {
		super.connectedCallback();
		this.addEventListener('accordion-open', this._handleAccordionOpen);
	}

	override disconnectedCallback() {
		this.removeEventListener('accordion-open', this._handleAccordionOpen);
		super.disconnectedCallback();
	}

	override updated(changedProperties: PropertyValueMap<any>) {
		super.updated(changedProperties);

		if(changedProperties.has('_theme')) {
		  this._loadCssTokens()
		}
	}

	override render() {
		super.render();
		return html`
			<div class="wrapper">
				<slot></slot>
			</div>
		`;
	}

	private _loadCssTokens() {
		if(this.theme){
			this.style.setProperty('--border', this.theme.componentsColor.border.value)
			this.style.setProperty('--border-radius', `${this.theme.radius.container.value}px`)
		}
	}

	private _handleAccordionOpen(event: Event) {
		if (this.singleOpen) {
			for (const child of this.children) {
				if (child !== event.target && (child as any).open) {
					(child as any).open = false;
					(child as any)._updateContentAndChevron();
				}
			}
		}
	}
}