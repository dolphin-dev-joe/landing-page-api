# Dolphin Laundry Landing Page API

Backend API untuk Dolphin Laundry landing page menggunakan ElysiaJS, Drizzle ORM, dan PostgreSQL dengan full i18n support.

## Tech Stack

- **Framework**: [ElysiaJS](https://elysiajs.com) - Fast & ergonomic web framework for Bun
- **Runtime**: [Bun](https://bun.sh)
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Deployment**: Vercel

## Features

- ✅ RESTful API dengan ElysiaJS
- ✅ PostgreSQL database dengan Drizzle ORM
- ✅ Full i18n support (Indonesian & English)
- ✅ CORS configured
- ✅ Error handling
- ✅ Environment variables validation
- ✅ Database migrations
- ✅ Seed data dengan terjemahan English yang proper

## Prerequisites

- [Bun](https://bun.sh) v1.0 or higher
- PostgreSQL database (bisa menggunakan Neon, Supabase, atau PostgreSQL lokal)

## Installation

1. Install dependencies:

```bash
bun install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` dengan database credentials Anda:

```env
# Application
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database

# CORS (comma-separated origins)
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Maintenance Mode
MAINTENANCE_MODE=false
```

## Database Setup

1. Generate migration files:

```bash
bun run db:generate
```

2. Run migrations:

```bash
bun run db:migrate
```

3. Seed the database (optional - hapus data lama dan insert data baru):

```bash
bun run src/db/seeds/reset-and-seed.ts
```

Atau gunakan regular seed:

```bash
bun run db:seed
```

## Development

Start the development server:

```bash
bun run dev
```

The API will be available at `http://localhost:5000` (atau sesuai PORT di .env)

## Available Scripts

- `bun run dev` - Start development server
- `bun run start` - Start production server
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio (database GUI)
- `bun run db:seed` - Seed database with initial data
- `bun test` - Run tests
- `bun test:watch` - Run tests in watch mode

## API Endpoints

### Public Endpoints (Read-only)

- `GET /api/health` - Health check
- `GET /api/landing-page` - All landing page data (optimized single call)
- `GET /api/pricing` - Pricing categories & items dengan i18n
- `GET /api/perfumes` - Perfume categories & items dengan i18n
- `GET /api/faqs` - Frequently asked questions dengan i18n
- `GET /api/testimonials` - Customer testimonials
- `GET /api/locations` - Store locations
- `GET /api/contacts` - Contact information (WhatsApp, Instagram, etc.)
- `GET /api/home-sections` - Home page sections
- `GET /api/home-sections/:key` - Specific home section by key
- `GET /api/settings` - Site settings

### Response Format

Semua endpoint mengembalikan response dalam format:

```json
{
  "success": true,
  "data": { ... }
}
```

Atau jika error:

```json
{
  "success": false,
  "error": "Error message"
}
```

### i18n Support

Semua data sudah include terjemahan English:
- `name` & `nameEn` - Nama item
- `description` & `descriptionEn` - Deskripsi
- `unit` & `unitEn` - Unit (kg, pcs, pair)
- `durationText` & `durationTextEn` - Durasi pengerjaan
- `question` & `questionEn` - Pertanyaan FAQ
- `answer` & `answerEn` - Jawaban FAQ

## Deployment ke Vercel

### 1. Persiapan GitHub Repository

Pastikan code sudah di-push ke GitHub:

```bash
git add .
git commit -m "Setup ElysiaJS API with i18n support"
git push origin main
```

### 2. Fixing "git author with contributing access" Error

Error ini terjadi karena Vercel tidak mengenali Git author dari commit Anda. Berikut cara mengatasinya:

#### Solusi 1: Link GitHub Account dengan Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) → Settings → Git
2. Pastikan GitHub account Anda sudah ter-link dengan Vercel
3. Klik "Connect GitHub Account" jika belum

#### Solusi 2: Add sebagai Collaborator

1. Owner repository harus menambahkan Anda sebagai collaborator
2. Buka GitHub repo → Settings → Collaborators
3. Add GitHub account Anda dengan akses "Write" atau "Admin"

#### Solusi 3: Deploy via Vercel Dashboard (Manual)

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik "Add New Project"
3. Import repository GitHub: `dolphin-dev-kpg/landing-page-api`
4. Configure project settings

#### Solusi 4: Use Vercel for GitHub App

1. Install [Vercel for GitHub App](https://github.com/apps/vercel) di repository Anda
2. Configure app dengan access ke repository
3. Push ulang atau trigger deployment manual

### 3. Configure Project di Vercel

Di Vercel Dashboard saat import project:

1. **Framework Preset**: Pilih "Other"
2. **Build Command**: Kosongkan (tidak perlu build untuk ElysiaJS)
3. **Output Directory**: Kosongkan
4. **Install Command**: `bun install`

### 4. Environment Variables

Tambahkan environment variables di Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
DATABASE_URL=your_production_database_url
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAINTENANCE_MODE=false
```

### 5. Vercel Configuration Files

Project ini sudah include:
- `vercel.json` - Bun runtime configuration
- `src/index.ts` - Elysia app entrypoint (auto-detected oleh Vercel)
- `.vercelignore` - Files to ignore saat deploy

**PENTING**: Vercel akan auto-detect `src/index.ts` sebagai Elysia app entrypoint dan deploy dengan Bun runtime.

### 6. Deploy

#### Via Vercel CLI (Recommended):

```bash
# Install Vercel CLI (minimum v49.0.0)
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Atau deploy ke production
vercel --prod
```

**Note**: Pastikan Vercel CLI minimal version 49.0.0 untuk support Bun runtime.

#### Via Vercel Dashboard:

Push ke GitHub, Vercel akan auto-deploy.

### 7. Database Migration di Production

Setelah deploy, jalankan migration di production database:

```bash
# Set DATABASE_URL ke production database
export DATABASE_URL="your_production_database_url"

# Run migrations
bun run db:migrate

# Seed data (optional)
bun run src/db/seeds/reset-and-seed.ts
```

### 8. Verify Deployment

Setelah deploy berhasil, test endpoints:

```bash
# Health check
curl https://your-vercel-domain.vercel.app/api/health

# Pricing
curl https://your-vercel-domain.vercel.app/api/pricing
```

## Project Structure

```
dolphin-landing-page-api/
├── src/
│   ├── index.ts              # Vercel entrypoint (export default app)
│   ├── app.ts                # ElysiaJS app setup
│   ├── main.ts               # Development entry point (bun run dev)
│   ├── env.ts                # Environment validation
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   ├── schema/           # Drizzle schemas
│   │   ├── seeds/            # Seed scripts
│   │   └── migrations/       # Database migrations
│   ├── modules/
│   │   ├── public/           # Public API endpoints
│   │   ├── health/           # Health check
│   │   └── docs/             # API docs (dev only)
│   └── lib/                  # Utilities
├── vercel.json               # Bun runtime configuration
├── .vercelignore             # Files to ignore
├── .env.example              # Environment template
├── tsconfig.json             # TypeScript config (Bun)
└── package.json
```

## Notes

- Health endpoint (`/api/health`) bisa menunjukkan "Database connection failed" jika DATABASE_URL tidak valid, tapi endpoints lainnya tetap berfungsi normal
- Semua data sudah include terjemahan English untuk i18n support
- API ini read-only (GET only) untuk keamanan
- Menggunakan ElysiaJS untuk performa maksimal di Bun runtime

## License

Private project.
