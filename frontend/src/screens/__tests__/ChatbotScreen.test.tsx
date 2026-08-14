import React from 'react';
import {render} from '@testing-library/react-native';
import ChatbotScreen from '../ChatbotScreen';

const mockNavigate = jest.fn();
const mockMutate = jest.fn();
let mockIsPending = false;

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name}: {name: string}) =>
    React.createElement(Text, null, name);
  MockIcon.displayName = 'Ionicons';
  return MockIcon;
});

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name}: {name: string}) =>
    React.createElement(Text, null, name);
  MockIcon.displayName = 'MaterialCommunityIcons';
  return MockIcon;
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockSafeAreaView = ({children, ...props}: any) =>
    React.createElement(View, props, children);
  MockSafeAreaView.displayName = 'SafeAreaView';
  return {SafeAreaView: MockSafeAreaView};
});

jest.mock('react-native-gifted-chat', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockComponent = ({children, ...props}: any) =>
    React.createElement(View, props, children);
  MockComponent.displayName = 'GiftedChat';
  return {
    GiftedChat: MockComponent,
    Bubble: MockComponent,
    InputToolbar: MockComponent,
    Send: MockComponent,
  };
});

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 0,
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('../../helper/Theme', () => ({
  PRIMARY_COLOR: '#4ACDFF',
}));

jest.mock('../../helper/APIUtils', () => ({
  GET_STORAGE_DATA: 'https://example.com',
}));

jest.mock('../../helper/Metric', () => ({
  hp: (value: number) => value,
}));

jest.mock('../../hooks/useGetProfile', () => ({
  useGetProfile: jest.fn(),
}));

jest.mock('../../hooks/useSendMessageToGemini', () => ({
  useSendMessageToGemini: jest.fn(),
}));

jest.mock('../../hooks/useLoadAIChats', () => ({
  useLoadAIConversations: jest.fn(),
}));

const mockUseSelector = require('react-redux').useSelector as jest.Mock;
const mockUseGetProfile =
  require('../../hooks/useGetProfile').useGetProfile as jest.Mock;
const mockUseSendMessageToGemini =
  require('../../hooks/useSendMessageToGemini')
    .useSendMessageToGemini as jest.Mock;
const mockUseLoadAIConversations =
  require('../../hooks/useLoadAIChats').useLoadAIConversations as jest.Mock;

describe('ChatbotScreen typing indicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsPending = false;
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        user: {
          user_token: 'token',
          user_id: 'user-1',
        },
        network: {
          isConnected: true,
        },
      }),
    );
    mockUseGetProfile.mockReturnValue({data: null});
    mockUseSendMessageToGemini.mockReturnValue({
      mutate: mockMutate,
      isPending: mockIsPending,
    });
    mockUseLoadAIConversations.mockReturnValue({
      data: null,
      isLoading: false,
    });
  });

  it('does not show typing indicator on initial screen load', () => {
    const {queryByText} = render(
      <ChatbotScreen navigation={{goBack: mockNavigate} as any} />,
    );

    expect(queryByText('typing...')).toBeNull();
  });

  it('shows typing indicator only while a response is being generated', () => {
    mockIsPending = true;
    mockUseSendMessageToGemini.mockReturnValue({
      mutate: mockMutate,
      isPending: mockIsPending,
    });
    const {queryByText, rerender} = render(
      <ChatbotScreen navigation={{goBack: mockNavigate} as any} />,
    );

    expect(queryByText('typing...')).toBeTruthy();

    mockIsPending = false;
    mockUseSendMessageToGemini.mockReturnValue({
      mutate: mockMutate,
      isPending: mockIsPending,
    });
    rerender(<ChatbotScreen navigation={{goBack: mockNavigate} as any} />);

    expect(queryByText('typing...')).toBeNull();
  });
});
