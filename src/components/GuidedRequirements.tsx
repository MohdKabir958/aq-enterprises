'use client';
import {
  SERVICE_OPTIONS, TIME_OPTIONS, indiaToday, surveyDateLimit,
  type Requirements,
} from '@/lib/leads/requirements';

export default function GuidedRequirements({ value, onChange, disabled = false, survey = false }: {
  value: Requirements; onChange: (value: Requirements) => void;
  disabled?: boolean; survey?: boolean;
}) {
  const update = <K extends keyof Requirements>(key: K, next: Requirements[K]) =>
    onChange({ ...value, [key]: next });
  const count = value.service === 'cctv' ? 'cameraCount'
    : value.service === 'networking' ? 'networkPoints'
      : value.service === 'access-control' ? 'doors' : null;
  return (
    <fieldset className="guided-fields" disabled={disabled}>
      <legend>Your requirements</legend>
      <label>Service needed
        <select value={value.service} required={survey || value.surveyRequested} onChange={e => onChange({ ...value,
          service: e.target.value as Requirements['service'], cameraCount: null, networkPoints: null, doors: null,
        })}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
      </label>
      {value.service && <>
        <label>Installation type
          <select value={value.installation} onChange={e => update('installation', e.target.value as Requirements['installation'])}>
            <option value="">Not sure yet</option>
            <option value="new">New installation</option>
            <option value="existing">Expand or upgrade an existing system</option>
          </select>
        </label>
        {count && <label>
          {count === 'cameraCount' ? 'Approximate camera count' : count === 'networkPoints' ? 'Approximate network points' : 'Doors / entry points'}
          <input type="number" min={1} max={count === 'networkPoints' ? 1000 : count === 'doors' ? 100 : 500}
            value={value[count] ?? ''} placeholder="Leave blank if unsure"
            onChange={e => update(count, e.target.value === '' ? null : Number(e.target.value))} />
        </label>}
      </>}
      <label>Hyderabad locality
        <input maxLength={120} required={survey || value.surveyRequested} minLength={survey || value.surveyRequested ? 3 : undefined}
          value={value.locality} onChange={e => update('locality', e.target.value)} placeholder="For example, Mallapur or Uppal" />
      </label>
      {!survey && <label className="cms-check">
        <input type="checkbox" checked={value.surveyRequested}
          onChange={e => update('surveyRequested', e.target.checked)} />
        Request a site survey
      </label>}
      {(survey || value.surveyRequested) && <>
        <label>Preferred survey date
          <input type="date" required min={indiaToday()} max={surveyDateLimit()}
            value={value.preferredDate} onChange={e => update('preferredDate', e.target.value)} />
        </label>
        <label>Preferred survey time
          <select required value={value.preferredTime} onChange={e => update('preferredTime', e.target.value as Requirements['preferredTime'])}>
            <option value="">Select a time</option>
            {TIME_OPTIONS.map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </label>
        <p>Times are in Hyderabad local time. Our team will call to confirm the visit.</p>
      </>}
    </fieldset>
  );
}
