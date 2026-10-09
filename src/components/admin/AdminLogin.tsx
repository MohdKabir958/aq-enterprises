'use client';
import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { LOGO_SRC } from '@/lib/assets';

export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="admin-login-page">
      <section
        className="admin-login-story"
        aria-label="AQ Enterprises owner workspace"
      >
        <div className="admin-login-brand">
          <Image
            src={LOGO_SRC}
            alt="AQ Enterprises logo"
            width={58}
            height={58}
          />
          <div>
            <strong>AQ Enterprises</strong>
            <span>Security systems & networking</span>
          </div>
        </div>
        <div className="admin-login-story-copy">
          <span className="admin-login-eyebrow">
            Your business, in one place
          </span>
          <h2>
            Make your next
            <br />
            move count.
          </h2>
          <p>
            Keep your website fresh, your offers clear and your customer
            enquiries close.
          </p>
          <div className="admin-login-capabilities">
            <span>
              <Icon name="package" /> Products & offers
            </span>
            <span>
              <Icon name="file" /> Content & services
            </span>
            <span>
              <Icon name="chart" /> Leads & insights
            </span>
          </div>
        </div>
        <div className="admin-login-story-photo">
          <Image
            src="/images/illustrations/home-security.webp"
            alt="Security camera overlooking a house entrance"
            fill
            sizes="(max-width: 900px) 0px, 50vw"
          />
          <span>
            <Icon name="shield" size={17} /> AQ Enterprises owner workspace
          </span>
        </div>
      </section>
      <section
        className="admin-login-form-side"
        aria-labelledby="admin-login-heading"
      >
        <Link href="/" className="admin-login-back">
          <Icon name="arrow-up-right" size={16} /> Back to website
        </Link>
        <div className="admin-login-card">
          <Image
            className="admin-login-logo"
            src={LOGO_SRC}
            alt="AQ Enterprises logo"
            width={64}
            height={64}
          />
          <span className="admin-login-form-kicker">Welcome back</span>
          <h1 id="admin-login-heading">Owner login</h1>
          <p>Sign in to manage your website and customer enquiries.</p>
          {!configured && (
            <p className="admin-login-notice">
              Admin setup is incomplete. Set the database connection and owner
              login credentials before using this page.
            </p>
          )}
          <form
            aria-busy={busy}
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
                if (!response.ok)
                  throw new Error(result.error || 'Unable to log in.');
                router.refresh();
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : 'Unable to log in.',
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <label htmlFor={emailId}>Email</label>
            <div className="admin-login-input">
              <Icon name="mail" size={18} />
              <input
                id={emailId}
                name="email"
                type="email"
                placeholder="Your owner email"
                autoComplete="username"
                required
                maxLength={254}
                disabled={busy}
              />
            </div>
            <label htmlFor={passwordId}>Password</label>
            <div className="admin-login-input">
              <Icon name="lock" size={18} />
              <input
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                maxLength={200}
                disabled={busy}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
              </button>
            </div>
            {error && (
              <p role="alert" className="admin-login-error">
                {error}
              </p>
            )}
            <button
              className="admin-login-submit"
              disabled={busy || !configured}
            >
              {busy ? 'Logging in…' : 'Log in'}
              <Icon name="arrow-right" size={18} />
            </button>
          </form>
          <div className="admin-login-security">
            <Icon name="shield" size={16} />
            <span>Private access for the business owner.</span>
          </div>
        </div>
        <p className="admin-login-footer">AQ Enterprises · Owner workspace</p>
      </section>
    </main>
  );
}
