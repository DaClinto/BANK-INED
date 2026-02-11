'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Account, Transfer } from '@/types';
import { formatCurrency, parseCurrency } from '@/lib/utils/currency';

// Mock data
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

const mockTransfers: Transfer[] = [
  {
    id: '1',
    fromUserId: 'user1',
    toUserId: 'user2',
    fromAccountId: '1',
    toAccountId: '2',
    amount: 500.00,
    currency: 'USD',
    status: 'completed',
    description: 'Monthly savings transfer',
    createdAt: '2024-01-15',
    completedAt: '2024-01-15',
  },
  {
    id: '2',
    fromUserId: 'user1',
    toUserId: 'user3',
    fromAccountId: '1',
    toAccountId: '3',
    amount: 250.00,
    currency: 'USD',
    status: 'pending',
    description: 'Birthday gift',
    createdAt: '2024-01-18',
  },
];

export default function TransfersPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAccounts(mockAccounts);
        setTransfers(mockTransfers);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount) {
      alert('Please fill in all required fields');
      return;
    }

    if (fromAccount === toAccount) {
      alert('Cannot transfer to the same account');
      return;
    }

    const transferAmount = parseCurrency(amount);
    const fromAcc = accounts.find(a => a.id === fromAccount);
    
    if (fromAcc && transferAmount > fromAcc.balance) {
      alert('Insufficient funds');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual transfer logic with Appwrite
      const newTransfer: Transfer = {
        id: Date.now().toString(),
        fromUserId: 'user1',
        toUserId: recipientEmail || 'user2',
        fromAccountId: fromAccount,
        toAccountId: toAccount,
        amount: transferAmount,
        currency: 'USD',
        status: 'pending',
        description: description || 'Transfer',
        createdAt: new Date().toISOString(),
      };

      setTransfers(prev => [newTransfer, ...prev]);
      
      // Reset form
      setAmount('');
      setDescription('');
      setRecipientEmail('');
      
      alert('Transfer initiated successfully!');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Money Transfers</h1>
        <p className="text-gray-600">Send money between your accounts or to other users</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>
              Send money to another account or user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  From Account
                </label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({formatCurrency(account.balance)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  To Account
                </label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select account</option>
                  {accounts
                    .filter(account => account.id !== fromAccount)
                    .map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} ({formatCurrency(account.balance)})
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Recipient Email (for external transfers)
                </label>
                <Input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description (optional)
                </label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this transfer for?"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Send Transfer'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>
              Your transfer history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transfer.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      From Account {transfer.fromAccountId} → To Account {transfer.toAccountId}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(transfer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      -{formatCurrency(transfer.amount)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transfer.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transfer.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {transfers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transfers yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
