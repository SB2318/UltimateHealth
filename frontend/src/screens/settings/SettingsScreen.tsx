import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import { wp, hp, fp } from '../../lib/ui/Metric';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
type SettingsScreenProps = { navigation: any };

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionLabel = ({ label, isDark }: { label: string; isDark: boolean }) => (
  <Text style={[styles.sectionLabel, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
    {label}
  </Text>
);

// ─── Row Item ─────────────────────────────────────────────────────────────────
interface RowProps {
  icon: string;
  iconColor: string;
  label: string;
  sublabel?: string;
  onPress: () => void;
  isDark: boolean;
  destructive?: boolean;
  hideChevron?: boolean;
}

const SettingsRow = ({
  icon,
  iconColor,
  label,
  sublabel,
  onPress,
  isDark,
  destructive = false,
  hideChevron = false,
}: RowProps) => {
  const bg = isDark ? '#1F2937' : '#FFFFFF';
  const border = isDark ? '#374151' : '#F3F4F6';
  const textColor = destructive ? '#EF4444' : isDark ? '#F9FAFB' : '#111827';
  const subColor = isDark ? '#6B7280' : '#9CA3AF';
  const iconBg = destructive
    ? 'rgba(239,68,68,0.12)'
    : isDark
    ? '#374151'
    : '#F3F4F6';

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.row, { backgroundColor: bg, borderColor: border }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <MaterialCommunityIcon name={icon as any} size={22} color={destructive ? '#EF4444' : iconColor} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: textColor }]}>{label}</Text>
        {sublabel ? (
          <Text style={[styles.rowSublabel, { color: subColor }]}>{sublabel}</Text>
        ) : null}
      </View>
      {!hideChevron && (
        <MaterialIcons name="chevron-right" size={24} color={subColor} />
      )}
    </TouchableOpacity>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const isDark = useColorScheme() === 'dark';
  const { isConnected } = useSelector((state: any) => state.network);

  const bg = isDark ? '#111827' : '#F9FAFB';
  const headerBg = isDark ? '#1F2937' : '#FFFFFF';
  const headerBorder = isDark ? '#374151' : '#E5E7EB';
  const headerText = isDark ? '#F9FAFB' : '#111827';

  const go = (screen: any, params?: any) => {
    if (!isConnected) {
      Snackbar.show({
        text: 'Please check your internet connection!',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    // SettingsScreen lives inside the Tab navigator, so we must bubble up
    // to the parent Stack navigator to reach stack-only screens.
    const stackNav = navigation.getParent() ?? navigation;
    (stackNav as any).navigate(screen, params);
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          const stackNav = navigation.getParent() ?? navigation;
          (stackNav as any).navigate('LogoutScreen', { profile_image: '', username: '' });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: headerBg, borderBottomColor: headerBorder }]}>
        <Text style={[styles.headerTitle, { color: headerText }]}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── ACCOUNT ── */}
        <SectionLabel label="ACCOUNT" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="account-edit-outline"
            iconColor={PRIMARY_COLOR}
            label="View / Edit Profile"
            sublabel="Update your name, avatar, bio"
            onPress={() => go('ProfileScreen')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="bell-outline"
            iconColor="#8B5CF6"
            label="Notification Preferences"
            sublabel="Push, email, and digest settings"
            onPress={() => go('NotificationPreferencesScreen')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="view-dashboard"
            iconColor={PRIMARY_COLOR}
            label="Your Workspace"
            sublabel="Contributor & Admin Interaction"
            onPress={() => go('OverviewScreen')}
            isDark={isDark}
          />
        </View>

        {/* ── CONTENT ── */}
        <SectionLabel label="CONTENT & ACTIVITY" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="chart-line"
            iconColor="#10B981"
            label="Activity Insight"
            sublabel="Your writing and reading analytics"
            onPress={() => go('InsightScreen')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="file-document-outline"
            iconColor="#3B82F6"
            label="My Posts"
            sublabel="Articles you have written"
            onPress={() => go('ContentListScreen', { type: 'articles' })}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="repeat-variant"
            iconColor="#F59E0B"
            label="Reposted Articles"
            onPress={() => go('ContentListScreen', { type: 'reposts' })}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="bookmark-outline"
            iconColor="#3B82F6"
            label="Saved Articles"
            sublabel="Your personal reading list"
            onPress={() => go('ContentListScreen', { type: 'saved' })}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="history"
            iconColor="#6366F1"
            label="Reading History"
            onPress={() => go('ReadingHistoryScreen')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="heart-pulse"
            iconColor="#EF4444"
            label="Wellness Dashboard"
            sublabel="Track your health goals"
            onPress={() => go('WellnessDashboardScreen')}
            isDark={isDark}
          />
        </View>

        {/* ── LEGAL & PRIVACY ── */}
        <SectionLabel label="LEGAL & PRIVACY" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="shield-check-outline"
            iconColor="#10B981"
            label="Privacy Policy"
            sublabel="Terms & conditions"
            onPress={() => go('Privacy')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="book-open-outline"
            iconColor="#3B82F6"
            label="Community Guidelines"
            onPress={() => go('CommunityGuidelines')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="source-branch"
            iconColor="#6366F1"
            label="Open Source Licences"
            onPress={() => go('OpenSourcePage')}
            isDark={isDark}
          />
          <View style={[styles.divider, { backgroundColor: isDark ? '#374151' : '#F3F4F6' }]} />
          <SettingsRow
            icon="account-group-outline"
            iconColor="#F59E0B"
            label="Contributors"
            sublabel="The people who built this"
            onPress={() => go('ContributorPage')}
            isDark={isDark}
          />
        </View>

        {/* ── ABOUT ── */}
        <SectionLabel label="ABOUT" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="hospital-box-outline"
            iconColor={PRIMARY_COLOR}
            label="About UltimateHealth"
            sublabel="Version, team, & mission"
            onPress={() => go('AboutScreen')}
            isDark={isDark}
          />
        </View>

        {/* ── RESPECT GIVER ── */}
        <SectionLabel label="RESPECT GIVER" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="shield-star-outline"
            iconColor="#C084FC"
            label="Moumita Debnath"
            sublabel="Justice · Dignity · Hope — Story coming soon"
            onPress={() => go('RespectGiverScreen')}
            isDark={isDark}
          />
        </View>

        {/* ── DANGER ZONE ── */}
        <SectionLabel label="SESSION" isDark={isDark} />
        <View style={styles.group}>
          <SettingsRow
            icon="logout-variant"
            iconColor="#EF4444"
            label="Sign Out"
            onPress={handleLogout}
            isDark={isDark}
            destructive
          />
        </View>

        {/* ── Footer note ── */}
        <Text style={[styles.footer, { color: isDark ? '#4B5563' : '#9CA3AF' }]}>
          UltimateHealth · Built with ❤️ for better health
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
  },
  backBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fp(5.5),
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  scroll: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(8),
  },
  sectionLabel: {
    fontSize: fp(3.2),
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: hp(2),
    marginBottom: hp(0.8),
    marginLeft: wp(1),
  },
  group: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: hp(0.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderWidth: 0,
  },
  divider: {
    height: 1,
    marginLeft: wp(16),
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: fp(4.2),
    fontWeight: '600',
  },
  rowSublabel: {
    fontSize: fp(3.2),
    marginTop: 2,
  },
  footer: {
    textAlign: 'center',
    fontSize: fp(3),
    marginTop: hp(2),
  },
});
