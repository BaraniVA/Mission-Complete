import React, {useMemo, useEffect, useState} from 'react';
import { BarChart2, AlertTriangle, Activity, Target, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTasks } from '../context/TasksContext';
import { calculateAccuracy } from '../context/UserAccuracy';

const Performance = () => {
  const { tasks } = useTasks();
  const [accuracyRating, setAccuracyRating] = useState(100);
  
  // Update accuracy whenever tasks change
  useEffect(() => {
    setAccuracyRating(calculateAccuracy(tasks));
  }, [tasks]);

  const tasksCompleted = tasks.filter(task => task.status === 'Completed').length;
  const efficiencyRating = tasks.length > 0 ? Math.round((tasksCompleted / tasks.length) * 100) : 0;

  const previousEfficiency = useMemo(() => {
    return Math.max(efficiencyRating - Math.floor(Math.random() * 5), 0); // Simulating a past efficiency value
  }, [efficiencyRating]);

  const efficiencyChange = efficiencyRating - previousEfficiency;
  const efficiencyChangeSymbol = efficiencyChange >= 0 ? `+${efficiencyChange}` : efficiencyChange;

  const totalTasks = tasks.length; // Processing Speed (Assuming each task has a `completionTime` in hours)
  const totalCompletionTime = tasks.reduce((acc, task) => acc + (task.completionTime || 1), 0);
  const avgCompletionTime = totalTasks > 0 ? totalCompletionTime / totalTasks : 1;
  const processingSpeed = avgCompletionTime < 2 ? '1.5x' : avgCompletionTime < 5 ? '1.2x' : '0.8x';
  const processingTrend = avgCompletionTime < 2 ? 'positive' : avgCompletionTime < 5 ? 'neutral' : 'negative';

  // Accuracy trend calculation based on current accuracy rating
  const accuracyTrend = accuracyRating > 90 ? 'positive' : accuracyRating > 70 ? 'neutral' : 'negative';

  // Peer Comparison (Comparing against an arbitrary department average efficiency)
  const departmentAvgEfficiency = 85; // Example benchmark
  const peerComparison = efficiencyRating >= departmentAvgEfficiency ? 'Top 10%' : efficiencyRating >= 70 ? 'Top 30%' : 'Below Average';
  const peerTrend = efficiencyRating > departmentAvgEfficiency ? 'positive' : efficiencyRating > 70 ? 'neutral' : 'negative';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-lumon-neon/10 pb-5">
        <div className="flex items-center space-x-4">
          <BarChart2 className="h-8 w-8 text-lumon-neon" />
          <div>
            <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">Performance Metrics</h1>
            <p className="mt-1 text-sm font-mono text-lumon-blue">
              REPORT ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 p-4 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80 p-4">
            <p className="font-mono text-sm text-lumon-neon tracking-wide">
              NOTICE: Your performance is being monitored. Maintain acceptable metrics to retain privileges.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Efficiency Score */}
        <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
          <div className="p-1">
            <div className="bg-lumon-dark/80 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lumon-neon/5 rounded-full transform translate-x-16 -translate-y-16" />
              <div className="relative">
                <h3 className="text-sm font-mono uppercase tracking-wider text-lumon-blue">
                  Efficiency Rating
                </h3>
                <div className="mt-4 flex items-baseline">
                  <p className="text-4xl font-light tracking-tight text-lumon-neon">{efficiencyRating}</p>
                  <span className="ml-2 text-sm font-mono text-lumon-neon">{efficiencyChangeSymbol}%</span>
                </div>
                <div className="mt-4 h-1 bg-lumon-neon/10 rounded-full">
                  <div className="h-1 bg-lumon-neon rounded-full" style={{ width: `${efficiencyRating}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Completion */}
        <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
          <div className="p-1">
            <div className="bg-lumon-dark/80 p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-lumon-blue">
                Task Completion Rate
              </h3>
              <div className="mt-4 flex items-baseline">
                <p className="text-4xl font-light tracking-tight text-lumon-neon">{tasksCompleted}/{tasks.length}</p>
                <span className="ml-2 text-sm font-mono text-lumon-blue">directives</span>
              </div>
              <p className="mt-2 text-xs font-mono text-lumon-neon/40">
                COMPLETION DEADLINE: 00:00 UTC
              </p>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="md:col-span-2 bg-red-900/10 border border-red-500/20 rounded-sm">
          <div className="p-1">
            <div className="bg-lumon-dark/80 p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-4 mt-0.5" />
                <div>
                  <h3 className="font-mono text-sm text-red-400 tracking-wider">
                    ATTENTION REQUIRED
                  </h3>
                  <p className="mt-2 text-sm text-lumon-blue leading-6">
                    Your break room privileges may be adjusted based on current performance metrics. 
                    Please maintain focus on assigned directives to avoid corrective action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80">
            <div className="px-6 py-4 border-b border-lumon-neon/10">
              <h3 className="font-mono text-sm text-lumon-neon tracking-wider">
                DETAILED ANALYSIS
              </h3>
            </div>
            <div className="divide-y divide-lumon-neon/10">
              <MetricRow
                icon={Activity}
                label="Processing Speed"
                value={processingSpeed}
                detail="Above department average"
                trend={processingTrend}
              />
              <MetricRow
                icon={Target}
                label="Accuracy Rating"
                value={`${accuracyRating}%`}
                detail="Within acceptable parameters"
                trend={accuracyTrend}
              />
              <MetricRow
                icon={Users}
                label="Peer Comparison"
                value={peerComparison}
                detail="Departmental ranking"
                trend={peerTrend}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center">
        <p className="font-mono text-xs text-lumon-neon/40 tracking-wider">
          REMEMBER: YOUR WORK IS IMPORTANT • YOUR COMPLIANCE IS APPRECIATED
        </p>
      </div>
    </div>
  );
};

interface MetricRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  trend: 'positive' | 'negative' | 'neutral';
}

const MetricRow = ({ icon: Icon, label, value, detail, trend }: MetricRowProps) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-lumon-neon/5 transition-colors">
      <div className="flex items-center space-x-4">
        <Icon className="h-5 w-5 text-lumon-neon" />
        <div>
          <p className="text-sm font-mono text-white">{label}</p>
          <p className="text-xs text-lumon-blue mt-0.5">{detail}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={cn(
          'text-sm font-mono',
          trend === 'positive' && 'text-lumon-neon',
          trend === 'negative' && 'text-red-400',
          trend === 'neutral' && 'text-lumon-blue'
        )}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default Performance;