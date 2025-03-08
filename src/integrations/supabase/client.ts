
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://revvlbcszvvcksiwiypj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJldnZsYmNzenZ2Y2tzaXdpeXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNTkxNjIsImV4cCI6MjA1NjgzNTE2Mn0.fh9T_WT6GGhW4BWEdLQcRPlqJ9hXylsSPgAIxH9En_g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
