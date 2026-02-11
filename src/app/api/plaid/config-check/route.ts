import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple environment variable check
    const config = {
      clientId: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET ? 'CONFIGURED' : 'NOT_CONFIGURED',
      env: process.env.PLAID_ENV || 'NOT_SET',
      webhook: process.env.PLAID_WEBHOOK || 'NOT_SET',
    };

    const isConfigured = config.clientId && 
                       config.clientId !== 'your-client-id' && 
                       config.secret === 'CONFIGURED';

    return NextResponse.json({ 
      success: isConfigured,
      message: isConfigured ? 'Plaid is ready!' : 'Plaid needs configuration',
      config: {
        clientId: config.clientId?.substring(0, 8) + '...',
        secret: config.secret,
        env: config.env,
        webhook: config.webhook ? 'SET' : 'NOT_SET'
      },
      nextSteps: isConfigured ? [
        '✅ Test bank connection at /accounts',
        '✅ Use PlaidLink component',
        '✅ Ready for production deployment'
      ] : [
        '❌ Add your actual PLAID_CLIENT_ID to .env.local',
        '❌ Ensure PLAID_SECRET is set correctly',
        '❌ Restart development server'
      ]
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
