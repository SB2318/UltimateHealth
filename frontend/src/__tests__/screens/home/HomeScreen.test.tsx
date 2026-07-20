 
// @ts-nocheck
import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../../../screens/home/HomeScreen';

const mockNavigate = jest.fn();
const mockReset = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
}));

jest.mock('../../components/ArticleCard', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockArticleCard = () => React.createElement(View, {testID: 'ArticleCard'});
  return MockArticleCard;
});

const mockSelector = jest.fn();
const mockDispatch = jest.fn((action) => {
  if (action && action.payload && action.payload.selectedTags) {
    mockState.data.selectedTags = action.payload.selectedTags;
  }
});
jest.mock('react-redux', () => ({
  useSelector: (selectorFn: any) => mockSelector(selectorFn),
  useDispatch: () => mockDispatch,
}));

let mockState = {
  network: { isConnected: true },
  data: {
    filteredArticles: [],
    searchedArticles: [],
    searchMode: false,
    selectedTags: [{ _id: '1', id: 1, name: 'General' }],
    sortType: '',
  },
  user: {
    user_token: 'mock-token',
    isGuest: false,
  },
};

const mockRefetchUser = jest.fn();
const mockRefetchUnreadCount = jest.fn();
const mockRefetchArticles = jest.fn();

jest.mock('../../hooks/useGetProfile', () => ({
  useGetProfile: () => ({
    data: { isBlockUser: false, isBannedUser: false },
    refetch: mockRefetchUser,
  }),
}));

const mockCategoriesData = [{ _id: '1', id: 1, name: 'General' }];
jest.mock('../../hooks/useGetArticleTags', () => ({
  useGetCategories: () => ({
    data: mockCategoriesData,
    isSuccess: true,
  }),
}));

jest.mock('../../hooks/useRequestArticleEdit', () => ({
  useRequestArticleEdit: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('../../hooks/useGetUnreadNotificationCount', () => ({
  useGetUnreadNotificationCount: () => ({
    data: 0,
    refetch: mockRefetchUnreadCount,
  }),
}));

const mockArticlesQuery = {
  data: { articles: [], totalPages: 1 },
  isLoading: false,
  isFetching: false,
  isError: false,
  refetch: mockRefetchArticles,
};

jest.mock('../../hooks/useGetPaginatedArticles', () => ({
  useGetPaginatedArticle: () => mockArticlesQuery,
}));

jest.mock('../../contexts/PreferencesContext', () => ({
  usePreferences: () => ({
    preferredLanguages: ['en-IN'],
    isLoading: false,
  }),
}));

jest.mock('../../components/EmptyStates', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const OfflineArticleState = () => React.createElement(Text, null, 'OfflineArticleState');
  const NoArticleState = () => React.createElement(Text, null, 'NoArticleState');
  const BaseEmptyState = ({loading}: any) =>
    React.createElement(Text, null, loading ? 'LoadingState' : 'BaseEmptyState');

  return {
    OfflineArticleState,
    NoArticleState,
    BaseEmptyState,
  };
});

jest.mock('../../components/HomeScreenHeader', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockHomeScreenHeader = () =>
    React.createElement(View, {testID: 'HomeScreenHeader'});
  return MockHomeScreenHeader;
});

jest.mock('../../components/FilterModal', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockFilterModal = () => React.createElement(View);
  return MockFilterModal;
});

describe('HomeScreen - Early Return and State Rendering Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelector.mockImplementation((selectorFn) => selectorFn(mockState));
    
    // Reset query mock defaults
    mockArticlesQuery.data = { articles: [], totalPages: 1 };
    mockArticlesQuery.isLoading = false;
    mockArticlesQuery.isFetching = false;
    mockArticlesQuery.isError = false;
    mockState.network.isConnected = true;
  });

  const renderScreen = () =>
    render(
      <HomeScreen
        navigation={{navigate: mockNavigate, reset: mockReset} as any}
        route={{} as any}
      />,
    );

  it('renders OfflineArticleState when there is no internet connection', () => {
    mockState.network.isConnected = false;

    const {getByText} = renderScreen();

    expect(getByText('OfflineArticleState')).toBeTruthy();
  });

  it('renders NoArticleState (ErrorState) when there is an API error', () => {
    mockArticlesQuery.isError = true;

    const {getByText} = renderScreen();

    expect(getByText('NoArticleState')).toBeTruthy();
  });

  it('renders LoadingState when loading is active, regardless of article empty status (Infinite Loop Fix)', () => {
    mockArticlesQuery.isLoading = true;
    // article list is empty/null which previously would trigger empty return early
    mockArticlesQuery.data = { articles: [], totalPages: 1 };

    const {getByText} = renderScreen();

    // Verify it returns LoadingState first instead of falling through to empty state
    expect(getByText('LoadingState')).toBeTruthy();
  });

  it('renders EmptyArticleState (NoArticleState) when loading has completed and no articles exist', () => {
    mockArticlesQuery.isLoading = false;
    mockArticlesQuery.data = { articles: [], totalPages: 1 };

    const {getByText} = renderScreen();

    expect(getByText('NoArticleState')).toBeTruthy();
  });
});
