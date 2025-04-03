
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/dashboard/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X } from "lucide-react";
import { coursesData } from "@/lib/data";
import { Course } from "@/types";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique topics
  const allTopics = Array.from(
    new Set(coursesData.flatMap((course) => course.topics))
  ).sort();

  // Filter courses based on search term, price range, level, and topic
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      course.price >= priceRange[0] && course.price <= priceRange[1];

    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    const matchesTopic =
      selectedTopic === "all" || course.topics.includes(selectedTopic);

    return matchesSearch && matchesPrice && matchesLevel && matchesTopic;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100]);
    setSelectedLevel("all");
    setSelectedTopic("all");
  };

  // Format price to display as a range
  const formatPriceRange = () => {
    return `$${priceRange[0]} - $${priceRange[1]}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Browse Courses
              </h1>
              <p className="text-muted-foreground">
                Explore our library of expert-led courses to advance your skills
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex">
              <Button
                variant="outline"
                className="flex items-center gap-2 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <X size={18} /> : <Filter size={18} />}
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            {/* Filters - Desktop */}
            <div className="lg:col-span-1 hidden md:block animate-fade-in">
              <div className="bg-white rounded-lg border p-6 space-y-6 sticky top-24">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">Filters</h2>
                  {(searchTerm || selectedLevel !== "all" || selectedTopic !== "all" || priceRange[0] > 0 || priceRange[1] < 100) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatPriceRange()}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={setPriceRange}
                  />
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Level</h3>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Topic</h3>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {allTopics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="col-span-full md:hidden mb-6 animate-fade-in">
                <div className="bg-white rounded-lg border p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Filters</h2>
                    {(searchTerm || selectedLevel !== "all" || selectedTopic !== "all" || priceRange[0] > 0 || priceRange[1] < 100) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 text-xs"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Price Range */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        <span className="text-sm text-muted-foreground">
                          {formatPriceRange()}
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={setPriceRange}
                      />
                    </div>

                    {/* Level */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Level</h3>
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Topic */}
                    <div className="space-y-2 sm:col-span-2">
                      <h3 className="text-sm font-medium">Topic</h3>
                      <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Topics" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Topics</SelectItem>
                          {allTopics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Listings */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search */}
              <div className="relative animate-fade-in">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 animate-fade-in">
                {selectedLevel !== "all" && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Level: {selectedLevel}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setSelectedLevel("all")}
                    />
                  </Badge>
                )}
                {selectedTopic !== "all" && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Topic: {selectedTopic}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setSelectedTopic("all")}
                    />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 100) && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Price: {formatPriceRange()}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setPriceRange([0, 100])}
                    />
                  </Badge>
                )}
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground animate-fade-in">
                Showing {filteredCourses.length} results
              </div>

              {/* Course Cards */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-10 animate-fade-in">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course, index) => (
                    <div 
                      key={course.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index % 4 * 100}ms` }}
                    >
                      <CourseCard
                        course={course}
                        showProgress={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
