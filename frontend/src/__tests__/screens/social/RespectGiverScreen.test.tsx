import React from 'react';
import { render } from '@testing-library/react-native';
import RespectGiverScreen from '../../../screens/social/RespectGiverScreen';

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcon');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

describe('RespectGiverScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<RespectGiverScreen navigation={{ goBack: jest.fn() }} />);
    expect(getByText('Respect Giver')).toBeTruthy();
  });
});
