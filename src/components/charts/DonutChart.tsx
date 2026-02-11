'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AccountBreakdown } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: AccountBreakdown[];
}

export default function DonutChart({ data }: DonutChartProps) {
  const chartData = {
    labels: data.map(item => item.accountName),
    datasets: [
      {
        data: data.map(item => item.balance),
        backgroundColor: data.map(item => item.color),
        borderColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 4,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(context.raw);
            const percentage = data[context.dataIndex].percentage.toFixed(1);
            return ` ${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '75%',
  };

  return (
    <div className="w-full h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
