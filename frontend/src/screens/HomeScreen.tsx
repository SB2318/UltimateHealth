import { SafeAreaView, StyleSheet, Text, TouchableOpacity, 
  View, useColorScheme,BackHandler,Alert } from 'react-native'
import React, {useEffect} from 'react'

import { PRIMARY_COLOR } from '../helper/Theme';
import AddIcon from '../components/AddIcon';


const HomeScreen = ({navigation}) => {


 
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        "Warning",
        "Do you want to exit",
        [
          { text: "No", onPress: () => null },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: true }
      );
    }), [])

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
