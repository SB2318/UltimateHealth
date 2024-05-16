import React from 'react';

import {View, Pressable, Dimensions, StyleSheet, useColorScheme} from 'react-native';
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '../Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TabBar = ({state, descriptors, navigation}: any) => {
    const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.mainContainer,{backgroundColor:isDarkMode?"black":"white"}]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {borderRightWidth: label == 'notes' ? 3 : 0, },
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? PRIMARY_COLOR : isDarkMode ? "black":"white",
                borderRadius: 50,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                }}>
                {label === 'Home' && (
                  <Ionicons
                    name="home"
                    size={34}
                    color={isFocused ? 'white' : isDarkMode?"white":"black"}
                  />
                )}
                {label === 'Podcasts' && (
                  <FontAwesome
                    name="podcast"
                    size={34}
                    color={isFocused ? 'white' : isDarkMode?"white":"black"}
                  />
                )}
                {label === 'Profile' && (
                  <FontAwesome
                    name="user-circle"
                    size={34}
                    color={isFocused ? 'white' : isDarkMode?"white":"black"}
                  />
                )}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    borderRadius: 25,
    marginHorizontal: width * 0.1,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBar;
