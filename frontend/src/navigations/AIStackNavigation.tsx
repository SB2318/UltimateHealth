import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PersonaLobbyScreen from '../screens/ai/PersonaLobbyScreen';
import ChatbotScreen from '../screens/ai/ChatbotScreen';

/**
 * Nested stack rendered inside the "Chatbot" (AI) bottom tab.
 * Keeps the whole AI experience (lobby -> chat) inside Tab navigation so the
 * bottom tab bar stays available and there is no duplicate stack header.
 */
export type AIStackParamList = {
  PersonaLobby: undefined;
  ChatbotScreen: {
    characterId: string;
    characterName?: string;
    characterAvatar?: string;
  };
};

const AIStack = createStackNavigator<AIStackParamList>();

const AIStackNavigation = () => (
  <AIStack.Navigator
    id={undefined as never}
    initialRouteName="PersonaLobby"
    screenOptions={{headerShown: false}}>
    <AIStack.Screen name="PersonaLobby" component={PersonaLobbyScreen as any} />
    <AIStack.Screen name="ChatbotScreen" component={ChatbotScreen as any} />
  </AIStack.Navigator>
);

export default AIStackNavigation;
