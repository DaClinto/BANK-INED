# Horizon Banking - Production-Ready Banking Application

A modern, secure banking application built with Next.js 14, TypeScript, and enterprise-grade technologies.

## 🚀 Features

- **Secure Authentication**: User registration and login with Appwrite
- **Real-Time Dashboard**: Interactive dashboard with balance charts and transaction history
- **Transaction Management**: View, filter, and search transactions
- **Money Transfers**: Send money between accounts and users
- **Multi-Bank Support**: Connect multiple bank accounts via Plaid integration
- **Data Visualization**: Beautiful charts showing account balances and spending patterns
- **Responsive Design**: Mobile-first design with Tailwind CSS and Shadcn UI
- **Type Safety**: Full TypeScript implementation with strict typing

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Modern component library
- **Chart.js** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Services
- **Appwrite** - Authentication and database
- **Plaid** - Bank account connectivity
- **Sentry** - Error tracking and monitoring

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/          # Main dashboard
│   ├── transactions/       # Transaction history
│   ├── transfers/          # Money transfers
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── charts/           # Chart components
│   └── forms/            # Form components
├── lib/                  # Utility functions
│   ├── utils/           # Helper functions
│   ├── appwrite.ts      # Appwrite configuration
│   └── plaid.ts         # Plaid integration
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd horizon-banking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id

   # Plaid Configuration
   PLAID_ENV=sandbox
   PLAID_CLIENT_ID=your-plaid-client-id
   PLAID_SECRET=your-plaid-secret
   PLAID_WEBHOOK_URL=https://your-domain.com/api/plaid/webhook

   # Sentry Configuration
   NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
   SENTRY_AUTH_TOKEN=your-sentry-auth-token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Architecture Decisions

### Server vs Client Components

- **Server Components**: Used for static content, data fetching, and SEO-critical pages
- **Client Components**: Used for interactive features like forms, charts, and real-time updates

### Route Groups

- **(auth)**: Authentication routes with shared layout
- **Root**: Main application routes with navigation

### State Management

- **React State**: Local component state
- **Server State**: Fetched from Appwrite on server components
- **Form State**: Managed with React Hook Form and Zod validation

## 🔐 Security Features

- **Multi-Factor Authentication**: Configurable MFA with Appwrite
- **Input Validation**: Zod schemas for all form inputs
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Secure Headers**: Security headers configured in Next.js
- **Environment Variables**: Sensitive data stored securely

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Account
```typescript
interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  bankName: string;
  lastFour: string;
  plaidAccountId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  currency: string;
  type: 'debit' | 'credit';
  category: string;
  description: string;
  merchantName?: string;
  date: string;
  pending: boolean;
  plaidTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Docker

```bash
# Build the image
docker build -t horizon-banking .

# Run the container
docker run -p 3000:3000 horizon-banking
```

### Environment Setup

For production, ensure:

1. **Appwrite Project**: Set up with proper collections and indexes
2. **Plaid Integration**: Configure webhooks and API keys
3. **Domain Configuration**: Set up custom domain with SSL
4. **Monitoring**: Configure Sentry for error tracking

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 📈 Performance

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: `npm run analyze`
- **Lighthouse Score**: 95+ on all metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ by the Horizon Banking Team
