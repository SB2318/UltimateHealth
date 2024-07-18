import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreenFirst from '../screens/auth/SignUpScreenFirst';
import SignUpScreenSecond from '../screens/auth/SignUpScreenSecond';
import OtpScreen from '../screens/auth/OtpScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import EditorScreen from '../screens/article/EditorScreen';
import PreviewScreen from '../screens/article/PreviewScreen';
import ArticleScreen from '../screens/article/ArticleScreen';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreenFirst"
        component={SignUpScreenFirst}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreenSecond"
        component={SignUpScreenSecond}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPasswordScreen"
        component={NewPasswordScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditorScreen"
        component={EditorScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PreviewScreen"
        component={PreviewScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerBackTitleVisible: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome6 size={25} name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  headerLeftButton: {
    marginLeft: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
  },
});
export default StackNavigation;
