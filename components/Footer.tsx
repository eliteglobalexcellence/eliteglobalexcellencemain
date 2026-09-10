'use client';

import React from 'react';
import {
  GraduationCap,
  Mail,
  MapPin,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { ContactSettings, SiteContent } from '@/lib/types';

interface FooterProps {
  onSelectTab: (tab: string, subTab?: string) => void;
  onOpenAdmin: () => void;
  contactSettings: ContactSettings;
  siteContent?: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenAdmin,
  contactSettings,
  siteContent,
}) => {
  const fc = siteContent?.footerContent;

  const logoUrl = fc?.logoUrl || '/ege_logo.png';
  const tagline = fc?.tagline || 'Join us in shaping the future of research and education. Supporting researchers, students, educators, universities, and research institutions worldwide.';
  const connectTitle = fc?.connectTitle || 'Connect With EGE';
  const socialLinks = fc?.socialLinks && fc.socialLinks.length > 0 ? fc.socialLinks : [
    { id: 'soc-in', platform: 'LinkedIn', url: 'https://linkedin.com/' },
    { id: 'soc-fb', platform: 'Facebook', url: 'https://facebook.com/' },
    { id: 'soc-x', platform: 'X (Twitter)', url: 'https://twitter.com/' },
    { id: 'soc-yt', platform: 'YouTube', url: 'https://youtube.com/' },
    { id: 'soc-ig', platform: 'Instagram', url: 'https://instagram.com/' },
  ];

  const exploreTitle = fc?.exploreTitle || 'Explore';
  const exploreLinks = fc?.exploreLinks && fc.exploreLinks.length > 0 ? fc.exploreLinks : [
    { id: 'exp-1', label: 'Home', targetTab: 'home' },
    { id: 'exp-2', label: 'About Us', targetTab: 'about' },
    { id: 'exp-3', label: 'Our Services', targetTab: 'services' },
    { id: 'exp-4', label: 'EGE Conferences', targetTab: 'conferences' },
    { id: 'exp-5', label: 'Workshops', targetTab: 'workshops' },
    { id: 'exp-6', label: 'Courses', targetTab: 'courses' },
    { id: 'exp-7', label: 'Mock Viva', targetTab: 'mock-viva' },
    { id: 'exp-8', label: 'Global Advisory Board', targetTab: 'ambassadors' },
    { id: 'exp-9', label: 'Research Network', targetTab: 'research-network' },
    { id: 'exp-10', label: 'Partners', targetTab: 'partners' },
    { id: 'exp-11', label: 'Careers', targetTab: 'careers' },
    { id: 'exp-12', label: 'News', targetTab: 'news' },
    { id: 'exp-13', label: 'Contact', targetTab: 'contact' },
  ];

  const conferencesTitle = fc?.conferencesTitle || 'Conferences';
  const conferencesLinks = fc?.conferencesLinks && fc.conferencesLinks.length > 0 ? fc.conferencesLinks : [
    { id: 'conf-1', label: 'Conferences Overview Series', targetTab: 'conferences', targetSubTab: 'overview' },
    { id: 'conf-2', label: 'EGE-ICCSEIT (Computer Science & IT)', targetTab: 'conferences', targetSubTab: 'iccseit' },
    { id: 'conf-3', label: 'EGE-MLDL (Machine & Deep Learning)', targetTab: 'conferences', targetSubTab: 'mldl' },
    { id: 'conf-4', label: 'IMRC & Academic Journal Publishing', targetTab: 'services' },
    { id: 'conf-5', label: 'Host with EGE / Partnership', targetTab: 'partners' },
  ];

  const contactTitle = fc?.contactTitle || 'Contact & Locations';
  const companyName = fc?.companyName || 'Elite Global Excellence Sdn. Bhd.';
  const primaryAddress = fc?.primaryAddress || contactSettings.primaryAddress;
  const secondaryAddress = fc?.secondaryAddress || contactSettings.secondaryAddress;
  const primaryEmail = fc?.primaryEmail || contactSettings.primaryEmail;
  const secondaryEmail = fc?.secondaryEmail || contactSettings.secondaryEmail;
  const websiteUrl = fc?.websiteUrl || contactSettings.websiteUrl;
  const directInquiryBtnText = fc?.directInquiryButtonText || 'Send Direct Inquiry';
  const copyrightText = fc?.copyrightText || '© 2026 Elite Global Excellence Sdn. Bhd. All rights reserved.';
  const sloganText = fc?.sloganText || 'Aspire, Achieve, Advance with EGE';
  const adminAccessBtnText = fc?.adminAccessButtonText || 'Admin Access';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Four Main Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Section 1 – Brand */}
          <div className="space-y-4">
            <div
              onClick={() => onSelectTab('home')}
              className="flex items-center cursor-pointer group py-1"
            >
              <img
                src={logoUrl}
                alt="Elite Global Excellence Logo"
                className="h-10 sm:h-12 w-auto object-contain bg-white/95 p-2 rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {tagline}
            </p>
            {/* Social media links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-2">
                {connectTitle}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((soc) => (
                  <a
                    key={soc.id || soc.platform}
                    href={soc.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#045494] flex items-center justify-center text-slate-300 hover:text-white transition"
                    aria-label={soc.platform}
                    title={soc.platform}
                  >
                    <span className="text-xs font-bold">
                      {soc.platform.toLowerCase().includes('linked') ? 'in' :
                        soc.platform.toLowerCase().includes('face') ? 'fb' :
                          soc.platform.toLowerCase().includes('twitter') || soc.platform === 'X' ? '𝕏' :
                            soc.platform.toLowerCase().includes('you') ? 'yt' :
                              soc.platform.toLowerCase().includes('insta') ? 'ig' :
                                soc.platform.substring(0, 2)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 – Explore */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {exploreTitle}
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium">
              {exploreLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.externalUrl) {
                        window.open(item.externalUrl, '_blank');
                      } else {
                        onSelectTab(item.targetTab, item.targetSubTab);
                      }
                    }}
                    className="hover:text-white hover:underline transition cursor-pointer text-left py-0.5 leading-snug"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 – Conferences */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {conferencesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {conferencesLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.externalUrl) {
                        window.open(item.externalUrl, '_blank');
                      } else {
                        onSelectTab(item.targetTab, item.targetSubTab);
                      }
                    }}
                    className="hover:text-white hover:underline transition cursor-pointer text-left flex items-center justify-between w-full"
                  >
                    <span>{item.label}</span>
                    {item.targetSubTab === 'overview' && (
                      <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded">
                        Series
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4 – Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {contactTitle}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">{companyName}</p>
                  <p className="text-xs text-slate-400">{primaryAddress}</p>
                  {secondaryAddress && (
                    <p className="text-[11px] text-slate-500 mt-1">
                      {secondaryAddress}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-xs flex flex-wrap gap-1">
                  {primaryEmail && (
                    <a href={`mailto:${primaryEmail}`} className="hover:text-white transition">
                      {primaryEmail}
                    </a>
                  )}
                  {primaryEmail && secondaryEmail && <span className="text-slate-600">·</span>}
                  {secondaryEmail && (
                    <a href={`mailto:${secondaryEmail}`} className="hover:text-white transition">
                      {secondaryEmail}
                    </a>
                  )}
                </div>
              </div>
              {websiteUrl && (
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <a
                    href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs hover:text-white transition"
                  >
                    {websiteUrl}
                  </a>
                </div>
              )}
              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('contact')}
                  className="w-full bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold py-2 px-3 rounded-lg text-center transition cursor-pointer"
                >
                  {directInquiryBtnText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <span className="italic text-slate-400">{sloganText}</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-blue-400 transition cursor-pointer font-bold"
            >
              {adminAccessBtnText}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
