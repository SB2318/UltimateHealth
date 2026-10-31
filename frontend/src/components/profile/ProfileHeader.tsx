/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  Pressable,
  useColorScheme,
} from 'react-native';
import React from 'react';
import AccessibleTouchable from '../common/AccessibleTouchable';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileHeaderProps } from '../../schemas/type';
import { fp, hp, wp } from '../../lib/ui/Metric';
import { GET_STORAGE_DATA } from '../../lib/api/APIUtils';
import { buildMailLink, buildPhoneLink } from '../../lib/utils/contactLinks';
import { useAppSelector } from '../../store/hooks';
import Snackbar from 'react-native-snackbar';

const ProfileHeader = ({
  isDoctor,
  username,
  userhandle,
  profileImg,
  userPhoneNumber,
  userEmailID,
  specialization,
  experience,
  qualification,
  navigation,
  other,
  followers,
  followings,
  onFollowerPress,
  onFollowingPress,
  isFollowing,
  onFollowClick,
  onOverviewClick,
  about,
}: ProfileHeaderProps & { about?: string }) => {
  const { isConnected } = useAppSelector((state: any) => state.network);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themeColors = {
    background: isDark ? '#111827' : '#FFFFFF',
    text: isDark ? '#F9FAFB' : '#111827',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    card: isDark ? '#1F2937' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
    iconBackground: isDark ? '#374151' : '#F3F4F6',
    bannerBg: isDark ? '#1E293B' : '#000A60',
    bioBg: isDark ? '#1F2937' : '#F8FAFC',
    bioBorder: isDark ? '#374151' : '#E2E8F0',
  };

  const handleCall = (phone: string | undefined) => {
    const phoneLink = buildPhoneLink(phone, Platform.OS);
    if (!phoneLink) {
      Alert.alert('Invalid Phone Number', 'The provided phone number is not valid.');
      return;
    }
    Linking.openURL(phoneLink).catch(() =>
      Alert.alert('Unable to make call', 'Could not open the phone application.'),
    );
  };

  const handleMail = (mail: string | undefined) => {
    const mailLink = buildMailLink(mail);
    if (!mailLink) {
      Alert.alert('Invalid Email Address', 'The provided email address is not valid.');
      return;
    }
    Linking.openURL(mailLink).catch(() =>
      Alert.alert('Unable to send email', 'Could not open the email application.'),
    );
  };

  const getProfileImageUrl = () => {
    if (!profileImg) return undefined;
    return profileImg.startsWith('http')
      ? profileImg
      : `${GET_STORAGE_DATA}/${profileImg}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Decorative top accent band */}
      <View style={[styles.bannerBar, { backgroundColor: themeColors.bannerBg }]} />

      <View style={styles.contentContainer}>
        {/* Profile Image with subtle ring */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                getProfileImageUrl() ||
                'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={[
              styles.profileImage,
              { backgroundColor: themeColors.iconBackground, borderColor: themeColors.card },
            ]}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={`${username || 'User'} profile picture`}
          />
          {isDoctor && (
            <View style={styles.doctorBadge} accessibilityLabel="Verified Doctor">
              <FontAwesome name="user-md" size={14} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* User Info */}
        <Text style={[styles.nameText, { color: themeColors.text }]} numberOfLines={1}>
          {username || 'Anonymous User'}
        </Text>
        <Text style={[styles.usernameText, { color: BUTTON_COLOR }]} numberOfLines={1}>
          @{userhandle || 'username'}
        </Text>

        {/* Doctor Experience Tag */}
        {isDoctor && Boolean(experience) && (
          <View style={styles.experienceContainer}>
            <FontAwesome name="stethoscope" size={14} color={themeColors.textSecondary} />
            <Text style={[styles.experienceText, { color: themeColors.textSecondary }]}>
              {experience} years experience
            </Text>
          </View>
        )}

        {/* Bio / About */}
        {Boolean(about) && (
          <View style={[styles.bioCard, { backgroundColor: themeColors.bioBg, borderColor: themeColors.bioBorder }]}>
            <Text style={[styles.bioText, { color: themeColors.text }]} numberOfLines={3}>
              {about}
            </Text>
          </View>
        )}

        {/* Primary Actions:
            - other === true: viewing own profile — show Edit Profile button
            - other === false: viewing someone else — show Follow/Unfollow OR Doctor Call/Email */}
        <View style={styles.primaryActionContainer}>
          {other ? (
            <View style={styles.primaryActionRow}>
              <AccessibleTouchable
                activeOpacity={0.7}
                onPress={() => (navigation as any).navigate('ProfileEditScreen')}
                accessibilityLabel="Edit profile"
                accessibilityHint="Navigates to edit profile screen"
                style={[styles.primaryBtn, { backgroundColor: BUTTON_COLOR, flex: 1 }]}>
                <Ionicons name="pencil" size={18} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>Edit Profile</Text>
              </AccessibleTouchable>

              <AccessibleTouchable
                activeOpacity={0.7}
                onPress={() => {
                  if (isConnected) {
                    (navigation as any).navigate('LogoutScreen', {
                      profile_image: profileImg,
                      username: username,
                    });
                  } else {
                    Snackbar.show({
                      text: 'Please check your internet connection!',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }
                }}
                accessibilityLabel="Logout"
                accessibilityHint="Logs out from your account"
                style={[
                  styles.logoutIconBtn,
                  { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2' },
                ]}>
                <MaterialIcons name="logout" size={22} color="#EF4444" />
              </AccessibleTouchable>
            </View>
          ) : isDoctor ? (
            <View style={styles.contactContainer}>
              <AccessibleTouchable
                activeOpacity={0.7}
                onPress={() => handleCall(userPhoneNumber)}
                accessibilityLabel="Call doctor"
                accessibilityHint="Opens phone dialer to call the doctor"
                style={[styles.iconButton, { backgroundColor: BUTTON_COLOR }]}>
                <MaterialIcons name="phone-in-talk" size={22} color="#ffffff" />
              </AccessibleTouchable>
              <AccessibleTouchable
                activeOpacity={0.7}
                onPress={() => handleMail(userEmailID)}
                accessibilityLabel="Send email"
                accessibilityHint="Opens mail app to send an email"
                style={[styles.iconButton, { backgroundColor: BUTTON_COLOR }]}>
                <MaterialIcons name="email" size={22} color="#ffffff" />
              </AccessibleTouchable>
            </View>
          ) : (
            <AccessibleTouchable
              activeOpacity={0.7}
              onPress={onFollowClick}
              accessibilityLabel={isFollowing ? 'Following user' : 'Follow user'}
              accessibilityHint={isFollowing ? 'Unfollow this user' : 'Follow this user'}
              style={[
                styles.primaryBtn,
                {
                  backgroundColor: isFollowing ? 'transparent' : BUTTON_COLOR,
                  borderWidth: 1.5,
                  borderColor: BUTTON_COLOR,
                },
              ]}>
              <Ionicons
                name={isFollowing ? 'checkmark-outline' : 'person-add-outline'}
                size={18}
                color={isFollowing ? BUTTON_COLOR : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.primaryBtnText,
                  { color: isFollowing ? BUTTON_COLOR : '#FFFFFF' },
                ]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </AccessibleTouchable>
          )}
        </View>

        {/* Doctor Credentials Card */}
        {isDoctor && (Boolean(specialization) || Boolean(qualification)) && (
          <View
            style={[
              styles.statsCard,
              styles.doctorInfoCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            {Boolean(specialization) && (
              <View style={styles.statItem}>
                <Text style={[styles.doctorInfoValue, { color: BUTTON_COLOR }]} numberOfLines={2}>
                  {specialization}
                </Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Specialization</Text>
              </View>
            )}
            {Boolean(specialization) && Boolean(qualification) && (
              <View style={[styles.statDividerFull, { backgroundColor: themeColors.border }]} />
            )}
            {Boolean(qualification) && (
              <View style={styles.statItem}>
                <Text style={[styles.doctorInfoValue, { color: BUTTON_COLOR }]} numberOfLines={2}>
                  {qualification}
                </Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Qualification</Text>
              </View>
            )}
          </View>
        )}

        {/* Followers / Following Stats Card */}
        <View
          style={[
            styles.statsCard,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}>
          <Pressable
            onPress={onFollowerPress}
            style={styles.statItem}
            accessibilityRole="button"
            accessibilityLabel={`Followers: ${followers || 0}`}
            accessibilityHint="Opens followers list">
            <Text style={[styles.statValue, { color: themeColors.text }]} numberOfLines={1}>
              {followers || 0}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
              {followers === 1 ? 'Follower' : 'Followers'}
            </Text>
          </Pressable>
          <View style={[styles.statDivider, { backgroundColor: themeColors.border }]} />
          <Pressable
            onPress={onFollowingPress}
            style={styles.statItem}
            accessibilityRole="button"
            accessibilityLabel={`Following: ${followings || 0}`}
            accessibilityHint="Opens following users list">
            <Text style={[styles.statValue, { color: themeColors.text }]} numberOfLines={1}>
              {followings || 0}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Following</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(2),
    position: 'relative',
  },
  bannerBar: {
    height: 70,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: -45,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  profileImage: {
    height: 96,
    width: 96,
    borderRadius: 48,
    borderWidth: 3,
  },
  doctorBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: BUTTON_COLOR,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  experienceText: {
    fontSize: 13,
    fontWeight: '500',
  },
  bioCard: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: '90%',
  },
  bioText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  primaryActionContainer: {
    marginVertical: hp(2),
    width: '100%',
  },
  primaryActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: wp(3),
  },
  logoutIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(5),
  },
  iconButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: wp(5),
    gap: 8,
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statsCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp(0.8),
    borderRadius: 16,
    paddingVertical: hp(1.8),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  statDivider: {
    width: 1,
    height: '60%',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
  },
  doctorInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
  },
  doctorInfoCard: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  statDividerFull: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
