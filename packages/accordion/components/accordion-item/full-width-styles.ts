import { css } from 'lit';

export default css`
  .container {
    min-height: 56px;
    border: none;
    padding: 1rem;
    background-color: transparent;
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
    align-items: flex-start;
    justify-content: center;
  }

  .details {
    display: flex;
    flex-direction: column;
    line-height: 24px;
  }

  .title {
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #666;
  }

  .chevron {
    display: block;
    transition: transform 0.3s ease-in-out;
    scale: 0.7;
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

    slot {
      margin-top: 1rem;
    }
  }

  .divider {
    display: block;
    width: 100%;
    border-top: 1px solid var(--accordion-divider);
  }
`;