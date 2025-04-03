
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInClick = () => {
    navigate("/auth");
    setIsMobileMenuOpen(false);
  };

  const handleSignUpClick = () => {
    navigate("/auth", { state: { defaultTab: "signup" } });
    setIsMobileMenuOpen(false);
  };

  const handleSignOutClick = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user || !user.user_metadata?.name) return "U";
    const name = user.user_metadata.name;
    return name.charAt(0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-display font-bold text-primary flex items-center gap-2"
        >
          <span className="bg-primary text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold">
            E
          </span>
          <span className="hidden sm:inline">EduFlex</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/courses"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Courses
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-8 h-8 border border-border transition-all hover:border-primary cursor-pointer">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOutClick} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSignInClick}>
                Sign In
              </Button>
              <Button variant="default" size="sm" onClick={handleSignUpClick}>
                Sign Up
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/courses"
              className="block px-4 py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className="block px-4 py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            {!user && (
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleSignInClick} className="w-full">
                  Sign In
                </Button>
                <Button variant="default" size="sm" onClick={handleSignUpClick} className="w-full">
                  Sign Up
                </Button>
              </div>
            )}
            {user && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleSignOutClick} 
                className="mt-4 w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
