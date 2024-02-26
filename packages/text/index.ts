import { html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeWebComponent } from '../theme';

@customElement('text-web-component')
export class TextWebComponent extends ThemeWebComponent {
  static override styles = css`
    :host {
      display: inline-block;
    }
    .text {
      color: var(--text-color, red);
      text-decoration: var(--text-decoration, none);
      text-transform: var(--text-transform, none);
      overflow: hidden;
      text-overflow: var(--text-truncate, initial);
      font-size: var(--text-size, 14px);
      font-weight: var(--text-weight, 400)
    }
  `;

  @property({ type: String }) decoration = 'none';
  @property({ type: String }) transform = 'none';
  @property({ type: String }) truncate = 'initial';
  @property({ type: Boolean }) forceMobileSizes = false;
  @property({ type: String }) textShadow?: string;
  @property({ type: Object }) dataAttributes?: Record<string, string>;
  @property({ type: String }) textType?: 'text1' | 'text2' | 'text3' | 'text4' | 'text5' | 'text6' | 'text7' | 'text8' | 'text9' | 'text10';
  @property({ type: Boolean, reflect: true }) medium = false;
  @property({ type: Boolean, reflect: true }) regular = false;
  @property({ type: Boolean, reflect: true }) light = false;
  @property({ type: Boolean, reflect: true }) bold = false;


  protected override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has("_theme")) {
      this.updateStyles();
    }
    console.log(this, 'this')
    this.updateFontWeight();
  }

  private updateStyles() {
    const sizes = {
      text1: { size: '12px', lineHeight: '16px' },
      text2: { size: '14px', lineHeight: '20px' },
      text3: { size: '16px', lineHeight: '24px' },
      text4: { size: '18px', lineHeight: '24px' },
      text5: { size: '20px', lineHeight: '24px' },
      text6: { size: '24px', lineHeight: '32px' },
      text7: { size: '28px', lineHeight: '32px' },
      text8: { size: '32px', lineHeight: '40px' },
      text9: { size: '40px', lineHeight: '48px' },
      text10: { size: '48px', lineHeight: '56px' },
    };
    const type = this.textType && sizes[this.textType] ? this.textType : 'text2';
    const { size, lineHeight } = sizes[type];
    this.style.setProperty('--text-size', size);
    this.style.setProperty('--text-line-height', lineHeight);
    if (this.theme) {
      this.style.setProperty('--text-color', this.theme.componentsColor.textPrimary.value);
    }
  }

  private updateFontWeight() {
    const mapToWeight = {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
    };

    const defaultWeight = '400';
    let weight;

    if (this.light || this.medium || this.regular || this.bold) {
      weight = this.light ? mapToWeight.light :
        this.medium ? mapToWeight.medium :
          this.bold ? mapToWeight.bold :
            mapToWeight.regular;
    } else {

      const validTextTypes = ['text5', 'text6', 'text7', 'text8', 'text9', 'text10'];

      if (this.textType && validTextTypes.includes(this.textType)) {
        const typeWeight = this.theme?.text?.weight?.[this.textType as keyof typeof this.theme.text.weight].value;
        weight = typeWeight ? typeWeight : defaultWeight;
      } else {
        weight = defaultWeight;
      }
    }

    this.style.setProperty('--text-weight', weight);
  }
  override render() {
    const classes: { [key: string]: boolean } = {
      'text-mobile-sizes': this.forceMobileSizes,
    };

    const styles: { [key: string]: string | undefined } = {
      'text-shadow': this.textShadow,
    };

    return html`
      <span
        class="text ${Object.keys(classes).filter(key => classes[key]).join(' ')}"
        style="${Object.keys(styles).map(key => `${key}: ${styles[key]};`).join(' ')}"
        id="${this.id}"
        ?data-attributes="${!!this.dataAttributes}"
      >
        <slot></slot>
      </span>
    `;
  }
}