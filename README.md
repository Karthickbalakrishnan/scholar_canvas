# ScholarCanvas

An academic research discovery dashboard inspired by CSRankings.org, built with React + Vite and Tailwind CSS v4, styled in the Apple Design System (light mode, glassmorphism, micro-borders).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Production build

```bash
npm run build
npm run preview
```

The app is configured to be hosted from the `/find-the-dream/` subdirectory (see `vite.config.js`). If you deploy elsewhere, change the `base` value there.

## What's inside

- `src/data/mockData.js` — the full mock relational dataset (institutions → faculty → papers) and the research-area taxonomy tree.
- `src/components/Header.jsx` — translucent floating header with a chip-based search bar and profile menu.
- `src/components/Sidebar.jsx` — Timeline Matrix (dual-range slider), Institutional Regions, Research Areas tree (with inline SVG sparklines), Faculty Rank, and Artifact Integrity filter cards.
- `src/components/TrendRadar.jsx` — the "Hype vs Substance" multi-line SVG chart.
- `src/components/Leaderboard.jsx` — the two-level disclosure table (institution → faculty → papers).
- `src/components/PaperRow.jsx` + `src/components/TldrTooltip.jsx` — paper rows with hover-triggered, simulated-latency TL;DR tooltips.
- `src/components/LineageModal.jsx` — the academic genealogy lineage tree modal.
- `src/components/ToastStack.jsx` — bottom-right confirmation toasts for citation/dataset/export actions.

All filtering (timeline, region, research area, faculty rank, artifact integrity, and search) is fully reactive and recalculates the leaderboard, counts, and chips in real time — no backend required.

## Deploying

### Option A — GitHub Pages (included, automatic)

1. Create a new GitHub repo and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Open `vite.config.js` and set `base` to match your repo name exactly:
   ```js
   base: '/<your-repo>/',
   ```
   Commit and push that change.
3. In your GitHub repo: **Settings → Pages → Build and deployment → Source → GitHub Actions.**
4. Push to `main` (or re-run the workflow from the **Actions** tab). The included `.github/workflows/deploy.yml` builds the site and deploys it automatically.
5. Your site goes live at `https://<your-username>.github.io/<your-repo>/`.

Every push to `main` redeploys automatically — no extra steps after the first setup.

### Option B — Vercel or Netlify (simpler, no base-path step)

If you'd rather skip the subdirectory base-path detail: import the repo directly on [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com) (both auto-detect Vite — build command `npm run build`, output directory `dist`). In that case, set `base: '/'` in `vite.config.js` since the site is served from the domain root.
