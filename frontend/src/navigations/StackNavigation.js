import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const StackNavigation = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        if (route.name === 'SplashScreen') {
          Alert.alert('Exit App', 'Are you sure you want to exit?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => backHandler.remove();
    }, [route])
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false,gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
