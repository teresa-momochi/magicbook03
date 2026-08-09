/**
 * InMemoryWorkspaceRepository
 * Implements the WorkspaceRepository contract. See RepositoryContracts.js.
 *
 * §17.5 Database Design leaves personal-workspace lifecycle to the
 * implementation stage. This in-memory implementation mirrors the Supabase
 * trigger behaviour: seeding a user automatically gives them one Personal
 * Workspace with role=owner, so Service-layer logic can be tested identically
 * against either provider.
 */
export class InMemoryWorkspaceRepository {
  constructor() {
    /** @type {Map<string, import('../RepositoryContracts.js').Workspace>} */
    this._workspaces = new Map();
    /** @type {Array<{workspaceId: string, userId: string, role: string}>} */
    this._memberships = [];
  }

  /** Test/seed helper — mirrors what the Supabase trigger does on signup. */
  seedPersonalWorkspace(userId, name) {
    const id = `ws-${userId}`;
    this._workspaces.set(id, { id, type: 'personal', name });
    this._memberships.push({ workspaceId: id, userId, role: 'owner' });
    return id;
  }

  seedOrganizationWorkspace(id, name, members) {
    this._workspaces.set(id, { id, type: 'organization', name });
    for (const m of members) {
      this._memberships.push({ workspaceId: id, userId: m.userId, role: m.role });
    }
    return id;
  }

  async listForUser(userId) {
    return this._memberships
      .filter((m) => m.userId === userId)
      .map((m) => ({ ...this._workspaces.get(m.workspaceId), role: m.role }));
  }

  async getById(workspaceId) {
    return this._workspaces.get(workspaceId) ?? null;
  }

  /** Not part of the public contract — used internally by BookRepository for isolation checks. */
  _isMember(workspaceId, userId) {
    return this._memberships.some((m) => m.workspaceId === workspaceId && m.userId === userId);
  }
}
