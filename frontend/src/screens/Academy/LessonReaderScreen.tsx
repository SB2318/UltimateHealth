import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../helper/Theme';

const LessonReaderScreen = ({ route, navigation }: any) => {
  // In a real app, fetch lesson data using route.params.lessonId
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="close" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="bookmark-outline" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.categoryLabel}>MODULE 1 • LESSON 1</Text>
        <Text style={styles.lessonTitle}>What is a Hospital?</Text>
        
        {/* Placeholder for Large Illustration */}
        <View style={styles.illustrationContainer}>
          <MaterialCommunityIcons name="hospital-building" size={80} color={ACADEMY_PRIMARY} />
        </View>

        <Text style={styles.paragraph}>
          A hospital is a health care institution providing patient treatment with specialized medical and nursing staff and medical equipment. The best-known type of hospital is the general hospital, which typically has an emergency department to treat urgent health problems ranging from fire and accident victims to a sudden illness.
        </Text>

        {/* Medical Alert / Callout */}
        <View style={styles.calloutContainer}>
          <View style={styles.calloutIcon}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#F59E0B" />
          </View>
          <View style={styles.calloutContent}>
            <Text style={styles.calloutTitle}>Quick Fact</Text>
            <Text style={styles.calloutText}>
              The earliest documented institutions aiming to provide cures were ancient Egyptian temples.
            </Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          A district hospital typically is the major health care facility in its region, with large numbers of beds for intensive care and additional beds for patients who need long-term care. Specialized hospitals include trauma centers, rehabilitation hospitals, children's hospitals, seniors' (geriatric) hospitals, and hospitals for dealing with specific medical needs.
        </Text>

        {/* Expandable Section / Medical Terminology */}
        <View style={styles.terminologyCard}>
          <Text style={styles.terminologyTitle}>Medical Terminology</Text>
          <View style={styles.termRow}>
            <Text style={styles.termName}>Outpatient (OPD)</Text>
            <Text style={styles.termDesc}>A patient who is not hospitalized overnight but who visits a hospital, clinic, or associated facility for diagnosis or treatment.</Text>
          </View>
          <View style={styles.termRow}>
            <Text style={styles.termName}>Inpatient (IPD)</Text>
            <Text style={styles.termDesc}>A patient who stays in a hospital while under treatment.</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="robot-outline" size={24} color={ACADEMY_PRIMARY} />
          <Text style={styles.actionText}>Ask AI</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.goBack()}>
          <Text style={styles.nextButtonText}>Complete Lesson</Text>
          <MaterialCommunityIcons name="check-circle-outline" size={20} color="#fff" style={{marginLeft: 8}} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ACADEMY_BORDER,
    backgroundColor: ACADEMY_SURFACE,
  },
  iconButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: ACADEMY_PRIMARY,
    borderRadius: 3,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: ACADEMY_PRIMARY,
    letterSpacing: 1,
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 24,
  },
  illustrationContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    height: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 24,
  },
  calloutContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB', // Light amber
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    marginBottom: 24,
  },
  calloutIcon: {
    marginRight: 12,
  },
  calloutContent: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  terminologyCard: {
    backgroundColor: ACADEMY_SURFACE,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
    marginBottom: 24,
  },
  terminologyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 16,
  },
  termRow: {
    marginBottom: 12,
  },
  termName: {
    fontSize: 16,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 4,
  },
  termDesc: {
    fontSize: 14,
    color: ACADEMY_TEXT_SECONDARY,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: ACADEMY_SURFACE,
    borderTopWidth: 1,
    borderTopColor: ACADEMY_BORDER,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    marginRight: 12,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: ACADEMY_PRIMARY,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACADEMY_PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});

export default LessonReaderScreen;
