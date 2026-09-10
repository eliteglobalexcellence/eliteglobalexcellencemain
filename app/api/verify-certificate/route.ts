import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid Certificate ID or Participant Name.' }, { status: 400 });
    }

    const db = getDatabase();
    const cleanQuery = query.trim().toLowerCase();

    const certList = db.certificates || [];
    let matched = certList.find(
      (c) =>
        c.id.toLowerCase() === cleanQuery ||
        c.participantName.toLowerCase().includes(cleanQuery)
    );

    // Fallback lookup against registered participants if newly issued
    if (!matched && db.workshopRegistrations) {
      const regMatch = db.workshopRegistrations.find(
        (r) =>
          (r.certId && r.certId.toLowerCase() === cleanQuery) ||
          r.registrationId.toLowerCase() === cleanQuery ||
          r.fullName.toLowerCase().includes(cleanQuery)
      );

      if (regMatch) {
        matched = {
          id: regMatch.certId || `EGE-CERT-${regMatch.registrationId}`,
          participantName: regMatch.fullName,
          workshopTitle: 'Elite Global Excellence Academic Masterclass',
          issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          status: 'VALID',
          institution: 'Elite Global Excellence Academic Council',
        };
      }
    }

    if (!matched) {
      return NextResponse.json({
        found: false,
        message: `No verified certificate record found matching "${query}". Please check the ID or contact academic credentials verification at info@eliteglobalexcellence.com.`,
      });
    }

    return NextResponse.json({
      found: true,
      certificate: matched,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
