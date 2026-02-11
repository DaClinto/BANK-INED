# Plaid Integration Setup Guide

This guide will help you set up Plaid integration for the Horizon Banking application.

## 🏦 Prerequisites

- Plaid account (sign up at [https://dashboard.plaid.com](https://dashboard.plaid.com))
- Business bank account for testing (sandbox mode)
- Horizon Banking application running locally

## 📋 Step 1: Create Plaid Account

1. **Sign up** at [https://dashboard.plaid.com](https://dashboard.plaid.com)
2. **Verify your email** and complete onboarding
3. **Choose your plan** (start with Sandbox - it's free)

## 🔧 Step 2: Configure Plaid Environment

### Sandbox Environment (Recommended for Development)

1. **Navigate to Team Settings → Keys**
2. **Copy your credentials**:
   - `client_id`
   - `secret` (sandbox)
   - `sandbox` environment

### Production Environment

1. **Complete Plaid's verification process**
2. **Request production access**
3. **Submit compliance documentation**

## ⚙️ Step 3: Update Environment Variables

Add your Plaid credentials to `.env.local`:

```env
# Plaid Configuration
PLAID_ENV=sandbox
PLAID_CLIENT_ID=your_sandbox_client_id
PLAID_SECRET=your_sandbox_secret
PLAID_WEBHOOK_URL=https://your-domain.com/api/plaid/webhook
```

**Important**: Never commit `.env.local` to version control!

## 🏗️ Step 4: Create API Routes

Create the necessary API endpoints for Plaid integration:

### 1. Create Link Token Endpoint

```typescript
// src/app/api/plaid/create_link_token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PLAID_CONFIG } from '@/lib/plaid';
import { plaidClient } from '@/lib/plaid-client';

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user.client_user_id,
      },
      client_name: 'Horizon Banking',
      products: PLAID_CONFIG.products,
      country_codes: PLAID_CONFIG.countryCodes,
      language: PLAID_CONFIG.language,
      webhook: PLAID_CONFIG.webhook,
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    return NextResponse.json(
      { error: 'Failed to create link token' },
      { status: 500 }
    );
  }
}
```

### 2. Exchange Public Token Endpoint

```typescript
// src/app/api/plaid/exchange_public_token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid-client';

export async function POST(request: NextRequest) {
  try {
    const { public_token } = await request.json();
    
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Store in your database
    await savePlaidItem(itemId, accessToken);

    return NextResponse.json({ 
      success: true,
      item_id: itemId 
    });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    );
  }
}
```

### 3. Get Transactions Endpoint

```typescript
// src/app/api/plaid/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid-client';

export async function POST(request: NextRequest) {
  try {
    const { access_token, start_date, end_date } = await request.json();
    
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date,
      end_date,
    });

    return NextResponse.json({ 
      transactions: response.data.transactions 
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
```

## 🔌 Step 5: Install Plaid Client

Create a Plaid client configuration:

```typescript
// src/lib/plaid-client.ts
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
```

## 🎨 Step 6: Create Plaid Link Component

Create a React component to handle Plaid Link:

```typescript
// src/components/PlaidLink.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { initializePlaidLink, exchangePublicToken } from '@/lib/plaid';

interface PlaidLinkProps {
  onSuccess?: () => void;
  onExit?: () => void;
}

export default function PlaidLink({ onSuccess, onExit }: PlaidLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectBank = async () => {
    setIsLoading(true);
    
    try {
      const linkToken = await initializePlaidLink('user@example.com');
      
      const handler = (window as any).Plaid.create({
        token: linkToken,
        onSuccess: async (public_token: string) => {
          await exchangePublicToken(public_token);
          onSuccess?.();
        },
        onExit: () => {
          onExit?.();
        },
      });

      handler.open();
    } catch (error) {
      console.error('Error connecting bank:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleConnectBank}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? 'Connecting...' : 'Connect Bank Account'}
    </Button>
  );
}
```

## 📱 Step 7: Add Plaid Script to Layout

Update your root layout to include Plaid's JavaScript:

```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
          data-client-name="Horizon Banking"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

## 🏦 Step 8: Test Integration

### Sandbox Testing

1. **Use test credentials**:
   - Username: `user_good`
   - Password: `pass_good`
   - Bank: **First Platypus Bank**

2. **Test the flow**:
   - Click "Connect Bank Account"
   - Enter test credentials
   - Select accounts to connect
   - Verify success callback

### Common Test Banks

| Bank | Username | Password | Notes |
|------|----------|----------|-------|
| First Platypus Bank | user_good | pass_good | All features |
| Second Platypus Bank | user_good | pass_good | Limited features |
| Third Platypus Bank | user_good | pass_good | Basic features |

## 🔧 Step 9: Production Deployment

### 1. Update Environment Variables

```env
# Production
PLAID_ENV=production
PLAID_CLIENT_ID=your_production_client_id
PLAID_SECRET=your_production_secret
```

### 2. Configure Webhooks

In your Plaid dashboard, set up webhooks for:
- `ITEM` webhook notifications
- `TRANSACTIONS` webhook updates
- `ERROR` webhook handling

### 3. Security Considerations

- Use HTTPS in production
- Validate webhook signatures
- Implement rate limiting
- Store access tokens securely

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid client_id"**
   - Check environment variables
   - Verify Plaid environment matches

2. **"Link token expired"**
   - Tokens expire in 30 minutes
   - Generate fresh token for each attempt

3. **"Webhook verification failed"**
   - Ensure webhook URL is accessible
   - Check webhook signature validation

4. **"No transactions found"**
   - Test bank may have limited data
   - Try different test bank

### Debug Mode

Enable debug logging:

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Plaid Debug:', data);
}
```

## 📚 Additional Resources

- [Plaid Documentation](https://plaid.com/docs/)
- [Plaid API Reference](https://plaid.com/docs/api/)
- [Plaid Quickstart](https://plaid.com/docs/quickstart/)
- [Test Credentials](https://plaid.com/docs/sandbox/test-credentials/)

## 🆘 Support

If you encounter issues:

1. Check Plaid dashboard for API status
2. Review error logs in your application
3. Verify environment variables
4. Test with different sandbox banks

---

**Note**: Always test thoroughly in sandbox before moving to production!
