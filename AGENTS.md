# AGENTS.md

Repository guidance for coding agents.

## Project Overview
- Stack: Hugo static site.
- Main config: `hugo.yml`.
- Templates: `layouts/`.
- SCSS source: `assets/css/`.
- Static passthrough: `static/`.
- Data files: `data/`.
- Build output: `public/`.
- Tool bootstrap: Hermit (`bin/`).
- Blog: `content/blog/` with multi-language support (EN/CA). Use `.ca.md` suffix for Catalan translations. Posts use date-based permalinks (`/2026/03/post-title/`).

## Setup
1. Clone the repo.
2. Activate Hermit.
3. Use repo-local Hugo binary.

```bash
source ./bin/activate-hermit
hugo version
```

Notes:
- `.envrc` activates Hermit when `direnv` is available.
- CI also uses Hermit via `cashapp/activate-hermit`.

## Build, Lint, Test Commands

### Build


```bash
# Dev server with drafts
./bin/hugo server --buildDrafts

# Production build (same as CI):
./bin/hugo --gc --minify
```

## CI/CD
- Workflow: `.github/workflows/hugo-pages.yml`.
- Trigger: push to `master` or `main`, plus manual dispatch.
- Build step: `./bin/hugo --gc --minify`.
- Deploy: GitHub Pages artifact from `public/`.
- Keep local and CI build commands aligned.

## Code Style Guidelines

- Keep changes minimal, readable, and behavior-preserving unless requirements say otherwise.
- Match local formatting/style in touched files; avoid broad reformatting.
- Templates: use existing Hugo patterns (`with`, `range`, `default`, `markdownify`) and preserve JS hook IDs/classes (`stats_button`, `close_stats`, `wrapper`).
- Styles: edit SCSS in `assets/css/` (not generated `public/`) and keep current responsive behavior.
- JavaScript: plain browser JS; prefer `const`/`let`, keep selectors stable, and handle DOM/network failures with user-visible fallbacks.
- Data/config: keep `hugo.yml` valid and preserve `data/social.yml` schema (`title`, `link`, `fa-icon`, optional `fa-brand`).
- Dependencies/imports: no module system is used; avoid new dependencies unless explicitly required and documented. Use hermit if you need a system wide binary.
