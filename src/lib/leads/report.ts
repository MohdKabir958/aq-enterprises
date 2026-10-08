import { db } from '@/lib/cms/db';
import { sourceChannel } from '@/lib/analytics/activity';
import { SERVICE_OPTIONS } from './requirements';
export interface ReportItem { name: string; count: number; won?: number; }
export interface LeadReport {
  generatedAt: string;
  leads: number; won: number; lost: number; surveys: number;
  due: number; emailAttention: number; pageViews: number; whatsapp: number; calls: number; shares: number;
  sources: ReportItem[]; services: ReportItem[]; products: ReportItem[];
  pages: ReportItem[]; stages: ReportItem[];
}
export async function getLeadReport(): Promise<LeadReport> {
  const [totals, leads, products, pages, activity, stages] = await Promise.all([
    db().query<{ due: number; email_attention: number }>(`SELECT
      COUNT(*) FILTER(WHERE follow_up_at<=now() AND lead_status NOT IN ('won','lost'))::int AS due,
      COUNT(*) FILTER(WHERE email_status!='sent')::int AS email_attention FROM aq_enquiries`),
    db().query<{ lead_status: string; source: string; service: string; survey: boolean }>(`SELECT lead_status,
      COALESCE(NULLIF(payload->>'utmSource',''),payload->>'firstTouchSource','direct') AS source,
      COALESCE(payload->'requirements'->>'service','') AS service,
      COALESCE((payload->'requirements'->>'surveyRequested')::boolean,false) AS survey
      FROM aq_enquiries WHERE created_at>=now()-interval '30 days'`),
    db().query<{ name: string; count: number }>(`SELECT item->>'name' AS name, COUNT(DISTINCT e.id)::int AS count
      FROM aq_enquiries e CROSS JOIN LATERAL jsonb_array_elements(COALESCE(e.payload->'orderItems','[]'::jsonb)) item
      WHERE e.created_at>=now()-interval '30 days' GROUP BY item->>'id',item->>'name' ORDER BY count DESC LIMIT 10`),
    db().query<{ name: string; count: number }>(`SELECT path AS name,SUM(count)::int AS count FROM aq_activity
      WHERE day>=((now() AT TIME ZONE 'Asia/Kolkata')::date-29) AND event='page_view' GROUP BY path ORDER BY count DESC LIMIT 10`),
    db().query<{ event: string; count: number }>(`SELECT event,SUM(count)::int AS count FROM aq_activity
      WHERE day>=((now() AT TIME ZONE 'Asia/Kolkata')::date-29) GROUP BY event`),
    db().query<{ name: string; count: number }>('SELECT lead_status AS name, COUNT(*)::int AS count FROM aq_enquiries GROUP BY lead_status'),
  ]);
  const sources = new Map<string, ReportItem>();
  const services = new Map<string, ReportItem>();
  for (const lead of leads.rows) {
    const channel = sourceChannel(lead.source);
    const source = sources.get(channel) ?? { name: channel, count: 0, won: 0 };
    source.count++; if (lead.lead_status === 'won') source.won = (source.won ?? 0) + 1;
    sources.set(channel, source);
    const label = SERVICE_OPTIONS.find(([id]) => id === lead.service)?.[1] || 'Not specified';
    const service = services.get(label) ?? { name: label, count: 0, won: 0 };
    service.count++; if (lead.lead_status === 'won') service.won = (service.won ?? 0) + 1;
    services.set(label, service);
  }
  const count = (event: string) => activity.rows.find(row => row.event === event)?.count ?? 0;
  return {
    generatedAt: new Date().toISOString(),
    leads: leads.rowCount ?? 0, won: leads.rows.filter(l => l.lead_status === 'won').length,
    lost: leads.rows.filter(l => l.lead_status === 'lost').length, surveys: leads.rows.filter(l => l.survey).length,
    due: totals.rows[0].due, emailAttention: totals.rows[0].email_attention,
    pageViews: count('page_view'), whatsapp: count('whatsapp_click'), calls: count('phone_click'), shares: count('cart_share'),
    sources: [...sources.values()].sort((a,b) => b.count-a.count),
    services: [...services.values()].sort((a,b) => b.count-a.count),
    products: products.rows, pages: pages.rows, stages: stages.rows,
  };
}
