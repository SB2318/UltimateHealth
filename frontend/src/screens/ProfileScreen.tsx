import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import { PRIMARY_COLOR } from '../helper/Theme';

const ProfileScreen = ({navigation}) => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
   // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   backgroundColor:PRIMARY_COLOR
  };
  const color = isDarkMode ? 'white' : 'black';


  useEffect(()=>{
  },[])

  
  return (
    <SafeAreaView style={[backgroundStyle, {flex:1,alignItems:'center',justifyContent:"center"}]}>
    <Text style={{color:'white',fontSize:18, fontFamily:'500'}}>ProfileScreen</Text>
  </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
