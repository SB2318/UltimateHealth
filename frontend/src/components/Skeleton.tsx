import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, useColorScheme } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton = ({
  width,
  height,
  borderRadius = 4,
  style,
}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDarkMode ? '#333333' : '#E1E9EE',
          opacity,
        },
        style,
      ]}
    />
  );
};
