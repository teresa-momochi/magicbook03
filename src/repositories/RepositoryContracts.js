/**
 * MagicBook 3.0 — Repository Contracts
 *
 * These JSDoc typedefs describe the shape every Repository implementation
 * (InMemory, Supabase, or any future provider) must satisfy.
 *
 * Rationale: Development Guidelines §2.5 "Replaceable Service" / §3.6 "Replaceable
 * Services" — a provider must be swappable without the Service layer above it
 * changing. Repository Pattern is the mechanism chosen to satisfy that principle
 * for Task 1 (this is an engineering pattern choice, not a Frozen Baseline change).
 *
 * No class is instantiated from this file — it exists purely to document the
 * contract, since the project has No Build Step and therefore no TypeScript.
 */

/**
 * @typedef {Object} Session
 * @property {string} userId
 * @property {string} email
 * @property {string} accessToken
 */

/**
 * @typedef {Object} AuthRepository
 * @property {(email: string, password: string) => Promise<Session>} login
 * @property {() => Promise<void>} logout
 * @property {() => Promise<Session|null>} getSession
 * @property {(callback: (session: Session|null) => void) => (() => void)} onSessionChange
 *   Returns an unsubscribe function.
 */

/**
 * @typedef {Object} Workspace
 * @property {string} id
 * @property {'personal'|'organization'} type
 * @property {string} name
 */

/**
 * @typedef {Object} WorkspaceMembership
 * @property {string} workspaceId
 * @property {'owner'|'administrator'|'teacher'} role
 */

/**
 * @typedef {Object} WorkspaceRepository
 * @property {(userId: string) => Promise<(Workspace & WorkspaceMembership)[]>} listForUser
 * @property {(workspaceId: string) => Promise<Workspace|null>} getById
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} bookId
 * @property {string} title
 * @property {boolean} isDefault
 * @property {number} orderIndex
 */

/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} workspaceId
 * @property {string} title
 * @property {string} createdBy
 * @property {string} createdAt
 */

/**
 * @typedef {Object} BookRepository
 * @property {(workspaceId: string) => Promise<Book[]>} listRootBooks
 * @property {(workspaceId: string, title: string, userId: string) => Promise<{book: Book, defaultLesson: Lesson}>} createBook
 * @property {(bookId: string) => Promise<Book|null>} getById
 */

export {};
