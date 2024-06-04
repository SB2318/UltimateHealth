import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PRIMARY_COLOR } from '../Theme';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
     // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     backgroundColor:PRIMARY_COLOR
    };
    const color = isDarkMode ? "white" : "black"
  return (
    <SafeAreaView style={[backgroundStyle,{flex:1,alignItems:'center',justifyContent:"center"}]}>
      <Text style={{color:'white',fontSize:18, fontFamily:'500',}}>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  homePlusIconview: {
    bottom:100,
    right: 30,
    position:'absolute'
  },
});
