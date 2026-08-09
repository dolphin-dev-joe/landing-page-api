# Vercel Setup Guide - SUPER SIMPEL! 🚀

## Setup Cepat (3 Langkah):

### 1. Push ke GitHub
```bash
git add .
git commit -m "Setup Vercel deployment"
git push
```

### 2. Deploy ke Vercel
- Buka https://vercel.com
- Import project dari GitHub
- Vercel akan auto-detect dan deploy!

### 3. Tambah Environment Variable
Di Vercel Dashboard > Settings > Environment Variables, tambahkan:

**WAJIB:**
```
DATABASE_URL = (paste connection string dari Neon/Supabase)
```

**Opsional (sudah ada default):**
```
NODE_ENV = production
```

Klik **Save** dan **Redeploy** ✅

## Endpoints yang Tersedia:

```
GET /                          - Info API
GET /api/health                - Health check + DB status
GET /api/landing-page          - Semua data (1 call) - returns:
                                 { pricingCategories, pricingItems,
                                   perfumeCategories, perfumes,
                                   faqs, testimonials, locations,
                                   contacts, homeSections, settings }
GET /api/pricing               - Pricing categories + items
GET /api/perfumes              - Perfume categories + items
GET /api/faqs                  - FAQs
GET /api/testimonials          - Testimonials
GET /api/locations             - Lokasi
GET /api/contacts              - Kontak
GET /api/home-sections         - Home sections
GET /api/home-sections/:key    - Home section by key
GET /api/settings              - Site settings
```

## Testing Local:

```bash
bun run dev
```

Server: `http://localhost:5000`

## Struktur File:

```
/api/
  ├── index.ts    - Main handler (semua routes)
  ├── db.ts       - Database connection
  └── schema.ts   - Database schema
/src/             - Source code untuk local dev
vercel.json       - Vercel config (sudah auto-setup)
```

## Troubleshooting:

**Error 404?**
- Pastikan DATABASE_URL sudah diset di Vercel
- Redeploy setelah add env variables

**CORS Error?**
- Edit `api/index.ts` line 13, tambahkan domain production Anda

**Database Error?**
- Check DATABASE_URL valid
- Pastikan database sudah ada tables (run migrations dulu)

Selesai! 🎉
