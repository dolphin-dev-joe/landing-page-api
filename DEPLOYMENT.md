# 🚀 Deployment Guide ke Vercel

## TL;DR - Quick Deploy

```bash
# 1. Commit & push ke GitHub
git add .
git commit -m "Setup ElysiaJS with Bun runtime"
git push origin main

# 2. Deploy dengan Vercel CLI
npm i -g vercel@latest  # Pastikan >= v49.0.0
vercel login
vercel --prod
```

---

## Fix Error "ERR_MODULE_NOT_FOUND"

Error ini sudah **FIXED** dengan:

### ✅ Solution yang Diterapkan

1. **Gunakan Bun Runtime di Vercel**
   - File `vercel.json` sudah configured dengan `bunVersion: "1.x"`
   - Bun runtime support native TypeScript dan ElysiaJS

2. **Proper Entrypoint**
   - File `src/index.ts` export default Elysia app
   - Vercel auto-detect file ini sebagai entrypoint
   - **TIDAK PERLU** folder `api/` lagi

3. **File Structure**
   ```
   src/
   ├── index.ts    ← Vercel entrypoint (export default app)
   ├── app.ts      ← ElysiaJS app factory
   └── main.ts     ← Development entry (bun run dev)
   ```

---

## Step-by-Step Deployment

### 1. Persiapan Kode

Pastikan code sudah di-commit:

```bash
git status
git add .
git commit -m "Setup ElysiaJS API with Bun runtime for Vercel"
git push origin main
```

### 2. Setup Vercel Project

#### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI (minimum v49.0.0)
npm install -g vercel@latest

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

#### Option B: Via Vercel Dashboard

1. Buka https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository: `dolphin-dev-kpg/landing-page-api`
4. Settings akan auto-detect:
   - **Framework**: Elysia
   - **Build Command**: (auto)
   - **Output Directory**: (auto)
   - **Install Command**: `bun install`

### 3. Configure Environment Variables

Di Vercel Dashboard → Settings → Environment Variables, tambahkan:

```env
NODE_ENV=production
DATABASE_URL=your_neon_database_url
CORS_ORIGINS=https://www.dolphin-laundry-kupang.biz.id,https://dolphin-laundry-kupang.biz.id
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAINTENANCE_MODE=false
```

**IMPORTANT**: Gunakan Neon database URL dari production database!

### 4. Deploy

Push ke GitHub atau trigger manual deploy di Vercel Dashboard.

Vercel akan:
1. ✅ Detect `src/index.ts` sebagai Elysia app
2. ✅ Install dependencies dengan Bun
3. ✅ Deploy dengan Bun runtime
4. ✅ Auto-configure routing

### 5. Verify Deployment

Test endpoints setelah deploy:

```bash
# Replace dengan domain Vercel Anda
DOMAIN="https://your-project.vercel.app"

# Health check
curl $DOMAIN/api/health

# Pricing dengan i18n
curl $DOMAIN/api/pricing

# Perfumes
curl $DOMAIN/api/perfumes

# FAQs dengan terjemahan English
curl $DOMAIN/api/faqs
```

Expected response:
```json
{
  "success": true,
  "data": { ... }
}
```

---

## Troubleshooting

### Error: "git author with contributing access"

**Solusi**: Deploy manual via Vercel Dashboard atau pastikan GitHub account ter-link dengan Vercel.

1. Buka Vercel Dashboard → Settings → Git
2. Klik "Connect GitHub Account"
3. Atau tambahkan sebagai collaborator di GitHub repo

### Error: "Cannot find module"

**Solusi**: Sudah fixed! Pastikan:
- ✅ `vercel.json` punya `bunVersion: "1.x"`
- ✅ `src/index.ts` exists dan export default app
- ✅ No `api/` folder

### Error: "Database connection failed"

Health endpoint mungkin show error ini tapi **endpoints lain tetap works**. Ini normal karena health check strict.

**Fix**: Pastikan `DATABASE_URL` di Environment Variables benar.

---

## Production Checklist

- [ ] Code committed & pushed ke GitHub
- [ ] Environment variables set di Vercel
- [ ] `CORS_ORIGINS` include production domain
- [ ] Database migrations sudah run di production DB
- [ ] Seed data (optional) sudah insert
- [ ] Test all endpoints after deploy
- [ ] Custom domain configured (optional)

---

## Database Migration di Production

Setelah deploy, run migrations:

```bash
# Set DATABASE_URL ke production
export DATABASE_URL="postgresql://..."

# Run migrations
bun run db:migrate

# Optional: Seed data
bun run src/db/seeds/reset-and-seed.ts
```

---

## Notes

- Vercel menggunakan **Bun runtime** untuk ElysiaJS
- Auto-detect `src/index.ts` sebagai entrypoint
- Semua routes accessible via `/api/*`
- Production URL: `https://your-project.vercel.app`
- Preview deployments otomatis untuk setiap push

## Support

Dokumentasi Vercel untuk Elysia:
https://vercel.com/docs/frameworks/elysia
