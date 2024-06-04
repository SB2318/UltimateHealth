import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';

import { BackHandler } from 'react-native';
import { handleBackButton } from '../utils/FunctionUtils';

import { PRIMARY_COLOR } from '../Theme';

const ProfileScreen = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
   // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   backgroundColor:PRIMARY_COLOR
  };
  const color = isDarkMode ? 'white' : 'black';


  useEffect(()=>{

    const backHandler = 
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  },[])

  
  return (
    <SafeAreaView style={[backgroundStyle, {flex:1,alignItems:'center',justifyContent:"center"}]}>
    <Text style={{color:'white',fontSize:18, fontFamily:'500'}}>ProfileScreen</Text>
  </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
