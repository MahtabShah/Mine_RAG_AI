import React, { useState } from 'react';
import {
  Database,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Code2,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'ingest' | 'chat' | 'knowledge' | 'exam' | 'python';
  setActiveTab: (tab: 'ingest' | 'chat' | 'knowledge' | 'exam' | 'python') => void;
  topic: string;
  totalChunks: number;
  isTrained: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  topic,
  totalChunks,
  isTrained,
  theme,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'chat', label: 'Ask Model', icon: MessageSquare },
    { id: 'ingest', label: 'Train Data', icon: Database },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'exam', label: 'Practice Exam', icon: GraduationCap },
    { id: 'python', label: 'Python Backend', icon: Code2 },
  ] as const;

  const handleNavClick = (tab: 'ingest' | 'chat' | 'knowledge' | 'exam' | 'python') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Editorial Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shrink-0 font-bold text-sm tracking-tighter">
              DB
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  DocuBrain
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-xs hidden sm:inline" aria-hidden="true">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:inline">
                  React + Python
                </span>
              </div>
              {/* Quiet unboxed metadata */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                <span className="truncate max-w-[150px] sm:max-w-[200px]" title={topic}>
                  {topic || 'DGMS Inundation'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600 dark:text-slate-400">
                  {isTrained ? `${totalChunks} chunks` : 'Awaiting data'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Segmented Controls */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
              aria-label={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
