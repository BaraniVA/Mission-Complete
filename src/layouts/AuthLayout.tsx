import { Outlet } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const AuthLayout = () => {
  const terminalId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-lumon-dark text-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-lumon-dark border-b border-lumon-neon/10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60">
            AUTHENTICATION TERMINAL {terminalId}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60 animate-pulse">
            IDENTITY VERIFICATION IN PROGRESS
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-lumon-neon/5 blur-xl rounded-full"></div>
              <Building2 className="relative h-16 w-16 mx-auto text-lumon-neon" />
            </div>
            <h2 className="mt-6 text-4xl font-mono tracking-tight text-white">
              MissionComplete
            </h2>
            <p className="mt-2 text-sm font-mono tracking-wider text-lumon-blue">
              LUMON INDUSTRIES TASK NETWORK
            </p>
            <p className="mt-1 text-xs font-mono text-lumon-neon/40">
              TERMINAL ID: {terminalId}
            </p>
          </div>

          <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 animate-border-pulse shadow-inner-neon">
            <div className="p-1">
              <div className="bg-lumon-dark/80 p-8">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Footer Messages */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
              AUTHORIZED ACCESS ONLY • ALL ACTIVITIES ARE MONITORED
            </p>
            <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40 animate-pulse-slow">
              COMPLIANCE IS MANDATORY • VIOLATIONS WILL BE REPORTED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;