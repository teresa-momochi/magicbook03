/**
 * Supabase client factory.
 *
 * No Build Step (per Frontend Technical Decision) means no bundler-injected
 * env vars. Config is instead read from a plain global set by
 * config.local.js — a file that is NOT committed (see .gitignore) and that
 * each environment (Teresa's machine, GitHub Pages secrets injection, etc.)
 * provides for itself. See config.example.js for the expected shape.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let _client = null;

export function getSupabaseClient() {
  if (_client) return _client;

  const config = window.MAGICBOOK_CONFIG;
  if (!config?.supabaseUrl || !config?.supabaseAnonKey) {
    throw new Error(
      'MAGICBOOK_CONFIG missing. Copy config.example.js to config.local.js, fill in your ' +
        'Supabase project URL + anon key, and include it in index.html before main.js.'
    );
  }

  _client = createClient(config.supabaseUrl, config.supabaseAnonKey);
  return _client;
}
