import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const SignupPageFirst = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Handle signup logic here
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          He who has health has hope and he
        </Text>
        <Text style={styles.title}>
          who has hope has everything.
        </Text>
        <Text style={styles.subtitle}> ~ Arabian Proverb.</Text>
      </View>
      <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Icon name="person-add" size={50} color='#0CAFFF'/>
          </View>
          <View style={styles.form}>
              <View style={styles.field}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                  />
                  <View style={styles.inputIcon}>
                    <Icon name="person" size={20} color="#000" />
                  </View>
              </View>

              <View style={styles.field}>
                  <TextInput
                    style={styles.input}
                    placeholder="User Handle"
                    onChangeText={setUsername}
                    value={username}
                  />
                  <View style={styles.inputIcon}>
                    <Icon name="person" size={20} color="#000" />
                  </View>
              </View>

              <View style={styles.field}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                  />
                  <View style={styles.inputIcon}>
                      <Icon name="email" size={20} color="#000" />
                  </View>
              </View>

              <View style={styles.field}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                  />
                  <View style={styles.inputIcon}>
                    <Icon name="password" size={20} color="#000" />
                  </View>
              </View>

              <View style={styles.picker}>
                  <Picker
                    selectedValue={role}
                    onValueChange={setRole}
                  >
                    <Picker.Item label="Select your role" value="" />
                    <Picker.Item label="General User" value="user" />
                    <Picker.Item label="Doctor" value="doctor" />
                  </Picker>

              </View>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreenSecond')}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
          </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CAFFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0CAFFF',
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  footer: {
    flex : 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
//     marginLeft: 30,
//     marginRight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  iconContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  form: {
    padding: 20,
    paddingTop: 30,
  },
  field: {
    alignSelf: 'end',
  },
  input: {
    height: 40,
    borderColor: '#0CAFFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  inputIcon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
  picker: {
//     height: 40,
    borderColor: '#0CAFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 5,
    fontSize: 10,
  },
  button: {
    backgroundColor: '#0CAFFF',
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf : 'center',
    marginTop: 60,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default SignupPageFirst;