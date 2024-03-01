import { CSSResultGroup, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Theme, ThemeType } from '../../tools/theme/types/theme';
import { TokenType } from '../../tools/theme/types/token';
import { ThemeService } from '../../tools/theme/services/theme-service';
import styles from './styles'

interface ChangeThemeDTO {
	themeType?: ThemeType;
	tokenType?: TokenType;
}

@customElement('theme-web-component')
export class ThemeWebComponent extends LitElement {
	static override styles: CSSResultGroup = styles

	@property({ type: String, attribute: 'theme-type' })
	themeType: ThemeType = ThemeType.Light;

	@property({ type: String, attribute: 'token-type' })
	tokenType: TokenType = TokenType.VivoNew;

	@state()
	private _theme!: Theme

	private _service!: ThemeService;

	public get theme() {
		return this._theme;
	}

	override connectedCallback() {
		super.connectedCallback();
		const theme = ThemeService.build(this.tokenType, this.themeType);
		this._theme = theme.currentTheme;
		this._service = theme;
		this.requestUpdate();
	}

	changeTheme({ themeType, tokenType }: ChangeThemeDTO) {
		const newTheme = this._service.changeTheme({ themeType, tokenType });
		this._theme = newTheme
		this.requestUpdate();
	}
}