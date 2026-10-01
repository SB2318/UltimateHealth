// @ts-nocheck
import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { GlassContainer } from './GlassContainer';
import { useAppDispatch } from '../../store/hooks';
import { setGuestMode } from '../../store/UserSlice';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Image paths from frontend/assets/images/
const appIconImage = require('../../../assets/images/icon.png');
const pdmImage = require('../../../assets/images/p_d_m.jpg');

interface OnboardingModalProps {
  visible: boolean;
  onClose: () => void;
  onSignInUser?: () => void;
  onSignInDoctor?: () => void;
  onContinue?: () => void;
}

const ONBOARDING_SLIDES = [
  {
    id: '1',
    badge: 'WELCOME TO ULTIMATEHEALTH',
    badgeIcon: 'heart-pulse',
    title: 'Health in Body, Mind & Dignity',
    subtitle: 'Your single repository for verified health insights, compassionate care, and holistic wellness.',
    quote: 'UltimateHealth stands for health in its fullest sense — body, mind, and dignity. Because you cannot heal a person you do not respect.',
    pillars: ['Verified Insights', 'Open-Source', 'Holistic Care'],
  },
  {
    id: '2',
    badge: 'RESPECT GIVER • MOUMITA DEBNATH',
    badgeIcon: 'shield-star',
    title: 'Justice & Hope in Action',
    subtitle: 'Inspired by Moumita Debnath’s vision of unwavering dignity, compassion, and equality.',
    quote: 'Justice is not a destination — it is a direction. If we can restore dignity to even one soul, we plant a seed that outlives us all.',
    pillars: ['Empathy', 'Justice', 'Hope', 'Dignity'],
    hasProfileImage: true,
  },
  {
    id: '3',
    badge: 'THE CHAIN REACTION',
    badgeIcon: 'link-variant',
    title: 'Break the Chain with Recognition',
    subtitle: 'Every act of respect creates ripples that transform lives and build stronger communities.',
    quote: 'A person who is truly respected rarely needs to take it from another. When one person is treated with dignity, they carry it forward.',
    pillars: ['Empowerment', 'Community', 'Light'],
  },
  {
    id: '4',
    badge: 'YOUR WELLNESS JOURNEY',
    badgeIcon: 'rocket-launch',
    title: 'Ready to Transform Your Life?',
    subtitle: 'Choose your portal below to sign in as a Patient / User or Doctor, or continue as a Guest.',
    quote: 'Step into a world where your health matters, your voice is heard, and respect is standard.',
    pillars: ['Patient Portal', 'Doctor Suite', 'Guest Mode'],
    isFinal: true,
  },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  visible,
  onClose,
  onSignInUser,
  onSignInDoctor,
  onContinue,
}) => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const isDarkMode = colorScheme === 'dark';

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const currentSlide = ONBOARDING_SLIDES[activeSlideIndex];

  // Advance slide or trigger User sign-in on last slide
  const handleNext = () => {
    if (activeSlideIndex < ONBOARDING_SLIDES.length - 1) {
      const nextIndex = activeSlideIndex + 1;
      setActiveSlideIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * (SCREEN_W * 0.88), animated: true });
      if (onContinue) onContinue();
    } else {
      if (onSignInUser) onSignInUser();
    }
  };

  // Sign In as Patient / General User
  const handleUserSignIn = () => {
    if (onSignInUser) onSignInUser();
  };

  // Sign In as Doctor
  const handleDoctorSignIn = () => {
    if (onSignInDoctor) onSignInDoctor();
  };

  // Continue as Guest (dispatches Redux state -> hides modal)
  const handleGuestContinue = () => {
    dispatch(setGuestMode(true));
    onClose();
  };

  // Dynamic Theme Colors
  const theme = {
    overlayBg: isDarkMode ? 'rgba(5, 2, 15, 0.85)' : 'rgba(15, 23, 42, 0.65)',
    ambientGlow: isDarkMode ? 'rgba(124, 58, 237, 0.18)' : 'rgba(59, 130, 246, 0.15)',
    cardBg: isDarkMode ? 'rgba(23, 13, 48, 0.96)' : 'rgba(255, 255, 255, 0.98)',
    cardBorder: isDarkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(226, 232, 240, 0.9)',
    borderBottomHeader: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(226, 232, 240, 0.8)',
    brandText: isDarkMode ? '#F3E8FF' : '#0F172A',
    skipBg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)',
    skipText: isDarkMode ? 'rgba(226, 232, 240, 0.75)' : '#475569',
    badgeBg: isDarkMode ? 'rgba(124, 58, 237, 0.85)' : '#6D28D9',
    badgeBorder: isDarkMode ? 'rgba(192, 132, 252, 0.4)' : 'rgba(167, 139, 250, 0.5)',
    badgeText: '#FFFFFF',
    slideTitle: isDarkMode ? '#F3E8FF' : '#0F172A',
    slideSubtitle: isDarkMode ? 'rgba(196, 181, 253, 0.85)' : '#334155',
    quoteBg: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#F3E8FF',
    quoteBorderLeft: isDarkMode ? '#C084FC' : '#7C3AED',
    quoteBorderOther: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(192, 132, 252, 0.4)',
    quoteText: isDarkMode ? 'rgba(233, 213, 255, 0.95)' : '#3B0764',
    pillBg: isDarkMode ? 'rgba(124, 58, 237, 0.18)' : 'rgba(124, 58, 237, 0.1)',
    pillBorder: isDarkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(167, 139, 250, 0.4)',
    pillText: isDarkMode ? '#E9D5FF' : '#5B21B6',
    pillIcon: isDarkMode ? '#C084FC' : '#7C3AED',
    dotInactive: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
    dotActive: isDarkMode ? '#C084FC' : '#7C3AED',
    secondaryBtnBg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.05)',
    secondaryBtnBorder: isDarkMode ? 'rgba(192, 132, 252, 0.3)' : 'rgba(124, 58, 237, 0.3)',
    secondaryBtnText: isDarkMode ? '#E9D5FF' : '#4C1D95',
    outlineBtnBg: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
    outlineBtnBorder: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)',
    outlineBtnText: isDarkMode ? 'rgba(226, 232, 240, 0.8)' : '#475569',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: theme.overlayBg }]}>
        {/* Ambient background gradient */}
        <LinearGradient
          colors={
            isDarkMode
              ? ['#0D0620', '#1E0F3A', '#0A0418']
              : ['#F8FAFC', '#EFF6FF', '#F1F5F9']
          }
          style={StyleSheet.absoluteFill}
        />

        {/* Ambient background glow */}
        <View style={[styles.ambientGlow, { backgroundColor: theme.ambientGlow }]} />

        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          {/* Header Bar with App Icon Logo */}
          <View style={[styles.headerBar, { borderBottomColor: theme.borderBottomHeader }]}>
            <View style={styles.appBrand}>
              <View style={styles.logoBadge}>
                <Image source={appIconImage} style={styles.appLogo} />
              </View>
              <Text style={[styles.brandText, { color: theme.brandText }]}>UltimateHealth</Text>
            </View>

            <TouchableOpacity
              onPress={handleGuestContinue}
              style={[styles.skipBtn, { backgroundColor: theme.skipBg }]}
              accessibilityRole="button"
              accessibilityLabel="Continue as guest"
            >
              <Text style={[styles.skipText, { color: theme.skipText }]}>Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Slide Content Area */}
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const index = Math.round(contentOffsetX / (SCREEN_W * 0.88));
              setActiveSlideIndex(index);
            }}
            contentContainerStyle={styles.scrollContent}
          >
            {ONBOARDING_SLIDES.map((slide) => (
              <View key={slide.id} style={styles.slideContainer}>
                {/* Badge Header */}
                <View
                  style={[
                    styles.badgeRow,
                    {
                      backgroundColor: theme.badgeBg,
                      borderColor: theme.badgeBorder,
                    },
                  ]}
                >
                  <MaterialCommunityIcon name={slide.badgeIcon as any} size={14} color={theme.badgeText} />
                  <Text style={[styles.badgeText, { color: theme.badgeText }]}>{slide.badge}</Text>
                </View>

                {/* Profile Image Preview if Slide 2 */}
                {slide.hasProfileImage && (
                  <View style={[styles.profileAvatarWrapper, { borderColor: isDarkMode ? '#C084FC' : '#7C3AED' }]}>
                    <Image source={pdmImage} style={styles.profileAvatar} />
                    <LinearGradient
                      colors={['transparent', isDarkMode ? 'rgba(124, 58, 237, 0.4)' : 'rgba(124, 58, 237, 0.25)']}
                      style={styles.avatarGradient}
                    />
                  </View>
                )}

                {/* Slide Title & Subtitle */}
                <Text style={[styles.slideTitle, { color: theme.slideTitle }]}>{slide.title}</Text>
                <Text style={[styles.slideSubtitle, { color: theme.slideSubtitle }]}>{slide.subtitle}</Text>

                {/* Quote Card */}
                <View
                  style={[
                    styles.quoteCard,
                    {
                      backgroundColor: theme.quoteBg,
                      borderLeftColor: theme.quoteBorderLeft,
                      borderColor: theme.quoteBorderOther,
                    },
                  ]}
                >
                  <MaterialCommunityIcon
                    name="format-quote-open"
                    size={22}
                    color={isDarkMode ? '#C084FC' : '#7C3AED'}
                    style={{ marginBottom: 4 }}
                  />
                  <Text style={[styles.quoteText, { color: theme.quoteText }]}>{slide.quote}</Text>
                </View>

                {/* Pillars Chips */}
                <View style={styles.pillRow}>
                  {slide.pillars.map((pill, pIdx) => (
                    <View
                      key={pIdx}
                      style={[
                        styles.pillChip,
                        {
                          backgroundColor: theme.pillBg,
                          borderColor: theme.pillBorder,
                        },
                      ]}
                    >
                      <Ionicons name="sparkles-outline" size={12} color={theme.pillIcon} />
                      <Text style={[styles.pillChipText, { color: theme.pillText }]}>{pill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Stepper Dots & Action Buttons */}
          <View style={styles.footerSection}>
            {/* Pagination Dots */}
            <View style={styles.paginationRow}>
              {ONBOARDING_SLIDES.map((_, dotIdx) => (
                <View
                  key={dotIdx}
                  style={[
                    styles.dot,
                    { backgroundColor: theme.dotInactive },
                    activeSlideIndex === dotIdx && [styles.activeDot, { backgroundColor: theme.dotActive }],
                  ]}
                />
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              {currentSlide.isFinal ? (
                <View style={styles.finalActionStack}>
                  {/* Sign in as Patient / User */}
                  <TouchableOpacity
                    onPress={handleUserSignIn}
                    style={styles.roleSignInBtn}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={isDarkMode ? ['#7C3AED', '#C084FC'] : ['#6D28D9', '#2563EB']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientBtnInner}
                    >
                      <MaterialCommunityIcon name="account-heart-outline" size={20} color="#FFF" />
                      <Text style={styles.roleBtnText}>Sign In as Patient / User</Text>
                      <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Sign in as Doctor */}
                  <TouchableOpacity
                    onPress={handleDoctorSignIn}
                    style={styles.roleSignInBtn}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={isDarkMode ? ['#059669', '#10B981'] : ['#047857', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientBtnInner}
                    >
                      <FontAwesome6 name="user-doctor" size={17} color="#FFF" />
                      <Text style={styles.roleBtnText}>Sign In as Doctor</Text>
                      <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Secondary CTA: Continue as Guest */}
                  <TouchableOpacity
                    onPress={handleGuestContinue}
                    style={[
                      styles.continueOutlineBtn,
                      {
                        backgroundColor: theme.outlineBtnBg,
                        borderColor: theme.outlineBtnBorder,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.continueOutlineText, { color: theme.outlineBtnText }]}>
                      Continue as Guest
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.stepActionRow}>
                  {/* Guest shortcut on intermediate slides */}
                  <TouchableOpacity
                    onPress={handleGuestContinue}
                    style={[
                      styles.secondaryJoinBtn,
                      {
                        backgroundColor: theme.secondaryBtnBg,
                        borderColor: theme.secondaryBtnBorder,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.secondaryJoinText, { color: theme.secondaryBtnText }]}>
                      Guest
                    </Text>
                  </TouchableOpacity>

                  {/* Continue step */}
                  <TouchableOpacity
                    onPress={handleNext}
                    style={styles.continuePrimaryBtn}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={isDarkMode ? ['#7C3AED', '#007AFF'] : ['#6D28D9', '#2563EB']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientBtnInner}
                    >
                      <Text style={styles.continuePrimaryText}>Continue</Text>
                      <Ionicons name="chevron-forward" size={18} color="#FFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OnboardingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  ambientGlow: {
    position: 'absolute',
    width: SCREEN_W * 0.9,
    height: SCREEN_W * 0.9,
    borderRadius: (SCREEN_W * 0.9) / 2,
  },
  modalCard: {
    width: SCREEN_W * 0.92,
    maxHeight: SCREEN_H * 0.85,
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 16,
    paddingVertical: 16,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  appBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  appLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    alignItems: 'center',
  },
  slideContainer: {
    width: SCREEN_W * 0.88,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  profileAvatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    marginBottom: 10,
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  slideSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  quoteCard: {
    width: '100%',
    borderRadius: 16,
    padding: 13,
    borderLeftWidth: 4,
    borderWidth: 1,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 4,
  },
  pillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  pillChipText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  footerSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 12,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  activeDot: {
    width: 22,
  },
  actionRow: {
    width: '100%',
  },
  stepActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  secondaryJoinBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  secondaryJoinText: {
    fontSize: 15,
    fontWeight: '700',
  },
  continuePrimaryBtn: {
    flex: 1.4,
    height: 46,
    borderRadius: 14,
    overflow: 'hidden',
  },
  continuePrimaryText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  finalActionStack: {
    gap: 9,
    width: '100%',
  },
  roleSignInBtn: {
    width: '100%',
    height: 46,
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradientBtnInner: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  roleBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  continueOutlineBtn: {
    width: '100%',
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  continueOutlineText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
});
