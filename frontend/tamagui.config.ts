import { createTamagui, createTokens, TamaguiConfig } from 'tamagui';
import { createAnimations } from '@tamagui/animations-react-native'


const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    stiffness: 100,
  },
  fast: {
    type: 'timing',
    duration: 150,
  },
  slow: {
    type: 'timing',
    duration: 600,
  },
});


const tokens = createTokens({
  color: {
    white: '#FFFFFF',
    black: '#000000',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surface2: '#F1F5F9',
    surface3: '#E2E8F0',
    text: '#0F172A',
    textSoft: '#475569',
    border: '#CBD5E1',
    primary: '#0B69FF',
    primaryHover: '#2563EB',
    secondary: '#7C3AED',
    accent: '#14B8A6',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',
  },

  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 56,
    11: 64,
    12: 72,
    13: 80,
    true: 16, // Optional but unconventional
  },

  size: {
    0: 0,
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
    9: 72,
    10: 80,
    11: 88,
    12: 96,
    true: 16, // Same here
    full: '100%',
  },

  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    round: 9999,
  },

  zIndex: {
    0: 0,
    1: 1,
    10: 10,
    20: 20,
    100: 100,
  },
})

const shorthands = {
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  bg: 'backgroundColor',
  fs: 'fontSize',
  jc: 'justifyContent',
  ai: 'alignItems',
  fd: 'flexDirection',
  w: 'width',
  h: 'height',
  br: 'borderRadius',
}

const config:TamaguiConfig = createTamagui({
  defaultTheme: 'light',
  animations,
  shorthands,
  tokens,
  themes: {
    light: {
      background: tokens.color.background,
      surface: tokens.color.surface,
      surface2: tokens.color.surface2,
      text: tokens.color.text,
      muted: tokens.color.textSoft,
      border: tokens.color.border,
      primary: tokens.color.primary,
      primaryHover: tokens.color.primaryHover,
      success: tokens.color.success,
      error: tokens.color.error,
      warning: tokens.color.warning,
      info: tokens.color.info,
    },
    dark: {
      background: tokens.color.gray900,
      surface: '#0F172A',
      surface2: '#111827',
      text: tokens.color.white,
      muted: tokens.color.gray400,
      border: '#334155',
      primary: '#60A5FA',
      primaryHover: tokens.color.info,
      success: tokens.color.success,
      error: tokens.color.error,
      warning: tokens.color.warning,
      info: tokens.color.info,
    },
  },
  fonts: {
    heading: {
      family: 'Inter',
      size: {
        1: 24,
        2: 28,
        3: 32,
        4: 40,
        5: 48,
      },
      lineHeight: {
        1: 28,
        2: 32,
        3: 36,
        4: 44,
        5: 52,
      },
      weight: {
        4: '400',
        6: '600',
        7: '700',
      },
      letterSpacing: {
        1: 0,
      },
    },
    body: {
      family: 'System',
      size: {
        1: 16,
        2: 18,
        3: 20,
      },
      lineHeight: {
        1: 22,
        2: 26,
        3: 30,
      },
      weight: {
        4: '400',
        6: '600',
      },
      letterSpacing: {
        1: 0,
      },
    },
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
  },
})

export type TamaguiCnfig = typeof config

export default  config;
