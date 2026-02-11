import { NextRequest, NextResponse } from 'next/server';
import { PLAID_CONFIG } from '@/lib/plaid';
import { plaidClient } from '@/lib/plaid-client';

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    
    console.log('Plaid Config:', PLAID_CONFIG);
    console.log('User data:', user);
    
    // Test basic Plaid connection first
    try {
      const institutionsResponse = await plaidClient.institutionsGet({
        country_codes: ['US' as any],
        count: 1,
        offset: 0,
      });
      console.log('Plaid connection test: SUCCESS');
    } catch (testError) {
      console.error('Plaid connection test FAILED:', testError);
      return NextResponse.json({ 
        error: 'Plaid connection failed',
        details: testError.message,
        config: {
          env: PLAID_CONFIG.env,
          clientId: process.env.PLAID_CLIENT_ID?.substring(0, 8) + '...',
          secret: process.env.PLAID_SECRET ? 'SET' : 'NOT_SET'
        }
      }, { status: 500 });
    }
    
    // Now try to create link token
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

    console.log('Link token created successfully');
    return NextResponse.json({ 
      success: true,
      link_token: response.data.link_token 
    });
  } catch (error: any) {
    console.error('Debug - Full error:', error);
    return NextResponse.json({ 
      error: 'Failed to create link token',
      details: error.message,
      stack: error.stack,
      config: {
        env: PLAID_CONFIG.env,
        clientId: process.env.PLAID_CLIENT_ID?.substring(0, 8) + '...',
        secret: process.env.PLAID_SECRET ? 'SET' : 'NOT_SET',
        products: PLAID_CONFIG.products,
        countryCodes: PLAID_CONFIG.countryCodes
      }
    }, { status: 500 });
  }
}
