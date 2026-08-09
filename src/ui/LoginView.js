/**
 * LoginView
 * Renders a minimal login form into `container` and calls `onLogin(email, password)`.
 * No framework — plain DOM APIs, per Frontend Technical Decision.
 */
export class LoginView {
  constructor(container, { onLogin }) {
    this._container = container;
    this._onLogin = onLogin;
  }

  render() {
    this._container.innerHTML = `
      <div class="mb-login">
        <h1 class="mb-login__title">MagicBook 3.0</h1>
        <form class="mb-login__form" id="mb-login-form">
          <label class="mb-field">
            <span>Email</span>
            <input type="email" name="email" required autocomplete="username" />
          </label>
          <label class="mb-field">
            <span>Password</span>
            <input type="password" name="password" required autocomplete="current-password" />
          </label>
          <button type="submit" class="mb-button mb-button--primary">Login</button>
          <p class="mb-error" id="mb-login-error" hidden></p>
        </form>
      </div>
    `;

    const form = this._container.querySelector('#mb-login-form');
    const errorEl = this._container.querySelector('#mb-login-error');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      errorEl.hidden = true;
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      try {
        await this._onLogin(email, password);
      } catch (err) {
        errorEl.textContent = this._friendlyMessage(err);
        errorEl.hidden = false;
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  _friendlyMessage(err) {
    if (err?.message === 'INVALID_CREDENTIALS') return 'Email 或密碼錯誤。';
    if (err?.message === 'EMAIL_AND_PASSWORD_REQUIRED') return '請輸入 Email 與密碼。';
    return '登入失敗，請稍後再試。';
  }
}
