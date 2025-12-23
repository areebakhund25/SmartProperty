
import { createClient } from '@supabase/supabase-js';

// Configuration provided by the user
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://iuzgegdkhbagmwpoprwc.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vt36rHFke1h4bFhXwvU91A_KGFPWD2U';

// Create a safe client initialization
// This prevents the "supabaseUrl is required" crash if environment variables aren't set yet.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;

if (!supabase) {
  console.warn(
    "Supabase credentials missing. Database features will not work. " +
    "Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment."
  );
}
