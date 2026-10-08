import { NextResponse } from 'next/server';
import { z } from 'zod';
import { assertSameOrigin, isAdmin, readJson, consumeRateLimit } from '@/lib/cms/auth';
import { db } from '@/lib/cms/db';
import { leadUpdateSchema, leadStageSchema, serializeLead, type StoredLeadRecord } from '@/lib/leads/workflow';
import type { NormalizedLeadPayload } from '@/lib/leads/provider';
import { defaultSmtpProvider } from '@/lib/leads/smtp-provider';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    if (!(await isAdmin())) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
    const input = z.discriminatedUnion('action', [
      z.object({ action: z.literal('list'), query: z.string().trim().max(120),
        filter: z.union([leadStageSchema, z.enum(['all', 'due', 'email'])]), page: z.number().int().min(0).max(1000000) }),
      z.object({ action: z.literal('update'), value: leadUpdateSchema }),
      z.object({ action: z.literal('retry_email'), id: z.uuid() }),
    ]).parse(await readJson(request, 12000));
    if (input.action === 'list') {
      // Search is in a POST body, so customer names/phones do not enter URL logs.
      const where = `WHERE ($1='' OR strpos(lower(concat_ws(' ',payload->>'name',payload->>'phone',payload->>'email',
        payload->>'address',payload->>'requirementsSummary',payload->>'orderSummary',notes)),lower($1))>0)
        AND ($2='all' OR lead_status=$2 OR ($2='due' AND follow_up_at<=now() AND lead_status NOT IN ('won','lost'))
        OR ($2='email' AND email_status!='sent'))`;
      const [rows, total] = await Promise.all([
        db().query<StoredLeadRecord>(`SELECT * FROM aq_enquiries ${where} ORDER BY created_at DESC,id DESC LIMIT 20 OFFSET $3`,
          [input.query, input.filter, input.page * 20]),
        db().query<{ count: number }>(`SELECT COUNT(*)::int AS count FROM aq_enquiries ${where}`, [input.query, input.filter]),
      ]);
      return NextResponse.json({ leads: rows.rows.map(serializeLead), total: total.rows[0].count }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (input.action === 'update') {
      const v = input.value;
      const saved = await db().query(
        `UPDATE aq_enquiries SET lead_status=$2, notes=$3, follow_up_at=$4, appointment_at=$5,
         revision=revision+1 WHERE id=$1 AND revision=$6 RETURNING revision`,
        [v.id, v.lead_status, v.notes, v.follow_up_at, v.appointment_at, v.revision],
      );
      if (!saved.rowCount) return NextResponse.json({ error: 'This lead changed in another session. Reload before saving.' }, { status: 409 });
      return NextResponse.json({ success: true });
    }
    if (!(await consumeRateLimit('admin:email-retry', 10, 600)))
      return NextResponse.json({ error: 'Too many retries. Please wait ten minutes.' }, { status: 429 });
    // Claim one attempt atomically, so concurrent tabs cannot send duplicates.
    const claim = await db().query<{ payload: NormalizedLeadPayload; email_attempts: number }>(
      `UPDATE aq_enquiries SET email_status='sending', email_attempts=email_attempts+1, last_email_attempt_at=now()
       WHERE id=$1 AND (last_email_attempt_at IS NULL OR last_email_attempt_at<now()-interval '1 minute')
       AND (email_status IN ('pending','failed') OR (email_status='sending' AND last_email_attempt_at<now()-interval '5 minutes'))
       RETURNING payload,email_attempts`, [input.id],
    );
    if (!claim.rowCount) return NextResponse.json({ error: 'This notification was sent, is still sending, or was attempted recently. Wait before retrying.' }, { status: 409 });
    const row = claim.rows[0];
    const result = await defaultSmtpProvider.deliver(row.payload);
    await db().query('UPDATE aq_enquiries SET email_status=$2 WHERE id=$1 AND email_attempts=$3',
      [input.id, result.success ? 'sent' : 'failed', row.email_attempts]);
    return NextResponse.json({ success: result.success, message: result.success
      ? 'Notification sent.' : 'Email delivery failed. The enquiry is still saved; check your SMTP settings.' });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues.map(i => i.message).slice(0, 5).join(' ') }, { status: 400 });
    return NextResponse.json({ error: 'Unable to update this enquiry. Check your login and connection.' }, { status: 400 });
  }
}
