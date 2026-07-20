import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ACADEMY_BACKGROUND, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_PRIMARY } from '../../helper/Theme';
import { ACADEMY_COURSES, ACADEMY_USER_STATS } from '../../helper/AcademyMockData';
import ProgressCard from '../../components/Academy/ProgressCard';
import CourseCard from '../../components/Academy/CourseCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AcademyHomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hospital Learning Academy</Text>
            <Text style={styles.subtitle}>Learn how hospitals actually work.</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('AcademyProfile')}>
            <MaterialCommunityIcons name="account-circle" size={36} color={ACADEMY_PRIMARY} />
          </TouchableOpacity>
        </View>

        {/* User Stats/Progress */}
        <ProgressCard progress={45} label="Overall Progress" />

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={ACADEMY_PRIMARY} />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.hoursLearned}h</Text>
            <Text style={styles.statLabel}>Learned</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="fire" size={24} color="#F59E0B" />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="certificate-outline" size={24} color={ACADEMY_PRIMARY} />
            <Text style={styles.statValue}>{ACADEMY_USER_STATS.certificatesEarned}</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('CourseListing')}
          >
            <Text style={styles.primaryButtonText}>Browse Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('HospitalMap')}
          >
            <MaterialCommunityIcons name="map-marker-radius" size={20} color={ACADEMY_PRIMARY} />
            <Text style={styles.secondaryButtonText}>Hospital Map</Text>
          </TouchableOpacity>
        </View>

        {/* Recent/Recommended Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {ACADEMY_COURSES.slice(0, 2).map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })} 
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ACADEMY_BACKGROUND,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: ACADEMY_TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 14,
    color: ACADEMY_TEXT_SECONDARY,
    marginTop: 4,
  },
  profileIcon: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: ACADEMY_TEXT_SECONDARY,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: ACADEMY_PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: ACADEMY_PRIMARY,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
  seeAll: {
    color: ACADEMY_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AcademyHomeScreen;
