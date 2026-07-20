// CommentScreen.test.tsx
import React from 'react';
import {render} from '@testing-library/react-native';

// ── Tamagui mock ──────────────────────────────────────────────────────────────
jest.mock('tamagui', () => {
  const ReactLib = require('react');
  const RN = require('react-native');
  const stub = (name: string) => {
    const C = ({children, ...props}: any) =>
      ReactLib.createElement(RN.View, props, children);
    C.displayName = name;
    return C;
  };
  const TextStub = ({children, ...props}: any) =>
    ReactLib.createElement(RN.Text, props, children);
  return {
    H3: stub('H3'),
    Image: stub('Image'),
    Paragraph: TextStub,
    Text: TextStub,
    YStack: stub('YStack'),
    TextArea: stub('TextArea'),
    XStack: stub('XStack'),
    Button: stub('Button'),
    TamaguiProvider: stub('TamaguiProvider'),
    createTamagui: () => ({}),
    createTokens: (t: any) => t,
    styled: () => stub('styled'),
  };
});

// ── react-native-controlled-mentions mock ─────────────────────────────────────
jest.mock('react-native-controlled-mentions', () => ({
  parseValue: (text: string) => ({parts: [], plainText: text}),
  replaceTriggerValues: (text: string) => text,
  useMentions: () => ({textInputProps: {}, triggers: {}}),
  PatternsConfig: {},
  TriggersConfig: {},
  SuggestionsProvidedProps: {},
}));

// ── react-native-safe-area-context ────────────────────────────────────────────
jest.mock('react-native-safe-area-context', () => {
  const ReactLib = require('react');
  const RN = require('react-native');
  return {
    SafeAreaView: ({children}: any) =>
      ReactLib.createElement(RN.View, null, children),
    useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
  };
});

// ── Socket / room hooks ───────────────────────────────────────────────────────
jest.mock('../contexts/SocketContext', () => ({
  useSocket: () => ({emit: jest.fn(), on: jest.fn(), off: jest.fn()}),
}));

jest.mock('../hooks/useArticleRoom', () => ({
  useArticleRoom: jest.fn(),
}));

// ── Redux ─────────────────────────────────────────────────────────────────────
jest.mock('react-redux', () => ({
  useSelector: () => ({user_id: 'test-user-id'}),
  useDispatch: () => jest.fn(),
}));

// ── CommentItem ───────────────────────────────────────────────────────────────
jest.mock('../components/CommentItem', () => {
  const ReactLib = require('react');
  const RN = require('react-native');
  return function MockCommentItem() {
    return ReactLib.createElement(RN.View, null);
  };
});

// ── Loader ────────────────────────────────────────────────────────────────────
jest.mock('../components/Loader', () => {
  const ReactLib = require('react');
  const RN = require('react-native');
  return function MockLoader() {
    return ReactLib.createElement(RN.View, null);
  };
});

// ── Expo secure store ─────────────────────────────────────────────────────────
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

// ── Axios ─────────────────────────────────────────────────────────────────────
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: {data: []}})),
  post: jest.fn(() => Promise.resolve({data: {}})),
}));

// ── Import screen AFTER all mocks ─────────────────────────────────────────────
import CommentScreen from './CommentScreen';

// ─────────────────────────────────────────────────────────────────────────────

const baseRoute = (articleOverrides = {}) => ({
  params: {
    articleId: 123,
    mentionedUsers: [],
    article: {
      _id: '1',
      title: 'Test Article',
      description: 'Test description',
      pb_recordId: 'rec1',
      ...articleOverrides,
    },
  },
});

const navigation = {navigate: jest.fn()};

describe('CommentScreen - edge case guards', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders without crashing when imageUtils is missing', () => {
    const route = baseRoute({imageUtils: undefined});
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('renders without crashing when imageUtils is an empty array', () => {
    const route = baseRoute({imageUtils: []});
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('renders without crashing when authorId is missing', () => {
    const route = baseRoute({authorId: undefined, imageUtils: ['img.jpg']});
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('renders correctly when article has valid imageUtils and authorId', () => {
    const route = baseRoute({
      imageUtils: ['https://example.com/img.jpg'],
      authorId: 'author123',
    });
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });
});
