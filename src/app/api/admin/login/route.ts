import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  adminConfigured,
  assertSameOrigin,
  clientIp,
  consumeRateLimit,
  createSession,
  readJson,
  SESSION_COOKIE,
} from '@/lib/cms/auth';
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    if (!adminConfigured())
      return NextResponse.json(
        {
          error:
            'Admin setup is incomplete. Configure Neon and owner credentials.',
        },
        { status: 503 },
      );
    const allowed = await consumeRateLimit(
      `login:${clientIp(request)}`,
      5,
      900,
    );
    const globalAllowed = await consumeRateLimit('login:global', 100, 900);
    if (!allowed || !globalAllowed)
      return NextResponse.json(
        { error: 'Too many login attempts. Try again in 15 minutes.' },
        { status: 429 },
      );
    const input = z
      .object({
        email: z.email().max(254),
        password: z.string().min(1).max(200),
      })
      .parse(await readJson(request, 2000));
    const token = await createSession(input.email, input.password);
    if (!token)
      return NextResponse.json(
        { error: 'Email or password is incorrect.' },
        { status: 401 },
      );
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: Boolean(process.env.VERCEL) || new URL(request.url).protocol === 'https:',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 3600,
    });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch {
    return NextResponse.json(
      { error: 'Unable to log in. Check the request or database connection.' },
      { status: 400 },
    );
  }
}
