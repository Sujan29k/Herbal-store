s# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/herbalstore?retryWrites=true&w=majority
```

### NextAuth Configuration
```
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=http://localhost:3000
```

### Email Configuration (for order notifications)
```
ADMIN_EMAIL=your-email@gmail.com
ADMIN_EMAIL_PASSWORD=your-gmail-app-password
```

### Google OAuth (Optional)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Support Contact
```
SUPPORT_PHONE=+977-9876543210
```

## Setup Instructions

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace `username`, `password`, and `cluster` with your actual values

### 2. Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password as `ADMIN_EMAIL_PASSWORD`

### 3. NextAuth Secret
Generate a strong secret:
```bash
openssl rand -base64 32
```

### 4. Google OAuth (Optional)
1. Go to Google Cloud Console
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

## Production Deployment

For Vercel deployment:
1. Add all environment variables in Vercel dashboard
2. Set `NEXTAUTH_URL` to your production domain
3. Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

## Testing

After setting up environment variables:
1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Test user registration and login
4. Test product browsing and cart functionality
5. Test order placement and email delivery 