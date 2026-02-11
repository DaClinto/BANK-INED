'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Transaction, TransactionFilters } from '@/types';
import { formatCurrency } from '@/lib/utils/currency';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'user1',
    accountId: '1',
    amount: -125.50,
    currency: 'USD',
    type: 'debit',
    category: 'Food & Dining',
    description: 'Whole Foods Market',
    merchantName: 'Whole Foods',
    date: '2024-01-18',
    pending: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
  {
    id: '2',
    userId: 'user1',
    accountId: '1',
    amount: 2500.00,
    currency: 'USD',
    type: 'credit',
    category: 'Income',
    description: 'Monthly Salary',
    date: '2024-01-15',
    pending: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    userId: 'user1',
    accountId: '2',
    amount: -45.99,
    currency: 'USD',
    type: 'debit',
    category: 'Shopping',
    description: 'Amazon Purchase',
    merchantName: 'Amazon',
    date: '2024-01-14',
    pending: false,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
  },
  {
    id: '4',
    userId: 'user1',
    accountId: '1',
    amount: -89.00,
    currency: 'USD',
    type: 'debit',
    category: 'Utilities',
    description: 'Electric Bill',
    date: '2024-01-10',
    pending: false,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '5',
    userId: 'user1',
    accountId: '1',
    amount: -35.50,
    currency: 'USD',
    type: 'debit',
    category: 'Entertainment',
    description: 'Netflix Subscription',
    merchantName: 'Netflix',
    date: '2024-01-05',
    pending: false,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTransactions(mockTransactions);
        setFilteredTransactions(mockTransactions);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.types!.includes(transaction.type)
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.categories!.includes(transaction.category)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filters]);

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">View and manage your transaction history</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
          <CardDescription>
            Find specific transactions using filters and search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters({
                    types: filters.types?.includes('credit') 
                      ? filters.types.filter(t => t !== 'credit')
                      : [...(filters.types || []), 'credit']
                  });
                }}
                className={filters.types?.includes('credit') ? 'bg-green-50 border-green-200' : ''}
              >
                Credit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters({
                    types: filters.types?.includes('debit') 
                      ? filters.types.filter(t => t !== 'debit')
                      : [...(filters.types || []), 'debit']
                  });
                }}
                className={filters.types?.includes('debit') ? 'bg-red-50 border-red-200' : ''}
              >
                Debit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category}
                      {transaction.merchantName && ` • ${transaction.merchantName}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}
                    {formatCurrency(transaction.amount)}
                  </p>
                  {transaction.pending && (
                    <p className="text-xs text-yellow-600">Pending</p>
                  )}
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
