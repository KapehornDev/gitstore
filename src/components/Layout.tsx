
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Github, Store, Search, User, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Discover', path: '/discover', icon: <Search className="h-4 w-4 mr-2" /> },
    { name: 'Categories', path: '/categories', icon: <Store className="h-4 w-4 mr-2" /> },
    { name: 'For Developers', path: '/developers', icon: <Github className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all-300",
          isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 transition-all-200 hover:opacity-80">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-semibold">GitStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium flex items-center transition-all-200",
                    "hover:text-primary text-foreground/80 hover:text-foreground",
                    location.pathname === item.path && "text-primary"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right section - auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/auth/login" 
                className="text-sm font-medium hover:text-primary transition-all-200"
              >
                Log in
              </Link>
              <Link 
                to="/auth/signup" 
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all-200"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="pt-20 pb-6 px-6 flex flex-col h-full">
            <nav className="flex flex-col space-y-6 animate-fade-in-up">
              {navItems.map((item, i) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between text-lg font-medium p-2 rounded-md",
                    "transition-all-200 hover:bg-muted",
                    location.pathname === item.path ? "text-primary" : "text-foreground/80",
                    "animate-fade-in-up",
                    { "animation-delay-100": i === 1, "animation-delay-200": i === 2 }
                  )}
                >
                  <div className="flex items-center">
                    {React.cloneElement(item.icon, { className: "h-5 w-5 mr-3" })}
                    {item.name}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t border-border flex flex-col space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link 
                to="/auth/login" 
                className="w-full py-3 text-center text-foreground font-medium rounded-lg border border-border hover:bg-muted transition-all-200"
              >
                Log in
              </Link>
              <Link 
                to="/auth/signup" 
                className="w-full py-3 text-center text-primary-foreground font-medium bg-primary rounded-lg hover:bg-primary/90 transition-all-200"
              >
                Sign up with GitHub
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Store className="h-5 w-5 text-primary" />
                <span className="text-lg font-display font-semibold">GitStore</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The cross-platform app store powered by GitHub repositories.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discover Apps</Link></li>
                <li><Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</Link></li>
                <li><Link to="/developers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Developers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GitStore. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
