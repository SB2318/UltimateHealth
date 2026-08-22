import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { XStack, YStack, Text } from 'tamagui';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../schemas/type';

interface DoctorProfileBannerProps {
  onCompletePress?: () => void;
}

export default function DoctorProfileBanner({ onCompletePress }: DoctorProfileBannerProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (onCompletePress) {
      onCompletePress();
    } else {
      // Default navigation to profile edit or specialized doctor profile screen
      // Assuming 'ProfileEditScreen' or similar exists; adjust as needed based on actual routes
      // navigation.navigate('UserProfileScreen'); 
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      <XStack alignItems="center" gap="$3">
        <YStack
          width={36}
          height={36}
          borderRadius={18}
          backgroundColor="rgba(255,255,255,0.2)"
          justifyContent="center"
          alignItems="center"
        >
          <Icon name="clipboard-account" size={20} color="white" />
        </YStack>
        
        <YStack flex={1}>
          <Text color="white" fontWeight="600" fontSize={14}>
            Complete your doctor profile
          </Text>
          <Text color="rgba(255,255,255,0.8)" fontSize={12} marginTop={2}>
            Unlock all features by finishing setup
          </Text>
        </YStack>

        <Icon name="chevron-right" size={24} color="white" />
      </XStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b82f6', // blue-500
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
