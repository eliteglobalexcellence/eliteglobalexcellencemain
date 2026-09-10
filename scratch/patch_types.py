with open(r'c:\xampp\htdocs\elitemainwebsite\lib\types.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''export interface CareerRole {
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
  heroDescription?: string;

  frameworksBadge?: string;
  frameworksTitle?: string;
  frameworksSubtitle?: string;
  frameworksList?: PartnershipFrameworkItem[];

  callBadge?: string;
  callTitle?: string;
  callDescription?: string;
  callCtaText?: string;
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
  heroDescription?: string;

  pillarsBadge?: string;
  pillarsTitle?: string;
  pillarsList?: CultureValueItem[];

  spontaneousTitle?: string;
  spontaneousDescription?: string;
  spontaneousFormLink?: string;

  positionsTitle?: string;
  noPositionsText?: string;
  positionsList?: CareerRole[];
}

export interface NewsPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;

  mediaBoxTitle?: string;
  mediaBoxDescription?: string;
  mediaBoxCtaText?: string;
  articlesList?: NewsArticle[];
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
  heroDescription?: string;

  correspondenceBadge?: string;
  generalEmail?: string;
  editorialEmail?: string;
  conferencesEmail?: string;
  headquartersAddress?: string;
  supportHours?: string;
  emergencyTitle?: string;
  emergencyNote?: string;

  inboundPortalTitle?: string;
  inboundPortalDescription?: string;
  socialLinks?: SocialMediaLink[];
}'''

replacement = '''export interface CareerRole {
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
  socialLinks?: SocialMediaLink[];
}

export interface InboxMessage {
  id: string;
  fullName?: string;
  senderName?: string;
  email: string;
  phone?: string;
  category?: string;
  inquiryCategory?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'NEW' | 'READ' | string;
}'''

if target in content:
    content = content.replace(target, replacement)
    with open(r'c:\xampp\htdocs\elitemainwebsite\lib\types.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully patched lib/types.ts")
else:
    print("Failed to find target block in lib/types.ts")
