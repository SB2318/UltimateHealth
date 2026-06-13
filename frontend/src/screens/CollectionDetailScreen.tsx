import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {PRIMARY_COLOR} from '../helper/Theme';
import {useCollectionDetail, useRemoveArticleFromCollection} from '../hooks/useCollectionDetail';
import Loader from '../components/Loader';
import {CollectionDetailScreenProp} from '../type';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicon from '@expo/vector-icons/Ionicons';
import {NoArticleState} from '../components/EmptyStates';

const CollectionDetailScreen = ({navigation, route}: CollectionDetailScreenProp) => {
  const {collectionId, collectionName} = route.params;
  const {user_id} = useSelector((state: any) => state.user);
  const {data: collection, isLoading} = useCollectionDetail(collectionId);
  const {mutate: removeArticle} = useRemoveArticleFromCollection();

  const handleRemoveArticle = (articleId: number) => {
    Alert.alert(
      'Remove Article',
      'Remove this article from the collection?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () =>
            removeArticle(
              {collectionId, articleId},
              {
                onError: () => {
                  Alert.alert('Error', 'Failed to remove article');
                },
              },
            ),
        },
      ],
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {collectionName}
        </Text>
        <View style={{width: 24}} />
      </View>

      {collection && (
        <Text style={styles.subtitle}>
          {collection.articleCount}{' '}
          {collection.articleCount === 1 ? 'article' : 'articles'}
        </Text>
      )}

      <FlatList
        data={collection?.articleIds || []}
        keyExtractor={item => item.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({item: articleId}) => (
          <View style={styles.articleItem}>
            <View style={styles.articleInfo}>
              <Ionicon name="document-text-outline" size={20} color={PRIMARY_COLOR} />
              <Text style={styles.articleIdText}>Article #{articleId}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveArticle(articleId)}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicon name="close-circle-outline" size={24} color="#e53935" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<NoArticleState />}
      />
    </SafeAreaView>
  );
};

export default CollectionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#6C6C6D',
    textAlign: 'center',
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  articleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  articleIdText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
});
