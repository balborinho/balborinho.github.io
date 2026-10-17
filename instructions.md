# Balborinho — Jekyll website

A bilingual (Portuguese / English) Jekyll site for an independent animation studio, designed for GitHub Pages.

## Structure

- `/` — Portuguese homepage (only projects with `featured: true`)
- `/en/` — English homepage
- `/projects/` and `/en/projects/` — all projects, with category filters
- `/about/` and `/en/about/` — About the studio
- `/contact/` and `/en/contact/` — Contact
- `/_projects/pt/` and `/_projects/en/` — one Markdown file per project **per language**
- `/_data/navigation.yml` — navigation labels and category names in both languages
- `/_data/statuses.yml` — project status labels in both languages
- `/assets/css/main.css` — visual design
- `/assets/js/main.js` — mobile menu and category filters (the site works without JS: all projects are shown and the menu is always open)
- `/assets/images/` — add your images and project thumbnails here

## Images (run once)

The images live on the current site and are not in this repository. Before replacing it, run (needs `curl`):

```sh
bash fetch-images.sh
```

It downloads each project's `cover.jpg` (cards) and `hero.jpg` (project page) into `assets/images/projects/<slug>/`, the team photos into `assets/images/team/`, and `card.jpg` (social preview). Until the files exist, a placeholder is shown. The header logo is still the text wordmark; the script prints the image URLs found on the old homepage so you can pick the logo.

## Contact email

Set it once in `_config.yml` (`email:`); it is used in the footer and on the contact pages.

## Old URLs

Old project links (`/products/...`, `/en/products/...`) and `/contacts/` redirect to the new pages through `redirect_from` in each file's front matter (the `jekyll-redirect-from` plugin is supported by GitHub Pages). The old *News* section (`/journal/`) was not migrated.

## Add a project

Every project is **two files** with the same `ref`, one per language:

`_projects/pt/my-short.md`

```yaml
---
ref: my-short                      # same value in both languages: links PT <-> EN
lang: pt
permalink: /projects/my-short/
title: "O Meu Filme"
description: "Resumo curto, mostrado no cartão e na página."
categories: [short-2d]             # see "Categories" below
year: 2026
featured: true                     # appears on the homepage, with the "Featured" tag
order: 3                           # lower numbers come first
thumbnail: /assets/images/my-short.jpg
technique: "Animação digital 2D"
duration: "1 min 30 s"
status: in-production              # planned | pre-production | in-production | in-development | experimental | complete (or free text)
hero: /assets/images/projects/my-short/hero.jpg   # optional wide image for the project page (defaults to thumbnail)
external_url: "https://example.com"
videos:
  - url: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
    title: "Teaser"
    caption: "Teaser, 2026."
credits:
  - role: "Realização"
    name: "Nome Apelido"
  - role: "Animação"
    name: ["Nome Apelido", "Nome Apelido"]
---
Texto do projeto em português.
```

`_projects/en/my-short.md` — same `ref`, with `lang: en`, `permalink: /en/projects/my-short/` and the English text.

Notes:

- The language switch in the header and the `hreflang` tags use `ref` to find the other version. If a project exists in only one language, the switch falls back to the other language's homepage.
- `technique`, `duration`, `status`, `videos`, `credits` and `external_url` are all optional; empty blocks are not displayed.
- `videos` accepts YouTube (`watch`, `youtu.be`, `embed`, `shorts`), Vimeo (`vimeo.com/123456789`, or `vimeo.com/123456789/hash` for unlisted videos) and direct `.mp4` / `.webm` / `.ogv` files (put local files in `/assets/` and use `poster:` for a cover). YouTube is embedded with `youtube-nocookie.com`. Several videos can be listed.
- `credits[].name` can be a text or a list of names.

### Categories

Available category IDs: `short-2d`, `short-3d`, `series`, `experimental`, `stop-motion`, `software`, `research`, `other`. To add a new one, add it to `categories:` in `_data/navigation.yml` with both `pt` and `en` labels. The filter bar on the projects page only lists categories that have at least one project in that language, and appears when there are two or more.

## Run locally

Install Ruby and Bundler, then:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`.

## Publish on GitHub Pages

1. Create a GitHub repository and push this project.
2. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`.
3. GitHub Pages builds the site using the `github-pages` gem.
4. For a custom domain, configure `balborinho.com` in Pages and ensure the DNS records point to GitHub Pages. Keep the `CNAME` file in the repository.
5. Before replacing the existing site, test the new version on the repository's GitHub Pages URL and back up the current site.

## Notes

- This is a static site: the contact page uses an email link rather than a server-side form.
- The design uses no JavaScript framework and is responsive (mobile menu below 760 px).
- Replace the placeholder contact address and social links in `_config.yml` / contact pages.
- If you publish via a project repository URL such as `username.github.io/repository`, configure `baseurl` accordingly.
