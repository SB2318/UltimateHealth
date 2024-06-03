import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PRIMARY_COLOR} from '../Theme';
import AddIcon from '../component/AddIcon/AddIcon';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: PRIMARY_COLOR,
  };
  const color = isDarkMode ? 'white' : 'black';
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <View style={styles.centeredView}>
        <Text style={styles.textStyle}>
          HomeScreen
        </Text>
      </View>

      <View style={styles.homePlusIconview}>
        <AddIcon/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
