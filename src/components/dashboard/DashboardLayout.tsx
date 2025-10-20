import { useState } from "react";
import { 
  Wallet, 
  Shield, 
  Activity, 
  GamepadIcon, 
  Menu,
  TrendingUp,
  Award,
  AlertTriangle
} from "lucide-react";
import { SuperWallet } from "./SuperWallet";
import { TrustScore } from "./TrustScore";
import { TransactionFeed } from "./TransactionFeed";
import { FraudGameProgress } from "./FraudGameProgress";

type TabType = 'wallet' | 'trust' | 'transactions' | 'game';

const tabs = [
  { id: 'wallet' as TabType, label: 'Super-Wallet', icon: Wallet },
  { id: 'trust' as TabType, label: 'Trust Score', icon: Shield },
  { id: 'transactions' as TabType, label: 'Transactions', icon: Activity },
  { id: 'game' as TabType, label: 'Fraud Game', icon: GamepadIcon },
];

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('wallet');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'wallet':
        return <SuperWallet />;
      case 'trust':
        return <TrustScore />;
      case 'transactions':
        return <TransactionFeed />;
      case 'game':
        return <FraudGameProgress />;
      default:
        return <SuperWallet />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold finguard-gradient-text">FinGuard AI</h1>
              <p className="text-xs text-muted-foreground">Your Financial Guardian</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="finguard-card mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Assets</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl font-bold finguard-gradient-text">$127,543</div>
            <div className="text-xs text-success">+12.5% this month</div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`
                  finguard-nav-item w-full text-left
                  ${activeTab === tab.id ? 'active' : ''}
                `}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Trust Score Badge */}
          <div className="mt-8 finguard-card-glow">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-warning" />
              <div>
                <div className="text-sm font-medium">Trust Level</div>
                <div className="text-xs text-muted-foreground">Guardian Elite</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <p className="text-muted-foreground">
            Monitor your financial security and growth
          </p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}