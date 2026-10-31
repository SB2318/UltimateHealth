import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import {OfflinePodcastDetailProp, PodcastData} from '../../schemas/type';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import SliderRN from '@react-native-community/slider';
import {formatDateWithTime} from '../../lib/utils/dateUtils';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import {formatCount, updateOfflinePodcastLikeStatus} from '../../lib/utils/Utils';
import {generatePodcastShareUrl} from '../../lib/utils/shareUtils';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import Snackbar from 'react-native-snackbar';
import {GET_STORAGE_DATA} from '../../lib/api/APIUtils';
import Share from 'react-native-share';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useSocket} from '../../contexts/SocketContext';
import {useAudioPlayer} from 'expo-audio';
import {useLikePodcast} from '../../hooks/podcast/useLikePodcast';

const Slider = SliderRN as any;

export default function OfflinePodcastDetail({
  route,
  navigation,
}: OfflinePodcastDetailProp) {
  const {podcast} = route.params;
  const socket = useSocket();
  let insets = {top: 0, bottom: 0, left: 0, right: 0};
  try {
    insets = useSafeAreaInsets();
  } catch (_e) {}

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(
    podcast?.duration ? podcast.duration / 1000 : 0,
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPodcast, setCurrentPodcast] = useState<PodcastData>(podcast);

  const {user_id, user_handle} = useAppSelector(
    (state: any) => state.user,
  );
  const {isConnected} = useAppSelector((state: any) => state.network);
  const dispatch = useAppDispatch();

  const audioUri = podcast?.filePath
    ? (podcast.filePath.startsWith('file://')
        ? podcast.filePath
        : `file://${podcast.filePath}`)
    : podcast?.audio_url;

  const player = useAudioPlayer(audioUri);

  const {mutate: likePodcast} = useLikePodcast();

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      try {
        const status = player.currentStatus;
        if (status) {
          setPosition(status.currentTime || 0);
          const dur =
            player.duration ||
            status.duration ||
            (podcast.duration ? podcast.duration / 1000 : 0);
          if (dur > 0) {
            setDuration(dur);
          }
        }
      } catch (err) {
        // Ignore transient player query exceptions
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player, podcast?.duration]);

  const handleListenPress = async () => {
    try {
      const currentState = player.currentStatus;
      if (currentState.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (err) {
      console.warn('Playback toggle error:', err);
    }
  };

  const handleRewind = async () => {
    if (!player) return;
    try {
      const newPos = Math.max(0, position - 10);
      await player.seekTo(newPos);
      setPosition(newPos);
    } catch (err) {
      console.warn('Rewind error:', err);
    }
  };

  const handleForward = async () => {
    if (!player) return;
    try {
      const targetDuration = duration || (podcast.duration ? podcast.duration / 1000 : 0);
      const newPos = Math.min(targetDuration, position + 10);
      await player.seekTo(newPos);
      setPosition(newPos);
    } catch (err) {
      console.warn('Forward error:', err);
    }
  };

  const handleShare = async () => {
    try {
      const url = generatePodcastShareUrl(podcast._id, podcast.audio_url);
      await Share.open({
        title: podcast?.title,
        message: `${podcast?.title} : Check out this podcast on UltimateHealth app!`,
        url: url,
        subject: 'Podcast Sharing',
      });
    } catch (error: any) {
      if (error && error.message !== 'User did not share') {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleLikeToggle = () => {
    if (!isConnected) {
      Snackbar.show({
        text: 'Liking requires an internet connection',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    likePodcast(podcast._id, {
      onSuccess: async data => {
        const updated = {...currentPodcast};
        if (data.likeStatus === false) {
          updated.likedUsers = updated.likedUsers.filter(id => id !== user_id);
          setCurrentPodcast(updated);
          await updateOfflinePodcastLikeStatus(updated);
        } else {
          if (!updated.likedUsers.includes(user_id)) {
            updated.likedUsers.push(user_id);
          }
          setCurrentPodcast(updated);
          if (socket) {
            socket.emit('notification', {
              type: 'likePost',
              userId: user_id,
              articleId: null,
              podcastId: podcast._id,
              articleRecordId: null,
              title: `${user_handle} liked your post`,
              message: podcast.title,
            });
          }
          await updateOfflinePodcastLikeStatus(updated);
        }
      },
      onError: err => {
        console.log('Update like count err', err);
        Snackbar.show({
          text: 'Something went wrong updating like',
          duration: Snackbar.LENGTH_SHORT,
        });
      },
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '00:00';
    const totalSecs = Math.floor(seconds);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getCoverUri = () => {
    if (podcast?.cover_image) {
      return podcast.cover_image.startsWith('http')
        ? podcast.cover_image
        : `${GET_STORAGE_DATA}/${podcast.cover_image}`;
    }
    return 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  };

  const getAuthorImageUri = () => {
    if (podcast?.user_id?.Profile_image) {
      return podcast.user_id.Profile_image.startsWith('http')
        ? podcast.user_id.Profile_image
        : `${GET_STORAGE_DATA}/${podcast.user_id.Profile_image}`;
    }
    return 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  };

  const topInset = insets?.top ? insets.top : Platform.OS === 'android' ? 12 : 8;
  const bottomInset = insets?.bottom || 16;

  return (
    <View style={styles.screenWrapper}>
      {/* Top Header Bar */}
      <View style={[styles.topBar, {paddingTop: Math.max(topInset, 12)}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.screenTitle} numberOfLines={1}>
          Offline Podcast
        </Text>
        <View style={styles.downloadBadge}>
          <MaterialIcons name="download-done" size={15} color="#059669" />
          <Text style={styles.downloadBadgeText}>Offline</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: bottomInset + 32},
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Cover Image Container */}
        <View style={styles.coverWrapper}>
          <Image
            source={{uri: getCoverUri()}}
            style={styles.podcastImage}
            accessible={true}
            accessibilityLabel={`Podcast cover for ${podcast?.title || ''}`}
          />
        </View>

        {/* Episode Title */}
        <Text style={styles.episodeTitle}>{podcast?.title}</Text>

        {/* Author Info Row */}
        <View style={styles.authorRow}>
          <Image
            source={{uri: getAuthorImageUri()}}
            style={styles.authorAvatar}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>
              {podcast?.user_id?.user_name || 'Podcast Host'}
            </Text>
            <Text style={styles.authorMeta}>
              {formatDateWithTime(podcast?.updated_at)} • {podcast?.user_id?.followers?.length || 0} followers
            </Text>
          </View>
        </View>

        {/* Quick Action Pills Row */}
        <View style={styles.actionPillsRow}>
          {/* Like Pill */}
          <TouchableOpacity
            style={styles.actionPill}
            onPress={handleLikeToggle}
            accessibilityRole="button"
            accessibilityLabel={`Like podcast. ${currentPodcast?.likedUsers?.length || 0} likes`}>
            {currentPodcast?.likedUsers?.includes(user_id) ? (
              <AntDesign name="heart" size={16} color={PRIMARY_COLOR} />
            ) : (
              <Feather name="heart" size={16} color="#475569" />
            )}
            <Text style={styles.actionPillText}>
              {formatCount(currentPodcast?.likedUsers?.length || 0)}
            </Text>
          </TouchableOpacity>

          {/* Comments Pill */}
          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => {
              if (isConnected) {
                navigation.navigate('PodcastDiscussion', {
                  podcastId: podcast._id,
                  mentionedUsers: (podcast as any).mentionedUsers || [],
                });
              } else {
                Snackbar.show({
                  text: 'Discussion requires an internet connection',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            }}>
            <Ionicons name="chatbubble-outline" size={16} color="#475569" />
            <Text style={styles.actionPillText}>
              {formatCount(podcast?.commentCount || 0)}
            </Text>
          </TouchableOpacity>

          {/* Share Pill */}
          <TouchableOpacity
            style={styles.actionPill}
            onPress={handleShare}>
            <Ionicons name="share-outline" size={17} color="#475569" />
            <Text style={styles.actionPillText}>Share</Text>
          </TouchableOpacity>

          {/* Views Pill */}
          <View style={styles.actionPillPassive}>
            <Ionicons name="eye-outline" size={17} color="#64748B" />
            <Text style={styles.actionPillText}>
              {formatCount(podcast?.viewUsers?.length || 0)}
            </Text>
          </View>
        </View>

        {/* Player Card */}
        <View style={styles.playerCard}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 1}
            value={position}
            minimumTrackTintColor={PRIMARY_COLOR}
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor={PRIMARY_COLOR}
            accessibilityRole="adjustable"
            accessibilityLabel="Podcast playback position"
            onSlidingComplete={async (val: number) => {
              if (player) {
                await player.seekTo(val);
                setPosition(val);
              }
            }}
          />

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          {player.currentStatus.isBuffering && (
            <Text style={styles.bufferingText}>Buffering audio...</Text>
          )}

          {/* Playback Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              onPress={handleRewind}
              accessibilityRole="button"
              accessibilityLabel="Rewind 10 seconds"
              style={styles.secondaryControlButton}>
              <Ionicons name="play-back" size={22} color="#475569" />
              <Text style={styles.controlSubtext}>10s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mainPlayButton,
                player.currentStatus.isBuffering && styles.mainPlayButtonDisabled,
              ]}
              onPress={handleListenPress}
              disabled={player.currentStatus.isBuffering}
              accessibilityRole="button"
              accessibilityLabel={player.currentStatus.playing ? 'Pause' : 'Play'}>
              <Ionicons
                name={player.currentStatus.playing ? 'pause' : 'play'}
                size={30}
                color="#FFFFFF"
                style={!player.currentStatus.playing ? {marginLeft: 3} : undefined}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleForward}
              accessibilityRole="button"
              accessibilityLabel="Forward 10 seconds"
              style={styles.secondaryControlButton}>
              <Ionicons name="play-forward" size={22} color="#475569" />
              <Text style={styles.controlSubtext}>10s</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Section */}
        {podcast?.description ? (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionHeader}>About This Episode</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={isExpanded ? undefined : 3}>
              {podcast.description}
            </Text>
            {podcast.description.length > 120 && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {/* Tags Section */}
        {podcast?.tags && podcast.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {podcast.tags.map((tag: any, idx: number) => (
              <View key={idx} style={styles.tagPill}>
                <Text style={styles.tagText}>#{tag.name}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
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
  screenTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  downloadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  downloadBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  coverWrapper: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
  },
  podcastImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  episodeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  authorMeta: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  actionPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  actionPillPassive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 5,
  },
  actionPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: -2,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  bufferingText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 6,
  },
  secondaryControlButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlSubtext: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginTop: -2,
  },
  mainPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  mainPlayButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  descriptionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tagPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: {
    color: PRIMARY_COLOR,
    fontSize: 13,
    fontWeight: '600',
  },
});
