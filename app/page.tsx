const hours = [
  ["Måndag–tisdag", "Stängt"],
  ["Onsdag–fredag", "15.00–18.00"],
  ["Lördag", "14.00–18.00"],
  ["Söndag", "10.00–11.00 & 12.10–14.00"],
];

const assortment = [
  { number: "01", title: "Böcker", text: "Kristen och katolsk litteratur för tro, fördjupning och vardag." },
  { number: "02", title: "Andaktsliv", text: "Rosenkransar, krucifix, ikoner, rökelse, ljus och medaljer." },
  { number: "03", title: "Gåvor", text: "Kort, statyetter och omsorgsfullt valda presenter för livets högtider." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Lilla Therese Bokhandel, startsida">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span><strong>Lilla Therese</strong><small>Katolsk bokhandel · Göteborg</small></span>
        </a>
        <nav aria-label="Huvudmeny">
          <a href="#sortiment">Sortiment</a>
          <a href="#om">Om oss</a>
          <a href="#besok">Besök oss</a>
          <a className="nav-cta" href="mailto:info@lillatherese.se">Kontakta oss</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">En katolsk bokhandel mitt i Göteborg</p>
          <h1>Tro, hopp<br />och god läsning.</h1>
          <p className="lead">En liten bokhandel med ett stort hjärta för katolsk tro, bildning och vackra ting för andaktslivet.</p>
          <div className="hero-actions">
            <a className="button primary" href="#besok">Hitta till butiken <span>→</span></a>
            <a className="text-link" href="#sortiment">Upptäck vårt sortiment</a>
          </div>
        </div>
        <div className="hero-art" aria-label="Dekorativ illustration med bok och rosor">
          <div className="halo" />
          <div className="cross" aria-hidden="true"><i /><b /></div>
          <div className="book"><span>LILLA<br />THERESE</span><small>BOKHANDEL</small></div>
          <div className="rose rose-one">✿</div>
          <div className="rose rose-two">✿</div>
          <p>“Gör de minsta ting<br />med den största kärlek.”</p>
        </div>
        <div className="scroll-note"><span /> Scrolla för att upptäcka</div>
      </section>

      <section className="welcome" id="om">
        <p className="section-number">01 · Välkommen</p>
        <div>
          <h2>En plats för stillhet,<br /><em>nyfikenhet</em> och tro.</h2>
          <p>Intill Kristus Konungens kyrka, mellan Heden och Trädgårdsföreningen, hittar du vår personliga bokhandel. Här får du gärna stanna upp, bläddra, fråga och upptäcka.</p>
          <p>Vi hjälper dig att hitta rätt bok, en meningsfull gåva eller något som får följa med i ditt böneliv.</p>
        </div>
      </section>

      <section className="assortment" id="sortiment">
        <div className="section-heading">
          <div><p className="eyebrow light">Utvalt med omsorg</p><h2>Det här hittar du hos oss</h2></div>
          <p>Vårt sortiment förenar kunskap, tradition och skönhet. Fråga oss gärna om du söker något särskilt.</p>
        </div>
        <div className="assortment-grid">
          {assortment.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <div className={`category-art art-${item.number}`} aria-hidden="true"><i>✦</i></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visit" id="besok">
        <div className="visit-intro">
          <p className="section-number">02 · Besök oss</p>
          <h2>Välkommen in.</h2>
          <p>Du hittar oss centralt i Göteborg, precis bredvid Kristus Konungens kyrka.</p>
          <a className="button primary" href="https://maps.google.com/?q=Sten+Sturegatan+1A+Göteborg" target="_blank" rel="noreferrer">Öppna i kartan <span>↗</span></a>
        </div>
        <div className="details-card">
          <div className="address">
            <span>Adress</span>
            <strong>Sten Sturegatan 1A<br />411 39 Göteborg</strong>
          </div>
          <div className="hours">
            <span>Ordinarie öppettider</span>
            {hours.map(([day, time]) => <p key={day}><b>{day}</b><strong>{time}</strong></p>)}
            <small>På söndagar har vi stängt under högmässan.</small>
          </div>
        </div>
      </section>

      <section className="order">
        <div><p className="eyebrow">Letar du efter något särskilt?</p><h2>Vi hjälper dig gärna att beställa.</h2></div>
        <div><p>Mejla vad du söker så återkommer vi. Beställningar betalas efter bekräftelse och hämtas i butik eller skickas mot frakt.</p><a className="text-link" href="mailto:info@lillatherese.se?subject=Förfrågan%20om%20beställning">Skicka en förfrågan →</a></div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">✦</span><strong>Lilla Therese</strong><small>Katolsk bokhandel sedan 2008</small></div>
        <div><span>Kontakt</span><a href="mailto:info@lillatherese.se">info@lillatherese.se</a><a href="tel:+4631180730">031–18 07 30</a></div>
        <div><span>Besök</span><p>Sten Sturegatan 1A<br />411 39 Göteborg</p></div>
        <div><span>Snabblänkar</span><a href="#sortiment">Sortiment</a><a href="#besok">Öppettider</a></div>
        <p className="copyright">© {new Date().getFullYear()} Lilla Therese Bokhandel AB</p>
      </footer>
    </main>
  );
}
