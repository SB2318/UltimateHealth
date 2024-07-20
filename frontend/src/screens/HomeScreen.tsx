import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import AddIcon from '../components/AddIcon';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ArticleCard from '../components/ArticleCard';
import HomeScreenHeader from '../components/HomeScreenHeader';
import {articles} from '../helper/Utils';
import {Category} from '../type';

const HomeScreen = ({navigation}) => {
  const bottomBarHeight = useBottomTabBarHeight();

  const articleCategories: string[] = [
    'All',
    'Popular',
    'Health',
    'Diseases',
    'Stories',
  ];
  const [filterdArticles, setFilteredArticles] = useState<Category[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setFilteredArticles(articles);
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert(
        'Warning',
        'Do you want to exit',
        [
          { text: 'No', onPress: () => null },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true },
      );
    });
    return unsubscribe; 
  }, [navigation]); 
    
  

  const handleNoteIconClick = () => {
    navigation.navigate('EditorScreen');
  };

  const renderItem = React.useCallback(({item}) => {
    return <ArticleCard item={item} navigation={navigation} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>

 <View style={{marginTop:200}}>
      <HomeScreenHeader />
      </View>

     
      <View 
     style={{
      flex: 0,
      width: '100%',
      paddingHorizontal: 6,
     }}>

      <ScrollView
      contentContainerStyle={{ flexGrow:1}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {articleCategories.map((item, index) => (
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor:
                selectedIndex === index ? 'white' : PRIMARY_COLOR,
              borderColor: selectedIndex === index ? PRIMARY_COLOR : 'white',
            }}
            onPress={() => {
              setSelectedIndex(index);

              if (item === 'All') {
                setFilteredArticles(articles);
              } else if (item === 'Popular') {
                setFilteredArticles(
                  articles.filter(article =>
                    article.category.includes('Popular'),
                  ),
                );
              } else if (item === 'Health') {
                setFilteredArticles(
                  articles.filter(article =>
                    article.category.includes('Health'),
                  ),
                );
              } else if (item === 'Diseases') {
                setFilteredArticles(
                  articles.filter(article =>
                    article.category.includes('Diseases'),
                  ),
                );
              } else if (item === 'Stories') {
                setFilteredArticles(
                  articles.filter(article =>
                    article.category.includes('Stories'),
                  ),
                );
              } else {
                setFilteredArticles(articles);
              }
            }}>
            <Text
              style={{
                ...styles.labelStyle,
                color: selectedIndex === index ? 'black' : 'white',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      </View>

     <View 
     style={{
      flex: 0,
      width: '100%',
      paddingHorizontal: 6,
     }}>
  <ScrollView
  contentContainerStyle={{ flexGrow:1, marginBottom:120}}
  >
  {filterdArticles.map((item, index) => (
    <ArticleCard item={item} navigation={navigation} style={{width:'100%'}}/>
  ))}
</ScrollView>

</View>

 
   

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
    justifyContent: 'center',
    alignItems: 'center',
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

  button: {
    // TODO
    height: 40,
    width: 100,
    borderRadius: 14,
    marginHorizontal: 4,
    marginVertical: 4,
    padding: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
