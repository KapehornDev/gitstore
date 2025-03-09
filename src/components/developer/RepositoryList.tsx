
import { useState } from 'react';
import { GitFork, Plus, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for repositories
const mockRepositories = [
  { id: 1, name: 'code-buddy', description: 'AI coding assistant for developers', stars: 127, isConnected: true },
  { id: 2, name: 'terminal-utils', description: 'A collection of useful terminal utilities', stars: 89, isConnected: true },
  { id: 3, name: 'web-scraper', description: 'Simple web scraper with proxy support', stars: 54, isConnected: true },
  { id: 4, name: 'markdown-previewer', description: 'Live markdown preview tool', stars: 32, isConnected: false },
  { id: 5, name: 'react-components', description: 'Reusable React component library', stars: 213, isConnected: false }
];

const RepositoryList = () => {
  const [repositories, setRepositories] = useState(mockRepositories);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRepositories = repositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleConnection = (id: number) => {
    setRepositories(repositories.map(repo => 
      repo.id === id ? { ...repo, isConnected: !repo.isConnected } : repo
    ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">GitHub Repositories</h1>
          <p className="text-muted-foreground">Connect your GitHub repositories to GitStore</p>
        </div>
        <button className="mt-4 md:mt-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center self-start">
          <Plus className="h-4 w-4 mr-2" />
          Connect New Repository
        </button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search repositories..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      
      <div className="space-y-4">
        {filteredRepositories.length > 0 ? (
          filteredRepositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex items-start md:items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <GitFork className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">⭐ {repo.stars} stars</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => handleToggleConnection(repo.id)}
                  className={`text-sm px-3 py-1 rounded-md mr-2 ${
                    repo.isConnected 
                      ? 'bg-green-500/20 text-green-600' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {repo.isConnected ? 'Connected' : 'Connect'}
                </button>
                
                <button className="rounded-full p-1 hover:bg-muted transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 bg-card border border-border rounded-lg">
            <GitFork className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold">No repositories found</h3>
            <p className="text-muted-foreground">Try with a different search or connect a new repository</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryList;
