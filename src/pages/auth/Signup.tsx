
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Github, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const { signUp, signInWithGitHub, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      toast({
        title: "Welcome to GitStore!",
        description: "Please check your email to confirm your account.",
      });
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue with GitHub.",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await signInWithGitHub();
      // Redirect happens automatically
    } catch (error: any) {
      console.error('GitHub signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[calc(100vh-16rem)]">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-display font-bold tracking-tight mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Join GitStore to discover and distribute great applications.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeveloper(false)}
                  className={`px-4 py-2 rounded-l-lg border ${
                    !isDeveloper 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeveloper(true)}
                  className={`px-4 py-2 rounded-r-lg border ${
                    isDeveloper 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  Developer
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleGithubSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
              {isDeveloper && <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full ml-2">Recommended for Developers</span>}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card"
                  required
                />
              </div>
              
              <div className="flex items-start gap-2">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 border border-border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
            
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="mb-2 font-medium">By signing up, you get:</p>
                <ul className="space-y-1">
                  {isDeveloper ? [
                    "Access to developer dashboard",
                    "App publishing capabilities",
                    "Analytics for your published apps"
                  ] : [
                    "Personalized app recommendations",
                    "Download history and favorites",
                    "Early access to new releases"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
