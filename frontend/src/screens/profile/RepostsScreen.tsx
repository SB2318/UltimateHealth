import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {useTheme} from 'tamagui';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {RepostsScreenProp, ArticleData} from '../../type';
import {useGetProfile} from '../../hooks/useGetProfile';
import Loader from '../../components/Loader';
import {NoArticleState} from '../../components/EmptyStates';
import UserArticleCard from '../../components/UserArticleCard';
import {useFocusEffect} from '@react-navigation/native';

const RepostsScreen = ({navigation}: RepostsScreenProp) => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {data: user, refetch, isLoading} = useGetProfile();
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };

  const renderItem = useCallback(
    ({item}: {item: ArticleData}) => {
      return (
        <UserArticleCard
          item={item}
          isSelected={selectedCardId === item._id}
          setSelectedCardId={setSelectedCardId}
          navigation={navigation as any}
          success={onRefresh}
          handleRepostAction={() => {}}
          handleReportAction={() => {}}
          handleEditRequestAction={() => {}}
          source="profile"
        />
      );
    },
    [selectedCardId, navigation, onRefresh],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, {backgroundColor: theme.background.val}]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={isDarkMode ? '#000000' : '#ffffff'} />
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: isDarkMode ? '#121212' : '#ffffff'}]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={isDarkMode ? '#121212' : '#ffffff'} />
      
      {/* Header */}
      <View style={[styles.header, {borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb'}]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 size={20} name="arrow-left" color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, {color: isDarkMode ? '#ffffff' : '#111827'}]}>
            Reposts ({user?.repostArticles?.length || 0})
          </Text>
        </View>
      </View>

      <FlatList
        data={user?.repostArticles ?? []}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        keyExtractor={(item: ArticleData) => item?._id}
        ListEmptyComponent={<NoArticleState />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default RepostsScreen;

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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
