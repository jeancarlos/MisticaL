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
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		background-color: var(--background-container);
	}

	:host(.boxed) section {
		border-radius: var(--border-radius);
	}

	:host(.boxed) .divider {
		display: none;
	}

	:host(.boxed.inverse) {
		background-color: var(--background-container-brand-over);
		border: none;
	}

	:host(.inverse) section:hover {
    	background-color: var(--background-container-brand-hover);
	}

	:host(.inverse) section:active {
    	background-color: var(--background-container-brand-pressed);
	}

	:host(.inverse) .divider {
		border-top: 1px solid var(--divider-inverse);
	}

	:host(.inverse) .title {
		color: var(--text-primary-inverse);
	}

	:host(.inverse) .text {
		color: var(--text-secondary-inverse);
	}

	:host(.inverse) .chevron svg {
		filter: invert(1);
	}

	section:hover {
		background-color: var(--background-container-hover);
	}

	section:active {
		background-color: var(--background-container-pressed);
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
			}
		}
	}

	.chevron {
		display: block;
		transition: transform 0.3s ease-in-out;
		scale: 0.7;
	}

	.chevron.rotate {
		transform: rotate(-180deg);
	}

	.title {
		color: var(--text-primary)
	}

	.text {
		color: var(--text-secondary)
	}

	.content-container {
		margin: 0rem 1rem;

		.content {
			text-align: left;
			height: 0;
			overflow: hidden;
			margin: 0rem 0rem;
			transition: all 0.3s ease-in-out;
		}

		.divider {
			display: block;
			width: 100%;
			border-top: 1px solid var(--divider);
		}

		slot {
			display: block;
			margin-top: 1rem;
		}
	}
`;