import React, {useMemo, useState} from 'react';
import {Platform, View} from 'react-native';
import WellnessDashboardScreen from '../wellness/WellnessDashboardScreen';
import {WebDemoHome} from '../home/HomeScreen';

type DemoRoute = 'home' | 'wellness';

const WebDemoShell = () => {
  const [route, setRoute] = useState<DemoRoute>('home');

  const navigation = useMemo(
    () => ({
      navigate: (name: string) => {
        if (name === 'WellnessDashboardScreen') setRoute('wellness');
      },
      replace: (name: string) => {
        if (name === 'WellnessDashboardScreen') setRoute('wellness');
      },
      goBack: () => setRoute('home'),
      reset: () => setRoute('home'),
    }),
    [],
  );

  if (Platform.OS !== 'web') return null;

  return (
    <View style={{flex: 1}}>
      {route === 'wellness' ? (
        <WellnessDashboardScreen navigation={navigation} />
      ) : (
        <WebDemoHome navigation={navigation} />
      )}
    </View>
  );
};

export default WebDemoShell;
