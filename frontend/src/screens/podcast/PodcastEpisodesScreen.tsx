import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicon from '@expo/vector-icons/Ionicons';
import {RootStackParamList} from '../../schemas/type';
import EpisodeCard from '../../components/podcast/EpisodeCard';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'PodcastEpisodesScreen'>;

// Mock Data
const MOCK_EPISODES = [
  {
    id: '1',
    name: 'Introduction to Mental Health',
    description: 'A deep dive into the basics of mental well-being, discussing common challenges and initial steps to seek help.',
    podcastsCount: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Nutrition & Brain Function',
    description: 'How what you eat affects how you feel. We explore the gut-brain connection and dietary recommendations.',
    podcastsCount: 3,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    name: 'Fitness over 40',
    description: 'Tips and tricks for staying active and healthy as you age. Featuring interviews with fitness experts.',
    podcastsCount: 8,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const PodcastEpisodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [episodes, setEpisodes] = useState<typeof MOCK_EPISODES>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async () => {
    try {
      // setError(null);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      setEpisodes(MOCK_EPISODES);
    } catch {
      setError('Failed to load episodes. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEpisodes();
  };

  const handleDelete = (id: string) => {
    setEpisodes(prev => prev.filter(ep => ep.id !== id));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicon name="albums-outline" size={80} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No Episodes Yet</Text>
      <Text style={styles.emptyStateDesc}>
        Create your first podcast episode to start organizing your podcasts.
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => navigation.navigate('PodcastForm')}>
        <Text style={styles.emptyStateButtonText}>Create Episode</Text>
      </TouchableOpacity>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <Ionicon name="warning-outline" size={48} color="red" />
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchEpisodes}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        {/* Simple skeleton loading placeholder */}
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading episodes...</Text>
      </View>
    );
  }

  if (error) {
    return renderErrorState();
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id}
        contentContainerStyle={episodes.length === 0 ? styles.emptyListContent : styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[PRIMARY_COLOR]} />
        }
        renderItem={({item}) => (
          <EpisodeCard
            episode={item}
            onPress={() => console.log('Navigate to episode detail', item.id)}
            onEdit={() => navigation.navigate('PodcastForm')}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={renderEmptyState}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('PodcastForm')}>
        <Ionicon name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  emptyStateDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default PodcastEpisodesScreen;
