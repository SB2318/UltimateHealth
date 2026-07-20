import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../lib/ui/Theme';
import { ACADEMY_COURSES } from '../../lib/utils/AcademyMockData';

const CourseDetailScreen = ({ route, navigation }: any) => {
  const { courseId } = route.params;
  const course = ACADEMY_COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Course not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} bounces={false}>
        {/* Header / Banner */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.bannerContent}>
            <MaterialCommunityIcons name={course.imageIcon as any} size={64} color="#fff" style={styles.bannerIcon} />
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseCategory}>{course.category}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Meta Info */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="signal" size={20} color={ACADEMY_PRIMARY} />
              <Text style={styles.metaText}>{course.difficulty}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={ACADEMY_PRIMARY} />
              <Text style={styles.metaText}>{course.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="book-open-outline" size={20} color={ACADEMY_PRIMARY} />
              <Text style={styles.metaText}>{course.lessonsCount} Lessons</Text>
            </View>
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.description}>{course.description}</Text>

          {/* Skills */}
          <Text style={styles.sectionTitle}>Skills you'll gain</Text>
          <View style={styles.skillsContainer}>
            {course.skillsGained.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          {/* Modules/Syllabus */}
          <Text style={styles.sectionTitle}>Syllabus</Text>
          {course.modules.length > 0 ? (
            course.modules.map((module, index) => (
              <View key={module.id} style={styles.moduleContainer}>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleTitle}>Module {index + 1}: {module.title}</Text>
                </View>
                {module.lessons.map((lesson, lIndex) => (
                  <TouchableOpacity 
                    key={lesson.id} 
                    style={styles.lessonRow}
                    onPress={() => navigation.navigate('LessonReader', { lessonId: lesson.id })}
                  >
                    <View style={styles.lessonIconContainer}>
                      <MaterialCommunityIcons 
                        name={lesson.completed ? "check-circle" : (lesson.type === 'video' ? 'play-circle-outline' : 'file-document-outline')} 
                        size={24} 
                        color={lesson.completed ? ACADEMY_PRIMARY : ACADEMY_TEXT_SECONDARY} 
                      />
                    </View>
                    <View style={styles.lessonContent}>
                      <Text style={styles.lessonTitle}>{lIndex + 1}. {lesson.title}</Text>
                      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={ACADEMY_TEXT_SECONDARY} />
                  </TouchableOpacity>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Modules are being prepared.</Text>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('LessonReader', { lessonId: 'l1' })}>
          <Text style={styles.startButtonText}>{course.progress > 0 ? 'Continue Learning' : 'Start Learning'}</Text>
        </TouchableOpacity>
      </View>
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
  bannerContainer: {
    backgroundColor: ACADEMY_PRIMARY,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  bannerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  bannerIcon: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  courseCategory: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // space for bottom bar
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ACADEMY_SURFACE,
    padding: 16,
    borderRadius: 16,
    marginTop: -40, // overlap with banner
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 24,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: ACADEMY_TEXT_SECONDARY,
    lineHeight: 24,
    marginBottom: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  skillChip: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: {
    color: ACADEMY_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  moduleContainer: {
    backgroundColor: ACADEMY_SURFACE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
    marginBottom: 16,
    overflow: 'hidden',
  },
  moduleHeader: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ACADEMY_BORDER,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ACADEMY_BORDER,
  },
  lessonIconContainer: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 13,
    color: ACADEMY_TEXT_SECONDARY,
  },
  emptyText: {
    color: ACADEMY_TEXT_SECONDARY,
    fontStyle: 'italic',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ACADEMY_SURFACE,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: ACADEMY_BORDER,
  },
  startButton: {
    backgroundColor: ACADEMY_PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});

export default CourseDetailScreen;
