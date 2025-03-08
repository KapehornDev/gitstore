
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AppData {
  id: string;
  name: string;
  description: string;
  icon: string;
  stars: number;
  downloads: number;
  authorName: string;
  authorAvatar: string;
  platforms: string[];
}

interface AppCardProps {
  app: AppData;
  featured?: boolean;
  className?: string;
}

const AppCard = ({ app, featured = false, className }: AppCardProps) => {
  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    initial: { 
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  const iconVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    initial: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl bg-card shadow-sm hover:shadow-md transition-all overflow-hidden border",
        featured ? "md:col-span-2 md:row-span-2" : "",
        className
      )}
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
    >
      <Link to={`/app/${app.id}`} className="block h-full w-full">
        <div className={cn(
          "p-5",
          featured ? "md:p-6" : ""
        )}>
          <div className="flex items-start">
            <motion.div 
              className="flex-shrink-0 mr-4"
              variants={iconVariants}
            >
              <img 
                src={app.icon} 
                alt={`${app.name} icon`} 
                className={cn(
                  "rounded-2xl shadow-sm object-cover",
                  featured ? "w-20 h-20" : "w-16 h-16"
                )}
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={cn(
                  "font-display font-semibold text-foreground truncate pr-2", 
                  featured ? "text-xl" : "text-lg"
                )}>
                  {app.name}
                </h3>
                
                <div className="flex items-center space-x-1 text-amber-500 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-medium">{app.stars.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  by {app.authorName}
                </span>
                
                <div className="flex items-center text-muted-foreground">
                  <Download className="w-3 h-3 mr-1" />
                  <span className="text-xs">{app.downloads.toLocaleString()}</span>
                </div>
              </div>
              
              <p className={cn(
                "text-muted-foreground line-clamp-2 mb-3",
                featured ? "text-sm" : "text-xs"
              )}>
                {app.description}
              </p>
              
              <div className="flex items-center flex-wrap gap-2">
                {app.platforms.map((platform) => (
                  <span 
                    key={platform} 
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-accent/70 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      </Link>
    </motion.div>
  );
};

export default AppCard;
