
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Package, GitFork, Download, Users } from 'lucide-react';

const DeveloperOverview = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app, this would come from Supabase
  const stats = {
    apps: 3,
    repositories: 5,
    downloads: 1254,
    users: 87
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-muted rounded-md w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-muted h-32 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-6">
        Welcome, {user?.user_metadata?.full_name || 'Developer'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Published Apps"
          value={stats.apps}
          icon={<Package className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Connected Repos"
          value={stats.repositories}
          icon={<GitFork className="h-6 w-6" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Downloads"
          value={stats.downloads}
          icon={<Download className="h-6 w-6" />}
          color="bg-green-500"
        />
        <StatCard
          title="Active Users"
          value={stats.users}
          icon={<Users className="h-6 w-6" />}
          color="bg-amber-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {[
              { text: "App 'Terminal Utils' was downloaded 24 times today", time: "2 hours ago" },
              { text: "New version of 'CodeBuddy' was published", time: "Yesterday" },
              { text: "Connected 3 new repositories", time: "3 days ago" }
            ].map((activity, index) => (
              <li key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
                <p className="text-sm">{activity.text}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary/10 hover:bg-primary/20 text-primary rounded-lg p-4 text-center transition-colors">
              <Package className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add New App</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary rounded-lg p-4 text-center transition-colors">
              <GitFork className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Connect Repo</span>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary rounded-lg p-4 text-center transition-colors col-span-2">
              <span className="text-sm font-medium">View Documentation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex items-center">
      <div className={`${color} text-white p-3 rounded-lg mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default DeveloperOverview;
