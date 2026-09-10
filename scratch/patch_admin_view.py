import re

with open(r'c:\xampp\htdocs\elitemainwebsite\components\views\AdminView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new workspace panels for partnersManagement, careersManagement, newsManagement, contactManagement, inbox
workspace_panels = '''            {/* PARTNERS MANAGEMENT SUB-TAB */}
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
                            scope: 'Institutional Partnership & Conference Co-Hosting',
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
                              <img src={partner.logoUrl} alt={partner.name} className="w-12 h-12 rounded-xl object-contain border border-slate-200 bg-white p-1 shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#045494] flex items-center justify-center font-bold text-base shrink-0">
                                {partner.name ? partner.name.charAt(0) : 'P'}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate">{partner.name}</h4>
                              <p className="text-slate-500 text-xs font-medium truncate">{partner.partnershipType} · {partner.country}</p>
                              {partner.scope && <p className="text-[11px] text-[#045494] font-semibold truncate">{partner.scope}</p>}
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
                  {/* 1. HERO SECTION */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#045494] border-b border-slate-200 pb-2">Hero Section Header</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Section Badge</label>
                        <input
                          type="text"
                          value={contentForm.contactPage?.heroBadge || 'GET IN TOUCH'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), heroBadge: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={contentForm.contactPage?.heroTitle || 'Contact Elite Global Excellence'}
                          onChange={(e) => setContentForm({
                            ...contentForm,
                            contactPage: { ...(contentForm.contactPage || {}), heroTitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hero Subtitle / Statement</label>
                      <textarea
                        rows={3}
                        value={contentForm.contactPage?.heroSubtitle || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contactPage: { ...(contentForm.contactPage || {}), heroSubtitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
                      />
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

                  {/* 3. EMERGENCY DEFENSE NOTE */}
                  <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-2">Emergency Viva Defense Coordination</h3>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Emergency Box Header</label>
                      <input
                        type="text"
                        value={contentForm.contactPage?.emergencyTitle || 'Emergency Defense Coordination'}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contactPage: { ...(contentForm.contactPage || {}), emergencyTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-xs bg-white text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Emergency Instructions Text</label>
                      <textarea
                        rows={2}
                        value={contentForm.contactPage?.emergencyText || ''}
                        onChange={(e) => setContentForm({
                          ...contentForm,
                          contactPage: { ...(contentForm.contactPage || {}), emergencyText: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-900 resize-y"
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

            {/* MESSAGE (INBOX) SUB-TAB */}
            {activeSubTab === 'inbox' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Inbox className="w-6 h-6 text-[#045494]" />
                      <span>Central Message Inbox</span>
                    </h2>
                    <p className="text-xs text-slate-500">Inbound messages from user contact submissions, workshop inquiries, and viva defense requests.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={inboxFilter}
                      onChange={(e) => setInboxFilter(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="ALL">All Messages</option>
                      <option value="NEW">New (Unread)</option>
                      <option value="READ">Read / Archived</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {(data.inbox || [])
                    .filter((msg) => {
                      if (inboxFilter === 'NEW') return msg.status === 'NEW';
                      if (inboxFilter === 'READ') return msg.status === 'READ';
                      return true;
                    })
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          msg.status === 'NEW' ? 'bg-blue-50/40 border-blue-200 font-semibold' : 'bg-slate-50 border-slate-200 opacity-90'
                        }`}
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-900">{msg.fullName}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-600 font-mono">{msg.email}</span>
                            {msg.phone && (
                              <>
                                <span className="text-slate-400">·</span>
                                <span className="text-slate-600">{msg.phone}</span>
                              </>
                            )}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              msg.status === 'NEW' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {msg.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm truncate">{msg.subject || 'Direct Inquiry'}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
                          <span className="text-[10px] text-slate-400 font-mono block">Received: {msg.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setViewingInboxMessageModal(msg)}
                            className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full</span>
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

                  {(data.inbox || []).length === 0 && (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                      <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-sm font-bold text-slate-700">No messages in inbox.</p>
                      <p className="text-xs text-slate-500">Inbound inquiries from the public website will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}'''

# Modals for Partner, Career Role, News Article, and Viewing Inbox Message
modals_code = '''
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
                    value={Array.isArray(editingCareerRoleModal.requirements) ? editingCareerRoleModal.requirements.join('\\n') : (editingCareerRoleModal.requirements || '')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\\n');
                      setEditingCareerRoleModal({ ...editingCareerRoleModal, requirements: lines as any });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 resize-y font-medium"
                    placeholder={'PhD or Master’s in Computer Science, Engineering, or related technical discipline\\nProven track record in peer-reviewed journal publishing'}
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
                      : String(editingCareerRoleModal.requirements || '').split('\\n').filter(Boolean);

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
                    <span className="font-bold text-slate-900">{viewingInboxMessageModal.fullName}</span>
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

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={async () => {
                    await handleAdminCrud('UPDATE', 'inbox', { ...viewingInboxMessageModal, status: 'READ' });
                    setViewingInboxMessageModal(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Mark as Read
                </button>
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
'''

# Find the block between `{/* PARTNERS CRUD SUB-TAB */}` and `{/* CERTIFICATES SUB-TAB */}`
pattern_subtabs = re.compile(r'\{\/\* PARTNERS CRUD SUB-TAB \*\/\}[\s\S]*?(\{\/\* CERTIFICATES SUB-TAB \*\/\}[\s\S]*?\n\s*\n)', re.MULTILINE)

m_subtabs = pattern_subtabs.search(content)
if m_subtabs:
    # Replace old partners, workshops, courses, members, careers placeholder tabs with our new workspace tabs + keep certificates tab
    certificates_part = m_subtabs.group(1)
    new_subtabs_code = workspace_panels + '\n\n            ' + certificates_part
    content = content[:m_subtabs.start()] + new_subtabs_code + content[m_subtabs.end():]
    print("Successfully replaced workspace sub-tabs.")
else:
    print("Failed to locate workspace sub-tabs pattern.")

# Find the location before `</main>` to insert modals
pattern_main_close = re.compile(r'(\s*<\/main>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);)', re.MULTILINE)
m_main = pattern_main_close.search(content)
if m_main:
    content = content[:m_main.start()] + modals_code + content[m_main.start():]
    print("Successfully inserted modals.")
else:
    print("Failed to locate </main> pattern.")

with open(r'c:\xampp\htdocs\elitemainwebsite\components\views\AdminView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating AdminView.tsx.")
