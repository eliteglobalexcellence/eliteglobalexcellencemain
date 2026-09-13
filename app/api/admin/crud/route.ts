import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { DatabaseState } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET || 'EGE2026!Admin';
    const reqSecret = req.headers.get('x-admin-secret') || req.headers.get('authorization')?.replace('Bearer ', '');

    const body = await req.json();
    const action = String(body.action || '').toLowerCase();
    const collection = String(body.collection || body.entity || '');
    const item = body.item || body.payload || {};
    const id = body.id || item?.id;

    const isPublicAction = ['workshopRegistrations', 'workshopAttendances', 'inboxMessages', 'testimonials'].includes(collection) && action === 'create';
    
    if (!isPublicAction && reqSecret !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret key.' }, { status: 401 });
    }

    const db = getDatabase();

    // Special singletons: siteContent & contactSettings
    if (collection === 'siteContent') {
      if (action === 'update' || action === 'create') {
        db.siteContent = { ...db.siteContent, ...item };
        saveDatabase(db);
        return NextResponse.json({ success: true, data: db.siteContent });
      }
    }

    if (collection === 'contactSettings') {
      if (action === 'update' || action === 'create') {
        db.contactSettings = { ...db.contactSettings, ...item };
        saveDatabase(db);
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
