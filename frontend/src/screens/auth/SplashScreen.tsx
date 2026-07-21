 
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, ActivityIndicator} from 'react-native';
import {YStack, Text, Button} from 'tamagui';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
<<<<<<< HEAD:frontend/src/screens/SplashScreen.tsx
import {SplashScreenProp} from '../type';
import {useAppDispatch} from '../store/hooks';
import {KEYS, clearStorage, retrieveItem} from '../helper/Utils';
import {setUserId, setUserToken, setUserHandle} from '../store/UserSlice';
import { useCheckTokenStatus } from '@/src/hooks/useGetTokenStatus';
import { SECURE_KEYS, SecureKey, secureRetrieveItem } from '../helper/SecureStorageUtils';
=======
import {SplashScreenProp} from '../../schemas/type';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/ReduxStore';
>>>>>>> upstream/main:frontend/src/screens/auth/SplashScreen.tsx

export default function SplashScreen({navigation}: SplashScreenProp) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(20);

  // `user_token` is hydrated from secure storage by AppContent on mount.
  // We wait briefly to allow hydration to complete before deciding where to navigate.
  const user_token = useAppSelector((state: RootState) => state.user.user_token);

  // Brief hydration delay so AppContent can populate Redux before we navigate
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const navigateBasedOnAuth = useCallback(() => {
    if (user_token) {
      navigation.reset({
        index: 0,
        routes: [{name: 'TabNavigation'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
  }, [navigation, user_token]);

  useEffect(() => {
    if (hydrated) {
      navigateBasedOnAuth();
    }
  }, [hydrated, navigateBasedOnAuth]);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}, {translateY: translateY.value}] as any,
  }));

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$6"
      gap="$4">
      <Animated.View style={animatedStyle}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.icon}
        />
        <Text
          marginTop="$4"
          fontSize="$8"
          fontWeight="800"
          color="$color12"
          letterSpacing={1}
          textAlign="center">
          Ultimate Health
        </Text>
        <Text marginTop="$2" fontSize="$4" color="$color10" textAlign="center" paddingHorizontal="$4">
          Empowering wellness through knowledge
        </Text>
      </Animated.View>

      {!hydrated ? (
        <ActivityIndicator size="small" color="#000A60" style={{marginTop: 30}} />
      ) : (
        <Button
          marginTop="$6"
          size="$7"
          backgroundColor="$color9"
          color="black"
          paddingHorizontal="$9"
          paddingVertical="$2"
          borderRadius="$10"
          elevation={4}
          pressStyle={{scale: 0.96, opacity: 0.9}}
          onPress={navigateBasedOnAuth}>
          <Text fontSize={16} color="black">
            Continue
          </Text>
        </Button>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
  },
});
