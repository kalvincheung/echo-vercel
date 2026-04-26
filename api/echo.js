export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const start = Date.now();
  const url = new URL(request.url);
  const sentAt = parseInt(url.searchParams.get('t') || '0');

  const wasColdStart = !globalThis.__warmed;
  globalThis.__warmed = true;

  return Response.json({
    platform: 'vercel',
    region: process.env.VERCEL_REGION || 'unknown',
    received_at: start,
    sent_at: sentAt,
    server_time_ms: Date.now() - start,
    cold: wasColdStart,
  });
}
