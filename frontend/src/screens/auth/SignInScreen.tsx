import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, Dimensions, useColorScheme } from 'react-native';
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
      const idToken = userInfo.data?.idToken;
      
      if (!idToken) throw new Error('No ID token present');

      const response = await googleAuthMutation.mutateAsync({ idToken, role });

      if (response.newUser) {
        setVerificationEmail(userInfo.data?.user.email || null);
        await GoogleSignin.signOut();
      } else if (response.token) {
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
        backgroundColor={isSelected ? (isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff') : 'transparent'}
        borderWidth={2}
        borderColor={isSelected ? '$blue10' : (isDarkMode ? '$gray5' : '$gray4')}
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
            backgroundColor={isSelected ? '$blue10' : (isDarkMode ? '$gray6' : '$gray3')}
            justifyContent="center" alignItems="center"
          >
            <Icon name={icon as any} size={24} color={isSelected ? 'white' : (isDarkMode ? '#A1A1AA' : '#52525B')} />
          </YStack>
          <YStack flex={1} alignItems="flex-start">
            <Text fontSize={17} fontWeight="700" color={isDarkMode ? 'white' : '$color12'}>
              {title}
            </Text>
            <Text fontSize={13} color={isDarkMode ? '$gray11' : '$gray10'} marginTop="$1">
              {description}
            </Text>
          </YStack>
          <Icon 
            name={isSelected ? "check-circle" : "circle-outline"} 
            size={24} 
            color={isSelected ? "#3b82f6" : (isDarkMode ? "$gray7" : "$gray5")} 
          />
        </XStack>
      </Button>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <YStack flex={1} backgroundColor="$background">
        
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
                  color={isDarkMode ? 'white' : '$color12'}
                  marginTop="$5"
                  letterSpacing={-0.5}
                >
                  Join UltimateHealth
                </Text>
                <Text
                  fontSize={15}
                  color={isDarkMode ? '$gray11' : '$gray10'}
                  marginTop="$2"
                  textAlign="center"
                  lineHeight={22}
                >
                  Choose how you want to use the app so we can personalize your experience.
                </Text>
              </YStack>

              <YStack gap="$3" width="100%" marginBottom="$6">
                <RoleCard 
                  type="General User"
                  title="Patient / User"
                  description="Find health events, manage care, and learn."
                  icon="account-outline"
                />
                <RoleCard 
                  type="Doctor"
                  title="Medical Professional"
                  description="Share knowledge and manage your practice."
                  icon="stethoscope"
                />
              </YStack>

              <YStack gap="$3" width="100%">
                <Button
                  size="$6"
                  backgroundColor="$blue10"
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
                  <Text color={isDarkMode ? '$gray11' : '$gray10'} fontWeight="600" fontSize={15}>
                    I'll just browse as a Guest
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
            paddingTop={insets.top + 8}
            paddingBottom="$2"
            position="absolute"
            top={0} left={0} right={0}
            zIndex={10}
          >
            <Button
              size="$4"
              circular
              onPress={handlePrevStep}
              backgroundColor={isDarkMode ? '$gray4' : '$gray3'}
              pressStyle={{ scale: 0.92, opacity: 0.8 }}
              icon={<Icon name="arrow-left" size={20} color={isDarkMode ? 'white' : 'black'} />}
            />
            <YStack backgroundColor="$blue3" paddingHorizontal="$3" paddingVertical="$1" borderRadius="$10">
              <Text color="$blue10" fontWeight="700" fontSize={12} letterSpacing={0.5}>
                {role.toUpperCase()}
              </Text>
            </YStack>
          </XStack>

          {/* Centered content */}
          <YStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal="$4" paddingBottom="$6">
            {/* Role icon */}
            <YStack
              width={84} height={84}
              borderRadius={42}
              backgroundColor={isDarkMode ? '$gray3' : '$blue2'}
              justifyContent="center" alignItems="center"
              marginBottom="$5"
            >
              <Icon name={role === 'Doctor' ? 'stethoscope' : 'account'} size={42} color="#3b82f6" />
            </YStack>

            <Text
              fontSize={26}
              fontWeight="800"
              color={isDarkMode ? 'white' : '$color12'}
              textAlign="center"
              letterSpacing={-0.5}
            >
              Sign in as {role === 'Doctor' ? 'Doctor' : 'Patient'}
            </Text>
            <Text
              fontSize={15}
              color={isDarkMode ? '$gray11' : '$gray10'}
              marginTop="$3"
              textAlign="center"
              lineHeight={22}
              marginBottom="$10"
            >
              Use your Google account for a secure and seamless sign in.
            </Text>

            {/* Google Sign-In button */}
            <Button
              size="$6"
              width="100%"
              backgroundColor={isDarkMode ? 'white' : 'black'}
              borderRadius="$5"
              onPress={handleGoogleSignIn}
              disabled={isAuthenticating}
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
              icon={
                isAuthenticating ? (
                  <Spinner color={isDarkMode ? 'black' : 'white'} />
                ) : (
                  <Icon name="google" size={22} color={isDarkMode ? '#DB4437' : 'white'} />
                )
              }
            >
              <Text color={isDarkMode ? 'black' : 'white'} fontWeight="700" fontSize={16}>
                {isAuthenticating ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </Button>

            {/* Guest link */}
            <Button
              chromeless
              marginTop="$4"
              onPress={handleGuestContinue}
              pressStyle={{ opacity: 0.6 }}
            >
              <Text
                color={isDarkMode ? '$gray11' : '$gray10'}
                fontWeight="600"
                fontSize={14}
                textAlign="center"
              >
                Continue as Guest instead
              </Text>
            </Button>
          </YStack>
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
