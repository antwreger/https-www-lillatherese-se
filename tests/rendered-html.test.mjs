import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Lilla Therese homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Katolsk bokhandel i Göteborg \| Lilla Therese<\/title>/i);
  assert.match(html, /class="header-inner"/);
  assert.match(html, /class="hero-inner"/);
  assert.match(html, /Lilla Therese<\/h1>|Lilla Therese<br\s*\/>Bokhandel/i);
  assert.match(html, /Staty av den heliga Thérèse av Lisieux/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps desktop content bounded and mobile layout intact", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--container-width:1280px/);
  assert.match(css, /\.header-inner,\.hero-inner\s*\{[^}]*max-width:var\(--container-width\)[^}]*margin-inline:auto[^}]*padding-inline:var\(--container-gutter\)/s);
  assert.doesNotMatch(css, /--header-container-width/);
  assert.match(css, /@media \(min-width:981px\)[\s\S]*?\.brand\s*\{\s*font-size:24px;\s*\}[\s\S]*?nav\s*\{\s*gap:34px;\s*font-size:12px;/s);
  assert.match(css, /\.hero\s*\{[^}]*width:100%[^}]*background:var\(--wine\)/s);
  assert.match(css, /grid-template-columns:minmax\(0,1\.1fr\) minmax\(320px,\.75fr\)/);
  assert.match(css, /gap:clamp\(40px,4vw,64px\)/);
  assert.match(css, /width:100%; max-width:480px/);
  assert.match(css, /font:500 clamp\(68px,6vw,112px\)/);
  assert.match(css, /--header-height:88px/);
  assert.match(css, /header\s*\{[^}]*height:var\(--header-height\)/s);
  assert.match(css, /\.hero\s*\{[^}]*min-height:calc\(100svh - var\(--header-height\)\)/s);
  assert.match(css, /\.hero-inner\s*\{[^}]*min-height:inherit/s);
  assert.match(css, /\.category-groups,\.visit-inner,\.footer-inner\s*\{[^}]*max-width:var\(--container-width\)[^}]*margin-inline:auto[^}]*padding-inline:var\(--container-gutter\)/s);
  assert.doesNotMatch(css, /@media \(min-width:1280px\)/);
  assert.match(css, /\.hero \.eyebrow\s*\{[^}]*font-size:clamp\(/s);
  assert.match(css, /\.hero-intro\s*\{[^}]*font:400 clamp\(/s);
  assert.match(css, /\.hero \.button\s*\{[^}]*min-height:clamp\([^}]*font-size:clamp\(/s);
  assert.match(
    css,
    /@media \(max-width:720px\)[\s\S]*?\.hero\s*\{\s*min-height:0;\s*\}[\s\S]*?\.hero-inner\s*\{\s*padding-block:60px 32px;\s*grid-template-columns:1fr;\s*gap:22px;/,
  );
});

test("centers the shared 1280px header and hero container", () => {
  for (const viewport of [1440, 1920, 2560, 3840]) {
    const containerWidth = Math.min(viewport, 1280);
    const left = (viewport - containerWidth) / 2;
    const right = viewport - left - containerWidth;

    assert.equal(containerWidth, 1280);
    assert.equal(left, right);
  }
});

test("publishes the responsive header and hero layout in the static Pages artifact", async () => {
  const html = await readFile(new URL("../pages/index.html", import.meta.url), "utf8");

  assert.doesNotMatch(html, /class="site-shell"/);
  assert.match(html, /class="header-inner"/);
  assert.match(html, /class="hero-inner"/);
  assert.match(html, /class="visit-inner"/);
  assert.match(html, /class="footer-inner"/);
  assert.match(html, /--container-width:1280px/);
  assert.match(html, /grid-template-columns:minmax\(0,1\.1fr\) minmax\(320px,\.75fr\)/);
  assert.match(html, /gap:clamp\(40px,4vw,64px\)/);
});
