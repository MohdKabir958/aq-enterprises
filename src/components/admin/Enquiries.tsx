'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LEAD_STAGES, type LeadRecord, type LeadStage } from '@/lib/leads/workflow';

const indianTime = (date: string) => new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
const inputTime = (date: string | null) => date
  ? new Date(new Date(date).getTime() + 330 * 60000).toISOString().slice(0, 16) : '';
const storedTime = (date: string) => date ? new Date(`${date}:00+05:30`).toISOString() : null;

function LeadCard({ lead, notify }: { lead: LeadRecord; notify: (message: string) => void }) {
  const router = useRouter();
  const [stage, setStage] = useState<LeadStage>(lead.lead_status);
  const [notes, setNotes] = useState(lead.notes);
  const [followUp, setFollowUp] = useState(inputTime(lead.follow_up_at));
  const [appointment, setAppointment] = useState(inputTime(lead.appointment_at));
  const [busy, setBusy] = useState(false);
  async function request(body: unknown, success: string, deleting = false) {
    setBusy(true); notify('');
    try {
      const r = await fetch(deleting ? '/api/admin/enquiries' : '/api/admin/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error || 'Unable to update enquiry.');
      notify(result.message || success);
      router.refresh();
    } catch (error) {
      notify(error instanceof Error && !(error instanceof TypeError)
        ? error.message : deleting ? 'Unable to delete enquiry. Try again.' : 'Unable to update enquiry. Try again.');
    } finally { setBusy(false); }
  }
  return <article className="cms-card lead-card">
    <h3>{lead.payload.name} · {lead.payload.phone}</h3>
    <p>{indianTime(lead.created_at)} · Email: {lead.email_status} · Attempts: {lead.email_attempts}</p>
    <pre className="cms-enquiry">{[
      lead.payload.propertyType,
      lead.payload.email && `Email: ${lead.payload.email}`,
      lead.payload.address && `Site address: ${lead.payload.address}`,
      lead.payload.requirementsSummary,
      lead.payload.orderSummary,
      lead.payload.message,
    ].filter(Boolean).join('\n')}</pre>
    {lead.appointment_at && <p>Confirmed survey: {indianTime(lead.appointment_at)}</p>}
    {lead.follow_up_at && <p>Follow-up: {indianTime(lead.follow_up_at)}</p>}
    <form onSubmit={e => {
      e.preventDefault();
      void request({ action: 'update', value: {
        id: lead.id, revision: lead.revision, lead_status: stage, notes,
        follow_up_at: storedTime(followUp), appointment_at: storedTime(appointment),
      } }, 'Lead updated.');
    }}>
      <fieldset disabled={busy} className="guided-fields">
        <legend>Follow-up and outcome</legend>
        <label>Lead stage<select value={stage} onChange={e => setStage(e.target.value as LeadStage)}>
          {LEAD_STAGES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select></label>
        <label>Follow-up date and time (Hyderabad)<input type="datetime-local" value={followUp} onChange={e => setFollowUp(e.target.value)} /></label>
        <label>Confirmed survey date and time (Hyderabad)<input type="datetime-local" required={stage === 'survey_scheduled'} value={appointment} onChange={e => setAppointment(e.target.value)} /></label>
        <label>Private follow-up notes<textarea rows={3} maxLength={5000} value={notes} onChange={e => setNotes(e.target.value)} /></label>
        <button type="submit">{busy ? 'Saving…' : 'Save lead'}</button>
      </fieldset>
    </form>
    <div className="cms-actions">
      {lead.email_status !== 'sent' && <button className="cms-secondary" disabled={busy}
        onClick={() => request({ action: 'retry_email', id: lead.id }, 'Notification updated.')}>Retry email notification</button>}
      <button className="cms-danger" disabled={busy} onClick={() => {
        if (confirm('Permanently delete this customer enquiry?')) void request({ id: lead.id }, 'Enquiry deleted.', true);
      }}>Delete enquiry</button>
    </div>
  </article>;
}

export default function Enquiries({ leads: initialLeads, initialTotal, asOf }: { leads: LeadRecord[]; initialTotal: number; asOf: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState('');
  const [leads, setLeads] = useState(initialLeads);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch('/api/admin/leads', { method: 'POST', signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'list', query, filter, page }),
        });
        const result = await r.json();
        if (!r.ok) throw new Error();
        if (!controller.signal.aborted) { setLeads(result.leads); setTotal(result.total); }
      } catch {
        if (!controller.signal.aborted) setMessage('Unable to load enquiries. Refresh to try again.');
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, filter, page, asOf]);
  return <section>
    <h2>Customer enquiries</h2>
    <button className="cms-secondary" onClick={() => router.refresh()}>Refresh enquiries</button>
    {message && <p role="status">{message}</p>}
    <p>Search all saved requests. Follow-up dates and confirmed appointments use Hyderabad time. Reminders appear here when you open or refresh the dashboard.</p>
    <div className="lead-filters">
      <label>Find an enquiry<input type="search" maxLength={120} value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} /></label>
      <label>Filter enquiries<select value={filter} onChange={e => { setFilter(e.target.value); setPage(0); }}>
        <option value="all">All enquiries</option>
        <option value="due">Follow-ups due</option>
        <option value="email">Email needs attention</option>
        {LEAD_STAGES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select></label>
    </div>
    {loading && <p aria-live="polite">Loading enquiries…</p>}
    {!loading && !leads.length && <p>No matching enquiries.</p>}
    {leads.map(lead => <LeadCard key={`${lead.id}:${lead.revision}`} lead={lead} notify={setMessage} />)}
    {(total > 20 || page > 0) && <div className="cms-actions">
      <button disabled={loading || page === 0} onClick={() => setPage(page - 1)}>Previous enquiries</button>
      <p>Page {page + 1} of {Math.max(1, Math.ceil(total / 20))} · {total} enquiries</p>
      <button disabled={loading || (page + 1) * 20 >= total} onClick={() => setPage(page + 1)}>Next enquiries</button>
    </div>}
  </section>;
}
