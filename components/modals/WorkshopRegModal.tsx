'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Loader2, Send, ExternalLink, QrCode, AlertCircle, ArrowLeft } from 'lucide-react';
import { Workshop, DatabaseState } from '@/lib/types';

interface WorkshopRegModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop?: Workshop | null;
  workshopTitle?: string;
  isCustomRequest?: boolean;
  data?: DatabaseState;
  onSuccess?: () => void;
}

const COUNTRIES = [
  'Malaysia', 'Indonesia', 'Singapore', 'Thailand', 'Vietnam', 'Philippines', 'India', 'Pakistan',
  'Bangladesh', 'China', 'Japan', 'South Korea', 'Australia', 'United Kingdom', 'United States',
  'Canada', 'Germany', 'France', 'Netherlands', 'Portugal', 'Russia', 'Saudi Arabia', 'United Arab Emirates',
  'Egypt', 'Nigeria', 'Kenya', 'South Africa', 'Brazil', 'Mexico', 'Other Country'
];

export const WorkshopRegModal: React.FC<WorkshopRegModalProps> = ({
  isOpen,
  onClose,
  workshop,
  workshopTitle = 'Upcoming Free Virtual Workshops Series',
  isCustomRequest = false,
  data,
  onSuccess,
}) => {
  const activeTitle = workshop?.title || workshopTitle;
  const targetWorkshopId = workshop?.workshopId || (workshop?.id ? `EGEW${workshop.id}` : 'EGEW15');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+60123456789');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Student');
  const [institute, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [levelOfStudy, setLevelOfStudy] = useState('Master');
  const [country, setCountry] = useState('Malaysia');
  const [isKeynoteSpeaker, setIsKeynoteSpeaker] = useState('No, I don’t have experience as a keynote speaker');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Registration Result Screen State
  const [confirmedReg, setConfirmedReg] = useState<{
    registrationId: string;
    fullName: string;
    whatsappLink?: string;
    whatsappQrUrl?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !fullName || !phone || !institute || !department) {
      setError('Please fill in all required fields marked with *.');
      return;
    }

    try {
      const targetEmail = String(email || '').trim().toLowerCase();

      // Fetch latest registrations from server database to ensure strict up-to-second uniqueness across all users
      let allRegs: any[] = [];
      try {
        const res = await fetch('/api/data?t=' + Date.now());
        if (res.ok) {
          const latestDb = await res.json();
          if (Array.isArray(latestDb?.workshopRegistrations)) {
            allRegs = latestDb.workshopRegistrations;
          }
        }
      } catch (fErr) {
        console.warn('Fetch latest DB fallback:', fErr);
      }

      if (!allRegs.length && Array.isArray(data?.workshopRegistrations)) {
        allRegs = data.workshopRegistrations;
      }

      const matchingRegs = allRegs.filter((r) => {
        const wId = String(r?.workshopId || '').trim().toUpperCase();
        const rId = String(r?.registrationId || '').trim().toUpperCase();
        return wId === targetWorkshopId.toUpperCase() || rId.startsWith(targetWorkshopId.toUpperCase());
      });

      const isAlreadyRegistered = matchingRegs.some(
        (r) => String(r?.email || '').trim().toLowerCase() === targetEmail
      );

      if (isAlreadyRegistered) {
        setError(`The email "${email}" is already registered for this workshop (${targetWorkshopId}). Duplicate registrations are not allowed.`);
        return;
      }

      // Extract highest numeric index from existing registration IDs for this workshop (e.g. EGEW18-001 -> 1)
      let maxNumber = 0;
      matchingRegs.forEach((r) => {
        const regIdStr = String(r?.registrationId || '');
        const match = regIdStr.match(/-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNumber) {
            maxNumber = num;
          }
        }
      });

      const nextIndex = maxNumber + 1;
      const generatedRegId = `${targetWorkshopId}-${String(nextIndex).padStart(3, '0')}`;

      const newRegistration = {
        id: `reg-${Date.now()}`,
        workshopId: targetWorkshopId,
        registrationId: generatedRegId,
        fullName,
        email: targetEmail,
        phone,
        role,
        institute,
        department,
        levelOfStudy,
        country,
        isKeynoteSpeaker: String(isKeynoteSpeaker || '').startsWith('Yes') ? 'Yes' : 'No',
        attended: false,
        registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };

      // 1. INSTANTLY transition to registration confirmation screen
      setConfirmedReg({
        registrationId: generatedRegId,
        fullName,
        whatsappLink: workshop?.whatsappLink || 'https://chat.whatsapp.com/EGEWorkshopAI2026',
        whatsappQrUrl: workshop?.whatsappQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(workshop?.whatsappLink || 'https://chat.whatsapp.com/EGEWorkshopAI2026')}`,
      });

      if (onSuccess) onSuccess();

      // 2. Save registration record to database asynchronously
      fetch('/api/admin/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE',
          entity: 'workshopRegistrations',
          payload: newRegistration,
        }),
      })
        .then(() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('ege_data_updated'));
          }
        })
        .catch((err) => console.warn('Reg save fallback:', err));

      // 3. Send Inbox Copy asynchronously
      fetch('/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WORKSHOP_REGISTRATION',
          name: fullName,
          email: targetEmail,
          phone,
          subject: `Workshop Registration [${generatedRegId}]: ${activeTitle}`,
          packageSelected: activeTitle,
          message: `Registration ID: ${generatedRegId}\nInstitute: ${institute} (${department})\nRole: ${role} | Level: ${levelOfStudy}\nCountry: ${country}\nKeynote Interest: ${isKeynoteSpeaker}`,
          metadata: newRegistration,
        }),
      }).catch((err) => console.warn('Inbox notify fallback:', err));

      const clearForm = () => {
        setEmail('');
        setPhone('');
        setFullName('');
        setRole('Student');
        setInstitution('');
        setDepartment('');
        setLevelOfStudy('Master');
        setCountry('Malaysia');
        setIsKeynoteSpeaker('No, I don’t have experience as a keynote speaker');
        setError('');
      };

      // Clear input fields immediately after registration record creation
      clearForm();

      // 4. Send Automated Confirmation Email from eliteglobalexcellence@gmail.com asynchronously
      fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: targetEmail,
          recipientName: fullName,
          registrationId: generatedRegId,
          workshopTitle: activeTitle,
          date: workshop?.date || 'To Be Announced',
          time: workshop?.time || 'To Be Announced',
          mode: workshop?.mode || 'Online (Zoom)',
          whatsappLink: workshop?.whatsappLink || 'https://chat.whatsapp.com/EGEWorkshopAI2026',
        }),
      }).catch((err) => console.warn('Email notify fallback:', err));
    } catch (err: any) {
      console.error('Registration exception:', err);
      setError('Registration failed. Please try again.');
    }
  };

  const handleReset = () => {
    setConfirmedReg(null);
    setError('');
    setEmail('');
    setPhone('');
    setFullName('');
    setRole('Student');
    setInstitution('');
    setDepartment('');
    setLevelOfStudy('Master');
    setCountry('Malaysia');
    setIsKeynoteSpeaker('No, I don’t have experience as a keynote speaker');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] flex flex-col">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReg ? (
          /* REGISTRATION SUCCESS CONFIRMATION SCREEN */
          <div className="space-y-6 text-center py-2 overflow-y-auto pr-1 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                Dear {confirmedReg.fullName},
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for registering for the upcoming workshop. Your registration has been successfully processed and your seat is reserved.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium p-3 rounded-xl max-w-md mx-auto flex items-center justify-center gap-2 mt-2">
                <Send className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confirmation email sent from <strong>eliteglobalexcellence@gmail.com</strong> to <strong>{email}</strong></span>
              </div>
            </div>

            {/* YOUR REGISTRATION ID HIGHLIGHT BOX */}
            <div className="bg-blue-50 border-2 border-dashed border-[#045494] rounded-2xl p-5 text-center space-y-2 shadow-xs">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#045494] block">
                YOUR REGISTRATION ID
              </span>
              <span className="text-2xl font-black text-[#045494] tracking-widest font-mono bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-xs inline-block">
                {confirmedReg.registrationId}
              </span>
              <p className="text-[11px] text-blue-900 font-semibold leading-relaxed pt-1">
                <strong>Important:</strong> Please keep this Registration ID handy. You will need to provide it to verify your attendance and claim your certificate after the workshop concludes.
              </p>
            </div>

            {/* WHATSAPP GROUP & QR CODE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Join Official WhatsApp Group</span>
              </div>

              {confirmedReg.whatsappQrUrl && (
                <div className="flex justify-center">
                  <img
                    src={confirmedReg.whatsappQrUrl}
                    alt="WhatsApp Group QR Code"
                    className="w-36 h-36 rounded-xl border border-slate-200 shadow-md p-2 bg-white object-contain"
                  />
                </div>
              )}

              {confirmedReg.whatsappLink && (
                <a
                  href={confirmedReg.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>Join WhatsApp Group Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                Close & Return to Workshops
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM SCREEN */
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">Registration Form</h3>
                <p className="text-xs text-slate-500 font-semibold line-clamp-1">
                  Registering for: <span className="text-[#045494] font-bold">{activeTitle}</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs overflow-y-auto pr-1 flex-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sajidshah232@gmail.com"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+60123456789"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sajid Shah"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                  >
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Lecturer / Educator">Lecturer / Educator</option>
                    <option value="Industry Professional">Industry Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Level of Study <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={levelOfStudy}
                    onChange={(e) => setLevelOfStudy(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                  >
                    <option value="Bachelor">Degree: Bachelor</option>
                    <option value="Master">Degree: Master</option>
                    <option value="PHD">Degree: PHD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Name of Institute / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institute}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Universiti Teknologi Malaysia"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Department / Faculty <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Country <span className="text-rose-500">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Would you like to be a keynote speaker at one of our workshops?
                </label>
                <select
                  value={isKeynoteSpeaker}
                  onChange={(e) => setIsKeynoteSpeaker(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                >
                  <option value="Yes">Yes</option>
                  <option value="No, I don’t have experience as a keynote speaker">No, I don’t have experience as a keynote speaker</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Registration</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
