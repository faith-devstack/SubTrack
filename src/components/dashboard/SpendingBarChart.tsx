import React from 'react';
import { Subscription } from '../../types/subscription';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/calculations';
import { BarChart3 } from 'lucide-react';
import { CATEGORY_COLORS } from './CategoryChart';

interface SpendingBarChartProps {
  subscriptions: Subscription[];
}

export default function SpendingBarChart({ subscriptions }: SpendingBarChartProps) {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  
  if (activeSubs.length === 0) {
    return (
      <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full min-h-[380px] flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-12 h-12 bg-background-secondary rounded-2xl border border-border-card flex items-center justify-center mb-3 text-text-muted">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1">No Active Subscriptions</h3>
        <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
          Add some active subscriptions to see your side-by-side cost breakdown.
        </p>
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

  const totalMonthly = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

  const data = Object.entries(categoryData)
    .map(([name, value]) => ({ 
      name, 
      value,
      percentage: totalMonthly > 0 ? Math.round((value / totalMonthly) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value); // Sort highest first

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-[#16181D] border border-border-card/90 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="w-2.5 h-2.5 rounded-full shrink-0" 
              style={{ backgroundColor: item.payload.fill || item.color }} 
            />
            <p className="font-bold text-xs text-white capitalize">{item.payload.name}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-accent-primary-from font-bold text-sm tabular-nums">
              {formatCurrency(item.value)}
              <span className="text-[11px] text-text-muted font-normal ml-1">/mo</span>
            </p>
            <span className="text-xs text-text-secondary font-medium">
              ({item.payload.percentage}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full min-h-[380px] flex flex-col justify-between shadow-xs">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Spending Breakdown</h3>
          <p className="text-xs text-text-muted mt-0.5">Category comparison per month</p>
        </div>
        <span className="text-xs font-semibold text-text-muted bg-background-secondary px-2.5 py-1 rounded-full border border-border-card">
          Monthly Commitments
        </span>
      </div>

      {/* Bar Chart Canvas */}
      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A3A3A3', fontSize: 11 }} 
              dy={10}
              tickFormatter={(val: string) => {
                const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
                return capitalized.length > 12 ? `${capitalized.substring(0, 10)}...` : capitalized;
              }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#737373', fontSize: 11 }}
              tickFormatter={(value) => `$${Math.round(value)}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.03 }} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={48}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
