import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  BackHandler,
} from 'react-native';
import { PRIMARY_COLOR } from '../../Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fp, hp, wp } from '../../helper/Metric';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailInputModal from '../../components/EmailInputModal';
import { handleBackButton } from '../../utils/FunctionUtils';

const LoginScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const [emailInputVisible, setEmailInputVisible] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
  }, []);

  const storeItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.error('Error storing item:', error);
    }
  };

  const handleForgotPassword = () => {
    setEmailInputVisible(true);
  };

  const handleEmailInputBack = () => {
    setEmailInputVisible(false);
  };

  const navigateToOtpScreen = () => {
    navigation.navigate('OtpScreen');
    setEmailInputVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} backgroundColor={PRIMARY_COLOR} />
      <View style={[styles.innercontainer, { paddingTop: inset.top }]}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <View style={{ marginLeft: wp(4) }}>
            <Text style={styles.brandText}>Ultimate</Text>
            <Text style={styles.brandText}>Health</Text>
          </View>
        </View>
        <View style={[styles.formContainer, { backgroundColor: isDarkMode ? Colors.darker : 'white' }]}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="Email id or username"
              placeholderTextColor="#948585"
              style={[
                styles.inputControl,
                {
                  borderColor: isDarkMode ? 'white' : 'black',
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              placeholder="Password"
              placeholderTextColor="#948585"
              secureTextEntry={true}
              style={[
                styles.inputControl,
                {
                  borderColor: isDarkMode ? 'white' : 'black',
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}
            />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={() => storeItem('user', 'ok')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>

          <EmailInputModal
            callback={navigateToOtpScreen}
            visible={emailInputVisible}
            backButtonClick={handleEmailInputBack}
          />

          <View style={styles.createAccountContainer}>
            <TouchableOpacity onPress={() => storeItem('user', 'ok')}>
              <Text style={[styles.createAccountText, { color: isDarkMode ? 'white' : 'black' }]}>
                Create new account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innercontainer: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  logoContainer: {
    marginBottom: hp(5),
    marginTop: hp(2),
    flexDirection: 'row',
    marginHorizontal: 18,
    alignItems: 'center',
    marginLeft: wp(5),
  },
  logo: {
    height: hp(12),
    width: wp(25),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  brandText: {
    color: 'white',
    fontSize: fp(10),
    fontFamily: 'Lobster-Regular',
  },
  formContainer: {
    flex: 1,
    marginTop: 14,
    borderTopRightRadius: wp(26),
    paddingHorizontal: wp(7),
    paddingTop: hp(10),
    flexDirection: 'column',
  },
  input: {
    marginBottom: hp(2),
  },
  inputLabel: {
    fontSize: fp(4),
    fontWeight: '600',
    color: '#948585',
    marginBottom: hp(1),
  },
  inputControl: {
    height: hp(6),
    fontSize: fp(4),
    fontWeight: '500',
    borderBottomWidth: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: { color: 'black', fontWeight: '600' },
  loginButtonContainer: { marginVertical: hp(4), alignItems: 'center' },
  loginButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(16),
    borderRadius: 50,
  },
  loginText: {
    fontSize: fp(5),
    fontWeight: '700',
    color: '#fff',
  },
  createAccountContainer: { marginVertical: hp(2), alignItems: 'center' },
  createAccountText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
