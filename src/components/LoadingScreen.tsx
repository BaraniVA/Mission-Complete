import { Building2, Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const terminalId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-lumon-dark text-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-lumon-dark border-b border-lumon-neon/10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60">
            SYSTEM TERMINAL {terminalId}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60 animate-pulse">
            INITIALIZING SYSTEMS
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-lumon-neon/5 blur-xl rounded-full"></div>
            <Building2 className="relative h-20 w-20 mx-auto text-lumon-neon animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-lumon-neon mx-auto" />
            <div className="space-y-2">
              <p className="text-sm font-mono tracking-[0.2em] text-lumon-blue">
                ESTABLISHING SECURE CONNECTION
              </p>
              <p className="text-xs font-mono tracking-[0.3em] text-lumon-neon/40 animate-pulse">
                PLEASE REMAIN CALM
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
              SYSTEM INITIALIZATION IN PROGRESS
            </p>
            <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
              ALL ACTIVITIES ARE MONITORED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;