import { assertSameOrigin, clientIp, consumeRateLimit, readJson } from '@/lib/cms/auth';
import { databaseConfigured, db } from '@/lib/cms/db';
import { activitySchema } from '@/lib/analytics/activity';
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    if (!databaseConfigured()) return new Response(null, { status: 204 });
    const data = activitySchema.parse(await readJson(request, 1000));
    if (!(await consumeRateLimit(`activity:${clientIp(request)}`, 240, 60)))
      return new Response(null, { status: 429 });
    await db().query(
      `INSERT INTO aq_activity(day,event,path,channel) VALUES((now() AT TIME ZONE 'Asia/Kolkata')::date,$1,$2,$3)
       ON CONFLICT(day,event,path,channel) DO UPDATE SET count=aq_activity.count+1`,
      [data.event, data.path, data.channel],
    );
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 400 }); }
}
