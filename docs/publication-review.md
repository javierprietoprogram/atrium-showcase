# Publication review

Review date: 25 October 2026. This review covers the public showcase, not a security audit of the production product.

## Material included

- Original English product and engineering documentation.
- A dependency-free static demo with four fictional incidents and three fictional routines.
- One browser screenshot rendered from that demo, with synthetic-data labeling.
- An MIT license for this public material only.

## Checks performed before publication

- Reviewed every public file and all reachable Git commit, tag and blob objects. Searched for credential/token patterns, email addresses, opaque identifiers, private hostnames and local filesystem paths.
- Compared public text against private UUIDs and Supabase host references without publishing those values.
- Checked file hashes against the source checkout to detect accidentally copied files. No production files or history were imported.
- Manually reviewed the complete demo dataset and image: no customer names, named hotels, people, personal records or operational metrics are represented.
- Checked the screenshot for embedded EXIF metadata.
- Checked relative documentation links, image and demo resources. The public product website returned HTTP 200.
- Served the demo locally and checked navigation, combined search/department filtering, empty results, status progression, routine completion, the fixed voice example, dialog dismissal and reset on reload. JavaScript syntax validation passed. There is no build step.
- Compared the source checkout's file contents, Git status and HEAD with a read-only baseline.

No secret or private-data findings remained in the publication material. The only email address in commit metadata is a GitHub no-reply author address; no personal contact address is included.

## Brand alignment review

The visual update uses the public website’s blue/neutral palette and its already-public blue logo. The unmodified logo is embedded locally; no private source repository or production environment was accessed for this update. No remote fonts, scripts or runtime requests were introduced.

Desktop interactions were checked again. Mobile overview, filters, status controls, routines and the draft dialog were verified at 390px; 320px and 768px layouts were checked for page overflow. The table scrolls inside its card on narrow screens. The desktop image was regenerated after resetting all demo state.

Publication checks were repeated against the complete public working tree and Git history. The only embedded binary is the public logo, and the screenshot contains the same fictional fixtures. Product claims, architecture documentation, JavaScript behavior and synthetic data are unchanged.

## Deliberately excluded

Production source and assets; environment files; keys and authentication settings; project identifiers and private URLs; database schemas and migrations; hotel/customer/user data; prompts and proprietary workflow rules; pricing, plans, internal issues and analytics; production Git history.

The demo has no backend connection, microphone access, AI calls or persistent storage. These checks reduce disclosure risk; they do not establish the security of the separate production application.
