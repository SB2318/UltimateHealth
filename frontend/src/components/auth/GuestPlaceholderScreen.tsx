/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { BUTTON_COLOR } from '../../lib/ui/Theme';
import BenefitsModal from '../article/BenefitsModal';

interface GuestPlaceholderScreenProps {
  title?: string;
  description?: string;
  route?: { params?: { title?: string; description?: string } };
  navigation?: any;
}

const BENEFIT_ITEMS = [
  {
    icon: 'chatbubble-ellipses-outline' as const,
    title: 'Engage & Discuss',
    subtitle: 'Comment, like & review health articles',
  },
  {
    icon: 'bookmark-outline' as const,
    title: 'Personalized Library',
    subtitle: 'Save bookmarks & track your reading history',
  },
  {
    icon: 'sparkles-outline' as const,
    title: 'AI Health Assistant',
    subtitle: '24/7 instant medical answers & summaries',
  },
  {
    icon: 'medkit-outline' as const,
    title: 'Doctor Network',
    subtitle: 'Follow verified physicians & health specialists',
  },
];

const useSafeInsets = () => {
  try {
    return useSafeAreaInsets();
  } catch {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
};

const GuestPlaceholderScreen: React.FC<GuestPlaceholderScreenProps> = ({
  title: propTitle,
  description: propDescription,
  route,
}) => {
  const insets = useSafeInsets();
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === 'dark';
  const [isBenefitsModalVisible, setIsBenefitsModalVisible] = useState(false);

  // Smooth native hardware-accelerated animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    // Ultra-smooth native entrance without thread blocking
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  const displayTitle =
    route?.params?.title || propTitle || 'Sign In to Continue';
  const displayDescription =
    route?.params?.description ||
    propDescription ||
    'Join our verified healthcare community to unlock personalized health tracking, AI answers, and discussions.';

  const colors = {
    bg: isDark ? '#0B0F19' : '#F8FAFC',
    cardBg: isDark ? '#1E293B' : '#FFFFFF',
    border: isDark ? '#1F2937' : '#E2E8F0',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    badgeBg: isDark ? 'rgba(15, 82, 186, 0.15)' : 'rgba(15, 82, 186, 0.08)',
    badgeText: isDark ? '#60A5FA' : BUTTON_COLOR,
    itemIconBg: isDark ? '#111827' : '#EFF6FF',
    backBtnBg: isDark ? '#1E293B' : '#FFFFFF',
    backBtnBorder: isDark ? '#334155' : '#E2E8F0',
  };

  const handleSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  const canGoBack = navigation?.canGoBack && navigation.canGoBack();

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
      />

      {/* Top back button if navigatable */}
      {canGoBack && (
        <View
          style={[
            styles.topNav,
            { top: Math.max(insets.top, 12), backgroundColor: 'transparent' },
          ]}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.backBtnBg,
                borderColor: colors.backBtnBorder,
              },
            ]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <Ionicons
              name="arrow-back"
              size={20}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingTop: insets.top + (canGoBack ? 56 : 28),
            paddingBottom: Math.max(insets.bottom, 24) + 20,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.animatedWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}>
          {/* ── Visual Lock / Shield Animation ── */}
          <View style={styles.animationContainer}>
            <View
              style={[
                styles.glowCircle,
                { backgroundColor: colors.badgeBg },
              ]}
            />
            <LottieView
              source={require('../../assets/LottieAnimation/lock-animation.json')}
              autoPlay
              loop
              speed={1.1}
              renderMode="HARDWARE"
              style={styles.lottieView}
            />
          </View>

          {/* ── Mode Pill Badge ── */}
          <View style={[styles.modeBadge, { backgroundColor: colors.badgeBg }]}>
            <Ionicons name="shield-outline" size={13} color={colors.badgeText} />
            <Text style={[styles.modeBadgeText, { color: colors.badgeText }]}>
              GUEST ACCESS
            </Text>
          </View>

          {/* ── Title & Description ── */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {displayTitle}
          </Text>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {displayDescription}
          </Text>

          {/* ── Feature Unlocks Card ── */}
          <View
            style={[
              styles.featuresCard,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}>
            <Text
              style={[styles.featuresCardHeader, { color: colors.textSecondary }]}>
              WHAT YOU UNLOCK AS A MEMBER
            </Text>

            <View style={styles.featuresList}>
              {BENEFIT_ITEMS.map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <View
                    style={[
                      styles.featureIconContainer,
                      { backgroundColor: colors.itemIconBg },
                    ]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={BUTTON_COLOR}
                    />
                  </View>
                  <View style={styles.featureTextWrapper}>
                    <Text
                      style={[
                        styles.featureTitle,
                        { color: colors.textPrimary },
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.featureSubtitle,
                        { color: colors.textSecondary },
                      ]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ── Primary Action: Sign In With Google ── */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google">
              <View style={styles.googleIconCircle}>
                <FontAwesome name="google" size={18} color="#EA4335" />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.whyJoinButton}
              onPress={() => setIsBenefitsModalVisible(true)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Learn why you should create an account">
              <Text style={[styles.whyJoinText, { color: colors.textSecondary }]}>
                Learn more about membership benefits
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <BenefitsModal
        visible={isBenefitsModalVisible}
        onDismiss={() => setIsBenefitsModalVisible(false)}
        onSignUp={() => {
          setIsBenefitsModalVisible(false);
          handleSignIn();
        }}
      />
    </View>
  );
};

export default GuestPlaceholderScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topNav: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  animatedWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  animationContainer: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  glowCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  lottieView: {
    width: 160,
    height: 160,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginBottom: 14,
  },
  modeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  featuresCard: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  featuresCardHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 14,
    marginLeft: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  googleButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    gap: 10,
    shadowColor: BUTTON_COLOR,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  googleIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  whyJoinButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  whyJoinText: {
    fontSize: 12.5,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
