# HerbalStore - Natural Wellness E-commerce Platform

A modern, full-stack e-commerce application for herbal and natural wellness products, built with Next.js 15, TypeScript, MongoDB, and NextAuth.js.

## 🌿 Features

- **User Authentication**: Secure login/signup with NextAuth.js
- **Guest Checkout**: Shop without registration
- **Product Catalog**: Browse and search herbal products
- **Shopping Cart**: Add items to cart (local storage for guests, database for users)
- **Order Management**: Complete checkout process with email notifications
- **Admin Dashboard**: Manage products and orders
- **Responsive Design**: Modern UI with Tailwind CSS
- **Email Notifications**: Order confirmations sent to customers and admin

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd herbalstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp ENVIRONMENT_SETUP.md .env.local
   # Edit .env.local with your actual values
   ```

4. **Add sample products**
   ```bash
   npm run add-products
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👨‍💼 Admin Access

### Creating an Admin User

To access the admin dashboard, you need to create an admin user:

1. **Run the admin creation script**
   ```bash
   npx ts-node scripts/createAdmin.ts
   ```
   This creates an admin user with:
   - Email: `admin@jadimart.com`
   - Password: `admin123`
   - Role: `admin`

2. **Login as admin**
   - Go to `/login`
   - Use the admin credentials above
   - You'll be automatically redirected to `/admin/dashboard`

### Admin Features

- **Admin Panel Access**: Only visible to users with `role: "admin"`
- **Automatic Redirects**: Admin users are redirected to admin dashboard on login
- **Admin Badge**: Visual indicator in navigation showing admin status
- **Product Management**: Add, edit, and manage products
- **Order Management**: View and process customer orders

### Manual Admin User Creation

Alternatively, you can manually set a user's role to "admin" in your MongoDB database:

```javascript
// In MongoDB Compass or shell
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## 📁 Project Structure

```
herbalstore/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Product catalog
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout process
│   │   └── ...
│   ├── components/         # React components
│   ├── lib/               # Utilities and configurations
│   ├── models/            # MongoDB schemas
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── scripts/               # Database scripts
```

## 🔧 Configuration

### Environment Variables

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed setup instructions.

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL
- `ADMIN_EMAIL` - Gmail address for notifications
- `ADMIN_EMAIL_PASSWORD` - Gmail app password

### Database Setup

1. Create a MongoDB Atlas cluster
2. Add your connection string to `.env.local`
3. Run `npm run add-products` to populate sample data

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run add-products` - Add sample products to database

### Key Features Implementation

- **Authentication**: NextAuth.js with credentials and Google OAuth
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer with Gmail SMTP
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and localStorage
- **API Routes**: Next.js API routes with proper error handling

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

- Set `NEXTAUTH_URL` to your production domain
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Use Gmail app passwords for email functionality

## 🐛 Troubleshooting

### Common Issues

1. **Products not loading**: Check MongoDB connection and environment variables
2. **Email not sending**: Verify Gmail app password and 2FA setup
3. **Authentication errors**: Ensure NEXTAUTH_SECRET is set correctly
4. **Build errors**: Check TypeScript and ESLint configurations

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## 📝 TODO

- [ ] Email verification system
- [ ] Order history for users
- [ ] Order cancellation functionality
- [ ] Review and rating system
- [ ] Admin review management
- [ ] Enhanced product filtering
- [ ] Payment gateway integration
- [ ] Inventory management
- [ ] User profile management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email [support@herbalstore.com](mailto:support@herbalstore.com) or create an issue in the repository.
