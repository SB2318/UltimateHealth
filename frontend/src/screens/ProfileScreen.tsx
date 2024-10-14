import {StyleSheet, View, BackHandler, Text, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import ActivityOverview from '../components/ActivityOverview';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import ArticleCard from '../components/ArticleCard';
import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProfileHeader from '../components/ProfileHeader';
import {GET_PROFILE_API} from '../helper/APIUtils';
import {ArticleData, ProfileScreenProps, User} from '../type';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

// Sample article data

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const {user_id, user_token} = useSelector((state: any) => state.user);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /*
  const getUserProfileData = async () => {
    const data = await getMethodCallwithToken(`${GET_PROFILE_API}`, user_token);
    setUserData(data?.profile);
  };
  */

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['get-article-by-id'],
    queryFn: async () => {
      const response = await axios.get(`${GET_PROFILE_API}`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });

      return response.data.profile as User;
    },
  });

  // Handle back button press to show a confirmation alert before exiting the app
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Warning',
          'Do you want to exit',
          [
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isDoctor = user ? user?.isDoctor! : false; // Example flag to indicate if the user is a doctor
  const bottomBarHeight = useBottomTabBarHeight(); // Get the bottom tab bar height
  const insets = useSafeAreaInsets(); // Get safe area insets
  // Memoized function to render each article item

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };


  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const renderItem = useCallback(({item}: {item: ArticleData}) => {
    return (
      <ArticleCard item={item} navigation={navigation} success={onRefresh} />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Function to render the header

  const renderHeader = () => {
    return (
      <ProfileHeader
        isDoctor={isDoctor}
        username={user?.user_name || ''}
        userhandle={user?.user_handle || ''}
        profileImg={user?.Profile_image || ''}
        articlesPosted={user?.articles.length || 0}
        articlesSaved={user?.savedArticles.length || 0}
        userPhoneNumber={isDoctor ? user?.contact_detail?.phone_no || '' : ''}
        userEmailID={isDoctor ? user?.contact_detail?.email_id || '' : ''}
        specialization={user?.specialization || ''}
        experience={user?.Years_of_experience || 0}
        qualification={user?.qualification || ''}
        navigation={navigation}
      />
    );
  };
  // Function to render the custom tab bar

  const renderTabBar = props => {
    return (
      <MaterialTabBar
        {...props}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBarStyle}
        activeColor={PRIMARY_COLOR}
        inactiveColor="#9098A3"
        labelStyle={styles.labelStyle}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, {paddingTop: insets.top}]}>
        <Tabs.Container
          renderHeader={renderHeader}
          renderTabBar={renderTabBar}
          containerStyle={styles.tabsContainer}>
          {/* Tab 1 */}
          <Tabs.Tab name="My Insights">
            <Tabs.ScrollView
              automaticallyAdjustContentInsets={true}
              contentInsetAdjustmentBehavior="always"
              contentContainerStyle={styles.scrollViewContentContainer}>
              <ActivityOverview />
            </Tabs.ScrollView>
          </Tabs.Tab>
          {/* Tab 2 */}
          <Tabs.Tab name="My Articles">
            <Tabs.FlatList
              data={user ? user?.articles : []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                {paddingBottom: bottomBarHeight + 15},
              ]}
              keyExtractor={item => item?._id}
              refreshing={refreshing}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  {/* Added a container for better styling */}
                  <Text style={styles.message}>No Article Found</Text>
                </View>
              }
            />
          </Tabs.Tab>
          {/* Tab 3 */}
          <Tabs.Tab name="Saved Articles">
            <Tabs.FlatList
              data={user ? user?.savedArticles : []}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                {paddingBottom: bottomBarHeight + 15},
              ]}
              keyExtractor={item => item?._id}
              refreshing={refreshing}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  {/* Added a container for better styling */}
                  <Text style={styles.message}>No Article Found</Text>
                </View>
              }
            />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </View>
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
  tabsContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    textTransform: 'capitalize',
  },
  contentContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'white',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
