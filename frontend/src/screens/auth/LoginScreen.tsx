import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { PRIMARY_COLOR } from '../../helper/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fp, hp, wp} from '../../helper/Metric';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveItem } from '../../helper/Utils';
import EmailInputModal from '../../components/EmailInputModal';
import { UserModel,LoginUser } from '../../models/User';
import { AuthApiService } from '../../services/AuthApiService';


// Import User Model and AUTH API SERVICE HERE, Details will be provided when work start

const LoginScreen = ({navigation}) => {

  const inset = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const [emailInputVisible, setEmailInputVisible] = useState(false)

  // ISSUE: 85  Step 2 , Create Reference and useState variable for DOM / View input elements
  /**
   * const emailRef= useRef(null) -> will point email input
   * const [email, setEmail] = useState('') -> useState variable for storing input value
   * passwordRef-> will point password input field
   * password -> useState variable for storing input value
   */


// ISSUE : 77 Step 1:
 // Create an useState variable which will handle secureTextEntry of password field
   const [secureTextEntry, setSecureTextEntry] = useState(true)

  // ISSUE : 77 Step 2:
  // Handle Eye Icon action, assume there are already an eye icon in the password field and you have to handle it's action
  const handleSecureEntryClickEvent = ()=>{
   // setSecureTextEntry(!secureTextEntry)
  }

  //////////////////////////////////////////////////////////////////////
 
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        "Warning",
        "Do you want to exit",
        [
          { text: "No", onPress: () => null },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: true }
      );
    }), [])
  
  const storeItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.error('Error storing item:', error);
    }
  };

  /** ISSUE 85 : Complete the function */
  const validateAndSubmit = ()=>{

      /** Complete the function */
      if(validate()){

        /** Create a new object of service */
        let service = new AuthApiService()
        /** Create a new object of params */
        let params = new LoginUser()
        //params.email = email
        //params.password = password

        // call login method with the help of service object
        service.login(params).then((response)=>{
           console.log("Response", response)
           // Store User data after stringify
           // Navigate to home
        })

      }
  }

  /** ISSUE 85: Complete the function */
  const validate = ()=>{

    /** Validate email data */
    /** Validate Password data */
    /**
     * if(validate) return true
     * else 
     *  return false
     */

    return true
  }

  const handleForgotPassword= ()=>{

    /** Forgot Password Modal visibility */
    setEmailInputVisible(true)

  }

  const handleEmailInputBack = ()=>{

    /** Handle Email InputDialogBackButton */
    setEmailInputVisible(false)
  }

  const navigateToOtpScreen = ()=>{

    /** Here you need to navigate into otp screen, 
     * make sure you have add the screen inside StackNavigation Component 
     * */
  }



  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={PRIMARY_COLOR}
      />
      <View style={[styles.innercontainer, {paddingTop: inset.top}]}>
        {/* logo image and brand container */}
        <View style={styles.logoContainer}>
          {/* image */}
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
          />
          {/* brand text container */}
          <View style={{marginLeft: wp(4)}}>
            <Text style={styles.brandText}>Ultimate</Text>
            <Text style={styles.brandText}>Health</Text>
          </View>
        </View>
        {/* login form */}
        <View
          style={[
            styles.formContainer,
            {backgroundColor: isDarkMode ? Colors.darker : 'white'},
          ]}>
          {/* email input */}
          <View style={styles.input}>
            {
             /** ISSUE : 85, STEP:3, set email ref here for TextInput
               <TextInput ref={emailRef} style={styles.inputLabel}></TextInput>
              */
            }
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
          {/* password input */}

          {/** Issue 77: Step 3: Here you have to modify the container, first create another container which will wrap the two field
             TextInput and eye icon */}
          
          <View style={styles.input}>
            {/* <View style={styles.containerStyle}>
             
            </View> */}

{
             /** ISSUE : 85, STEP:4, set passwordRef here for TextInput
               <TextInput ref={passwordRef} style={styles.inputLabel}></TextInput>
              */
            }
            <View> 
              {  /** Container Style will be the container which will contain the password input field as well as eye icon*/ } 
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              placeholder="Password"
              placeholderTextColor="#948585"
              secureTextEntry={secureTextEntry}
              style={[
                styles.inputControl,
                {
                  borderColor: isDarkMode ? 'white' : 'black',
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}
            />

            { 
              /**
              Issue 77 : Step 4 Take TouchableOpacity
              <TouchableOpacity style={{

              // Make sure the position is absolute, and give some top-right value and style it so that you achieve your desire design
              }}
              onPress ={handleSecureEntryClickEvent}
              >
               secureTextEntry?(
               <Icon1/> // it will be eye-off icon from react-native-vector-icon
               ):(

               <Icon2/> // it will be eye-off icon from react-native-vector-icon
               )
            </TouchableOpacity>
              // You are done, run the app  😇
             */
              }
            </View>
          </View>
          {/* forgot password */}
          <View style={styles.forgotPasswordContainer}>

          {/** Handle Forgot Password Click, Add Email Input Modal Here and control its visibility */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

      
          {/* login  button */}
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                    {/** ISSUE 85: Step 5 Handle Login Button Action, Complete the method */}
                //storeItem('user', 'ok');
                validateAndSubmit()
              }}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>


          <EmailInputModal 
          callback={navigateToOtpScreen} 
          visible={emailInputVisible}
          backButtonClick={handleEmailInputBack}
          navigator={navigation}/>
            
          {/* creat account button */}
          <View style={styles.createAccountContainer}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.createAccountText,
                  {
                    color: isDarkMode ? 'white' : 'black',
                  },
                ]}
                onPress={() => {
                   // storeItem('user', 'ok');
                   navigation.navigate('SignUpScreenFirst')
                 }}
                >
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
  forgotPasswordText: {color: 'black', fontWeight: '600'},
  loginButtonContainer: {marginVertical: hp(4), alignItems: 'center'},
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
  createAccountContainer: {marginVertical: hp(2), alignItems: 'center'},
  createAccountText: {
    fontSize: 18,
    fontWeight: '700',
  },
});

//    emailRef.current.style.borderColor = 'red';