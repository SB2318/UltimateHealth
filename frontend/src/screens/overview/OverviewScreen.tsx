import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {PRIMARY_COLOR, ON_PRIMARY_COLOR} from '../../helper/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArticleData, OverviewScreenProps} from '../../type';
import {StatusEnum} from '../../helper/Utils';
import {hp} from '../../helper/Metric';

export default function OverviewScreen({
  navigation,
  route,
}: OverviewScreenProps) {
  //const bottomBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const articles = route.params.articles;
  const progressLabel = `InProgress (${
    articles
      ? articles.filter(
          a =>
            a.status === StatusEnum.AWAITING_USER ||
            a.status === StatusEnum.REVIEW_PENDING ||
            a.status === StatusEnum.IN_PROGRESS,
        ).length
      : 0
  })`;
  const publishedLabel = `Published (${
    articles
      ? articles.filter(a => a.status === StatusEnum.PUBLISHED).length
      : 0
  })`;

  const discardLabel = `Discarded (${
    articles
      ? articles.filter(a => a.status === StatusEnum.DISCARDED).length
      : 0
  })`;

  const onRefresh = () => {
    //setRefreshing(true);
    // refetch();
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({item}: {item: ArticleData}) => {
      return <View />;
    },
    [navigation, onRefresh],
  );
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
          //renderHeader={renderHeader}
          renderTabBar={renderTabBar}
          containerStyle={styles.tabsContainer}>
          {/* Tab 1 */}

          {/* Tab 2 */}
          <Tabs.Tab name={publishedLabel}>
            <Tabs.FlatList
              data={[]}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                {paddingBottom: 15},
              ]}
              keyExtractor={item => item?._id}
              refreshing={refreshing}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.message}>No Article Found</Text>
                </View>
              }
            />
          </Tabs.Tab>

          <Tabs.Tab name={progressLabel}>
            <Tabs.ScrollView
              automaticallyAdjustContentInsets={true}
              contentInsetAdjustmentBehavior="always"
              contentContainerStyle={styles.scrollViewContentContainer}>
              <Tabs.FlatList
                data={[]}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.flatListContentContainer,
                  {paddingBottom: 15},
                ]}
                keyExtractor={item => item?._id}
                refreshing={refreshing}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.message}>No Article Found</Text>
                  </View>
                }
              />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name={discardLabel}>
            <Tabs.FlatList
              data={[]}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatListContentContainer,
                {paddingBottom: 15},
              ]}
              keyExtractor={item => item?._id}
              refreshing={refreshing}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.message}>No Article Found</Text>
                </View>
              }
            />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CAFFF',
    // marginTop: hp(5)
  },
  innerContainer: {
    flex: 1,
    backgroundColor: ON_PRIMARY_COLOR,
  },
  tabsContainer: {
    backgroundColor: ON_PRIMARY_COLOR,
    overflow: 'hidden',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    backgroundColor: ON_PRIMARY_COLOR,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
  },

  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 100,
    objectFit: 'cover',
    resizeMode: 'contain',
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  labelStyle: {
    fontWeight: '600',
    fontSize: 14.6,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 *
 * overview screen:
 * (a)
 */
