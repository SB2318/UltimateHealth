import React from 'react';
import { render } from '@testing-library/react-native';
import CourseCard from '../../../components/academy/CourseCard';

describe('CourseCard', () => {
  it('renders correctly', () => {
    const mockCourse = {
      id: '1',
      title: 'Test Course',
      difficulty: 'Beginner',
      duration: '10 min',
      lessonsCount: 5,
      progress: 0,
      imageIcon: 'test-icon' as any,
    } as any;
    const { getByText } = render(<CourseCard course={mockCourse} onPress={() => {}} />);
    expect(getByText('Test Course')).toBeTruthy();
  });
});
