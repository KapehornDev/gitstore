import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Github, ArrowRight, Check, X, Loader2 } from 'lucide-react';

interface RepoMetadata {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  gitstore_file: boolean;
  license?: {
    key: string;
    name: string;
  };
}

const GitHubRepoImport = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repoMetadata, setRepoMetadata] = useState<RepoMetadata | null>(null);
  const [importStep, setImportStep] = useState<'input' | 'preview' | 'success'>('input');
  const { user, isUserDeveloper } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };

  const extractOwnerAndRepo = (url: string): { owner: string; repo: string } | null => {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubRegex);
    
    if (match && match.length >= 3) {
      return {
        owner: match[1],
        repo: match[2]
      };
    }
    
    return null;
  };

  const fetchRepoMetadata = async () => {
    const repoInfo = extractOwnerAndRepo(repoUrl);
    
    if (!repoInfo) {
      toast({
        variant: "destructive",
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const gitStoreFileResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/.GitStore`);
      const hasGitStoreFile = gitStoreFileResponse.ok;
      
      const metadata: RepoMetadata = {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        description: data.description || 'No description provided',
        html_url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language || 'Not specified',
        topics: data.topics || [],
        owner: {
          login: data.owner.login,
          avatar_url: data.owner.avatar_url
        },
        license: data.license,
        gitstore_file: hasGitStoreFile
      };
      
      setRepoMetadata(metadata);
      setImportStep('preview');
      
    } catch (error: any) {
      console.error('Error fetching repository metadata:', error);
      toast({
        variant: "destructive",
        title: "Repository fetch failed",
        description: error.message || "Failed to fetch repository metadata.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const importRepository = async () => {
    if (!repoMetadata || !user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.rpc('insert_github_repo', {
        p_user_id: user.id,
        p_repo_id: repoMetadata.id.toString(),
        p_name: repoMetadata.name,
        p_full_name: repoMetadata.full_name,
        p_description: repoMetadata.description,
        p_html_url: repoMetadata.html_url,
        p_stars: repoMetadata.stars,
        p_forks: repoMetadata.forks,
        p_language: repoMetadata.language,
        p_topics: repoMetadata.topics,
        p_owner_login: repoMetadata.owner.login,
        p_owner_avatar_url: repoMetadata.owner.avatar_url,
        p_has_gitstore_file: repoMetadata.gitstore_file,
        p_license_key: repoMetadata.license?.key || null,
        p_license_name: repoMetadata.license?.name || null
      });
      
      if (error) throw error;
      
      setImportStep('success');
      toast({
        title: "Repository imported successfully",
        description: "Your GitHub repository has been imported to GitStore.",
      });
      
    } catch (error: any) {
      console.error('Error importing repository:', error);
      toast({
        variant: "destructive",
        title: "Import failed",
        description: error.message || "Failed to import repository.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUserDeveloper()) {
    return (
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-medium mb-2">GitHub Repository Import</h3>
        <p className="text-muted-foreground">
          You need a developer account to import GitHub repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-xl font-semibold mb-4">Import GitHub Repository</h3>
      
      {importStep === 'input' && (
        <>
          <p className="text-muted-foreground mb-4">
            Enter the URL of your GitHub repository to import it into GitStore.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="repo-url" className="block text-sm font-medium mb-1">
                GitHub Repository URL
              </label>
              <input
                id="repo-url"
                type="text"
                value={repoUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/owner/repo"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={fetchRepoMetadata}
              disabled={isLoading || !repoUrl.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Github className="h-4 w-4" />
                  Fetch Repository
                </>
              )}
            </button>
          </div>
        </>
      )}
      
      {importStep === 'preview' && repoMetadata && (
        <>
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={repoMetadata.owner.avatar_url} 
                alt={repoMetadata.owner.login}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold">{repoMetadata.full_name}</h4>
                <p className="text-muted-foreground">{repoMetadata.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 border rounded-md bg-card/50">
                <p className="text-sm text-muted-foreground">Stars</p>
                <p className="text-lg font-semibold">{repoMetadata.stars}</p>
              </div>
              <div className="p-3 border rounded-md bg-card/50">
                <p className="text-sm text-muted-foreground">Forks</p>
                <p className="text-lg font-semibold">{repoMetadata.forks}</p>
              </div>
              <div className="p-3 border rounded-md bg-card/50">
                <p className="text-sm text-muted-foreground">Language</p>
                <p className="text-lg font-semibold">{repoMetadata.language}</p>
              </div>
              <div className="p-3 border rounded-md bg-card/50">
                <p className="text-sm text-muted-foreground">License</p>
                <p className="text-lg font-semibold">{repoMetadata.license?.name || 'Not specified'}</p>
              </div>
            </div>
            
            {repoMetadata.topics.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {repoMetadata.topics.map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-4 rounded-md mb-4 flex items-center gap-2" 
              style={{ backgroundColor: repoMetadata.gitstore_file ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 87, 87, 0.1)' }}>
              {repoMetadata.gitstore_file ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">.GitStore file</p>
                <p className="text-sm text-muted-foreground">
                  {repoMetadata.gitstore_file 
                    ? 'Repository contains a .GitStore file with installation instructions.' 
                    : 'Repository does not contain a .GitStore file. This is required for installation instructions.'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setImportStep('input')}
              className="flex-1 py-2 px-4 border border-border rounded-lg font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={importRepository}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  Import Repository
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </>
      )}
      
      {importStep === 'success' && (
        <div className="text-center py-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Repository Imported Successfully!</h4>
          <p className="text-muted-foreground mb-6">
            Your GitHub repository has been successfully imported to GitStore.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setRepoUrl('');
                setRepoMetadata(null);
                setImportStep('input');
              }}
              className="w-full bg-primary/10 text-primary hover:bg-primary/20 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Import Another Repository
            </button>
            <button
              onClick={() => window.location.href = '/console'}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Go to Developer Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubRepoImport;
