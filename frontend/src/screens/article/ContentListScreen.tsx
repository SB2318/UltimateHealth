import { StyleSheet, View, Text, Alert, useColorScheme, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, {useCallback, useState, useMemo} from 'react';
import {StatusBar} from 'expo-status-bar';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import ArticleCard from '../../components/article/ArticleCard';
import {useSelector} from 'react-redux';
import { useTheme } from 'tamagui';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArticleData} from '../../schemas/type';
import Loader from '../../components/common/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useGetProfile} from '../../hooks/profile/useGetProfile';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import {wp, hp, fp} from '../../lib/ui/Metric';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../schemas/type';

type Props = StackScreenProps<RootStackParamList, 'ContentListScreen'>;

const ContentListScreen = ({navigation, route}: Props) => {
  const initialType = route.params?.type || 'articles';
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {isConnected} = useSelector((state: any) => state.network);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'articles' | 'reposts' | 'saved'>(initialType);

  const {data: user, refetch, isLoading} = useGetProfile();

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleReportAction = (item: ArticleData) => {
    navigation.navigate('ReportScreen', {
      articleId: item._id,
      authorId: item.authorId as string,
      commentId: null,
      podcastId: null,
    });
  };

  const renderItem = useCallback(
    ({item}: {item: ArticleData}) => {
      return (
        <ArticleCard
          item={item}
          isSelected={selectedCardId === item._id}
          setSelectedCardId={setSelectedCardId}
          navigation={navigation}
          success={onRefresh}
          handleRepostAction={()=>{}}
          handleReportAction={handleReportAction}
          handleEditRequestAction={() => {}}
          source="profile"
        />
      );
    },
    [
      selectedCardId,
      navigation,
      onRefresh,
    ],
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.loadingContainer,
          {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#121212' : '#ffffff')},
        ]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Loader />
      </SafeAreaView>
    );
  }

  const themeColors = {
    background: isDarkMode ? '#121212' : '#ffffff',
    card: isDarkMode ? '#1f2937' : '#ffffff',
    border: isDarkMode ? '#374151' : '#e5e7eb',
    text: isDarkMode ? '#ffffff' : '#111827',
    textSecondary: isDarkMode ? '#9ca3af' : '#6b7280',
    iconBackground: isDarkMode ? '#374151' : '#f3f4f6',
  };

  const listData = useMemo(() => {
    if (!user) return [];
    if (selectedTab === 'articles') return user.articles || [];
    if (selectedTab === 'reposts') return user.repostArticles || [];
    if (selectedTab === 'saved') return user.savedArticles || [];
    return [];
  }, [user, selectedTab]);

  const renderTabs = () => (
    <View style={[styles.tabsContainer, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
      {(['articles', 'reposts', 'saved'] as const).map((tab) => {
        const isSelected = selectedTab === tab;
        const labels = {
          articles: 'Posts',
          reposts: 'Reposts',
          saved: 'Saved'
        };
        const counts = {
          articles: user?.articles?.length || 0,
          reposts: user?.repostArticles?.length || 0,
          saved: user?.savedArticles?.length || 0
        };
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isSelected ? { borderBottomColor: PRIMARY_COLOR } : {}]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, { color: isSelected ? PRIMARY_COLOR : themeColors.textSecondary }, isSelected ? styles.tabTextActive : {}]}>
              {labels[tab]}
            </Text>
            <Text style={[styles.tabCount, { color: isSelected ? PRIMARY_COLOR : themeColors.textSecondary }]}>
              {counts[tab]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcon 
        name={selectedTab === 'articles' ? 'file-document-outline' : selectedTab === 'reposts' ? 'repeat-variant' : 'bookmark-outline'} 
        size={64} 
        color={themeColors.textSecondary} 
        style={{ opacity: 0.5, marginBottom: hp(2) }}
      />
      <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
        No {selectedTab} yet.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme?.background?.val ?? themeColors.background},
      ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <FlatList
        data={listData}
        keyExtractor={(item: any, index: number) => item?._id?.toString() || index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(4) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_COLOR} />
        }
        ListHeaderComponent={renderTabs()}
        ListEmptyComponent={renderEmptyComponent}
      />
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
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: wp(2),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: wp(1.5),
  },
  tabText: {
    fontSize: fp(3.8),
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '700',
  },
  tabCount: {
    fontSize: fp(3.2),
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.2),
    borderRadius: 10,
    overflow: 'hidden',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(8),
  },
  emptyText: {
    fontSize: fp(4.2),
    fontWeight: '500',
  }
});
