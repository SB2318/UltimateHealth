import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademyHomeScreen from '../screens/academy/AcademyHomeScreen';
import CourseListingScreen from '../screens/academy/CourseListingScreen';
import CourseDetailScreen from '../screens/academy/CourseDetailScreen';
import LessonReaderScreen from '../screens/academy/LessonReaderScreen';
import PatientJourneyScreen from '../screens/academy/PatientJourneyScreen';
import HospitalMapScreen from '../screens/academy/HospitalMapScreen';
import WorkflowScreen from '../screens/academy/WorkflowScreen';
import QuizScreen from '../screens/academy/QuizScreen';
import AcademyProfileScreen from '../screens/academy/AcademyProfileScreen';

const Stack = createStackNavigator();

const AcademyStackNavigation = () => {
  return (
    <Stack.Navigator
      id={undefined as never}
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
