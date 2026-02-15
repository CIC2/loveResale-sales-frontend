import { Language } from './language.constants';

export class AppConstants {
  static readonly DEFAULT_LANG = Language.ENGLISH;
  static readonly KEY = 'vso_customer_';
  static readonly LANG_KEY = this.KEY + 'lang';
}
