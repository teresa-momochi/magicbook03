import { test } from 'node:test';
import assert from 'node:assert/strict';

import { createRepositories } from '../src/repositories/RepositoryFactory.js';
import { AuthService } from '../src/services/AuthService.js';
import { WorkspaceService } from '../src/services/WorkspaceService.js';
import { BookLibraryService } from '../src/services/BookLibraryService.js';

async function setup() {
  const { authRepository, workspaceRepository, bookRepository } = await createRepositories('memory', {
    seedUsers: [{ email: 'teresa@example.com', password: 'correct-horse', userId: 'user-1' }],
  });

  // Mirror the Supabase signup trigger: seed a Personal Workspace for the user.
  workspaceRepository.seedPersonalWorkspace('user-1', 'Teresa 的教材庫');

  return {
    authService: new AuthService(authRepository),
    workspaceService: new WorkspaceService(workspaceRepository),
    bookLibraryService: new BookLibraryService(bookRepository),
    workspaceRepository,
  };
}

test('Auth: login with valid credentials returns a session', async () => {
  const { authService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  assert.equal(session.userId, 'user-1');
  assert.equal(session.email, 'teresa@example.com');
  assert.ok(session.accessToken);
});

test('Auth: login with wrong password is rejected', async () => {
  const { authService } = await setup();
  await assert.rejects(
    () => authService.login('teresa@example.com', 'wrong-password'),
    /INVALID_CREDENTIALS/
  );
});

test('Auth: login with missing fields is rejected before hitting the repository', async () => {
  const { authService } = await setup();
  await assert.rejects(() => authService.login('', ''), /EMAIL_AND_PASSWORD_REQUIRED/);
});

test('Auth: session persists after login and clears after logout', async () => {
  const { authService } = await setup();
  await authService.login('teresa@example.com', 'correct-horse');
  assert.ok(await authService.getSession());

  await authService.logout();
  assert.equal(await authService.getSession(), null);
});

test('Workspace: user lands in their Personal Workspace', async () => {
  const { authService, workspaceService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  const workspace = await workspaceService.resolveEntryWorkspace(session.userId);
  assert.equal(workspace.type, 'personal');
  assert.equal(workspace.name, 'Teresa 的教材庫');
});

test('Workspace: user with no membership cannot resolve an entry workspace', async () => {
  const { workspaceService } = await setup();
  await assert.rejects(
    () => workspaceService.resolveEntryWorkspace('ghost-user'),
    /NO_WORKSPACE_FOR_USER/
  );
});

test('Book Library: new workspace starts with zero root books', async () => {
  const { authService, workspaceService, bookLibraryService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  const workspace = await workspaceService.resolveEntryWorkspace(session.userId);
  const books = await bookLibraryService.listRootBooks(workspace.id);
  assert.deepEqual(books, []);
});

test('Book Library: creating a book also creates its Default Lesson (§7.2 API Design)', async () => {
  const { authService, workspaceService, bookLibraryService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  const workspace = await workspaceService.resolveEntryWorkspace(session.userId);

  const { book, defaultLesson } = await bookLibraryService.createBook(workspace.id, '國中英語 Unit 1', session.userId);

  assert.equal(book.title, '國中英語 Unit 1');
  assert.equal(book.workspaceId, workspace.id);
  assert.equal(defaultLesson.bookId, book.id);
  assert.equal(defaultLesson.isDefault, true);
});

test('Book Library: created book is persisted and appears in subsequent list (§7.7 Persistence)', async () => {
  const { authService, workspaceService, bookLibraryService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  const workspace = await workspaceService.resolveEntryWorkspace(session.userId);

  await bookLibraryService.createBook(workspace.id, 'Book A', session.userId);
  await bookLibraryService.createBook(workspace.id, 'Book B', session.userId);

  const books = await bookLibraryService.listRootBooks(workspace.id);
  assert.equal(books.length, 2);
  assert.deepEqual(books.map((b) => b.title).sort(), ['Book A', 'Book B']);
});

test('Book Library: falls back to "Untitled Book" when title is blank', async () => {
  const { authService, workspaceService, bookLibraryService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');
  const workspace = await workspaceService.resolveEntryWorkspace(session.userId);

  const { book } = await bookLibraryService.createBook(workspace.id, '   ', session.userId);
  assert.equal(book.title, 'Untitled Book');
});

test('Workspace Isolation (§4.4/§17.3): cannot create a book in a workspace the user is not a member of', async () => {
  const { authService, workspaceRepository, bookLibraryService } = await setup();
  const session = await authService.login('teresa@example.com', 'correct-horse');

  workspaceRepository.seedOrganizationWorkspace('org-1', '翰林補習班', [
    { userId: 'someone-else', role: 'owner' },
  ]);

  await assert.rejects(
    () => bookLibraryService.createBook('org-1', 'Intruding Book', session.userId),
    /WORKSPACE_ACCESS_DENIED/
  );
});

test('Book Library: creating a book requires a workspace and a user', async () => {
  const { bookLibraryService } = await setup();
  await assert.rejects(
    () => bookLibraryService.createBook(null, 'Book', null),
    /WORKSPACE_AND_USER_REQUIRED/
  );
});
