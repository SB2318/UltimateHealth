import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface EmailVerificationModalProps {
  visible: boolean;
  onResendEmail: () => void;
  onClose: () => void;
  email?: string;
  loading?: boolean;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  visible,
  onResendEmail,
  onClose,
  email,
  loading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.icon}>📧</Text>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.message}>
            {email
              ? `A verification link has been sent to ${email}. Please check your inbox and click the link to activate your account.`
              : 'A verification link has been sent to your registered email. Please check your inbox and click the link to activate your account.'}
          </Text>
          <Text style={styles.info}>
            Didn't receive the email? Check your spam folder or resend.
          </Text>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onResendEmail}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Resend Verification Email</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.skipButton}>
            <Text style={styles.skipText}>I'll do it later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  info: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 14,
  },
  skipText: {
    color: '#999',
    fontSize: 14,
  },
});

export default EmailVerificationModal;
