import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { BreadcrumbItem } from './types';
import { ProfessionalColors, Spacing, Typography } from '../../styles/GlassStyles';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  onBackPress: () => void;
  isDarkMode?: boolean;
};

const ChevronSeparator = ({ color }: { color: string }) => (
  <Ionicons
    name="chevron-forward"
    size={12}
    color={color}
    style={styles.separator}
    // Hide from screen readers — it is purely decorative
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
  />
);

/**
 * Breadcrumbs
 *
 * Renders:
 *   ← Back   Home › Articles › Category › Article Title
 *
 * Accessibility:
 *   - The container is a semantic <nav> equivalent via accessibilityRole="none"
 *     (RN doesn't have a "navigation" role; the back button carries the action).
 *   - The current item has accessibilityState.selected=true (mirrors aria-current="page").
 *   - Each non-current crumb is a tappable link with a descriptive label.
 *   - The back button is a distinct, labelled button above the trail.
 */
export const Breadcrumbs = ({
  items,
  onBackPress,
  isDarkMode = false,
}: BreadcrumbsProps) => {
  const crumbColor = isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500;
  const currentColor = isDarkMode ? ProfessionalColors.gray100 : ProfessionalColors.gray800;
  const backColor = ProfessionalColors.primary;
  const chevronColor = isDarkMode ? ProfessionalColors.gray600 : ProfessionalColors.gray300;

  return (
    <View style={styles.wrapper}>
      {/* ← Back to Articles */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Back to articles list"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={16} color={backColor} />
        <Text style={[styles.backText, { color: backColor }]}>Back to Articles</Text>
      </TouchableOpacity>

      {/* Breadcrumb trail — horizontal scroll for long titles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trailRow}
        accessibilityRole="none"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <View key={index} style={styles.crumbGroup}>
              {isLast ? (
                // Current page — not tappable, marked as current for screen readers
                <Text
                  style={[styles.crumbCurrent, { color: currentColor }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  accessibilityRole="text"
                  accessibilityState={{ selected: true }}
                  accessibilityLabel={`Current page: ${item.label}`}
                >
                  {item.label}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={item.onPress}
                  disabled={!item.onPress}
                  accessibilityRole="link"
                  accessibilityLabel={`Navigate to ${item.label}`}
                  hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
                >
                  <Text style={[styles.crumb, { color: crumbColor }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}

              {!isLast && <ChevronSeparator color={chevronColor} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs + 2,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
  },
  backText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  trailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  crumbGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crumb: {
    ...Typography.caption,
    fontWeight: '500',
  },
  crumbCurrent: {
    ...Typography.caption,
    fontWeight: '700',
    maxWidth: 200,
  },
  separator: {
    marginHorizontal: 3,
  },
});
