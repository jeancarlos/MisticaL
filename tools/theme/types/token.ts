import { ComponentsColor } from './colors';
import { Radius } from './radius';
import { Text } from './text';
import Palette from './palette';

export enum TokenType {
  Blau = 'blau',
  MovistarLegacy = 'movistar-legacy',
  Movistar = 'movistar',
  O2 = 'o2',
  Telefonica = 'telefonica',
  VivoNew = 'vivo-new',
  Vivo = 'vivo',
}

export default interface Token {
  [key: string]: any;
  light: ComponentsColor;
  dark: ComponentsColor;
  radius: Radius;
  text: Text;
  global: { palette: Palette };
}
