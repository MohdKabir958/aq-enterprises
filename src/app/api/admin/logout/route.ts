import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  assertSameOrigin,
  removeSession,
  SESSION_COOKIE,
} from '@/lib/cms/auth';
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await removeSession((await cookies()).get(SESSION_COOKIE)?.value);
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, '', {
      httpOnly: true,
      secure: Boolean(process.env.VERCEL) || new URL(request.url).protocol === 'https:',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to log out.' }, { status: 400 });
  }
}
