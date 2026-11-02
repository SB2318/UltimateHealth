/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeOpenUrl } from '../../lib/utils/safeOpenUrl';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Program {
  id: number;
  name: string;
  logo: string;
  description: string;
  date: string;
  type: string;
  link: string;
}

const PROGRAMS: Program[] = [
  {
    id: 4,
    name: 'GirlScript Summer of Code 2026',
    logo: 'https://gssoc.girlscript.org/logo.png',
    description:
      'A nationwide open-source program focused on helping developers contribute to real-world projects through mentorship, collaboration, and community-driven learning.',
    date: 'May 2026 - Aug 2026',
    type: 'Open Source Program',
    link: 'https://gssoc.girlscript.org/',
  },
  {
    id: 1,
    name: 'IEEE IGDTUW Open Source Week',
    logo: 'https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be',
    description:
      'A week-long event aimed at fostering collaboration and skill-building in open-source development.',
    date: 'Nov 12, 2025 - Nov 18, 2025',
    type: 'Community Event',
    link: 'https://github.com/UltimateHealth',
  },
  {
    id: 2,
    name: 'Vultr Cloud Innovate Hackathon',
    logo: 'https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00',
    description:
      "Challenges participants to harness the power of Vultr's cloud infrastructure to develop creative solutions.",
    date: 'Hackathon Initiative',
    type: 'Hackathon',
    link: 'https://github.com/UltimateHealth',
  },
  {
    id: 3,
    name: 'GirlScript Summer of Code 2024',
    logo: 'https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png',
    description:
      'A three-month-long program to bring beginners into Open-Source Software Development.',
    date: 'May 2024 - Aug 2024',
    type: 'Open Source',
    link: 'https://gssoc.girlscript.tech/',
  },
];

interface Licence {
  name: string;
  type: string;
  description: string;
  link: string;
}

const LICENCES: Licence[] = [
  {
    name: 'UltimateHealth Core',
    type: 'MIT Licence',
    description:
      'Copyright (c) 2024-2026 UltimateHealth Contributors. Permission is hereby granted, free of charge, to any person obtaining a copy of this software.',
    link: 'https://github.com/SB2318/UltimateHealth/blob/main/LICENSE',
  },
  {
    name: 'React Native & Expo Ecosystem',
    type: 'MIT Licence',
    description:
      'Built upon open source components from Meta, 650 Industries (Expo), and the React Native community.',
    link: 'https://github.com/facebook/react-native/blob/main/LICENSE',
  },
];

const OpenSourcePage = ({ navigation }: { navigation?: any }) => {
  const isDark = useColorScheme() === 'dark';

  const colors = {
    bg: isDark ? '#0B0F19' : '#F8FAFC',
    headerBg: isDark ? '#111827' : '#FFFFFF',
    cardBg: isDark ? '#1E293B' : '#FFFFFF',
    border: isDark ? '#1F2937' : '#E2E8F0',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    backBtnBg: isDark ? '#1F2937' : '#F1F5F9',
    backBtnIcon: isDark ? '#F8FAFC' : '#0F172A',
    badgeBg: isDark ? '#1E293B' : '#EFF6FF',
    logoBg: isDark ? '#1E293B' : '#FFFFFF',
  };

  const handlePress = (url: string) => {
    safeOpenUrl(url);
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.headerBg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBg}
      />

      {/* ── Professional Navigation Header ── */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: colors.headerBg,
            borderBottomColor: colors.border,
          },
        ]}>
        {navigation && (
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.backBtnBg }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={22} color={colors.backBtnIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Open Source & Licences
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
            numberOfLines={1}>
            Programs, Hackathons & Software Licences
          </Text>
        </View>

        <View
          style={[
            styles.iconPill,
            { backgroundColor: isDark ? '#1E293B' : '#EFF6FF' },
          ]}>
          <FontAwesome5 name="trophy" size={16} color={BUTTON_COLOR} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.bg }]}>
        {/* Banner Section */}
        <View style={styles.bannerWrapper}>
          <View
            style={[
              styles.bannerCard,
              { backgroundColor: colors.cardBg, borderColor: colors.border },
            ]}>
            <View
              style={[
                styles.trophyCircle,
                { backgroundColor: isDark ? '#1E293B' : '#EFF6FF' },
              ]}>
              <Ionicons name="git-branch-outline" size={32} color={BUTTON_COLOR} />
            </View>
            <Text style={[styles.bannerTitle, { color: colors.textPrimary }]}>
              Proudly Open Source
            </Text>
            <Text style={[styles.bannerSubtitle, { color: colors.textSecondary }]}>
              UltimateHealth thrives on community contributions, global open source
              programs, and collaborative mentorship.
            </Text>
          </View>
        </View>

        {/* Section: Programs */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: colors.textSecondary }]}>
            COMMUNITY & HACKATHONS
          </Text>
        </View>

        {PROGRAMS.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={[
              styles.programCard,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handlePress(program.link)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Open ${program.name}`}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: colors.logoBg, borderBottomColor: colors.border },
              ]}>
              <Image
                source={{ uri: program.logo }}
                style={styles.logoImage}
                resizeMode="contain"
                accessibilityLabel={`${program.name} logo`}
              />
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.cardHeaderRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={[styles.programName, { color: colors.textPrimary }]}>
                    {program.name}
                  </Text>
                  <View style={styles.typeRow}>
                    <MaterialIcons name="verified" size={14} color="#10B981" />
                    <Text style={styles.typeText}>{program.type}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.actionIconCircle,
                    { backgroundColor: BUTTON_COLOR },
                  ]}>
                  <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
                </View>
              </View>

              <Text style={[styles.programDescription, { color: colors.textSecondary }]}>
                {program.description}
              </Text>

              <View style={[styles.footerMetaRow, { borderTopColor: colors.border }]}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {program.date}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="globe-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    Online
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Section: Software Licences */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: colors.textSecondary }]}>
            SOFTWARE LICENCES
          </Text>
        </View>

        {LICENCES.map((licence, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.licenceCard,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handlePress(licence.link)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`View licence for ${licence.name}`}>
            <View style={styles.licenceHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.licenceName, { color: colors.textPrimary }]}>
                  {licence.name}
                </Text>
                <View style={styles.licenceBadge}>
                  <Text style={styles.licenceBadgeText}>{licence.type}</Text>
                </View>
              </View>
              <Ionicons name="open-outline" size={18} color={BUTTON_COLOR} />
            </View>

            <Text style={[styles.licenceDescription, { color: colors.textSecondary }]}>
              {licence.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpenSourcePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  iconPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  bannerWrapper: {
    paddingTop: 16,
    marginBottom: 8,
  },
  bannerCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  trophyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  programCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  logoImage: {
    width: '90%',
    height: '100%',
  },
  cardDetails: {
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  programName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  typeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  programDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  footerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  licenceCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  licenceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  licenceName: {
    fontSize: 15,
    fontWeight: '700',
  },
  licenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 82, 186, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  licenceBadgeText: {
    color: BUTTON_COLOR,
    fontSize: 11,
    fontWeight: '700',
  },
  licenceDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
