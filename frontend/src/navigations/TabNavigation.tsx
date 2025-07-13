import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PodcastsScreen from '../screens/PodcastsScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TabBar from './TabBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TabParamList} from '../type';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BotScreen from '../screens/BotScreen';
import {BUTTON_COLOR} from '../helper/Theme';
import HeaderRightMenu from '../components/HeaderRightMenu';

const Tab = createBottomTabNavigator<TabParamList>();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.darker,
          },
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
     <Tab.Screen
  name="Podcasts"
  component={PodcastsScreen}
  options={({ navigation }) => ({
    headerShown: true,
    headerTitle: '🎧 Podcasts',
    headerTransparent: true,
    headerTitleStyle: {
      fontSize: 23,
      marginBottom: 12,
    },
    headerRight: () => (
      <HeaderRightMenu onClick={()=>{
        navigation.navigate('PodcastSearch');
      }} />
    ),
  })}
/>

      <Tab.Screen
        name="Chatbot"
        component={BotScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          title: 'Chatbot',
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: BUTTON_COLOR,
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
          tabBarHideOnKeyboard: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 15,
                height: 35,
                width: 35,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome6 size={20} name="arrow-left" color="black" />
            </TouchableOpacity>
          ),

        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
