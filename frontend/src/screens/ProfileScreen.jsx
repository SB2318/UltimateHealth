import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ProfileScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const color = isDarkMode ? 'white' : 'black';

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <Text style={{color: color}}>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
