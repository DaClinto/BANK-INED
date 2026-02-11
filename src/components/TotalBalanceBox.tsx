'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils/currency';

interface TotalBalanceBoxProps {
  accounts?: any[];
  totalBanks?: number;
  totalCurrentBalance?: number;
}

const TotalBalanceBox: React.FC<TotalBalanceBoxProps> = ({
  accounts = [],
  totalBanks = 0,
  totalCurrentBalance = 0,
}) => {
  const [animatedBalance, setAnimatedBalance] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second animation
    const steps = 60;
    const increment = totalCurrentBalance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalCurrentBalance) {
        setAnimatedBalance(totalCurrentBalance);
        clearInterval(timer);
      } else {
        setAnimatedBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalCurrentBalance]);

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        {/* Chart will be added here */}
      </div>
      
      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Bank Accounts: {totalBanks}
        </h2>
        
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Total Current Balance
          </p>
          
          <div className="total-balance-amount flex-center gap-2">
            <CountBox 
              amount={animatedBalance} 
              containerStyles="total-balance-amount"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface CountBoxProps {
  amount: number;
  containerStyles?: string;
}

const CountBox: React.FC<CountBoxProps> = ({ amount, containerStyles }) => {
  return (
    <div className={`flex items-center ${containerStyles}`}>
      <h2 className="text-2xl font-bold text-gray-900">
        {formatCurrency(amount)}
      </h2>
    </div>
  );
};

export { CountBox };
export default TotalBalanceBox;
