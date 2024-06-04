import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../Theme';
import { hp } from '../helper/Metric';

export default function EmailInputModal({ visible, callback, backButtonClick }) {
  const [modelTitle, setModelTitle] = useState(true);
  const [email, setEmail] = useState('');

  const verifyEmail = () => {
    if (!email) {
      setModelTitle(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModelTitle(false);
      return;
    }
    setEmail('')
    callback();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={modelTitle ? styles.modalTitle : styles.modalTitle1}>
          {modelTitle ? 'Enter your email id' : 'Email is not valid'}
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#948585"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setModelTitle(true);
          }}
          style={modelTitle ? styles.modalInput : styles.modalInput1}
        />
        <TouchableOpacity style={styles.modalButton} onPress={verifyEmail}>
          <Text style={styles.modalButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={()=>{backButtonClick();setEmail('');setModelTitle(true)}}>
          <Text style={styles.modalButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: hp(33),
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  modalInput: {
    height: 40,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalInput1: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
