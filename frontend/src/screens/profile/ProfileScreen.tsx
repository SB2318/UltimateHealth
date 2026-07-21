import { StyleSheet, View, Text, Alert, useColorScheme, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, {useCallback, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import { useTheme } from 'tamagui';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileHeader from '../../components/profile/ProfileHeader';
import {ProfileScreenProps} from '../../schemas/type';
import Loader from '../../components/common/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {setUserHandle} from '../../store/UserSlice';
import {useGetProfile} from '../../hooks/profile/useGetProfile';
import {wp, hp, fp} from '../../lib/ui/Metric';

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {isConnected} = useAppSelector((state: any) => state.network);
  const dispatch = useAppDispatch();

  const {data: user, refetch, isLoading} = useGetProfile();

  React.useEffect(() => {
    if (user) {
      dispatch(setUserHandle(user.user_handle));
    }
  }, [dispatch, user]);

  const isDoctor = user !== undefined ? user.isDoctor : false;

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



  const onFollowerClick = () => {
    if (isConnected) {
      if (user && (user.followers?.length ?? 0) > 0) {
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
          if (user && isConnected) {
            navigation.navigate('OverviewScreen');
          } else if (!isConnected) {
            Snackbar.show({
              text: 'Please check your internet connection!',
              duration: Snackbar.LENGTH_SHORT,
            });
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
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Loader />
      </SafeAreaView>
    );
  }

  const themeColors = {
    background: isDarkMode ? '#121212' : '#ffffff',
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#000A60' : PRIMARY_COLOR)},
      ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: themeColors.background, paddingBottom: hp(4) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_COLOR} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: isDarkMode ? '#000A60' : PRIMARY_COLOR }}>
            {renderHeader()}
        </View>

        <View style={styles.content}>
           <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#111827' }]}>Profile Details</Text>
           <Text style={[styles.subtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>To edit your details, click the gear icon in the header.</Text>
           
           <TouchableOpacity 
             style={styles.editButton}
             onPress={() => navigation.navigate('ProfileEditScreen')}
           >
             <Text style={styles.editButtonText}>Edit Profile Information</Text>
           </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: wp(5),
    alignItems: 'center',
    marginTop: hp(4),
  },
  title: {
    fontSize: fp(5.5),
    fontWeight: '700',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: fp(3.5),
    textAlign: 'center',
    marginBottom: hp(4),
  },
  editButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: fp(4),
    fontWeight: '600',
  }
});