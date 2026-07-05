import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {PRIMARY_COLOR, BUTTON_COLOR, ON_PRIMARY_COLOR} from '../helper/Theme';

interface Props {
  visible: boolean;
  email: string;
  isLoading?: boolean;
  onResend: () => void;
  onClose: () => void;
}

/**
 * EmailVerificationModal
 *
 * Shown after registration to prompt the user to check their inbox.
 * Provides a "Resend email" action and a dismiss option.
 *
 * Distinct from VerifiedModal (components/VerifiedModal.tsx), which confirms
 * a successful verification. This modal is the *pending* state — the user has
 * registered but has not yet clicked the link in their inbox.
 */
const EmailVerificationModal: React.FC<Props> = ({
  visible,
  email,
  isLoading = false,
  onResend,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="email-check-outline"
              size={48}
              color={PRIMARY_COLOR}
            />
          </View>

          <Text style={styles.title}>Verify your email</Text>

          <Text style={styles.body}>
            We sent a verification link to{' '}
            <Text style={styles.email}>{email}</Text>. Open it to activate your
            account.
          </Text>

          <Text style={styles.hint}>
            Can't find it? Check your spam folder or tap below to resend.
          </Text>

          {/* Resend button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onResend}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel="Resend verification email">
            {isLoading ? (
              <ActivityIndicator color={ON_PRIMARY_COLOR} />
            ) : (
              <Text style={styles.primaryButtonText}>Resend email</Text>
            )}
          </TouchableOpacity>

          {/* Dismiss */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="I'll verify later">
            <Text style={styles.secondaryButtonText}>I'll do this later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmailVerificationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: ON_PRIMARY_COLOR,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  email: {
    fontWeight: '700',
    color: PRIMARY_COLOR,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 48,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: ON_PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: BUTTON_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
});