import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../lib/ui/Theme';

const JOURNEY_STEPS = [
  { id: 1, title: 'Patient Arrival', icon: 'hospital-building', desc: 'Patient arrives at the hospital.' },
  { id: 2, title: 'Reception', icon: 'monitor-dashboard', desc: 'Initial inquiry and direction.' },
  { id: 3, title: 'Registration', icon: 'clipboard-account', desc: 'Patient details entered into EHR.' },
  { id: 4, title: 'Waiting', icon: 'clock-outline', desc: 'Patient waits for their token.' },
  { id: 5, title: 'Doctor Consultation', icon: 'stethoscope', desc: 'Doctor examines the patient.' },
  { id: 6, title: 'Lab/Radiology', icon: 'flask', desc: 'Tests conducted if required.' },
  { id: 7, title: 'Diagnosis', icon: 'file-edit-outline', desc: 'Final diagnosis based on reports.' },
  { id: 8, title: 'Pharmacy', icon: 'pill', desc: 'Medicines dispensed.' },
  { id: 9, title: 'Discharge', icon: 'walk', desc: 'Patient leaves the hospital.' },
];

const PatientJourneyScreen = ({ navigation }: any) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Journey</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        {/* Active Step Details */}
        <View style={styles.activeStepCard}>
          <View style={styles.activeIconContainer}>
            <MaterialCommunityIcons name={JOURNEY_STEPS[activeStep - 1].icon as any} size={48} color={ACADEMY_PRIMARY} />
          </View>
          <Text style={styles.activeTitle}>{JOURNEY_STEPS[activeStep - 1].title}</Text>
          <Text style={styles.activeDesc}>{JOURNEY_STEPS[activeStep - 1].desc}</Text>
        </View>

        {/* Timeline */}
        <ScrollView style={styles.timelineScroll} contentContainerStyle={styles.timelineContent}>
          {JOURNEY_STEPS.map((step, index) => {
            const isActive = step.id === activeStep;
            const isCompleted = step.id < activeStep;
            return (
              <TouchableOpacity 
                key={step.id} 
                style={styles.timelineNodeContainer}
                onPress={() => setActiveStep(step.id)}
              >
                {/* Line connecting nodes */}
                {index !== JOURNEY_STEPS.length - 1 && (
                  <View style={[styles.timelineLine, isCompleted && styles.timelineLineCompleted]} />
                )}
                
                {/* Node */}
                <View style={[
                  styles.timelineNode, 
                  isActive && styles.timelineNodeActive,
                  isCompleted && styles.timelineNodeCompleted
                ]}>
                  <MaterialCommunityIcons 
                    name={step.icon as any} 
                    size={24} 
                    color={isActive || isCompleted ? '#fff' : ACADEMY_TEXT_SECONDARY} 
                  />
                </View>
                
                {/* Text */}
                <View style={styles.timelineTextContainer}>
                  <Text style={[
                    styles.timelineTitle, 
                    (isActive || isCompleted) && styles.timelineTitleActive
                  ]}>{step.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    padding: 16,
  },
  activeStepCard: {
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
    elevation: 3,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  activeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 8,
  },
  activeDesc: {
    fontSize: 16,
    color: ACADEMY_TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
  timelineScroll: {
    flex: 1,
  },
  timelineContent: {
    paddingLeft: 24,
    paddingBottom: 40,
  },
  timelineNodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 23, // center of node
    top: 48,
    bottom: -24,
    width: 2,
    backgroundColor: ACADEMY_BORDER,
    zIndex: -1,
  },
  timelineLineCompleted: {
    backgroundColor: ACADEMY_PRIMARY,
  },
  timelineNode: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ACADEMY_SURFACE,
    borderWidth: 2,
    borderColor: ACADEMY_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  timelineNodeActive: {
    backgroundColor: ACADEMY_PRIMARY,
    borderColor: ACADEMY_PRIMARY,
    transform: [{ scale: 1.1 }],
  },
  timelineNodeCompleted: {
    backgroundColor: ACADEMY_PRIMARY,
    borderColor: ACADEMY_PRIMARY,
  },
  timelineTextContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 48,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: ACADEMY_TEXT_SECONDARY,
  },
  timelineTitleActive: {
    fontWeight: '700',
    color: ACADEMY_TEXT_PRIMARY,
  },
});

export default PatientJourneyScreen;
