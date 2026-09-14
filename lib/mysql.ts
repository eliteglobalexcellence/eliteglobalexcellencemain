import mysql from 'mysql2/promise';
import { DatabaseState } from './types';
import { initialDatabase } from './seedData';

let pool: mysql.Pool | null = null;
let tablesInitialized = false;
let isInitializingTables = false;

export function isMysqlConfigured(): boolean {
  const hasUrl = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
  const hasHost = Boolean(
    (process.env.MYSQL_HOST && process.env.MYSQL_HOST.trim().length > 0) ||
    (process.env.DB_HOST && process.env.DB_HOST.trim().length > 0)
  );

  return hasUrl || hasHost;
}

export function disableMysqlTemporarily(): void {
  // No-op: MySQL mode is strictly enforced
}

export function getMysqlPool(): mysql.Pool {
  if (pool) return pool;

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.trim().length > 0) {
    pool = mysql.createPool(dbUrl);
    return pool;
  }

  const host = process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || '3306', 10);
  const user = process.env.MYSQL_USER || process.env.DB_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'ege_database';

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 3000,
  });

  return pool;
}

export async function initMysqlTables(): Promise<boolean> {
  if (tablesInitialized) return true;
  if (isInitializingTables) return true;

  isInitializingTables = true;
  try {
    const p = getMysqlPool();

    // 1. Users Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'ADMIN',
        status VARCHAR(50) DEFAULT 'ACTIVE',
        lastLogin VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Ambassadors Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS ambassadors (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        country VARCHAR(100),
        photoUrl TEXT,
        bio LONGTEXT,
        researchInterests JSON,
        collaborationHighlights LONGTEXT,
        displayOrder INT DEFAULT 0,
        isActive BOOLEAN DEFAULT TRUE,
        linkedinUrl TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Events Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description LONGTEXT,
        date VARCHAR(100),
        locationMode VARCHAR(100),
        category VARCHAR(100),
        imageUrl TEXT,
        status VARCHAR(50) DEFAULT 'UPCOMING',
        registrationLink TEXT,
        displayOrder INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. News Articles Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt LONGTEXT,
        content LONGTEXT,
        category VARCHAR(100),
        author VARCHAR(255),
        publishedBy VARCHAR(255),
        publishDate VARCHAR(100),
        isPublished BOOLEAN DEFAULT TRUE,
        viewsCount INT DEFAULT 0,
        readsCount VARCHAR(50),
        imageUrl TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Partners Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        partnershipType VARCHAR(100),
        logoUrl TEXT,
        imageUrl TEXT,
        description LONGTEXT,
        websiteUrl TEXT,
        country VARCHAR(100),
        displayOrder INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 6. Workshops Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS workshops (
        id VARCHAR(100) PRIMARY KEY,
        workshopId VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        dateString VARCHAR(100),
        date VARCHAR(100),
        time VARCHAR(100),
        mode VARCHAR(100),
        venue VARCHAR(255),
        fee VARCHAR(100),
        isFree BOOLEAN DEFAULT TRUE,
        status VARCHAR(50) DEFAULT 'UPCOMING',
        description LONGTEXT,
        speakerName VARCHAR(255),
        speakerAffiliation VARCHAR(255),
        registrationLink TEXT,
        imageUrl TEXT,
        whatsappLink TEXT,
        whatsappQrUrl TEXT,
        objectives JSON,
        attendanceOpen BOOLEAN DEFAULT TRUE,
        materialsAvailable BOOLEAN DEFAULT TRUE,
        displayOrder INT DEFAULT 0,
        category VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 7. Workshop Registrations Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS workshop_registrations (
        id VARCHAR(100) PRIMARY KEY,
        workshopId VARCHAR(100) NOT NULL,
        registrationId VARCHAR(100) NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        role VARCHAR(100),
        institute VARCHAR(255),
        department VARCHAR(255),
        levelOfStudy VARCHAR(100),
        country VARCHAR(100),
        isKeynoteSpeaker VARCHAR(100),
        attended BOOLEAN DEFAULT FALSE,
        certId VARCHAR(100),
        registeredAt VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 8. Workshop Attendances Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS workshop_attendances (
        id VARCHAR(100) PRIMARY KEY,
        workshopId VARCHAR(100) NOT NULL,
        certId VARCHAR(100) NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        satisfied VARCHAR(255),
        learned VARCHAR(255),
        feedback LONGTEXT,
        submittedAt VARCHAR(100),
        certIssued BOOLEAN DEFAULT FALSE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 9. Courses Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(100) PRIMARY KEY,
        code VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        tagline VARCHAR(255),
        duration VARCHAR(100),
        mode VARCHAR(100),
        level VARCHAR(100),
        type VARCHAR(50),
        description LONGTEXT,
        objective LONGTEXT,
        outline JSON,
        modules JSON,
        benefits JSON,
        price DECIMAL(10,2) DEFAULT 0,
        registrationOpen BOOLEAN DEFAULT TRUE,
        imageUrl TEXT,
        outlinePdfUrl TEXT,
        googleFormLink TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 10. Research Members Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS research_members (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        affiliation VARCHAR(255),
        country VARCHAR(100),
        photoUrl TEXT,
        researchArea LONGTEXT,
        email VARCHAR(255),
        displayOrder INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 11. Careers Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        location VARCHAR(100),
        type VARCHAR(50),
        description LONGTEXT,
        requirements JSON,
        status VARCHAR(50) DEFAULT 'OPEN',
        displayOrder INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 12. Inbox Messages Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS inbox_messages (
        id VARCHAR(100) PRIMARY KEY,
        type VARCHAR(100),
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        category VARCHAR(100),
        subject VARCHAR(255),
        message LONGTEXT,
        packageSelected VARCHAR(255),
        metadata JSON,
        status VARCHAR(50) DEFAULT 'UNREAD',
        adminNotes LONGTEXT,
        createdAt VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 13. Certificates Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id VARCHAR(100) PRIMARY KEY,
        participantName VARCHAR(255) NOT NULL,
        workshopTitle VARCHAR(255) NOT NULL,
        issueDate VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'VALID',
        institution VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 14. Site Content Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id VARCHAR(100) PRIMARY KEY,
        contentData LONGTEXT NOT NULL,
        updatedAt VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 15. Contact Settings Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS contact_settings (
        id VARCHAR(100) PRIMARY KEY,
        settingsData LONGTEXT NOT NULL,
        updatedAt VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    tablesInitialized = true;
    await autoSeedMysqlIfEmpty(p);

    return true;
  } catch (error: any) {
    if (error?.code === 'ECONNREFUSED' || error?.message?.includes('ECONNREFUSED')) {
      console.warn('[MySQL] Cannot connect to MySQL on localhost:3306 (ECONNREFUSED). Please ensure MySQL is started in XAMPP Control Panel.');
    } else {
      console.error('[MySQL] Failed to initialize MySQL tables:', error?.message || error);
    }
    return false;
  } finally {
    isInitializingTables = false;
  }
}

async function autoSeedMysqlIfEmpty(p: mysql.Pool): Promise<void> {
  try {
    const [rows]: any = await p.query('SELECT COUNT(*) as cnt FROM workshops');
    const count = Array.isArray(rows) && rows[0] ? Number(rows[0].cnt) : 0;
    if (count > 0) return;

    console.log('[MySQL] Empty database detected. Auto-seeding database from initialDatabase...');

    if (Array.isArray(initialDatabase.users)) {
      for (const item of initialDatabase.users) {
        await saveSingleItemToMysql('users', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.ambassadors)) {
      for (const item of initialDatabase.ambassadors) {
        await saveSingleItemToMysql('ambassadors', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.events)) {
      for (const item of initialDatabase.events) {
        await saveSingleItemToMysql('events', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.newsArticles)) {
      for (const item of initialDatabase.newsArticles) {
        await saveSingleItemToMysql('newsArticles', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.partners)) {
      for (const item of initialDatabase.partners) {
        await saveSingleItemToMysql('partners', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.workshops)) {
      for (const item of initialDatabase.workshops) {
        await saveSingleItemToMysql('workshops', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.workshopRegistrations)) {
      for (const item of initialDatabase.workshopRegistrations) {
        await saveSingleItemToMysql('workshopRegistrations', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.workshopAttendances)) {
      for (const item of initialDatabase.workshopAttendances) {
        await saveSingleItemToMysql('workshopAttendances', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.courses)) {
      for (const item of initialDatabase.courses) {
        await saveSingleItemToMysql('courses', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.researchMembers)) {
      for (const item of initialDatabase.researchMembers) {
        await saveSingleItemToMysql('researchMembers', 'CREATE', item);
      }
    }
    const careersList = initialDatabase.careers || initialDatabase.careerRoles || [];
    if (Array.isArray(careersList)) {
      for (const item of careersList) {
        await saveSingleItemToMysql('careers', 'CREATE', item);
      }
    }
    const inboxList = initialDatabase.inboxMessages || initialDatabase.inbox || [];
    if (Array.isArray(inboxList)) {
      for (const item of inboxList) {
        await saveSingleItemToMysql('inboxMessages', 'CREATE', item);
      }
    }
    if (Array.isArray(initialDatabase.certificates)) {
      for (const item of initialDatabase.certificates) {
        await saveSingleItemToMysql('certificates', 'CREATE', item);
      }
    }
    if (initialDatabase.siteContent) {
      await saveSingleItemToMysql('siteContent', 'CREATE', initialDatabase.siteContent);
    }
    if (initialDatabase.contactSettings) {
      await saveSingleItemToMysql('contactSettings', 'CREATE', initialDatabase.contactSettings);
    }

    console.log('[MySQL] Auto-seeding completed successfully.');
  } catch (err) {
    console.error('[MySQL] Auto-seeding error:', err);
  }
}

export async function fetchFullDatabaseFromMysql(): Promise<DatabaseState | null> {
  try {
    const initialized = await initMysqlTables();
    if (!initialized) return null;

    const p = getMysqlPool();

    // Helper to select all rows
    const queryAll = async (table: string): Promise<any[]> => {
      const [rows] = await p.query(`SELECT * FROM ${table}`);
      return Array.isArray(rows) ? rows : [];
    };

    const users = await queryAll('users');
    const ambassadors = (await queryAll('ambassadors')).map(a => ({
      ...a,
      researchInterests: typeof a.researchInterests === 'string' ? JSON.parse(a.researchInterests) : (a.researchInterests || []),
      isActive: Boolean(a.isActive),
    }));
    const events = await queryAll('events');
    const newsArticles = (await queryAll('news_articles')).map(n => ({
      ...n,
      isPublished: Boolean(n.isPublished),
    }));
    const partners = await queryAll('partners');
    const workshops = (await queryAll('workshops')).map(w => ({
      ...w,
      objectives: typeof w.objectives === 'string' ? JSON.parse(w.objectives) : (w.objectives || []),
      isFree: Boolean(w.isFree),
      attendanceOpen: Boolean(w.attendanceOpen),
      materialsAvailable: Boolean(w.materialsAvailable),
    }));
    const workshopRegistrations = (await queryAll('workshop_registrations')).map(r => ({
      ...r,
      attended: Boolean(r.attended),
    }));
    const workshopAttendances = (await queryAll('workshop_attendances')).map(a => ({
      ...a,
      certIssued: Boolean(a.certIssued),
    }));
    const courses = (await queryAll('courses')).map(c => ({
      ...c,
      outline: typeof c.outline === 'string' ? JSON.parse(c.outline) : (c.outline || []),
      modules: typeof c.modules === 'string' ? JSON.parse(c.modules) : (c.modules || []),
      benefits: typeof c.benefits === 'string' ? JSON.parse(c.benefits) : (c.benefits || []),
      registrationOpen: Boolean(c.registrationOpen),
      price: Number(c.price || 0),
    }));
    const researchMembers = await queryAll('research_members');
    const careers = (await queryAll('careers')).map(cr => ({
      ...cr,
      requirements: typeof cr.requirements === 'string' ? JSON.parse(cr.requirements) : (cr.requirements || []),
    }));
    const inboxMessages = (await queryAll('inbox_messages')).map(m => ({
      ...m,
      metadata: typeof m.metadata === 'string' ? JSON.parse(m.metadata) : (m.metadata || {}),
    }));
    const certificates = await queryAll('certificates');

    // Site Content & Contact Settings singletons
    const [scRows]: any = await p.query(`SELECT contentData FROM site_content WHERE id = 'main' LIMIT 1`);
    let siteContent = initialDatabase.siteContent;
    if (Array.isArray(scRows) && scRows.length > 0 && scRows[0].contentData) {
      try {
        siteContent = JSON.parse(scRows[0].contentData);
      } catch (e) {}
    }

    const [csRows]: any = await p.query(`SELECT settingsData FROM contact_settings WHERE id = 'main' LIMIT 1`);
    let contactSettings = initialDatabase.contactSettings;
    if (Array.isArray(csRows) && csRows.length > 0 && csRows[0].settingsData) {
      try {
        contactSettings = JSON.parse(csRows[0].settingsData);
      } catch (e) {}
    }

    return {
      users,
      ambassadors,
      events,
      newsArticles,
      partners,
      workshops,
      workshopRegistrations,
      workshopAttendances,
      courses,
      researchMembers,
      careers,
      careerRoles: careers,
      siteContent,
      contactSettings,
      inboxMessages,
      inbox: inboxMessages,
      certificates,
    };
  } catch (error) {
    console.error('Failed to fetch full database from MySQL:', error);
    return null;
  }
}

export async function saveSingleItemToMysql(entity: string, action: 'CREATE' | 'UPDATE' | 'DELETE', payload: any): Promise<boolean> {
  try {
    await initMysqlTables();
    const p = getMysqlPool();
    const id = String(payload.id || payload.certificate_id || Date.now());

    if (action === 'DELETE') {
      if (entity === 'users') await p.query(`DELETE FROM users WHERE id = ?`, [id]);
      else if (entity === 'ambassadors') await p.query(`DELETE FROM ambassadors WHERE id = ?`, [id]);
      else if (entity === 'events') await p.query(`DELETE FROM events WHERE id = ?`, [id]);
      else if (entity === 'newsArticles' || entity === 'news') await p.query(`DELETE FROM news_articles WHERE id = ?`, [id]);
      else if (entity === 'partners') await p.query(`DELETE FROM partners WHERE id = ?`, [id]);
      else if (entity === 'workshops') await p.query(`DELETE FROM workshops WHERE id = ?`, [id]);
      else if (entity === 'workshopRegistrations') await p.query(`DELETE FROM workshop_registrations WHERE id = ?`, [id]);
      else if (entity === 'workshopAttendances') await p.query(`DELETE FROM workshop_attendances WHERE id = ?`, [id]);
      else if (entity === 'courses') await p.query(`DELETE FROM courses WHERE id = ?`, [id]);
      else if (entity === 'researchMembers') await p.query(`DELETE FROM research_members WHERE id = ?`, [id]);
      else if (entity === 'careerRoles' || entity === 'careers') await p.query(`DELETE FROM careers WHERE id = ?`, [id]);
      else if (entity === 'inbox' || entity === 'inboxMessages') await p.query(`DELETE FROM inbox_messages WHERE id = ?`, [id]);
      else if (entity === 'certificates') await p.query(`DELETE FROM certificates WHERE id = ?`, [id]);
      return true;
    }

    if (entity === 'siteContent') {
      const dataStr = JSON.stringify(payload);
      await p.query(
        `INSERT INTO site_content (id, contentData, updatedAt) VALUES ('main', ?, ?)
         ON DUPLICATE KEY UPDATE contentData = VALUES(contentData), updatedAt = VALUES(updatedAt)`,
        [dataStr, new Date().toISOString()]
      );
      return true;
    }

    if (entity === 'contactSettings') {
      const dataStr = JSON.stringify(payload);
      await p.query(
        `INSERT INTO contact_settings (id, settingsData, updatedAt) VALUES ('main', ?, ?)
         ON DUPLICATE KEY UPDATE settingsData = VALUES(settingsData), updatedAt = VALUES(updatedAt)`,
        [dataStr, new Date().toISOString()]
      );
      return true;
    }

    if (entity === 'users') {
      await p.query(
        `INSERT INTO users (id, name, email, role, status, lastLogin) VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), role=VALUES(role), status=VALUES(status), lastLogin=VALUES(lastLogin)`,
        [id, payload.name || '', payload.email || '', payload.role || 'ADMIN', payload.status || 'ACTIVE', payload.lastLogin || '']
      );
    } else if (entity === 'ambassadors') {
      await p.query(
        `INSERT INTO ambassadors (id, name, title, country, photoUrl, bio, researchInterests, collaborationHighlights, displayOrder, isActive, linkedinUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), title=VALUES(title), country=VALUES(country), photoUrl=VALUES(photoUrl), bio=VALUES(bio), researchInterests=VALUES(researchInterests), collaborationHighlights=VALUES(collaborationHighlights), displayOrder=VALUES(displayOrder), isActive=VALUES(isActive), linkedinUrl=VALUES(linkedinUrl)`,
        [
          id, payload.name || '', payload.title || '', payload.country || '', payload.photoUrl || payload.imageUrl || '',
          payload.bio || '', JSON.stringify(payload.researchInterests || []), payload.collaborationHighlights || '',
          payload.displayOrder || 0, payload.isActive !== false ? 1 : 0, payload.linkedinUrl || payload.linkedin || ''
        ]
      );
    } else if (entity === 'events') {
      await p.query(
        `INSERT INTO events (id, title, description, date, locationMode, category, imageUrl, status, registrationLink, displayOrder)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), date=VALUES(date), locationMode=VALUES(locationMode), category=VALUES(category), imageUrl=VALUES(imageUrl), status=VALUES(status), registrationLink=VALUES(registrationLink), displayOrder=VALUES(displayOrder)`,
        [id, payload.title || '', payload.description || '', payload.date || '', payload.locationMode || '', payload.category || '', payload.imageUrl || '', payload.status || 'UPCOMING', payload.registrationLink || '', payload.displayOrder || 0]
      );
    } else if (entity === 'newsArticles' || entity === 'news') {
      await p.query(
        `INSERT INTO news_articles (id, title, excerpt, content, category, author, publishedBy, publishDate, isPublished, viewsCount, readsCount, imageUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content), category=VALUES(category), author=VALUES(author), publishedBy=VALUES(publishedBy), publishDate=VALUES(publishDate), isPublished=VALUES(isPublished), viewsCount=VALUES(viewsCount), readsCount=VALUES(readsCount), imageUrl=VALUES(imageUrl)`,
        [id, payload.title || '', payload.excerpt || '', payload.content || '', payload.category || '', payload.author || '', payload.publishedBy || '', payload.publishDate || payload.date || '', payload.isPublished !== false ? 1 : 0, payload.viewsCount || 0, payload.readsCount || '', payload.imageUrl || '']
      );
    } else if (entity === 'partners') {
      await p.query(
        `INSERT INTO partners (id, name, category, partnershipType, logoUrl, imageUrl, description, websiteUrl, country, displayOrder)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), category=VALUES(category), partnershipType=VALUES(partnershipType), logoUrl=VALUES(logoUrl), imageUrl=VALUES(imageUrl), description=VALUES(description), websiteUrl=VALUES(websiteUrl), country=VALUES(country), displayOrder=VALUES(displayOrder)`,
        [id, payload.name || '', payload.category || '', payload.partnershipType || '', payload.logoUrl || '', payload.imageUrl || '', payload.description || '', payload.websiteUrl || '', payload.country || '', payload.displayOrder || 0]
      );
    } else if (entity === 'workshops') {
      await p.query(
        `INSERT INTO workshops (id, workshopId, title, dateString, date, time, mode, venue, fee, isFree, status, description, speakerName, speakerAffiliation, registrationLink, imageUrl, whatsappLink, whatsappQrUrl, objectives, attendanceOpen, materialsAvailable, displayOrder, category)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE workshopId=VALUES(workshopId), title=VALUES(title), dateString=VALUES(dateString), date=VALUES(date), time=VALUES(time), mode=VALUES(mode), venue=VALUES(venue), fee=VALUES(fee), isFree=VALUES(isFree), status=VALUES(status), description=VALUES(description), speakerName=VALUES(speakerName), speakerAffiliation=VALUES(speakerAffiliation), registrationLink=VALUES(registrationLink), imageUrl=VALUES(imageUrl), whatsappLink=VALUES(whatsappLink), whatsappQrUrl=VALUES(whatsappQrUrl), objectives=VALUES(objectives), attendanceOpen=VALUES(attendanceOpen), materialsAvailable=VALUES(materialsAvailable), displayOrder=VALUES(displayOrder), category=VALUES(category)`,
        [
          id, payload.workshopId || `EGEW${id}`, payload.title || '', payload.dateString || payload.date || '', payload.date || '', payload.time || '', payload.mode || '', payload.venue || '', payload.fee || '', payload.isFree !== false ? 1 : 0, payload.status || 'UPCOMING', payload.description || '', payload.speakerName || payload.speaker || '', payload.speakerAffiliation || '', payload.registrationLink || '', payload.imageUrl || '', payload.whatsappLink || '', payload.whatsappQrUrl || '', JSON.stringify(payload.objectives || []), payload.attendanceOpen !== false ? 1 : 0, payload.materialsAvailable !== false ? 1 : 0, payload.displayOrder || 0, payload.category || ''
        ]
      );
    } else if (entity === 'workshopRegistrations') {
      await p.query(
        `INSERT INTO workshop_registrations (id, workshopId, registrationId, fullName, email, phone, role, institute, department, levelOfStudy, country, isKeynoteSpeaker, attended, certId, registeredAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE workshopId=VALUES(workshopId), registrationId=VALUES(registrationId), fullName=VALUES(fullName), email=VALUES(email), phone=VALUES(phone), role=VALUES(role), institute=VALUES(institute), department=VALUES(department), levelOfStudy=VALUES(levelOfStudy), country=VALUES(country), isKeynoteSpeaker=VALUES(isKeynoteSpeaker), attended=VALUES(attended), certId=VALUES(certId), registeredAt=VALUES(registeredAt)`,
        [id, payload.workshopId || '', payload.registrationId || '', payload.fullName || '', payload.email || '', payload.phone || '', payload.role || '', payload.institute || '', payload.department || '', payload.levelOfStudy || '', payload.country || '', payload.isKeynoteSpeaker || 'No', payload.attended ? 1 : 0, payload.certId || '', payload.registeredAt || '']
      );
    } else if (entity === 'workshopAttendances') {
      await p.query(
        `INSERT INTO workshop_attendances (id, workshopId, certId, fullName, email, satisfied, learned, feedback, submittedAt, certIssued)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE workshopId=VALUES(workshopId), certId=VALUES(certId), fullName=VALUES(fullName), email=VALUES(email), satisfied=VALUES(satisfied), learned=VALUES(learned), feedback=VALUES(feedback), submittedAt=VALUES(submittedAt), certIssued=VALUES(certIssued)`,
        [id, payload.workshopId || '', payload.certId || '', payload.fullName || '', payload.email || '', payload.satisfied || '', payload.learned || '', payload.feedback || '', payload.submittedAt || '', payload.certIssued ? 1 : 0]
      );
    } else if (entity === 'courses') {
      await p.query(
        `INSERT INTO courses (id, code, title, category, tagline, duration, mode, level, type, description, objective, outline, modules, benefits, price, registrationOpen, imageUrl, outlinePdfUrl, googleFormLink)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE code=VALUES(code), title=VALUES(title), category=VALUES(category), tagline=VALUES(tagline), duration=VALUES(duration), mode=VALUES(mode), level=VALUES(level), type=VALUES(type), description=VALUES(description), objective=VALUES(objective), outline=VALUES(outline), modules=VALUES(modules), benefits=VALUES(benefits), price=VALUES(price), registrationOpen=VALUES(registrationOpen), imageUrl=VALUES(imageUrl), outlinePdfUrl=VALUES(outlinePdfUrl), googleFormLink=VALUES(googleFormLink)`,
        [id, payload.code || '', payload.title || '', payload.category || '', payload.tagline || '', payload.duration || '', payload.mode || '', payload.level || '', payload.type || 'UPCOMING', payload.description || '', payload.objective || '', JSON.stringify(payload.outline || []), JSON.stringify(payload.modules || []), JSON.stringify(payload.benefits || []), Number(payload.price || 0), payload.registrationOpen !== false ? 1 : 0, payload.imageUrl || '', payload.outlinePdfUrl || '', payload.googleFormLink || '']
      );
    } else if (entity === 'researchMembers') {
      await p.query(
        `INSERT INTO research_members (id, name, role, affiliation, country, photoUrl, researchArea, email, displayOrder)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), affiliation=VALUES(affiliation), country=VALUES(country), photoUrl=VALUES(photoUrl), researchArea=VALUES(researchArea), email=VALUES(email), displayOrder=VALUES(displayOrder)`,
        [id, payload.name || '', payload.role || '', payload.affiliation || '', payload.country || '', payload.photoUrl || '', payload.researchArea || '', payload.email || '', payload.displayOrder || 0]
      );
    } else if (entity === 'careerRoles' || entity === 'careers') {
      await p.query(
        `INSERT INTO careers (id, title, department, location, type, description, requirements, status, displayOrder)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), department=VALUES(department), location=VALUES(location), type=VALUES(type), description=VALUES(description), requirements=VALUES(requirements), status=VALUES(status), displayOrder=VALUES(displayOrder)`,
        [id, payload.title || '', payload.department || '', payload.location || '', payload.type || 'FULL_TIME', payload.description || '', JSON.stringify(payload.requirements || []), payload.status || 'OPEN', payload.displayOrder || 0]
      );
    } else if (entity === 'inbox' || entity === 'inboxMessages') {
      await p.query(
        `INSERT INTO inbox_messages (id, type, name, email, phone, category, subject, message, packageSelected, metadata, status, adminNotes, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE type=VALUES(type), name=VALUES(name), email=VALUES(email), phone=VALUES(phone), category=VALUES(category), subject=VALUES(subject), message=VALUES(message), packageSelected=VALUES(packageSelected), metadata=VALUES(metadata), status=VALUES(status), adminNotes=VALUES(adminNotes), createdAt=VALUES(createdAt)`,
        [id, payload.type || 'CONTACT', payload.name || payload.fullName || payload.senderName || '', payload.email || '', payload.phone || '', payload.category || payload.inquiryCategory || '', payload.subject || '', payload.message || '', payload.packageSelected || '', JSON.stringify(payload.metadata || {}), payload.status || 'UNREAD', payload.adminNotes || '', payload.createdAt || payload.timestamp || '']
      );
    } else if (entity === 'certificates') {
      await p.query(
        `INSERT INTO certificates (id, participantName, workshopTitle, issueDate, status, institution)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE participantName=VALUES(participantName), workshopTitle=VALUES(workshopTitle), issueDate=VALUES(issueDate), status=VALUES(status), institution=VALUES(institution)`,
        [id, payload.participantName || '', payload.workshopTitle || '', payload.issueDate || '', payload.status || 'VALID', payload.institution || 'Elite Global Excellence Academic Council']
      );
    }

    return true;
  } catch (error) {
    console.error(`Failed to execute MySQL query for entity ${entity}:`, error);
    return false;
  }
}
