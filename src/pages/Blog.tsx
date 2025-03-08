
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Introducing GitStore: Simplifying App Distribution",
      excerpt: "Today, we're excited to announce the launch of GitStore, a new platform for distributing applications directly from GitHub repositories.",
      date: "May 15, 2023",
      author: "GitStore Team",
      category: "Announcements",
      slug: "/blog/introducing-gitstore"
    },
    {
      id: 2,
      title: "How to Create the Perfect GitStore File",
      excerpt: "Learn how to create a GitStore file that makes your application easy to install across multiple platforms.",
      date: "May 20, 2023",
      author: "Jane Developer",
      category: "Tutorials",
      slug: "/blog/perfect-gitstore-file"
    },
    {
      id: 3,
      title: "The Future of App Distribution",
      excerpt: "How GitHub-powered distribution is changing the way developers share their applications with users.",
      date: "May 25, 2023",
      author: "John Smith",
      category: "Insights",
      slug: "/blog/future-of-app-distribution"
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
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-3xl">
            News, updates, and insights from the GitStore team.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-xl overflow-hidden bg-card"
            >
              <div className="aspect-video bg-muted"></div>
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-xl font-display font-semibold mb-3">
                  <Link to={post.slug} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{post.author}</span>
                  <Link 
                    to={post.slug} 
                    className="text-sm text-primary font-medium flex items-center hover:text-primary/80 transition-colors"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
