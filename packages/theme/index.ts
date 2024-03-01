import { CSSResultGroup, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

	private _theme!: Theme

	private _service!: ThemeService;

	public get theme() {
		return this._theme;
	}

	override updated(changedProperties: PropertyValueMap<any>) {
		super.updated(changedProperties)

		if (changedProperties.has('themeType')) {
			this.changeTheme({ themeType: this.themeType })
		}

		if (changedProperties.has('tokenType')) {
			this.changeTheme({ tokenType: this.tokenType })
		}
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
	}
}