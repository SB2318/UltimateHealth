import { en, TranslationKeys } from './en';
import { hi } from './hi';
import { bn } from './bn';
import { ta } from './ta';
import { te } from './te';
import { mr } from './mr';
import { gu } from './gu';
import { kn } from './kn';
import { ml } from './ml';
import { pa } from './pa';
import { or } from './or';
import { as } from './as';
import { ur } from './ur';

export const translations: Record<string, TranslationKeys> = {
  en,
  'en-IN': en,
  hi,
  'hi-IN': hi,
  bn,
  'bn-IN': bn,
  ta,
  'ta-IN': ta,
  te,
  'te-IN': te,
  mr,
  'mr-IN': mr,
  gu,
  'gu-IN': gu,
  kn,
  'kn-IN': kn,
  ml,
  'ml-IN': ml,
  pa,
  'pa-IN': pa,
  or,
  'or-IN': or,
  as,
  'as-IN': as,
  ur,
  'ur-IN': ur,
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', bcp47: 'en-IN', name: 'English', nativeName: 'English' },
  { code: 'hi', bcp47: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', bcp47: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', bcp47: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', bcp47: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', bcp47: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', bcp47: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', bcp47: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', bcp47: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', bcp47: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', bcp47: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', bcp47: 'as-IN', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', bcp47: 'ur-IN', name: 'Urdu', nativeName: 'اردو' },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];
export type { TranslationKeys };
