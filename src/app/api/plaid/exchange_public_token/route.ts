import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid-client';
import { createDocument } from '@/lib/appwrite';
import { COLLECTIONS } from '@/lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    const { public_token, userId } = await request.json();
    
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Store in database
    await createDocument(COLLECTIONS.PLAID_ITEMS, {
      userId,
      plaidItemId: itemId,
      accessToken,
      status: 'active',
    });

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
