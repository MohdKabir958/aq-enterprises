'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <main className="cms-login cms-page">
      <p className="cms-kicker">AQ Enterprises</p>
      <h1>Owner login</h1>
      <p>Manage products, offers and website content.</p>
      {!configured && (
        <p className="cms-notice">
          Admin setup is incomplete. Set the Neon database connection and owner
          login credentials before using this page.
        </p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError('');
          const form = new FormData(e.currentTarget);
          try {
            const response = await fetch('/api/admin/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: form.get('email'),
                password: form.get('password'),
              }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to log in.');
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            maxLength={254}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={200}
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button disabled={busy || !configured}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </main>
  );
}
