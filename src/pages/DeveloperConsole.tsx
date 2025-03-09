
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DeveloperSidebar from '@/components/developer/DeveloperSidebar';
import DeveloperOverview from '@/components/developer/DeveloperOverview';
import RepositoryList from '@/components/developer/RepositoryList';
import AppsList from '@/components/developer/AppsList';
import { useToast } from '@/hooks/use-toast';

type ActiveView = 'overview' | 'repositories' | 'apps' | 'settings';

const DeveloperConsole = () => {
  const { user, isUserDeveloper } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<ActiveView>('overview');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user is authenticated and is a developer
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the developer console.",
        variant: "destructive"
      });
      navigate('/auth/login');
      return;
    }

    if (!isUserDeveloper()) {
      toast({
        title: "Developer account required",
        description: "You need a developer account to access this page.",
        variant: "destructive"
      });
      navigate('/developers');
      return;
    }
  }, [user, isUserDeveloper, navigate, toast]);

  // Render the active view component
  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DeveloperOverview />;
      case 'repositories':
        return <RepositoryList />;
      case 'apps':
        return <AppsList />;
      default:
        return <DeveloperOverview />;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen bg-muted/30">
        <DeveloperSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl shadow-sm p-6"
          >
            {renderActiveView()}
          </motion.div>
        </main>
      </div>
    </Layout>
  );
};

export default DeveloperConsole;
