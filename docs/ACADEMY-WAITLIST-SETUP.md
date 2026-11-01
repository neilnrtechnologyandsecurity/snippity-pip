# Snippity Pip — academy waiting-list rollout

## Status and safety

The initial app is on the **feature/academy-waitlist** branch, not production main and not the existing Development branch. The public registration form is intentionally **closed** until a D1 binding, Turnstile and access controls are configured and tested. Existing demo student and shop pages are blocked in the proposed public Worker backend.

**Do not merge this branch or change Kate's domain until every live-release check below is complete.**

## Features

- Public academy page: Hair Cutting Course / Hair Extensions Course, register interest.
- Form: name, email, course, explicit course-update consent, Turnstile, spam honeypot and server validation.
- Worker API: POST /api/waitlist; GET /api/waitlist/config.
- Private administration page: /admin/waitlist, list/filter/export/update/delete.
- Access-controlled API: GET/PATCH/DELETE /api/admin/waitlist.
- Enquiry status: new -> contacted -> invited. The **invited** status does not send an email yet; invitations are a future feature.
- Later: integrate admin dashboard into proper tutor login and invite interested people to a course.

## Database (both separately)

The user has created two Cloudflare D1 databases:
- snippity-pip-production
- snippity-pip-development

Get their database UUIDs from Workers & Pages > D1 (Storage & databases) > select DB > Details. Ensure EU jurisdiction was chosen at creation if that is required: location cannot be changed later.

Open each database's **Console** and run the contents of [db/schema.sql](../db/schema.sql) against **each database**. Do not put names or emails in test records.

### Bindings

Cloudflare Worker Previews do not inherit the production binding. When the two UUIDs are available, change wrangler.jsonc to include both:

```jsonc
{
  "main": "./src/worker.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "run_worker_first": ["/api/*", "/admin/*", "/portal.html", "/classroom.html", "/shop.html"]
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "snippity-pip-production",
      "database_id": "<PRODUCTION_UUID>"
    }
  ],
  "previews": {
    "d1_databases": [
      {
        "binding": "DB",
        "database_name": "snippity-pip-development",
        "database_id": "<DEVELOPMENT_UUID>"
      }
    ]
  }
}
```

Leave all existing top-level keys (name, compatibility_date, workers_dev, preview_urls) intact. Do **not** replace the existing file wholesale with this abbreviated example.

## Turnstile

Create a Turnstile widget for the intended live hostnames. Copy its **site key** (public) into Worker variable `TURNSTILE_SITE_KEY`; save the **secret key** securely as `TURNSTILE_SECRET` in Cloudflare (never commit or send it in chat). Configure the Worker Preview's own site key and secret under Previews settings if you want submissions during staging. The backend verifies every Turnstile token via Cloudflare Siteverify, including the result hostname. The form remains disabled if these settings are absent.

## Secure admin

1. In Cloudflare Zero Trust > Access controls > Applications, configure a **self-hosted** Access application protecting the **exact** public hostname paths `/admin/*` and `/api/admin/*`. Restrict the Allow policy to Kate's own verified email (and an approved backup administrator if needed). Do not protect the whole public website.
2. Under the Worker secrets/variables set `ACCESS_TEAM_DOMAIN` (e.g. `https://your-team.cloudflareaccess.com`), `ACCESS_AUD` (the Access application AUD tag) and `ADMIN_EMAILS` (comma-separated authorised email addresses).
3. The Worker also validates the Access JWT signature against Cloudflare's JWKS, checks the exact issuer and AUD, expiry, and that the email is authorised. If any of those variables is missing the admin API **fails closed**.
4. Preview Access auth requires a separate applicable Access app and Preview configuration. Avoid real personal data in previews.
5. Once the Access policy is active, verify requests without login cannot view /admin/waitlist nor /api/admin/waitlist.

## Public launch and SEO

- Test homepage, services, contact, Timely appointments, academy teaser, privacy page, desktop and mobile.
- Confirm no sample shop, tutor or classroom URLs work on the public site, including direct URL access.
- Test registrations in development D1 with dummy data, CAPTCHA failures, repeated entries, admin view and removal. Test negative Access cases.
- Verify correct domain and DNS, including any email MX/SPF/DKIM/DMARC, before switching nameservers.
- The website currently has **noindex,nofollow** and robots.txt blocking all bots. After connecting and verifying Kate's real domain, remove noindex for public pages, update canonical URLs and robots/sitemap, and submit via Google Search Console.
- Do not send invitations automatically or claim enrolment availability before Kate confirms dates, policies, course accreditation, privacy and communications.
- Do not expose Access JWT, Turnstile secret, real student records or emails in GitHub.
- Keep the existing Pages project as fallback until the new Worker has been tested.

## Important about the build

The Cloudflare Git build currently has no build command; it deploys the committed `dist/` files. The source generator `build.py` has been updated to read `site_fragments/academy_main.html` and `site_fragments/privacy_main.html`. If editing the source templates, run `python3 build.py` and commit regenerated `dist/` files; rerun the public-release checks afterward.
