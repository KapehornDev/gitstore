
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const Privacy = () => {
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
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p className="text-lg text-muted-foreground mb-6">
              Last Updated: May 2023
            </p>
            <p>
              At GitStore, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you register for an account, create or modify your profile, and when you download or install applications through our service.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to personalize the applications and content you see.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Sharing Your Information</h2>
            <p>
              We may share your information with third-party developers when you install their applications, and with service providers who perform services on our behalf.
            </p>
            <h2 className="text-2xl font-display font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@gitstore.app.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Privacy;
