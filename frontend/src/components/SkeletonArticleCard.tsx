import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const SkeletonArticleCard = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.imageSkeleton, animatedStyle]} />

      <View style={styles.contentContainer}>
        <View style={styles.badgeRow}>
          <Animated.View style={[styles.skeletonLine, styles.badgeSkeleton, animatedStyle]} />
          <Animated.View style={[styles.skeletonLine, styles.badgeSkeleton, animatedStyle, { width: 50 }]} />
        </View>

        <Animated.View style={[styles.skeletonLine, styles.titleSkeleton, animatedStyle]} />
        <Animated.View style={[styles.skeletonLine, styles.titleSkeleton, animatedStyle, { width: '60%' }]} />

        <View style={styles.metaRow}>
          <Animated.View style={[styles.skeletonLine, styles.metaSkeleton, animatedStyle]} />
          <Animated.View style={[styles.skeletonLine, styles.metaSkeleton, animatedStyle, { width: 40 }]} />
          <Animated.View style={[styles.skeletonLine, styles.metaSkeleton, animatedStyle, { width: 60 }]} />
        </View>

        <Animated.View style={[styles.skeletonLine, styles.readTimeSkeleton, animatedStyle]} />

        <View style={styles.actionBar}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Animated.View key={i} style={[styles.iconSkeleton, animatedStyle]} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SkeletonArticleCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
  },
  contentContainer: {
    padding: 16,
  },
  skeletonLine: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeSkeleton: {
    width: 80,
    height: 20,
    borderRadius: 10,
  },
  titleSkeleton: {
    width: '100%',
    height: 24,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  metaSkeleton: {
    width: 80,
    height: 14,
  },
  readTimeSkeleton: {
    width: 60,
    height: 14,
    marginBottom: 16,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  iconSkeleton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
});
