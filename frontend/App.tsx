/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  Platform,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import {PRIMARY_COLOR} from './src/Theme';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import TabNavigation from './src/navigations/TabNavigation';
import LoginScreen from './src/screens/auth/LoginScreen';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const BarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';
  return (
    <SafeAreaProvider>
    <View style={{flex:1,backgroundColor:backgroundStyle.backgroundColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : BarStyle}
        backgroundColor={
          isDarkMode ? backgroundStyle.backgroundColor : PRIMARY_COLOR
        }
      />
      {/* <NavigationContainer>
        <TabNavigation />
      </NavigationContainer> */}
  <LoginScreen />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </View>
    </SafeAreaProvider>
  );
}



export default App;
