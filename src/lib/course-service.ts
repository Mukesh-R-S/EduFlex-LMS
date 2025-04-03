
import { supabase } from "@/integrations/supabase/client";
import { Course, CourseProgress } from "@/types";
import { toast } from "sonner";

// Helper function to map database course progress to application type
const mapDbProgressToAppProgress = (dbProgress: any): CourseProgress => {
  return {
    courseId: dbProgress.course_id,
    courseName: '', // This should be populated from course data if available
    completedLessons: dbProgress.completed_lessons || [],
    totalLessons: 0, // This should be populated from course data if available
    lastAccessed: dbProgress.last_accessed,
    certificateIssued: dbProgress.is_completed || false,
  };
};

// Fetch course progress for the current user
export const fetchUserCourseProgress = async (userId: string) => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching course progress:', error);
      return [];
    }
    
    return data ? data.map(mapDbProgressToAppProgress) : [];
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return [];
  }
};

// Get a single course progress
export const getCourseProgressById = async (userId: string, courseId: string) => {
  if (!userId || !courseId) return null;
  
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching course progress:', error);
      return null;
    }
    
    return data ? mapDbProgressToAppProgress(data) : null;
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return null;
  }
};

// Mark a lesson as completed
export const markLessonAsCompleted = async (courseId: string, lessonId: string, completed = true) => {
  try {
    const { data, error } = await supabase.rpc('update_lesson_progress', {
      course_id_param: courseId,
      lesson_id_param: lessonId,
      complete_status: completed
    });
    
    if (error) {
      console.error('Error updating lesson progress:', error);
      toast.error('Failed to update progress');
      return false;
    }
    
    if (completed) {
      toast.success('Progress saved');
    }
    
    return true;
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    toast.error('Failed to update progress');
    return false;
  }
};

// Enroll a user in a course
export const enrollInCourse = async (courseId: string) => {
  try {
    const { data, error } = await supabase.rpc('initialize_course_progress', {
      course_id_param: courseId
    });
    
    if (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
      return false;
    }
    
    toast.success('Enrolled successfully');
    return true;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    toast.error('Failed to enroll in course');
    return false;
  }
};

// Check if a user is enrolled in a specific course
export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
  if (!userId || !courseId) return false;
  
  try {
    const { data, error, count } = await supabase
      .from('course_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('course_id', courseId);
      
    if (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
    
    return count ? count > 0 : false;
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return false;
  }
};
