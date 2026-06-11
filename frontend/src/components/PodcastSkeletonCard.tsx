import React, {
  useEffect,
  useRef,
} from 'react';

import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

import {
  YStack,
  XStack,
} from 'tamagui';

const AnimatedView =
  Animated.createAnimatedComponent(
    View,
  );

const PodcastSkeletonCard =
  () => {
    const shimmerAnim =
      useRef(
        new Animated.Value(-1),
      ).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(
          shimmerAnim,
          {
            toValue: 1,

            duration: 1200,

            useNativeDriver: true,
          },
        ),
      ).start();
    }, []);

    const translateX =
      shimmerAnim.interpolate({
        inputRange: [-1, 1],

        outputRange: [-300, 300],
      });

    const renderShimmer =
      (
        style: any,
      ) => (
        <View
          style={[
            styles.skeletonBase,
            style,
          ]}>

          <AnimatedView
            style={[
              styles.shimmer,
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        </View>
      );

    return (
      <YStack
        style={
          styles.card
        }>

        {/* Image */}
        {renderShimmer(
          styles.image,
        )}

        <YStack
          padding="$3"
          gap="$2">

          {/* Title */}
          {renderShimmer(
            styles.title,
          )}

          {renderShimmer(
            styles.titleSmall,
          )}

          {/* Subtitle */}
          {renderShimmer(
            styles.subtitle,
          )}

          {/* Tags */}
          <XStack gap="$2">

            {renderShimmer(
              styles.tag,
            )}

            {renderShimmer(
              styles.tag,
            )}
          </XStack>

          {/* Footer */}
          <XStack gap="$2">

            {renderShimmer(
              styles.footer,
            )}

            {renderShimmer(
              styles.footer,
            )}
          </XStack>
        </YStack>
      </YStack>
    );
  };

export default PodcastSkeletonCard;

const styles =
  StyleSheet.create({
    card: {
      width: '100%',

      backgroundColor:
        '#111827',

      borderRadius: 18,

      overflow: 'hidden',

      marginBottom: 16,
    },

    skeletonBase: {
      backgroundColor:
        '#1F2937',

      overflow: 'hidden',
    },

    shimmer: {
      width: '40%',

      height: '100%',

      backgroundColor:
        'rgba(255,255,255,0.15)',

      position: 'absolute',
    },

    image: {
      width: '100%',

      height: 220,
    },

    title: {
      height: 18,

      borderRadius: 8,

      width: '90%',
    },

    titleSmall: {
      height: 18,

      borderRadius: 8,

      width: '70%',
    },

    subtitle: {
      height: 14,

      borderRadius: 8,

      width: '50%',
    },

    tag: {
      height: 28,

      width: 80,

      borderRadius: 999,
    },

    footer: {
      flex: 1,

      height: 14,

      borderRadius: 8,

      marginTop: 10,
    },
  });