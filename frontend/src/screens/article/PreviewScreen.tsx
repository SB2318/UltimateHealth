import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR } from '../../helper/Theme';
import HTMLView from "react-native-htmlview";

export default function PreviewScreen({navigation, route}){

    const {article} = route.params;
    return(
        <ScrollView style={styles.container}>


        <SafeAreaView style={{padding:10}}>

           <TouchableOpacity
             onPress={()=>{navigation.goBack()}}>

                <IonIcon name='chevron-back' size={36} color={PRIMARY_COLOR}/>
             </TouchableOpacity>

      
         <HTMLView value={article} stylesheet={styles} />

        </SafeAreaView>
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },

      text: {
        fontWeight: "bold",
        fontSize: 20,
    
      },
})