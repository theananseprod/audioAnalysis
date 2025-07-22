import React from 'react';
import { Home, FileText, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'log', label: 'Log', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`
                flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }
              `}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : 'scale-100'} transition-transform`} />
              <span className="text-xs font-medium">{label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}