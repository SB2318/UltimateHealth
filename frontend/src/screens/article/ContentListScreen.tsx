/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import ArticleCard from '../../components/article/ArticleCard';
import { ArticleData, RootStackParamList } from '../../schemas/type';
import Loader from '../../components/common/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { useGetProfile } from '../../hooks/profile/useGetProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
import { wp, hp, fp } from '../../lib/ui/Metric';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'ContentListScreen'>;

type ContentTabType = 'articles' | 'reposts' | 'saved';

interface TabConfig {
  key: ContentTabType;
  label: string;
  sublabel: string;
  icon: keyof typeof Ionicons.glyphMap;
  emptyTitle: string;
  emptySubtitle: string;
  emptyActionLabel?: string;
}

const TABS: TabConfig[] = [
  {
    key: 'articles',
    label: 'Own',
    sublabel: 'Your published health posts',
    icon: 'document-text-outline',
    emptyTitle: 'No articles published yet',
    emptySubtitle: 'Share your clinical insights, health guides or experiences with the community.',
    emptyActionLabel: 'Write an Article',
  },
  {
    key: 'reposts',
    label: 'Reposts',
    sublabel: 'Articles you shared',
    icon: 'repeat-outline',
    emptyTitle: 'No reposted articles',
    emptySubtitle: 'Find noteworthy health articles in the feed and repost them to your profile.',
    emptyActionLabel: 'Explore Feed',
  },
  {
    key: 'saved',
    label: 'Saved',
    sublabel: 'Your private reading list',
    icon: 'bookmark-outline',
    emptyTitle: 'Reading list is empty',
    emptySubtitle: 'Save articles you want to read later or keep for reference.',
    emptyActionLabel: 'Discover Articles',
  },
];

const ContentListScreen = ({ navigation, route }: Props) => {
  const initialType = (route.params?.type as ContentTabType) || 'articles';
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<ContentTabType>(initialType);

  const { data: user, refetch, isLoading } = useGetProfile();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleReportAction = useCallback(
    (item: ArticleData) => {
      navigation.navigate('ReportScreen', {
        articleId: item._id,
        authorId: item.authorId as string,
        commentId: null,
        podcastId: null,
      });
    },
    [navigation],
  );

  const colors = useMemo(
    () => ({
      bg: isDarkMode ? '#0B0F19' : '#F8FAFC',
      headerBg: isDarkMode ? '#111827' : '#FFFFFF',
      surface: isDarkMode ? '#1E293B' : '#FFFFFF',
      border: isDarkMode ? '#1F2937' : '#E2E8F0',
      textPrimary: isDarkMode ? '#F8FAFC' : '#0F172A',
      textSecondary: isDarkMode ? '#94A3B8' : '#64748B',
      tabInactiveBg: isDarkMode ? '#1F2937' : '#F1F5F9',
      tabInactiveText: isDarkMode ? '#94A3B8' : '#475569',
      badgeInactiveBg: isDarkMode ? '#374151' : '#E2E8F0',
      badgeInactiveText: isDarkMode ? '#CBD5E1' : '#475569',
      backBtnBg: isDarkMode ? '#1F2937' : '#F1F5F9',
      backBtnIcon: isDarkMode ? '#F8FAFC' : '#0F172A',
      emptyCardBg: isDarkMode ? '#111827' : '#FFFFFF',
    }),
    [isDarkMode],
  );

  const listData = useMemo(() => {
    if (!user) return [];
    if (selectedTab === 'articles') return user.articles || [];
    if (selectedTab === 'reposts') return user.repostArticles || [];
    if (selectedTab === 'saved') return user.savedArticles || [];
    return [];
  }, [user, selectedTab]);

  const counts: Record<ContentTabType, number> = useMemo(
    () => ({
      articles: user?.articles?.length || 0,
      reposts: user?.repostArticles?.length || 0,
      saved: user?.savedArticles?.length || 0,
    }),
    [user],
  );

  const currentTabConfig = useMemo(
    () => TABS.find((t) => t.key === selectedTab) || TABS[0],
    [selectedTab],
  );

  const renderItem = useCallback(
    ({ item }: { item: ArticleData }) => {
      return (
        <View style={styles.cardWrapper}>
          <ArticleCard
            item={item}
            isSelected={selectedCardId === item._id}
            setSelectedCardId={setSelectedCardId}
            navigation={navigation}
            success={onRefresh}
            handleRepostAction={() => {}}
            handleReportAction={handleReportAction}
            handleEditRequestAction={() => {}}
            source="profile"
          />
        </View>
      );
    },
    [selectedCardId, navigation, onRefresh, handleReportAction],
  );

  const handleEmptyAction = useCallback(() => {
    if (selectedTab === 'articles') {
      navigation.navigate('EditorScreen');
    } else {
      navigation.navigate('Home');
    }
  }, [selectedTab, navigation]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyCard,
          {
            backgroundColor: colors.emptyCardBg,
            borderColor: colors.border,
          },
        ]}>
        <View
          style={[
            styles.emptyIconCircle,
            { backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF' },
          ]}>
          <Ionicons
            name={currentTabConfig.icon}
            size={38}
            color={BUTTON_COLOR}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
          {currentTabConfig.emptyTitle}
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          {currentTabConfig.emptySubtitle}
        </Text>

        {currentTabConfig.emptyActionLabel && (
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={handleEmptyAction}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={currentTabConfig.emptyActionLabel}>
            <Ionicons
              name={selectedTab === 'articles' ? 'create-outline' : 'compass-outline'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.emptyButtonText}>
              {currentTabConfig.emptyActionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.listHeaderWrapper}>
      {/* ── Subheader Segmented Tabs (Own, Reposts, Saved) ── */}
      <View
        style={[
          styles.segmentedControl,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
        accessibilityRole="tablist">
        {TABS.map((tab) => {
          const isSelected = selectedTab === tab.key;
          const count = counts[tab.key];

          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                {
                  backgroundColor: isSelected
                    ? BUTTON_COLOR
                    : colors.tabInactiveBg,
                },
              ]}
              onPress={() => setSelectedTab(tab.key)}
              activeOpacity={0.8}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isSelected }}
              accessibilityHint={`Shows your ${tab.label.toLowerCase()} articles`}>
              <Ionicons
                name={tab.icon}
                size={16}
                color={isSelected ? '#FFFFFF' : colors.tabInactiveText}
                style={styles.tabIcon}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isSelected ? '#FFFFFF' : colors.tabInactiveText,
                    fontWeight: isSelected ? '700' : '600',
                  },
                ]}>
                {tab.label}
              </Text>

              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isSelected
                      ? 'rgba(255, 255, 255, 0.25)'
                      : colors.badgeInactiveBg,
                  },
                ]}>
                <Text
                  style={[
                    styles.countText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.badgeInactiveText,
                    },
                  ]}>
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Section Info Bar ── */}
      <View style={styles.sectionInfoBar}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          {currentTabConfig.sublabel}
        </Text>
        <Text style={[styles.sectionCount, { color: colors.textSecondary }]}>
          {listData.length} {listData.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView
        edges={['top']}
        style={[styles.loadingContainer, { backgroundColor: colors.bg }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.headerBg}
        />
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.headerBg }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
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
          accessibilityHint="Returns to previous screen">
          <Ionicons name="arrow-back" size={22} color={colors.backBtnIcon} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            My Content
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
            numberOfLines={1}>
            Posts, reposts & saved library
          </Text>
        </View>

        <View style={styles.headerRightSpacer}>
          <View
            style={[
              styles.iconPill,
              { backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF' },
            ]}>
            <Ionicons name="library-outline" size={18} color={BUTTON_COLOR} />
          </View>
        </View>
      </View>

      {/* ── Content Area ── */}
      <View style={[styles.mainBody, { backgroundColor: colors.bg }]}>
        <FlatList
          data={listData}
          keyExtractor={(item: any, index: number) =>
            item?._id?.toString() || index.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            listData.length === 0 && styles.listContentEmpty,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={BUTTON_COLOR}
              colors={[BUTTON_COLOR]}
            />
          }
          ListHeaderComponent={renderHeader()}
          ListEmptyComponent={renderEmptyComponent}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerRightSpacer: {
    marginLeft: 8,
  },
  iconPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBody: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: hp(5),
  },
  listContentEmpty: {
    justifyContent: 'flex-start',
  },
  listHeaderWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    gap: 5,
  },
  tabIcon: {
    marginRight: 2,
  },
  tabLabel: {
    fontSize: fp(3.5),
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: fp(2.8),
    fontWeight: '700',
  },
  sectionInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingTop: hp(4),
    paddingBottom: hp(6),
  },
  emptyCard: {
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
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 12,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BUTTON_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
