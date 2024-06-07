import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, {useEffect} from 'react'
import { BackHandler } from 'react-native';
import { handleBackButton } from '../utils/FunctionUtils';
import { PRIMARY_COLOR } from '../Theme';
import AddIcon from '../components/AddIcon';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {


  useEffect(()=>{

    const backHandler = 
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  },[])

    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();

    const backgroundStyle = {
     // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     backgroundColor:PRIMARY_COLOR
    };


    const color = isDarkMode ? "white" : "black"


    const handleNoteIconClick = ()=>{

    }
  return (
    <SafeAreaView style={[backgroundStyle,{flex:1,alignItems:'center',justifyContent:"center"}]}>
      <Text style={{color:'white',fontSize:18, fontFamily:'500',}}>HomeScreen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpScreenFirst')}
      >
      <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.homePlusIconview}>
        <AddIcon callback={handleNoteIconClick}/>
      </View>
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
    right: 25,
    position:'absolute'
  },
  button: {
    height: 45,
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
});
