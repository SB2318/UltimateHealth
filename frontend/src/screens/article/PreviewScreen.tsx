import React from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR } from '../../helper/Theme';
import HTMLView from "react-native-htmlview";

export default function PreviewScreen({navigation, route}){

    const {article} = route.params;

    return(
        <ScrollView style={styles.container}>


        <SafeAreaView style={{padding:10}}>


     <View style={styles.row}>

     <TouchableOpacity
      onPress={()=>{navigation.goBack()}}>

        <IonIcon name='arrow-back' size={30} color={PRIMARY_COLOR}/>
      </TouchableOpacity>

   <TouchableOpacity 
   style={styles.button}
   onPress={()=>{}}>
     <Text style={styles.textWhite}>Post</Text>
   </TouchableOpacity>

     </View>
         

      
         <HTMLView value={article} stylesheet={styles} />

        </SafeAreaView>
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
      },

      text: {
        fontWeight: "bold",
        fontSize: 20,
    
      },

      textWhite: {
        fontWeight:"600",
        fontSize: 17,
        color:"white"
      },

      row:{
         justifyContent:"space-between",
         flexDirection:"row",
         alignItems:"center"
      },
      button:{
        height:40,
        width:75,
        backgroundColor:PRIMARY_COLOR,
        padding:6,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
      }
})