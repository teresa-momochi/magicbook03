/**
 * SupabaseWorkspaceRepository
 * Implements the WorkspaceRepository contract against the schema in
 * supabase/schema.sql (workspaces + workspace_members, RLS-protected).
 */
import { getSupabaseClient } from '../../config/supabase-config.js';

export class SupabaseWorkspaceRepository {
  constructor() {
    this._client = getSupabaseClient();
  }

  async listForUser(userId) {
    const { data, error } = await this._client
      .from('workspace_members')
      .select('role, workspaces(id, type, name)')
      .eq('user_id', userId);

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.workspaces.id,
      type: row.workspaces.type,
      name: row.workspaces.name,
      role: row.role,
    }));
  }

  async getById(workspaceId) {
    const { data, error } = await this._client
      .from('workspaces')
      .select('id, type, name')
      .eq('id', workspaceId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
}
