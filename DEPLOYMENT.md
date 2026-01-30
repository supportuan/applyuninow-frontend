# Deployment Guide - ApplyUniNow Frontend

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_BASE_URL` with your backend API URL
   - Add `NEXT_PUBLIC_DATA_STORAGE_URL` with your storage URL

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Configuration:
- Build Command: `npm run nbuild`
- Output Directory: `.next`
- Install Command: `npm install`

---

### Option 2: Netlify

#### Steps:
1. **Build the Application**
   ```bash
   npm run nbuild
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add required environment variables

#### netlify.toml Configuration:
```toml
[build]
  command = "npm run nbuild"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: Railway

#### Steps:
1. **Connect GitHub Repository**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure Build Settings**
   - Build Command: `npm run nbuild`
   - Start Command: `npm run nstart`
   - Root Directory: `/` (or leave empty)

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app
   NEXT_PUBLIC_DATA_STORAGE_URL=https://your-backend.railway.app
   ```

4. **Deploy**
   - Railway will automatically deploy on push to main branch

---

### Option 4: Docker Deployment

#### Build Docker Image:
```bash
docker build -t applyuninow-frontend .
```

#### Run Container:
```bash
docker run -d \
  -p 3001:3001 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.applyuninow.com \
  -e NEXT_PUBLIC_DATA_STORAGE_URL=https://api.applyuninow.com \
  --name applyuninow-frontend \
  applyuninow-frontend
```

#### Using Docker Compose:
```bash
docker-compose up -d
```

---

### Option 5: AWS (EC2 + S3 + CloudFront)

#### EC2 Deployment:
1. **Launch EC2 Instance** (Ubuntu 22.04 LTS)
2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd applyuninow-frontend
   npm install
   npm run nbuild
   ```

4. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "applyuninow-frontend" -- run nstart
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx as Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Option 6: Google Cloud Platform (Cloud Run)

#### Steps:
1. **Build Container**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/applyuninow-frontend
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy applyuninow-frontend \
     --image gcr.io/PROJECT_ID/applyuninow-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NEXT_PUBLIC_API_BASE_URL=https://api.applyuninow.com
   ```

---

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3337
NEXT_PUBLIC_DATA_STORAGE_URL=http://localhost:3337
```

### Staging
```env
NEXT_PUBLIC_API_BASE_URL=https://api-staging.applyuninow.com
NEXT_PUBLIC_DATA_STORAGE_URL=https://api-staging.applyuninow.com
```

### Production
```env
NEXT_PUBLIC_API_BASE_URL=https://api.applyuninow.com
NEXT_PUBLIC_DATA_STORAGE_URL=https://api.applyuninow.com
```

---

## SSL/HTTPS Configuration

### Using Let's Encrypt (Nginx)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Cloudflare (Recommended)
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

---

## Performance Optimization

### CDN Configuration
- Use Cloudflare or AWS CloudFront
- Enable caching for static assets
- Configure cache headers

### Image Optimization
- Next.js automatically optimizes images
- Use WebP format where possible
- Implement lazy loading

### Code Splitting
- Already implemented via Next.js
- Dynamic imports for heavy components

---

## Monitoring and Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// pages/_app.jsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### Google Analytics
- Add GA tracking ID to environment variables
- Implement in `_app.jsx`

---

## Rollback Strategy

### Vercel
```bash
vercel rollback
```

### Docker
```bash
docker tag applyuninow-frontend:latest applyuninow-frontend:backup
docker pull applyuninow-frontend:previous-version
docker run applyuninow-frontend:previous-version
```

---

## Health Checks

Add health check endpoint in `pages/api/health.js`:
```javascript
export default function handler(req, res) {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
}
```

---

## Troubleshooting Deployment

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Clear cache: `rm -rf .next node_modules`

### Runtime Errors
- Check environment variables are set
- Verify API connectivity
- Check browser console for errors

### Performance Issues
- Enable caching
- Optimize images
- Use CDN for static assets

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Health check endpoint working
- [ ] Analytics tracking active
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] CDN configured
- [ ] Performance tested
- [ ] Security headers configured

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review application logs
3. Verify environment configuration
4. Contact DevOps team
