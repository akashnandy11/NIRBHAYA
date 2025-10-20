import { 
  Shield, 
  Award, 
  Target, 
  Zap, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

const trustScoreData = {
  current: 847,
  max: 1000,
  level: 'Guardian Elite',
  nextLevel: 'Crypto Master',
  pointsToNext: 153,
  streak: 12,
};

const badges = [
  { 
    id: 1, 
    name: 'Security Champion', 
    icon: Shield, 
    earned: true, 
    description: '2FA enabled, strong passwords',
    points: 150,
    color: '#0EA5E9'
  },
  { 
    id: 2, 
    name: 'Smart Investor', 
    icon: TrendingUp, 
    earned: true, 
    description: 'Diversified portfolio, low risk',
    points: 200,
    color: '#10B981'
  },
  { 
    id: 3, 
    name: 'Fraud Fighter', 
    icon: Target, 
    earned: true, 
    description: 'Completed fraud simulation',
    points: 100,
    color: '#F59E0B'
  },
  { 
    id: 4, 
    name: 'Streak Master', 
    icon: Zap, 
    earned: true, 
    description: '12-day safe behavior streak',
    points: 75,
    color: '#8B5CF6'
  },
  { 
    id: 5, 
    name: 'Privacy Guardian', 
    icon: Lock, 
    earned: false, 
    description: 'Enable advanced privacy settings',
    points: 125,
    color: '#64748b'
  },
  { 
    id: 6, 
    name: 'Crypto Expert', 
    icon: Award, 
    earned: false, 
    description: 'Complete advanced crypto course',
    points: 300,
    color: '#64748b'
  },
];

const recentAchievements = [
  { 
    title: 'Streak Extended', 
    description: 'Maintained safe behavior for 12 days', 
    points: 25,
    time: '2 hrs ago',
    icon: Zap,
    color: '#8B5CF6'
  },
  { 
    title: 'Transaction Verified', 
    description: 'Successfully verified suspicious transaction', 
    points: 50,
    time: '1 day ago',
    icon: CheckCircle,
    color: '#10B981'
  },
  { 
    title: 'Security Update', 
    description: 'Updated password strength', 
    points: 30,
    time: '3 days ago',
    icon: Shield,
    color: '#0EA5E9'
  },
];

export function TrustScore() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  
  const progressPercentage = (trustScoreData.current / trustScoreData.max) * 100;
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      {/* Trust Score Overview */}
      <div className="finguard-card-glow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Score Display */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Trust Score</h3>
                <p className="text-muted-foreground text-sm">Your financial security rating</p>
              </div>
            </div>

            <div className="text-6xl font-bold finguard-gradient-text mb-2">
              {trustScoreData.current}
            </div>
            <div className="text-lg text-muted-foreground mb-4">
              / {trustScoreData.max}
            </div>

            <div className="finguard-badge text-lg px-4 py-2 mb-4">
              {trustScoreData.level}
            </div>

            <div className="text-sm text-muted-foreground">
              {trustScoreData.pointsToNext} points to {trustScoreData.nextLevel}
            </div>
          </div>

          {/* Progress Circle */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercentage * 2.51327} 251.327`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                  <div className="text-xs text-muted-foreground">Trust Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-warning" />
            <div>
              <div className="font-semibold">Safe Behavior Streak</div>
              <div className="text-sm text-muted-foreground">
                {trustScoreData.streak} days of secure financial activities
              </div>
            </div>
            <div className="ml-auto text-2xl font-bold text-warning">
              {trustScoreData.streak}
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="finguard-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-warning" />
          Earned Badges ({earnedBadges.length})
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`finguard-metric-card cursor-pointer ${
                selectedBadge === badge.id ? 'finguard-card-glow' : ''
              }`}
              onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
            >
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                >
                  <badge.icon className="w-6 h-6" />
                </div>
                <div className="font-medium text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{badge.description}</div>
                <div className="finguard-badge text-xs">+{badge.points} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Badges & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Badges */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-muted-foreground" />
            Available Badges ({availableBadges.length})
          </h3>
          
          <div className="space-y-3">
            {availableBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                >
                  <badge.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">+{badge.points} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Recent Achievements
          </h3>
          
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${achievement.color}20`, color: achievement.color }}
                >
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-success">+{achievement.points} pts</div>
                  <div className="text-xs text-muted-foreground">{achievement.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}