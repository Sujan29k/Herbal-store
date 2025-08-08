# Vercel Deployment Guide

## Steps to Deploy on Vercel

### 1. Prepare Environment Variables
- Copy all variables from `.env.example`
- Update `NEXTAUTH_URL` to your Vercel domain
- Make sure MongoDB URI includes database name

### 2. Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### 3. Configure Environment Variables in Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add all variables from `.env.example`
4. Make sure to set them for Production, Preview, and Development

### 4. Common Issues and Solutions

#### Products Page Not Loading
- Check if MongoDB connection is working
- Verify environment variables are set correctly
- Check Vercel function logs for errors

#### Database Connection Issues
- Ensure MongoDB URI includes database name
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)
- Verify MongoDB credentials

#### Email Issues
- Ensure Gmail app password is correct
- Check if 2FA is enabled on Gmail account
- Verify ADMIN_EMAIL and ADMIN_EMAIL_PASSWORD

### 5. Testing Deployment
1. Visit your Vercel URL
2. Check if products load on dashboard page
3. Test order placement and email delivery
4. Verify all API endpoints work

### 6. Environment Variables Checklist
- [ ] MONGODB_URI (with database name)
- [ ] NEXTAUTH_SECRET (long random string)
- [ ] NEXTAUTH_URL (your Vercel domain)
- [ ] ADMIN_EMAIL
- [ ] ADMIN_EMAIL_PASSWORD
- [ ] SUPPORT_PHONE
- [ ] GOOGLE_CLIENT_ID (optional)
- [ ] GOOGLE_CLIENT_SECRET (optional)

### 7. MongoDB Atlas Configuration
1. Ensure your cluster allows connections from anywhere (0.0.0.0/0)
2. Create a database user with read/write permissions
3. Include database name in connection string

### 8. Troubleshooting
- Check Vercel function logs in dashboard
- Verify MongoDB connection string format
- Test API endpoints directly: `/api/products`
- Check browser console for client-side errors

### 9. Performance Optimization
- Images are optimized for Vercel
- API routes have proper caching headers
- Database connections are cached for serverless

### 10. Security Notes
- Use strong NEXTAUTH_SECRET in production
- Ensure environment variables are not exposed
- Use app passwords for Gmail (not main password)
