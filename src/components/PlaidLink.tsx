'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { initializePlaidLink, exchangePublicToken } from '@/lib/plaid';

interface PlaidLinkProps {
  onSuccess?: () => void;
  onExit?: () => void;
  userId?: string;
  userEmail?: string;
}

export default function PlaidLink({ 
  onSuccess, 
  onExit, 
  userId = 'user1',
  userEmail = 'user@example.com' 
}: PlaidLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Plaid script
    const script = document.createElement('script');
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleConnectBank = async () => {
    setIsLoading(true);
    
    try {
      console.log('Starting Plaid connection...');
      const linkToken = await initializePlaidLink(userEmail);
      console.log('Link token received:', linkToken?.substring(0, 20) + '...');
      
      // Check if Plaid script is loaded
      if (!(window as any).Plaid) {
        throw new Error('Plaid script not loaded');
      }
      
      const handler = (window as any).Plaid.create({
        token: linkToken,
        onSuccess: async (public_token: string) => {
          console.log('Plaid success, exchanging token...');
          await exchangePublicToken(public_token);
          onSuccess?.();
        },
        onExit: (err: any) => {
          console.log('Plaid exit:', err);
          onExit?.();
        },
        onEvent: (eventName: string, metadata: any) => {
          console.log('Plaid event:', eventName, metadata);
        },
      });

      handler.open();
    } catch (error: any) {
      console.error('Error connecting bank:', error);
      alert(`Failed to connect bank: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleConnectBank}
      disabled={isLoading}
      className="w-full"
      size="lg"
    >
      {isLoading ? 'Connecting...' : '🏦 Connect Bank Account'}
    </Button>
  );
}
