# Snippity Pip website

Hairdressing website, Timely customer links, training academy demonstration and online shop preview.

## Cloudflare Pages

Connect this repository with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `exit 0` |
| Build output directory | `dist` |
| Root directory | Leave blank (repository root) |

The finished HTML, CSS, JavaScript, images, video and workbook are already in `dist`. No build or package installation is required to host this version.

After changing source templates, run `python3 build.py` and commit the updated `dist` files with the source changes. Changes only to Python source do not affect the live site when using `exit 0`.

## Preview status

- Salon booking, gift-voucher, appointment-viewing and personal-details links open Timely.
- Academy accounts are fictional browser-local demos. They are not secure authentication or permanent learner records. Student: `student@example.com`; tutor: `tutor@example.com`; example password: `LearnWithPip`.
- Course material, progress and feedback use localStorage. Attached demonstration files use IndexedDB. They do not sync between devices or users.
- Shop products and prices are illustrative. The basket works locally; Stripe checkout, live orders and fulfilment are not connected.
- Testimonial sections await approved genuine reviews.
- This review version is marked noindex. Review canonical URLs, indexing, the final domain, policies and live features before a public launch. Noindex is not access control; a Cloudflare Pages deployment is publicly accessible unless separately protected.
- The existing ChatGPT-hosted preview is independent. Updates here do not automatically update that preview, and edits there do not automatically update this repository.

## Files and checks

`build.py`, `customer_sections.py`, `shop_section.py` and `make_portal.py` generate the HTML. CSS and JavaScript live directly in `dist`. `make_demo_assets.py` can regenerate the example workbook and case-study illustration with the Python `reportlab` dependency; existing asset files are included.

Run `node --test tests/academy-core.test.mjs` to check the academy workflow. Modern Node.js is required.


## Client feedback update — 25 October 2026

The six salon cards link to full service pages. Bridal hair sits within blow dries and occasion styling; haircare/GLOWWA advice has its own page, and Meet Pippin includes the supplied biography and qualifications. Service-specific enquiry links select the relevant subject in the contact form.

Brand accents use a muted gold palette. The assurance strip uses a local SVG sunflower so it cannot become an emoji on mobile; it is an original motif inspired by the existing logo, not an exported Canva asset. The homepage academy seal has no white backing and blends with the page. Facebook links use the page-specific URL verified against the public Thesnippitypip listing.

Service and haircare copy is maintained in service_content.py. No live payment or authentication functionality was changed.
