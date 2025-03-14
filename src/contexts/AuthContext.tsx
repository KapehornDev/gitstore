
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string, captchaToken: string, role?: 'user' | 'developer') => Promise<void>;
  signOut: () => Promise<void>;
  getUserRole: () => 'user' | 'developer' | null;
  isUserDeveloper: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state change event:", _event);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string, captchaToken?: string) => {
    try {
      setIsLoading(true);
      
      let options = {};
      if (captchaToken) {
        options = {
          captchaToken
        };
      }
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options
      });
      
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with GitHub
  const signInWithGitHub = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'read:user user:email repo',
        }
      });
      
      if (error) throw error;
      
      // The redirect happens automatically, this is just for logging
      console.log("GitHub OAuth initiated", data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "GitHub sign in failed",
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, fullName: string, captchaToken: string, role: 'user' | 'developer' = 'user') => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            role: role, // Set role based on user selection
          },
          captchaToken: captchaToken
        }
      });
      
      if (error) throw error;
      toast({
        title: "Account created",
        description: "Check your email for a confirmation link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get user role from metadata
  const getUserRole = (): 'user' | 'developer' | null => {
    if (!user) return null;
    
    const role = user.user_metadata?.role as string;
    return (role === 'developer') ? 'developer' : 'user';
  };

  // Check if user is a developer
  const isUserDeveloper = (): boolean => {
    return getUserRole() === 'developer';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signIn, 
      signInWithGitHub,
      signUp, 
      signOut,
      getUserRole,
      isUserDeveloper
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
