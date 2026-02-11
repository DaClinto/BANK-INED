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
