import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { RelatedArticleItem } from './types';
import {
  ProfessionalColors,
  Spacing,
  Typography,
  BorderRadius,
} from '../../styles/GlassStyles';

type RelatedArticleCardProps = {
  item: RelatedArticleItem;
  onPress: (item: RelatedArticleItem) => void;
  isDarkMode?: boolean;
};

/**
 * RelatedArticleCard
 *
 * Vertical card used inside the RelatedArticles grid.
 *
 * Layout:
 *   ┌──────────────────┐
 *   │  Thumbnail image  │  ← 140 px tall, cover-fit
 *   ├──────────────────┤
 *   │ CATEGORY          │
 *   │ Title (2 lines)   │
 *   │ Excerpt (2 lines) │
 *   │ Author · ⏱ Time  │
 *   └──────────────────┘
 *
 * Accessibility:
 *   - Entire card is a button with a descriptive label.
 *   - Image has alt text.
 *   - Meta icons are hidden from screen readers (decorative).
 */
export const RelatedArticleCard = ({
  item,
  onPress,
  isDarkMode = false,
}: RelatedArticleCardProps) => {
  const cardBg = isDarkMode ? ProfessionalColors.gray800 : ProfessionalColors.white;
  const titleColor = isDarkMode ? ProfessionalColors.gray50 : ProfessionalColors.gray900;
  const excerptColor = isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray600;
  const metaColor = isDarkMode ? ProfessionalColors.gray500 : ProfessionalColors.gray400;
  const thumbBg = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.gray100;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBg }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${item.title}`}
      accessibilityHint="Opens the full article"
    >
      {/* Thumbnail */}
      <View style={[styles.thumbWrapper, { backgroundColor: thumbBg }]}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            accessibilityLabel={item.imageAlt || item.title}
            accessibilityRole="image"
          />
        ) : (
          // Placeholder when no image URL is provided
          <View style={styles.thumbPlaceholder}>
            <Ionicons
              name="image-outline"
              size={28}
              color={metaColor}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.body}>
        {item.category ? (
          <Text
            style={styles.category}
            numberOfLines={1}
            accessibilityRole="text"
          >
            {item.category.toUpperCase()}
          </Text>
        ) : null}

        <Text
          style={[styles.title, { color: titleColor }]}
          numberOfLines={2}
          accessibilityRole="text"
        >
          {item.title}
        </Text>

        {item.excerpt ? (
          <Text
            style={[styles.excerpt, { color: excerptColor }]}
            numberOfLines={2}
          >
            {item.excerpt}
          </Text>
        ) : null}

        {/* Meta row: author · reading time */}
        <View style={styles.metaRow}>
          {item.authorName ? (
            <Text style={[styles.metaText, { color: metaColor }]} numberOfLines={1}>
              {item.authorName}
            </Text>
          ) : null}

          {item.authorName && item.readingTime ? (
            <Text style={[styles.dot, { color: metaColor }]}>•</Text>
          ) : null}

          {item.readingTime ? (
            <View style={styles.timeRow}>
              <Ionicons
                name="time-outline"
                size={11}
                color={metaColor}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              />
              <Text
                style={[styles.metaText, { color: metaColor }]}
                accessibilityLabel={`Reading time: ${item.readingTime}`}
              >
                {item.readingTime}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbWrapper: {
    width: '100%',
    height: 140,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  category: {
    ...Typography.caption,
    fontWeight: '700',
    color: ProfessionalColors.primary,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  excerpt: {
    ...Typography.caption,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    ...Typography.caption,
  },
  dot: {
    ...Typography.caption,
  },
});
