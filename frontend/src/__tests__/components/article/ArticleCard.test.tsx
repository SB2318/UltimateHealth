import React from 'react';
import {render} from '@testing-library/react-native';
import ArticleCard from '../../../components/article/ArticleCard';

const mockNavigate = jest.fn();

jest.mock('@expo/vector-icons/AntDesign', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name, color}: any) =>
    React.createElement(Text, null, `${name}:${color ?? 'none'}`);
  MockIcon.displayName = 'AntDesign';
  return MockIcon;
});

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name, color}: any) =>
    React.createElement(Text, null, `${name}:${color ?? 'none'}`);
  MockIcon.displayName = 'Ionicons';
  return MockIcon;
});

jest.mock('@expo/vector-icons/Entypo', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockIcon = ({name, color}: any) =>
    React.createElement(Text, null, `${name}:${color ?? 'none'}`);
  MockIcon.displayName = 'Entypo';
  return MockIcon;
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  const MockFontAwesome = ({name, color}: any) =>
    React.createElement(Text, null, `${name}:${color ?? 'none'}`);
  const MockFontAwesome6 = ({name, color}: any) =>
    React.createElement(Text, null, `${name}:${color ?? 'none'}`);
  MockFontAwesome.displayName = 'FontAwesome';
  MockFontAwesome6.displayName = 'FontAwesome6';
  return {
    FontAwesome: MockFontAwesome,
    FontAwesome6: MockFontAwesome6,
  };
});

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
}));

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-html-to-pdf', () => ({
  generatePDF: jest.fn(),
}));

jest.mock('../../../store/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('../../../contexts/SocketContext', () => ({
  useSocket: jest.fn(() => null),
}));

jest.mock('../../../hooks/profile/useGetProfile', () => ({
  useGetProfile: () => ({data: null}),
}));

jest.mock('../../../hooks/article/useLikeArticle', () => ({
  useLikeArticle: jest.fn(() => ({mutate: jest.fn(), isPending: false})),
}));

jest.mock('../../../hooks/article/useSaveArticle', () => ({
  useSaveArticle: jest.fn(() => ({mutate: jest.fn(), isPending: false})),
}));

jest.mock('../../../hooks/article/useArticleRepost', () => ({
  useRepostArticle: jest.fn(() => ({mutate: jest.fn(), isPending: false})),
}));

jest.mock('../../../hooks/article/useLazyGetArticleContent', () => ({
  useLazyGetArticleContent: jest.fn(() => ({mutate: jest.fn(), isPending: false})),
}));

jest.mock('../../../hooks/common/useDoubleTap', () => ({
  useDoubleTap: (onSingleTap: any) => onSingleTap,
}));

jest.mock('../../../lib/utils/Utils', () => ({
  formatCount: (value: number) => String(value),
  requestStoragePermissions: jest.fn(),
  StatusEnum: {PUBLISHED: 'PUBLISHED'},
}));

jest.mock('../../../lib/utils/shareUtils', () => ({
  generateArticleShareUrl: jest.fn(),
  copyArticleShareLink: jest.fn(),
}));

jest.mock('../../../lib/utils/dateUtils', () => ({
  formatDateShort: jest.fn(() => 'Jan 1'),
}));

jest.mock('../../../lib/utils/readTime', () => ({
  getReadTime: jest.fn(() => '5 min read'),
  calculateReadTime: jest.fn(() => 5),
}));

jest.mock('../../../lib/ui/Metric', () => ({
  fp: (value: number) => value,
}));

jest.mock('../../../lib/ui/Theme', () => ({
  PRIMARY_COLOR: '#00BFFF',
  ON_PRIMARY_COLOR: '#F0F8FF',
}));

jest.mock('../../../lib/api/APIUtils', () => ({
  GET_IMAGE: 'https://example.com',
}));

jest.mock('../../../components/article/ArticleFloatingMenu', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockMenu = () => React.createElement(View, {testID: 'article-floating-menu'});
  MockMenu.displayName = 'ArticleFloatingMenu';
  return MockMenu;
});

jest.mock('../../../components/article/EditRequestModal', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MockModal = () => React.createElement(View, {testID: 'edit-request-modal'});
  MockModal.displayName = 'EditRequestModal';
  return MockModal;
});

jest.mock('../../../assets/images/article_default.jpg', () => 1, {
  virtual: true,
});

const baseItem = {
  _id: 'article-1',
  title: 'Test Article',
  authorName: 'Author Name',
  description: 'A description',
  authorId: 'author-1',
  content: '',
  summary: '',
  tags: [],
  lastUpdated: '2026-01-01T00:00:00.000Z',
  imageUtils: [],
  viewCount: 10,
  viewUsers: [],
  repostUsers: [],
  likeCount: 0,
  likedUsers: [],
  trustUsers: [],
  savedUsers: [],
  mentionedUsers: [],
  language: 'en',
  assigned_date: null,
  discardReason: '',
  status: 'PUBLISHED',
  reviewer_id: null,
  contributors: [],
  pb_recordId: 'pb-1',
};

const mockuseAppSelector = require('../../../store/hooks').useAppSelector as jest.Mock;

const mockState = {
  user: {user_id: 'user-1', user_handle: 'user-1', isGuest: false},
  network: {isConnected: true},
};

const renderCard = (item: any) =>
  render(
    <ArticleCard
      item={item}
      navigation={{navigate: mockNavigate} as any}
      success={() => {}}
      isSelected={false}
      setSelectedCardId={jest.fn()}
      handleRepostAction={jest.fn()}
      handleReportAction={jest.fn()}
      handleEditRequestAction={jest.fn()}
      source="home"
    />,
  );

const renderCardWithProps = (item: any) => ({
  item,
  navigation: {navigate: mockNavigate} as any,
  success: () => {},
  isSelected: false,
  setSelectedCardId: jest.fn(),
  handleRepostAction: jest.fn(),
  handleReportAction: jest.fn(),
  handleEditRequestAction: jest.fn(),
  source: 'home',
});

describe('ArticleCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockuseAppSelector.mockImplementation((selector: any) => selector(mockState));
  });

  it('renders the article title', () => {
    const {getByText} = renderCard(baseItem);

    expect(getByText('Test Article')).toBeTruthy();
  });

  it('syncs like, save, and repost state when the item prop updates', () => {
    const {getAllByText, queryAllByText, rerender} = renderCard(baseItem);

    expect(getAllByText(/^heart-o:/).length).toBeGreaterThan(0);
    expect(queryAllByText(/^heart:#00BFFF/).length).toBe(0);
    expect(queryAllByText(/^bookmark:#00BFFF/).length).toBe(0);

    const updated = {
      ...baseItem,
      likedUsers: [{_id: 'user-1', id: 1, name: 'User One'}],
      savedUsers: ['user-1'],
      repostUsers: ['user-1'],
    };

    rerender(<ArticleCard {...renderCardWithProps(updated)} />);

    expect(getAllByText(/^heart:#00BFFF/).length).toBeGreaterThan(0);
    expect(queryAllByText(/^heart-o:/).length).toBe(0);
    expect(getAllByText(/^bookmark:#00BFFF/).length).toBeGreaterThan(0);
    expect(getAllByText(/^arrows-rotate:#00BFFF/).length).toBeGreaterThan(0);
  });

  it('updates the like count when the item prop changes', () => {
    const {getAllByText, getByText, rerender} = renderCard(baseItem);

    expect(getAllByText('0').length).toBe(2);

    const updated = {
      ...baseItem,
      likedUsers: [
        {_id: 'user-1', id: 1, name: 'User One'},
        {_id: 'user-2', id: 2, name: 'User Two'},
      ],
    };

    rerender(<ArticleCard {...renderCardWithProps(updated)} />);

    expect(getByText('2')).toBeTruthy();
    expect(getAllByText('0').length).toBe(1);
  });

  it('resets engagement state when the item is replaced with a different article', () => {
    const likedItem = {
      ...baseItem,
      likedUsers: [{_id: 'user-1', id: 1, name: 'User One'}],
      savedUsers: ['user-1'],
    };

    const {getAllByText, queryAllByText, rerender} = renderCard(likedItem);

    expect(getAllByText(/^heart:#00BFFF/).length).toBeGreaterThan(0);
    expect(getAllByText(/^bookmark:#00BFFF/).length).toBeGreaterThan(0);

    const otherItem = {
      ...baseItem,
      _id: 'article-2',
      likedUsers: [],
      savedUsers: [],
    };

    rerender(<ArticleCard {...renderCardWithProps(otherItem)} />);

    expect(queryAllByText(/^heart:#00BFFF/).length).toBe(0);
    expect(queryAllByText(/^bookmark:#00BFFF/).length).toBe(0);
    expect(getAllByText(/^heart-o:/).length).toBeGreaterThan(0);
  });
});
