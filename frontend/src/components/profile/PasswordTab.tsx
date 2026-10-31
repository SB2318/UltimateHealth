import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import {
  passwordSchema,
  PasswordFormData,
} from '../../schemas/zod/profileSchemas';

export interface ProfileEditPasswordTab {
  handleSubmitPassword: (data: PasswordFormData) => void;
}

const PasswordTab = ({ handleSubmitPassword }: ProfileEditPasswordTab) => {
  const isDark = useColorScheme() === 'dark';
  const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

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
        <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>Security & Password</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.subtitle }]}>
          Ensure your account stays secure by using a strong password with letters, numbers, and symbols.
        </Text>

        {/* Current Password */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Current Password</Text>
          <Controller
            control={control}
            name="old_password"
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
                  <Ionicons name="key-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    secureTextEntry={!isVisibleOldPassword}
                    placeholder="Enter current password"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setIsVisibleOldPassword(prev => !prev)}
                    accessibilityRole="button"
                    accessibilityLabel={isVisibleOldPassword ? 'Hide current password' : 'Show current password'}>
                    <Ionicons
                      name={isVisibleOldPassword ? 'eye-off-outline' : 'eye-outline'}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* New Password */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>New Password</Text>
          <Controller
            control={control}
            name="new_password"
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
                  <Ionicons name="lock-closed-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    secureTextEntry={!isVisibleNewPassword}
                    placeholder="Enter new strong password"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setIsVisibleNewPassword(prev => !prev)}
                    accessibilityRole="button"
                    accessibilityLabel={isVisibleNewPassword ? 'Hide new password' : 'Show new password'}>
                    <Ionicons
                      name={isVisibleNewPassword ? 'eye-off-outline' : 'eye-outline'}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Confirm New Password</Text>
          <Controller
            control={control}
            name="confirm_password"
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
                  <Ionicons name="shield-checkmark-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    secureTextEntry={!isVisibleConfirmPassword}
                    placeholder="Re-enter new password"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setIsVisibleConfirmPassword(prev => !prev)}
                    accessibilityRole="button"
                    accessibilityLabel={isVisibleConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
                    <Ionicons
                      name={isVisibleConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      color={colors.iconColor}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>

      {/* ── Save Button ── */}
      <TouchableOpacity
        onPress={handleSubmit(handleSubmitPassword)}
        style={styles.saveBtn}
        accessibilityRole="button"
        accessibilityLabel="Update password">
        <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFF" />
        <Text style={styles.saveBtnText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordTab;

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
  eyeBtn: {
    padding: 6,
    marginLeft: 6,
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
