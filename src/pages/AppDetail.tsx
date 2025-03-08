
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { 
  ExternalLink, 
  Download, 
  Star, 
  Users, 
  Calendar, 
  Globe, 
  Github, 
  Activity, 
  Shield,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock app data
const appData = {
  id: '1',
  name: 'VSCode',
  description: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity).',
  icon: 'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png',
  stars: 142000,
  forks: 25300,
  downloads: 5800000,
  authorName: 'Microsoft',
  authorAvatar: 'https://github.com/microsoft.png',
  website: 'https://code.visualstudio.com',
  repository: 'https://github.com/microsoft/vscode',
  license: 'MIT',
  platforms: ['Windows', 'macOS', 'Linux'],
  lastUpdated: '2023-11-15',
  version: '1.85.1',
  screenshots: [
    'https://code.visualstudio.com/assets/docs/editor/editingevolved/peek.png',
    'https://code.visualstudio.com/assets/docs/editor/debugging/debugging_hero.png',
    'https://code.visualstudio.com/assets/docs/editor/intellisense/intellisense.png'
  ],
  readme: `# Visual Studio Code

Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity).

## Features

- IntelliSense
- Run and debug your code
- Built-in Git commands
- Extensions for everything
- Deploy with confidence and ease

## Installation

Download the appropriate version for your platform from [Visual Studio Code's website](https://code.visualstudio.com/download).

### Windows

Download the installer and run it.

### macOS

Drag the application to your Applications folder.

### Linux

Follow the installation instructions for your distribution on the download page.
`
};

const AppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? appData.screenshots.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === appData.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link to="/discover" className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2">
                  Apps
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="ml-1 text-sm font-medium text-foreground md:ml-2">
                  {appData.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - App info */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                  <motion.img 
                    src={appData.icon} 
                    alt={`${appData.name} icon`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-md object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <motion.h1 
                      className="text-3xl font-display font-bold mb-2 md:mb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {appData.name}
                    </motion.h1>
                    
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="flex items-center text-amber-500 dark:text-amber-400">
                        <Star className="w-5 h-5 fill-current mr-1" />
                        <span className="font-medium">{appData.stars.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Download className="w-5 h-5 mr-1" />
                        <span className="font-medium">{appData.downloads.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <img 
                      src={appData.authorAvatar} 
                      alt={appData.authorName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-muted-foreground">by <span className="font-medium text-foreground">{appData.authorName}</span></span>
                  </motion.div>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {appData.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {appData.platforms.map((platform) => (
                      <span 
                        key={platform} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {platform}
                      </span>
                    ))}
                    
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                      v{appData.version}
                    </span>
                    
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                      {appData.license}
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <a 
                      href="#" 
                      className="flex-1 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg flex items-center justify-center shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                    
                    <a 
                      href={appData.repository} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-card border text-foreground font-medium px-4 py-2 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                    
                    {appData.website && (
                      <a 
                        href={appData.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 bg-card border text-foreground font-medium px-4 py-2 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Screenshots */}
            <motion.div 
              className="bg-card rounded-xl border shadow-sm p-6 md:p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-display font-semibold mb-6">Screenshots</h2>
              
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-video mb-4">
                <img 
                  src={appData.screenshots[currentImageIndex]} 
                  alt={`${appData.name} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex space-x-2 justify-center">
                {appData.screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`View screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Readme */}
            <motion.div 
              className="bg-card rounded-xl border shadow-sm p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-display font-semibold mb-6">README</h2>
              
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {appData.readme.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.slice(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{paragraph.slice(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                  } else {
                    return <p key={index} className="mb-4">{paragraph}</p>;
                  }
                })}
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Installation info */}
            <motion.div 
              className="bg-card rounded-xl border shadow-sm p-6 mb-8 sticky top-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-display font-semibold text-lg mb-4">App Information</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <span className="block text-sm text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{new Date(appData.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Activity className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <span className="block text-sm text-muted-foreground">Current Version</span>
                    <span className="font-medium">{appData.version}</span>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <span className="block text-sm text-muted-foreground">License</span>
                    <span className="font-medium">{appData.license}</span>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <span className="block text-sm text-muted-foreground">GitHub Forks</span>
                    <span className="font-medium">{appData.forks.toLocaleString()}</span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center text-muted-foreground mb-2">
                  <Info className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Installation Instructions</span>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Download the installer for your platform and follow the setup wizard to install the application.</p>
                  <p>After installation, you can launch the app from your applications folder or start menu.</p>
                </div>
              </div>
              
              <a 
                href="#" 
                className="w-full bg-primary text-primary-foreground font-medium mt-6 px-4 py-2 rounded-lg flex items-center justify-center shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Download for {
                  navigator.platform.includes('Win') ? 'Windows' : 
                  navigator.platform.includes('Mac') ? 'macOS' : 'Linux'
                }
              </a>
              
              <div className="mt-4 flex items-center justify-center">
                <a href="#" className="text-sm text-primary hover:underline">
                  View all download options
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppDetail;
