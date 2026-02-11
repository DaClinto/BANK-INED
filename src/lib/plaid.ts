import { Products, CountryCode } from 'plaid';

// Plaid configuration
export const PLAID_CONFIG = {
  // TODO: Replace with your actual Plaid environment
  env: process.env.PLAID_ENV || 'sandbox',
  clientId: process.env.PLAID_CLIENT_ID || 'your-client-id',
  secret: process.env.PLAID_SECRET || 'your-secret',
  products: ['transactions', 'auth'] as Products[],
  countryCodes: ['US'] as CountryCode[],
  language: 'en',
  webhook: process.env.PLAID_WEBHOOK_URL || 'https://your-domain.com/api/plaid/webhook',
};

// Plaid API endpoints
export const PLAID_ENDPOINTS = {
  createLinkToken: '/api/plaid/create_link_token',
  exchangePublicToken: '/api/plaid/exchange_public_token',
  getTransactions: '/api/plaid/transactions',
  getAccounts: '/api/plaid/accounts',
};

// Helper function to initialize Plaid Link
export const initializePlaidLink = async (userEmail: string) => {
  try {
    console.log('Initializing Plaid Link for:', userEmail);
    
    const response = await fetch('/api/plaid/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          client_user_id: userEmail,
        },
      }),
    });

    console.log('Plaid API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Plaid API error:', errorData);
      throw new Error(errorData.error || 'Failed to create link token');
    }

    const data = await response.json();
    console.log('Plaid API response data:', data);
    return data.link_token;
  } catch (error) {
    console.error('Error in initializePlaidLink:', error);
    throw error;
  }
};

// Helper function to exchange public token
export const exchangePublicToken = async (publicToken: string) => {
  try {
    const response = await fetch(PLAID_ENDPOINTS.exchangePublicToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_token: publicToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange public token');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
};

// Helper function to get transactions
export const getTransactions = async (accessToken: string, startDate: string, endDate: string) => {
  try {
    const response = await fetch(PLAID_ENDPOINTS.getTransactions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Helper function to get accounts
export const getAccounts = async (accessToken: string) => {
  try {
    const response = await fetch(PLAID_ENDPOINTS.getAccounts, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};
