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
import ArticleCard from '../components/ArticleCard';
import HomeScreenHeader from '../components/HomeScreenHeader';
import {articles} from '../helper/Utils';
import {Article, Category} from '../type';
import axios from 'axios';
import {ARTICLE_TAGS_API, BASE_URL} from '../helper/APIUtils';
const HomeScreen = ({navigation}) => {
  const [articleCategories, setArticleCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filterdArticles, setFilteredArticles] = useState<Article[]>([]);
  /**
   * The function `getAllCategories` fetches all categories from an API endpoint and sets the article
   * categories in the state while also selecting the first category as the default.
   */
  const getAllCategories = async () => {
    const {data: categoryData} = await axios.get(
      `${BASE_URL + ARTICLE_TAGS_API}`,
    );
    setArticleCategories(categoryData);
    setSelectedCategory(categoryData[0]?.name);
  };
  useEffect(() => {
    getAllCategories();
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
    //navigation.navigate('ArticleDescriptionScreen');
  };
  /**
   * The function `handleCategoryClick` filters articles based on a selected category and updates the
   * filtered articles state accordingly.
   */
  const handleCategoryClick = category => {
    setSelectedCategory(category);
    const filtered = articles.filter(article =>
      article.category.includes(category),
    );
    if (filtered) {
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  };
  const renderItem = React.useCallback(({item}) => {
    return <ArticleCard item={item} navigation={navigation} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />

      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {articleCategories?.map((item, index) => (
            <TouchableOpacity
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.button,
                backgroundColor:
                  selectedCategory === item?.name ? 'white' : PRIMARY_COLOR,
                borderColor:
                  selectedCategory === item?.name ? PRIMARY_COLOR : 'white',
              }}
              onPress={() => {
                handleCategoryClick(item?.name);
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.labelStyle,
                  color: selectedCategory === item?.name ? 'black' : 'white',
                }}>
                {item.name}
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
