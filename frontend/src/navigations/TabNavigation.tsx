 
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import PodcastsScreen from '../screens/podcast/PodcastsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
// import {KeyboardAvoidingView, StyleSheet} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import TabBar from './TabBar';
import {TouchableOpacity} from 'react-native';
import {TabParamList} from '../schemas/type';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
<<<<<<< HEAD
import {BUTTON_COLOR} from '../helper/Theme';
import HeaderRightMenu from '../components/HeaderRightMenu';
import PersonaLobbyScreen from '../screens/PersonaLobbyScreen';
import AboutScreen from '../screens/AboutPage';
import {useAppSelector} from '../store/hooks';
import GuestPlaceholderScreen from '../components/GuestPlaceholderScreen';
import WellnessDashboardScreen from '../screens/WellnessDashboardScreen';
=======
import {BUTTON_COLOR} from '../lib/ui/Theme';
import HeaderRightMenu from '../components/common/HeaderRightMenu';
import PersonaLobbyScreen from '../screens/ai/PersonaLobbyScreen';
import AcademyStackNavigation from './AcademyStackNavigation';
import {useSelector} from 'react-redux';
import GuestPlaceholderScreen from '../components/auth/GuestPlaceholderScreen';
import WellnessDashboardScreen from '../screens/wellness/WellnessDashboardScreen';
>>>>>>> upstream/main


const Tab = createBottomTabNavigator<TabParamList>();

const ChatbotGuestScreen = () => <GuestPlaceholderScreen title="AI Chatbot" description="Sign in or sign up to get instant health advice and personalized answers from our AI assistant." />;
const SettingsGuestScreen = () => <GuestPlaceholderScreen title="Settings" description="Create an account to access settings and manage your preferences." />;

const TabNavigation = () => {
  const isGuest = useAppSelector((state: any) => state.user.isGuest);
  return (
    <Tab.Navigator
      id={undefined as never}
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
        component={isGuest ? SettingsGuestScreen : SettingsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Academy"
        component={AcademyStackNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
