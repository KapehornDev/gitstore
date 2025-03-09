
import { useState } from 'react';
import { Package, Plus, Search, MoreVertical, Download, Eye, Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for apps
const mockApps = [
  { 
    id: 1, 
    name: 'CodeBuddy', 
    description: 'AI coding assistant for developers',
    repository: 'user/code-buddy',
    category: 'Development',
    downloads: 876,
    platform: 'Cross-platform',
    status: 'published'
  },
  { 
    id: 2, 
    name: 'Terminal Utils', 
    description: 'A collection of useful terminal utilities',
    repository: 'user/terminal-utils',
    category: 'Utilities',
    downloads: 324,
    platform: 'macOS, Linux',
    status: 'published'
  },
  { 
    id: 3, 
    name: 'Web Scraper', 
    description: 'Simple web scraper with proxy support',
    repository: 'user/web-scraper',
    category: 'Development',
    downloads: 54,
    platform: 'Windows, Linux',
    status: 'draft'
  }
];

const AppsList = () => {
  const [apps, setApps] = useState(mockApps);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">My Apps</h1>
          <p className="text-muted-foreground">Manage your GitStore applications</p>
        </div>
        <button className="mt-4 md:mt-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center self-start">
          <Plus className="h-4 w-4 mr-2" />
          Create New App
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search apps..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'published' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            Published
          </button>
          <button 
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'draft' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start md:items-center mb-4 md:mb-0">
                  <div className={`p-3 rounded-lg mr-4 ${
                    app.status === 'published' ? 'bg-green-500/10' : 'bg-amber-500/10'
                  }`}>
                    <Package className={`h-5 w-5 ${
                      app.status === 'published' ? 'text-green-500' : 'text-amber-500'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold mr-2">{app.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        app.status === 'published' 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-amber-500/20 text-amber-600'
                      }`}>
                        {app.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex flex-col mr-4 text-right">
                    <span className="text-sm font-medium">{app.downloads} downloads</span>
                    <span className="text-xs text-muted-foreground">{app.platform}</span>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-full p-2 hover:bg-muted transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit App
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download Statistics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-500">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete App
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                <div className="text-xs bg-muted px-2 py-1 rounded-full">
                  Category: {app.category}
                </div>
                <div className="text-xs bg-muted px-2 py-1 rounded-full">
                  Repo: {app.repository}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 bg-card border border-border rounded-lg">
            <Package className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold">No apps found</h3>
            <p className="text-muted-foreground">Try with a different search or create a new app</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppsList;
