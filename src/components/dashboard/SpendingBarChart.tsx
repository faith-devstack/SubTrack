import React from 'react';
import { Subscription } from '../../types/subscription';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/calculations';

interface SpendingBarChartProps {
  subscriptions: Subscription[];
}

export default function SpendingBarChart({ subscriptions }: SpendingBarChartProps) {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  
  if (activeSubs.length === 0) {
    return (
      <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full min-h-[300px] flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-medium text-text-primary mb-1">No Data</h3>
        <p className="text-sm text-text-secondary">Add some active subscriptions to see your spending breakdown.</p>
      </div>
    );
  }

  // Calculate monthly cost per category
  const categoryData = activeSubs.reduce((acc, sub) => {
    const monthlyCost = sub.billing_cycle === 'monthly' ? sub.cost : sub.cost / 12;
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + monthlyCost;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort by highest spend

  const COLORS = ['#00F5A0', '#1A3C34', '#00D9CC', '#4A90E2', '#9013FE', '#F5A623', '#D0021B'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background-card border border-border-card p-3 rounded-lg shadow-xl">
          <p className="font-medium text-text-primary mb-1">{payload[0].payload.name}</p>
          <p className="text-accent-primary-from font-bold">
            {formatCurrency(payload[0].value)} <span className="text-xs text-text-secondary font-normal">/mo</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-text-primary mb-2">Spending Breakdown</h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#B3B3B3', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#B3B3B3', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
