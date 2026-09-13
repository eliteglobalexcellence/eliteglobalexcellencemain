import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAsync, saveDatabase, invalidateMysqlCache } from '@/lib/db';
import { isMysqlConfigured, saveSingleItemToMysql } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET || 'EGE2026!Admin';
    const reqSecret = req.headers.get('x-admin-secret') || req.headers.get('authorization')?.replace('Bearer ', '');

    const body = await req.json();
    const action = String(body.action || '').toLowerCase();
    const actionUpper = (body.action || 'CREATE').toUpperCase() as 'CREATE' | 'UPDATE' | 'DELETE';
    const collection = String(body.collection || body.entity || '');
    const item = body.item || body.payload || {};
    const id = body.id || item?.id;

    const isPublicAction = ['workshopRegistrations', 'workshopAttendances', 'inboxMessages', 'testimonials'].includes(collection) && (action === 'create' || action === 'update');

    if (!isPublicAction && reqSecret !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret key.' }, { status: 401 });
    }

    const db = await getDatabaseAsync();

    // Synchronous sync to MySQL database if configured
    if (isMysqlConfigured()) {
      try {
        await saveSingleItemToMysql(collection, actionUpper, { ...item, id: id || item?.id });
        invalidateMysqlCache();
      } catch (err) {
        console.warn('MySQL single item save warning:', err);
      }
    }

    // Special singletons: siteContent & contactSettings
    if (collection === 'siteContent') {
      if (action === 'update' || action === 'create') {
        db.siteContent = { ...db.siteContent, ...item };
        saveDatabase(db);
        if (isMysqlConfigured()) {
          await saveSingleItemToMysql('siteContent', 'UPDATE', db.siteContent);
          invalidateMysqlCache();
        }
        return NextResponse.json({ success: true, data: db.siteContent });
      }
    }

    if (collection === 'contactSettings') {
      if (action === 'update' || action === 'create') {
        db.contactSettings = { ...db.contactSettings, ...item };
        saveDatabase(db);
        if (isMysqlConfigured()) {
          await saveSingleItemToMysql('contactSettings', 'UPDATE', db.contactSettings);
          invalidateMysqlCache();
        }
        return NextResponse.json({ success: true, data: db.contactSettings });
      }
    }

    let targetCollection = collection;
    if (collection === 'careers') targetCollection = 'careerRoles';
    if (collection === 'news') targetCollection = 'newsArticles';
    if (collection === 'inbox') targetCollection = 'inboxMessages';

    const list = (db as any)[targetCollection] as any[];
    if (!Array.isArray(list)) {
      return NextResponse.json({ error: `Invalid collection: ${collection}` }, { status: 400 });
    }

    if (action === 'create') {
      const newId = item.id || Date.now();
      const newItem = { ...item, id: newId };
      list.unshift(newItem);
      if (targetCollection === 'inboxMessages') {
        db.inbox = list;
      }
      saveDatabase(db);
      return NextResponse.json({ success: true, data: newItem, all: list });
    }

    if (action === 'update') {
      const index = list.findIndex((i: any) => String(i.id) === String(id || item.id));
      if (index === -1) {
        const newItem = { ...item, id: id || Date.now() };
        list.unshift(newItem);
      } else {
        list[index] = { ...list[index], ...item };
      }
      if (targetCollection === 'inboxMessages') {
        db.inbox = list;
      }
      saveDatabase(db);
      return NextResponse.json({ success: true, data: list[index] || item, all: list });
    }

    if (action === 'delete') {
      const targetId = id || item?.id;
      const filtered = list.filter((i: any) => String(i.id) !== String(targetId));
      (db as any)[targetCollection] = filtered;
      if (targetCollection === 'inboxMessages' || collection === 'inbox') {
        db.inboxMessages = filtered;
        db.inbox = filtered;
      }
      if (targetCollection === 'careerRoles' || collection === 'careers') {
        db.careerRoles = filtered;
        db.careers = filtered;
      }
      saveDatabase(db);
      return NextResponse.json({ success: true, all: filtered });
    }

    return NextResponse.json({ error: `Invalid action: ${action}` }, { status: 400 });
  } catch (error: any) {
    console.error('CRUD API Error:', error);
    return NextResponse.json({ error: error.message || 'Operation failed' }, { status: 500 });
  }
}
