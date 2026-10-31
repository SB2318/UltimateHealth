import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import {Category} from '../../schemas/type';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';

const INITIAL_VISIBLE_TAGS = 12;

export const isSameCategory = (a: Category, b: Category): boolean => {
  if (!a || !b) return false;
  if (a.id !== undefined && b.id !== undefined && a.id === b.id) {
    return true;
  }
  if (a._id !== undefined && b._id !== undefined && a._id === b._id) {
    return true;
  }
  if (
    a.id === undefined &&
    b.id === undefined &&
    a._id === undefined &&
    b._id === undefined &&
    Boolean(a.name) &&
    a.name === b.name
  ) {
    return true;
  }
  return false;
};

interface TagSelectorSectionProps {
  categories: Category[];
  selectedGenres: Category[];
  onToggleGenre: (genre: Category) => void;
  onClearAll?: () => void;
  maxSelection?: number;
  subtitle?: string;
  errorText?: string;
}

const TagSelectorSection: React.FC<TagSelectorSectionProps> = ({
  categories = [],
  selectedGenres = [],
  onToggleGenre,
  onClearAll,
  maxSelection = 5,
  subtitle = 'Select up to 5 tags to help people discover your content',
  errorText,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  const isSelected = (genre: Category) =>
    selectedGenres.some(item => isSameCategory(item, genre));

  const normalizedQuery = searchQuery.trim().replace(/^#/, '').toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) {
      return categories;
    }
    return categories.filter(cat =>
      (cat?.name || '').toLowerCase().includes(normalizedQuery),
    );
  }, [categories, normalizedQuery]);

  const displayedCategories = useMemo(() => {
    if (normalizedQuery || showAllTags) {
      return filteredCategories;
    }
    return filteredCategories.slice(0, INITIAL_VISIBLE_TAGS);
  }, [filteredCategories, normalizedQuery, showAllTags]);

  const hasMoreTags =
    !normalizedQuery && filteredCategories.length > INITIAL_VISIBLE_TAGS;
  const isAtLimit = selectedGenres.length >= maxSelection;

  return (
    <View style={styles.section}>
      {/* Header Row with Counter Badge */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>
            <Ionicon
              name="pricetag-outline"
              size={18}
              color="#222"
              accessible={false}
            />{' '}
            Tags
          </Text>
        </View>

        <View
          style={[
            styles.counterBadge,
            isAtLimit && styles.counterBadgeLimit,
            selectedGenres.length > 0 && !isAtLimit && styles.counterBadgeActive,
          ]}>
          <Text
            style={[
              styles.counterBadgeText,
              isAtLimit && styles.counterBadgeTextLimit,
              selectedGenres.length > 0 &&
                !isAtLimit &&
                styles.counterBadgeTextActive,
            ]}>
            {selectedGenres.length}/{maxSelection} selected
          </Text>
        </View>
      </View>

      <Text style={styles.sectionSubtitle}>{subtitle}</Text>

      {/* Selected Tags Area */}
      {selectedGenres.length > 0 && (
        <View style={styles.selectedSection}>
          <View style={styles.selectedHeaderRow}>
            <Text style={styles.selectedLabel}>Selected Tags</Text>
            {selectedGenres.length > 1 && onClearAll && (
              <TouchableOpacity
                onPress={onClearAll}
                accessibilityRole="button"
                accessibilityLabel="Clear all selected tags">
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.selectedGenresWrapper}>
            {selectedGenres.map((genre, index) => (
              <TouchableOpacity
                key={`selected-${genre._id || genre.id || genre.name}-${index}`}
                style={styles.selectedGenreChip}
                activeOpacity={0.75}
                onPress={() => onToggleGenre(genre)}
                accessibilityRole="button"
                accessibilityLabel={`Remove tag ${genre.name}`}
                accessibilityHint={`Removes ${genre.name} from selected tags`}>
                <Text style={styles.selectedGenreChipText}>#{genre.name}</Text>
                <Ionicon
                  name="close-circle"
                  size={18}
                  color={PRIMARY_COLOR}
                  accessible={false}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicon
          name="search-outline"
          size={18}
          color="#6B7280"
          style={styles.searchIcon}
          accessible={false}
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tags (e.g., Nutrition, Fitness)..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Search tags"
          accessibilityHint="Filter available tags by name"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearSearchButton}
            accessibilityRole="button"
            accessibilityLabel="Clear tag search">
            <Ionicon name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search result count / Limit hint */}
      {(Boolean(normalizedQuery) || isAtLimit) && (
        <View style={styles.metaHintRow}>
          {Boolean(normalizedQuery) ? (
            <Text style={styles.metaHintText}>
              Showing {filteredCategories.length} matching{' '}
              {filteredCategories.length === 1 ? 'tag' : 'tags'}
            </Text>
          ) : (
            <View />
          )}
          {isAtLimit && (
            <Text style={styles.limitReachedText}>
              Maximum {maxSelection} tags reached
            </Text>
          )}
        </View>
      )}

      {/* Wrapped Tag Chips Grid */}
      {displayedCategories.length > 0 ? (
        <View style={styles.genreWrapContainer}>
          {displayedCategories.map((genre: Category, index: number) => {
            const selected = isSelected(genre);
            const disabledByLimit = !selected && isAtLimit;

            return (
              <TouchableOpacity
                key={`tag-${genre._id || genre.id || genre.name}-${index}`}
                style={[
                  styles.genreButton,
                  selected && styles.selectedGenreButton,
                  disabledByLimit && styles.disabledGenreButton,
                ]}
                activeOpacity={0.75}
                onPress={() => onToggleGenre(genre)}
                accessibilityRole="checkbox"
                accessibilityLabel={`Tag ${genre.name}`}
                accessibilityHint={
                  selected
                    ? `Removes ${genre.name} from selected tags`
                    : `Adds ${genre.name} to selected tags`
                }
                accessibilityState={{
                  checked: selected,
                  disabled: disabledByLimit,
                }}>
                <Text
                  style={[
                    styles.genreButtonText,
                    selected && styles.selectedGenreButtonText,
                    disabledByLimit && styles.disabledGenreButtonText,
                  ]}>
                  #{genre.name}
                </Text>
                {selected && (
                  <Ionicon
                    name="checkmark-circle"
                    size={16}
                    color="#fff"
                    style={styles.selectedCheckIcon}
                    accessible={false}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptySearchContainer}>
          <Ionicon name="pricetags-outline" size={28} color="#9CA3AF" />
          <Text style={styles.emptySearchTitle}>
            No tags found for "{searchQuery.trim()}"
          </Text>
          {searchQuery.trim().length > 0 && (
            <TouchableOpacity
              style={styles.resetSearchBtn}
              onPress={() => setSearchQuery('')}>
              <Text style={styles.resetSearchBtnText}>Clear search</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Expand / Collapse Toggle */}
      {hasMoreTags && (
        <TouchableOpacity
          style={styles.expandToggleBtn}
          onPress={() => setShowAllTags(prev => !prev)}
          accessibilityRole="button"
          accessibilityLabel={
            showAllTags ? 'Show fewer tags' : 'Show all available tags'
          }>
          <Text style={styles.expandToggleText}>
            {showAllTags
              ? 'Show less'
              : `Show all ${filteredCategories.length} tags (+${
                  filteredCategories.length - INITIAL_VISIBLE_TAGS
                } more)`}
          </Text>
          <Ionicon
            name={showAllTags ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={PRIMARY_COLOR}
          />
        </TouchableOpacity>
      )}

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  counterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  counterBadgeActive: {
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
    borderColor: 'rgba(0, 191, 255, 0.35)',
  },
  counterBadgeLimit: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  counterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  counterBadgeTextActive: {
    color: '#0284C7',
  },
  counterBadgeTextLimit: {
    color: '#B45309',
  },
  selectedSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  clearAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
  selectedGenresWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedGenreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 191, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 255, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 6,
  },
  selectedGenreChipText: {
    color: '#0369A1',
    fontSize: 14,
    fontWeight: '600',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 0,
  },
  clearSearchButton: {
    padding: 4,
    marginLeft: 4,
  },
  metaHintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaHintText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  limitReachedText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  genreWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 4,
  },
  genreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  genreButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedGenreButton: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  selectedGenreButtonText: {
    color: '#fff',
  },
  selectedCheckIcon: {
    marginLeft: 5,
  },
  disabledGenreButton: {
    opacity: 0.45,
    backgroundColor: '#F9FAFB',
  },
  disabledGenreButtonText: {
    color: '#9CA3AF',
  },
  emptySearchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
  },
  emptySearchTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 6,
  },
  resetSearchBtn: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
  },
  resetSearchBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  expandToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  expandToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0284C7',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
    marginLeft: 2,
  },
});

export default TagSelectorSection;
