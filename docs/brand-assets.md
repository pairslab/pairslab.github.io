# PAIRS Lab website brand assets

The website uses the approved **PAIRS Lab Brand Asset Library v1.0.0**
(2026-08-10). The original delivery archive remains the source of truth; this
repository contains only the web-ready files needed by the site.

## Website mapping

- Light header: `static/brand/logo/pairs-lab-primary-horizontal-color.svg`
- Mobile header: `static/brand/logo/pairs-lab-compact-horizontal-color.svg`
- Dark footer: `static/brand/logo/pairs-lab-primary-horizontal-reverse.svg`
- Approved co-brand lockups: `static/brand/co-brand/`
- Browser and device icons: `static/brand/favicon/`
- Core colour variables: `static/brand/tokens/pairs-brand-tokens.css`

Do not stretch, recolour, add shadows to, or reconstruct these files. Use the
colour version on light backgrounds and the reverse version on dark
backgrounds. Preserve clear space around every logo.

The supplied font files are intentionally not published by the website because
their external web-use licence still needs confirmation. The approved SVG logo
files are self-contained and render the intended wordmark without a separate
font download.

When replacing a shared visual asset or changing `site.css` / `site.js`, update
`assets.version` in `config/_default/params.yaml` so returning visitors receive
the new files instead of a cached release.
