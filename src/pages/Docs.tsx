
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Docs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const docCategories = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction to GitStore", link: "/docs/intro" },
        { title: "Creating a Developer Account", link: "/docs/account" },
        { title: "Registering Your First App", link: "/docs/first-app" }
      ]
    },
    {
      title: "GitStore Files",
      items: [
        { title: "File Format Specification", link: "/docs/file-spec" },
        { title: "Installation Instructions", link: "/docs/installation" },
        { title: "Multi-Platform Support", link: "/docs/platforms" }
      ]
    },
    {
      title: "Deployment & Distribution",
      items: [
        { title: "Release Management", link: "/docs/releases" },
        { title: "Analytics & Metrics", link: "/docs/analytics" },
        { title: "User Feedback", link: "/docs/feedback" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-muted-foreground max-w-3xl">
            Everything you need to know about GitStore, from getting started to advanced features.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {docCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-xl p-6 bg-card"
            >
              <h2 className="text-xl font-display font-semibold mb-4">{category.title}</h2>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.link}
                      className="flex items-center justify-between text-foreground hover:text-primary transition-colors"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-8 border rounded-xl bg-secondary/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-display font-semibold mb-2">Can't find what you're looking for?</h2>
              <p className="text-muted-foreground">Our support team is here to help.</p>
            </div>
            <Link
              to="/support"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
