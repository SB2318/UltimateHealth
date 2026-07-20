/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
import { StyleSheet, View, Text, Alert, useColorScheme, ScrollView, TouchableOpacity } from 'react-native';
import React, {useCallback, useState} from 'react';
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

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#000A60' : PRIMARY_COLOR)},
      ]}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
      />
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={{flexGrow: 1, backgroundColor: themeColors.background}}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}

        <View style={styles.workspaceSection}>

          <AccessibleTouchable
            activeOpacity={0.7}
            accessibilityLabel="Insight"
            accessibilityHint="Opens your activity insight"
            style={[styles.listButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}
            onPress={() => navigate('InsightScreen')}>
            <View style={[styles.listButtonIconBg, {backgroundColor: themeColors.iconBackground}]}>
              <MaterialCommunityIcon name="chart-line" size={22} color={PRIMARY_COLOR} />
            </View>
            <Text style={[styles.listButtonText, {color: themeColors.text}]}>Activity Insight</Text>
            <MaterialIcons name="chevron-right" size={24} color={themeColors.textSecondary} />
          </AccessibleTouchable>

          <AccessibleTouchable
            activeOpacity={0.7}
            accessibilityLabel="Reposts"
            accessibilityHint="Opens your reposted articles"
            style={[styles.listButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}
            onPress={() => navigate('RepostsScreen')}>
            <View style={[styles.listButtonIconBg, {backgroundColor: themeColors.iconBackground}]}>
              <MaterialCommunityIcon name="repeat-variant" size={22} color={PRIMARY_COLOR} />
            </View>
            <Text style={[styles.listButtonText, {color: themeColors.text}]}>Reposted Articles ({user?.repostArticles?.length || 0})</Text>
            <MaterialIcons name="chevron-right" size={24} color={themeColors.textSecondary} />
          </AccessibleTouchable>

          <AccessibleTouchable
            activeOpacity={0.7}
            accessibilityLabel="Saved Articles"
            accessibilityHint="Opens your saved articles"
            style={[styles.listButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}
            onPress={() => navigate('SavedArticlesScreen')}>
            <View style={[styles.listButtonIconBg, {backgroundColor: themeColors.iconBackground}]}>
              <MaterialCommunityIcon name="bookmark-outline" size={22} color={PRIMARY_COLOR} />
            </View>
            <Text style={[styles.listButtonText, {color: themeColors.text}]}>Saved Articles ({user?.savedArticles?.length || 0})</Text>
            <MaterialIcons name="chevron-right" size={24} color={themeColors.textSecondary} />
          </AccessibleTouchable>

          <AccessibleTouchable
            activeOpacity={0.7}
            accessibilityLabel="Reading History"
            accessibilityHint="Opens your reading history"
            style={[styles.listButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}
            onPress={() => navigate('ReadingHistoryScreen')}>
            <View style={[styles.listButtonIconBg, {backgroundColor: themeColors.iconBackground}]}>
              <MaterialCommunityIcon name="history" size={22} color={PRIMARY_COLOR} />
            </View>
            <Text style={[styles.listButtonText, {color: themeColors.text}]}>Reading History</Text>
            <MaterialIcons name="chevron-right" size={24} color={themeColors.textSecondary} />
          </AccessibleTouchable>

          <AccessibleTouchable
            activeOpacity={0.7}
            accessibilityLabel="Wellness Dashboard"
            accessibilityHint="Opens your wellness dashboard"
            style={[styles.listButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}
            onPress={() => navigate('WellnessDashboardScreen')}>
            <View style={[styles.listButtonIconBg, {backgroundColor: themeColors.iconBackground}]}>
              <MaterialCommunityIcon name="heart-pulse" size={22} color={PRIMARY_COLOR} />
            </View>
            <Text style={[styles.listButtonText, {color: themeColors.text}]}>Wellness Dashboard</Text>
            <MaterialIcons name="chevron-right" size={24} color={themeColors.textSecondary} />
          </AccessibleTouchable>

        </View>
      </ScrollView>
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
  workspaceSection: {
    width: '100%',
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(4),
    gap: hp(1.8),
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  listButtonIconBg: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3.5),
  },
  listButtonText: {
    flex: 1,
    fontSize: fp(4.2),
    fontWeight: '600',
  },
});