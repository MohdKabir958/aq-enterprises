import type { LeadReport, ReportItem } from '@/lib/leads/report';
import { LEAD_STAGES } from '@/lib/leads/workflow';
function Breakdown({ title, items }: { title: string; items: ReportItem[] }) {
  return <section className="cms-card"><h3>{title}</h3>
    {!items.length ? <p>No data yet.</p> : <div className="report-table-wrap"><table className="report-table">
      <thead><tr><th scope="col">Name</th><th scope="col">Count</th>{items.some(i => i.won !== undefined) && <th scope="col">Won</th>}</tr></thead>
      <tbody>{items.map(i => <tr key={i.name}><th scope="row">{i.name}</th><td>{i.count}</td>{i.won !== undefined && <td>{i.won}</td>}</tr>)}</tbody>
    </table></div>}
  </section>;
}
export default function Reports({ report }: { report: LeadReport }) {
  const metrics: [string, number][] = [
    ['Enquiries', report.leads], ['Customers marked Won', report.won], ['Customers marked Lost', report.lost],
    ['Survey requests', report.surveys], ['Tracked page views', report.pageViews],
    ['WhatsApp clicks', report.whatsapp], ['Phone clicks', report.calls], ['Cart shares', report.shares],
  ];
  return <section><h2>Conversion reports</h2>
    <p>Last 30 days. Customer outcomes come from your lead-stage updates. Page views and contact clicks are anonymous activity counts, not unique people or completed calls/messages. Browser privacy settings and blockers can reduce counts.</p>
    <div className="report-metrics">{metrics.map(([label, count]) => <div className="cms-card" key={label}><strong>{count}</strong><p>{label}</p></div>)}</div>
    <div className="report-grid">
      <Breakdown title="Enquiries by traffic source" items={report.sources} />
      <Breakdown title="Enquiries by service" items={report.services} />
      <Breakdown title="Products requested (enquiry count)" items={report.products} />
      <Breakdown title="Top pages (tracked views)" items={report.pages} />
      <Breakdown title="Lead pipeline (all time)" items={report.stages.map(i => ({...i, name: LEAD_STAGES.find(([id]) => id === i.name)?.[1] || i.name}))} />
    </div>
  </section>;
}
