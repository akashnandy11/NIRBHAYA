import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Bitcoin, 
  Home, 
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

const assetData = [
  { name: 'Stocks', value: 65000, percentage: 51, color: '#0EA5E9' },
  { name: 'Crypto', value: 35000, percentage: 27, color: '#10B981' },
  { name: 'Real Estate', value: 25000, percentage: 20, color: '#F59E0B' },
  { name: 'Cash', value: 2543, percentage: 2, color: '#8B5CF6' },
];

const trendData = [
  { name: 'Jan', value: 95000 },
  { name: 'Feb', value: 102000 },
  { name: 'Mar', value: 98000 },
  { name: 'Apr', value: 115000 },
  { name: 'May', value: 120000 },
  { name: 'Jun', value: 127543 },
];

export function SuperWallet() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const totalValue = assetData.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="space-y-6">
      {/* Smart Coin Overview */}
      <div className="finguard-card-glow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Smart Coin Balance</h3>
              <p className="text-muted-foreground text-sm">All assets unified</p>
            </div>
          </div>
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {balanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Balance */}
          <div>
            <div className="text-4xl font-bold finguard-gradient-text mb-2">
              {balanceVisible ? `$${totalValue.toLocaleString()}` : '••••••'}
            </div>
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+12.5% this month</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              +$14,543 since last month
            </div>
          </div>

          {/* Asset Breakdown Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  onMouseEnter={(_, index) => setSelectedAsset(assetData[index].name)}
                  onMouseLeave={() => setSelectedAsset(null)}
                >
                  {assetData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={selectedAsset === entry.name ? '#fff' : 'none'}
                      strokeWidth={selectedAsset === entry.name ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  labelStyle={{ color: '#000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetData.map((asset, index) => {
          const icons = [BarChart3, Bitcoin, Home, DollarSign];
          const Icon = icons[index];
          
          return (
            <div
              key={asset.name}
              className={`finguard-metric-card cursor-pointer ${
                selectedAsset === asset.name ? 'finguard-card-glow' : ''
              }`}
              onMouseEnter={() => setSelectedAsset(asset.name)}
              onMouseLeave={() => setSelectedAsset(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" style={{ color: asset.color }} />
                <span className="text-sm font-medium">{asset.percentage}%</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                ${asset.value.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{asset.name}</div>
              <div className="finguard-progress-bar mt-3">
                <div 
                  className="finguard-progress-fill"
                  style={{ 
                    width: `${asset.percentage}%`,
                    background: `linear-gradient(90deg, ${asset.color}, ${asset.color}aa)`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Growth Trend */}
      <div className="finguard-card">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-success" />
          <h3 className="text-lg font-semibold">Portfolio Growth</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis 
                stroke="#64748b"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                labelStyle={{ color: '#000' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#gradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}