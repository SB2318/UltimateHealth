import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ON_PRIMARY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../Theme';
import icon from '../assets/icon.png';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TabNavigation');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>Ultimate</Text>
      <Text style={styles.text}>Health</Text>
    </View>
  );
}

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
    borderRadius:60,
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: ON_PRIMARY_COLOR,
    textAlign: 'center',
    fontFamily:"Lobster-Regular"
  },
});

export default SplashScreen;