import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import LogoutScreen from '../auth/LogoutScreen';

const mockDispatch = jest.fn();
const mockReset = jest.fn();
const mockClearQueryCache = jest.fn();
const mockClearStorage = jest.fn(() => Promise.resolve());
const mockLogout = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    clear: mockClearQueryCache,
  }),
}));

jest.mock('../../hooks/useUserLogout', () => ({
  useUserLogout: () => ({
    mutate: mockLogout,
  }),
}));

jest.mock('../../helper/Utils', () => ({
  clearStorage: () => mockClearStorage(),
}));

jest.mock('../../store/UserSlice', () => ({
  resetUserState: () => ({type: 'user/resetUserState'}),
}));

jest.mock('../../helper/APIUtils', () => ({
  GET_STORAGE_DATA: 'https://storage.example.com',
}));

jest.mock('../../helper/Theme', () => ({
  PRIMARY_COLOR: '#000A60',
}));

jest.mock('tamagui', () => ({
  useTheme: () => ({
    background: {val: '#ffffff'},
    black: {val: '#000000'},
    color: {val: '#000000'},
    gray500: {val: '#666666'},
    white: {val: '#ffffff'},
  }),
}));

describe('LogoutScreen query cache cleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogout.mockImplementation((_variables, options) => {
      void options.onSuccess();
    });
  });

  it('clears cached user queries after successful logout', async () => {
    const {getByText} = render(
      <LogoutScreen
        navigation={{reset: mockReset, goBack: jest.fn()} as any}
        route={{
          params: {profile_image: '', username: 'Test User'},
        } as any}
      />,
    );

    fireEvent.press(getByText('Yes, log me out'));

    await waitFor(() => {
      expect(mockClearStorage).toHaveBeenCalledTimes(1);
      expect(mockClearQueryCache).toHaveBeenCalledTimes(1);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'user/resetUserState',
    });
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  });
});
