// accordion-web-component-styles.js
import { css } from 'lit';

export default css`
  div {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  details {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: .5em;
    margin-bottom: .5em;
  }
  summary {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding: .5em;
    cursor: pointer;
    position: relative;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary div {
    display: flex;
    flex-direction: column;
  }
  summary div span {
    display: block;
  }
  summary svg {
    width: 1em;
    height: 1em;
    transition: transform 0.3s ease-in-out;
  }
  details[open] summary svg {
    transform: rotate(180deg);
  }
  p {
    margin: .5em;
  }
`;