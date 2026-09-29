// ArticleSkeletonCard.tsx
// Placeholder shown in place of ArticleCard while article data is being fetched.
// Mirrors ArticleCard's layout (cover image + tag/title/badge/meta/action rows)
// and reuses the shimmer approach already established by PodcastSkeletonCard
// and CourseSkeletonCard.
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

type AnimatedInterpolation = ReturnType<
  InstanceType<typeof Animated.Value>['interpolate']
>;

interface ShimmerBoxProps {
  style?: object | object[];
  shimmerX: AnimatedInterpolation;
  highlightColor: string;
  baseColor: string;
}

const ShimmerBox: React.FC<ShimmerBoxProps> = ({
  style,
  shimmerX,
  highlightColor,
  baseColor,
}) => (
  <View style={[styles.shimmerBox, style]}>
    <View style={[StyleSheet.absoluteFill, {backgroundColor: baseColor}]} />
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: highlightColor,
          opacity: 0.5,
          transform: [{translateX: shimmerX}],
        },
      ]}
    />
  </View>
);

const ArticleSkeletonCard: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();

  // Same surface/base tones ArticleCard uses for its light/dark themes.
  const surfaceColor = isDarkMode ? '#1F2937' : '#FFFFFF';
  const baseColor = isDarkMode ? '#374151' : '#E5E7EB';
  const highlightColor = isDarkMode ? '#4B5563' : '#F3F4F6';

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

  const shimmerProps = {shimmerX, baseColor, highlightColor};

  return (
    <View
      testID="article-skeleton-card"
      style={[styles.cardContainer, {backgroundColor: surfaceColor}]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {/* Cover image */}
      <ShimmerBox style={styles.coverImage} {...shimmerProps} />

      <View style={styles.contentContainer}>
        {/* Tag row + reading difficulty pill */}
        <View style={styles.badgeRow}>
          <ShimmerBox style={styles.tagLine} {...shimmerProps} />
          <ShimmerBox style={styles.difficultyPill} {...shimmerProps} />
        </View>

        {/* Title (two lines, like ArticleCard's numberOfLines={2}) */}
        <ShimmerBox style={styles.titleLine} {...shimmerProps} />
        <ShimmerBox
          style={[styles.titleLine, styles.titleLineShort]}
          {...shimmerProps}
        />

        {/* Readability / score / status chips */}
        <View style={styles.readabilityRow}>
          <ShimmerBox style={styles.chip} {...shimmerProps} />
          <ShimmerBox style={styles.chip} {...shimmerProps} />
          <ShimmerBox style={styles.chipWide} {...shimmerProps} />
        </View>

        {/* Author • views • date • read time */}
        <View style={styles.metaRow}>
          {[1, 2, 3].map(i => (
            <ShimmerBox
              key={`article-skeleton-meta-${i}`}
              style={styles.metaLine}
              {...shimmerProps}
            />
          ))}
        </View>

        {/* Like / save / comment actions */}
        <View
          style={[
            styles.likeSaveContainer,
            {borderTopColor: isDarkMode ? '#374151' : '#F0F0F0'},
          ]}>
          {[1, 2, 3].map(i => (
            <ShimmerBox
              key={`article-skeleton-action-${i}`}
              style={styles.actionPill}
              {...shimmerProps}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerBox: {
    overflow: 'hidden',
  },

  cardContainer: {
    width: '100%',
    borderRadius: 16,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },

  coverImage: {
    width: '100%',
    height: 180,
  },

  contentContainer: {
    padding: 14,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 6,
    gap: 8,
  },

  tagLine: {
    height: 12,
    width: '40%',
    borderRadius: 6,
  },

  difficultyPill: {
    height: 18,
    width: 72,
    borderRadius: 12,
  },

  titleLine: {
    height: 18,
    width: '100%',
    borderRadius: 6,
    marginBottom: 6,
  },

  titleLineShort: {
    width: '65%',
  },

  readabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },

  chip: {
    height: 20,
    width: 64,
    borderRadius: 12,
  },

  chipWide: {
    height: 20,
    width: 110,
    borderRadius: 12,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },

  metaLine: {
    height: 12,
    flexGrow: 1,
    flexBasis: 70,
    maxWidth: 120,
    borderRadius: 6,
  },

  likeSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },

  actionPill: {
    height: 16,
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
  },
});

export default ArticleSkeletonCard;