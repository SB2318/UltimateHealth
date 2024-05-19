import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SECONDARY_COLOR } from '../Theme';
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
    backgroundColor: '#fff',
  },
  icon: {
    width: 150,
    height: 150, 
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    textAlign: 'center',
  },
});

export default SplashScreen;