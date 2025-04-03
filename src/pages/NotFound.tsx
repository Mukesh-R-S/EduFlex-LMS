
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-6 bg-primary/10 text-primary rounded-full mb-6">
            <Search className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for:
            <br />
            <span className="font-mono text-sm bg-secondary px-2 py-1 rounded mt-2 inline-block">
              {location.pathname}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
