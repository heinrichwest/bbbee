# Deployment Guide for bbbee.co.za

This guide will help you deploy your website with clean URLs (without .html extensions) using either Netlify or Vercel.

## Configuration Files Created

- **netlify.toml** - Configuration for Netlify deployment
- **vercel.json** - Configuration for Vercel deployment
- **.htaccess** - For Apache servers (traditional hosting)

## Option 1: Deploy to Netlify (Recommended)

Netlify is free, easy to use, and perfect for static sites.

### Step 1: Create a Netlify Account
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up with your GitHub account (or email)

### Step 2: Connect Your Repository

#### Method A: Deploy from Git (Recommended)
1. Push your code to GitHub (if not already done)
2. In Netlify dashboard, click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your repositories
5. Select your repository
6. Configure build settings:
   - **Build command:** Leave empty
   - **Publish directory:** `.` (current directory)
7. Click "Deploy site"

#### Method B: Manual Deploy (Quick Test)
1. In Netlify dashboard, click "Add new site" → "Deploy manually"
2. Drag and drop your entire website folder
3. Netlify will deploy it immediately

### Step 3: Configure Custom Domain
1. In your Netlify site dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `bbbee.co.za`
4. Netlify will provide DNS records to update
5. Go to your domain registrar and update DNS:
   - Add A record pointing to Netlify's IP
   - Or add CNAME record pointing to your-site.netlify.app
6. Wait for DNS propagation (5-60 minutes)

### Step 4: Enable HTTPS
1. In Netlify, go to "Domain settings" → "HTTPS"
2. Click "Verify DNS configuration"
3. Click "Provision certificate"
4. HTTPS will be enabled automatically (takes a few minutes)

---

## Option 2: Deploy to Vercel

Vercel is another excellent free option with similar features.

### Step 1: Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### Step 2: Deploy Your Site

#### Method A: Deploy from Git
1. Push your code to GitHub
2. In Vercel dashboard, click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** Leave empty
   - **Output Directory:** `.`
5. Click "Deploy"

#### Method B: Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. In your project directory, run:
   ```bash
   vercel
   ```
3. Follow the prompts to deploy

### Step 3: Add Custom Domain
1. In Vercel project dashboard, go to "Settings" → "Domains"
2. Add `bbbee.co.za`
3. Update DNS records at your domain registrar:
   - Add A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
4. Vercel will automatically provision SSL

---

## Option 3: Traditional Hosting (with .htaccess)

If you prefer traditional hosting (like cPanel/Apache):

1. Upload all files via FTP
2. The `.htaccess` file will handle clean URLs
3. Ensure Apache mod_rewrite is enabled
4. Update your domain's DNS to point to your hosting

---

## Testing Your Deployment

After deployment, test these URLs:

- ✅ `https://bbbee.co.za/` - Homepage
- ✅ `https://bbbee.co.za/why-use-us` - Clean URL works
- ✅ `https://bbbee.co.za/bbbee-consultants` - Clean URL works
- ✅ `https://bbbee.co.za/our-clients.html` - Should redirect to `/our-clients`

---

## Migrating from GitHub Pages

Since you're currently on GitHub Pages:

1. Deploy to Netlify/Vercel first
2. Test thoroughly
3. Update DNS to point to new host
4. Keep GitHub Pages active during transition
5. Once DNS propagates, you can disable GitHub Pages

---

## DNS Configuration for bbbee.co.za

### For Netlify:
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

### For Vercel:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## Benefits of Netlify/Vercel over GitHub Pages

✅ Clean URLs work perfectly (no .htaccess limitations)
✅ Automatic HTTPS with custom domain
✅ Better performance with global CDN
✅ Instant cache invalidation
✅ Form handling (Netlify)
✅ Serverless functions available
✅ Continuous deployment from Git
✅ Free tier is generous

---

## Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **DNS Help:** Contact your domain registrar

---

## Quick Start Command

If you want to deploy right now:

```bash
# For Netlify (install Netlify CLI first)
npm install -g netlify-cli
netlify deploy --prod

# For Vercel
npm install -g vercel
vercel --prod
```
