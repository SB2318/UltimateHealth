import {SafeAreaView, StyleSheet, View, BackHandler, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import AddIcon from '../components/AddIcon';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ArticleCard from '../components/ArticleCard';
import HomeScreenHeader from '../components/HomeScreenHeader';
import {articles} from '../helper/Utils';

const HomeScreen = ({navigation}) => {
  const bottomBarHeight = useBottomTabBarHeight();
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
  // header
  const renderHeader = () => {
    return <HomeScreenHeader />;
  };

  const handleNoteIconClick = () => {
    navigation.navigate('EditorScreen');
  };

  const renderTabBar = props => {
    return (
      <MaterialTabBar
        {...props}
        scrollEnabled={true}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBarStyle}
        activeColor={'white'}
        inactiveColor="white"
        labelStyle={styles.labelStyle}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };

  const renderItem = React.useCallback(({item}) => {
    return <ArticleCard item={item} navigation={navigation} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Tabs.Container
        renderHeader={renderHeader}
        renderTabBar={renderTabBar}
        containerStyle={styles.tabsContainer}>
        {/* Tab 1 */}
        <Tabs.Tab name="All">
          <Tabs.FlatList
            data={articles}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              {paddingBottom: bottomBarHeight + 8},
            ]}
            keyExtractor={item => item?.id}
          />
        </Tabs.Tab>
        {/* Tab 2 */}
        <Tabs.Tab name="Popular">
          <Tabs.FlatList
            data={articles.filter(article =>
              article.category.includes('Popular'),
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              {paddingBottom: bottomBarHeight + 8},
            ]}
            keyExtractor={item => item?.id}
          />
        </Tabs.Tab>
        {/* Tab 3 */}
        <Tabs.Tab name="Health">
          <Tabs.FlatList
            data={articles.filter(article =>
              article.category.includes('Health'),
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              {paddingBottom: bottomBarHeight + 8},
            ]}
            keyExtractor={item => item?.id}
          />
        </Tabs.Tab>
        {/* Tab 4 */}
        <Tabs.Tab name="Diseases">
          <Tabs.FlatList
            data={articles.filter(article =>
              article.category.includes('Diseases'),
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              {paddingBottom: bottomBarHeight + 8},
            ]}
            keyExtractor={item => item?.id}
          />
        </Tabs.Tab>
        {/* Tab 5 */}
        <Tabs.Tab name="Stories">
          <Tabs.FlatList
            data={articles.filter(article =>
              article.category.includes('Stories'),
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.flatListContentContainer,
              {paddingBottom: bottomBarHeight + 8},
            ]}
            keyExtractor={item => item?.id}
          />
        </Tabs.Tab>
      </Tabs.Container>

      <View style={styles.homePlusIconview}>
        <AddIcon callback={handleNoteIconClick} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabBarStyle: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
  },
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
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

  tabsContainer: {
    backgroundColor: PRIMARY_COLOR,
    overflow: 'hidden',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  //  add article icon button
  homePlusIconview: {
    bottom: 100,
    right: 25,
    position: 'absolute',
  },
});
