
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [backgroundPos, setBackgroundPos] = useState({ x: 0, y: 0 });

  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      setBackgroundPos({ x: x * -20, y: y * -20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background to-secondary/50 z-0"
        style={{ 
          backgroundPosition: `${50 + backgroundPos.x}% ${50 + backgroundPos.y}%`,
          transition: 'background-position 0.1s ease-out'
        }}
      ></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCAzLjk5LTEuNzggMy45OS0zLjk4Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-20 text-center">
          {/* Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Introducing GitStore Beta
            </span>
          </motion.div>
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 max-w-4xl text-balance"
          >
            <span className="text-shadow">Discover and distribute apps directly from </span>
            <span className="relative">
              <span className="relative z-10 text-primary">GitHub</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/20 rounded-sm -z-0"></span>
            </span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            The cross-platform app store that simplifies distribution for developers and discovery for users, powered by GitHub repositories.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              to="/discover" 
              className="hover-lift bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium inline-flex items-center shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              Discover Apps
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link 
              to="/developers" 
              className="hover-lift bg-card text-foreground border border-border px-6 py-3 rounded-full font-medium inline-flex items-center shadow-md hover:shadow-lg transition-all"
            >
              <Github className="mr-2 h-4 w-4" />
              Register Your App
            </Link>
          </motion.div>
          
          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-4xl"
          >
            {[
              {
                title: "Cross-Platform",
                description: "Find apps for Windows, macOS, Linux, iOS, and Android, all in one place."
              },
              {
                title: "GitHub Powered",
                description: "Directly connect to GitHub repositories for seamless app distribution."
              },
              {
                title: "Developer Friendly",
                description: "Register your apps with a simple .GitStore file in your repository."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
