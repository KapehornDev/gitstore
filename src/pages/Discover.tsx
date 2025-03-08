
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import AppCard, { AppData } from '@/components/AppCard';
import { Search, Filter, X } from 'lucide-react';

// Sample data for apps
const allApps: AppData[] = [
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
  {
    id: '2',
    name: 'Figma',
    description: 'Design, prototype, and gather feedback all in one place with Figma.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    stars: 58000,
    downloads: 3200000,
    authorName: 'Figma, Inc.',
    authorAvatar: 'https://github.com/figma.png',
    platforms: ['Windows', 'macOS', 'Linux', 'Web']
  },
  {
    id: '3',
    name: 'Signal',
    description: 'Privacy-focused messaging app with end-to-end encryption.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg',
    stars: 75000,
    downloads: 7500000,
    authorName: 'Signal Foundation',
    authorAvatar: 'https://github.com/signalapp.png',
    platforms: ['Android', 'iOS', 'Windows', 'macOS', 'Linux']
  },
  {
    id: '4',
    name: 'Obsidian',
    description: 'Powerful knowledge base that works on top of local Markdown files.',
    icon: 'https://obsidian.md/images/obsidian-logo-gradient.svg',
    stars: 42000,
    downloads: 1800000,
    authorName: 'Obsidian',
    authorAvatar: 'https://github.com/obsidianmd.png',
    platforms: ['Windows', 'macOS', 'Linux', 'iOS', 'Android']
  },
  {
    id: '5',
    name: 'Insomnia',
    description: 'The API Design Platform. Design, debug, and test APIs like a human, not a robot.',
    icon: 'https://insomnia.rest/images/insomnia-logo.svg',
    stars: 27000,
    downloads: 950000,
    authorName: 'Kong',
    authorAvatar: 'https://github.com/kong.png',
    platforms: ['Windows', 'macOS', 'Linux']
  },
  {
    id: '6',
    name: 'Discord',
    description: 'Chat, hang out, and stay close with your friends and communities.',
    icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png',
    stars: 68000,
    downloads: 12500000,
    authorName: 'Discord Inc.',
    authorAvatar: 'https://github.com/discord.png',
    platforms: ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web']
  },
  {
    id: '7',
    name: 'Audacity',
    description: 'Free, open source, cross-platform audio software for multi-track recording and editing.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Audacity_Logo_nofilter.svg',
    stars: 32000,
    downloads: 4200000,
    authorName: 'Audacity Team',
    authorAvatar: 'https://github.com/audacity.png',
    platforms: ['Windows', 'macOS', 'Linux']
  },
  {
    id: '8',
    name: 'OBS Studio',
    description: 'Free and open source software for video recording and live streaming.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/OBS.svg',
    stars: 44000,
    downloads: 8900000,
    authorName: 'OBS Project',
    authorAvatar: 'https://github.com/obsproject.png',
    platforms: ['Windows', 'macOS', 'Linux']
  }
];

const platformOptions = [
  'Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web'
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'downloads'>('popular');
  const [filteredApps, setFilteredApps] = useState<AppData[]>(allApps);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters when search or filters change
  useEffect(() => {
    let result = [...allApps];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        app => app.name.toLowerCase().includes(query) || 
               app.description.toLowerCase().includes(query) ||
               app.authorName.toLowerCase().includes(query)
      );
    }
    
    // Apply platform filter
    if (selectedPlatforms.length > 0) {
      result = result.filter(
        app => selectedPlatforms.some(platform => app.platforms.includes(platform))
      );
    }
    
    // Apply sorting
    if (sortBy === 'popular') {
      result = result.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === 'downloads') {
      result = result.sort((a, b) => b.downloads - a.downloads);
    }
    
    setFilteredApps(result);
  }, [searchQuery, selectedPlatforms, sortBy]);

  const togglePlatformFilter = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSortBy('popular');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Discover Apps</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of applications from GitHub repositories,
            ready to install on your preferred platform.
          </p>
        </motion.div>
        
        {/* Search and filters */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="glass rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps..."
                  className="block w-full rounded-lg border-input bg-background pl-10 py-2 px-3 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              
              {/* Platform filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatformFilter(platform)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedPlatforms.includes(platform)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort options */}
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-muted-foreground">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="block w-full rounded-lg border-input bg-background py-2 px-3 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="downloads">Most Downloads</option>
                    <option value="newest">Newest</option>
                  </select>
                  
                  {(searchQuery || selectedPlatforms.length > 0 || sortBy !== 'popular') && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Results count */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredApps.length}</span> apps
            {searchQuery && (
              <> matching "<span className="font-medium text-foreground">{searchQuery}</span>"</>
            )}
            {selectedPlatforms.length > 0 && (
              <> for <span className="font-medium text-foreground">{selectedPlatforms.join(', ')}</span></>
            )}
          </p>
        </motion.div>
        
        {/* App grid */}
        {filteredApps.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <AppCard app={app} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-medium mb-2">No apps found</p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
