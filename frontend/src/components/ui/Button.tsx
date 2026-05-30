import React from 'react';
import {
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  fullWidth?: boolean;
  testID?: string;
}

const variantStyles: Record<ButtonVariant, { button: ViewStyle; text: TextStyle; spinnerColor: string }> = {
  primary: {
    button: {
      backgroundColor: '#00BFFF',
      borderWidth: 1,
      borderColor: '#00BFFF',
    },
    text: {
      color: '#FFFFFF',
      fontWeight: '600' as const,
    },
    spinnerColor: '#FFFFFF',
  },
  secondary: {
    button: {
      backgroundColor: '#0F52BA',
      borderWidth: 1,
      borderColor: '#0F52BA',
    },
    text: {
      color: '#FFFFFF',
      fontWeight: '600' as const,
    },
    spinnerColor: '#FFFFFF',
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: '#00BFFF',
    },
    text: {
      color: '#00BFFF',
      fontWeight: '600' as const,
    },
    spinnerColor: '#00BFFF',
  },
  ghost: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
    },
    text: {
      color: '#00BFFF',
      fontWeight: '600' as const,
    },
    spinnerColor: '#00BFFF',
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  md: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onPress,
  type,
  disabled = false,
  isLoading = false,
  children,
  style,
  textStyle,
  accessibilityLabel,
  fullWidth = false,
  testID,
}) => {
  const isDisabled = disabled || isLoading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const textSizeStyle = textSizeStyles[size];

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
      aria-disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.button,
        sizeStyle,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variantStyle.spinnerColor}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variantStyle.text,
            textSizeStyle,
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});
