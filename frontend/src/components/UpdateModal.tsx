/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, View, Text, Pressable, Linking } from 'react-native';
import { safeOpenUrl } from '../utils/safeOpenUrl';

export default function UpdateModal({ visible, storeUrl }: any) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: '80%',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>
            Update Available 🚀
          </Text>

          <Text style={{ marginVertical: 12, textAlign: 'center' }}>
            Please update the app to continue using all features.
          </Text>

          <Pressable
            onPress={() =>
              safeOpenUrl(storeUrl, {
              errorTitle: 'Store Unavailable',
              errorMessage: 'Unable to open the app store on this device.',
            })
            }
            accessibilityRole="button"
            accessibilityLabel="Update Now"
            style={{
              backgroundColor: '#000',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8
            }}
          >
            <Text style={{ color: '#fff' }}>Update Now</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
