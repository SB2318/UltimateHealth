import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { YStack, Text, Button, XStack, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import { SignInScreenProp } from '../../schemas/type';
import { useAppDispatch } from '../../store/hooks';
import {
  setUserToken,
  setUserId,
  setUserHandle,
  setGuestMode,
  setDoctorProfileIncomplete,
} from '../../store/UserSlice';
import { useGoogleAuthMutation } from '../../hooks/auth/useGoogleAuth';
import { useRequestVerification } from '../../hooks/auth/useResendVerification';
import EmailVerifyModal from '../../components/auth/EmailVerifyModal';
import { SECURE_KEYS, secureStoreItem } from '../../lib/storage/SecureStorageUtils';
import Constants from 'expo-constants';

const BUTTON_COLOR = '#0F52BA';

const extra = Constants.expoConfig?.extra ?? {};

try {
  GoogleSignin.configure({
    webClientId: extra.WEB_CLIENT_ID,
    offlineAccess: true,
  });
} catch {
  // Graceful fallback for test or mock environments
}

const useSafeInsets = () => {
  try {
    return useSafeAreaInsets();
  } catch {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
};

export default function SignInScreen({ navigation, route }: SignInScreenProp) {
  const insets = useSafeInsets();
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const [role, setRole] = useState<'General User' | 'Doctor'>(
    route?.params?.role || 'General User',
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState<{ email: string } | null>(null);

  const googleAuthMutation = useGoogleAuthMutation();
  const resendVerificationMutation = useRequestVerification();

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken || (userInfo as any)?.idToken;
      const user = userInfo.data?.user || (userInfo as any)?.user;

      if (!idToken) throw new Error('No ID token present');

      let fcmToken: string | undefined;
      try {
        fcmToken = await messaging().getToken();
      } catch (e) {
        console.log('Failed to get FCM token', e);
      }

      const email =
        user?.email ||
        (userInfo as any)?.user?.email ||
        (userInfo as any)?.data?.user?.email;

      const payload: any = {
        idToken,
        role,
        email: email,
        uid:
          user?.id ||
          (userInfo as any)?.user?.id ||
          (userInfo as any)?.data?.user?.id,
        user_name:
          user?.name ||
          (userInfo as any)?.user?.name ||
          (userInfo as any)?.data?.user?.name,
        Profile_image:
          user?.photo ||
          (userInfo as any)?.user?.photo ||
          (userInfo as any)?.data?.user?.photo,
        isDoctor: role === 'Doctor',
        fcmToken,
      };

      const response = await googleAuthMutation.mutateAsync(payload);

      const extractCleanToken = (candidate: any): string | undefined => {
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
          return candidate.trim();
        }
        if (candidate && typeof candidate === 'object') {
          if (
            typeof candidate.accessToken === 'string' &&
            candidate.accessToken.trim().length > 0
          ) {
            return candidate.accessToken.trim();
          }
          if (
            typeof candidate.token === 'string' &&
            candidate.token.trim().length > 0
          ) {
            return candidate.token.trim();
          }
        }
        return undefined;
      };

      const refreshToken = extractCleanToken(response.refreshToken);
      const authToken =
        refreshToken ||
        extractCleanToken(response.token) ||
        extractCleanToken(response.accessToken);

      if (typeof authToken === 'string' && authToken.length > 0) {
        await secureStoreItem(SECURE_KEYS.USER_TOKEN, authToken);
        if (typeof refreshToken === 'string' && refreshToken.length > 0) {
          await secureStoreItem(SECURE_KEYS.REFRESH_TOKEN, refreshToken);
        }
        dispatch(setUserToken(authToken));
        dispatch(setGuestMode(false));

        if (response.user) {
          dispatch(setUserId(response.user._id));
          dispatch(
            setUserHandle(
              response.user.user_handle || response.user.user_name || '',
            ),
          );
        }

        if (role === 'Doctor' && response.doctorProfileIncomplete) {
          dispatch(setDoctorProfileIncomplete(true));
        } else {
          dispatch(setDoctorProfileIncomplete(false));
        }

        navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] });
      } else {
        const resolvedEmail =
          response.user?.email ||
          (response as any).email ||
          email ||
          'your email';

        setVerificationEmail(resolvedEmail);
        setVerificationNotice({ email: resolvedEmail });
        setIsVerifyModalVisible(true);
        await GoogleSignin.signOut();
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services', 'Google Play services not available or outdated.');
      } else {
        const errorMsg =
          error.response?.data?.message?.toLowerCase() ||
          error.message?.toLowerCase() ||
          '';

        const isVerificationRequired =
          error.response?.status === 403 ||
          errorMsg.includes('verify') ||
          errorMsg.includes('verification');

        if (isVerificationRequired) {
          const emailToVerify =
            error.response?.data?.email ||
            error.response?.data?.user?.email ||
            verificationEmail ||
            'your email';

          setVerificationEmail(emailToVerify);
          setVerificationNotice({ email: emailToVerify });
          setIsVerifyModalVisible(true);
          await GoogleSignin.signOut();
        } else {
          console.error('Google Sign-In Error:', error);
          Alert.alert(
            'Sign-In Error',
            error.response?.data?.message ||
              error.message ||
              'Something went wrong during sign in.',
          );
        }
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGuestContinue = () => {
    dispatch(setGuestMode(true));
    dispatch(setUserToken(''));
    navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] });
  };

  const handleResendVerification = () => {
    const targetEmail = verificationEmail || verificationNotice?.email;
    if (targetEmail) {
      resendVerificationMutation.mutate(
        { email: targetEmail },
        {
          onSuccess: (msg) => {
            Alert.alert(
              'Verification Email Sent',
              msg ||
                `A new verification email has been sent to ${targetEmail}. Please check your inbox.`,
            );
          },
          onError: (err: any) => {
            Alert.alert(
              'Resend Failed',
              err?.response?.data?.message ||
                err.message ||
                'Failed to resend verification email. Please try again later.',
            );
          },
        },
      );
    } else {
      Alert.alert('Notice', 'No email address found to resend verification.');
    }
  };

  const cardBg = isDarkMode ? '#1E293B' : '#F8FAFC';
  const cardBorder = isDarkMode ? '#334155' : '#E2E8F0';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <YStack
        flex={1}
        backgroundColor="$background"
        paddingTop={insets.top + (Platform.OS === 'android' ? 10 : 0)}
        paddingBottom={insets.bottom + 16}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <YStack
            paddingHorizontal="$4"
            width="100%"
            maxWidth={460}
            alignSelf="center">
            
            {/* Hero Branding Section */}
            <Animated.View entering={FadeInDown.duration(600)}>
              <YStack alignItems="center" marginTop="$4" marginBottom="$5">
                <YStack
                  shadowColor={BUTTON_COLOR}
                  shadowOffset={{ width: 0, height: 6 }}
                  shadowOpacity={0.25}
                  shadowRadius={12}
                  elevation={6}>
                  <Image
                    source={require('../../../assets/images/icon.png')}
                    style={styles.logo}
                  />
                </YStack>

                <Text
                  fontSize={26}
                  fontWeight="800"
                  color="$color12"
                  marginTop="$3"
                  letterSpacing={-0.5}
                  textAlign="center">
                  UltimateHealth
                </Text>

                <Text
                  fontSize={14}
                  fontWeight="500"
                  color="$color10"
                  marginTop="$1"
                  textAlign="center"
                  lineHeight={20}>
                  Empowering wellness through knowledge
                </Text>

                {/* Value Highlights Pill Row */}
                <XStack
                  gap="$2"
                  marginTop="$3"
                  flexWrap="wrap"
                  justifyContent="center">
                  <XStack
                    backgroundColor={isDarkMode ? '#0F172A' : '#EFF6FF'}
                    paddingHorizontal="$3"
                    paddingVertical="$1.5"
                    borderRadius={14}
                    alignItems="center"
                    gap="$1.5"
                    borderWidth={1}
                    borderColor={isDarkMode ? '#1E293B' : '#DBEAFE'}>
                    <Icon name="shield-check" size={14} color={BUTTON_COLOR} />
                    <Text fontSize={12} fontWeight="600" color="$color12">
                      Verified Content
                    </Text>
                  </XStack>

                  <XStack
                    backgroundColor={isDarkMode ? '#0F172A' : '#EFF6FF'}
                    paddingHorizontal="$3"
                    paddingVertical="$1.5"
                    borderRadius={14}
                    alignItems="center"
                    gap="$1.5"
                    borderWidth={1}
                    borderColor={isDarkMode ? '#1E293B' : '#DBEAFE'}>
                    <Icon name="headphones" size={14} color={BUTTON_COLOR} />
                    <Text fontSize={12} fontWeight="600" color="$color12">
                      Health Podcasts
                    </Text>
                  </XStack>

                  <XStack
                    backgroundColor={isDarkMode ? '#0F172A' : '#EFF6FF'}
                    paddingHorizontal="$3"
                    paddingVertical="$1.5"
                    borderRadius={14}
                    alignItems="center"
                    gap="$1.5"
                    borderWidth={1}
                    borderColor={isDarkMode ? '#1E293B' : '#DBEAFE'}>
                    <Icon name="robot" size={14} color={BUTTON_COLOR} />
                    <Text fontSize={12} fontWeight="600" color="$color12">
                      AI Health Companion
                    </Text>
                  </XStack>
                </XStack>
              </YStack>
            </Animated.View>

            {/* Email Verification Alert Banner (Conditional) */}
            {verificationNotice && (
              <Animated.View entering={FadeInDown.duration(400)}>
                <YStack
                  backgroundColor={
                    isDarkMode ? 'rgba(15, 82, 186, 0.15)' : '#EFF6FF'
                  }
                  borderColor={BUTTON_COLOR}
                  borderWidth={1.5}
                  borderRadius={16}
                  padding="$3.5"
                  marginBottom="$4"
                  width="100%">
                  <XStack alignItems="center" gap="$2" marginBottom="$1">
                    <Icon name="email-alert" size={20} color={BUTTON_COLOR} />
                    <Text
                      fontSize={14.5}
                      fontWeight="800"
                      color={isDarkMode ? '#93C5FD' : '#1E40AF'}>
                      Please Verify Your Email
                    </Text>
                  </XStack>
                  <Text
                    fontSize={13}
                    color={isDarkMode ? '#CBD5E1' : '#334155'}
                    lineHeight={18}>
                    Verification mail was sent to{' '}
                    <Text
                      fontWeight="700"
                      color={isDarkMode ? '#60A5FA' : '#1D4ED8'}>
                      {verificationNotice.email}
                    </Text>
                    . Please verify your email before continuing.
                  </Text>
                  <XStack gap="$3" marginTop="$2.5" alignItems="center">
                    <Button
                      size="$3"
                      backgroundColor={BUTTON_COLOR}
                      borderRadius={10}
                      onPress={() => setIsVerifyModalVisible(true)}
                      pressStyle={{ scale: 0.96 }}>
                      <Text color="#FFFFFF" fontSize={12} fontWeight="700">
                        Check Email
                      </Text>
                    </Button>
                    <Button
                      size="$3"
                      chromeless
                      onPress={handleResendVerification}
                      disabled={resendVerificationMutation.isPending}
                      pressStyle={{ opacity: 0.7 }}>
                      <Text color={BUTTON_COLOR} fontSize={12} fontWeight="700">
                        {resendVerificationMutation.isPending
                          ? 'Sending...'
                          : 'Resend Mail'}
                      </Text>
                    </Button>
                  </XStack>
                </YStack>
              </Animated.View>
            )}

            {/* Role Selection Segment */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)}>
              <YStack marginBottom="$4">
                <Text
                  fontSize={13}
                  fontWeight="700"
                  color="$color11"
                  textTransform="uppercase"
                  letterSpacing={0.8}
                  marginBottom="$2.5">
                  Choose your role
                </Text>

                <XStack gap="$2.5">
                  {/* Patient Option */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flex: 1 }}
                    onPress={() => setRole('General User')}>
                    <YStack
                      paddingVertical="$3"
                      paddingHorizontal="$3"
                      borderRadius={16}
                      backgroundColor={
                        role === 'General User'
                          ? isDarkMode
                            ? 'rgba(15, 82, 186, 0.2)'
                            : '#EFF6FF'
                          : cardBg
                      }
                      borderWidth={2}
                      borderColor={
                        role === 'General User' ? BUTTON_COLOR : cardBorder
                      }
                      alignItems="center"
                      justifyContent="center">
                      <YStack
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor={
                          role === 'General User'
                            ? BUTTON_COLOR
                            : isDarkMode
                            ? '#334155'
                            : '#E2E8F0'
                        }
                        alignItems="center"
                        justifyContent="center"
                        marginBottom="$1.5">
                        <Icon
                          name="account-heart-outline"
                          size={22}
                          color={
                            role === 'General User'
                              ? '#FFFFFF'
                              : isDarkMode
                              ? '#94A3B8'
                              : '#475569'
                          }
                        />
                      </YStack>

                      <Text
                        fontSize={14}
                        fontWeight="700"
                        color={
                          role === 'General User'
                            ? BUTTON_COLOR
                            : isDarkMode
                            ? '#FFFFFF'
                            : '#0F172A'
                        }
                        textAlign="center">
                        Patient / User
                      </Text>
                      <Text
                        fontSize={11}
                        color="$color10"
                        marginTop={2}
                        textAlign="center">
                        Read & wellness
                      </Text>
                    </YStack>
                  </TouchableOpacity>

                  {/* Doctor Option */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flex: 1 }}
                    onPress={() => setRole('Doctor')}>
                    <YStack
                      paddingVertical="$3"
                      paddingHorizontal="$3"
                      borderRadius={16}
                      backgroundColor={
                        role === 'Doctor'
                          ? isDarkMode
                            ? 'rgba(15, 82, 186, 0.2)'
                            : '#EFF6FF'
                          : cardBg
                      }
                      borderWidth={2}
                      borderColor={role === 'Doctor' ? BUTTON_COLOR : cardBorder}
                      alignItems="center"
                      justifyContent="center">
                      <YStack
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor={
                          role === 'Doctor'
                            ? BUTTON_COLOR
                            : isDarkMode
                            ? '#334155'
                            : '#E2E8F0'
                        }
                        alignItems="center"
                        justifyContent="center"
                        marginBottom="$1.5">
                        <Icon
                          name="stethoscope"
                          size={22}
                          color={
                            role === 'Doctor'
                              ? '#FFFFFF'
                              : isDarkMode
                              ? '#94A3B8'
                              : '#475569'
                          }
                        />
                      </YStack>

                      <Text
                        fontSize={14}
                        fontWeight="700"
                        color={
                          role === 'Doctor'
                            ? BUTTON_COLOR
                            : isDarkMode
                            ? '#FFFFFF'
                            : '#0F172A'
                        }
                        textAlign="center">
                        Medical Doctor
                      </Text>
                      <Text
                        fontSize={11}
                        color="$color10"
                        marginTop={2}
                        textAlign="center">
                        Publish & consult
                      </Text>
                    </YStack>
                  </TouchableOpacity>
                </XStack>
              </YStack>
            </Animated.View>

            {/* Seamless 1-Click Action Flow */}
            <Animated.View entering={FadeInUp.delay(200).duration(600)}>
              <YStack gap="$3" marginTop="$1">
                {/* 1-Click Google Sign In & Sign Up */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={isAuthenticating}
                  onPress={handleGoogleSignIn}
                  style={[
                    styles.primaryButton,
                    {
                      backgroundColor: isDarkMode ? '#FFFFFF' : '#0F172A',
                      shadowColor: isDarkMode ? '#000000' : BUTTON_COLOR,
                    },
                  ]}>
                  <XStack
                    alignItems="center"
                    justifyContent="center"
                    gap="$3"
                    width="100%">
                    {isAuthenticating ? (
                      <ActivityIndicator
                        size="small"
                        color={isDarkMode ? '#000000' : '#FFFFFF'}
                      />
                    ) : (
                      <Icon
                        name="google"
                        size={22}
                        color={isDarkMode ? '#EA4335' : '#FFFFFF'}
                      />
                    )}

                    <YStack alignItems="flex-start">
                      <Text
                        fontSize={16}
                        fontWeight="700"
                        color={isDarkMode ? '#000000' : '#FFFFFF'}>
                        {isAuthenticating
                          ? 'Connecting Google...'
                          : 'Continue with Google'}
                      </Text>
                    </YStack>
                  </XStack>
                </TouchableOpacity>

                <Text
                  fontSize={12}
                  color="$color10"
                  textAlign="center"
                  marginTop={-4}>
                  One click to sign up or sign in as {role === 'Doctor' ? 'Doctor' : 'Patient'}
                </Text>

                {/* Subtle Divider */}
                <XStack
                  alignItems="center"
                  gap="$3"
                  marginVertical="$1.5">
                  <YStack flex={1} height={1} backgroundColor={cardBorder} />
                  <Text
                    fontSize={12}
                    fontWeight="600"
                    color="$color10"
                    textTransform="uppercase">
                    Or explore first
                  </Text>
                  <YStack flex={1} height={1} backgroundColor={cardBorder} />
                </XStack>

                {/* 1-Click Browse as Guest */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleGuestContinue}
                  style={[
                    styles.guestButton,
                    {
                      backgroundColor: cardBg,
                      borderColor: cardBorder,
                    },
                  ]}>
                  <XStack
                    alignItems="center"
                    justifyContent="center"
                    gap="$2.5">
                    <Icon
                      name="compass-outline"
                      size={22}
                      color={BUTTON_COLOR}
                    />
                    <YStack>
                      <Text
                        fontSize={15}
                        fontWeight="700"
                        color="$color12"
                        textAlign="center">
                        Browse as Guest
                      </Text>
                      <Text
                        fontSize={11.5}
                        color="$color10"
                        textAlign="center">
                        Instant access • No account required
                      </Text>
                    </YStack>
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </Animated.View>

            {/* Footer Terms & Privacy */}
            <YStack marginTop="$6" alignItems="center">
              <Text
                fontSize={11.5}
                color="$color10"
                textAlign="center"
                lineHeight={17}
                paddingHorizontal="$2">
                By continuing, you agree to UltimateHealth’s{' '}
                <Text
                  fontSize={11.5}
                  fontWeight="600"
                  color={BUTTON_COLOR}
                  onPress={() => navigation.navigate('CommunityGuidelinesScreen')}>
                  Terms & Community Guidelines
                </Text>
                .
              </Text>
            </YStack>

          </YStack>
        </ScrollView>
      </YStack>

      <EmailVerifyModal
        visible={isVerifyModalVisible}
        email={verificationEmail || undefined}
        onDismiss={() => setIsVerifyModalVisible(false)}
        onResend={handleResendVerification}
        isResending={resendVerificationMutation.isPending}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logo: {
    width: 82,
    height: 82,
    borderRadius: 22,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  primaryButton: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  guestButton: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1.5,
  },
});
