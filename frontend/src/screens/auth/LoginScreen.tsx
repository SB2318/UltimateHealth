import React, {useEffect, useState} from 'react';
//import React from 'react';
import {Alert, Image, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
        {/* Form Section */}
        <YStack
          marginTop="$2"
          backgroundColor="$backgroundLight"
          paddingVertical="$4"
          paddingHorizontal="$2"
          borderRadius="$5"
          gap="$2"
          elevation={1}>
          {/* Combined header: keep both image sizes and the explanatory text */}
          <YStack alignItems="center" marginBottom="$4" gap="$2">
            <Image
              source={require('../../../assets/images/icon.png')}
              style={{
                height: 90,
                width: 90,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text
              alignSelf="center"
              textAlign="center"
              fontSize={16}
              fontWeight="500"
              color={isDarkMode ? '$color' : '$color10'}
              maxWidth={300}
              lineHeight={22}>
              Enter your email and password to securely access your account
            </Text>
          </YStack>

          <YStack gap="$3">
            {emailMessage && (
              <Text color="$red10" fontSize={14} marginBottom="$-2">
                Please Enter a Valid Email
              </Text>
            )}

            <XStack alignItems="center" position="relative">
              <Icon
                name="mail"
                size={22}
                color={isDarkMode ? '$background' : '$color'}
                style={{
                  position: 'absolute',
                  left: 12,
                  zIndex: 1,
                }}
              />
              <Input
                flex={1}
                height="$6"
                borderRadius="$4"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={handleEmail}
                color={isDarkMode ? '$color' : '$color10'}
                paddingStart="$10"
              />
            </XStack>

            {passwordMessage && (
              <Text color="$red10" fontSize={14} marginBottom="$-2">
                Password must be 6 Characters Long
              </Text>
            )}

            <XStack alignItems="center" position="relative">
              <Entypo
                name="lock"
                size={22}
                color={isDarkMode ? '$background' : '$color'}
                style={{
                  position: 'absolute',
                  left: 12,
                  zIndex: 1,
                }}
              />
              <Input
                flex={1}
                height="$6"
                borderRadius="$4"
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                onChangeText={handlePassword}
                value={password}
                color={isDarkMode ? '$color' : '$color10'}
                paddingLeft="$10"
                paddingRight="$10"
              />
              <Button
                chromeless
                size="$4"
                circular
                position="absolute"
                right={6}
                onPress={handleSecureEntryClickEvent}>
                <Icon
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={22}
                  color={isDarkMode ? '$background' : '$color'}
                />
              </Button>
            </XStack>

           <XStack
  justifyContent="space-between"
  alignItems="center"
  marginTop="$2"
  paddingHorizontal="$2"
>
  <Text
    color={isDarkMode ? '$gray10' : '$gray11'}
    fontWeight="500"
    fontSize={13}
    pressStyle={{ opacity: 0.7 }}
    cursor="pointer"
    onPress={() => {
      setRequestVerification(true);
      setEmailInputVisible(true);
    }}
  >
    Request Verification
  </Text>

  <Text
    color="$blue10"
    fontWeight="600"
    fontSize={13}
    pressStyle={{ opacity: 0.7 }}
    cursor="pointer"
    onPress={() => {
      setEmailInputVisible(true);
      setRequestVerification(false);
    }}
  >
    Forgot Password?
  </Text>
</XStack>

            <Button
              backgroundColor="$blue10"
              theme="blue"
              marginTop="$5"
              size="$5"
              borderRadius="$4"
              fontWeight="700"
              alignSelf="center"
              onPress={() => {
                console.log('Login button pressed!');
                validateAndSubmit();
              }}
              disabled={loginPending}
              opacity={loginPending ? 0.5 : 1}
              width="100%">
              <Text fontSize={18} color="$background" fontWeight="600">
                Login
              </Text>
            </Button>
          </YStack>

          <Separator marginVertical="$5" borderColor={isDarkMode ? '$gray6' : '$gray5'} />

          <YStack gap="$3">
            <Button
  size="$4"
  backgroundColor="transparent"
  borderWidth={1}
  borderRadius="$4"
  borderColor={isDarkMode ? '$gray8' : '$blue5'}
  alignSelf="center"
  width="100%"
  marginTop="$3"
  pressStyle={{ opacity: 0.85 }}
  onPress={() => navigation.navigate('SignUpScreenFirst')}
>
  <Text
    fontWeight="600"
    fontSize={16}
    color={isDarkMode ? '$color' : '$blue10'}
  >
    Sign Up
  </Text>
</Button>

            <Button
  size="$4"
  chromeless
  alignSelf="center"
  width="100%"
  marginTop="$2"
  pressStyle={{ opacity: 0.7 }}
  icon={
    <Icon
      name="compass-outline"
      size={20}
      color={isDarkMode ? '$gray11' : '$gray11'}
    />
  }
  onPress={() => {
    dispatch(setGuestMode(true));
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigation' }],
    });
  }}
>
  <Text
    fontWeight="500"
    fontSize={15}
    color={isDarkMode ? '$gray11' : '$gray11'}
  >
    Continue as Guest
  </Text>
</Button>
          borderRadius="$5"
          gap="$2"
          elevation={1}>
<<<<<<< HEAD
          <Image
            source={require('../../../assets/images/icon.png')}
            style={{
              height: 60,
              width: 60,
              // borderRadius: 60,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
          />

          <Text
            alignSelf="center"
            textAlign="center"
            fontSize={16}
            fontWeight="500"
            color="$color"
            maxWidth={300}
            lineHeight={22}>
            Enter your email and password to securely access your account
          </Text>

          {emailMessage && (
            <Text color="$red10" fontSize={14}>
              Please Enter a Valid Email
            </Text>
          )}

          <XStack alignItems="center" position="relative">
            <Icon
              name="mail"
              size={22}
              color="$color"
=======
          <YStack alignItems="center" marginBottom="$4" gap="$2">
            <Image
              source={require('../../../assets/images/icon.png')}
>>>>>>> origin/main
              style={{
                height: 90,
                width: 90,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />

<<<<<<< HEAD
          {passwordMessage && (
            <Text color="$red10" fontSize={14}>
              Password must be 6 Characters Long
=======
            <Text
              alignSelf="center"
              textAlign="center"
              fontSize={16}
              fontWeight="500"
              color={isDarkMode ? '$color' : '$color10'}
              maxWidth={300}
              lineHeight={22}>
              Enter your email and password to securely access your account
>>>>>>> origin/main
            </Text>
          </YStack>

          <YStack gap="$3">
            {emailMessage && (
              <Text color="$red10" fontSize={14} marginBottom="$-2">
                Please Enter a Valid Email
              </Text>
            )}

            <XStack alignItems="center" position="relative">
              <Icon
                name="mail"
                size={22}
                color={isDarkMode ? 'white' : 'black'}
                style={{
                  position: 'absolute',
                  left: 12,
                  zIndex: 1,
                }}
              />
              <Input
                flex={1}
                height="$6"
                borderRadius="$4"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={handleEmail}
                color={isDarkMode ? '$color' : '$color10'}
                paddingStart="$10"
              />
            </XStack>

            {passwordMessage && (
              <Text color="$red10" fontSize={14} marginBottom="$-2">
                Password must be 6 Characters Long
              </Text>
            )}

            <XStack alignItems="center" position="relative">
              <Entypo
                name="lock"
                size={22}
                color={isDarkMode ? 'white' : 'black'}
                style={{
                  position: 'absolute',
                  left: 12,
                  zIndex: 1,
                }}
              />
              <Input
                flex={1}
                height="$6"
                borderRadius="$4"
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                onChangeText={handlePassword}
                value={password}
                color={isDarkMode ? '$color' : '$color10'}
                paddingLeft="$10"
                paddingRight="$10"
              />
              <Button
                chromeless
                size="$4"
                circular
                position="absolute"
                right={6}
                onPress={handleSecureEntryClickEvent}>
                <Icon
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={22}
                  color={isDarkMode ? 'white' : 'black'}
                />
              </Button>
            </XStack>

           <XStack
  justifyContent="space-between"
  alignItems="center"
  marginTop="$2"
  paddingHorizontal="$2"
>
  <Text
    color={isDarkMode ? '$gray10' : '$gray11'}
    fontWeight="500"
    fontSize={13}
    pressStyle={{ opacity: 0.7 }}
    cursor="pointer"
    onPress={() => {
      setRequestVerification(true);
      setEmailInputVisible(true);
    }}
  >
    Request Verification
  </Text>

  <Text
    color="$blue10"
    fontWeight="600"
    fontSize={13}
    pressStyle={{ opacity: 0.7 }}
    cursor="pointer"
    onPress={() => {
      setEmailInputVisible(true);
      setRequestVerification(false);
    }}
  >
    Forgot Password?
  </Text>
</XStack>

            <Button
              backgroundColor="$blue10"
              theme="blue"
              marginTop="$5"
              size="$5"
              borderRadius="$4"
              fontWeight="700"
              alignSelf="center"
              onPress={() => {
                console.log('Login button pressed!');
                validateAndSubmit();
              }}
              disabled={loginPending}
              opacity={loginPending ? 0.5 : 1}
              width="100%">
              <Text fontSize={18} color="$white" fontWeight="600">
                Login
              </Text>
            </Button>
          </YStack>

          <Separator marginVertical="$5" borderColor={isDarkMode ? '$gray6' : '$gray5'} />

          <YStack gap="$3">
            <Button
  size="$4"
  backgroundColor="transparent"
  borderWidth={1}
  borderRadius="$4"
  borderColor={isDarkMode ? '$gray8' : '$blue5'}
  alignSelf="center"
  width="100%"
  marginTop="$3"
  pressStyle={{ opacity: 0.85 }}
  onPress={() => navigation.navigate('SignUpScreenFirst')}
>
  <Text
    fontWeight="600"
    fontSize={16}
    color={isDarkMode ? '$color' : '$blue10'}
  >
    Sign Up
  </Text>
</Button>

            <Button
  size="$4"
  chromeless
  alignSelf="center"
  width="100%"
  marginTop="$2"
  pressStyle={{ opacity: 0.7 }}
  icon={
    <Icon
      name="compass-outline"
      size={20}
      color={isDarkMode ? '$gray11' : '$gray11'}
    />
  }
  onPress={() => {
    dispatch(setGuestMode(true));
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigation' }],
    });
  }}
>
  <Text
    fontWeight="500"
    fontSize={15}
    color={isDarkMode ? '$gray11' : '$gray11'}
  >
    Continue as Guest
  </Text>
</Button>
          </YStack>
        </YStack>

        <EmailInputBottomSheet
          visible={emailInputVisible}
          callback={(email: string) => {
            setOtpMail(email);
            if (requestVerificationMode) {
              resendVerification(
                {
                  email,
                },
                {
                  onSuccess: () => {
                    /** Check Status */
                    Alert.alert('Verification Email Sent');
                    setEmail('');
                    setPassword('');
                  },
                  onError: (error: AxiosError) => {
                    console.log('Email Verification error', error);

                    if (error.response) {
                      const statusCode = error.response.status;
                      switch (statusCode) {
                        case 400:
                          Snackbar.show({
                            text: 'User not found or already verified',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                          break;
                        case 429:
                          Snackbar.show({
                            text: 'Verification email already sent, please try again after 1 hour',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                          break;
                        case 500:
                          Snackbar.show({
                            text: 'Internal server error, try again',
                            duration: Snackbar.LENGTH_SHORT,
                          });

                          break;
                        default:
                          Alert.alert(
                            'Error',
                            'Something went wrong. Please try again later.',
                          );
                      }
                    } else {
                      console.log('Email Verification error', error);
                    }
                  },
                },
              );
            } else {
              sendOtp(
                {
                  email,
                },
                {
                  onSuccess: () => {
                    Alert.alert('OTP has sent to your mail');
                    navigateToOtpScreen();
                  },
                  onError: error => {
                    // eslint-disable-next-line import/no-named-as-default-member
                    if (axios.isAxiosError(error)) {
                      if (error.response) {
                        if (error.response.status === 400) {
                          Alert.alert(
                            'Error',
                            'User with this email does not exist.',
                          );
                        } else if (error.response.status === 500) {
                          Alert.alert('Error', 'Error sending email.');
                        } else {
                          Alert.alert('Error', 'Something went wrong.');
                        }
                      } else {
                        Alert.alert('Error', 'Network error.');
                      }
                    } else {
                      Alert.alert('Error', 'Network error.');
                    }
                  },
                },
              );
            }
          }}
          backButtonClick={handleEmailInputBack}
          onDismiss={() => setEmailInputVisible(false)}
          isRequestVerification={requestVerificationMode}
        />
      </YStack>
    </YStack>
  );
};

export default LoginScreen;
