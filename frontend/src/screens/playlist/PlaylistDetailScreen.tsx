import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { PlaylistDetailScreenProp, PodcastData } from '../../schemas/type';
import PodcastCard from '../../components/podcast/PodcastCard';
import { msToTime } from '../../lib/utils/Utils';
import Snackbar from 'react-native-snackbar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useUpdatePodcastViewcount } from '../../hooks/podcast/useUpdatePodcastViewcount';
import { NoPodcastState } from '../../components/common/EmptyStates';
import CreatePlaylist from '../../components/playlist/CreatePlaylist';
import { setaddedPodcastId } from '../../store/dataSlice';
import { useGetPlaylistDetails } from '../../hooks/playlist/useGetPlaylistDetails';
import { useGetEpisodePodcasts } from '../../hooks/podcast/useGetEpisodePodcasts';
import { useRemoveFromPlaylist } from '../../hooks/playlist/useRemoveFromPlaylist';
import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import Ionicon from '@expo/vector-icons/Ionicons';

export default function PlaylistDetailScreen({
  navigation,
  route,
}: PlaylistDetailScreenProp) {
  const { playlist, playlistId: paramPlaylistId, episodeId, title: paramTitle } =
    route.params || {};

  const playlistId = paramPlaylistId || playlist?._id;
  const isEpisodeMode = Boolean(episodeId);

  const displayTitle =
    paramTitle ||
    playlist?.title ||
    (isEpisodeMode ? 'Episode Podcasts' : 'Playlist Details');

  const dispatch = useAppDispatch();
  const { user_id, isGuest } = useAppSelector((state: any) => state.user);
  const [playlistModalOpen, setPlaylistModalOpen] = useState<boolean>(false);

  const { mutate: updateViewCount } = useUpdatePodcastViewcount();
  const { mutate: removeFromPlaylist } = useRemoveFromPlaylist();

  // Fetch playlist podcasts if in playlist mode
  const {
    data: playlistPodcasts,
    isLoading: playlistLoading,
    refetch: refetchPlaylist,
  } = useGetPlaylistDetails(isEpisodeMode ? undefined : playlistId);

  // Fetch episode podcasts if in episode mode
  const {
    data: episodePodcasts,
    isLoading: episodeLoading,
    refetch: refetchEpisode,
  } = useGetEpisodePodcasts(episodeId);

  const isLoading = isEpisodeMode ? episodeLoading : playlistLoading;
  const podcasts: PodcastData[] = isEpisodeMode
    ? episodePodcasts || []
    : playlistPodcasts || [];

  const handleRefresh = () => {
    if (isEpisodeMode) {
      refetchEpisode();
    } else {
      refetchPlaylist();
    }
  };

  const openPlaylist = (id: string) => {
    dispatch(setaddedPodcastId(id));
    setPlaylistModalOpen(true);
  };

  const closePlaylist = () => {
    setPlaylistModalOpen(false);
    dispatch(setaddedPodcastId(''));
  };

  const navigateToReport = (podcastId: string) => {
    navigation.navigate('ReportScreen', {
      articleId: '',
      authorId: user_id,
      commentId: null,
      podcastId: podcastId,
    });
  };

  const handleRemove = (podcastId: string) => {
    if (!playlistId) return;

    Alert.alert(
      'Remove Podcast',
      'Are you sure you want to remove this podcast from the playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeFromPlaylist(
              { podcast_id: podcastId, playlist_id: playlistId },
              {
                onSuccess: () => {
                  Snackbar.show({
                    text: 'Podcast removed from playlist',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                },
                onError: (err: any) => {
                  Snackbar.show({
                    text: err?.response?.data?.message || 'Failed to remove',
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

  const renderItem = ({ item }: { item: PodcastData }) => {
    if (!item || !item._id) {
      return null;
    }

    return (
      <View style={styles.cardWrapper}>
        <PodcastCard
          id={item._id}
          title={item.title}
          audioUrl={item.audio_url}
          host={item.user_id?.user_name || 'Creator'}
          views={item.viewUsers?.length || 0}
          duration={`${msToTime(item.duration)}`}
          tags={item.tags}
          downloaded={false}
          display={true}
          downLoadAudio={async () => {}}
          handleClick={() => {
            if (isGuest) {
              navigation.navigate('PodcastDetail', {
                trackId: item._id,
                audioUrl: item.audio_url,
              });
              return;
            }
            updateViewCount(item._id, {
              onSuccess: data => {
                navigation.navigate('PodcastDetail', {
                  trackId: data._id,
                  audioUrl: data.audio_url,
                });
              },
              onError: () => {
                navigation.navigate('PodcastDetail', {
                  trackId: item._id,
                  audioUrl: item.audio_url,
                });
              },
            });
          }}
          imageUri={item.cover_image}
          handleReport={() => {
            navigateToReport(item._id);
          }}
          playlistAct={openPlaylist}
        />

        {!isEpisodeMode && Boolean(playlistId) && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(item._id)}
            accessibilityRole="button"
            accessibilityLabel="Remove from playlist">
            <Ionicon name="trash-outline" size={16} color="#ef4444" />
            <Text style={styles.removeText}>Remove from Playlist</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicon name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={styles.headerSubtitle}>
            {podcasts.length} {podcasts.length === 1 ? 'Podcast' : 'Podcasts'}
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          <Text style={styles.loadingText}>Loading podcasts...</Text>
        </View>
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item: any, index: number) =>
            item?._id ? item._id.toString() : index.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          ListEmptyComponent={
            <NoPodcastState onRefresh={handleRefresh} />
          }
        />
      )}

      <CreatePlaylist visible={playlistModalOpen} dismiss={closePlaylist} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 6,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeText: {
    fontSize: 12,
    color: '#ef4444',
    marginLeft: 4,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
});
