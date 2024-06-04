import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
  } from 'react-native';
  import {PRIMARY_COLOR} from '../../Theme';
  import {fp, hp, wp} from '../../helper/Metric';
  import feather from 'react-native-vector-icons/Feather';

/** Make sure you have add this screen into stack, and catch the navigation params here */
export default function NewPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const handlePasswordSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please enter matching passwords.');
      return;
    }
    navigation.navigate('LoginScreen');
  };
  return (
    /** Design New password screen 
         * 
         * // Handle password field show hide feature 
         // Handle submit action 
            if(newPasswordInput empty){
                // change the border color of new password input field
                // set proper error message on the enter new password textview
            }
            else if(confirmPasswordInput empty){
                // change the border color of confirm password input field
                // set proper error message on the enter confirm password textview
            }
            else if( newPassword !== confirmPassword){
               // change the border color of new password input field
                // set proper error message on the enter new password textview 
                  // change the border color of confirm password input field
                // set proper error message on the enter confirm password textview
            }else{

                // Navigate to login screen
                // show the toast message "Password Reset Sucessfully"
            }
           
        */

    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>New Password</Text>
        <Text style={styles.text}>Enter new password</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!showPassword.new}
          placeholder="at least 10 digits"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Text style={styles.text1}>Confirm password</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!showPassword.confirm}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input1}
        />
        <View style={styles.eye}>
          <feather.Button
            name={showPassword.new ? 'eye' : 'eye-off'}
            size={24}
            color="black"
            backgroundColor="white"
            onPress={() =>
              setShowPassword({...showPassword, new: !showPassword.new})
            }
          />
        </View>
        <View style={styles.eye1}>
          <feather.Button
            name={showPassword.confirm ? 'eye' : 'eye-off'}
            size={24}
            color="black"
            backgroundColor="white"
            onPress={() =>
              setShowPassword({...showPassword, confirm: !showPassword.confirm})
            }
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR,
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: '20%',
    borderColor: 'white',
    borderWidth: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    top: hp(3),
  },
  text: {
    fontSize: 18,
    color: 'grey',
    position: 'absolute',
    top: hp(10),
    left: wp(13),
    fontWeight: '700',
  },
  text1: {
    fontSize: 18,
    color: 'grey',
    position: 'absolute',
    top: hp(23),
    left: wp(13),
    fontWeight: '700',
  },
  eye: {
    width: 50,
    height: 38,
    borderRadius: 50,
    position: 'absolute',
    top: hp(15.5),
    right: wp(12.5),
  },
  eye1: {
    width: 50,
    height: 38,
    borderRadius: 50,
    position: 'absolute',
    top: hp(28.5),
    right: wp(12.5),
  },
  input: {
    height: 50,
    width: '85%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    position: 'absolute',
    top: hp(15),
  },
  input1: {
    height: 50,
    width: '85%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    position: 'absolute',
    top: hp(28),
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 18,
    alignItems: 'center',
    width: '50%',
    position: 'absolute',
    top: hp(38),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
