/**
 * SupabaseAuthRepository
 * Implements the AuthRepository contract using Supabase Auth (email + password).
 *
 * Login method note: docs/06_API_Design.md §3.2 explicitly leaves the credential
 * format to "正式 Authentication Provider" (the chosen provider). Supabase is
 * the PM-approved provider (交接文件 §三). Email + password is the simplest
 * Supabase-native method and is used here as the concrete implementation of
 * that already-delegated decision — flagged in the report, not treated as a
 * blocking spec gap, since the spec itself delegates it.
 */
import { getSupabaseClient } from '../../config/supabase-config.js';

export class SupabaseAuthRepository {
  constructor() {
    this._client = getSupabaseClient();
  }

  async login(email, password) {
    const { data, error } = await this._client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return this._toSession(data.session, data.user);
  }

  async logout() {
    const { error } = await this._client.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    const { data, error } = await this._client.auth.getSession();
    if (error) throw error;
    if (!data.session) return null;
    return this._toSession(data.session, data.session.user);
  }

  onSessionChange(callback) {
    const { data } = this._client.auth.onAuthStateChange((_event, session) => {
      callback(session ? this._toSession(session, session.user) : null);
    });
    return () => data.subscription.unsubscribe();
  }

  _toSession(session, user) {
    if (!session || !user) return null;
    return {
      userId: user.id,
      email: user.email,
      accessToken: session.access_token,
    };
  }
}
