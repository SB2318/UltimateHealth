export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., '2 hours'
  progress: number; // 0 - 100
  lessonsCount: number;
  imageIcon: string; // used for illustration (could be from expo/vector-icons or a url)
  skillsGained: string[];
  learningObjectives: string[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'read' | 'video' | 'quiz' | 'interactive';
  completed: boolean;
  content?: string; // simplified content representation
}

export const ACADEMY_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Hospital Basics',
    description: 'Learn the fundamental operations of a hospital environment.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    duration: '2 hours',
    progress: 45,
    lessonsCount: 12,
    imageIcon: 'hospital-building',
    skillsGained: ['Hospital Navigation', 'Department Understanding', 'Terminology'],
    learningObjectives: ['Understand hospital layout', 'Know key departments'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Hospitals',
        lessons: [
          { id: 'l1', title: 'What is a Hospital?', duration: '5 min', type: 'read', completed: true },
          { id: 'l2', title: 'Types of Hospitals', duration: '10 min', type: 'read', completed: false },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Patient Journey',
    description: 'Follow the complete patient flow from admission to discharge.',
    category: 'Patient Care',
    difficulty: 'Beginner',
    duration: '3.5 hours',
    progress: 0,
    lessonsCount: 20,
    imageIcon: 'account-arrow-right',
    skillsGained: ['Patient Flow', 'Admission Process', 'Discharge Planning'],
    learningObjectives: ['Trace the patient journey', 'Understand bottlenecks'],
    modules: []
  },
  {
    id: 'c3',
    title: 'Emergency Department',
    description: 'A deep dive into the fast-paced world of the ER.',
    category: 'Departments',
    difficulty: 'Intermediate',
    duration: '4 hours',
    progress: 0,
    lessonsCount: 18,
    imageIcon: 'ambulance',
    skillsGained: ['Triage', 'Emergency Protocol', 'Rapid Response'],
    learningObjectives: ['Understand triage levels', 'Learn emergency protocols'],
    modules: []
  },
  {
    id: 'c4',
    title: 'Electronic Health Records',
    description: 'Master the basics of EHR and medical documentation.',
    category: 'Technology',
    difficulty: 'Intermediate',
    duration: '5 hours',
    progress: 100,
    lessonsCount: 25,
    imageIcon: 'laptop',
    skillsGained: ['EHR Navigation', 'Data Privacy', 'Documentation'],
    learningObjectives: ['Navigate EHR systems', 'Ensure HIPAA compliance'],
    modules: []
  }
];

export const ACADEMY_USER_STATS = {
  hoursLearned: 24,
  certificatesEarned: 3,
  currentStreak: 5,
  badges: ['Early Bird', 'Quick Learner', 'EHR Master']
};
