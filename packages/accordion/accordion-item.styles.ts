import { css } from 'lit';

export default css`
	:host {
		grid-column: span 12;
		border: none;
		background-color: transparent;
		width: 100%;
		min-width: 375px;
		min-height: 56px;
	}

    /* @media (min-width: 768px) {
        :host {
            grid-column: span 8;
        }
    } */

	:host(.boxed) {
		margin-bottom: 1rem;
		border: 1px solid var(--accordion-border);
		border-radius: var(--accordion-border-radius);
		background-color: var(--accordion-background);

		.content-container {
			.divider {
				display: none;
			}
		}

	}

	section:hover {
		background-color: var(--accordion-background-hover);
	}

	section:active {
		background-color: var(--accordion-background-pressed);
	}

	section {
		display: flex;
		width: 100%;
		padding: 1rem;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;

		.left-section {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;

			.asset {
				margin-right: 1rem;
			}

			.details {
				display: flex;
				flex-direction: column;
				line-height: 24px;

				.title {
					font-size: 1rem;
				}

				.subtitle {
					font-size: 0.9rem;
					color: #666;
				}
			}
		}

		.chevron {
			display: block;
			transition: transform 0.3s ease-in-out;
			scale: 0.7;
  		}

		.chevron.rotate {
    		transform: rotate(180deg);
  		}
	}

	.content-container {
		margin: 0rem 1rem;

		.content {
			text-align: left;
			height: 0;
			overflow: hidden;
			margin: 0rem 0rem;
			transition: all 0.3s ease-in-out;
			line-height: 24px;
		}

		.divider {
			display: block;
			width: 100%;
			border-top: 1px solid var(--accordion-divider);
		}

		slot {
			display: block;
			margin-top: 1rem;
		}
	}
`;