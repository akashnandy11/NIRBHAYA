import { 
  GamepadIcon, 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Award,
  PlayCircle,
  TrendingUp,
  Shield,
  Brain
} from 'lucide-react';
import { useState } from 'react';

const playerStats = {
  level: 12,
  currentXP: 2650,
  xpToNext: 3500,
  totalScore: 18450,
  gamesPlayed: 47,
  accuracy: 89,
  streak: 5,
  rank: 'Fraud Detective',
  nextRank: 'Security Expert'
};

const achievements = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Identify your first phishing attempt',
    icon: Target,
    earned: true,
    rarity: 'common',
    xp: 100
  },
  {
    id: 2,
    name: 'Sharp Eye',
    description: 'Achieve 90%+ accuracy in 5 consecutive games',
    icon: Star,
    earned: true,
    rarity: 'rare',
    xp: 300
  },
  {
    id: 3,
    name: 'Speed Demon',
    description: 'Complete a scenario in under 30 seconds',
    icon: Zap,
    earned: true,
    rarity: 'epic',
    xp: 500
  },
  {
    id: 4,
    name: 'Fraud Hunter',
    description: 'Detect 100 fraudulent activities',
    icon: Shield,
    earned: false,
    rarity: 'legendary',
    xp: 1000
  },
  {
    id: 5,
    name: 'Perfect Detective',
    description: 'Score 100% in 3 consecutive expert scenarios',
    icon: Brain,
    earned: false,
    rarity: 'legendary',
    xp: 1500
  }
];

const recentGames = [
  {
    id: 1,
    scenario: 'Phishing Email Detection',
    score: 950,
    accuracy: 95,
    time: '2:34',
    difficulty: 'Expert',
    xpGained: 150,
    completedAt: '2 hours ago'
  },
  {
    id: 2,
    scenario: 'Credit Card Fraud Simulation',
    score: 820,
    accuracy: 82,
    time: '3:12',
    difficulty: 'Advanced',
    xpGained: 120,
    completedAt: '1 day ago'
  },
  {
    id: 3,
    scenario: 'Social Engineering Attack',
    score: 1100,
    accuracy: 100,
    time: '1:58',
    difficulty: 'Expert',
    xpGained: 200,
    completedAt: '2 days ago'
  }
];

const upcomingChallenges = [
  {
    id: 1,
    name: 'Weekly Fraud Challenge',
    description: 'Test your skills against the latest fraud techniques',
    difficulty: 'Expert',
    reward: '500 XP + Rare Badge',
    timeLeft: '2 days',
    participants: 1247
  },
  {
    id: 2,
    name: 'Cryptocurrency Scam Workshop',
    description: 'Learn to identify crypto-related fraud schemes',
    difficulty: 'Advanced',
    reward: '300 XP',
    timeLeft: '5 days',
    participants: 892
  }
];

export function FraudGameProgress() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  
  const xpPercentage = (playerStats.currentXP / playerStats.xpToNext) * 100;
  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#64748b';
      case 'rare': return '#0EA5E9';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#64748b';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success';
      case 'Advanced': return 'text-warning';
      case 'Expert': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Level & Progress */}
      <div className="finguard-card-glow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Level Display */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fraud Simulation Progress</h3>
                <p className="text-muted-foreground text-sm">Level up your security skills</p>
              </div>
            </div>

            <div className="text-4xl font-bold finguard-gradient-text mb-2">
              Level {playerStats.level}
            </div>
            <div className="finguard-badge text-lg px-4 py-2 mb-4">
              {playerStats.rank}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>XP Progress</span>
                <span>{playerStats.currentXP} / {playerStats.xpToNext}</span>
              </div>
              <div className="finguard-progress-bar">
                <div 
                  className="finguard-progress-fill"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {playerStats.xpToNext - playerStats.currentXP} XP to {playerStats.nextRank}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{playerStats.totalScore.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success">{playerStats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="text-2xl font-bold text-warning">{playerStats.streak}</div>
              <div className="text-sm text-muted-foreground">Win Streak</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="text-2xl font-bold text-accent">{playerStats.gamesPlayed}</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earned Achievements */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            Achievements ({earnedAchievements.length})
          </h3>
          
          <div className="space-y-3">
            {earnedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAchievement === achievement.id ? 'finguard-card-glow' : 'bg-card border-border'
                }`}
                onClick={() => setSelectedAchievement(
                  selectedAchievement === achievement.id ? null : achievement.id
                )}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${getRarityColor(achievement.rarity)}20`, 
                      color: getRarityColor(achievement.rarity) 
                    }}
                  >
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium">+{achievement.xp} XP</div>
                    <div 
                      className="text-xs capitalize"
                      style={{ color: getRarityColor(achievement.rarity) }}
                    >
                      {achievement.rarity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-muted-foreground" />
            Locked Achievements ({lockedAchievements.length})
          </h3>
          
          <div className="space-y-3">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="p-3 bg-secondary/50 rounded-lg border border-border opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/20 text-muted-foreground">
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-muted-foreground">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">+{achievement.xp} XP</div>
                    <div 
                      className="text-xs capitalize"
                      style={{ color: getRarityColor(achievement.rarity) }}
                    >
                      {achievement.rarity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Games & Upcoming Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Games */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Recent Games
          </h3>
          
          <div className="space-y-3">
            {recentGames.map((game) => (
              <div key={game.id} className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{game.scenario}</div>
                  <div className="text-sm font-bold text-primary">+{game.xpGained} XP</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <div className="font-medium">Score: {game.score}</div>
                    <div className={getDifficultyColor(game.difficulty)}>{game.difficulty}</div>
                  </div>
                  <div>
                    <div className="font-medium">{game.accuracy}% Accuracy</div>
                    <div>Time: {game.time}</div>
                  </div>
                  <div className="text-right">
                    <div>{game.completedAt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Challenges */}
        <div className="finguard-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            Upcoming Challenges
          </h3>
          
          <div className="space-y-4">
            {upcomingChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm">{challenge.name}</div>
                    <div className="text-xs text-muted-foreground">{challenge.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-warning">{challenge.timeLeft}</div>
                    <div className="text-xs text-muted-foreground">{challenge.participants} players</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)} bg-current/10`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{challenge.reward}</span>
                  </div>
                  <button className="finguard-button-primary text-xs px-3 py-1">
                    <PlayCircle className="w-3 h-3 mr-1" />
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}