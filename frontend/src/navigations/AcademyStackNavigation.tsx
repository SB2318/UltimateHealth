import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademyHomeScreen from '../screens/Academy/AcademyHomeScreen';
import CourseListingScreen from '../screens/Academy/CourseListingScreen';
import CourseDetailScreen from '../screens/Academy/CourseDetailScreen';
import LessonReaderScreen from '../screens/Academy/LessonReaderScreen';
import PatientJourneyScreen from '../screens/Academy/PatientJourneyScreen';
import HospitalMapScreen from '../screens/Academy/HospitalMapScreen';
import WorkflowScreen from '../screens/Academy/WorkflowScreen';
import QuizScreen from '../screens/Academy/QuizScreen';
import AcademyProfileScreen from '../screens/Academy/AcademyProfileScreen';

const Stack = createStackNavigator();

const AcademyStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="AcademyHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AcademyHome" component={AcademyHomeScreen} />
      <Stack.Screen name="CourseListing" component={CourseListingScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="LessonReader" component={LessonReaderScreen} />
      <Stack.Screen name="PatientJourney" component={PatientJourneyScreen} />
      <Stack.Screen name="HospitalMap" component={HospitalMapScreen} />
      <Stack.Screen name="Workflow" component={WorkflowScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="AcademyProfile" component={AcademyProfileScreen} />
    </Stack.Navigator>
  );
};

export default AcademyStackNavigation;
