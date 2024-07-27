import {Alert, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Article, Category} from '../type';

export const checkInternetConnection = (
  callback: (isConnected: boolean) => void,
) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    return callback(state.isConnected);
  });

  return unsubscribe;
};

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Silent Killer: Hypertension',
    description:
      'Hypertension, also known as high blood pressure, often shows no symptoms but can lead to serious health complications if untreated.',
    content:
      'Content about hypertension, its causes, symptoms, and treatments...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Alex Carter',
    lastUpdatedAt: '14.06.2024',
    imageUtils:
      'https://img.freepik.com/free-vector/tiny-doctor-heart-patient-with-high-blood-pressure-medical-checkup-hospital-clinic-risk-cholesterol-cardiovascular-disease-flat-vector-illustration-cardiology-health-concept_74855-20983.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718582400&semt=sph',
  },
  {
    id: '2',
    title: 'Understanding Diabetes: Types, Symptoms, and Management',
    description:
      'Diabetes is a chronic condition characterized by high blood sugar levels. Learn about the different types, symptoms, and management strategies.',
    content: 'Content about diabetes, its types, symptoms, and management...',
    category: ['Health', 'Stories'],
    author_name: 'Dr. Emily White',
    lastUpdatedAt: '13.06.2024',
    imageUtils:
      'https://cdn.pixabay.com/photo/2015/05/21/11/17/diabetes-777002_640.jpg',
  },
  {
    id: '3',
    title: 'Cancer: Early Detection and Treatment Options',
    description:
      'Cancer remains one of the leading causes of death worldwide. Early detection and advanced treatment options can improve survival rates.',
    content:
      'Content about cancer, its early detection, and treatment options...',
    category: ['Diseases', 'Popular'],
    author_name: 'Dr. Michael Johnson',
    lastUpdatedAt: '12.06.2024',
    imageUtils:
      'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/01/GettyImages-122373924_header-1024x575-1.jpg?w=1155&h=1207',
  },
  {
    id: '4',
    title: 'The Impact of Obesity on Overall Health',
    description:
      'Obesity is linked to a range of health issues, including diabetes, heart disease, and joint problems. Learn about the impact of obesity on health.',
    content:
      'Content about obesity, its impact on health, and ways to manage weight...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Sarah Lee',
    lastUpdatedAt: '11.06.2024',
    imageUtils:
      'https://www.hindustantimes.com/ht-img/img/2024/05/11/1600x900/obesity-cancer_1715423468999_1715423469283.jpg',
  },
  {
    id: '5',
    title: 'Heart Disease: Prevention and Management',
    description:
      'Heart disease is a leading cause of death worldwide. Discover prevention strategies and management techniques to reduce your risk.',
    content: 'Content about heart disease, its prevention, and management...',
    category: ['Health', 'Diseases'],
    author_name: 'Dr. James Brown',
    lastUpdatedAt: '10.06.2024',
    imageUtils:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPsTqx0xw0aGEY64kyk7qvW29yz9xN3QWPg&s',
  },
  {
    id: '6',
    title: 'Chronic Respiratory Diseases: Asthma and COPD',
    description:
      'Chronic respiratory diseases, such as asthma and COPD, affect millions of people. Learn about their symptoms and treatments.',
    content:
      'Content about chronic respiratory diseases, their symptoms, and treatments...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Anna Wilson',
    lastUpdatedAt: '09.06.2024',
    imageUtils:
      'https://st4.depositphotos.com/6563466/38921/i/450/depositphotos_389216432-stock-photo-human-respiratory-system-lungs-anatomy.jpg',
  },
  {
    id: '7',
    title: 'Alzheimer’s Disease: Understanding the Symptoms and Care',
    description:
      'Alzheimer’s disease is a progressive neurological disorder. Understand its symptoms, stages, and care options.',
    content:
      'Content about Alzheimer’s disease, its symptoms, and care options...',
    category: ['Diseases', 'Stories'],
    author_name: 'Dr. Robert Green',
    lastUpdatedAt: '08.06.2024',
    imageUtils:
      'https://media.istockphoto.com/id/1125868862/photo/3d-illustration-of-the-human-brain-with-alzheimers-disease-dementia.jpg?s=612x612&w=0&k=20&c=FrD3pBhyBOjtgaWw_WDdAh2ktxWoaDm2DW_Ty47R5eg=',
  },
  {
    id: '8',
    title: 'Stroke: Signs, Prevention, and Recovery',
    description:
      'Stroke is a medical emergency that requires immediate attention. Learn about the signs, prevention methods, and recovery processes.',
    content: 'Content about stroke, its signs, prevention, and recovery...',
    category: ['Health', 'Stories'],
    author_name: 'Dr. Laura Davis',
    lastUpdatedAt: '07.06.2024',
    imageUtils:
      'https://www.apexhospitals.com/_next/image?url=https%3A%2F%2Fbed.apexhospitals.com%2Fuploads%2Fstroke_management_6fdf77c521.png&w=1200&q=75',
  },
  {
    id: '9',
    title: 'Mental Health Disorders: Types and Treatments',
    description:
      'Mental health disorders are common and treatable. Discover the different types of disorders and available treatments.',
    content:
      'Content about mental health disorders, their types, and treatments...',
    category: ['Health', 'Popular'],
    author_name: 'Dr. Chris Miller',
    lastUpdatedAt: '06.06.2024',
    imageUtils:
      'https://img.freepik.com/free-vector/gradient-world-mental-health-day-background_23-2149604961.jpg',
  },
  {
    id: '10',
    title: 'Infectious Diseases: Prevention and Vaccination',
    description:
      'Infectious diseases can spread quickly and cause serious health problems. Learn about prevention methods and the importance of vaccination.',
    content:
      'Content about infectious diseases, their prevention, and vaccination...',
    category: ['Health', 'Diseases'],
    author_name: 'Dr. Patricia Taylor',
    lastUpdatedAt: '05.06.2024',
    imageUtils:
      'https://www.shutterstock.com/image-illustration/virus-vaccine-flu-coronavirus-medical-600nw-1667085835.jpg',
  },
];

/** BackButton Handler */
export const handleBackButton = () => {
  Alert.alert('Exit App', 'Are you sure you want to exit?', [
    {text: 'Cancel', style: 'cancel'},
    {text: 'OK', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};

/** Async Storage for get Item */
export const retrieveItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
};

/** Async Storage Store Item */
const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing item:', error);
  }
};
