
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/dashboard/CourseCard";
import StatCard from "@/components/dashboard/StatCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Award,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchUserCourseProgress } from "@/lib/course-service";
import { getEnrolledCourses, courseProgressData, getTotalLearningTime } from "@/lib/data";
import { StatCard as StatCardType, Course, CourseProgress } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<CourseProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalLearningMinutes = getTotalLearningTime();
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();
          
        if (data && data.name) {
          setUserName(data.name);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  // Fetch enrolled courses and progress
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Get user's course progress
        const progress = await fetchUserCourseProgress(user.id);
        setUserProgress(progress);
        
        if (progress.length > 0) {
          // Get only the courses the user is enrolled in
          const allCourses = getEnrolledCourses();
          const userEnrolledCourses = allCourses.filter(course => 
            progress.some(p => p.courseId === course.id)
          );
          
          // Update the progress data with totalLessons from the course
          const updatedProgress = progress.map(p => {
            const course = userEnrolledCourses.find(c => c.id === p.courseId);
            if (course) {
              return {
                ...p,
                courseName: course.title,
                totalLessons: course.modules.reduce(
                  (total, module) => total + module.lessons.length, 0
                )
              };
            }
            return p;
          });
          
          setEnrolledCourses(userEnrolledCourses);
          setUserProgress(updatedProgress);
        } else {
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);
  
  // Format time (minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins > 0 ? `${mins}m` : ""}`
      : `${mins}m`;
  };

  // Stats data
  const stats: StatCardType[] = [
    {
      title: "Learning Time",
      value: formatTime(totalLearningMinutes),
      change: 12,
      icon: Clock,
    },
    {
      title: "Courses Enrolled",
      value: enrolledCourses.length,
      change: 0,
      icon: BookOpen,
    },
    {
      title: "Completed Courses",
      value: userProgress.filter(p => 
        p.completedLessons.length === p.totalLessons && p.totalLessons > 0
      ).length,
      icon: Award,
    },
    {
      title: "Learning Streak",
      value: "5 days",
      change: 25,
      icon: TrendingUp,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading your dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold mb-2">
              Welcome back, {userName || 'Student'}
            </h1>
            <p className="text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StatCard stat={stat} />
              </div>
            ))}
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="my-courses" className="space-y-8">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="my-courses" className="flex-1 sm:flex-initial">
                My Courses
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1 sm:flex-initial">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 sm:flex-initial">
                Completed
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 sm:flex-initial">
                Calendar
              </TabsTrigger>
            </TabsList>

            {/* My Courses Tab */}
            <TabsContent value="my-courses" className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">Your Courses</h2>
                <Button variant="outline" size="sm" asChild>
                  <a href="/courses">Browse More Courses</a>
                </Button>
              </div>

              {enrolledCourses.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      You haven't enrolled in any courses yet. Browse our catalog
                      to find courses that interest you.
                    </p>
                    <Button asChild>
                      <a href="/courses">Browse Courses</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      progress={userProgress.find(
                        (progress) => progress.courseId === course.id
                      )}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* In Progress Tab */}
            <TabsContent value="in-progress" className="animate-fade-in">
              <h2 className="text-2xl font-display font-bold mb-6">
                Courses In Progress
              </h2>

              {userProgress.filter(p => 
                p.completedLessons.length > 0 && 
                p.completedLessons.length < p.totalLessons
              ).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Clock className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No courses in progress</h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      You don't have any courses in progress. Start learning to see your progress here.
                    </p>
                    <Button asChild>
                      <a href="/courses">Start Learning</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userProgress
                    .filter(p => 
                      p.completedLessons.length > 0 && 
                      p.completedLessons.length < p.totalLessons
                    )
                    .map((progress) => {
                      const course = enrolledCourses.find(
                        (c) => c.id === progress.courseId
                      );
                      if (!course) return null;
                      return (
                        <Card key={progress.courseId}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold mb-1">{course.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground mb-3">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  Last accessed:{" "}
                                  {new Date(
                                    progress.lastAccessed
                                  ).toLocaleDateString()}
                                </div>
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>
                                      {Math.round(
                                        (progress.completedLessons.length /
                                          progress.totalLessons) *
                                          100
                                      )}
                                      %
                                    </span>
                                  </div>
                                  <ProgressBar
                                    progress={
                                      (progress.completedLessons.length /
                                        progress.totalLessons) *
                                      100
                                    }
                                  />
                                </div>
                                <div className="flex justify-between mt-3">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                  <Button size="sm" asChild>
                                    <a href={`/courses/${course.slug}`}>Continue</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )}
            </TabsContent>

            {/* Completed Tab */}
            <TabsContent value="completed" className="animate-fade-in">
              <h2 className="text-2xl font-display font-bold mb-6">
                Completed Courses
              </h2>

              {userProgress.filter(p => 
                p.completedLessons.length === p.totalLessons && p.totalLessons > 0
              ).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Award className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No completed courses</h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      You haven't completed any courses yet. Keep learning to earn your certificates!
                    </p>
                    <Button asChild>
                      <a href="/dashboard?tab=in-progress">Continue Learning</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userProgress
                    .filter(p => 
                      p.completedLessons.length === p.totalLessons && p.totalLessons > 0
                    )
                    .map((progress) => {
                      const course = enrolledCourses.find(
                        (c) => c.id === progress.courseId
                      );
                      if (!course) return null;
                      return (
                        <Card key={progress.courseId}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold mb-1">{course.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground mb-3">
                                  <Award className="h-3.5 w-3.5 mr-1" />
                                  Completed
                                </div>
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>100%</span>
                                  </div>
                                  <ProgressBar progress={100} />
                                </div>
                                <div className="flex justify-between mt-3">
                                  <Button variant="outline" size="sm">
                                    View Certificate
                                  </Button>
                                  <Button size="sm" asChild>
                                    <a href={`/courses/${course.slug}`}>Review Course</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )}
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="animate-fade-in">
              <h2 className="text-2xl font-display font-bold mb-6">
                Learning Calendar
              </h2>

              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your learning calendar</h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    Coming soon! You'll be able to schedule your learning sessions and get reminders.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
