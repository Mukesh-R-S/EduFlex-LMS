
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, CheckCircle, Lock, BookOpen } from "lucide-react";
import { Lesson, Module } from "@/types";
import { markLessonAsCompleted } from "@/lib/course-service";
import { useAuth } from "@/lib/auth";

interface CourseContentProps {
  courseId: string;
  modules: Module[];
  completedLessons?: string[];
  isEnrolled?: boolean;
  onLessonSelect?: (lessonId: string) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  courseId,
  modules,
  completedLessons = [],
  isEnrolled = false,
  onLessonSelect,
}) => {
  const { user } = useAuth();
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || ""]);
  const [localCompletedLessons, setLocalCompletedLessons] = useState<string[]>(completedLessons);

  // Update local state when prop changes
  useEffect(() => {
    setLocalCompletedLessons(completedLessons);
  }, [completedLessons]);

  // Calculate total duration and lessons
  const totalDuration = modules.reduce(
    (total, module) =>
      total +
      module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0),
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

  // Get icon based on lesson type
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "reading":
        return <FileText className="h-4 w-4" />;
      case "quiz":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const totalLessons = modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  // Handle toggling lesson completion
  const toggleLessonCompletion = async (lessonId: string, isCompleted: boolean) => {
    if (!user || !isEnrolled) return;
    
    const newCompletionState = !isCompleted;
    
    // Optimistic UI update
    setLocalCompletedLessons(prev => 
      newCompletionState 
        ? [...prev, lessonId] 
        : prev.filter(id => id !== lessonId)
    );
    
    // Update in the database
    await markLessonAsCompleted(courseId, lessonId, newCompletionState);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold">Course Content</h3>
          <p className="text-sm text-muted-foreground">
            {modules.length} modules • {totalLessons} lessons • {formatTime(totalDuration)} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedModules(modules.map((m) => m.id))}
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedModules([])}
          >
            Collapse All
          </Button>
        </div>
      </div>
      
      <Accordion
        type="multiple"
        value={expandedModules}
        onValueChange={setExpandedModules}
        className="w-full"
      >
        {modules.map((module, moduleIndex) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="px-4 py-2 border-b last:border-b-0"
          >
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-start text-left">
                <span className="font-semibold flex-1">
                  {moduleIndex + 1}. {module.title}
                </span>
                <span className="text-xs text-muted-foreground ml-2 mt-1">
                  {module.lessons.length} lessons
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <ul className="space-y-1">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = localCompletedLessons.includes(lesson.id);
                  
                  return (
                    <li
                      key={lesson.id}
                      className={`rounded-md ${
                        isEnrolled
                          ? "hover:bg-secondary/50 cursor-pointer"
                          : "opacity-75"
                      }`}
                    >
                      <div className="flex items-center p-2 gap-3">
                        <div
                          className={`p-1.5 rounded-full ${
                            isCompleted
                              ? "bg-green-100 text-green-600"
                              : "bg-secondary text-primary"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isEnrolled) {
                              toggleLessonCompletion(lesson.id, isCompleted);
                            }
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            getLessonIcon(lesson.type)
                          )}
                        </div>
                        <div 
                          className="flex-1 min-w-0"
                          onClick={() => {
                            if (isEnrolled && onLessonSelect) {
                              onLessonSelect(lesson.id);
                            }
                          }}
                        >
                          <span
                            className={`text-sm block truncate ${
                              isCompleted ? "text-muted-foreground" : ""
                            }`}
                          >
                            {lessonIndex + 1}. {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="capitalize text-xs font-normal"
                          >
                            {lesson.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(lesson.duration)}
                          </span>
                          {!isEnrolled && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseContent;
