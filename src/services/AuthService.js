/**
 * AuthService
 * §7.3 Task List — Login / Logout / Session Management / User Authentication.
 * Depends only on the AuthRepository contract — never a concrete provider.
 */
export class AuthService {
  constructor(authRepository) {
    this._repo = authRepository;
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('EMAIL_AND_PASSWORD_REQUIRED');
    }
    return this._repo.login(email, password);
  }

  async logout() {
    return this._repo.logout();
  }

  async getSession() {
    return this._repo.getSession();
  }

  onSessionChange(callback) {
    return this._repo.onSessionChange(callback);
  }
}
