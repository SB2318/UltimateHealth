import { StyleSheet, View, Text, Alert, useColorScheme, FlatList, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import React, {useCallback, useState, useMemo} from 'react';
import {StatusBar} from 'expo-status-bar';
import {PRIMARY_COLOR} from '../helper/Theme';
import ArticleCard from '../components/ArticleCard';
import {useDispatch, useSelector} from 'react-redux';
import { useTheme } from 'tamagui';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileHeader from '../components/ProfileHeader';
import {ArticleData, ProfileScreenProps} from '../type';
import Loader from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {setUserHandle} from '../store/UserSlice';
import {useGetProfile} from '../hooks/useGetProfile';
import {useUpdateViewCount} from '../hooks/useUpdateViewCount';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import {wp, hp, fp} from '../helper/Metric';
const AccessibleTouchable = TouchableOpacity as any;

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {user_id} = useSelector((state: any) => state.user);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {isConnected} = useSelector((state: any) => state.network);
  const [articleId, setArticleId] = useState<number>();
  const [authorId, setAuthorId] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'articles' | 'reposts' | 'saved'>('articles');
  const dispatch = useDispatch();
  const {mutate: updateViewCount} =
    useUpdateViewCount(articleId ?? 0);

  const {data: user, refetch, isLoading} = useGetProfile();

 // console.log('user data in profile screen', user);

  React.useEffect(() => {
    if (user) {
       
      dispatch(setUserHandle(user.user_handle));
    }
  }, [dispatch, user]);
  const onArticleViewed = ({
    articleId,
    authorId,
    recordId,
  }: {
    articleId: number;
    authorId: string;
    recordId: string;
  }) => {
    if (isConnected) {
      setArticleId(articleId);
      setAuthorId(authorId);
      setRecordId(recordId);

      updateViewCount(Number(articleId), {
        onSuccess: async () => {
          navigation.navigate('ArticleScreen', {
            articleId: Number(articleId),
            authorId: authorId,
            recordId: recordId,
          });
        },

        onError: () => {
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


  const isDoctor = user !== undefined ? user.isDoctor : false;
  const bottomBarHeight = useBottomTabBarHeight();

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


  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      handleReportAction,
    ],
  );

  const onFollowerClick = () => {
    if (isConnected) {
      if (user && (user.followers?.length ?? 0) > 0) {
        //dispatch(setSocialUserId(''));
        navigation.navigate('SocialScreen', {
          type: 1,
          articleId: undefined,
          social_user_id: undefined,
        });
      }
    } else {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const onFollowingClick = () => {
    if (isConnected) {
      if (user && (user.followings?.length ?? 0) > 0) {
        // dispatch(setSocialUserId(''));
        navigation.navigate('SocialScreen', {
          type: 2,
          articleId: undefined,
          social_user_id: undefined,
        });
      }
    } else {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const renderHeader = () => {
    if (user === undefined) {
      return null;
    }

    return (
      <ProfileHeader
        isDoctor={isDoctor}
        username={user.user_name ||  ""}
        userhandle={user.user_handle ||  ''}
        profileImg={
          user.Profile_image ||
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
        articlesPosted={user.articles ? user.articles.length : 0}
        articlesSaved={user.savedArticles ? user.savedArticles.length : 0}
        userPhoneNumber={isDoctor ? user.contact_detail?.phone_no || '' : ''}
        userEmailID={isDoctor ? user.contact_detail?.email_id || '' : ''}
        specialization={user.specialization || ''}
        experience={user.Years_of_experience || 0}
        qualification={user.qualification || ''}
        navigation={navigation}
        other={true}
        followers={user ? (user.followers?.length ?? 0) : 0}
        followings={user ? (user.followings?.length ?? 0) : 0}
        onFollowerPress={onFollowerClick}
        onFollowingPress={onFollowingClick}
        isFollowing={false}
        onFollowClick={() => {}}
        onOverviewClick={() => {
          if (user) {
            if (isConnected) {
              navigation.navigate('OverviewScreen');
            } else {
              Snackbar.show({
                text: 'Please check your internet connection!',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }
        }}
      />
    );
  };



  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.loadingContainer,
          {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#121212' : '#ffffff')},
        ]}>
        <StatusBar
          style={isDarkMode ? 'light' : 'dark'}
        />
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

  const navigate = (screen: any) => {
    if (isConnected) {
      navigation.navigate(screen);
    } else {
      Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
    }
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
        {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#000A60' : PRIMARY_COLOR)},
      ]}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
      />

      {/* Settings shortcut — top-right gear icon */}
      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={() => navigation.navigate('SettingsScreen')}
        accessibilityLabel="Open Settings"
        accessibilityHint="Navigate to app settings"
      >
        <MaterialCommunityIcon name="cog-outline" size={26} color="white" />
      </TouchableOpacity>

      <FlatList
        data={listData}
        keyExtractor={(item: any, index: number) => item?._id?.toString() || index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: themeColors.background, paddingBottom: hp(4) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_COLOR} />
        }
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderTabs()}
          </View>
        }
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CAFFF',
  },
  innerContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsBtn: {
    position: 'absolute',
    top: hp(6),
    right: wp(4),
    zIndex: 100,
    padding: 6,
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