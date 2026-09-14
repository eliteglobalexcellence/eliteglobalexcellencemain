import { initialDatabase } from './seedData';
import { DatabaseState } from './types';
import { fetchFullDatabaseFromMysql } from './mysql';

// Memory cache for quick access
let inMemoryDb: DatabaseState | null = null;
let lastMysqlFetch = 0;

export function invalidateMysqlCache(): void {
  lastMysqlFetch = 0;
  inMemoryDb = null;
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
  return normalizeDatabase(JSON.parse(JSON.stringify(initialDatabase)));
}

export async function getDatabaseAsync(): Promise<DatabaseState> {
  // Short 2s cache to optimize parallel route rendering while keeping data 100% live from MySQL
  if (inMemoryDb && Date.now() - lastMysqlFetch < 2000) {
    return inMemoryDb;
  }

  const mysqlDb = await fetchFullDatabaseFromMysql();
  if (mysqlDb) {
    inMemoryDb = normalizeDatabase(mysqlDb);
    lastMysqlFetch = Date.now();
    return inMemoryDb;
  }

  return getDatabase();
}

export function saveDatabase(data: DatabaseState): void {
  inMemoryDb = normalizeDatabase(data);
  lastMysqlFetch = 0;
}

export async function saveDatabaseAsync(data: DatabaseState): Promise<void> {
  saveDatabase(data);
}

export function resetDatabase(): DatabaseState {
  inMemoryDb = JSON.parse(JSON.stringify(initialDatabase));
  lastMysqlFetch = 0;
  return inMemoryDb!;
}
