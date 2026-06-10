import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Input, XStack, YStack, Button, Text, View } from 'tamagui';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { HomeScreenHeaderProps } from '../type';
import { StatusBar } from 'expo-status-bar';

const HomeScreenHeader = ({
  handlePresentModalPress,
  onTextInputChange,
  onNotificationClick,
  unreadCount,
  hasActiveFilters = false,
  onFilterReset,
}: HomeScreenHeaderProps) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;
  const notificationSize = isCompact ? 30 : 34;

  return (
    <YStack backgroundColor="#F8FAFC" width="100%" paddingHorizontal={isCompact ? '$2' : '$3'} paddingVertical="$3" elevation={1} borderBottomWidth={1} borderBottomColor="#E2E8F0">
      <XStack alignItems="center" justifyContent="space-between" gap={isCompact ? '$2' : '$3'}>

        {/* Search Bar */}
        <XStack
          flex={1}
          minWidth={0}
          alignItems="center"
          backgroundColor="white"
          borderWidth={1.5}
          borderColor={'#CBD5E1'}
          borderRadius={10}
          paddingHorizontal="$1"
          paddingVertical="$0.5"
          justifyContent="space-between"
          shadowColor="rgba(15, 23, 42, 0.08)"
        >
          <Feather name="search" size={isCompact ? 16 : 18} color="#475569" />
          <Input
            unstyled
            flex={1}
            minWidth={0}
           // marginLeft="$1"
            placeholder="Search articles..."
            placeholderTextColor="#64748B"
            onChangeText={onTextInputChange}
            fontSize={isCompact ? '$3' : '$4'}
          />
          {hasActiveFilters && onFilterReset ? (
            <Button unstyled onPress={onFilterReset} paddingRight="$1" paddingLeft="$1">
              <Ionicons name="refresh" size={20} color={'#FF5252'} />
            </Button>
          ) : null}
          <Button unstyled onPress={handlePresentModalPress}>
            <AntDesign name="menu-fold" size={isCompact ? 18 : 20} color={'#0F766E'} />
          </Button>
        </XStack>

        {/* Notification */}
        <Button unstyled onPress={onNotificationClick} position="relative" p={0} flexShrink={0}>
          <Ionicons name="notifications" size={notificationSize} color={'#1E40AF'} />
          {unreadCount > 0 && (
            <View
              position="absolute"
              top={1}
              right={1}
              w={20}
              h={20}
              br={10}
              bg="red"
              ai="center"
              jc="center"
            >
              <Text color="white" fontSize={12} fontWeight="700">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </Button>
      </XStack>
    </YStack>
  );
};




export default HomeScreenHeader;
