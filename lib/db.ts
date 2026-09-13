import fs from 'fs';
import path from 'path';
import { initialDatabase } from './seedData';
import { DatabaseState } from './types';
import { isMysqlConfigured, fetchFullDatabaseFromMysql, saveSingleItemToMysql } from './mysql';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ege_database.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Memory cache for quick access
let inMemoryDb: DatabaseState | null = null;
let lastMysqlFetch = 0;

export function invalidateMysqlCache(): void {
  lastMysqlFetch = 0;
}

function normalizeDatabase(db: any): DatabaseState {
  if (!db) return JSON.parse(JSON.stringify(initialDatabase));
  if (!db.inboxMessages) db.inboxMessages = db.inbox || [];
  db.inbox = db.inboxMessages;
  if (!db.careerRoles) db.careerRoles = db.careers || [];
  db.careers = db.careerRoles;
  if (!db.events) db.events = [];
  if (!db.workshops || db.workshops.length === 0) {
    db.workshops = JSON.parse(JSON.stringify(initialDatabase.workshops));
  }
  if (!db.certificates) {
    db.certificates = JSON.parse(JSON.stringify(initialDatabase.certificates || []));
  }
  if (!db.workshopRegistrations) {
    db.workshopRegistrations = JSON.parse(JSON.stringify(initialDatabase.workshopRegistrations || []));
  }
  if (!db.workshopAttendances) {
    db.workshopAttendances = [];
  }
  if (!db.siteContent) {
    db.siteContent = JSON.parse(JSON.stringify(initialDatabase.siteContent));
  } else {
    if (!db.siteContent.servicesPage) {
      db.siteContent.servicesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.servicesPage));
    }
    if (!db.siteContent.aboutPage) {
      db.siteContent.aboutPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.aboutPage));
    }
    if (db.siteContent.aboutPage && !db.siteContent.aboutPage.governanceMembers) {
      db.siteContent.aboutPage.governanceMembers = JSON.parse(JSON.stringify(initialDatabase.siteContent?.aboutPage?.governanceMembers || []));
    }
    if (!db.siteContent.workshopManagement) {
      db.siteContent.workshopManagement = JSON.parse(JSON.stringify(initialDatabase.siteContent.workshopManagement));
    }
    if (!db.siteContent.coursesPage) {
      db.siteContent.coursesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.coursesPage));
    }
    if (!db.siteContent.mockVivaPage) {
      db.siteContent.mockVivaPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.mockVivaPage));
    }
    if (!db.siteContent.ambassadorsPage) {
      db.siteContent.ambassadorsPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.ambassadorsPage));
    }
    if (!db.siteContent.researchNetworkPage) {
      db.siteContent.researchNetworkPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.researchNetworkPage));
    }
    if (!db.siteContent.partnersPage) {
      db.siteContent.partnersPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.partnersPage));
    }
    if (!db.siteContent.careersPage) {
      db.siteContent.careersPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.careersPage));
    }
    if (!db.siteContent.newsPage) {
      db.siteContent.newsPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.newsPage));
    }
    if (!db.siteContent.contactPage) {
      db.siteContent.contactPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.contactPage));
    }
    if (!db.siteContent.conferencesPage) {
      db.siteContent.conferencesPage = JSON.parse(JSON.stringify(initialDatabase.siteContent.conferencesPage));
    }
  }
  return db as DatabaseState;
}

export function getDatabase(): DatabaseState {
  if (inMemoryDb) {
    return normalizeDatabase(inMemoryDb);
  }

  ensureDataDir();

  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      inMemoryDb = normalizeDatabase(JSON.parse(fileData));
      return inMemoryDb!;
    }
  } catch (error) {
    console.error('Error reading database file, using seed data:', error);
  }

  // Initialize with seed data
  inMemoryDb = normalizeDatabase(JSON.parse(JSON.stringify(initialDatabase)));
  saveDatabase(inMemoryDb!);
  return inMemoryDb!;
}

export async function getDatabaseAsync(): Promise<DatabaseState> {
  if (isMysqlConfigured() && Date.now() - lastMysqlFetch > 15000) {
    const mysqlDb = await fetchFullDatabaseFromMysql();
    if (mysqlDb) {
      inMemoryDb = normalizeDatabase(mysqlDb);
      lastMysqlFetch = Date.now();
      saveDatabaseToDisk(inMemoryDb);
      return inMemoryDb;
    }
  }
  return getDatabase();
}

function saveDatabaseToDisk(data: DatabaseState): void {
  ensureDataDir();
  inMemoryDb = data;
  setImmediate(() => {
    try {
      fs.writeFile(DB_FILE, JSON.stringify(data), 'utf-8', () => {});
    } catch (error) {
      console.error('Failed to write database to disk:', error);
    }
  });
}

export function saveDatabase(data: DatabaseState): void {
  saveDatabaseToDisk(data);
}

export async function saveDatabaseAsync(data: DatabaseState): Promise<void> {
  saveDatabaseToDisk(data);
}

export function resetDatabase(): DatabaseState {
  inMemoryDb = JSON.parse(JSON.stringify(initialDatabase));
  saveDatabase(inMemoryDb!);
  return inMemoryDb!;
}
