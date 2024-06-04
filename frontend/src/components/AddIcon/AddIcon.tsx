import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const AddIcon = () => {
  return (
    <SafeAreaView style={styles.firstcontaner}>
        <TouchableOpacity style={styles.circleview}>
          <FontAwesome6 name="pen" size={20} color="white" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddIcon;

const styles = StyleSheet.create({
  firstcontaner: {
    flex: 1,
  },
  circleview: {
    height: 60,
    width: 60,
    backgroundColor: 'primary',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
