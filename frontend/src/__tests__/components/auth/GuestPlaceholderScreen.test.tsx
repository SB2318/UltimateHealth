import React from 'react';
import { render } from '@testing-library/react-native';
import GuestPlaceholderScreen from '../../../components/auth/GuestPlaceholderScreen';

jest.mock('lottie-react-native', () => 'LottieView');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    canGoBack: jest.fn(() => true),
    goBack: jest.fn(),
  }),
}));

describe('GuestPlaceholderScreen', () => {
  it('renders default title and description', () => {
    const { getByText } = render(<GuestPlaceholderScreen />);
    expect(getByText('Sign In to Continue')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('renders route param title and description when passed', () => {
    const mockRoute = {
      params: {
        title: 'Sign In to Like',
        description: 'You must sign in to like this article.',
      },
    };
    const { getByText } = render(
      <GuestPlaceholderScreen route={mockRoute as any} />
    );
    expect(getByText('Sign In to Like')).toBeTruthy();
    expect(getByText('You must sign in to like this article.')).toBeTruthy();
  });
});
