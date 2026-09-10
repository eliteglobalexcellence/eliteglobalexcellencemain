'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Globe2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  subTab?: string;
  onSelectTab: (tab: string, subTab?: string) => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  subTab,
  onSelectTab,
  onOpenAdmin,
  onOpenContact,
  unreadCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confDropdownOpen, setConfDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setConfDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    {
      id: 'conferences',
      label: 'EGE Conferences',
      isDropdown: true,
      subItems: [
        { id: 'overview', label: 'Conferences Overview' },
        { id: 'iccseit', label: 'EGE-ICCSEIT (Computer Science & IT)' },
      ],
    },
    { id: 'workshops', label: 'Workshops' },
    { id: 'courses', label: 'Courses' },
    { id: 'mock-viva', label: 'Mock Viva' },
    { id: 'ambassadors', label: 'Global Advisory Board' },
    { id: 'research-network', label: 'Research Network' },
    { id: 'partners', label: 'Partners' },
    { id: 'careers', label: 'Careers' },
    { id: 'news', label: 'News' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string, sub?: string) => {
    onSelectTab(id, sub);
    setConfDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer group select-none shrink-0 py-1 -ml-2 sm:-ml-3"
          >
            <img
              src="/ege_logo.png"
              alt="Elite Global Excellence Logo"
              className="h-10 sm:h-12 lg:h-13 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-xs"
            />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 ml-8 xl:ml-12">
            {navItems.map((item) => {
              if (item.isDropdown) {
                const isItemActive = currentTab === item.id;
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setConfDropdownOpen(!confDropdownOpen)}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${isItemActive
                        ? 'text-[#045494] bg-blue-50 font-bold'
                        : 'text-slate-750 hover:text-[#045494] hover:bg-slate-50'
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${confDropdownOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {confDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100">
                          EGE Conferences Series
                        </div>
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(item.id, sub.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${currentTab === item.id && subTab === sub.id
                              ? 'bg-blue-50 text-[#045494] font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[#045494]'
                              }`}
                          >
                            <span>{sub.label}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${isActive
                    ? 'text-[#045494] bg-blue-50 font-bold'
                    : 'text-slate-750 hover:text-[#045494] hover:bg-slate-50'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 max-h-[80vh] overflow-y-auto px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.id} className="py-1">
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                    {item.label}
                  </div>
                  <div className="pl-3 space-y-1 border-l-2 border-blue-100 ml-3">
                    {item.subItems?.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(item.id, sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${currentTab === item.id && subTab === sub.id
                          ? 'bg-blue-50 text-[#045494] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${isActive
                  ? 'bg-blue-50 text-[#045494] font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
