import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Monitor, User } from 'lucide-react';
import { cn } from '../lib/utils';

const settingSections = [
  {
    title: 'NOTIFICATION PREFERENCES',
    icon: Bell,
    settings: [
      { id: 'task-alerts', label: 'DIRECTIVE ALERTS', enabled: true },
      { id: 'performance-updates', label: 'PERFORMANCE METRICS', enabled: true },
      { id: 'compliance-warnings', label: 'COMPLIANCE WARNINGS', enabled: true, locked: true },
    ],
  },
  {
    title: 'SECURITY PROTOCOLS',
    icon: Shield,
    settings: [
      { id: 'two-factor', label: 'TWO-FACTOR AUTHENTICATION', enabled: true, locked: true },
      { id: 'session-timeout', label: 'AUTO-LOGOUT (15 MINUTES)', enabled: true, locked: true },
      { id: 'activity-log', label: 'ACTIVITY MONITORING', enabled: true, locked: true },
    ],
  },
  {
    title: 'DISPLAY SETTINGS',
    icon: Monitor,
    settings: [
      { id: 'dark-mode', label: 'TERMINAL MODE', enabled: true, locked: true },
      { id: 'compact-view', label: 'COMPACT VIEW', enabled: false },
      { id: 'animations', label: 'INTERFACE ANIMATIONS', enabled: true },
    ],
  },
];

const Settings = () => {
  // Initialize state for settings that are enabled and not locked
  const [settingsState, setSettingsState] = useState(() => {
    const initialState: { [key: string]: boolean } = {};
    settingSections.forEach(section => {
      section.settings.forEach(setting => {
        if (setting.enabled && !setting.locked) {
          initialState[setting.id] = setting.enabled;
        }
      });
    });
    return initialState;
  });

  const handleToggle = (id: string) => {
    setSettingsState(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-lumon-neon/10 pb-5">
        <div className="flex items-center space-x-4">
          <SettingsIcon className="h-8 w-8 text-lumon-neon" />
          <div>
            <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">System Preferences</h1>
            <p className="mt-1 text-sm font-mono text-lumon-blue">
              TERMINAL CONFIGURATION • CLEARANCE LEVEL: STANDARD
            </p>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 p-4 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80 p-4">
            <p className="font-mono text-sm text-lumon-neon tracking-wide">
              NOTICE: Some settings are enforced by corporate policy and cannot be modified.
              Changes are monitored and logged.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => (
          <div
            key={section.title}
            className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm"
          >
            <div className="p-1">
              <div className="bg-lumon-dark/80">
                <div className="px-6 py-4 border-b border-lumon-neon/10">
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-5 w-5 text-lumon-neon" />
                    <h3 className="font-mono text-sm text-lumon-neon tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-lumon-neon/10">
                  {section.settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-lumon-neon/5 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {setting.locked && (
                          <Shield className="h-4 w-4 text-lumon-blue" />
                        )}
                        <span className="text-sm font-mono text-white">
                          {setting.label}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            setting.enabled && !setting.locked
                              ? settingsState[setting.id] // Use state for enabled, non-locked settings
                              : setting.enabled // Static value for locked or disabled settings
                          }
                          disabled={setting.locked || !setting.enabled} // Disable if locked or not enabled
                          className="sr-only peer"
                          onChange={() => {
                            if (setting.enabled && !setting.locked) {
                              handleToggle(setting.id); // Only toggle enabled, non-locked settings
                            }
                          }}
                        />
                        <div
                          className={cn(
                            "w-11 h-6 rounded-full peer",
                            "border border-lumon-neon/20",
                            "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                            "after:bg-lumon-neon after:rounded-full after:h-5 after:w-5",
                            "after:transition-all peer-checked:after:translate-x-full",
                            setting.enabled && !setting.locked && settingsState[setting.id]
                              ? "bg-lumon-neon/20"
                              : "bg-lumon-dark",
                            (setting.locked || !setting.enabled) && "opacity-50 cursor-not-allowed"
                          )}
                        ></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <User className="h-8 w-8 text-lumon-neon" />
                <div>
                  <h3 className="text-sm font-mono text-white">EMPLOYEE #4973</h3>
                  <p className="text-xs font-mono text-lumon-blue mt-1">
                    DEPARTMENT: MACRODATA REFINEMENT
                  </p>
                </div>
              </div>
              <button
                className="px-4 py-2 text-xs font-mono tracking-wider text-lumon-neon border border-lumon-neon/20
                hover:bg-lumon-neon/10 transition-colors rounded-sm"
              >
                VIEW PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center">
        <p className="text-xs font-mono text-lumon-neon/40 tracking-wider">
          SYSTEM CONFIGURATION IS MONITORED • UNAUTHORIZED CHANGES WILL BE DETECTED
        </p>
      </div>
    </div>
  );
};

export default Settings;