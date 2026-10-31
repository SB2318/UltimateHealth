import React from 'react';
import { render } from '@testing-library/react-native';
import OpenSourcePage from '../../../screens/legal/OpenSourcePage';

describe('OpenSourcePage', () => {
  it('renders without crashing', () => {
    render(<OpenSourcePage navigation={{ goBack: jest.fn() }} />);
  });
});
