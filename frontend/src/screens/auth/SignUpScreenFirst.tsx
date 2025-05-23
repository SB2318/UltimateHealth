import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp} from '../../helper/Metric';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {BUTTON_COLOR, PRIMARY_COLOR} from '../../helper/Theme';
import {SignUpScreenFirstProp, UserDetail} from '../../type';
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import Snackbar from 'react-native-snackbar';
import {
  CHECK_USER_HANDLE,
  REGISTRATION_API,
  VERIFICATION_MAIL_API,
} from '../../helper/APIUtils';
import EmailVerifiedModal from '../../components/VerifiedModal';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import Loader from '../../components/Loader';
import useUploadImage from '../../../hooks/useUploadImage';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
var validator = require('email-validator');

const SignupPageFirst = ({navigation}: SignUpScreenFirstProp) => {
  const {uploadImage, loading} = useUploadImage();
  const [user_profile_image, setUserProfileImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [verifyBtntext, setVerifyBtntxt] = useState('Request Verification');
  const [verifiedModalVisible, setVerifiedModalVisible] = useState(false);
  const [isHandleAvailable, setIsHandleAvailable] = useState(false);
  const [token, setToken] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [error, setError] = useState('');

  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const {uri, fileSize} = response.assets[0];

        // Check file size (1 MB limit)
        if (fileSize && fileSize > 1024 * 1024) {
          Alert.alert('Error', 'File size exceeds 1 MB.');
          return;
        }

        if (uri) {
          ImageResizer.createResizedImage(uri, 1000, 1000, 'JPEG', 100)
            .then(async resizedImageUri => {
              setUserProfileImage(resizedImageUri.uri);
            })
            .catch(err => {
              console.log(err);
              Alert.alert('Error', 'Could not resize the image.');
              setUserProfileImage('');
            });
        }
      }
    });
  };

  const checkUserHandleAvailability = async handle => {
    try {
      const response = await axios.post(CHECK_USER_HANDLE, {
        userHandle: username,
      });
      if (response.data.status === true) {
        setIsHandleAvailable(true);
        console.log('User Handle ', isHandleAvailable);
      } else {
        setIsHandleAvailable(false);
        console.log('User Handle ', isHandleAvailable);
        setError(response.data.error); // Show the error message
      }
    } catch (err) {
      console.error('Error checking user handle:', err);
      setError('An error occurred while checking the user handle.');
    }
  };

  const handleUserHandleChange = text => {
    setUsername(text);
    if (text.length > 2) {
      // Check if the user handle is available every time the user types
      checkUserHandleAvailability(text);
    } else {
      setIsHandleAvailable(true);
      setError('');
    }
  };

  const userRegisterMutation = useMutation({
    mutationKey: ['general-user-registration'],
    mutationFn: async ({profile_url}: {profile_url: string}) => {
      const res = await axios.post(REGISTRATION_API, {
        user_name: name,
        user_handle: username,
        email: email,
        password: password,
        isDoctor: false,
        Profile_image: profile_url,
      });
      return res.data.token as string;
    },
    onSuccess: data => {
      setToken(data);
      setVerifiedModalVisible(true);
    },

    onError: (err: AxiosError) => {
      console.log(err.message);
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 400:
            const errorData = err.message;
            console.log('Error message', errorData);
            Alert.alert('Registration failed', 'Please try again');
            break;
          case 409:
            Alert.alert(
              'Registration failed',
              'Email or user handle already exists',
            );
            break;
          case 500:
            Alert.alert(
              'Registration failed',
              'Internal server error. Please try again later.',
            );
            break;
          default:
            Alert.alert(
              'Registration failed',
              'Something went wrong. Please try again later.',
            );
        }
      } else {
        console.log('General User Registration Error', err);
        Alert.alert('Registration failed', 'Please try again');
      }
    },
  });

  const verifyMail = useMutation({
    mutationKey: ['send-verification-mail'],
    mutationFn: async () => {
      const res = await axios.post(VERIFICATION_MAIL_API, {
        email: email,
        token: token,
      });

      return res.data.message as string;
    },

    onSuccess: data => {
      setVerifyBtntxt(data);
      Alert.alert('Verification Email Sent');
      navigation.navigate('LoginScreen');
    },
    onError: (error: AxiosError) => {
      console.log('Email Verification error', error);

      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 400: {
            if (error.message === 'Email and token are required') {
              Alert.alert('Error', 'Email and token are required');
            } else if (error.message === 'User not found or already verified') {
              Alert.alert('Error', 'User not found or already verified');
            } else {
              Alert.alert('Error', 'Please provide all required fields');
            }
            break;
          }
          case 429: {
            Alert.alert(
              'Error',
              'Verification email already sent. Please try again after 1 hour.',
            );
            setVerifyBtntxt('Verification mail already sent');
            setVerifiedModalVisible(false);
            break;
          }

          case 500: {
            Alert.alert(
              'Error',
              'Internal server error. Please try again later.',
            );
            break;
          }
          default:
            Alert.alert(
              'Error',
              'Something went wrong. Please try again later.',
            );
        }
      } else {
        console.log('Email Verification error', error);
        Alert.alert('Error', 'Please try again');
      }
    },
  });

  const handleVerifyModalCallback = () => {
    if (token.length > 0) {
      verifyMail.mutate();
    } else {
      Alert.alert(
        'Failed to authenticate, Token not found',
        'Please try again',
      );
    }
  };
  const handleSubmit = () => {
    // if (!isHandleAvailable) {
    //   return;
    // }
    if (!name || !username || !email || !password || !role) {
      Alert.alert('Please fill in all fields');
      return;
    } else if (validator.validate(email) === false) {
      Alert.alert('Email id is not valid');
      return;
    } else if (password.length < 6) {
      Alert.alert('Password must be at least of 6 length');
      return;
    }

    if (role === 'general') {
      registerGeneralUser();
      // userRegisterMutation.mutate();
    } else {
      const detail: UserDetail = {
        user_name: name,
        user_handle: username,
        email: email,
        password: password,
        profile_image: user_profile_image,
      };
      console.log('General');
      navigation.navigate('SignUpScreenSecond', {
        user: detail,
      });
    }
  };

  const registerGeneralUser = async () => {
    Alert.alert(
      '',
      'Are you sure you want to use this image?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            // setUserProfileImage(user?.Profile_image || '');
            setUserProfileImage('');
            Snackbar.show({
              text: 'Your profile image will not  be uploaded.',
              duration: Snackbar.LENGTH_SHORT,
            });
            userRegisterMutation.mutate({
              profile_url: '',
            });
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Upload the resized image
              const result = await uploadImage(user_profile_image);
              // console.log('Image uploaded:', result);
              // After uploading, update the profile image with the returned URL
              //  userProfileImageMutation.mutate(result);
              userRegisterMutation.mutate({
                profile_url: result ? result : '',
              });
              //setSubmitProfileUrl(result ? result : '');
            } catch (err) {
              console.error('Upload failed');
              Alert.alert('Error', 'Upload failed');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const data = [
    {label: 'General User', value: 'general'},
    {label: 'Doctor', value: 'doctor'},
  ];

  if (userRegisterMutation.isPending || verifyMail.isPending || loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {/*
          <View style={styles.header}>
            <Text style={styles.title}>He who has health has hope and he</Text>
            <Text style={styles.title}>who has hope has everything.</Text>
            <Text style={styles.subtitle}> ~ Arabian Proverb.</Text>
          </View>

               <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <AntIcon name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
          */}

        <View style={styles.header}>
          <Text style={styles.subtitle}>
            He who has health has hope and he who has hope has everything.
          </Text>
          <Text style={styles.subtitle}> ~ Arabian Proverb.</Text>
        </View>

        <ScrollView>
          <TouchableOpacity onPress={selectImage} style={styles.iconContainer}>
            {user_profile_image === '' ? (
              <AntDesign
                name="camera"
                size={33}
                color="#ffffff"
                style={{transform: [{scaleX: -1}]}}
              />
            ) : (
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  resizeMode: 'cover',
                }}
                source={{uri: user_profile_image}}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.title}>Sign up</Text>
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
              />
              <View style={styles.inputIcon}>
                <Icon name="person" size={20} color="#000" />
              </View>
            </View>

            {isHandleAvailable && (
              <Text style={styles.error}>User handle is already in use.</Text>
            )}
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="User Handle"
                value={username}
                onChangeText={handleUserHandleChange}
              />

              <View style={styles.inputIcon2}>
                <Icon name="person" size={20} color="#000" />
              </View>
            </View>

            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
              <View style={styles.inputIcon}>
                <Icon name="email" size={20} color="#000" />
              </View>
            </View>

            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={isSecureEntry}
              />
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => setIsSecureEntry(!isSecureEntry)}>
                <AntDesign
                  name={isSecureEntry ? 'eyeo' : 'eye'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.field}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select your role' : '...'}
                value={role}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setRole(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {role === 'general' ? 'Register' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>

          <EmailVerifiedModal
            visible={verifiedModalVisible}
            onClick={handleVerifyModalCallback}
            onClose={() => {
              if (verifyBtntext !== 'Request Verification') {
                setVerifiedModalVisible(false);
              }
            }}
            message={verifyBtntext}
          />
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '94%',
    height: hp(14),
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: hp(1),
  },
  footer: {
    flex: 1,
    width: '90%',
    paddingTop: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: -60,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
    //textAlign:"center"
  },
  iconContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    marginBottom: 10,
    height: hp(11),
    width: hp(11),
    borderRadius: hp(5.5),
    marginLeft: 10,
    backgroundColor: PRIMARY_COLOR,
  },
  form: {
    padding: 16,
  },
  field: {},
  input: {
    height: hp(7),
    //width:'98%',
    borderColor: '#0CAFFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    marginBottom: 20,
    fontSize: 15,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  inputIcon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
  inputIcon2: {
    position: 'absolute',
    right: 14,
    top: 8,
  },
  button: {
    backgroundColor: '#0CAFFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dropdown: {
    height: 40,
    borderColor: '#0CAFFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingRight: 12,
  },
  placeholderStyle: {
    fontSize: 15,
  },
});

export default SignupPageFirst;
