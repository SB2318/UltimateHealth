import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import { contactSchema, ContactFormData } from '../../schemas/zod/profileSchemas';

export interface ProfileEditContactTab {
  user: any;
  handleSubmitContactDetails: (data: ContactFormData) => void;
}

const ContactTab = ({
  user,
  handleSubmitContactDetails,
}: ProfileEditContactTab) => {
  const isDark = useColorScheme() === 'dark';

  const { control, handleSubmit, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      phone_number: user?.contact_detail?.phone_no || '',
      contact_email: user?.contact_detail?.email_id || '',
    },
  });

  useEffect(() => {
    reset({
      phone_number: user?.contact_detail?.phone_no || '',
      contact_email: user?.contact_detail?.email_id || '',
    });
  }, [user, reset]);

  const colors = {
    cardBg: isDark ? '#1F2937' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
    text: isDark ? '#F9FAFB' : '#1F2937',
    label: isDark ? '#E5E7EB' : '#374151',
    subtitle: isDark ? '#9CA3AF' : '#6B7280',
    inputBg: isDark ? '#111827' : '#F9FAFB',
    inputBorder: isDark ? '#374151' : '#E5E7EB',
    placeholder: isDark ? '#6B7280' : '#9CA3AF',
    iconColor: isDark ? '#9CA3AF' : '#6B7280',
  };

  return (
    <View style={styles.container}>
      {/* ── Form Card ── */}
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>Contact Information</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.subtitle }]}>
          Keep your contact information up-to-date so we can reach you when necessary.
        </Text>

        {/* Phone Number */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Phone Number</Text>
          <Controller
            control={control}
            name="phone_number"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="call-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    accessibilityLabel="Phone Number"
                    placeholder="e.g. +91 9876543210"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    keyboardType="phone-pad"
                    maxLength={15}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Contact Email */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Alternate / Contact Email</Text>
          <Controller
            control={control}
            name="contact_email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="mail-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    accessibilityLabel="Contact Email"
                    placeholder="contact@example.com"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>

      {/* ── Save Button ── */}
      <TouchableOpacity
        onPress={handleSubmit(handleSubmitContactDetails)}
        style={styles.saveBtn}
        accessibilityRole="button"
        accessibilityLabel="Save contact details"
        accessibilityHint="Saves your phone number and contact email">
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
        <Text style={styles.saveBtnText}>Save Contact Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactTab;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: BUTTON_COLOR,
    borderRadius: 14,
    height: 52,
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 4,
    marginBottom: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
