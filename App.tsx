import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './components/screens/HomeScreen';
import { LogScreen } from './components/screens/LogScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'log':
        return <LogScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated galaxy background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[var(--color-galaxy-purple)]/20 to-[var(--color-galaxy-blue)]/20 rounded-full blur-xl galaxy-float"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-[var(--color-galaxy-pink)]/15 to-[var(--color-galaxy-cyan)]/15 rounded-full blur-lg galaxy-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-[var(--color-galaxy-violet)]/10 to-[var(--color-galaxy-blue)]/10 rounded-full blur-2xl galaxy-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}