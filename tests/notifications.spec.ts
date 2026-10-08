import { test, expect } from '@playwright/test';
import { createServer, type Socket } from 'node:net';
import { SmtpLeadDeliveryProvider } from '../src/lib/leads/smtp-provider';
import type { NormalizedLeadPayload } from '../src/lib/leads/provider';

test('SMTP delivers requirements to the private recipient with escaped customer content', async () => {
  const messages: string[] = [];
  const recipients: string[] = [];
  const sockets = new Set<Socket>();
  const server = createServer(socket => {
    sockets.add(socket);
    socket.on('error', () => { /* Local test connection only. */ });
    socket.on('close', () => sockets.delete(socket));
    socket.write('220 localhost fixture SMTP ready\r\n');
    let buffer = '';
    let inData = false;
    let lines: string[] = [];
    socket.on('data', chunk => {
      buffer += chunk.toString();
      for (;;) {
        const end = buffer.indexOf('\r\n');
        if (end < 0) break;
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        if (inData) {
          if (line === '.') {
            messages.push(lines.join('\r\n')); lines = []; inData = false;
            socket.write('250 Fixture accepted\r\n');
          } else lines.push(line.startsWith('..') ? line.slice(1) : line);
        } else if (/^EHLO|^HELO/i.test(line)) socket.write('250-localhost\r\n250 AUTH PLAIN\r\n');
        else if (/^AUTH/i.test(line)) socket.write('235 Authentication successful\r\n');
        else if (/^RCPT TO:/i.test(line)) { recipients.push(line); socket.write('250 OK\r\n'); }
        else if (/^MAIL FROM:|^RSET|^NOOP/i.test(line)) socket.write('250 OK\r\n');
        else if (/^DATA/i.test(line)) { inData = true; socket.write('354 End with a dot\r\n'); }
        else if (/^QUIT/i.test(line)) socket.end('221 Bye\r\n');
        else socket.write('502 Unsupported fixture command\r\n');
      }
    });
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject); server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Fixture did not bind.');
  const changes = { SMTP_HOST: '127.0.0.1', SMTP_PORT: String(address.port),
    SMTP_USER: 'alerts@example.test', SMTP_PASS: 'local-test-smtp-only',
    LEAD_DESTINATION_EMAIL: 'private-owner@example.test' };
  const previous = Object.fromEntries(Object.keys(changes).map(key => [key, process.env[key]]));
  Object.assign(process.env, changes);
  try {
    const lead: NormalizedLeadPayload = {
      name: 'SMTP fixture', phone: '9876543210', normalizedPhone: '9876543210',
      propertyType: 'Office', formSource: 'site_survey', submittedAt: new Date().toISOString(),
      pagePath: '/site-survey', landingPage: '/site-survey', referrer: '', firstTouchSource: 'direct',
      utmSource: '', utmMedium: '', utmCampaign: '', utmContent: '', utmTerm: '',
      requirementsSummary: 'Approximate cameras: 6\nCustomer text: <script>fixture</script>',
    };
    const result = await new SmtpLeadDeliveryProvider().deliver(lead);
    expect(result.success).toBe(true);
    expect(recipients).toEqual(['RCPT TO:<private-owner@example.test>']);
    expect(messages).toHaveLength(1);
    const body = messages[0].replace(/=\r\n/g, '');
    expect(body).toContain('Approximate cameras: 6');
    expect(body).toContain('&lt;script&gt;fixture&lt;/script&gt;');
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    for (const socket of sockets) socket.destroy();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
