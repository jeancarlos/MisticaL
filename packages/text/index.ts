import { CSSResultGroup, PropertyValueMap, css, html } from "lit";
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

  @property({ type: String }) fontSize: string | null = null;
  @property({ type: String }) customLineHeight: string | null = null;

  private weightSet = false;

  static override get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
      h1, h2, h3, p, span {
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
      h1 {
        text-transform: uppercase;
      }

      @media (min-width: 768px) {
        h1, h2, h3, p, span  {
          font-size: var(--text-size-desktop);
          line-height: var(--text-line-height-desktop);
        }
      }
    `
    ];

  }

  protected override updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);
    if (this.theme) {
      if (changedProperties.has('_theme')) {
        this.updateStyles();
        this.setFontWeight();
      }
    }
    if (changedProperties.has('as')) {
      this.updateStyles();
      this.setFontWeight();
    }
    if (changedProperties.has('weight')) {
      this.weightSet = true;
      this.setFontWeight();
    }
  }

  private setFontWeight() {
    const validTextTypes = ['text5', 'text6', 'text7', 'text8', 'text9', 'text10'];
    this.style.setProperty('--text-weight', this.weight);
    if (!this.weightSet && validTextTypes.includes(this.preset) && this.theme?.text?.weight?.[this.preset as keyof typeof this.theme.text.weight]?.value) {

      this.style.setProperty('--text-weight', this.theme.text.weight[this.preset as keyof typeof this.theme.text.weight].value);
    }
  }

  private updateStyles() {
    const preset = textPresets[this.preset];
    let fontSizeMobile = `${preset.mobileSize}px`;
    let fontSizeDesktop = `${preset.desktopSize}px`;
    if (this.fontSize) {
      const [customMobileSize, customDesktopSize] = this.fontSize.split(',');
      fontSizeMobile = customMobileSize || fontSizeMobile;
      fontSizeDesktop = customDesktopSize || fontSizeDesktop;
    }

    this.style.setProperty('--text-size-mobile', fontSizeMobile);
    this.style.setProperty('--text-size-desktop', fontSizeDesktop);
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

