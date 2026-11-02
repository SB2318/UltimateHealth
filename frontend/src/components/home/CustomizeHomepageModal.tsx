import React from 'react';
import {
  Modal,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';

export type ArticleDisplayMode = 'category' | 'random';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;

  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;

  articleDisplayMode: ArticleDisplayMode;
  setArticleDisplayMode: React.Dispatch<React.SetStateAction<ArticleDisplayMode>>;

  showCategoryFilters: boolean;
  setShowCategoryFilters: React.Dispatch<React.SetStateAction<boolean>>;

  showSavedFilter: boolean;
  setShowSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;

  showDailyThought: boolean;
  setShowDailyThought: React.Dispatch<React.SetStateAction<boolean>>;

  showBreathingTool: boolean;
  setShowBreathingTool: React.Dispatch<React.SetStateAction<boolean>>;

  showQuickCareGuide: boolean;
  setShowQuickCareGuide: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomizeHomepageModal = ({
  visible,
  onClose,
  onSave,
  onReset,
  showSearchBar,
  setShowSearchBar,
  articleDisplayMode,
  setArticleDisplayMode,
  showCategoryFilters,
  setShowCategoryFilters,
  showSavedFilter,
  setShowSavedFilter,
  showDailyThought,
  setShowDailyThought,
  showBreathingTool,
  setShowBreathingTool,
  showQuickCareGuide,
  setShowQuickCareGuide,
}: Props) => {
  const isDark = useColorScheme() === 'dark';

  const colors = {
    overlayBg: 'rgba(0, 0, 0, 0.65)',
    cardBg: isDark ? '#1E293B' : '#FFFFFF',
    border: isDark ? '#334155' : '#E2E8F0',
    title: isDark ? '#F8FAFC' : '#000A60',
    subtitle: isDark ? '#94A3B8' : '#6B7280',
    sectionHeader: isDark ? '#E2E8F0' : '#374151',
    divider: isDark ? '#334155' : '#F3F4F6',
    segmentBg: isDark ? '#0F172A' : '#F3F4F6',
    segmentActiveBg: isDark ? '#2563EB' : '#000A60',
    segmentActiveText: '#FFFFFF',
    segmentInactiveText: isDark ? '#94A3B8' : '#4B5563',
    rowTitle: isDark ? '#F1F5F9' : '#1F2937',
    rowDesc: isDark ? '#94A3B8' : '#6B7280',
    saveBtnBg: isDark ? '#2563EB' : '#000A60',
    saveBtnText: '#FFFFFF',
    resetBtnBg: isDark ? '#334155' : '#F3F4F6',
    resetBtnText: isDark ? '#F1F5F9' : '#4B5563',
    cancelText: isDark ? '#94A3B8' : '#9CA3AF',
    switchTrackTrue: isDark ? '#3B82F6' : '#000A60',
    switchTrackFalse: isDark ? '#475569' : '#D1D5DB',
    switchThumb: '#00BFFF',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlayBg }]}>
        <View style={[styles.container, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.title }]}>Customize Home Feed</Text>
          <Text style={[styles.subtitle, { color: colors.subtitle }]}>
            Personalize what you want to see on your feed.
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Display Mode Selection: Category Wise vs All Articles Random */}
            <View style={[styles.section, { borderBottomColor: colors.divider }]}>
              <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>Articles Feed Style</Text>
              <View style={[styles.segmentedControl, { backgroundColor: colors.segmentBg }]}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    articleDisplayMode === 'category' && {
                      backgroundColor: colors.segmentActiveBg,
                    },
                  ]}
                  onPress={() => setArticleDisplayMode('category')}
                  accessibilityRole="button"
                  accessibilityLabel="Category wise display">
                  <Text
                    style={[
                      styles.segmentText,
                      articleDisplayMode === 'category'
                        ? { color: colors.segmentActiveText, fontWeight: '700' }
                        : { color: colors.segmentInactiveText },
                    ]}>
                    Category-wise
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    articleDisplayMode === 'random' && {
                      backgroundColor: colors.segmentActiveBg,
                    },
                  ]}
                  onPress={() => setArticleDisplayMode('random')}
                  accessibilityRole="button"
                  accessibilityLabel="All articles randomly">
                  <Text
                    style={[
                      styles.segmentText,
                      articleDisplayMode === 'random'
                        ? { color: colors.segmentActiveText, fontWeight: '700' }
                        : { color: colors.segmentInactiveText },
                    ]}>
                    All (Random)
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.helpText, { color: colors.subtitle }]}>
                {articleDisplayMode === 'category'
                  ? 'Articles filtered by your chosen category tags.'
                  : 'Displays articles shuffled across all wellness topics.'}
              </Text>
            </View>

            {/* ── SECTION: WELLNESS & CARE TOOLS ──────────────────────── */}
            <View style={[styles.section, { borderBottomColor: colors.divider, paddingTop: 10 }]}>
              <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>
                Wellness & Care Tools
              </Text>
            </View>

            {/* Random Thoughts Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowDailyThought(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="Random Daily Thoughts toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>Random Daily Thoughts</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Gentle daily wellness quotes and reflections
                </Text>
              </View>
              <Switch
                value={showDailyThought}
                onValueChange={setShowDailyThought}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showDailyThought ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>

            {/* 1-Minute Breath Check Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowBreathingTool(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="1-Minute Breath Check toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>1-Minute Breath Check</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Mindful box-breathing tool on the home feed
                </Text>
              </View>
              <Switch
                value={showBreathingTool}
                onValueChange={setShowBreathingTool}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showBreathingTool ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>

            {/* Quick Care Guides Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowQuickCareGuide(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="Quick Care Guides toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>Quick Care Guides</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Practical first-aid & care guide button
                </Text>
              </View>
              <Switch
                value={showQuickCareGuide}
                onValueChange={setShowQuickCareGuide}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showQuickCareGuide ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>

            {/* ── SECTION: FEED CONTROLS ─────────────────────────────── */}
            <View style={[styles.section, { borderBottomColor: colors.divider, paddingTop: 10 }]}>
              <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>
                Header & Navigation Pills
              </Text>
            </View>

            {/* Search Bar Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowSearchBar(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="Search Bar toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>Search Bar</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Show search bar in the top header
                </Text>
              </View>
              <Switch
                value={showSearchBar}
                onValueChange={setShowSearchBar}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showSearchBar ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>

            {/* Category Filter Chips Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowCategoryFilters(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="Category Topic Pills toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>Category Topic Pills</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Horizontal topic pills above the articles
                </Text>
              </View>
              <Switch
                value={showCategoryFilters}
                onValueChange={setShowCategoryFilters}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showCategoryFilters ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>

            {/* Saved Filter Chip Toggle */}
            <TouchableOpacity
              style={[styles.row, { borderBottomColor: colors.divider }]}
              onPress={() => setShowSavedFilter(prev => !prev)}
              activeOpacity={0.7}
              accessibilityRole="switch"
              accessibilityLabel="Saved Bookmarks Pill toggle">
              <View style={styles.rowLabelContainer}>
                <Text style={[styles.rowTitle, { color: colors.rowTitle }]}>Saved Bookmarks Pill</Text>
                <Text style={[styles.rowDescription, { color: colors.rowDesc }]}>
                  Quick filter pill for your saved bookmarks
                </Text>
              </View>
              <Switch
                value={showSavedFilter}
                onValueChange={setShowSavedFilter}
                trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }}
                thumbColor={showSavedFilter ? colors.switchThumb : '#F3F4F6'}
              />
            </TouchableOpacity>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.saveBtnBg }]}
              onPress={onSave}
              accessibilityRole="button"
              accessibilityLabel="Save homepage customization">
              <Text style={[styles.saveText, { color: colors.saveBtnText }]}>Save Preferences</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.resetBtnBg }]}
              onPress={onReset}
              accessibilityRole="button"
              accessibilityLabel="Reset to default">
              <Text style={[styles.resetText, { color: colors.resetBtnText }]}>Reset to Default</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel">
              <Text style={[styles.cancel, { color: colors.cancelText }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomizeHomepageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  section: {
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginTop: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  rowDescription: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  buttonGroup: {
    marginTop: 14,
    gap: 8,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
  },
  resetButton: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancel: {
    fontSize: 14,
  },
});
