import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ON_PRIMARY_COLOR, PRIMARY_COLOR} from '../helper/Theme';
// import {handleBackButton} from '../helper/Utils';
import {SplashScreenProp} from '../type';
import {KEYS, retrieveItem} from '../helper/Utils';

const SplashScreen = ({navigation}: SplashScreenProp) => {


  function isDateMoreThanSevenDaysOld(dateString: string) {
    const inputDate = new Date(dateString).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = currentDate - inputDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference >= 7;
  }


  function isDateNotMoreThanTenMinutesOld(dateString:string) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const minutesDifference = timeDifference / (1000 * 60);
    return minutesDifference <= 10;
}



  const checkLoginStatus = async () => {
    try {
      const user = await retrieveItem(KEYS.USER_TOKEN);
      const expiryDate = await retrieveItem(KEYS.USER_TOKEN_EXPIRY_DATE);

      if (user && expiryDate && !isDateMoreThanSevenDaysOld(expiryDate)) {
        navigation.navigate('TabNavigation');
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error retrieving user data from storage', error);
      navigation.navigate('LoginScreen'); // Navigate to LoginPage if there's an error
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.icon} />
      <Text style={styles.text}>Ultimate</Text>
      <Text style={styles.text}>Health</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: ON_PRIMARY_COLOR,
    textAlign: 'center',
    fontFamily: 'Lobster-Regular',
  },
});

export default SplashScreen;
