import React, {useMemo, useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesome5, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {
  Button,
  Card,
  Input,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import {
  futureHealthcareFocus,
  healthcareHeroCategories,
  healthcareQuotes,
  healthcareTimeline,
  HealthcareHero,
} from '../data/healthcareHeroes';
import {HealthcareHeroesScreenProps} from '../type';

const ALL_CATEGORIES = 'All';

const HealthcareHeroesScreen = ({navigation}: HealthcareHeroesScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [nomination, setNomination] = useState('');

  const palette = isDarkMode ? darkPalette : lightPalette;
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...healthcareHeroCategories.map(item => item.category)],
    [],
  );
  const visibleCategories = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? healthcareHeroCategories
        : healthcareHeroCategories.filter(item => item.category === activeCategory),
    [activeCategory],
  );
  const heroCount = healthcareHeroCategories.reduce(
    (total, item) => total + item.heroes.length,
    0,
  );
  const activeQuote = healthcareQuotes[activeQuoteIndex];

  const openContributionMail = () => {
    const subject = encodeURIComponent('Healthcare Heroes nomination');
    const body = encodeURIComponent(
      `Suggested healthcare hero:\n${nomination}\n\nPlease include verified references, contribution area, and regional impact.`,
    );
    Linking.openURL(
      `mailto:ultimate.health25@gmail.com?subject=${subject}&body=${body}`,
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: palette.background}]}>
      <ScrollView
        style={[styles.scrollView, {backgroundColor: palette.background}]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <YStack gap="$5" width="100%" maxWidth={960} alignSelf="center">
          <HeroSection
            palette={palette}
            heroCount={heroCount}
            onBack={() => navigation.goBack()}
          />

          <SectionHeader
            eyebrow="Featured Contributors"
            title="Healthcare Heroes of India"
            subtitle="A respectful, educational archive of doctors, researchers, public health workers, and safety voices whose work shaped care in India."
            palette={palette}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.categoryScroller}>
            {categories.map(category => {
              const selected = activeCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  accessibilityRole="button"
                  accessibilityState={{selected}}
                  accessibilityLabel={`Filter by ${category}`}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: selected ? palette.primary : palette.surface,
                      borderColor: selected ? palette.primary : palette.border,
                    },
                  ]}>
                  <Text
                    fontSize={13}
                    fontWeight="800"
                    color={selected ? '#FFFFFF' : palette.text}>
                    {category === ALL_CATEGORIES ? 'All Heroes' : category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {visibleCategories.map(category => (
            <YStack key={category.category} gap="$3">
              <XStack alignItems="center" justifyContent="space-between" gap="$3">
                <YStack flex={1}>
                  <Text color={palette.text} fontSize={20} fontWeight="900">
                    {category.category}
                  </Text>
                  <Text color={palette.muted} fontSize={13} lineHeight={19}>
                    {category.description}
                  </Text>
                </YStack>
                <View
                  borderRadius={16}
                  paddingHorizontal="$3"
                  paddingVertical="$1.5"
                  backgroundColor={palette.softPrimary}>
                  <Text color={palette.primary} fontWeight="800" fontSize={12}>
                    {category.heroes.length} listed
                  </Text>
                </View>
              </XStack>

              {category.heroes.map(hero => (
                <DoctorCard key={hero.name} hero={hero} palette={palette} />
              ))}
            </YStack>
          ))}

          <TimelineSection palette={palette} />

          <Card
            bordered
            borderRadius={24}
            padding="$5"
            backgroundColor={palette.surface}
            borderColor={palette.border}>
            <YStack gap="$4">
              <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap="$3" flex={1}>
                  <View
                    padding="$2.5"
                    borderRadius={16}
                    backgroundColor={palette.softGreen}>
                    <FontAwesome5 name="quote-left" size={16} color={palette.green} />
                  </View>
                  <Text color={palette.text} fontSize={18} fontWeight="900">
                    Inspiration
                  </Text>
                </XStack>
                <XStack gap="$2">
                  {healthcareQuotes.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      accessibilityRole="button"
                      accessibilityLabel={`Show quote ${index + 1}`}
                      onPress={() => setActiveQuoteIndex(index)}
                      style={[
                        styles.quoteDot,
                        {
                          backgroundColor:
                            activeQuoteIndex === index
                              ? palette.primary
                              : palette.border,
                        },
                      ]}
                    />
                  ))}
                </XStack>
              </XStack>
              <Text color={palette.text} fontSize={22} fontWeight="800" lineHeight={31}>
                {`"${activeQuote.quote}"`}
              </Text>
              <Text color={palette.muted} fontSize={14} fontWeight="700">
                {activeQuote.author}
              </Text>
            </YStack>
          </Card>

          <FutureVisionSection palette={palette} />

          <Card
            bordered
            borderRadius={24}
            padding="$5"
            backgroundColor={palette.surface}
            borderColor={palette.border}>
            <YStack gap="$4">
              <XStack alignItems="center" gap="$3">
                <View
                  padding="$2.5"
                  borderRadius={16}
                  backgroundColor={palette.softPrimary}>
                  <Ionicons name="person-add-outline" size={22} color={palette.primary} />
                </View>
                <YStack flex={1}>
                  <Text color={palette.text} fontSize={20} fontWeight="900">
                    Suggest a Healthcare Hero
                  </Text>
                  <Text color={palette.muted} fontSize={13} lineHeight={19}>
                    Help improve this archive with verified stories, regional impact, and accessibility notes.
                  </Text>
                </YStack>
              </XStack>
              <Input
                value={nomination}
                onChangeText={setNomination}
                placeholder="Name, contribution area, and verified references"
                placeholderTextColor={palette.placeholder}
                color={palette.text}
                backgroundColor={palette.input}
                borderColor={palette.border}
                borderRadius={16}
                minHeight={48}
              />
              <Button
                backgroundColor={palette.primary}
                borderRadius={16}
                color="#FFFFFF"
                fontWeight="900"
                icon={<Ionicons name="mail-outline" size={19} color="#FFFFFF" />}
                onPress={openContributionMail}>
                Submit Suggestion
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const HeroSection = ({
  palette,
  heroCount,
  onBack,
}: {
  palette: typeof lightPalette;
  heroCount: number;
  onBack: () => void;
}) => (
  <Card
    bordered
    borderRadius={24}
    padding="$4"
    backgroundColor={palette.hero}
    borderColor={palette.heroBorder}>
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          style={[styles.iconButton, {backgroundColor: palette.iconSurface}]}>
          <Ionicons name="arrow-back" size={23} color={palette.text} />
        </TouchableOpacity>
        <View
          paddingHorizontal="$3"
          paddingVertical="$1.5"
          borderRadius={20}
          backgroundColor={palette.softGreen}>
          <Text color={palette.green} fontSize={12} fontWeight="900">
            {heroCount} profiles
          </Text>
        </View>
      </XStack>

      <YStack gap="$3">
        <XStack alignItems="center" gap="$3">
          <View padding="$2.5" borderRadius={18} backgroundColor={palette.softPrimary}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={28}
              color={palette.primary}
            />
          </View>
          <View height={2} flex={1} backgroundColor={palette.heartbeat} />
        </XStack>
        <Text color={palette.text} fontSize={30} fontWeight="900" lineHeight={35}>
          Healthcare Heroes of India
        </Text>
        <Text color={palette.muted} fontSize={15} lineHeight={23}>
          Honoring healthcare contributors whose work improved accessibility,
          research, awareness, rural care, public health, and dignity across India.
        </Text>
      </YStack>

      <XStack gap="$3" flexWrap="wrap">
        {['Respect', 'Education', 'Impact'].map(item => (
          <View
            key={item}
            borderRadius={18}
            paddingHorizontal="$3"
            paddingVertical="$2"
            backgroundColor={palette.pill}>
            <Text color={palette.text} fontSize={12} fontWeight="800">
              {item}
            </Text>
          </View>
        ))}
      </XStack>
    </YStack>
  </Card>
);

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  palette,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  palette: typeof lightPalette;
}) => (
  <YStack gap="$2">
    <Text color={palette.primary} fontSize={12} fontWeight="900" letterSpacing={1}>
      {eyebrow.toUpperCase()}
    </Text>
    <Text color={palette.text} fontSize={27} fontWeight="900" lineHeight={32}>
      {title}
    </Text>
    <Text color={palette.muted} fontSize={14} lineHeight={22}>
      {subtitle}
    </Text>
  </YStack>
);

const DoctorCard = ({
  hero,
  palette,
}: {
  hero: HealthcareHero;
  palette: typeof lightPalette;
}) => (
  <Card
    bordered
    borderRadius={18}
    padding="$3.5"
    backgroundColor={palette.surface}
    borderColor={palette.border}
    pressStyle={{scale: 0.99}}>
    <YStack gap="$3">
      <XStack gap="$3" alignItems="center">
        <View
          width={58}
          height={58}
          borderRadius={16}
          alignItems="center"
          justifyContent="center"
          backgroundColor={palette.avatar}>
          <Text color="#FFFFFF" fontSize={18} fontWeight="900">
            {hero.initials}
          </Text>
        </View>
        <YStack flex={1} gap="$1">
          <Text color={palette.text} fontSize={17} fontWeight="900" numberOfLines={2}>
            {hero.name}
          </Text>
          <Text color={palette.primary} fontSize={13} fontWeight="800">
            {hero.specialty}
          </Text>
        </YStack>
        <View
          borderRadius={14}
          paddingHorizontal="$2.5"
          paddingVertical="$1.5"
          backgroundColor={palette.softGreen}>
          <Text color={palette.green} fontSize={11} fontWeight="900">
            {hero.focus}
          </Text>
        </View>
      </XStack>
      <Text color={palette.muted} fontSize={14} lineHeight={21}>
        {hero.summary}
      </Text>
      <YStack gap="$2">
        {hero.notableContributions.map(item => (
          <XStack key={item} gap="$2" alignItems="flex-start">
            <Ionicons name="checkmark-circle" size={17} color={palette.green} />
            <Text color={palette.textSoft} fontSize={13} lineHeight={19} flex={1}>
              {item}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  </Card>
);

const TimelineSection = ({palette}: {palette: typeof lightPalette}) => (
  <YStack gap="$4">
    <SectionHeader
      eyebrow="Impact Timeline"
      title="How contribution becomes change"
      subtitle="A broad view of healthcare progress, from specialist care and research to access, safety, and prevention."
      palette={palette}
    />
    <YStack gap="$3">
      {healthcareTimeline.map((event, index) => (
        <XStack key={`${event.year}-${event.title}`} gap="$3">
          <YStack alignItems="center">
            <View
              width={42}
              height={42}
              borderRadius={16}
              alignItems="center"
              justifyContent="center"
              backgroundColor={palette.primary}>
              <Text color="#FFFFFF" fontSize={11} fontWeight="900">
                {event.year}
              </Text>
            </View>
            {index < healthcareTimeline.length - 1 && (
              <View width={2} flex={1} minHeight={44} backgroundColor={palette.border} />
            )}
          </YStack>
          <Card
            bordered
            flex={1}
            borderRadius={20}
            padding="$4"
            marginBottom="$3"
            backgroundColor={palette.surface}
            borderColor={palette.border}>
            <YStack gap="$2">
              <Text color={palette.primary} fontSize={12} fontWeight="900">
                {event.category}
              </Text>
              <Text color={palette.text} fontSize={17} fontWeight="900">
                {event.title}
              </Text>
              <Text color={palette.muted} fontSize={13} lineHeight={20}>
                {event.description}
              </Text>
            </YStack>
          </Card>
        </XStack>
      ))}
    </YStack>
  </YStack>
);

const FutureVisionSection = ({palette}: {palette: typeof lightPalette}) => (
  <YStack gap="$4">
    <SectionHeader
      eyebrow="Future of Healthcare"
      title="UltimateHealth's path forward"
      subtitle="The page connects tribute with action: better information, safer care environments, and wider access to health knowledge."
      palette={palette}
    />
    <YStack gap="$3">
      {futureHealthcareFocus.map((item, index) => (
        <Card
          key={item}
          bordered
          borderRadius={20}
          padding="$4"
          backgroundColor={palette.surface}
          borderColor={palette.border}>
          <XStack gap="$3" alignItems="flex-start">
            <View
              width={34}
              height={34}
              borderRadius={14}
              alignItems="center"
              justifyContent="center"
              backgroundColor={palette.softPrimary}>
              <Text color={palette.primary} fontWeight="900">
                {index + 1}
              </Text>
            </View>
            <Text color={palette.textSoft} fontSize={14} lineHeight={21} flex={1}>
              {item}
            </Text>
          </XStack>
        </Card>
      ))}
    </YStack>
  </YStack>
);

const lightPalette = {
  background: '#F4FBFF',
  surface: '#FFFFFF',
  hero: '#EAF6FF',
  heroBorder: '#B9E2FF',
  text: '#102033',
  textSoft: '#2C4058',
  muted: '#607086',
  placeholder: '#8EA0B6',
  primary: '#1A91FF',
  green: '#138A64',
  border: '#D8E7F0',
  softPrimary: '#E1F2FF',
  softGreen: '#E1F7EF',
  pill: '#FFFFFF',
  input: '#F8FCFF',
  avatar: '#1A91FF',
  iconSurface: 'rgba(255, 255, 255, 0.85)',
  heartbeat: '#79C7DD',
};

const darkPalette = {
  background: '#081422',
  surface: '#101D2D',
  hero: '#0B2430',
  heroBorder: '#17485B',
  text: '#F4FBFF',
  textSoft: '#D6E5F0',
  muted: '#AABAC8',
  placeholder: '#7D91A5',
  primary: '#39B7EA',
  green: '#50D6A1',
  border: '#244052',
  softPrimary: '#11364C',
  softGreen: '#113D34',
  pill: '#14283A',
  input: '#0E1A29',
  avatar: '#0E89BE',
  iconSurface: 'rgba(255, 255, 255, 0.1)',
  heartbeat: '#39B7EA',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 56,
  },
  horizontalScroll: {
    flexGrow: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryScroller: {
    gap: 10,
    paddingVertical: 4,
    paddingRight: 16,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  quoteDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});

export default HealthcareHeroesScreen;
