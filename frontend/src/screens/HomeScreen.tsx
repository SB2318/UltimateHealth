import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
          {text: 'No', onPress: () => null},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: true},
      );
    });
    return unsubscribe;
  }, [navigation]);

  const handleNoteIconClick = () => {
    navigation.navigate('EditorScreen');
  };

  const renderItem = React.useCallback(({item}) => {
    return <ArticleCard item={item} navigation={navigation} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />

      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true}>
          {articleCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
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

      <View style={styles.articleContainer}>
        <FlatList
          data={filterdArticles}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContentContainer}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  button: {
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
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  articleContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    paddingBottom: 120,
  },
  homePlusIconview: {
    bottom: 100,
    right: 25,
    position: 'absolute',
  },
});
