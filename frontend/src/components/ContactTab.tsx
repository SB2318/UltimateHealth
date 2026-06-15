import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {PRIMARY_COLOR} from '../helper/Theme';

const contactSchema = z.object({
  phone_number: z.string().min(10, 'Please enter a valid phone number'),
  contact_email: z.string().email('Please enter a valid email'),
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
  // Destructured isValid and isSubmitting to monitor form state
  const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm<ContactFormData>({
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
                  placeholder="Enter your contact phone number"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, error && { borderColor: 'red' }]}
                  value={value}
                  keyboardType="number-pad"
                  maxLength={10}
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
                  placeholder="Enter your contact email"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, error && { borderColor: 'red' }]}
                  value={value}
                  keyboardType="email-address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>

      {/* Save Button with dynamic styling and disabled properties */}
      <TouchableOpacity 
        onPress={handleSubmit(handleSubmitContactDetails)} 
        disabled={!isValid || isSubmitting}
        style={[styles.btn, (!isValid || isSubmitting) && styles.btnDisabled]}
      >
        <View style={styles.btnContent}>
          {isSubmitting && (
            <ActivityIndicator 
              size="small" 
              color="white" 
              style={styles.spinner} 
            />
          )}
          <Text style={styles.btnText}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Text>
        </View>
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
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  btnDisabled: {
    opacity: 0.5,
    backgroundColor: '#9CA3AF',
  },
  spinner: {
    marginRight: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
