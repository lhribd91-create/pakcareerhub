# PakCareerHub — Next.js Job Portal

A full recreation of the PakCareerHub job portal, built with Next.js (App
Router) and Tailwind CSS, including a working Admin Panel for posting jobs
and managing site content.

## What's included

**Public site**
- Home page (hero search, stats, latest government/private jobs, browse by
  department, results/roll-no-slips/admissions widgets)
- All Jobs page with search + filters (keyword, city, type, department)
- Job detail pages
- Agency pages (FPSC, PPSC, NTS, PTS, SPSC, KPPSC)
- Results, Roll No Slips, Admissions, Scholarships
- Blog, MCQ practice, Past Papers
- About & Contact pages

**Admin Panel** (`/admin`, protected by login)
- Dashboard with live stats
- Jobs: create / edit / delete (instantly reflected on the public site)
- Departments, Cities, Categories management
- Results & Roll No Slips management
- Admissions management
- Blog Posts management
- MCQs management
- Past Papers management

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Admin login

Default demo credentials:
- Email: `pakcareerhub@gmail.com`
- Password: `admin123`

You can change these by setting environment variables before running the
app (create a `.env.local` file):

```
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=your-strong-password
```

## How data storage works (important)

This build stores all content (jobs, departments, results, etc.) in a
single JSON file at `data/db.json`, read and written directly by the
Next.js API routes in `app/api/data/`. This is great for local development
and for quickly trying everything out — every change you make in the admin
panel is saved to that file immediately.

**This will NOT work for a production deployment on Vercel** (or most
serverless hosts), because their filesystem is read-only at runtime — admin
changes would not actually persist. Before deploying live, swap the
functions in `lib/db.js` for calls to a real database, for example:

- **Supabase** / **Neon** (Postgres) — easiest to pair with Vercel
- **PlanetScale** / **Turso** (MySQL / SQLite at the edge)
- **MongoDB Atlas**

Since every read/write in this app already goes through the small set of
functions in `lib/db.js` (`getAll`, `getById`, `create`, `update`,
`remove`), you only need to rewrite that one file to point at a real
database — none of the pages or API routes need to change.

Also note: the admin auth in `lib/auth.js` is a simple demo-grade cookie
check, not a production auth system. For real deployment, replace it with
a proper solution (NextAuth.js, Clerk, etc.) and hash the password.

## Project structure

```
app/
  (site)/            Public pages (home, jobs, agencies, results, ...)
  admin/
    login/            Admin login page (no sidebar)
    (dashboard)/       Admin pages wrapped with sidebar layout
  api/
    data/[collection]/            Generic CRUD API (list/create)
    data/[collection]/[id]/       Generic CRUD API (get/update/delete)
    auth/                         Login / logout / session check
components/           Shared UI (Header, Footer, JobCard, admin widgets)
lib/
  db.js               JSON file data layer (swap this for a real DB later)
  auth.js             Simple cookie-based admin session
data/
  db.json             All site content lives here
middleware.js         Protects /admin/* routes, redirects to /admin/login
```

## Deploying

- **Vercel (with a real database)**: connect a Postgres/MySQL database,
  rewrite `lib/db.js`, then deploy normally.
- **Your own VPS / Railway / Render**: the JSON file approach works as-is
  since the filesystem persists between requests there.
