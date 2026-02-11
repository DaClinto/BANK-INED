import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        <div className="relative z-10">
          {children}
        </div>
        {/* Subtle Background Glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </main>
    </div>
  );
}
