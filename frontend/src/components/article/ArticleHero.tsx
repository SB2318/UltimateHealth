import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import type { ArticleHeroProps } from './types';
import { ArticleMeta } from './ArticleMeta';
import { ProfessionalColors, Spacing, Typography } from '../../styles/GlassStyles';

/**
 * ArticleHero
 *
 * Full-bleed hero section at the top of the article detail page.
 *
 * Layout (all screen sizes):
 *   ┌──────────────────────────────────────┐
 *   │           Hero Image                  │
 *   │                    [CATEGORY BADGE]   │
 *   └──────────────────────────────────────┘
 *   Title (H1)
 *   Subtitle / description
 *   [Avatar]  Author · Date · Reading Time
 *
 * The image height scales with screen width (60% up to 320 px max) so it
 * always looks proportional on every device size.
 *
 * Accessibility:
 *   - Container carries accessibilityRole="header" so screen readers announce it.
 *   - Title has the dominant heading role (equivalent to <h1>).
 *   - Image alt text is required by the caller; falls back to the title.
 */
export const ArticleHero = ({
  title,
  subtitle,
  imageUri,
  imageAlt,
  category,
  authorName,
  authorImage,
  publishedAt,
  readingTime,
  viewCount,
  isDarkMode = false,
}: ArticleHeroProps) => {
  const { width } = useWindowDimensions();
  // Responsive image height: 60 % of screen width, min 200, max 320
  const heroHeight = Math.min(320, Math.max(200, width * 0.6));

  const titleColor = isDarkMode ? ProfessionalColors.gray50 : ProfessionalColors.gray900;
  const subtitleColor = isDarkMode ? ProfessionalColors.gray300 : ProfessionalColors.gray600;
  const dividerColor = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.gray200;

  const effectiveAlt = imageAlt || title;

  return (
    <View
      style={styles.container}
      accessibilityRole="header"
      accessibilityLabel={`Article: ${title}`}
    >
      {/* ── Hero Image ── */}
      <View style={[styles.imageWrapper, { height: heroHeight }]}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            accessibilityLabel={effectiveAlt}
            accessibilityRole="image"
          />
        ) : (
          // Placeholder gradient when no image is available
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: isDarkMode
                  ? ProfessionalColors.gray800
                  : ProfessionalColors.gray100,
              },
            ]}
          />
        )}

        {/* Gradient scrim so the category badge is always readable */}
        <View style={styles.imageScrim} />

        {/* Category badge — pinned to the bottom-left of the image */}
        {category ? (
          <View
            style={styles.categoryBadge}
            accessibilityLabel={`Category: ${category}`}
            accessibilityRole="text"
          >
            <Text style={styles.categoryText} numberOfLines={1}>
              {category.toUpperCase()}
            </Text>
          </View>
        ) : null}
      </View>

      {/* ── Text Content ── */}
      <View style={styles.contentPad}>
        {/* Article title — semantic H1 */}
        <Text
          style={[styles.title, { color: titleColor }]}
          accessibilityRole="header"
          // Maps to aria-level="1" conceptually; RN uses "header" role
        >
          {title}
        </Text>

        {/* Subtitle / lead paragraph */}
        {subtitle ? (
          <Text style={[styles.subtitle, { color: subtitleColor }]}>
            {subtitle}
          </Text>
        ) : null}

        {/* Thin divider */}
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />

        {/* Author + date + reading time */}
        <ArticleMeta
          authorName={authorName}
          authorImage={authorImage}
          publishedAt={publishedAt}
          readingTime={readingTime}
          viewCount={viewCount}
          isDarkMode={isDarkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  // Image block
  imageWrapper: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: ProfessionalColors.gray100,
  },
  imageScrim: {
    ...StyleSheet.absoluteFillObject,
    // Subtle gradient scrim from bottom so badge stays readable on any image
    backgroundColor: 'transparent',
    // On RN we fake the scrim with a semi-transparent bottom layer
    justifyContent: 'flex-end',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.lg,
    backgroundColor: ProfessionalColors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryText: {
    ...Typography.caption,
    fontWeight: '700',
    color: ProfessionalColors.white,
    letterSpacing: 0.8,
  },

  // Text content
  contentPad: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
  },
  divider: {
    height: 1,
    borderRadius: 1,
    marginVertical: Spacing.xs,
  },
});
