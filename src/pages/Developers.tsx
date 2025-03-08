
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Github, Upload, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Developers = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-primary mb-2 inline-block">For Developers</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Distribute your apps directly through GitHub
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              GitStore provides a seamless way to share your applications with users across all platforms, leveraging the power of GitHub repositories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/auth/signup" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 transition-all inline-flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                Sign Up with GitHub
              </Link>
              <Link 
                to="/docs" 
                className="bg-card text-foreground border border-border px-6 py-3 rounded-full font-medium inline-flex items-center shadow-md hover:shadow-lg transition-all"
              >
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">How to Register Your App</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to make your application available through GitStore in minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {[
            {
              icon: <Github className="h-8 w-8" />,
              title: "Connect with GitHub",
              description: "Sign up with your GitHub account and authorize GitStore to access your repositories."
            },
            {
              icon: <Upload className="h-8 w-8" />,
              title: "Configure Your App",
              description: "Add a .GitStore file to your repository with app metadata and installation instructions."
            },
            {
              icon: <Settings className="h-8 w-8" />,
              title: "Manage Distribution",
              description: "Control app visibility, updates, and monitor installation metrics through the developer dashboard."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Developer Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to get started with distributing your apps through GitStore.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Documentation",
                description: "Comprehensive guides to help you integrate your apps with GitStore.",
                link: "/docs"
              },
              {
                title: "API Reference",
                description: "Detailed API documentation for advanced integration options.",
                link: "/docs/api"
              },
              {
                title: "Example Projects",
                description: "Sample repositories with GitStore integration to help you get started.",
                link: "/docs/examples"
              },
              {
                title: "Support",
                description: "Get help from our team and community of developers.",
                link: "/support"
              }
            ].map((resource, index) => (
              <Link 
                key={index}
                to={resource.link}
                className="bg-card hover:bg-card/90 border rounded-xl p-6 flex flex-col h-full transition-all hover:shadow-md"
              >
                <h3 className="text-xl font-display font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Developers;
