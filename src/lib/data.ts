
import { Course, CourseProgress, User } from "../types";

// Mock user data
export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?img=11",
  role: "student",
  enrolledCourses: ["course1", "course2", "course3"],
};

// Mock courses data
export const coursesData: Course[] = [
  {
    id: "course1",
    title: "Introduction to React",
    slug: "introduction-to-react",
    description: "Learn the fundamentals of React and build modern web applications",
    longDescription: "This comprehensive course covers everything you need to know about React, from the basics to advanced concepts. You'll learn about components, state, props, hooks, context, and more. By the end of this course, you'll be able to build modern, responsive web applications using React.",
    price: 49.99,
    instructor: {
      id: "instructor1",
      name: "Sarah Davis",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    duration: 720, // 12 hours
    level: "beginner",
    topics: ["React", "JavaScript", "Web Development"],
    rating: 4.8,
    ratingCount: 1245,
    studentsEnrolled: 15420,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-07-20T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Getting Started with React",
        lessons: [
          {
            id: "lesson1",
            title: "Introduction to React",
            type: "video",
            duration: 15,
            completed: true,
            content: "https://example.com/video1.mp4",
          },
          {
            id: "lesson2",
            title: "Setting Up Your Development Environment",
            type: "reading",
            duration: 10,
            completed: true,
            content: "In this lesson, we'll set up our development environment...",
          },
        ],
      },
      {
        id: "module2",
        title: "React Components",
        lessons: [
          {
            id: "lesson3",
            title: "Functional Components",
            type: "video",
            duration: 20,
            completed: true,
            content: "https://example.com/video2.mp4",
          },
          {
            id: "lesson4",
            title: "Class Components",
            type: "video",
            duration: 25,
            completed: false,
            content: "https://example.com/video3.mp4",
          },
          {
            id: "lesson5",
            title: "Props and State",
            type: "quiz",
            duration: 15,
            completed: false,
            content: "Test your knowledge of props and state...",
          },
        ],
      },
    ],
  },
  {
    id: "course2",
    title: "Advanced JavaScript Concepts",
    slug: "advanced-javascript-concepts",
    description: "Deep dive into advanced JavaScript concepts and patterns",
    longDescription: "Take your JavaScript skills to the next level with this advanced course. You'll learn about closures, prototypes, async/await, generators, and more. This course is designed for developers who already have a basic understanding of JavaScript and want to deepen their knowledge.",
    price: 59.99,
    instructor: {
      id: "instructor2",
      name: "Michael Thompson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
    duration: 540, // 9 hours
    level: "intermediate",
    topics: ["JavaScript", "ES6", "Algorithms"],
    rating: 4.7,
    ratingCount: 978,
    studentsEnrolled: 8750,
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Advanced JavaScript Fundamentals",
        lessons: [
          {
            id: "lesson1",
            title: "Closures and Scopes",
            type: "video",
            duration: 30,
            completed: false,
            content: "https://example.com/video4.mp4",
          },
          {
            id: "lesson2",
            title: "Prototypal Inheritance",
            type: "reading",
            duration: 20,
            completed: false,
            content: "In this lesson, we'll explore prototypal inheritance...",
          },
        ],
      },
    ],
  },
  {
    id: "course3",
    title: "Full-Stack Web Development",
    slug: "full-stack-web-development",
    description: "Build complete web applications with front-end and back-end technologies",
    longDescription: "Learn how to build full-stack web applications from scratch. This course covers both front-end and back-end development, including HTML, CSS, JavaScript, Node.js, Express, and MongoDB. You'll build several real-world projects and deploy them to the cloud.",
    price: 79.99,
    instructor: {
      id: "instructor3",
      name: "Jennifer Wilson",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    duration: 1080, // 18 hours
    level: "advanced",
    topics: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    rating: 4.9,
    ratingCount: 1562,
    studentsEnrolled: 12340,
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-08-10T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Front-End Development",
        lessons: [
          {
            id: "lesson1",
            title: "HTML Fundamentals",
            type: "video",
            duration: 25,
            completed: false,
            content: "https://example.com/video7.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "course4",
    title: "Python Data Science",
    slug: "python-data-science",
    description: "Learn data science and machine learning with Python",
    longDescription: "This comprehensive course covers everything you need to know about data science and machine learning with Python. You'll learn about data manipulation, visualization, statistical analysis, and machine learning algorithms. Perfect for beginners who want to enter the field of data science.",
    price: 69.99,
    instructor: {
      id: "instructor4",
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    duration: 900, // 15 hours
    level: "beginner",
    topics: ["Python", "Data Science", "Machine Learning"],
    rating: 4.6,
    ratingCount: 1120,
    studentsEnrolled: 9870,
    createdAt: "2023-04-20T00:00:00Z",
    updatedAt: "2023-09-05T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Introduction to Python",
        lessons: [
          {
            id: "lesson1",
            title: "Python Basics",
            type: "video",
            duration: 30,
            completed: false,
            content: "https://example.com/video10.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "course5",
    title: "UI/UX Design Principles",
    slug: "ui-ux-design-principles",
    description: "Master the principles of UI/UX design and create stunning user interfaces",
    longDescription: "Learn the fundamentals of UI/UX design and create beautiful, user-friendly interfaces. This course covers design principles, user research, wireframing, prototyping, and more. You'll work on real projects and build a portfolio that showcases your design skills.",
    price: 54.99,
    instructor: {
      id: "instructor5",
      name: "Emma Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop",
    duration: 660, // 11 hours
    level: "intermediate",
    topics: ["UI Design", "UX Design", "Figma", "User Research"],
    rating: 4.8,
    ratingCount: 890,
    studentsEnrolled: 7650,
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2023-10-10T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Design Fundamentals",
        lessons: [
          {
            id: "lesson1",
            title: "Color Theory",
            type: "video",
            duration: 20,
            completed: false,
            content: "https://example.com/video13.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "course6",
    title: "Mobile App Development with Flutter",
    slug: "mobile-app-development-flutter",
    description: "Build beautiful native apps for iOS and Android with Flutter",
    longDescription: "Learn how to build cross-platform mobile applications using Flutter. This course covers Dart programming, Flutter widgets, state management, navigation, and more. By the end, you'll be able to create beautiful, high-performance apps for both iOS and Android from a single codebase.",
    price: 64.99,
    instructor: {
      id: "instructor6",
      name: "Robert Kim",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    duration: 840, // 14 hours
    level: "intermediate",
    topics: ["Flutter", "Dart", "Mobile Development", "iOS", "Android"],
    rating: 4.7,
    ratingCount: 760,
    studentsEnrolled: 6540,
    createdAt: "2023-06-10T00:00:00Z",
    updatedAt: "2023-11-15T00:00:00Z",
    modules: [
      {
        id: "module1",
        title: "Getting Started with Flutter",
        lessons: [
          {
            id: "lesson1",
            title: "Introduction to Dart",
            type: "video",
            duration: 25,
            completed: false,
            content: "https://example.com/video16.mp4",
          },
        ],
      },
    ],
  },
];

// Mock course progress data
export const courseProgressData: CourseProgress[] = [
  {
    courseId: "course1",
    courseName: "Introduction to React",
    completedLessons: ["lesson1", "lesson2", "lesson3"],
    totalLessons: 5,
    lastAccessed: "2023-09-15T14:30:00Z",
  },
  {
    courseId: "course2",
    courseName: "Advanced JavaScript Concepts",
    completedLessons: [],
    totalLessons: 8,
    lastAccessed: "2023-09-10T10:15:00Z",
  },
  {
    courseId: "course3",
    courseName: "Full-Stack Web Development",
    completedLessons: [],
    totalLessons: 12,
    lastAccessed: "2023-09-05T16:45:00Z",
  },
];

// Helper function to get enrolled courses
export const getEnrolledCourses = () => {
  if (!currentUser.enrolledCourses) return [];
  return coursesData.filter(course => 
    currentUser.enrolledCourses?.includes(course.id)
  );
};

// Helper function to get a single course by ID
export const getCourseById = (id: string) => {
  return coursesData.find(course => course.id === id);
};

// Helper function to get a single course by slug
export const getCourseBySlug = (slug: string) => {
  return coursesData.find(course => course.slug === slug);
};

// Helper function to get course progress
export const getCourseProgress = (courseId: string) => {
  return courseProgressData.find(progress => progress.courseId === courseId);
};

// Calculate total learning time
export const getTotalLearningTime = () => {
  return courseProgressData.reduce((total, course) => {
    const courseDetails = getCourseById(course.courseId);
    if (!courseDetails) return total;
    
    // Calculate proportion of completed lessons
    const completedProportion = course.completedLessons.length / course.totalLessons;
    
    // Multiply by course duration to get approximate time spent
    return total + (courseDetails.duration * completedProportion);
  }, 0);
};
