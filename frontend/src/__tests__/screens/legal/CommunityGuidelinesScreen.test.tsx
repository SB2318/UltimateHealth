import React from 'react';
import { render } from '@testing-library/react-native';
import CommunityGuidelinesScreen from '../../../screens/legal/CommunityGuidelinesScreen';

describe('CommunityGuidelinesScreen', () => {
  it('renders without crashing', () => {
    const { getAllByText } = render(
      <CommunityGuidelinesScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() } as any} />
    );
    expect(getAllByText('Community Guidelines').length).toBeGreaterThan(0);
  });
});
