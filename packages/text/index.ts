import { html, css, PropertyValueMap, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { textPresets } from './presets';
import { ThemeWebComponent } from '../theme';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'
type FontWeight = 'light' | 'regular' | 'medium' | 'bold'
type Preset = 'text1' | 'text2' | 'text3' | 'text4' | 'text5' | 'text6' | 'text7' | 'text8' | 'text9' | 'text10'


@customElement('text-web-component')
export class TextWebComponent extends ThemeWebComponent {
  static override get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
      :host {
        font-size: var(--text-size-mobile);
        font-weight: var(--text-weight);
        line-height: var(--text-line-height-mobile);
        margin: 0;
        overflow-wrap: anywhere;
        word-break: break-word;
        line-clamp: var(--truncate-lines, 1);
      }

      :host(:not([wordBreak])) {
        overflow-wrap: inherit;
        word-break: inherit;
      }

      :host([truncate='1']) {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }

      :host([truncate]) {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: var(--truncate-lines);
        -webkit-box-orient: vertical;
      }

      @media (min-width: 768px) {
        :host {
          font-size: var(--text-size-desktop);
          line-height: var(--text-line-height-desktop);
        }
      }
    `
    ];

  }

  @property({ type: String }) preset: Preset = 'text1';
  @property({ type: String }) as: Tag = 'span';
  @property({ type: String, reflect: true }) weight: FontWeight = 'regular'
  @property({ type: Number, reflect: true }) truncate: number | null = null;
  @property({ type: Boolean, reflect: true }) wordBreak = true;

  protected override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('_theme') || changedProperties.has('truncate') || changedProperties.has('preset')) {
      this.updateStyles();
    }
    if (changedProperties.has('weight') || changedProperties.has('_theme')) {
      this.setFontWeight();
    }
  }

  private setFontWeight() {
    const validTextTypes = ['text5', 'text6', 'text7', 'text8', 'text9', 'text10'];
    if (validTextTypes.includes(this.preset)) {

      const typeWeight = this.theme?.text?.weight?.[this.preset as keyof typeof this.theme.text.weight]?.value;
      this.weight = typeWeight as FontWeight;
      let fontWeightVarName = `--font-weight-${this.weight}`;
      let fontWeightValue = getComputedStyle(this).getPropertyValue(fontWeightVarName).trim();
      this.style.setProperty('--text-weight', `${fontWeightValue}`);
    }
  }

  private updateStyles() {
    const preset = textPresets[this.preset];
    this.style.setProperty('--text-size-mobile', `${preset.mobileSize}px`);
    this.style.setProperty('--text-size-desktop', `${preset.desktopSize}px`);
    this.style.setProperty('--text-line-height-mobile', preset.mobileLineHeight);
    this.style.setProperty('--text-line-height-desktop', preset.desktopLineHeight);
    this.style.setProperty('--truncate-lines', this.truncate ? String(this.truncate) : this.style.removeProperty('--truncate-lines'));
  }

  override render() {
    const tagRenderers = {
      'h1': html`<h1><slot></slot></h1>`,
      'h2': html`<h2><slot></slot></h2>`,
      'h3': html`<h2><slot></slot></h2>`,
      'p': html`<p><slot></slot></p>`,
      'span': html`<span><slot></slot></span>`,
    };

    return tagRenderers[this.as] || tagRenderers['span'];
  }
}

