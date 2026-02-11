'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PlaidLink from '@/components/PlaidLink';
import { Account } from '@/types';
import { formatCurrency } from '@/lib/utils/currency';
import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/outline';

// Mock data - in production, this would come from Appwrite
const mockAccounts: Account[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Checking Account',
    type: 'checking',
    balance: 15420.50,
    currency: 'USD',
    bankName: 'Chase Bank',
    lastFour: '1234',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18',
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Savings Account',
    type: 'savings',
    balance: 45680.25,
    currency: 'USD',
    bankName: 'Chase Bank',
    lastFour: '5678',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18',
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAccounts(mockAccounts);
      } catch (error) {
        console.error('Error loading accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const handleBankConnected = () => {
    setShowConnectModal(false);
    // In a real app, you would:
    // 1. Fetch the newly connected accounts from Plaid
    // 2. Store them in your database
    // 3. Refresh the accounts list
    alert('Bank account connected successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank Accounts</h1>
          <p className="text-gray-600">Manage your connected bank accounts</p>
        </div>
        <Button 
          onClick={() => setShowConnectModal(true)}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Connect Account
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Balance</p>
              <p className="text-3xl font-bold">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <BanknotesIcon className="h-12 w-12 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{account.name}</CardTitle>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  account.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {account.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <CardDescription>
                {account.bankName} • •••{account.lastFour}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-medium capitalize">{account.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Currency</span>
                  <span className="font-medium">{account.currency}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Connect Bank Account</CardTitle>
              <CardDescription>
                Connect your bank account using Plaid to automatically sync transactions and balances.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔐 Secure Connection</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Bank-level encryption</li>
                  <li>• Read-only access</li>
                  <li>•随时可以断开连接</li>
                  <li>• FDIC insured banks</li>
                </ul>
              </div>
              
              <PlaidLink 
                onSuccess={handleBankConnected}
                onExit={() => setShowConnectModal(false)}
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {accounts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BanknotesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Bank Accounts Connected
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your bank accounts to start tracking your finances automatically.
            </p>
            <Button onClick={() => setShowConnectModal(true)}>
              Connect Your First Account
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
