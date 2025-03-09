
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Callback = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If we already have a user session, redirect to home
    if (user) {
      navigate('/', { replace: true });
      return;
    }

    // Process the OAuth callback
    const processOAuthCallback = async () => {
      try {
        // The hash contains the token information
        if (!window.location.hash && !window.location.search) {
          throw new Error('No OAuth data found in URL');
        }

        // Supabase will handle extracting the session from the URL
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data?.session) {
          // Check if there's user metadata for further setup
          const userDetails = data.session.user;
          
          // Successful login, log details for debugging
          console.log('Authentication successful:', userDetails);
          
          // Display a success message to the user
          toast({
            title: "Successfully authenticated",
            description: "You have been logged in with GitHub successfully.",
          });
          
          // Redirect to the homepage
          navigate('/', { replace: true });
        } else {
          // No session found, may still be processing
          console.log('No session found, waiting...');
        }
      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: err.message,
        });
        navigate('/auth/login', { replace: true });
      }
    };

    processOAuthCallback();
  }, [navigate, toast, user]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
          <h1 className="text-xl font-bold">Authentication Error</h1>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate('/auth/login')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-pulse text-center">
        <h1 className="text-2xl font-bold mb-4">Completing authentication...</h1>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default Callback;
