'use client';

import React, { useState, useEffect } from 'react';
import { initialDatabase as initialDatabaseState } from '@/lib/seedData';
import {
  DatabaseState,
  Ambassador,
  NewsArticle,
  WorkshopItem,
  EventItem,
  CareerRole,
} from '@/lib/types';

// Global Layout Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Views
import { HomeView } from '@/components/views/HomeView';
import { AboutView } from '@/components/views/AboutView';
import { ServicesView } from '@/components/views/ServicesView';
import { ConferencesView } from '@/components/views/ConferencesView';
import { WorkshopsView } from '@/components/views/WorkshopsView';
import { CoursesView } from '@/components/views/CoursesView';
import { MockVivaView } from '@/components/views/MockVivaView';
import { AmbassadorsView } from '@/components/views/AmbassadorsView';
import { ResearchNetworkView } from '@/components/views/ResearchNetworkView';
import { PartnersView } from '@/components/views/PartnersView';
import { NewsView } from '@/components/views/NewsView';
import { CareersView } from '@/components/views/CareersView';
import { ContactView } from '@/components/views/ContactView';
import { AdminView } from '@/components/views/AdminView';

// Modals
import { QuotationModal } from '@/components/modals/QuotationModal';
import { MockVivaBookingModal } from '@/components/modals/MockVivaBookingModal';
import { WorkshopRegModal } from '@/components/modals/WorkshopRegModal';
import { CertificateModal } from '@/components/modals/CertificateModal';
import { ArticleModal } from '@/components/modals/ArticleModal';
import { AmbassadorBioModal } from '@/components/modals/AmbassadorBioModal';
import { PdfBrochureModal } from '@/components/modals/PdfBrochureModal';
import { JobApplyModal } from '@/components/modals/JobApplyModal';
import { AdminPinModal } from '@/components/modals/AdminPinModal';
import { WorkshopAttendanceModal } from '@/components/modals/WorkshopAttendanceModal';

export default function App() {
  const [data, setData] = useState<DatabaseState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('ege_cached_database');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.siteContent) return parsed;
        }
      } catch (e) {}
    }
    return initialDatabaseState;
  });
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentSubTab, setCurrentSubTab] = useState<string | undefined>(undefined);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals state
  const [quotationModalOpen, setQuotationModalOpen] = useState(false);
  const [quotationInitialService, setQuotationInitialService] = useState<string | undefined>();

  const [mockVivaBookingOpen, setMockVivaBookingOpen] = useState(false);
  const [mockVivaInitialPackage, setMockVivaInitialPackage] = useState<string | undefined>();

  const [workshopRegOpen, setWorkshopRegOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);

  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const [ambassadorBioModalOpen, setAmbassadorBioModalOpen] = useState(false);
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);

  const [pdfBrochureOpen, setPdfBrochureOpen] = useState(false);

  const [jobApplyOpen, setJobApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CareerRole | null>(null);

  const [adminPinModalOpen, setAdminPinModalOpen] = useState(false);

  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceWorkshop, setAttendanceWorkshop] = useState<WorkshopItem | null>(null);

  // Fetch live database state from API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/data?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('ege_cached_database', JSON.stringify(json));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('Using client memory/seed state fallback:', err);
    }
  };

  useEffect(() => {
    refreshData();

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const attendParam = urlParams.get('attend');
      if (attendParam) {
        setCurrentTab('workshops');
        setAttendanceModalOpen(true);
      }
    }

    const handleSync = () => {
      refreshData();
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('ege_data_updated', handleSync);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('ege_admin_sync');
      bc.onmessage = () => refreshData();
    } catch (e) {}

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ege_data_updated', handleSync);
      if (bc) bc.close();
    };
  }, []);

  // Sync target workshop for attendance when data updates or URL contains ?attend=
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const attendParam = urlParams.get('attend');
      if (attendParam) {
        const wsList = data.workshops || [];
        const found = wsList.find(
          (w) => String(w.workshopId).toUpperCase() === attendParam.toUpperCase() ||
            String(w.id).toUpperCase() === attendParam.toUpperCase() ||
            `EGEW${w.id}`.toUpperCase() === attendParam.toUpperCase()
        );
        if (found) {
          setAttendanceWorkshop(found);
          setAttendanceModalOpen(true);
        } else if (wsList.length > 0) {
          setAttendanceWorkshop(wsList[0]);
          setAttendanceModalOpen(true);
        }
      }
    }
  }, [data]);

  // Handle Tab changes and scroll to top
  const handleSelectTab = (tab: string, subTab?: string) => {
    if (tab === 'admin') {
      window.location.href = '/admin';
      return;
    }

    setCurrentTab(tab);
    setCurrentSubTab(subTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminSuccess = () => {
    window.location.href = '/admin';
  };

  const handleOpenQuotation = (serviceTitle?: string) => {
    setQuotationInitialService(serviceTitle);
    setQuotationModalOpen(true);
  };

  const handleOpenMockVivaBooking = (packageName?: string) => {
    setMockVivaInitialPackage(packageName);
    setMockVivaBookingOpen(true);
  };

  const handleOpenWorkshopReg = (workshop?: WorkshopItem | null) => {
    if (workshop) setSelectedWorkshop(workshop);
    setWorkshopRegOpen(true);
  };

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  const handleOpenAmbassadorBio = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador);
    setAmbassadorBioModalOpen(true);
  };

  const handleOpenJobApply = (job: CareerRole) => {
    setSelectedJob(job);
    setJobApplyOpen(true);
  };

  useEffect(() => {
    if (currentTab === 'admin') {
      window.location.href = '/admin';
    }
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#045494] selection:text-white">
      {/* Main Website View */}
      {/* Header */}
          <Header
            currentTab={currentTab}
            subTab={currentSubTab}
            onSelectTab={handleSelectTab}
            onOpenAdmin={() => handleSelectTab('admin')}
            onOpenContact={() => handleSelectTab('contact')}
            unreadCount={data.inbox ? data.inbox.filter((m) => m.status === 'NEW').length : 0}
          />

          {/* Main View Switcher */}
          <main className="flex-1">
            {currentTab === 'home' && (
              <HomeView
                data={data}
                onSelectTab={handleSelectTab}
                onRequestQuote={handleOpenQuotation}
                onOpenBrochure={() => setPdfBrochureOpen(true)}
                onOpenMockVivaBooking={handleOpenMockVivaBooking}
                onOpenArticle={handleOpenArticle}
                onSelectAmbassador={handleOpenAmbassadorBio}
                onRegisterWorkshop={handleOpenWorkshopReg}
              />
            )}

            {currentTab === 'about' && (
              <AboutView
                data={data}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'services' && (
              <ServicesView
                data={data}
                initialCategory={currentSubTab}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'conferences' && (
              <ConferencesView
                data={data}
                onOpenEvent={() => { }}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'workshops' && (
              <WorkshopsView
                data={data}
                onOpenWorkshopReg={handleOpenWorkshopReg}
                onOpenCertificateVerify={() => setCertificateModalOpen(true)}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'courses' && (
              <CoursesView
                data={data}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'mock-viva' && (
              <MockVivaView
                data={data}
                onOpenBooking={handleOpenMockVivaBooking}
                onOpenBrochure={() => setPdfBrochureOpen(true)}
                onRequestQuote={handleOpenQuotation}
              />
            )}

            {currentTab === 'ambassadors' && (
              <AmbassadorsView
                data={data}
                onSelectAmbassador={handleOpenAmbassadorBio}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {(currentTab === 'research-network' || currentTab === 'network') && (
              <ResearchNetworkView
                data={data}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'partners' && (
              <PartnersView
                data={data}
                onRequestQuote={handleOpenQuotation}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'news' && (
              <NewsView
                data={data}
                onOpenArticle={handleOpenArticle}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'careers' && (
              <CareersView
                data={data}
                onApplyJob={handleOpenJobApply}
                onSelectTab={handleSelectTab}
              />
            )}

            {currentTab === 'contact' && (
              <ContactView
                data={data}
                onRefreshData={refreshData}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            onSelectTab={handleSelectTab}
            onOpenAdmin={() => handleSelectTab('admin')}
            contactSettings={data.contactSettings}
            siteContent={data.siteContent}
          />

      {/* Global Interactive Modals */}
      <QuotationModal
        isOpen={quotationModalOpen}
        onClose={() => setQuotationModalOpen(false)}
        serviceTitle={quotationInitialService}
        onSuccess={refreshData}
      />

      <MockVivaBookingModal
        isOpen={mockVivaBookingOpen}
        onClose={() => setMockVivaBookingOpen(false)}
        defaultPackage={mockVivaInitialPackage}
        onSuccess={refreshData}
      />

      <WorkshopRegModal
        isOpen={workshopRegOpen}
        onClose={() => {
          setWorkshopRegOpen(false);
          setSelectedWorkshop(null);
        }}
        workshop={selectedWorkshop}
        onSuccess={refreshData}
      />

      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
      />

      <ArticleModal
        onClose={() => {
          setArticleModalOpen(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
      />

      <AmbassadorBioModal
        onClose={() => {
          setAmbassadorBioModalOpen(false);
          setSelectedAmbassador(null);
        }}
        ambassador={selectedAmbassador}
        onSelectCollab={() => {
          setAmbassadorBioModalOpen(false);
          handleSelectTab('contact');
        }}
      />

      <PdfBrochureModal
        isOpen={pdfBrochureOpen}
        onClose={() => setPdfBrochureOpen(false)}
        onBookNow={() => {
          setPdfBrochureOpen(false);
          handleOpenMockVivaBooking('Professional Preparation Package (8 Weeks · 2 Months)');
        }}
      />

      <JobApplyModal
        onClose={() => {
          setJobApplyOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onSuccess={refreshData}
      />

      <AdminPinModal
        isOpen={adminPinModalOpen}
        onClose={() => setAdminPinModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      <WorkshopAttendanceModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        workshop={attendanceWorkshop}
        data={data}
        onSuccess={refreshData}
      />
    </div>
  );
}
