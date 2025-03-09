
import { Link } from 'react-router-dom';
import { Github, LayoutDashboard, Package, GitFork, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DeveloperSidebarProps {
  activeView: string;
  setActiveView: (view: 'overview' | 'repositories' | 'apps' | 'settings') => void;
}

const DeveloperSidebar = ({ activeView, setActiveView }: DeveloperSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <aside className="w-full md:w-64 md:min-h-[calc(100vh-4rem)] bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Github className="h-6 w-6 text-primary mr-3" />
          <h2 className="text-lg font-semibold">GitStore Console</h2>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveView('overview')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeView === 'overview' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('repositories')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeView === 'repositories' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <GitFork className="h-5 w-5 mr-3" />
              Repositories
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('apps')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeView === 'apps' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <Package className="h-5 w-5 mr-3" />
              My Apps
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-border bg-card md:w-64">
        <ul className="space-y-2">
          <li>
            <Link to="/settings" className="w-full text-left px-4 py-2 rounded-lg flex items-center hover:bg-muted/50 transition-colors">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={signOut}
              className="w-full text-left px-4 py-2 rounded-lg flex items-center text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DeveloperSidebar;
