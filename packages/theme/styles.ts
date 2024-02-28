import { css } from 'lit';

export default css`
	@font-face {
		font-family: 'VivoType';
		src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Light.woff2') format('woff2'),
		url('../../tools/theme/fonts/WOFF/VivoTypeW05-Light.woff') format('woff');
		font-weight: 300;
		font-style: normal
	}
	@font-face {
		font-family: 'VivoType';
		src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Regular.woff2') format('woff2'),
		url('../../tools/theme/fonts/WOFF/VivoTypeW05-Regular.woff') format('woff');
		font-weight: 400;
		font-style: normal
	}
	@font-face {
		font-family: 'VivoType';
		src: url('../../tools/theme/fonts/WOFF2/VivoTypeW05-Bold.woff2') format('woff2'),
		url('../../tools/theme/fonts/WOFF/VivoTypeW05-Bold.woff') format('woff');
		font-weight: 700;
		font-style: normal
	}

	:host {
		font-family: 'VivoType', sans-serif;
		--font-weight-light: 300;
		--font-weight-regular: 400;
		--font-weight-bold: 700;
	}

	* {
		box-sizing: border-box;
	}
`