/**
 * RepositoryFactory
 *
 * Single place that decides which concrete Repository implementation the app
 * runs against. Services never import a concrete repository directly — they
 * only depend on the contracts in RepositoryContracts.js. This is what makes
 * the provider "Replaceable" per Development Guidelines §2.5/§3.6.
 *
 * mode:
 *   'memory'   -> InMemory* repositories (used by tests, and optionally by
 *                 local dev before Supabase config is filled in)
 *   'supabase' -> Supabase* repositories (production)
 */
import { InMemoryAuthRepository } from './memory/InMemoryAuthRepository.js';
import { InMemoryWorkspaceRepository } from './memory/InMemoryWorkspaceRepository.js';
import { InMemoryBookRepository } from './memory/InMemoryBookRepository.js';

export async function createRepositories(mode = 'supabase', options = {}) {
  if (mode === 'memory') {
    const workspaceRepository = new InMemoryWorkspaceRepository();
    const bookRepository = new InMemoryBookRepository(workspaceRepository);
    const authRepository = new InMemoryAuthRepository(options.seedUsers ?? []);
    return { authRepository, workspaceRepository, bookRepository };
  }

  if (mode === 'supabase') {
    // Dynamic import so a memory-mode test run (e.g. plain Node, no browser,
    // no network access) never has to resolve the esm.sh Supabase import.
    const [{ SupabaseAuthRepository }, { SupabaseWorkspaceRepository }, { SupabaseBookRepository }] =
      await Promise.all([
        import('./supabase/SupabaseAuthRepository.js'),
        import('./supabase/SupabaseWorkspaceRepository.js'),
        import('./supabase/SupabaseBookRepository.js'),
      ]);
    return {
      authRepository: new SupabaseAuthRepository(),
      workspaceRepository: new SupabaseWorkspaceRepository(),
      bookRepository: new SupabaseBookRepository(),
    };
  }

  throw new Error(`Unknown repository mode: ${mode}`);
}
