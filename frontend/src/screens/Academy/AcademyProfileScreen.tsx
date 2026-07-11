import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../helper/Theme';
import { ACADEMY_USER_STATS } from '../../helper/AcademyMockData';

const AcademyProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learner Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="cog-outline" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={48} color={ACADEMY_PRIMARY} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.level}>Level 5 • Healthcare Enthusiast</Text>
          
          <View style={styles.xpBarContainer}>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, { width: '70%' }]} />
            </View>
            <Text style={styles.xpText}>700 / 1000 XP to next level</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <Text style={styles.sectionTitle}>Learning Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="clock-outline" size={28} color={ACADEMY_PRIMARY} />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.hoursLearned}h</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="fire" size={28} color="#F59E0B" />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="book-check-outline" size={28} color={ACADEMY_PRIMARY} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="certificate-outline" size={28} color={ACADEMY_PRIMARY} />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.certificatesEarned}</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Achievements / Badges */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.badgesContainer}>
          {ACADEMY_USER_STATS.badges.map((badge, index) => (
            <View key={index} style={styles.badgeItem}>
              <View style={styles.badgeIcon}>
                <MaterialCommunityIcons name="star-shooting-outline" size={32} color="#F59E0B" />
              </View>
              <Text style={styles.badgeName}>{badge}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ACADEMY_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ACADEMY_SURFACE,
    borderBottomWidth: 1,
    borderBottomColor: ACADEMY_BORDER,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: ACADEMY_SURFACE,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: ACADEMY_TEXT_SECONDARY,
    marginBottom: 16,
  },
  xpBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  xpBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: ACADEMY_PRIMARY,
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    color: ACADEMY_TEXT_SECONDARY,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    backgroundColor: ACADEMY_SURFACE,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: ACADEMY_TEXT_SECONDARY,
    marginTop: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: ACADEMY_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
    textAlign: 'center',
  }
});

export default AcademyProfileScreen;
