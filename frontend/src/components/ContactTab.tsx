import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {PRIMARY_COLOR} from '../helper/Theme';

const contactSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Phone number is required.')
    .min(10, 'Please enter a valid phone number.')
    .regex(/^\+?[\d\s\-()]{10,}$/, 'Please enter a valid phone number (e.g. +1234567890).'),
  contact_email: z
    .string()
    .min(1, 'Email address is required.')
    .email('Please enter a valid email address.'),
});
export type ContactFormData = z.infer<typeof contactSchema>;

export interface ProfileEditContactTab {
  user: any;
  handleSubmitContactDetails: (data: ContactFormData) => void;
}

const ContactTab = ({
  user,
  handleSubmitContactDetails,
}: ProfileEditContactTab) => {
  const { control, handleSubmit, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      phone_number: user?.contact_detail?.phone_no || '',
      contact_email: user?.contact_detail?.email_id || '',
    }
  });

  useEffect(() => {
    reset({
      phone_number: user?.contact_detail?.phone_no || '',
      contact_email: user?.contact_detail?.email_id || '',
    });
  }, [user, reset]);
  return (
    <View style={styles.container}>
      {/* Content Container */}
      <View style={styles.content}>
        {/* Phone Number Input */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  clearButtonMode="while-editing"
                  placeholder="Enter phone number with country code (e.g. +1234567890)"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, error && { borderColor: '#ef4444', borderWidth: 2 }]}
                  value={value}
                  keyboardType="phone-pad"
                  maxLength={15}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Contact Email Input */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Contact Email</Text>
          <Controller
            control={control}
            name="contact_email"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  clearButtonMode="while-editing"
                  placeholder="Enter your contact email address"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, error && { borderColor: '#ef4444', borderWidth: 2 }]}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSubmit(handleSubmitContactDetails)} style={styles.btn}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: PRIMARY_COLOR,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
