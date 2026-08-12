import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useGoogleLoginMutation, GoogleLoginReq } from '../../hooks/auth/useGoogleLogin';
import { LoginResponse } from '../../hooks/auth/useUserLogin';

export interface GoogleSignInButtonProps {
  onSuccess: (data: LoginResponse) => void;
  onError?: (error: any) => void;
  idTokenSupplier?: () => Promise<string>;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  label?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  idTokenSupplier,
  disabled = false,
  style,
  textStyle,
  label = 'Continue with Google',
}) => {
  const googleLoginMutation = useGoogleLoginMutation();

  const handlePress = async () => {
    if (disabled || googleLoginMutation.isPending) return;

    try {
      let idToken = '';
      if (idTokenSupplier) {
        idToken = await idTokenSupplier();
      }

      if (!idToken) {
        throw new Error('Google ID token is required.');
      }

      const result = await googleLoginMutation.mutateAsync({ idToken });
      onSuccess(result);
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || googleLoginMutation.isPending}
      style={[
        styles.button,
        (disabled || googleLoginMutation.isPending) && styles.disabledButton,
        style,
      ]}
      testID="google-sign-in-button"
    >
      {googleLoginMutation.isPending ? (
        <ActivityIndicator size="small" color="#4285F4" testID="google-signin-spinner" />
      ) : (
        <Text style={[styles.text, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: '#3C4043',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GoogleSignInButton;
