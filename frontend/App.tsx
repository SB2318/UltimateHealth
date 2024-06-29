import React from "react";
import { StyleSheet, View } from "react-native";
import HumanBodyMap from "./HumanBodyMap"; // Adjust the import path as necessary

<<<<<<< HEAD
const App = () => {
  const handleBodyPartSelect = (part) => {
    console.log("Selected body part:", part);
  };

  return (
    <View style={styles.container}>
      <HumanBodyMap onBodyPartSelect={handleBodyPartSelect} />
    </View>
=======
import React from 'react';

import {Platform, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { PRIMARY_COLOR } from './src/helper/Theme';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const BarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : BarStyle}
          backgroundColor={
            isDarkMode ? backgroundStyle.backgroundColor : PRIMARY_COLOR
          }
        />
        {
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        }
      </View>
    </SafeAreaProvider>
>>>>>>> d0d5651bb7bba3e16d0383ac6b2a00aad4e435f7
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

=======
>>>>>>> d0d5651bb7bba3e16d0383ac6b2a00aad4e435f7
export default App;
