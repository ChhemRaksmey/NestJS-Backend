# NestJS CRUD App

A NestJS project with server-rendered EJS views (layouts + per-page styles/scripts),
PostgreSQL via TypeORM, session-based web authentication, and a parallel REST API.
Sample resource: **Product** (list / create / edit / view).

## Folder structure

```
.env                    # environment variables (DB, session secret, port)
public/                 # static assets
  css/style.css          # global styles
  js/main.js              # global script
src/
  config/                # app + database configuration
  controllers/           # web controllers (EJS) + controllers/api (REST)
  models/                # TypeORM entities (User, Product)
  resources/views/       # EJS templates (layout, partials, auth, products)
  services/              # business logic (UserService, ProductService, AuthService)
  providers/             # Passport local strategy + session serializer
  middleware/            # AuthenticatedGuard/GuestGuard + request logger
  utils/                 # hashing + response helpers
```

## Setup

1. Make sure PostgreSQL is running and reachable with the credentials in `.env`
   (defaults: `localhost:5432`, db `db_backend`, user `postgres`, password `123456789`).
   Create the database first if it doesn't exist:

   ```sql
   CREATE DATABASE db_backend;
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run in development (auto-restarts on changes):

   ```bash
   npm run start:dev
   ```

   Or build + run in production mode:

   ```bash
   npm run build
   npm run start:prod
   ```

4. Visit `http://localhost:3000`. `DB_SYNCHRONIZE=true` in `.env` will auto-create the
   `users` and `products` tables on first run (fine for dev; turn it off and use
   migrations for production).

## Web (EJS) routes

| Method | Path                  | Description              |
|--------|-----------------------|---------------------------|
| GET    | /auth/login           | Login page                |
| POST   | /auth/login           | Submit login              |
| GET    | /auth/register        | Register page             |
| POST   | /auth/register        | Submit registration       |
| POST   | /auth/logout          | Logout                    |
| GET    | /products             | List products (auth required) |
| GET    | /products/create      | Create form                |
| POST   | /products/create      | Submit new product         |
| GET    | /products/:id         | View product detail        |
| GET    | /products/:id/edit    | Edit form                  |
| POST   | /products/:id/edit    | Submit update               |
| POST   | /products/:id/delete  | Delete product              |

## REST API routes

| Method | Path              | Description        |
|--------|-------------------|---------------------|
| GET    | /api/products      | List all products   |
| GET    | /api/products/:id  | Get one product      |
| POST   | /api/products      | Create a product (`{ name, description?, price }`) |
| PUT    | /api/products/:id  | Update a product      |
| DELETE | /api/products/:id  | Delete a product      |

All API responses are wrapped as `{ success, message, data }`.

## Sessions persist across restarts

Sessions are stored in Postgres (via `connect-pg-simple`) instead of in memory.
A `session` table is auto-created in `db_backend` on first run. This means:

- **Development**: editing a controller/service (`.ts` file) still restarts the
  dev server (nodemon), but you'll stay logged in — the session survives because
  it lives in the database, not in the process's memory.
- Editing a **view** (`.ejs` file) no longer restarts the server at all —
  `nodemon.json` only watches `.ts` files now, since views are read fresh from
  disk on every request anyway.
- **Production**: works the same way automatically — no config needed. Any
  restart (deploy, crash, container recycle, PM2 reload) keeps everyone logged
  in until their cookie/session actually expires (7 days, configurable in
  `src/main.ts`).

If you ever want to force everyone to be logged out (e.g. after a security
change), just truncate the table: `TRUNCATE TABLE session;`

## Notes

- Web authentication uses `express-session` + Passport (local strategy) with
  bcrypt-hashed passwords, guarding `/products/*` via `AuthenticatedGuard`.
- The layout (`src/resources/views/layout.ejs`) pulls in the global
  `public/css/style.css` / `public/js/main.js`, and also auto-extracts any
  `<style>`/`<script>` blocks written inside individual page templates
  (see `src/resources/views/auth/login.ejs` for an example) via
  `express-ejs-layouts`.
- This was scaffolded and smoke-tested (register/login/CRUD/API/logout) against
  an in-memory SQLite swap before being switched back to the PostgreSQL config
  above, so wiring is verified — you just need Postgres running locally.
