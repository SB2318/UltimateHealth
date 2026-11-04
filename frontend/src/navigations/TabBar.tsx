/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect, useState, useContext} from 'react';
import {BottomTabBarHeightCallbackContext} from '@react-navigation/bottom-tabs';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Animated,
  useColorScheme,
  Platform,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {PRIMARY_COLOR, BUTTON_COLOR} from '../lib/ui/Theme';
import {useTranslation} from '../localization';

// Icon map per tab label
const TAB_CONFIG: Record<
  string,
  {active: string; inactive: string; label: string}
> = {
  Home: {active: 'home', inactive: 'home-outline', label: 'Home'},
  Podcasts: {active: 'headphones', inactive: 'headphones', label: 'Podcasts'},
  Chatbot: {active: 'robot', inactive: 'robot-outline', label: 'AI'},
  Wellness: {active: 'heart-pulse', inactive: 'heart-pulse', label: 'Wellness'},
  Settings: {active: 'cog', inactive: 'cog-outline', label: 'Settings'},
  Notifications: {active: 'bell', inactive: 'bell-outline', label: 'Notifications'},
};

interface AnimatedTabItemProps {
  label: string;
  displayLabel?: string;
  isFocused: boolean;
  onPress: () => void;
  isDark: boolean;
  badge?: string | number;
}

const AnimatedTabItem = ({
  label,
  displayLabel,
  isFocused,
  onPress,
  isDark,
  badge,
}: AnimatedTabItemProps) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const config = TAB_CONFIG[label] ?? {
    active: 'circle',
    inactive: 'circle-outline',
    label: label,
  };
  const title = displayLabel || config.label;

  const iconName = isFocused ? config.active : config.inactive;
  const activeColor = isDark ? '#38BDF8' : BUTTON_COLOR;
  const inactiveColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${title} tab`}
      accessibilityState={{selected: isFocused}}
      style={styles.tabItem}>
      <Animated.View style={[styles.tabItemInner, {transform: [{scale: scaleAnim}]}]}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name={iconName as any}
            size={24}
            color={isFocused ? activeColor : inactiveColor}
          />
          {badge !== undefined && badge !== null && badge !== 0 && badge !== '0' ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {typeof badge === 'number' && badge > 99 ? '99+' : badge}
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={[
            styles.tabLabel,
            {
              color: isFocused ? activeColor : inactiveColor,
              fontWeight: isFocused ? '700' : '500',
            },
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const TAB_KEY_MAP: Record<string, string> = {
  Home: 'tabs.home',
  Podcasts: 'tabs.podcasts',
  Chatbot: 'tabs.chatbot',
  Wellness: 'tabs.wellness',
  Settings: 'tabs.settings',
  Notifications: 'tabs.notifications',
};

const useSafeInsets = () => {
  try {
    return useSafeAreaInsets();
  } catch {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
};

const TabBar = ({state, descriptors, navigation}: any) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const isDark = colorScheme === 'dark';
  const insets = useSafeInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  // Report real (custom) tab bar height so screens can use useBottomTabBarHeight
  const reportTabBarHeight = useContext(BottomTabBarHeightCallbackContext);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Keep AI inside tab navigation: only hide while typing (tabBarHideOnKeyboard)
  const focusedRoute = state.routes[state.index];
  const focusedOptions = focusedRoute ? descriptors[focusedRoute.key]?.options : undefined;
  if (keyboardVisible && focusedOptions?.tabBarHideOnKeyboard) return null;

  const bgColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 4 : (Platform.OS === 'web' ? 8 : 12);

  return (
    <View
      onLayout={e => reportTabBarHeight?.(e.nativeEvent.layout.height)}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderTopColor: borderColor,
          paddingBottom: bottomPadding,
        },
      ]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const badge = options.tabBarBadge;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const displayLabel = TAB_KEY_MAP[label] ? t(TAB_KEY_MAP[label]) : label;
        return (
          <AnimatedTabItem
            key={index}
            label={label}
            displayLabel={displayLabel}
            isFocused={isFocused}
            onPress={onPress}
            isDark={isDark}
            badge={badge}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 14,
      },
      web: {
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 1,
  },
});

export default TabBar;
