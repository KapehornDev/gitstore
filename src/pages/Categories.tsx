
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import AppCategories from '@/components/AppCategories';

const Categories = () => {
  // Scroll to top on page load
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
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">App Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse applications across various categories, from development tools to games and productivity suites.
          </p>
        </motion.div>
        
        <AppCategories />
      </div>
    </Layout>
  );
};

export default Categories;
