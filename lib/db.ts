import fs from 'fs';
import path from 'path';
import { initialDatabase } from './seedData';
import { DatabaseState } from './types';
import { fetchFullDatabaseFromMysql } from './mysql';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ege_database.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {}
}

// Memory cache for quick access
let inMemoryDb: DatabaseState | null = null;
let lastMysqlFetch = 0;

export function invalidateMysqlCache(): void {
  lastMysqlFetch = 0;
}

function normalizeDatabase(db: any): DatabaseState {
  if (!db) return JSON.parse(JSON.stringify(initialDatabase));

  // Preserve existing arrays (even if empty) to honor admin deletions
  if (!Array.isArray(db.users)) db.users = [];
  if (!Array.isArray(db.ambassadors)) db.ambassadors = [];
  if (!Array.isArray(db.events)) db.events = [];
  if (!Array.isArray(db.newsArticles)) db.newsArticles = [];
  if (!Array.isArray(db.partners)) db.partners = [];
  if (!Array.isArray(db.workshops)) db.workshops = [];
  if (!Array.isArray(db.workshopRegistrations)) db.workshopRegistrations = [];
  if (!Array.isArray(db.workshopAttendances)) db.workshopAttendances = [];
  if (!Array.isArray(db.courses)) db.courses = [];
  if (!Array.isArray(db.researchMembers)) db.researchMembers = [];
  if (!Array.isArray(db.careers)) db.careers = db.careerRoles || [];
  db.careerRoles = db.careers;
  if (!Array.isArray(db.inboxMessages)) db.inboxMessages = db.inbox || [];
  db.inbox = db.inboxMessages;
  if (!Array.isArray(db.certificates)) db.certificates = [];

  if (!db.siteContent) {
    db.siteContent = JSON.parse(JSON.stringify(initialDatabase.siteContent));
  } else {
    if (!db.siteContent.servicesPage) db.siteContent.servicesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.servicesPage));
    if (!db.siteContent.aboutPage) db.siteContent.aboutPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.aboutPage));
    if (db.siteContent.aboutPage && !db.siteContent.aboutPage.governanceMembers) {
      db.siteContent.aboutPage.governanceMembers = JSON.parse(JSON.stringify(initialDatabase.siteContent?.aboutPage?.governanceMembers || []));
    }
    if (!db.siteContent.workshopManagement) db.siteContent.workshopManagement = JSON.parse(JSON.stringify(initialDatabase.siteContent.workshopManagement));
    if (!db.siteContent.coursesPage) db.siteContent.coursesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.coursesPage));
    if (!db.siteContent.mockVivaPage) db.siteContent.mockVivaPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.mockVivaPage));
    if (!db.siteContent.ambassadorsPage) db.siteContent.ambassadorsPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.ambassadorsPage));
    if (!db.siteContent.researchNetworkPage) db.siteContent.researchNetworkPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.researchNetworkPage));
    if (!db.siteContent.partnersPage) db.siteContent.partnersPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.partnersPage));
    if (!db.siteContent.careersPage) db.siteContent.careersPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.careersPage));
    if (!db.siteContent.newsPage) db.siteContent.newsPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.newsPage));
    if (!db.siteContent.contactPage) db.siteContent.contactPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.contactPage));
    if (!db.siteContent.conferencesPage) db.siteContent.conferencesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.conferencesPage));
  }
  return db as DatabaseState;
}

function loadDiskFallback(): DatabaseState | null {
  ensureDataDir();
  try {
    if (fs.existsSync(DB_FILE)) {
      const dataStr = fs.readFileSync(DB_FILE, 'utf-8');
      if (dataStr && dataStr.trim().length > 0) {
        return normalizeDatabase(JSON.parse(dataStr));
      }
    }
  } catch (e) {}
  return null;
}

function saveDiskFallback(data: DatabaseState): void {
  ensureDataDir();
  setImmediate(() => {
    try {
      fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8', () => {});
    } catch (e) {}
  });
}

export function getDatabase(): DatabaseState {
  if (inMemoryDb) {
    return normalizeDatabase(inMemoryDb);
  }

  const diskData = loadDiskFallback();
  if (diskData) {
    inMemoryDb = diskData;
    return inMemoryDb;
  }

  // Initial cold start seed
  inMemoryDb = normalizeDatabase(JSON.parse(JSON.stringify(initialDatabase)));
  saveDiskFallback(inMemoryDb);
  return inMemoryDb;
}

export async function getDatabaseAsync(): Promise<DatabaseState> {
  if (inMemoryDb && Date.now() - lastMysqlFetch < 2000) {
    return inMemoryDb;
  }

  const mysqlDb = await fetchFullDatabaseFromMysql();
  if (mysqlDb) {
    inMemoryDb = normalizeDatabase(mysqlDb);
    lastMysqlFetch = Date.now();
    saveDiskFallback(inMemoryDb);
    return inMemoryDb;
  }

  return getDatabase();
}

export function saveDatabase(data: DatabaseState): void {
  inMemoryDb = normalizeDatabase(data);
  saveDiskFallback(inMemoryDb);
}

export async function saveDatabaseAsync(data: DatabaseState): Promise<void> {
  saveDatabase(data);
}

export function resetDatabase(): DatabaseState {
  inMemoryDb = normalizeDatabase(JSON.parse(JSON.stringify(initialDatabase)));
  saveDiskFallback(inMemoryDb!);
  return inMemoryDb!;
}
