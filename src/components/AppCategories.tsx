
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Gamepad2, 
  Music, 
  FileEdit, 
  Cpu, 
  MessageSquare, 
  MonitorSmartphone,
  Camera,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface CategoryProps {
  icon: React.ReactNode;
  color: string;
  name: string;
  count: number;
  path: string;
}

const categories: CategoryProps[] = [
  {
    icon: <Code />,
    color: 'bg-blue-500/10 text-blue-500',
    name: 'Development',
    count: 1248,
    path: '/category/development'
  },
  {
    icon: <Gamepad2 />,
    color: 'bg-purple-500/10 text-purple-500',
    name: 'Games',
    count: 856,
    path: '/category/games'
  },
  {
    icon: <Music />,
    color: 'bg-pink-500/10 text-pink-500',
    name: 'Music & Audio',
    count: 643,
    path: '/category/music-audio'
  },
  {
    icon: <FileEdit />,
    color: 'bg-orange-500/10 text-orange-500',
    name: 'Productivity',
    count: 1072,
    path: '/category/productivity'
  },
  {
    icon: <Cpu />,
    color: 'bg-green-500/10 text-green-500',
    name: 'Utilities',
    count: 1452,
    path: '/category/utilities'
  },
  {
    icon: <MessageSquare />,
    color: 'bg-yellow-500/10 text-yellow-500',
    name: 'Communication',
    count: 528,
    path: '/category/communication'
  },
  {
    icon: <MonitorSmartphone />,
    color: 'bg-sky-500/10 text-sky-500',
    name: 'Cross-Platform',
    count: 936,
    path: '/category/cross-platform'
  },
  {
    icon: <Camera />,
    color: 'bg-red-500/10 text-red-500',
    name: 'Photo & Video',
    count: 732,
    path: '/category/photo-video'
  },
  {
    icon: <Layers />,
    color: 'bg-indigo-500/10 text-indigo-500',
    name: 'Design',
    count: 489,
    path: '/category/design'
  },
  {
    icon: <ShieldCheck />,
    color: 'bg-emerald-500/10 text-emerald-500',
    name: 'Security',
    count: 374,
    path: '/category/security'
  },
];

const CategoryCard = ({ icon, color, name, count, path }: CategoryProps) => {
  return (
    <Link to={path}>
      <motion.div 
        className="rounded-xl border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-6 h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className={cn("p-3 rounded-lg mb-4", color)}>
            {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
          </div>
          <h3 className="font-medium text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{count.toLocaleString()} apps</p>
        </div>
      </motion.div>
    </Link>
  );
};

const AppCategories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Browse By</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">App Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore applications across various categories, from development tools to games and productivity suites.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AppCategories;
