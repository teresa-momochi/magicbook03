/**
 * BookLibraryView
 * §7.6 Task List — minimal Book Library: list root Books, create a Book.
 * No Folder UI (Task 2), no Editor entry point (Task 3).
 */
export class BookLibraryView {
  constructor(container, { workspace, onCreateBook, onLogout }) {
    this._container = container;
    this._workspace = workspace;
    this._onCreateBook = onCreateBook;
    this._onLogout = onLogout;
  }

  render(books) {
    this._container.innerHTML = `
      <div class="mb-library">
        <header class="mb-library__header">
          <div>
            <h1>${this._escape(this._workspace.name)}</h1>
            <p class="mb-library__workspace-type">${this._workspace.type === 'personal' ? 'Personal Workspace' : 'Organization Workspace'}</p>
          </div>
          <button class="mb-button" id="mb-logout-button">Logout</button>
        </header>

        <form class="mb-library__create" id="mb-create-book-form">
          <input type="text" name="title" placeholder="New Book title" required />
          <button type="submit" class="mb-button mb-button--primary">+ Create Book</button>
        </form>

        <ul class="mb-book-grid" id="mb-book-grid">
          ${books.map((b) => this._bookCard(b)).join('') || '<li class="mb-empty">還沒有教材，建立第一本 Book 吧。</li>'}
        </ul>
      </div>
    `;

    this._container.querySelector('#mb-logout-button').addEventListener('click', () => this._onLogout());

    const form = this._container.querySelector('#mb-create-book-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = new FormData(form).get('title');
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      try {
        await this._onCreateBook(title);
        form.reset();
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  _bookCard(book) {
    return `
      <li class="mb-book-card">
        <div class="mb-book-card__cover">📘</div>
        <p class="mb-book-card__title">${this._escape(book.title)}</p>
      </li>
    `;
  }

  _escape(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
  }
}
