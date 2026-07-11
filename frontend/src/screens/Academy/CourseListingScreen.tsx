import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_BORDER, ACADEMY_SURFACE } from '../../helper/Theme';
import { ACADEMY_COURSES } from '../../helper/AcademyMockData';
import CourseCard from '../../components/Academy/CourseCard';

const CATEGORIES = ['All', 'Fundamentals', 'Patient Care', 'Departments', 'Technology'];

const CourseListingScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = ACADEMY_COURSES.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Browse Courses</Text>
        <View style={{ width: 24 }} /> {/* placeholder for balance */}
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color={ACADEMY_TEXT_SECONDARY} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, departments..."
          placeholderTextColor={ACADEMY_TEXT_SECONDARY}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, activeCategory === category && styles.categoryChipActive]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.courseList} contentContainerStyle={styles.courseListContent}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })} 
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="book-search-outline" size={64} color={ACADEMY_BORDER} />
            <Text style={styles.emptyStateText}>No courses found.</Text>
          </View>
        )}
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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ACADEMY_SURFACE,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: ACADEMY_TEXT_PRIMARY,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: ACADEMY_SURFACE,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
  },
  categoryChipActive: {
    backgroundColor: ACADEMY_PRIMARY,
    borderColor: ACADEMY_PRIMARY,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: ACADEMY_TEXT_SECONDARY,
  },
  categoryTextActive: {
    color: '#fff',
  },
  courseList: {
    flex: 1,
  },
  courseListContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: ACADEMY_TEXT_SECONDARY,
  }
});

export default CourseListingScreen;
