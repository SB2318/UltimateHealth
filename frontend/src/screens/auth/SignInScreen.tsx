import React, { useState } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform, Dimensions, useColorScheme, Alert } from 'react-native';
import { YStack, Text, Button, XStack, ScrollView, Spinner } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import { SignInScreenProp } from '../../schemas/type';
import { useAppDispatch } from '../../store/hooks';
import { setUserToken, setUserId, setUserHandle, setGuestMode, setDoctorProfileIncomplete } from '../../store/UserSlice';
import { useGoogleAuthMutation } from '../../hooks/auth/useGoogleAuth';
import { useRequestVerification } from '../../hooks/auth/useResendVerification';
import EmailVerifyModal from '../../components/auth/EmailVerifyModal';
import { SECURE_KEYS, secureStoreItem } from '../../lib/storage/SecureStorageUtils';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const BUTTON_COLOR = '#0F52BA';

const extra = Constants.expoConfig?.extra ?? {};

try {
  GoogleSignin.configure({
    webClientId: extra.WEB_CLIENT_ID, 
    offlineAccess: true,
  });
} catch {
  // Graceful fallback for test/mock environments
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
  
  const [role, setRole] = useState<'General User' | 'Doctor'>(
    route?.params?.role || 'General User'
  );
  const [step, setStep] = useState<1 | 2>(1);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState<{ email: string } | null>(null);
  
  const slideX = useSharedValue(0);

  const googleAuthMutation = useGoogleAuthMutation();
  const resendVerificationMutation = useRequestVerification();

  const isDarkMode = useColorScheme() === 'dark';

  const handleNextStep = () => {
    slideX.value = withTiming(-width, { duration: 350, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    setTimeout(() => setStep(2), 200);
  };

  const handlePrevStep = () => {
    slideX.value = withTiming(0, { duration: 350, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    setTimeout(() => setStep(1), 200);
  };

  const step1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
    position: 'absolute',
    width: width,
    height: '100%',
  }));

  const step2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value + width }],
    position: 'absolute',
    width: width,
    height: '100%',
  }));

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken || (userInfo as any)?.idToken;
      const user = userInfo.data?.user || (userInfo as any)?.user;
      
      if (!idToken) throw new Error('No ID token present');

      let fcmToken;
      try {
        fcmToken = await messaging().getToken();
      } catch (e) {
        console.log('Failed to get FCM token', e);
      }

      const email = user?.email || (userInfo as any)?.user?.email || (userInfo as any)?.data?.user?.email;

      const payload: any = { 
        idToken, 
        role,
        email: email,
        uid: user?.id || (userInfo as any)?.user?.id || (userInfo as any)?.data?.user?.id,
        user_name: user?.name || (userInfo as any)?.user?.name || (userInfo as any)?.data?.user?.name,
        Profile_image: user?.photo || (userInfo as any)?.user?.photo || (userInfo as any)?.data?.user?.photo,
        isDoctor: role === 'Doctor',
        fcmToken,
      };

      const response = await googleAuthMutation.mutateAsync(payload);

      const extractCleanToken = (candidate: any): string | undefined => {
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
          return candidate.trim();
        }
        if (candidate && typeof candidate === 'object') {
          if (typeof candidate.accessToken === 'string' && candidate.accessToken.trim().length > 0) {
            return candidate.accessToken.trim();
          }
          if (typeof candidate.token === 'string' && candidate.token.trim().length > 0) {
            return candidate.token.trim();
          }
        }
        return undefined;
      };

      const refreshToken =
        extractCleanToken(response.refreshToken);
      const authToken =
        refreshToken ||
        extractCleanToken(response.token) ||
        extractCleanToken(response.accessToken);

      // In the instant onboarding flow, new and returning users are immediately verified
      // and issued access + refresh tokens. Proceed directly to authenticated session.
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

        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigation' }],
        });
      } else {
        const candidateEmail = email || response?.user?.email || (userInfo as any)?.user?.email;
        if (candidateEmail) {
          setVerificationEmail(candidateEmail);
          setVerificationNotice({ email: candidateEmail });
          setIsVerifyModalVisible(true);
        } else {
          throw new Error('No authentication token or email returned from server.');
        }
      }
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled, do not alert
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        // Sign in in progress
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services is not available or outdated.');
      } else {
        Alert.alert('Sign-In Error', error?.message || 'Failed to authenticate with Google. Please try again.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGuestContinue = () => {
    dispatch(setGuestMode(true));
    dispatch(setUserToken(''));
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigation' }],
    });
  };

  const handleResendVerification = async () => {
    const targetEmail = verificationEmail || verificationNotice?.email;
    if (targetEmail) {
      resendVerificationMutation.mutate(
        { email: targetEmail },
        {
          onSuccess: (res: any) => {
            Alert.alert('Sent', res?.message || 'Verification email resent successfully.');
          },
          onError: (err: any) => {
            Alert.alert('Error', err?.message || 'Could not send verification email.');
          }
        }
      );
    } else {
      Alert.alert('Notice', 'No email address found to resend verification.');
    }
  };

  const RoleCard = ({ 
    type, 
    title, 
    description, 
    icon 
  }: { 
    type: 'General User' | 'Doctor', 
    title: string, 
    description: string, 
    icon: string 
  }) => {
    const isSelected = role === type;
    return (
      <Button
        onPress={() => setRole(type)}
        backgroundColor={
          isSelected
            ? (isDarkMode ? 'rgba(15, 82, 186, 0.18)' : '#eff6ff')
            : (isDarkMode ? '#1E293B' : '#FFFFFF')
        }
        borderWidth={2}
        borderColor={
          isSelected
            ? BUTTON_COLOR
            : (isDarkMode ? '#334155' : '#E2E8F0')
        }
        borderRadius="$5"
        padding="$4"
        height="auto"
        pressStyle={{ scale: 0.98 }}
        animation="fast"
      >
        <XStack alignItems="center" gap="$4" width="100%">
          <YStack 
            width={48} height={48} 
            borderRadius={24} 
            backgroundColor={
              isSelected
                ? BUTTON_COLOR
                : (isDarkMode ? '#0F172A' : '#F1F5F9')
            }
            justifyContent="center" alignItems="center"
          >
            <Icon
              name={icon as any}
              size={24}
              color={isSelected ? '#FFFFFF' : (isDarkMode ? '#94A3B8' : '#64748B')}
            />
          </YStack>
          <YStack flex={1} alignItems="flex-start">
            <Text
              fontSize={17}
              fontWeight="700"
              color={isDarkMode ? '#F8FAFC' : '#0F172A'}
            >
              {title}
            </Text>
            <Text
              fontSize={13}
              color={isDarkMode ? '#94A3B8' : '#64748B'}
              marginTop="$1"
            >
              {description}
            </Text>
          </YStack>
          <Icon 
            name={isSelected ? "check-circle" : "circle-outline"} 
            size={24} 
            color={isSelected ? BUTTON_COLOR : (isDarkMode ? "#64748B" : "#CBD5E1")} 
          />
        </XStack>
      </Button>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: isDarkMode ? '#0A0F1D' : '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <YStack flex={1} backgroundColor={isDarkMode ? '#0A0F1D' : '#FFFFFF'}>
        
        {/* Step 1: Role Selection */}
        <Animated.View style={step1Style}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <YStack paddingHorizontal="$4" width="100%" maxWidth={400} alignSelf="center">
              
              <YStack alignItems="center" marginTop="$8" marginBottom="$6">
                <Image
                  source={require('../../../assets/images/icon.png')}
                  style={styles.logo}
                />
                <Text
                  fontSize={26}
                  fontWeight="800"
                  color={isDarkMode ? '#F8FAFC' : '#0F172A'}
                  marginTop="$5"
                  letterSpacing={-0.5}
                >
                  Join UltimateHealth
                </Text>
                <Text
                  fontSize={15}
                  color={isDarkMode ? '#94A3B8' : '#64748B'}
                  marginTop="$2"
                  textAlign="center"
                  lineHeight={22}
                >
                  Choose how you want to use the app so we can personalize your experience.
                </Text>
              </YStack>

              {/* In-screen verification notice if email verification pending */}
              {verificationNotice && (
                <YStack
                  backgroundColor={isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff'}
                  borderColor={isDarkMode ? '#3b82f6' : '#93c5fd'}
                  borderWidth={1.5}
                  borderRadius="$4"
                  padding="$3.5"
                  marginBottom="$4"
                  width="100%"
                >
                  <XStack alignItems="center" gap="$2" marginBottom="$1">
                    <Icon name="email-alert" size={20} color="#3b82f6" />
                    <Text fontSize={14.5} fontWeight="800" color={isDarkMode ? '#93c5fd' : '#1e40af'}>
                      Please Verify Your Email
                    </Text>
                  </XStack>
                  <Text fontSize={13} color={isDarkMode ? '#cbd5e1' : '#334155'} lineHeight={18}>
                    Verification mail sent to <Text fontWeight="700" color={isDarkMode ? '#60a5fa' : '#1d4ed8'}>{verificationNotice.email}</Text>. Please verify your email before continuing.
                  </Text>
                  <XStack gap="$3" marginTop="$2.5" alignItems="center">
                    <Button
                      size="$3"
                      backgroundColor={BUTTON_COLOR}
                      borderRadius="$3"
                      onPress={() => setIsVerifyModalVisible(true)}
                      pressStyle={{ scale: 0.96 }}
                    >
                      <Text color="white" fontSize={12} fontWeight="700">Check Email</Text>
                    </Button>
                    <Button
                      size="$3"
                      chromeless
                      onPress={handleResendVerification}
                      disabled={resendVerificationMutation.isPending}
                      pressStyle={{ opacity: 0.7 }}
                    >
                      <Text color="#3b82f6" fontSize={12} fontWeight="700">
                        {resendVerificationMutation.isPending ? 'Sending...' : 'Resend Mail'}
                      </Text>
                    </Button>
                  </XStack>
                </YStack>
              )}

              <YStack gap="$3" width="100%" marginBottom="$6">
                <RoleCard 
                  type="General User"
                  title="General User"
                  description="Find health articles, manage care, and learn."
                  icon="account-outline"
                />
                <RoleCard 
                  type="Doctor"
                  title="Doctor"
                  description="Share knowledge and manage your practice."
                  icon="stethoscope"
                />
              </YStack>

              <YStack gap="$3" width="100%">
                <Button
                  size="$6"
                  backgroundColor={BUTTON_COLOR}
                  color="white"
                  borderRadius="$5"
                  onPress={handleNextStep}
                  iconAfter={<Icon name="arrow-right" size={20} color="white" />}
                  pressStyle={{ scale: 0.98, opacity: 0.9 }}
                >
                  <Text color="white" fontWeight="700" fontSize={16}>Continue</Text>
                </Button>
                
                <Button
                  size="$5"
                  chromeless
                  onPress={handleGuestContinue}
                  pressStyle={{ opacity: 0.6 }}
                >
                  <Text color={isDarkMode ? '#94A3B8' : '#64748B'} fontWeight="600" fontSize={15}>
                    I&apos;ll just browse as a Guest
                  </Text>
                </Button>
              </YStack>

            </YStack>
          </ScrollView>
        </Animated.View>

        {/* Step 2: Google Sign In */}
        <Animated.View style={step2Style}>
          {/* Fixed header: Back + Role badge */}
          <XStack
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal="$4"
            paddingTop={insets.top + 7}
            paddingBottom="$2"
            position="absolute"
            top={0} left={0} right={0}
            zIndex={9}
          >
            <Button
              size="$4"
              circular
              onPress={handlePrevStep}
              backgroundColor={isDarkMode ? '#1E293B' : '#F1F5F9'}
              borderWidth={1}
              borderColor={isDarkMode ? '#334155' : '#E2E8F0'}
              pressStyle={{ scale: 0.92, opacity: 0.8 }}
              icon={<Icon name="arrow-left" size={20} color={isDarkMode ? '#F8FAFC' : '#0F172A'} />}
            />
            <YStack
              backgroundColor={isDarkMode ? 'rgba(15, 82, 186, 0.2)' : '#EFF6FF'}
              borderWidth={1}
              borderColor={isDarkMode ? '#1E3A8A' : '#BFDBFE'}
              paddingHorizontal="$3"
              paddingVertical="$1"
              borderRadius="$10"
            >
              <Text color={isDarkMode ? '#60A5FA' : BUTTON_COLOR} fontWeight="700" fontSize={12} letterSpacing={0.5}>
                {role.toUpperCase()}
              </Text>
            </YStack>
          </XStack>

          {/* Centered content */}
          <YStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal="$4" paddingBottom="$7">
            {/* Role icon */}
            <YStack
              width={84} height={84}
              borderRadius={42}
              backgroundColor={isDarkMode ? '#1E293B' : '#EFF6FF'}
              borderWidth={1}
              borderColor={isDarkMode ? '#334155' : '#BFDBFE'}
              justifyContent="center" alignItems="center"
              marginBottom="$5"
            >
              <Icon name={role === 'Doctor' ? 'stethoscope' : 'account'} size={42} color={isDarkMode ? '#60A5FA' : BUTTON_COLOR} />
            </YStack>

            <Text
              fontSize={26}
              fontWeight="800"
              color={isDarkMode ? '#F8FAFC' : '#0F172A'}
              textAlign="center"
              letterSpacing={-0.5}
            >
              Sign in as {role === 'Doctor' ? 'Doctor' : 'User'}
            </Text>
            <Text
              fontSize={15}
              color={isDarkMode ? '#94A3B8' : '#64748B'}
              marginTop="$3"
              textAlign="center"
              lineHeight={22}
              marginBottom={verificationNotice ? "$4" : "$10"}
            >
              Use your Google account for a secure and seamless sign in.
            </Text>

            {/* In-screen verification notice if email verification pending */}
            {verificationNotice && (
              <YStack
                backgroundColor={isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff'}
                borderColor={isDarkMode ? '#3b82f6' : '#93c5fd'}
                borderWidth={1.5}
                borderRadius="$4"
                padding="$3.5"
                marginBottom="$5"
                width="100%"
              >
                <XStack alignItems="center" gap="$2" marginBottom="$1">
                  <Icon name="email-alert" size={20} color="#3b82f6" />
                  <Text fontSize={14.5} fontWeight="800" color={isDarkMode ? '#93c5fd' : '#1e40af'}>
                    Please Verify Your Email
                  </Text>
                </XStack>
                <Text fontSize={13} color={isDarkMode ? '#cbd5e1' : '#334155'} lineHeight={18}>
                  Verification mail sent to <Text fontWeight="700" color={isDarkMode ? '#60a5fa' : '#1d4ed8'}>{verificationNotice.email}</Text>. Please verify before signing in.
                </Text>
                <XStack gap="$3" marginTop="$2.5" alignItems="center">
                  <Button
                    size="$3"
                    backgroundColor={BUTTON_COLOR}
                    borderRadius="$3"
                    onPress={() => setIsVerifyModalVisible(true)}
                    pressStyle={{ scale: 0.96 }}
                  >
                    <Text color="white" fontSize={12} fontWeight="700">Check Email</Text>
                  </Button>
                  <Button
                    size="$3"
                    chromeless
                    onPress={handleResendVerification}
                    disabled={resendVerificationMutation.isPending}
                    pressStyle={{ opacity: 0.7 }}
                  >
                    <Text color="#3b82f6" fontSize={12} fontWeight="700">
                      {resendVerificationMutation.isPending ? 'Sending...' : 'Resend Mail'}
                    </Text>
                  </Button>
                </XStack>
              </YStack>
            )}

            {/* Google Sign-In button */}
            <Button
              size="$6"
              width="100%"
              backgroundColor={isDarkMode ? '#FFFFFF' : BUTTON_COLOR}
              borderRadius="$5"
              onPress={handleGoogleSignIn}
              disabled={isAuthenticating}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
              icon={
                isAuthenticating ? (
                  <Spinner color={isDarkMode ? '#0F172A' : '#FFFFFF'} />
                ) : (
                  <Icon name="google" size={22} color={isDarkMode ? '#EA4335' : '#FFFFFF'} />
                )
              }
            >
              <Text color={isDarkMode ? '#0F172A' : '#FFFFFF'} fontWeight="700" fontSize={16}>
                {isAuthenticating ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </Button>

            {/* Guest link */}
            <Button
              chromeless
              marginTop="$3"
              onPress={handleGuestContinue}
              pressStyle={{ opacity: 0.6 }}
            >
              <Text
                color={isDarkMode ? '#94A3B8' : '#64748B'}
                fontWeight="600"
                fontSize={13}
                textAlign="center"
              >
                Continue as Guest instead
              </Text>
            </Button>
          </YStack>
        </Animated.View>

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
    paddingBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 25,
    resizeMode: 'contain',
  }
});
