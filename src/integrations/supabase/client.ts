// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pbyqbeunewqggenwfuwe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieXFiZXVuZXdxZ2dlbndmdXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzQxMTMsImV4cCI6MjA1NjY1MDExM30.PKy6QLr_U4-RASEyzQ1YaVbJkhG9qUqT_hoQl4rWGW0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);