import React from 'react';
import {
  Modal,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Customize Homepage</Text>
          <Text style={styles.subtitle}>
            Choose what you want to see on your home feed.
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Display Mode Selection: Category Wise vs All Articles Random */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Articles Feed Style</Text>
              <View style={styles.segmentedControl}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    articleDisplayMode === 'category' &&
                      styles.segmentButtonActive,
                  ]}
                  onPress={() => setArticleDisplayMode('category')}
                  accessibilityRole="button"
                  accessibilityLabel="Category wise display">
                  <Text
                    style={[
                      styles.segmentText,
                      articleDisplayMode === 'category' &&
                        styles.segmentTextActive,
                    ]}>
                    Category-wise
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    articleDisplayMode === 'random' &&
                      styles.segmentButtonActive,
                  ]}
                  onPress={() => setArticleDisplayMode('random')}
                  accessibilityRole="button"
                  accessibilityLabel="All articles randomly">
                  <Text
                    style={[
                      styles.segmentText,
                      articleDisplayMode === 'random' &&
                        styles.segmentTextActive,
                    ]}>
                    All (Random)
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.helpText}>
                {articleDisplayMode === 'category'
                  ? 'Default: Articles filtered by selected categories.'
                  : 'Displays all articles shuffled randomly across categories.'}
              </Text>
            </View>

            {/* Search Bar Toggle */}
            <View style={styles.row}>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowTitle}>Search Bar</Text>
                <Text style={styles.rowDescription}>
                  Show search bar in the header
                </Text>
              </View>
              <Switch
                value={showSearchBar}
                onValueChange={setShowSearchBar}
                trackColor={{false: '#D1D5DB', true: '#000A60'}}
                thumbColor={showSearchBar ? '#00BFFF' : '#F3F4F6'}
              />
            </View>

            {/* Category Filter Chips Toggle */}
            <View style={styles.row}>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowTitle}>Category Filter Chips</Text>
                <Text style={styles.rowDescription}>
                  Horizontal category pills above the articles
                </Text>
              </View>
              <Switch
                value={showCategoryFilters}
                onValueChange={setShowCategoryFilters}
                trackColor={{false: '#D1D5DB', true: '#000A60'}}
                thumbColor={showCategoryFilters ? '#00BFFF' : '#F3F4F6'}
              />
            </View>

            {/* Saved Filter Chip Toggle */}
            <View style={styles.row}>
              <View style={styles.rowLabelContainer}>
                <Text style={styles.rowTitle}>Saved Articles Chip</Text>
                <Text style={styles.rowDescription}>
                  Quick filter chip for bookmarks
                </Text>
              </View>
              <Switch
                value={showSavedFilter}
                onValueChange={setShowSavedFilter}
                trackColor={{false: '#D1D5DB', true: '#000A60'}}
                thumbColor={showSavedFilter ? '#00BFFF' : '#F3F4F6'}
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSave}
              accessibilityRole="button"
              accessibilityLabel="Save homepage customization">
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={onReset}
              accessibilityRole="button"
              accessibilityLabel="Reset to default">
              <Text style={styles.resetText}>Reset to Default</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel">
              <Text style={styles.cancel}>Cancel</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000A60',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  section: {
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#000A60',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  helpText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLabelContainer: {
    flex: 1,
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  rowDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  buttonGroup: {
    marginTop: 16,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#000A60',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancel: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
});
