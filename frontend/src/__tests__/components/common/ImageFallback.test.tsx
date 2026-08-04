 
// @ts-nocheck
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ImageFallback } from '../../../components/common/ImageFallback';

describe('ImageFallback Component', () => {
  const fallbackSource = { uri: 'https://example.com/fallback.jpg' };
  const primarySource = { uri: 'https://example.com/primary.jpg' };

  it('renders primary image when source is valid', () => {
    const { getByTestId } = render(
      <ImageFallback source={primarySource} fallbackSource={fallbackSource} testID="test-image" />
    );
    const image = getByTestId('test-image');
    expect(image.props.source).toEqual(primarySource);
  });

  it('renders fallback image immediately if primary source uri is empty', () => {
    const { getByTestId } = render(
      <ImageFallback source={{ uri: '' }} fallbackSource={fallbackSource} testID="test-image" />
    );
    const image = getByTestId('test-image');
    // Because the URI is empty, it should instantly swap to fallback
    expect(image.props.source).toEqual(fallbackSource);
  });

  it('swaps to fallback image when onError is triggered', async () => {
    const { getByTestId } = render(
      <ImageFallback source={primarySource} fallbackSource={fallbackSource} testID="test-image" />
    );
    const image = getByTestId('test-image');
    
    fireEvent(image, 'onError');
    await waitFor(() => {
      expect(getByTestId('test-image').props.source).toEqual(fallbackSource);
    });
  });
});