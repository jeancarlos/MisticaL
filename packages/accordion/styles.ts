import { css } from 'lit';

export default css`
  .container {
    border: none;
    padding: 1rem;
    background-color: transparent;
    min-width: 375px
  }

  .container:hover {
    background-color: var(--accordion-background-hover);
  }

  .container:active {
    background-color: var(--accordion-background-pressed);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .left-header {
    display: flex;
    align-items: center;
  }

  .details {
    display: flex;
    flex-direction: column;
  }

  .chevron {
    display: block;
    transition: transform 0.3s ease-in-out;
  }

  .chevron.rotate {
    transform: rotate(180deg);
  }

  .asset {
    margin-right: 1rem;
  }

  .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .title {
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.8rem;
    color: #666;
  }

  .divider {
    display: block;
    width: 100%;
    border-top: 1px solid var(--accordion-divider);
  }
`;