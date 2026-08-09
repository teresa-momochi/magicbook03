/**
 * InMemoryBookRepository
 * Implements the BookRepository contract. See RepositoryContracts.js.
 *
 * §7.2 API Design: creating a Book may create a Default Lesson.
 * §4.5 API Design / §17.3 Database Design: Workspace Isolation must hold even
 * in the in-memory implementation, so Service-layer tests catch isolation bugs
 * before they ever reach Supabase RLS.
 */
export class InMemoryBookRepository {
  constructor(workspaceRepository) {
    this._workspaceRepository = workspaceRepository;
    /** @type {Map<string, import('../RepositoryContracts.js').Book>} */
    this._books = new Map();
    /** @type {Map<string, import('../RepositoryContracts.js').Lesson>} */
    this._lessons = new Map();
    this._counter = 0;
  }

  async listRootBooks(workspaceId) {
    return [...this._books.values()].filter((b) => b.workspaceId === workspaceId);
  }

  async createBook(workspaceId, title, userId) {
    if (!this._workspaceRepository._isMember(workspaceId, userId)) {
      throw new Error('WORKSPACE_ACCESS_DENIED');
    }

    const bookId = `book-${++this._counter}`;
    const book = {
      id: bookId,
      workspaceId,
      title: title?.trim() || 'Untitled Book',
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };
    this._books.set(bookId, book);

    const lessonId = `lesson-${bookId}`;
    const defaultLesson = {
      id: lessonId,
      bookId,
      title: 'Lesson 1',
      isDefault: true,
      orderIndex: 0,
    };
    this._lessons.set(lessonId, defaultLesson);

    return { book, defaultLesson };
  }

  async getById(bookId) {
    return this._books.get(bookId) ?? null;
  }
}
