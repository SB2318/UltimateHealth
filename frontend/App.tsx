/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PRIMARY_COLOR} from './src/helper/Theme';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';

const BackButtonHandler = () => {
  const navigation = useNavigation();
  console.log('Navigation', navigation?.getState());
  useEffect(() => {
    const backAction = () => {
      if (!navigation || !navigation.canGoBack()) {
        return;
      }
      const currentRoute =
        navigation?.getState()?.routes[navigation?.getState()?.index || 0]
          ?.name;

      if (
        currentRoute === 'LoginScreen' ||
        currentRoute === 'TabNavigation' ||
        currentRoute === 'Profile' ||
        currentRoute === 'Home' ||
        currentRoute === 'Podcasts'
      ) {
        Alert.alert('Warning', 'Do you want to exit?', [
          {text: 'No', onPress: () => null},
          {
            text: 'Yes',
            onPress: () => {
              BackHandler.exitApp();
              console.log('State', currentRoute);
            },
          },
        ]);
        return true; // Prevent default behavior
      } else {
        navigation.goBack(); // Allow back navigation for other screens
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler;
  }, [navigation]);

  return null; // This component doesn't need to render anything
};
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  //const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const BarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View
          style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : BarStyle}
            backgroundColor={
              isDarkMode ? backgroundStyle.backgroundColor : PRIMARY_COLOR
            }
          />
          {
            <NavigationContainer>
              <BackButtonHandler />
              <StackNavigation />
            </NavigationContainer>
          }
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
