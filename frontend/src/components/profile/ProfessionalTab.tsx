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
import { profSchema, ProfFormData } from '../../schemas/zod/profileSchemas';

export interface ProfileEditProfessionalTab {
  user: any;
  handleSubmitProfessionalDetails: (data: ProfFormData) => void;
}

const ProfessionalTab = ({
  user,
  handleSubmitProfessionalDetails,
}: ProfileEditProfessionalTab) => {
  const isDark = useColorScheme() === 'dark';

  const { control, handleSubmit, reset } = useForm<ProfFormData>({
    resolver: zodResolver(profSchema),
    mode: 'onChange',
    defaultValues: {
      specialization: user?.specialization || '',
      qualification: user?.qualification || '',
      experience: user?.Years_of_experience ? user.Years_of_experience.toString() : '',
    },
  });

  useEffect(() => {
    reset({
      specialization: user?.specialization || '',
      qualification: user?.qualification || '',
      experience: user?.Years_of_experience ? user.Years_of_experience.toString() : '',
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
        <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>Medical Credentials</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.subtitle }]}>
          These credentials showcase your expertise to patients and peers across the network.
        </Text>

        {/* Specialization */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Medical Specialization</Text>
          <Controller
            control={control}
            name="specialization"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="medkit-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    accessibilityLabel="Specialization"
                    placeholder="e.g. Cardiology, Neurology, Pediatrics"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                  />
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Qualification */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Qualifications & Degrees</Text>
          <Controller
            control={control}
            name="qualification"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="school-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    accessibilityLabel="Qualification"
                    placeholder="e.g. MBBS, MD, MS, FRCS"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                  />
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Years of Experience */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Years of Experience</Text>
          <Controller
            control={control}
            name="experience"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="time-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    accessibilityLabel="Years of Experience"
                    placeholder="e.g. 8"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    keyboardType="decimal-pad"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    maxLength={2}
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
        onPress={handleSubmit(handleSubmitProfessionalDetails)}
        style={styles.saveBtn}
        accessibilityRole="button"
        accessibilityLabel="Save professional details">
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
        <Text style={styles.saveBtnText}>Save Professional Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfessionalTab;

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
