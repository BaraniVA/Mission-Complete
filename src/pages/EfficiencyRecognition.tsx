import { useNavigate } from 'react-router-dom';
import { Trophy, ChevronUp, ShieldCheck, Eye, AlertTriangle, Quote } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, name: 'Mark S.', efficiency: '99.3%' },
  { rank: 2, name: 'Helly R.', efficiency: '97.8%' },
  { rank: 3, name: 'Dylan G.', efficiency: '96.5%' },
  { rank: 4, name: 'Irving B.', efficiency: '94.9%' },
  { rank: 5, name: 'Burt G.', efficiency: '93.4%' },
];

const EfficiencyRecognition = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-lumon-dark text-white p-8">
      <div className="grid grid-cols-2 gap-6 w-full h-full">
        {/* Recognition Section */}
        <div className="p-8 bg-lumon-dark/50 border border-lumon-neon/10 shadow-lg rounded-none flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 border-b border-lumon-neon/20 pb-4">
              <Trophy className="h-8 w-8 text-lumon-neon" />
              <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">Efficiency Recognition</h1>
            </div>
            <p className="mt-6 text-sm font-mono text-lumon-neon tracking-wide">
              Your efficiency has been deemed acceptable.
            </p>
            <p className="mt-2 text-xs font-mono text-lumon-blue">
              Employees ranking below the 90th percentile will be scheduled for a Performance Consultation.
            </p>
          </div>
          <div className="flex justify-between text-xs text-lumon-blue mt-6">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-lumon-neon/50" />
              <span>Recognition Level: Secure</span>
            </div>
            <div className="flex items-center space-x-1 text-red-500">
              <Eye className="h-4 w-4" />
              <span>Behavioral Metrics Flagged</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChevronUp className="h-4 w-4 text-lumon-neon/50" />
              <span>Promotion Eligibility: Under Corporate Review</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="p-8 bg-lumon-dark/50 border border-lumon-neon/10 shadow-lg rounded-none">
          <h2 className="text-lg font-mono text-lumon-neon tracking-wider text-center border-b border-lumon-neon/20 pb-4">
            Leaderboard
          </h2>
          <div className="mt-4 space-y-2">
            {mockLeaderboard.map((entry, index) => (
              <div key={entry.rank} className={`flex justify-between text-sm font-mono px-2 py-1 bg-lumon-dark/80 rounded-none border border-lumon-neon/10 ${index >= 3 ? 'text-red-500' : 'text-lumon-blue'}`}>
                <span>#{entry.rank} {entry.name}</span>
                <span className="text-lumon-neon">{entry.efficiency}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center items-center text-red-500 text-xs font-mono">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Voluntary Overtime Recommended</span>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-lumon-dark/80 border border-lumon-neon/10 rounded-none text-center">
            <Quote className="h-6 w-6 text-lumon-neon mx-auto" />
            <p className="mt-2 text-sm font-mono text-lumon-neon italic">
              "The surest way to cheerfulness is through obedience. You are seen. You are appreciated."
            </p>
            <p className="mt-2 text-xs font-mono text-lumon-blue">- Kier Eagan</p>
      </div>
      
      {/* Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/rewards')}
          className="px-6 py-2 text-xs font-mono tracking-wider border border-lumon-neon/20 text-lumon-neon bg-lumon-neon/10 hover:bg-lumon-neon/20 transition-colors duration-150"
        >
          RETURN TO REWARDS
        </button>
      </div>
    </div>
  );
};

export default EfficiencyRecognition;
