import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const color = isDarkMode ? "white" : "black"
  return (
    <SafeAreaView style={[backgroundStyle,{flex:1}]}>
      <Text style={{color:color}}>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})