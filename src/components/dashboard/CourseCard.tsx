import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { Course, CourseProgress } from "@/types";
import ProgressBar from "./ProgressBar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
  showProgress?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  progress,
  showProgress = true,
}) => {
  const { user } = useAuth();
  
  // Calculate total lessons
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  // Format time (minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins > 0 ? `${mins}m` : ""}`
      : `${mins}m`;
  };

  // Calculate progress percentage
  const progressPercentage = progress
    ? Math.round((progress.completedLessons.length / progress.totalLessons) * 100)
    : 0;

  // Handle enrolling in a course
  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please sign in to enroll in courses");
      return;
    }

    try {
      // Call the initialize_course_progress function to create a progress record
      const { data, error } = await supabase.rpc('initialize_course_progress', {
        course_id_param: course.id
      });

      if (error) {
        console.error("Error enrolling in course:", error);
        toast.error("Failed to enroll in course");
        return;
      }

      toast.success(`Enrolled in ${course.title}`);
      // Redirect to the course page
      window.location.href = `/courses/${course.slug}`;
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in course");
    }
  };

  // Start or continue a course
  const handleStartCourse = () => {
    window.location.href = `/courses/${course.slug}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 border group">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="capitalize bg-black/70 text-white hover:bg-black/80"
          >
            {course.level}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg leading-tight line-clamp-2">
            <Link
              to={`/courses/${course.slug}`}
              className="hover:text-primary transition-colors"
            >
              {course.title}
            </Link>
          </h3>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-xs text-muted-foreground gap-3 mb-3">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {formatTime(course.duration)}
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {course.studentsEnrolled.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        {showProgress && progress && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <ProgressBar progress={progressPercentage} />
          </div>
        )}

        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={course.instructor.avatar || "https://i.pravatar.cc/150?img=1"}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-xs font-medium">{course.instructor.name}</span>
          </div>
          
          {!showProgress && (
            <div className="text-primary font-bold">
              ${course.price.toFixed(2)}
            </div>
          )}
          
          {/* Add buttons depending on progress status */}
          {user && (
            <div className="ml-auto mt-2">
              {progress ? (
                <Button size="sm" onClick={handleStartCourse}>
                  {progressPercentage > 0 ? "Continue" : "Start Course"}
                </Button>
              ) : (
                <Button size="sm" onClick={handleEnroll}>
                  Enroll
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
