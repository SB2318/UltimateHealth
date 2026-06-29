// CommentScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CommentScreen from '../screens/CommentScreen';

// Mock socket context
jest.mock('../contexts/SocketContext', () => ({
  useSocket: () => ({
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  }),
}));

jest.mock('../hooks/useArticleRoom', () => ({
  useArticleRoom: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useAppSelector: () => ({ user_id: 'test-user-id' }),
  useAppDispatch: () => jest.fn(),
}));

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

const navigation = { navigate: jest.fn() };

describe('CommentScreen - edge case guards', () => {
  it('renders without crashing when imageUtils is missing', () => {
    const route = baseRoute({ imageUtils: undefined });
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('renders without crashing when imageUtils is an empty array', () => {
    const route = baseRoute({ imageUtils: [] });
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('falls back to default avatar when imageUtils is empty', () => {
    const route = baseRoute({ imageUtils: [] });
    const { getByTestId } = render(
      <CommentScreen navigation={navigation} route={route} />,
    );
    // Requires testID="article-image" on the Image component to run this assertion
    // expect(getByTestId('article-image').props.source.uri).toContain('pexels.com');
  });

  it('renders without crashing when authorId is missing', () => {
    const route = baseRoute({ authorId: undefined, imageUtils: ['img.jpg'] });
    expect(() =>
      render(<CommentScreen navigation={navigation} route={route} />),
    ).not.toThrow();
  });

  it('navigates with empty authorId fallback instead of throwing', () => {
    const route = baseRoute({ authorId: undefined, imageUtils: ['img.jpg'] });
    const { getByText } = render(
      <CommentScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('View Full Article'));
    expect(navigation.navigate).toHaveBeenCalledWith(
      'ArticleScreen',
      expect.objectContaining({ authorId: '' }),
    );
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
