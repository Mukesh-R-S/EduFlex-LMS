
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses?: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  thumbnail: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  rating: number;
  ratingCount: number;
  modules: Module[];
  studentsEnrolled: number;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: number; // in minutes
  completed?: boolean;
  content?: string; // Could be video URL, markdown content, etc.
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  completedLessons: string[];
  totalLessons: number;
  lastAccessed: string;
  certificateIssued?: boolean;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
}
