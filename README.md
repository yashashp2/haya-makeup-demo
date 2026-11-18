# HAYA — Makeup & Hair

A complete React, Vite, TypeScript and Tailwind CSS website concept for Haya Makeup Artist in London.

**Independent speculative design. Not an official or authorised website.** Images are licensed illustrative placeholders, not Haya's work or clients. No testimonials, credentials or biography have been invented. Provisional services and prices come from the supplied brief and need direct confirmation.

## Local development

Requires Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the printed URL, including `/haya-makeup-demo/`.

```sh
npm run typecheck
npm run build
npm run preview -- --port 4173
```

The production output is `dist/`. All navigation uses section anchors, so refreshes work on GitHub Pages without a router or server.

## Tests

With the production preview running on port 4173 and Google Chrome installed:

```sh
npm run test:e2e
```

The Playwright suite covers 375px, 390px, 768px and 1440px widths, page overflow, images, broken asset responses, anchor targets, keyboard menu dismissal, portfolio filters, axe WCAG A/AA scans, form validation, clipboard copying, reset, no submission requests, and empty browser storage. It uses synthetic details only. `TEST_URL` can point the same tests at the live deployment. Screenshots are written to ignored `test-results/`.

## GitHub Pages deployment

- Repository: `haya-makeup-demo`
- Vite base: `/haya-makeup-demo/` in `vite.config.ts`
- Live preview: https://yashashp2.github.io/haya-makeup-demo/
- Workflow: `.github/workflows/deploy.yml`

The workflow runs on pushes to `main` or manual dispatch. It checks out the code, sets up Node 24, runs `npm ci` and `npm run build`, configures Pages, uploads `dist`, and deploys with the required Pages/OIDC permissions and concurrency.

To deploy in another account:

1. Create a public repository named `haya-makeup-demo`.
2. Push this source (including `package-lock.json`) to `main`.
3. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. Run **Deploy to GitHub Pages** from the Actions tab if necessary.
5. Wait for the workflow's deploy job to succeed, then visit `https://<username>.github.io/haya-makeup-demo/`.

If changing the repository name, update Vite's `base`. Asset URLs are resolved through `import.meta.env.BASE_URL`; no root-relative production image paths are used.

## Editing content and photographs

- `src/data/content.ts`: services, GBP prices, social destinations and base-aware asset helper.
- `src/App.tsx`: page copy, portfolio mapping and accessible navigation.
- `src/components/EnquiryForm.tsx`: message preparation and clipboard handoff.
- `src/styles.css`: palette, responsive layouts and reduced-motion support.
- `public/images/credits.json`: source and licence details, including alternative images.
- `public/image-credits.html`: public photography credits.

Fonts are locally served from Fontsource (Cormorant Garamond and DM Sans). Icons are Lucide. Photographs are locally hosted under the [Pexels License](https://www.pexels.com/license/). This is an illustrative website usage, without implied photographer/model endorsement. Replace placeholder photos only with approved images and retain accurate credits/rights records. Update labels and alt text when replacing images.

## Enquiry and privacy behaviour

The form validates required fields, email format, nonblank text and a date no earlier than today. It creates a message in transient browser memory. It does not call a backend, send mail or DMs, write cookies, or use local/session storage. No analytics, social embeds or third-party fonts run on the site.

Copying is an explicit user action: the system clipboard retains copied text until the user changes it, independently of this website. If clipboard permission is unavailable, the message remains selectable for manual copying. The Instagram button opens the profile without personal data in the URL; the visitor must choose Message, paste and send themselves. Instagram may require login. There is no booking confirmation or reservation.

Editing a field invalidates a previously prepared message. **Clear all details** clears form and message state; reloading starts an empty form. Browser-managed autofill behaviour remains outside application control. Ordinary static hosting request logs may be maintained by GitHub; no form values are included in those requests.

## Before any authorised business launch

- Obtain the business owner's approval and approved branding/photographs.
- Confirm every service, current price, inclusions, availability and booking terms.
- Replace the speculative booking journey with the actual process.
- Review privacy information if adding a backend, analytics or other collection.
- Remove demo/noindex notices only once the site is authorised and ready.

Implementation follows the [Vite static deployment guide](https://vite.dev/guide/static-deploy) and [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite).
