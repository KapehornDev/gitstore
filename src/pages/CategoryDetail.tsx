
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import AppCard, { AppData } from '@/components/AppCard';

// Sample data for category apps - in a real app, this would come from an API
const categoryAppsMap: Record<string, {name: string, apps: AppData[]}> = {
  "development": {
    name: "Development",
    apps: [
      {
        id: '1',
        name: 'VSCode',
        description: 'Code editing. Redefined. Free and open source code editor.',
        icon: 'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png',
        stars: 142000,
        downloads: 5800000,
        authorName: 'Microsoft',
        authorAvatar: 'https://github.com/microsoft.png',
        platforms: ['Windows', 'macOS', 'Linux']
      },
      // More apps would be here
    ]
  },
  // More categories would be defined here
};

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const categoryData = id ? categoryAppsMap[id] : undefined;
  
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
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            {categoryData?.name || 'Category'} Apps
          </h1>
          <p className="text-muted-foreground">
            Browse all {categoryData?.name || 'category'} applications available on GitStore.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData?.apps && categoryData.apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
          
          {(!categoryData || !categoryData.apps || categoryData.apps.length === 0) && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No apps found</h3>
              <p className="text-muted-foreground">There are no apps in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
