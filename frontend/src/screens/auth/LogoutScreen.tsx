import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GET_STORAGE_DATA, USER_LOGOUT} from '../../helper/APIUtils';
import axios, {AxiosError} from 'axios';
import {resetUserState} from '../../store/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import {clearStorage} from '../../helper/Utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoutScreenProp} from '@/src/type';
import {useUserLogout} from '@/src/hooks/useUserLogout';
import {YStack, Text} from 'tamagui';

const LogoutScreen = ({navigation, route}: LogoutScreenProp) => {
  const {profile_image, username} = route.params;
 // const {user_token} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const {mutate: logout} = useUserLogout();


  const handleLogout = () => {
    logout(
      {},
      {
        onSuccess: async () => {
          Alert.alert('Success', 'Logout successfully');
          await clearStorage();
          dispatch(resetUserState());
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}], 
          });
        },

        onError: (err: AxiosError) => {
          if (err.response) {
            const statusCode = err.response.status;
            switch (statusCode) {
              case 500:
                // Handle internal server errors
                Alert.alert(
                  'Logout Failed',
                  'Internal server error. Please try again later.',
                );
                break;
              default:
                // Handle any other errors
                Alert.alert(
                  'Logout Failed',
                  'Something went wrong. Please try again later.',
                );
            }
          } else {
            // Handle network errors
            console.log('General Update Error', err);
            Alert.alert(
              'Logout Failed',
              'Network error. Please check your connection.',
            );
          }
        },
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <YStack flex={1} backgroundColor="$background" style={styles.container}>
        <YStack style={styles.alert}>
          <YStack style={styles.alertContent}>
            <YStack
              style={styles.alertAvatar}
              borderWidth={!profile_image ? 0.5 : 0}
              borderColor="$color"
              overflow="hidden">
              <Image
                alt=""
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: profile_image.startsWith('https')
                    ? profile_image
                    : `${GET_STORAGE_DATA}/${profile_image}`,
                }}
              />
            </YStack>

            <Text style={styles.alertTitle} color="$color">
              Log out of
              {'\n'}
              {username}
            </Text>

            <Text style={styles.alertMessage} color="$gray8">
              Are you sure you would like to log out of this account ?
            </Text>
          </YStack>

          <TouchableOpacity onPress={handleLogout}>
            <YStack style={styles.btn} backgroundColor="$blue10" borderColor="$blue10">
              <Text style={styles.btnText} color="$background">Yes, log me out</Text>
            </YStack>
          </TouchableOpacity>

          <YStack style={{marginTop: 8}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <YStack style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText} color="$blue10">Cancel</Text>
              </YStack>
            </TouchableOpacity>
          </YStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Alert */
  alert: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: 80,
  },
  alertContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  alertAvatar: {
    width: 160,
    height: 160,
    borderRadius: 9999,
    alignSelf: 'center',
    marginBottom: 24,
  },
  alertTitle: {
    marginBottom: 16,
    fontSize: 34,
    lineHeight: 44,
    fontWeight: '700',
    textAlign: 'center',
  },
  alertMessage: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
});
