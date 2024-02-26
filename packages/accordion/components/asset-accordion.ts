import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';

interface IAssetAccordion {
  path: string;
  type: string;
}
@customElement('asset-accordion')
export class AssetAccordion extends LitElement {
  @property({ type: Object }) asset: IAssetAccordion = { path: '', type: ''};

  static override styles = css`
    img {
      display: block;
    }
    .icon {
      width: 24px;
      height: 24px;
    }
    .circle-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .circle-icon img {
      max-width: 100%;
      max-height: 100%;
    }
    .square-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .wide-image {
      width: 160px;
      height: 90px;
      object-fit: cover;
    }
    .portrait-image {
      width: 70px;
      height: 100px;
      object-fit: cover;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  `;

  override render() {
    switch (this.asset.type) {
      case 'icon':
        return html`<img class="icon" src="${this.asset.path}" />`;
      case 'circle-icon':
        return html`<div class="circle-icon"><img src="${this.asset.path}" /></div>`;
      case 'square-image':
        return html`<img class="square-image" src="${this.asset.path}" />`;
      case 'wide-image':
        return html`<img class="wide-image" src="${this.asset.path}" />`;
      case 'portrait-image':
        return html`<img class="portrait-image" src="${this.asset.path}" />`;
      case 'avatar':
        return html`<img class="avatar" src="${this.asset.path}" />`;
      default:
        return null;
    }
  }
}