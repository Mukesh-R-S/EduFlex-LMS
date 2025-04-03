
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseContent from "@/components/course/CourseContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Star,
  ChevronDown,
  Award,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { getCourseBySlug, currentUser } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug || "");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { toast } = useToast();

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format time (minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins > 0 ? `${mins}m` : ""}`
      : `${mins}m`;
  };

  // Calculate total lessons
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  // Check if user is enrolled in this course
  const isEnrolled = currentUser.enrolledCourses?.includes(course.id);

  // Handle enroll button click
  const handleEnroll = () => {
    toast({
      title: "Successfully Enrolled!",
      description: `You're now enrolled in ${course.title}. Start learning now!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Course Hero */}
        <div className="bg-gradient-to-b from-primary/5 to-background pt-10 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Course Info */}
              <div className="lg:col-span-2 animate-fade-in">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {course.title}
                </h1>

                <p className="text-lg mb-6">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>
                      <strong>{course.rating}</strong> ({course.ratingCount}{" "}
                      ratings)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>
                      {course.studentsEnrolled.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>{formatTime(course.duration)} total</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="capitalize">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {course.instructor.name}
                    </p>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4 md:hidden">
                  {isEnrolled ? (
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8"
                      asChild
                    >
                      <Link to={`/courses/${slug}/learn`}>
                        Continue Learning
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Course Card */}
              <div className="animate-fade-in animation-delay-150">
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden sticky top-24">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-3xl font-bold">
                        ${course.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {isEnrolled ? (
                        <Button className="w-full" asChild>
                          <Link to={`/courses/${slug}/learn`}>
                            Continue Learning
                          </Link>
                        </Button>
                      ) : (
                        <Button className="w-full" onClick={handleEnroll}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Enroll Now
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-bold mb-3">This course includes:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatTime(course.duration)} of video content
                        </li>
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          {course.modules.length} modules, {totalLessons} lessons
                        </li>
                        <li className="flex items-center">
                          <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                          Certificate of completion
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details Tabs */}
        <div className="container mx-auto px-4 py-10">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview" className="flex-1 sm:flex-initial">
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="flex-1 sm:flex-initial">
                Content
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-display font-bold mb-6">
                    About This Course
                  </h2>
                  <div className="prose max-w-none">
                    <p
                      className={`${
                        !showFullDescription && "line-clamp-4"
                      } mb-4`}
                    >
                      {course.longDescription || course.description}
                    </p>
                    {!showFullDescription && (
                      <button
                        className="text-primary font-medium flex items-center"
                        onClick={() => setShowFullDescription(true)}
                      >
                        Show more <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    )}
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-display font-bold mb-6">
                      What You'll Learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Master key concepts through practical examples", 
                        "Build real-world projects for your portfolio",
                        "Learn best practices and industry standards",
                        "Gain problem-solving skills",
                        "Receive feedback on your code and projects",
                        "Join a community of like-minded learners"].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="rounded-full p-1 bg-primary/10 text-primary mr-3 mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Prerequisites
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="rounded-full p-1 bg-primary/10 text-primary mr-3 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>Basic understanding of programming concepts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full p-1 bg-primary/10 text-primary mr-3 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>Familiarity with web technologies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full p-1 bg-primary/10 text-primary mr-3 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>Enthusiasm to learn and practice</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="animate-fade-in">
              <CourseContent
                courseId={course.id}
                modules={course.modules}
                isEnrolled={isEnrolled}
                onLessonSelect={(lessonId) => {
                  console.log("Selected lesson:", lessonId);
                  // Navigate to lesson
                }}
              />
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="animate-fade-in">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-10">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{course.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(course.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.ratingCount} ratings
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // For demo purposes, generate random percentages
                        const percent =
                          rating === 5
                            ? 65
                            : rating === 4
                            ? 20
                            : rating === 3
                            ? 10
                            : rating === 2
                            ? 3
                            : 2;
                        return (
                          <div key={rating} className="flex items-center">
                            <div className="flex items-center mr-2">
                              <span className="text-sm mr-1">{rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                            <div className="text-sm text-muted-foreground ml-2 w-10">
                              {percent}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Recent Reviews</h3>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-6">
                      Reviews will be displayed here as students provide feedback.
                    </p>
                    {isEnrolled && (
                      <Button>Write a Review</Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Check component for the overview tab
const Check = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CourseDetail;
