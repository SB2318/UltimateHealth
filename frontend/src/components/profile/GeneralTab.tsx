import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
} from 'react-native';
import React, { memo, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import { generalSchema, GeneralFormData } from '../../schemas/zod/profileSchemas';

interface ProfileEditGeneralTab {
  user: any;
  imgUrl: string;
  handleSubmitGeneralDetails: (data: GeneralFormData) => void;
  selectImage: () => void;
}

const GeneralTab = ({ user, imgUrl, handleSubmitGeneralDetails, selectImage }: ProfileEditGeneralTab) => {
  const isDark = useColorScheme() === 'dark';

  const { control, handleSubmit, reset } = useForm<GeneralFormData>({
    resolver: zodResolver(generalSchema),
    mode: 'onChange',
    defaultValues: {
      username: user?.user_name || '',
      userHandle: user?.user_handle || '',
      email: user?.email || '',
      about: user?.about || '',
    },
  });

  useEffect(() => {
    reset({
      username: user?.user_name || '',
      userHandle: user?.user_handle || '',
      email: user?.email || '',
      about: user?.about || '',
    });
  }, [user, reset]);

  const colors = {
    cardBg: isDark ? '#1F2937' : '#FFFFFF',
    border: isDark ? '#374151' : '#E5E7EB',
    text: isDark ? '#F9FAFB' : '#1F2937',
    label: isDark ? '#E5E7EB' : '#374151',
    subtitle: isDark ? '#9CA3AF' : '#6B7280',
    inputBg: isDark ? '#111827' : '#F9FAFB',
    inputDisabledBg: isDark ? '#1F2937' : '#F3F4F6',
    inputBorder: isDark ? '#374151' : '#E5E7EB',
    placeholder: isDark ? '#6B7280' : '#9CA3AF',
    iconColor: isDark ? '#9CA3AF' : '#6B7280',
    cameraBorder: isDark ? '#1F2937' : '#FFFFFF',
  };

  return (
    <View style={styles.container}>
      {/* ── Avatar Card ── */}
      <View style={[styles.avatarCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <View style={styles.avatarRing}>
          <Image
            source={{
              uri: imgUrl || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={[styles.cameraBtn, { borderColor: colors.cameraBorder }]}
            onPress={selectImage}
            accessibilityRole="button"
            accessibilityLabel="Change profile picture">
            <Feather name="camera" color="#FFFFFF" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.avatarHint, { color: colors.subtitle }]}>Tap the camera to update your photo</Text>
      </View>

      {/* ── Form Card ── */}
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>Basic Info</Text>

        {/* Username */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Full Name</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <Ionicons name="person-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                  <TextInput
                    accessibilityLabel="Username"
                    placeholder="Your full name"
                    placeholderTextColor={colors.placeholder}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* User Handle */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>User Handle</Text>
          <Controller
            control={control}
            name="userHandle"
            render={({ field: { value } }) => (
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: colors.inputDisabledBg, borderColor: colors.inputBorder },
                ]}>
                <Ionicons name="at-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                <TextInput
                  editable={false}
                  accessibilityLabel="User handle"
                  placeholder="Your user handle"
                  placeholderTextColor={colors.placeholder}
                  style={[styles.input, { color: colors.subtitle }]}
                  value={value}
                />
                <Ionicons name="lock-closed-outline" size={14} color={colors.iconColor} style={styles.lockIcon} />
              </View>
            )}
          />
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: colors.inputDisabledBg, borderColor: colors.inputBorder },
                ]}>
                <Ionicons name="mail-outline" size={18} color={colors.iconColor} style={styles.inputIcon} />
                <TextInput
                  editable={false}
                  accessibilityLabel="Email"
                  placeholder="Your email address"
                  placeholderTextColor={colors.placeholder}
                  style={[styles.input, { color: colors.subtitle }]}
                  value={value}
                />
                <Ionicons name="lock-closed-outline" size={14} color={colors.iconColor} style={styles.lockIcon} />
              </View>
            )}
          />
        </View>

        {/* About */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.label }]}>About</Text>
          <Controller
            control={control}
            name="about"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <View
                  style={[
                    styles.textAreaWrapper,
                    { backgroundColor: colors.inputBg, borderColor: colors.inputBorder },
                    error && styles.inputError,
                  ]}>
                  <TextInput
                    accessibilityLabel="About"
                    placeholder="Write a short bio about yourself..."
                    placeholderTextColor={colors.placeholder}
                    textAlignVertical="top"
                    style={[styles.textArea, { color: colors.text }]}
                    multiline
                    numberOfLines={4}
                    value={value}
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
        onPress={handleSubmit(handleSubmitGeneralDetails)}
        style={styles.saveBtn}
        accessibilityRole="button"
        accessibilityLabel="Save profile details">
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(GeneralTab);

const styles = StyleSheet.create({
  container: { gap: 16 },
  avatarCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: BUTTON_COLOR,
    padding: 3,
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: BUTTON_COLOR,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarHint: { fontSize: 12, marginTop: 4 },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 14,
  },
  inputError: { borderColor: '#EF4444', borderWidth: 1.5 },
  inputIcon: { marginRight: 10 },
  lockIcon: { marginLeft: 8 },
  input: { flex: 1, fontSize: 15, fontWeight: '500' },
  textAreaWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    minHeight: 120,
  },
  textArea: { fontSize: 15, fontWeight: '500', minHeight: 90 },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, marginLeft: 4 },
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
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
