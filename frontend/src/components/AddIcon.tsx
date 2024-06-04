import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { PRIMARY_COLOR } from '../Theme';


const AddIcon = ({callback}) => {
  return (
    <SafeAreaView style={styles.firstcontaner}>
        <TouchableOpacity style={styles.circleview} onPress={callback}>
          <FontAwesome6 name="pen" size={24} color={PRIMARY_COLOR} />
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
    height: 58,
    width: 58,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
