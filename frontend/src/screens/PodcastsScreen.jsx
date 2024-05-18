import {StyleSheet, Text, View, useColorScheme, SafeAreaView} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PRIMARY_COLOR } from '../Theme';

const PodcastsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: PRIMARY_COLOR
  };
  const color = isDarkMode ? 'white' : 'black';
  return (
    <SafeAreaView style={[backgroundStyle, {flex:1,alignItems:'center',justifyContent:"center"}]}>
      <Text style={{color:'white',fontSize:18, fontFamily:'500'}}>PodcastsScreen</Text>
    </SafeAreaView>
  );
};

export default PodcastsScreen;

const styles = StyleSheet.create({});
