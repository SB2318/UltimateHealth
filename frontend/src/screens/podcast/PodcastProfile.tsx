/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
 
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {PodcastProfileProp, PodcastData, PlayList, PodcastEpisode} from '../../schemas/type';
import {useGetPodcastEpisodes} from '../../hooks/podcast/useGetPodcastEpisodes';
import {MaterialCommunityIcons, Feather, Ionicons} from '@expo/vector-icons';
import {useAppSelector} from '../../store/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {useGetPlaylists} from '../../hooks/playlist/useGetPlaylists';
import {useGetUserPublishedPodcasts} from '../../hooks/podcast/useGetUserPublishedPodcasts';
import Loader from '../../components/common/Loader';
import PodcastCard from '../../components/podcast/PodcastCard';
import {GET_STORAGE_DATA} from '../../lib/api/APIUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NoPodcastState} from '../../components/common/EmptyStates';
import {useGetProfile} from '../../hooks/profile/useGetProfile';
import {downloadAudio, msToTime} from '../../lib/utils/Utils';
import Snackbar from 'react-native-snackbar';
import {useQueryClient} from '@tanstack/react-query';

const {width} = Dimensions.get('window');

const ACCENT_PRIMARY = '#2563EB';

export default function PodcastProfile({navigation}: PodcastProfileProp) {
  let insets = {top: 0, bottom: 0, left: 0, right: 0};
  try {
    insets = useSafeAreaInsets();
  } catch {
    // fallback for testing or non-provider contexts
  }

  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#0B1425' : '#F8FAFC';
  const cardBg = isDark ? '#111C38' : '#FFFFFF';
  const textColor = isDark ? '#F1F5F9' : '#0F172A';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0';

  const [selectedTab, setSelectedTab] = useState<'podcasts' | 'playlists' | 'episodes'>(
    'podcasts',
  );
  const [refreshing, setRefreshing] = useState(false);
  const {user_name, Profile_image, user_handle} = useAppSelector(
    (state: any) => state.user,
  );
  const {isConnected} = useAppSelector((state: any) => state.network);

  const [publishedPage, setPublishedPage] = useState(1);
  const [totalPublishPages, setTotalPublishPages] = useState(0);
  const [podcasts, setPublishedPodcasts] = useState<PodcastData[]>([]);

  const {
    data: playlistsData,
    refetch: refetchPlaylists,
    isLoading: playlistsLoading,
  } = useGetPlaylists();

  const {
    data: podcastsData,
    refetch: refetchPodcasts,
    isLoading: podcastsLoading,
  } = useGetUserPublishedPodcasts(publishedPage, isConnected);

  const {data: user} = useGetProfile();
  const {
    data: episodesData,
    refetch: refetchEpisodes,
    isLoading: episodesLoading,
  } = useGetPodcastEpisodes();

  useEffect(() => {
    if (podcastsData) {
      if (Number(publishedPage) === 1 && podcastsData.totalPages) {
        let totalPage = podcastsData.totalPages;
        setTotalPublishPages(totalPage);

        setPublishedPodcasts(podcastsData.publishedPodcasts);
      } else {
        if (podcastsData.publishedPodcasts) {
          let oldPodcasts =
            (podcasts as PodcastData[]) ?? ([] as PodcastData[]);
          let newPodcasts = podcastsData.publishedPodcasts as PodcastData[];
          setPublishedPodcasts([...oldPodcasts, ...newPodcasts]);
        }
      }
    }
  }, [podcastsData, publishedPage]);

  const playlists = playlistsData || [];

  const totalPlaylists = playlists.length;
  const episodes = episodesData || [];
  const totalEpisodes = episodes.length;

  useFocusEffect(
    useCallback(() => {
      refetchPlaylists();
      refetchPodcasts();
      refetchEpisodes();
    }, [refetchPlaylists, refetchPodcasts, refetchEpisodes]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    setPublishedPage(1);
    await Promise.all([refetchPlaylists(), refetchPodcasts(), refetchEpisodes()]);
    setRefreshing(false);
  };

  const renderEpisodeItem = ({item}: {item: PodcastEpisode}) => (
    <TouchableOpacity
      style={[styles.playlistCard, {backgroundColor: cardBg, borderColor}]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Open episode series ${item.name}`}
      accessibilityHint="Opens this episode series"
      onPress={() => {
        navigation.navigate('PlaylistDetailScreen', {
          episodeId: item._id || item.id,
          title: item.name,
        });
      }}>
      <View style={[styles.playlistIconContainer, {backgroundColor: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF'}]}>
        <MaterialCommunityIcons
          name="filmstrip"
          size={28}
          color={ACCENT_PRIMARY}
        />
      </View>
      <View style={styles.playlistInfo}>
        <Text style={[styles.playlistTitle, {color: textColor}]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.playlistCount, {color: subTextColor}]}>
          {item.podcasts_count ?? item.podcastsCount ?? 0} podcasts
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={20}
        color={subTextColor}
        accessible={false}
      />
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({item}: {item: PlayList}) => (
    <TouchableOpacity
      style={[styles.playlistCard, {backgroundColor: cardBg, borderColor}]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Open playlist ${item.title}`}
      accessibilityHint="Opens this playlist"
      onPress={() => {
        navigation.navigate('PlaylistDetailScreen', {
          playlist: item,
        });
      }}>
      <View style={[styles.playlistIconContainer, {backgroundColor: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF'}]}>
        <MaterialCommunityIcons
          name="playlist-music"
          size={28}
          color={ACCENT_PRIMARY}
        />
      </View>
      <View style={styles.playlistInfo}>
        <Text style={[styles.playlistTitle, {color: textColor}]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.playlistCount, {color: subTextColor}]}>
          {Array.isArray(item.podcasts) ? item.podcasts.length : 0} podcasts
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={20}
        color={subTextColor}
        accessible={false}
      />
    </TouchableOpacity>
  );

  const renderPodcastItem = ({item}: {item: PodcastData}) => (
    <View style={styles.podcastCardWrapper}>
      <PodcastCard
        id={item._id}
        title={item.title}
        audioUrl={item.audio_url}
        host={item.user_id.user_name}
        views={item.viewUsers.length}
        duration={`${msToTime(item.duration)}`}
        tags={item.tags}
        downloaded={false}
        display={true}
        downLoadAudio={async () => {
          if (isConnected) {
            Snackbar.show({
              text: 'Starting download in background...',
              duration: Snackbar.LENGTH_SHORT,
            });
            const res = await downloadAudio(item);
            if (res?.message) {
              Snackbar.show({
                text: res.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          } else {
            Snackbar.show({
              text: 'Internet connection required',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        }}
        handleClick={() => {
          navigation.navigate('PodcastDetail', {
            trackId: item._id,
            audioUrl: item.audio_url,
          });
        }}
        imageUri={item.cover_image}
        handleReport={() => {}}
        playlistAct={() => {
          setSelectedTab('playlists');
        }}
      />
    </View>
  );

  if (playlistsLoading && podcastsLoading) {
    return <Loader />;
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {/* Top Header Bar */}
      <View
        style={[
          styles.topHeader,
          {
            paddingTop: Math.max(insets.top, 10),
            backgroundColor: cardBg,
            borderBottomColor: borderColor,
          },
        ]}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => {
            queryClient.invalidateQueries({queryKey: ['get-my-playlists']});
            navigation.goBack();
          }}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={22} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.topHeaderTitle, {color: textColor}]}>Podcast Studio</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT_PRIMARY} />
        }
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 28},
        ]}>
        {/* Profile Card Header */}
        <View style={[styles.profileHeader, {backgroundColor: cardBg, borderColor}]}>
          <View style={styles.profileImageContainer}>
            {Profile_image ? (
              <Image
                source={{
                  uri: user?.Profile_image.startsWith('http')
                    ? user?.Profile_image
                    : `${GET_STORAGE_DATA}/${user?.Profile_image}`,
                }}
                style={[styles.profileImage, {borderColor: ACCENT_PRIMARY}]}
                accessible={true}
                accessibilityLabel={`${user?.user_name || 'User'} profile picture`}
              />
            ) : (
              <View
                style={[styles.profileImage, styles.profileImagePlaceholder, {borderColor: ACCENT_PRIMARY}]}
                accessible={true}
                accessibilityLabel="Default user profile picture">
                <MaterialCommunityIcons
                  name="account"
                  size={56}
                  color={subTextColor}
                  accessible={false}
                />
              </View>
            )}
          </View>
          <Text style={[styles.profileName, {color: textColor}]}>{user?.user_name || 'User'}</Text>
          <Text style={[styles.profileHandle, {color: subTextColor}]}>
            @{user?.user_handle || 'user'}
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: ACCENT_PRIMARY}]}>{podcasts?.length || 0}</Text>
              <Text style={[styles.statLabel, {color: subTextColor}]}>Podcasts</Text>
            </View>
            <View style={[styles.statDivider, {backgroundColor: borderColor}]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: ACCENT_PRIMARY}]}>{totalPlaylists}</Text>
              <Text style={[styles.statLabel, {color: subTextColor}]}>Playlists</Text>
            </View>
            <View style={[styles.statDivider, {backgroundColor: borderColor}]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: ACCENT_PRIMARY}]}>{totalEpisodes}</Text>
              <Text style={[styles.statLabel, {color: subTextColor}]}>Series</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[
                styles.workspaceButton,
                {
                  backgroundColor: isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF',
                  borderColor: ACCENT_PRIMARY,
                },
              ]}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Visit Workspace"
              accessibilityHint="Opens your podcast workspace"
              onPress={() => navigation.navigate('OverviewScreen')}>
              <Ionicons name="grid-outline" size={17} color={ACCENT_PRIMARY} />
              <Text style={[styles.workspaceButtonText, {color: ACCENT_PRIMARY}]}>Workspace</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.createPodcastButton, {backgroundColor: ACCENT_PRIMARY}]}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Create Podcast"
              accessibilityHint="Opens the podcast creation form"
              onPress={() => navigation.navigate('PodcastForm')}>
              <Ionicons
                name="mic"
                size={17}
                color="#ffffff"
                accessible={false}
              />
              <Text style={styles.createPodcastButtonText}>Create Podcast</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={[styles.tabContainer, {backgroundColor: cardBg, borderColor}]}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'podcasts' && [
                styles.activeTab,
                {backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : 'rgba(37,99,235,0.1)'},
              ],
            ]}
            onPress={() => setSelectedTab('podcasts')}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityLabel="Podcasts"
            accessibilityState={{selected: selectedTab === 'podcasts'}}>
            <MaterialCommunityIcons
              name="microphone"
              size={18}
              color={selectedTab === 'podcasts' ? ACCENT_PRIMARY : subTextColor}
              accessible={false}
            />
            <Text
              style={[
                styles.tabText,
                {color: subTextColor},
                selectedTab === 'podcasts' && [styles.activeTabText, {color: ACCENT_PRIMARY}],
              ]}>
              Podcasts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'playlists' && [
                styles.activeTab,
                {backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : 'rgba(37,99,235,0.1)'},
              ],
            ]}
            onPress={() => setSelectedTab('playlists')}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityLabel="Playlists"
            accessibilityState={{selected: selectedTab === 'playlists'}}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={18}
              color={selectedTab === 'playlists' ? ACCENT_PRIMARY : subTextColor}
              accessible={false}
            />
            <Text
              style={[
                styles.tabText,
                {color: subTextColor},
                selectedTab === 'playlists' && [styles.activeTabText, {color: ACCENT_PRIMARY}],
              ]}>
              Playlists
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'episodes' && [
                styles.activeTab,
                {backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : 'rgba(37,99,235,0.1)'},
              ],
            ]}
            onPress={() => setSelectedTab('episodes')}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityLabel="Series"
            accessibilityState={{selected: selectedTab === 'episodes'}}>
            <MaterialCommunityIcons
              name="filmstrip"
              size={18}
              color={selectedTab === 'episodes' ? ACCENT_PRIMARY : subTextColor}
              accessible={false}
            />
            <Text
              style={[
                styles.tabText,
                {color: subTextColor},
                selectedTab === 'episodes' && [styles.activeTabText, {color: ACCENT_PRIMARY}],
              ]}>
              Series
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {selectedTab === 'podcasts' ? (
            podcasts && podcasts.length > 0 ? (
              <View>
                {podcasts.map((item: PodcastData, index: number) => (
                  <View key={`podcast-${item._id}-${index}`}>
                    {renderPodcastItem({item})}
                  </View>
                ))}
              </View>
            ) : (
              <View style={[styles.emptyState, {backgroundColor: cardBg, borderColor}]}>
                <MaterialCommunityIcons
                  name="microphone-off"
                  size={52}
                  color={subTextColor}
                  accessible={false}
                />
                <Text style={[styles.emptyText, {color: textColor}]}>No podcasts yet</Text>
                <Text style={[styles.emptySubText, {color: subTextColor}]}>
                  Create your first podcast to share your voice with the community
                </Text>
                <TouchableOpacity
                  style={[styles.emptyButton, {backgroundColor: ACCENT_PRIMARY}]}
                  accessibilityRole="button"
                  accessibilityLabel="Create Podcast"
                  accessibilityHint="Opens the podcast creation form"
                  onPress={() => navigation.navigate('PodcastForm')}>
                  <Text style={styles.emptyButtonText}>Create Podcast</Text>
                </TouchableOpacity>
              </View>
            )
          ) : selectedTab === 'playlists' ? (
            playlists.length > 0 ? (
              <View>
                {playlists.map((item: any, index: number) => (
                  <View key={`playlist-${item._id}-${index}`}>
                    {renderPlaylistItem({item})}
                  </View>
                ))}
              </View>
            ) : (
              <View style={[styles.emptyState, {backgroundColor: cardBg, borderColor}]}>
                <MaterialCommunityIcons
                  name="playlist-music-outline"
                  size={52}
                  color={subTextColor}
                  accessible={false}
                />
                <Text style={[styles.emptyText, {color: textColor}]}>No playlists yet</Text>
                <Text style={[styles.emptySubText, {color: subTextColor}]}>
                  Save podcasts to create your first organized playlist
                </Text>
              </View>
            )
          ) : (
            episodes.length > 0 ? (
              <View>
                <View style={styles.seriesHeaderRow}>
                  <Text style={[styles.seriesSectionTitle, {color: textColor}]}>Series & Episodes</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PodcastEpisodesScreen')}
                    accessibilityRole="button"
                    accessibilityLabel="Manage Episodes">
                    <Text style={[styles.manageAllText, {color: ACCENT_PRIMARY}]}>Manage All</Text>
                  </TouchableOpacity>
                </View>
                {episodes.map((item: any, index: number) => (
                  <View key={`episode-${item._id || item.id || index}`}>
                    {renderEpisodeItem({item})}
                  </View>
                ))}
              </View>
            ) : (
              <View style={[styles.emptyState, {backgroundColor: cardBg, borderColor}]}>
                <MaterialCommunityIcons
                  name="filmstrip-off"
                  size={52}
                  color={subTextColor}
                  accessible={false}
                />
                <Text style={[styles.emptyText, {color: textColor}]}>No series or episodes yet</Text>
                <Text style={[styles.emptySubText, {color: subTextColor}]}>
                  Group your podcasts into episodic shows to build recurring listeners
                </Text>
                <TouchableOpacity
                  style={[styles.emptyButton, {backgroundColor: ACCENT_PRIMARY}]}
                  accessibilityRole="button"
                  accessibilityLabel="Manage Episodes"
                  onPress={() => navigation.navigate('PodcastEpisodesScreen')}>
                  <Text style={styles.emptyButtonText}>Create Series</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerBackButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerRightPlaceholder: {
    width: 38,
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileHeader: {
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
  },
  profileImagePlaceholder: {
    backgroundColor: 'rgba(100, 116, 139, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  profileHandle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    marginTop: 4,
  },
  workspaceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 6,
  },
  workspaceButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  createPodcastButton: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 6,
    shadowColor: ACCENT_PRIMARY,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  createPodcastButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 6,
  },
  activeTab: {},
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  playlistIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  playlistInfo: {
    flex: 1,
    marginRight: 8,
  },
  playlistTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  playlistCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  podcastCardWrapper: {
    marginBottom: 12,
  },
  seriesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  seriesSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  manageAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    maxWidth: 280,
  },
  emptyButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
