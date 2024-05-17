import React from 'react';

import {
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '../Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TabBar = ({state, descriptors, navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
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
              {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused
                  ? PRIMARY_COLOR
                  : isDarkMode
                  ? 'black'
                  : 'white',
                borderRadius: 50,
                width: 40,
                height:40,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  //   padding: 10,
                }}>
                {label === 'Home' && (
                  <Ionicons
                    name="home"
                    size={24}
                    color={isFocused ? 'white' : isDarkMode ? 'white' : 'black'}
                  />
                )}
                {label === 'Podcasts' && (
                  <FontAwesome
                    name="podcast"
                    size={24}
                    color={isFocused ? 'white' : isDarkMode ? 'white' : 'black'}
                  />
                )}
                {label === 'Profile' && (
                  //   <FontAwesome
                  //     name="user-circle"
                  //     size={24}
                  //     color={isFocused ? 'white' : isDarkMode?"white":"black"}
                  //   />
                  <Image
                    style={{
                      height: 34,
                      width: 34,
                      borderRadius: 50,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1715558400&semt=ais_user',
                    }}
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
    bottom: 0,
    // borderRadius: 25,
    paddingBottom: 20,
    // marginHorizontal: width * 0.05,
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
