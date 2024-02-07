import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { DesignSystemKeys } from '../../tools/theme/types/design-system-keys';
import { Theme } from '../../tools/theme/theme';

@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
  @state()
  private theme!: Theme;

  public get currentTheme() {
    return this.theme;
  }

  constructor() {
    super();
    Theme.build().then(theme => {
      this.theme = theme;
      this.requestUpdate();
    });
  }

  async changeTheme(newTheme: DesignSystemKeys) {
    this.theme = await Theme.build(newTheme);
    console.log(this.theme)
    this.requestUpdate();
  }

  static override styles = css`
  `;

  override render() {
    return html`
      <style>
      </style>
      <slot></slot>
    `;
  }
}