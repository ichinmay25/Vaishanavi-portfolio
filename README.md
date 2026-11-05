# Vaishanavi Saware — portfolio

One page. No build step, no dependencies, no framework.

Built from the Figma design
[`RYHbuzPDVgObsBxExSsvm8`](https://www.figma.com/design/RYHbuzPDVgObsBxExSsvm8/Untitled?node-id=26-435),
frame `MacBook Pro 14" - 1`. Content comes from her LinkedIn profile; the full
content map is in `_private/linkedin-content-for-figma.md`.

```
index.html        the whole site: hero, about, projects, experience, education, skills, contact
assets/site.css   the stylesheet
assets/site.js    one job — the colour-theme toggle
assets/*.png      the portrait, three project images, five organisation logos
assets/resume.pdf the file behind the two Resume links
```

## Running it

```bash
python3 -m http.server 8111
```

## Publishing

Plain static files at the repository root, so GitHub Pages serves them as-is:
**Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

`_private/` holds her LinkedIn PDF and the working notes. It is in `.gitignore`, so it
never reaches the repository or Pages — but if you ever deploy by uploading the folder
rather than pushing, delete it first.

## How it maps to the design

The layout is one block, centred: a 320px rail, a 40px gutter and a 550px column —
910px in all, which at the design's 1512px width leaves 301px either side. There is
200px of air above the first section and 120px below the last. Those numbers are read
off the Figma frame, and the built page measures the same.

Three things deliberately differ from the frame:

- **Sections sit 112px apart, not the design's 80px** (`main { gap }`), because the
  page reads better with more air between them.
- **Inside a section, blocks sit 32px apart, not 20px** (`.content { gap }`), which
  also matches the 32px the projects, experience, education and skills lists already
  used.
- **Each section label is `position: sticky`,** so it holds at the top of the screen
  until its section has scrolled past. The hero rail carries her name rather than a
  label, so it scrolls normally, and the labels go static below 1000px where they
  stack above their section instead of beside it.

The "Available for work" pill and the theme toggle are `position: fixed` in the top
right, so they stay on screen the whole way down. Below 620px the pill is hidden and
only the toggle remains.

Type is Inter throughout, loaded from Google Fonts, at the sizes the design uses:
30px name, 20px leads, 16px body, 14px labels and metadata.

Colours are CSS custom properties on `:root` in `assets/site.css`:

| Token | Dark | Used for |
| --- | --- | --- |
| `--bg` | `#1a1a1a` | the page |
| `--text` | `#ffffff` | headings, names, labels |
| `--body` | `#dddddd` | paragraphs and bullets |
| `--muted` | `#9aa1ab` | organisations and dates |
| `--border` | `#292929` | hairlines |
| `--surface` | `#232323` | the ghost button and pills |
| `--card` | `#ffffff` | the three stat tiles |
| `--green` | `#49c98a` | the availability dot |

## Three things worth knowing

1. **The theme toggle.** The design shows a moon button top right but only a dark
   version of the page. The light theme is built from the palette already in the design
   — the stat tiles are `#ffffff` with `#1a1a1a` headings and `#454545` labels — and
   those values are inverted into `:root[data-theme="light"]`. Delete that block and
   `assets/site.js` to drop the feature.
2. **`assets/resume.pdf` is a stand-in.** It is her LinkedIn PDF export. Replace it
   with her own resume.
3. **The three "Read more" links** point at her LinkedIn, except the clinic card, which
   points at `sukhayurveda.in` — the URL her LinkedIn gives. They want real
   destinations: a case-study page, or the publication.

## Editing

Content is written directly in `index.html`; there is no templating. The sections are
marked with comments. Each repeated block — `.project`, `.entry`, `.skill`, `.stats li`
— is the same shape every time, so adding one means copying the block above it.
