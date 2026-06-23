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
import { ProfessionalColors, BorderRadius } from '../styles/GlassStyles';
import { PODCAST_CARD } from '../constants/podcastCard';

const SkeletonPodcastCard = () => {
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
    <View style={styles.cardWrapper}>
      <View style={styles.cardContainer}>
        {/* Image Container */}
        <Animated.View style={[styles.imageSkeleton, animatedStyle]}>
          <View style={styles.playButtonSkeleton} />
        </Animated.View>

        <View style={styles.contentContainer}>
          {/* Title */}
          <Animated.View style={[styles.skeletonLine, styles.titleSkeleton, animatedStyle]} />
          <Animated.View style={[styles.skeletonLine, styles.titleSkeleton, animatedStyle, { width: '70%' }]} />

          {/* Author/Host */}
          <View style={styles.row}>
            <Animated.View style={[styles.iconSkeleton, animatedStyle]} />
            <Animated.View style={[styles.skeletonLine, styles.hostSkeleton, animatedStyle]} />
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <Animated.View style={[styles.tagSkeleton, animatedStyle]} />
            <Animated.View style={[styles.tagSkeleton, animatedStyle, { width: 60 }]} />
            <Animated.View style={[styles.tagSkeleton, animatedStyle, { width: 70 }]} />
          </View>

          {/* Footer (Views & Duration) */}
          <View style={styles.footerRow}>
            <View style={styles.row}>
              <Animated.View style={[styles.iconSkeleton, animatedStyle]} />
              <Animated.View style={[styles.skeletonLine, styles.metaSkeleton, animatedStyle]} />
            </View>
            <View style={styles.row}>
              <Animated.View style={[styles.iconSkeleton, animatedStyle]} />
              <Animated.View style={[styles.skeletonLine, styles.metaSkeleton, animatedStyle]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonPodcastCard;

const styles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 8,
    width: '100%',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
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
    height: PODCAST_CARD.imageHeight,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonSkeleton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D1D5DB',
  },
  contentContainer: {
    padding: 12,
  },
  skeletonLine: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  titleSkeleton: {
    height: 20,
    marginBottom: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  hostSkeleton: {
    width: 100,
    height: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  tagSkeleton: {
    width: 50,
    height: 24,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#E5E7EB',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metaSkeleton: {
    width: 50,
    height: 14,
  },
});
