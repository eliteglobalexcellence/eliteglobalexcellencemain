import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAsync, saveDatabase, invalidateMysqlCache } from '@/lib/db';
import { isMysqlConfigured, saveSingleItemToMysql } from '@/lib/mysql';
import { InboxMessage } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, subject, message, packageSelected, metadata } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required.' }, { status: 400 });
    }

    const db = await getDatabaseAsync();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMessage: InboxMessage = {
      id: `msg-${Date.now()}`,
      type: type || 'GENERAL_CONTACT',
      name,
      fullName: name,
      email,
      phone: phone || '',
      subject: subject || (packageSelected ? `Inquiry for ${packageSelected}` : 'General Academic Inquiry'),
      message: message || '',
      packageSelected: packageSelected || undefined,
      metadata: {
        source: 'Website Contact Page',
        isContactPageSubmission: true,
        ...(metadata || {})
      },
      status: 'UNREAD',
      createdAt: formattedDate,
    };

    if (!Array.isArray(db.inboxMessages)) db.inboxMessages = [];
    db.inboxMessages.unshift(newMessage);
    db.inbox = db.inboxMessages;
    saveDatabase(db);

    if (isMysqlConfigured()) {
      try {
        await saveSingleItemToMysql('inboxMessages', 'CREATE', newMessage);
        invalidateMysqlCache();
      } catch (err) {
        console.warn('MySQL inbox save error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully to the Elite Global Excellence academic team.',
      id: newMessage.id,
    });
  } catch (error: any) {
    console.error('Inbox submission error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}
