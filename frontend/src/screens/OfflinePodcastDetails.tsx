import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import {OfflinePodcastDetailProp, PodcastData} from '../type';
import {hp} from '../helper/Metric';
import {ON_PRIMARY_COLOR, BUTTON_COLOR, PRIMARY_COLOR} from '../helper/Theme';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import {formatCount, updateOfflinePodcastLikeStatus} from '../helper/Utils';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {LIKE_PODCAST} from '../helper/APIUtils';
import Share from 'react-native-share';

export default function OfflinePodcastDetail({
  navigation,
  route,
}: OfflinePodcastDetailProp) {
  const {podcast} = route.params;
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const {user_id, user_token} = useSelector((state: any) => state.user);
  const {isConnected} = useSelector((state: any) => state.network);
  //const [isLoading, setLoading] = useState<boolean>(false);
  const [currentPodcast, setCurrentPodcast] = useState<PodcastData>(podcast);

  const addTrack = useCallback(async () => {
    await TrackPlayer.reset();
    if (podcast) {
      await TrackPlayer.add({
        id: podcast._id,
        url: `file://${podcast.filePath}`,
        title: podcast?.title,
        artist: podcast?.user_id.user_name,
      });
    }
  }, [podcast]);

  useEffect(() => {
    addTrack();
    return () => {};
  }, [addTrack]);

  const handleListenPress = async () => {
    const currentState = await TrackPlayer.getPlaybackState();

    if (currentState.state === State.Playing) {
      await TrackPlayer.pause();
    } else if (
      currentState.state === State.Paused ||
      currentState.state === State.Ready ||
      currentState.state === State.Stopped
    ) {
      await TrackPlayer.play();
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.open({
        title: podcast?.title,
        message: `${podcast?.title} : Check out this podcast on UltimateHealth app!`,
        // Most Recent APK: 0.7.4
        url: 'https://drive.google.com/file/d/19pRw_TWU4R3wcXjffOPBy1JGBDGnlaEh/view?usp=sharing',
        subject: 'UltimateHealth Post',
      });
      console.log(result);
    } catch (error) {
      console.log('Error sharing:', error);
      Alert.alert('Error', 'Something went wrong while sharing.');
    }
  };

  const updateLikeCountMutation = useMutation({
    mutationKey: ['update-podcast-like-count'],
    mutationFn: async (podcastId: string) => {
      const res = await axios.post(
        `${LIKE_PODCAST}`,
        {
          podcast_id: podcastId,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      return res.data as any;
    },
    onSuccess: async data => {
      if (data.likeStatus === false) {
        // Update podcast status in storage
        podcast.likedUsers = podcast.likedUsers.filter(id => id !== user_id);
        setCurrentPodcast(podcast);
        await updateOfflinePodcastLikeStatus(podcast);
      } else {
        podcast.likedUsers.push(user_id);
        await updateOfflinePodcastLikeStatus(podcast);
      }
    },
    onError: err => {
      console.log('Update like count err', err);
      Snackbar.show({
        text: 'Something went wrong!',
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`;
    } else {
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Podcast Details</Text>

      <Image
        source={{
          uri: 'https://t3.ftcdn.net/jpg/05/10/75/30/360_F_510753092_f4AOmCJAczuGgRLCmHxmowga2tC9VYQP.jpg',
        }}
        style={styles.podcastImage}
      />

      <Text style={styles.episodeTitle}>{podcast?.title}</Text>
      <Text style={styles.podcastTitle}>{podcast?.description}</Text>

      <View style={styles.tagsContainer}>
        {podcast?.tags?.map((tag, index) => (
          <Text key={index} style={styles.tagText}>
            #{tag.name}
          </Text>
        ))}
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.metaText}>
          {moment(podcast?.updated_at).format('MMMM Do YYYY, h:mm A')}
        </Text>
        {podcast && (
          // eslint-disable-next-line react/react-in-jsx-scope
          <Text style={styles.metaText}>
            {podcast?.viewUsers.length <= 1
              ? `${podcast?.viewUsers.length} view`
              : `${formatCount(podcast?.viewUsers.length ?? 0)} views`}
          </Text>
        )}
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        minimumTrackTintColor={PRIMARY_COLOR}
        maximumTrackTintColor="#ccc"
        thumbTintColor={PRIMARY_COLOR}
        onSlidingComplete={async value => {
          // seek to selected time
          await TrackPlayer.seekTo(value);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(progress.position)}</Text>
        <Text style={styles.time}>{formatTime(progress.duration)}</Text>
      </View>

      {playbackState.state === State.Buffering && (
        <Text style={styles.bufferingText}>⏳ Buffering... please wait</Text>
      )}

      <TouchableOpacity
        style={[
          styles.listenButton,
          playbackState.state === State.Buffering &&
            styles.listenButtonDisabled,
        ]}
        onPress={handleListenPress}
        disabled={playbackState.state === State.Buffering}>
        <Text style={styles.listenText}>
          {playbackState.state === State.Playing ? '⏸️Pause' : '🎧 Listen Now'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footerOptions}>
        <TouchableOpacity
          onPress={() => {
            // updateLikeCountMutation.mutate(trackId);
            if (isConnected) {
              updateLikeCountMutation.mutate(podcast._id);
            } else {
              Snackbar.show({
                text: 'You are currently offline',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }}>
          {currentPodcast?.likedUsers.includes(user_id) ? (
            <AntDesign name="heart" size={24} color={PRIMARY_COLOR} />
          ) : (
            <AntDesign name="hearto" size={24} color={'black'} />
          )}
        </TouchableOpacity>

        <View>
          <MaterialIcons name="done" size={24} color="green" />
        </View>

        {
          <TouchableOpacity
            onPress={() => {
              if (isConnected) {
                handleShare();
              } else {
                Snackbar.show({
                  text: 'You are currently offline',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            }}>
            <Ionicons name="share-outline" size={27} color="#1E1E1E" />
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ON_PRIMARY_COLOR,
    padding: 20,
    //justifyContent: 'center',
    //marginTop: hp(2),
    // marginBottom: hp(10)
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: '500',
    color: '#444',
  },
  podcastImage: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    borderRadius: 26,
    marginBottom: 24,
    resizeMode: 'cover',
  },
  episodeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E1E1E',
  },
  podcastTitle: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#777',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
  listenButton: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 32,
  },
  listenText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 3,
    marginBottom: 40,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },

  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  bufferingText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 8,
    fontStyle: 'italic',
    fontSize: 14,
  },
  listenButtonDisabled: {
    backgroundColor: '#ccc',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    rowGap: 4,
    columnGap: 8,
  },

  tagText: {
    //backgroundColor: '#f0f0f0',
    color: PRIMARY_COLOR,
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
});
