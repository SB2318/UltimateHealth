/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import { InsightScreenProp } from '../../schemas/type';
import ActivityOverview from '../../components/profile/ActivityOverview';
import Loader from '../../components/common/Loader';
import { useGetProfile } from '../../hooks/profile/useGetProfile';
import { useUpdateViewCount } from '../../hooks/article/useUpdateViewCount';
import Snackbar from 'react-native-snackbar';
import { useAppSelector } from '../../store/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';

const InsightScreen = ({ navigation }: InsightScreenProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { isConnected } = useAppSelector((state: any) => state.network);

  const [articleId, setArticleId] = useState<number>();
  const [authorId, setAuthorId] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');

  const { data: user, isLoading } = useGetProfile();
  const { mutate: updateViewCount } = useUpdateViewCount(articleId ?? 0);

  const onArticleViewed = ({
    articleId: vArticleId,
    authorId: vAuthorId,
    recordId: vRecordId,
  }: {
    articleId: number;
    authorId: string;
    recordId: string;
  }) => {
    if (isConnected) {
      setArticleId(vArticleId);
      setAuthorId(vAuthorId);
      setRecordId(vRecordId);

      updateViewCount(Number(vArticleId), {
        onSuccess: async () => {
          navigation.navigate('ArticleScreen', {
            articleId: Number(vArticleId),
            authorId: vAuthorId,
            recordId: vRecordId,
          });
        },
        onError: () => {
          Alert.alert('Internal server error, try again!');
        },
      });
    } else {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const colors = {
    bg: isDarkMode ? '#111827' : '#F5F7FA',
    headerBg: isDarkMode ? '#1F2937' : '#FFFFFF',
    border: isDarkMode ? '#374151' : '#E5E7EB',
    title: isDarkMode ? '#F9FAFB' : '#111827',
    subtitle: isDarkMode ? '#9CA3AF' : '#6B7280',
    backBtnBg: isDarkMode ? '#374151' : '#F3F4F6',
    backBtnIcon: isDarkMode ? '#F9FAFB' : '#111827',
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.bg }]} edges={['top']}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.headerBg} />
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.headerBg }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.headerBg} />

      {/* ── Modern Professional Header ── */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.backBtnBg }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen">
          <Ionicons name="arrow-back" size={22} color={colors.backBtnIcon} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: colors.title }]}>Activity Insights</Text>
          <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>
            Reading, writing & engagement analytics
          </Text>
        </View>

        <View style={styles.headerRightSpacer}>
          <View style={[styles.iconPill, { backgroundColor: isDarkMode ? '#374151' : '#EFF6FF' }]}>
            <Ionicons name="stats-chart" size={18} color={BUTTON_COLOR} />
          </View>
        </View>
      </View>

      <View style={[styles.content, { backgroundColor: colors.bg }]}>
        <ActivityOverview
          onArticleViewed={onArticleViewed}
          others={false}
          user_handle={user?.user_handle || ''}
          articlePosted={user?.articles ? user.articles.length : 0}
        />
      </View>
    </SafeAreaView>
  );
};

export default InsightScreen;

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  headerRightSpacer: {
    width: 38,
    alignItems: 'flex-end',
  },
  iconPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});
