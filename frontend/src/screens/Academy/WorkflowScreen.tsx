import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../helper/Theme';

const WorkflowScreen = ({ route, navigation }: any) => {
  const { deptName = "Department", color = "#3B82F6" } = route.params || {};

  // Mock workflow steps
  const steps = [
    { id: 1, title: 'Patient Arrival', desc: 'Patient enters the department.' },
    { id: 2, title: 'Assessment', desc: 'Initial checks and vitals recorded.' },
    { id: 3, title: 'Treatment', desc: 'Core medical procedure or consultation.' },
    { id: 4, title: 'Documentation', desc: 'Notes added to the EHR system.' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{deptName} Workflow</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={[styles.stepNumber, { backgroundColor: color }]}>
              <Text style={styles.stepNumberText}>{step.id}</Text>
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
            {index < steps.length - 1 && (
              <MaterialCommunityIcons 
                name="arrow-down-thick" 
                size={24} 
                color={ACADEMY_BORDER} 
                style={styles.arrowIcon}
              />
            )}
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    zIndex: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  stepCard: {
    backgroundColor: ACADEMY_SURFACE,
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ACADEMY_BORDER,
    alignItems: 'center',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: ACADEMY_TEXT_SECONDARY,
    textAlign: 'center',
  },
  arrowIcon: {
    marginVertical: 4,
  }
});

export default WorkflowScreen;
