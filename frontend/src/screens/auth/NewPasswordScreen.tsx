import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {PRIMARY_COLOR} from '../../helper/Theme';
import feather from 'react-native-vector-icons/Feather';
import {hp} from '../../helper/Metric';

export default function NewPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    new: true,
    confirm: false,
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handlePasswordSubmit = () => {
    if (!password || !confirmPassword) {
      setError(true);
      setErrorText('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError(true);
      setErrorText('Password does not match');
      return;
    }
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.innerContainer}>
      {/* <Text style={styles.title}>New Password</Text> */}
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Enter new password</Text>
        {error && <Text style={styles.error}>{errorText}</Text>}
        <View style={[styles.passwordContainer, error && styles.inputError]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!showPassword.new}
            placeholder="at least 10 digits"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
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
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Confirm password</Text>
        {error && <Text style={styles.error}>{errorText}</Text>}
        <View style={[styles.passwordContainer, error && styles.inputError]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!showPassword.confirm}
            placeholder="*******"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
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
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    padding: 20,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: hp(15),
    width: '100%',
    height: '100%',
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   marginBottom: 20,
  // },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 5,
    width: '80%',
  },
  inputError: {
    borderColor: 'red',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    fontWeight: '700',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
