import React from 'react';
import {Share, Linking, Image, useColorScheme} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {YStack, XStack, Text, ScrollView, Button, View} from 'tamagui';
import {Ionicons, FontAwesome6} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AboutScreenProps} from '../type';
import {GlassContainer} from '../components/GlassContainer';
import {ProfessionalColors, Typography, Spacing} from '../styles/GlassStyles';
import {useBackToTop} from '../components/BackToTopScrollView';
import {BackToTopButton} from '../components/BackToTopButton';

// ─── Supported Languages ──────────────────────────────────────────────────────
const SUPPORTED_LANGUAGES = [
  {code: 'en', name: 'English', flag: '🇬🇧'},
  {code: 'hi', name: 'Hindi', flag: '🇮🇳'},
  {code: 'es', name: 'Spanish', flag: '🇪🇸'},
  {code: 'fr', name: 'French', flag: '🇫🇷'},
  {code: 'de', name: 'German', flag: '🇩🇪'},
  {code: 'pt', name: 'Portuguese', flag: '🇧🇷'},
  {code: 'ar', name: 'Arabic', flag: '🇸🇦'},
  {code: 'zh', name: 'Chinese', flag: '🇨🇳'},
];

// ─── Community Impact Stats ───────────────────────────────────────────────────
const IMPACT_STATS = [
  {value: '10K+', label: 'Downloads', icon: 'download-outline'},
  {value: '30+', label: 'Contributors', icon: 'people-outline'},
  {value: '8+', label: 'Languages', icon: 'language-outline'},
  {value: '200+', label: 'Articles', icon: 'document-text-outline'},
];

// ─── Future Vision Items ──────────────────────────────────────────────────────
const VISION_ITEMS = [
  {
    icon: 'sparkles-outline',
    title: 'AI-Powered Health Awareness',
    description:
      'Leveraging artificial intelligence to deliver personalised health education tailored to each user\'s language, location, and needs.',
    color: ProfessionalColors.info,
  },
  {
    icon: 'earth-outline',
    title: 'Global Research Collaboration',
    description:
      'Building bridges between medical researchers, students, and communities across borders to accelerate health knowledge sharing.',
    color: '#a855f7',
  },
  {
    icon: 'accessibility-outline',
    title: 'Inclusive Digital Healthcare',
    description:
      'Removing barriers of geography, language, and literacy so every person can access trusted health information with dignity.',
    color: ProfessionalColors.success,
  },
];
// ─── Main Screen ─────────────────────────────────────────────────────────────
const AboutScreen = ({navigation}: AboutScreenProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {onScroll, visible, opacity, scrollToTop} = useBackToTop({
    threshold: 300,
  });
  const currentVersion = VersionCheck.getCurrentVersion();

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Get fit with UltimateHealth 🌿\nYour ultimate wellness companion for a healthier lifestyle.\n\nDownload now:\nhttps://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('URL error', err));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#000A60' : '#F0F8FF',
      }}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        backgroundColor="#007AFF"
      />

      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        flex={1}>
        <View
          flex={1}
          backgroundColor={isDarkMode ? '#000A60' : '#F0F8FF'}
          paddingHorizontal="$4">

          <Text style={{fontSize: 40, color: 'red'}}>
            ABOUT PAGE TEST
          </Text>  

          {/* ── 1. Hero Section ───────────────────────────────────────────── */}
          <YStack alignItems="center" marginTop="$6" marginBottom="$5" gap="$4">
            {/* App Icon */}
            <View
              padding="$3"
              backgroundColor={ProfessionalColors.primaryGlass}
              borderRadius={100}
              borderWidth={2}
              borderColor={ProfessionalColors.primary}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{height: 100, width: 100, borderRadius: 50}}
              />
            </View>

            {/* Title + Version Badge */}
            <YStack alignItems="center" gap="$2">
              <Text
                style={[
                  Typography.h2,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.white
                      : ProfessionalColors.gray900,
                  },
                ]}>
                UltimateHealth
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
                  }}>
                  VERSION {currentVersion}
                </Text>
              </View>
            </YStack>

            {/* Mission Statement */}
            <YStack alignItems="center" gap="$1" marginTop={Spacing.md}>
              <Text
                style={[
                  Typography.h4,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.white
                      : ProfessionalColors.gray900,
                    textAlign: 'center',
                    fontWeight: '700',
                  },
                ]}>
                Empowering Wellness Through Global Community.
              </Text>
              <Text
                style={[
                  Typography.bodySmall,
                  {
                    color: isDarkMode
                      ? ProfessionalColors.gray400
                      : ProfessionalColors.gray600,
                    textAlign: 'center',
                    lineHeight: 20,
                  },
                ]}>
                Making health knowledge accessible across languages and communities.
              </Text>
            </YStack>

            {/* Platform Summary */}
            <GlassContainer variant="card">
              <XStack gap="$3" flexWrap="wrap" justifyContent="center">
                {[
                  {icon: 'book-outline', text: 'Multilingual Articles'},
                  {icon: 'mic-outline', text: 'Health Podcasts'},
                  {icon: 'people-outline', text: 'Open Community'},
                  {icon: 'flask-outline', text: 'Research-Backed'},
                ].map(item => (
                  <XStack
                    key={item.text}
                    alignItems="center"
                    gap="$1"
                    paddingHorizontal="$2"
                    paddingVertical="$1">
                    <Ionicons
                      name={item.icon as any}
                      size={14}
                      color={ProfessionalColors.primary}
                    />
                    <Text
                      style={{
                        color: isDarkMode
                          ? ProfessionalColors.gray300
                          : ProfessionalColors.gray700,
                        fontSize: 12,
                        fontWeight: '600',
                      }}>
                      {item.text}
                    </Text>
                  </XStack>
                ))}
              </XStack>
            </GlassContainer>

            {/* ── Hero CTA Buttons ────────────────────────────────────────── */}
            <XStack gap="$3" marginTop="$2" flexWrap="wrap" justifyContent="center">
              <Button
                minWidth={150}
                justifyContent="center"
                onPress={() =>
                  openLink(
                    'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth',
                  )
                }
                accessibilityLabel="Get the App — opens Play Store"
                accessibilityRole="link"
                backgroundColor={ProfessionalColors.primary}
                borderRadius={14}
                paddingHorizontal="$5"
                paddingVertical="$3"
                pressStyle={{opacity: 0.85}}>
                <XStack alignItems="center" gap="$2">
                  <Ionicons name="download-outline" size={18} color="#fff" />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Get the App
                  </Text>
                </XStack>
              </Button>

              <Button
                onPress={() =>
                  openLink('https://github.com/SB2318/UltimateHealth')
                }
                accessibilityLabel="Contribute on GitHub"
                accessibilityRole="link"
                backgroundColor={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
                borderRadius={14}
                borderWidth={1}
                borderColor={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'}
                paddingHorizontal="$5"
                paddingVertical="$3"
                pressStyle={{opacity: 0.85}}>
                <XStack alignItems="center" gap="$2">
                  <Ionicons
                    name="logo-github"
                    size={18}
                    color={
                      isDarkMode
                        ? ProfessionalColors.white
                        : ProfessionalColors.gray900
                    }
                  />
                  <Text
                    style={{
                      color: isDarkMode
                        ? ProfessionalColors.white
                        : ProfessionalColors.gray900,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Contribute
                  </Text>
                </XStack>
              </Button>
            </XStack>
          </YStack>

          {/* ── 2. Community Impact Stats ─────────────────────────────────── */}
          <YStack marginTop="$2" marginBottom="$2" gap="$3">
            <SectionLabel
              label="COMMUNITY IMPACT"
              isDarkMode={isDarkMode}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
              }}>
              {IMPACT_STATS.map(stat => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  isDarkMode={isDarkMode}
                />
              ))}
            </View>

            {/* Fix 3a: Supported languages chip strip */}
            <GlassContainer variant="card">
              <YStack gap="$2">
                <Text
                  style={[
                    Typography.bodySmall,
                    {
                      color: isDarkMode
                        ? ProfessionalColors.gray400
                        : ProfessionalColors.gray600,
                      fontWeight: '700',
                    },
                  ]}>
                  SUPPORTED LANGUAGES
                </Text>
                <XStack flexWrap="wrap" gap="$2">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <View
                      key={lang.code}
                      backgroundColor={
                        isDarkMode
                          ? 'rgba(0,122,255,0.15)'
                          : 'rgba(0,122,255,0.08)'
                      }
                      borderRadius={20}
                      borderWidth={1}
                      borderColor={
                        isDarkMode
                          ? 'rgba(0,122,255,0.3)'
                          : 'rgba(0,122,255,0.2)'
                      }
                      paddingHorizontal="$2"
                      paddingVertical="$1">
                      <Text
                        style={{
                          color: ProfessionalColors.primary,
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {lang.flag} {lang.name}
                      </Text>
                    </View>
                  ))}
                </XStack>

                {/* Fix 3b: Community growth note */}
                <Text
                  style={[
                    Typography.bodySmall,
                    {
                      color: isDarkMode
                        ? ProfessionalColors.gray400
                        : ProfessionalColors.gray600,
                      lineHeight: 18,
                      marginTop: 4,
                    },
                  ]}>
                  Participated in GSoC, GirlScript Summer of Code, and Social
                  Winter of Code. Growing with every contributor.
                </Text>
              </YStack>
            </GlassContainer>
          </YStack>

          {/* ── 3. Why We Exist ──────────────────────────────────────────── */}
          <ContentSection
            title="WHY WE EXIST"
            content="Reliable health education is still inaccessible to millions due to language barriers, fragmented resources, and unequal access to trusted information. UltimateHealth was created to bridge this gap by building an open, multilingual, and community-driven ecosystem where health awareness is accessible to everyone — regardless of geography, language, or background."
            isDarkMode={isDarkMode}
          />

          {/* ── 4. Our Purpose (Audience Breakdown) ─────────────────────── */}
          <YStack marginTop="$5" gap="$3">
            <SectionLabel label="OUR PURPOSE" isDarkMode={isDarkMode} />
            <YStack gap="$3">
              <PurposeCard
                icon="globe-outline"
                title="For General Users"
                description="Access a rich library of multilingual educational content, explore articles and podcasts, and navigate your personal health journey with trusted, community-reviewed knowledge."
                iconColor={ProfessionalColors.info}
                isDarkMode={isDarkMode}
              />
              <PurposeCard
                icon="code-slash-outline"
                title="For Developers"
                description="Contribute to real-world open-source infrastructure. Learn scalable HealthTech architecture, participate in impactful community projects, and build systems that drive global health equity."
                iconColor="#a855f7"
                isDarkMode={isDarkMode}
              />
              <PurposeCard
                icon="medkit-outline"
                title="For Medical Students & Researchers"
                description="Publish awareness content, collaborate on educational initiatives, and reach broader communities worldwide through our open technology platform."
                iconColor={ProfessionalColors.success}
                isDarkMode={isDarkMode}
              />
            </YStack>
          </YStack>

          {/* ── 5. Open Source & Community ───────────────────────────────── */}
          <ContentSection
            title="OPEN SOURCE & COMMUNITY"
            content="UltimateHealth exists at the intersection of healthcare awareness, technology, and open-source collaboration. Developers, contributors, medical learners, and researchers work together to improve multilingual health education, build scalable HealthTech systems, and expand access to trusted knowledge globally. By combining community participation with technology, UltimateHealth grows into a shared ecosystem for accessible and inclusive healthcare education."
            isDarkMode={isDarkMode}
          />

          {/* ── 6. Future Vision ─────────────────────────────────────────── */}
          <YStack marginTop="$5" gap="$3">
            <SectionLabel label="FUTURE VISION" isDarkMode={isDarkMode} />
            <YStack gap="$3">
              {VISION_ITEMS.map(item => (
                <PurposeCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconColor={item.color}
                  isDarkMode={isDarkMode}
                />
              ))}
            </YStack>
          </YStack>

          {/* ── 7. Community & Links ─────────────────────────────────────── */}
          <YStack marginTop="$5" gap="$3">
            <SectionLabel
              label="COMMUNITY & PROGRAMS"
              isDarkMode={isDarkMode}
            />
            <GlassContainer variant="card">
              <YStack gap="$2">
                <MenuButton
                  icon="share-social-outline"
                  title="Share App"
                  iconColor={ProfessionalColors.info}
                  onPress={onShare}
                  isDarkMode={isDarkMode}
                />
                <MenuButton
                  icon="people-outline"
                  title="Contributors"
                  iconColor="#a855f7"
                  onPress={() => navigation.navigate('ContributorPage')}
                  isDarkMode={isDarkMode}
                />
                <MenuButton
                  icon="logo-github"
                  title="Open Source Programs"
                  iconColor="#06402B"
                  onPress={() => navigation.navigate('OpenSourcePage')}
                  isDarkMode={isDarkMode}
                />
                <MenuButton
                  icon="star-outline"
                  title="Rate App"
                  iconColor={ProfessionalColors.warning}
                  onPress={() =>
                    openLink(
                      'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth',
                    )
                  }
                  isDarkMode={isDarkMode}
                />
              </YStack>
            </GlassContainer>
          </YStack>

          {/* ── 8. Legal ─────────────────────────────────────────────────── */}
          <YStack marginTop="$5" gap="$3">
            <SectionLabel label="LEGAL" isDarkMode={isDarkMode} />
            <GlassContainer variant="card">
              <YStack gap="$2">
                <MenuButton
                  icon="document-text-outline"
                  title="Terms & Conditions"
                  iconColor={ProfessionalColors.primary}
                  onPress={() => navigation.navigate('Privacy')}
                  isDarkMode={isDarkMode}
                />
                <MenuButton
                  icon="shield-checkmark-outline"
                  title="Privacy Policy"
                  iconColor={ProfessionalColors.success}
                  onPress={() =>
                    openLink(
                      'https://www.freeprivacypolicy.com/live/0b40215e-e456-48cc-a549-424216da1e01',
                    )
                  }
                  isDarkMode={isDarkMode}
                />
              </YStack>
            </GlassContainer>
          </YStack>

          {/* ── Social Links ──────────────────────────────────────────────── */}
          <YStack alignItems="center" marginTop="$6" marginBottom="$4" gap="$4">
            <Text
              style={[
                Typography.bodySmall,
                {
                  color: isDarkMode
                    ? ProfessionalColors.gray400
                    : ProfessionalColors.gray600,
                  fontWeight: '700',
                },
              ]}>
              CONNECT WITH US
            </Text>

            <XStack gap="$4">
              <SocialCircle
                icon="github"
                label="GitHub repository"
                onPress={() =>
                  openLink('https://github.com/SB2318/UltimateHealth')
                }
                isDarkMode={isDarkMode}
              />
              <SocialCircle
                icon="linkedin"
                label="LinkedIn profile"
                onPress={() =>
                  openLink(
                    'https://linkedin.com/in/ultimatehealth-9290873a8/',
                  )
                }
                isDarkMode={isDarkMode}
              />
              <SocialCircle
                icon="envelope"
                label="Send email"
                onPress={() =>
                  openLink('mailto:ultimate.health25@gmail.com')
                }
                isDarkMode={isDarkMode}
              />
            </XStack>
          </YStack>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <YStack
            alignItems="center"
            marginTop="$4"
            marginBottom="$11"
            gap="$2">
            <Text
              style={[
                Typography.bodySmall,
                {
                  color: isDarkMode
                    ? ProfessionalColors.gray500
                    : ProfessionalColors.gray600,
                },
              ]}>
              Built for accessible global health education
            </Text>
            <Text
              style={[
                Typography.bodyMedium,
                {color: ProfessionalColors.primary, fontWeight: '600'},
              ]}>
              ultimate.health25@gmail.com
            </Text>
          </YStack>
        </View>
      </ScrollView>

      <BackToTopButton
        opacity={opacity}
        onPress={scrollToTop}
        visible={visible}
        buttonColor="#007AFF"
        iconColor="#fff"
      />
    </SafeAreaView>
  );
};

// ─── Reusable: Section Label ──────────────────────────────────────────────────
const SectionLabel = ({
  label,
  isDarkMode,
}: {
  label: string;
  isDarkMode: boolean;
}) => (
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
    {label}
  </Text>
);

// ─── Reusable: Community Impact Stat Card ─────────────────────────────────────
const StatCard = ({
  value,
  label,
  icon,
  isDarkMode,
}: {
  value: string;
  label: string;
  icon: string;
  isDarkMode: boolean;
}) => (
  <GlassContainer
    variant="card"
    style={{flex: 1, minWidth: '45%', alignItems: 'center'}}>
    <Ionicons
      name={icon as any}
      size={22}
      color={ProfessionalColors.primary}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
    <Text
      style={{
        color: isDarkMode
          ? ProfessionalColors.white
          : ProfessionalColors.gray900,
        fontSize: 22,
        fontWeight: '800',
        marginTop: 4,
      }}>
      {value}
    </Text>
    <Text
      style={[
        Typography.bodySmall,
        {
          color: isDarkMode
            ? ProfessionalColors.gray400
            : ProfessionalColors.gray600,
        },
      ]}>
      {label}
    </Text>
  </GlassContainer>
);

// ─── Reusable: Text Content Section ──────────────────────────────────────────
const ContentSection = ({
  title,
  content,
  isDarkMode,
}: {
  title: string;
  content: string;
  isDarkMode: boolean;
}) => (
  <YStack marginTop="$5" gap="$3">
    <SectionLabel label={title} isDarkMode={isDarkMode} />
    <GlassContainer variant="card">
      <Text
        style={[
          Typography.body,
          {
            color: isDarkMode
              ? ProfessionalColors.gray300
              : ProfessionalColors.gray700,
            lineHeight: 24,
          },
        ]}>
        {content}
      </Text>
    </GlassContainer>
  </YStack>
);

// ─── Reusable: Audience Purpose Card ─────────────────────────────────────────
const PurposeCard = ({
  icon,
  title,
  description,
  iconColor,
  isDarkMode,
}: {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
  isDarkMode: boolean;
}) => (
  <GlassContainer variant="card">
    <XStack alignItems="flex-start" gap="$3">
      <View
        backgroundColor={
          isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }
        padding="$2"
        borderRadius={10}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      <YStack flex={1} gap="$1">
        <Text
          style={[
            Typography.bodyMedium,
            {
              color: isDarkMode
                ? ProfessionalColors.white
                : ProfessionalColors.gray900,
              fontWeight: '700',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            Typography.bodySmall,
            {
              color: isDarkMode
                ? ProfessionalColors.gray400
                : ProfessionalColors.gray600,
              lineHeight: 20,
            },
          ]}>
          {description}
        </Text>
      </YStack>
    </XStack>
  </GlassContainer>
);

// ─── Reusable: Menu Button ────────────────────────────────────────────────────
const MenuButton = ({
  icon,
  title,
  iconColor,
  onPress,
  isDarkMode,
}: {
  icon: string;
  title: string;
  iconColor: string;
  onPress: () => void;
  isDarkMode: boolean;
}) => (
  <Button
    unstyled
    onPress={onPress}
    accessibilityLabel={title}
    accessibilityRole="button"
    backgroundColor="transparent"
    pressStyle={{opacity: 0.7}}
    padding="$3"
    borderRadius={12}>
    <XStack alignItems="center" gap="$3" flex={1}>
      <View
        backgroundColor={
          isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }
        padding="$2"
        borderRadius={10}>
        <Ionicons
          name={icon as any}
          size={22}
          color={iconColor}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      </View>
      <Text
        style={[
          Typography.bodyMedium,
          {
            color: isDarkMode
              ? ProfessionalColors.white
              : ProfessionalColors.gray800,
            flex: 1,
          },
        ]}>
        {title}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={
          isDarkMode ? ProfessionalColors.gray500 : ProfessionalColors.gray600
        }
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
    </XStack>
  </Button>
);

// ─── Reusable: Social Circle ──────────────────────────────────────────────────
const SocialCircle = ({
  icon,
  onPress,
  isDarkMode,
  label,
}: {
  icon: string;
  onPress: () => void;
  isDarkMode: boolean;
  label: string;
}) => (
  <Button
    circular
    size="$5"
    backgroundColor={
      isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
    }
    borderWidth={1}
    borderColor={
      isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
    }
    onPress={onPress}
    accessibilityLabel={label}
    accessibilityRole="link"
    pressStyle={{
      scale: 0.95,
      backgroundColor: isDarkMode
        ? 'rgba(255,255,255,0.15)'
        : 'rgba(0,0,0,0.1)',
    }}>
    <FontAwesome6
      name={icon as any}
      size={22}
      color={
        isDarkMode ? ProfessionalColors.white : ProfessionalColors.gray800
      }
    />
  </Button>
);

export default AboutScreen;