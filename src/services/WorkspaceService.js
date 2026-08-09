/**
 * WorkspaceService
 * §7.4 Task List — Workspace identity + basic permission resolution.
 * §4.5 Database Design — Authentication answers "who"; Workspace answers
 * "which workspace does this data belong to." Kept as a separate service so
 * that responsibility boundary holds in code, not just in the docs.
 */
export class WorkspaceService {
  constructor(workspaceRepository) {
    this._repo = workspaceRepository;
  }

  /**
   * Resolves the Workspace a freshly-logged-in user should land in.
   * Task 1 rule: a user always has at least their Personal Workspace
   * (auto-provisioned at signup — see supabase/schema.sql trigger).
   * If they also belong to Organization Workspace(s), the personal one is
   * still the deterministic default entry point for Task 1; a Workspace
   * Selector is listed as in-scope UI (§5.2 MVP Development) but switching
   * between multiple workspaces is not part of the Task 1 completion
   * criteria (§7.7) which only requires "進入正確 Workspace".
   */
  async resolveEntryWorkspace(userId) {
    const memberships = await this._repo.listForUser(userId);
    if (memberships.length === 0) {
      throw new Error('NO_WORKSPACE_FOR_USER');
    }
    const personal = memberships.find((w) => w.type === 'personal');
    return personal ?? memberships[0];
  }

  async listForUser(userId) {
    return this._repo.listForUser(userId);
  }
}
