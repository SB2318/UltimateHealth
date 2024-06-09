import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {hp} from '../../helper/Metric';

export default function OtpScreen({navigation}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (otp.length < 4) {
      setError(true);
      return;
    }
    navigation.navigate('NewPasswordScreen');
  };

  return (
    <View style={styles.innerContainer}>
      <Image source={require('../../assets/mail.png')} style={styles.logo} />
      <Text style={styles.title}>
        We have sent you OTP to your email address for verification
      </Text>
      <View style={styles.otpContainer}>
        {error && <Text style={styles.error}>Invalid OTP</Text>}
        <TextInput
          style={[styles.input, error && styles.inputError]}
          maxLength={6}
          keyboardType="numeric"
          onChangeText={text => setOtp(text)}
          value={otp}
        />
      </View>
      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>Resend OTP?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    borderColor: 'white',
    paddingTop: hp(10),
    borderWidth: 3,
    //borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
    width: '100%',
  },
  logo: {
    height: 105,
    width: 152,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    marginHorizontal: 20,
    fontSize: 18,
    width: '80%',
  },
  otpContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
    width: '80%',
  },
  input: {
    height: 60,
    width: '80%',
    fontSize: 20,
    borderRadius: 7,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 4,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  resendContainer: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: '10%',
  },
  resendText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
