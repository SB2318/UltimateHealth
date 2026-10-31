import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  OfflinePodcastListProp,
  PodcastData,
} from '../../schemas/type';
import {
  deleteFromDownloads,
  msToTime,
  readDownloadedPodcasts,
} from '../../lib/utils/Utils';
import PodcastCard from '../../components/podcast/PodcastCard';
import {ON_PRIMARY_COLOR, PRIMARY_COLOR} from '../../lib/ui/Theme';
import Snackbar from 'react-native-snackbar';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import CreatePlaylist from '../../components/playlist/CreatePlaylist';
import {
  setaddedPodcastId,
  setRemovePlaylistId,
} from '../../store/dataSlice';
import {
  NoOfflinePodcastsState,
  OfflinePodcastLoadErrorState,
} from '../../components/common/EmptyStates';

export default function OfflinePodcastList({
  navigation,
}: OfflinePodcastListProp) {
  const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const {user_id} = useAppSelector((state: any) => state.user);
  const [playlistModalOpen, setPlaylistModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let insets = {top: 0, bottom: 0, left: 0, right: 0};
  try {
    insets = useSafeAreaInsets();
  } catch (_e) {}

  const openPlaylist = (id: string) => {
    setPlaylistModalOpen(true);
    dispatch(setaddedPodcastId(id));
  };

  const closePlaylist = () => {
    setPlaylistModalOpen(false);
    dispatch(setRemovePlaylistId(''));
  };

  const loadPodcasts = useCallback(async () => {
    try {
      setLoadError(null);
      const data = await readDownloadedPodcasts();
      setPodcasts(data);
    } catch (err) {
      if (__DEV__) {
        console.error('Offline podcast load error:', err);
      }
      setPodcasts([]);
      setLoadError(
        'Failed to load offline podcasts. Please try again or check your device storage.',
      );
    }
  }, []);

  useEffect(() => {
    loadPodcasts();
  }, [loadPodcasts]);

  useFocusEffect(
    useCallback(() => {
      loadPodcasts();
    }, [loadPodcasts]),
  );

  const navigateToDetail = (podcast: PodcastData) => {
    navigation.navigate('OfflinePodcastDetail', {
      podcast: podcast,
    });
  };

  const navigateToReport = (podcastId: string) => {
    navigation.navigate('ReportScreen', {
      articleId: '',
      authorId: user_id,
      commentId: null,
      podcastId: podcastId,
    });
  };

  const renderItem = ({item}: {item: PodcastData}) => (
    <View style={styles.cardItemWrapper}>
      <PodcastCard
        id={item._id}
        title={item.title}
        audioUrl={item.audio_url}
        host={item.user_id?.user_name || 'Host'}
        views={item.viewUsers?.length || 0}
        duration={`${msToTime(item.duration)}`}
        tags={item.tags || []}
        downloaded={true}
        display={true}
        downLoadAudio={async () => {
          const res = await deleteFromDownloads(item);
          if (res) {
            await loadPodcasts();
            Snackbar.show({
              text: 'Podcast has been removed from offline',
              duration: Snackbar.LENGTH_SHORT,
            });
          } else {
            Snackbar.show({
              text: 'Failed to remove podcast from offline',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        }}
        handleClick={() => {
          navigateToDetail(item);
        }}
        imageUri={item.cover_image || ''}
        handleReport={() => {
          navigateToReport(item._id);
        }}
        playlistAct={openPlaylist}
      />
    </View>
  );

  const topInset = insets?.top ? insets.top : Platform.OS === 'android' ? 12 : 8;
  const bottomInset = insets?.bottom || 16;

  return (
    <View style={styles.container} accessible={false}>
      {/* Top Header Bar */}
      <View style={[styles.topBar, {paddingTop: Math.max(topInset, 12)}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Downloaded Podcasts</Text>
          <Text style={styles.headerSubtitle}>
            {podcasts.length} {podcasts.length === 1 ? 'episode' : 'episodes'} available offline
          </Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <FlatList
        data={podcasts}
        keyExtractor={(item: PodcastData) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          {paddingBottom: bottomInset + 24},
        ]}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        accessibilityLabel="Offline podcasts list"
        ListEmptyComponent={
          loadError ? (
            <OfflinePodcastLoadErrorState
              message={loadError}
              onRetry={loadPodcasts}
            />
          ) : (
            <NoOfflinePodcastsState onBrowse={() => navigation.goBack()} />
          )
        }
      />

      <CreatePlaylist
        visible={playlistModalOpen}
        dismiss={closePlaylist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  headerRightPlaceholder: {
    width: 40,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  cardItemWrapper: {
    width: '100%',
  },
  itemSeparator: {
    height: 12,
  },
});
