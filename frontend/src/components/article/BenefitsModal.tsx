/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BUTTON_COLOR } from '../../lib/ui/Theme';

interface BenefitsModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSignUp: () => void;
}

const benefits = [
  {
    title: 'Engage with Articles',
    description: 'Post, Like & Comment on health articles',
    icon: 'edit-3' as const,
  },
  {
    title: 'Podcast Community',
    description: 'Join exclusive medical & wellness podcast discussions',
    icon: 'headphones' as const,
  },
  {
    title: 'Personalized Library',
    description: 'Save bookmarks & track your reading history',
    icon: 'bookmark' as const,
  },
  {
    title: 'Doctor Network & Streaks',
    description: 'Connect with verified physicians & health specialists',
    icon: 'award' as const,
  },
];

export default function BenefitsModal({
  visible,
  onDismiss,
  onSignUp,
}: BenefitsModalProps) {
  const isDark = useColorScheme() === 'dark';

  const colors = {
    modalBg: isDark ? '#1E293B' : '#FFFFFF',
    overlayBg: 'rgba(0, 0, 0, 0.55)',
    cardBg: isDark ? '#111827' : '#F8FAFC',
    border: isDark ? '#334155' : '#E2E8F0',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    starCircleBg: isDark ? '#111827' : '#EFF6FF',
    handle: isDark ? '#4B5563' : '#CBD5E1',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={[styles.overlay, { backgroundColor: colors.overlayBg }]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.sheetFrame,
                {
                  backgroundColor: colors.modalBg,
                  borderColor: colors.border,
                },
              ]}>
              {/* Handle */}
              <View style={[styles.handle, { backgroundColor: colors.handle }]} />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}>
                {/* Header Star Icon */}
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.starCircleBg },
                  ]}>
                  <Feather name="star" size={28} color={BUTTON_COLOR} />
                </View>

                <Text style={[styles.title, { color: colors.textPrimary }]}>
                  Why Join UltimateHealth?
                </Text>

                <Text
                  style={[styles.subtitle, { color: colors.textSecondary }]}>
                  Create a free account to unlock personalized wellness insights,
                  participate in discussions, and connect with healthcare leaders.
                </Text>

                {/* Benefits List */}
                <View style={styles.benefitsList}>
                  {benefits.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.benefitCard,
                        {
                          backgroundColor: colors.cardBg,
                          borderColor: colors.border,
                        },
                      ]}>
                      <View
                        style={[
                          styles.benefitIconBox,
                          { backgroundColor: colors.starCircleBg },
                        ]}>
                        <Feather
                          name={item.icon}
                          size={20}
                          color={BUTTON_COLOR}
                        />
                      </View>
                      <View style={styles.benefitTextGroup}>
                        <Text
                          style={[
                            styles.benefitTitle,
                            { color: colors.textPrimary },
                          ]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.benefitDescription,
                            { color: colors.textSecondary },
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Primary CTA */}
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={onSignUp}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Create Account with Google">
                  <Text style={styles.signUpButtonText}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onDismiss}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Close">
                  <Text
                    style={[
                      styles.closeButtonText,
                      { color: colors.textSecondary },
                    ]}>
                    Not Now
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetFrame: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  benefitsList: {
    width: '100%',
    gap: 10,
    marginBottom: 22,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
  benefitIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitTextGroup: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  benefitDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
