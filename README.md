# Gerard's personal website

Oh, look, you found my repo for my personal website! There's not much interesting here. Feel free to use the theme for your website!

## Development

1. `git clone https://github.com/casassg/casassg.github.io && cd casassg.github.io`
2. `source ./bin/activate-hermit`
3. `./bin/hugo server --buildDrafts`

## Deploy

1. Push changes to `master` (or `main`)
2. GitHub Actions builds and deploys Hugo to GitHub Pages automatically

Deployment is done automatically by [GitHub Pages](https://pages.github.com/) via `.github/workflows/hugo-pages.yml`, using Hugo from Hermit (`./bin/hugo`).
