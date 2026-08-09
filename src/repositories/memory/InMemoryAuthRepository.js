/**
 * InMemoryAuthRepository
 *
 * Implements the AuthRepository contract (see RepositoryContracts.js) without
 * any network dependency. Used for local development and unit tests so that
 * Task 1 logic (Session flow, Workspace resolution) can be verified without a
 * live Supabase project.
 */
export class InMemoryAuthRepository {
  constructor(seedUsers = []) {
    /** @type {Map<string, {password: string, userId: string}>} */
    this._usersByEmail = new Map(
      seedUsers.map((u) => [u.email, { password: u.password, userId: u.userId }])
    );
    /** @type {import('../RepositoryContracts.js').Session|null} */
    this._session = null;
    /** @type {Set<(session: any) => void>} */
    this._listeners = new Set();
  }

  async login(email, password) {
    const record = this._usersByEmail.get(email);
    if (!record || record.password !== password) {
      throw new Error('INVALID_CREDENTIALS');
    }
    this._session = {
      userId: record.userId,
      email,
      accessToken: `mem-token-${record.userId}`,
    };
    this._emit();
    return this._session;
  }

  async logout() {
    this._session = null;
    this._emit();
  }

  async getSession() {
    return this._session;
  }

  onSessionChange(callback) {
    this._listeners.add(callback);
    return () => this._listeners.delete(callback);
  }

  _emit() {
    for (const listener of this._listeners) listener(this._session);
  }
}
