export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  bankName: string;
  lastFour: string;
  plaidAccountId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  currency: string;
  type: 'debit' | 'credit';
  category: string;
  description: string;
  merchantName?: string;
  date: string;
  pending: boolean;
  plaidTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transfer {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  createdAt: string;
  completedAt?: string;
}

export interface PlaidLinkToken {
  link_token: string;
  expiration: string;
}

export interface PlaidItem {
  id: string;
  userId: string;
  plaidItemId: string;
  accessToken: string;
  institutionName: string;
  institutionId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalBalance: number;
  totalAccounts: number;
  totalTransactions: number;
  monthlySpending: number;
  monthlyIncome: number;
  accountBreakdown: AccountBreakdown[];
}

export interface AccountBreakdown {
  accountId: string;
  accountName: string;
  balance: number;
  percentage: number;
  color: string;
}

export interface TransactionFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
  accounts?: string[];
  types?: ('debit' | 'credit')[];
  search?: string;
}
