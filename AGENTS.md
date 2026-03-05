# AGENTS.md

Repository guidance for coding agents.

## Project Overview

- **Stack:** Hugo static site (personal website at `gerard.space`).
- **Hugo version:** pinned via Hermit in `bin/`.
- **Config:** `hugo.yml` — languages (EN/CA/ES), params, permalinks.
- **Templates:** `layouts/` — `baseof.html`, `index.html`, `blog/list.html`, `blog/single.html`.
- **SCSS:** `assets/css/` — `main.scss` (imports `_blog.scss`). Hugo Pipes compile/minify/fingerprint.
- **Content:** `content/blog/` — Markdown posts. Multi-language via `.ca.md` / `.es.md` suffixes.
- **Data:** `data/social.yml` (social links), `i18n/` (en/ca/es translation strings).
- **No npm, bundler, linter, test framework, or external dependencies.** Hugo only.

## Setup & Build

```bash
source ./bin/activate-hermit   # or let direnv handle it via .envrc
./bin/hugo server --buildDrafts # Dev server
./bin/hugo --gc --minify        # Production build (same as CI)
```

**No lint or test commands.** The production build is the only verification step. Always run it after changes.

## CI/CD

- `.github/workflows/hugo-pages.yml` — push to `master`/`main` triggers `./bin/hugo --gc --minify`, deploys to GitHub Pages.
- `.github/workflows/opencode.yml` — AI agent responds to `/oc` or `/opencode` comments on issues/PRs.

## Code Style

- Keep changes **minimal and behavior-preserving**. Match existing style; no broad reformatting.
- **Templates:** Use Hugo idioms (`with`, `range`, `default`, `markdownify`, `i18n`). Tabs for HTML indentation. Preserve JS hook IDs (`#wrapper`, `#theme-toggle`, `#page-wrapper`).
- **SCSS:** Edit `assets/css/` only. Theming via `--blog-*` CSS custom properties. Dark mode uses **both** `prefers-color-scheme` AND `[data-theme="dark"]` — keep in sync. Accent: `#2B546B` light / `#5b9bb5` dark. Use `rem` units. Responsive at `max-width: 700px`.
- **JavaScript:** `assets/js/` — plain browser JS in IIFEs, processed via Hugo Pipes (minify/fingerprint). Referenced in `baseof.html` with `resources.Get`. Prefer `const`/`let`. Check element existence before access (`if (!btn) return;`).
- **Config:** Keep `hugo.yml` valid YAML. `data/social.yml` entries: `title`, `link`, `fa-icon`, optional `fa-brand: true`. Keep `i18n/*.yaml` keys in sync across languages.
- **Blog posts:** Filename `YYYY-MM-DD-slug.md`. Frontmatter: `title` (required), `description` (optional), `style: note` (optional), `link` (optional).
- **Dependencies:** No module system. Use Hermit for binaries. Avoid new CDN/script deps.
- **Errors:** Run `./bin/hugo --gc --minify` to verify. Use Hugo `default` to prevent nil panics.


## AGENTS.md

- Update this file based on any modification made in this repository that requires knowledge to be updated.
- This file should not exceed 50 lines at any time. Trim where possible, keep context safe.
