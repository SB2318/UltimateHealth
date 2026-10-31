/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import ActivityOverview from '../../components/profile/ActivityOverview';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import UserArticleCard from '../../components/article/UserArticleCard';
import { useAppSelector } from '../../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { ArticleData, UserProfileScreenProp } from '../../schemas/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import Loader from '../../components/common/Loader';
import { useFocusEffect } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { useSocket } from '../../contexts/SocketContext';
import { useRequestArticleEdit } from '../../hooks/article/useRequestArticleEdit';
import { useUpdateFollowStatus } from '../../hooks/social/useUpdateFollowStatus';
import { useUpdateViewCount } from '../../hooks/article/useUpdateViewCount';
import { useGetAuthorProfile } from '../../hooks/profile/useGetAuthorProfile';
import { useGetTotalLikeViewStatus } from '../../hooks/analytics/useGetTotalLikeViewStatus';
import { NoArticleState } from '../../components/common/EmptyStates';

const TabsFlatList = Tabs.FlatList as any;

const UserProfileScreen = ({ navigation, route }: UserProfileScreenProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { authorId, userId, author_handle } = (route?.params || {}) as any;
  const { userId: routeUserId, userHandle: routeUserHandle } = (route?.params || {}) as any;
  const { user_id, user_handle } = useAppSelector((state: any) => state.user || {});
  const { isConnected } = useAppSelector((state: any) => state.network || {});
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [articleId, setArticleId] = useState<number>();
  const [recordId, setRecordId] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<string>('');

  const socket = useSocket();
  const { mutate: requestEdit, isPending: requestEditPending } = useRequestArticleEdit();
  const { mutate: followMutate } = useUpdateFollowStatus();
  const { mutate: updateViewCount } = useUpdateViewCount(articleId ?? 0);

  // Normalize authorId & handle
  const actualAuthorId =
    (typeof authorId === 'string' ? authorId : authorId?._id) ||
    routeUserId ||
    userId;

  const actualHandle = author_handle || routeUserHandle;

  const isOwnProfile = !actualAuthorId || String(actualAuthorId) === String(user_id);

  const {
    data: user,
    refetch,
    isLoading,
  } = useGetAuthorProfile(
    actualAuthorId,
    actualHandle,
    user_id,
    isConnected,
  );

  const isDoctor = user !== undefined ? user.isDoctor : false;

  const [localIsFollowing, setLocalIsFollowing] = useState<boolean | null>(null);
  const [localFollowerCount, setLocalFollowerCount] = useState<number | null>(null);

  useEffect(() => {
    if (user && user.followers) {
      const isFollow = user.followers.some(
        (u: any) =>
          (u?._id && String(u._id) === String(user_id)) ||
          String(u) === String(user_id),
      );
      setLocalIsFollowing(isFollow);
      setLocalFollowerCount(user.followers.length);
    }
  }, [user, user_id]);

  const { data: statsData } = useGetTotalLikeViewStatus({
    user_id: user_id,
    userId: actualAuthorId || user_id,
    others: true,
    isConnected: isConnected,
  });

  const articlePosted = user?.articles ? user.articles.length : 0;

  const onArticleViewed = ({
    articleId: vArticleId,
    authorId: viewedAuthorId,
    recordId: vRecordId,
  }: {
    articleId: number;
    authorId: string;
    recordId: string;
  }) => {
    if (isConnected) {
      setArticleId(vArticleId);
      setRecordId(vRecordId);

      updateViewCount(undefined, {
        onSuccess: async () => {
          navigation.navigate('ArticleScreen', {
            articleId: Number(vArticleId),
            authorId: viewedAuthorId,
            recordId: vRecordId,
          });
        },
        onError: error => {
          console.log('Update View Count Error', error);
          Alert.alert('Internal server error, try again!');
        },
      });
    } else {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch, actualAuthorId]),
  );

  const handleReportAction = useCallback(
    (item: ArticleData) => {
      navigation.navigate('ReportScreen', {
        articleId: String(item._id),
        authorId:
          typeof item.authorId === 'object' && item.authorId !== null
            ? String((item.authorId as any)._id)
            : String(item.authorId),
        commentId: null,
        podcastId: null,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ArticleData }) => {
      return (
        <UserArticleCard
          item={item}
          navigation={navigation}
          success={onRefresh}
          isSelected={String(selectedCardId) === String(item?._id)}
          setSelectedCardId={setSelectedCardId}
          handleRepostAction={() => {}}
          handleReportAction={handleReportAction}
          handleEditRequestAction={(it, _index, reason) => {
            if (isConnected) {
              requestEdit(
                {
                  articleId: String(it._id),
                  reason: reason,
                  articleRecordId: it.pb_recordId || '',
                },
                {
                  onSuccess: data => {
                    Snackbar.show({ text: data, duration: Snackbar.LENGTH_SHORT });
                  },
                  onError: () => {
                    Snackbar.show({ text: 'Try again!', duration: Snackbar.LENGTH_LONG });
                  },
                },
              );
            } else {
              Snackbar.show({
                text: 'Please check your internet connection!',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }}
          source="user-profile"
        />
      );
    },
    [handleReportAction, isConnected, navigation, onRefresh, selectedCardId, requestEdit],
  );

  const onFollowerClick = () => {
    if (user && user.followers?.length > 0) {
      navigation.navigate('SocialScreen', {
        type: 1,
        articleId: undefined,
        social_user_id: user._id,
      });
    }
  };

  const onFollowingClick = () => {
    if (isConnected) {
      if (user && user.followings?.length > 0) {
        navigation.navigate('SocialScreen', {
          type: 2,
          articleId: undefined,
          social_user_id: user._id,
        });
      }
    } else {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const handleFollow = () => {
    if (isConnected && actualAuthorId) {
      followMutate(actualAuthorId, {
        onSuccess: data => {
          if (data !== undefined) {
            if (localIsFollowing === false && data === true) {
              setLocalFollowerCount(prev => (prev !== null ? prev + 1 : prev));
            } else if (localIsFollowing === true && data === false) {
              setLocalFollowerCount(prev => (prev !== null ? Math.max(0, prev - 1) : prev));
            }
            setLocalIsFollowing(data);
          }
          if (data && socket) {
            socket.emit('notification', {
              type: 'userFollow',
              userId: actualAuthorId,
              message: {
                title: `${user_handle || 'Someone'} has followed you`,
                body: '',
              },
            });
          }
          onRefresh();
        },
        onError: () => {
          Snackbar.show({ text: 'Try again!', duration: Snackbar.LENGTH_SHORT });
        },
      });
    } else if (!isConnected) {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const renderHeader = () => {
    if (!user) {
      return <View />;
    }

    const authorUser = typeof authorId === 'object' && authorId !== null ? authorId : null;
    const displayName = user.user_name || authorUser?.user_name || 'Anonymous User';
    const displayHandle = user.user_handle || authorUser?.user_handle || '';
    const displayImg = user.Profile_image || authorUser?.Profile_image || '';
    const articlesPostedCount = user.articles ? user.articles.length : 0;

    return (
      <ProfileHeader
        isDoctor={isDoctor}
        username={displayName}
        userhandle={displayHandle}
        profileImg={displayImg}
        about={user.about}
        articlesPosted={articlesPostedCount}
        articlesSaved={user.savedArticles ? user.savedArticles.length : 0}
        userPhoneNumber={isDoctor ? user.contact_detail?.phone_no || '' : ''}
        userEmailID={isDoctor ? user.contact_detail?.email_id || '' : ''}
        specialization={user.specialization || ''}
        experience={user.Years_of_experience || 0}
        qualification={user.qualification || ''}
        navigation={navigation}
        other={isOwnProfile}
        followers={localFollowerCount !== null ? localFollowerCount : (user.followers?.length || 0)}
        followings={user.followings?.length || 0}
        onFollowerPress={onFollowerClick}
        onFollowingPress={onFollowingClick}
        isFollowing={
          localIsFollowing !== null
            ? localIsFollowing
            : Boolean(
                user.followers?.some(
                  (u: any) =>
                    (u?._id && String(u._id) === String(user_id)) ||
                    String(u) === String(user_id),
                ),
              )
        }
        onFollowClick={handleFollow}
        onOverviewClick={() => {}}
      />
    );
  };

  const renderTabBar = (props: any) => {
    return (
      <MaterialTabBar
        {...props}
        indicatorStyle={[styles.indicatorStyle, { backgroundColor: BUTTON_COLOR }]}
        style={[
          styles.tabBarStyle,
          {
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
          },
        ]}
        activeColor={BUTTON_COLOR}
        inactiveColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
        labelStyle={styles.labelStyle}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };

  const colors = {
    topBg: isDarkMode ? '#1E293B' : '#000A60',
    contentBg: isDarkMode ? '#111827' : '#FFFFFF',
  };

  if (isLoading || requestEditPending) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.topBg }]}>
        <StatusBar style="light" />
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.topBg }]} edges={['top']}>
      <StatusBar style="light" />

      {/* ── Professional Top Navigation Bar ── */}
      <View style={[styles.topBar, { backgroundColor: colors.topBg }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {user?.user_name ? `${user.user_name}` : 'Profile'}
        </Text>
        <View style={styles.topBarSpacer} />
      </View>

      <View style={[styles.innerContainer, { backgroundColor: colors.contentBg }]}>
        <Tabs.Container
          renderHeader={renderHeader}
          renderTabBar={renderTabBar}
          containerStyle={[styles.tabsContainer, { backgroundColor: colors.contentBg }]}>
          {/* Tab 1: Insight */}
          <Tabs.Tab name="Insight">
            <Tabs.ScrollView
              automaticallyAdjustContentInsets={true}
              contentInsetAdjustmentBehavior="always"
              contentContainerStyle={styles.scrollViewContentContainer}>
              <ActivityOverview
                onArticleViewed={onArticleViewed}
                others={true}
                userId={actualAuthorId || user?._id || user_id}
                user_handle={user?.user_handle || ''}
                articlePosted={articlePosted}
              />
            </Tabs.ScrollView>
          </Tabs.Tab>

          {/* Tab 2: Articles */}
          <Tabs.Tab name="Articles">
            <TabsFlatList
              data={user?.articles || []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                { paddingBottom: 25 },
              ]}
              keyExtractor={(item: ArticleData, index: number) =>
                item?._id?.toString() || index.toString()
              }
              refreshing={refreshing}
              ListEmptyComponent={<NoArticleState />}
            />
          </Tabs.Tab>

          {/* Tab 3: Reposts */}
          <Tabs.Tab name="Reposts">
            <TabsFlatList
              data={user?.repostArticles || []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                { paddingBottom: 25 },
              ]}
              keyExtractor={(item: ArticleData, index: number) =>
                item?._id?.toString() || index.toString()
              }
              refreshing={refreshing}
              ListEmptyComponent={<NoArticleState />}
            />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  topBarSpacer: {
    width: 38,
    height: 38,
  },
  innerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  tabsContainer: {
    overflow: 'hidden',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 8,
    marginTop: 12,
    flexGrow: 1,
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  indicatorStyle: {
    height: 3,
    borderRadius: 3,
  },
  tabBarStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  labelStyle: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },
  contentContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
