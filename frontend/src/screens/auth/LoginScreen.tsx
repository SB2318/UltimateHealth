import React from 'react';
import {
  StyleSheet,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  YStack,
  XStack,
  Input,
  Button,
  Text,
  Label,
  ScrollView,
  Theme,
  H2,
} from 'tamagui';
import {Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {PRIMARY_COLOR, BUTTON_COLOR} from '../../helper/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fp, hp, wp} from '../../helper/Metric';
// import {useNavigation} from '@react-navigation/native';
import {KEYS, storeItem} from '../../helper/Utils';
import EmailInputModal from '../../components/EmailInputModal';
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthData, LoginScreenProp, User} from '../../type';
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {useDispatch} from 'react-redux';
import {LOGIN_API, RESEND_VERIFICATION, SEND_OTP} from '../../helper/APIUtils';
import Loader from '../../components/Loader';
import {setUserHandle, setUserId, setUserToken} from '../../store/UserSlice';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({navigation}: LoginScreenProp) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [emailInputVisible, setEmailInputVisible] = useState(false);
  const [requestVerificationMode, setRequestVerification] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [otpMail, setOtpMail] = useState('');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [emailVerify, setEmailVerify] = useState(false);
  const [output, setOutput] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSecureEntryClickEvent = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  /*
  useEffect(() => {
    const backHandler = navigation.addListener('beforeRemove', e => {
      if (!navigation.canGoBack()) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        'Warning',
        'Do you want to exit',
        [
          {text: 'No', onPress: () => null},
          {
            text: 'Yes',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
        {cancelable: true},
      );
    });

    // Cleanup the event listener when the component unmounts or when the user logs out
    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  */

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getFCMToken() {
    await requestUserPermission(); // Ask for permission (iOS only)
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      setFcmToken(fcmToken);
    } else {
      console.log('Failed to get FCM Token');
      return null;
    }
  }

  const validateAndSubmit = async () => {
    if (validate()) {
      await getFCMToken();
      setPasswordMessage(false);
      setEmailMessage(false);
      loginMutation.mutate();
    } else {
      setOutput(true);
      setPasswordMessage(false);
      setEmailMessage(false);
      if (output && !passwordVerify) {
        setPasswordMessage(true);
      }
      if (output && !emailVerify) {
        setEmailMessage(true);
      }
    }
  };

  const validate = () => {
    if (emailVerify && passwordVerify) {
      return true;
    } else {
      return false;
    }
  };
  const handlePassword = e => {
    let pass = e.nativeEvent.text;
    setPassword(pass);
    setPasswordVerify(false);

    if (/(?=.*[a-z]).{6,}/.test(pass)) {
      setPassword(pass);
      setPasswordVerify(true);
    }
  };

  const handleEmail = e => {
    let email = e.nativeEvent.text;
    setEmail(email);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmail(email);
      setEmailVerify(true);
    }
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const res = await axios.post(LOGIN_API, {
        email: email,
        password: password,
        fcmToken: fcmToken,
      });

      return res.data.user as User;
    },

    onSuccess: async data => {
      const auth: AuthData = {
        userId: data._id,
        token: data?.refreshToken,
        user_handle: data?.user_handle,
      };
      try {
        await storeItem(KEYS.USER_ID, auth.userId.toString());
        await storeItem(KEYS.USER_HANDLE, data?.user_handle);
        if (auth.token) {
          await storeItem(KEYS.USER_TOKEN, auth.token.toString());
          await storeItem(
            KEYS.USER_TOKEN_EXPIRY_DATE,
            new Date().toISOString(),
          );
          dispatch(setUserId(auth.userId));
          dispatch(setUserToken(auth.token));
          dispatch(setUserHandle(auth.user_handle));
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'TabNavigation'}], // Send user to LoginScreen after logout
            });
            //navigation.navigate('TabNavigation');
          }, 1000);
        } else {
          Alert.alert('Token not found');
        }
      } catch (e) {
        console.log('Async Storage ERROR', e);
      }
    },

    onError: (error: AxiosError) => {
      console.log('Error', error);
      setPassword('');
      setEmail('');
      if (error.response) {
        const errorCode = error.response.status;
        switch (errorCode) {
          case 400:
            Alert.alert('Error', 'Please provide email and password');
            break;
          case 401:
            Alert.alert('Error', 'Invalid password');
            break;
          case 403:
            Alert.alert(
              'Error',
              'Email not verified. Please check your email.',
            );
            break;
          case 404:
            Alert.alert('Error', 'User not found');
            break;
          default:
            Alert.alert('Error', 'Internal server error');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    },
  });

  const handleEmailInputBack = () => {
    setEmailInputVisible(false);
  };

  const sendOtpMutation = useMutation({
    mutationKey: ['forgot-password-otp'],
    mutationFn: async ({email}: {email: string}) => {
      const res = await axios.post(SEND_OTP, {
        email: email,
      });
      return res.data.otp as string;
    },

    onSuccess: () => {
      Alert.alert('OTP has sent to your mail');
      navigateToOtpScreen();
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('Error', 'User with this email does not exist.');
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
  });

  const navigateToOtpScreen = () => {
    setEmailInputVisible(false);
    navigation.navigate('OtpScreen', {
      email: otpMail,
    });
  };

  const requestVerification = useMutation({
    mutationKey: ['resend-verification-mail'],
    mutationFn: async ({email1}: {email1: string}) => {
      const res = await axios.post(RESEND_VERIFICATION, {
        email: email1,
      });

      return res.data.message as string;
    },

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
            Alert.alert('Error', 'User not found or already verified');
            break;
          case 429:
            Alert.alert(
              'Error',
              'Verification email already sent. Please try again after 1 hour.',
            );
            break;
          case 500:
            Alert.alert(
              'Error',
              'Internal server error. Please try again later.',
            );
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
  });

  if (
    loginMutation.isPending ||
    sendOtpMutation.isPending ||
    requestVerification.isPending
  ) {
    return <Loader />;
  }
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Theme name={isDarkMode ? 'dark' : 'light'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: '#f5f6fa',
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled">
          <YStack alignItems="center" space="$2">
            <Image
              source={require('../../assets/icon.png')}
              style={{width: 80, height: 80, borderRadius: 20}}
            />
            <Text fontSize={28} fontWeight="800" color="#007BFF">
              Ultimate Health
            </Text>
            <Text fontSize={16} color="#333" textAlign="center">
              Welcome to Ultimate Health login now!
            </Text>
          </YStack>

          {/* Login Card */}
          <YStack
            space="$4"
            backgroundColor="white"
            padding="$6"
            borderRadius={20}
            marginTop="$6"
            shadowColor="rgba(0,0,0,0.15)"
            shadowOffset={{width: 0, height: 4}}
            shadowOpacity={0.3}
            shadowRadius={8}
            elevation={5}>
            {/* Email */}
            <YStack>
              <Label color="#333" fontWeight="700">
                Email
              </Label>
              <Input
                placeholder="joedoe75@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
                value={email}
                placeholderTextColor="#aaa"
                borderWidth={1}
                borderColor="#e0e0e0"
                borderRadius={12}
                paddingHorizontal={15}
                height={48}
                backgroundColor="#f9f9f9"
                color="#000"
              />
            </YStack>

            {/* Password */}
            <YStack>
              <Label color="#333" fontWeight="700">
                Password
              </Label>
              <XStack alignItems="center">
                <Input
                  placeholder="Enter password"
                  secureTextEntry={secureTextEntry}
                  onChangeText={setPassword}
                  value={password}
                  placeholderTextColor="#aaa"
                  borderWidth={1}
                  borderColor="#e0e0e0"
                  borderRadius={12}
                  paddingHorizontal={15}
                  height={48}
                  backgroundColor="#f9f9f9"
                  flex={1}
                  color="#000"
                />
                <TouchableOpacity
                  onPress={handleSecureEntryClickEvent}
                  style={{marginLeft: 8}}>
                  <Icon
                    name={secureTextEntry ? 'eye-off' : 'eye'}
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </XStack>
            </YStack>

            {/* Remember Me & Forgot */}
            <XStack justifyContent="space-between" alignItems="center">

              <TouchableOpacity>
                <Text color="#007BFF">Forgot password?</Text>
              </TouchableOpacity>
            </XStack>

            {/* Login Button */}
            <Button
              height={50}
              borderRadius={25}
              backgroundColor="#007BFF"
              onPress={validateAndSubmit}>
              <Text color="white" fontWeight="700" fontSize={16}>
                Login
              </Text>
            </Button>


            {/* Sign Up */}
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreenFirst')}>
              <YStack
                backgroundColor="transparent"
                paddingVertical="$3"
                borderRadius="$3"
                alignItems="center">
                <H2 color="black" fontWeight="600">
                  Sign up
                </H2>
              </YStack>
            </TouchableOpacity>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Theme>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innercontainer: {
    flex: 1,
    //  backgroundColor: PRIMARY_COLOR,
  },
  logoContainer: {
    flex: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: hp(3),
    marginTop: hp(2),
    flexDirection: 'column',
    marginHorizontal: 18,
    marginLeft: wp(2),
  },
  logo: {
    height: hp(16),
    width: wp(20),
    borderRadius: 70,
    resizeMode: 'cover',
  },
  brandText: {
    color: PRIMARY_COLOR,
    fontSize: fp(6),
    // fontFamily: 'Lobster-Regular',
    fontWeight: '600',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    // marginTop: hp(1),
    // borderWidth: 10,
    // borderColor: ON_PRIMARY_COLOR,
    // borderTopRightRadius: wp(2),
    //borderTopLeftRadius: wp(26),
    paddingHorizontal: wp(5.5),
    paddingTop: hp(3),
    flexDirection: 'column',
  },
  input: {
    flexDirection: 'column',
    marginBottom: hp(1),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    borderColor: '#99ccff',
  },
  inputLabel: {
    fontSize: fp(5),
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: hp(0),
  },

  inputLabelTxt: {
    fontSize: fp(4),
    fontWeight: '500',
    color: BUTTON_COLOR,
    //marginLeft: hp(1),
    marginBottom: hp(0),
  },

  inputControl: {
    // borderWidth: 1,
    width: '100%',
    paddingRight: 40,
    fontSize: fp(4),
    fontWeight: '500',
    alignItems: 'center',
    height: hp(5),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  forgotPasswordText: {color: '	#000000', fontWeight: '700', marginBottom: 6},
  loginButtonContainer: {marginVertical: hp(2)},
  loginButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(1.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
  },
  loginText: {
    fontSize: fp(5),
    fontWeight: '700',
    color: '#fff',
  },
  createAccountContainer: {marginVertical: hp(1), alignItems: 'center'},
  createAccountText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
});
