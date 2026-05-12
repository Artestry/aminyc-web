# AMI NYC — Web Pilot Preview

The web preview of [AMI NYC](https://aminyc.org), a trilingual front door to affordable housing in New York City. Routes residents into the official Housing Connect application flow.

## Status

- **Phase 1 (now):** Pilot preview live at this URL. Signup form collects pilot list.
- **Phase 2 (early June 2026):** Native iOS + Android apps on TestFlight + Google Play internal testing.
- **Phase 3 (later):** Full public App Store + Play Store launch.

## Stack

- Single-file static HTML with inline CSS + vanilla JS.
- Hosted on GitHub Pages from the `main` branch.
- Pilot signups → Google Sheet via a small Apps Script webhook (see `pilot-signup.gs`).
- Trilingual: English, Spanish (informal `tú` register), Chinese (Simplified).

## Brand

Per AMI NYC Project Directives v1:
- Editorial, warm, institutional voice. Civic, trustworthy, empowering, accessible. Never "approachable."
- Coral (`#E8624D`) primary CTA. Navy (`#1B2D4F`) institutional. Gold (`#C9A35C`) warmth. Sand/cream surfaces. Ink slate text. No generic gray UI.
- Fraunces for display + brand moments. Inter for operational UI.

## Setup

1. Deploy `pilot-signup.gs` as a Google Apps Script web app (see comments in that file).
2. Paste the deployment URL into `index.html` where `APPS_SCRIPT_URL` is defined.
3. Commit and push. GitHub Pages picks up the change automatically.

## License

MIT. See `LICENSE`.
