import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';

import {PRIMARY_COLOR} from '../helper/Theme';

const PodcastsScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: PRIMARY_COLOR,
  };
  const color = isDarkMode ? 'white' : 'black';

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Warning',
          'Do you want to exit',
          [
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
      }),
    [],
  );

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text style={{color: 'white', fontSize: 18, fontFamily: '500'}}>
        PodcastsScreen
      </Text>
    </SafeAreaView>
  );
};

export default PodcastsScreen;

const styles = StyleSheet.create({});
