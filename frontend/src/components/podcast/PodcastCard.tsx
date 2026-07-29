 
import React, {useRef} from 'react';
import {TouchableOpacity, Alert, StyleSheet, View} from 'react-native';
import {YStack, XStack, Image, Text} from 'tamagui';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {formatCount} from '../../lib/utils/Utils';
import {Category} from '../../schemas/type';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import PodcastActions from './PodcastActions';
import Share from 'react-native-share';
import {GET_STORAGE_DATA} from '../../lib/api/APIUtils';
import {GlassStyles, ProfessionalColors, BorderRadius} from '../../styles/GlassStyles';
import {useAppSelector} from '../../store/hooks';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { PODCAST_CARD } from '@/src/constants/podcastCard';
import {getPlaybackPosition, PlaybackPosition} from '../../lib/platform/PlaybackManager';

interface PodcastProps {
  id: string;
  downloaded: boolean;
  display: boolean;
  title: string;
  host: string;
  audioUrl: string;
  imageUri: string;
  views: number;
  tags: Category[];
  duration: string;
  handleClick: () => void;
  downLoadAudio: () => void;
  handleReport: () => void;
  playlistAct: (id: string) => void;
}

const PodcastCard = ({
  id,
  title,
  host,
  imageUri,
  views,
  duration,
  tags,
  audioUrl,
  handleClick,
  downLoadAudio,
  handleReport,
  downloaded,
  display,
  playlistAct,
}: PodcastProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const {isGuest} = useAppSelector((state: any) => state.user);
  const navigation = useNavigation<any>();
  const [progress, setProgress] = React.useState<PlaybackPosition | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      getPlaybackPosition(id).then(pos => {
      .catch(err => console.error(err))