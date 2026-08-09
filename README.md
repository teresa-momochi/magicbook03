# MagicBook 3.0

Task 1 — System Foundation (Authentication / Workspace / Database Foundation / Book Library Foundation).

Spec source of truth: `docs/` (Frozen Baseline 01–09 + `11_MVP_Task_List.md`), GitHub `main` branch per `04_Development_Guidelines.md` §10.5.

## Stack

Modular Vanilla JavaScript · ES Modules · No Build Step · GitHub Pages · Supabase.

## Project layout

```
index.html                      entry point, loads src/main.js as a module
config.example.js                template for local Supabase credentials
supabase/schema.sql              Task 1 Database Foundation (tables + RLS + triggers)
src/
  main.js                        app bootstrap (Login → Session → Workspace → Book Library)
  config/supabase-config.js      Supabase client factory
  repositories/
    RepositoryContracts.js       JSDoc contracts every implementation must satisfy
    RepositoryFactory.js         picks 'memory' or 'supabase' implementation
    memory/                      in-memory implementations (tests, offline dev)
    supabase/                    real implementations (production)
  services/                      framework-agnostic business logic
  ui/                            plain-DOM views + app.css
tests/
  task1.test.js                  run with `node --test tests/task1.test.js`
```

## Local setup

1. **Supabase project**: create one at supabase.com, then run `supabase/schema.sql`
   in the SQL editor (or `supabase db push`) against it.
2. **Local config**: `cp config.example.js config.local.js`, fill in your project's
   URL + anon key. `config.local.js` is gitignored — never commit real keys.
3. **Serve the app**: any static file server works, e.g. `npx serve .` or
   `python3 -m http.server`, then open `index.html`. No build step, no bundler.

Without `config.local.js`, the app boots in **in-memory mode** (no Supabase
required) so the UI is explorable immediately — but nothing persists across a
page reload in that mode.

## Tests

```bash
node --test tests/task1.test.js
```

12 tests covering: login (success / wrong password / missing fields), session
persistence + logout, Personal Workspace resolution, Book Library listing,
Book creation with its Default Lesson, persistence across list calls, and
Workspace Isolation (a user cannot create a Book in a workspace they don't
belong to).

These run against the in-memory repositories, so they need no network access
and no live Supabase project — they verify the Service-layer logic that both
providers share, per `docs/04_Development_Guidelines.md` §2.5 (Replaceable
Service).

## Task 1 scope boundary

In scope: Login/Logout/Session, Personal + Organization Workspace resolution,
root-level Book Library (list + create, with Default Lesson), Workspace
Isolation via Postgres RLS.

Deliberately **not** in this Task: Folder (Task 2), Book rename/duplicate/
delete/move (Task 2), Lesson/Page CRUD beyond the Default Lesson (Task 2/3),
Editor (Task 3), any Interaction/Hotspot/AI features (Task 4/5).
