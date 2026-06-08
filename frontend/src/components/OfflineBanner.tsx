import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, SafeAreaView } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OfflineBanner: React.FC = () => {
  const { isConnected } = useNetworkStatus();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isConnected) {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide up
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          transform: [{ translateY: slideAnim }],
          // Add top padding for notch if needed, although it might be positioned absolute
          paddingTop: Platform.OS === 'ios' ? insets.top : 0
        },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <FontAwesome5 name="wifi" size={14} color="#fff" style={styles.icon} />
          <Text style={styles.text}>You are offline. Showing cached content.</Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E53935', // Red color for offline
    zIndex: 9999, // Ensure it's on top of everything
    elevation: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    backgroundColor: '#E53935',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OfflineBanner;
