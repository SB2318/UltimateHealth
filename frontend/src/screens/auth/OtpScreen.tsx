import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {PRIMARY_COLOR} from '../../Theme';
import {fp, hp, wp} from '../../helper/Metric';

/** Add this screen into Stack, and catch navigation param here */
export default function OtpScreen({navigation}) {
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    if (otp.length !== 4) {
      setError(true);
      return;
    }
    navigation.navigate('NewPasswordScreen');
  };

  return (
    /** Design The screen */
    /** Catch all the otp input */
    /**
     * Create useState Variable for otp input
     *
     * handle submit button click
     *
     *  if(otp is not empty)
     *   send to New Password screen (Make sure you add it to stack)
     * else
     *   change the border of otp input field into red. and set a proper error message on the text
     */
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/mail.png')} style={styles.logo} />
        <Text style={styles.title}>
          We have sent you OTP to your email address for verification
        </Text>
        <View style={styles.otp}>
          {error && <Text style={styles.error}>Invalid OTP</Text>}
          <TextInput
            style={!error ? styles.input : styles.input1}
            maxLength={4}
            keyboardType="name-phone-pad"
            onChangeText={text => setOtp(text)}
            value={otp}
          />
        </View>
        <TouchableOpacity style={styles.resendcontainer}>
          <Text style={styles.resend}>Resend otp?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    marginTop: '40%',
    borderColor: 'white',
    borderWidth: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    position: 'relative',
  },
  logo: {
    height: hp(14),
    width: wp(45),
    backgroundColor: 'white',
    position: 'absolute',
    top: -hp(7),
  },
  error: {
    color: 'red',
    position: 'absolute',
    top: hp(-4),
    left: wp(5),
    fontWeight: 'bold',
  },
  otp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    top: hp(20),
    left: wp(5),
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: hp(-5),
    color: 'black',
    position: 'absolute',
    top: hp(8),
    left: wp(20),
  },
  input: {
    height: 60,
    width: '80%',
    fontSize: 24,
    borderRadius: 10,
    borderColor: PRIMARY_COLOR,
    borderWidth: 3,
    paddingHorizontal: 10,
    marginLeft: hp(3),
  },
  input1: {
    height: 60,
    width: '80%',
    fontSize: 24,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
    paddingHorizontal: 10,
    marginLeft: hp(3),
  },
  resendcontainer: {
    position: 'absolute',
    top: hp(33),
    right: wp(2),
  },
  resend: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '60%',
    position: 'absolute',
    top: hp(37),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
