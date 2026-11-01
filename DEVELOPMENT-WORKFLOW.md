# Snippity Pip — development and release workflow

This file documents the separation between the public website and ongoing academy development.

## Branches and deployments

- `main` deploys the production `snippity-pip-worker` Cloudflare Worker. Do not publish unfinished student, tutor or checkout features here.
- `Development` uses Cloudflare Worker Previews via `npx wrangler preview`; its preview URL is for Kate and collaborators to review changes before approval.
- Keep the existing Cloudflare Pages project as a fallback until the public Worker and domain launch have been verified.
- Merge tested, approved changes from `Development` into `main` only when ready for the live website.

## Before launching the public site

- Confirm Timely booking links and responsive salon pages work.
- Hide or remove unfinished demo shop, student, tutor and checkout interfaces from public routes (including direct URLs).
- Replace the present `noindex,nofollow` robots directives and Pages canonical URLs **only for the finished production site**, once Kate's real domain is configured.
- Use separate preview and production data stores for waiting-list and student records; never place real personal information in public development previews.
- Protect real student data with server-side authentication, validation and appropriate privacy/retention policies before enabling enrolments.

## Build notes

The checked-in `dist/` directory contains the current compiled static website. If editing Python templates, run `python3 build.py` and commit the regenerated `dist/` files alongside source changes so Cloudflare's no-build deployment picks them up.
