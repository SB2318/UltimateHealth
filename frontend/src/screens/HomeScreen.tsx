import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, {useEffect} from 'react'
import { BackHandler } from 'react-native';
import { handleBackButton } from '../utils/FunctionUtils';
import { PRIMARY_COLOR } from '../Theme';
import AddIcon from '../components/AddIcon';


const HomeScreen = () => {


  useEffect(()=>{

    const backHandler = 
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  },[])

    const isDarkMode = useColorScheme() === 'dark';
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
});