import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const HEIGHT = Dimensions.get('window').height;

const AddIcon = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity >
        <Image
          source={require('../../assets/plus.png')}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddIcon;

const styles = StyleSheet.create({
  plusIcon: {
    height: 60,
    width: 60,
  },
});
