
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedApps from '@/components/FeaturedApps';
import AppCategories from '@/components/AppCategories';
import { ArrowRight, Github, Package, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Apps Section */}
      <FeaturedApps />
      
      {/* Categories Section */}
      <AppCategories />
      
      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary mb-2 inline-block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">How GitStore Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GitStore connects developers and users through a seamless GitHub-powered experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Github className="h-8 w-8" />,
                title: "Connect with GitHub",
                description: "Developers register apps by linking their GitHub repositories to GitStore."
              },
              {
                icon: <Package className="h-8 w-8" />,
                title: "Configure Installation",
                description: "Add a .GitStore file to your repo with app metadata and installation instructions."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Distribution",
                description: "Users install apps directly from GitHub repositories with GitStore's verification."
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
      </section>
      
      {/* Developer CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Ready to share your app with the world?</h2>
                  <p className="text-muted-foreground mb-6">
                    Join GitStore as a developer and distribute your applications to users across all platforms.
                  </p>
                  <Link 
                    to="/developers" 
                    className="inline-flex items-center hover-lift bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 transition-all"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="w-full md:w-2/5">
                  <div className="bg-card border p-6 rounded-xl shadow-sm">
                    <pre className="text-xs overflow-auto p-2 bg-muted rounded-lg">
<code className="text-foreground">{`// Sample .GitStore file
{
  "name": "YourApp",
  "version": "1.0.0",
  "platforms": ["Windows", "macOS"],
  "installCommand": "./install.sh",
  "githubRepo": "your-org/your-app",
  "screenshots": ["img1.png", "img2.png"]
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
