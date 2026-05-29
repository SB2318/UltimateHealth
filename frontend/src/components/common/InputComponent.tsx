import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputProps,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {
  GlassStyles,
  ProfessionalColors,
  Typography,
  Spacing,
  BorderRadius,
} from '../../styles/GlassStyles';

// ─── Types ───────────────────────────────────────────────────────────────────

type InputVariant = 'text' | 'email' | 'password' | 'number' | 'phone' | 'search';
type ValidationState = 'default' | 'success' | 'error';

interface InputComponentProps extends TextInputProps {
  /** Input label shown above the field */
  label?: string;
  /** Validation state: default | success | error */
  validationState?: ValidationState;
  /** Error message shown below the field */
  errorMessage?: string;
  /** Success message shown below the field */
  successMessage?: string;
  /** Helper text shown below the field when no error/success */
  helperText?: string;
  /** Input type variant */
  variant?: InputVariant;
  /** Icon shown on the left side */
  leftIcon?: React.ReactNode;
  /** Icon shown on the right side */
  rightIcon?: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
  /** Input style override */
  inputStyle?: StyleProp<TextStyle>;
  /** Label style override */
  labelStyle?: StyleProp<TextStyle>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getKeyboardType = (variant: InputVariant): TextInputProps['keyboardType'] => {
  switch (variant) {
    case 'email': return 'email-address';
    case 'number': return 'numeric';
    case 'phone': return 'phone-pad';
    default: return 'default';
  }
};

const getBorderColor = (
  validationState: ValidationState,
  isFocused: boolean,
  isDarkMode: boolean
): string => {
  if (validationState === 'error') return ProfessionalColors.error;
  if (validationState === 'success') return ProfessionalColors.success;
  if (isFocused) return ProfessionalColors.primary;
  return isDarkMode
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.1)';
};

const getBackgroundColor = (
  validationState: ValidationState,
  isFocused: boolean,
  isDarkMode: boolean
): string => {
  if (validationState === 'error')
    return isDarkMode
      ? ProfessionalColors.errorGlass
      : 'rgba(239, 68, 68, 0.05)';
  if (validationState === 'success')
    return isDarkMode
      ? ProfessionalColors.successGlass
      : 'rgba(16, 185, 129, 0.05)';
  if (isFocused)
    return isDarkMode
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(255, 255, 255, 0.85)';
  return isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.7)';
};

// ─── Component ───────────────────────────────────────────────────────────────

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  validationState = 'default',
  errorMessage,
  successMessage,
  helperText,
  variant = 'text',
  leftIcon,
  rightIcon,
  required = false,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const isPassword = variant === 'password';

  const borderColor = getBorderColor(validationState, isFocused, isDarkMode);
  const backgroundColor = getBackgroundColor(validationState, isFocused, isDarkMode);
  const textColor = isDarkMode ? ProfessionalColors.white : ProfessionalColors.gray800;
  const labelColor = isDarkMode ? ProfessionalColors.gray300 : ProfessionalColors.gray700;

  const subText = validationState === 'error'
    ? errorMessage
    : validationState === 'success'
    ? successMessage
    : helperText;

  const subTextColor = validationState === 'error'
    ? ProfessionalColors.error
    : validationState === 'success'
    ? ProfessionalColors.success
    : isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500;

  return (
    <View style={[styles.wrapper, containerStyle]}>

      {/* Label */}
      {label && (
        <Text
          style={[
            Typography.bodySmall,
            styles.label,
            { color: labelColor },
            labelStyle,
          ]}
          accessibilityRole="text"
        >
          {label}
          {required && (
            <Text style={{ color: ProfessionalColors.error }}> *</Text>
          )}
        </Text>
      )}

      {/* Input Row */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor,
            borderWidth: isFocused || validationState !== 'default' ? 1.5 : 1,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <View style={styles.leftIcon} accessibilityElementsHidden>
            {leftIcon}
          </View>
        )}

        {/* Text Input */}
        <TextInput
          {...textInputProps}
          style={[
            Typography.body,
            styles.input,
            { color: textColor, flex: 1 },
            inputStyle,
          ]}
          keyboardType={getKeyboardType(variant)}
          secureTextEntry={isPassword && !isPasswordVisible}
          editable={!disabled}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          placeholderTextColor={
            isDarkMode ? ProfessionalColors.gray500 : ProfessionalColors.gray400
          }
          // ── Accessibility ──
          accessibilityLabel={label ?? textInputProps.placeholder}
          accessibilityHint={helperText}
          accessibilityState={{
            disabled,
            selected: isFocused,
          }}
          accessibilityInvalid={validationState === 'error'}
          autoCapitalize={variant === 'email' ? 'none' : textInputProps.autoCapitalize}
          autoCorrect={variant === 'email' || isPassword ? false : textInputProps.autoCorrect}
        />

        {/* Password toggle / Right Icon */}
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((v) => !v)}
            style={styles.rightIcon}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <Text style={{ color: ProfessionalColors.primary, fontSize: 13 }}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIcon} accessibilityElementsHidden>
            {rightIcon}
          </View>
        ) : null}
      </View>

      {/* Helper / Error / Success Text */}
      {subText && (
        <Text
          style={[Typography.caption, styles.subText, { color: subTextColor }]}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {validationState === 'error' ? '⚠ ' : validationState === 'success' ? '✓ ' : ''}
          {subText}
        </Text>
      )}
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  label: {
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  input: {
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  subText: {
    marginTop: Spacing.xs,
  },
});

export default InputComponent;