import { useTheme } from '@/hooks/theme-context';

export function useColorScheme(): 'light' | 'dark' {
  return useTheme().theme;
}