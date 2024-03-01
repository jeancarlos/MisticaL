import { PropertyValueMap, css, html } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { textPresets } from './presets';
import { ThemeWebComponent } from '../theme';
import { FontWeight, Preset, Tag } from "./types";

@customElement('text-web-component')
export class TextWebComponent extends ThemeWebComponent {

  @property({ type: String }) preset: Preset = Preset.Text1;
  @property({ type: String }) as: Tag = Tag.Span;
  @property({ type: String, reflect: true }) weight: FontWeight = FontWeight.Regular;
  @property({ type: Number, reflect: true }) truncate: number | null = null;
  @property({ type: Boolean, reflect: true }) wordBreak = true;

  static override styles = [ThemeWebComponent.styles,
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

      :host([truncate]) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: var(--truncate-lines);
      }

      @media (min-width: 768px) {
        :host {
          font-size: var(--text-size-desktop);
          line-height: var(--text-line-height-desktop);
        }
      }
    `];

  protected override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);
    if (this.theme) {
      if (changedProperties.has('_theme')) {
        this.updateStyles();
        this.setFontWeight();
      }
    }
  }

  private setFontWeight() {
    const validTextTypes = ['text5', 'text6', 'text7', 'text8', 'text9', 'text10'];
    let fontWeight = validTextTypes.includes(this.preset) && this.theme?.text?.weight?.[this.preset as keyof typeof this.theme.text.weight]?.value
      ? this.theme.text.weight[this.preset as keyof typeof this.theme.text.weight].value
      : this.weight;
    this.style.setProperty('--text-weight', fontWeight);
  }

  private updateStyles() {
    const preset = textPresets[this.preset];
    this.style.setProperty('--text-size-mobile', `${preset.mobileSize}px`);
    this.style.setProperty('--text-size-desktop', `${preset.desktopSize}px`);
    this.style.setProperty('--text-line-height-mobile', preset.mobileLineHeight);
    this.style.setProperty('--text-line-height-desktop', preset.desktopLineHeight);
    const truncateValue = this.truncate !== null ? String(this.truncate) : '';
    this.style.setProperty('--truncate-lines', truncateValue);
  }

  override render() {
    super.render();
    const tagRenderers = {
      'h1': html`<h1><slot></slot></h1>`,
      'h2': html`<h2><slot></slot></h2>`,
      'h3': html`<h3><slot></slot></h3>`,
      'p': html`<p><slot></slot></p>`,
      'span': html`<span><slot></slot></span>`,
    };
    return tagRenderers[this.as] || tagRenderers['span'];
  }
}

