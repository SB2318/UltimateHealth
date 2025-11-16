import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import {fp, hp, wp} from '../helper/Metric';
import {PRIMARY_COLOR, BUTTON_COLOR} from '../helper/Theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../type';

type Props = StackScreenProps<RootStackParamList, 'AppHome'>;

const contributors = [
  {name: 'SB2318', role: 'Maintainer'},
  {name: 'Contributor One', role: 'Developer'},
  {name: 'Contributor Two', role: 'Designer'},
];

const tasks = [
  {title: 'Create Home Page', done: true},
  {title: 'Wire Navigation after Login', done: true},
  {title: 'Add Chat With Gemini button', done: true},
  {title: 'Display latest commit link', done: true},
];

const AppHomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Ultimate Health — Project Home</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <Text style={styles.paragraph}>
            Ultimate Health is a community-driven app with authentication, a
            chatbot (Gemini), article & podcast dashboard and social features.
            Purpose: help users consume health content and collaborate.
          </Text>
          <Text style={styles.small}>Core features: Auth, Chat with Gemini, Dashboard, Podcasts, Articles, Social</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {tasks.map((t, idx) => (
            <View key={idx} style={styles.taskRow}>
              <Text style={t.done ? styles.taskDone : styles.taskPending}>{t.title}</Text>
              <Text style={styles.taskStatus}>{t.done ? 'Done' : 'Pending'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contributors</Text>
          {contributors.map((c, idx) => (
            <View key={idx} style={styles.contributorRow}>
              <Text style={styles.contributorName}>{c.name}</Text>
              <Text style={styles.contributorRole}>{c.role}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Text style={styles.paragraph}>Initial MVP: Auth, Articles feed, Podcasts, Chatbot integration.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Commit</Text>
          <TouchableOpacity
            onPress={() => {
              // Open the repository commits page — update URL if repo moves
              Linking.openURL('https://github.com/SB2318/UltimateHealth/commits/main');
            }}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>View latest commit on GitHub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              // Send user to main app tabs (Home/Podcasts/Chatbot/Profile)
              navigation.reset({index: 0, routes: [{name: 'TabNavigation'}]});
            }}
          >
            <Text style={styles.primaryButtonText}>Open App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ghostButton}
            onPress={() => {
              // Reset to TabNavigation and open Chatbot tab
              navigation.reset({
                index: 0,
                routes: [{name: 'TabNavigation', params: {screen: 'Chatbot'}}],
              });
            }}
          >
            <Text style={styles.ghostButtonText}>Chat With Gemini Bot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppHomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 16, paddingBottom: 60},
  title: {fontSize: fp(6), fontWeight: '700', color: PRIMARY_COLOR, marginBottom: 12},
  section: {marginVertical: 10, padding: 12, backgroundColor: '#f7f9fc', borderRadius: 8},
  sectionTitle: {fontSize: fp(4.2), fontWeight: '700', marginBottom: 8},
  paragraph: {fontSize: fp(3.7), color: '#333'},
  small: {fontSize: fp(3.2), color: '#666', marginTop: 6},
  taskRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6},
  taskDone: {color: 'green', fontWeight: '600'},
  taskPending: {color: '#333'},
  taskStatus: {color: '#666'},
  contributorRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6},
  contributorName: {fontWeight: '600'},
  contributorRole: {color: '#666'},
  linkButton: {paddingVertical: 8},
  linkText: {color: BUTTON_COLOR, textDecorationLine: 'underline'},
  primaryButton: {backgroundColor: PRIMARY_COLOR, padding: 12, borderRadius: 8, marginTop: 8},
  primaryButtonText: {color: '#fff', textAlign: 'center', fontWeight: '700'},
  ghostButton: {borderColor: PRIMARY_COLOR, borderWidth: 1, padding: 12, borderRadius: 8, marginTop: 8},
  ghostButtonText: {color: PRIMARY_COLOR, textAlign: 'center', fontWeight: '700'},
});
