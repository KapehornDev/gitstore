
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, FileText, Github } from 'lucide-react';

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const supportOptions = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Community Forums",
      description: "Connect with other developers and users to get help with common issues.",
      buttonText: "Visit Forums",
      buttonLink: "#"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Contact our support team directly for personalized assistance with your account.",
      buttonText: "Email Us",
      buttonLink: "mailto:support@gitstore.app"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation",
      description: "Browse our comprehensive documentation for detailed guides and tutorials.",
      buttonText: "Read Docs",
      buttonLink: "/docs"
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub Issues",
      description: "Report bugs or request features directly through our GitHub repository.",
      buttonText: "Open Issue",
      buttonLink: "https://github.com/gitstore/issues"
    }
  ];

  const faqs = [
    {
      question: "How do I register my app on GitStore?",
      answer: "You need to sign up with your GitHub account, link your repository, and add a .GitStore file with your app's metadata and installation instructions."
    },
    {
      question: "Is GitStore free to use?",
      answer: "Yes, GitStore is free for both developers and users. We may offer premium features in the future, but the core functionality will always be free."
    },
    {
      question: "Which platforms does GitStore support?",
      answer: "GitStore supports Windows, macOS, Linux, Android, and iOS. Developers can specify which platforms their app supports in the .GitStore file."
    },
    {
      question: "How do updates work?",
      answer: "When you push a new release to your GitHub repository, GitStore will automatically detect the update and notify users who have installed your app."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need help with GitStore? We're here to assist you. Choose from one of our support options below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-xl p-6 bg-card"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">
                  {option.icon}
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold mb-2">{option.title}</h2>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <a 
                    href={option.buttonLink} 
                    className="text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    {option.buttonText}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-display font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Support;
