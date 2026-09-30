import React from 'react';
import { Subscription } from '../../types/subscription';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/calculations';
import { PieChart as PieChartIcon } from 'lucide-react';

interface CategoryChartProps {
  subscriptions: Subscription[];
}

export const CATEGORY_COLORS = [
  '#00F5A0', // Mint Primary
  '#00D9CC', // Teal Secondary
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#6366F1'  // Indigo
];

export default function CategoryChart({ subscriptions }: CategoryChartProps) {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  
  if (activeSubs.length === 0) {
    return (
      <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full min-h-[380px] flex flex-col items-center justify-center text-center shadow-xs">
        <div className="w-12 h-12 bg-background-secondary rounded-2xl border border-border-card flex items-center justify-center mb-3 text-text-muted">
          <PieChartIcon className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1">No Active Subscriptions</h3>
        <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
          Add some active subscriptions to see your visual category distribution.
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
    .sort((a, b) => b.value - a.value);

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
            <p className="font-bold text-xs text-white capitalize">{item.name}</p>
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
          <h3 className="text-lg font-bold text-text-primary">Spending by Category</h3>
          <p className="text-xs text-text-muted mt-0.5">Distribution of recurring expenses</p>
        </div>
        <span className="text-xs font-semibold text-accent-primary-from bg-accent-secondary/30 px-2.5 py-1 rounded-full border border-accent-primary-from/20">
          {data.length} {data.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      {/* Doughnut Chart Canvas with Center Stat */}
      <div className="relative flex-1 w-full min-h-[260px] flex items-center justify-center">
        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-10">
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Total / Month</span>
          <span className="text-lg sm:text-xl font-bold text-white tabular-nums tracking-tight mt-0.5">
            {formatCurrency(totalMonthly)}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={64}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              stroke="#1E1E1E"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={40}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ 
                fontSize: '12px', 
                color: '#B3B3B3', 
                paddingTop: '16px' 
              }}
              formatter={(value, entry: any) => {
                const item = data.find(d => d.name === value);
                return (
                  <span className="text-xs text-text-secondary hover:text-white transition-colors capitalize ml-1 mr-3">
                    {value} {item ? `(${item.percentage}%)` : ''}
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
