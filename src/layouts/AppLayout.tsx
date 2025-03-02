import { Outlet, NavLink } from 'react-router-dom';
import { Building2, Layout, CheckSquare, BarChart2, Gift, Settings, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', icon: Layout, href: '/dashboard' },
  { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
  { name: 'Performance', icon: BarChart2, href: '/performance' },
  { name: 'Rewards', icon: Gift, href: '/rewards' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

const AppLayout = () => {
  const terminalId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-lumon-dark text-white flex flex-col">
      {/* Top Banner */}
      <div className="bg-lumon-dark border-b border-lumon-neon/10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60">
            TERMINAL {terminalId}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60 animate-pulse">
            MONITORING ACTIVE
          </span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 w-64 bg-lumon-dark/80 border-r border-lumon-neon/10 transform transition-transform duration-300 ease-in-out z-50',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
            'md:transform-none md:flex md:flex-col md:static md:w-64'
          )}
        >
          <div className="flex items-center h-16 px-4 border-b border-lumon-neon/10">
            <Building2 className="h-8 w-8 text-lumon-neon" />
            <span className="ml-2 text-lg font-mono tracking-wider text-lumon-neon">MISSIONCOMPLETE</span>
            <button
              className="ml-auto md:hidden text-lumon-neon p-1" // Reduced padding
              onClick={toggleMobileMenu}
            >
              <X className="h-5 w-5" /> {/* Reduced from h-6 w-6 to h-5 w-5 */}
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  'flex items-center px-4 py-2 text-sm font-mono tracking-wide rounded-sm',
                  'transition-colors duration-150 ease-in-out border border-transparent',
                  isActive
                    ? 'bg-lumon-neon/10 text-lumon-neon border-lumon-neon/20'
                    : 'text-lumon-neon/60 hover:bg-lumon-neon/5 hover:text-lumon-neon hover:border-lumon-neon/20'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name.toUpperCase()}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 mb-8 border-t border-lumon-neon/10">
            <p className="text-xs font-mono text-lumon-neon/40 tracking-wider">
              SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center p-4 border-b border-lumon-neon/10">
            <span className="text-lg font-mono tracking-wider text-lumon-neon">MISSIONCOMPLETE</span>
            <button
              className="text-lumon-neon p-1" // Reduced padding
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? null : <Menu className="h-5 w-5" />} {/* Reduced from h-6 w-6 to h-5 w-5 */}
            </button>
          </div>

          <main className="flex-1 py-6 px-4 sm:px-6 md:px-8 pb-20">
            <Outlet />
          </main>
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </div>

      {/* Footer Message */}
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-lumon-dark/90 border-t border-lumon-neon/10 backdrop-blur-sm">
        <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
          REMEMBER: YOUR WORK SERVES THE GREATER GOOD • COMPLIANCE ENSURES CONTINUITY
        </p>
      </div>
    </div>
  );
};

export default AppLayout;