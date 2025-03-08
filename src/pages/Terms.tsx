
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const Terms = () => {
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
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">Terms of Service</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p className="text-lg text-muted-foreground mb-6">
              Last Updated: May 2023
            </p>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the GitStore application and services. Please read these Terms carefully.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Acceptance of Terms</h2>
            <p>
              By creating an account, accessing, or using GitStore, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Using GitStore</h2>
            <p>
              You may use GitStore only in compliance with these Terms and all applicable laws. You are responsible for all activity that occurs under your account.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Developer Content</h2>
            <p>
              Developers are solely responsible for the applications they distribute through GitStore, including compliance with all applicable laws and regulations.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Termination</h2>
            <p>
              We may terminate or suspend your access to GitStore immediately, without prior notice or liability, for any reason.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Terms;
