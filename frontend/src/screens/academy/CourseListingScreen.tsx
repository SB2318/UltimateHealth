import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  ACADEMY_BACKGROUND,
  ACADEMY_PRIMARY,
  ACADEMY_TEXT_PRIMARY,
  ACADEMY_TEXT_SECONDARY,
  ACADEMY_BORDER,
  ACADEMY_SURFACE,
} from '../../lib/ui/Theme';
import {ACADEMY_COURSES} from '../../lib/utils/AcademyMockData';
import CourseCard from '../../components/academy/CourseCard';
import CourseSkeletonCard from '../../components/academy/CourseSkeletonCard';

// Number of placeholder cards shown while course data is loading.
const SKELETON_COUNT = 5;

// Simulated fetch latency for the (currently local/mock) course data — this
// stands in for the real network delay once courses are served from an API.
const MOCK_FETCH_DELAY_MS = 600;

const CATEGORIES = [
  'All',
  'Fundamentals',
  'Patient Care',
  'Departments',
  'Technology',
];

const CourseListingScreen = ({navigation}: any) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      MOCK_FETCH_DELAY_MS,
    );

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim]);

  const filteredCourses = ACADEMY_COURSES.filter(course => {
    const matchesCategory =
      activeCategory === 'All' || course.category === activeCategory;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen">
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={ACADEMY_TEXT_PRIMARY}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Browse Courses</Text>

        <View style={{width: 24}} />
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={ACADEMY_TEXT_SECONDARY}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, departments..."
          placeholderTextColor={ACADEMY_TEXT_SECONDARY}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search courses"
          accessibilityHint="Enter text to search for courses or departments"
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                activeCategory === category &&
                  styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(category)}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${category}`}
              accessibilityState={{
                selected: activeCategory === category,
              }}
              accessibilityHint={`Shows courses in the ${category} category`}>
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category &&
                    styles.categoryTextActive,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.courseList}
        contentContainerStyle={styles.courseListContent}>
        {isLoading ? (
          Array.from({length: SKELETON_COUNT}).map((_, i) => (
            <CourseSkeletonCard key={`course-skeleton-${i}`} />
          ))
        ) : (
          <Animated.View style={{opacity: fadeAnim}}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPress={() =>
                    navigation.navigate('CourseDetail', {
                      courseId: course.id,
                    })
                  }
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="book-search-outline"
                  size={64}
                  color={ACADEMY_BORDER}
                />
                <Text style={styles.emptyStateText}>
                  No courses found.
                </Text>
              </View>
            )}
          </Animated.View>
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
  },
});

export default CourseListingScreen;