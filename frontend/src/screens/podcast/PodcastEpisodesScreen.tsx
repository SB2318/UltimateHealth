import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicon from '@expo/vector-icons/Ionicons';
import { RootStackParamList, PodcastEpisode } from '../../schemas/type';
import EpisodeCard from '../../components/podcast/EpisodeCard';
import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import { useGetPodcastEpisodes } from '../../hooks/podcast/useGetPodcastEpisodes';
import { useCreatePodcastEpisode } from '../../hooks/podcast/useCreatePodcastEpisode';
import { useDeletePodcastEpisode } from '../../hooks/podcast/useDeletePodcastEpisode';
import Snackbar from 'react-native-snackbar';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'PodcastEpisodesScreen'
>;

const PodcastEpisodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    data: episodes = [],
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useGetPodcastEpisodes();

  const { mutate: createEpisode, isPending: isCreating } = useCreatePodcastEpisode();
  const { mutate: deleteEpisode } = useDeletePodcastEpisode();

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [episodeName, setEpisodeName] = useState('');
  const [episodeDescription, setEpisodeDescription] = useState('');

  const onRefresh = () => {
    refetch();
  };

  const handleOpenCreateModal = () => {
    setEpisodeName('');
    setEpisodeDescription('');
    setCreateModalVisible(true);
  };

  const handleCreateSubmit = () => {
    if (!episodeName.trim()) {
      Alert.alert('Validation Error', 'Episode name is required.');
      return;
    }

    createEpisode(
      {
        name: episodeName.trim(),
        description: episodeDescription.trim(),
      },
      {
        onSuccess: () => {
          setCreateModalVisible(false);
          Snackbar.show({
            text: 'Episode created successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        },
        onError: (err: any) => {
          Alert.alert(
            'Error',
            err?.response?.data?.message || 'Failed to create episode',
          );
        },
      },
    );
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Episode',
      `Are you sure you want to delete "${name}"? Podcasts inside will remain intact.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEpisode(
              { episodeId: id },
              {
                onSuccess: () => {
                  Snackbar.show({
                    text: 'Episode deleted',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                },
                onError: (err: any) => {
                  Snackbar.show({
                    text: err?.response?.data?.message || 'Failed to delete episode',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                },
              },
            );
          },
        },
      ],
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicon
        name="albums-outline"
        size={80}
        color="#ccc"
        accessible={false}
      />
      <Text style={styles.emptyStateTitle}>No Episodes Yet</Text>
      <Text style={styles.emptyStateDesc}>
        Create your first podcast episode container to start organizing your podcast series.
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={handleOpenCreateModal}
        accessibilityRole="button"
        accessibilityLabel="Create Episode">
        <Text style={styles.emptyStateButtonText}>Create Episode</Text>
      </TouchableOpacity>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <Ionicon
        name="warning-outline"
        size={48}
        color="red"
        accessible={false}
      />
      <Text style={styles.errorText}>
        {(error as any)?.response?.data?.message ||
          'Failed to load episodes. Please try again.'}
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => refetch()}
        accessibilityRole="button"
        accessibilityLabel="Retry loading episodes">
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading episodes...</Text>
      </View>
    );
  }

  if (error && episodes.length === 0) {
    return renderErrorState();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicon name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Podcast Episodes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleOpenCreateModal}
          accessibilityRole="button"
          accessibilityLabel="Add Episode">
          <Ionicon name="add-circle" size={30} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={episodes}
        keyExtractor={item => item._id || item.id || ''}
        contentContainerStyle={
          episodes.length === 0 ? styles.emptyListContent : styles.listContent
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            colors={[PRIMARY_COLOR]}
            accessibilityLabel="Refresh episodes"
          />
        }
        renderItem={({ item }: { item: PodcastEpisode }) => (
          <EpisodeCard
            episode={item}
            onPress={() =>
              navigation.navigate('PlaylistDetailScreen', {
                episodeId: item._id,
                title: item.name,
              })
            }
            onDelete={() => handleDelete(item._id, item.name)}
          />
        )}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Create Episode Modal */}
      <Modal
        visible={createModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCreateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Episode Container</Text>
              <TouchableOpacity
                onPress={() => setCreateModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close">
                <Ionicon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Episode Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Mental Wellness Series"
              placeholderTextColor="#9CA3AF"
              value={episodeName}
              onChangeText={setEpisodeName}
            />

            <Text style={styles.modalLabel}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What is this episode/show about?"
              placeholderTextColor="#9CA3AF"
              value={episodeDescription}
              onChangeText={setEpisodeDescription}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreateSubmit}
              disabled={isCreating}
              accessibilityRole="button"
              accessibilityLabel="Create">
              {isCreating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Create Episode</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    padding: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    paddingVertical: 12,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default PodcastEpisodesScreen;
