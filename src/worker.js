// Snippity Pip Academy registration API.
// All write operations fail closed until D1, Turnstile and Access are configured.
const COURSES = ['Hair Cutting Course','Hair Extensions Course'];
const STATUSES = ['new','contacted','invited'];
const json = (value, status=200) => new Response(JSON.stringify(value), {
  status,
  headers: {'content-type':'application/json; charset=utf-8','cache-control':'no-store',
    'x-content-type-options':'nosniff','referrer-policy':'no-referrer'}
});
const normalize = value => String(value ?? '').trim();
function isSameOrigin(request) {
  return request.headers.get('origin') === new URL(request.url).origin;
}
function decodePart(text) {
  const b64 = text.replace(/-/g,'+').replace(/_/g,'/');
  const raw = atob(b64.padEnd(Math.ceil(b64.length / 4)*4,'='));
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
let keyCache = { team:'', expires:0, keys:[] };
async function isKate(request, env) {
  // Never grant admin access based on an unverified user-supplied email/header.
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.ADMIN_EMAILS) return false;
  const token = request.headers.get('cf-access-jwt-assertion');
  if (!token) return false;
  try {
    const [h,p,s,extra] = token.split('.');
    if (!h || !p || !s || extra) return false;
    const header = JSON.parse(new TextDecoder().decode(decodePart(h)));
    const payload = JSON.parse(new TextDecoder().decode(decodePart(p)));
    const domain = String(env.ACCESS_TEAM_DOMAIN).replace(/\/$/,'');
    const issuer = domain.startsWith('https://') ? domain : 'https://' + domain;
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    const allowedEmails = String(env.ADMIN_EMAILS).split(',').map(v => v.trim().toLowerCase());
    const now = Math.floor(Date.now()/1000);
    if (header.alg !== 'RS256' || !header.kid || payload.iss !== issuer ||
        !aud.includes(String(env.ACCESS_AUD)) ||
        !Number.isFinite(payload.exp) || payload.exp <= now ||
        !Number.isFinite(payload.iat) || payload.iat > now + 60 ||
        (payload.nbf && payload.nbf > now) ||
        !allowedEmails.includes(String(payload.email || '').toLowerCase())) return false;
    if (keyCache.team !== issuer || keyCache.expires < Date.now()) {
      const response = await fetch(issuer + '/cdn-cgi/access/certs');
      if (!response.ok) return false;
      const keys = await response.json();
      keyCache = {team:issuer,expires:Date.now()+5*60*1000,keys:keys.keys || []};
    }
    const jwk = keyCache.keys.find(k => k.kid === header.kid && k.kty === 'RSA');
    if (!jwk) return false;
    const key = await crypto.subtle.importKey('jwk', jwk, {name:'RSASSA-PKCS1-v1_5', hash:'SHA-256'},false,['verify']);
    return await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decodePart(s),
      new TextEncoder().encode(h + '.' + p));
  } catch {return false;}
}
async function verifyTurnstile(token, request, env) {
  if (!token || !env.TURNSTILE_SECRET) return {ok:false,reason:!token?'missing-token':'missing-secret'};
  try {
    const body = new URLSearchParams({
      secret: String(env.TURNSTILE_SECRET), response:token,
      remoteip: request.headers.get('CF-Connecting-IP') || ''
    });
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
      method:'POST',body
    });
    if (!res.ok) return {ok:false,reason:'verification-service-error'};
    const result = await res.json();
    if (result.success !== true) {
      const codes = Array.isArray(result['error-codes']) ?
        result['error-codes'].filter(c => typeof c === 'string' && /^[a-z-]{1,40}$/.test(c)).slice(0,3) : [];
      return {ok:false,reason:codes.join(',') || 'verification-failed'};
    }
    if (result.hostname !== new URL(request.url).hostname) return {ok:false,reason:'hostname-mismatch'};
    return {ok:true};
  } catch {return {ok:false,reason:'verification-unavailable'};}
}
function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('x-content-type-options','nosniff');
  headers.set('referrer-policy','strict-origin-when-cross-origin');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
function adminPage() {
  return new Response(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow"><title>Academy enquiries — Snippity Pip</title>
  <link rel="stylesheet" href="/waitlist-admin.css"></head>
  <body><main><header><p class="eyebrow">The Snippitypip Academy</p>
  <h1>Course enquiries</h1><p>Private waiting-list dashboard</p></header>
  <section id="status" role="status" aria-live="polite">Loading enquiries…</section>
  <section class="toolbar">
  <label for="filter">Show course</label><select id="filter"><option value="">All courses</option>
  <option>Hair Cutting Course</option><option>Hair Extensions Course</option></select>
  <button id="refresh" type="button">Refresh</button>
  <button id="download" type="button">Download CSV</button></section>
  <div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Registered</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody id="entries"></tbody></table></div>
  <p class="fine">Only contact people about the course they registered for. Do not share or export this list unnecessarily.</p>
  </main><script src="/waitlist-admin.js" defer></script></body></html>`,
  {headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store',
    'content-security-policy':"default-src 'none'; style-src 'self'; script-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
    'x-content-type-options':'nosniff'}});
}
export default {
  async fetch(request,env) {
    const url = new URL(request.url), path = url.pathname;
    // Do not expose the unfinished demonstration enrolment/shop URLs on production.
    // The design-only feature branch is treated the same until approval.
    if (['/portal.html','/classroom.html','/shop.html'].includes(path)) {
      return new Response('Coming soon',{status:404,headers:{'cache-control':'no-store'}});
    }
    if (path === '/api/waitlist/config' && request.method === 'GET') {
      const checks = {
        database: Boolean(env.DB),
        turnstileSiteKey: Boolean(env.TURNSTILE_SITE_KEY),
        turnstileSecret: Boolean(env.TURNSTILE_SECRET)
      };
      const ready = Object.values(checks).every(Boolean);
      const previewDiagnostic = url.hostname.startsWith('feature-academy-waitlist-');
      return json({ready,siteKey:ready ? String(env.TURNSTILE_SITE_KEY) : null,
        ...(previewDiagnostic ? {checks} : {})});
    }
    if (path === '/api/waitlist' && request.method === 'POST') {
      if (!env.DB || !env.TURNSTILE_SECRET || !env.TURNSTILE_SITE_KEY) return json({message:'Registrations are not open yet.'},503);
      if (!isSameOrigin(request)) return json({message:'Invalid request origin.'},403);
      if (!String(request.headers.get('content-type')||'').startsWith('application/json')) return json({message:'Invalid form.'},415);
      if (Number(request.headers.get('content-length') || 0) > 8192) return json({message:'Form too large.'},413);
      let form;
      try {
        const raw = await request.text();
        if (raw.length > 8192) return json({message:'Form too large.'},413);
        form = JSON.parse(raw);
      } catch {return json({message:'Invalid form.'},400);}
      const name=normalize(form.name), email=normalize(form.email).toLowerCase();
      const course=normalize(form.course);
      if (form.website) return json({ok:true}); // honeypot
      if (name.length < 2 || name.length > 100 || !/^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/.test(email) ||
          email.length > 254 || !COURSES.includes(course) || form.consent !== true) {
        return json({message:'Please check your name, email, course and consent.'},400);
      }
      const verification = await verifyTurnstile(normalize(form.token),request,env);
      if (!verification.ok) {
        // Show a non-sensitive cause only on the temporary feature preview.
        // Production keeps a generic error to avoid disclosing validation details.
        const diagnostic = url.hostname.startsWith('feature-academy-waitlist-') ?
          {diagnostic:verification.reason} : {};
        return json({message:'The security check could not be verified. Please try again.',...diagnostic},400);
      }
      try {
        await env.DB.prepare(`INSERT INTO academy_interests
          (name,email,course,status,consent_at,created_at,updated_at)
          VALUES (?,?,?,'new',datetime('now'),datetime('now'),datetime('now'))
          ON CONFLICT(email,course) DO UPDATE SET name=excluded.name,
          consent_at=excluded.consent_at,updated_at=datetime('now')`)
          .bind(name,email,course).run();
        return json({ok:true});
      } catch {return json({message:'Unable to register right now. Please try again later.'},503);}
    }
    if (path === '/admin/waitlist' || path.startsWith('/api/admin/')) {
      if (!await isKate(request,env)) return json({message:'Access denied. Sign in through your approved Cloudflare Access application.'},403);
      if (!env.DB) return json({message:'Database not configured.'},503);
      if (path === '/admin/waitlist' && request.method === 'GET') return adminPage();
      if (path === '/api/admin/waitlist' && request.method === 'GET') {
        const course = url.searchParams.get('course');
        if (course && !COURSES.includes(course)) return json({message:'Invalid course.'},400);
        try {
          const stmt = course ? env.DB.prepare('SELECT id,name,email,course,status,consent_at,created_at FROM academy_interests WHERE course=? ORDER BY created_at DESC LIMIT 1000').bind(course)
            : env.DB.prepare('SELECT id,name,email,course,status,consent_at,created_at FROM academy_interests ORDER BY created_at DESC LIMIT 1000');
          const records = await stmt.all();
          return json({records:records.results || []});
        } catch {return json({message:'Unable to load enquiries.'},503);}
      }
      if (path === '/api/admin/waitlist' && request.method === 'PATCH') {
        if (!isSameOrigin(request)) return json({message:'Invalid request origin.'},403);
        let item;try { item=await request.json(); } catch{return json({message:'Invalid update.'},400);}
        const id=Number(item.id), status=normalize(item.status);
        if (!Number.isSafeInteger(id) || id<=0 || !STATUSES.includes(status)) return json({message:'Invalid update.'},400);
        try {
          await env.DB.prepare('UPDATE academy_interests SET status=?,updated_at=datetime(\'now\') WHERE id=?').bind(status,id).run();
          return json({ok:true});
        } catch {return json({message:'Could not update enquiry.'},503);}
      }
      if (path === '/api/admin/waitlist' && request.method === 'DELETE') {
        if (!isSameOrigin(request)) return json({message:'Invalid request origin.'},403);
        let item;
        try { item=await request.json(); } catch {return json({message:'Invalid request.'},400);}
        const id=Number(item.id);
        if (!Number.isSafeInteger(id) || id<=0) return json({message:'Invalid request.'},400);
        try {
          await env.DB.prepare('DELETE FROM academy_interests WHERE id=?').bind(id).run();
          return json({ok:true});
        } catch {return json({message:'Could not delete enquiry.'},503);}
      }
      return json({message:'Not found'},404);
    }
    if (path.startsWith('/api/') || path.startsWith('/admin/')) return json({message:'Not found'},404);
    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  }
};
