import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACADEMY_BACKGROUND, ACADEMY_PRIMARY, ACADEMY_TEXT_PRIMARY, ACADEMY_TEXT_SECONDARY, ACADEMY_SURFACE, ACADEMY_BORDER } from '../../helper/Theme';

const DEPARTMENTS = [
  { id: 'reception', name: 'Reception', icon: 'desk', color: '#3B82F6', row: 0, col: 0 },
  { id: 'emergency', name: 'Emergency', icon: 'ambulance', color: '#EF4444', row: 0, col: 1 },
  { id: 'opd', name: 'OPD', icon: 'stethoscope', color: '#10B981', row: 1, col: 0 },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'pill', color: '#F59E0B', row: 1, col: 1 },
  { id: 'radiology', name: 'Radiology', icon: 'radioactive', color: '#8B5CF6', row: 2, col: 0 },
  { id: 'lab', name: 'Laboratory', icon: 'flask', color: '#06B6D4', row: 2, col: 1 },
  { id: 'icu', name: 'ICU', icon: 'bed-outline', color: '#EF4444', row: 3, col: 0 },
  { id: 'ot', name: 'Operation Theater', icon: 'scalpel', color: '#10B981', row: 3, col: 1 },
];

const HospitalMapScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={ACADEMY_TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hospital Map</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instructions}>Tap on a department to view its workflow.</Text>
        
        <View style={styles.mapGrid}>
          {DEPARTMENTS.map(dept => (
            <TouchableOpacity 
              key={dept.id} 
              style={[styles.deptCard, { borderTopColor: dept.color }]}
              onPress={() => navigation.navigate('Workflow', { deptId: dept.id, deptName: dept.name, color: dept.color })}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${dept.color}15` }]}>
                <MaterialCommunityIcons name={dept.icon as any} size={32} color={dept.color} />
              </View>
              <Text style={styles.deptName}>{dept.name}</Text>
            </TouchableOpacity>
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
  },
  instructions: {
    fontSize: 16,
    color: ACADEMY_TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deptCard: {
    width: '48%',
    backgroundColor: ACADEMY_SURFACE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deptName: {
    fontSize: 16,
    fontWeight: '600',
    color: ACADEMY_TEXT_PRIMARY,
    textAlign: 'center',
  }
});

export default HospitalMapScreen;
