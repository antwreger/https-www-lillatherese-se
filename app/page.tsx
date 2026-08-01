const hours = [
  ["Måndag–tisdag", "Stängt"],
  ["Onsdag–fredag", "15.00–18.00"],
  ["Lördag", "14.00–18.00"],
  ["Söndag", "10.00–11.00 / 12.10–14.00"],
];

const categoryGroups = [
  {
    number: "01",
    title: "Föremål & andakt",
    description: "Ett urval av katolska föremål för bön, hem och gåvor.",
    items: [
      { name: "Rosenkransar", href: "https://www.lillatherese.se/rosenkransar" },
      { name: "Krucifix", href: "https://www.lillatherese.se/krucifix" },
      { name: "Ikoner", href: "https://www.lillatherese.se/vrigt" },
    ],
  },
  {
    number: "02",
    title: "Böcker & förlag",
    description: "Katolsk litteratur för vuxna, ungdomar och familjer.",
    items: [
      { name: "Karmels förlag", href: "https://www.lillatherese.se/b-cker" },
      { name: "Veritas förlag", href: "https://www.lillatherese.se/veritas-f-rlag" },
      { name: "Youcat ungdom", href: "https://www.lillatherese.se/youcat-ungdom/" },
      { name: "Catholica förlag", href: "https://www.lillatherese.se/catholica-f-rlag" },
    ],
  },
  {
    number: "03",
    title: "Om butiken",
    description: "Läs mer, beställ på distans eller kom i kontakt med oss.",
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
        <a className="brand" href="#top">Lilla Therese</a>
        <nav aria-label="Huvudmeny">
          <a href="#sortiment">Sortiment</a>
          <a href="#besok">Besök</a>
          <a href="mailto:info@lillatherese.se">Kontakt</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p>Katolsk bokhandel i Göteborg</p>
          <h1>Lilla Therese<br />Bokhandel</h1>
          <a href="#besok">Sten Sturegatan 1A <span>↓</span></a>
        </div>
        <figure className="hero-image">
          <img src="/therese.webp" alt="Staty av den heliga Thérèse av Lisieux" />
        </figure>
      </section>

      <section className="sortiment" id="sortiment">
        <div className="sortiment-intro">
          <p className="label">Sortiment & information</p>
          <h2>Hitta rätt</h2>
          <p>Vi har samlat butikens innehåll i tre enkla avdelningar.</p>
        </div>
        <div className="category-groups">
          {categoryGroups.map((group) => (
            <section className="category-group" key={group.title} aria-labelledby={`category-${group.number}`}>
              <div className="category-heading">
                <span>{group.number}</span>
                <div>
                  <h3 id={`category-${group.number}`}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </div>
              <div className="category-links">
                {group.items.map((item) => (
                  <a href={item.href} key={item.name}>
                    <span>{item.name}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="visit" id="besok">
        <div>
          <p className="label">Besök</p>
          <h2>Sten Sturegatan 1A<br />411 39 Göteborg</h2>
          <a className="map-link" href="https://maps.google.com/?q=Sten+Sturegatan+1A+Göteborg" target="_blank" rel="noreferrer">Visa i Google Maps ↗</a>
        </div>
        <div className="hours">
          <p className="label">Öppettider</p>
          {hours.map(([day, time]) => <p key={day}><span>{day}</span><strong>{time}</strong></p>)}
          <small>Stängt under högmässan på söndagar.</small>
        </div>
      </section>

      <footer>
        <strong>Lilla Therese Bokhandel AB</strong>
        <div><a href="mailto:info@lillatherese.se">info@lillatherese.se</a><a href="tel:+4631132723">031–13 27 23</a></div>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
