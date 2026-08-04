# Lilla Therese

Webbplats för Lilla Therese Bokhandel i Göteborg.

## Publicerad webbplats

GitHub Pages publicerar den statiska webbplatsen från `pages/` via
`.github/workflows/pages.yml`.

- Redigera `pages/index.html` för ändringar på den publika GitHub Pages-sidan.
- Bilder som ska publiceras ligger i `public/` och kopieras av workflowen.
- En push till `main` startar publiceringen automatiskt.

## Vinext-version

`app/` innehåller motsvarande Vinext/React-version för lokal utveckling och
OpenAI Sites. Den är separat från GitHub Pages-versionen och publiceras inte av
GitHub Actions-workflowen.

```bash
npm install
npm run dev
npm test
```

Node.js `>=22.13.0` krävs.
