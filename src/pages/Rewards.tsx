// src/pages/Rewards.tsx
import { Gift, Lock, AlertTriangle, Clock, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTasks } from '../context/TasksContext';
import { Reward, processRewards } from '../context/RewardsHelper';
import { useNavigate } from 'react-router-dom';
import { claimReward } from '../context/RewardsActions';
import { useState, useEffect, } from 'react';

const getComplianceTier = (points: number) => {
  if (points >= 2000) return 'PLATINUM';
  if (points >= 1500) return 'GOLD';
  if (points >= 1000) return 'SILVER';
  return 'BRONZE';
};

const Rewards = () => {
  const { tasks, points, setPoints } = useTasks();
  const navigate = useNavigate();
  
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([
    {
      id: 1,
      name: 'BREAK ROOM ACCESS',
      description: 'Extended break room privileges',
      points: 500,
      status: 'available',
      deadline: '2024-03-25',
    },
    {
      id: 2,
      name: 'WELLNESS INITIATIVE',
      description: 'Access to enhanced wellness programs',
      points: 1000,
      status: 'locked',
      deadline: '2024-04-01',
    },
    {
      id: 3,
      name: 'EFFICIENCY RECOGNITION',
      description: 'Department-wide acknowledgment',
      points: 750,
      status: 'expired',
      deadline: '2024-03-15',
    },
  ]);


  // Sync pointsRef with points state
  useEffect(() => {
    console.log('Points state updated to:', points);
  }, [points]);

  // Log tasks changes
  useEffect(() => {
    const recalculatedPoints = tasks.reduce((acc, task) => {
      let taskPoints = 0;
      if (task.status === 'Completed') taskPoints += 100;
      if (task.priority === 'High' && task.status === 'Completed') taskPoints += 50;
      if (task.priority === 'Critical' && task.status === 'Completed') taskPoints += 150;
      if (task.status === 'Overdue') taskPoints -= 50;
      return acc + taskPoints;
    }, 0);
    console.log('Tasks changed, recalculated points:', recalculatedPoints);
  }, [tasks]);

  const rewards = processRewards(availableRewards, points);
  const complianceTier = getComplianceTier(points);
  const tasksCompleted = tasks.filter(task => task.status === 'Completed').length;
  const personalTimeEarned = tasksCompleted * 5;

  const handleRewardClaim = (reward: Reward) => {
    console.log('Before claim - Points:', points, 'Reward cost:', reward.points);
    const result = claimReward(reward, points);
    console.log('Claim result:', result);

    if (result.success && result.claimedReward) {
      setPoints(result.updatedPoints); // Deduct points
      setAvailableRewards(prevRewards =>
        prevRewards.map(r =>
          r.id === reward.id ? { ...r, status: 'claimed' } : r
        )
      );
      console.log('After claim - New Points:', result.updatedPoints);

      // Delay navigation to ensure state updates apply
      setTimeout(() => {
        switch (reward.name) {
          case 'BREAK ROOM ACCESS':
            navigate('/pomodoro', { state: { personalTime: personalTimeEarned } });
            break;
          case 'WELLNESS INITIATIVE':
            navigate('/wellness');
            break;
          case 'EFFICIENCY RECOGNITION':
            navigate('/efficiency');
            break;
          default:
            break;
        }
      }, 100); // 100ms delay
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-lumon-neon/10 pb-5">
        <div className="flex items-center space-x-4">
          <Gift className="h-8 w-8 text-lumon-neon" />
          <div>
            <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">Incentive Programs</h1>
            <p className="mt-1 text-sm font-mono text-lumon-blue">
              CURRENT POINTS: {points} • COMPLIANCE TIER: {complianceTier}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 p-4 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80 p-4">
            <p className="font-mono text-sm text-lumon-neon tracking-wide">
              NOTICE: Rewards are subject to continued compliance and performance metrics.
              Non-compliance may result in reward revocation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm"
          >
            <div className="p-1">
              <div className="bg-lumon-dark/80 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {reward.status === 'available' ? (
                        <Trophy className="h-5 w-5 text-lumon-neon" />
                      ) : reward.status === 'locked' ? (
                        <Lock className="h-5 w-5 text-lumon-blue" />
                      ) : reward.status === 'claimed' ? (
                        <Gift className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                      <h3 className="text-sm font-mono tracking-wider text-white">
                        {reward.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs font-mono text-lumon-blue">
                      {reward.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-lumon-neon/40" />
                      <span className="text-xs font-mono text-lumon-neon/60">
                        EXPIRES: {reward.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={cn(
                      "text-xs font-mono px-2 py-1 rounded-sm border",
                      reward.status === 'available' && "bg-lumon-neon/10 text-lumon-neon border-lumon-neon/20",
                      reward.status === 'locked' && "bg-lumon-blue/10 text-lumon-blue border-lumon-blue/20",
                      reward.status === 'expired' && "bg-red-900/10 text-red-400 border-red-500/20",
                      reward.status === 'claimed' && "bg-green-900/10 text-green-400 border-green-500/20"
                    )}>
                      {reward.points} POINTS
                    </span>
                  </div>
                </div>
                <button
                  disabled={reward.status !== 'available'}
                  onClick={() => handleRewardClaim(reward)}
                  className={cn(
                    "mt-4 w-full py-2 text-xs font-mono tracking-wider border",
                    "transition-colors duration-150",
                    reward.status === 'available'
                      ? "bg-lumon-neon/10 text-lumon-neon border-lumon-neon/20 hover:bg-lumon-neon/20"
                      : "bg-lumon-dark/50 text-lumon-neon/40 border-lumon-neon/10 cursor-not-allowed"
                  )}
                >
                  {reward.status === 'available' ? 'CLAIM REWARD' : 
                   reward.status === 'locked' ? 'INSUFFICIENT POINTS' : 
                   reward.status === 'claimed' ? 'CLAIMED' : 'EXPIRED'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs font-mono text-lumon-neon/40 tracking-wider">
          REWARDS ARE A PRIVILEGE • MAINTAIN COMPLIANCE TO RETAIN ACCESS
        </p>
      </div>
    </div>
  );
};

export default Rewards;