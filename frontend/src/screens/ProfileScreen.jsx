import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,Dimensions
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PRIMARY_COLOR} from '../Theme';
import AddIcon from '../component/AddIcon/AddIcon';

const HEIGHT = Dimensions.get('window').height;

const ProfileScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: PRIMARY_COLOR,
  };
  const color = isDarkMode ? 'white' : 'black';

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <View style={styles.centeredView}>
        <Text style={styles.textStyle}>
          ProfileScreen
        </Text>
      </View>
      <View style={styles.proPlusIconview}>
        <AddIcon/>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  proPlusIconview: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: HEIGHT / 10,
    right: 30,
  },
});
