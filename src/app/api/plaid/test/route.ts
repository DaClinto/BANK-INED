import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid-client';
import { CountryCode } from 'plaid';

export async function GET() {
  try {
    // Test the Plaid client configuration
    const response = await plaidClient.institutionsGet({
      country_codes: ['US' as CountryCode],
      count: 5, // Limit to 5 institutions for testing
      offset: 0, // Start from the beginning
    });

    return NextResponse.json({ 
      success: true,
      message: 'Plaid client is configured correctly',
      institutions_count: response.data.institutions.length,
      sample_institutions: response.data.institutions.slice(0, 3).map(inst => ({
        name: inst.name,
        institution_id: inst.institution_id
      }))
    });
  } catch (error: any) {
    console.error('Plaid configuration error:', error);
    return NextResponse.json({ 
      success: false,
      error: error?.message || 'Plaid configuration failed'
    }, { status: 500 });
  }
}
