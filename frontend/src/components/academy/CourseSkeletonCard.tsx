// CourseSkeletonCard.tsx
// Placeholder shown in place of CourseCard while course data is loading.
// Mirrors CourseCard's layout (icon box + title/meta/progress lines) and
// reuses the shimmer approach already established by PodcastSkeletonCard.
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native';
import { ACADEMY_SURFACE, ACADEMY_BORDER } from '../../lib/ui/Theme';

type AnimatedInterpolation = ReturnType<InstanceType<typeof Animated.Value>['interpolate']>;

interface ShimmerBoxProps {
  style?: object | object[];
  shimmerX: AnimatedInterpolation;
  highlightColor: string;
  baseColor: string;
}

const BASE_COLOR = '#E5E7EB';
const HIGHLIGHT_COLOR = '#F3F4F6';

const ShimmerBox: React.FC<ShimmerBoxProps> = ({ style, shimmerX, highlightColor, baseColor }) => (
  <View style={[{ overflow: 'hidden' }, style]}>
    <View style={[StyleSheet.absoluteFill, { backgroundColor: baseColor }]} />
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: highlightColor,
          opacity: 0.5,
          transform: [{ translateX: shimmerX }],
        },
      ]}
    />
  </View>
);

const CourseSkeletonCard: React.FC = () => {
  const { width } = useWindowDimensions();
  const shimmerProgress = useRef(new Animated.Value(0)).current;

  const shimmerX = shimmerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerProgress, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerProgress]);

  const shimmerProps = { shimmerX, baseColor: BASE_COLOR, highlightColor: HIGHLIGHT_COLOR };

  return (
    <View
      style={styles.card}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <ShimmerBox style={styles.iconContainer} {...shimmerProps} />
      <View style={styles.content}>
        <ShimmerBox style={styles.titleLine} {...shimmerProps} />
        <ShimmerBox style={styles.metaLine} {...shimmerProps} />
        <View style={styles.progressContainer}>
          <ShimmerBox style={styles.progressBar} {...shimmerProps} />
          <ShimmerBox style={styles.progressLabel} {...shimmerProps} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: ACADEMY_SURFACE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  titleLine: {
    height: 16,
    borderRadius: 4,
    width: '60%',
    marginBottom: 8,
  },
  metaLine: {
    height: 12,
    borderRadius: 4,
    width: '85%',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  progressLabel: {
    height: 10,
    width: 28,
    borderRadius: 4,
  },
});

export default CourseSkeletonCard;
