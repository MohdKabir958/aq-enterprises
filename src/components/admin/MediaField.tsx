'use client';
import { useState } from 'react';
export default function MediaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <div className="cms-field">
      <label>
        {label}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/... or https://..."
        />
      </label>
      <label className="cms-upload">
        Upload image (JPEG, PNG, WebP; up to 2 MB)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 2000000) {
              setError('Choose an image smaller than 2 MB.');
              return;
            }
            setBusy(true);
            setError('');
            try {
              const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () =>
                  resolve(String(reader.result).split(',')[1]);
                reader.onerror = () =>
                  reject(new Error('Unable to read file.'));
                reader.readAsDataURL(file);
              });
              const response = await fetch('/api/admin/media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: file.name, base64 }),
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.error);
              onChange(result.url);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Upload failed.');
            } finally {
              setBusy(false);
              e.target.value = '';
            }
          }}
        />
      </label>
      {busy && <p role="status">Uploading…</p>}
      {error && <p role="alert">{error}</p>}
      <small>
        Videos use an HTTPS URL to a hosted MP4/WebM file. Use only media you
        have permission to publish.
      </small>
    </div>
  );
}
