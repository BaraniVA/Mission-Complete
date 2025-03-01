import { CheckCircle } from 'lucide-react';

interface CompletionAcknowledgmentProps {
  onDismiss: () => void;
}

const CompletionAcknowledgment: React.FC<CompletionAcknowledgmentProps> = () => {
  return (
    <div className="fixed inset-0 z-50 bg-lumon-dark bg-opacity-90 flex items-center justify-center text-center">
      <div className="bg-lumon-dark text-lumon-neon p-8 shadow-lg w-150 flex flex-col items-center space-y-6 border border-lumon-neon/10">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-lumon-neon/10 blur-xl rounded-full"></div>
          <CheckCircle className="relative h-14 w-14 mx-auto text-lumon-neon" />
        </div>
        
        {/* Message */}
        <h2 className="text-Xl font-mono text-center tracking-[0.3em] text-lumon-neon leading-tight">
          MISSION COMPLETED
        </h2>
        <p className="text-xs font-mono tracking-[0.3em] text-lumon-neon/60">
          Performance acknowledged. Metrics updated. Proceed with your next task.
        </p>

        {/* Acknowledge Button */}

        {/* Footer with corporate surveillance messages */}
        <div className="space-y-1 text-xs font-mono tracking-[0.2em] text-lumon-neon/40">
          <p>ACTIVITY LOGGED</p>
          <p>ALL ACTIONS ARE MONITORED</p>
        </div>
      </div>
    </div>
  );
};

export default CompletionAcknowledgment;
