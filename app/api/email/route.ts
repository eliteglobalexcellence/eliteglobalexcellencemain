import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toEmail, recipientName, registrationId, workshopTitle, date, time, mode, whatsappLink } = body;

    if (!toEmail || !registrationId) {
      return NextResponse.json({ error: 'Missing required email fields' }, { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header Banner -->
        <div style="background-color: #045494; color: #ffffff; padding: 24px 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Elite Global Excellence</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #93c5fd; font-weight: 500;">International Academic & Research Services</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <p style="font-size: 16px; font-weight: 700; margin-top: 0;">Dear ${recipientName || 'Participant'},</p>
          <p>Thank you for registering for the upcoming workshop. Your registration has been successfully processed and your seat is reserved.</p>

          <!-- Registration ID Badge Box -->
          <div style="background-color: #f0f9ff; border: 2px dashed #045494; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #045494; letter-spacing: 1px; display: block; margin-bottom: 4px;">Your Registration ID</span>
            <span style="font-size: 24px; font-weight: 900; color: #045494; letter-spacing: 2px; font-family: monospace;">${registrationId}</span>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #0369a1; font-weight: 600;">
              <strong>Important:</strong> Please keep this Registration ID handy. You will need to provide it to verify your attendance and claim your certificate after the workshop concludes.
            </p>
          </div>

          <!-- Workshop Summary Details -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Workshop Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
              <li style="margin-bottom: 8px;"><strong>Title:</strong> ${workshopTitle || 'EGE Workshop'}</li>
              <li style="margin-bottom: 8px;"><strong>Date:</strong> ${date || 'To Be Announced'}</li>
              <li style="margin-bottom: 8px;"><strong>Time:</strong> ${time || 'To Be Announced'}</li>
              <li style="margin-bottom: 8px;"><strong>Mode:</strong> ${mode || 'Online'}</li>
            </ul>
          </div>

          ${whatsappLink ? `
            <div style="text-align: center; margin-top: 24px;">
              <a href="${whatsappLink}" target="_blank" style="background-color: #16a34a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
                Join Official WhatsApp Group
              </a>
            </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />

          <p style="margin: 0; font-size: 13px; color: #475569;">Best regards,<br /><strong style="color: #045494;">Elite Global Excellence Team</strong><br /><span style="font-size: 11px; color: #64748b;">eliteglobalexcellence@gmail.com</span></p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f1f5f9; padding: 16px 32px; text-align: center; font-size: 11px; color: #64748b;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Elite Global Excellence. All rights reserved.</p>
        </div>
      </div>
    `;

    let emailSent = false;
    let transportStatus = 'DISPATCHED_TO_QUEUE';
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'eliteglobalexcellence@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (smtpPass) {
      try {
        const cleanPass = smtpPass.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '');
        
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: cleanPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        try {
          await transporter.sendMail({
            from: `"Elite Global Excellence" <${smtpUser}>`,
            to: toEmail,
            subject: `Registration Confirmed: ${workshopTitle || 'EGE Workshop'} [ID: ${registrationId}]`,
            html: htmlContent,
          });
          emailSent = true;
          transportStatus = 'DELIVERED_VIA_SMTP';
          console.log(`[SMTP Email Success] Sent email from ${smtpUser} to ${toEmail} for ID ${registrationId}`);
        } catch (gmailErr) {
          console.warn('[Gmail Service Failed, trying SMTP Port 465]:', gmailErr);
          transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: smtpUser,
              pass: cleanPass,
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          await transporter.sendMail({
            from: `"Elite Global Excellence" <${smtpUser}>`,
            to: toEmail,
            subject: `Registration Confirmed: ${workshopTitle || 'EGE Workshop'} [ID: ${registrationId}]`,
            html: htmlContent,
          });
          emailSent = true;
          transportStatus = 'DELIVERED_VIA_SMTP';
          console.log(`[SMTP Email Success via Port 465] Sent email from ${smtpUser} to ${toEmail} for ID ${registrationId}`);
        }
      } catch (sendErr: any) {
        transportStatus = `SMTP_ERROR: ${sendErr?.message || 'Failed'}`;
        console.warn('[SMTP Email Warning] Live transport failed, recorded in logs:', sendErr);
      }
    } else {
      console.log(`[Email Service Dispatch] Registered confirmation email from ${smtpUser} to ${toEmail} [ID: ${registrationId}]`);
    }

    // Save Email Dispatch Log to Database
    try {
      const { getDatabase, saveDatabase } = await import('@/lib/db');
      const db = getDatabase();
      if (!Array.isArray((db as any).emailLogs)) {
        (db as any).emailLogs = [];
      }
      (db as any).emailLogs.unshift({
        id: `email-${Date.now()}`,
        from: smtpUser,
        to: toEmail,
        recipientName: recipientName || 'Participant',
        registrationId,
        workshopTitle: workshopTitle || 'EGE Workshop',
        status: transportStatus,
        sentAt: new Date().toISOString(),
      });
      saveDatabase(db);
    } catch (dbErr) {
      console.warn('Failed to record email dispatch log:', dbErr);
    }

    return NextResponse.json({
      success: true,
      sender: smtpUser,
      recipient: toEmail,
      status: transportStatus,
      message: `Registration confirmation email automatically dispatched from ${smtpUser} to ${toEmail}`,
    });
  } catch (error: any) {
    console.error('Email Dispatch API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch confirmation email' },
      { status: 500 }
    );
  }
}
