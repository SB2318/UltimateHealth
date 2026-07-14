import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Animated,
  useColorScheme,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {PRIMARY_COLOR} from '../helper/Theme';
import {hp, wp, fp} from '../helper/Metric';

// Icon map per tab label
const TAB_CONFIG: Record<
  string,
  {active: string; inactive: string; label: string}
> = {
  Home: {active: 'home', inactive: 'home-outline', label: 'Home'},
  Podcasts: {active: 'headphones', inactive: 'headphones', label: 'Podcasts'},
  Chatbot: {active: 'robot', inactive: 'robot-outline', label: 'AI'},
  Academy: {active: 'school', inactive: 'school-outline', label: 'Academy'},
  Settings: {active: 'cog', inactive: 'cog-outline', label: 'Settings'},
};

interface AnimatedTabItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  isDark: boolean;
}

const AnimatedTabItem = ({label, isFocused, onPress, isDark}: AnimatedTabItemProps) => {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const [pillWidthAnim] = useState(() => new Animated.Value(isFocused ? 1 : 0));

  useEffect(() => {
    Animated.spring(pillWidthAnim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [isFocused]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
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

  const iconName = isFocused ? config.active : config.inactive;
  const activeColor = PRIMARY_COLOR;
  const inactiveColor = isDark ? '#6b7280' : '#9ca3af';

  const pillBg = pillWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,191,255,0)', 'rgba(0,191,255,0.12)'],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`${config.label} tab`}
      accessibilityState={{selected: isFocused}}
      style={styles.tabItem}>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <Animated.View
          style={[
            styles.iconPill,
            {backgroundColor: pillBg as any},
          ]}>
          <MaterialCommunityIcons
            name={iconName as any}
            size={24}
            color={isFocused ? activeColor : inactiveColor}
          />
          {isFocused && <View style={styles.activeDot} />}
        </Animated.View>
        <Text
          style={[
            styles.tabLabel,
            {color: isFocused ? activeColor : inactiveColor},
            isFocused && styles.tabLabelActive,
          ]}
          numberOfLines={1}>
          {config.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const TabBar = ({state, descriptors, navigation}: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const hideTabBarScreens = ['Chatbot'];
  const currentRouteName = state.routes[state.index]?.name;
  if (hideTabBarScreens.includes(currentRouteName)) return null;

  const bgColor = isDark ? '#1a1a2e' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderTopColor: borderColor,
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

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <AnimatedTabItem
            key={index}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            isDark={isDark}
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
    paddingBottom: hp(4),
    paddingTop: hp(1),
    paddingHorizontal: wp(2),
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    width: wp(12),
    height: wp(12),
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PRIMARY_COLOR,
  },
  tabLabel: {
    fontSize: fp(2.8),
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});

export default TabBar;