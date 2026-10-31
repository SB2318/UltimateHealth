// @ts-nocheck
import React from 'react';
import { Share, useColorScheme, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  YStack,
  XStack,
  Text,
  View,
  Separator,
  Button,
} from 'tamagui';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { ProfessionalColors, Typography, Spacing } from '../../styles/GlassStyles';
import { GlassContainer } from '../../components/common/GlassContainer';
import { useScrollControls } from '../../hooks/common/useScrollControls';
import { ScrollActionButtons } from '../../components/common/ScrollActionButtons';
import type { CommunityGuidelinesScreenProps } from '../../schemas/type';

interface Section {
  id: number;
  category: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  points: string[];
  note: string;
  noteType: 'warning' | 'info' | 'error';
}

const sections: Section[] = [
  {
    id: 1,
    category: 'CORE PRINCIPLES',
    title: 'Respect Every Community Member',
    icon: 'people-outline',
    iconColor: ProfessionalColors.info,
    points: [
      'Communicate with kindness and respect in all discussions',
      'Engage in healthy, constructive healthcare dialogues',
      'Support fellow community members on their wellness journey',
      'Embrace inclusive participation across all languages and cultures',
    ],
    note: 'Harassment, hate speech, bullying, and abusive behavior are strictly prohibited.',
    noteType: 'warning',
  },
  {
    id: 2,
    category: 'CORE PRINCIPLES',
    title: 'Share Responsible Health Information',
    icon: 'medkit-outline',
    iconColor: ProfessionalColors.success,
    points: [
      'Share only trustworthy and verified medical knowledge',
      'Clearly distinguish personal experiences from clinical facts',
      'Avoid spreading unverified medical claims or health conspiracies',
      'Always advise readers to consult certified healthcare practitioners',
    ],
    note: 'Harmful or misleading health claims may be removed and lead to account restrictions.',
    noteType: 'warning',
  },
  {
    id: 3,
    category: 'CORE PRINCIPLES',
    title: 'Respect Language & Cultural Diversity',
    icon: 'language-outline',
    iconColor: '#A855F7',
    points: [
      'Celebrate the multilingual nature of our global community',
      'Respect all regional medical perspectives and cultural backgrounds',
      'Avoid mockery, discrimination, or exclusion based on language',
      'Promote accessible healthcare communication that bridges communities',
    ],
    note: 'UltimateHealth supports content in multiple languages — every voice matters.',
    noteType: 'info',
  },
  {
    id: 4,
    category: 'CONTENT & MEDIA',
    title: 'Podcast & Media Guidelines',
    icon: 'mic-outline',
    iconColor: ProfessionalColors.warning,
    points: [
      'Respect copyrights — only publish media you have the right to share',
      'Avoid harmful, explicit, or sensationalized audio/visual material',
      'Ensure all audio content adds genuine educational value',
      'Provide accurate titles, categories, and tags for your podcasts',
    ],
    note: 'Copyright infringements will result in immediate content removal.',
    noteType: 'warning',
  },
  {
    id: 5,
    category: 'CONTENT & MEDIA',
    title: 'Content & Review Guidelines',
    icon: 'create-outline',
    iconColor: ProfessionalColors.primary,
    points: [
      'Provide thoughtful and constructive peer reviews of articles',
      'Offer helpful feedback to assist creators in improving quality',
      'Engage honestly with ratings, likes, and improvement requests',
    ],
    note: 'Spam, engagement manipulation, and automated comments are not tolerated.',
    noteType: 'warning',
  },
  {
    id: 6,
    category: 'SAFETY & ENFORCEMENT',
    title: 'Privacy & Personal Safety',
    icon: 'shield-checkmark-outline',
    iconColor: ProfessionalColors.success,
    points: [
      'Never disclose private patient data or personally identifiable records',
      'Do not share confidential contact information publicly',
      'Avoid impersonating healthcare organizations or clinical experts',
      'Promptly report privacy concerns to our trust and safety team',
    ],
    note: 'Protecting user privacy and clinical confidentiality is paramount.',
    noteType: 'info',
  },
  {
    id: 7,
    category: 'SAFETY & ENFORCEMENT',
    title: 'Prohibited Activities',
    icon: 'warning-outline',
    iconColor: ProfessionalColors.error,
    points: [
      'Targeted harassment, intimidation, or hate speech',
      'Phishing, scams, or malicious link distribution',
      'Dissemination of dangerous medical misinformation',
      'Commercial spamming or unauthorized promotional campaigns',
      'Attacking or exploiting system features',
    ],
    note: 'Engaging in prohibited activities results in immediate account suspension.',
    noteType: 'error',
  },
  {
    id: 8,
    category: 'SAFETY & ENFORCEMENT',
    title: 'Moderation & Enforcement',
    icon: 'shield-outline',
    iconColor: ProfessionalColors.secondary,
    points: [
      'Moderators review community reports transparently and fairly',
      'Content violating rules will be hidden, flagged, or deleted',
      'Temporary restrictions or permanent bans may be enacted',
      'Decisions prioritize user well-being and public health integrity',
    ],
    note: 'Moderation decisions are guided by community safety and medical ethics.',
    noteType: 'info',
  },
];

const NOTE_ICONS = {
  warning: 'alert-circle' as const,
  error: 'warning' as const,
  info: 'information-circle' as const,
} as const;

const NOTE_COLORS = {
  warning: {
    bg: ProfessionalColors.warningGlass,
    border: ProfessionalColors.warning,
    text: ProfessionalColors.warning,
  },
  info: {
    bg: ProfessionalColors.infoGlass,
    border: ProfessionalColors.info,
    text: ProfessionalColors.info,
  },
  error: {
    bg: ProfessionalColors.errorGlass,
    border: ProfessionalColors.error,
    text: ProfessionalColors.error,
  },
} as const;

const CommunityGuidelinesScreen = ({ navigation }: CommunityGuidelinesScreenProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {
    scrollRef,
    onScroll,
    topVisible,
    topOpacity,
    bottomVisible,
    bottomOpacity,
    scrollToTop,
    scrollToBottom,
  } = useScrollControls({ threshold: 300, bottomThreshold: 50 });

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'UltimateHealth Community Guidelines 🌿\nLearn how we maintain a safe, respectful, and evidence-based wellness ecosystem.\n\nDownload now:\nhttps://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const bgColor = isDarkMode ? '#000A60' : '#F0F8FF';
  const textColor = isDarkMode ? ProfessionalColors.white : ProfessionalColors.gray900;
  const subtextColor = isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray600;

  // Group sections by category
  const categories = ['CORE PRINCIPLES', 'CONTENT & MEDIA', 'SAFETY & ENFORCEMENT'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor="#000A60" />

      {/* ── Top Bar with Back Button ── */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
        backgroundColor={bgColor}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDarkMode ? '#FFFFFF' : '#111827'}
          />
        </TouchableOpacity>

        <YStack alignItems="center">
          <Text
            style={{
              ...Typography.bodyMedium,
              fontWeight: '700',
              color: textColor,
            }}>
            Community Guidelines
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: subtextColor,
            }}>
            Trust, Safety & Respect
          </Text>
        </YStack>

        <TouchableOpacity
          onPress={onShare}
          style={styles.actionButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Share guidelines">
          <Ionicons
            name="share-social-outline"
            size={20}
            color={isDarkMode ? '#FFFFFF' : ProfessionalColors.primary}
          />
        </TouchableOpacity>
      </XStack>

      <ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        flex={1}
        accessibilityLabel="Community Guidelines ScrollView">
        <View flex={1} backgroundColor={bgColor} paddingHorizontal="$4">
          {/* ── Hero Banner Section (matches AboutPage.tsx) ── */}
          <YStack alignItems="center" marginTop="$6" marginBottom="$5" gap="$4">
            <View
              padding="$3"
              backgroundColor={ProfessionalColors.primaryGlass}
              borderRadius={100}
              borderWidth={2}
              borderColor={ProfessionalColors.primary}>
              <Ionicons
                name="shield-checkmark"
                size={54}
                color={ProfessionalColors.primary}
              />
            </View>

            <YStack alignItems="center" gap="$2">
              <Text
                style={[
                  Typography.h2,
                  {
                    color: textColor,
                    textAlign: 'center',
                  },
                ]}>
                Community Guidelines
              </Text>
              <View
                backgroundColor={ProfessionalColors.successGlass}
                paddingHorizontal="$3"
                paddingVertical="$1.5"
                borderRadius={20}
                borderWidth={1}
                borderColor={ProfessionalColors.success}>
                <Text
                  style={{
                    color: ProfessionalColors.success,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                  }}>
                  CODE OF CONDUCT
                </Text>
              </View>
            </YStack>

            <GlassContainer variant="card" style={{ marginTop: Spacing.xs }}>
              <Text
                style={[
                  Typography.body,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray300
                      : ProfessionalColors.gray700,
                    textAlign: 'center',
                    lineHeight: 24,
                  },
                ]}>
                UltimateHealth brings together a vibrant global community dedicated
                to wellness, health education, and medical collaboration. These
                standards ensure our platform remains an uplifting, safe, and
                evidence-based space for everyone.
              </Text>
            </GlassContainer>
          </YStack>

          {/* ── Categorized Sections ── */}
          {categories.map((category) => {
            const categorySections = sections.filter((s) => s.category === category);

            return (
              <YStack key={category} marginTop="$4" gap="$3">
                <Text
                  style={[
                    Typography.h6,
                    {
                      color: isDarkMode
                        ? ProfessionalColors.gray400
                        : ProfessionalColors.gray600,
                      marginLeft: Spacing.xs,
                      letterSpacing: 0.5,
                    },
                  ]}>
                  {category}
                </Text>

                <YStack gap="$3">
                  {categorySections.map((section) => {
                    const noteTheme = NOTE_COLORS[section.noteType];

                    return (
                      <GlassContainer key={section.id} variant="card">
                        <YStack gap="$3">
                          <XStack alignItems="center" gap="$3">
                            <View
                              backgroundColor={
                                isDarkMode
                                  ? 'rgba(255,255,255,0.1)'
                                  : 'rgba(0,0,0,0.04)'
                              }
                              padding="$2.5"
                              borderRadius={12}>
                              <Ionicons
                                name={section.icon}
                                size={22}
                                color={section.iconColor}
                              />
                            </View>
                            <Text
                              style={{
                                ...Typography.h5,
                                color: textColor,
                                flex: 1,
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              {section.title}
                            </Text>
                          </XStack>

                          <YStack gap="$2" paddingLeft="$1">
                            {section.points.map((point, index) => (
                              <XStack key={index} gap="$2.5" alignItems="flex-start">
                                <View marginTop={5}>
                                  <Ionicons
                                    name="checkmark-circle"
                                    size={15}
                                    color={ProfessionalColors.primary}
                                  />
                                </View>
                                <Text
                                  style={{
                                    ...Typography.bodySmall,
                                    color: isDarkMode
                                      ? ProfessionalColors.gray300
                                      : ProfessionalColors.gray700,
                                    flex: 1,
                                    lineHeight: 20,
                                  }}>
                                  {point}
                                </Text>
                              </XStack>
                            ))}
                          </YStack>

                          {/* Alert Note */}
                          <XStack
                            backgroundColor={noteTheme.bg}
                            borderWidth={1}
                            borderColor={noteTheme.border}
                            borderRadius={12}
                            padding="$3"
                            gap="$2.5"
                            marginTop="$1"
                            accessibilityRole="alert">
                            <View marginTop={2}>
                              <Ionicons
                                name={NOTE_ICONS[section.noteType]}
                                size={17}
                                color={noteTheme.text}
                              />
                            </View>
                            <Text
                              style={{
                                ...Typography.bodySmall,
                                color: noteTheme.text,
                                flex: 1,
                                lineHeight: 19,
                                fontWeight: '500',
                              }}>
                              {section.note}
                            </Text>
                          </XStack>
                        </YStack>
                      </GlassContainer>
                    );
                  })}
                </YStack>
              </YStack>
            );
          })}

          {/* ── Related Actions (matches AboutPage.tsx) ── */}
          <YStack marginTop="$6" gap="$3">
            <Text
              style={[
                Typography.h6,
                {
                  color: isDarkMode
                    ? ProfessionalColors.gray400
                    : ProfessionalColors.gray600,
                  marginLeft: Spacing.xs,
                },
              ]}>
              RELATED POLICIES
            </Text>

            <GlassContainer variant="card">
              <YStack gap="$2">
                <Button
                  unstyled
                  onPress={() => navigation.navigate('Privacy')}
                  backgroundColor="transparent"
                  pressStyle={{ opacity: 0.7 }}
                  padding="$3"
                  borderRadius={12}>
                  <XStack alignItems="center" gap="$3" flex={1}>
                    <View
                      backgroundColor={
                        isDarkMode
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.04)'
                      }
                      padding="$2"
                      borderRadius={10}>
                      <Ionicons
                        name="document-text-outline"
                        size={20}
                        color={ProfessionalColors.primary}
                      />
                    </View>
                    <YStack flex={1}>
                      <Text
                        style={{
                          ...Typography.bodyMedium,
                          color: textColor,
                          fontWeight: '600',
                        }}>
                        Privacy Policy & Terms
                      </Text>
                      <Text
                        style={{
                          ...Typography.caption,
                          color: subtextColor,
                        }}>
                        Read our terms of service
                      </Text>
                    </YStack>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={subtextColor}
                    />
                  </XStack>
                </Button>

                <Button
                  unstyled
                  onPress={() => navigation.navigate('AboutScreen')}
                  backgroundColor="transparent"
                  pressStyle={{ opacity: 0.7 }}
                  padding="$3"
                  borderRadius={12}>
                  <XStack alignItems="center" gap="$3" flex={1}>
                    <View
                      backgroundColor={
                        isDarkMode
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.04)'
                      }
                      padding="$2"
                      borderRadius={10}>
                      <Ionicons
                        name="medkit-outline"
                        size={20}
                        color={ProfessionalColors.success}
                      />
                    </View>
                    <YStack flex={1}>
                      <Text
                        style={{
                          ...Typography.bodyMedium,
                          color: textColor,
                          fontWeight: '600',
                        }}>
                        About UltimateHealth
                      </Text>
                      <Text
                        style={{
                          ...Typography.caption,
                          color: subtextColor,
                        }}>
                        Learn about our team and mission
                      </Text>
                    </YStack>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={subtextColor}
                    />
                  </XStack>
                </Button>
              </YStack>
            </GlassContainer>
          </YStack>

          {/* ── Footer ── */}
          <YStack alignItems="center" marginTop="$6" marginBottom="$12" gap="$2">
            <Text
              style={[
                Typography.bodySmall,
                {
                  color: isDarkMode
                    ? ProfessionalColors.gray500
                    : ProfessionalColors.gray600,
                },
              ]}>
              A healthy community is built together
            </Text>
            <Text
              style={[
                Typography.bodyMedium,
                {
                  color: ProfessionalColors.primary,
                  fontWeight: '600',
                },
              ]}>
              ultimate.health25@gmail.com
            </Text>
          </YStack>
        </View>
      </ScrollView>

      <ScrollActionButtons
        topOpacity={topOpacity}
        onScrollToTop={scrollToTop}
        topVisible={topVisible}
        bottomOpacity={bottomOpacity}
        onScrollToBottom={scrollToBottom}
        bottomVisible={bottomVisible}
        buttonColor="#007AFF"
        iconColor="#fff"
      />
    </SafeAreaView>
  );
};

export default CommunityGuidelinesScreen;

const styles = StyleSheet.create({
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
