# Vaishanavi Saware — portfolio

A five-page static site. No build step, no dependencies, no JavaScript framework.

```
index.html        cover, the three strands of work, skills, contact
about.html        bio, every post in order, education
operations.html   Genentech, and a clinic in India
product.html      Promega
research.html     Gladstone, Carnegie Mellon, UC Davis
assets/           site.css, site.js — the whole of it, about 16 KB
```

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Publishing

It is plain static files at the repository root, so GitHub Pages serves it as-is:
**Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

## Editing

- **Content** lives directly in the five HTML files. There is no templating at runtime.
- **Layout** is one twelve-column grid with two anchor lines, defined at the top of
  `assets/site.css`. Outer margins are 16–32px and the type scale has five steps; both
  are set as custom properties on `:root`.
- **`assets/site.js`** does one thing: reveals sections as they scroll into view. The
  page is fully readable with JavaScript disabled.

Each work page carries an `IMAGE SLOT` comment marking where her own figures or
photographs should go, and a `TO ADD` comment marking the detail still needed.
