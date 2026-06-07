import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import type { RelatedArticlesProps, RelatedArticleItem } from './types';
import { RelatedArticleCard } from './RelatedArticleCard';
import {
  ProfessionalColors,
  Spacing,
  Typography,
  BorderRadius,
} from '../../styles/GlassStyles';

/**
 * RelatedArticles
 *
 * Responsive section rendered below the article body.
 *
 * Column counts (based on window width):
 *   < 768 px   → 1 column  (phone portrait)
 *   ≥ 768 px   → 2 columns (tablet / phone landscape)
 *   ≥ 1100 px  → 3 columns (large tablet / desktop)
 *
 * The `key` prop on FlatList forces a full re-render whenever the column
 * count changes (e.g. on device rotation) — required when using numColumns.
 *
 * Architecture note:
 *   Pass articles from the parent screen. The parent should attempt to load
 *   them from the API (e.g. GET /articles?category=X&limit=6) and fall back
 *   to the mock data in src/constants/mockArticleData.ts during development.
 */
export const RelatedArticles = ({
  articles,
  onArticlePress,
  isDarkMode = false,
}: RelatedArticlesProps) => {
  const { width } = useWindowDimensions();

  const numColumns = width >= 1100 ? 3 : width >= 768 ? 2 : 1;
  const columnGap = Spacing.md;

  const titleColor = isDarkMode ? ProfessionalColors.gray50 : ProfessionalColors.gray900;
  const dividerColor = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.gray200;

  if (!articles || articles.length === 0) return null;

  return (
    <View
      style={[styles.container, { borderTopColor: dividerColor }]}
      accessibilityRole="none"
    >
      {/* Section heading */}
      <Text
        style={[styles.sectionTitle, { color: titleColor }]}
        accessibilityRole="header"
        accessibilityLabel="Related Articles section"
      >
        Related Articles
      </Text>

      <FlatList<RelatedArticleItem>
        data={articles}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        // Force re-mount when column count changes (required by RN for numColumns)
        key={`related-${numColumns}`}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          // For multi-column grids, add a right gap to all but the last in the row
          const isLastInRow = (index + 1) % numColumns === 0;
          return (
            <View
              style={[
                styles.cardWrapper,
                // Equal flex so all cards share the row width
                { flex: 1 / numColumns },
                !isLastInRow && numColumns > 1 && { paddingRight: columnGap },
              ]}
            >
              <RelatedArticleCard
                item={item}
                onPress={onArticlePress}
                isDarkMode={isDarkMode}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: columnGap }} />}
        accessibilityRole="list"
        accessibilityLabel="Related articles"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.massive,
    borderTopWidth: 1,
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.lg,
  },
  cardWrapper: {
    minWidth: 0, // prevent flex overflow in tight layouts
  },
});
