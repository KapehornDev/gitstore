
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">About GitStore</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p className="text-lg text-muted-foreground mb-6">
              GitStore is a cross-platform app store that simplifies distribution for developers and discovery for users, powered by GitHub repositories.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to create an open, developer-friendly ecosystem for application distribution that leverages the power, security, and familiarity of GitHub.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">The Platform</h2>
            <p>
              GitStore connects directly to GitHub repositories, allowing developers to share their applications with users across all platforms without the restrictions of traditional app stores.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">The Team</h2>
            <p>
              We're a team of developers who understand the challenges of app distribution. GitStore was born from our own frustrations with existing solutions and the desire to create something better.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
