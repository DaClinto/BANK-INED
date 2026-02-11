'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Account, Transaction } from '@/types';

const transactionSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().min(2, 'Description must be at least 2 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  type: z.enum(['debit', 'credit']),
  accountId: z.string().min(1, 'Please select an account'),
  date: z.string().min(1, 'Please select a date'),
  currency: z.string().min(1, 'Currency is required'),
});

type TransactionValues = z.infer<typeof transactionSchema>;

interface ManualTransactionFormProps {
  accounts: Account[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'pending'>) => void;
  onClose: () => void;
}

export const ManualTransactionForm: React.FC<ManualTransactionFormProps> = ({
  accounts,
  onAddTransaction,
  onClose,
}) => {
  const form = useForm<TransactionValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      description: '',
      category: '',
      type: 'debit',
      accountId: accounts[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      currency: 'USD',
    },
  });

  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    onAddTransaction(values);
    form.reset();
    onClose();
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10">
      <h3 className="text-xl font-bold mb-6 text-gradient">Add Manual Transaction</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className="bg-white/5 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="debit" className="text-red-400">Expense (Debit)</SelectItem>
                      <SelectItem value="credit" className="text-green-400">Income (Credit)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Grocery shopping" {...field} className="bg-white/5 border-white/10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Food" {...field} className="bg-white/5 border-white/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-white/5 border-white/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} ({account.bankName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/80 text-white">
              Add Transaction
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-white/10 hover:bg-white/5 text-white">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const accountSchema = z.object({
  name: z.string().min(2, 'Account name must be at least 2 characters'),
  bankName: z.string().min(2, 'Bank name must be at least 2 characters'),
  type: z.enum(['checking', 'savings', 'credit', 'investment']),
  balance: z.number(),
  currency: z.string().min(1, 'Currency is required'),
  lastFour: z.string().length(4, 'Last 4 digits required'),
});

type AccountValues = z.infer<typeof accountSchema>;

interface AddAccountFormProps {
  onAddAccount: (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isActive'>) => void;
  onClose: () => void;
}

export const AddAccountForm: React.FC<AddAccountFormProps> = ({
  onAddAccount,
  onClose,
}) => {
  const form = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      bankName: '',
      type: 'checking',
      balance: 0,
      currency: 'USD',
      lastFour: '',
    },
  });

  const onSubmit = (values: z.infer<typeof accountSchema>) => {
    onAddAccount(values);
    form.reset();
    onClose();
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10">
      <h3 className="text-xl font-bold mb-6 text-gradient">Add Manual Account</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. My Personal Spending" {...field} className="bg-white/5 border-white/10 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Chase" {...field} className="bg-white/5 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastFour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last 4 Digits</FormLabel>
                  <FormControl>
                    <Input placeholder="1234" maxLength={4} {...field} className="bg-white/5 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/80 text-white">
              Create Account
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-white/10 hover:bg-white/5 text-white">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
