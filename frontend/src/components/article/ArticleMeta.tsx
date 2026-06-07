import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ArticleMetaProps } from './types';
import { ProfessionalColors, Spacing, Typography } from '../../styles/GlassStyles';
import { formatDateShort } from '../../helper/dateUtils';

/**
 * ArticleMeta
 *
 * Compact, single-row metadata block:
 *   [Avatar]  AuthorName  •  Date  •  ⏱ Reading time  •  👁 Views
 *
 * Used standalone inside ArticleHero and can be reused in cards.
 * Set compact=true to reduce spacing for tight layouts.
 */
export const ArticleMeta = ({
  authorName,
  authorImage,
  publishedAt,
  readingTime,
  viewCount,
  isDarkMode = false,
  compact = false,
}: ArticleMetaProps) => {
  const nameColor = isDarkMode ? ProfessionalColors.gray200 : ProfessionalColors.gray700;
  const metaColor = isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500;
  const dotColor = isDarkMode ? ProfessionalColors.gray600 : ProfessionalColors.gray300;

  const avatarSize = compact ? 28 : 34;
  const avatarRadius = avatarSize / 2;

  const hasAnyStat = publishedAt || readingTime || (viewCount !== undefined && viewCount > 0);

  return (
    <View
      style={[styles.row, compact && styles.rowCompact]}
      accessibilityRole="none"
    >
      {/* Author avatar */}
      {authorImage ? (
        <Image
          source={{ uri: authorImage }}
          style={[
            styles.avatar,
            { width: avatarSize, height: avatarSize, borderRadius: avatarRadius },
          ]}
          accessibilityLabel={authorName ? `${authorName}'s profile photo` : 'Author photo'}
          accessibilityRole="image"
        />
      ) : null}

      {/* Text block */}
      <View style={styles.textBlock}>
        {authorName ? (
          <Text
            style={[styles.authorName, { color: nameColor }, compact && styles.authorNameCompact]}
            numberOfLines={1}
            accessibilityRole="text"
          >
            {authorName}
          </Text>
        ) : null}

        {hasAnyStat ? (
          <View style={styles.statsRow}>
            {publishedAt ? (
              <>
                <Ionicons
                  name="calendar-outline"
                  size={11}
                  color={metaColor}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                />
                <Text
                  style={[styles.stat, { color: metaColor }]}
                  accessibilityLabel={`Published ${formatDateShort(publishedAt)}`}
                >
                  {formatDateShort(publishedAt)}
                </Text>
              </>
            ) : null}

            {publishedAt && readingTime ? (
              <Text style={[styles.dot, { color: dotColor }]}>•</Text>
            ) : null}

            {readingTime ? (
              <>
                <Ionicons
                  name="time-outline"
                  size={11}
                  color={metaColor}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                />
                <Text
                  style={[styles.stat, { color: metaColor }]}
                  accessibilityLabel={`Reading time: ${readingTime}`}
                >
                  {readingTime}
                </Text>
              </>
            ) : null}

            {readingTime && viewCount !== undefined && viewCount > 0 ? (
              <Text style={[styles.dot, { color: dotColor }]}>•</Text>
            ) : null}

            {viewCount !== undefined && viewCount > 0 ? (
              <>
                <Ionicons
                  name="eye-outline"
                  size={11}
                  color={metaColor}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                />
                <Text
                  style={[styles.stat, { color: metaColor }]}
                  accessibilityLabel={`${viewCount} views`}
                >
                  {viewCount.toLocaleString()}
                </Text>
              </>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowCompact: {
    gap: Spacing.xs,
  },
  avatar: {
    backgroundColor: ProfessionalColors.gray200,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 2,
  },
  authorNameCompact: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  stat: {
    ...Typography.caption,
  },
  dot: {
    ...Typography.caption,
  },
});
