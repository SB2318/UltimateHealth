/* eslint-disable @typescript-eslint/no-unused-vars */
 
// @ts-nocheck
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Text, StyleSheet, View,  ScrollView ,  TextInput , TouchableOpacity, useColorScheme } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CategoriesFlatlistModal from './CategoriesFlatlistModal';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {HomeScreenFilterModalProps} from '../../schemas/type';
import {INDIAN_LANGUAGES} from '../../constants/languages';
import {useTranslation} from '../../localization';

// Helper function to format date as DD/MM/YYY

// Main component
const FilterModal = ({
  bottomSheetModalRef,
  categories,
  handleCategorySelection,
  selectCategoryList,
  handleFilterReset,
  handleFilterApply,
  setSortingType,
  sortingType,
  selectedLanguages: externalSelectedLanguages,
  setSelectedLanguages: externalSetSelectedLanguages,
}: HomeScreenFilterModalProps) => {
  // Ref for second bottom sheet modal (category selection)
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();

  const sortBy = ['recent', 'popular', 'oldest'];
  const [selectedCategory, setSelectedCategory] = useState(sortingType || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedLanguages, setInternalSelectedLanguages] = useState<string[]>([]);

  // Sync local selectedCategory with prop sortingType when sortingType changes
  useEffect(() => {
    setSelectedCategory(sortingType || '');
  }, [sortingType]);

  // Use external state if provided, otherwise use internal state
  const selectedLanguages = externalSelectedLanguages ?? internalSelectedLanguages;
  const setSelectedLanguages = externalSetSelectedLanguages ?? setInternalSelectedLanguages;
  // Function to present the second bottom sheet modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);

  // Get safe area insets for top margin adjustment
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const themeColors = useMemo(() => ({
    bg: isDarkMode ? '#0F172A' : '#F9FAFB',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    headerBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    textPrimary: isDarkMode ? '#F8FAFC' : '#111827',
    textSecondary: isDarkMode ? '#94A3B8' : '#374151',
    textMuted: isDarkMode ? '#94A3B8' : '#6B7280',
    border: isDarkMode ? '#334155' : '#E5E7EB',
    chipBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    chipBorder: isDarkMode ? '#334155' : '#E5E7EB',
    inputBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    inputBorder: isDarkMode ? '#334155' : '#E5E7EB',
    footerBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    footerBorder: isDarkMode ? '#1E293B' : '#E5E7EB',
    selectedCountBg: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : '#EEF2FF',
    categorySelectedBg: isDarkMode ? 'rgba(99, 102, 241, 0.25)' : '#EEF2FF',
    handleColor: isDarkMode ? '#64748B' : '#CBD5E1',
  }), [isDarkMode]);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['20%', '65%', '95%'], []);

  // Close the bottom sheet modal
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef]);

  // Render backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  // Shuffle array helper function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filter and sort categories stably, showing only 2
  const filteredCategories = useMemo(() => {
    const filtered = !searchQuery.trim()
      ? categories
      : categories.filter(cat =>
          cat && cat.name && typeof cat.name === 'string' &&
          cat.name.toLowerCase().includes((searchQuery || '').toLowerCase())
        );

    // Sort stably to prevent random reshuffling on state updates/re-renders
    const sorted = [...filtered].sort((a, b) => {
      if (a.id !== undefined && b.id !== undefined) {
        return a.id - b.id;
      }
      return a.name.localeCompare(b.name);
    });
    return sorted.slice(0, 2);
  }, [categories, searchQuery]);

  // Handle language selection
  const toggleLanguage = (code: string) => {
    const next = selectedLanguages.includes(code)
      ? selectedLanguages.filter((lang: string) => lang !== code)
      : [...selectedLanguages, code];
    (setSelectedLanguages as any)(next);
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSelectedLanguages([]);
    handleFilterReset();
    handleDismissModalPress();
  };

  return (
    <BottomSheetModal
    //style={{backgroundColor: '#ffffff'}}
      ref={bottomSheetModalRef}
      index={1}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      stackBehavior="push"
      backgroundStyle={{backgroundColor: themeColors.bg}}
      handleIndicatorStyle={{backgroundColor: themeColors.handleColor}}
      style={{
        zIndex: 10,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        backgroundColor: themeColors.bg,
      }}>
      <BottomSheetView style={[styles.contentContainer, {backgroundColor: themeColors.bg}]}>
        <View style={[styles.header, {backgroundColor: themeColors.headerBg, borderBottomColor: themeColors.border}]}>
          <Text style={[styles.title, {color: themeColors.textPrimary}]}>{t('home.filtersAndSearch')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleDismissModalPress}
            accessibilityRole="button"
            accessibilityLabel="Close filters">
            <MaterialIcons name="close" size={24} color={themeColors.textMuted} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {/* Search Input */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                <MaterialIcons name="search" size={18} color={themeColors.textSecondary} /> {t('home.searchCategories')}
              </Text>
              <View style={[styles.searchContainer, {backgroundColor: themeColors.inputBg, borderColor: themeColors.inputBorder}]}>
                <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
                <TextInput
                  style={[styles.searchInput, {color: themeColors.textPrimary}]}
                  placeholder={t('home.searchCategoriesPlaceholder')}
                  placeholderTextColor={themeColors.textMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search">
                  <MaterialIcons name="close" size={20} color={themeColors.textMuted} />
                 </TouchableOpacity>
               )}
              </View>
            </View>
            {/* Sort By */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                <MaterialIcons name="sort" size={18} color={themeColors.textSecondary} /> {t('home.sortBy')}
              </Text>
              <View style={styles.chipContainer}>
                {sortBy.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.chip,
                      {backgroundColor: themeColors.chipBg, borderColor: themeColors.chipBorder},
                      selectedCategory === item && styles.chipSelected,
                    ]}
                    onPress={() => {
                      setSelectedCategory(item);
                      setSortingType(item);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Sort by ${item}`}>
                    <Text
                      style={[
                        styles.chipText,
                        {color: themeColors.textMuted},
                        selectedCategory === item && styles.chipTextSelected,
                      ]}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                    {selectedCategory === item && (
                      <MaterialIcons name="check-circle" size={16} color="white" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Language Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                <MaterialIcons name="language" size={18} color={themeColors.textSecondary} /> {t('home.language')}
              </Text>
              <View style={styles.chipContainer}>
                {INDIAN_LANGUAGES.map((lang, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.chip,
                      {backgroundColor: themeColors.chipBg, borderColor: themeColors.chipBorder},
                      selectedLanguages.includes(lang.code) && styles.chipSelected,
                    ]}
                    onPress={() => toggleLanguage(lang.code)}
                    accessibilityRole="button"
                    accessibilityLabel={`Select language: ${lang.name}`}>
                    <Text
                      style={[
                        styles.chipText,
                        {color: themeColors.textMuted},
                        selectedLanguages.includes(lang.code) && styles.chipTextSelected,
                      ]}>
                      {lang.name}
                    </Text>
                    {selectedLanguages.includes(lang.code) && (
                      <MaterialIcons name="check-circle" size={16} color="white" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              {selectedLanguages.length > 0 && (
                <View style={[styles.selectedCount, {backgroundColor: themeColors.selectedCountBg}]}>
                  <Text style={styles.selectedCountText}>
                    {t('home.languagesSelected', { count: selectedLanguages.length })}
                  </Text>
                </View>
              )}
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.sectionLabel}>
                  <MaterialIcons name="category" size={18} color={themeColors.textSecondary} /> {t('home.categories')}
                </Text>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={handlePresentModalPress}
                  accessibilityRole="button"
                  accessibilityLabel="See all categories">
                  <Text style={styles.seeAllText}>{t('common.seeAll')}</Text>
                  <MaterialIcons name="chevron-right" color={PRIMARY_COLOR} size={20} />
                </TouchableOpacity>
              </View>

              {selectCategoryList.length > 0 && (
                <View style={styles.selectedCategoriesContainer}>
                  <Text style={[styles.selectedCategoriesLabel, {color: themeColors.textMuted}]}>{t('home.selected')}</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.selectedCategoriesChips}>
                      {selectCategoryList.map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          style={styles.selectedCategoryChip}
                          onPress={() => handleCategorySelection(item)}
                          accessibilityRole="button"
                          accessibilityLabel={`Remove category: ${item.name}`}>
                          <Text style={styles.selectedCategoryChipText}>
                            {item.name}
                          </Text>
                          <MaterialIcons name="close" size={14} color="white" />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}

              <View style={styles.categoryGrid}>
                {filteredCategories.map((item) => {
                  const isSelected = selectCategoryList.some(i => 
                    (i.id !== undefined && item?.id !== undefined && i.id === item.id) ||
                    (i._id !== undefined && item?._id !== undefined && i._id === item._id) ||
                    (i.name === item?.name)
                  );
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={[
                        styles.categoryCard,
                        {backgroundColor: themeColors.cardBg, borderColor: themeColors.border},
                        isSelected && {backgroundColor: themeColors.categorySelectedBg, borderColor: PRIMARY_COLOR},
                      ]}
                      onPress={() => handleCategorySelection(item)}
                      accessibilityRole="button"
                      accessibilityLabel={
                        isSelected
                          ? `Selected category: ${item?.name}`
                          : `Select category: ${item?.name}`
                      }>
                      <Text
                        style={[
                          styles.categoryCardText,
                          {color: themeColors.textPrimary},
                          isSelected && styles.categoryCardTextSelected,
                        ]}>
                        {item?.name}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <MaterialIcons name="check" size={14} color="white" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {searchQuery && filteredCategories.length === 0 && (
                <View style={styles.noResults}>
                  <MaterialIcons name="search-off" size={32} color="#9ca3af" />
                  <Text style={[styles.noResultsText, {color: themeColors.textMuted}]}>{t('home.noCategoriesFound')}</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Footer Buttons - Fixed at bottom */}
        <View style={[styles.footer, { paddingBottom: insets.bottom, backgroundColor: themeColors.footerBg, borderTopColor: themeColors.footerBorder }]}>
          <TouchableOpacity
            style={[styles.resetButton, {backgroundColor: themeColors.cardBg, borderColor: PRIMARY_COLOR}]}
            onPress={handleReset}
            accessibilityRole="button"
            accessibilityLabel="Reset filters">
            <MaterialIcons name="refresh" size={20} color={PRIMARY_COLOR} />
            <Text style={styles.resetButtonText}>{t('common.reset')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              handleFilterApply();
              handleDismissModalPress();
            }}
            accessibilityRole="button"
            accessibilityLabel="Apply filters">
            <MaterialIcons name="check" size={20} color="white" />
            <Text style={styles.applyButtonText}>{t('common.applyFilters')}</Text>
          </TouchableOpacity>
        </View>

       

        <CategoriesFlatlistModal
          bottomSheetModalRef2={bottomSheetModalRef2}
          categories={categories}
          handleCategorySelection={handleCategorySelection}
          selectCategoryList={selectCategoryList}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FilterModal;

// Styles for the component
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  chipSelected: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  chipTextSelected: {
    color: 'white',
  },
  checkIcon: {
    marginLeft: 2,
  },
  selectedCount: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  selectedCountText: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  selectedCategoriesContainer: {
    marginBottom: 12,
  },
  selectedCategoriesLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  selectedCategoriesChips: {
    flexDirection: 'row',
    gap: 8,
  },
  selectedCategoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: PRIMARY_COLOR,
    gap: 6,
  },
  selectedCategoryChipText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    minWidth: '47%',
    flexGrow: 1,
  },
  categoryCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: PRIMARY_COLOR,
  },
  categoryCardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  categoryCardTextSelected: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noResultsText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    gap: 6,
  },
  resetButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: PRIMARY_COLOR,
    gap: 6,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});