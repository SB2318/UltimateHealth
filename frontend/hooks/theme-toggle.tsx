import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const color = useThemeColor({}, 'text');

  return (
    <Pressable
      onPress={toggle}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked: theme === 'dark' }}
      accessibilityLabel="Toggle dark mode"
    >
      <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={24} color={color} />
    </Pressable>
  );
}