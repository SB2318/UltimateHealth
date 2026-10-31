/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import GeneralTab from '../../components/profile/GeneralTab';
import { GeneralFormData, ContactFormData, ProfFormData, PasswordFormData } from '../../schemas/zod/profileSchemas';
import ContactTab from '../../components/profile/ContactTab';
import ProfessionalTab from '../../components/profile/ProfessionalTab';
import PasswordTab from '../../components/profile/PasswordTab';
import LanguagePreferenceSelector from '../../components/profile/LanguagePreferenceSelector';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDoctorProfileIncomplete } from '../../store/UserSlice';
import { ProfileEditScreenProp } from '../../schemas/type';
import { GET_STORAGE_DATA } from '../../lib/api/APIUtils';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import useUploadImage from '../../hooks/media/useUploadImage';
import Snackbar from 'react-native-snackbar';
import { useGetUserDetails } from '../../hooks/profile/useGetUserDetails';
import { useUpdatePassword } from '../../hooks/auth/useUpdatePassword';
import { useUpdateProfileImage } from '../../hooks/profile/useUpdateProfileImage';
import { useUpdateUserContactDetail } from '../../hooks/profile/useUpdateUserContactDetail';
import { useUpdateUserGeneralDetails } from '../../hooks/profile/useUpdateUserGeneralDetails';
import { useUpdateUserProfDetails } from '../../hooks/profile/useUpdateUserProfDetails';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Ionicons from '@expo/vector-icons/Ionicons';

const TABS = ['General', 'Professional', 'Contact', 'Password', 'Language'];

const ProfileEditScreen = ({ navigation }: ProfileEditScreenProp) => {
  const { uploadImage, loading } = useUploadImage();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  const [currentTab, setCurrentTab] = useState<string>(TABS[0]);

  const { mutate: updatePassword, isPending: passwordMutationPending } = useUpdatePassword();
  const { mutate: updateProfileImage, isPending: profileImagePending } = useUpdateProfileImage();
  const { mutate: updateContactDetails, isPending: contactDetailsPending } = useUpdateUserContactDetail();
  const { mutate: updateGeneralDetails, isPending: generalDetailsPending } = useUpdateUserGeneralDetails();
  const { mutate: updateProfessionalDetails, isPending: professionalDetailPending } = useUpdateUserProfDetails();

  const [user_profile_image, setUserProfileImage] = useState('');
  const { user_token } = useAppSelector((state: any) => state.user);
  const { isConnected } = useAppSelector((state: any) => state.network);
  const { data: user } = useGetUserDetails(isConnected);

  useEffect(() => {
    if (user) {
      setUserProfileImage(
        user.Profile_image
          ? user.Profile_image.startsWith('http')
            ? user.Profile_image
            : `${GET_STORAGE_DATA}/${user.Profile_image}`
          : '',
      );
    }
  }, [user]);

  const isDoctor = user ? user?.isDoctor! : false;

  const handleSubmitGeneralDetails = (data: GeneralFormData) => {
    if (!isConnected) {
      Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    updateGeneralDetails(
      { username: data.username, about: data.about, userHandle: data.userHandle, email: data.email },
      {
        onSuccess: _data => { Alert.alert('Success', 'Details updated successfully'); },
        onError: (err: any) => handleApiError(err, 'Update Failed'),
      },
    );
  };

  const handleSubmitContactDetails = (data: ContactFormData) => {
    if (!isConnected) {
      Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    updateContactDetails(
      { phone: data.phone_number, email: data.contact_email },
      {
        onSuccess: _data => { Alert.alert('Success', 'Contact details updated successfully'); },
        onError: (err: any) => handleApiError(err, 'Update Failed'),
      },
    );
  };

  const handleSubmitProfessionalDetails = (data: ProfFormData) => {
    if (!isConnected) {
      Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    updateProfessionalDetails(
      { specialization: data.specialization, qualification: data.qualification, experience: data.experience },
      {
        onSuccess: _data => {
          dispatch(setDoctorProfileIncomplete(false));
          Alert.alert('Success', 'Professional details updated successfully');
        },
        onError: (err: any) => handleApiError(err, 'Update Failed'),
      },
    );
  };

  const handleSubmitPassword = (data: PasswordFormData) => {
    if (!isConnected) {
      Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    updatePassword(
      { old_password: data.old_password, new_password: data.new_password },
      {
        onSuccess: _data => {
          Snackbar.show({ text: 'Password updated successfully', duration: Snackbar.LENGTH_SHORT });
        },
        onError: (err: any) => {
          if (err.response?.status === 401) {
            Alert.alert('Password Update Failed', 'Old password is incorrect.');
          } else {
            handleApiError(err, 'Password Update Failed');
          }
        },
      },
    );
  };

  const handleApiError = (err: any, title: string) => {
    if (err.response) {
      const msg = (err?.response?.data as any)?.error || 'Something went wrong. Please try again.';
      Alert.alert(title, msg);
    } else {
      Alert.alert(title, 'Network error. Please check your connection.');
    }
  };

  const selectImage = async () => {
    const options: ImageLibraryOptions = { mediaType: 'photo' };
    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorMessage) { console.log('ImagePicker Error: ', response.errorMessage); return; }
      if (response.assets) {
        const { uri, fileSize } = response.assets[0];
        if (fileSize && fileSize > 1024 * 1024) { Alert.alert('Error', 'File size exceeds 1 MB.'); return; }
        if (uri) {
          ImageResizer.createResizedImage(uri, 1000, 1000, 'JPEG', 100)
            .then(async resizedImageUri => {
              setUserProfileImage(resizedImageUri.uri);
              Alert.alert('', 'Use this photo as your profile picture?', [
                { text: 'Cancel', onPress: () => setUserProfileImage(user?.Profile_image || ''), style: 'cancel' },
                {
                  text: 'Confirm',
                  onPress: async () => {
                    try {
                      if (isConnected) {
                        const result = await uploadImage(resizedImageUri.uri);
                        updateProfileImage(result as string, {
                          onSuccess: _data => { Alert.alert('Success', 'Profile picture updated'); },
                          onError: (err: any) => handleApiError(err, 'Update Failed'),
                        });
                      } else {
                        Snackbar.show({ text: 'Please check your internet connection!', duration: Snackbar.LENGTH_SHORT });
                      }
                    } catch (err: any) {
                      Alert.alert('Error', 'Upload failed. Please try again.');
                    }
                  },
                },
              ], { cancelable: false });
            })
            .catch(() => { Alert.alert('Error', 'Could not resize the image.'); });
        }
      }
    });
  };

  const isLoading =
    loading || generalDetailsPending || contactDetailsPending ||
    professionalDetailPending || profileImagePending || passwordMutationPending;

  const visibleTabs = TABS.filter(tab => isDoctor || tab !== 'Professional');

  // Unified Theme Colors
  const colors = {
    bg: isDark ? '#111827' : '#F5F7FA',
    headerBg: isDark ? '#1F2937' : '#FFFFFF',
    headerBorder: isDark ? '#374151' : '#E5E7EB',
    headerTitle: isDark ? '#F9FAFB' : '#111827',
    backBtnBg: isDark ? '#374151' : '#F3F4F6',
    backBtnIcon: isDark ? '#F9FAFB' : '#111827',
    tabBarBg: isDark ? '#1F2937' : '#FFFFFF',
    tabBorder: isDark ? '#374151' : '#E5E7EB',
    tabInactive: isDark ? '#9CA3AF' : '#6B7280',
    tabActive: BUTTON_COLOR,
    overlayBg: isDark ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.headerBg }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.headerBg} />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.backBtnBg }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={22} color={colors.backBtnIcon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.headerTitle }]}>Edit Profile</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* ── Tab Bar ── */}
      <View style={[styles.tabBarWrapper, { backgroundColor: colors.tabBarBg, borderBottomColor: colors.tabBorder }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}>
          {visibleTabs.map(tab => {
            const active = currentTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabItem}
                onPress={() => setCurrentTab(tab)}
                accessibilityRole="tab"
                accessibilityLabel={tab}
                accessibilityState={{ selected: active }}>
                <Text
                  style={[
                    styles.tabLabel,
                    { color: active ? colors.tabActive : colors.tabInactive },
                    active && styles.tabLabelActive,
                  ]}>
                  {tab}
                </Text>
                {active && <View style={[styles.tabUnderline, { backgroundColor: BUTTON_COLOR }]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Content ── */}
      <KeyboardAwareScrollView
        style={[styles.scrollView, { backgroundColor: colors.bg }]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 50 },
        ]}
        bottomOffset={100}
        showsVerticalScrollIndicator={false}
        extraKeyboardSpace={40}
        keyboardShouldPersistTaps="handled">

        {currentTab === 'General' && (
          <GeneralTab
            user={user}
            imgUrl={user_profile_image}
            handleSubmitGeneralDetails={handleSubmitGeneralDetails}
            selectImage={selectImage}
          />
        )}
        {currentTab === 'Professional' && (
          <ProfessionalTab
            user={user}
            handleSubmitProfessionalDetails={handleSubmitProfessionalDetails}
          />
        )}
        {currentTab === 'Contact' && (
          <ContactTab
            user={user}
            handleSubmitContactDetails={handleSubmitContactDetails}
          />
        )}
        {currentTab === 'Password' && (
          <PasswordTab handleSubmitPassword={handleSubmitPassword} />
        )}
        {currentTab === 'Language' && (
          <LanguagePreferenceSelector
            title="Preferred Languages"
            description="Choose the languages you want to see articles and podcasts in"
            showHeader={false}
          />
        )}
      </KeyboardAwareScrollView>

      {/* ── Loading Overlay ── */}
      {isLoading && (
        <View style={[styles.overlay, { backgroundColor: colors.overlayBg }]}>
          <LoadingSpinner size={50} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightSpacer: {
    width: 38,
    height: 38,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tabBarWrapper: {
    borderBottomWidth: 1,
  },
  tabBarContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 4,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 3,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
