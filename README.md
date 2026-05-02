# Alchymia Labs · Production Deploy Package

For deployment to **https://alchymia.alephain.com/**

## Files in this bundle

```
site-bundle/
├── index.html              · the site (single self-contained file)
├── favicon-paper.svg       · Route A · light theme favicon (per Brand Guide v2)
├── favicon-slate.svg       · Route A · dark theme favicon (per Brand Guide v2)
├── apple-touch-icon.png    · 180×180 · iOS home-screen icon (Route B paper)
├── og-card.png             · 1200×630 · Open Graph / Twitter share card
└── README.md               · this file
```

## Deploy

Drop all 6 files into the web root of `alchymia.alephain.com`. No build step, no dependencies.

`index.html` references the four assets by **relative path**, so they must sit in the same directory. If the site is served from a subdirectory, no change is needed — relative paths handle it.

## What's included

- Single-file HTML — all CSS inlined, no external stylesheets
- Web fonts loaded from Google Fonts (Newsreader, Inter, JetBrains Mono)
- Google Analytics tag `G-8MLLSWZ362`
- Bilingual EN / 中文 toggle (default EN, persists in-session)
- Light / dark colour-scheme via `prefers-color-scheme`
- Mobile hamburger menu activates ≤1024px
- All meta tags wired: `description`, `og:*`, `twitter:card`, `theme-color`, `canonical`

## Brand compliance

This page conforms to **The Alephain Guild Brand Guide v2.0**:
- Route A monogram for favicons (paper / slate pair)
- No gold on the logo (gold appears only as a UI accent, well under §III.1's 10% rule)
- Newsreader Italic + Inter + JetBrains Mono — the v2 typographic system
- Monochrome paper / slate colourway with deep gold (`#B8902C`) accent

## Update checklist before launch

- [ ] Replace illustrative numbers in the **Operations Ledger** (channels / RFCs / quorum) with live counters
- [ ] Confirm `alchymia@alephain.com` mailbox is wired
- [ ] Replace `og-card.png` with a final designer-approved 1200×630 if available
- [ ] Confirm Google Analytics `G-8MLLSWZ362` is the correct property for this subdomain
