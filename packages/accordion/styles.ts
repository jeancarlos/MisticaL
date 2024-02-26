import { css } from 'lit';

export default css`
  .accordion-container {
    border: none;
    padding: 1rem;
    background-color: transparent;
    min-width: 375px
  }

  .accordion-container:hover {
    background-color: var(--accordion-background-hover);
  }

  .accordion-container:active {
    background-color: var(--accordion-background-pressed);
  }

  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .chevron {
    display: block;
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease-in-out;
  }

  .chevron.rotate {
    transform: rotate(180deg);
  }

  .accordion-header div {
    display: flex;
    flex-direction: column;
  }

  .accordion-asset {
    margin-right: 1rem;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    margin-top: 1rem;
  }

  .accordion-title {
    font-size: 1rem;
  }

  .accordion-subtitle {
    font-size: 0.8rem;
    color: #666;
  }

  .accordion-divider {
    display: block;
    width: 100%;
    border-top: 1px solid var(--accordion-divider);
  }
`;