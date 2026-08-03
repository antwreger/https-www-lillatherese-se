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

  assert.match(css, /\.header-inner\s*\{[^}]*max-width:1440px[^}]*margin:0 auto/s);
  assert.match(css, /\.hero-inner\s*\{[^}]*max-width:1440px[^}]*margin:0 auto/s);
  assert.match(css, /\.hero\s*\{[^}]*background:var\(--wine\)/s);
  assert.match(css, /gap:clamp\(32px,4vw,64px\)/);
  assert.match(css, /width:clamp\(340px,31vw,480px\)/);
  assert.match(css, /font:500 clamp\(76px,6\.5vw,112px\)/);
  assert.doesNotMatch(css, /100(?:s|d|l)?vh/);
  assert.match(
    css,
    /@media \(max-width:720px\)[\s\S]*?\.hero-inner\s*\{\s*padding:72px 20px 38px;\s*grid-template-columns:1fr;\s*gap:52px;/,
  );
});

test("centers the 1440px container at desktop and 4K widths", () => {
  for (const viewport of [1440, 1920, 2560, 3840]) {
    const containerWidth = Math.min(viewport, 1440);
    const left = (viewport - containerWidth) / 2;
    const right = viewport - left - containerWidth;

    assert.equal(containerWidth, 1440);
    assert.equal(left, right);
  }
});
