/**
 * SupabaseBookRepository
 * Implements the BookRepository contract against the schema in
 * supabase/schema.sql (books + lessons, RLS-protected).
 *
 * Workspace Isolation (§4.4/§4.5 API Design) is enforced by Postgres RLS —
 * this class does not duplicate that check client-side; a denied write/read
 * simply returns no rows / a Postgres error, which callers must handle.
 */
import { getSupabaseClient } from '../../config/supabase-config.js';

export class SupabaseBookRepository {
  constructor() {
    this._client = getSupabaseClient();
  }

  async listRootBooks(workspaceId) {
    const { data, error } = await this._client
      .from('books')
      .select('id, workspace_id, title, created_by, created_at')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(this._mapBook);
  }

  async createBook(workspaceId, title, userId) {
    const { data: book, error: bookError } = await this._client
      .from('books')
      .insert({
        workspace_id: workspaceId,
        title: title?.trim() || 'Untitled Book',
        created_by: userId,
      })
      .select('id, workspace_id, title, created_by, created_at')
      .single();

    if (bookError) throw bookError;

    const { data: lesson, error: lessonError } = await this._client
      .from('lessons')
      .insert({
        book_id: book.id,
        title: 'Lesson 1',
        is_default: true,
        order_index: 0,
      })
      .select('id, book_id, title, is_default, order_index')
      .single();

    if (lessonError) throw lessonError;

    return {
      book: this._mapBook(book),
      defaultLesson: {
        id: lesson.id,
        bookId: lesson.book_id,
        title: lesson.title,
        isDefault: lesson.is_default,
        orderIndex: lesson.order_index,
      },
    };
  }

  async getById(bookId) {
    const { data, error } = await this._client
      .from('books')
      .select('id, workspace_id, title, created_by, created_at')
      .eq('id', bookId)
      .maybeSingle();

    if (error) throw error;
    return data ? this._mapBook(data) : null;
  }

  _mapBook(row) {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      createdBy: row.created_by,
      createdAt: row.created_at,
    };
  }
}
