
-- Function to insert a GitHub repository
CREATE OR REPLACE FUNCTION public.insert_github_repo(
  p_user_id UUID,
  p_repo_id TEXT,
  p_name TEXT,
  p_full_name TEXT,
  p_description TEXT,
  p_html_url TEXT,
  p_stars INT,
  p_forks INT,
  p_language TEXT,
  p_topics TEXT[],
  p_owner_login TEXT,
  p_owner_avatar_url TEXT,
  p_has_gitstore_file BOOLEAN,
  p_license_key TEXT,
  p_license_name TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.github_repos (
    user_id,
    repo_id,
    name,
    full_name,
    description,
    html_url,
    stars,
    forks,
    language,
    topics,
    owner_login,
    owner_avatar_url,
    has_gitstore_file,
    license_key,
    license_name,
    status
  ) VALUES (
    p_user_id,
    p_repo_id,
    p_name,
    p_full_name,
    p_description,
    p_html_url,
    p_stars,
    p_forks,
    p_language,
    p_topics,
    p_owner_login,
    p_owner_avatar_url,
    p_has_gitstore_file,
    p_license_key,
    p_license_name,
    'pending'
  )
  ON CONFLICT (user_id, repo_id) 
  DO UPDATE SET
    name = p_name,
    full_name = p_full_name,
    description = p_description,
    html_url = p_html_url,
    stars = p_stars,
    forks = p_forks,
    language = p_language,
    topics = p_topics,
    owner_login = p_owner_login,
    owner_avatar_url = p_owner_avatar_url,
    has_gitstore_file = p_has_gitstore_file,
    license_key = p_license_key,
    license_name = p_license_name,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;
