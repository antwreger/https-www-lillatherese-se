import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lillatherese.se"),
  title: "Katolsk bokhandel i Göteborg | Lilla Therese",
  description: "Katolska böcker, rosenkransar, ikoner, krucifix, ljus och presenter hos Lilla Therese Bokhandel på Sten Sturegatan 1A i Göteborg.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Lilla Therese – katolsk bokhandel i Göteborg",
    description: "Katolska böcker och produkter i centrala Göteborg. Besök oss på Sten Sturegatan 1A.",
    url: "/",
    siteName: "Lilla Therese Bokhandel",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/og.png", width: 1915, height: 948, alt: "Lilla Therese – katolsk bokhandel i Göteborg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lilla Therese – katolsk bokhandel i Göteborg",
    description: "Katolska böcker och produkter i centrala Göteborg.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
