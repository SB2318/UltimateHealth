import React from 'react';
import {render} from '@testing-library/react-native';
import ArticleSkeletonCard from '../../../components/article/ArticleSkeletonCard';

describe('ArticleSkeletonCard', () => {
  it('renders without crashing and is hidden from assistive tech', () => {
    const {getByTestId} = render(<ArticleSkeletonCard />);

    const card = getByTestId('article-skeleton-card', {
      includeHiddenElements: true,
    });

    expect(card).toBeTruthy();
    expect(card.props.accessibilityElementsHidden).toBe(true);
    expect(card.props.importantForAccessibility).toBe('no-hide-descendants');
  });

  it('renders multiple independent instances (as used in loading lists)', () => {
    const {getAllByTestId} = render(
      <>
        <ArticleSkeletonCard />
        <ArticleSkeletonCard />
        <ArticleSkeletonCard />
      </>,
    );

    expect(
      getAllByTestId('article-skeleton-card', {includeHiddenElements: true}),
    ).toHaveLength(3);
  });
});