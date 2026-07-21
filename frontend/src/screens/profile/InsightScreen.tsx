/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity,useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {useTheme} from 'tamagui';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {InsightScreenProp} from '../../schemas/type';
import ActivityOverview from '../../components/profile/ActivityOverview';
import Loader from '../../components/common/Loader';
import {useGetProfile} from '../../hooks/profile/useGetProfile';
import {useUpdateViewCount} from '../../hooks/article/useUpdateViewCount';
import Snackbar from 'react-native-snackbar';
import {useAppSelector} from '../../store/hooks';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const InsightScreen = ({navigation}: InsightScreenProp) => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {isConnected} = useAppSelector((state: any) => state.network);
  
  const [articleId, setArticleId] = useState<number>();
  const [authorId, setAuthorId] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');

  const {data: user, isLoading} = useGetProfile();

  const {mutate: updateViewCount} = useUpdateViewCount(articleId ?? 0);

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

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme?.background?.val ?? (isDarkMode ? '#121212' : '#ffffff')},
      ]}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
      />
      {/* Header */}
      <View style={[styles.header, {borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb'}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome6 size={20} name="arrow-left" color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="chart-simple" size={18} color={PRIMARY_COLOR} />
            <View style={styles.titleTextContainer} />
        </View>
      </View>

      <View style={styles.content}>
        <ActivityOverview
          onArticleViewed={onArticleViewed}
          others={false}
          user_handle={user?.user_handle || ''}
          articlePosted={user?.articles ? user.articles.length : 0}
        />
      </View>
    </SafeAreaView>
  );
};

export default InsightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextContainer: {
      marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 16,
  },
});
