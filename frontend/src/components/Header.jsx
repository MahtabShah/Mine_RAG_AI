import React, { useState } from "react";
import { Database, MessageSquare, BookOpen, Menu, X } from "lucide-react";

const navItems = [
  { id: "chat", label: "Ask Model", icon: MessageSquare },
  // { id: "ingest", label: "Train Data", icon: Database },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
];

export default function Header({
  activeTab: controlledTab,
  setActiveTab,
  topic = "DGMS Inundation",
  isTrained = false,
}) {
  const [localTab, setLocalTab] = useState("chat");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTab = controlledTab ?? localTab;

  const handleNavClick = (tab) => {
    setLocalTab(tab);
    setActiveTab?.(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick("chat")}
            aria-label="Go to Ask Model"
            className="min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <div className="text-base font-bold tracking-tight text-slate-900">
              InunBrain
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="max-w-[120px] truncate sm:max-w-[180px]">
                {topic}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-100"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}>
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white p-3 shadow-lg md:hidden absolute left-0 right-0">
          <div className="mx-auto max-w-7xl space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}>
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
