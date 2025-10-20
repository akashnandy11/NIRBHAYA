import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

type TransactionStatus = 'safe' | 'flagged' | 'blocked' | 'pending';
type TransactionType = 'income' | 'expense' | 'transfer';

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  merchant: string;
  category: string;
  status: TransactionStatus;
  timestamp: string;
  aiInsight?: string;
  riskScore?: number;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: -89.99,
    description: 'Online Purchase',
    merchant: 'Amazon',
    category: 'Shopping',
    status: 'safe',
    timestamp: '2 minutes ago',
    aiInsight: 'Regular spending pattern detected',
    riskScore: 0.1
  },
  {
    id: '2',
    type: 'expense',
    amount: -1250.00,
    description: 'Unusual large purchase',
    merchant: 'Electronics Store',
    category: 'Electronics',
    status: 'flagged',
    timestamp: '1 hour ago',
    aiInsight: 'Transaction amount exceeds your typical spending by 400%',
    riskScore: 0.7
  },
  {
    id: '3',
    type: 'income',
    amount: 3200.00,
    description: 'Salary Deposit',
    merchant: 'Tech Corp',
    category: 'Salary',
    status: 'safe',
    timestamp: '2 hours ago',
    aiInsight: 'Regular monthly salary confirmed',
    riskScore: 0.0
  },
  {
    id: '4',
    type: 'expense',
    amount: -45.50,
    description: 'Coffee & Lunch',
    merchant: 'Local Cafe',
    category: 'Food',
    status: 'safe',
    timestamp: '4 hours ago',
    aiInsight: 'Consistent with your dining habits',
    riskScore: 0.1
  },
  {
    id: '5',
    type: 'transfer',
    amount: -500.00,
    description: 'Suspicious transfer attempt',
    merchant: 'Unknown Account',
    category: 'Transfer',
    status: 'blocked',
    timestamp: '6 hours ago',
    aiInsight: 'Blocked: Transfer to unverified account flagged as high risk',
    riskScore: 0.9
  },
  {
    id: '6',
    type: 'expense',
    amount: -29.99,
    description: 'Netflix Subscription',
    merchant: 'Netflix',
    category: 'Entertainment',
    status: 'safe',
    timestamp: '1 day ago',
    aiInsight: 'Recurring subscription payment',
    riskScore: 0.0
  },
];

const aiRecommendations = [
  {
    id: 1,
    type: 'security',
    title: 'Enable Biometric Authentication',
    description: 'Add fingerprint or face ID for enhanced security on large transactions',
    priority: 'high',
    icon: Shield
  },
  {
    id: 2,
    type: 'spending',
    title: 'Review Electronics Budget',
    description: 'Your electronics spending is 200% above average this month',
    priority: 'medium',
    icon: AlertTriangle
  },
  {
    id: 3,
    type: 'optimization',
    title: 'Cashback Opportunity',
    description: 'Switch to Platinum card for 3% cashback on recent purchases',
    priority: 'low',
    icon: CheckCircle
  },
];

export function TransactionFeed() {
  const [filter, setFilter] = useState<TransactionStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.status === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'safe': return 'text-success';
      case 'flagged': return 'text-warning';
      case 'blocked': return 'text-destructive';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: TransactionStatus) => {
    switch (status) {
      case 'safe': return 'bg-success/10 border-success/20';
      case 'flagged': return 'bg-warning/10 border-warning/20';
      case 'blocked': return 'bg-destructive/10 border-destructive/20';
      case 'pending': return 'bg-muted/10 border-muted/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 0.3) return 'text-success';
    if (riskScore <= 0.6) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <div className="finguard-card-glow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          AI Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="finguard-metric-card">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  rec.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                  rec.priority === 'medium' ? 'bg-warning/10 text-warning' :
                  'bg-success/10 text-success'
                }`}>
                  <rec.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">{rec.title}</div>
                  <div className="text-xs text-muted-foreground">{rec.description}</div>
                  <div className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                    rec.priority === 'medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {rec.priority} priority
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Controls */}
      <div className="finguard-card">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Recent Transactions
          </h3>
          
          <div className="flex gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as TransactionStatus | 'all')}
              className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="safe">Safe</option>
              <option value="flagged">Flagged</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedTransaction === transaction.id ? 'finguard-card-glow' : 'bg-card border-border'
              } ${getStatusBg(transaction.status)}`}
              onClick={() => setSelectedTransaction(
                selectedTransaction === transaction.id ? null : transaction.id
              )}
            >
              <div className="flex items-center gap-4">
                {/* Transaction Icon */}
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' ? 'bg-success/20 text-success' :
                  transaction.type === 'expense' ? 'bg-destructive/20 text-destructive' :
                  'bg-primary/20 text-primary'
                }`}>
                  {transaction.type === 'income' ? 
                    <ArrowDownLeft className="w-5 h-5" /> :
                    <ArrowUpRight className="w-5 h-5" />
                  }
                </div>

                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold">{transaction.description}</div>
                    <div className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      <span>{transaction.merchant}</span>
                      <span className="mx-2">•</span>
                      <span>{transaction.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{transaction.timestamp}</span>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${
                        getStatusBg(transaction.status)
                      } ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Score */}
                {transaction.riskScore !== undefined && (
                  <div className="text-center">
                    <div className={`text-sm font-medium ${getRiskColor(transaction.riskScore)}`}>
                      {Math.round(transaction.riskScore * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Risk</div>
                  </div>
                )}
              </div>

              {/* AI Insight (expanded view) */}
              {selectedTransaction === transaction.id && transaction.aiInsight && (
                <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-primary mb-1">AI Insight</div>
                      <div className="text-sm text-muted-foreground">{transaction.aiInsight}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <div>No transactions found matching your criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}