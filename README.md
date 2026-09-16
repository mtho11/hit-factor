# Hit Factor Calculator

A USPSA stage scoring calculator built with React, TypeScript, and Vite.

**Live app:** https://mtho11.github.io/hit-factor/

**Tutorial:** https://mtho11.github.io/hit-factor/tutorial.html

## Features

- Editable stage name and Major/Minor power factor
- A/C/D/Miss/No-Shoot/Procedural counters with USPSA point values
- Live total points and hit factor calculation
- Multiple stages, persisted to `localStorage`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Pushes to `main` automatically build and deploy to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
