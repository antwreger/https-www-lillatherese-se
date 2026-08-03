/* eslint-disable @next/next/no-img-element -- vinext serves this local asset directly; next/image URLs are not available in the Sites runtime. */

const hours = [
  ["Måndag–tisdag", "Stängt"],
  ["Onsdag–fredag", "15.00–18.00"],
  ["Lördag", "14.00–18.00"],
  ["Söndag", "10.00–11.00 / 12.10–14.00"],
];

const categoryGroups = [
  {
    title: "Böcker & förlag",
    items: [
      { name: "Karmels förlag", href: "https://www.lillatherese.se/b-cker" },
      { name: "Veritas förlag", href: "https://www.lillatherese.se/veritas-f-rlag" },
      { name: "Youcat ungdom", href: "https://www.lillatherese.se/youcat-ungdom/" },
      { name: "Catholica förlag", href: "https://www.lillatherese.se/catholica-f-rlag" },
    ],
  },
  {
    title: "Föremål & andakt",
    items: [
      { name: "Rosenkransar", href: "https://www.lillatherese.se/rosenkransar" },
      { name: "Krucifix", href: "https://www.lillatherese.se/krucifix" },
      { name: "Ikoner", href: "https://www.lillatherese.se/vrigt" },
    ],
  },
  {
    title: "Om butiken",
    items: [
      { name: "Om", href: "https://www.lillatherese.se/om" },
      { name: "Beställning", href: "https://www.lillatherese.se/best-llning" },
      { name: "Kontakta oss", href: "https://www.lillatherese.se/kontakta-oss" },
    ],
  },
];

export default function Home() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "BookStore",
    "@id": "https://www.lillatherese.se/#bokhandel",
    name: "Lilla Therese Bokhandel AB",
    url: "https://www.lillatherese.se/",
    telephone: "+4631132723",
    email: "info@lillatherese.se",
    description: "Katolsk bokhandel i Göteborg med katolska böcker, rosenkransar, ikoner, krucifix, ljus, rökelse och presenter.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sten Sturegatan 1A",
      postalCode: "411 39",
      addressLocality: "Göteborg",
      addressCountry: "SE",
    },
    areaServed: { "@type": "City", name: "Göteborg" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday"], opens: "15:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "14:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "11:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:10", closes: "14:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Katolska produkter",
      itemListElement: categoryGroups.flatMap((group) => group.items).map(({ name }) => ({ "@type": "OfferCatalog", name })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <header>
        <div className="header-inner">
          <a className="brand" href="#top">Lilla Therese</a>
          <nav aria-label="Huvudmeny">
            <a href="#sortiment">Sortiment</a>
            <a href="mailto:info@lillatherese.se">Kontakt</a>
            <a className="nav-visit" href="#besok">Besök oss</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Katolsk bokhandel i Göteborg</p>
            <h1>Lilla Therese<br />Bokhandel</h1>
            <p className="hero-intro">Böcker, andaktsföremål och gåvor för det kristna livet.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#sortiment">Utforska sortimentet</a>
              <a className="button button-quiet" href="#besok">Besök butiken</a>
            </div>
          </div>
          <figure className="hero-image">
            <img src="/therese.webp" alt="Staty av den heliga Thérèse av Lisieux" width="1620" height="1080" loading="eager" fetchPriority="high" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="sortiment" id="sortiment" aria-label="Sortiment och information">
        <div className="category-groups">
          {categoryGroups.map((group) => (
            <section className="category-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="category-links">
                {group.items.map((item) => (
                  <a href={item.href} key={item.name}>{item.name}</a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="visit" id="besok">
        <div className="visit-address">
          <p className="label">Besök</p>
          <h2>Välkommen in</h2>
          <address>Sten Sturegatan 1A<br />411 39 Göteborg</address>
          <p className="visit-note">Centralt i Göteborg, intill Kristus Konungens kyrka.</p>
          <a className="button button-light" href="https://maps.google.com/?q=Sten+Sturegatan+1A+Göteborg" target="_blank" rel="noreferrer">Hitta till butiken</a>
        </div>
        <div className="hours">
          <p className="label">Öppettider</p>
          {hours.map(([day, time]) => <p key={day}><span>{day}</span><strong>{time}</strong></p>)}
          <small>Stängt under högmässan på söndagar.</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><strong>Lilla Therese</strong><span>Katolsk bokhandel i Göteborg</span></div>
        <div className="footer-contact"><a href="mailto:info@lillatherese.se">info@lillatherese.se</a><a href="tel:+4631132723">031–13 27 23</a></div>
        <p>© {new Date().getFullYear()} Lilla Therese Bokhandel AB</p>
      </footer>
    </main>
  );
}
