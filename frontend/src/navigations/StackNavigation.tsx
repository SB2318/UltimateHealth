import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreenFirst from '../screens/auth/SignUpScreenFirst';
import SignUpScreenSecond from '../screens/auth/SignUpScreenSecond'
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {


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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreenFirst"
        component={SignUpScreenFirst}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreenSecond"
        component={SignUpScreenSecond}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;