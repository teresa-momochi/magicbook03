import { createRepositories } from './repositories/RepositoryFactory.js';
import { AuthService } from './services/AuthService.js';
import { WorkspaceService } from './services/WorkspaceService.js';
import { BookLibraryService } from './services/BookLibraryService.js';
import { LoginView } from './ui/LoginView.js';
import { BookLibraryView } from './ui/BookLibraryView.js';

const APP_MODE = window.MAGICBOOK_CONFIG ? 'supabase' : 'memory';

const root = document.getElementById('app');

async function bootstrap() {
  const { authRepository, workspaceRepository, bookRepository } = await createRepositories(APP_MODE);

  const authService = new AuthService(authRepository);
  const workspaceService = new WorkspaceService(workspaceRepository);
  const bookLibraryService = new BookLibraryService(bookRepository);

  const session = await authService.getSession();
  if (session) {
    await enterApp(session);
  } else {
    showLogin();
  }

  function showLogin() {
    const view = new LoginView(root, {
      onLogin: async (email, password) => {
        const newSession = await authService.login(email, password);
        await enterApp(newSession);
      },
    });
    view.render();
  }

  async function enterApp(session) {
    // Session → Workspace (§7.7 completion criteria: "Session 可維持", "Workspace 可正確辨識")
    const workspace = await workspaceService.resolveEntryWorkspace(session.userId);

    // Workspace → Book Library (§7.7: "Book Library 可進入")
    const books = await bookLibraryService.listRootBooks(workspace.id);

    const view = new BookLibraryView(root, {
      workspace,
      onCreateBook: async (title) => {
        // §7.7: "Basic Book 可建立" + "資料可以正確持久化"
        await bookLibraryService.createBook(workspace.id, title, session.userId);
        const refreshed = await bookLibraryService.listRootBooks(workspace.id);
        view.render(refreshed);
      },
      onLogout: async () => {
        await authService.logout();
        showLogin();
      },
    });
    view.render(books);
  }
}

bootstrap().catch((err) => {
  console.error('MagicBook bootstrap failed:', err);
  root.innerHTML = `<p class="mb-fatal-error">系統初始化失敗，請重新整理頁面。（${err.message}）</p>`;
});
