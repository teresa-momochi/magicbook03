/**
 * BookLibraryService
 * §7.6 Task List — Book Library Foundation.
 *
 * Task 1 scope only: list root Books in a Workspace, create a basic Book
 * (with its Default Lesson). Full Book CRUD (rename/duplicate/delete/move)
 * and Folder support belong to Task 2 (§8 Task List — Book Structure) and
 * are intentionally NOT implemented here.
 */
export class BookLibraryService {
  constructor(bookRepository) {
    this._repo = bookRepository;
  }

  async listRootBooks(workspaceId) {
    return this._repo.listRootBooks(workspaceId);
  }

  async createBook(workspaceId, title, userId) {
    if (!workspaceId || !userId) {
      throw new Error('WORKSPACE_AND_USER_REQUIRED');
    }
    return this._repo.createBook(workspaceId, title, userId);
  }
}
