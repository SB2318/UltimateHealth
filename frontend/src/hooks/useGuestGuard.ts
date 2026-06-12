// frontend/src/hooks/useGuestGuard.ts

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../type';

/**
 * Central hook for guest access control.
 * Use this when you need to gate individual actions (button presses) inside a screen.
 * For blocking an entire screen, just read isGuest directly from useSelector instead.
 *
 * Usage:
 *   const { guardAction } = useGuestGuard();
 *   <TouchableOpacity onPress={() => guardAction(() => doThing(), 'Title', 'Description')} />
 */
export function useGuestGuard() {
  const isGuest = useSelector((state: any) => state.user.isGuest);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const guardAction = useCallback(
    (
      action: () => void,
      title = 'Sign In Required',
      description = 'Please sign in or sign up to access this feature.',
      iconName?: string,
    ) => {
      if (isGuest) {
        navigation.navigate('GuestPlaceholderScreen', { title, description, iconName });
        return false;
      }
      action();
      return true;
    },
    [isGuest, navigation],
  );

  return { isGuest, guardAction };
}