'use client';

import React, { useState, useEffect } from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import DonutChart from '@/components/charts/DonutChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/currency';
import { Account, Transaction, DashboardStats } from '@/types';
import { ManualTransactionForm, AddAccountForm } from '@/components/forms/FinanceEntryForm';
import { PlusCircle, Wallet, ArrowUpCircle, ArrowDownCircle, History, LayoutDashboard } from 'lucide-react';

// Mock data - in production, this would come from Appwrite
const initialAccounts: Account[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Primary Spending',
    type: 'checking',
    balance: 15420.50,
    currency: 'USD',
    bankName: 'Horizon Bank',
    lastFour: '1234',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18',
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Retirement Savings',
    type: 'savings',
    balance: 45680.25,
    currency: 'USD',
    bankName: 'Horizon Bank',
    lastFour: '5678',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18',
  },
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'user1',
    accountId: '1',
    amount: -125.50,
    currency: 'USD',
    type: 'debit',
    category: 'Food & Dining',
    description: 'Starbucks Coffee',
    merchantName: 'Starbucks',
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
    description: 'Salary Deposit',
    date: '2024-01-15',
    pending: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    userId: 'user1',
    accountId: '1',
    amount: -45.00,
    currency: 'USD',
    type: 'debit',
    category: 'Entertainment',
    description: 'Netflix Subscription',
    merchantName: 'Netflix',
    date: '2024-01-14',
    pending: false,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
  },
];

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    monthlySpending: 0,
    monthlyIncome: 0,
    accountBreakdown: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);

  useEffect(() => {
    const calculateStats = () => {
      const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
      const monthlySpending = transactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const monthlyIncome = transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalBalance,
        totalAccounts: accounts.length,
        totalTransactions: transactions.length,
        monthlySpending,
        monthlyIncome,
        accountBreakdown: accounts.map((account, index) => ({
          accountId: account.id,
          accountName: account.name,
          balance: account.balance,
          percentage: (account.balance / totalBalance) * 100,
          color: index % 5 === 0 ? '#8b5cf6' : index % 5 === 1 ? '#10b981' : index % 5 === 2 ? '#f59e0b' : index % 5 === 3 ? '#ec4899' : '#3b82f6',
        })),
      });
    };

    calculateStats();
    setIsLoading(false);
  }, [accounts, transactions]);

  const handleAddTransaction = (newTx: any) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1',
      pending: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions([transaction, ...transactions]);

    // Update account balance
    setAccounts(accounts.map(acc => {
      if (acc.id === transaction.accountId) {
        return {
          ...acc,
          balance: acc.balance + (transaction.type === 'credit' ? transaction.amount : -transaction.amount)
        };
      }
      return acc;
    }));
  };

  const handleAddAccount = (newAcc: any) => {
    const account: Account = {
      ...newAcc,
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAccounts([...accounts, account]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-mesh">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mesh p-8 text-white">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <HeaderBox
            type="greeting"
            title="Overview,"
            user="John"
            subtext="Welcome back! Here's what's happening with your finances today."
          />
          <div className="flex gap-4">
            <Button
              onClick={() => setShowAccountForm(true)}
              className="glass-card hover:bg-white/10 text-white border-white/10 px-6"
            >
              <Wallet className="mr-2 h-4 w-4" /> Add Account
            </Button>
            <Button
              onClick={() => setShowTransactionForm(true)}
              className="bg-primary hover:bg-primary/80 text-white px-6 shadow-lg shadow-primary/20"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </div>
        </div>

        {/* Modal-like Overlay for Forms */}
        {(showTransactionForm || showAccountForm) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
              {showTransactionForm ? (
                <ManualTransactionForm
                  accounts={accounts}
                  onAddTransaction={handleAddTransaction}
                  onClose={() => setShowTransactionForm(false)}
                />
              ) : (
                <AddAccountForm
                  onAddAccount={handleAddAccount}
                  onClose={() => setShowAccountForm(false)}
                />
              )}
            </div>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Financial Cards */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/5 overflow-hidden card-hover-effect">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-zinc-400 text-sm font-medium">Monthly Income</span>
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(stats.monthlyIncome)}
                  </div>
                  <div className="flex items-center text-xs text-emerald-500 font-medium">
                    <span>+12.5% vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5 overflow-hidden card-hover-effect">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-zinc-400 text-sm font-medium">Monthly Spending</span>
                  <div className="h-8 w-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <ArrowDownCircle className="h-4 w-4 text-rose-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(stats.monthlySpending)}
                  </div>
                  <div className="flex items-center text-xs text-rose-500 font-medium">
                    <span>+5.2% vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5 overflow-hidden card-hover-effect">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-zinc-400 text-sm font-medium">Net Savings</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <LayoutDashboard className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(stats.monthlyIncome - stats.monthlySpending)}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 font-medium">
                    <span>Current Month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-card border-white/5 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <CardTitle className="text-xl font-bold text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-zinc-400">Your latest financial movements</CardDescription>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                  <History className="mr-2 h-4 w-4" /> View History
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="group flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-white/5">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-inner ${transaction.type === 'credit'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                            }`}>
                            {transaction.type === 'credit' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className={`text-right font-bold ${transaction.type === 'credit' ? 'text-emerald-500' : 'text-zinc-200'
                          }`}>
                          {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-zinc-500">
                      No transactions recorded yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Breakdown & Accounts */}
          <div className="lg:col-span-4 space-y-8">
            {/* Total Balance & Chart */}
            <Card className="glass-card border-white/5 overflow-hidden border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Total Combined Balance</CardTitle>
                <div className="text-4xl font-extrabold text-white">
                  {formatCurrency(stats.totalBalance)}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-full h-[240px] flex items-center justify-center relative">
                  <DonutChart data={stats.accountBreakdown} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-sm text-zinc-500">Accounts</span>
                    <span className="text-lg font-bold">{accounts.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account List */}
            <Card className="glass-card border-white/5 overflow-hidden">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-lg font-bold text-white">Your Accounts</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {accounts.map((account, index) => (
                    <div key={account.id} className="relative group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all card-hover-effect">
                      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stats.accountBreakdown[index]?.color }} />
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-zinc-500 font-medium uppercase tracking-tight">{account.bankName}</p>
                          <h4 className="text-sm font-bold text-white">{account.name}</h4>
                        </div>
                        <span className="text-xs text-zinc-400 font-mono">•••• {account.lastFour}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-lg font-bold text-white">{formatCurrency(account.balance)}</div>
                        <div className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-zinc-400 uppercase tracking-widest">{account.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
