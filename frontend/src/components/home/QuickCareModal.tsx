import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  QUICK_CARE_CATEGORIES,
  QUICK_CARE_TIPS,
  QuickCareTip,
} from '../../lib/data/quickCareTips';

interface QuickCareModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenBreathing: () => void;
}

export const QuickCareModal: React.FC<QuickCareModalProps> = ({
  visible,
  onClose,
  onOpenBreathing,
}) => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const colors = {
    overlay: 'rgba(0, 0, 0, 0.65)',
    modalBg: isDark ? '#0F172A' : '#FFFFFF',
    border: isDark ? '#334155' : '#E2E8F0',
    title: isDark ? '#F8FAFC' : '#0F172A',
    subtitle: isDark ? '#94A3B8' : '#64748B',
    searchBg: isDark ? '#1E293B' : '#F1F5F9',
    searchText: isDark ? '#F8FAFC' : '#1E293B',
    searchPlaceholder: isDark ? '#64748B' : '#94A3B8',
    cardBg: isDark ? '#1E293B' : '#F8FAFC',
    cardBorder: isDark ? '#334155' : '#E2E8F0',
    cardHeader: isDark ? '#F1F5F9' : '#0F172A',
    cardBody: isDark ? '#CBD5E1' : '#334155',
    pillActiveBg: isDark ? '#2563EB' : '#000A60',
    pillActiveText: '#FFFFFF',
    pillInactiveBg: isDark ? '#1E293B' : '#F1F5F9',
    pillInactiveText: isDark ? '#94A3B8' : '#475569',
    actionBadgeBg: isDark ? 'rgba(52, 211, 153, 0.15)' : '#DCFCE7',
    actionBadgeText: isDark ? '#34D399' : '#15803D',
    avoidBadgeBg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
    avoidBadgeText: isDark ? '#F87171' : '#B91C1C',
    warningBg: isDark ? 'rgba(245, 158, 11, 0.12)' : '#FEF3C7',
    warningText: isDark ? '#FBBF24' : '#B45309',
    breathingBtnBg: isDark ? '#3B82F6' : '#0F52BA',
  };

  const filteredTips = useMemo(() => {
    return QUICK_CARE_TIPS.filter((tip) => {
      const matchesCategory =
        selectedCategory === 'All' || tip.category === selectedCategory;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        tip.title.toLowerCase().includes(normalizedQuery) ||
        tip.summary.toLowerCase().includes(normalizedQuery) ||
        tip.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: colors.modalBg,
              paddingBottom: Math.max(insets.bottom, 16) + 10,
            },
          ]}>
          {/* Sheet Handle */}
          <View style={[styles.handle, { backgroundColor: isDark ? '#475569' : '#CBD5E1' }]} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: colors.title }]}>
                Quick Care & Relief Guide
              </Text>
              <Text style={[styles.subtitle, { color: colors.subtitle }]}>
                Practical first-steps for everyday health conditions
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.searchBg }]}
              accessibilityRole="button"
              accessibilityLabel="Close quick care guide">
              <Ionicons name="close" size={20} color={colors.title} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={[styles.searchBar, { backgroundColor: colors.searchBg }]}>
            <Ionicons name="search" size={17} color={colors.searchPlaceholder} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: colors.searchText }]}
              placeholder="Search condition (e.g. headache, acid reflux, sprain...)"
              placeholderTextColor={colors.searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.searchPlaceholder} />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Filter Pills */}
          <View style={{ maxHeight: 42, marginVertical: 8 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
              {QUICK_CARE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={[
                      styles.categoryPill,
                      {
                        backgroundColor: isActive ? colors.pillActiveBg : colors.pillInactiveBg,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.categoryPillText,
                        { color: isActive ? colors.pillActiveText : colors.pillInactiveText },
                      ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Condition Cards List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}>
            {filteredTips.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={40} color={colors.subtitle} style={{ marginBottom: 8 }} />
                <Text style={[styles.emptyText, { color: colors.title }]}>No condition found</Text>
                <Text style={[styles.emptySub, { color: colors.subtitle }]}>
                  Try another keyword or select "All" categories.
                </Text>
              </View>
            ) : (
              filteredTips.map((tip) => {
                const isExpanded = expandedId === tip.id;
                return (
                  <TouchableOpacity
                    key={tip.id}
                    onPress={() => toggleExpand(tip.id)}
                    activeOpacity={0.8}
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.cardBg,
                        borderColor: isExpanded ? colors.pillActiveBg : colors.cardBorder,
                      },
                    ]}>
                    {/* Card Summary Header */}
                    <View style={styles.cardHeader}>
                      <View style={[styles.cardIconBox, { backgroundColor: colors.searchBg }]}>
                        <Ionicons name={tip.icon as any} size={20} color={isDark ? '#60A5FA' : '#0F52BA'} />
                      </View>
                      <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={[styles.cardTitle, { color: colors.cardHeader }]}>
                          {tip.title}
                        </Text>
                        <Text style={[styles.cardCategory, { color: colors.subtitle }]}>
                          {tip.category}
                        </Text>
                      </View>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.subtitle}
                      />
                    </View>

                    <Text style={[styles.cardSummary, { color: colors.cardBody }]} numberOfLines={isExpanded ? undefined : 2}>
                      {tip.summary}
                    </Text>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <View style={styles.expandedSection}>
                        {/* 1. Immediate Actions */}
                        <View style={styles.stepGroup}>
                          <View style={[styles.stepBadge, { backgroundColor: colors.actionBadgeBg }]}>
                            <Text style={[styles.stepBadgeText, { color: colors.actionBadgeText }]}>
                              IMMEDIATE FIRST-STEPS
                            </Text>
                          </View>
                          {tip.immediateActions.map((action, idx) => (
                            <View key={idx} style={styles.bulletRow}>
                              <Ionicons name="checkmark-circle" size={14} color="#10B981" style={{ marginTop: 2, marginRight: 6 }} />
                              <Text style={[styles.bulletText, { color: colors.cardBody }]}>{action}</Text>
                            </View>
                          ))}
                        </View>

                        {/* 2. What to Avoid */}
                        <View style={styles.stepGroup}>
                          <View style={[styles.stepBadge, { backgroundColor: colors.avoidBadgeBg }]}>
                            <Text style={[styles.stepBadgeText, { color: colors.avoidBadgeText }]}>
                              WHAT TO AVOID
                            </Text>
                          </View>
                          <Text style={[styles.bulletText, { color: colors.cardBody }]}>
                            {tip.whatToAvoid}
                          </Text>
                        </View>

                        {/* 3. Safety Warning */}
                        <View style={[styles.warningBox, { backgroundColor: colors.warningBg }]}>
                          <Ionicons name="medical-outline" size={15} color={colors.warningText} style={{ marginRight: 6, marginTop: 1 }} />
                          <Text style={[styles.warningText, { color: colors.warningText }]}>
                            {tip.whenToSeekDoctor}
                          </Text>
                        </View>

                        {/* 4. Optional Calm Action Button */}
                        {tip.hasBreathingExercise && (
                          <TouchableOpacity
                            onPress={() => {
                              onClose();
                              setTimeout(() => onOpenBreathing(), 300);
                            }}
                            style={[styles.calmBtn, { backgroundColor: colors.breathingBtnBg }]}
                            activeOpacity={0.85}>
                            <Ionicons name="fitness-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={styles.calmBtnText}>
                              Start 1-Minute Calm Breathing
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    height: '88%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 10,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  cardSummary: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    gap: 10,
  },
  stepGroup: {
    gap: 4,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  calmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  calmBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySub: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});
