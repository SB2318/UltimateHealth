import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {persistThemeMode, ThemeMode} from '../store/themeSlice';

export function useAppTheme() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: any) => state.theme?.mode ?? 'system');
  const systemColorScheme = useColorScheme() ?? 'light';
  const effectiveTheme = themeMode === 'system' ? systemColorScheme : themeMode;
  const isDarkMode = effectiveTheme === 'dark';

  const setThemeMode = (mode: ThemeMode) => {
    dispatch(persistThemeMode(mode));
  };

  return {
    themeMode,
    effectiveTheme,
    isDarkMode,
    setThemeMode,
  };
}
