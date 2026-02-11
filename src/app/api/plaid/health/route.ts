import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are set
    const clientId = process.env.PLAID_CLIENT_ID;
    const secret = process.env.PLAID_SECRET;
    const env = process.env.PLAID_ENV;

    if (!clientId || clientId === 'your-client-id') {
      return NextResponse.json({ 
        success: false,
        error: 'PLAID_CLIENT_ID not configured',
        message: 'Please add your actual Plaid Client ID to .env.local'
      }, { status: 400 });
    }

    if (!secret || secret === 'your-secret') {
      return NextResponse.json({ 
        success: false,
        error: 'PLAID_SECRET not configured',
        message: 'Please add your actual Plaid Secret to .env.local'
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Plaid environment variables are configured',
      config: {
        client_id: clientId.substring(0, 8) + '...', // Show partial for security
        env: env,
        secret_configured: secret.length > 20
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
