import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShieldCheck,
  BarChart3,
  Globe,
  ArrowRight,
  Infinity as InfinityIcon,
  ChevronRight,
  Shield,
  Zap,
  CreditCard
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-mesh text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <InfinityIcon className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tighter">HORIZON</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Business</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/80 text-white px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <Shield className="h-3 w-3" />
              <span>Next-Generation Banking Security</span>
            </div>

            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Banking Built for the <span className="text-gradient">Modern Era</span>
            </h1>

            <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              Experience secure and professional banking with our comprehensive digital platform.
              Manage your accounts, track transactions, and scale your finances with absolute confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/80 shadow-2xl shadow-primary/30">
                  Open New Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 hover:bg-white/5 bg-white/5 backdrop-blur-sm">
                  Sign In to Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-white/5 card-hover-effect">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold">Secure Banking</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Enterprise-level security with multi-factor authentication, end-to-end encryption, and 24/7 fraud monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 card-hover-effect">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-bold">Multi-Bank Support</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Seamlessly connect and manage all your external bank accounts in one unified dashboard with Plaid integration.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 card-hover-effect">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-xl font-bold">Real-Time Analytics</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Gain deep insights into your financial health with real-time spending tracking, balance monitoring, and AI insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-50">
              <InfinityIcon className="h-5 w-5" />
              <span className="text-lg font-black tracking-tighter">HORIZON</span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <p className="text-sm text-zinc-600">
              &copy; 2026 Horizon Digital Banking Corp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
