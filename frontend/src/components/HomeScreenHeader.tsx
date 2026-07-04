import React from 'react';
import { Input, XStack, YStack, Button, Text } from "tamagui";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
// @ts-ignore
import { HomeScreenHeaderProps } from '../types'; 



const HomeScreenHeader = ({
  handlePresentModalPress,
  onTextInputChange,
  onNotificationClick,
  unreadCount,
  hasActiveFilters = false,
  onFilterReset,
  searchText,
}: HomeScreenHeaderProps) => {
  return (
    <YStack backgroundColor="#000A60" width="100%" paddingHorizontal="$2" paddingVertical="$2" elevation={1}>
      <XStack alignItems="center" justifyContent="space-between" gap="$1.5" height={50}>
        
        {/* Left Side Menu Button - Restored! */}
        <Button chromeless onPress={handlePresentModalPress} padding="$0" width={40} height={40} justifyContent="center" alignItems="center">
          <AntDesign name="menu-fold" size={24} color="white" />
        </Button>

        {/* Center Search Bar Wrapper */}
        <XStack 
          flex={1} 
          alignItems="center" 
          backgroundColor="white" 
          borderWidth={1.5} 
          borderColor="#4D6360" 
          borderRadius={10} 
          paddingHorizontal="$2" 
          minHeight={40}
        >
          <Feather name="search" size={18} color="#778599" style={{ marginLeft: 4 }} />
          
          <Input 
            unstyled
            flex={1}
            paddingLeft={8}
            paddingVertical={4}
            placeholder="Search articles..."
            placeholderTextColor="#778599"
            fontSize={16}
            value={searchText}
            onChangeText={onTextInputChange}
            accessibilityLabel="Search articles"
          />
        </XStack>

        {/* Right Side Notification Bell with Unread Badge - Restored! */}
        <Button chromeless onPress={onNotificationClick} padding="$0" width={40} height={40} justifyContent="center" alignItems="center" position="relative">
          <Ionicons name="notifications-outline" size={24} color="white" />
          {unreadCount > 0 && (
            <XStack 
              position="absolute" 
              top={4} 
              right={4} 
              backgroundColor="red" 
              borderRadius={10} 
              width={16} 
              height={16} 
              alignItems="center" 
              justifyContent="center"
            >
              <Text color="white" fontSize={10} fontWeight="bold">
                {unreadCount}
              </Text>
            </XStack>
          )}
        </Button>

      </XStack>
    </YStack>
  );
};

export default HomeScreenHeader; // Restored default export to prevent component breaking!