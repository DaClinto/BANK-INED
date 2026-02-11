'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Banknote,
  UserCircle,
  LogOut,
  Infinity
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Accounts', href: '/accounts', icon: CreditCard },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Transfers', href: '/transfers', icon: Banknote },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-zinc-950 border-r border-white/5 min-h-screen p-6 flex flex-col gap-10">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Infinity className="text-white h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter">HORIZON</h1>
      </div>

      <div className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-95'
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto">
        <Card className="glass-card border-white/5 p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                John Doe
              </p>
              <p className="text-[10px] text-zinc-500 truncate uppercase tracking-widest font-medium">
                Premier Client
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="ghost" size="sm" className="w-full text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 justify-start px-2">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </nav>
  );
}
