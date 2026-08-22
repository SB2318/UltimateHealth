import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { YStack, Text, Button, XStack, ScrollView, Spinner } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { SignInScreenProp } from '../../schemas/type';
import { useAppDispatch } from '../../store/hooks';
import { setUserToken, setUserId, setUserHandle, setGuestMode, setDoctorProfileIncomplete } from '../../store/UserSlice';
import { useGoogleAuthMutation } from '../../hooks/auth/useGoogleAuth';
import { useRequestVerification } from '../../hooks/auth/useResendVerification';
import EmailVerifyModal from '../../components/auth/EmailVerifyModal';
import { SECURE_KEYS, secureStoreItem } from '../../lib/storage/SecureStorageUtils';

const { width } = Dimensions.get('window');

// Configure Google Sign-In (Should ideally also be at app root, but safe here)
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // MUST BE REPLACED WITH ACTUAL CONFIG
  offlineAccess: true,
});

export default function SignInScreen({ navigation, route }: SignInScreenProp) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  
  const [role, setRole] = useState<'General User' | 'Doctor'>('General User');
  const [step, setStep] = useState<1 | 2>(1);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  
  const slideX = useSharedValue(0);

  const googleAuthMutation = useGoogleAuthMutation();
  const resendVerificationMutation = useRequestVerification();

  const handleNextStep = () => {
    slideX.value = withTiming(-width, { duration: 300, easing: Easing.out(Easing.ease) });
    setTimeout(() => setStep(2), 150); // slight delay for state update
  };

  const handlePrevStep = () => {
    slideX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
    setTimeout(() => setStep(1), 150);
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
      const idToken = userInfo.data?.idToken;
      
      if (!idToken) throw new Error('No ID token present');

      // Attempt backend auth
      const response = await googleAuthMutation.mutateAsync({ idToken, role });

      if (response.newUser) {
        // Show verification modal
        setVerificationEmail(userInfo.data?.user.email || null);
        await GoogleSignin.signOut(); // Sign out locally so they can try again later
      } else if (response.token) {
        // Success
        await secureStoreItem(SECURE_KEYS.USER_TOKEN, response.token);
        dispatch(setUserToken(response.token));
        dispatch(setGuestMode(false));
        
        if (response.user) {
          dispatch(setUserId(response.user._id));
          dispatch(setUserHandle(response.user.user_name));
        }

        if (role === 'Doctor' && response.doctorProfileIncomplete) {
          dispatch(setDoctorProfileIncomplete(true));
        } else {
          dispatch(setDoctorProfileIncomplete(false));
        }

        navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] });
      }

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play services not available or outdated.');
      } else {
        // Check if backend returned 401/403 for unverified
        if (error.response?.status === 403 || error.response?.data?.message?.toLowerCase().includes('verify')) {
          setVerificationEmail(error.response?.data?.email || 'your email');
          await GoogleSignin.signOut();
        } else {
          alert(error.response?.data?.message || error.message || 'Something went wrong');
        }
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGuestContinue = () => {
    dispatch(setGuestMode(true));
    dispatch(setUserToken(null));
    navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] });
  };

  const handleResendVerification = () => {
    if (verificationEmail) {
      resendVerificationMutation.mutate({ email: verificationEmail });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
        
        {/* Step 1: Role Selection */}
        <Animated.View style={step1Style}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <YStack alignItems="center" marginTop="$8" marginBottom="$6">
              <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
              <Text fontSize={28} fontWeight="bold" color="$color12" marginTop="$4" textAlign="center">
                Welcome
              </Text>
              <Text fontSize={16} color="$gray11" marginTop="$2" textAlign="center" paddingHorizontal="$6">
                Select how you'll be using the app
              </Text>
            </YStack>

            <YStack paddingHorizontal="$5" gap="$4" width="100%">
              {/* General User Option */}
              <Button
                size="$6"
                backgroundColor={role === 'General User' ? '$blue10' : '$gray3'}
                color={role === 'General User' ? 'white' : '$color12'}
                borderWidth={2}
                borderColor={role === 'General User' ? '$blue10' : 'transparent'}
                borderRadius="$6"
                onPress={() => setRole('General User')}
                icon={<Icon name="account" size={24} color={role === 'General User' ? 'white' : '#6b7280'} />}
                justifyContent="flex-start"
                paddingHorizontal="$5"
              >
                General User
              </Button>

              {/* Doctor Option */}
              <Button
                size="$6"
                backgroundColor={role === 'Doctor' ? '$blue10' : '$gray3'}
                color={role === 'Doctor' ? 'white' : '$color12'}
                borderWidth={2}
                borderColor={role === 'Doctor' ? '$blue10' : 'transparent'}
                borderRadius="$6"
                onPress={() => setRole('Doctor')}
                icon={<Icon name="stethoscope" size={24} color={role === 'Doctor' ? 'white' : '#6b7280'} />}
                justifyContent="flex-start"
                paddingHorizontal="$5"
              >
                Doctor / Specialist
              </Button>

              <Button
                size="$6"
                backgroundColor="$color12"
                color="$background"
                borderRadius="$6"
                marginTop="$6"
                onPress={handleNextStep}
                iconAfter={<Icon name="arrow-right" size={20} color="white" />}
              >
                Next
              </Button>

              <Button
                size="$5"
                backgroundColor="transparent"
                color="$gray11"
                marginTop="$2"
                onPress={handleGuestContinue}
              >
                Continue as Guest
              </Button>
            </YStack>
          </ScrollView>
        </Animated.View>

        {/* Step 2: Google Sign In */}
        <Animated.View style={step2Style}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <XStack paddingHorizontal="$4" paddingTop="$2" alignItems="center">
              <Button size="$3" circular icon={<Icon name="arrow-left" size={20} />} onPress={handlePrevStep} backgroundColor="transparent" />
              <YStack flex={1} alignItems="flex-end">
                <YStack backgroundColor="$blue3" paddingHorizontal="$3" paddingVertical="$1" borderRadius="$4">
                  <Text color="$blue10" fontWeight="bold" fontSize={12}>
                    {role.toUpperCase()}
                  </Text>
                </YStack>
              </YStack>
            </XStack>

            <YStack alignItems="center" marginTop="$10" marginBottom="$8">
              <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
              <Text fontSize={28} fontWeight="bold" color="$color12" marginTop="$4" textAlign="center">
                Sign In
              </Text>
              <Text fontSize={16} color="$gray11" marginTop="$2" textAlign="center" paddingHorizontal="$6">
                Use your Google account to continue
              </Text>
            </YStack>

            <YStack paddingHorizontal="$5" gap="$4" width="100%">
              <Button
                size="$6"
                backgroundColor="white"
                color="black"
                borderRadius="$6"
                borderWidth={1}
                borderColor="$gray5"
                onPress={handleGoogleSignIn}
                disabled={isAuthenticating}
                icon={
                  isAuthenticating ? (
                    <Spinner color="black" />
                  ) : (
                    <Icon name="google" size={24} color="#DB4437" />
                  )
                }
              >
                {isAuthenticating ? 'Signing in...' : 'Sign in with Google'}
              </Button>

              <Button
                size="$5"
                backgroundColor="transparent"
                color="$gray11"
                marginTop="$4"
                onPress={handleGuestContinue}
              >
                Continue as Guest
              </Button>
            </YStack>
          </ScrollView>
        </Animated.View>

      </YStack>

      <EmailVerifyModal
        visible={!!verificationEmail}
        email={verificationEmail || undefined}
        onDismiss={() => setVerificationEmail(null)}
        onResend={handleResendVerification}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
