
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Code } from "lucide-react";
import { coursesData } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const Index = () => {
  const featuredCourses = coursesData.slice(0, 3);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth', { state: { defaultTab: 'signup' } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-5">
              Transform Your Career Path
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Master New Skills with
              <span className="text-primary"> Immersive</span> Learning
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Join thousands of learners mastering in-demand skills through our
              interactive platform. Learn at your own pace with expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="px-8">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in animation-delay-150">
            <img
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Students learning online"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-slide-up delay-300">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">50,000+</p>
                  <p className="text-sm text-muted-foreground">
                    Students globally
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 animate-slide-up delay-500">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">300+</p>
                  <p className="text-sm text-muted-foreground">
                    Expert-led courses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses and start your learning journey
              today with expert instructors and comprehensive content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="animate-fade-in">
                <CourseCard course={course} showProgress={false} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="outline" className="group">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose EduFlex
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to provide you with the best learning
              experience possible, with features that set us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry experts with years of practical experience in
                their fields, providing insights beyond the curriculum.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-150">
              <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Content</h3>
              <p className="text-muted-foreground">
                Access a wide range of courses covering everything from
                programming to design, with regularly updated content.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-300">
              <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hands-On Learning</h3>
              <p className="text-muted-foreground">
                Practice what you learn with interactive exercises, coding
                challenges, and real-world projects to build your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-fade-in">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-150">
            Join thousands of students who are already transforming their
            careers with our comprehensive courses and expert instructors.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 animate-fade-in animation-delay-300"
            onClick={handleGetStarted}
          >
            {user ? "Continue Learning" : "Sign Up for Free"}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
