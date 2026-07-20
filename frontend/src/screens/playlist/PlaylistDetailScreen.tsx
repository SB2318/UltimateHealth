 
import React, {useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PlaylistDetailScreenProp, PodcastData } from '../../type';
import PodcastCard from '../../components/PodcastCard';
import { msToTime } from '../../helper/Utils';
import Snackbar from 'react-native-snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdatePodcastViewcount } from '../../hooks/podcast/useUpdatePodcastViewcount';
import { NoPodcastState } from '../../components/EmptyStates';
import CreatePlaylist from '../../components/CreatePlaylist';
import { setaddedPodcastId } from '../../store/dataSlice';

export default function PlaylistDetailScreen({ navigation, route }: PlaylistDetailScreenProp) {
  const { playlist } = route.params;
  const dispatch = useDispatch();
  const { user_id, isGuest } = useSelector((state: any) => state.user);
  const [playlistModalOpen, setPlaylistModalOpen] = useState<boolean>(false);

  const { mutate: updateViewCount } = useUpdatePodcastViewcount();

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

  const renderItem = ({ item }: { item: PodcastData | string }) => {
    if (typeof item === 'string') {
        return null;
    }

    return (
      <PodcastCard
        id={item._id}
        title={item.title}
        audioUrl={item.audio_url}
        host={item.user_id?.user_name || 'Unknown'}
        views={item.viewUsers?.length || 0}
        duration={`${msToTime(item.duration)}`}
        tags={item.tags}
        downloaded={false}
        display={true}
        downLoadAudio={async () => {
            // Downloading logic handled internally or similarly to other screens
        }}
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
            onError: err => {
              console.log('Update view count err', err);
              Snackbar.show({
                text: 'Something went wrong!',
                duration: Snackbar.LENGTH_SHORT,
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
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={playlist.podcasts}
        keyExtractor={(item:any, index:number) => typeof item === 'string' ? item : item._id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<NoPodcastState onRefresh={() => {}} />}
      />
      <CreatePlaylist visible={playlistModalOpen} dismiss={closePlaylist} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  }
});
