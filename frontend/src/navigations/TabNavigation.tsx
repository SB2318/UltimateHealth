// @ts-nocheck
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PodcastsScreen from '../screens/PodcastsScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import {KeyboardAvoidingView, StyleSheet} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import TabBar from './TabBar';
import {TouchableOpacity} from 'react-native';
import {TabParamList} from '../type';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {BUTTON_COLOR} from '../helper/Theme';
import HeaderRightMenu from '../components/HeaderRightMenu';
import PersonaLobbyScreen from '../screens/PersonaLobbyScreen';
import AcademyStackNavigation from './AcademyStackNavigation';
import {useSelector} from 'react-redux';
import GuestPlaceholderScreen from '../components/GuestPlaceholderScreen';


const Tab = createBottomTabNavigator<TabParamList>();

const ChatbotGuestScreen = () => <GuestPlaceholderScreen title="AI Chatbot" description="Sign in or sign up to get instant health advice and personalized answers from our AI assistant." />;
const ProfileGuestScreen = () => <GuestPlaceholderScreen title="Your Profile" description="Create an account to manage your details and preferences." />;

const TabNavigation = () => {
  const isGuest = useSelector((state: any) => state.user.isGuest);
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
            backgroundColor: '#000A60',
          },
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
      <Tab.Screen
        name="Podcasts"
        component={PodcastsScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '🎧 Podcasts',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#000A60',
          },
          headerTitleStyle: {
            fontSize: 23,
            marginBottom: 12,
            color: 'white',
          },
          headerRight: () => (
            <HeaderRightMenu
              onClick={() => {
                (navigation as any).navigate('PodcastSearch');
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Chatbot"
        component={isGuest ? ChatbotGuestScreen : PersonaLobbyScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          title: 'Chatbot',
          headerShown: false,
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
        name="Settings"
        component={SettingsScreen}
        options={() => ({
          title: 'Settings',
          headerShown: false,
          headerStyle: { backgroundColor: '#000A60' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcon name="cog-outline" size={24} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Academy"
        component={AcademyStackNavigation}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#000A60',
          },
          headerTitleStyle: {
            fontSize: 23,
            marginBottom: 12,
            color: 'white',
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
