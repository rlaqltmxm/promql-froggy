# 🚀 Vercel Deployment Guide

How to deploy PromQL Froggy to Vercel.

## Method 1: GitHub Integration (Recommended!)

The easiest and most automated approach.

### Steps

1. **Push Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/promql-froggy.git
git push -u origin main
```

2. **Import Project on Vercel**
   - Visit [vercel.com](https://vercel.com) and log in with GitHub
   - Click "Add New..." → "Project"
   - Select `promql-froggy` from your GitHub repositories
   - Click "Import"

3. **Confirm Settings**
   - Framework Preset: Vite (auto-detected)
   - Build Command: `npm run build` (auto-configured)
   - Output Directory: `dist` (auto-configured)
   - Click "Deploy"

4. **Done!**
   - Deployment starts automatically
   - URL: `https://promql-froggy.vercel.app` (or auto-generated URL)
   - Future deployments happen automatically with `git push`!

---

## Method 2: CLI Deployment

Deploy directly from your local machine.

### Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
# From project root
vercel

# Production deployment
vercel --prod
```

4. **Done!**
   - Builds and deploys automatically
   - Deployment URL is displayed in terminal

---

## ⚙️ Project Settings

Vercel auto-detects:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

No additional configuration needed!

---

## 🌐 Custom Domain Setup

1. Access Vercel project dashboard
2. Go to "Settings" → "Domains"
3. Enter your domain (e.g., `promqlfroggy.com`)
4. Add DNS record:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `cname.vercel-dns.com`

Done! SSL certificate is issued automatically.

---

## 🔧 Environment Variables (if needed)

Current project doesn't require environment variables, but if needed later:

1. Vercel Dashboard → "Settings" → "Environment Variables"
2. Add variables
3. Redeploy

---

## 📊 Post-Deployment Features

### Automatic Features
- ✅ HTTPS auto-enabled
- ✅ Global CDN deployment
- ✅ Auto-deploy on git push
- ✅ Preview deployments (separate URL per PR)
- ✅ Rollback capability

### Performance Optimizations
- ✅ Automatic image optimization
- ✅ Edge caching
- ✅ Gzip/Brotli compression

---

## 🚨 Troubleshooting

### Build Failures

**Test build locally:**
```bash
npm run build
```

**Reinstall node_modules:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors (Routing Issues)

Vercel auto-detects SPAs, so no additional config needed.
If issues persist, create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Environment-Based Deployments

```bash
# Preview deployment (for testing)
vercel

# Production deployment
vercel --prod
```

---

## 📈 Post-Deployment Analytics

Available in Vercel dashboard:
- Visitor statistics
- Performance metrics
- Build logs
- Error tracking

---

## 🎯 Quick Start Summary

```bash
# With GitHub integration
1. git push
2. Import on vercel.com
3. Done!

# With CLI
1. vercel login
2. vercel --prod
3. Done!
```

**Expected deployment time:** 1-2 minutes

**Example URL:** `https://promql-froggy-[random].vercel.app`

---

**Happy Deploying! 🐸🚀**

For issues, check [Vercel Documentation](https://vercel.com/docs).
