import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { Testimonial } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const role = String(body.role || '').trim();
    const institution = String(body.institution || '').trim();
    const quote = String(body.quote || '').trim();
    const rating = Number(body.rating) || 5;
    const avatarUrl = String(body.avatarUrl || '').trim();

    if (!name) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!role) {
      return NextResponse.json({ error: 'Please enter your designation or role.' }, { status: 400 });
    }

    if (!quote) {
      return NextResponse.json({ error: 'Please enter your feedback / review text.' }, { status: 400 });
    }

    const db = getDatabase();
    if (!db.siteContent) {
      db.siteContent = {} as any;
    }
    if (!Array.isArray(db.siteContent.testimonials)) {
      db.siteContent.testimonials = [];
    }

    const newTestimonial: Testimonial = {
      id: `testim-${Date.now()}`,
      name,
      role,
      institution: institution || undefined,
      quote,
      rating,
      avatarUrl: avatarUrl || undefined,
      status: 'PENDING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    db.siteContent.testimonials.unshift(newTestimonial);
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your feedback has been submitted successfully and is pending admin approval.',
      data: newTestimonial,
    });
  } catch (err: any) {
    console.error('Error submitting testimonial feedback:', err);
    return NextResponse.json({ error: 'Internal server error submitting feedback.' }, { status: 500 });
  }
}
