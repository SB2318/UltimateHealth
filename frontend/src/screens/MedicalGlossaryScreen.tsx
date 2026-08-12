import React, {useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import Ionicon from '@expo/vector-icons/Ionicons';
import {glossaryTerms, GlossaryTerm} from '../constants/glossary';

import {YStack, XStack, Text, Input, useTheme, useThemeName} from 'tamagui';
import GlossaryBottomSheet from '../components/article/GlossaryBottomSheet';
import { PRIMARY_COLOR } from '../lib/ui/Theme';

const glossaryCategories = [...new Set(glossaryTerms.map(t => t.category).filter(Boolean))] as string[];

const MedicalGlossaryScreen = ({navigation}: any) => {
  const theme = useTheme();
  const themeName = useThemeName();
  const isDarkMode = themeName === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (selectedCategory) {
      terms = terms.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      terms = terms.filter(
        (t: GlossaryTerm) =>
          t.term.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query) ||
          (t.category && t.category.toLowerCase().includes(query)),
      );
    }

    return terms;
  }, [searchQuery, selectedCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term: GlossaryTerm) => {
      const cat = term.category || 'Other';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(term);
    });
    return Object.entries(groups).map(([title, data]) => ({title, data}));
  }, [filteredTerms]);

  const handleTermPress = useCallback((term: GlossaryTerm) => {
    setSelectedTerm(term);
    setBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
    setSelectedTerm(null);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const categoryTagBg = isDarkMode ? 'rgba(0, 191, 255, 0.15)' : 'rgba(0, 191, 255, 0.08)';

  const renderCategoryChip = useCallback(
    (category: string) => {
      const isActive = selectedCategory === category;
      return (
        <TouchableOpacity
          key={category}
          style={[
            styles.chip,
            {
              backgroundColor: isActive
                ? PRIMARY_COLOR
                : theme.backgroundLight?.val,
              borderColor: isActive
                ? PRIMARY_COLOR
                : theme.borderColor?.val,
            },
          ]}
          onPress={() =>
            setSelectedCategory(prev => (prev === category ? null : category))
          }
          accessibilityRole="button"
          accessibilityLabel={`Filter by ${category}${
            isActive ? ', currently active' : ''
          }`}>
          <Text
            fontSize={13}
            fontWeight="600"
            color={isActive ? '#FFFFFF' : theme.colorMuted?.val}>
            {category}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory, theme],
  );

  const renderTermItem = useCallback(
    ({item}: {item: GlossaryTerm}) => (
      <TouchableOpacity
        style={[
          styles.termCard,
          {
            backgroundColor: theme.backgroundLight?.val,
            borderColor: theme.borderColor?.val,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => handleTermPress(item)}
        accessibilityRole="button"
        accessibilityLabel={`View definition for ${item.term}`}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom={6}>
          <Text
            fontSize={16}
            fontWeight="700"
            flex={1}
            color={theme.color?.val}>
            {item.term}
          </Text>
          <Ionicon
            name="chevron-forward"
            size={18}
            color={theme.colorMuted?.val}
          />
        </XStack>
        {item.category && (
          <YStack
            alignSelf="flex-start"
            paddingHorizontal={10}
            paddingVertical={3}
            borderRadius={12}
            marginBottom={8}
            backgroundColor={categoryTagBg}>
            <Text
              fontSize={11}
              fontWeight="700"
              color={PRIMARY_COLOR}>
              {item.category}
            </Text>
          </YStack>
        )}
        <Text
          fontSize={14}
          lineHeight={20}
          color={theme.colorMuted?.val}
          numberOfLines={2}>
          {item.definition}
        </Text>
      </TouchableOpacity>
    ),
    [theme, handleTermPress, categoryTagBg],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: {title: string}}) => (
      <YStack paddingTop={12} paddingBottom={6} backgroundColor={theme.background?.val}>
        <Text
          fontSize={13}
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing={0.5}
          color={theme.colorMuted?.val}>
          {section.title}
        </Text>
      </YStack>
    ),
    [theme],
  );

  const renderEmptyState = useCallback(
    () => (
      <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical={60} paddingHorizontal={24}>
        <Ionicon name="book-outline" size={64} color={theme.colorMuted?.val} />
        <Text
          fontSize={20}
          fontWeight="700"
          marginTop={16}
          marginBottom={8}
          textAlign="center"
          color={theme.color?.val}>
          No terms found
        </Text>
        <Text
          fontSize={14}
          textAlign="center"
          lineHeight={20}
          color={theme.colorMuted?.val}>
          {searchQuery
            ? `No results for "${searchQuery}"`
            : 'No terms in this category'}
        </Text>
        {(searchQuery || selectedCategory) && (
          <TouchableOpacity
            style={[
              styles.clearFiltersButton,
              {backgroundColor: PRIMARY_COLOR},
            ]}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}>
            <Text color="#FFFFFF" fontSize={14} fontWeight="700">
              Clear Filters
            </Text>
          </TouchableOpacity>
        )}
      </YStack>
    ),
    [searchQuery, selectedCategory, theme],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background?.val}]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <YStack paddingHorizontal={16} paddingTop={8} paddingBottom={12} backgroundColor={theme.background?.val}>
        <XStack alignItems="center" justifyContent="space-between" marginBottom={12}>
          <TouchableOpacity
            style={[styles.backButton, {backgroundColor: theme.backgroundLight?.val}]}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back">
            <Ionicon name="arrow-back" size={22} color={theme.color?.val} />
          </TouchableOpacity>
          <YStack flex={1} alignItems="center">
            <Text fontSize={20} fontWeight="700" color={theme.color?.val}>
              Medical Glossary
            </Text>
          </YStack>
          <TouchableOpacity
            style={[styles.backButton, {backgroundColor: theme.backgroundLight?.val}]}
            onPress={() => navigation.navigate('HealthTermComparison')}
            accessibilityLabel="Compare health terms">
            <Ionicon name="git-compare-outline" size={22} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </XStack>

        <XStack
          alignItems="center"
          backgroundColor={theme.backgroundHover?.val}
          borderRadius={12}
          paddingHorizontal={12}
          paddingVertical={10}
          borderWidth={1}
          borderColor={theme.borderColor?.val}
          gap={8}>
          <Ionicon
            name="search-outline"
            size={20}
            color={theme.colorMuted?.val}
          />
          <Input
            flex={1}
            size="$5"
            placeholder="Search terms, definitions..."
            placeholderTextColor={theme.colorMuted?.val as string}
            borderWidth={0}
            backgroundColor="transparent"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            accessibilityLabel="Search medical glossary"
            color={theme.color?.val}
            fontSize={15}
            focusStyle={{
              borderColor: PRIMARY_COLOR,
              borderWidth: 1,
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              accessibilityLabel="Clear search">
              <Ionicon
                name="close-circle"
                size={20}
                color={theme.colorMuted?.val}
              />
            </TouchableOpacity>
          )}
        </XStack>
      </YStack>

      <YStack paddingBottom={4} backgroundColor={theme.background?.val}>
        <FlatList
          data={glossaryCategories}
          renderItem={({item}) => renderCategoryChip(item)}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipListContent}
        />
      </YStack>

      <YStack paddingHorizontal={16} paddingVertical={8} backgroundColor={theme.background?.val}>
        <Text fontSize={13} fontWeight="500" color={theme.colorMuted?.val}>
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
          {selectedCategory ? ` in ${selectedCategory}` : ''}
        </Text>
      </YStack>

      <SectionList
        sections={groupedTerms}
        renderItem={renderTermItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => `${item.term}-${index}`}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          filteredTerms.length === 0 && styles.listContentEmpty,
        ]}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      {selectedTerm && (
        <GlossaryBottomSheet
          visible={bottomSheetVisible}
          term={selectedTerm.term}
          definition={selectedTerm.definition}
          category={selectedTerm.category}
          relatedTerms={selectedTerm.relatedTerms}
          onClose={handleCloseBottomSheet}
        />
      )}
    </SafeAreaView>
  );
};

export default MedicalGlossaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipListContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  termCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    elevation: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  clearFiltersButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
});
