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

  .accordion-header div {
    display: flex;
    flex-direction: column;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
  }

  .accordion-content.open {
    max-height: 500px; /* adjust this value as needed */
  }

  .accordion-title {
    font-size: 1rem;
  }
`;