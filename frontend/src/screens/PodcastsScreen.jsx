import {StyleSheet, Text, View, useColorScheme, SafeAreaView,Dimensions} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PRIMARY_COLOR } from '../Theme';
import AddIcon from '../component/AddIcon/AddIcon';

const HEIGHT = Dimensions.get('window').height;

const PodcastsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: PRIMARY_COLOR
  };
  const color = isDarkMode ? 'white' : 'black';

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      
   
      <View style={styles.centeredPView}>
      <Text style={{color:'white',fontSize:18, fontFamily:'500'}}>PodcastsScreen</Text>
      </View>

      <View style={styles.podPlusIconview}>
        <AddIcon/>
      </View>
    </SafeAreaView>
  );
};

export default PodcastsScreen;

const styles = StyleSheet.create({
  centeredPView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  podPlusIconview: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: HEIGHT / 10,
    right: 30,
  },
});
