import React from 'react';
import { Animated } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { BackToTopButton } from '../../../components/common/BackToTopButton';

describe('BackToTopButton Component', () => {
  it('renders nothing when visible is false', () => {
    const opacity = new Animated.Value(0);
    const { queryByLabelText } = render(
      <BackToTopButton
        opacity={opacity}
        onPress={jest.fn()}
        visible={false}
      />
    );
    expect(queryByLabelText('Back to top')).toBeNull();
  });

  it('renders correctly when visible is true', () => {
    const opacity = new Animated.Value(1);
    const { getByLabelText } = render(
      <BackToTopButton
        opacity={opacity}
        onPress={jest.fn()}
        visible={true}
      />
    );
    expect(getByLabelText('Back to top')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const opacity = new Animated.Value(1);
    const { getByLabelText } = render(
      <BackToTopButton
        opacity={opacity}
        onPress={onPressMock}
        visible={true}
      />
    );

    fireEvent.press(getByLabelText('Back to top'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
