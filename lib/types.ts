// Types for Elite Global Excellence (EGE) Website & Admin Panel

export interface Ambassador {
  id: number | string;
  name: string;
  title: string;
  country: string;
  photoUrl?: string;
  imageUrl?: string;
  image?: string;
  bio: string;
  researchInterests?: string[];
  collaborationHighlights?: string;
  displayOrder?: number;
  isActive?: boolean;
  linkedinUrl?: string;
  linkedin?: string;
}

export interface EventItem {
  id: number | string;
  title: string;
  description: string;
  date: string;
  locationMode: string;
  category: string;
  imageUrl?: string;
  status: 'UPCOMING' | 'PAST' | string;
  registrationLink?: string;
  displayOrder?: number;
}

export interface NewsArticle {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedBy?: string;
  publishDate: string;
  date?: string;
  isPublished: boolean;
  viewsCount?: number | string;
  readsCount?: string;
  imageUrl?: string;
}

export interface Partner {
  id: number | string;
  name: string;
  category?: string;
  partnershipType?: 'UNIVERSITY' | 'INSTITUTE' | 'SOCIETY' | 'INDUSTRY' | string;
  logoUrl: string;
  imageUrl?: string;
  image?: string;
  description?: string;
  bio?: string;
  scope?: string;
  collaborationYears?: string;
  websiteUrl?: string;
  country: string;
  displayOrder?: number;
}

export interface Workshop {
  id: number | string;
  workshopId?: string; // e.g. EGEW15
  title: string;
  dateString?: string;
  date?: string;
  time?: string;
  mode: string;
  venue?: string;
  fee?: string;
  isFree: boolean;
  status: 'UPCOMING' | 'PAST' | string;
  description: string;
  speakerName?: string;
  speaker?: string;
  speakerAffiliation?: string;
  registrationLink?: string;
  imageUrl?: string;
  whatsappLink?: string;
  whatsappQrUrl?: string;
  objectives?: string[];
  attendanceOpen?: boolean;
  materialsAvailable?: boolean;
  displayOrder?: number;
  category?: string;
}

export interface WorkshopRegistration {
  id: string;
  workshopId: string; // e.g. EGEW15
  registrationId: string; // e.g. EGEW15-001
  fullName: string;
  email: string;
  phone: string;
  role: string;
  institute: string;
  department: string;
  levelOfStudy: string;
  country: string;
  isKeynoteSpeaker: string; // 'Yes' | 'No'
  attended?: boolean;
  certId?: string; // e.g. EGEW15-CERT01
  registeredAt?: string;
}

export interface WorkshopAttendance {
  id: string;
  workshopId: string; // e.g. EGEW14
  certId?: string; // e.g. EGEW14-CERT01
  fullName: string; // Full Name to be displayed on Certificate
  email: string;
  satisfied: string; // e.g. "Yes, Very Satisfied"
  learned: string; // e.g. "Yes, Extremely Valuable"
  feedback?: string; // Additional Feedback / Suggestions
  submittedAt: string;
  certIssued?: boolean;
}

export type WorkshopItem = Workshop;

export interface Course {
  id: number | string;
  code?: string;
  title: string;
  category?: string;
  tagline?: string;
  duration: string;
  mode: string;
  level?: string;
  type?: 'UPCOMING' | 'RECORDED_PAID' | string;
  description: string;
  objective?: string;
  outline?: string[];
  modules?: string[];
  benefits?: string[];
  price?: number;
  registrationOpen?: boolean;
  imageUrl?: string;
  outlinePdfUrl?: string;
  googleFormLink?: string;
}

export type CourseItem = Course;

export interface FrameworkStepItem {
  number: string;
  title: string;
  description: string;
}

export interface CoursesPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;

  pedagogyBadge?: string;
  pedagogyTitle?: string;
  pedagogySubtitle?: string;
  pedagogySteps?: { step: string; title: string; description: string }[];

  frameworkBadge?: string;
  frameworkTitle?: string;
  frameworkSubtitle?: string;
  frameworkSteps?: FrameworkStepItem[];

  licensingBadge?: string;
  licensingTitle?: string;
  licensingDescription?: string;
  licensingCtaText?: string;
  licensingWhatsappUrl?: string;
  licensingButtonText?: string;
  licensingButtonLink?: string;

  coursesList?: CourseItem[];
}

export interface DefenseRealityItem {
  id?: string;
  title: string;
  description: string;
}

export interface DefensePhaseItem {
  id?: string;
  phaseNumber: string;
  phase?: string;
  title: string;
  description: string;
}

export interface DefenseMainPackage {
  id: string;
  duration: string;
  title: string;
  name?: string;
  tagline: string;
  description?: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  whatsappLink?: string;
  whatsappUrl?: string;
  buttonText?: string;
  secondaryText?: string;
  invoiceText?: string;
}

export interface DefenseProposalPackage {
  id?: string;
  name: string;
  title?: string;
  duration: string;
  focus: string;
  description?: string;
  whatsappLink?: string;
  whatsappUrl?: string;
  buttonText?: string;
}

export interface DefenseFaqItem {
  id?: string;
  q: string;
  a: string;
}

export interface MockVivaPageContent {
  // 1. Hero
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  bookCtaText?: string;
  bookWhatsappUrl?: string;
  heroButton1Text?: string;
  heroButton1Whatsapp?: string;
  heroButton2Text?: string;
  heroButton2PdfUrl?: string;

  // 2. Realities
  realitiesBadge?: string;
  realitiesTitle?: string;
  realitiesDescription?: string;
  realitiesItems?: DefenseRealityItem[];

  // 3. Methodology
  methodologyBadge?: string;
  methodologyTitle?: string;
  methodologyDescription?: string;
  phases?: { phase?: string; phaseNumber?: string; title: string; description: string }[];
  methodologyPhases?: DefensePhaseItem[];

  // 4. Main Packages
  mainPackagesBadge?: string;
  mainPackagesTitle?: string;
  mainPackagesSubtitle?: string;
  mainPackagesList?: {
    id?: string;
    duration: string;
    name?: string;
    title?: string;
    badge?: string;
    description?: string;
    tagline?: string;
    features: string[];
    buttonText?: string;
    whatsappUrl?: string;
    whatsappLink?: string;
    invoiceText?: string;
    secondaryText?: string;
  }[];
  packagesBadge?: string;
  packagesTitle?: string;
  packagesSubtitle?: string;
  mainPackages?: DefenseMainPackage[];

  // 5. Proposal Packages
  proposalBadge?: string;
  proposalTitle?: string;
  proposalDescription?: string;
  proposalWhatsappUrl?: string;
  proposalMainButtonText?: string;
  proposalMainWhatsapp?: string;
  proposalPackagesList?: {
    id?: string;
    duration: string;
    title?: string;
    name?: string;
    description?: string;
    focus?: string;
    buttonText?: string;
    whatsappUrl?: string;
    whatsappLink?: string;
  }[];
  proposalPackages?: DefenseProposalPackage[];

  // 6. FAQs
  faqBadge?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  faqsList?: { id?: string; question: string; answer: string }[];
  faqItems?: DefenseFaqItem[];

  // 7. Brochure Download
  brochureBadge?: string;
  brochureTitle?: string;
  brochureSubtitle?: string;
  brochureDescription?: string;
  brochureButtonText?: string;
  brochurePdfUrl?: string;
}

export interface AmbassadorResponsibilityItem {
  number: string;
  step?: string;
  title: string;
  description: string;
}

export interface AmbassadorsPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;

  responsibilitiesBadge?: string;
  responsibilitiesTitle?: string;
  responsibilitiesSubtitle?: string;
  responsibilitiesList?: AmbassadorResponsibilityItem[];

  callBadge?: string;
  callTitle?: string;
  callDescription?: string;
  applyFormLink?: string;
  applyButtonText?: string;
  ambassadorsList?: Ambassador[];
}

export interface ResearchPillarItem {
  id?: string;
  title: string;
  description: string;
}

export interface ResearchNetworkPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;

  philosophyBadge?: string;
  philosophyTitle?: string;
  philosophyDescription?: string;

  pillars?: ResearchPillarItem[];

  activitiesBadge?: string;
  activitiesTitle?: string;
  activitiesList?: string[];

  membersTitle?: string;
  membersSubtitle?: string;

  bannerTitle?: string;
  bannerSubtitle?: string;
  bannerText?: string;
  bannerSubtext?: string;
  membersList?: ResearchMember[];
}


export interface ResearchMember {
  id: number | string;
  name: string;
  role: string;
  affiliation?: string;
  institution?: string;
  country: string;
  photoUrl?: string;
  imageUrl?: string;
  image?: string;
  researchArea?: string;
  specialization?: string[];
  email?: string;
  displayOrder?: number;
}

export interface CareerRole {
  id: number | string;
  title: string;
  department: string;
  division?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | string;
  description: string;
  requirements: string[];
  status: 'OPEN' | 'CLOSED' | string;
  googleFormLink?: string;
  applyGoogleFormLink?: string;
  applyFormLink?: string;
}

export interface PartnershipFrameworkItem {
  id?: string;
  title: string;
  description: string;
}

export interface PartnersPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;

  frameworksBadge?: string;
  frameworksTitle?: string;
  frameworksSubtitle?: string;
  frameworksList?: PartnershipFrameworkItem[];
  frameworks?: PartnershipFrameworkItem[];

  callBadge?: string;
  ctaBadge?: string;
  callTitle?: string;
  ctaTitle?: string;
  callDescription?: string;
  ctaSubtitle?: string;
  ctaDescription?: string;
  callCtaText?: string;
  ctaButtonText?: string;
  partnersList?: Partner[];
}

export interface CultureValueItem {
  number: string;
  title: string;
  description: string;
}

export interface CareersPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;

  pillarsBadge?: string;
  pillarsTitle?: string;
  pillarsList?: CultureValueItem[];
  culturePillars?: CultureValueItem[];

  spontaneousPrompt?: string;
  spontaneousTitle?: string;
  spontaneousSubtitle?: string;
  spontaneousDescription?: string;
  spontaneousFormLink?: string;
  spontaneousAppGoogleFormLink?: string;

  positionsTitle?: string;
  noPositionsText?: string;
  positionsList?: CareerRole[];
  openRoles?: CareerRole[];
}

export interface NewsPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;

  mediaRelationsTitle?: string;
  mediaBoxTitle?: string;
  mediaRelationsSubtitle?: string;
  mediaBoxDescription?: string;
  contactMediaOfficeButtonText?: string;
  mediaBoxCtaText?: string;
  articlesList?: NewsArticle[];
  newsArticlesList?: NewsArticle[];
}

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface ContactPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;

  correspondenceBadge?: string;
  generalEmail?: string;
  editorialEmail?: string;
  conferencesEmail?: string;
  headquartersAddress?: string;
  supportHours?: string;
  emergencyTitle?: string;
  emergencyNote?: string;
  emergencyText?: string;

  inboundPortalTitle?: string;
  inboundPortalDescription?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  categoryLabel?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  socialLinks?: SocialMediaLink[];
}


export interface Testimonial {
  id: number | string;
  quote: string;
  name: string;
  role: string;
  institution?: string;
  avatarUrl?: string;
  rating?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
  createdAt?: string;
}

export interface MetricCardItem {
  count: string;
  label: string;
  subtext: string;
}

export interface HeroCtaButton {
  id: string;
  label: string;
  targetTab: string;
  targetSubTab?: string;
  variant?: 'primary' | 'secondary' | 'outline' | string;
}

export interface GlobalRegionItem {
  id?: string | number;
  regionName: string;
  countriesList: string;
  hubFocus: string;
}

export interface AboutPillarItem {
  id?: string | number;
  title: string;
  description: string;
}

export interface AboutOrgDivisionItem {
  id?: string | number;
  code: string;
  scope: string;
  name: string;
  description: string;
  lead: string;
}

export interface ExecutiveMember {
  id: string;
  name: string;
  title: string;
  category: 'CEO' | 'CO_FOUNDER' | 'EXECUTIVE_LEADER' | 'BOARD_MEMBER' | string;
  photoUrl?: string;
  summary?: string;
  fullBio?: string;
  organization?: string;
  displayOrder?: number;
}

export interface AboutPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubheadline?: string;
  establishedBadge?: string;
  overviewTitle?: string;
  overviewParagraphs?: string[];
  overviewBadges?: string[];
  pillars?: AboutPillarItem[];
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  goalsBadge?: string;
  goalsTitle?: string;
  goalsSubtitle?: string;
  goalsList?: string[];
  objectivesBadge?: string;
  objectivesTitle?: string;
  objectivesSubtitle?: string;
  objectivesList?: string[];
  governanceBadge?: string;
  governanceTitle?: string;
  governanceSubtitle?: string;
  topGovernanceHeader?: string;
  topGovernanceTitle?: string;
  topGovernanceBody?: string;
  topGovernanceSubtext?: string;
  divisions?: AboutOrgDivisionItem[];
  governanceMembers?: ExecutiveMember[];
  ctaText?: string;
}

export interface ServiceSubTrack {
  id?: string;
  badge?: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  overviewDescription: string;
  detailDescription: string;
  icon?: string;
  anchorId: string;
  subTracks?: ServiceSubTrack[];
  features?: string[];
  featureStyle?: 'checks' | 'pills' | 'cards' | 'grid' | string;
  infoBoxHeader?: string;
  infoBoxText?: string;
  infoBoxTags?: string[];
  footerText?: string;
  ctaText?: string;
  ctaActionType?: 'tab' | 'quote' | 'workshop' | 'viva' | 'contact' | 'custom' | string;
  ctaTarget?: string;
  secondaryCtaText?: string;
  secondaryCtaActionType?: 'tab' | 'viva' | string;
  secondaryCtaTarget?: string;
  displayOrder?: number;
}

export interface ServicesPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  services?: ServiceItem[];
  closingTitle?: string;
  closingDescription?: string;
  closingButtonText?: string;
  closingButtonTarget?: string;
}

export interface WorkshopTopicItem {
  id?: string | number;
  category: string;
  title: string;
  description: string;
}

export interface WorkshopManagementContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  philosophyBadge?: string;
  philosophyTitle?: string;
  philosophyDescription?: string;
  topicsBadge?: string;
  topicsTitle?: string;
  topicsSubtitle?: string;
  topicsList?: WorkshopTopicItem[];
  bespokeTitle?: string;
  bespokeDescription?: string;
  bespokeButtonText?: string;
  credentialingTitle?: string;
  credentialingDescription?: string;
  credentialingButtonText?: string;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  targetTab: string;
  targetSubTab?: string;
  externalUrl?: string;
}

export interface ActiveConferenceItem {
  id: string;
  badge?: string;
  name: string;
  format?: string;
  location?: string;
  submitPaperUrl?: string;
  dates?: string;
  datesSubtitle?: string;
  datesSubtext?: string;
  submissionDeadline?: string;
  deadlineSubtitle?: string;
  submissionDeadlineSubtext?: string;
  notificationDate?: string;
  notificationSubtitle?: string;
  notificationDateSubtext?: string;
  proceedings?: string;
  proceedingsSubtitle?: string;
  proceedingsSubtext?: string;
  themeText?: string;
  theme?: string;
  coOrganizedText?: string;
  visitNowUrl?: string;
  isActive?: boolean;
}

export interface FutureConferenceItem {
  id: string;
  badge?: string;
  title: string;
  description: string;
  highlights?: string[];
  date?: string;
  inquireActionUrl?: string;
  inquireUrl?: string;
}

export interface ConferenceTimelineRow {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  subtitle?: string;
  eventDate: string;
  paperDeadline: string;
  actionName?: string;
  actionText?: string;
  actionUrl?: string;
}

export interface ConferencesPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  activeConferencesTitle?: string;
  activeConferencesSubtitle?: string;
  activeConferences?: ActiveConferenceItem[];
  activeConferencesList?: ActiveConferenceItem[];
  futureConferencesTitle?: string;
  futureConferencesSubtitle?: string;
  futureConferences?: FutureConferenceItem[];
  futureConferencesList?: FutureConferenceItem[];
  timelineBadge?: string;
  timelineTitle?: string;
  timelineSubtitle?: string;
  timelineRows?: ConferenceTimelineRow[];
}

export interface FooterContent {
  logoUrl?: string;
  tagline?: string;
  connectTitle?: string;
  socialLinks?: SocialMediaLink[];
  exploreTitle?: string;
  exploreLinks?: FooterLinkItem[];
  conferencesTitle?: string;
  conferencesLinks?: FooterLinkItem[];
  contactTitle?: string;
  companyName?: string;
  primaryAddress?: string;
  secondaryAddress?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  websiteUrl?: string;
  directInquiryButtonText?: string;
  copyrightText?: string;
  sloganText?: string;
  adminAccessButtonText?: string;
}

export interface SiteContent {
  tagline: string;
  secondaryTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPill?: string;
  heroBadges?: string[];
  heroTitle?: string;
  heroStatement: string;
  heroPrimaryCtaText?: string;
  heroSecondaryCtaText?: string;
  heroCtaButtons?: HeroCtaButton[];
  sinceYear: string;
  connectingMindsHeading: string;
  connectingMindsBody: string;
  connectingMindsPrimaryBtnText?: string;
  connectingMindsPrimaryBtnTarget?: string;
  connectingMindsSecondaryBtnText?: string;
  connectingMindsSecondaryBtnTarget?: string;
  connectingMindsVideoUrl?: string;
  upcomingEventsBadge?: string;
  upcomingEventsTitle?: string;
  upcomingEventsSubtitle?: string;
  upcomingEventsCtaText?: string;
  upcomingEventsCtaLink?: string;
  servicesSectionBadge?: string;
  servicesSectionTitle?: string;
  servicesSectionSubtitle?: string;
  eventsGalleryBadge?: string;
  eventsGalleryTitle?: string;
  eventsGalleryCtaText?: string;
  eventsGalleryCtaLink?: string;
  collaboratorsBadge?: string;
  collaboratorsSubtitle?: string;
  collaboratorsCtaText?: string;
  collaboratorsCtaLink?: string;
  latestNewsBadge?: string;
  latestNewsTitle?: string;
  latestNewsCtaText?: string;
  latestNewsCtaLink?: string;
  testimonialsBadge?: string;
  testimonialsTitle?: string;
  globalReachBadge?: string;
  globalReachTitle?: string;
  globalReachDescription?: string;
  globalReachTagline?: string;
  globalRegions?: GlobalRegionItem[];
  aboutPage?: AboutPageContent;
  servicesPage?: ServicesPageContent;
  workshopManagement?: WorkshopManagementContent;
  coursesPage?: CoursesPageContent;
  mockVivaPage?: MockVivaPageContent;
  ambassadorsPage?: AmbassadorsPageContent;
  researchNetworkPage?: ResearchNetworkPageContent;
  partnersPage?: PartnersPageContent;
  careersPage?: CareersPageContent;
  newsPage?: NewsPageContent;
  contactPage?: ContactPageContent;
  conferencesPage?: ConferencesPageContent;
  footerContent?: FooterContent;
  stats: {
    collaborators: string;
    database: string;
    countries: string;
    events: string;
  };
  metrics?: MetricCardItem[];
  mission: string;
  vision: string;
  goals: string[];
  objectives: string[];
  testimonials: Testimonial[];
}

export interface ContactSettings {
  primaryAddress: string;
  secondaryAddress: string;
  primaryEmail: string;
  secondaryEmail: string;
  phoneNumber: string;
  websiteUrl: string;
  collaborationNote: string;
  mapEmbedUrl: string;
}

export interface InboxMessage {
  id: number | string;
  type?: string;
  name?: string;
  fullName?: string;
  senderName?: string;
  email: string;
  phone?: string;
  category?: string;
  inquiryCategory?: string;
  subject?: string;
  message: string;
  packageSelected?: string;
  metadata?: Record<string, any>;
  status: string;
  adminNotes?: string;
  createdAt?: string;
  timestamp?: string | number;
}

export interface AdminUser {
  id: number | string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
}

export interface CertificateRecord {
  id: string;
  participantName: string;
  workshopTitle: string;
  issueDate: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED' | string;
  institution: string;
}

export interface DatabaseState {
  users: AdminUser[];
  ambassadors: Ambassador[];
  events: EventItem[];
  newsArticles: NewsArticle[];
  partners: Partner[];
  workshops: Workshop[];
  workshopRegistrations?: WorkshopRegistration[];
  workshopAttendances?: WorkshopAttendance[];
  courses: Course[];
  researchMembers: ResearchMember[];
  careers: CareerRole[];
  careerRoles?: CareerRole[];
  siteContent: SiteContent;
  contactSettings: ContactSettings;
  inboxMessages: InboxMessage[];
  inbox?: InboxMessage[];
  certificates: CertificateRecord[];
  emailLogs?: any[];
}
