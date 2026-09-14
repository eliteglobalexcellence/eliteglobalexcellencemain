'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Building2,
  BookOpen,
  GraduationCap,
  Briefcase,
  Inbox,
  ShieldCheck,
  Edit3,
  Trash2,
  Plus,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  Lock,
  LogOut,
  Sliders,
  Sparkles,
  Search,
  Bold,
  Italic,
  Underline,
  List,
  MoveUp,
  MoveDown,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Star,
  ThumbsUp,
  Check,
  X,
  MessageSquare,
  Upload,
  Globe2,
  Mail,
  Layout,
  Bell,
  Award
} from 'lucide-react';
import {
  DatabaseState,
  Ambassador,
  EventItem,
  NewsArticle,
  Partner,
  WorkshopItem,
  CourseItem,
  ResearchMember,
  CareerRole,
  InboxMessage,
  CertificateRecord,
  Testimonial,
  HeroCtaButton,
  ServiceItem,
  ServicesPageContent,
  ServiceSubTrack,
  Workshop,
  WorkshopRegistration,
  WorkshopManagementContent,
  WorkshopTopicItem,
  ActiveConferenceItem,
  FutureConferenceItem,
  ConferenceTimelineRow,
  ConferencesPageContent,
  ExecutiveMember
} from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface RichTextAreaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  helpText?: string;
}

const RichTextArea: React.FC<RichTextAreaProps> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  helpText,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertTag = (openTag: string, closeTag: string) => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = `${openTag}${selectedText}${closeTag}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 50);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-700 text-xs">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition ${showPreview ? 'bg-blue-100 text-[#045494]' : 'text-slate-500 hover:text-slate-900'
            }`}
        >
          <Eye className="w-3 h-3" />
          <span>{showPreview ? 'Edit Editor' : 'Live Preview'}</span>
        </button>
      </div>

      {!showPreview ? (
        <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#045494]">
          {/* Formatting Toolbar */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center gap-1.5 text-slate-600">
            <button
              type="button"
              onClick={() => insertTag('<b>', '</b>')}
              className="p-1 hover:bg-slate-200 rounded text-slate-800 font-bold hover:text-[#045494] cursor-pointer"
              title="Bold <b>"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<i>', '</i>')}
              className="p-1 hover:bg-slate-200 rounded text-slate-800 italic hover:text-[#045494] cursor-pointer"
              title="Italic <i>"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<u>', '</u>')}
              className="p-1 hover:bg-slate-200 rounded text-slate-800 underline hover:text-[#045494] cursor-pointer"
              title="Underline <u>"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1" />
            <button
              type="button"
              onClick={() => insertTag('<span class="text-[#045494] font-bold">', '</span>')}
              className="p-1 hover:bg-blue-100 text-blue-700 rounded cursor-pointer flex items-center gap-1 text-[10px] font-bold"
              title="Highlight Brand Blue"
            >
              <Sparkles className="w-3 h-3 text-[#045494]" />
              <span>Blue Highlight</span>
            </button>
            <button
              type="button"
              onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
              className="p-1 hover:bg-slate-200 rounded text-slate-800 hover:text-[#045494] cursor-pointer"
              title="Bullet List <ul><li>"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-xs border-0 focus:ring-0 focus:outline-none resize-y text-slate-900 bg-white placeholder:text-slate-400 font-medium"
          />
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 text-xs leading-relaxed text-slate-800 min-h-[80px]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#045494] mb-1">HTML Preview:</div>
          <div
            className="prose prose-sm max-w-none [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: value || '<em class="text-slate-400">Empty string</em>' }}
          />
        </div>
      )}
      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
};

interface FileUploaderProps {
  label: string;
  accept: string;
  value: string;
  onChange: (url: string) => void;
  helpText?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  accept,
  value,
  onChange,
  helpText
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('File size exceeds 20MB maximum limit.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      if (res.ok && resData.url) {
        onChange(resData.url);
      } else {
        alert(resData.error || 'Failed to upload file.');
      }
    } catch (err) {
      alert('Network error while uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block font-bold text-slate-700 text-xs">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer ${
          dragOver ? 'border-[#045494] bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          accept={accept}
          id={`file-input-${label.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />
        <label
          htmlFor={`file-input-${label.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
          className="cursor-pointer block space-y-2"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 text-[#045494] flex items-center justify-center mx-auto">
            {uploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              {uploading ? 'Uploading File...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">{helpText || accept}</p>
          </div>
        </label>
      </div>
      {value && (
        <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 truncate">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate flex-1">{value}</span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-rose-500 hover:bg-rose-100 rounded cursor-pointer"
            title="Remove File"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

interface AdminViewProps {
  data: DatabaseState;
  onRefreshData: () => void;
  onExitAdmin?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  data,
  onRefreshData,
  onExitAdmin,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string>('');
  const [actionError, setActionError] = useState<string>('');

  // Site content state for editing
  const [contentForm, setContentForm] = useState(
    data?.siteContent || initialDatabase.siteContent
  );
  const [homepageSectionTab, setHomepageSectionTab] = useState<'hero' | 'about' | 'globalReach' | 'testimonials'>('hero');
  const [aboutSectionTab, setAboutSectionTab] = useState<'hero' | 'mission' | 'commitments' | 'governance'>('hero');
  const [servicesSectionTab, setServicesSectionTab] = useState<'hero' | 'services' | 'closing'>('hero');
  const [editingServiceModal, setEditingServiceModal] = useState<ServiceItem | null>(null);

  // Workshop Management States
  const [workshopManagementTab, setWorkshopManagementTab] = useState<'content' | 'upcoming' | 'past' | 'attendance'>('upcoming');
  const [editingWorkshopModal, setEditingWorkshopModal] = useState<Workshop | null>(null);
  const [viewingRegistrationsModal, setViewingRegistrationsModal] = useState<Workshop | null>(null);
  const [viewingAttendancesModal, setViewingAttendancesModal] = useState<Workshop | null>(null);
  const [editingParticipantModal, setEditingParticipantModal] = useState<WorkshopRegistration | null>(null);
  const [viewingParticipantModal, setViewingParticipantModal] = useState<WorkshopRegistration | null>(null);

  // Courses Management & Mock Viva States
  const [coursesSubTab, setCoursesSubTab] = useState<'content' | 'manageCourses'>('manageCourses');
  const [editingCourseModal, setEditingCourseModal] = useState<CourseItem | null>(null);

  const [mockVivaSubTab, setMockVivaSubTab] = useState<'hero' | 'realities' | 'methodology' | 'packages' | 'proposal' | 'faqs' | 'brochure'>('hero');

  // Ambassadors & Research Network States
  const [ambassadorsSubTab, setAmbassadorsSubTab] = useState<'content' | 'manageAmbassadors'>('manageAmbassadors');
  const [editingAmbassadorModal, setEditingAmbassadorModal] = useState<Ambassador | null>(null);

  const [researchNetworkSubTab, setResearchNetworkSubTab] = useState<'content' | 'manageResearchNetwork'>('manageResearchNetwork');
  const [editingResearchMemberModal, setEditingResearchMemberModal] = useState<ResearchMember | null>(null);

  useEffect(() => {
    if (data?.siteContent) {
      setContentForm((prev) => ({
        ...prev,
        ...data.siteContent,
      }));
    }
  }, [data?.siteContent]);

  // Partners, Careers, News, Contact, Conferences & Inbox States
  const [partnersSubTab, setPartnersSubTab] = useState<'managePartners' | 'content'>('managePartners');
  const [editingPartnerModal, setEditingPartnerModal] = useState<Partner | null>(null);

  const [careersSubTab, setCareersSubTab] = useState<'manageCareers' | 'content'>('manageCareers');
  const [editingCareerRoleModal, setEditingCareerRoleModal] = useState<CareerRole | null>(null);

  const [newsSubTab, setNewsSubTab] = useState<'manageNews' | 'content'>('manageNews');
  const [editingNewsArticleModal, setEditingNewsArticleModal] = useState<NewsArticle | null>(null);

  const [conferencesSubTab, setConferencesSubTab] = useState<'active' | 'future' | 'content'>('active');
  const [editingActiveConfModal, setEditingActiveConfModal] = useState<ActiveConferenceItem | null>(null);
  const [editingFutureConfModal, setEditingFutureConfModal] = useState<FutureConferenceItem | null>(null);
  const [editingTimelineRowModal, setEditingTimelineRowModal] = useState<ConferenceTimelineRow | null>(null);
  const [editingGovMemberModal, setEditingGovMemberModal] = useState<ExecutiveMember | null>(null);

  const [viewingInboxMessageModal, setViewingInboxMessageModal] = useState<InboxMessage | null>(null);

  // Filter for inbox
  const [inboxFilter, setInboxFilter] = useState('ALL');
  const [testimonialFilter, setTestimonialFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('PENDING');

  // Modal / form states for item creation or editing
  const [editingItem, setEditingItem] = useState<{ type: string; item: any } | null>(null);

  const showFeedback = (successMsg?: string, errorMsg?: string) => {
    if (successMsg) {
      setActionSuccess(successMsg);
      setTimeout(() => setActionSuccess(''), 4000);
    }
    if (errorMsg) {
      setActionError(errorMsg);
      setTimeout(() => setActionError(''), 5000);
    }
  };

  const notifyDataChanged = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ege_data_last_saved', Date.now().toString());
      try {
        window.localStorage.setItem('ege_cached_database', JSON.stringify(data));
      } catch (e) {}
      window.dispatchEvent(new Event('ege_data_updated'));
      try {
        const bc = new BroadcastChannel('ege_admin_sync');
        bc.postMessage('refresh');
        bc.close();
      } catch (e) {}
    }
  };

  const handleAdminCrud = async (action: 'CREATE' | 'UPDATE' | 'DELETE', entity: string, payload: any) => {
    // Enforce unique Workshop ID validation for workshops
    if ((action === 'CREATE' || action === 'UPDATE') && entity === 'workshops') {
      const targetWsId = (payload.workshopId || `EGEW${payload.id || ''}`).trim().toUpperCase();
      if (!targetWsId) {
        showFeedback(undefined, 'Workshop ID cannot be empty.');
        return;
      }
      const existing = (data.workshops || []).find(
        (w) => String(w.id) !== String(payload.id) &&
               (w.workshopId || `EGEW${w.id}`).trim().toUpperCase() === targetWsId
      );
      if (existing) {
        showFeedback(undefined, `Error: Workshop ID "${targetWsId}" is already assigned to another workshop ("${existing.title}"). Workshop ID must be unique!`);
        return;
      }
    }

    // 1. INSTANT OPTIMISTIC IN-MEMORY STATE UPDATE (< 20ms)
    try {
      if (action === 'DELETE') {
        if (entity === 'workshops') data.workshops = (data.workshops || []).filter((w) => String(w.id) !== String(payload.id));
        else if (entity === 'events') data.events = (data.events || []).filter((e) => String(e.id) !== String(payload.id));
        else if (entity === 'newsArticles' || entity === 'news') data.newsArticles = (data.newsArticles || []).filter((n) => String(n.id) !== String(payload.id));
        else if (entity === 'ambassadors') data.ambassadors = (data.ambassadors || []).filter((a) => String(a.id) !== String(payload.id));
        else if (entity === 'courses') data.courses = (data.courses || []).filter((c) => String(c.id) !== String(payload.id));
        else if (entity === 'researchMembers') data.researchMembers = (data.researchMembers || []).filter((r) => String(r.id) !== String(payload.id));
        else if (entity === 'partners') data.partners = (data.partners || []).filter((p) => String(p.id) !== String(payload.id));
        else if (entity === 'careerRoles' || entity === 'careers') {
          data.careerRoles = (data.careerRoles || []).filter((cr) => String(cr.id) !== String(payload.id));
          data.careers = data.careerRoles;
        } else if (entity === 'inbox' || entity === 'inboxMessages') {
          data.inboxMessages = (data.inboxMessages || []).filter((m) => String(m.id) !== String(payload.id));
          data.inbox = data.inboxMessages;
        } else if (entity === 'workshopRegistrations') data.workshopRegistrations = (data.workshopRegistrations || []).filter((r) => String(r.id) !== String(payload.id) && String(r.registrationId || '') !== String(payload.registrationId || payload.id || ''));
        else if (entity === 'workshopAttendances') data.workshopAttendances = (data.workshopAttendances || []).filter((a) => String(a.id) !== String(payload.id));
        else if (entity === 'testimonials') {
          if (data.siteContent) {
            data.siteContent.testimonials = (data.siteContent.testimonials || []).filter((t: any) => String(t.id) !== String(payload.id));
          }
        }
      } else if (action === 'CREATE') {
        const newItem = { ...payload, id: payload.id || Date.now() };
        if (entity === 'workshops') data.workshops = [newItem, ...(data.workshops || [])];
        else if (entity === 'events') data.events = [newItem, ...(data.events || [])];
        else if (entity === 'newsArticles' || entity === 'news') data.newsArticles = [newItem, ...(data.newsArticles || [])];
        else if (entity === 'ambassadors') data.ambassadors = [newItem, ...(data.ambassadors || [])];
        else if (entity === 'courses') data.courses = [newItem, ...(data.courses || [])];
        else if (entity === 'researchMembers') data.researchMembers = [newItem, ...(data.researchMembers || [])];
        else if (entity === 'partners') data.partners = [newItem, ...(data.partners || [])];
        else if (entity === 'careerRoles' || entity === 'careers') {
          data.careerRoles = [newItem, ...(data.careerRoles || [])];
          data.careers = data.careerRoles;
        } else if (entity === 'inbox' || entity === 'inboxMessages') {
          data.inboxMessages = [newItem, ...(data.inboxMessages || [])];
          data.inbox = data.inboxMessages;
        }
      } else if (action === 'UPDATE') {
        const updateList = (arr?: any[]) =>
          (arr || []).map((item) => (String(item.id) === String(payload.id) ? { ...item, ...payload } : item));

        if (entity === 'workshops') data.workshops = updateList(data.workshops);
        else if (entity === 'events') data.events = updateList(data.events);
        else if (entity === 'newsArticles' || entity === 'news') data.newsArticles = updateList(data.newsArticles);
        else if (entity === 'ambassadors') data.ambassadors = updateList(data.ambassadors);
        else if (entity === 'courses') data.courses = updateList(data.courses);
        else if (entity === 'researchMembers') data.researchMembers = updateList(data.researchMembers);
        else if (entity === 'partners') data.partners = updateList(data.partners);
        else if (entity === 'careerRoles' || entity === 'careers') {
          data.careerRoles = updateList(data.careerRoles);
          data.careers = data.careerRoles;
        } else if (entity === 'inbox' || entity === 'inboxMessages') {
          data.inboxMessages = updateList(data.inboxMessages);
          data.inbox = data.inboxMessages;
        } else if (entity === 'workshopRegistrations') data.workshopRegistrations = updateList(data.workshopRegistrations);
        else if (entity === 'workshopAttendances') data.workshopAttendances = updateList(data.workshopAttendances);
        else if (entity === 'testimonials') {
          if (data.siteContent) {
            data.siteContent.testimonials = updateList(data.siteContent.testimonials);
          }
        }
      }
    } catch (e) {
      console.error('Optimistic state update error:', e);
    }

    // 2. NOTIFY ALL LISTENERS INSTANTLY
    notifyDataChanged();

    // Close any open modals
    setEditingItem(null);
    setEditingWorkshopModal(null);
    setEditingCourseModal(null);
    setEditingAmbassadorModal(null);
    setEditingResearchMemberModal(null);
    setEditingPartnerModal(null);
    setEditingCareerRoleModal(null);
    setEditingNewsArticleModal(null);
    setEditingActiveConfModal(null);
    setEditingFutureConfModal(null);
    setEditingParticipantModal(null);

    const actionText = action === 'DELETE' ? 'deleted' : action === 'CREATE' ? 'created' : 'updated';
    showFeedback(`✓ Successfully ${actionText} ${entity}.`);

    // 3. NON-BLOCKING BACKGROUND SERVER PERSISTENCE
    try {
      fetch('/api/admin/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || 'EGE2026!Admin',
        },
        body: JSON.stringify({ action, entity, payload }),
      }).then(async (res) => {
        if (res.ok) {
          onRefreshData();
        } else {
          const errData = await res.json().catch(() => ({}));
          showFeedback(undefined, errData.error || `Server error during ${actionText} ${entity}`);
        }
      }).catch((err) => {
        console.error('Background CRUD sync error:', err);
      });
    } catch (err) {
      console.error('Network dispatch error:', err);
    }
  };

  const handleSaveSiteContent = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Instant optimistic update
    data.siteContent = contentForm;
    notifyDataChanged();
    showFeedback('✓ Site content saved successfully!');

    // Background server save
    try {
      const res = await fetch('/api/admin/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || 'EGE2026!Admin',
        },
        body: JSON.stringify({
          action: 'UPDATE',
          entity: 'siteContent',
          payload: contentForm,
        }),
      });
      if (res.ok) {
        if (onRefreshData) onRefreshData();
        notifyDataChanged();
      } else {
        const errData = await res.json().catch(() => ({}));
        showFeedback(undefined, errData.error || 'Server error saving site content.');
      }
    } catch (err) {
      console.error('Network error saving site content:', err);
    }
  };

  const handleSaveDirectSiteContent = async (updatedSiteContent: any) => {
    // Instant optimistic update
    data.siteContent = updatedSiteContent;
    setContentForm(updatedSiteContent);
    notifyDataChanged();
    showFeedback('✓ Changes saved successfully!');

    // Background server save
    try {
      fetch('/api/admin/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET || 'EGE2026!Admin',
        },
        body: JSON.stringify({
          action: 'UPDATE',
          entity: 'siteContent',
          payload: updatedSiteContent,
        }),
      }).then(async (res) => {
        if (res.ok) {
          onRefreshData();
        } else {
          const errData = await res.json().catch(() => ({}));
          showFeedback(undefined, errData.error || 'Server error updating site content.');
        }
      }).catch((err) => {
        console.error('Background site content sync error:', err);
      });
    } catch (err) {
      console.error('Network error updating site content:', err);
    }
  };

  const handleResetDatabase = async () => {
    if (!confirm('Are you sure you want to reset all data back to the default factory seed state?')) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/db/reset', { method: 'POST' });
      if (res.ok) {
        showFeedback('Database reset to factory seeds successfully!');
        onRefreshData();
      } else {
        showFeedback(undefined, 'Failed to reset database.');
      }
    } catch (err) {
      showFeedback(undefined, 'Error contacting database reset service.');
    } finally {
      setLoading(false);
    }
  };

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const contactMessages = (data.inbox || data.inboxMessages || []).filter((msg: any) => {
    if (msg.metadata?.isContactPageSubmission || msg.metadata?.source === 'Website Contact Page') return true;
    if (msg.metadata?.source === 'Workshop Modal' || msg.metadata?.source === 'Quotation Modal' || msg.metadata?.source === 'Mock Viva Modal' || msg.metadata?.source === 'Job Modal') return false;
    if (['CONTACT', 'GENERAL_CONTACT', 'CONFERENCE_INQUIRY', 'General Information', 'General Inquiry', 'Academic Partnership', 'Conference Sponsorship', 'Journal Publication', 'Consultancy / Custom Training', 'Other'].includes(msg.type)) return true;
    return false;
  });
  const unreadInboxCount = contactMessages.filter((m) => m.status === 'NEW' || m.status === 'UNREAD').length;

  // Compute live activity notifications from user-side actions
  const activityNotifications = React.useMemo(() => {
    const list: Array<{
      id: string;
      user: string;
      type: string;
      title: string;
      message: string;
      time: string;
      isNew: boolean;
    }> = [];

    // Workshop Registrations
    (data.workshopRegistrations || []).forEach((reg) => {
      list.push({
        id: `reg-${reg.id}`,
        user: reg.fullName,
        type: 'WORKSHOP_REGISTRATION',
        title: `Workshop Registration: ${reg.workshopId || 'EGE Event'}`,
        message: `${reg.fullName} registered for ${reg.institute || 'Workshop'} (${reg.country || 'Malaysia'})`,
        time: reg.registeredAt || 'Today',
        isNew: !reg.attended,
      });
    });

    // Inbox messages & inquiries
    (data.inbox || data.inboxMessages || []).forEach((msg) => {
      const typeLabel = msg.type || 'INQUIRY';
      list.push({
        id: `msg-${msg.id}`,
        user: msg.name || msg.fullName || 'Visitor',
        type: typeLabel,
        title: msg.subject || `${typeLabel} Submission`,
        message: `${msg.name || 'User'}: ${(msg.message || '').substring(0, 65)}${(msg.message || '').length > 65 ? '...' : ''}`,
        time: String(msg.createdAt || msg.timestamp || 'Recent'),
        isNew: msg.status === 'NEW' || msg.status === 'UNREAD',
      });
    });

    return list.slice(0, 10);
  }, [data.inbox, data.inboxMessages, data.workshopRegistrations]);

  const unreadNotifCount = activityNotifications.filter((n) => n.isNew).length;

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#045494] text-white flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-300">
              EGE Content Control Engine
            </span>
            <h1 className="text-sm font-bold text-white">Central Admin Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Top Notifications Bell & Popover */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer flex items-center gap-1.5"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-blue-300" />
              {unreadNotifCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse shadow-xs">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#045494]" />
                    <span className="font-bold text-sm text-slate-900">User Activity Notifications</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-[#045494] px-2 py-0.5 rounded-full border border-blue-100">
                    {unreadNotifCount} New
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 space-y-1 text-xs">
                  {activityNotifications.length > 0 ? (
                    activityNotifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{n.user}</span>
                          <span className="text-[9px] font-bold uppercase bg-blue-50 text-[#045494] px-1.5 py-0.5 rounded border border-blue-100">
                            {n.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-semibold line-clamp-1">{n.title}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{n.message}</p>
                        <div className="text-[10px] text-slate-400 font-mono pt-0.5">{n.time}</div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-400 text-xs">No recent notifications.</div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(false);
                      setActiveSubTab('inbox');
                    }}
                    className="text-[#045494] font-bold hover:underline"
                  >
                    View All Inbox →
                  </button>
                  <button
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-slate-500 hover:text-slate-800 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Feedback Banners */}
      {actionSuccess && (
        <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 text-center flex items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}
      {actionError && (
        <div className="bg-rose-600 text-white text-xs font-semibold px-4 py-2.5 text-center flex items-center justify-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Admin Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs h-fit">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'siteContent', label: 'Homepage Content', icon: Sliders },
              { id: 'aboutContent', label: 'About Us Content', icon: BookOpen },
              { id: 'servicesContent', label: 'Our Services Content', icon: Briefcase },
              { id: 'workshopManagement', label: 'Workshop Management', icon: Calendar },
              { id: 'coursesManagement', label: 'Courses Management', icon: BookOpen },
              { id: 'mockVivaManagement', label: 'Mock Viva', icon: GraduationCap },
              { id: 'ambassadorsManagement', label: 'Global Advisory Board', icon: Users },
              { id: 'researchNetworkManagement', label: 'Research Network', icon: Globe2 },
              { id: 'partnersManagement', label: 'Partners', icon: Building2 },
              { id: 'careersManagement', label: 'Career', icon: Briefcase },
              { id: 'newsManagement', label: 'News', icon: Newspaper },
              { id: 'contactManagement', label: 'Contact', icon: Mail },
              { id: 'conferencesManagement', label: 'Conferences', icon: Calendar },
              { id: 'inbox', label: 'Message (Inbox)', icon: Inbox, alert: unreadInboxCount > 0 },
              { id: 'footerContent', label: 'Footer Content', icon: Layout },
            ].map((tab: { id: string; label: string; icon: any; alert?: boolean }) => {
              const IconComp = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    setEditingItem(null);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition ${isActive
                    ? 'bg-[#045494] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </aside>

          {/* Admin Main Content Workspace */}
          <main className="lg:col-span-9 space-y-5">
            {/* OVERVIEW SUB-TAB */}
            {activeSubTab === 'overview' && (
              <div className="space-y-5">
                {/* 5. Important Insights Header */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Important Insights</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Real-time overview of key platform statistics, advisory board, research network, partner alliances, and user activities.
                  </p>
                </div>

                {/* 6. Dynamic Main Countings */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-[#045494]">{(data.ambassadors || []).length}</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Global Advisory Board</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-[#045494]">{(data.researchMembers || []).length}</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Research Network</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-[#045494]">{(data.partners || []).length}</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Partners & MoUs</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-[#045494]">{(data.workshops || []).length + (data.events || []).length}</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Events & Workshops</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-amber-600">{unreadInboxCount}</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Unread Inquiries</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
                    <div className="text-2xl font-black text-emerald-600">14,280+</div>
                    <div className="text-[11px] font-bold text-slate-700 leading-tight">Total Website Visitors</div>
                  </div>
                </div>

                {/* 3 & 4. Recent Activity Notifications (Replaces old Inbound Inquiries box) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center font-bold">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Recent Activity Notifications</h3>
                        <p className="text-xs text-slate-500 font-medium">Real-time alerts when users register, book, or submit inquiries from the website.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('inbox')}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-[#045494] font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      View All Inbox ({unreadInboxCount} Unread)
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {activityNotifications.length > 0 ? (
                      activityNotifications.map((notif) => (
                        <div key={notif.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-xl transition">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#045494] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-blue-100">
                              {notif.user ? notif.user.charAt(0).toUpperCase() : 'N'}
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-900">{notif.user}</span>
                                <span className="bg-blue-50 text-[#045494] text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                                  {notif.type}
                                </span>
                                {notif.isNew && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="text-slate-800 font-semibold">{notif.title}</div>
                              <p className="text-slate-500 text-[11px] line-clamp-1">{notif.message}</p>
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono shrink-0 sm:text-right">
                            {notif.time}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-slate-400">No recent activity notifications.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SITE CONTENT SUB-TAB */}
            {activeSubTab === 'siteContent' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Homepage Content</h2>
                    <p className="text-xs text-slate-500">Live controls for landing page texts, hero badges, CTA buttons, and metric cards.</p>
                  </div>
                </div>

                {/* Homepage Section Navigation Bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                  {[
                    { id: 'hero', label: '1. Hero & Metric Cards' },
                    { id: 'about', label: '2. Connecting Minds Section' },
                    { id: 'globalReach', label: '3. Global Reach & Where We Work' },
                    { id: 'testimonials', label: '4. Testimonial Reviews' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setHomepageSectionTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${homepageSectionTab === tab.id
                        ? 'bg-[#045494] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                  {/* TAB 1: HERO & HERO METRICS */}
                  {homepageSectionTab === 'hero' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Hero Banner & Live Metrics Editor</div>
                        <p className="text-[11px] text-slate-600">Customize main headline text, supporting paragraph, call-to-action buttons, and key stat cards. Any changes here reflect live on the homepage.</p>
                      </div>

                      {/* Main Hero Title at the Top */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">
                          Main Hero Title / Brand Headline
                        </label>
                        <input
                          type="text"
                          value={contentForm.heroTitle || contentForm.heroHeadline || ''}
                          onChange={(e) => setContentForm({ ...contentForm, heroTitle: e.target.value, heroHeadline: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-sm bg-white text-slate-900 placeholder:text-slate-400 shadow-2xs"
                          placeholder="Elite Global Excellence (EGE)"
                        />
                      </div>

                      {/* Hero Top Badges Rotator Manager (Add, Edit, Delete Sub-headlines) */}
                      {(() => {
                        const badgesList = (contentForm.heroBadges && contentForm.heroBadges.length > 0)
                          ? contentForm.heroBadges
                          : [
                            'WHERE RESEARCH MEETS EXCELLENCE',
                            'SUPPORTING EXCELLENCE AT EVERY RESEARCH STAGE',
                            'ADVANCING ACADEMIC PUBLISHING & INNOVATION',
                            'BRIDGING RESEARCHERS, UNIVERSITIES & INDUSTRY WORLDWIDE',
                          ];
                        return (
                          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  Rotating Hero Sub-headlines / Badges ({badgesList.length} Items)
                                </h3>
                                <p className="text-[11px] text-slate-500">Sub-headlines rotate automatically on top of the hero section. Admin can add, edit, or delete items.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...badgesList, 'NEW SUB-HEADLINE TEXT'];
                                  setContentForm({ ...contentForm, heroBadges: updated, heroPill: updated[0] });
                                }}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Sub-headline</span>
                              </button>
                            </div>

                            <div className="space-y-2">
                              {badgesList.map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-slate-400 w-6">#{idx + 1}</span>
                                  <input
                                    type="text"
                                    value={badge}
                                    onChange={(e) => {
                                      const updated = [...badgesList];
                                      updated[idx] = e.target.value;
                                      setContentForm({ ...contentForm, heroBadges: updated, heroPill: updated[0] });
                                    }}
                                    className="flex-1 px-3 py-1.5 border border-slate-300 bg-white rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#045494] text-slate-900 placeholder:text-slate-400 shadow-2xs"
                                    placeholder="Sub-headline text..."
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (badgesList.length <= 1) {
                                        alert('You must keep at least one sub-headline.');
                                        return;
                                      }
                                      const updated = badgesList.filter((_, i) => i !== idx);
                                      setContentForm({ ...contentForm, heroBadges: updated, heroPill: updated[0] });
                                    }}
                                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                    title="Delete sub-headline"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      <div>
                        <RichTextArea
                          label="Hero Supporting Statement / Paragraph"
                          value={contentForm.heroStatement || ''}
                          onChange={(val) => setContentForm({ ...contentForm, heroStatement: val })}
                          rows={3}
                          placeholder="Aspire, Achieve, Advance with EGE. Bridging borders, empowering researchers, and advancing scientific knowledge across 33+ nations worldwide."
                          helpText="Use formatting buttons to apply bold, italic, underline, brand blue text highlights, or bullet lists."
                        />
                      </div>

                      {/* Hero Custom Action Buttons (CTA Linkage Manager) */}
                      {(() => {
                        const ctaList = (contentForm.heroCtaButtons && contentForm.heroCtaButtons.length > 0)
                          ? contentForm.heroCtaButtons
                          : [
                            { id: 'cta-1', label: contentForm.heroPrimaryCtaText || 'Check Upcoming Events', targetTab: 'workshops', variant: 'primary' },
                            { id: 'cta-2', label: contentForm.heroSecondaryCtaText || 'View All Services', targetTab: 'services', variant: 'secondary' },
                          ];
                        return (
                          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  Hero Call-To-Action (CTA) Navigation Buttons ({ctaList.length} Buttons)
                                </h3>
                                <p className="text-[11px] text-slate-500">Add buttons, customize button titles, select destination page interface, and set button styles.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newBtn: HeroCtaButton = {
                                    id: `cta-${Date.now()}`,
                                    label: 'New Action Link',
                                    targetTab: 'conferences',
                                    variant: 'primary',
                                  };
                                  const updated = [...ctaList, newBtn];
                                  setContentForm({
                                    ...contentForm,
                                    heroCtaButtons: updated,
                                    heroPrimaryCtaText: updated[0]?.label,
                                    heroSecondaryCtaText: updated[1]?.label,
                                  });
                                }}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add CTA Button</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {ctaList.map((btn, idx) => (
                                <div key={btn.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 relative shadow-2xs">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                    <span className="font-bold text-[#045494] text-[11px] uppercase tracking-wider">Button #{idx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (ctaList.length <= 1) {
                                          alert('At least one CTA button must be active.');
                                          return;
                                        }
                                        const updated = ctaList.filter((_, i) => i !== idx);
                                        setContentForm({
                                          ...contentForm,
                                          heroCtaButtons: updated,
                                          heroPrimaryCtaText: updated[0]?.label,
                                          heroSecondaryCtaText: updated[1]?.label,
                                        });
                                      }}
                                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer"
                                      title="Remove Button"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Button Label / Title</label>
                                    <input
                                      type="text"
                                      value={btn.label}
                                      onChange={(e) => {
                                        const updated = [...ctaList];
                                        updated[idx] = { ...updated[idx], label: e.target.value };
                                        setContentForm({
                                          ...contentForm,
                                          heroCtaButtons: updated,
                                          heroPrimaryCtaText: updated[0]?.label,
                                          heroSecondaryCtaText: updated[1]?.label,
                                        });
                                      }}
                                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Link Target Interface</label>
                                      <select
                                        value={btn.targetTab}
                                        onChange={(e) => {
                                          const updated = [...ctaList];
                                          updated[idx] = { ...updated[idx], targetTab: e.target.value };
                                          setContentForm({ ...contentForm, heroCtaButtons: updated });
                                        }}
                                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-900 font-medium focus:ring-2 focus:ring-[#045494]"
                                      >
                                        <option value="workshops">Workshops / Events</option>
                                        <option value="services">Our Services & Publishing</option>
                                        <option value="conferences">EGE Conferences</option>
                                        <option value="courses">Academic Courses</option>
                                        <option value="mock-viva">Mock Viva Preparation</option>
                                        <option value="ambassadors">Ambassadors Network</option>
                                        <option value="partners">Partners & MoUs</option>
                                        <option value="news">News & Announcements</option>
                                        <option value="contact">Contact & Inquiry</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Button Theme Style</label>
                                      <select
                                        value={btn.variant || 'primary'}
                                        onChange={(e) => {
                                          const updated = [...ctaList];
                                          updated[idx] = { ...updated[idx], variant: e.target.value };
                                          setContentForm({ ...contentForm, heroCtaButtons: updated });
                                        }}
                                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-900 font-medium focus:ring-2 focus:ring-[#045494]"
                                      >
                                        <option value="primary">Primary Blue Button</option>
                                        <option value="secondary">Secondary White Button</option>
                                        <option value="dark">Slate Dark Button</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Metric Cards Editor (Add, Delete, Edit, Reorder) */}
                      {(() => {
                        const metricsList = (contentForm.metrics && contentForm.metrics.length > 0)
                          ? contentForm.metrics
                          : [
                            { count: contentForm.stats?.collaborators || '50+', label: 'Academic Collaborators', subtext: 'Global university network' },
                            { count: contentForm.stats?.database || '8,000+', label: 'Researchers Database', subtext: 'Active scholars & authors' },
                            { count: contentForm.stats?.countries || '33+', label: 'Countries Worldwide', subtext: 'Asia, Europe & Americas' },
                            { count: contentForm.stats?.events || '30+', label: 'Successful Events Delivered', subtext: 'Conferences & workshops' },
                          ];
                        return (
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  Homepage Metric Cards ({metricsList.length} Cards)
                                </h3>
                                <p className="text-[11px] text-slate-500">Add new cards, delete cards, update counts/labels, or reorder metric items.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...metricsList, { count: '100+', label: 'New Metric Card', subtext: 'Custom achievement' }];
                                  setContentForm({ ...contentForm, metrics: updated });
                                }}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Metric Card</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {metricsList.map((metric, idx) => (
                                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 relative group">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="font-bold text-[#045494] text-xs uppercase tracking-wider">
                                      Card #{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => {
                                          const updated = [...metricsList];
                                          const temp = updated[idx];
                                          updated[idx] = updated[idx - 1];
                                          updated[idx - 1] = temp;
                                          setContentForm({ ...contentForm, metrics: updated });
                                        }}
                                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 cursor-pointer"
                                        title="Move Up"
                                      >
                                        <MoveUp className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === metricsList.length - 1}
                                        onClick={() => {
                                          const updated = [...metricsList];
                                          const temp = updated[idx];
                                          updated[idx] = updated[idx + 1];
                                          updated[idx + 1] = temp;
                                          setContentForm({ ...contentForm, metrics: updated });
                                        }}
                                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 cursor-pointer"
                                        title="Move Down"
                                      >
                                        <MoveDown className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (metricsList.length <= 1) {
                                            alert('You must keep at least one metric card.');
                                            return;
                                          }
                                          const updated = metricsList.filter((_, i) => i !== idx);
                                          setContentForm({ ...contentForm, metrics: updated });
                                        }}
                                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer ml-1"
                                        title="Delete Metric Card"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-1">
                                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Count / Value</label>
                                      <input
                                        type="text"
                                        value={metric.count}
                                        onChange={(e) => {
                                          const updated = [...metricsList];
                                          updated[idx] = { ...updated[idx], count: e.target.value };
                                          setContentForm({ ...contentForm, metrics: updated });
                                        }}
                                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Label / Title</label>
                                      <input
                                        type="text"
                                        value={metric.label}
                                        onChange={(e) => {
                                          const updated = [...metricsList];
                                          updated[idx] = { ...updated[idx], label: e.target.value };
                                          setContentForm({ ...contentForm, metrics: updated });
                                        }}
                                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Subtext / Description</label>
                                    <input
                                      type="text"
                                      value={metric.subtext}
                                      onChange={(e) => {
                                        const updated = [...metricsList];
                                        updated[idx] = { ...updated[idx], subtext: e.target.value };
                                        setContentForm({ ...contentForm, metrics: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 2: CONNECTING MINDS SECTION */}
                  {homepageSectionTab === 'about' && (
                    <div className="space-y-6 animate-in fade-in">
                      {/* Connecting Minds Core Controls */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                        <div className="border-b border-slate-200 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">
                            Connecting Minds Section Controls
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Customize the headline, main body paragraph, action button, link target, and featured YouTube video link.
                          </p>
                        </div>

                        {/* Heading Input */}
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">
                            Section Heading / Title
                          </label>
                          <input
                            type="text"
                            value={contentForm.connectingMindsHeading || 'Connecting Minds'}
                            onChange={(e) => setContentForm({ ...contentForm, connectingMindsHeading: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-sm bg-white text-slate-900 placeholder:text-slate-400"
                            placeholder="Connecting Minds"
                          />
                        </div>

                        {/* Rich Text Body */}
                        <div>
                          <RichTextArea
                            label="Connecting Minds Main Body Paragraph"
                            value={contentForm.connectingMindsBody || ''}
                            onChange={(val) => setContentForm({ ...contentForm, connectingMindsBody: val })}
                            rows={4}
                            helpText="Supports rich text formatting (bold, italics, underline, brand blue highlights). Rendered live on the homepage."
                          />
                        </div>

                        {/* Primary Action Button Customization */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                          <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Button Customization</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Label</label>
                              <input
                                type="text"
                                value={contentForm.connectingMindsPrimaryBtnText || 'Explore more'}
                                onChange={(e) => setContentForm({ ...contentForm, connectingMindsPrimaryBtnText: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Explore more"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Link Target Interface</label>
                              <select
                                value={contentForm.connectingMindsPrimaryBtnTarget || 'about'}
                                onChange={(e) => setContentForm({ ...contentForm, connectingMindsPrimaryBtnTarget: e.target.value })}
                                className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-900 font-medium"
                              >
                                <option value="about">About EGE / Mission</option>
                                <option value="services">Our Services</option>
                                <option value="workshops">Workshops & Training</option>
                                <option value="conferences">Conferences</option>
                                <option value="courses">Academic Courses</option>
                                <option value="research-network">Research Network</option>
                                <option value="partners">Partners & MoUs</option>
                                <option value="contact">Contact Us</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* YouTube Video URL Field */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                          <label className="block font-bold text-slate-700 text-xs flex items-center justify-between">
                            <span>Featured YouTube Video Link</span>
                            <span className="text-[10px] text-slate-400 font-mono">e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ</span>
                          </label>
                          <input
                            type="text"
                            value={contentForm.connectingMindsVideoUrl || ''}
                            onChange={(e) => setContentForm({ ...contentForm, connectingMindsVideoUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 bg-white placeholder:text-slate-400"
                            placeholder="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
                          />
                          <p className="text-[11px] text-slate-500">
                            Paste any YouTube link or video ID. The video will be embedded live inside the Featured Video Showcase on the homepage.
                          </p>
                        </div>
                      </div>

                      {/* Homepage Sections Customization Controls inside Connecting Minds Section */}
                      <div className="space-y-4 pt-2">
                        <div className="border-b border-slate-200 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">
                            Homepage Sections Content & Buttons Customization
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Fully customize section badges, titles, subtitles/descriptions, button labels, and target links across the homepage sections.
                          </p>
                        </div>

                        {/* 1. Upcoming Events Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            1. Upcoming Events Section (WHAT’S NEXT)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.upcomingEventsBadge || 'WHAT’S NEXT'}
                                onChange={(e) => setContentForm({ ...contentForm, upcomingEventsBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="WHAT’S NEXT"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.upcomingEventsTitle || 'Upcoming Events'}
                                onChange={(e) => setContentForm({ ...contentForm, upcomingEventsTitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Upcoming Events"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Subtitle / Description</label>
                            <textarea
                              value={contentForm.upcomingEventsSubtitle || 'Discover our latest workshops, webinars, and education fairs designed to help you on your academic journey.'}
                              onChange={(e) => setContentForm({ ...contentForm, upcomingEventsSubtitle: e.target.value })}
                              rows={2}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                              placeholder="Discover our latest workshops, webinars, and education fairs..."
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Label</label>
                              <input
                                type="text"
                                value={contentForm.upcomingEventsCtaText || 'View All Conferences & Events'}
                                onChange={(e) => setContentForm({ ...contentForm, upcomingEventsCtaText: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="View All Conferences & Events"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Action Target Link</label>
                              <input
                                type="text"
                                value={contentForm.upcomingEventsCtaLink || 'conferences'}
                                onChange={(e) => setContentForm({ ...contentForm, upcomingEventsCtaLink: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                                placeholder="conferences or https://..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. What We Offer / Services Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            2. Services Section (WHAT WE OFFER)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.servicesSectionBadge || 'WHAT WE OFFER'}
                                onChange={(e) => setContentForm({ ...contentForm, servicesSectionBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="WHAT WE OFFER"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.servicesSectionTitle || 'Our Services'}
                                onChange={(e) => setContentForm({ ...contentForm, servicesSectionTitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Our Services"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Subtitle / Description</label>
                            <textarea
                              value={contentForm.servicesSectionSubtitle || 'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.'}
                              onChange={(e) => setContentForm({ ...contentForm, servicesSectionSubtitle: e.target.value })}
                              rows={2}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                              placeholder="Comprehensive academic and research services..."
                            />
                          </div>
                        </div>

                        {/* 3. Moments That Matter / Events Gallery Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            3. Events Gallery Section (MOMENTS THAT MATTER)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.eventsGalleryBadge || 'MOMENTS THAT MATTER'}
                                onChange={(e) => setContentForm({ ...contentForm, eventsGalleryBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="MOMENTS THAT MATTER"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.eventsGalleryTitle || 'Events Gallery'}
                                onChange={(e) => setContentForm({ ...contentForm, eventsGalleryTitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Events Gallery"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Label</label>
                              <input
                                type="text"
                                value={contentForm.eventsGalleryCtaText || 'View All Past Events'}
                                onChange={(e) => setContentForm({ ...contentForm, eventsGalleryCtaText: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="View All Past Events"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Action Target Link</label>
                              <input
                                type="text"
                                value={contentForm.eventsGalleryCtaLink || 'workshops'}
                                onChange={(e) => setContentForm({ ...contentForm, eventsGalleryCtaLink: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                                placeholder="workshops or https://..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 4. Trusted Collaborators Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            4. Trusted Collaborators Section
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.collaboratorsBadge || 'TRUSTED COLLABORATORS'}
                                onChange={(e) => setContentForm({ ...contentForm, collaboratorsBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="TRUSTED COLLABORATORS"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Subtitle / Description</label>
                              <input
                                type="text"
                                value={contentForm.collaboratorsSubtitle || 'Partnering with leading institutions and academic collaborators worldwide'}
                                onChange={(e) => setContentForm({ ...contentForm, collaboratorsSubtitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Partnering with leading institutions..."
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Label</label>
                              <input
                                type="text"
                                value={contentForm.collaboratorsCtaText || 'Explore All Academic Partners & Collaborations'}
                                onChange={(e) => setContentForm({ ...contentForm, collaboratorsCtaText: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Explore All Academic Partners..."
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Action Target Link</label>
                              <input
                                type="text"
                                value={contentForm.collaboratorsCtaLink || 'partners'}
                                onChange={(e) => setContentForm({ ...contentForm, collaboratorsCtaLink: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                                placeholder="partners or https://..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 5. Fresh From EGE / Latest News Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            5. Latest News Section (FRESH FROM EGE)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.latestNewsBadge || 'FRESH FROM EGE'}
                                onChange={(e) => setContentForm({ ...contentForm, latestNewsBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="FRESH FROM EGE"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.latestNewsTitle || 'Latest News'}
                                onChange={(e) => setContentForm({ ...contentForm, latestNewsTitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Latest News"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Label</label>
                              <input
                                type="text"
                                value={contentForm.latestNewsCtaText || 'View all news'}
                                onChange={(e) => setContentForm({ ...contentForm, latestNewsCtaText: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="View all news"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Button Action Target Link</label>
                              <input
                                type="text"
                                value={contentForm.latestNewsCtaLink || 'news'}
                                onChange={(e) => setContentForm({ ...contentForm, latestNewsCtaLink: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 bg-white"
                                placeholder="news or https://..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 6. Testimonials Section */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#045494]" />
                            6. Testimonials Section (WHAT PEOPLE SAY ABOUT US)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.testimonialsBadge || 'WHAT PEOPLE SAY ABOUT US'}
                                onChange={(e) => setContentForm({ ...contentForm, testimonialsBadge: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="WHAT PEOPLE SAY ABOUT US"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.testimonialsTitle || 'Delivering Excellence Through Every Experience'}
                                onChange={(e) => setContentForm({ ...contentForm, testimonialsTitle: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                                placeholder="Delivering Excellence Through Every Experience"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: GLOBAL REACH & WHERE WE WORK */}
                  {homepageSectionTab === 'globalReach' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                        <div className="border-b border-slate-200 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">
                            Global Reach & Where We Work Header Controls
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Customize section badge, main title, introduction text, and bottom tagline.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1 text-xs">
                              Section Badge / Pill Label
                            </label>
                            <input
                              type="text"
                              value={contentForm.globalReachBadge || 'GLOBAL REACH'}
                              onChange={(e) => setContentForm({ ...contentForm, globalReachBadge: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                              placeholder="GLOBAL REACH"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1 text-xs">
                              Section Main Title / Headline
                            </label>
                            <input
                              type="text"
                              value={contentForm.globalReachTitle || 'Where We Work'}
                              onChange={(e) => setContentForm({ ...contentForm, globalReachTitle: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                              placeholder="Where We Work"
                            />
                          </div>
                        </div>

                        <div>
                          <RichTextArea
                            label="Section Description Paragraph"
                            value={contentForm.globalReachDescription || ''}
                            onChange={(val) => setContentForm({ ...contentForm, globalReachDescription: val })}
                            rows={3}
                            placeholder="We connect researchers, students, educators, universities, and research institutions worldwide through international conferences, scholarly publishing, professional training, research support, and academic collaboration."
                            helpText="Appears below the main heading on the homepage."
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">
                            Bottom Section Tagline / Pill
                          </label>
                          <input
                            type="text"
                            value={contentForm.globalReachTagline || 'Expanding Worldwide · Connecting Emerging & Established Scholars'}
                            onChange={(e) => setContentForm({ ...contentForm, globalReachTagline: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-semibold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                            placeholder="Expanding Worldwide · Connecting Emerging & Established Scholars"
                          />
                        </div>
                      </div>

                      {/* Regional Hubs & Continents Dynamic List Editor */}
                      {(() => {
                        const regionsList = (contentForm.globalRegions && contentForm.globalRegions.length > 0)
                          ? contentForm.globalRegions
                          : [
                            {
                              id: 'reg-1',
                              regionName: 'Asia',
                              countriesList: 'Malaysia, Singapore, India, Pakistan, Bangladesh, Nepal, Sri Lanka, Vietnam, Philippines.',
                              hubFocus: 'Regional Hub: Kuala Lumpur & Johor Bahru',
                            },
                            {
                              id: 'reg-2',
                              regionName: 'Europe',
                              countriesList: 'United Kingdom, Germany, Poland, France, Italy, Netherlands, Spain, Portugal.',
                              hubFocus: 'Bilateral Chapter: Lisbon & European Collaborators',
                            },
                            {
                              id: 'reg-3',
                              regionName: 'North America',
                              countriesList: 'United States and Canada (Scientific dissemination and conference committees).',
                              hubFocus: 'Strategic Outreach & Peer-Review Panels',
                            },
                          ];
                        return (
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  Global Regions & Chapters ({regionsList.length} Cards)
                                </h3>
                                <p className="text-[11px] text-slate-500">Manage region titles, country listings, regional hubs, and display order.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [
                                    ...regionsList,
                                    {
                                      id: `reg-${Date.now()}`,
                                      regionName: 'New Region / Continent',
                                      countriesList: 'Country A, Country B, Country C...',
                                      hubFocus: 'Regional Hub: Location Details',
                                    },
                                  ];
                                  setContentForm({ ...contentForm, globalRegions: updated });
                                }}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Region Card</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {regionsList.map((region, idx) => (
                                <div key={region.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 relative">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="font-bold text-[#045494] text-xs uppercase tracking-wider">
                                      Region #{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => {
                                          const updated = [...regionsList];
                                          const temp = updated[idx];
                                          updated[idx] = updated[idx - 1];
                                          updated[idx - 1] = temp;
                                          setContentForm({ ...contentForm, globalRegions: updated });
                                        }}
                                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 cursor-pointer"
                                        title="Move Left/Up"
                                      >
                                        <MoveUp className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === regionsList.length - 1}
                                        onClick={() => {
                                          const updated = [...regionsList];
                                          const temp = updated[idx];
                                          updated[idx] = updated[idx + 1];
                                          updated[idx + 1] = temp;
                                          setContentForm({ ...contentForm, globalRegions: updated });
                                        }}
                                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-100 cursor-pointer"
                                        title="Move Right/Down"
                                      >
                                        <MoveDown className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (regionsList.length <= 1) {
                                            alert('You must keep at least one global region.');
                                            return;
                                          }
                                          const updated = regionsList.filter((_, i) => i !== idx);
                                          setContentForm({ ...contentForm, globalRegions: updated });
                                        }}
                                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer ml-1"
                                        title="Delete Region Card"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Region / Continent Name</label>
                                    <input
                                      type="text"
                                      value={region.regionName}
                                      onChange={(e) => {
                                        const updated = [...regionsList];
                                        updated[idx] = { ...updated[idx], regionName: e.target.value };
                                        setContentForm({ ...contentForm, globalRegions: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                      placeholder="Asia, Europe, etc."
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Countries List</label>
                                    <textarea
                                      rows={3}
                                      value={region.countriesList}
                                      onChange={(e) => {
                                        const updated = [...regionsList];
                                        updated[idx] = { ...updated[idx], countriesList: e.target.value };
                                        setContentForm({ ...contentForm, globalRegions: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 resize-y"
                                      placeholder="Malaysia, Singapore, India..."
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Regional Hub & Chapter Focus</label>
                                    <input
                                      type="text"
                                      value={region.hubFocus}
                                      onChange={(e) => {
                                        const updated = [...regionsList];
                                        updated[idx] = { ...updated[idx], hubFocus: e.target.value };
                                        setContentForm({ ...contentForm, globalRegions: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400"
                                      placeholder="Regional Hub: Kuala Lumpur..."
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 4: TESTIMONIAL REVIEWS & PUBLIC FORM LINK */}
                  {homepageSectionTab === 'testimonials' && (
                    <div className="space-y-6 animate-in fade-in">
                      {/* Top Shareable Public Feedback Form Box */}
                      <div className="bg-[#045494]/5 border border-[#045494]/20 p-5 rounded-2xl space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#045494] flex items-center gap-1.5">
                              <LinkIcon className="w-4 h-4" />
                              <span>Shareable Public Feedback Form Link</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5">
                              Share this link with researchers, students, and university clients to gather real user feedback. Submissions appear directly in your admin review queue.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                const link = `${window.location.origin}/feedback`;
                                navigator.clipboard.writeText(link);
                                showFeedback('✓ Public Feedback Form Link copied to clipboard!');
                              }}
                              className="bg-[#045494] hover:bg-[#033b68] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </button>
                            <a
                              href="/feedback"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#045494]" />
                              <span>Preview Public Form</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800">
                          <span className="truncate">{typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '/feedback'}</span>
                          <span className="text-[10px] bg-blue-50 text-[#045494] px-2 py-0.5 rounded font-sans font-bold">Public Link</span>
                        </div>
                      </div>

                      {/* Header & Filter Tabs */}
                      {(() => {
                        const allTestimonials = contentForm.testimonials || [];
                        const pendingList = allTestimonials.filter((t) => t.status === 'PENDING');
                        const approvedList = allTestimonials.filter((t) => t.status === 'APPROVED' || !t.status);

                        const currentList = allTestimonials.filter((t) => {
                          if (testimonialFilter === 'PENDING') return t.status === 'PENDING';
                          if (testimonialFilter === 'APPROVED') return t.status === 'APPROVED' || !t.status;
                          return true;
                        });

                        return (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                              <div className="flex items-center gap-2 overflow-x-auto">
                                <button
                                  type="button"
                                  onClick={() => setTestimonialFilter('PENDING')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${testimonialFilter === 'PENDING'
                                      ? 'bg-amber-500 text-white shadow-xs'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}
                                >
                                  <span>Pending Review</span>
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${testimonialFilter === 'PENDING' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                    {pendingList.length}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setTestimonialFilter('APPROVED')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${testimonialFilter === 'APPROVED'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}
                                >
                                  <span>Approved & Live</span>
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${testimonialFilter === 'APPROVED' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                    {approvedList.length}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setTestimonialFilter('ALL')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${testimonialFilter === 'ALL'
                                      ? 'bg-[#045494] text-white shadow-xs'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}
                                >
                                  <span>All Feedback</span>
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${testimonialFilter === 'ALL' ? 'bg-[#033b68] text-white' : 'bg-slate-200 text-slate-700'}`}>
                                    {allTestimonials.length}
                                  </span>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={async () => {
                                  const newTestim: Testimonial = {
                                    id: `testim-${Date.now()}`,
                                    name: 'New Participant Name',
                                    role: 'Researcher / Scholar',
                                    institution: 'University / Institute',
                                    quote: 'Write positive feedback text here...',
                                    rating: 5,
                                    status: 'APPROVED',
                                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
                                  };
                                  const updated = [newTestim, ...allTestimonials];
                                  const updatedForm = { ...contentForm, testimonials: updated };
                                  setContentForm(updatedForm);
                                  await handleSaveDirectSiteContent(updatedForm);
                                  showFeedback('✓ New testimonial added!');
                                }}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Testimonial Manually</span>
                              </button>
                            </div>

                            {/* Reviews Cards List */}
                            {currentList.length === 0 ? (
                              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                                <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
                                <div className="text-xs font-bold text-slate-700">No testimonials found in this category.</div>
                                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                                  {testimonialFilter === 'PENDING'
                                    ? 'No pending user feedback awaiting review. Share your feedback form link to receive submissions!'
                                    : 'No approved testimonials published yet.'}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {currentList.map((t, idx) => {
                                  const isPending = t.status === 'PENDING';
                                  const isApproved = t.status === 'APPROVED' || !t.status;

                                  return (
                                    <div
                                      key={t.id || idx}
                                      className={`p-4 border rounded-2xl space-y-3 transition shadow-2xs ${isPending
                                          ? 'bg-amber-50/50 border-amber-200'
                                          : 'bg-white border-slate-200'
                                        }`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-slate-900 text-xs">
                                            {t.name || 'Anonymous User'}
                                          </span>
                                          {isPending && (
                                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                              PENDING ADMIN APPROVAL
                                            </span>
                                          )}
                                          {isApproved && (
                                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                              <Check className="w-3 h-3 text-emerald-600" />
                                              PUBLISHED LIVE
                                            </span>
                                          )}
                                          {t.createdAt && (
                                            <span className="text-[10px] text-slate-400 font-mono">
                                              · {t.createdAt}
                                            </span>
                                          )}
                                        </div>

                                        {/* Action Approval / Reject Buttons */}
                                        <div className="flex items-center gap-2">
                                          {isPending && (
                                            <button
                                              type="button"
                                              onClick={async () => {
                                                const copy = [...allTestimonials];
                                                const targetIdx = copy.findIndex((item) => String(item.id) === String(t.id));
                                                if (targetIdx !== -1) {
                                                  copy[targetIdx] = { ...copy[targetIdx], status: 'APPROVED' };
                                                  const updatedForm = { ...contentForm, testimonials: copy };
                                                  setContentForm(updatedForm);
                                                  await handleSaveDirectSiteContent(updatedForm);
                                                  showFeedback('✓ Review approved & published to website!');
                                                }
                                              }}
                                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer shadow-2xs transition"
                                            >
                                              <Check className="w-3.5 h-3.5" />
                                              <span>Approve & Publish</span>
                                            </button>
                                          )}

                                          {isApproved && (
                                            <button
                                              type="button"
                                              onClick={async () => {
                                                const copy = [...allTestimonials];
                                                const targetIdx = copy.findIndex((item) => String(item.id) === String(t.id));
                                                if (targetIdx !== -1) {
                                                  copy[targetIdx] = { ...copy[targetIdx], status: 'PENDING' };
                                                  const updatedForm = { ...contentForm, testimonials: copy };
                                                  setContentForm(updatedForm);
                                                  await handleSaveDirectSiteContent(updatedForm);
                                                  showFeedback('Review unpublished back to pending queue.');
                                                }
                                              }}
                                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer"
                                            >
                                              Unpublish to Pending
                                            </button>
                                          )}

                                          <button
                                            type="button"
                                            onClick={async () => {
                                              if (confirm(`Are you sure you want to delete review from "${t.name}"?`)) {
                                                const copy = allTestimonials.filter((item) => String(item.id) !== String(t.id));
                                                const updatedForm = { ...contentForm, testimonials: copy };
                                                setContentForm(updatedForm);
                                                await handleSaveDirectSiteContent(updatedForm);
                                                showFeedback('✓ Review deleted successfully.');
                                              }
                                            }}
                                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                            title="Delete Review"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Editable Fields Grid */}
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Author Name</label>
                                          <input
                                            type="text"
                                            value={t.name}
                                            onChange={(e) => {
                                              const copy = [...allTestimonials];
                                              const targetIdx = copy.findIndex((item) => item.id === t.id);
                                              if (targetIdx !== -1) {
                                                copy[targetIdx] = { ...copy[targetIdx], name: e.target.value };
                                                setContentForm({ ...contentForm, testimonials: copy });
                                              }
                                            }}
                                            className="w-full px-2.5 py-1.5 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 rounded-lg text-xs font-bold"
                                            placeholder="Author Name"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Role / Designation</label>
                                          <input
                                            type="text"
                                            value={t.role}
                                            onChange={(e) => {
                                              const copy = [...allTestimonials];
                                              const targetIdx = copy.findIndex((item) => item.id === t.id);
                                              if (targetIdx !== -1) {
                                                copy[targetIdx] = { ...copy[targetIdx], role: e.target.value };
                                                setContentForm({ ...contentForm, testimonials: copy });
                                              }
                                            }}
                                            className="w-full px-2.5 py-1.5 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 rounded-lg text-xs font-semibold"
                                            placeholder="Role / Title"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">University / Institution</label>
                                          <input
                                            type="text"
                                            value={t.institution || ''}
                                            onChange={(e) => {
                                              const copy = [...allTestimonials];
                                              const targetIdx = copy.findIndex((item) => item.id === t.id);
                                              if (targetIdx !== -1) {
                                                copy[targetIdx] = { ...copy[targetIdx], institution: e.target.value };
                                                setContentForm({ ...contentForm, testimonials: copy });
                                              }
                                            }}
                                            className="w-full px-2.5 py-1.5 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 rounded-lg text-xs"
                                            placeholder="Institution Name"
                                          />
                                        </div>
                                      </div>

                                      {/* Feedback Quote Textarea */}
                                      <div>
                                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Feedback / Testimonial Quote</label>
                                        <textarea
                                          rows={2}
                                          value={t.quote}
                                          onChange={(e) => {
                                            const copy = [...allTestimonials];
                                            const targetIdx = copy.findIndex((item) => item.id === t.id);
                                            if (targetIdx !== -1) {
                                              copy[targetIdx] = { ...copy[targetIdx], quote: e.target.value };
                                              setContentForm({ ...contentForm, testimonials: copy });
                                            }
                                          }}
                                          className="w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-xs font-medium resize-y"
                                          placeholder="Review text..."
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {actionSuccess && (
                    <div className="bg-emerald-600 text-white text-xs font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xs animate-in fade-in border border-emerald-500">
                      <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                      <span>{actionSuccess}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Our Services Content Changes</span>
                    </button>
                    <span className="text-[11px] text-slate-500 italic">Changes update live on public website upon saving to MySQL.</span>
                  </div>
                </form>
              </div>
            )}

            {/* ABOUT US CONTENT SUB-TAB */}
            {activeSubTab === 'aboutContent' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">About Us Content</h2>
                    <p className="text-xs text-slate-500">Live controls for company profile, mission/vision, commitments & goals, delivery objectives, and administrative governance chart.</p>
                  </div>
                </div>

                {/* Section Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                  {[
                    { id: 'hero', label: '1. Hero & Company Overview' },
                    { id: 'mission', label: '2. Mission & Vision' },
                    { id: 'commitments', label: '3. Goals & Objectives' },
                    { id: 'governance', label: '4. Governance & Org Chart' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAboutSectionTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${aboutSectionTab === tab.id
                        ? 'bg-[#045494] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                  {/* TAB 1: HERO & COMPANY OVERVIEW */}
                  {aboutSectionTab === 'hero' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">About Us Hero & Overview Editor</div>
                        <p className="text-[11px] text-slate-600">Customize main section headers, established badge, company narrative paragraphs, feature badges, and key institutional pillars.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.aboutPage?.heroBadge || 'ABOUT ELITE GLOBAL EXCELLENCE'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              aboutPage: { ...(contentForm.aboutPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Main Headline</label>
                          <input
                            type="text"
                            value={contentForm.aboutPage?.heroTitle || 'Bridging borders, building knowledge.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              aboutPage: { ...(contentForm.aboutPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Subheadline</label>
                        <input
                          type="text"
                          value={contentForm.aboutPage?.heroSubheadline || 'Empowering research. Transforming knowledge. Creating global impact.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            aboutPage: { ...(contentForm.aboutPage || {}), heroSubheadline: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-medium text-xs bg-white text-slate-900 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-200 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Company Overview Section</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1 text-xs">Established Badge</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.establishedBadge || 'ESTABLISHED 2020 · MALAYSIA'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), establishedBadge: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1 text-xs">Company Title</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.overviewTitle || 'About Elite Global Excellence Sdn. Bhd.'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), overviewTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Paragraphs Manager */}
                        {(() => {
                          const paragraphs = contentForm.aboutPage?.overviewParagraphs || [
                            'Elite Global Excellence Sdn. Bhd. (EGE) is a Malaysia-based academic and research services company dedicated to supporting researchers, students, educators, universities, and research institutions worldwide.',
                            'Our mission is to make research, academic publishing, and professional development more accessible by providing high-quality services that help individuals and institutions succeed. Headquartered in Malaysia with operational presence spanning Asia, Europe, and North America, EGE brings together an international network of distinguished academics, senior journal editors, and university leaders.',
                            'Through annual flagship conferences (ICCSEIT, EGE-MLDL), indexed journal publication pathways, continuous free academic workshops, and our specialized Mock Viva defense clinic, we guide emerging and established scholars through every phase of the research lifecycle.'
                          ];
                          return (
                            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Company Narrative Paragraphs ({paragraphs.length})</h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...paragraphs, 'New paragraph text...'];
                                    setContentForm({
                                      ...contentForm,
                                      aboutPage: { ...(contentForm.aboutPage || {}), overviewParagraphs: updated }
                                    });
                                  }}
                                  className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Paragraph</span>
                                </button>
                              </div>
                              {paragraphs.map((para, idx) => (
                                <div key={idx} className="space-y-1 border-b border-slate-200/80 pb-3 last:border-0 last:pb-0">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-700">Paragraph #{idx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (paragraphs.length <= 1) {
                                          alert('Must keep at least 1 paragraph.');
                                          return;
                                        }
                                        const updated = paragraphs.filter((_, i) => i !== idx);
                                        setContentForm({
                                          ...contentForm,
                                          aboutPage: { ...(contentForm.aboutPage || {}), overviewParagraphs: updated }
                                        });
                                      }}
                                      className="text-rose-600 hover:text-rose-800 text-[11px] font-bold"
                                    >
                                      Delete Paragraph
                                    </button>
                                  </div>
                                  <RichTextArea
                                    label=""
                                    value={para}
                                    onChange={(val) => {
                                      const updated = [...paragraphs];
                                      updated[idx] = val;
                                      setContentForm({
                                        ...contentForm,
                                        aboutPage: { ...(contentForm.aboutPage || {}), overviewParagraphs: updated }
                                      });
                                    }}
                                    rows={3}
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        })()}

                        {/* Badges Manager */}
                        {(() => {
                          const badges = contentForm.aboutPage?.overviewBadges || [
                            'Incorporated under Companies Commission of Malaysia (SSM)',
                            'Global Scholarly & Peer-Review Standards'
                          ];
                          return (
                            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Feature Check Badges ({badges.length})</h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...badges, 'New Accreditation or Compliance Tag'];
                                    setContentForm({
                                      ...contentForm,
                                      aboutPage: { ...(contentForm.aboutPage || {}), overviewBadges: updated }
                                    });
                                  }}
                                  className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Feature Badge</span>
                                </button>
                              </div>
                              <div className="space-y-2">
                                {badges.map((bText, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 w-6">#{idx + 1}</span>
                                    <input
                                      type="text"
                                      value={bText}
                                      onChange={(e) => {
                                        const updated = [...badges];
                                        updated[idx] = e.target.value;
                                        setContentForm({
                                          ...contentForm,
                                          aboutPage: { ...(contentForm.aboutPage || {}), overviewBadges: updated }
                                        });
                                      }}
                                      className="flex-1 px-3 py-1.5 border border-slate-300 bg-white rounded-xl text-xs font-medium text-slate-900"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = badges.filter((_, i) => i !== idx);
                                        setContentForm({
                                          ...contentForm,
                                          aboutPage: { ...(contentForm.aboutPage || {}), overviewBadges: updated }
                                        });
                                      }}
                                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Key Institutional Pillars Manager */}
                        {(() => {
                          const pillars = contentForm.aboutPage?.pillars || [
                            { id: 'pil-1', title: 'Global Academic Outreach', description: 'Connecting scholars across 33+ nations with collaborative research pipelines.' },
                            { id: 'pil-2', title: 'Scholarly Publishing Integrity', description: 'Rigorous double-blind peer-review upholding international COPE ethics.' },
                            { id: 'pil-3', title: 'Postgraduate Defense Excellence', description: 'Structured mock viva defense panels led by international examiners.' }
                          ];
                          return (
                            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Key Institutional Pillars Cards ({pillars.length})</h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPill = {
                                      id: `pil-${Date.now()}`,
                                      title: 'New Pillar Title',
                                      description: 'Description of key institutional pillar...'
                                    };
                                    const updated = [...pillars, newPill];
                                    setContentForm({
                                      ...contentForm,
                                      aboutPage: { ...(contentForm.aboutPage || {}), pillars: updated }
                                    });
                                  }}
                                  className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Pillar Card</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {pillars.map((pil, idx) => (
                                  <div key={pil.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 relative">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                      <span className="text-[10px] font-bold text-[#045494]">Pillar #{idx + 1}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = pillars.filter((_, i) => i !== idx);
                                          setContentForm({
                                            ...contentForm,
                                            aboutPage: { ...(contentForm.aboutPage || {}), pillars: updated }
                                          });
                                        }}
                                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pillar Title</label>
                                      <input
                                        type="text"
                                        value={pil.title}
                                        onChange={(e) => {
                                          const updated = [...pillars];
                                          updated[idx] = { ...updated[idx], title: e.target.value };
                                          setContentForm({
                                            ...contentForm,
                                            aboutPage: { ...(contentForm.aboutPage || {}), pillars: updated }
                                          });
                                        }}
                                        className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description</label>
                                      <textarea
                                        rows={2}
                                        value={pil.description}
                                        onChange={(e) => {
                                          const updated = [...pillars];
                                          updated[idx] = { ...updated[idx], description: e.target.value };
                                          setContentForm({
                                            ...contentForm,
                                            aboutPage: { ...(contentForm.aboutPage || {}), pillars: updated }
                                          });
                                        }}
                                        className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs text-slate-700 resize-y"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MISSION & VISION */}
                  {aboutSectionTab === 'mission' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Mission & Vision Editor</div>
                        <p className="text-[11px] text-slate-600">Customize titles and high-impact statements for Mission and Vision cards.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mission Box */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Our Mission Card</h3>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1 text-xs">Mission Title</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.missionTitle || 'Our Mission'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), missionTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                          <RichTextArea
                            label="Mission Statement Text"
                            value={contentForm.aboutPage?.missionText || contentForm.mission || ''}
                            onChange={(val) => setContentForm({
                              ...contentForm,
                              mission: val,
                              aboutPage: { ...(contentForm.aboutPage || {}), missionText: val }
                            })}
                            rows={5}
                          />
                        </div>

                        {/* Vision Box */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2">Our Vision Card</h3>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1 text-xs">Vision Title</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.visionTitle || 'Our Vision'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), visionTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                          <RichTextArea
                            label="Vision Statement Text"
                            value={contentForm.aboutPage?.visionText || contentForm.vision || ''}
                            onChange={(val) => setContentForm({
                              ...contentForm,
                              vision: val,
                              aboutPage: { ...(contentForm.aboutPage || {}), visionText: val }
                            })}
                            rows={5}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: COMMITMENTS & DELIVERY (GOALS & OBJECTIVES) */}
                  {aboutSectionTab === 'commitments' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Goals & Objectives Manager</div>
                        <p className="text-[11px] text-slate-600">Fully edit, add, delete, or reorder the 7 Commitments (Goals) and 7 Delivery Actions (Objectives).</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* OUR COMMITMENTS (GOALS) */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Section 1: OUR COMMITMENTS (Goals)</h3>
                              <p className="text-[11px] text-slate-500">Numbered goals list displayed on About page</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const currentGoals = contentForm.aboutPage?.goalsList || contentForm.goals || [];
                                const updated = [...currentGoals, 'New strategic commitment goal...'];
                                setContentForm({
                                  ...contentForm,
                                  goals: updated,
                                  aboutPage: { ...(contentForm.aboutPage || {}), goalsList: updated }
                                });
                              }}
                              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Goal</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.aboutPage?.goalsBadge || 'OUR COMMITMENTS'}
                                onChange={(e) => setContentForm({
                                  ...contentForm,
                                  aboutPage: { ...(contentForm.aboutPage || {}), goalsBadge: e.target.value }
                                })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.aboutPage?.goalsTitle || 'Goals'}
                                onChange={(e) => setContentForm({
                                  ...contentForm,
                                  aboutPage: { ...(contentForm.aboutPage || {}), goalsTitle: e.target.value }
                                })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Subtitle / Description</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.goalsSubtitle || 'The enduring principles guiding our research initiatives and academic partnerships.'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), goalsSubtitle: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900"
                            />
                          </div>

                          <div className="space-y-2 pt-2">
                            {(() => {
                              const goals = contentForm.aboutPage?.goalsList || contentForm.goals || [];
                              return goals.map((gText, idx) => (
                                <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                                  <span className="w-5 h-5 rounded-full bg-blue-50 text-[#045494] font-bold text-[10px] flex items-center justify-center shrink-0 mt-1">
                                    {idx + 1}
                                  </span>
                                  <textarea
                                    rows={2}
                                    value={gText}
                                    onChange={(e) => {
                                      const updated = [...goals];
                                      updated[idx] = e.target.value;
                                      setContentForm({
                                        ...contentForm,
                                        goals: updated,
                                        aboutPage: { ...(contentForm.aboutPage || {}), goalsList: updated }
                                      });
                                    }}
                                    className="flex-1 p-1.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#045494] resize-y font-medium"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === 0) return;
                                        const updated = [...goals];
                                        const temp = updated[idx - 1];
                                        updated[idx - 1] = updated[idx];
                                        updated[idx] = temp;
                                        setContentForm({
                                          ...contentForm,
                                          goals: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), goalsList: updated }
                                        });
                                      }}
                                      disabled={idx === 0}
                                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                                    >
                                      <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === goals.length - 1) return;
                                        const updated = [...goals];
                                        const temp = updated[idx + 1];
                                        updated[idx + 1] = updated[idx];
                                        updated[idx] = temp;
                                        setContentForm({
                                          ...contentForm,
                                          goals: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), goalsList: updated }
                                        });
                                      }}
                                      disabled={idx === goals.length - 1}
                                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                                    >
                                      <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = goals.filter((_, i) => i !== idx);
                                        setContentForm({
                                          ...contentForm,
                                          goals: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), goalsList: updated }
                                        });
                                      }}
                                      className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* HOW WE DELIVER (OBJECTIVES) */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Section 2: HOW WE DELIVER (Objectives)</h3>
                              <p className="text-[11px] text-slate-500">Numbered objectives list displayed on About page</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const currentObj = contentForm.aboutPage?.objectivesList || contentForm.objectives || [];
                                const updated = [...currentObj, 'New concrete program objective...'];
                                setContentForm({
                                  ...contentForm,
                                  objectives: updated,
                                  aboutPage: { ...(contentForm.aboutPage || {}), objectivesList: updated }
                                });
                              }}
                              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Objective</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Badge</label>
                              <input
                                type="text"
                                value={contentForm.aboutPage?.objectivesBadge || 'HOW WE DELIVER'}
                                onChange={(e) => setContentForm({
                                  ...contentForm,
                                  aboutPage: { ...(contentForm.aboutPage || {}), objectivesBadge: e.target.value }
                                })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Title</label>
                              <input
                                type="text"
                                value={contentForm.aboutPage?.objectivesTitle || 'Objectives'}
                                onChange={(e) => setContentForm({
                                  ...contentForm,
                                  aboutPage: { ...(contentForm.aboutPage || {}), objectivesTitle: e.target.value }
                                })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Section Subtitle / Description</label>
                            <input
                              type="text"
                              value={contentForm.aboutPage?.objectivesSubtitle || 'Concrete programmatic actions executed across our academic divisions.'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                aboutPage: { ...(contentForm.aboutPage || {}), objectivesSubtitle: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900"
                            />
                          </div>

                          <div className="space-y-2 pt-2">
                            {(() => {
                              const objectives = contentForm.aboutPage?.objectivesList || contentForm.objectives || [];
                              return objectives.map((oText, idx) => (
                                <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-1">
                                    {idx + 1}
                                  </span>
                                  <textarea
                                    rows={2}
                                    value={oText}
                                    onChange={(e) => {
                                      const updated = [...objectives];
                                      updated[idx] = e.target.value;
                                      setContentForm({
                                        ...contentForm,
                                        objectives: updated,
                                        aboutPage: { ...(contentForm.aboutPage || {}), objectivesList: updated }
                                      });
                                    }}
                                    className="flex-1 p-1.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#045494] resize-y font-medium"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === 0) return;
                                        const updated = [...objectives];
                                        const temp = updated[idx - 1];
                                        updated[idx - 1] = updated[idx];
                                        updated[idx] = temp;
                                        setContentForm({
                                          ...contentForm,
                                          objectives: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), objectivesList: updated }
                                        });
                                      }}
                                      disabled={idx === 0}
                                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                                    >
                                      <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === objectives.length - 1) return;
                                        const updated = [...objectives];
                                        const temp = updated[idx + 1];
                                        updated[idx + 1] = updated[idx];
                                        updated[idx] = temp;
                                        setContentForm({
                                          ...contentForm,
                                          objectives: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), objectivesList: updated }
                                        });
                                      }}
                                      disabled={idx === objectives.length - 1}
                                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                                    >
                                      <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = objectives.filter((_, i) => i !== idx);
                                        setContentForm({
                                          ...contentForm,
                                          objectives: updated,
                                          aboutPage: { ...(contentForm.aboutPage || {}), objectivesList: updated }
                                        });
                                      }}
                                      className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: GOVERNANCE & ORG CHART */}
                  {aboutSectionTab === 'governance' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Governance & Organization Structure Editor</div>
                        <p className="text-[11px] text-slate-600">Customize section headers, top-level executive governance box, administrative division cards (Divisions 01 to 06), and CTA label.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Governance Badge</label>
                          <input
                            type="text"
                            value={contentForm.aboutPage?.governanceBadge || 'GOVERNANCE & STRUCTURE'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              aboutPage: { ...(contentForm.aboutPage || {}), governanceBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.aboutPage?.governanceTitle || 'Organization Chart / Leadership'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              aboutPage: { ...(contentForm.aboutPage || {}), governanceTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Section Subtitle / Description</label>
                        <input
                          type="text"
                          value={contentForm.aboutPage?.governanceSubtitle || 'Clear administrative hierarchy ensuring academic rigor, ethical publishing, and international compliance.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            aboutPage: { ...(contentForm.aboutPage || {}), governanceSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                        />
                      </div>

                      {/* Governance & Leadership Members Manager */}
                      {(() => {
                        const members: ExecutiveMember[] = contentForm.aboutPage?.governanceMembers || (initialDatabase.siteContent?.aboutPage?.governanceMembers || []);
                        return (
                          <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Executive Leadership & Board Members ({members.length})</h4>
                                <p className="text-[11px] text-slate-500">Manage CEO, Co-Founder, Executive Officers, and Board of Directors tree.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setEditingGovMemberModal({
                                  id: `gov-mem-${Date.now()}`,
                                  name: '',
                                  title: '',
                                  category: 'BOARD_MEMBER',
                                  photoUrl: '',
                                  summary: '',
                                  fullBio: '',
                                  organization: 'Elite Global Excellence'
                                })}
                                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Leadership Member</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {members.map((member, idx) => (
                                <div key={member.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 relative flex flex-col justify-between">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                        member.category === 'CEO'
                                          ? 'bg-blue-100 text-[#045494]'
                                          : member.category === 'CO_FOUNDER'
                                          ? 'bg-slate-200 text-slate-800'
                                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      }`}>
                                        {member.category === 'CEO' ? 'CEO' : member.category === 'CO_FOUNDER' ? 'Co-Founder' : 'Board Member'}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => setEditingGovMemberModal({ ...member })}
                                          className="p-1 text-[#045494] hover:bg-blue-50 rounded cursor-pointer"
                                          title="Edit Member"
                                        >
                                          <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={async () => {
                                            if (confirm(`Are you sure you want to delete "${member.name}"?`)) {
                                              const updated = members.filter((_, i) => i !== idx);
                                              const updatedContent = {
                                                ...contentForm,
                                                aboutPage: { ...(contentForm.aboutPage || {}), governanceMembers: updated }
                                              };
                                              setContentForm(updatedContent);
                                              await handleSaveDirectSiteContent(updatedContent);
                                              showFeedback('Member deleted successfully.');
                                            }
                                          }}
                                          className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                                          title="Delete Member"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img
                                          src={member.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                                          alt={member.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="font-bold text-slate-900 text-xs">{member.name || 'Unnamed Member'}</h5>
                                        <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">{member.title}</p>
                                      </div>
                                    </div>

                                    <p className="text-[11px] text-slate-600 line-clamp-2 italic pt-1">
                                      "{member.summary}"
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Bottom CTA Button Label</label>
                        <input
                          type="text"
                          value={contentForm.aboutPage?.ctaText || 'Connect with EGE Leadership & Directorate'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            aboutPage: { ...(contentForm.aboutPage || {}), ctaText: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  {actionSuccess && (
                    <div className="bg-emerald-600 text-white text-xs font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xs animate-in fade-in border border-emerald-500">
                      <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                      <span>{actionSuccess}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save About Us Content Changes</span>
                    </button>
                    <span className="text-[11px] text-slate-500 italic">Changes update live on public website upon saving to MySQL.</span>
                  </div>
                </form>
              </div>
            )}

            {/* OUR SERVICES CONTENT SUB-TAB */}
            {activeSubTab === 'servicesContent' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Our Services Content</h2>
                    <p className="text-xs text-slate-500">
                      Live controls for Services page hero intro, core services list (add/edit/remove services), and bottom call-to-action banner.
                    </p>
                  </div>
                </div>

                {/* Section Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                  {[
                    { id: 'hero', label: '1. Hero & Intro Header' },
                    { id: 'services', label: '2. Core Services List & Details' },
                    { id: 'closing', label: '3. Bottom Closing Call-to-Action' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setServicesSectionTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${servicesSectionTab === tab.id
                        ? 'bg-[#045494] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                  {/* TAB 1: HERO & INTRO HEADER */}
                  {servicesSectionTab === 'hero' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Services Page Intro Header Editor</div>
                        <p className="text-[11px] text-slate-600">Customize main section badge, headline title, and introductory text displayed at the top of the Services page.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.servicesPage?.heroBadge || 'WHAT WE DO'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              servicesPage: { ...(contentForm.servicesPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                            placeholder="WHAT WE DO"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Main Section Title</label>
                          <input
                            type="text"
                            value={contentForm.servicesPage?.heroTitle || 'Our Services'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              servicesPage: { ...(contentForm.servicesPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-xs bg-white text-slate-900 placeholder:text-slate-400"
                            placeholder="Our Services"
                          />
                        </div>
                      </div>

                      <div>
                        <RichTextArea
                          label="Introductory Description Paragraph"
                          value={contentForm.servicesPage?.heroDescription || 'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.'}
                          onChange={(val) => setContentForm({
                            ...contentForm,
                            servicesPage: { ...(contentForm.servicesPage || {}), heroDescription: val }
                          })}
                          rows={3}
                          placeholder="Comprehensive academic and research services..."
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CORE SERVICES LIST & DETAILS */}
                  {servicesSectionTab === 'services' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Services List & Content Blocks ({contentForm.servicesPage?.services?.length || 0} Services)</div>
                          <p className="text-[11px] text-slate-600">Admin can add, edit, reorder, or remove services. Any service added here instantly appears on both the Services page and Homepage Core Services section!</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const servicesList = contentForm.servicesPage?.services || [];
                            const newService: ServiceItem = {
                              id: `service-${Date.now()}`,
                              badge: `Core Service 0${servicesList.length + 1}`,
                              title: 'New Service Title',
                              overviewDescription: 'Short summary for card list & homepage overview.',
                              detailDescription: 'Full detailed description paragraph of the service.',
                              icon: 'Sparkles',
                              anchorId: `service-${Date.now()}-detail`,
                              ctaText: 'Learn More / Contact Us',
                              ctaActionType: 'contact',
                              ctaTarget: 'contact',
                              displayOrder: servicesList.length + 1,
                            };
                            setEditingServiceModal(newService);
                          }}
                          className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Service</span>
                        </button>
                      </div>

                      {/* Services Cards List */}
                      {(() => {
                        const servicesList = contentForm.servicesPage?.services || [];
                        if (servicesList.length === 0) {
                          return (
                            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                              <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                              <div className="text-xs font-bold text-slate-700">No services configured.</div>
                              <p className="text-[11px] text-slate-500">Click "Add New Service" above to create your first service item.</p>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-4">
                            {servicesList.map((srv, idx) => (
                              <div
                                key={srv.id || idx}
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-[10px] font-bold text-[#045494] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                                      {srv.badge || `Core Service 0${idx + 1}`}
                                    </span>
                                    <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === 0) return;
                                        const updated = [...servicesList];
                                        const temp = updated[idx - 1];
                                        updated[idx - 1] = updated[idx];
                                        updated[idx] = temp;
                                        const updatedContent = {
                                          ...contentForm,
                                          servicesPage: { ...(contentForm.servicesPage || {}), services: updated }
                                        };
                                        setContentForm(updatedContent);
                                        handleSaveDirectSiteContent(updatedContent);
                                      }}
                                      disabled={idx === 0}
                                      className="p-1.5 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                                      title="Move Up"
                                    >
                                      <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (idx === servicesList.length - 1) return;
                                        const updated = [...servicesList];
                                        const temp = updated[idx + 1];
                                        updated[idx + 1] = updated[idx];
                                        updated[idx] = temp;
                                        const updatedContent = {
                                          ...contentForm,
                                          servicesPage: { ...(contentForm.servicesPage || {}), services: updated }
                                        };
                                        setContentForm(updatedContent);
                                        handleSaveDirectSiteContent(updatedContent);
                                      }}
                                      disabled={idx === servicesList.length - 1}
                                      className="p-1.5 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                                      title="Move Down"
                                    >
                                      <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setEditingServiceModal(srv)}
                                      className="bg-blue-50 hover:bg-blue-100 text-[#045494] px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                      <span>Edit Service</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete service "${srv.title}"?`)) {
                                          const updated = servicesList.filter((_, i) => i !== idx);
                                          const updatedContent = {
                                            ...contentForm,
                                            servicesPage: { ...(contentForm.servicesPage || {}), services: updated }
                                          };
                                          setContentForm(updatedContent);
                                          handleSaveDirectSiteContent(updatedContent);
                                          showFeedback('✓ Service deleted successfully.');
                                        }
                                      }}
                                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                                      title="Delete Service"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-0.5">Overview Card Text (Homepage & Top Grid):</span>
                                    <p className="text-slate-800 line-clamp-2">{srv.overviewDescription}</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-0.5">Detail View Paragraph:</span>
                                    <p className="text-slate-800 line-clamp-2">{srv.detailDescription}</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                                  <span>Icon: <strong className="text-slate-800">{srv.icon || 'Users'}</strong></span>
                                  <span>·</span>
                                  <span>Anchor ID: <strong className="text-slate-800">#{srv.anchorId}</strong></span>
                                  {srv.subTracks && srv.subTracks.length > 0 && (
                                    <>
                                      <span>·</span>
                                      <span>Sub-tracks: <strong className="text-slate-800">{srv.subTracks.length} items</strong></span>
                                    </>
                                  )}
                                  {srv.features && srv.features.length > 0 && (
                                    <>
                                      <span>·</span>
                                      <span>Features: <strong className="text-slate-800">{srv.features.length} items</strong></span>
                                    </>
                                  )}
                                  <span>·</span>
                                  <span>CTA: <strong className="text-[#045494]">{srv.ctaText || 'View details'}</strong></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 3: BOTTOM CLOSING CALL-TO-ACTION */}
                  {servicesSectionTab === 'closing' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Services Page Closing Banner Editor</div>
                        <p className="text-[11px] text-slate-600">Customize the bottom banner call-to-action title, description text, and button label on the Services page.</p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Closing Banner Title</label>
                        <input
                          type="text"
                          value={contentForm.servicesPage?.closingTitle || 'Let’s build something excellent, together.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            servicesPage: { ...(contentForm.servicesPage || {}), closingTitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] font-bold text-sm bg-white text-slate-900"
                          placeholder="Let’s build something excellent, together."
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Closing Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.servicesPage?.closingDescription || 'Reach out to discuss conferences, publishing, training, or long-term academic partnerships.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            servicesPage: { ...(contentForm.servicesPage || {}), closingDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-xs font-medium bg-white text-slate-900 resize-y"
                          placeholder="Reach out to discuss conferences..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Button Text / Label</label>
                          <input
                            type="text"
                            value={contentForm.servicesPage?.closingButtonText || 'Contact EGE'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              servicesPage: { ...(contentForm.servicesPage || {}), closingButtonText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            placeholder="Contact EGE"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Button Action Target</label>
                          <select
                            value={contentForm.servicesPage?.closingButtonTarget || 'contact'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              servicesPage: { ...(contentForm.servicesPage || {}), closingButtonTarget: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          >
                            <option value="contact">Open Contact Form Tab</option>
                            <option value="conferences">Navigate to Conferences</option>
                            <option value="workshops">Navigate to Workshops</option>
                            <option value="quote">Open Quotation Modal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {actionSuccess && (
                    <div className="bg-emerald-600 text-white text-xs font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xs animate-in fade-in border border-emerald-500">
                      <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                      <span>{actionSuccess}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Our Services Content Changes</span>
                    </button>
                    <span className="text-[11px] text-slate-500 italic">Changes update live on public website upon saving to MySQL.</span>
                  </div>
                </form>
              </div>
            )}

            {/* WORKSHOP MANAGEMENT SUB-TAB */}
            {activeSubTab === 'workshopManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Workshop Management</h2>
                    <p className="text-xs text-slate-500">
                      Manage static Workshop page content, add/edit upcoming masterclasses, toggle attendance links, and review past archives.
                    </p>
                  </div>
                </div>

                {/* Sub Navigation Tabs */}
                {(() => {
                  const isPastWs = (w: any) => {
                    if (w.status === 'PAST') return true;
                    if (!w.date) return false;
                    const pDate = new Date(w.date);
                    if (!isNaN(pDate.getTime())) {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return pDate < today;
                    }
                    return false;
                  };

                  const upcomingCount = (data.workshops || []).filter(w => !isPastWs(w)).length;
                  const pastCount = (data.workshops || []).filter(w => isPastWs(w)).length;
                  const totalAttendances = (data.workshopAttendances || []).length;

                  return (
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                      {[
                        { id: 'content', label: '1. Workshop Interface Content' },
                        { id: 'upcoming', label: `2. Upcoming Workshops (${upcomingCount})` },
                        { id: 'past', label: `3. Past Archive (${pastCount})` },
                        { id: 'attendance', label: `4. Attendance (${totalAttendances})` },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setWorkshopManagementTab(tab.id as any)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                            workshopManagementTab === tab.id
                              ? 'bg-[#045494] text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  );
                })()}

                {/* TAB 1: WORKSHOP INTERFACE CONTENT */}
                {workshopManagementTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs animate-in fade-in">
                    <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Workshop Page Content Customization</div>
                      <p className="text-[11px] text-slate-600">Customize main header, philosophy card, popular topics grid, bespoke training card, and credentialing banner text.</p>
                    </div>

                    {/* HERO HEADER */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Header Section</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.heroBadge || 'CONTINUOUS LEARNING'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Main Title</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.heroTitle || 'Free Workshops, Seminars & Professional Training'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Intro Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.workshopManagement?.heroDescription || 'Accessible world-class academic masterclasses, research methodology workshops, and custom institutional training designed to upskill researchers across all career stages.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            workshopManagement: { ...(contentForm.workshopManagement || {}), heroDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* PHILOSOPHY CARD */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Free Learning Philosophy Card</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Badge Text</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.philosophyBadge || 'OUR COMMITMENT TO DEMOCRATIZING RESEARCH'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), philosophyBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Philosophy Title</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.philosophyTitle || 'EGE Free Academic Learning Philosophy'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), philosophyTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Philosophy Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.workshopManagement?.philosophyDescription || 'High fees should never stand between a dedicated scholar and mastery of empirical research tools. That is why Elite Global Excellence conducts selected zero-cost, high-impact virtual workshops every year. From early-career researchers in developing nations to faculty pursuing top-tier publications, our sessions equip participants with practical tools, live Q&A, and verified digital certificates.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            workshopManagement: { ...(contentForm.workshopManagement || {}), philosophyDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* POPULAR TOPICS LIST */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Popular Workshop Topics ({contentForm.workshopManagement?.topicsList?.length || 0})</h3>
                          <p className="text-[11px] text-slate-500">Curriculum highlights grid on Workshops page</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const currentList = contentForm.workshopManagement?.topicsList || [];
                            const updated = [
                              ...currentList,
                              { id: Date.now(), category: 'New Category', title: 'New Topic Title', description: 'Description of topic curriculum...' }
                            ];
                            setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), topicsList: updated }
                            });
                          }}
                          className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Topic</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(contentForm.workshopManagement?.topicsList || []).map((top, idx) => (
                          <div key={top.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 relative">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                              <span className="text-[10px] font-bold text-[#045494]">Topic #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (contentForm.workshopManagement?.topicsList || []).filter((_, i) => i !== idx);
                                  setContentForm({
                                    ...contentForm,
                                    workshopManagement: { ...(contentForm.workshopManagement || {}), topicsList: updated }
                                  });
                                }}
                                className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Category</label>
                              <input
                                type="text"
                                value={top.category}
                                onChange={(e) => {
                                  const updated = [...(contentForm.workshopManagement?.topicsList || [])];
                                  updated[idx] = { ...updated[idx], category: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    workshopManagement: { ...(contentForm.workshopManagement || {}), topicsList: updated }
                                  });
                                }}
                                className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Topic Title</label>
                              <input
                                type="text"
                                value={top.title}
                                onChange={(e) => {
                                  const updated = [...(contentForm.workshopManagement?.topicsList || [])];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    workshopManagement: { ...(contentForm.workshopManagement || {}), topicsList: updated }
                                  });
                                }}
                                className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description</label>
                              <textarea
                                rows={2}
                                value={top.description}
                                onChange={(e) => {
                                  const updated = [...(contentForm.workshopManagement?.topicsList || [])];
                                  updated[idx] = { ...updated[idx], description: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    workshopManagement: { ...(contentForm.workshopManagement || {}), topicsList: updated }
                                  });
                                }}
                                className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs text-slate-700 resize-y"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BESPOKE TRAINING & CREDENTIALING */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Customized Training Card</h3>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Card Title</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.bespokeTitle || 'Customized Training for Universities & Organizations'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), bespokeTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-[#ffffff] text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Description</label>
                          <textarea
                            rows={3}
                            value={contentForm.workshopManagement?.bespokeDescription || 'We design and deliver bespoke training tracks for faculties, research centers, and government bodies. Syllabus, schedule, hands-on dataset exercises, and assessment rubrics are matched exactly to your department’s KPIs.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), bespokeDescription: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-[#ffffff] text-slate-900 resize-y"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Button Text</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.bespokeButtonText || 'Inquire Bespoke Program'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), bespokeButtonText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-[#ffffff] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-slate-200 pb-2">Verified Digital Credentialing Banner</h3>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Banner Title</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.credentialingTitle || 'Verified Digital Credentialing'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), credentialingTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-[#ffffff] text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Description</label>
                          <textarea
                            rows={3}
                            value={contentForm.workshopManagement?.credentialingDescription || 'Every EGE workshop participant receives a uniquely serialized, QR-coded digital Certificate of Completion. Academic institutions and hiring committees can independently authenticate credentials in real-time through our public verification portal.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), credentialingDescription: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-[#ffffff] text-slate-900 resize-y"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Button Text</label>
                          <input
                            type="text"
                            value={contentForm.workshopManagement?.credentialingButtonText || 'Launch Verification Portal'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              workshopManagement: { ...(contentForm.workshopManagement || {}), credentialingButtonText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-[#ffffff] text-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Workshop Content Changes</span>
                      </button>
                      <span className="text-[11px] text-slate-500 italic">Changes reflect dynamically on the public Workshops page.</span>
                    </div>
                  </form>
                )}

                {/* TAB 2: UPCOMING WORKSHOPS */}
                {workshopManagementTab === 'upcoming' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Upcoming Workshops Manager</div>
                        <p className="text-[11px] text-slate-600">Create upcoming workshops, manage registration participant lists, and toggle attendance links.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const existingWsIds = (data.workshops || []).map(w => (w.workshopId || `EGEW${w.id}`).toUpperCase());
                          let autoNum = (data.workshops || []).length + 15;
                          while (existingWsIds.includes(`EGEW${autoNum}`)) {
                            autoNum++;
                          }
                          setEditingWorkshopModal({
                            id: `w-${Date.now()}`,
                            workshopId: `EGEW${autoNum}`,
                            title: 'AI in Education',
                            date: 'March 15, 2026',
                            time: '10:00 AM - 1:00 PM',
                            mode: 'Online (Zoom)',
                            venue: '—',
                            fee: 'Free',
                            isFree: true,
                            status: 'UPCOMING',
                            description: 'Elite Global Excellence Sdn. Bhd. (EGE) organizes workshops, seminars, webinars, and professional training programs designed to support researchers, students, educators, universities, and industry professionals...',
                            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                            whatsappLink: 'https://chat.whatsapp.com/EGEWorkshopAI2026',
                            whatsappQrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://chat.whatsapp.com/EGEWorkshopAI2026',
                            objectives: [
                              'Enhance research knowledge and practical skills.',
                              'Promote academic excellence and lifelong learning.',
                              'Support researchers in scholarly publishing and research development.'
                            ],
                            attendanceOpen: false,
                          });
                        }}
                        className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Upcoming Workshop</span>
                      </button>
                    </div>

                    {/* UPCOMING WORKSHOPS TABLE */}
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                            <th className="py-3 px-4">Workshop ID</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Fee / Mode</th>
                            <th className="py-3 px-4">Attendance</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(() => {
                            const isPastWs = (w: any) => {
                              if (w.status === 'PAST') return true;
                              if (!w.date) return false;
                              const pDate = new Date(w.date);
                              if (!isNaN(pDate.getTime())) {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return pDate < today;
                              }
                              return false;
                            };

                            return (data.workshops || []).filter(w => !isPastWs(w)).map((ws) => {
                              const wsId = ws.workshopId || `EGEW${ws.id}`;
                              const regCount = (data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === wsId.toUpperCase()).length;
                              const isAttendanceOpen = ws.attendanceOpen !== false;

                              return (
                                <tr key={ws.id} className="hover:bg-slate-50/80 transition">
                                  <td className="py-3 px-4 font-mono font-bold text-[#045494]">
                                    {wsId}
                                  </td>
                                  <td className="py-3 px-4 font-bold text-slate-900">
                                    {ws.title}
                                  </td>
                                  <td className="py-3 px-4 text-slate-600">
                                    <div>{ws.date}</div>
                                    <div className="text-[10px] text-slate-400">{ws.time}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                      {ws.fee || 'Free'}
                                    </span>
                                    <div className="text-[10px] text-slate-500 mt-0.5">{ws.mode}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isAttendanceOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                      {isAttendanceOpen ? 'OPEN' : 'CLOSED'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                                    <button
                                      onClick={() => setViewingRegistrationsModal(ws)}
                                      className="bg-blue-50 text-[#045494] hover:bg-blue-100 px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition border border-blue-200"
                                      title="View Registered Participants & Attendance Control"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Registrations ({regCount})</span>
                                    </button>
                                    <button
                                      onClick={() => setEditingWorkshopModal(ws)}
                                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition"
                                      title="Edit Workshop Details"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleAdminCrud('DELETE', 'workshops', { id: ws.id })}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition"
                                      title="Delete Workshop"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: PAST ARCHIVE */}
                {workshopManagementTab === 'past' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Past Workshops Archive</div>
                        <p className="text-[11px] text-slate-600">Workshops whose date has passed or status set to PAST automatically filter here. View participant history and certificate validation logs.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const existingWsIds = (data.workshops || []).map(w => (w.workshopId || `EGEW${w.id}`).toUpperCase());
                          let autoNum = (data.workshops || []).length + 15;
                          while (existingWsIds.includes(`EGEW${autoNum}`)) {
                            autoNum++;
                          }
                          setEditingWorkshopModal({
                            id: `w-${Date.now()}`,
                            workshopId: `EGEW${autoNum}`,
                            title: 'Advanced Research Masterclass (Concluded)',
                            date: 'January 10, 2026',
                            time: '10:00 AM - 1:00 PM',
                            mode: 'Online (Zoom)',
                            venue: '—',
                            fee: 'Free',
                            isFree: true,
                            status: 'PAST',
                            description: 'Concluded masterclass on research methodology, data analysis, and academic writing.',
                            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                            whatsappLink: '',
                            whatsappQrUrl: '',
                            objectives: ['Review core findings', 'Verify certificate distribution'],
                            attendanceOpen: false,
                          });
                        }}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Past Workshop</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                            <th className="py-3 px-4">Workshop ID</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Registered</th>
                            <th className="py-3 px-4">Attended & Certified</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(() => {
                            const isPastWs = (w: any) => {
                              if (w.status === 'PAST') return true;
                              if (!w.date) return false;
                              const pDate = new Date(w.date);
                              if (!isNaN(pDate.getTime())) {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return pDate < today;
                              }
                              return false;
                            };

                            return (data.workshops || []).filter(w => isPastWs(w)).map((ws) => {
                              const wsId = ws.workshopId || `EGEW${ws.id}`;
                              const regList = (data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === wsId.toUpperCase());
                              const attendedCount = regList.filter(r => r.attended).length;

                              return (
                                <tr key={ws.id} className="hover:bg-slate-50/80 transition">
                                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                                    {wsId}
                                  </td>
                                  <td className="py-3 px-4 font-bold text-slate-900">
                                    {ws.title}
                                  </td>
                                  <td className="py-3 px-4 text-slate-600">
                                    {ws.date}
                                  </td>
                                  <td className="py-3 px-4 font-bold text-slate-800">
                                    {regList.length} Participants
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                                      {attendedCount} Certificates Issued
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                                    <button
                                      onClick={() => setViewingRegistrationsModal(ws)}
                                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition border border-slate-300"
                                      title="View Registrations & Certificates"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View History</span>
                                    </button>
                                    <button
                                      onClick={() => setEditingWorkshopModal(ws)}
                                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition inline-block"
                                      title="Edit Past Workshop Details"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleAdminCrud('DELETE', 'workshops', { id: ws.id })}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition inline-block"
                                      title="Delete Past Workshop"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 4: ATTENDANCE MANAGER */}
                {workshopManagementTab === 'attendance' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl">
                      <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Workshop Attendance Submissions</div>
                      <p className="text-[11px] text-slate-600 font-medium">View and manage attendance form feedback submissions for each workshop.</p>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                            <th className="py-3 px-4">Workshop ID</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Fee</th>
                            <th className="py-3 px-4">Mode</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(data.workshops || []).map((ws) => {
                            const wsId = ws.workshopId || `EGEW${ws.id}`;
                            const attList = (data.workshopAttendances || []).filter(a => a.workshopId.toUpperCase() === wsId.toUpperCase());
                            const isAttendanceOpen = ws.attendanceOpen !== false;

                            return (
                              <tr key={ws.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-4 font-mono font-bold text-[#045494]">
                                  {wsId}
                                </td>
                                <td className="py-3 px-4 font-bold text-slate-900">
                                  {ws.title}
                                </td>
                                <td className="py-3 px-4 text-slate-600">
                                  <div>{ws.date || 'TBD'}</div>
                                  <div className="text-[10px] text-slate-400">{ws.time || 'TBD'}</div>
                                </td>
                                <td className="py-3 px-4 font-bold text-emerald-700">
                                  {ws.fee || 'Free'}
                                </td>
                                <td className="py-3 px-4 text-slate-600">
                                  {ws.mode || 'TBD'}
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isAttendanceOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {isAttendanceOpen ? 'OPEN' : 'CLOSED'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => setViewingAttendancesModal(ws)}
                                    className="bg-[#045494] hover:bg-[#033b68] text-white px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition shadow-xs"
                                  >
                                    <Users className="w-3.5 h-3.5" />
                                    <span>Attendances ({attList.length})</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}



            {/* EVENTS CRUD SUB-TAB */}
            {activeSubTab === 'events' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Events & Conferences Manager</h2>
                    <p className="text-xs text-slate-500">Add, edit, or remove upcoming and past conferences.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingItem({
                        type: 'events',
                        item: {
                          id: `event-${Date.now()}`,
                          title: '',
                          category: 'CONFERENCE',
                          date: 'Nov 15–16, 2026',
                          locationMode: 'Hybrid (KL & Online)',
                          description: '',
                          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
                          status: 'UPCOMING',
                        },
                      })
                    }
                    className="bg-[#045494] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {data.events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{evt.title}</span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                            {evt.status}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          {evt.date} · {evt.locationMode}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'events', item: { ...evt } })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdminCrud('DELETE', 'events', { id: evt.id })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NEWS CRUD SUB-TAB */}
            {activeSubTab === 'news' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">News & Press Releases</h2>
                    <p className="text-xs text-slate-500">Publish or revise announcements.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingItem({
                        type: 'newsArticles',
                        item: {
                          id: `news-${Date.now()}`,
                          title: '',
                          excerpt: '',
                          content: '',
                          category: 'CONFERENCES',
                          publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                          author: 'EGE Editorial Office',
                          isPublished: true,
                          imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
                        },
                      })
                    }
                    className="bg-[#045494] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Article</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {data.newsArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{article.title}</span>
                          <span className="bg-blue-50 text-[#045494] px-2 py-0.5 rounded text-[10px] font-bold">
                            {article.category}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          {article.publishDate} · {article.author}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'newsArticles', item: { ...article } })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdminCrud('DELETE', 'newsArticles', { id: article.id })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AMBASSADORS CRUD SUB-TAB */}
            {activeSubTab === 'ambassadors' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Academic Ambassadors</h2>
                    <p className="text-xs text-slate-500">Manage distinguished university ambassadors.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingItem({
                        type: 'ambassadors',
                        item: {
                          id: `amb-${Date.now()}`,
                          name: '',
                          title: '',
                          country: '',
                          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                          bio: '',
                          researchInterests: ['Computer Science', 'AI'],
                          collaborationHighlights: '',
                        },
                      })
                    }
                    className="bg-[#045494] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Ambassador</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {data.ambassadors.map((amb) => (
                    <div
                      key={amb.id}
                      className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
                    >
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={amb.photoUrl}
                          alt={amb.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{amb.name}</span>
                          <span className="text-slate-500 text-[11px]">{amb.title} ({amb.country})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'ambassadors', item: { ...amb } })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdminCrud('DELETE', 'ambassadors', { id: amb.id })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COURSES MANAGEMENT SUB-TAB */}
            {activeSubTab === 'coursesManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Courses Management</h2>
                    <p className="text-xs text-slate-500">
                      Customize course landing page text & delivery framework, add new courses, remote delete, and manage course offerings.
                    </p>
                  </div>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                  {[
                    { id: 'content', label: '1. Content Customization (Header, Framework & Licensing)' },
                    { id: 'manageCourses', label: `2. Manage Courses (${(data.courses || contentForm.coursesPage?.coursesList || []).length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCoursesSubTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        coursesSubTab === tab.id
                          ? 'bg-[#045494] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB 1: CONTENT CUSTOMIZATION */}
                {coursesSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs animate-in fade-in">
                    <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-2xl space-y-1">
                      <div className="text-xs font-bold text-[#045494] uppercase tracking-wider">Courses Interface Content Editor</div>
                      <p className="text-[11px] text-slate-600">Customize the hero header, pedagogical delivery framework steps, and university cohort licensing card.</p>
                    </div>

                    {/* 1. HERO HEADER */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Header Section</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Badge Text</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.heroBadge || 'SPECIALIZED LEARNING'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Title</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.heroTitle || 'Academic & Professional Courses'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.coursesPage?.heroDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            coursesPage: { ...(contentForm.coursesPage || {}), heroDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* 2. PEDAGOGICAL DESIGN */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Pedagogical Design Framework</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Badge Text</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.pedagogyBadge || 'PEDAGOGICAL DESIGN'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), pedagogyBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Framework Title</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.pedagogyTitle || 'The EGE Course Delivery Framework'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), pedagogyTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.pedagogySubtitle || 'Rigorous, hands-on, and outcome-oriented course structure ensuring tangible academic deliverables.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), pedagogySubtitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-800">Framework Steps (4 Items)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(contentForm.coursesPage?.pedagogySteps || []).map((st, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                <span className="text-[10px] font-bold text-[#045494]">Step {st.step}</span>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Step Title</label>
                                <input
                                  type="text"
                                  value={st.title}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.coursesPage?.pedagogySteps || [])];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      coursesPage: { ...(contentForm.coursesPage || {}), pedagogySteps: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Step Description</label>
                                <textarea
                                  rows={2}
                                  value={st.description}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.coursesPage?.pedagogySteps || [])];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      coursesPage: { ...(contentForm.coursesPage || {}), pedagogySteps: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. UNIVERSITY & FACULTY LICENSING */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">University & Faculty Licensing Section</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Badge Text</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.licensingBadge || 'UNIVERSITY & FACULTY LICENSING'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), licensingBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.licensingTitle || 'Sponsor a Cohort for Your Postgraduate Faculty'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), licensingTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.coursesPage?.licensingDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            coursesPage: { ...(contentForm.coursesPage || {}), licensingDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Button Text</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.licensingCtaText || 'Request Cohort Quotation'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), licensingCtaText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">WhatsApp Link for Quotation</label>
                          <input
                            type="text"
                            value={contentForm.coursesPage?.licensingWhatsappUrl || 'https://wa.me/601139886361'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              coursesPage: { ...(contentForm.coursesPage || {}), licensingWhatsappUrl: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 font-mono"
                            placeholder="https://wa.me/..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Courses Interface Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2: MANAGE COURSES */}
                {coursesSubTab === 'manageCourses' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">All Active Courses</h3>
                      <button
                        onClick={() =>
                          setEditingCourseModal({
                            id: `course-${Date.now()}`,
                            code: 'EGE-CRS',
                            title: '',
                            category: 'Research Methodology',
                            duration: '6 weeks',
                            mode: 'Online (Live)',
                            imageUrl: '',
                            outlinePdfUrl: '',
                            googleFormLink: 'https://forms.gle/',
                            description: '',
                            objective: '',
                            benefits: ['Hands-on practical dataset practice', 'Serialized verification certificate'],
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Course</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.courses || contentForm.coursesPage?.coursesList || []).map((crs) => (
                        <div key={crs.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                              {crs.imageUrl ? (
                                <img src={crs.imageUrl} alt={crs.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                              ) : (
                                <div className="w-16 h-16 rounded-xl bg-blue-100 text-[#045494] flex items-center justify-center font-bold text-xs shrink-0">
                                  COURSE
                                </div>
                              )}
                              <div>
                                <span className="bg-blue-100 text-[#045494] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                                  {crs.category || 'General'}
                                </span>
                                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{crs.title}</h4>
                                <div className="text-slate-500 text-[11px] font-medium flex items-center gap-2 mt-0.5">
                                  <span>{crs.duration}</span>
                                  <span>•</span>
                                  <span>{crs.mode}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setEditingCourseModal({ ...crs })}
                                className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition"
                                title="Edit Course"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete course "${crs.title}"?`)) {
                                    await handleAdminCrud('DELETE', 'courses', { id: crs.id });
                                    const filtered = (contentForm.coursesPage?.coursesList || []).filter(c => c.id !== crs.id);
                                    const updatedForm = {
                                      ...contentForm,
                                      coursesPage: { ...(contentForm.coursesPage || {}), coursesList: filtered }
                                    };
                                    setContentForm(updatedForm);
                                    await handleSaveDirectSiteContent(updatedForm);
                                  }
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition"
                                title="Delete Course"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {crs.description && <p className="text-slate-600 text-xs line-clamp-2">{crs.description}</p>}

                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                            {crs.outlinePdfUrl ? (
                              <span className="text-emerald-700 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> PDF Outline Uploaded
                              </span>
                            ) : (
                              <span className="text-amber-600">No PDF outline</span>
                            )}
                            {crs.googleFormLink && (
                              <a href={crs.googleFormLink} target="_blank" rel="noopener noreferrer" className="text-[#045494] font-bold hover:underline flex items-center gap-1">
                                Google Form <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOCK VIVA MANAGEMENT SUB-TAB */}
            {activeSubTab === 'mockVivaManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Mock Viva Management</h2>
                    <p className="text-xs text-slate-500">
                      Full control center for postgraduate mock viva defense clinic, realities, 4-phase protocol, package pricing & custom WhatsApp links, proposal packages, FAQs, and PDF brochure downloads.
                    </p>
                  </div>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                  {[
                    { id: 'hero', label: '1. Hero Section' },
                    { id: 'realities', label: '2. Defense Realities' },
                    { id: 'methodology', label: '3. Methodology Protocol' },
                    { id: 'packages', label: '4. Defense Clinic Packages' },
                    { id: 'proposal', label: '5. Proposal Defense Packages' },
                    { id: 'faqs', label: '6. FAQs' },
                    { id: 'brochure', label: '7. Brochure Banner' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMockVivaSubTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        mockVivaSubTab === tab.id
                          ? 'bg-[#045494] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs animate-in fade-in">
                  {/* 1. HERO SECTION */}
                  {mockVivaSubTab === 'hero' && (
                    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Section Settings</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Hero Badge</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.heroBadge || 'POSTGRADUATE DEFENSE CLINIC'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Hero Title</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.heroTitle || "Master’s & PhD Mock Viva Defense Preparation"}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.mockVivaPage?.heroDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            mockVivaPage: { ...(contentForm.mockVivaPage || {}), heroDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Book Button Text</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.bookCtaText || 'Book Mock Viva Defense'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), bookCtaText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">WhatsApp Link for Booking</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.bookWhatsappUrl || 'https://wa.me/601139886361'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), bookWhatsappUrl: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono bg-white text-slate-900"
                            placeholder="https://wa.me/..."
                          />
                        </div>
                      </div>

                      <FileUploader
                        label="Brochure PDF (Download Brochure Button)"
                        accept=".pdf,.doc,.docx,.zip"
                        value={contentForm.mockVivaPage?.brochurePdfUrl || ''}
                        onChange={(url) => setContentForm({
                          ...contentForm,
                          mockVivaPage: { ...(contentForm.mockVivaPage || {}), brochurePdfUrl: url }
                        })}
                        helpText="PDF, DOC, ZIP (max 20MB) upload from system"
                      />
                    </div>
                  )}

                  {/* 2. REALITIES SECTION */}
                  {mockVivaSubTab === 'realities' && (
                    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">The Realities of Postgraduate Defense</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.realitiesBadge || 'THE REALITIES OF POSTGRADUATE DEFENSE'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), realitiesBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.realitiesTitle || 'Why Mock Viva Preparation Matters'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), realitiesTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.mockVivaPage?.realitiesDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            mockVivaPage: { ...(contentForm.mockVivaPage || {}), realitiesDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-800">4 Reality Pitfalls</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(contentForm.mockVivaPage?.realitiesItems || []).map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pitfall Title</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.mockVivaPage?.realitiesItems || [])];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      mockVivaPage: { ...(contentForm.mockVivaPage || {}), realitiesItems: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pitfall Description</label>
                                <textarea
                                  rows={2}
                                  value={item.description}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.mockVivaPage?.realitiesItems || [])];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      mockVivaPage: { ...(contentForm.mockVivaPage || {}), realitiesItems: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. METHODOLOGY SECTION */}
                  {mockVivaSubTab === 'methodology' && (() => {
                    const phases = contentForm.mockVivaPage?.phases || contentForm.mockVivaPage?.methodologyPhases || [
                      {
                        phase: 'Phase 01',
                        phaseNumber: 'Phase 01',
                        title: 'Thesis Document Review',
                        description: 'The panel reads your complete draft, mapping conceptual weaknesses, statistical ambiguities, and likely points of examiner friction.'
                      },
                      {
                        phase: 'Phase 02',
                        phaseNumber: 'Phase 02',
                        title: 'Slide Deck & Strategy Coaching',
                        description: 'We restructure your 20-minute presentation: tightening narrative arc, emphasizing findings, and cutting redundant background slides.'
                      },
                      {
                        phase: 'Phase 03',
                        phaseNumber: 'Phase 03',
                        title: 'Live Simulated Viva Voce',
                        description: 'Realistic 90-120 minute oral examination. The panel cross-examines you under authentic academic committee conditions.'
                      },
                      {
                        phase: 'Phase 04',
                        phaseNumber: 'Phase 04',
                        title: 'Diagnostic Report & Action Plan',
                        description: 'Receive the recorded video, written panel evaluation scores, examiner question bank, and specific revisions needed before defense day.'
                      }
                    ];

                    const updatePhases = (newPhases: any[]) => {
                      setContentForm({
                        ...contentForm,
                        mockVivaPage: {
                          ...(contentForm.mockVivaPage || {}),
                          phases: newPhases.map(p => ({ phase: p.phaseNumber || p.phase, phaseNumber: p.phaseNumber || p.phase, title: p.title, description: p.description })),
                          methodologyPhases: newPhases.map(p => ({ id: p.id || `m-${Math.random()}`, phaseNumber: p.phaseNumber || p.phase, title: p.title, description: p.description }))
                        }
                      });
                    };

                    return (
                      <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Structured Methodology & Protocol</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.methodologyBadge || 'STRUCTURED METHODOLOGY'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), methodologyBadge: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1">Protocol Title</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.methodologyTitle || 'The 4-Phase EGE Defense Preparation Protocol'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), methodologyTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={contentForm.mockVivaPage?.methodologyDescription || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), methodologyDescription: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                          />
                        </div>

                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold text-slate-800">4 Protocol Phases</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {phases.map((ph: any, idx: number) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                                <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-1">
                                  <div className="col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Phase Tag</label>
                                    <input
                                      type="text"
                                      value={ph.phaseNumber || ph.phase || `Phase 0${idx + 1}`}
                                      onChange={(e) => {
                                        const updated = [...phases];
                                        updated[idx] = { ...updated[idx], phaseNumber: e.target.value, phase: e.target.value };
                                        updatePhases(updated);
                                      }}
                                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-[#045494]"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Phase Title</label>
                                    <input
                                      type="text"
                                      value={ph.title || ''}
                                      onChange={(e) => {
                                        const updated = [...phases];
                                        updated[idx] = { ...updated[idx], title: e.target.value };
                                        updatePhases(updated);
                                      }}
                                      className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-slate-900"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Phase Description</label>
                                  <textarea
                                    rows={3}
                                    value={ph.description || ''}
                                    onChange={(e) => {
                                      const updated = [...phases];
                                      updated[idx] = { ...updated[idx], description: e.target.value };
                                      updatePhases(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 4. DEFENSE CLINIC PACKAGES */}
                  {mockVivaSubTab === 'packages' && (() => {
                    const packagesList = contentForm.mockVivaPage?.mainPackagesList || (contentForm.mockVivaPage?.mainPackages ? contentForm.mockVivaPage.mainPackages.map(p => ({
                      id: p.id,
                      duration: p.duration,
                      name: p.title,
                      title: p.title,
                      description: p.tagline,
                      badge: p.isPopular ? 'MOST POPULAR PACKAGE' : '',
                      features: p.features,
                      buttonText: p.buttonText,
                      whatsappUrl: p.whatsappLink,
                      invoiceText: p.secondaryText
                    })) : [
                      {
                        id: 'pkg-essential',
                        duration: '4 Weeks · 1 Month',
                        name: 'Essential Preparation Package',
                        title: 'Essential Preparation Package',
                        description: 'Rapid readiness audit for candidates with an imminent defense date.',
                        badge: '',
                        features: [
                          'Complete thesis draft review (Up to 250 pages)',
                          '1 Comprehensive 90-minute Mock Viva Simulation',
                          '2-Member Expert Academic Examiner Panel',
                          'Presentation slide deck optimization (Up to 30 slides)',
                          'Full Written Examiner Critique & Question Bank',
                          'High-probability defense question guide',
                          'Full HD video recording of simulated defense',
                          'EGE Certificate of Mock Viva Completion'
                        ],
                        buttonText: 'Book This Package',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Essential%20Preparation%20Package%20(4%20Weeks)',
                        invoiceText: 'Need a custom installment or institutional invoice?'
                      },
                      {
                        id: 'pkg-professional',
                        duration: '8 Weeks · 2 Months',
                        name: 'Professional Preparation Package',
                        title: 'Professional Preparation Package',
                        description: 'Our most popular comprehensive preparation protocol for PhD candidates.',
                        badge: 'MOST POPULAR PACKAGE',
                        features: [
                          'In-depth thesis & methodology stress test (Up to 350 pages)',
                          '2 Full Mock Viva Defense Simulations (Midpoint & Final)',
                          '3-Member International Academic Examiner Panel',
                          'Slide deck design, structure & speech timing coaching',
                          'Novelty gap analysis & theoretical framework audit',
                          'Examiner psychological strategy & counter-question clinic',
                          'Two Comprehensive Written Panel Evaluation Reports',
                          '2 One-on-one follow-up mentoring sessions (60 mins each)',
                          'Detailed examiner question bank with suggested response outlines',
                          'Full HD video recordings of both simulations',
                          'EGE Certificate of Defense Readiness'
                        ],
                        buttonText: 'Book This Package',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Professional%20Preparation%20Package%20(8%20Weeks)',
                        invoiceText: 'Need a custom installment or institutional invoice?'
                      },
                      {
                        id: 'pkg-premium',
                        duration: '12 Weeks · 3 Months',
                        name: 'Premium Research Defense Package',
                        title: 'Premium Research Defense Package',
                        description: 'Total mastery for high-stakes doctoral defenses and complex interdisciplinary theses.',
                        badge: '',
                        features: [
                          'End-to-end dissertation critique (Unlimited page length)',
                          '3 Milestone Defense Simulations (Preliminary, Panel Stress Test, Final)',
                          '4-Member Elite International Panel (inc. Subject Specialist & Statistician)',
                          'Complete presentation redesign with professional scientific formatting',
                          'Methodological defense rebuttals & statistical verification',
                          'Unlimited one-on-one coaching checkpoints during 12 weeks',
                          'Three Comprehensive Diagnostic Evaluation Reports',
                          'Rebuttal letter strategy for post-viva corrections guidance',
                          'Full HD recordings with examiner commentary timestamps',
                          'Priority 24/7 WhatsApp coordinator channel',
                          'EGE Distinguished Scholar Defense Honors Certificate'
                        ],
                        buttonText: 'Book This Package',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Premium%20Research%20Defense%20Package%20(12%20Weeks)',
                        invoiceText: 'Need a custom installment or institutional invoice?'
                      }
                    ]);

                    const updatePackages = (newPkgs: any[]) => {
                      const mainPackagesList = newPkgs.map(p => ({
                        id: p.id || `pkg-${Math.random()}`,
                        duration: p.duration,
                        name: p.name || p.title,
                        title: p.name || p.title,
                        description: p.description,
                        badge: p.badge || '',
                        features: Array.isArray(p.features) ? p.features : String(p.features || '').split('\n').filter(Boolean),
                        buttonText: p.buttonText || 'Book This Package',
                        whatsappUrl: p.whatsappUrl || p.whatsappLink || '',
                        invoiceText: p.invoiceText || p.secondaryText || 'Need a custom installment or institutional invoice?'
                      }));

                      const mainPackages = newPkgs.map(p => ({
                        id: p.id || `pkg-${Math.random()}`,
                        duration: p.duration,
                        title: p.name || p.title,
                        tagline: p.description,
                        isPopular: Boolean(p.badge?.toLowerCase().includes('popular') || p.badge === 'MOST POPULAR PACKAGE'),
                        features: Array.isArray(p.features) ? p.features : String(p.features || '').split('\n').filter(Boolean),
                        whatsappLink: p.whatsappUrl || p.whatsappLink || '',
                        buttonText: p.buttonText || 'Book This Package',
                        secondaryText: p.invoiceText || p.secondaryText || 'Need a custom installment or institutional invoice?'
                      }));

                      setContentForm({
                        ...contentForm,
                        mockVivaPage: {
                          ...(contentForm.mockVivaPage || {}),
                          mainPackagesList,
                          mainPackages
                        }
                      });
                    };

                    return (
                      <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Defense Clinic Main Packages & WhatsApp Links</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.mainPackagesBadge || 'DEFENSE CLINIC PACKAGES'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), mainPackagesBadge: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.mainPackagesTitle || 'Comprehensive Mock Viva Packages'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), mainPackagesTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.mainPackagesSubtitle || 'Tailored to your defense timeline and degree requirements. All packages include verified EGE credentialing.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), mainPackagesSubtitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div className="space-y-6 pt-2">
                          {packagesList.map((pkg: any, idx: number) => (
                            <div key={pkg.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="text-xs font-bold text-[#045494]">Package #{idx + 1}: {pkg.name || pkg.title}</span>
                                {pkg.badge && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{pkg.badge}</span>}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Duration Header</label>
                                  <input
                                    type="text"
                                    value={pkg.duration || ''}
                                    onChange={(e) => {
                                      const updated = [...packagesList];
                                      updated[idx] = { ...updated[idx], duration: e.target.value };
                                      updatePackages(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Package Title / Name</label>
                                  <input
                                    type="text"
                                    value={pkg.name || pkg.title || ''}
                                    onChange={(e) => {
                                      const updated = [...packagesList];
                                      updated[idx] = { ...updated[idx], name: e.target.value, title: e.target.value };
                                      updatePackages(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Highlight Badge (Optional)</label>
                                  <input
                                    type="text"
                                    value={pkg.badge || ''}
                                    onChange={(e) => {
                                      const updated = [...packagesList];
                                      updated[idx] = { ...updated[idx], badge: e.target.value };
                                      updatePackages(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                    placeholder="e.g. MOST POPULAR PACKAGE"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Focus / Subtitle Description</label>
                                <textarea
                                  rows={2}
                                  value={pkg.description || pkg.tagline || ''}
                                  onChange={(e) => {
                                    const updated = [...packagesList];
                                    updated[idx] = { ...updated[idx], description: e.target.value, tagline: e.target.value };
                                    updatePackages(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">What's Included Features (One per line)</label>
                                <textarea
                                  rows={6}
                                  value={Array.isArray(pkg.features) ? pkg.features.join('\n') : (pkg.features || '')}
                                  onChange={(e) => {
                                    const updated = [...packagesList];
                                    updated[idx] = { ...updated[idx], features: e.target.value.split('\n') };
                                    updatePackages(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y font-mono text-[11px]"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Button Text</label>
                                  <input
                                    type="text"
                                    value={pkg.buttonText || 'Book This Package'}
                                    onChange={(e) => {
                                      const updated = [...packagesList];
                                      updated[idx] = { ...updated[idx], buttonText: e.target.value };
                                      updatePackages(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Custom WhatsApp Link for Package</label>
                                  <input
                                    type="text"
                                    value={pkg.whatsappUrl || pkg.whatsappLink || ''}
                                    onChange={(e) => {
                                      const updated = [...packagesList];
                                      updated[idx] = { ...updated[idx], whatsappUrl: e.target.value, whatsappLink: e.target.value };
                                      updatePackages(updated);
                                    }}
                                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"
                                    placeholder="https://wa.me/..."
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Subnote / Secondary Text</label>
                                <input
                                  type="text"
                                  value={pkg.invoiceText || pkg.secondaryText || 'Need a custom installment or institutional invoice?'}
                                  onChange={(e) => {
                                    const updated = [...packagesList];
                                    updated[idx] = { ...updated[idx], invoiceText: e.target.value, secondaryText: e.target.value };
                                    updatePackages(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-700"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 5. PROPOSAL DEFENSE PACKAGES */}
                  {mockVivaSubTab === 'proposal' && (() => {
                    const proposalList = contentForm.mockVivaPage?.proposalPackagesList || (contentForm.mockVivaPage?.proposalPackages ? contentForm.mockVivaPage.proposalPackages.map(p => ({
                      id: p.id,
                      duration: p.duration,
                      title: p.name || p.title,
                      description: p.focus || p.description,
                      whatsappUrl: p.whatsappLink || p.whatsappUrl,
                      buttonText: p.buttonText
                    })) : [
                      {
                        id: 'prop-1',
                        duration: '4 Weeks',
                        title: '1-Month Proposal Preparation',
                        description: 'Problem statement alignment, scope refinement, and 1 simulated proposal defense.',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%201-Month%20Proposal%20Preparation',
                        buttonText: 'Enrol Candidate'
                      },
                      {
                        id: 'prop-2',
                        duration: '8 Weeks',
                        title: '2-Month Proposal Preparation',
                        description: 'Methodological framework validation, literature gap audit, and 2 simulated defenses.',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%202-Month%20Proposal%20Preparation',
                        buttonText: 'Enrol Candidate'
                      },
                      {
                        id: 'prop-3',
                        duration: '12 Weeks',
                        title: '3-Month Premium Proposal Track',
                        description: 'Full proposal manuscript review, ethical clearance preparation, and panel question mastery.',
                        whatsappUrl: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%203-Month%20Premium%20Proposal%20Track',
                        buttonText: 'Enrol Candidate'
                      }
                    ]);

                    const updateProposal = (newList: any[]) => {
                      const proposalPackagesList = newList.map(p => ({
                        id: p.id || `prop-${Math.random()}`,
                        duration: p.duration,
                        title: p.title || p.name,
                        description: p.description || p.focus,
                        buttonText: p.buttonText || 'Enrol Candidate',
                        whatsappUrl: p.whatsappUrl || p.whatsappLink || ''
                      }));

                      const proposalPackages = newList.map(p => ({
                        id: p.id || `prop-${Math.random()}`,
                        duration: p.duration,
                        name: p.title || p.name,
                        focus: p.description || p.focus,
                        buttonText: p.buttonText || 'Enrol Candidate',
                        whatsappLink: p.whatsappUrl || p.whatsappLink || ''
                      }));

                      setContentForm({
                        ...contentForm,
                        mockVivaPage: {
                          ...(contentForm.mockVivaPage || {}),
                          proposalPackagesList,
                          proposalPackages
                        }
                      });
                    };

                    return (
                      <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Early-Stage Proposal Defense Packages</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.proposalBadge || 'EARLY-STAGE POSTGRADUATE DEFENSE'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), proposalBadge: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                            <input
                              type="text"
                              value={contentForm.mockVivaPage?.proposalTitle || 'Proposal Defense Preparation Packages (Defense of Proposal)'}
                              onChange={(e) => setContentForm({
                                ...contentForm,
                                mockVivaPage: { ...(contentForm.mockVivaPage || {}), proposalTitle: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={contentForm.mockVivaPage?.proposalDescription || ''}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), proposalDescription: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">General Proposal WhatsApp Link ("Book Proposal Defense")</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.proposalWhatsappUrl || 'https://wa.me/601139886361'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), proposalWhatsappUrl: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono bg-white text-slate-900"
                            placeholder="https://wa.me/..."
                          />
                        </div>

                        <div className="space-y-4 pt-2">
                          <h4 className="text-xs font-bold text-slate-800">3 Proposal Track Packages</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {proposalList.map((prop: any, idx: number) => (
                              <div key={prop.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Duration</label>
                                  <input
                                    type="text"
                                    value={prop.duration || ''}
                                    onChange={(e) => {
                                      const updated = [...proposalList];
                                      updated[idx] = { ...updated[idx], duration: e.target.value };
                                      updateProposal(updated);
                                    }}
                                    className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Package Title / Name</label>
                                  <input
                                    type="text"
                                    value={prop.title || prop.name || ''}
                                    onChange={(e) => {
                                      const updated = [...proposalList];
                                      updated[idx] = { ...updated[idx], title: e.target.value, name: e.target.value };
                                      updateProposal(updated);
                                    }}
                                    className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description / Focus</label>
                                  <textarea
                                    rows={3}
                                    value={prop.description || prop.focus || ''}
                                    onChange={(e) => {
                                      const updated = [...proposalList];
                                      updated[idx] = { ...updated[idx], description: e.target.value, focus: e.target.value };
                                      updateProposal(updated);
                                    }}
                                    className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Button Text</label>
                                  <input
                                    type="text"
                                    value={prop.buttonText || 'Enrol Candidate'}
                                    onChange={(e) => {
                                      const updated = [...proposalList];
                                      updated[idx] = { ...updated[idx], buttonText: e.target.value };
                                      updateProposal(updated);
                                    }}
                                    className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Custom WhatsApp Link</label>
                                  <input
                                    type="text"
                                    value={prop.whatsappUrl || prop.whatsappLink || ''}
                                    onChange={(e) => {
                                      const updated = [...proposalList];
                                      updated[idx] = { ...updated[idx], whatsappUrl: e.target.value, whatsappLink: e.target.value };
                                      updateProposal(updated);
                                    }}
                                    className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"
                                    placeholder="https://wa.me/..."
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 6. FAQS SECTION */}
                  {mockVivaSubTab === 'faqs' && (
                    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Frequently Asked Questions ({contentForm.mockVivaPage?.faqsList?.length || 0})</h3>
                          <p className="text-[11px] text-slate-500">Edit or add questions & detailed answers for Mock Viva</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const currentFaqs = contentForm.mockVivaPage?.faqsList || [];
                            const updated = [
                              ...currentFaqs,
                              { id: `faq-${Date.now()}`, question: 'New Frequently Asked Question?', answer: 'Detailed explanation answer...' }
                            ];
                            setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), faqsList: updated }
                            });
                          }}
                          className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Question</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(contentForm.mockVivaPage?.faqsList || []).map((faq, idx) => (
                          <div key={faq.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 relative">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                              <span className="text-[10px] font-bold text-[#045494]">Question #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (contentForm.mockVivaPage?.faqsList || []).filter((_, i) => i !== idx);
                                  setContentForm({
                                    ...contentForm,
                                    mockVivaPage: { ...(contentForm.mockVivaPage || {}), faqsList: updated }
                                  });
                                }}
                                className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Question</label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => {
                                  const updated = [...(contentForm.mockVivaPage?.faqsList || [])];
                                  updated[idx] = { ...updated[idx], question: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    mockVivaPage: { ...(contentForm.mockVivaPage || {}), faqsList: updated }
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Answer</label>
                              <textarea
                                rows={3}
                                value={faq.answer}
                                onChange={(e) => {
                                  const updated = [...(contentForm.mockVivaPage?.faqsList || [])];
                                  updated[idx] = { ...updated[idx], answer: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    mockVivaPage: { ...(contentForm.mockVivaPage || {}), faqsList: updated }
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7. BROCHURE BANNER */}
                  {mockVivaSubTab === 'brochure' && (
                    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Brochure Download Banner</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Banner Badge</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.brochureBadge || 'OFFICIAL SYLLABUS & PREPARATION GUIDE'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), brochureBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Banner Title</label>
                          <input
                            type="text"
                            value={contentForm.mockVivaPage?.brochureTitle || 'Download the Complete Mock Viva Service Brochure'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              mockVivaPage: { ...(contentForm.mockVivaPage || {}), brochureTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.mockVivaPage?.brochureDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            mockVivaPage: { ...(contentForm.mockVivaPage || {}), brochureDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>

                      <FileUploader
                        label="Brochure PDF Document"
                        accept=".pdf,.doc,.docx,.zip"
                        value={contentForm.mockVivaPage?.brochurePdfUrl || ''}
                        onChange={(url) => setContentForm({
                          ...contentForm,
                          mockVivaPage: { ...(contentForm.mockVivaPage || {}), brochurePdfUrl: url }
                        })}
                        helpText="PDF, DOC, ZIP (max 20MB) upload from system"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Mock Viva Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* AMBASSADORS MANAGEMENT SUB-TAB */}
            {activeSubTab === 'ambassadorsManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Global Advisory Board Control Center</h2>
                    <p className="text-xs text-slate-500">
                      Manage Global Advisory Board Members, role & responsibilities, and call for distinguished scholars application links.
                    </p>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  {[
                    { id: 'manageAmbassadors', label: '1. Manage Global Advisory Board' },
                    { id: 'content', label: '2. Customize Page Content' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAmbassadorsSubTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        ambassadorsSubTab === tab.id
                          ? 'bg-[#045494] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {ambassadorsSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs animate-in fade-in">
                    {/* 1. GLOBAL REPRESENTATION (HERO) */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Global Representation (Hero Section)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.heroBadge || 'GLOBAL REPRESENTATION'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Title</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.heroTitle || 'Global Academic Ambassadors'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Hero Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.ambassadorsPage?.heroDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), heroDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* 2. LEADERSHIP IN ACTION */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Leadership in Action (Role & Responsibilities)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.responsibilitiesBadge || 'LEADERSHIP IN ACTION'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), responsibilitiesBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.responsibilitiesTitle || 'Role & Responsibilities of EGE Ambassadors'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), responsibilitiesTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.responsibilitiesSubtitle || 'Ambassadors are vital leaders expanding high-integrity scholarly communities worldwide.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), responsibilitiesSubtitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-800">4 Responsibilities</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(contentForm.ambassadorsPage?.responsibilitiesList || []).map((resp, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                <span className="text-[10px] font-bold text-[#045494]">Step {resp.step}</span>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Title</label>
                                <input
                                  type="text"
                                  value={resp.title}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.ambassadorsPage?.responsibilitiesList || [])];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), responsibilitiesList: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description</label>
                                <textarea
                                  rows={2}
                                  value={resp.description}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.ambassadorsPage?.responsibilitiesList || [])];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), responsibilitiesList: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. CALL FOR DISTINGUISHED SCHOLARS */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Call for Distinguished Scholars (Application Form Link)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.callBadge || 'CALL FOR DISTINGUISHED SCHOLARS'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), callBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.ambassadorsPage?.callTitle || 'Become an EGE Global Academic Ambassador'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), callTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Call Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.ambassadorsPage?.callDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), callDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Apply for Ambassador Council (Google Form Link)</label>
                        <input
                          type="text"
                          value={contentForm.ambassadorsPage?.applyFormLink || 'https://forms.gle/'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), applyFormLink: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 font-mono"
                          placeholder="https://forms.gle/..."
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Admin attaches Google Form link here to accept Ambassador Council registrations.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Ambassador Page Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {ambassadorsSubTab === 'manageAmbassadors' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Registered Global Advisory Board Members</h3>
                      <button
                        onClick={() =>
                          setEditingAmbassadorModal({
                            id: `amb-${Date.now()}`,
                            name: '',
                            title: '',
                            country: '',
                            imageUrl: '',
                            photoUrl: '',
                            bio: '',
                            linkedinUrl: '',
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Member</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(data.ambassadors || contentForm.ambassadorsPage?.ambassadorsList || []).map((amb) => {
                        const ambImg = amb.imageUrl || amb.photoUrl || amb.image;
                        const ambLinkedin = amb.linkedinUrl || amb.linkedin;
                        return (
                          <div key={amb.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                {ambImg ? (
                                  <img src={ambImg} alt={amb.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#045494] flex items-center justify-center font-bold text-sm shrink-0">
                                    {amb.name ? amb.name.charAt(0) : 'M'}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-slate-900 text-sm truncate">{amb.name}</h4>
                                  <p className="text-slate-600 text-xs font-medium truncate">{amb.title}</p>
                                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                    <span className="bg-blue-100 text-[#045494] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                                      {amb.country}
                                    </span>
                                    {ambLinkedin && (
                                      <span className="bg-blue-50 text-[#0a66c2] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                                        LinkedIn Attached
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {amb.bio && (
                                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                                  {amb.bio}
                                </p>
                              )}
                            </div>

                            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingAmbassadorModal({ ...amb })}
                                className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                                title="Edit Member"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete Global Advisory Board member "${amb.name}"?`)) {
                                    await handleAdminCrud('DELETE', 'ambassadors', { id: amb.id });
                                    const filtered = (contentForm.ambassadorsPage?.ambassadorsList || []).filter(a => a.id !== amb.id);
                                    const updatedForm = {
                                      ...contentForm,
                                      ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), ambassadorsList: filtered }
                                    };
                                    setContentForm(updatedForm);
                                    await handleSaveDirectSiteContent(updatedForm);
                                  }
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                                title="Delete Member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RESEARCH NETWORK MANAGEMENT SUB-TAB */}
            {activeSubTab === 'researchNetworkManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Research Network Control Center</h2>
                    <p className="text-xs text-slate-500">
                      Manage research philosophy, pillars, research activities list, and global research members.
                    </p>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  {[
                    { id: 'manageResearchNetwork', label: '1. Manage Research Members' },
                    { id: 'content', label: '2. Customize Page Content' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setResearchNetworkSubTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        researchNetworkSubTab === tab.id
                          ? 'bg-[#045494] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {researchNetworkSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs animate-in fade-in">
                    {/* 1. OUR RESEARCH PHILOSOPHY */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Our Research Philosophy</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.philosophyBadge || 'OUR RESEARCH PHILOSOPHY'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), philosophyBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Main Tagline Title</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.philosophyTitle || 'Collaborate. Innovate. Impact.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), philosophyTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-xs">Philosophy Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.researchNetworkPage?.philosophyDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), philosophyDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-800">4 Core Research Pillars</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(contentForm.researchNetworkPage?.pillars || []).map((pil, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pillar Title</label>
                                <input
                                  type="text"
                                  value={pil.title}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.researchNetworkPage?.pillars || [])];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), pillars: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pillar Description</label>
                                <textarea
                                  rows={2}
                                  value={pil.description}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.researchNetworkPage?.pillars || [])];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), pillars: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 2. OUR RESEARCH ACTIVITIES */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Our Research Activities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.activitiesBadge || 'OUR RESEARCH ACTIVITIES'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), activitiesBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.activitiesTitle || 'The EGE Global Research & Innovation Network actively contributes to:'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), activitiesTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <label className="block font-bold text-slate-800 text-xs">Research Activity Items (One per line or edit individually)</label>
                        <textarea
                          rows={6}
                          value={(contentForm.researchNetworkPage?.activitiesList || []).join('\n')}
                          onChange={(e) => {
                            const lines = e.target.value.split('\n');
                            setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), activitiesList: lines }
                            });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y font-medium"
                          placeholder="Research and development projects&#10;International academic collaborations..."
                        />
                      </div>
                    </div>

                    {/* 3. MEMBERS HEADER & BOTTOM BANNER */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Members Section Header & Bottom Banner</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Members Section Title</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.membersTitle || 'Our Research Members'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), membersTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Members Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.membersSubtitle || 'Professors, researchers, and research assistants collaborating across disciplines and borders.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), membersSubtitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Bottom Banner Title</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.bannerTitle || 'EGE Global Research & Innovation Network'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), bannerTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1 text-xs">Bottom Banner Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.researchNetworkPage?.bannerSubtitle || 'Connecting Global Expertise, Advancing Research, Creating Impact.'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), bannerSubtitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Research Network Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {researchNetworkSubTab === 'manageResearchNetwork' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Registered Research Members</h3>
                      <button
                        onClick={() =>
                          setEditingResearchMemberModal({
                            id: `rm-${Date.now()}`,
                            name: '',
                            role: 'PRINCIPAL INVESTIGATOR',
                            institution: '',
                            country: '',
                            imageUrl: '',
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Member</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(data.researchMembers || contentForm.researchNetworkPage?.membersList || []).map((mem) => (
                        <div key={mem.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition flex flex-col justify-between">
                          <div className="flex items-center gap-3">
                            {mem.imageUrl ? (
                              <img src={mem.imageUrl} alt={mem.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#045494] flex items-center justify-center font-bold text-sm shrink-0">
                                {mem.name ? mem.name.charAt(0) : 'R'}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate">{mem.name}</h4>
                              <p className="text-[#045494] text-xs font-bold uppercase tracking-wider truncate">{mem.role}</p>
                              <p className="text-slate-600 text-xs font-medium truncate">{mem.institution}</p>
                              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                                {mem.country}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingResearchMemberModal({ ...mem })}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              title="Edit Member"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={async () => {
                                await handleAdminCrud('DELETE', 'researchMembers', { id: mem.id });
                                const filtered = (contentForm.researchNetworkPage?.membersList || []).filter(m => String(m.id) !== String(mem.id));
                                const updatedForm = {
                                  ...contentForm,
                                  researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), membersList: filtered }
                                };
                                setContentForm(updatedForm);
                                await handleSaveDirectSiteContent(updatedForm);
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              title="Delete Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

                        {/* PARTNERS MANAGEMENT SUB-TAB */}
            {activeSubTab === 'partnersManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Partners & Strategic Alliances</h2>
                    <p className="text-xs text-slate-500">Manage academic institutional partnerships and landing page copy.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPartnersSubTab('managePartners')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        partnersSubTab === 'managePartners' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Manage Partners
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnersSubTab('content')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        partnersSubTab === 'content' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Customize Content
                    </button>
                  </div>
                </div>

                {partnersSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                    {/* 1. HERO SECTION */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Section Header</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.heroBadge || 'STRATEGIC ALLIANCES'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.heroTitle || 'Academic & Institutional Partners'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Subtitle / Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.partnersPage?.heroSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            partnersPage: { ...(contentForm.partnersPage || {}), heroSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* 2. ENGAGEMENT FRAMEWORKS */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Engagement Frameworks Section</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Frameworks Badge</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.frameworksBadge || 'ENGAGEMENT FRAMEWORKS'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), frameworksBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Frameworks Title</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.frameworksTitle || 'Institutional Partnership Models'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), frameworksTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-800">Framework Cards (5 Models)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(contentForm.partnersPage?.frameworks || []).map((fw, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Model Title</label>
                                <input
                                  type="text"
                                  value={fw.title}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.partnersPage?.frameworks || [])];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      partnersPage: { ...(contentForm.partnersPage || {}), frameworks: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Description</label>
                                <textarea
                                  rows={2}
                                  value={fw.description}
                                  onChange={(e) => {
                                    const updated = [...(contentForm.partnersPage?.frameworks || [])];
                                    updated[idx] = { ...updated[idx], description: e.target.value };
                                    setContentForm({
                                      ...contentForm,
                                      partnersPage: { ...(contentForm.partnersPage || {}), frameworks: updated }
                                    });
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. ESTABLISH ACADEMIC LINKAGES CTA BANNER */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Bottom Call-to-Action Banner</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Banner Badge</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.ctaBadge || 'ESTABLISH ACADEMIC LINKAGES'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), ctaBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Banner Title</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.ctaTitle || 'Partner With Elite Global Excellence'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), ctaTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Button Label</label>
                          <input
                            type="text"
                            value={contentForm.partnersPage?.ctaButtonText || 'Inquire Institutional Partnership'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              partnersPage: { ...(contentForm.partnersPage || {}), ctaButtonText: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Banner Subtitle</label>
                        <textarea
                          rows={2}
                          value={contentForm.partnersPage?.ctaSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            partnersPage: { ...(contentForm.partnersPage || {}), ctaSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Partners Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {partnersSubTab === 'managePartners' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Partner Organizations & Universities</h3>
                      <button
                        onClick={() =>
                          setEditingPartnerModal({
                            id: `partner-${Date.now()}`,
                            name: '',
                            logoUrl: '',
                            description: '',
                            country: 'Malaysia',
                            partnershipType: 'UNIVERSITY',
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Partner</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.partners || contentForm.partnersPage?.partnersList || []).map((partner) => (
                        <div key={partner.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition flex flex-col justify-between">
                          <div className="flex items-center gap-3">
                            {partner.logoUrl ? (
                              <img src={partner.logoUrl} alt={partner.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain border border-slate-200 bg-white p-1.5 shrink-0" />
                            ) : (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 text-[#045494] flex items-center justify-center font-bold text-lg shrink-0">
                                {partner.name ? partner.name.charAt(0) : 'P'}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate">{partner.name}</h4>
                              <p className="text-slate-500 text-xs font-medium truncate">{partner.partnershipType} · {partner.country}</p>
                            </div>
                          </div>

                          {partner.description && (
                            <p className="text-xs text-slate-600 line-clamp-2 bg-white p-2 rounded-lg border border-slate-100">
                              {partner.description}
                            </p>
                          )}

                          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingPartnerModal({ ...partner })}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              title="Edit Partner"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete partner "${partner.name}"?`)) {
                                  await handleAdminCrud('DELETE', 'partners', { id: partner.id });
                                  const filtered = (contentForm.partnersPage?.partnersList || []).filter(p => p.id !== partner.id);
                                  const updatedForm = {
                                    ...contentForm,
                                    partnersPage: { ...(contentForm.partnersPage || {}), partnersList: filtered }
                                  };
                                  setContentForm(updatedForm);
                                  await handleSaveDirectSiteContent(updatedForm);
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              title="Delete Partner"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CAREERS MANAGEMENT SUB-TAB */}
            {activeSubTab === 'careersManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Careers & Open Positions</h2>
                    <p className="text-xs text-slate-500">Manage job postings, application links, and career culture page content.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCareersSubTab('manageCareers')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        careersSubTab === 'manageCareers' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Manage Positions
                    </button>
                    <button
                      type="button"
                      onClick={() => setCareersSubTab('content')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        careersSubTab === 'content' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Customize Content
                    </button>
                  </div>
                </div>

                {careersSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                    {/* 1. HERO SECTION */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Section Header</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.careersPage?.heroBadge || 'JOIN OUR TEAM'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              careersPage: { ...(contentForm.careersPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.careersPage?.heroTitle || 'Careers at Elite Global Excellence'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              careersPage: { ...(contentForm.careersPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Statement / Subtitle</label>
                        <textarea
                          rows={3}
                          value={contentForm.careersPage?.heroSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            careersPage: { ...(contentForm.careersPage || {}), heroSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* 2. 4 CORE CULTURE PILLARS */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">4 Culture Pillars</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(contentForm.careersPage?.culturePillars || []).map((pil, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">0{idx + 1}</span>
                              <input
                                type="text"
                                value={pil.title}
                                onChange={(e) => {
                                  const updated = [...(contentForm.careersPage?.culturePillars || [])];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setContentForm({
                                    ...contentForm,
                                    careersPage: { ...(contentForm.careersPage || {}), culturePillars: updated }
                                  });
                                }}
                                className="flex-1 px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={pil.description}
                              onChange={(e) => {
                                const updated = [...(contentForm.careersPage?.culturePillars || [])];
                                updated[idx] = { ...updated[idx], description: e.target.value };
                                setContentForm({
                                  ...contentForm,
                                  careersPage: { ...(contentForm.careersPage || {}), culturePillars: updated }
                                });
                              }}
                              className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs text-slate-900 resize-y"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. SPONTANEOUS APPLICATION BANNER */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Spontaneous Application Box</h3>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Banner Question / Prompt</label>
                        <input
                          type="text"
                          value={contentForm.careersPage?.spontaneousPrompt || 'Don’t see your exact academic role?'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            careersPage: { ...(contentForm.careersPage || {}), spontaneousPrompt: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Banner Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.careersPage?.spontaneousSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            careersPage: { ...(contentForm.careersPage || {}), spontaneousSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Submit Spontaneous Application Google Form Link *</label>
                        <input
                          type="text"
                          value={contentForm.careersPage?.spontaneousAppGoogleFormLink || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            careersPage: { ...(contentForm.careersPage || {}), spontaneousAppGoogleFormLink: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs bg-white text-slate-900"
                          placeholder="https://forms.gle/..."
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Careers Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {careersSubTab === 'manageCareers' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Available Roles & Open Vacancies</h3>
                      <button
                        onClick={() =>
                          setEditingCareerRoleModal({
                            id: `role-${Date.now()}`,
                            title: '',
                            department: 'Publications Division',
                            location: 'Remote / Kuala Lumpur',
                            type: 'Full-time',
                            status: 'OPEN',
                            description: '',
                            requirements: [
                              'PhD or Master’s in Computer Science, Engineering, or related technical discipline',
                              'Proven track record in peer-reviewed journal publishing or editorial workflows',
                              'Exceptional written English and technical editing proficiency',
                              'Familiarity with COPE ethical guidelines and double-blind review protocols'
                            ],
                            applyGoogleFormLink: '',
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Position / Role</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(data.careerRoles || contentForm.careersPage?.openRoles || []).map((role) => (
                        <div key={role.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                            <div>
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                                <span>{role.department}</span>
                                <span>·</span>
                                <span>{role.location}</span>
                                <span>·</span>
                                <span>{role.type}</span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-base">{role.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                role.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {role.status || 'OPEN'}
                              </span>
                              <button
                                onClick={() => setEditingCareerRoleModal({ ...role })}
                                className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete role "${role.title}"?`)) {
                                    await handleAdminCrud('DELETE', 'careerRoles', { id: role.id });
                                    const filtered = (contentForm.careersPage?.openRoles || []).filter(r => r.id !== role.id);
                                    const updatedForm = {
                                      ...contentForm,
                                      careersPage: { ...(contentForm.careersPage || {}), openRoles: filtered }
                                    };
                                    setContentForm(updatedForm);
                                    await handleSaveDirectSiteContent(updatedForm);
                                  }
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>

                          {role.description && <p className="text-xs text-slate-700 font-medium">{role.description}</p>}

                          {role.requirements && role.requirements.length > 0 && (
                            <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 text-xs">
                              <span className="font-bold text-slate-800 text-[11px] block">Key Qualifications & Requirements:</span>
                              <ul className="space-y-1 text-slate-600">
                                {role.requirements.map((req, rIdx) => (
                                  <li key={rIdx} className="flex items-start gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {role.applyGoogleFormLink && (
                            <p className="text-[11px] font-mono text-[#045494] truncate">
                              <strong>Apply Form Link:</strong> {role.applyGoogleFormLink}
                            </p>
                          )}
                        </div>
                      ))}

                      {(data.careerRoles || contentForm.careersPage?.openRoles || []).length === 0 && (
                        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                          <p className="text-sm font-bold text-slate-700">No open positions currently listed in database.</p>
                          <p className="text-xs text-slate-500">The public Careers tab will display the user-friendly fallback message.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NEWS MANAGEMENT SUB-TAB */}
            {activeSubTab === 'newsManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">News & Press Releases</h2>
                    <p className="text-xs text-slate-500">Publish press releases, official announcements, and media office contact settings.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setNewsSubTab('manageNews')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        newsSubTab === 'manageNews' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Manage News
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewsSubTab('content')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        newsSubTab === 'content' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Customize Content
                    </button>
                  </div>
                </div>

                {newsSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                    {/* 1. HERO SECTION */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Section Header</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                          <input
                            type="text"
                            value={contentForm.newsPage?.heroBadge || 'MEDIA & PRESS'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              newsPage: { ...(contentForm.newsPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={contentForm.newsPage?.heroTitle || 'News & Announcements'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              newsPage: { ...(contentForm.newsPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Subtitle / Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.newsPage?.heroSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            newsPage: { ...(contentForm.newsPage || {}), heroSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* 2. MEDIA RELATIONS BOX */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Media Relations Box</h3>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Box Header Title</label>
                        <input
                          type="text"
                          value={contentForm.newsPage?.mediaRelationsTitle || 'Media Relations & Press Inquiries'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            newsPage: { ...(contentForm.newsPage || {}), mediaRelationsTitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Box Subtitle</label>
                        <textarea
                          rows={2}
                          value={contentForm.newsPage?.mediaRelationsSubtitle || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            newsPage: { ...(contentForm.newsPage || {}), mediaRelationsSubtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Contact Button Label</label>
                        <input
                          type="text"
                          value={contentForm.newsPage?.contactMediaOfficeButtonText || 'Contact Media Office'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            newsPage: { ...(contentForm.newsPage || {}), contactMediaOfficeButtonText: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save News Content</span>
                      </button>
                    </div>
                  </form>
                )}

                {newsSubTab === 'manageNews' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Published Articles & Press Releases</h3>
                      <button
                        onClick={() =>
                          setEditingNewsArticleModal({
                            id: `news-${Date.now()}`,
                            category: 'PRESS RELEASE',
                            publishDate: '2023-10-29T10:00',
                            publishedBy: 'EGE Strategic Communications',
                            author: 'EGE Strategic Communications',
                            isPublished: true,
                            readsCount: '1420+ reads',
                            title: '',
                            excerpt: '',
                            content: '',
                            imageUrl: '',
                          })
                        }
                        className="bg-[#045494] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[#033b68] shadow-xs transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add News Article</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(data.newsArticles || contentForm.newsPage?.newsArticlesList || []).map((art) => (
                        <div key={art.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition flex flex-col justify-between">
                          <div className="space-y-2">
                            {art.imageUrl && (
                              <img src={art.imageUrl} alt={art.title} className="w-full h-36 rounded-xl object-cover border border-slate-200" />
                            )}
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                              <span className="bg-blue-100 text-[#045494] font-bold px-2 py-0.5 rounded uppercase">
                                {art.category || 'PRESS RELEASE'}
                              </span>
                              <span>{art.readsCount || '1000+ reads'}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{art.title}</h4>
                            <p className="text-[11px] text-slate-500 font-medium">{art.publishedBy} · {art.publishDate}</p>
                            {art.excerpt && <p className="text-xs text-slate-600 line-clamp-2">{art.excerpt}</p>}
                          </div>

                          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingNewsArticleModal({ ...art })}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete news release "${art.title}"?`)) {
                                  await handleAdminCrud('DELETE', 'newsArticles', { id: art.id });
                                  const filtered = (contentForm.newsPage?.newsArticlesList || []).filter(a => a.id !== art.id);
                                  const updatedForm = {
                                    ...contentForm,
                                    newsPage: { ...(contentForm.newsPage || {}), newsArticlesList: filtered }
                                  };
                                  setContentForm(updatedForm);
                                  await handleSaveDirectSiteContent(updatedForm);
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer transition flex items-center gap-1 text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONTACT MANAGEMENT SUB-TAB */}
            {activeSubTab === 'contactManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Page & Official Registry</h2>
                  <p className="text-xs text-slate-500">Configure correspondence emails, office addresses, support hours, emergency notes, and social media handles.</p>
                </div>

                <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                  {/* 1. CONTACT FORM & INBOUND PORTAL SETTINGS */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Inbound Portal & Contact Form Customization</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Inbound Portal Header Title</label>
                        <input
                          type="text"
                          value={contentForm.contactPage?.inboundPortalTitle || 'Direct Inbound Portal'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), inboundPortalTitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          placeholder="Direct Inbound Portal"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Inbound Portal Description</label>
                        <input
                          type="text"
                          value={contentForm.contactPage?.inboundPortalDescription || 'All submissions are monitored and assigned directly within the EGE Central Inbox.'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), inboundPortalDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs bg-white text-slate-900"
                          placeholder="All submissions are monitored and assigned directly within the EGE Central Inbox."
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-3 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800">Form Labels & Field Placeholders</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Full Name Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.nameLabel || 'Full Name *'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), nameLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 mb-2"
                          />
                          <label className="block font-bold text-slate-600 mb-1">Full Name Placeholder</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.namePlaceholder || 'e.g. Dr. Aiman Azman'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), namePlaceholder: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Email Address Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.emailLabel || 'Email Address *'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), emailLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 mb-2"
                          />
                          <label className="block font-bold text-slate-600 mb-1">Email Address Placeholder</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.emailPlaceholder || 'e.g. aiman@utm.my'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), emailPlaceholder: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Phone / WhatsApp Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.phoneLabel || 'Phone / WhatsApp'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), phoneLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 mb-2"
                          />
                          <label className="block font-bold text-slate-600 mb-1">Phone / WhatsApp Placeholder</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.phonePlaceholder || 'e.g. +60 12-345 6789'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), phonePlaceholder: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Inquiry Category Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.categoryLabel || 'Inquiry Category'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), categoryLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Subject Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.subjectLabel || 'Subject'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), subjectLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 mb-2"
                          />
                          <label className="block font-bold text-slate-600 mb-1">Subject Field Placeholder</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.subjectPlaceholder || 'e.g. Inquiry regarding ICCSEIT 2026 Paper Submission'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), subjectPlaceholder: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Message Details Field Label</label>
                          <input
                            type="text"
                            value={contentForm.contactPage?.messageLabel || 'Message Details *'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), messageLabel: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 mb-2"
                          />
                          <label className="block font-bold text-slate-600 mb-1">Message Details Field Placeholder</label>
                          <textarea
                            rows={2}
                            value={contentForm.contactPage?.messagePlaceholder || 'Please describe your academic objectives, institutional background, or specific assistance required...'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              contactPage: { ...(contentForm.contactPage || {}), messagePlaceholder: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. OFFICIAL CORRESPONDENCE */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Official Correspondence & Registry</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">General Communications Email</label>
                        <input
                          type="email"
                          value={contentForm.contactPage?.generalEmail || 'info@eliteglobalexcellence.com'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), generalEmail: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Editorial & Publications Email</label>
                        <input
                          type="email"
                          value={contentForm.contactPage?.editorialEmail || 'editorial@eliteglobalexcellence.com'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), editorialEmail: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Conferences Directorate Email</label>
                        <input
                          type="email"
                          value={contentForm.contactPage?.conferencesEmail || 'conferences@eliteglobalexcellence.com'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), conferencesEmail: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs bg-white text-slate-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Headquarters & Registry Address</label>
                      <input
                        type="text"
                        value={contentForm.contactPage?.headquartersAddress || 'Elite Global Excellence Sdn. Bhd., Kuala Lumpur & Johor Bahru, Malaysia'}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contactPage: { ...(contentForm.contactPage || {}), headquartersAddress: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Support Availability Hours</label>
                      <input
                        type="text"
                        value={contentForm.contactPage?.supportHours || 'Monday – Friday: 9:00 AM – 6:00 PM (MYT / UTC+8)'}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contactPage: { ...(contentForm.contactPage || {}), supportHours: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  {/* 4. SOCIAL MEDIA PLATFORMS MANAGER */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Social Media Handles & Links</h3>
                        <p className="text-[11px] text-slate-500">Facebook, Instagram, YouTube, Telegram, or custom platforms.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const existing = contentForm.contactPage?.socialLinks || [];
                          const updated = [
                            ...existing,
                            { id: `social-${Date.now()}`, platform: 'LinkedIn', url: 'https://linkedin.com/company/ege', icon: 'Globe' }
                          ];
                          setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), socialLinks: updated }
                          });
                        }}
                        className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Platform</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(contentForm.contactPage?.socialLinks || []).map((soc, idx) => (
                        <div key={soc.id || idx} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                          <div className="w-full sm:w-1/3">
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Platform Name</label>
                            <input
                              type="text"
                              value={soc.platform}
                              onChange={(e) => {
                                const updated = [...(contentForm.contactPage?.socialLinks || [])];
                                updated[idx] = { ...updated[idx], platform: e.target.value };
                                setContentForm({
                                  ...contentForm,
                                  contactPage: { ...(contentForm.contactPage || {}), socialLinks: updated }
                                });
                              }}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                              placeholder="Facebook, Instagram, etc."
                            />
                          </div>
                          <div className="w-full sm:flex-1">
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">URL Link</label>
                            <input
                              type="text"
                              value={soc.url}
                              onChange={(e) => {
                                const updated = [...(contentForm.contactPage?.socialLinks || [])];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setContentForm({
                                  ...contentForm,
                                  contactPage: { ...(contentForm.contactPage || {}), socialLinks: updated }
                                });
                              }}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-slate-900"
                              placeholder="https://..."
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (contentForm.contactPage?.socialLinks || []).filter((_, i) => i !== idx);
                              setContentForm({
                                ...contentForm,
                                contactPage: { ...(contentForm.contactPage || {}), socialLinks: updated }
                              });
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer self-end sm:self-center"
                            title="Remove Platform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Contact Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CONFERENCES MANAGEMENT SUB-TAB */}
            {activeSubTab === 'conferencesManagement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                {/* Header banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">EGE Conferences Management</h2>
                    <p className="text-xs text-slate-500">Manage active conferences, future upcoming series, and academic timeline calendar.</p>
                  </div>
                  {/* Sub-tab switcher */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setConferencesSubTab('active')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        conferencesSubTab === 'active' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Active Conferences ({contentForm.conferencesPage?.activeConferencesList?.length || 0})
                    </button>
                    <button
                      type="button"
                      onClick={() => setConferencesSubTab('future')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        conferencesSubTab === 'future' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Future Conferences ({contentForm.conferencesPage?.futureConferencesList?.length || 0})
                    </button>
                    <button
                      type="button"
                      onClick={() => setConferencesSubTab('content')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        conferencesSubTab === 'content' ? 'bg-[#045494] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Manage Content & Timeline
                    </button>
                  </div>
                </div>

                {/* SUBTAB 1: Active Conferences */}
                {conferencesSubTab === 'active' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Active EGE Conferences</h3>
                        <p className="text-[11px] text-slate-500">Flagship annual conferences active for registration and submission.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingActiveConfModal({
                          id: `active-conf-${Date.now()}`,
                          badge: 'Flagship EGE Annual Conference',
                          name: '',
                          format: 'Hybrid Format · In-Person',
                          location: '(Kuala Lumpur, Malaysia) & Virtual Live Stream Worldwide',
                          submitPaperUrl: '/contact',
                          dates: 'October 24–25, 2026',
                          datesSubtext: '2 Full Conference Days',
                          submissionDeadline: 'August 15, 2026',
                          submissionDeadlineSubtext: 'Double-Blind Peer Review',
                          notificationDate: 'September 10, 2026',
                          notificationDateSubtext: 'With Reviewer Comments',
                          proceedings: 'Scopus / WoS Indexed',
                          proceedingsSubtext: 'Crossref DOI Assigned',
                          theme: '',
                          coOrganizedText: 'Co-Organized with University Partners across Malaysia, Portugal, and the UK.',
                          visitNowUrl: '/contact',
                          isActive: true
                        })}
                        className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Active Conference</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(contentForm.conferencesPage?.activeConferencesList || []).map((conf, idx) => (
                        <div key={conf.id || idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-[#045494] px-2 py-0.5 rounded-full">
                                {conf.badge || 'Active Conference'}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">{conf.name}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingActiveConfModal({ ...conf })}
                                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#045494]" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete active conference "${conf.name}"?`)) {
                                    const updatedList = (contentForm.conferencesPage?.activeConferencesList || []).filter((_, i) => i !== idx);
                                    const updatedContent = {
                                      ...contentForm,
                                      conferencesPage: {
                                        ...(contentForm.conferencesPage || {}),
                                        activeConferencesList: updatedList
                                      }
                                    };
                                    setContentForm(updatedContent);
                                    await handleSaveDirectSiteContent(updatedContent);
                                    showFeedback('Active conference deleted successfully.');
                                  }
                                }}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Format & Location</span>
                              <span className="font-semibold text-slate-800">{conf.format}</span>
                              <p className="text-[11px] text-slate-500 truncate">{conf.location}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Conference Dates</span>
                              <span className="font-semibold text-slate-800">{conf.dates}</span>
                              <p className="text-[11px] text-slate-500">{conf.datesSubtext}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Submission Deadline</span>
                              <span className="font-semibold text-slate-800">{conf.submissionDeadline}</span>
                              <p className="text-[11px] text-slate-500">{conf.submissionDeadlineSubtext}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Proceedings</span>
                              <span className="font-semibold text-slate-800">{conf.proceedings}</span>
                              <p className="text-[11px] text-slate-500">{conf.proceedingsSubtext}</p>
                            </div>
                          </div>

                          {conf.theme && (
                            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase mb-0.5">Conference Theme</span>
                              <p className="text-slate-700 line-clamp-2 italic">{conf.theme}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB 2: Future Conferences */}
                {conferencesSubTab === 'future' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Future EGE Conferences</h3>
                        <p className="text-[11px] text-slate-500">Upcoming conference series announced for early inquiry and submissions.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingFutureConfModal({
                          id: `future-conf-${Date.now()}`,
                          badge: 'FUTURE ACADEMIC CONFERENCE',
                          title: '',
                          description: '',
                          highlights: ['Keynotes from leading global AI researchers', 'Hands-on algorithmic workshops & code tutorials', 'Best Paper & Best Presentation Awards'],
                          date: 'Dec 12–13, 2026',
                          inquireUrl: '/contact'
                        })}
                        className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Future Conference</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(contentForm.conferencesPage?.futureConferencesList || []).map((fconf, idx) => (
                        <div key={fconf.id || idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                                {fconf.badge || 'Future Conference'}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">{fconf.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingFutureConfModal({ ...fconf })}
                                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#045494]" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete future conference "${fconf.title}"?`)) {
                                    const updatedList = (contentForm.conferencesPage?.futureConferencesList || []).filter((_, i) => i !== idx);
                                    const updatedContent = {
                                      ...contentForm,
                                      conferencesPage: {
                                        ...(contentForm.conferencesPage || {}),
                                        futureConferencesList: updatedList
                                      }
                                    };
                                    setContentForm(updatedContent);
                                    await handleSaveDirectSiteContent(updatedContent);
                                    showFeedback('Future conference deleted successfully.');
                                  }
                                }}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed">{fconf.description}</p>
                          {fconf.highlights && fconf.highlights.length > 0 && (
                            <ul className="text-xs space-y-1 pl-4 list-disc text-slate-600">
                              {fconf.highlights.map((h, hidx) => (
                                <li key={hidx}>{h}</li>
                              ))}
                            </ul>
                          )}
                          <div className="flex items-center gap-4 text-xs pt-1">
                            <span className="font-bold text-slate-800">Date: {fconf.date}</span>
                            <span className="text-slate-500 font-mono">Inquire Target: {fconf.inquireUrl}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: Manage Content & Timeline */}
                {conferencesSubTab === 'content' && (
                  <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs">
                    {/* Hero Content Settings */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Conferences Page Header</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Page Badge</label>
                          <input
                            type="text"
                            value={contentForm.conferencesPage?.heroBadge || 'ACADEMIC GATHERINGS'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              conferencesPage: { ...(contentForm.conferencesPage || {}), heroBadge: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Page Title</label>
                          <input
                            type="text"
                            value={contentForm.conferencesPage?.heroTitle || 'International Research Conferences'}
                            onChange={(e) => setContentForm({
                              ...contentForm,
                              conferencesPage: { ...(contentForm.conferencesPage || {}), heroTitle: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Header Description</label>
                        <textarea
                          rows={2}
                          value={contentForm.conferencesPage?.heroDescription || ''}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            conferencesPage: { ...(contentForm.conferencesPage || {}), heroDescription: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                        />
                      </div>
                    </div>

                    {/* Annual Timeline Calendar Settings */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Annual Timeline Calendar</h3>
                          <p className="text-[11px] text-slate-500">Manage rows, deadlines, and submission action buttons.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingTimelineRowModal({
                            id: `row-${Date.now()}`,
                            name: '',
                            category: 'Computer Science & IT',
                            eventDate: 'Oct 24–25, 2026',
                            paperDeadline: 'Aug 15, 2026',
                            actionName: 'Submit Paper',
                            actionUrl: '/contact'
                          })}
                          className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Row</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                              <th className="py-2.5 px-3">Conference / Symposium</th>
                              <th className="py-2.5 px-3">Category</th>
                              <th className="py-2.5 px-3">Event Date</th>
                              <th className="py-2.5 px-3">Paper Deadline</th>
                              <th className="py-2.5 px-3">Action Button</th>
                              <th className="py-2.5 px-3 text-right">Manage</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {(contentForm.conferencesPage?.timelineRows || []).map((row, rIdx) => (
                              <tr key={row.id || rIdx} className="hover:bg-slate-50/80">
                                <td className="py-2.5 px-3 font-bold text-slate-900">{row.name}</td>
                                <td className="py-2.5 px-3 text-slate-600">{row.category}</td>
                                <td className="py-2.5 px-3 text-slate-800 font-semibold">{row.eventDate}</td>
                                <td className="py-2.5 px-3 text-amber-700 font-bold">{row.paperDeadline}</td>
                                <td className="py-2.5 px-3">
                                  <span className="bg-blue-50 text-[#045494] px-2 py-0.5 rounded-full font-bold text-[10px] border border-blue-200">
                                    {row.actionName}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    {rIdx > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const rows = [...(contentForm.conferencesPage?.timelineRows || [])];
                                          const temp = rows[rIdx - 1];
                                          rows[rIdx - 1] = rows[rIdx];
                                          rows[rIdx] = temp;
                                          setContentForm({
                                            ...contentForm,
                                            conferencesPage: { ...(contentForm.conferencesPage || {}), timelineRows: rows }
                                          });
                                        }}
                                        className="p-1 text-slate-500 hover:bg-slate-200 rounded"
                                        title="Move Up"
                                      >
                                        <MoveUp className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    {rIdx < (contentForm.conferencesPage?.timelineRows?.length || 0) - 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const rows = [...(contentForm.conferencesPage?.timelineRows || [])];
                                          const temp = rows[rIdx + 1];
                                          rows[rIdx + 1] = rows[rIdx];
                                          rows[rIdx] = temp;
                                          setContentForm({
                                            ...contentForm,
                                            conferencesPage: { ...(contentForm.conferencesPage || {}), timelineRows: rows }
                                          });
                                        }}
                                        className="p-1 text-slate-500 hover:bg-slate-200 rounded"
                                        title="Move Down"
                                      >
                                        <MoveDown className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => setEditingTimelineRowModal({ ...row })}
                                      className="p-1 text-[#045494] hover:bg-blue-50 rounded"
                                      title="Edit Row"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = (contentForm.conferencesPage?.timelineRows || []).filter((_, i) => i !== rIdx);
                                        setContentForm({
                                          ...contentForm,
                                          conferencesPage: { ...(contentForm.conferencesPage || {}), timelineRows: rows }
                                        });
                                      }}
                                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                                      title="Delete Row"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Conferences Settings</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MESSAGE (INBOX) SUB-TAB */}
            {activeSubTab === 'inbox' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Inbox className="w-6 h-6 text-[#045494]" />
                      <span>Contact Page Messages</span>
                    </h2>
                    <p className="text-xs text-slate-500">Inbound messages submitted by users directly from the website Contact page.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={inboxFilter}
                      onChange={(e) => setInboxFilter(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="ALL">All Contact Messages</option>
                      <option value="NEW">New (Unread)</option>
                      <option value="READ">Read / Archived</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {contactMessages
                    .filter((msg: any) => {
                      if (inboxFilter === 'NEW') return msg.status === 'NEW' || msg.status === 'UNREAD';
                      if (inboxFilter === 'READ') return msg.status === 'READ';
                      return true;
                    })
                    .map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          msg.status === 'NEW' || msg.status === 'UNREAD' ? 'bg-blue-50/40 border-blue-200 font-semibold' : 'bg-slate-50 border-slate-200 opacity-90'
                        }`}
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-900">{msg.fullName || msg.name || msg.senderName || 'Inquirer'}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-600 font-mono">{msg.email}</span>
                            {msg.phone && (
                              <>
                                <span className="text-slate-400">·</span>
                                <span className="text-slate-600">{msg.phone}</span>
                              </>
                            )}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              msg.status === 'NEW' || msg.status === 'UNREAD' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {msg.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm truncate">{msg.subject || 'Direct Contact Inquiry'}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
                          <span className="text-[10px] text-slate-400 font-mono block">Received: {msg.createdAt}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={async () => {
                              setViewingInboxMessageModal(msg);
                              if (msg.status !== 'READ') {
                                await handleAdminCrud('UPDATE', 'inbox', { ...msg, status: 'READ' });
                              }
                            }}
                            className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Message</span>
                          </button>
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + (msg.subject || 'Direct Contact Inquiry'))}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 shadow-2xs"
                            title={`Reply directly to ${msg.email}`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleAdminCrud('UPDATE', 'inbox', { ...msg, status: msg.status === 'READ' ? 'UNREAD' : 'READ' })}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            {msg.status === 'READ' ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdminCrud('DELETE', 'inbox', { id: msg.id })}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                  {contactMessages.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                      <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-sm font-bold text-slate-700">No contact page messages in inbox.</p>
                      <p className="text-xs text-slate-500">User messages submitted through the Contact page form will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FOOTER CONTENT SUB-TAB */}
            {activeSubTab === 'footerContent' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Layout className="w-6 h-6 text-[#045494]" />
                      <span>Footer Content Management</span>
                    </h2>
                    <p className="text-xs text-slate-500">Fully add, update, or delete footer text, logo, social links, page navigation links, and contact information.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveSiteContent}
                    disabled={loading}
                    className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Content</span>
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSaveSiteContent(); }} className="space-y-8">
                  {/* SECTION 1: LOGO & TAGLINE */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">1. Footer Logo & About Tagline</h3>
                    <FileUploader
                      label="Footer Logo (Image URL / Upload)"
                      accept="image/*"
                      value={contentForm.footerContent?.logoUrl || '/assets/logo.png'}
                      onChange={(url) => setContentForm((prev: any) => ({
                        ...prev,
                        footerContent: { ...prev.footerContent, logoUrl: url }
                      }))}
                      helpText="Display logo on the left footer header."
                    />
                    <RichTextArea
                      label="About Tagline / Description"
                      value={contentForm.footerContent?.tagline || ''}
                      onChange={(val) => setContentForm((prev: any) => ({
                        ...prev,
                        footerContent: { ...prev.footerContent, tagline: val }
                      }))}
                      helpText="Summary text displayed below the logo."
                    />
                  </div>

                  {/* SECTION 2: SOCIAL LINKS */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">2. Social Links (Connect With EGE)</h3>
                        <p className="text-[11px] text-slate-500">Fully add, edit, or delete social media channel links</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const links = contentForm.footerContent?.socialLinks || [];
                          const newLink = {
                            id: `soc-${Date.now()}`,
                            platform: 'New Platform',
                            url: 'https://',
                            icon: 'link'
                          };
                          setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: {
                              ...prev.footerContent,
                              socialLinks: [...links, newLink]
                            }
                          }));
                        }}
                        className="bg-[#045494] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Social Link</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(contentForm.footerContent?.socialLinks || []).map((soc: any, idx: number) => (
                        <div key={soc.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap sm:flex-nowrap items-center gap-3">
                          <input
                            type="text"
                            placeholder="Icon/Badge (in, fb, 𝕏, yt, ig)"
                            value={soc.icon || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.socialLinks || [])];
                              updated[idx] = { ...updated[idx], icon: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, socialLinks: updated }
                              }));
                            }}
                            className="w-24 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Platform Name (e.g. LinkedIn)"
                            value={soc.platform || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.socialLinks || [])];
                              updated[idx] = { ...updated[idx], platform: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, socialLinks: updated }
                              }));
                            }}
                            className="w-36 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="URL (https://...)"
                            value={soc.url || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.socialLinks || [])];
                              updated[idx] = { ...updated[idx], url: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, socialLinks: updated }
                              }));
                            }}
                            className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 min-w-[180px]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (contentForm.footerContent?.socialLinks || []).filter((_: any, i: number) => i !== idx);
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, socialLinks: updated }
                              }));
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Delete Social Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: EXPLORE LINKS */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">3. Explore Navigation Links</h3>
                        <p className="text-[11px] text-slate-500">Fully add, edit, or delete links displayed in the Explore section</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const links = contentForm.footerContent?.exploreLinks || [];
                          const newLink = {
                            id: `exp-${Date.now()}`,
                            label: 'New Explore Link',
                            targetTab: 'home'
                          };
                          setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: {
                              ...prev.footerContent,
                              exploreLinks: [...links, newLink]
                            }
                          }));
                        }}
                        className="bg-[#045494] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Link</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(contentForm.footerContent?.exploreLinks || []).map((lnk: any, idx: number) => (
                        <div key={lnk.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap sm:flex-nowrap items-center gap-3">
                          <input
                            type="text"
                            placeholder="Link Label (e.g. Home)"
                            value={lnk.label || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.exploreLinks || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, exploreLinks: updated }
                              }));
                            }}
                            className="w-48 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Target Tab ID (e.g. home, about, services...)"
                            value={lnk.targetTab || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.exploreLinks || [])];
                              updated[idx] = { ...updated[idx], targetTab: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, exploreLinks: updated }
                              }));
                            }}
                            className="w-40 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="External URL (Optional)"
                            value={lnk.externalUrl || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.exploreLinks || [])];
                              updated[idx] = { ...updated[idx], externalUrl: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, exploreLinks: updated }
                              }));
                            }}
                            className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 min-w-[160px]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (contentForm.footerContent?.exploreLinks || []).filter((_: any, i: number) => i !== idx);
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, exploreLinks: updated }
                              }));
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 4: CONFERENCES LINKS */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">4. Conferences Navigation Links</h3>
                        <p className="text-[11px] text-slate-500">Fully add, edit, or delete links in the Conferences section</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const links = contentForm.footerContent?.conferencesLinks || [];
                          const newLink = {
                            id: `conf-${Date.now()}`,
                            label: 'New Conference Link',
                            targetTab: 'events'
                          };
                          setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: {
                              ...prev.footerContent,
                              conferencesLinks: [...links, newLink]
                            }
                          }));
                        }}
                        className="bg-[#045494] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Link</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(contentForm.footerContent?.conferencesLinks || []).map((lnk: any, idx: number) => (
                        <div key={lnk.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap sm:flex-nowrap items-center gap-3">
                          <input
                            type="text"
                            placeholder="Link Title"
                            value={lnk.label || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.conferencesLinks || [])];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, conferencesLinks: updated }
                              }));
                            }}
                            className="w-56 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Target Tab ID"
                            value={lnk.targetTab || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.conferencesLinks || [])];
                              updated[idx] = { ...updated[idx], targetTab: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, conferencesLinks: updated }
                              }));
                            }}
                            className="w-40 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="External URL (Optional)"
                            value={lnk.externalUrl || ''}
                            onChange={(e) => {
                              const updated = [...(contentForm.footerContent?.conferencesLinks || [])];
                              updated[idx] = { ...updated[idx], externalUrl: e.target.value };
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, conferencesLinks: updated }
                              }));
                            }}
                            className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 min-w-[160px]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (contentForm.footerContent?.conferencesLinks || []).filter((_: any, i: number) => i !== idx);
                              setContentForm((prev: any) => ({
                                ...prev,
                                footerContent: { ...prev.footerContent, conferencesLinks: updated }
                              }));
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 5: CONTACT & LOCATIONS */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">5. Contact & Locations Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.companyName || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, companyName: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Website URL</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.websiteUrl || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, websiteUrl: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900 font-mono"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Headquarter Address</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.primaryAddress || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, primaryAddress: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Regional Office Address</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.secondaryAddress || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, secondaryAddress: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Email Address</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.primaryEmail || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, primaryEmail: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Email Address</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.secondaryEmail || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, secondaryEmail: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900 font-mono"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Direct Inquiry Button Text</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.directInquiryButtonText || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, directInquiryButtonText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: BOTTOM BAR & COPYRIGHT */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">6. Bottom Bar & Copyright Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Copyright Text</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.copyrightText || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, copyrightText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Slogan Text</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.sloganText || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, sloganText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Admin Access Button Label</label>
                        <input
                          type="text"
                          value={contentForm.footerContent?.adminAccessButtonText || ''}
                          onChange={(e) => setContentForm((prev: any) => ({
                            ...prev,
                            footerContent: { ...prev.footerContent, adminAccessButtonText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-md text-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Footer Content Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CERTIFICATES SUB-TAB */}
            {activeSubTab === 'certificates' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Certificate Verification Registry</h2>
                    <p className="text-xs text-slate-500">View or issue verifiable workshop credentials.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingItem({
                        type: 'certificates',
                        item: {
                          id: `EGE-WS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                          participantName: '',
                          workshopTitle: 'Systematic Literature Review (SLR) & Bibliometrics',
                          issueDate: new Date().toISOString().split('T')[0],
                          institution: 'Elite Global Excellence Academic Council',
                          status: 'VALID',
                        },
                      })
                    }
                    className="bg-[#045494] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Issue Certificate</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {data.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#045494]">{cert.id}</span>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                            {cert.status}
                          </span>
                        </div>
                        <span className="font-bold text-slate-900 block mt-1">{cert.participantName}</span>
                        <span className="text-slate-500 text-[11px]">{cert.workshopTitle} ({cert.issueDate})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'certificates', item: { ...cert } })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdminCrud('DELETE', 'certificates', { id: cert.id })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GENERIC EDIT MODAL FOR ENTITIES */}
            {editingItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 capitalize">
                    Edit {editingItem.type} Record
                  </h3>

                  <div className="space-y-3 text-xs">
                    {Object.keys(editingItem.item).map((key) => {
                      if (key === 'id') {
                        return (
                          <div key={key}>
                            <label className="block font-semibold text-slate-500 mb-1 uppercase text-[10px]">
                              ID (Read-only)
                            </label>
                            <input
                              type="text"
                              disabled
                              value={editingItem.item[key]}
                              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600"
                            />
                          </div>
                        );
                      }

                      if (Array.isArray(editingItem.item[key])) {
                        return (
                          <div key={key}>
                            <label className="block font-semibold text-slate-700 mb-1 capitalize">
                              {key} (Comma-separated)
                            </label>
                            <input
                              type="text"
                              value={editingItem.item[key].join(', ')}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  item: {
                                    ...editingItem.item,
                                    [key]: e.target.value.split(',').map((s) => s.trim()),
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-medium focus:ring-2 focus:ring-[#045494]"
                            />
                          </div>
                        );
                      }

                      if (typeof editingItem.item[key] === 'boolean') {
                        return (
                          <div key={key} className="flex items-center gap-2 pt-2">
                            <input
                              type="checkbox"
                              id={key}
                              checked={editingItem.item[key]}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  item: {
                                    ...editingItem.item,
                                    [key]: e.target.checked,
                                  },
                                })
                              }
                              className="w-4 h-4 text-[#045494] rounded cursor-pointer"
                            />
                            <label htmlFor={key} className="font-semibold text-slate-700 capitalize cursor-pointer">
                              {key}
                            </label>
                          </div>
                        );
                      }

                      return (
                        <div key={key}>
                          <label className="block font-semibold text-slate-700 mb-1 capitalize">
                            {key}
                          </label>
                          {key === 'description' || key === 'bio' || key === 'content' ? (
                            <textarea
                              rows={4}
                              value={editingItem.item[key] || ''}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  item: {
                                    ...editingItem.item,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-medium focus:ring-2 focus:ring-[#045494]"
                            />
                          ) : (
                            <input
                              type="text"
                              value={editingItem.item[key] || ''}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  item: {
                                    ...editingItem.item,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-medium focus:ring-2 focus:ring-[#045494]"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleAdminCrud('UPDATE', editingItem.type, editingItem.item)
                      }
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Record</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

        {/* Service Item Editor Modal */}
        {editingServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-5 text-xs text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#045494]" />
                  <h3 className="text-base font-bold text-slate-900">
                    {editingServiceModal.id ? 'Edit Service Item' : 'Add New Service Item'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingServiceModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge (e.g., Core Service 01)</label>
                  <input
                    type="text"
                    value={editingServiceModal.badge || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold bg-white text-slate-900"
                    placeholder="Core Service 01"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={editingServiceModal.title || ''}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingServiceModal({
                        ...editingServiceModal,
                        title: newTitle,
                        anchorId: editingServiceModal.anchorId || `${slug}-detail`
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold bg-white text-slate-900"
                    placeholder="e.g. International Research Conferences"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Icon Selection</label>
                  <select
                    value={editingServiceModal.icon || 'Users'}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold bg-white text-slate-900"
                  >
                    <option value="Users">Users (Group / Conferences)</option>
                    <option value="BookOpen">BookOpen (Publishing / Journal)</option>
                    <option value="Award">Award (Publication Assistance)</option>
                    <option value="Calendar">Calendar (Workshops & Training)</option>
                    <option value="GraduationCap">GraduationCap (Mock Viva)</option>
                    <option value="Building2">Building2 (Institutional Collaboration)</option>
                    <option value="Sparkles">Sparkles (Special Feature)</option>
                    <option value="FileCheck">FileCheck (Manuscripts)</option>
                    <option value="Send">Send (Outreach)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Anchor ID (for scroll link)</label>
                  <input
                    type="text"
                    value={editingServiceModal.anchorId || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, anchorId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-800 bg-white"
                    placeholder="e.g. conferences-detail"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview Description (Homepage & Card List)</label>
                <textarea
                  rows={2}
                  value={editingServiceModal.overviewDescription || ''}
                  onChange={(e) => setEditingServiceModal({ ...editingServiceModal, overviewDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium bg-white text-slate-900 resize-y"
                  placeholder="Short 1-2 sentence description for top cards grid..."
                />
              </div>

              <div>
                <RichTextArea
                  label="Main Detail Description Paragraph"
                  value={editingServiceModal.detailDescription || ''}
                  onChange={(val) => setEditingServiceModal({ ...editingServiceModal, detailDescription: val })}
                  rows={3}
                  placeholder="Detailed description paragraph..."
                />
              </div>

              {/* Sub-Tracks / Special Focus Cards Manager */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Sub-Tracks / Special Focus Cards ({editingServiceModal.subTracks?.length || 0})
                    </h4>
                    <p className="text-[10px] text-slate-500">e.g. Flagship Conference, Specialized AI Track, Undergraduate Forum</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const subTracks = editingServiceModal.subTracks || [];
                      const newST: ServiceSubTrack = {
                        id: `st-${Date.now()}`,
                        badge: 'Specialized Track',
                        title: 'Track Title',
                        description: 'Track details and coverage description...'
                      };
                      setEditingServiceModal({ ...editingServiceModal, subTracks: [...subTracks, newST] });
                    }}
                    className="bg-[#045494] hover:bg-[#033b68] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Track</span>
                  </button>
                </div>

                {editingServiceModal.subTracks?.map((st, sIdx) => (
                  <div key={st.id || sIdx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] font-bold text-[#045494]">Track #{sIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingServiceModal.subTracks?.filter((_, i) => i !== sIdx);
                          setEditingServiceModal({ ...editingServiceModal, subTracks: updated });
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={st.badge || ''}
                        onChange={(e) => {
                          const updated = [...(editingServiceModal.subTracks || [])];
                          updated[sIdx] = { ...updated[sIdx], badge: e.target.value };
                          setEditingServiceModal({ ...editingServiceModal, subTracks: updated });
                        }}
                        className="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold"
                        placeholder="Badge e.g. Flagship Conference"
                      />
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...(editingServiceModal.subTracks || [])];
                          updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                          setEditingServiceModal({ ...editingServiceModal, subTracks: updated });
                        }}
                        className="px-2.5 py-1 border border-slate-300 rounded-lg text-xs font-bold"
                        placeholder="Track Title"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={st.description}
                      onChange={(e) => {
                        const updated = [...(editingServiceModal.subTracks || [])];
                        updated[sIdx] = { ...updated[sIdx], description: e.target.value };
                        setEditingServiceModal({ ...editingServiceModal, subTracks: updated });
                      }}
                      className="w-full px-2.5 py-1 border border-slate-300 rounded-lg text-xs resize-y font-medium"
                      placeholder="Track description text..."
                    />
                  </div>
                ))}
              </div>

              {/* Feature List Bullets Manager */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Feature List / Highlight Bullets ({editingServiceModal.features?.length || 0})
                    </h4>
                    <p className="text-[10px] text-slate-500">e.g., Manuscript review, Technical formatting, Simulated viva examination, etc.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const feats = editingServiceModal.features || [];
                      setEditingServiceModal({ ...editingServiceModal, features: [...feats, 'New Feature Point'] });
                    }}
                    className="bg-[#045494] hover:bg-[#033b68] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingServiceModal.features?.map((ft, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 w-5">#{fIdx + 1}</span>
                      <input
                        type="text"
                        value={ft}
                        onChange={(e) => {
                          const updated = [...(editingServiceModal.features || [])];
                          updated[fIdx] = e.target.value;
                          setEditingServiceModal({ ...editingServiceModal, features: updated });
                        }}
                        className="flex-1 px-3 py-1.5 border border-slate-300 bg-white rounded-xl text-xs font-medium"
                        placeholder="Feature point text..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingServiceModal.features?.filter((_, i) => i !== fIdx);
                          setEditingServiceModal({ ...editingServiceModal, features: updated });
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Box / Note Box */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Info Highlight Box (Optional)</h4>
                <input
                  type="text"
                  value={editingServiceModal.infoBoxHeader || ''}
                  onChange={(e) => setEditingServiceModal({ ...editingServiceModal, infoBoxHeader: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-xl text-xs font-bold"
                  placeholder="Info Box Header (e.g. Editorial Standards & Scopus Indexing Pathways)"
                />
                <textarea
                  rows={2}
                  value={editingServiceModal.infoBoxText || ''}
                  onChange={(e) => setEditingServiceModal({ ...editingServiceModal, infoBoxText: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-xl text-xs font-medium resize-y"
                  placeholder="Info box message text..."
                />
              </div>

              {/* Footer Text */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Closing Paragraph / Footer Note</label>
                <textarea
                  rows={2}
                  value={editingServiceModal.footerText || ''}
                  onChange={(e) => setEditingServiceModal({ ...editingServiceModal, footerText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium bg-white text-slate-900 resize-y"
                  placeholder="Closing sentence or compliance statement..."
                />
              </div>

              {/* Primary CTA Button Config */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CTA Button Label</label>
                  <input
                    type="text"
                    value={editingServiceModal.ctaText || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, ctaText: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-bold bg-white text-slate-900"
                    placeholder="e.g. Get a Quotation / Visit now"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Type</label>
                  <select
                    value={editingServiceModal.ctaActionType || 'contact'}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, ctaActionType: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-bold bg-white text-slate-900"
                  >
                    <option value="tab">Navigate to Tab</option>
                    <option value="quote">Open Quotation Modal</option>
                    <option value="workshop">Open Workshop Reg Modal</option>
                    <option value="viva">Open Mock Viva Modal</option>
                    <option value="contact">Navigate to Contact Form</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Target</label>
                  <input
                    type="text"
                    value={editingServiceModal.ctaTarget || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, ctaTarget: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-medium bg-white text-slate-900"
                    placeholder="e.g. conferences, contact, Research Publication Assistance"
                  />
                </div>
              </div>

              {/* Secondary CTA Button Config */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Secondary CTA Label (Optional)</label>
                  <input
                    type="text"
                    value={editingServiceModal.secondaryCtaText || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, secondaryCtaText: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-semibold bg-white text-slate-900"
                    placeholder="e.g. View Full Mock Viva Syllabus"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Type</label>
                  <select
                    value={editingServiceModal.secondaryCtaActionType || 'tab'}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, secondaryCtaActionType: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-semibold bg-white text-slate-900"
                  >
                    <option value="tab">Navigate to Tab</option>
                    <option value="viva">Open Mock Viva Modal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Target</label>
                  <input
                    type="text"
                    value={editingServiceModal.secondaryCtaTarget || ''}
                    onChange={(e) => setEditingServiceModal({ ...editingServiceModal, secondaryCtaTarget: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-xl font-medium bg-white text-slate-900"
                    placeholder="e.g. mock-viva"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                {editingServiceModal.id && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete service "${editingServiceModal.title}"?`)) {
                        const servicesList = contentForm.servicesPage?.services || [];
                        const updated = servicesList.filter((s) => s.id !== editingServiceModal.id);
                        const updatedContent = {
                          ...contentForm,
                          servicesPage: { ...(contentForm.servicesPage || {}), services: updated }
                        };
                        setContentForm(updatedContent);
                        setEditingServiceModal(null);
                        handleSaveDirectSiteContent(updatedContent);
                        showFeedback('✓ Service deleted successfully.');
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer text-xs mr-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Service</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingServiceModal(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const servicesList = contentForm.servicesPage?.services || [];
                    const existingIdx = servicesList.findIndex((s) => s.id === editingServiceModal.id);
                    let updatedServices: ServiceItem[];
                    if (existingIdx !== -1) {
                      updatedServices = [...servicesList];
                      updatedServices[existingIdx] = editingServiceModal;
                    } else {
                      updatedServices = [...servicesList, editingServiceModal];
                    }

                    const updatedContent = {
                      ...contentForm,
                      servicesPage: { ...(contentForm.servicesPage || {}), services: updatedServices }
                    };
                    setContentForm(updatedContent);
                    setEditingServiceModal(null);
                    handleSaveDirectSiteContent(updatedContent);
                    showFeedback('✓ Service saved successfully.');
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs text-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* EDIT / ADD WORKSHOP MODAL */}
        {editingWorkshopModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {editingWorkshopModal.id ? `Edit Workshop: ${editingWorkshopModal.title}` : 'Add New Upcoming Workshop'}
                </h3>
                <button onClick={() => setEditingWorkshopModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Workshop ID (e.g. EGEW15)</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.workshopId || ''}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, workshopId: e.target.value })}
                    placeholder="EGEW15"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Workshop Status / Archive</label>
                  <select
                    value={editingWorkshopModal.status || 'UPCOMING'}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, status: e.target.value as 'UPCOMING' | 'PAST' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 bg-white"
                  >
                    <option value="UPCOMING">Upcoming Workshop (Active)</option>
                    <option value="PAST">Past Archive (Concluded)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.title || ''}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, title: e.target.value })}
                    placeholder="AI in Education"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date Selection (Calendar Picker)</label>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        onChange={(e) => {
                          if (e.target.value) {
                            const [year, month, day] = e.target.value.split('-');
                            const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                            const formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            setEditingWorkshopModal({ ...editingWorkshopModal, date: formatted });
                          }
                        }}
                        className="px-3 py-1.5 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium bg-slate-50 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Calendar Picker</span>
                    </div>
                    <input
                      type="text"
                      value={editingWorkshopModal.date || ''}
                      onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, date: e.target.value })}
                      placeholder="e.g. March 15, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time (e.g. 10:00 AM - 1:00 PM)</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.time || ''}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, time: e.target.value })}
                    placeholder="10:00 AM - 1:00 PM"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mode</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.mode || ''}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, mode: e.target.value })}
                    placeholder="Online (Zoom)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue (Location or '—')</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.venue || '—'}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, venue: e.target.value })}
                    placeholder="—"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fee (e.g. Free or RM 150)</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.fee || 'Free'}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, fee: e.target.value, isFree: e.target.value.toLowerCase().includes('free') })}
                    placeholder="Free"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Group Link</label>
                  <input
                    type="text"
                    value={editingWorkshopModal.whatsappLink || ''}
                    onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, whatsappLink: e.target.value })}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                {/* COVER IMAGE FILE UPLOADER */}
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#045494]" />
                    <span>Upload Cover Image from System</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {editingWorkshopModal.imageUrl ? (
                      <div className="w-24 h-24 rounded-2xl border border-slate-300 overflow-hidden shrink-0 bg-slate-100 relative group shadow-xs">
                        <img src={editingWorkshopModal.imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditingWorkshopModal({ ...editingWorkshopModal, imageUrl: '' })}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                          title="Remove Image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0 text-[10px] font-bold">
                        <span>No Image</span>
                      </div>
                    )}

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        id="cover-image-file-input"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              const dataUrl = evt.target?.result as string;
                              setEditingWorkshopModal({ ...editingWorkshopModal, imageUrl: dataUrl });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="cover-image-file-input"
                        className="inline-flex items-center gap-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-xs transition"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Cover Image File</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">OR Paste Link:</span>
                        <input
                          type="text"
                          value={editingWorkshopModal.imageUrl || ''}
                          onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* WHATSAPP QR CODE FILE UPLOADER */}
                <div className="sm:col-span-2 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
                  <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload WhatsApp Group QR Code Image from System</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {editingWorkshopModal.whatsappQrUrl ? (
                      <div className="w-24 h-24 rounded-2xl border border-slate-300 overflow-hidden shrink-0 bg-white p-1.5 relative group shadow-xs">
                        <img src={editingWorkshopModal.whatsappQrUrl} alt="QR Code Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setEditingWorkshopModal({ ...editingWorkshopModal, whatsappQrUrl: '' })}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                          title="Remove QR Code"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center text-slate-400 shrink-0 text-[10px] font-bold">
                        <span>No QR Code</span>
                      </div>
                    )}

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        id="whatsapp-qr-file-input"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              const dataUrl = evt.target?.result as string;
                              setEditingWorkshopModal({ ...editingWorkshopModal, whatsappQrUrl: dataUrl });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="whatsapp-qr-file-input"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-xs transition"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload QR Code Image File</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">OR Paste Link:</span>
                        <input
                          type="text"
                          value={editingWorkshopModal.whatsappQrUrl || ''}
                          onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, whatsappQrUrl: e.target.value })}
                          placeholder="https://api.qrserver.com/..."
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Description</label>
                <textarea
                  rows={3}
                  value={editingWorkshopModal.description || ''}
                  onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, description: e.target.value })}
                  placeholder="Elite Global Excellence Sdn. Bhd. (EGE) organizes workshops..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 resize-y"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Objectives (One per line)</label>
                <textarea
                  rows={4}
                  value={(editingWorkshopModal.objectives || []).join('\n')}
                  onChange={(e) => setEditingWorkshopModal({ ...editingWorkshopModal, objectives: e.target.value.split('\n').filter(Boolean) })}
                  placeholder="Objective 1&#10;Objective 2&#10;Objective 3"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono resize-y"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingWorkshopModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const isExisting = (data.workshops || []).some((w) => String(w.id) === String(editingWorkshopModal.id));
                    await handleAdminCrud(isExisting ? 'UPDATE' : 'CREATE', 'workshops', editingWorkshopModal);
                    setEditingWorkshopModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Workshop</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW REGISTRATIONS & ATTENDANCE CONTROL MODAL */}
        {viewingRegistrationsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#045494] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Participant Registrations: {viewingRegistrationsModal.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Manage users registered for this masterclass and control attendance portal link.</p>
                </div>
                <button onClick={() => setViewingRegistrationsModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ATTENDANCE LINK CONTROL PANEL */}
              {(() => {
                const targetId = viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`;
                const isAttendanceOpen = viewingRegistrationsModal.attendanceOpen !== false;
                const attendanceUrl = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/?attend=${targetId}`;

                return (
                  <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isAttendanceOpen ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Attendance:</span>
                          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${isAttendanceOpen ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-700'}`}>
                            {isAttendanceOpen ? 'OPEN' : 'CLOSED'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-mono select-all">
                          Link: {attendanceUrl}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const updatedState = !isAttendanceOpen;
                          await handleAdminCrud('UPDATE', 'workshops', {
                            id: viewingRegistrationsModal.id,
                            attendanceOpen: updatedState,
                          });
                          setViewingRegistrationsModal({
                            ...viewingRegistrationsModal,
                            attendanceOpen: updatedState,
                          });
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                          isAttendanceOpen
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>{isAttendanceOpen ? 'Toggle Close Attendance' : 'Toggle Open Attendance'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(attendanceUrl);
                            showFeedback('✓ Attendance Link copied to clipboard!');
                          }
                        }}
                        className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#045494]" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* PARTICIPANTS TABLE */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider">Registered Participants</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = (viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`).toUpperCase();
                        const list = (data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === targetId);
                        const headers = ['User ID / Reg ID', 'Full Name', 'Email', 'Phone', 'Role', 'Institute', 'Department', 'Level of Study', 'Country', 'Keynote Speaker', 'Attended', 'Certificate ID', 'Registered At'];
                        const rows = list.map(r => [
                          r.registrationId,
                          r.fullName,
                          r.email,
                          r.phone || '',
                          r.role || '',
                          r.institute || '',
                          r.department || '',
                          r.levelOfStudy || '',
                          r.country || '',
                          r.isKeynoteSpeaker || '',
                          r.attended ? 'Yes' : 'No',
                          r.certId || '',
                          r.registeredAt || ''
                        ]);
                        const csvContent = [
                          headers.join(','),
                          ...rows.map(row => row.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
                        ].join('\n');
                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${targetId}_Registrations.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showFeedback('✓ Downloaded Excel/CSV Registration file!');
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Upload className="w-3.5 h-3.5 rotate-180" />
                      <span>Download Excel / CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const targetId = (viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`).toUpperCase();
                        const list = (data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === targetId);
                        const commaSeparated = list.map(r => `${r.registrationId}, ${r.fullName}, ${r.email}, ${r.role}, ${r.institute}, ${r.country}`).join('\n');
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(commaSeparated);
                          showFeedback('✓ Registrations data copied with comma separation!');
                        }
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#045494]" />
                      <span>Copy Comma-Separated</span>
                    </button>

                    <span className="font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Total: {(data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === (viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`).toUpperCase()).length}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                        <th className="py-3 px-4">User ID / Reg ID</th>
                        <th className="py-3 px-4">Full Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Institute</th>
                        <th className="py-3 px-4">Attended</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(() => {
                        const targetId = (viewingRegistrationsModal.workshopId || `EGEW${viewingRegistrationsModal.id}`).toUpperCase();
                        const list = (data.workshopRegistrations || []).filter(r => r.workshopId.toUpperCase() === targetId);

                        if (list.length === 0) {
                          return (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-slate-500">
                                No participants registered for this workshop yet.
                              </td>
                            </tr>
                          );
                        }

                        return list.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4 font-mono font-bold text-[#045494]">
                              {user.registrationId}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {user.fullName}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {user.email}
                            </td>
                            <td className="py-3 px-4 text-slate-700 font-medium">
                              {user.role}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <div>{user.institute}</div>
                              <div className="text-[10px] text-slate-400">{user.department} ({user.levelOfStudy})</div>
                            </td>
                            <td className="py-3 px-4">
                              {user.attended ? (
                                <div>
                                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                                    Yes
                                  </span>
                                  {user.certId && (
                                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{user.certId}</div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-400 font-medium text-[11px]">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => setViewingParticipantModal(user)}
                                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingParticipantModal(user)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Edit Registration"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete registration for "${user.fullName}" (${user.registrationId || user.id})?`)) {
                                    handleAdminCrud('DELETE', 'workshopRegistrations', { id: user.id, registrationId: user.registrationId });
                                  }
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                                title="Delete Registration"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEWING ATTENDANCES MODAL */}
        {viewingAttendancesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#045494] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {viewingAttendancesModal.workshopId || `EGEW${viewingAttendancesModal.id}`}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Attendance Submissions: {viewingAttendancesModal.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">List of all attendance feedback submissions for this workshop.</p>
                </div>
                <button onClick={() => setViewingAttendancesModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ATTENDANCES TABLE */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider">Submitted Attendances</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = (viewingAttendancesModal.workshopId || `EGEW${viewingAttendancesModal.id}`).toUpperCase();
                        const list = (data.workshopAttendances || []).filter(a => a.workshopId.toUpperCase() === targetId);
                        const headers = ['Full Name (Certificate)', 'Email', 'Certificate ID', 'Submitted Date', 'Satisfaction', 'Learning Value', 'Additional Feedback', 'Certificate Issued'];
                        const rows = list.map(a => [
                          a.fullName,
                          a.email,
                          a.certId || '',
                          a.submittedAt || '',
                          a.satisfied || '',
                          a.learned || '',
                          a.feedback || '',
                          a.certIssued ? 'Yes (Issued)' : 'No (Pending)'
                        ]);
                        const csvContent = [
                          headers.join(','),
                          ...rows.map(row => row.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
                        ].join('\n');
                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${targetId}_Attendances.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showFeedback('✓ Downloaded Excel/CSV Attendance file!');
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Upload className="w-3.5 h-3.5 rotate-180" />
                      <span>Download Excel / CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const targetId = (viewingAttendancesModal.workshopId || `EGEW${viewingAttendancesModal.id}`).toUpperCase();
                        const list = (data.workshopAttendances || []).filter(a => a.workshopId.toUpperCase() === targetId);
                        const commaSeparated = list.map(a => `${a.fullName}, ${a.email}, ${a.certId || 'N/A'}, ${a.submittedAt || ''}, ${a.satisfied}, ${a.learned}`).join('\n');
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(commaSeparated);
                          showFeedback('✓ Attendances data copied with comma separation!');
                        }
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#045494]" />
                      <span>Copy Comma-Separated</span>
                    </button>

                    <span className="font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Total: {(data.workshopAttendances || []).filter(a => a.workshopId.toUpperCase() === (viewingAttendancesModal.workshopId || `EGEW${viewingAttendancesModal.id}`).toUpperCase()).length}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                        <th className="py-3 px-4">Full Name (Certificate)</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Cert ID</th>
                        <th className="py-3 px-4">Submitted Date</th>
                        <th className="py-3 px-4">Satisfaction</th>
                        <th className="py-3 px-4">Learning Value</th>
                        <th className="py-3 px-4">Additional Feedback</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(() => {
                        const targetId = (viewingAttendancesModal.workshopId || `EGEW${viewingAttendancesModal.id}`).toUpperCase();
                        const list = (data.workshopAttendances || []).filter(a => a.workshopId.toUpperCase() === targetId);

                        if (list.length === 0) {
                          return (
                            <tr>
                              <td colSpan={9} className="py-8 text-center text-slate-500">
                                No attendance submissions recorded for this workshop yet.
                              </td>
                            </tr>
                          );
                        }

                        return list.map((att) => {
                          const isIssued = Boolean(att.certIssued);

                          return (
                            <tr key={att.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-4 font-bold text-slate-900">
                                {att.fullName}
                              </td>
                              <td className="py-3 px-4 text-slate-600 font-medium">
                                {att.email}
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-[#045494]">
                                {att.certId || '—'}
                              </td>
                              <td className="py-3 px-4 text-slate-500 text-[11px]">
                                {att.submittedAt || '—'}
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-blue-50 text-[#045494] font-semibold px-2 py-0.5 rounded text-[11px] border border-blue-100">
                                  {att.satisfied}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-emerald-100">
                                  {att.learned}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={att.feedback}>
                                {att.feedback || <span className="text-slate-400 font-normal">—</span>}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isIssued ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                                  {isIssued ? '✓ ISSUED' : '● PENDING'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                                {!isIssued ? (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      const targetCertId = att.certId || `${targetId}-CERT01`;
                                      // 1. Create certificate in registry
                                      await handleAdminCrud('CREATE', 'certificates', {
                                        id: targetCertId,
                                        participantName: att.fullName,
                                        workshopTitle: viewingAttendancesModal.title,
                                        issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                                        status: 'VALID',
                                        institution: 'Elite Global Excellence Academic Council',
                                      });
                                      // 2. Mark certIssued = true on attendance record
                                      await handleAdminCrud('UPDATE', 'workshopAttendances', {
                                        id: att.id,
                                        certIssued: true,
                                      });
                                      showFeedback(`✓ Certificate ${targetCertId} issued for ${att.fullName} and added to public verification registry!`);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-2.5 py-1 rounded-lg inline-flex items-center gap-1 cursor-pointer transition shadow-xs"
                                    title="Issue certificate and make it publicly verifiable"
                                  >
                                    <Award className="w-3.5 h-3.5" />
                                    <span>Issue Certificate</span>
                                  </button>
                                ) : (
                                  <a
                                    href={`/certificate?id=${encodeURIComponent(att.certId || '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-blue-50 text-[#045494] hover:bg-blue-100 font-bold text-xs px-2.5 py-1 rounded-lg inline-flex items-center gap-1 cursor-pointer transition border border-blue-200"
                                    title="View verified credential link"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Verify Record</span>
                                  </a>
                                )}
                                <button
                                  onClick={() => handleAdminCrud('DELETE', 'workshopAttendances', { id: att.id })}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer inline-block"
                                  title="Delete Attendance Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT PARTICIPANT REGISTRATION MODAL */}
        {editingParticipantModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Edit Registration: {editingParticipantModal.fullName}
                </h3>
                <button onClick={() => setEditingParticipantModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingParticipantModal.fullName || ''}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingParticipantModal.email || ''}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingParticipantModal.phone || ''}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institute</label>
                  <input
                    type="text"
                    value={editingParticipantModal.institute || ''}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, institute: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingParticipantModal.department || ''}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Role</label>
                    <select
                      value={editingParticipantModal.role || 'Student'}
                      onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, role: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    >
                      <option value="Student">Student</option>
                      <option value="Staff">Staff</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Lecturer / Educator">Lecturer / Educator</option>
                      <option value="Industry Professional">Industry Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Level of Study</label>
                    <select
                      value={editingParticipantModal.levelOfStudy || 'Master'}
                      onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, levelOfStudy: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="PHD">PHD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Keynote Speaker</label>
                  <select
                    value={editingParticipantModal.isKeynoteSpeaker || 'No'}
                    onChange={(e) => setEditingParticipantModal({ ...editingParticipantModal, isKeynoteSpeaker: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-bold"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingParticipantModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await handleAdminCrud('UPDATE', 'workshopRegistrations', editingParticipantModal);
                    setEditingParticipantModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW PARTICIPANT DETAILS MODAL */}
        {viewingParticipantModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#045494] bg-blue-50 px-2 py-0.5 rounded">
                    {viewingParticipantModal.registrationId}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {viewingParticipantModal.fullName}
                  </h3>
                </div>
                <button onClick={() => setViewingParticipantModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Phone (WhatsApp):</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Role:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.role}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Institute:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.institute}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.department}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Level of Study:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.levelOfStudy}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Country:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.country}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="font-bold text-slate-500">Keynote Speaker:</span>
                  <span className="font-semibold text-slate-900">{viewingParticipantModal.isKeynoteSpeaker}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-bold text-slate-500">Attended & Certified:</span>
                  <span className="font-bold text-emerald-600">{viewingParticipantModal.attended ? `Yes (${viewingParticipantModal.certId || 'Certified'})` : 'No'}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewingParticipantModal(null)}
                  className="bg-[#045494] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
        {/* EDIT COURSE MODAL */}
        {editingCourseModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingCourseModal.id && data.courses.some(c => c.id === editingCourseModal.id) ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <p className="text-xs text-slate-500">Provide course details, image cover, outline PDF, and registration link.</p>
                </div>
                <button
                  onClick={() => setEditingCourseModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    value={editingCourseModal.title}
                    onChange={(e) => setEditingCourseModal({ ...editingCourseModal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Advanced Structural Equation Modeling (SEM) with SmartPLS"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingCourseModal.category || ''}
                      onChange={(e) => setEditingCourseModal({ ...editingCourseModal, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. IT, Research, Data Science..."
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingCourseModal.duration || ''}
                      onChange={(e) => setEditingCourseModal({ ...editingCourseModal, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. 6 weeks"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mode</label>
                    <input
                      type="text"
                      value={editingCourseModal.mode || ''}
                      onChange={(e) => setEditingCourseModal({ ...editingCourseModal, mode: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. Online (Live)"
                    />
                  </div>
                </div>

                {/* File Upload 1: Cover Image */}
                <FileUploader
                  label="Course Image"
                  accept="image/svg+xml, image/png, image/jpeg, image/gif"
                  value={editingCourseModal.imageUrl || ''}
                  onChange={(url) => setEditingCourseModal({ ...editingCourseModal, imageUrl: url })}
                  helpText="SVG, PNG, JPG or GIF upload from system"
                />

                {/* File Upload 2: Course Outline PDF */}
                <FileUploader
                  label="Course Outline (PDF)"
                  accept=".pdf,.doc,.docx,.zip"
                  value={editingCourseModal.outlinePdfUrl || ''}
                  onChange={(url) => setEditingCourseModal({ ...editingCourseModal, outlinePdfUrl: url })}
                  helpText="PDF, DOC, ZIP (max 20MB) upload from system"
                />

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Google Form Link (for registration)</label>
                  <input
                    type="text"
                    value={editingCourseModal.googleFormLink || ''}
                    onChange={(e) => setEditingCourseModal({ ...editingCourseModal, googleFormLink: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs"
                    placeholder="https://forms.gle/..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingCourseModal.description || ''}
                    onChange={(e) => setEditingCourseModal({ ...editingCourseModal, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y"
                    placeholder="Comprehensive description of the course..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Objective</label>
                  <textarea
                    rows={2}
                    value={editingCourseModal.objective || ''}
                    onChange={(e) => setEditingCourseModal({ ...editingCourseModal, objective: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y"
                    placeholder="Key learning objectives..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Benefits (One per line)</label>
                  <textarea
                    rows={4}
                    value={Array.isArray(editingCourseModal.benefits) ? editingCourseModal.benefits.join('\n') : (editingCourseModal.benefits || '')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setEditingCourseModal({ ...editingCourseModal, benefits: lines as any });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y"
                    placeholder={'Benefit 1\nBenefit 2\nBenefit 3'}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourseModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingCourseModal.title}
                  onClick={async () => {
                    const benefitsArray = Array.isArray(editingCourseModal.benefits)
                      ? editingCourseModal.benefits.filter(Boolean)
                      : String(editingCourseModal.benefits || '').split('\n').filter(Boolean);

                    const coursePayload = {
                      ...editingCourseModal,
                      benefits: benefitsArray
                    };

                    const existsInDb = data.courses.some(c => String(c.id) === String(editingCourseModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'courses', coursePayload);

                    const existingList = contentForm.coursesPage?.coursesList || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(c => String(c.id) === String(editingCourseModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = coursePayload;
                    } else {
                      updatedList.push(coursePayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      coursesPage: { ...(contentForm.coursesPage || {}), coursesList: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingCourseModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT GLOBAL ADVISORY BOARD MEMBER MODAL */}
        {editingAmbassadorModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingAmbassadorModal.id && data.ambassadors.some(a => a.id === editingAmbassadorModal.id) ? 'Edit Global Advisory Board Member' : 'Add Global Advisory Board Member'}
                  </h3>
                  <p className="text-xs text-slate-500">Enter Global Advisory Board member profile details, title, country, image, LinkedIn URL, and biography.</p>
                </div>
                <button
                  onClick={() => setEditingAmbassadorModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={editingAmbassadorModal.name}
                    onChange={(e) => setEditingAmbassadorModal({ ...editingAmbassadorModal, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Prof. Dr. Sarah Jenkins"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={editingAmbassadorModal.title}
                    onChange={(e) => setEditingAmbassadorModal({ ...editingAmbassadorModal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    placeholder="e.g. Chair of Artificial Intelligence & Data Science"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    value={editingAmbassadorModal.country}
                    onChange={(e) => setEditingAmbassadorModal({ ...editingAmbassadorModal, country: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    placeholder="e.g. United Kingdom"
                  />
                </div>

                {/* File Uploader for Member Image */}
                <FileUploader
                  label="Member Profile Photo / Image"
                  accept="image/svg+xml, image/png, image/jpeg, image/gif"
                  value={editingAmbassadorModal.imageUrl || editingAmbassadorModal.photoUrl || ''}
                  onChange={(url) => setEditingAmbassadorModal({
                    ...editingAmbassadorModal,
                    imageUrl: url,
                    photoUrl: url,
                    image: url
                  })}
                  helpText="Upload a clear profile image (SVG, PNG, JPG or GIF max. 10MB)"
                />

                <div>
                  <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={editingAmbassadorModal.linkedinUrl || editingAmbassadorModal.linkedin || ''}
                    onChange={(e) => setEditingAmbassadorModal({
                      ...editingAmbassadorModal,
                      linkedinUrl: e.target.value,
                      linkedin: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono"
                    placeholder="e.g. https://www.linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Biography</label>
                  <textarea
                    rows={4}
                    value={editingAmbassadorModal.bio || ''}
                    onChange={(e) => setEditingAmbassadorModal({ ...editingAmbassadorModal, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y"
                    placeholder="Detailed academic biography and achievements..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAmbassadorModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingAmbassadorModal.name}
                  onClick={async () => {
                    const imgVal = editingAmbassadorModal.imageUrl || editingAmbassadorModal.photoUrl || editingAmbassadorModal.image;
                    const linkVal = editingAmbassadorModal.linkedinUrl || editingAmbassadorModal.linkedin;
                    const ambPayload = {
                      ...editingAmbassadorModal,
                      imageUrl: imgVal,
                      photoUrl: imgVal,
                      image: imgVal,
                      linkedinUrl: linkVal,
                      linkedin: linkVal
                    };
                    const existsInDb = data.ambassadors.some(a => String(a.id) === String(editingAmbassadorModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'ambassadors', ambPayload);

                    const existingList = contentForm.ambassadorsPage?.ambassadorsList || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(a => String(a.id) === String(editingAmbassadorModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = ambPayload;
                    } else {
                      updatedList.push(ambPayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      ambassadorsPage: { ...(contentForm.ambassadorsPage || {}), ambassadorsList: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingAmbassadorModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save Member
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT RESEARCH MEMBER MODAL */}
        {editingResearchMemberModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingResearchMemberModal.id && data.researchMembers.some(m => m.id === editingResearchMemberModal.id) ? 'Edit Member' : 'Add Member'}
                  </h3>
                  <p className="text-xs text-slate-500">Enter research network member details and institution.</p>
                </div>
                <button
                  onClick={() => setEditingResearchMemberModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={editingResearchMemberModal.name}
                    onChange={(e) => setEditingResearchMemberModal({ ...editingResearchMemberModal, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Dr. Alexander Wright"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role (e.g. PRINCIPAL INVESTIGATOR) *</label>
                  <input
                    type="text"
                    value={editingResearchMemberModal.role}
                    onChange={(e) => setEditingResearchMemberModal({ ...editingResearchMemberModal, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 uppercase font-bold"
                    placeholder="e.g. PRINCIPAL INVESTIGATOR"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institution *</label>
                  <input
                    type="text"
                    value={editingResearchMemberModal.institution}
                    onChange={(e) => setEditingResearchMemberModal({ ...editingResearchMemberModal, institution: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    placeholder="e.g. Imperial College London"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    value={editingResearchMemberModal.country}
                    onChange={(e) => setEditingResearchMemberModal({ ...editingResearchMemberModal, country: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    placeholder="e.g. United Kingdom"
                  />
                </div>

                {/* File Uploader for Research Member Image (Optional) */}
                <FileUploader
                  label="Image (Optional)"
                  accept="image/svg+xml, image/png, image/jpeg, image/gif"
                  value={editingResearchMemberModal.imageUrl || ''}
                  onChange={(url) => setEditingResearchMemberModal({ ...editingResearchMemberModal, imageUrl: url })}
                  helpText="SVG, PNG, JPG or GIF (max. 10MB)"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingResearchMemberModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingResearchMemberModal.name}
                  onClick={async () => {
                    const imgVal = editingResearchMemberModal.imageUrl || editingResearchMemberModal.photoUrl || editingResearchMemberModal.image;
                    const memPayload = {
                      ...editingResearchMemberModal,
                      imageUrl: imgVal,
                      photoUrl: imgVal,
                      image: imgVal
                    };
                    const existsInDb = data.researchMembers.some(m => String(m.id) === String(editingResearchMemberModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'researchMembers', memPayload);

                    const existingList = contentForm.researchNetworkPage?.membersList || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(m => String(m.id) === String(editingResearchMemberModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = memPayload;
                    } else {
                      updatedList.push(memPayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      researchNetworkPage: { ...(contentForm.researchNetworkPage || {}), membersList: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingResearchMemberModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* EDIT PARTNER MODAL */}
        {editingPartnerModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingPartnerModal.id && data.partners.some(p => p.id === editingPartnerModal.id) ? 'Edit Partner' : 'Add Partner'}
                  </h3>
                  <p className="text-xs text-slate-500">Add or update partner organization, logo, and biography/description.</p>
                </div>
                <button
                  onClick={() => setEditingPartnerModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organization Name *</label>
                  <input
                    type="text"
                    value={editingPartnerModal.name}
                    onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Universiti Teknologi Malaysia (UTM)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={editingPartnerModal.country || ''}
                      onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, country: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. Malaysia"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Partnership Type</label>
                    <select
                      value={editingPartnerModal.partnershipType || 'UNIVERSITY'}
                      onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, partnershipType: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-bold"
                    >
                      <option value="UNIVERSITY">University</option>
                      <option value="INSTITUTE">Research Institute</option>
                      <option value="SOCIETY">Scientific Society</option>
                      <option value="PUBLISHER">Publisher</option>
                    </select>
                  </div>
                </div>

                {/* Partner Logo Upload (max 10MB SVG, PNG, JPG, GIF) */}
                <FileUploader
                  label="Partner Logo *"
                  accept="image/svg+xml, image/png, image/jpeg, image/gif"
                  value={editingPartnerModal.logoUrl || ''}
                  onChange={(url) => setEditingPartnerModal({ ...editingPartnerModal, logoUrl: url })}
                  helpText="SVG, PNG, JPG or GIF (max. 10MB)"
                />

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scope of Alliance</label>
                  <input
                    type="text"
                    value={editingPartnerModal.scope || ''}
                    onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, scope: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    placeholder="e.g. Joint Conference Co-Hosting & Faculty Exchange"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Biography / Description</label>
                  <textarea
                    rows={4}
                    value={editingPartnerModal.description || ''}
                    onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y font-medium"
                    placeholder="Provide detailed profile description of the partner organization..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Website URL (Optional)</label>
                  <input
                    type="text"
                    value={editingPartnerModal.websiteUrl || ''}
                    onChange={(e) => setEditingPartnerModal({ ...editingPartnerModal, websiteUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPartnerModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingPartnerModal.name}
                  onClick={async () => {
                    const partnerPayload = { ...editingPartnerModal };
                    const existsInDb = data.partners.some(p => String(p.id) === String(editingPartnerModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'partners', partnerPayload);

                    const existingList = contentForm.partnersPage?.partnersList || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(p => String(p.id) === String(editingPartnerModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = partnerPayload;
                    } else {
                      updatedList.push(partnerPayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      partnersPage: { ...(contentForm.partnersPage || {}), partnersList: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingPartnerModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT CAREER ROLE MODAL */}
        {editingCareerRoleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingCareerRoleModal.id && data.careerRoles?.some(r => r.id === editingCareerRoleModal.id) ? 'Edit Position' : 'Add Position'}
                  </h3>
                  <p className="text-xs text-slate-500">Post open academic roles, requirements, and Google Form apply link.</p>
                </div>
                <button
                  onClick={() => setEditingCareerRoleModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Position Title *</label>
                  <input
                    type="text"
                    value={editingCareerRoleModal.title}
                    onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Academic Journal Managing Editor"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Division</label>
                    <input
                      type="text"
                      value={editingCareerRoleModal.department}
                      onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, department: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. Publications Division"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingCareerRoleModal.location}
                      onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, location: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. Remote / Kuala Lumpur"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Type</label>
                    <input
                      type="text"
                      value={editingCareerRoleModal.type}
                      onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="e.g. Full-time"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Apply for Role Google Form Link *</label>
                  <input
                    type="text"
                    value={editingCareerRoleModal.applyGoogleFormLink || ''}
                    onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, applyGoogleFormLink: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs text-slate-900"
                    placeholder="https://forms.gle/..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description / Responsibilities</label>
                  <textarea
                    rows={3}
                    value={editingCareerRoleModal.description || ''}
                    onChange={(e) => setEditingCareerRoleModal({ ...editingCareerRoleModal, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y font-medium"
                    placeholder="Lead the editorial oversight, peer review coordination, and Scopus/WoS compliance pathways..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications & Requirements (One per line)</label>
                  <textarea
                    rows={4}
                    value={Array.isArray(editingCareerRoleModal.requirements) ? editingCareerRoleModal.requirements.join('\n') : (editingCareerRoleModal.requirements || '')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setEditingCareerRoleModal({ ...editingCareerRoleModal, requirements: lines as any });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y font-medium"
                    placeholder={'PhD or Master’s in Computer Science, Engineering, or related technical discipline\nProven track record in peer-reviewed journal publishing'}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCareerRoleModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingCareerRoleModal.title}
                  onClick={async () => {
                    const reqsArray = Array.isArray(editingCareerRoleModal.requirements)
                      ? editingCareerRoleModal.requirements.filter(Boolean)
                      : String(editingCareerRoleModal.requirements || '').split('\n').filter(Boolean);

                    const rolePayload = {
                      ...editingCareerRoleModal,
                      requirements: reqsArray
                    };

                    const existsInDb = (data.careerRoles || []).some(r => String(r.id) === String(editingCareerRoleModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'careerRoles', rolePayload);

                    const existingList = contentForm.careersPage?.openRoles || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(r => String(r.id) === String(editingCareerRoleModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = rolePayload;
                    } else {
                      updatedList.push(rolePayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      careersPage: { ...(contentForm.careersPage || {}), openRoles: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingCareerRoleModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT NEWS ARTICLE MODAL */}
        {editingNewsArticleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingNewsArticleModal.id && data.newsArticles?.some(a => a.id === editingNewsArticleModal.id) ? 'Edit Press Release' : 'Add News Article'}
                  </h3>
                  <p className="text-xs text-slate-500">Publish news, press release media, and date/time selector.</p>
                </div>
                <button
                  onClick={() => setEditingNewsArticleModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headline / Title *</label>
                  <input
                    type="text"
                    value={editingNewsArticleModal.title}
                    onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-sm text-slate-900"
                    placeholder="e.g. Elite Global Excellence and Prof. Dr. Nor Haniza Samrin Unite..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category Badge</label>
                    <input
                      type="text"
                      value={editingNewsArticleModal.category || 'PRESS RELEASE'}
                      onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Published By</label>
                    <input
                      type="text"
                      value={editingNewsArticleModal.publishedBy || 'EGE Strategic Communications'}
                      onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, publishedBy: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Calendar Date & Time Selector *</label>
                    <input
                      type="datetime-local"
                      value={editingNewsArticleModal.publishDate ? editingNewsArticleModal.publishDate.slice(0, 16) : '2023-10-29T10:00'}
                      onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, publishDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium bg-slate-50 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reads Count Badge</label>
                    <input
                      type="text"
                      value={editingNewsArticleModal.readsCount || '1420+ reads'}
                      onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, readsCount: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                      placeholder="1420+ reads"
                    />
                  </div>
                </div>

                {/* Upload Picture from System (JPG, PNG, GIF, max 10MB) */}
                <FileUploader
                  label="Press Release Featured Image *"
                  accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
                  value={editingNewsArticleModal.imageUrl || ''}
                  onChange={(url) => setEditingNewsArticleModal({ ...editingNewsArticleModal, imageUrl: url })}
                  helpText="Upload picture from system (JPG, PNG, GIF max 10MB)"
                />

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingNewsArticleModal.excerpt || ''}
                    onChange={(e) => setEditingNewsArticleModal({ ...editingNewsArticleModal, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y font-medium"
                    placeholder="Short 1-2 sentence preview..."
                  />
                </div>

                <div>
                  <RichTextArea
                    label="Full Press Release Content"
                    value={editingNewsArticleModal.content || ''}
                    onChange={(val) => setEditingNewsArticleModal({ ...editingNewsArticleModal, content: val })}
                    rows={6}
                    placeholder="Detailed press release paragraph text..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingNewsArticleModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingNewsArticleModal.title}
                  onClick={async () => {
                    const articlePayload = { ...editingNewsArticleModal };
                    const existsInDb = (data.newsArticles || []).some(a => String(a.id) === String(editingNewsArticleModal.id));
                    const action = existsInDb ? 'UPDATE' : 'CREATE';

                    await handleAdminCrud(action, 'newsArticles', articlePayload);

                    const existingList = contentForm.newsPage?.newsArticlesList || [];
                    let updatedList = [...existingList];
                    const idx = updatedList.findIndex(a => String(a.id) === String(editingNewsArticleModal.id));
                    if (idx !== -1) {
                      updatedList[idx] = articlePayload;
                    } else {
                      updatedList.push(articlePayload);
                    }
                    const updatedForm = {
                      ...contentForm,
                      newsPage: { ...(contentForm.newsPage || {}), newsArticlesList: updatedList }
                    };
                    setContentForm(updatedForm);
                    await handleSaveDirectSiteContent(updatedForm);
                    setEditingNewsArticleModal(null);
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
                >
                  Save Release
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW INBOX MESSAGE MODAL */}
        {viewingInboxMessageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-5 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#045494] bg-blue-50 px-2 py-0.5 rounded">
                    {viewingInboxMessageModal.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {viewingInboxMessageModal.subject || 'Inbound Message'}
                  </h3>
                </div>
                <button onClick={() => setViewingInboxMessageModal(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="font-bold text-slate-500">Sender Name:</span>
                    <span className="font-bold text-slate-900">{viewingInboxMessageModal.fullName || viewingInboxMessageModal.name || viewingInboxMessageModal.senderName || 'Inquirer'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="font-bold text-slate-500">Email Address:</span>
                    <span className="font-mono text-slate-900">{viewingInboxMessageModal.email}</span>
                  </div>
                  {viewingInboxMessageModal.phone && (
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-bold text-slate-500">Phone / WhatsApp:</span>
                      <span className="font-semibold text-slate-900">{viewingInboxMessageModal.phone}</span>
                    </div>
                  )}
                  {viewingInboxMessageModal.category && (
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-bold text-slate-500">Category:</span>
                      <span className="font-semibold text-[#045494]">{viewingInboxMessageModal.category}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-500">Date Received:</span>
                    <span className="font-mono text-slate-600">{viewingInboxMessageModal.createdAt}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-xs block">Message Content:</span>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
                    {viewingInboxMessageModal.message}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${viewingInboxMessageModal.email}?subject=${encodeURIComponent('Re: ' + (viewingInboxMessageModal.subject || 'Direct Contact Inquiry'))}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                    title={`Reply directly to ${viewingInboxMessageModal.email}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const newStatus = viewingInboxMessageModal.status === 'READ' ? 'UNREAD' : 'READ';
                      handleAdminCrud('UPDATE', 'inbox', { ...viewingInboxMessageModal, status: newStatus });
                      setViewingInboxMessageModal({ ...viewingInboxMessageModal, status: newStatus });
                    }}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                  >
                    {viewingInboxMessageModal.status === 'READ' ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this message?')) {
                        const targetId = viewingInboxMessageModal.id;
                        setViewingInboxMessageModal(null);
                        handleAdminCrud('DELETE', 'inbox', { id: targetId });
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Message</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingInboxMessageModal(null)}
                  className="bg-[#045494] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Active Conference Editor */}
        {editingActiveConfModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {contentForm.conferencesPage?.activeConferencesList?.some(c => c.id === editingActiveConfModal.id)
                    ? 'Edit Active Conference'
                    : 'Add New Active Conference'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingActiveConfModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Badge / Tagline</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.badge || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, badge: e.target.value })}
                      placeholder="e.g. Flagship EGE Annual Conference"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Conference Name *</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.name || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, name: e.target.value })}
                      placeholder="e.g. ICCSEIT 2026: 4th International Conference..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Format</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.format || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, format: e.target.value })}
                      placeholder="e.g. Hybrid Format · In-Person"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.location || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, location: e.target.value })}
                      placeholder="e.g. (Kuala Lumpur, Malaysia) & Virtual Live Stream Worldwide"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Submit Paper / Abstract URL</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.submitPaperUrl || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, submitPaperUrl: e.target.value })}
                      placeholder="e.g. https://... or /contact"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Visit Now URL</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.visitNowUrl || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, visitNowUrl: e.target.value })}
                      placeholder="e.g. /contact or https://..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Conference Dates</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.dates || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, dates: e.target.value })}
                      placeholder="e.g. October 24–25, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dates Subtext</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.datesSubtext || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, datesSubtext: e.target.value })}
                      placeholder="e.g. 2 Full Conference Days"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Submission Deadline</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.submissionDeadline || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, submissionDeadline: e.target.value })}
                      placeholder="e.g. August 15, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Submission Deadline Subtext</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.submissionDeadlineSubtext || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, submissionDeadlineSubtext: e.target.value })}
                      placeholder="e.g. Double-Blind Peer Review"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Notification of Acceptance Date</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.notificationDate || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, notificationDate: e.target.value })}
                      placeholder="e.g. September 10, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Notification Subtext</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.notificationDateSubtext || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, notificationDateSubtext: e.target.value })}
                      placeholder="e.g. With Reviewer Comments"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Proceedings Indexing</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.proceedings || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, proceedings: e.target.value })}
                      placeholder="e.g. Scopus / WoS Indexed"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Proceedings Subtext</label>
                    <input
                      type="text"
                      value={editingActiveConfModal.proceedingsSubtext || ''}
                      onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, proceedingsSubtext: e.target.value })}
                      placeholder="e.g. Crossref DOI Assigned"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Conference Theme</label>
                  <textarea
                    rows={3}
                    value={editingActiveConfModal.theme || ''}
                    onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, theme: e.target.value })}
                    placeholder="Describe conference theme..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Co-Organized Partners Line</label>
                  <input
                    type="text"
                    value={editingActiveConfModal.coOrganizedText || ''}
                    onChange={(e) => setEditingActiveConfModal({ ...editingActiveConfModal, coOrganizedText: e.target.value })}
                    placeholder="e.g. Co-Organized with University Partners..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingActiveConfModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingActiveConfModal.name}
                  onClick={async () => {
                    const list = [...(contentForm.conferencesPage?.activeConferencesList || [])];
                    const idx = list.findIndex(c => c.id === editingActiveConfModal.id);
                    if (idx >= 0) {
                      list[idx] = editingActiveConfModal;
                    } else {
                      list.push(editingActiveConfModal);
                    }
                    const updatedContent = {
                      ...contentForm,
                      conferencesPage: {
                        ...(contentForm.conferencesPage || {}),
                        activeConferencesList: list
                      }
                    };
                    setContentForm(updatedContent);
                    await handleSaveDirectSiteContent(updatedContent);
                    setEditingActiveConfModal(null);
                    showFeedback('Active conference saved successfully.');
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Conference
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Future Conference Editor */}
        {editingFutureConfModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {contentForm.conferencesPage?.futureConferencesList?.some(fc => fc.id === editingFutureConfModal.id)
                    ? 'Edit Future Conference'
                    : 'Add Future Conference'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingFutureConfModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Badge</label>
                    <input
                      type="text"
                      value={editingFutureConfModal.badge || ''}
                      onChange={(e) => setEditingFutureConfModal({ ...editingFutureConfModal, badge: e.target.value })}
                      placeholder="e.g. FUTURE ACADEMIC CONFERENCE"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Conference Title *</label>
                    <input
                      type="text"
                      value={editingFutureConfModal.title || ''}
                      onChange={(e) => setEditingFutureConfModal({ ...editingFutureConfModal, title: e.target.value })}
                      placeholder="e.g. EGE-MLDL: International Conference..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description / Focus</label>
                  <textarea
                    rows={3}
                    value={editingFutureConfModal.description || ''}
                    onChange={(e) => setEditingFutureConfModal({ ...editingFutureConfModal, description: e.target.value })}
                    placeholder="Describe scope, topic areas, and focus..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                  />
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-700">Highlights / Bullet Points</label>
                    <button
                      type="button"
                      onClick={() => setEditingFutureConfModal({
                        ...editingFutureConfModal,
                        highlights: [...(editingFutureConfModal.highlights || []), '']
                      })}
                      className="text-[11px] bg-blue-100 text-[#045494] px-2 py-0.5 rounded font-bold hover:bg-blue-200 cursor-pointer"
                    >
                      + Add Highlight
                    </button>
                  </div>
                  {(editingFutureConfModal.highlights || []).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => {
                          const updatedHl = [...(editingFutureConfModal.highlights || [])];
                          updatedHl[hIdx] = e.target.value;
                          setEditingFutureConfModal({ ...editingFutureConfModal, highlights: updatedHl });
                        }}
                        placeholder="Highlight bullet..."
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedHl = (editingFutureConfModal.highlights || []).filter((_, i) => i !== hIdx);
                          setEditingFutureConfModal({ ...editingFutureConfModal, highlights: updatedHl });
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Conference Date</label>
                    <input
                      type="text"
                      value={editingFutureConfModal.date || ''}
                      onChange={(e) => setEditingFutureConfModal({ ...editingFutureConfModal, date: e.target.value })}
                      placeholder="e.g. Dec 12–13, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Inquire Submission Target URL</label>
                    <input
                      type="text"
                      value={editingFutureConfModal.inquireUrl || ''}
                      onChange={(e) => setEditingFutureConfModal({ ...editingFutureConfModal, inquireUrl: e.target.value })}
                      placeholder="e.g. /contact"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFutureConfModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingFutureConfModal.title}
                  onClick={async () => {
                    const list = [...(contentForm.conferencesPage?.futureConferencesList || [])];
                    const idx = list.findIndex(fc => fc.id === editingFutureConfModal.id);
                    if (idx >= 0) {
                      list[idx] = editingFutureConfModal;
                    } else {
                      list.push(editingFutureConfModal);
                    }
                    const updatedContent = {
                      ...contentForm,
                      conferencesPage: {
                        ...(contentForm.conferencesPage || {}),
                        futureConferencesList: list
                      }
                    };
                    setContentForm(updatedContent);
                    await handleSaveDirectSiteContent(updatedContent);
                    setEditingFutureConfModal(null);
                    showFeedback('Future conference saved successfully.');
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Future Conference
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Timeline Row Editor */}
        {editingTimelineRowModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {contentForm.conferencesPage?.timelineRows?.some(r => r.id === editingTimelineRowModal.id)
                    ? 'Edit Timeline Row'
                    : 'Add Timeline Row'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingTimelineRowModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Conference / Symposium Title *</label>
                  <input
                    type="text"
                    value={editingTimelineRowModal.name || ''}
                    onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, name: e.target.value })}
                    placeholder="e.g. ICCSEIT 2026 (4th Edition)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingTimelineRowModal.category || ''}
                      onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, category: e.target.value })}
                      placeholder="e.g. Computer Science & IT"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                    <input
                      type="text"
                      value={editingTimelineRowModal.eventDate || ''}
                      onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, eventDate: e.target.value })}
                      placeholder="e.g. Oct 24–25, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Paper Deadline</label>
                    <input
                      type="text"
                      value={editingTimelineRowModal.paperDeadline || ''}
                      onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, paperDeadline: e.target.value })}
                      placeholder="e.g. Aug 15, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Action Button Label</label>
                    <input
                      type="text"
                      value={editingTimelineRowModal.actionName || ''}
                      onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, actionName: e.target.value })}
                      placeholder="e.g. Submit Paper"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Link / Target URL</label>
                  <input
                    type="text"
                    value={editingTimelineRowModal.actionUrl || ''}
                    onChange={(e) => setEditingTimelineRowModal({ ...editingTimelineRowModal, actionUrl: e.target.value })}
                    placeholder="e.g. /contact or https://..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTimelineRowModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingTimelineRowModal.name}
                  onClick={async () => {
                    const rows = [...(contentForm.conferencesPage?.timelineRows || [])];
                    const idx = rows.findIndex(r => r.id === editingTimelineRowModal.id);
                    if (idx >= 0) {
                      rows[idx] = editingTimelineRowModal;
                    } else {
                      rows.push(editingTimelineRowModal);
                    }
                    const updatedContent = {
                      ...contentForm,
                      conferencesPage: {
                        ...(contentForm.conferencesPage || {}),
                        timelineRows: rows
                      }
                    };
                    setContentForm(updatedContent);
                    await handleSaveDirectSiteContent(updatedContent);
                    setEditingTimelineRowModal(null);
                    showFeedback('Timeline row saved successfully.');
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Timeline Row
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Governance Member Editor */}
        {editingGovMemberModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  {contentForm.aboutPage?.governanceMembers?.some(m => m.id === editingGovMemberModal.id)
                    ? 'Edit Leadership Member'
                    : 'Add Leadership Member'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingGovMemberModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={editingGovMemberModal.name || ''}
                      onChange={(e) => setEditingGovMemberModal({ ...editingGovMemberModal, name: e.target.value })}
                      placeholder="e.g. Matthew S. Kissner"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Role Category *</label>
                    <select
                      value={editingGovMemberModal.category || 'BOARD_MEMBER'}
                      onChange={(e) => setEditingGovMemberModal({ ...editingGovMemberModal, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 bg-white"
                    >
                      <option value="CEO">Chief Executive Officer (CEO)</option>
                      <option value="CO_FOUNDER">Co-Founder & Executive Vice President</option>
                      <option value="EXECUTIVE_LEADER">Executive Officer</option>
                      <option value="BOARD_MEMBER">Board of Directors</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Title / Position *</label>
                  <input
                    type="text"
                    value={editingGovMemberModal.title || ''}
                    onChange={(e) => setEditingGovMemberModal({ ...editingGovMemberModal, title: e.target.value })}
                    placeholder="e.g. President and Chief Executive Officer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-900"
                  />
                </div>

                <FileUploader
                  label="Profile Picture Photo"
                  accept="image/*"
                  value={editingGovMemberModal.photoUrl || ''}
                  onChange={(url) => setEditingGovMemberModal({ ...editingGovMemberModal, photoUrl: url })}
                  helpText="Upload portrait photo or paste external URL below."
                />
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                  <input
                    type="text"
                    value={editingGovMemberModal.photoUrl || ''}
                    onChange={(e) => setEditingGovMemberModal({ ...editingGovMemberModal, photoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
                  />
                </div>



                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Biography (Read More Popup)</label>
                  <textarea
                    rows={4}
                    value={editingGovMemberModal.fullBio || ''}
                    onChange={(e) => setEditingGovMemberModal({ ...editingGovMemberModal, fullBio: e.target.value })}
                    placeholder="Detailed executive biography and career background..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGovMemberModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading || !editingGovMemberModal.name}
                  onClick={async () => {
                    const members = [...(contentForm.aboutPage?.governanceMembers || (initialDatabase.siteContent?.aboutPage?.governanceMembers || []))];
                    const idx = members.findIndex(m => m.id === editingGovMemberModal.id);
                    if (idx >= 0) {
                      members[idx] = editingGovMemberModal;
                    } else {
                      members.push(editingGovMemberModal);
                    }
                    const updatedContent = {
                      ...contentForm,
                      aboutPage: {
                        ...(contentForm.aboutPage || {}),
                        governanceMembers: members
                      }
                    };
                    setContentForm(updatedContent);
                    await handleSaveDirectSiteContent(updatedContent);
                    setEditingGovMemberModal(null);
                    showFeedback('Leadership member saved successfully.');
                  }}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </div>
          </div>
        )}

          </main>
        </div>
      </div>
    </div>
  );
};
