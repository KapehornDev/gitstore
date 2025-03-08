
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AppCard, { AppData } from './AppCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for featured apps
const featuredApps: AppData[] = [
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
  }
];

const FeaturedApps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-sm font-medium text-primary mb-2 inline-block">Curated Selection</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Featured Apps</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover trending and popular applications across multiple platforms, all installable with a single click.
            </p>
          </div>
          
          <Link 
            to="/discover" 
            className="group mt-4 md:mt-0 inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View All Apps
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredApps.map((app, index) => (
            <motion.div 
              key={app.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <AppCard 
                app={app} 
                featured={index === 0} 
                className={index === 0 ? "md:col-span-2" : ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedApps;
