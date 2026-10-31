/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from '../../schemas/type';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import {
  ReadingHistoryItem,
  getReadingHistory,
  clearReadingHistory,
} from '../../lib/services/ReadingHistoryService';

type Props = StackScreenProps<RootStackParamList, 'ReadingHistoryScreen'>;

function timeAgo(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

interface RowProps {
  item: ReadingHistoryItem;
  onPress: (item: ReadingHistoryItem) => void;
  isDark: boolean;
  colors: {
    cardBg: string;
    border: string;
    title: string;
    meta: string;
    time: string;
    thumbnailPlaceholder: string;
    chevron: string;
  };
}

const HistoryRow = React.memo(({ item, onPress, isDark, colors }: RowProps) => (
  <TouchableOpacity
    style={[
      styles.card,
      {
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
      },
    ]}
    onPress={() => onPress(item)}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={`Open article: ${item.title}`}
    accessibilityHint="Opens this article">
    {item.coverImage ? (
      <Image
        source={{ uri: item.coverImage }}
        style={styles.thumbnail}
        accessibilityLabel={`Cover for ${item.title}`}
      />
    ) : (
      <View
        style={[
          styles.thumbnail,
          styles.thumbnailPlaceholder,
          { backgroundColor: colors.thumbnailPlaceholder },
        ]}>
        <Ionicons
          name="newspaper-outline"
          size={24}
          color={isDark ? '#94A3B8' : '#94A3B8'}
        />
      </View>
    )}

    <View style={styles.cardContent}>
      {item.category ? (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
        </View>
      ) : null}

      <Text style={[styles.title, { color: colors.title }]} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.authorGroup}>
          <Ionicons
            name="person-circle-outline"
            size={14}
            color={colors.meta}
          />
          <Text
            style={[styles.authorName, { color: colors.meta }]}
            numberOfLines={1}>
            {item.authorName || 'Healthcare Contributor'}
          </Text>
        </View>

        <View style={styles.timeGroup}>
          <Ionicons name="time-outline" size={13} color={colors.time} />
          <Text style={[styles.timeText, { color: colors.time }]}>
            {timeAgo(item.viewedAt)}
          </Text>
        </View>
      </View>
    </View>

    <Ionicons
      name="chevron-forward"
      size={18}
      color={colors.chevron}
      style={styles.chevron}
    />
  </TouchableOpacity>
));

HistoryRow.displayName = 'HistoryRow';

const ReadingHistoryScreen = ({ navigation }: Props) => {
  const isDark = useColorScheme() === 'dark';
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      setHistory(getReadingHistory());
    }, []),
  );

  const colors = useMemo(
    () => ({
      bg: isDark ? '#0B0F19' : '#F8FAFC',
      headerBg: isDark ? '#111827' : '#FFFFFF',
      cardBg: isDark ? '#1E293B' : '#FFFFFF',
      border: isDark ? '#1F2937' : '#E2E8F0',
      title: isDark ? '#F8FAFC' : '#0F172A',
      meta: isDark ? '#94A3B8' : '#64748B',
      time: isDark ? '#64748B' : '#94A3B8',
      thumbnailPlaceholder: isDark ? '#334155' : '#F1F5F9',
      chevron: isDark ? '#64748B' : '#CBD5E1',
      backBtnBg: isDark ? '#1F2937' : '#F1F5F9',
      backBtnIcon: isDark ? '#F8FAFC' : '#0F172A',
    }),
    [isDark],
  );

  const handleClear = useCallback(() => {
    Alert.alert(
      'Clear Reading History',
      'This will remove all recently viewed articles from your reading history.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearReadingHistory();
            setHistory([]);
          },
        },
      ],
    );
  }, []);

  const handleRowPress = useCallback(
    (item: ReadingHistoryItem) => {
      navigation.navigate('ArticleScreen', {
        articleId: Number(item.articleId),
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ReadingHistoryItem }) => (
      <HistoryRow
        item={item}
        onPress={handleRowPress}
        isDark={isDark}
        colors={colors}
      />
    ),
    [handleRowPress, isDark, colors],
  );

  const keyExtractor = useCallback(
    (item: ReadingHistoryItem, index: number) =>
      item.articleId ? `${item.articleId}-${item.viewedAt}` : index.toString(),
    [],
  );

  const renderHeader = () => {
    if (history.length === 0) return null;

    return (
      <View style={styles.subHeader}>
        <Text style={[styles.subHeaderTitle, { color: colors.meta }]}>
          RECENTLY VIEWED
        </Text>
        <View
          style={[
            styles.countPill,
            { backgroundColor: isDark ? '#1E293B' : '#EFF6FF' },
          ]}>
          <Text style={[styles.countText, { color: BUTTON_COLOR }]}>
            {history.length} {history.length === 1 ? 'article' : 'articles'}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyCard,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
          },
        ]}>
        <View
          style={[
            styles.emptyIconCircle,
            { backgroundColor: isDark ? '#1E293B' : '#EFF6FF' },
          ]}>
          <Ionicons name="time-outline" size={40} color={BUTTON_COLOR} />
        </View>

        <Text style={[styles.emptyTitle, { color: colors.title }]}>
          No reading history yet
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.meta }]}>
          Articles you open and read will automatically appear here so you can
          easily revisit them anytime.
        </Text>

        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Explore Articles">
          <Ionicons name="compass-outline" size={18} color="#FFFFFF" />
          <Text style={styles.exploreButtonText}>Explore Articles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.headerBg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBg}
      />

      {/* ── Professional Navigation Header ── */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: colors.headerBg,
            borderBottomColor: colors.border,
          },
        ]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.backBtnBg }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to settings">
          <Ionicons name="arrow-back" size={22} color={colors.backBtnIcon} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.title }]}>
            Reading History
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.meta }]}
            numberOfLines={1}>
            Articles you recently explored
          </Text>
        </View>

        {history.length > 0 && (
          <TouchableOpacity
            style={styles.clearPill}
            onPress={handleClear}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Clear reading history">
            <Ionicons name="trash-outline" size={15} color="#EF4444" />
            <Text style={styles.clearPillText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Main List ── */}
      <View style={[styles.mainBody, { backgroundColor: colors.bg }]}>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={[
            styles.listContent,
            history.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          accessibilityLabel="Reading history list"
        />
      </View>
    </SafeAreaView>
  );
};

export default ReadingHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  clearPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearPillText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  mainBody: {
    flex: 1,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  subHeaderTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: 12,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  thumbnailPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 82, 186, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    color: BUTTON_COLOR,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  authorGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 8,
  },
  authorName: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 4,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BUTTON_COLOR,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
