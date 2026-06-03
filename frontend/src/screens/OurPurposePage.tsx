import React from 'react';
import { ScrollView, Linking, useColorScheme } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Card,
  Theme,
  Button,
  Separator,
  Circle,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { OurPurposeScreenProps } from '../type';

const stats = [
  { icon: 'users', label: 'Contributors', value: '45+' },
  { icon: 'language', label: 'Languages Supported', value: '10+' },
  { icon: 'article', label: 'Articles & Podcasts', value: '500+' },
  { icon: 'code-braces', label: 'Open Source Programs', value: '4' },
];

const audiences = [
  {
    icon: 'earth',
    title: 'For General Users',
    items: [
      'Access reliable health knowledge in your language',
      'Learn through podcasts, articles, and multilingual content',
      'Stay informed with community-verified health insights',
    ],
    color: '#00BFFF',
  },
  {
    icon: 'code-tags',
    title: 'For Developers',
    items: [
      'Contribute to real-world HealthTech open-source infrastructure',
      'Build scalable architecture and learn production patterns',
      'Participate in impactful global community projects',
    ],
    color: '#10B981',
  },
  {
    icon: 'school',
    title: 'For Medical Students & Researchers',
    items: [
      'Publish health awareness content to a global audience',
      'Collaborate on multilingual educational initiatives',
      'Bridge the gap between research and community access',
    ],
    color: '#8B5CF6',
  },
];

const futurePoints = [
  {
    icon: 'robot',
    title: 'AI in Healthcare Awareness',
    desc: 'Leverage artificial intelligence to personalize health education and break down complex medical concepts.',
  },
  {
    icon: 'flask',
    title: 'Research Collaboration',
    desc: 'Partner with institutions to bring peer-reviewed research directly into accessible community content.',
  },
  {
    icon: 'translate',
    title: 'Multilingual Accessibility',
    desc: 'Expand language coverage so no one is left behind — health knowledge in every major language.',
  },
  {
    icon: 'globe-model',
    title: 'Global Health Education Ecosystem',
    desc: 'Build a self-sustaining ecosystem where communities create, review, and share health knowledge.',
  },
  {
    icon: 'hand-extended',
    title: 'Inclusive Digital Healthcare',
    desc: 'Design for accessibility first — ensuring the platform serves every ability, region, and background.',
  },
];

const OurPurposePage = ({ navigation }: OurPurposeScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bg = isDark ? '#000A60' : '#F0F8FF';
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'white';
  const textColor = isDark ? '#FFFFFF' : '#1A202C';
  const subTextColor = isDark ? '#94A3B8' : '#4A5568';

  const openLink = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <Theme name="light">
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ===== 1. HERO SECTION ===== */}
          <YStack
            backgroundColor="#1A91FF"
            padding="$8"
            paddingTop="$10"
            borderBottomLeftRadius={40}
            borderBottomRightRadius={40}
            gap="$4"
          >
            <YStack alignItems="center" gap="$3">
              <Circle size={80} backgroundColor="rgba(255,255,255,0.2)">
                <FontAwesome5 name="heartbeat" size={36} color="white" />
              </Circle>
              <Text
                fontSize={28}
                fontWeight="900"
                color="white"
                textAlign="center"
                letterSpacing={-0.5}
              >
                Empowering Wellness
              </Text>
              <Text
                fontSize={28}
                fontWeight="900"
                color="white"
                textAlign="center"
                letterSpacing={-0.5}
                marginTop={-12}
              >
                Through Global Community
              </Text>
              <Text
                fontSize={15}
                color="rgba(255,255,255,0.85)"
                textAlign="center"
                lineHeight={22}
                maxWidth={320}
              >
                Making health knowledge accessible across languages and
                communities — powered by open source.
              </Text>
            </YStack>

            <XStack gap="$3" justifyContent="center" marginTop="$2">
              <Button
                backgroundColor="white"
                borderRadius={14}
                paddingHorizontal="$6"
                height={48}
                pressStyle={{ opacity: 0.85 }}
                onPress={() =>
                  openLink('https://github.com/SB2318/UltimateHealth')
                }
              >
                <Text fontWeight="700" color="#1A91FF" fontSize={15}>
                  Contribute
                </Text>
              </Button>
              <Button
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={14}
                paddingHorizontal="$6"
                height={48}
                borderWidth={1}
                borderColor="rgba(255,255,255,0.3)"
                pressStyle={{ opacity: 0.85 }}
                onPress={() => navigation.goBack()}
              >
                <Text fontWeight="600" color="white" fontSize={15}>
                  Explore
                </Text>
              </Button>
            </XStack>
          </YStack>

          {/* ===== 2. WHY ULTIMATEHEALTH WAS CREATED ===== */}
          <YStack padding="$6" gap="$4">
            <YStack alignItems="center" gap="$2">
              <Text fontSize={22} fontWeight="800" color={textColor}>
                Why UltimateHealth Was Created
              </Text>
              <Separator
                borderWidth={2}
                width={50}
                borderColor="#1A91FF"
                borderRadius={10}
              />
            </YStack>

            <Card
              backgroundColor={cardBg}
              borderRadius={20}
              padding="$5"
              elevate
              bordered
            >
              <YStack gap="$4">
                <ReasonRow
                  icon="eye-off-outline"
                  text="Health education remains inaccessible to millions due to paywalls, language barriers, and regional restrictions."
                  color="#EF4444"
                  isDark={isDark}
                />
                <ReasonRow
                  icon="language-outline"
                  text="Critical health information is often available only in English, leaving non-English speakers underserved."
                  color="#F59E0B"
                  isDark={isDark}
                />
                <ReasonRow
                  icon="people-outline"
                  text="Centralized health platforms lack community input; we believe the people who use health knowledge should help shape it."
                  color="#3B82F6"
                  isDark={isDark}
                />
                <ReasonRow
                  icon="bulb-outline"
                  text="Open-source collaboration can produce higher-quality, more up-to-date health resources than any single organization."
                  color="#10B981"
                  isDark={isDark}
                />
              </YStack>
            </Card>
          </YStack>

          {/* ===== 3. OUR PURPOSE ===== */}
          <YStack paddingHorizontal="$6" paddingBottom="$2" gap="$4">
            <YStack alignItems="center" gap="$2">
              <Text fontSize={22} fontWeight="800" color={textColor}>
                Our Purpose
              </Text>
              <Separator
                borderWidth={2}
                width={50}
                borderColor="#1A91FF"
                borderRadius={10}
              />
              <Text
                fontSize={14}
                color={subTextColor}
                textAlign="center"
                maxWidth={300}
              >
                UltimateHealth serves different communities in unique ways
              </Text>
            </YStack>

            {audiences.map((audience, idx) => (
              <Card
                key={idx}
                backgroundColor={cardBg}
                borderRadius={20}
                padding="$5"
                elevate
                bordered
                borderLeftWidth={4}
                borderLeftColor={audience.color}
              >
                <YStack gap="$3">
                  <XStack alignItems="center" gap="$3">
                    <Circle size={44} backgroundColor={`${audience.color}20`}>
                      <MaterialCommunityIcons
                        name={audience.icon as any}
                        size={22}
                        color={audience.color}
                      />
                    </Circle>
                    <Text fontSize={18} fontWeight="700" color={textColor}>
                      {audience.title}
                    </Text>
                  </XStack>
                  <YStack gap="$2" paddingLeft="$2">
                    {audience.items.map((item, i) => (
                      <XStack key={i} gap="$2" alignItems="flex-start">
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={audience.color}
                          style={{ marginTop: 2 }}
                        />
                        <Text fontSize={14} color={subTextColor} flex={1}>
                          {item}
                        </Text>
                      </XStack>
                    ))}
                  </YStack>
                </YStack>
              </Card>
            ))}
          </YStack>

          {/* ===== 4. OPEN SOURCE & COMMUNITY VISION ===== */}
          <YStack padding="$6" gap="$4">
            <YStack alignItems="center" gap="$2">
              <Text fontSize={22} fontWeight="800" color={textColor}>
                Open Source & Community Vision
              </Text>
              <Separator
                borderWidth={2}
                width={50}
                borderColor="#1A91FF"
                borderRadius={10}
              />
            </YStack>

            <Card
              backgroundColor={cardBg}
              borderRadius={20}
              padding="$5"
              elevate
              bordered
            >
              <YStack gap="$4">
                <VisionRow
                  icon="code-fork"
                  text="Fully open-source infrastructure — anyone can inspect, modify, and improve the platform."
                  isDark={isDark}
                />
                <VisionRow
                  icon="people-group"
                  text="Community-driven content curation ensures accuracy, relevance, and cultural sensitivity."
                  isDark={isDark}
                />
                <VisionRow
                  icon="globe"
                  text="Global participation from developers, medical professionals, and educators across 10+ languages."
                  isDark={isDark}
                />
                <VisionRow
                  icon="hand-peace"
                  text="Inclusive contribution culture — from first-time open source contributors to seasoned maintainers."
                  isDark={isDark}
                />
              </YStack>
            </Card>
          </YStack>

          {/* ===== 5. FUTURE VISION ===== */}
          <YStack paddingHorizontal="$6" paddingBottom="$2" gap="$4">
            <YStack alignItems="center" gap="$2">
              <Text fontSize={22} fontWeight="800" color={textColor}>
                Future Vision
              </Text>
              <Separator
                borderWidth={2}
                width={50}
                borderColor="#1A91FF"
                borderRadius={10}
              />
            </YStack>

            {futurePoints.map((point, idx) => (
              <XStack key={idx} gap="$3" alignItems="flex-start">
                <Circle size={44} backgroundColor="rgba(26, 145, 255, 0.12)">
                  <MaterialCommunityIcons
                    name={point.icon as any}
                    size={22}
                    color="#1A91FF"
                  />
                </Circle>
                <YStack flex={1} gap="$1">
                  <Text fontSize={16} fontWeight="700" color={textColor}>
                    {point.title}
                  </Text>
                  <Text fontSize={14} color={subTextColor} lineHeight={20}>
                    {point.desc}
                  </Text>
                </YStack>
              </XStack>
            ))}
          </YStack>

          {/* ===== 6. COMMUNITY IMPACT ===== */}
          <YStack padding="$6" gap="$4">
            <YStack alignItems="center" gap="$2">
              <Text fontSize={22} fontWeight="800" color={textColor}>
                Community Impact
              </Text>
              <Separator
                borderWidth={2}
                width={50}
                borderColor="#1A91FF"
                borderRadius={10}
              />
            </YStack>

            <Card
              backgroundColor={cardBg}
              borderRadius={20}
              padding="$5"
              elevate
              bordered
            >
              <YStack gap="$4">
                <Text
                  fontSize={14}
                  color={subTextColor}
                  textAlign="center"
                  lineHeight={20}
                >
                  UltimateHealth has grown through the collective effort of
                  contributors and participants in global open source programs.
                </Text>
                <XStack flexWrap="wrap" gap="$3" justifyContent="center">
                  {stats.map((stat, idx) => (
                    <YStack
                      key={idx}
                      width="46%"
                      backgroundColor={`${bg}`}
                      borderRadius={16}
                      padding="$4"
                      alignItems="center"
                      gap="$1"
                      borderWidth={1}
                      borderColor={
                        isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.05)'
                      }
                    >
                      <MaterialCommunityIcons
                        name={stat.icon as any}
                        size={28}
                        color="#1A91FF"
                      />
                      <Text
                        fontSize={22}
                        fontWeight="800"
                        color="#1A91FF"
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontSize={12}
                        color={subTextColor}
                        textAlign="center"
                      >
                        {stat.label}
                      </Text>
                    </YStack>
                  ))}
                </XStack>
              </YStack>
            </Card>

            <Card
              backgroundColor={cardBg}
              borderRadius={20}
              padding="$5"
              elevate
              bordered
            >
              <YStack gap="$3" alignItems="center">
                <Text fontSize={16} fontWeight="700" color={textColor}>
                  Participated Programs
                </Text>
                <XStack gap="$2" flexWrap="wrap" justifyContent="center">
                  {['GSSoC 2024', 'GSSoC 2026', 'IEEE Week', 'Vultr Hackathon'].map(
                    (prog, idx) => (
                      <YStack
                        key={idx}
                        backgroundColor="rgba(26, 145, 255, 0.12)"
                        paddingHorizontal="$3"
                        paddingVertical="$1.5"
                        borderRadius={20}
                      >
                        <Text fontSize={12} fontWeight="600" color="#1A91FF">
                          {prog}
                        </Text>
                      </YStack>
                    ),
                  )}
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* FOOTER */}
          <YStack padding="$6" paddingBottom="$10" alignItems="center" gap="$3">
            <Separator
              borderWidth={1}
              width={80}
              borderColor={
                isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
              }
            />
            <Text fontSize={13} color={subTextColor} textAlign="center">
              Built with passion for global health accessibility
            </Text>
            <XStack gap="$4">
              <Circle
                size={40}
                backgroundColor="rgba(26, 145, 255, 0.12)"
                pressStyle={{ opacity: 0.7 }}
                onPress={() =>
                  openLink('https://github.com/SB2318/UltimateHealth')
                }
              >
                <FontAwesome5 name="github" size={20} color="#1A91FF" />
              </Circle>
              <Circle
                size={40}
                backgroundColor="rgba(26, 145, 255, 0.12)"
                pressStyle={{ opacity: 0.7 }}
                onPress={() =>
                  openLink(
                    'https://linkedin.com/in/ultimate-health-9290873a8/',
                  )
                }
              >
                <FontAwesome5 name="linkedin" size={20} color="#1A91FF" />
              </Circle>
              <Circle
                size={40}
                backgroundColor="rgba(26, 145, 255, 0.12)"
                pressStyle={{ opacity: 0.7 }}
                onPress={() =>
                  openLink('mailto:ultimate.health25@gmail.com')
                }
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color="#1A91FF"
                />
              </Circle>
            </XStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Theme>
  );
};

const ReasonRow = ({
  icon,
  text,
  color,
  isDark,
}: {
  icon: string;
  text: string;
  color: string;
  isDark: boolean;
}) => (
  <XStack gap="$3" alignItems="flex-start">
    <Circle size={36} backgroundColor={`${color}15`}>
      <Ionicons name={icon as any} size={18} color={color} />
    </Circle>
    <Text fontSize={14} color={isDark ? '#CBD5E0' : '#4A5568'} flex={1} lineHeight={20}>
      {text}
    </Text>
  </XStack>
);

const VisionRow = ({
  icon,
  text,
  isDark,
}: {
  icon: string;
  text: string;
  isDark: boolean;
}) => (
  <XStack gap="$3" alignItems="flex-start">
    <Circle size={36} backgroundColor="rgba(26, 145, 255, 0.12)">
      <FontAwesome5 name={icon as any} size={16} color="#1A91FF" />
    </Circle>
    <Text fontSize={14} color={isDark ? '#CBD5E0' : '#4A5568'} flex={1} lineHeight={20}>
      {text}
    </Text>
  </XStack>
);

export default OurPurposePage;
