import { LitElement, html, css } from 'lit';
import { createContext, provide,  } from '@lit/context';
import { loadJson } from './load-css-tokens';
import DesignSystem from './types/design-system';
import { DesignSystemKeys } from './types/design-system-keys';
import { customElement } from 'lit/decorators.js';

const themeContext = createContext<DesignSystem | undefined>('theme');

@customElement('theme-provider')
class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  theme: DesignSystem | undefined;


  static override styles = css`
    :host {
      display: contents;
    }
  `;

  constructor() {
    super();
    this.loadTheme();
  }

  async loadTheme() {
    this.theme = await loadJson(DesignSystemKeys.Telefonica);
    console.log(this.theme)
  }

  override render() {
    return html`
      <slot>
        <h1>
          ${this.theme}
        </h1>
      </slot>
    `;
  }
}

export { themeContext, ThemeProvider }
